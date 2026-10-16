// SPDX-FileCopyrightText: Contributors to the Gardener project
//
// SPDX-License-Identifier: Apache-2.0

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { promises as fs } from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import {
  isFileManaged,
  createRenderer,
  detectHoistedBlocks,
  removeHoistedLines,
  sanitizeFile,
} from '../part-sanitize.js';
import { read, write } from './frontmatter.js';

// Shared renderer — one resolveConfig call for the whole test file.
const md = await createRenderer();

async function tmpDir() {
  return fs.mkdtemp(path.join(os.tmpdir(), 'sanitize-test-'));
}

// ── Managed: github_repo key present (any value) ─────────────────────────────

test('isFileManaged: github_repo with URL → managed', () => {
  assert.equal(isFileManaged({ github_repo: 'https://github.com/gardener/gardener' }), true);
});

test('isFileManaged: github_repo with local:true → managed (upstream bypass blocked)', () => {
  assert.equal(isFileManaged({ github_repo: 'https://github.com/gardener/gardener', local: true }), true);
});

test('isFileManaged: github_repo: "" → managed (falsy key still present)', () => {
  assert.equal(isFileManaged({ github_repo: '' }), true);
});

test('isFileManaged: github_repo: null → managed (null key still present)', () => {
  assert.equal(isFileManaged({ github_repo: null }), true);
});

test('isFileManaged: github_repo: false → managed (false key still present)', () => {
  assert.equal(isFileManaged({ github_repo: false }), true);
});

// ── Managed: auto_generated stub ─────────────────────────────────────────────

test('isFileManaged: auto_generated:true → managed (navigation stub)', () => {
  assert.equal(isFileManaged({ auto_generated: true }), true);
});

// ── Local: no github_repo key, no auto_generated ─────────────────────────────

test('isFileManaged: empty frontmatter → not managed', () => {
  assert.equal(isFileManaged({}), false);
});

test('isFileManaged: local:true only → not managed', () => {
  assert.equal(isFileManaged({ local: true }), false);
});

test('isFileManaged: local file with title → not managed', () => {
  assert.equal(isFileManaged({ title: 'Contributing', description: 'How to contribute' }), false);
});

test('isFileManaged: auto_generated:false → not managed', () => {
  assert.equal(isFileManaged({ auto_generated: false }), false);
});

// ── VitePress bypass vectors — detectHoistedBlocks ───────────────────────────
// The 8 cases from the comparison table, tested against the real VitePress
// renderer loaded via resolveConfig.

// Case 1: normal SFC block — hoisted
test('bypass case 1: normal <script setup> block is hoisted', () => {
  const body = '<script setup>\nconsole.log(1)\n</script>\n';
  const tokens = detectHoistedBlocks(body, md);
  assert.equal(tokens.length, 1, 'normal SFC block must be detected');
  const cleaned = removeHoistedLines(body, tokens);
  assert.equal(detectHoistedBlocks(cleaned, md).length, 0, 'post-removal must be clean');
});

// Case 2: unclosed block — NOT hoisted (VitePress sfcRegexp requires closing tag)
test('bypass case 2: unclosed <script setup> (no </script>) is NOT hoisted', () => {
  const body = "<script setup>console.log('xss!')\n";
  assert.equal(detectHoistedBlocks(body, md).length, 0, 'unclosed block must not be hoisted');
});

// Case 3: split opening tag — hoisted (sfcRegexp uses dotAll `s` flag)
test('bypass case 3: <script\\nsetup> split-tag is hoisted', () => {
  const body = '<script\nsetup>\nconsole.log(1)\n</script>\n';
  const tokens = detectHoistedBlocks(body, md);
  assert.equal(tokens.length, 1, 'split-tag block must be detected');
  const cleaned = removeHoistedLines(body, tokens);
  assert.equal(detectHoistedBlocks(cleaned, md).length, 0, 'post-removal must be clean');
});

