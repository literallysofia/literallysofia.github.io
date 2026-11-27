# literallysofia.github.io ⭐️

*some websites are built. this one was made at 2am, by candlelight, with a playlist on repeat and a book face-down on the desk.* 🕯️

hi. you found my little corner of the internet. it holds the iOS apps i've built, whatever song has its claws in me this week, the book i should've put down hours ago, the last film i watched, and a few photos from life off screen. calm, minimal, a bit hygge, and just a little bit dangerous 🖤

🌙 **step inside:** [literallysofia.github.io](https://literallysofia.github.io)

## 🥀 what's inside

- **home**: a quiet hello, the apps i'm proudest of, some photos and where i've worked
- **work**: one section per app, with App Store-style cards. the page slowly bleeds into each app's colour as you scroll, and a matcha cup fills along the way so you know how deep you are 🍵
- **about**: the long version of me. a "currently" corner (the book i'm lost in, the song i can't stop replaying, the last film that ruined me) and a gallery i rearrange whenever the mood strikes
- **music**: what's playing on my Spotify right now, what's been on repeat this month, my year in music from stats.fm, and every concert i've lost my voice at 🎧
- light and dark mode. dark is the exact inverse of light, because every girl has a dark side 🌗 everything goes soft and still if you prefer reduced motion

## 🗝️ made with

| | |
|---|---|
| framework | [Astro](https://astro.build) 7, fully static |
| styling | plain CSS + custom properties, no frameworks, all by hand |
| images | Astro Image + Sharp |
| now playing | a tiny Cloudflare Worker ([`workers/now-playing`](workers/now-playing/README.md)) that watches my Spotify so you don't have to |
| hosting | GitHub Actions → GitHub Pages |

## 🗺️ where things live

```
/
├── .github/workflows/      deploy, weekly music / reading / film syncs, monthly concerts
├── public/                 favicons, manifest, work videos
├── scripts/                the data syncs (stats.fm, Notion concerts, Goodreads, Letterboxd)
├── workers/now-playing/    the Spotify Worker, who lives alone on Cloudflare
└── src/
    ├── assets/             photos + app screenshots
    ├── components/         all the .astro pieces
    ├── content/            hero, about, experience, work (markdown)
    ├── data/               gallery order, music, concerts, reading, watching
    ├── pages/              home, work, about, music, 404
    └── styles/             theme.css tokens + one file per area
```

most of the words live in `src/content/` and `src/data/`, so rewriting my story rarely means touching code ✍️

## 🕯️ running it locally

you'll need **Node 22+** and something warm to drink.

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
| `npm run sync-reading` | pulls what i'm reading from Goodreads 📚 |
| `npm run sync-watching` | pulls what i last watched from Letterboxd 🎬 |

the stats.fm snapshot runs from its workflow, or locally with `STATSFM_USER=literallysofia node scripts/fetch-statsfm.mjs`. in dev mode a fake song plays forever, so the player is never left alone 🎶

**`.env` (local only. some secrets are meant to stay buried 🤫):**
- `PUBLIC_NOW_PLAYING_URL`: the Worker URL. without it, the now-playing card simply disappears
- `NOTION_TOKEN`: only for the concert sync

## 🌒 deploying

pushing to `source` builds and deploys to GitHub Pages. every monday, the music, reading and watching workflows wake up, grab whatever's changed, and quietly redeploy 🔁 concerts sync from Notion on the 1st of every month (or whenever i run it by hand, ears still ringing after a show 🎸)

repo settings it relies on:
- **variables:** `NOW_PLAYING_URL`, and optionally `STATSFM_USER` / `GOODREADS_USER` / `LETTERBOXD_USER`
- **secrets:** `NOTION_TOKEN` (for the concerts workflow)

## 🛡️ privacy bits

- every photo here is stripped of location data (strip it before adding new ones!)
- my email is never in the HTML, and it's scrambled in the source. the "email me" button only puts it together when you tap it 💌
- Spotify keys live in Cloudflare, never in this repo
- only public bits get synced: no concert prices or ratings, no Letterboxd reviews, nothing planned past this year. a girl keeps her secrets ✨

## 🤝 made with a little help

i built this site with [Claude](https://claude.com/claude-code) by my side, on purpose, as a way to learn. every design choice and every line of copy went through me, and the late-night "why does safari do that" rabbit holes taught me more than any tutorial. a partner in crime, not a ghostwriter ⚔️ ✨

## 📖 license

MIT. take what you need, just be kind about it 🖤
