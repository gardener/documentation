import { test } from 'node:test';
import assert from 'node:assert/strict';
import { promises as fs } from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { stripScriptStyleBlocks } from './strip-scripts.js';
import { classify } from './banner.js';
import { read, write } from './frontmatter.js';

// ---------------------------------------------------------------------------
// Unit tests for stripScriptStyleBlocks
// ---------------------------------------------------------------------------

test('stripScriptStyleBlocks: clean body returns empty removed list', () => {
  const { stripped, removed } = stripScriptStyleBlocks('<p>Hello</p>\n');
  assert.deepEqual(removed, []);
  assert.equal(stripped, '<p>Hello</p>\n');
});

test('stripScriptStyleBlocks: strips a root-level <script> block', () => {
  const body = 'before\n<script>\nmalicious()\n</script>\nafter\n';
  const { stripped, removed } = stripScriptStyleBlocks(body);
  assert.equal(removed.length, 1);
  assert.equal(removed[0].tag, '<script>');
  assert.ok(!stripped.includes('malicious('), 'malicious code must be removed');
  assert.ok(stripped.includes('before'), 'content before must survive');
  assert.ok(stripped.includes('after'), 'content after must survive');
});

test('stripScriptStyleBlocks: strips <script setup>', () => {
  const body = '<script setup>\nexecSync("id")\n</script>\n';
  const { stripped, removed } = stripScriptStyleBlocks(body);
  assert.equal(removed.length, 1);
  assert.equal(removed[0].tag, '<script>');
  assert.ok(!stripped.includes('execSync'), 'script body must be removed');
});

test('stripScriptStyleBlocks: strips <SCRIPT> case-insensitive', () => {
  const body = '<SCRIPT>\nmalicious()\n</SCRIPT>\n';
  const { stripped, removed } = stripScriptStyleBlocks(body);
  assert.equal(removed.length, 1);
  assert.ok(!stripped.includes('malicious('));
});

test('stripScriptStyleBlocks: strips a root-level <style> block', () => {
  const body = '<style>\nbody{color:red}\n</style>\n';
  const { removed } = stripScriptStyleBlocks(body);
  assert.equal(removed.length, 1);
  assert.equal(removed[0].tag, '<style>');
});

test('stripScriptStyleBlocks: strips inline single-line <script>...</script>', () => {
  const body = 'text\n<script>malicious()</script>\nmore\n';
  const { stripped, removed } = stripScriptStyleBlocks(body);
  assert.equal(removed.length, 1);
  assert.ok(!stripped.includes('malicious('));
  assert.ok(stripped.includes('more'));
});

test('stripScriptStyleBlocks: preserves <script> inside fenced code block', () => {
  const body = '```html\n<script>\nshould stay\n</script>\n```\n';
  const { stripped, removed } = stripScriptStyleBlocks(body);
  assert.deepEqual(removed, []);
  assert.ok(stripped.includes('should stay'), 'fenced content must survive');
});

test('stripScriptStyleBlocks: preserves <script> inside ~~~ fenced block', () => {
  const body = '~~~\n<script>stay</script>\n~~~\n';
  const { removed } = stripScriptStyleBlocks(body);
  assert.deepEqual(removed, []);
});

test('stripScriptStyleBlocks: strips multiple blocks', () => {
  const body = '<script>\nfoo()\n</script>\ntext\n<style>\nbody{}\n</style>\n';
  const { stripped, removed } = stripScriptStyleBlocks(body);
  assert.equal(removed.length, 2);
  assert.ok(!stripped.includes('foo()'));
  assert.ok(stripped.includes('text'));
});

test('stripScriptStyleBlocks: unterminated block at EOF is counted as removed', () => {
  const body = '<script>\ncontent without closing tag\n';
  const { removed } = stripScriptStyleBlocks(body);
  assert.equal(removed.length, 1);
});

// Old template-literal format (vulnerable) MUST be stripped.
test('stripScriptStyleBlocks: strips legacy template-literal apiHtml block', () => {
  const body = '<script setup>\nconst apiHtml = `<p>Hello</p>`;\n</script>\n';
  const { removed } = stripScriptStyleBlocks(body);
  assert.equal(removed.length, 1, 'legacy template literal block must be stripped');
});

