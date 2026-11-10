import assert from 'node:assert/strict'
import test from 'node:test'
import { normalizeEventUrl } from './analytics.ts'

test('strips .html and unifies to trailing slash', () => {
  assert.equal(normalizeEventUrl('https://gardener.cloud/docs.html'), 'https://gardener.cloud/docs/')
  assert.equal(normalizeEventUrl('https://gardener.cloud/docs/index.html'), 'https://gardener.cloud/docs/')
  assert.equal(normalizeEventUrl('https://gardener.cloud/docs/foo.html'), 'https://gardener.cloud/docs/foo/')
})

test('adds trailing slash to extensionless paths', () => {
  assert.equal(normalizeEventUrl('https://gardener.cloud/docs'), 'https://gardener.cloud/docs/')
})

test('leaves already-normalized paths unchanged', () => {
  assert.equal(normalizeEventUrl('https://gardener.cloud/docs/'), 'https://gardener.cloud/docs/')
})

test('leaves file paths unchanged', () => {
  assert.equal(normalizeEventUrl('https://gardener.cloud/img/logo.svg'), 'https://gardener.cloud/img/logo.svg')
})

test('returns invalid URLs unchanged', () => {
  assert.equal(normalizeEventUrl('not-a-url'), 'not-a-url')
})
