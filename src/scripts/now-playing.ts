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

export const endpoint: string = import.meta.env.PUBLIC_NOW_PLAYING_URL || '';

/** Matches the Worker's 15s cache, so polling never asks twice for the same answer */
const MAX_AGE_MS = 15_000;

let cached: { at: number; request: Promise<Track | null> } | undefined;

/** The current track, `null` when Spotify has nothing to show (204); throws when the Worker fails */
export function getNowPlaying(): Promise<Track | null> {
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
