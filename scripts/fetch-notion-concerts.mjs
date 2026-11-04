#!/usr/bin/env node
/**
 * Sync concerts from Notion into src/data/concerts.json.
 *
 * Reads the "[DB] Events" data source and resolves its Headline / Support
 * (→ [DB] Artists) and Venue (→ [DB] Venues) relations to names.
 * Past events and upcoming ones in the current year are written (flagged
 * `upcoming`; later years are skipped), with only
 * public fields: event name, date,
 * headliners, support, venue, location and the Favourite checkbox
 * (no price, rating, VIP or comments).
 *
 * Needs a Notion connection with access to the three music databases.
 *
 * Usage:
 *   npm run sync-concerts               # reads NOTION_TOKEN from .env
 *   NOTION_EVENTS_DS=<data source id>   # optional override
 */

import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const token = process.env.NOTION_TOKEN;
const eventsSource = process.env.NOTION_EVENTS_DS || 'bd73b164-20bc-4ce5-9d3a-501f8972032f';
if (!token) {
  console.error('Set NOTION_TOKEN to a Notion connection token with access to the music databases.');
  process.exit(1);
}

const headers = {
  Authorization: `Bearer ${token}`,
  'Notion-Version': '2025-09-03',
  'Content-Type': 'application/json',
};

/** Every row of a Notion data source */
async function queryAll(dataSourceId) {
  const rows = [];
  let cursor;
  do {
    const res = await fetch(`https://api.notion.com/v1/data_sources/${dataSourceId}/query`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ page_size: 100, ...(cursor && { start_cursor: cursor }) }),
    });
    if (!res.ok) throw new Error(`Notion ${res.status}: ${await res.text()}`);
    const page = await res.json();
    rows.push(...page.results);
    cursor = page.has_more ? page.next_cursor : undefined;
  } while (cursor);
  return rows;
}

const plain = (rich = []) => rich.map((t) => t.plain_text).join('').trim();
const titleOf = (props) => plain(Object.values(props).find((p) => p.type === 'title')?.title);

/** id → { name, location } for a related data source */
async function lookup(dataSourceId) {
  const map = new Map();
  for (const row of await queryAll(dataSourceId)) {
    map.set(row.id, {
      name: titleOf(row.properties),
      location: row.properties.Location?.select?.name ?? '',
    });
  }
  return map;
}

const relatedSource = async (prop) => {
  const res = await fetch(`https://api.notion.com/v1/data_sources/${eventsSource}`, { headers });
  if (!res.ok) throw new Error(`Notion ${res.status}: ${await res.text()}`);
  return (await res.json()).properties[prop]?.relation?.data_source_id;
};

const [artistsSource, venuesSource] = await Promise.all([relatedSource('Headline'), relatedSource('Venue')]);
const [artists, venues, events] = await Promise.all([lookup(artistsSource), lookup(venuesSource), queryAll(eventsSource)]);

const names = (prop, map) => (prop?.relation ?? []).map((r) => map.get(r.id)?.name).filter(Boolean);
const today = new Date().toISOString().slice(0, 10);

/** "🇵🇹 Viana do Castelo Portugal" → "Viana do Castelo, Portugal" */
const formatLocation = (value) => {
  const words = value.trim().split(/\s+/).slice(1); // drop the flag emoji
  if (words.length < 2) return words.join(' ');
  return `${words.slice(0, -1).join(' ')}, ${words.at(-1)}`;
};

const FESTIVAL_TAG = /\s*\[festival\]\s*/i;

const concerts = events
  .map(({ properties: p }) => {
    const venue = venues.get(p.Venue?.relation?.[0]?.id);
    const name = titleOf(p);
    return {
      name: name.replace(FESTIVAL_TAG, '').trim(),
      festival: FESTIVAL_TAG.test(name),
      favourite: p.Favourite?.checkbox === true,
      date: p.Date?.date?.start?.slice(0, 10) ?? '',
      artist: names(p.Headline, artists).join(', '),
      support: names(p.Support, artists),
      venue: venue?.name ?? '',
      city: venue?.location ? formatLocation(venue.location) : '',
    };
  })
  // Nothing after the current year: next year's plans stay private
  .filter((c) => c.date && c.date.slice(0, 4) <= today.slice(0, 4) && (c.artist || c.name))
  .map((c) => ({ ...c, artist: c.artist || c.name, upcoming: c.date > today }))
  .sort((a, b) => b.date.localeCompare(a.date));

const outFile = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'data', 'concerts.json');
await writeFile(outFile, JSON.stringify(concerts, null, 2) + '\n');
const upcoming = concerts.filter((c) => c.upcoming).length;
console.log(`Wrote ${path.relative(process.cwd(), outFile)}: ${concerts.length - upcoming} past, ${upcoming} upcoming`);