// Case 4: blockquote-wrapped — hoisted (sfcPlugin wraps the html_block rule
// which fires for nested tokens inside blockquotes)
test('bypass case 4: blockquote-wrapped <script setup> is hoisted', () => {
  const body = '> <script setup>\n> console.log(1)\n> </script>\n';
  const tokens = detectHoistedBlocks(body, md);
  assert.equal(tokens.length, 1, 'blockquote-wrapped block must be detected');
  const cleaned = removeHoistedLines(body, tokens);
  assert.equal(detectHoistedBlocks(cleaned, md).length, 0, 'post-removal must be clean');
});

// Case 5: bullet-list-wrapped — hoisted
test('bypass case 5: bullet-list <script setup> is hoisted', () => {
  const body = '- <script setup>\n  console.log(1)\n  </script>\n';
  const tokens = detectHoistedBlocks(body, md);
  assert.equal(tokens.length, 1, 'list-wrapped block must be detected');
  const cleaned = removeHoistedLines(body, tokens);
  assert.equal(detectHoistedBlocks(cleaned, md).length, 0, 'post-removal must be clean');
});

// Case 6: numbered-list-wrapped — hoisted (same mechanism as bullet list)
test('bypass case 6: numbered-list <script setup> is hoisted', () => {
  const body = '1. <script setup>\n   console.log(1)\n   </script>\n';
  const tokens = detectHoistedBlocks(body, md);
  assert.equal(tokens.length, 1, 'numbered-list-wrapped block must be detected');
  const cleaned = removeHoistedLines(body, tokens);
  assert.equal(detectHoistedBlocks(cleaned, md).length, 0, 'post-removal must be clean');
});

// Case 7: <div>-wrapped single-line — NOT hoisted (sfcRegexp requires token to
// start with <script|style>, outer <div> prevents the match)
test('bypass case 7: <div>-wrapped <script setup> on one line is NOT hoisted', () => {
  const body = '<div><script setup>x</script></div>\n';
  assert.equal(detectHoistedBlocks(body, md).length, 0, '<div>-wrapped block must not be hoisted');
});

// Case 8: trailing space in closing tag — hoisted (sfcRegexp closer is `\s*>`)
test('bypass case 8: </script > trailing-space closing tag is hoisted', () => {
  const body = '<script setup>x</script >\n';
  const tokens = detectHoistedBlocks(body, md);
  assert.equal(tokens.length, 1, 'trailing-space closing tag must be detected');
  const cleaned = removeHoistedLines(body, tokens);
  assert.equal(detectHoistedBlocks(cleaned, md).length, 0, 'post-removal must be clean');
});

// ── Fenced code preservation ──────────────────────────────────────────────────

test('detect: <script> inside ```html fenced block is NOT hoisted', () => {
  const body = '```html\n<script>\ndocument.title = "pwned"\n</script>\n```\n';
  assert.equal(detectHoistedBlocks(body, md).length, 0, 'fenced content must not be hoisted');
});

test('detect: <script> inside ~~~ fenced block is NOT hoisted', () => {
  const body = '~~~html\n<script>bad()</script>\n~~~\n';
  assert.equal(detectHoistedBlocks(body, md).length, 0, 'tilde-fenced content must not be hoisted');
});

// ── Normal content: not affected ─────────────────────────────────────────────

test('detect: normal markdown paragraph → not hoisted', () => {
  const body = '# Heading\n\nSome paragraph text.\n\n- item one\n- item two\n';
  assert.equal(detectHoistedBlocks(body, md).length, 0, 'plain markdown must not be hoisted');
});

test('detect: inline code containing script tag → not hoisted', () => {
  const body = 'Use `<script setup>` to register components.\n';
  assert.equal(detectHoistedBlocks(body, md).length, 0, 'inline code must not be hoisted');
});

// ── removeHoistedLines ────────────────────────────────────────────────────────

