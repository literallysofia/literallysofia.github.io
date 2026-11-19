/**
 * Now playing: one shared fetch of the Worker (workers/now-playing).
 * Every page warms it up once idle (Layout.astro), so the music page
 * has the track ready the moment you navigate there. Module state
 * survives client-side navigations, so the cache carries across pages.
 */

export interface Track {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  art: string;
  url: string;
  progressMs?: number;
  durationMs?: number;
  playedAt?: string;
  /** When the response arrived (added here), so a cached answer's progress isn't read as fresh */
  receivedAt: number;
}

/** In `npm run dev` a static track always stands in for the Worker (see devTrack) */
export const DEV_MOCK = 'dev-mock';
export const endpoint: string = import.meta.env.DEV ? DEV_MOCK : import.meta.env.PUBLIC_NOW_PLAYING_URL || '';

/**
 * A pretend song for local testing: always "playing", 3:12 long, looping
 * from when the page loaded, so the progress bar and song-end refresh run.
 * Never used in a build (import.meta.env.DEV is false there).
 */
const devStart = Date.now();
function devTrack(): Track {
  const durationMs = 192_000;
  return {
    isPlaying: true,
    title: 'SUPERSCAR',
    artist: 'ADÉLA',
    album: 'PRIMA',
    art: 'https://i.scdn.co/image/ab67616d0000b2733f5c7762607f34f41615db1a',
    url: 'https://open.spotify.com/track/3OXswcKSaO6mNiNyeEbnAS',
    progressMs: (Date.now() - devStart) % durationMs,
    durationMs,
    receivedAt: Date.now(),
  };
}

/** Matches the Worker's 15s cache, so polling never asks twice for the same answer */
const MAX_AGE_MS = 15_000;

let cached: { at: number; request: Promise<Track | null> } | undefined;

/** The current track, `null` when Spotify has nothing to show (204); throws when the Worker fails */
export function getNowPlaying(): Promise<Track | null> {
  if (endpoint === DEV_MOCK) return Promise.resolve(devTrack());
  if (cached && Date.now() - cached.at < MAX_AGE_MS) return cached.request;
  const request = fetch(endpoint).then((res) => {
    if (res.status === 204) return null;
    if (!res.ok) throw new Error(String(res.status));
    return res.json().then((track: Omit<Track, 'receivedAt'>) => ({ ...track, receivedAt: Date.now() }));
  });
  cached = { at: Date.now(), request };
  // A failed fetch isn't kept, so the next poll tries again
  request.catch(() => (cached = undefined));
  return request;
}

/** Warm the cache in the background, without getting in the page's way */
export function prefetchNowPlaying(): void {
  if (!endpoint) return;
  const warm = () => getNowPlaying().catch(() => {});
  if ('requestIdleCallback' in window) requestIdleCallback(warm, { timeout: 3000 });
  else setTimeout(warm, 1000);
}
