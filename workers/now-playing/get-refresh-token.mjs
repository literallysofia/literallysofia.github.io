#!/usr/bin/env node
/**
 * One-time helper: connects the Worker to your Spotify account.
 *
 *   node get-refresh-token.mjs
 *
 * Asks for your app's Client ID and Client secret (the secret is hidden
 * as you type), prints a Spotify link to approve, catches the redirect on
 * http://127.0.0.1:8888/callback, swaps the code for a refresh token, then
 * uploads all three to the Worker with `wrangler secret put`. The token is
 * never shown; nothing is saved to disk. Run `npx wrangler login` first.
 */

import http from 'node:http';
import readline from 'node:readline';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const HERE = path.dirname(fileURLToPath(import.meta.url));

/** Pipes the value into `wrangler secret put`, so it never touches the screen or disk */
function putSecret(name, value) {
  const result = spawnSync('npx', ['wrangler', 'secret', 'put', name], {
    cwd: HERE,
    input: value,
    encoding: 'utf8',
    stdio: ['pipe', 'pipe', 'pipe'],
  });
  return result.status === 0 ? null : (result.stderr || result.stdout || `exit ${result.status}`).trim().split('\n').pop();
}

const REDIRECT = 'http://127.0.0.1:8888/callback';
const SCOPES = 'user-read-currently-playing user-read-recently-played';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: Boolean(process.stdin.isTTY) });
const write = rl._writeToOutput.bind(rl);
let muted = false;
// Echo nothing while the secret is typed
rl._writeToOutput = (text) => {
  if (!muted) write(text);
};

// Lines queue up as they arrive, so nothing is lost when input is pasted or piped
const lines = [];
const waiting = [];
rl.on('line', (line) => (waiting.length ? waiting.shift()(line) : lines.push(line)));

function ask(question, { hidden = false } = {}) {
  process.stdout.write(question);
  muted = hidden;
  return new Promise((resolve) => {
    const done = (line) => {
      muted = false;
      if (hidden) process.stdout.write('\n');
      resolve(line.trim());
    };
    lines.length ? done(lines.shift()) : waiting.push(done);
  });
}

const clientId = await ask('Client ID: ');
const clientSecret = await ask('Client secret (hidden): ', { hidden: true });
rl.close();
if (!clientId || !clientSecret) {
  console.error('Both the Client ID and the Client secret are needed.');
  process.exit(1);
}

const authorize = new URL('https://accounts.spotify.com/authorize');
authorize.search = new URLSearchParams({ client_id: clientId, response_type: 'code', redirect_uri: REDIRECT, scope: SCOPES });

console.log('\n1. Open this link and click Agree:\n');
console.log(`   ${authorize}\n`);
console.log('2. Waiting for Spotify to send you back…');

const code = await new Promise((resolve) => {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, REDIRECT);
    if (url.pathname !== '/callback') return res.writeHead(404).end();
    const error = url.searchParams.get('error');
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.end(error ? `<p>Spotify said: ${error}. You can close this tab.</p>` : '<p>All set, you can close this tab and go back to the terminal.</p>');
    server.close();
    if (error) {
      console.error(`\nSpotify said: ${error}. Run it again and click Agree.`);
      process.exit(1);
    }
    resolve(url.searchParams.get('code'));
  });
  server.listen(8888, '127.0.0.1');
});

const res = await fetch('https://accounts.spotify.com/api/token', {
  method: 'POST',
  headers: {
    authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
    'content-type': 'application/x-www-form-urlencoded',
  },
  body: new URLSearchParams({ grant_type: 'authorization_code', code, redirect_uri: REDIRECT }),
});
const data = await res.json();
if (!res.ok || !data.refresh_token) {
  console.error(`\nSpotify refused the swap: ${data.error_description ?? data.error ?? res.status}`);
  process.exit(1);
}

console.log('\n3. Got it. Saving your Spotify keys to the Worker…');
const secrets = { SPOTIFY_CLIENT_ID: clientId, SPOTIFY_CLIENT_SECRET: clientSecret, SPOTIFY_REFRESH_TOKEN: data.refresh_token };
for (const [name, value] of Object.entries(secrets)) {
  const failure = putSecret(name, value);
  if (failure) {
    console.error(`   ✗ ${name}: ${failure}`);
    console.error('\nCould not save it (are you logged in? run `npx wrangler login`, then this again).');
    process.exit(1);
  }
  console.log(`   ✓ ${name}`);
}
console.log('\nAll set. Reload https://now-playing.literallysofia.workers.dev to see your song.');
