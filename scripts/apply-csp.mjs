/**
 * Injects a hash-based Content-Security-Policy <meta> tag into every page of
 * the static export.
 *
 * GitHub Pages cannot set response headers, so the policy has to travel inside
 * the document. The meta form cannot express `frame-ancestors`, `report-to` or
 * `sandbox` — clickjacking is therefore NOT addressed here; that needs a proxy
 * in front of the origin. See SECURITY-CSP-BRIEF.md.
 *
 * Hashes rather than 'unsafe-inline' because Next's hydration payloads
 * (`self.__next_f.push([...])`) change bytes on every build — hashing them
 * after the export is the only way to keep a strict policy that does not go
 * stale. `output: 'export'` rules out nonces, which need a per-request server.
 */
import { createHash } from 'node:crypto';
import { readFile, writeFile, readdir } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT_DIR = fileURLToPath(new URL('../out/', import.meta.url));

// Matches inline <script> blocks only — anything carrying a `src` is an
// external fetch governed by the host allowlist, not by a hash.
const INLINE_SCRIPT = /<script(?![^>]*\ssrc[\s=])([^>]*)>([\s\S]*?)<\/script>/gi;

// The policy must appear before the first resource it governs. Next always
// emits the charset meta first and that one has to stay inside the first 1024
// bytes, so the CSP slots in directly behind it.
const HEAD_ANCHOR = /(<head[^>]*>\s*(?:<meta\s+charSet=(?:"[^"]*"|'[^']*')\s*\/?>)?)/i;

function policy(hashes) {
  const scriptSrc = ["'self'", "'wasm-unsafe-eval'", ...hashes];
  return [
    `default-src 'self'`,
    `script-src ${scriptSrc.join(' ')}`,
    // React and Framer Motion write style="" attributes directly onto elements
    // (114 of them on the home page alone). Removing that would mean rewriting
    // the animation layer; inline styles are a far weaker vector than scripts.
    `style-src 'self' 'unsafe-inline'`,
    // data: for the film-grain SVG in globals.css, blob: for three.js textures.
    `img-src 'self' data: blob:`,
    `font-src 'self'`,
    `connect-src 'self' data: blob:`,
    `worker-src 'self' blob:`,
    `media-src 'self'`,
    `manifest-src 'self'`,
    `object-src 'none'`,
    `base-uri 'self'`,
    // No form is ever submitted — the contact form only opens a wa.me URL.
    `form-action 'none'`,
    `upgrade-insecure-requests`,
  ].join('; ');
}

async function htmlFiles(dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) found.push(...(await htmlFiles(full)));
    else if (entry.name.endsWith('.html')) found.push(full);
  }
  return found;
}

async function applyTo(file) {
  const html = await readFile(file, 'utf8');

  // Running twice over the same out/ would otherwise stack a second policy,
  // and two CSP tags intersect rather than replace — the page would break.
  if (/http-equiv="Content-Security-Policy"/i.test(html)) return 'already';

  // A script element's content is raw text — the parser does not decode
  // entities inside it — so the bytes on disk are exactly what gets hashed.
  const hashes = new Set();
  for (const [, , body] of html.matchAll(INLINE_SCRIPT)) {
    if (body.length === 0) continue;
    hashes.add(`'sha256-${createHash('sha256').update(body, 'utf8').digest('base64')}'`);
  }

  const meta =
    `<meta http-equiv="Content-Security-Policy" content="${policy([...hashes])}"/>`;

  if (!HEAD_ANCHOR.test(html)) {
    // Verification files (Google Search Console and the like) land in out/
    // with an .html name but no markup. Nothing in them to govern.
    if (!/<html[\s>]/i.test(html)) return 'not-html';
    throw new Error(`No <head> found in ${file} — cannot place the policy.`);
  }
  await writeFile(file, html.replace(HEAD_ANCHOR, `$1${meta}`), 'utf8');
  return hashes.size;
}

const files = await htmlFiles(OUT_DIR);
if (files.length === 0) throw new Error(`No HTML under ${OUT_DIR} — did the export run?`);

let patched = 0;
for (const file of files.sort()) {
  const count = await applyTo(file);
  if (typeof count === 'string') {
    const why = count === 'already' ? 'already carries a policy' : 'not an HTML document';
    console.log(`  csp: ${relative(OUT_DIR, file)} — skipped, ${why}`);
    continue;
  }
  patched += 1;
  console.log(`  csp: ${relative(OUT_DIR, file)} (${count} inline script hash${count === 1 ? '' : 'es'})`);
}
console.log(`CSP meta injected into ${patched} page${patched === 1 ? '' : 's'}.`);
