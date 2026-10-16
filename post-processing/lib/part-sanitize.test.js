import { test } from 'node:test';
import assert from 'node:assert/strict';

import { isFileManaged } from '../part-sanitize.js';

// ── Managed: github_repo key present (any value) ─────────────────────────────

test('isFileManaged: github_repo with URL → managed', () => {
  assert.equal(isFileManaged({ github_repo: 'https://github.com/gardener/gardener' }), true);
});

test('isFileManaged: github_repo with local:true → managed (upstream bypass blocked)', () => {
  // An upstream file could set local:true to fool classify(); hasOwnProperty
  // ignores it because github_repo key still signals docforge origin.
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
