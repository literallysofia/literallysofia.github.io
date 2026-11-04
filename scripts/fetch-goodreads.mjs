#!/usr/bin/env node
/**
 * Fetch the "Currently Reading" books from a public Goodreads profile
 * and write them to src/data/reading.json.
 *
 * Reads the profile page itself (the shelf RSS needs the shelves to be
 * public). No auth is needed.
 *
 * Usage:
 *   GOODREADS_USER=<user id> node scripts/fetch-goodreads.mjs
 */

import { writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const user = process.env.GOODREADS_USER;
if (!user || !/^\d+$/.test(user)) {
  console.error('Set GOODREADS_USER to your numeric Goodreads user id (from goodreads.com/user/show/<id>).');
  process.exit(1);
}

const decode = (text) =>
  text
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;|&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .trim();

const res = await fetch(`https://www.goodreads.com/user/show/${user}`, {
  headers: { 'user-agent': 'Mozilla/5.0 (literallysofia.github.io reading sync)' },
});
if (!res.ok) {
  console.error(`Goodreads responded ${res.status}`);
  process.exit(1);
}
const page = await res.text();

const start = page.indexOf('id="currentlyReadingReviews"');
if (start === -1) {
  console.error('No "Currently Reading" box on the profile (is it public?). Leaving reading.json as is.');
  process.exit(1);
}
const box = page.slice(start).split('class="bigBoxBottom"')[0];

const books = box
  .split('class="Updates')
  .slice(1)
  .map((entry) => {
    const title = entry.match(/<a class="bookTitle" href="([^"]+)">([^<]+)<\/a>/);
    const author = entry.match(/<a class="authorName" href="[^"]+">([^<]+)<\/a>/);
    if (!title || !author) return null;
    // "Queen of Shadows (Throne of Glass, #4)" → title + series
    const [, name, series] = decode(title[2]).match(/^(.*?)(?:\s*\(([^)]*#[^)]*)\))?$/);
    return {
      title: name,
      ...(series ? { series } : {}),
      author: decode(author[1]),
      url: new URL(title[1], 'https://www.goodreads.com').href,
    };
  })
  .filter(Boolean);

const out = path.join(path.dirname(fileURLToPath(import.meta.url)), '../src/data/reading.json');
await mkdir(path.dirname(out), { recursive: true });
await writeFile(out, JSON.stringify({ books }, null, 2) + '\n');
console.log(`Wrote ${books.length} book(s) to ${path.relative(process.cwd(), out)}`);