// The sanitizer has NO exceptions: even the "safe" JSON format produced by part-3
// is stripped when seen in a managed file. This is correct because part-sanitize runs
// BEFORE part-3 in CI, so part-3's output is never seen by the sanitizer in production.
test('stripScriptStyleBlocks: strips <script setup> with safe JSON apiHtml (no exceptions)', () => {
  const body = '<script setup>\nconst apiHtml = "\\u003cp\\u003eHello\\u003c/p\\u003e";\n</script>\n';
  const { removed } = stripScriptStyleBlocks(body);
  assert.equal(removed.length, 1, 'even the safe JSON block is stripped — no exceptions');
});

// Safe pattern with extra code must also be stripped.
test('stripScriptStyleBlocks: strips <script setup> with apiHtml plus extra code', () => {
  const body = '<script setup>\nconst apiHtml = "safe";\nmalicious()\n</script>\n';
  const { removed } = stripScriptStyleBlocks(body);
  assert.equal(removed.length, 1, 'block with extra code must be stripped');
});

// ---- Fix 1: mid-line inline detection ----------------------------------------
// The old inline regex required the line to START with <script>. These tests
// confirm the hardened version catches injections anywhere on the line.

test('stripScriptStyleBlocks: strips mid-line </script><script>payload</script>', () => {
  const body = 'intro</script><script>globalThis.x=1</script>rest\n';
  const { stripped, removed } = stripScriptStyleBlocks(body);
  assert.equal(removed.length, 1, 'inline mid-line script must be removed');
  assert.ok(!stripped.includes('globalThis.x=1'), 'payload must be gone');
  assert.ok(stripped.includes('intro'), 'prefix text must survive');
  assert.ok(stripped.includes('rest'), 'suffix text must survive');
});

test('stripScriptStyleBlocks: strips multiple inline scripts on one line', () => {
  const body = '<script>a()</script>text<script>b()</script>\n';
  const { stripped, removed } = stripScriptStyleBlocks(body);
  assert.equal(removed.length, 2, 'both inline scripts must be removed');
  assert.ok(!stripped.includes('a()') && !stripped.includes('b()'));
  assert.ok(stripped.includes('text'), 'text between scripts must survive');
});

test('stripScriptStyleBlocks: mid-line inline <script> inside fenced block is preserved', () => {
  const body = '```html\nintro<script>inline()</script>rest\n```\n';
  const { removed } = stripScriptStyleBlocks(body);
  assert.deepEqual(removed, [], 'fenced content must survive unchanged');
});

// ---------------------------------------------------------------------------
// Integration: end-to-end CI order
// sanitize runs BEFORE part-3; the correct pipeline is:
//   delete-managed-banner → docforge → [fresh raw HTML body] → sanitize (no-op) → part-3
// ---------------------------------------------------------------------------

async function tmpDir() {
  return fs.mkdtemp(path.join(os.tmpdir(), 'sanitize-test-'));
}

test('CI order: sanitize is a no-op on fresh docforge output (raw HTML, no script)', async () => {
  const dir = await tmpDir();
  const filePath = path.join(dir, 'api.md');

  // Simulate what docforge produces: managed file with raw HTML body, no <script> yet.
  const raw = [
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
  ].join('\n') + '\n';
  await fs.writeFile(filePath, raw, 'utf-8');

  const parsed = read(filePath);
  assert.equal(classify(parsed.data, parsed.content, filePath), 'managed');

  const { splitLeadingBanner } = await import('./banner.js');
  const { banner, rest } = splitLeadingBanner(parsed.content.trimStart());
  const { stripped, removed } = stripScriptStyleBlocks(rest);

  // (a) sanitize finds nothing to strip
  assert.deepEqual(removed, [], 'fresh docforge output has no script/style to strip');
  assert.equal(stripped, rest, 'body must be unchanged');

  // (b) part-3 can then generate a valid JSON apiHtml block from the raw HTML
  const { buildScriptSetup } = await import('./encode-api-html.js');
  const scriptSetup = buildScriptSetup(stripped);
  assert.ok(scriptSetup.includes('const apiHtml = "'), 'part-3 must produce JSON string form');
  assert.ok(!scriptSetup.includes('const apiHtml = `'), 'must NOT be a template literal');
  assert.ok(scriptSetup.includes('\\u003c'), 'must unicode-escape < for security');
});