test('removeHoistedLines: preserves content before and after removed block', () => {
  const body = 'before\n<script setup>\nbad()\n</script>\nafter\n';
  const tokens = detectHoistedBlocks(body, md);
  assert.equal(tokens.length, 1);
  const cleaned = removeHoistedLines(body, tokens);
  assert.ok(!cleaned.includes('bad()'), 'script body must be removed');
  assert.ok(cleaned.includes('before'), 'content before block must survive');
  assert.ok(cleaned.includes('after'), 'content after block must survive');
});

test('removeHoistedLines: removes multiple non-overlapping blocks', () => {
  const body = '<script setup>\nfoo()\n</script>\ntext\n<style>\nbody{}\n</style>\nend\n';
  const tokens = detectHoistedBlocks(body, md);
  assert.equal(tokens.length, 2, 'both blocks must be detected');
  const cleaned = removeHoistedLines(body, tokens);
  assert.ok(!cleaned.includes('foo()'), 'script body must be removed');
  assert.ok(!cleaned.includes('body{}'), 'style body must be removed');
  assert.ok(cleaned.includes('text'), 'text between blocks must survive');
  assert.ok(cleaned.includes('end'), 'text after blocks must survive');
  assert.equal(detectHoistedBlocks(cleaned, md).length, 0, 'post-removal must be clean');
});

// ── sanitizeFile: normal flow ─────────────────────────────────────────────────

test('sanitizeFile: unchanged on non-managed file (no github_repo key)', async () => {
  const dir = await tmpDir();
  const filePath = path.join(dir, 'local.md');
  await fs.writeFile(filePath, '---\ntitle: Local\n---\n\n# Content\n', 'utf-8');
  const result = await sanitizeFile(filePath, md, dir);
  assert.equal(result.status, 'unchanged');
  assert.equal(result.count, 0);
});

test('sanitizeFile: unchanged on managed file with no hoistable blocks', async () => {
  const dir = await tmpDir();
  const filePath = path.join(dir, 'clean.md');
  await fs.writeFile(filePath, [
    '---',
    'github_repo: https://github.com/gardener/gardener',
    '---',
    '',
    '<p>Hello</p>',
    '',
    '```html',
    '<script>safe in fence</script>',
    '```',
  ].join('\n') + '\n', 'utf-8');
  const result = await sanitizeFile(filePath, md, dir);
  assert.equal(result.status, 'unchanged');
  assert.equal(result.count, 0);
});

test('sanitizeFile: sanitized — removes script, count correct, disk content clean', async () => {
  const dir = await tmpDir();
  const filePath = path.join(dir, 'attack.md');
  // The <script setup> block must be separated from surrounding HTML by a blank
  // line so markdown-it creates an isolated html_block token for it. Without the
  // blank line, the preceding <p> tag and the script would be merged into one
  // token that starts with <p>, which the sfcRegexp does not match.
  await fs.writeFile(filePath, [
    '---',
    'github_repo: https://github.com/gardener/gardener',
    'title: Attack',
    '---',
    '',
    '<p>Packages:</p>',
    '',
    '<script setup>',
    'malicious()',
    '</script>',
    '',
    '<ul><li>v1</li></ul>',
  ].join('\n') + '\n', 'utf-8');

  const result = await sanitizeFile(filePath, md, dir);
  assert.equal(result.status, 'sanitized');
  assert.equal(result.count, 1);

  const rawAfter = await fs.readFile(filePath, 'utf-8');
  assert.ok(!rawAfter.includes('malicious()'), 'script body must not appear in output');
  assert.ok(rawAfter.includes('<p>Packages:</p>'), 'surrounding HTML must survive');
  assert.ok(rawAfter.includes('<ul>'), 'surrounding HTML must survive');
  assert.ok(rawAfter.includes('github_repo:'), 'frontmatter must be preserved');
});

test('sanitizeFile: skipped on missing file', async () => {
  const result = await sanitizeFile('/nonexistent/path/file.md', md, '/nonexistent');
  assert.equal(result.status, 'skipped');
  assert.equal(result.count, 0);
});

// ── sanitizeFile: fail-closed (with disk checks) ──────────────────────────────

