# now-playing Worker

A tiny Cloudflare Worker that returns what you're listening to on Spotify,
so the static site can show it without exposing any secrets.

> Not deployed yet. Nothing here runs until you deploy it yourself.

## One-time setup

1. **Spotify app.** Create an app at https://developer.spotify.com/dashboard
   and add `http://127.0.0.1:8888/callback` as a redirect URI.
2. **Connect Spotify.** Easiest: from this folder run `npx wrangler login`, then
   `node get-refresh-token.mjs` and follow the prompts. It gets the refresh token
   and saves all three secrets to the Worker for you (skip step 3). Nothing is
   shown or saved to disk.
   By hand instead: open this URL in your browser (with your client id):
   ```
   https://accounts.spotify.com/authorize?client_id=<CLIENT_ID>&response_type=code&redirect_uri=http%3A%2F%2F127.0.0.1%3A8888%2Fcallback&scope=user-read-currently-playing%20user-read-recently-played
   ```
   After approving, copy the `code` from the redirect URL and exchange it:
   ```
   curl -X POST https://accounts.spotify.com/api/token \
     -u "<CLIENT_ID>:<CLIENT_SECRET>" \
     -d grant_type=authorization_code \
     -d code=<CODE> \
     -d redirect_uri=http://127.0.0.1:8888/callback
   ```
   Keep the `refresh_token` from the response.
3. **Secrets.** From this folder:
   ```
   npx wrangler secret put SPOTIFY_CLIENT_ID
   npx wrangler secret put SPOTIFY_CLIENT_SECRET
   npx wrangler secret put SPOTIFY_REFRESH_TOKEN
   ```
4. **Deploy** (only when you're ready): `npx wrangler deploy`
5. Put the Worker URL in the site's `.env` as `PUBLIC_NOW_PLAYING_URL`
   (and as a repository variable for the GitHub Pages build).

## Local test

`npx wrangler dev`, then set `ALLOWED_ORIGIN` to `http://localhost:4321` in a
`.dev.vars` file and point `PUBLIC_NOW_PLAYING_URL` at the local URL.
