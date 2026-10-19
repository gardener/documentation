// SPDX-FileCopyrightText: Contributors to the Gardener project
//
// SPDX-License-Identifier: Apache-2.0
//
// Strips <script> and <style> blocks from the body of every managed file by
// running the body through VitePress's own markdown renderer and detecting
// blocks that VitePress would hoist into env.sfcBlocks. This catches all
// vectors the VitePress sfcPlugin recognises — split tags, blockquote-wrapped
// blocks, list-wrapped blocks, and trailing-space closing tags — without
// maintaining a parallel regex parser.
//
// NOTE: This script is NOT idempotent over already-processed content. When run
// after part-3 (which adds a <script setup> block to API reference files), the
// sanitizer will detect and remove those blocks. It is designed to run on fresh
// docforge output, before part-3. Correct order (see Makefile):
//   part-1 → part-2 → part-index → part-banner → part-sanitize → part-3
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
// Fail-closed: any processing error (including a failed post-condition check)
// overwrites the file with a placeholder so dangerous content is never left
// in place. ENOENT is the only exception — a missing file has no content at
// risk and returns 'skipped'.
//
// Usage:
//   node post-processing/part-sanitize.js [base-path]

import fs from 'node:fs/promises';
import { existsSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { resolveConfig, createMarkdownRenderer } from 'vitepress';
import { read, write } from './lib/frontmatter.js';
import { splitLeadingBanner } from './lib/banner.js';

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

// Initialises a VitePress MarkdownRenderer using resolveConfig so the full
// site config (including all languageAlias settings) is honoured. The
// html_block renderer rule is wrapped once to record tokens that the
// sfcPlugin would hoist: a token is hoisted when env.sfcBlocks grows after
// the original rule returns.
export async function createRenderer() {
  const config = await resolveConfig(process.cwd(), 'build', 'production');
  const md = await createMarkdownRenderer(
    config.srcDir,
    config.markdown,
    config.site?.base ?? '/',
    config.logger
  );

  const origHtmlBlock = md.renderer.rules.html_block;
  md.renderer.rules.html_block = (tokens, idx, opts, env, self) => {
    const sfc = env.sfcBlocks ?? {};
    const before = (sfc.scripts?.length ?? 0)
      + (sfc.styles?.length ?? 0)
      + (sfc.customBlocks?.length ?? 0);
    const result = origHtmlBlock(tokens, idx, opts, env, self);
    const sfc2 = env.sfcBlocks ?? {};
    const after = (sfc2.scripts?.length ?? 0)
      + (sfc2.styles?.length ?? 0)
      + (sfc2.customBlocks?.length ?? 0);
    if (after > before) {
      env._hoistedTokens ??= [];
      env._hoistedTokens.push(tokens[idx]);
    }
    return result;
  };
  return md;
}

// Returns markdown-it token objects for html_block tokens that VitePress would
// hoist into env.sfcBlocks. token.map = [startLine, endLine] (0-indexed,
// exclusive end) relative to the start of body.
export function detectHoistedBlocks(body, md) {
  const env = {};
  md.render(body, env);
  return env._hoistedTokens ?? [];
}

// Removes the line ranges covered by the given tokens from body. Processes
// ranges in descending order so earlier line numbers stay valid during splicing.
export function removeHoistedLines(body, tokens) {
  const lines = body.split('\n');
  const ranges = tokens.map(t => t.map).sort((a, b) => b[0] - a[0]);
  for (const [start, end] of ranges) {
    lines.splice(start, end - start);
  }
  return lines.join('\n');
}

const PLACEHOLDER = '<!-- Content removed by sanitizer. -->';
// Minimal fallback used when the original frontmatter cannot be parsed.
const FALLBACK_FILE = `---\ntitle: Content removed\n---\n\n${PLACEHOLDER}\n`;

// Processes one file. Always returns { status, count } where status is one of:
//   'unchanged' — file not managed, or no hoistable blocks found
//   'sanitized' — blocks removed; count > 0
//   'failed'    — error during processing; placeholder written; exitCode set to 1
//   'skipped'   — file does not exist (ENOENT)
export async function sanitizeFile(filePath, md, basePath) {
  if (!existsSync(filePath)) return { status: 'skipped', count: 0 };

  const rel = path.relative(basePath, filePath);

  // Phase 1 — parse. Without valid frontmatter we have no data object for
  // write(), so we fall back to FALLBACK_FILE and write it directly.
  let parsed;
  try {
    parsed = read(filePath);
  } catch (err) {
    console.error(`sanitize: parse error in ${rel}: ${err.message}`);
    try {
      writeFileSync(filePath, FALLBACK_FILE, 'utf-8');
    } catch (writeErr) {
      console.error(`sanitize: CRITICAL: could not write placeholder for ${rel}: ${writeErr.message}`);
    }
    process.exitCode = 1;
    return { status: 'failed', count: 0 };
  }

  if (!isFileManaged(parsed.data)) return { status: 'unchanged', count: 0 };

  // Phase 2 — detect and remove. On any failure (including a post-condition
  // check that finds blocks still hoistable after removal) overwrite with a
  // placeholder that preserves the original frontmatter and banner so the file
  // is valid but stripped of all body content.
  const { banner, rest } = splitLeadingBanner(parsed.content.trimStart());

  try {
    const tokens = detectHoistedBlocks(rest, md);
    if (tokens.length === 0) {
      // Check the rendered HTML for literal <script>/<style> tags. Tags inside
      // fenced code blocks are HTML-escaped by markdown-it (&lt;script&gt;) and
      // do not match. Tags the sfcPlugin cannot hoist — an unclosed <script>,
      // a <div>-wrapped script, etc. — remain literal and would cause a Vue
      // compiler error during the VitePress build.
      const renderedHtml = md.render(rest, {});
      if (/<(?:script|style)\b/i.test(renderedHtml)) {
        throw new Error('unrecognized <script>/<style> in rendered output');
      }
      return { status: 'unchanged', count: 0 };
    }

    const stripped = removeHoistedLines(rest, tokens);

    const remaining = detectHoistedBlocks(stripped, md);
    if (remaining.length > 0) {
      throw new Error(`${remaining.length} block(s) still hoistable after removal`);
    }

    // Same HTML check as the zero-token branch: catch non-hoistable tags
    // (e.g. <div>-wrapped scripts) that survived the removal step.
    const strippedHtml = md.render(stripped, {});
    if (/<(?:script|style)\b/i.test(strippedHtml)) {
      throw new Error('unrecognized <script>/<style> in rendered output after removal');
    }

    const newContent = banner !== null ? `${banner}\n${stripped}` : stripped;
    write(filePath, newContent, parsed.data);

    for (const token of tokens) {
      const tag = token.content.match(/<(script|style)/i)?.[1]?.toLowerCase() ?? 'unknown';
      console.log(`sanitize: removed <${tag}> (${token.map[1] - token.map[0]} lines) from ${rel}`);
    }
    return { status: 'sanitized', count: tokens.length };

  } catch (err) {
    console.error(`sanitize: error in ${rel}: ${err.message}`);
    const body = banner !== null ? `${banner}\n${PLACEHOLDER}` : PLACEHOLDER;
    try {
      write(filePath, body, parsed.data);
    } catch (writeErr) {
      console.error(`sanitize: CRITICAL: could not write placeholder for ${rel}: ${writeErr.message}`);
    }
    process.exitCode = 1;
    return { status: 'failed', count: 0 };
  }
}

const BASE_PATH = process.argv[2] ?? './hugo/content/';
const IGNORE_DIRS = new Set(['node_modules', '.git', 'dist', 'build']);

if (import.meta.url === new URL(process.argv[1], 'file://').href) {
  await main();
}

async function main() {
  const md = await createRenderer();
  const files = await collectMarkdownFiles(BASE_PATH);
  let totalBlocks = 0;

  for (const filePath of files) {
    const { status, count } = await sanitizeFile(filePath, md, BASE_PATH);
    if (status === 'sanitized') totalBlocks += count;
  }

  if (totalBlocks > 0) {
    console.log(`sanitize: removed ${totalBlocks} block(s) total.`);
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