test('sanitizeFile fail-closed: post-condition failure writes placeholder to disk', async () => {
  const dir = await tmpDir();
  const filePath = path.join(dir, 'stuck.md');
  await fs.writeFile(filePath, [
    '---',
    'github_repo: https://github.com/gardener/gardener',
    'title: Stuck',
    '---',
    '',
    '<script setup>',
    'persistent()',
    '</script>',
  ].join('\n') + '\n', 'utf-8');

  // Fake renderer: always reports a hoisted token regardless of body content.
  // This makes the post-condition check always fail.
  const fakeMd = {
    render(body, env) {
      env._hoistedTokens = [{ content: '<script setup>persistent</script>', map: [0, 1] }];
    },
  };

  const prevExitCode = process.exitCode;
  const result = await sanitizeFile(filePath, fakeMd, dir);
  process.exitCode = prevExitCode; // restore so test suite exit code is clean

  assert.equal(result.status, 'failed');
  assert.equal(result.count, 0);

  const rawAfter = await fs.readFile(filePath, 'utf-8');
  assert.ok(rawAfter.includes('<!-- Content removed by sanitizer. -->'), 'placeholder must be written');
  assert.ok(rawAfter.includes('title: Stuck'), 'original frontmatter must be preserved');
  assert.ok(!rawAfter.includes('persistent()'), 'original script body must not survive');
});

test('sanitizeFile fail-closed: parse error writes minimal placeholder to disk', async () => {
  const dir = await tmpDir();
  const filePath = path.join(dir, 'badyaml.md');
  // ---js frontmatter triggers the custom JS-eval-disabled engine in read()
  await fs.writeFile(filePath, '---js\nconst x = 1;\n---\ncontent\n', 'utf-8');

  const prevExitCode = process.exitCode;
  const result = await sanitizeFile(filePath, md, dir);
  process.exitCode = prevExitCode;

  assert.equal(result.status, 'failed');
  assert.equal(result.count, 0);

  const rawAfter = await fs.readFile(filePath, 'utf-8');
  assert.ok(rawAfter.includes('title: Content removed'), 'minimal frontmatter must be written');
  assert.ok(rawAfter.includes('<!-- Content removed by sanitizer. -->'), 'placeholder body must be written');
  assert.ok(!rawAfter.includes('const x = 1'), 'original content must not survive');
});

// ── CI order integration ──────────────────────────────────────────────────────
// These tests verify the expected behaviour at the pipeline level:
//   delete-managed-banner → docforge → [fresh raw HTML body]
//   → part-sanitize (this script) → part-3 (adds its own <script setup>)

test('CI order: sanitize is a no-op on fresh docforge output (raw HTML, no script)', async () => {
  const dir = await tmpDir();
  const filePath = path.join(dir, 'api.md');
  await fs.writeFile(filePath, [
    '---',
    'github_repo: https://github.com/gardener/gardener',
    'title: API',
    '---',
    '<!-- BANNER:MANAGED -->',
    '<!--',
    ' managed banner comment',
    '-->',
    '',
    '<p>Packages:</p>',
    '<ul><li>v1</li></ul>',
  ].join('\n') + '\n', 'utf-8');

  const rawBefore = await fs.readFile(filePath, 'utf-8');
  const result = await sanitizeFile(filePath, md, dir);

  assert.equal(result.status, 'unchanged', 'fresh docforge output has no script/style to strip');
  assert.equal(result.count, 0);
  // File must not have been touched
  const rawAfter = await fs.readFile(filePath, 'utf-8');
  assert.equal(rawAfter, rawBefore, 'file must be byte-identical after no-op run');
});

