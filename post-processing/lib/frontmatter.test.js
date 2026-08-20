import { test } from 'node:test';
import assert from 'node:assert/strict';
import { promises as fs } from 'fs';
import os from 'os';
import path from 'path';

import { stringify, read, write } from './frontmatter.js';

async function tmpFile(content) {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'fm-test-'));
  const file = path.join(dir, 'doc.md');
  await fs.writeFile(file, content, 'utf-8');
  return file;
}

// 1. Key order is preserved when a field is appended.
test('stringify preserves key order when appending', () => {
  const data = { title: 'Architecture', level: 'beginner' };
  data.weight = 5;
  const out = stringify('body', data);
  assert.equal(out, '---\ntitle: Architecture\nlevel: beginner\nweight: 5\n---\nbody\n');
});

// 2. Required quotes for ": " inside the value are kept.
test('stringify keeps required quotes for ": " in value', () => {
  const out = stringify('body', { title: 'Case Study: Migrating ETCD Volumes in Production' });
  assert.equal(out, "---\ntitle: 'Case Study: Migrating ETCD Volumes in Production'\n---\nbody\n");
});

// 3. Required quotes for a purely numeric string.
test('stringify keeps required quotes for numeric string', () => {
  const out = stringify('body', { title: '2018' });
  assert.equal(out, "---\ntitle: '2018'\n---\nbody\n");
});

// 4. Cosmetic quotes are removed.
test('stringify removes cosmetic quotes', () => {
  const out = stringify('body', { title: 'Architecture' });
  assert.equal(out, '---\ntitle: Architecture\n---\nbody\n');
});

// 5. Long values as folded block scalar (>-), byte-identical to docforge.
test('stringify writes long values as folded block scalar', () => {
  const long = 'https://github.com/gardener/gardener/tree/master/docs/very/long/path/that/exceeds/eighty/chars/somewhere';
  const out = stringify('body', { path: long });
  assert.equal(out, `---\npath: >-\n  ${long}\n---\nbody\n`);
});

// 6. A-guard: write returns false and does not write on byte-identical content.
test('write is a no-op on byte-identical content (A-guard)', async () => {
  const original = '---\ntitle: Architecture\n---\nbody\n';
  const file = await tmpFile(original);
  const before = (await fs.stat(file)).mtimeMs;
  const wrote = write(file, 'body', { title: 'Architecture' });
  const after = await fs.readFile(file, 'utf-8');
  assert.equal(wrote, false);
  assert.equal(after, original);
});

// 7. write returns true and writes on a changed field.
test('write writes and returns true on change', async () => {
  const file = await tmpFile('---\ntitle: Architecture\n---\nbody\n');
  const wrote = write(file, 'body', { title: 'Architecture', prev: false });
  const after = await fs.readFile(file, 'utf-8');
  assert.equal(wrote, true);
  assert.equal(after, '---\ntitle: Architecture\nprev: false\n---\nbody\n');
});

// 8. read -> write without modification on a normalized file is a no-op (fixed point).
test('read -> write without modification is a fixed point', async () => {
  const file = await tmpFile('---\ntitle: Architecture\nlevel: beginner\n---\nbody\n');
  const { data, content } = read(file);
  const wrote = write(file, content, data);
  assert.equal(wrote, false);
});
