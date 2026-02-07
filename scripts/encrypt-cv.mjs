/**
 * Encrypt CV PDF with AES-256-GCM + PBKDF2
 *
 * Usage: CV_PASSWORD=secret node scripts/encrypt-cv.mjs
 *
 * Reads cv.pdf from the repo root, outputs public/cv.enc
 * Format: 32-byte salt | 12-byte IV | ciphertext (includes GCM auth tag)
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { randomBytes, pbkdf2Sync, createCipheriv } from 'node:crypto';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const password = process.env.CV_PASSWORD;
if (!password) {
  console.error('Error: CV_PASSWORD environment variable is required.');
  process.exit(1);
}

const inputPath = resolve(ROOT, 'cv.pdf');
if (!existsSync(inputPath)) {
  console.error('Error: cv.pdf not found in the repository root.');
  process.exit(1);
}

const plaintext = readFileSync(inputPath);

// Derive key with PBKDF2 (600k iterations, OWASP recommendation)
const salt = randomBytes(32);
const key = pbkdf2Sync(password, salt, 600_000, 32, 'sha256');

// Encrypt with AES-256-GCM
const iv = randomBytes(12);
const cipher = createCipheriv('aes-256-gcm', key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();

// Output: salt (32) + iv (12) + ciphertext + authTag (16)
const output = Buffer.concat([salt, iv, encrypted, authTag]);

const outputPath = resolve(ROOT, 'public', 'cv.enc');
writeFileSync(outputPath, output);

console.log(`Encrypted cv.pdf (${plaintext.length} bytes) -> public/cv.enc (${output.length} bytes)`);
