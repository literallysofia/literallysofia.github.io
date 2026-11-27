#!/usr/bin/env node
/**
 * Fetch the last watched film from a public Letterboxd profile's RSS
 * and write it to src/data/watching.json (the about page's Watched line).
 *
 * Only public film info is kept: title, year, star rating and the film's
 * Letterboxd page. Review text and the diary link are left out.
 *
 * Usage:
 *   LETTERBOXD_USER=<username> node scripts/fetch-letterboxd.mjs
 */

import { writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const user = process.env.LETTERBOXD_USER;
if (!user || !/^[\w-]+$/.test(user)) {
  console.error('Set LETTERBOXD_USER to your Letterboxd username (from letterboxd.com/<username>).');
  process.exit(1);
}

const res = await fetch(`https://letterboxd.com/${user}/rss/`, {
  headers: { 'user-agent': 'Mozilla/5.0 (literallysofia.github.io watching sync)' },
});
if (!res.ok) {
  console.error(`Letterboxd responded ${res.status}`);
  process.exit(1);
}
const feed = await res.text();

const decode = (text) =>
  text
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;|&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .trim();

const tag = (item, name) => {
  const match = item.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`));
  return match ? decode(match[1]) : '';
};

// Diary entries carry a filmTitle; list updates in the same feed don't
const item = feed
  .split('<item>')
  .slice(1)
  .find((entry) => entry.includes('<letterboxd:filmTitle>'));
if (!item) {
  console.error('No watched films in the feed (is the profile public?). Leaving watching.json as is.');
  process.exit(1);
}

// ".../literallysofia/film/<slug>/" (her diary entry) → the film's own page
const slug = tag(item, 'link').match(/\/film\/([^/]+)/)?.[1];
const rating = Number(tag(item, 'letterboxd:memberRating')) || null;

const film = {
  title: tag(item, 'letterboxd:filmTitle'),
  year: Number(tag(item, 'letterboxd:filmYear')) || null,
  rating,
  rewatch: tag(item, 'letterboxd:rewatch') === 'Yes',
  watchedDate: tag(item, 'letterboxd:watchedDate'),
  url: slug ? `https://letterboxd.com/film/${slug}/` : `https://letterboxd.com/${user}/`,
};

const out = path.join(path.dirname(fileURLToPath(import.meta.url)), '../src/data/watching.json');
await mkdir(path.dirname(out), { recursive: true });
await writeFile(out, JSON.stringify({ film }, null, 2) + '\n');
console.log(`Wrote "${film.title}" (${film.year}) to ${path.relative(process.cwd(), out)}`);