test('CI order: managed file with attacker <script> — sanitize strips it, HTML survives for part-3', async () => {
  const dir = await tmpDir();
  const filePath = path.join(dir, 'api.md');
  await fs.writeFile(filePath, [
    '---',
    'github_repo: https://github.com/gardener/gardener',
    'title: API',
    '---',
    '<!-- BANNER:MANAGED -->',
    '<!--',
    ' managed banner comment',
    '-->',
    '',
    '<p>Packages:</p>',
    '',
    '<script>',
    'malicious()',
    '</script>',
    '',
    '<ul><li>v1</li></ul>',
  ].join('\n') + '\n', 'utf-8');

  const result = await sanitizeFile(filePath, md, dir);
  assert.equal(result.status, 'sanitized');
  assert.equal(result.count, 1);

  const rawAfter = await fs.readFile(filePath, 'utf-8');
  assert.ok(!rawAfter.includes('malicious()'), 'attacker script must be gone');
  assert.ok(rawAfter.includes('<p>Packages:</p>'), 'HTML content must survive for part-3');
  assert.ok(rawAfter.includes('<ul>'), 'HTML content must survive for part-3');
  assert.ok(rawAfter.includes('<!-- BANNER:MANAGED -->'), 'banner must survive');
});

test('sanitizer fence-awareness: <script> in ```html block — byte-identical after sanitize', async () => {
  const dir = await tmpDir();
  const filePath = path.join(dir, 'fence.md');
  await fs.writeFile(filePath, [
    '---',
    'github_repo: https://github.com/gardener/gardener',
    'title: Fenced',
    '---',
    '',
    'Here is an example:',
    '',
    '```html',
    '<script>',
    'document.addEventListener("DOMContentLoaded", () => console.log("hi"))',
    '</script>',
    '```',
    '',
    'End.',
  ].join('\n') + '\n', 'utf-8');

  const rawBefore = await fs.readFile(filePath, 'utf-8');
  const result = await sanitizeFile(filePath, md, dir);

  assert.equal(result.status, 'unchanged', '<script> inside fenced block must not be stripped');
  const rawAfter = await fs.readFile(filePath, 'utf-8');
  assert.equal(rawAfter, rawBefore, 'file must be byte-identical');
});

test('sanitizer fence-awareness: same <script> at root level IS stripped', async () => {
  const dir = await tmpDir();
  const filePath = path.join(dir, 'root.md');
  await fs.writeFile(filePath, [
    '---',
    'github_repo: https://github.com/gardener/gardener',
    'title: Root',
    '---',
    '',
    'Here is an example:',
    '',
    '<script>',
    'document.addEventListener("DOMContentLoaded", () => console.log("hi"))',
    '</script>',
    '',
    'End.',
  ].join('\n') + '\n', 'utf-8');

  const result = await sanitizeFile(filePath, md, dir);
  assert.equal(result.status, 'sanitized', 'root-level <script> must be stripped');
  assert.equal(result.count, 1);

  const rawAfter = await fs.readFile(filePath, 'utf-8');
  assert.ok(!rawAfter.includes('DOMContentLoaded'), 'script body must not appear in output');
  assert.ok(rawAfter.includes('End.'), 'surrounding content must survive');
});

// ── sanitizeFile: end-to-end per bypass vector ────────────────────────────────
// For each vector that IS hoisted (cases 1, 3, 4, 5, 6, 8): create a managed
// file with content before and after the block, run sanitizeFile, and verify:
//   - status === 'sanitized'
//   - script body gone from disk
//   - no placeholder written (post-condition passed)
//   - surrounding content survived

test('sanitizeFile E2E: case 1 — normal <script setup> stripped, surrounding content survives', async () => {
  const dir = await tmpDir();
  const filePath = path.join(dir, 'e2e-case1.md');
  await fs.writeFile(filePath, [
    '---',
    'github_repo: https://github.com/gardener/gardener',
    'title: E2E Case1',
    '---',
    '',
    '<p>Before</p>',
    '',
    '<script setup>',
    'malicious()',
    '</script>',
    '',
    '<p>After</p>',
  ].join('\n') + '\n', 'utf-8');

  const result = await sanitizeFile(filePath, md, dir);
  assert.equal(result.status, 'sanitized');
  assert.equal(result.count, 1);

  const rawAfter = await fs.readFile(filePath, 'utf-8');
  assert.ok(!rawAfter.includes('malicious()'), 'script body gone');
  assert.ok(!rawAfter.includes('<!-- Content removed by sanitizer. -->'), 'no placeholder — post-condition passed');
  assert.ok(rawAfter.includes('<p>Before</p>'), 'content before block survives');
  assert.ok(rawAfter.includes('<p>After</p>'), 'content after block survives');
});

