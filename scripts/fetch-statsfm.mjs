#!/usr/bin/env node
/**
 * Fetch a "year in music" snapshot from the public stats.fm API
 * and write it to src/data/music/<year>.json.
 *
 * The stats.fm profile must be public. No auth is needed.
 *
 * Usage:
 *   STATSFM_USER=<username> node scripts/fetch-statsfm.mjs --year 2025
 *   STATSFM_USER=<username> node scripts/fetch-statsfm.mjs          # current year
 */

import { writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const API = 'https://api.stats.fm/api/v1';
const LIMIT = 5;

const user = process.env.STATSFM_USER;
if (!user) {
  console.error('Set STATSFM_USER to your stats.fm username.');
  process.exit(1);
}

const yearArg = process.argv.indexOf('--year');
const year = yearArg > -1 ? Number(process.argv[yearArg + 1]) : new Date().getFullYear();
if (!Number.isInteger(year)) {
  console.error('Usage: node scripts/fetch-statsfm.mjs --year 2025');
  process.exit(1);
}

const after = Date.UTC(year, 0, 1);
const before = Math.min(Date.UTC(year + 1, 0, 1) - 1, Date.now());
const range = `after=${after}&before=${before}`;

async function get(endpoint) {
  const res = await fetch(`${API}/users/${encodeURIComponent(user)}${endpoint}`);
  if (!res.ok) throw new Error(`${endpoint} → ${res.status} ${res.statusText}`);
  return (await res.json()).items;
}

const spotifyUrl = (type, ids) => (ids?.length ? `https://open.spotify.com/${type}/${ids[0]}` : null);

// Tracks are fetched deeper than LIMIT so the top album's artist can be
// found from a track on it (stats.fm albums don't carry artists)
const [stats, artists, tracks, albums, genres] = await Promise.all([
  get(`/streams/stats?${range}`),
  get(`/top/artists?${range}&limit=${LIMIT}`),
  get(`/top/tracks?${range}&limit=50`),
  get(`/top/albums?${range}&limit=${LIMIT}`),
  get(`/top/genres?${range}&limit=1`),
]);

/** Artist names for an album, taken from one of its tracks in the top tracks */
const albumArtist = (album) => {
  const match = tracks.find(({ track }) => track.albums?.some((a) => a.id === album.id));
  return match ? match.track.artists.map((a) => a.name).join(', ') : '';
};

/**
 * Cover art for a track. stats.fm sometimes links a play to the music
 * video ("… (Official Video)"), whose image is a video still. In that case
 * look up the real album art on the public iTunes Search API.
 */
const VIDEO = /\b(official\s+)?(music\s+)?video\b/i;
// Spotify serves video thumbnails from image ids starting with "ab6742d3"
const isVideo = (album) => VIDEO.test(album.name) || /\/image\/ab6742d3/.test(album.image ?? '');
async function trackCover(track) {
  const album = track.albums?.find((a) => !isVideo(a)) ?? null;
  if (album?.image) return album.image;
  const term = `${track.artists.map((a) => a.name).join(' ')} ${track.name}`;
  try {
    const res = await fetch(`https://itunes.apple.com/search?entity=song&limit=1&term=${encodeURIComponent(term)}`);
    const art = (await res.json()).results?.[0]?.artworkUrl100;
    if (art) return art.replace(/\/\d+x\d+bb\./, '/600x600bb.');
  } catch {
    // fall through to the original image
  }
  return track.albums?.[0]?.image ?? null;
}

const topTracks = await Promise.all(
  tracks.slice(0, LIMIT).map(async ({ track }) => ({
    name: track.name,
    artist: track.artists.map((a) => a.name).join(', '),
    image: await trackCover(track),
    url: spotifyUrl('track', track.externalIds?.spotify),
  }))
);

const snapshot = {
  year,
  fetchedAt: new Date().toISOString(),
  minutes: Math.round((stats.durationMs ?? 0) / 60000),
  topGenre: genres[0]?.genre?.tag ?? '—',
  artists: stats.cardinality?.artists ?? 0,
  topAlbums: albums.map(({ album }) => ({
    name: album.name,
    artist: albumArtist(album),
    image: album.image ?? null,
    url: spotifyUrl('album', album.externalIds?.spotify),
  })),
  topArtists: artists.map(({ artist }) => ({
    name: artist.name,
    image: artist.image ?? null,
    url: spotifyUrl('artist', artist.externalIds?.spotify),
  })),
  topTracks,
};

const outDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'data', 'music');
await mkdir(outDir, { recursive: true });
const outFile = path.join(outDir, `${year}.json`);
await writeFile(outFile, JSON.stringify(snapshot, null, 2) + '\n');
console.log(`Wrote ${path.relative(process.cwd(), outFile)}: ${snapshot.minutes} min, top genre ${snapshot.topGenre}`);
