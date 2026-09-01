import { test } from 'node:test';
import assert from 'node:assert/strict';

import { isSelfReference, findViolations } from './selfref.js';

// --- isSelfReference ---

test('isSelfReference: canonical https url -> true', () => {
  assert.equal(isSelfReference('https://github.com/gardener/documentation'), true);
});

test('isSelfReference: trailing slash tolerated', () => {
  assert.equal(isSelfReference('https://github.com/gardener/documentation/'), true);
});

test('isSelfReference: .git suffix tolerated', () => {
  assert.equal(isSelfReference('https://github.com/gardener/documentation.git'), true);
});

test('isSelfReference: schemeless form -> true', () => {
  assert.equal(isSelfReference('github.com/gardener/documentation'), true);
});

test('isSelfReference: surrounding whitespace tolerated', () => {
  assert.equal(isSelfReference('  https://github.com/gardener/documentation  '), true);
});

test('isSelfReference: real upstream repo -> false', () => {
  assert.equal(isSelfReference('https://github.com/gardener/gardener'), false);
});

test('isSelfReference: lookalike repo name -> false', () => {
  assert.equal(isSelfReference('https://github.com/gardener/documentation-foo'), false);
});

test('isSelfReference: different org -> false', () => {
  assert.equal(isSelfReference('https://github.com/other/documentation'), false);
});

test('isSelfReference: non-string -> false', () => {
  assert.equal(isSelfReference(undefined), false);
  assert.equal(isSelfReference(null), false);
});

// --- findViolations ---

test('findViolations: clean upstream file -> no violations', () => {
  const data = { github_repo: 'https://github.com/gardener/gardener' };
  assert.deepEqual(findViolations('a.md', data), []);
});

test('findViolations: clean local file -> no violations', () => {
  const data = { title: 'Overview', local: true };
  assert.deepEqual(findViolations('a.md', data), []);
});

test('findViolations: self-reference is flagged', () => {
  const data = { github_repo: 'https://github.com/gardener/documentation' };
  const out = findViolations('a.md', data);
  assert.equal(out.length, 1);
  assert.equal(out[0].rule, 'self-reference');
  assert.equal(out[0].file, 'a.md');
});

test('findViolations: local: true plus github_repo is flagged', () => {
  const data = { local: true, github_repo: 'https://github.com/gardener/gardener' };
  const out = findViolations('a.md', data);
  assert.equal(out.length, 1);
  assert.equal(out[0].rule, 'local-and-github_repo');
});

test('findViolations: the 2026-11.md case trips both rules', () => {
  // Reproduces the real bug: self-reference AND local: true together.
  const data = {
    github_repo: 'https://github.com/gardener/documentation',
    local: true,
    title: 'November 2026',
  };
  const out = findViolations('hugo/content/community/hackathons/2026-11.md', data);
  const rules = out.map((v) => v.rule).sort();
  assert.deepEqual(rules, ['local-and-github_repo', 'self-reference']);
});

test('findViolations: missing frontmatter object -> no violations', () => {
  assert.deepEqual(findViolations('a.md', undefined), []);
});
