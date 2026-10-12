// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company and Gardener contributors
//
// SPDX-License-Identifier: Apache-2.0
//
// Strips root-level <script> and <style> blocks from the body of every
// managed file, closing the VitePress SSR code-execution vectors documented
// in the security audit (B1/B2/B3). Must run AFTER part-banner (so
// classify() sees the current frontmatter) and BEFORE part-3 (which adds
// its own safe <script setup> block to API reference files).
//
// "Root-level" means the tag appears outside fenced code blocks (``` or ~~~).
// Markers inside fences are documentation artefacts and are left untouched.
//
// Detection: uses classify() from lib/banner.js — the single source of truth
// that part-banner already uses — so local:true files are never sanitized
// even if they still carry a stale BANNER:MANAGED marker.
//
// Usage:
//   node post-processing/part-sanitize.js [base-path]

import fs from 'node:fs/promises';
import path from 'node:path';
import { read, write } from './lib/frontmatter.js';
import { classify, splitLeadingBanner } from './lib/banner.js';
import { stripScriptStyleBlocks } from './lib/strip-scripts.js';

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

      if (classify(parsed.data, parsed.content, filePath) !== 'managed') continue;

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