test('CI order: managed file with attacker <script> — sanitize strips it, HTML content survives for part-3', async () => {
  const dir = await tmpDir();
  const filePath = path.join(dir, 'api.md');

  const raw = [
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
    '<script>',
    'malicious()',
    '</script>',
    '<ul><li>v1</li></ul>',
  ].join('\n') + '\n';
  await fs.writeFile(filePath, raw, 'utf-8');

  const { splitLeadingBanner } = await import('./banner.js');
  const parsed = read(filePath);
  const { banner, rest } = splitLeadingBanner(parsed.content.trimStart());
  const { stripped, removed } = stripScriptStyleBlocks(rest);

  // (a) attacker script is gone
  assert.ok(!stripped.includes('malicious('), 'malicious code must be removed');
  assert.equal(removed.length, 1, 'exactly one block removed');

  // (b) HTML content survives for part-3
  assert.ok(stripped.includes('<p>Packages:</p>'), 'HTML content must survive');
  assert.ok(stripped.includes('<ul>'), 'HTML content must survive');
});

// Fence-awareness at the sanitizer pipeline level.
// A managed .md with <script> INSIDE a fenced code block must be byte-identical
// after sanitize (the script is documentation, not executable markup).
// The SAME <script> at root level must be stripped.
test('sanitizer fence-awareness: <script> inside ```html block is preserved (byte-identical)', async () => {
  const dir = await tmpDir();
  const filePath = path.join(dir, 'fence.md');

  const raw = [
    '---',
    'github_repo: https://github.com/gardener/gardener',
    'title: Fenced',
    '---',
    '<!-- BANNER:MANAGED -->',
    '<!--',
    ' managed banner comment',
    '-->',
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
  ].join('\n') + '\n';
  await fs.writeFile(filePath, raw, 'utf-8');

  const { splitLeadingBanner } = await import('./banner.js');
  const parsed = read(filePath);
  assert.equal(classify(parsed.data, parsed.content, filePath), 'managed');

  const { rest } = splitLeadingBanner(parsed.content.trimStart());
  const { stripped, removed } = stripScriptStyleBlocks(rest);

  assert.deepEqual(removed, [], '<script> inside fenced block must not be stripped');
  assert.equal(stripped, rest, 'output must be byte-identical to input');
});

test('sanitizer fence-awareness: same <script> at root level IS stripped', async () => {
  const dir = await tmpDir();
  const filePath = path.join(dir, 'root.md');

  const raw = [
    '---',
    'github_repo: https://github.com/gardener/gardener',
    'title: Root',
    '---',
    '<!-- BANNER:MANAGED -->',
    '<!--',
    ' managed banner comment',
    '-->',
    '',
    'Here is an example:',
    '',
    '<script>',
    'document.addEventListener("DOMContentLoaded", () => console.log("hi"))',
    '</script>',
    '',
    'End.',
  ].join('\n') + '\n';
  await fs.writeFile(filePath, raw, 'utf-8');

  const { splitLeadingBanner } = await import('./banner.js');
  const parsed = read(filePath);
  assert.equal(classify(parsed.data, parsed.content, filePath), 'managed');

  const { rest } = splitLeadingBanner(parsed.content.trimStart());
  const { stripped, removed } = stripScriptStyleBlocks(rest);

  assert.equal(removed.length, 1, 'root-level <script> must be stripped');
  assert.ok(!stripped.includes('DOMContentLoaded'), 'script body must not appear in output');
  assert.ok(stripped.includes('End.'), 'surrounding content must survive');
});

test('sanitizer: local:true file is NOT sanitized (classify returns local)', async () => {
  const dir = await tmpDir();
  const filePath = path.join(dir, 'local.md');

  const raw = [
    '---',
    'github_repo: https://github.com/gardener/gardener',
    'local: true',
    'title: Local',
    '---',
    '<!-- BANNER:MANAGED -->',
    '<!--',
    ' stale managed banner',
    '-->',
    '',
    '<script>',
    'legitimate_local_script()',
    '</script>',
    '',
    '# Content',
  ].join('\n') + '\n';
  await fs.writeFile(filePath, raw, 'utf-8');

  const parsed = read(filePath);
  assert.equal(classify(parsed.data, parsed.content, filePath), 'local',
    'local:true must make classify() return local — sanitizer must skip this file');
});