test('sanitizeFile E2E: case 3 — split-tag <script\\nsetup> stripped, surrounding content survives', async () => {
  const dir = await tmpDir();
  const filePath = path.join(dir, 'e2e-case3.md');
  await fs.writeFile(filePath, [
    '---',
    'github_repo: https://github.com/gardener/gardener',
    'title: E2E Case3',
    '---',
    '',
    '<p>Before</p>',
    '',
    '<script',
    'setup>',
    'malicious()',
    '</script>',
    '',
    '<p>After</p>',
  ].join('\n') + '\n', 'utf-8');

  const result = await sanitizeFile(filePath, md, dir);
  assert.equal(result.status, 'sanitized');
  assert.equal(result.count, 1);

  const rawAfter = await fs.readFile(filePath, 'utf-8');
  assert.ok(!rawAfter.includes('malicious()'), 'script body gone');
  assert.ok(!rawAfter.includes('<!-- Content removed by sanitizer. -->'), 'no placeholder — post-condition passed');
  assert.ok(rawAfter.includes('<p>Before</p>'), 'content before block survives');
  assert.ok(rawAfter.includes('<p>After</p>'), 'content after block survives');
});

test('sanitizeFile E2E: case 4 — blockquote-wrapped <script setup> stripped, surrounding content survives', async () => {
  const dir = await tmpDir();
  const filePath = path.join(dir, 'e2e-case4.md');
  await fs.writeFile(filePath, [
    '---',
    'github_repo: https://github.com/gardener/gardener',
    'title: E2E Case4',
    '---',
    '',
    'Before paragraph.',
    '',
    '> <script setup>',
    '> malicious()',
    '> </script>',
    '',
    'After paragraph.',
  ].join('\n') + '\n', 'utf-8');

  const result = await sanitizeFile(filePath, md, dir);
  assert.equal(result.status, 'sanitized');
  assert.equal(result.count, 1);

  const rawAfter = await fs.readFile(filePath, 'utf-8');
  assert.ok(!rawAfter.includes('malicious()'), 'script body gone');
  assert.ok(!rawAfter.includes('<!-- Content removed by sanitizer. -->'), 'no placeholder — post-condition passed');
  assert.ok(rawAfter.includes('Before paragraph.'), 'content before block survives');
  assert.ok(rawAfter.includes('After paragraph.'), 'content after block survives');
});

test('sanitizeFile E2E: case 5 — bullet-list-wrapped <script setup> stripped, surrounding content survives', async () => {
  const dir = await tmpDir();
  const filePath = path.join(dir, 'e2e-case5.md');
  await fs.writeFile(filePath, [
    '---',
    'github_repo: https://github.com/gardener/gardener',
    'title: E2E Case5',
    '---',
    '',
    'Before paragraph.',
    '',
    '- <script setup>',
    '  malicious()',
    '  </script>',
    '',
    'After paragraph.',
  ].join('\n') + '\n', 'utf-8');

  const result = await sanitizeFile(filePath, md, dir);
  assert.equal(result.status, 'sanitized');
  assert.equal(result.count, 1);

  const rawAfter = await fs.readFile(filePath, 'utf-8');
  assert.ok(!rawAfter.includes('malicious()'), 'script body gone');
  assert.ok(!rawAfter.includes('<!-- Content removed by sanitizer. -->'), 'no placeholder — post-condition passed');
  assert.ok(rawAfter.includes('Before paragraph.'), 'content before block survives');
  assert.ok(rawAfter.includes('After paragraph.'), 'content after block survives');
});

