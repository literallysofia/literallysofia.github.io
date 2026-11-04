# literallysofia.github.io ☕️

hello!! this is my little corner of the internet: the iOS apps i've worked on, what i'm listening to and reading, and a few photos from off screen. calm, minimal, a bit hygge 🕯️

🔗 **live:** [literallysofia.github.io](https://literallysofia.github.io)

## 🧶 what's inside

- **home**: a quick hello, the apps i'm proudest of, some photos and where i've worked
- **work**: one section per app, with App Store-style cards. the page washes into each app's colour as you scroll, and a matcha cup fills up along the way 🍵
- **about**: the longer version of me, plus a gallery i can reorder whenever i feel like it
- **music**: what's playing on my Spotify right now, my year in music from stats.fm, and the concerts i made it to 🎧
- light and dark mode (dark is the exact inverse of light), and everything calms down if you prefer reduced motion

## 🛠️ built with

| | |
|---|---|
| framework | [Astro](https://astro.build) 7, fully static |
| styling | plain CSS + custom properties, no frameworks |
| images | Astro Image + Sharp |
| now playing | a tiny Cloudflare Worker ([`workers/now-playing`](workers/now-playing/README.md)) |
| hosting | GitHub Actions → GitHub Pages |

## 🗂️ where things live

```
/
├── .github/workflows/      deploy, plus weekly music + reading syncs
├── public/                 favicons, manifest, work videos
├── scripts/                the data syncs (stats.fm, Notion concerts, Goodreads)
├── workers/now-playing/    the Spotify Worker, deployed separately
└── src/
    ├── assets/             photos + app screenshots
    ├── components/         all the .astro bits
    ├── content/            hero, about, experience, work (markdown)
    ├── data/               gallery order, music, concerts, reading
    ├── pages/              home, work, about, music, 404
    └── styles/             theme.css tokens + one file per area
```

most of the words live in `src/content/` and `src/data/`, so changing copy rarely means touching code ✍️

## 🚀 running it locally

you'll need **Node 22+**.

```bash
npm install
npm run dev
```

| script | what it does |
|---|---|
| `npm run dev` | starts the dev server |
| `npm run build` | type-checks and builds the site |
| `npm run preview` | previews the build |
| `npm run sync-concerts` | pulls concerts from Notion (needs `NOTION_TOKEN` in `.env`) |
| `npm run sync-reading` | pulls what i'm currently reading from Goodreads |

the stats.fm snapshot runs from its workflow, or locally with `STATSFM_USER=literallysofia node scripts/fetch-statsfm.mjs`.

**`.env` (local only):**
- `PUBLIC_NOW_PLAYING_URL`: the Worker URL. without it, the now-playing card just stays hidden
- `NOTION_TOKEN`: only for the concert sync

## 🌐 deploying

pushing to `source` builds and deploys to GitHub Pages. every monday, the music and reading workflows grab fresh data, commit it if anything changed, and redeploy 🔁

repo settings it relies on:
- **variables:** `NOW_PLAYING_URL`, and optionally `STATSFM_USER` / `GOODREADS_USER`
- **secrets:** `NOTION_TOKEN` (optional, for concerts)

## 🔒 privacy bits

- the photos in here are stripped of location data (strip it before adding new ones!)
- my email is never in the HTML, and it's scrambled in the source. the "email me" button builds it only when you tap it
- Spotify keys live in Cloudflare, never in this repo

## 📝 license

MIT, go wild (kindly) 💜
