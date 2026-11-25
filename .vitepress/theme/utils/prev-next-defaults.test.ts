import { test } from 'node:test'
import assert from 'node:assert/strict'

import { prevNextDefaults } from './prev-next-defaults.ts'

test('docs pages default to no prev/next (replaces written frontmatter)', () => {
  assert.equal(prevNextDefaults('docs/gardener/concepts/architecture.md'), false)
  assert.equal(prevNextDefaults('docs/index.md'), false)
  assert.equal(prevNextDefaults('contribute/dashboard/index.md'), false)
  assert.equal(prevNextDefaults('community/index.md'), false)
})

test('blog posts default to prev/next (chronological series)', () => {
  assert.equal(prevNextDefaults('blog/2026/07/07.15-release.md'), true)
  assert.equal(prevNextDefaults('blog/2018/06/06.10-efa-support.md'), true)
  // Article filename that ends in "index.md" but is not an index page.
  assert.equal(prevNextDefaults('blog/2026/07/07.15-search-index.md'), true)
})

// Regression: config.mts passes pageData.filePath (the source path), because
// the rewrites option turns a post into `<post>/index.md` — classifying the
// rewritten path misclassified every post as an index page (no footer links).
test('route rewriting still classifies the source post correctly', () => {
  const rewritten = 'blog/2026/07/07.15-release/index.md'
  const source = 'blog/2026/07/07.15-release.md'
  assert.equal(rewritten.endsWith('index.md'), true) // premise of the bug
  assert.equal(prevNextDefaults(source), true)
})

test('blog index pages stay out of the series', () => {
  assert.equal(prevNextDefaults('blog/index.md'), false)
  assert.equal(prevNextDefaults('blog/2026/index.md'), false)
  assert.equal(prevNextDefaults('blog/2026/07/index.md'), false)
})
