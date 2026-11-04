/**
 * now-playing Worker
 * Returns what Sofia is listening to on Spotify, without exposing
 * any secrets to the static site.
 *
 * Secrets (set with `wrangler secret put`):
 *   SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN
 * Var (wrangler.toml):
 *   ALLOWED_ORIGIN
 *
 * GET / → { isPlaying, title, artist, album, art, url, progressMs, durationMs, playedAt }
 */

const TOKEN_URL = 'https://accounts.spotify.com/api/token';
const NOW_URL = 'https://api.spotify.com/v1/me/player/currently-playing';
const RECENT_URL = 'https://api.spotify.com/v1/me/player/recently-played?limit=1';
const CACHE_SECONDS = 15;

async function getAccessToken(env) {
  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${btoa(`${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`)}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: env.SPOTIFY_REFRESH_TOKEN }),
  });
  if (!res.ok) {
    // Spotify's error code ("invalid_grant", "invalid_client") says which secret is wrong
    const { error } = await res.json().catch(() => ({}));
    throw new Error(`token ${res.status} ${error ?? ''}`.trim());
  }
  return (await res.json()).access_token;
}

function toTrack(item) {
  return {
    title: item.name,
    artist: item.artists.map((a) => a.name).join(', '),
    album: item.album.name,
    art: item.album.images?.[1]?.url ?? item.album.images?.[0]?.url ?? '',
    url: item.external_urls.spotify,
    durationMs: item.duration_ms,
  };
}

async function getNowPlaying(env) {
  const token = await getAccessToken(env);
  const headers = { Authorization: `Bearer ${token}` };

  const now = await fetch(NOW_URL, { headers });
  if (now.status === 200) {
    const data = await now.json();
    if (data.item && data.currently_playing_type === 'track') {
      return { isPlaying: data.is_playing, progressMs: data.progress_ms, ...toTrack(data.item) };
    }
  }

  const recent = await fetch(RECENT_URL, { headers });
  if (!recent.ok) throw new Error(`recent ${recent.status}`);
  const [last] = (await recent.json()).items ?? [];
  if (!last) return null;
  return { isPlaying: false, playedAt: last.played_at, ...toTrack(last.track) };
}

export default {
  async fetch(request, env, ctx) {
    const cors = {
      'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN,
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      Vary: 'Origin',
    };
    if (request.method === 'OPTIONS') return new Response(null, { headers: cors });
    if (request.method !== 'GET') return new Response('Method not allowed', { status: 405, headers: cors });

    const cache = caches.default;
    const cacheKey = new Request(new URL('/', request.url).toString());
    const cached = await cache.match(cacheKey);
    if (cached) return cached;

    try {
      const track = await getNowPlaying(env);
      if (!track) return new Response(null, { status: 204, headers: cors });
      const response = new Response(JSON.stringify(track), {
        headers: { ...cors, 'Content-Type': 'application/json', 'Cache-Control': `public, max-age=${CACHE_SECONDS}` },
      });
      ctx.waitUntil(cache.put(cacheKey, response.clone()));
      return response;
    } catch (error) {
      // Only the failing step and status code (e.g. "token 400"), never secrets; read it with `wrangler tail`
      console.error(`now-playing failed: ${error.message}`);
      return new Response(JSON.stringify({ error: 'unavailable' }), {
        status: 502,
        headers: { ...cors, 'Content-Type': 'application/json' },
      });
    }
  },
};
