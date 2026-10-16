// SPDX-FileCopyrightText: Contributors to the Gardener project
//
// SPDX-License-Identifier: Apache-2.0
//
// Strips root-level <script> and <style> blocks from the body of every
// managed file, closing the VitePress SSR code-execution vectors documented
// in the security audit (B1/B2/B3). Must run AFTER part-banner and BEFORE
// part-3 (which adds its own safe <script setup> block to API reference files).
//
// "Root-level" means the tag appears outside fenced code blocks (``` or ~~~).
// Markers inside fences are documentation artefacts and are left untouched.
//
// Detection: isFileManaged() checks for key presence of `github_repo` rather
// than its value, and for `auto_generated === true`. This prevents two bypass
// vectors:
//   1. An upstream file with `local: true` in frontmatter — classify() would
//      have returned 'local' and skipped sanitization entirely.
//   2. An upstream file with `github_repo: ""` / null / false — docforge's
//      mergeProtectingRoundTrip preserves the key with any value, so a
//      truthiness check would also skip the file.
// See: gardener/docforge — pkg/nodeplugins/markdown/document/frontmatter/
//      frontmatter.go, mergeProtectingRoundTrip()
//
// Usage:
//   node post-processing/part-sanitize.js [base-path]

import fs from 'node:fs/promises';
import path from 'node:path';
import { read, write } from './lib/frontmatter.js';
import { splitLeadingBanner } from './lib/banner.js';
import { stripScriptStyleBlocks } from './lib/strip-scripts.js';

// Exported for testing. A file is managed if docforge wrote a github_repo key
// (any value — including empty string, null, or false) or if post-processing
// created it as a navigation stub (auto_generated: true).
// Note: the `local: true` escape hatch introduced in b82cb701 is intentionally
// NOT checked here — upstream authors control that field and could use it to
// bypass sanitization. classify() in lib/banner.js is unchanged and continues
// to honour local:true for banner rendering and other purposes.
export function isFileManaged(data) {
  return Object.prototype.hasOwnProperty.call(data, 'github_repo')
      || data.auto_generated === true;
}

const BASE_PATH = process.argv[2] ?? './hugo/content/';
const IGNORE_DIRS = new Set(['node_modules', '.git', 'dist', 'build']);

// Guard: only run when executed directly, not when imported by tests.
if (import.meta.url === new URL(process.argv[1], 'file://').href) {
  await main();
}

async function main() {
  const files = await collectMarkdownFiles(BASE_PATH);
  let totalStripped = 0;

  for (const filePath of files) {
    try {
      const parsed = read(filePath);

      if (!isFileManaged(parsed.data)) continue;

      const { banner, rest } = splitLeadingBanner(parsed.content.trimStart());
      const { stripped, removed } = stripScriptStyleBlocks(rest);

      if (removed.length === 0) continue;

      totalStripped += removed.length;
      const newContent = banner !== null
        ? `${banner}\n${stripped}`
        : stripped;

      write(filePath, newContent, parsed.data);

      const rel = path.relative(BASE_PATH, filePath);
      for (const block of removed) {
        console.log(`sanitize: removed ${block.tag} (${block.lines} lines) from ${rel}`);
      }
    } catch (err) {
      if (err.code === 'ENOENT') {
        console.warn(`sanitize: skipping missing file ${filePath}`);
      } else {
        console.error(`sanitize: error processing ${filePath}: ${err.message}`);
      }
    }
  }

  if (totalStripped > 0) {
    console.log(`sanitize: removed ${totalStripped} block(s) total.`);
  } else {
    console.log('sanitize: no <script>/<style> blocks found in managed files.');
  }
}

async function collectMarkdownFiles(dir) {
  const results = [];
  const entries = await fs.readdir(dir, { withFileTypes: true }).catch(() => []);
  for (const entry of entries) {
    if (IGNORE_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...await collectMarkdownFiles(full));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      results.push(full);
    }
  }
  return results;
}
