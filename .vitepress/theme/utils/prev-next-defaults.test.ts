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
})

test('blog index pages stay out of the series', () => {
  assert.equal(prevNextDefaults('blog/index.md'), false)
  assert.equal(prevNextDefaults('blog/2026/index.md'), false)
  assert.equal(prevNextDefaults('blog/2026/07/index.md'), false)
})