test('sanitizeFile E2E: case 6 — numbered-list-wrapped <script setup> stripped, surrounding content survives', async () => {
  const dir = await tmpDir();
  const filePath = path.join(dir, 'e2e-case6.md');
  await fs.writeFile(filePath, [
    '---',
    'github_repo: https://github.com/gardener/gardener',
    'title: E2E Case6',
    '---',
    '',
    'Before paragraph.',
    '',
    '1. <script setup>',
    '   malicious()',
    '   </script>',
    '',
    'After paragraph.',
  ].join('\n') + '\n', 'utf-8');

  const result = await sanitizeFile(filePath, md, dir);
  assert.equal(result.status, 'sanitized');
  assert.equal(result.count, 1);

  const rawAfter = await fs.readFile(filePath, 'utf-8');
  assert.ok(!rawAfter.includes('malicious()'), 'script body gone');
  assert.ok(!rawAfter.includes('<!-- Content removed by sanitizer. -->'), 'no placeholder — post-condition passed');
  assert.ok(rawAfter.includes('Before paragraph.'), 'content before block survives');
  assert.ok(rawAfter.includes('After paragraph.'), 'content after block survives');
});

test('sanitizeFile E2E: case 8 — trailing-space </script > stripped, content before survives', async () => {
  const dir = await tmpDir();
  const filePath = path.join(dir, 'e2e-case8.md');
  // html_block type 1 ends at the FIRST line that CONTAINS the substring
  // </script> (case-insensitive), or at end of document. </script > (with
  // trailing space) does NOT contain </script>, so it does not end the block.
  // This test covers the simplest case: the block ends at EOF.
  // See the companion test below for the mid-file case.
  await fs.writeFile(filePath, [
    '---',
    'github_repo: https://github.com/gardener/gardener',
    'title: E2E Case8',
    '---',
    '',
    '<p>Before</p>',
    '',
    '<script setup>malicious()</script >',
  ].join('\n') + '\n', 'utf-8');

  const result = await sanitizeFile(filePath, md, dir);
  assert.equal(result.status, 'sanitized');
  assert.equal(result.count, 1);

  const rawAfter = await fs.readFile(filePath, 'utf-8');
  assert.ok(!rawAfter.includes('malicious()'), 'script body gone');
  assert.ok(!rawAfter.includes('<!-- Content removed by sanitizer. -->'), 'no placeholder — post-condition passed');
  assert.ok(rawAfter.includes('<p>Before</p>'), 'content before block survives');
});

test('sanitizeFile E2E: case 8b — </script > mid-file: absorbed by later </script>, Последен ред. survives', async () => {
  const dir = await tmpDir();
  const filePath = path.join(dir, 'e2e-case8b.md');
  // html_block type 1 opened by <script setup> continues until a line
  // containing </script> (without trailing space). </script > on line 2 does
  // NOT end the block, so the block extends and absorbs "Нормален текст." and
  // the bare <script></script> below it, stopping only at the </script> line.
  // The sfcRegexp matches the merged multi-line token (</script> is its last
  // closing tag). "Нормален текст." being removed along with the token is
  // expected — it was part of the same html_block.
  await fs.writeFile(filePath, [
    '---',
    'github_repo: https://github.com/gardener/gardener',
    'title: E2E Case8b',
    '---',
    '',
    '<script setup>',
    'payload()',
    '</script >',
    '',
    'Нормален текст.',
    '',
    '<script>',
    '</script>',
    '',
    'Последен ред.',
  ].join('\n') + '\n', 'utf-8');

  const result = await sanitizeFile(filePath, md, dir);
  assert.equal(result.status, 'sanitized');
  assert.equal(result.count, 1);

  const rawAfter = await fs.readFile(filePath, 'utf-8');
  assert.ok(!rawAfter.includes('payload()'), 'script body gone');
  assert.ok(!rawAfter.includes('<!-- Content removed by sanitizer. -->'), 'no placeholder — post-condition passed');
  assert.ok(rawAfter.includes('Последен ред.'), 'text after the absorbed block survives');
});
