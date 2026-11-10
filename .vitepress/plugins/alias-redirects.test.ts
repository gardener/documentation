import { test } from 'node:test'
import assert from 'node:assert/strict'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  collectAliasEntries,
  matchPrefixRedirect,
  normalizeTargetUrl,
  buildNetlifyRedirects,
} from './alias-redirects.ts'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const srcDir = path.join(repoRoot, 'hugo/content')

test('normalizeTargetUrl keeps external targets and adds base + trailing slash to internal ones', () => {
  assert.equal(
    normalizeTargetUrl('https://github.com/gardener/enhancements/tree/main/geps'),
    'https://github.com/gardener/enhancements/tree/main/geps',
  )
  assert.equal(normalizeTargetUrl('/docs/glossary'), '/docs/glossary/')
  assert.equal(normalizeTargetUrl('/docs/glossary', '/preview/'), '/preview/docs/glossary/')
  assert.equal(normalizeTargetUrl('/hardened_shoots_report.html'), '/hardened_shoots_report.html')
})

test('matchPrefixRedirect resolves proposals and legacy /documentation prefixes', () => {
  assert.equal(
    matchPrefixRedirect('/docs/proposals/0016-adminkubeconfig-subresource/readme/'),
    'https://github.com/gardener/enhancements/tree/main/geps',
  )
  assert.equal(matchPrefixRedirect('/documentation/030-architecture/'), '/docs/030-architecture/')
  assert.equal(
    matchPrefixRedirect('/Documentation/guides/applications/network-isolation/'),
    '/docs/guides/applications/network-isolation/',
  )
  // Collapsed slashes: a crafted splat cannot become a protocol-relative URL.
  assert.equal(matchPrefixRedirect('/documentation//evil.example/'), '/docs/evil.example/')
  assert.equal(matchPrefixRedirect('/docs/gardener/'), null)
})

test('collectAliasEntries resolves smoke-test redirects with zero warnings', async () => {
  const { redirects, warnings } = await collectAliasEntries(srcDir, '/')

  assert.deepEqual(warnings, [])
  const target = (alias: string) => redirects.get(alias.toLowerCase())?.targetPath

  assert.equal(target('/about/'), '/')
  assert.equal(target('/hardend_shoots_report.html'), '/hardened_shoots_report.html')
})

test('buildNetlifyRedirects emits forced 301s for aliases and prefix rules', () => {
  const body = buildNetlifyRedirects([{ aliasPath: '/about/', sourcePath: 'STATIC_REDIRECTS', targetPath: '/' }])
  assert.match(body, /^\/about\/ \/ 301!$/m)
  assert.match(body, /^\/docs\/proposals\/\* https:\/\/github\.com\/gardener\/enhancements\/tree\/main\/geps 301!$/m)
  assert.match(body, /^\/documentation\/\* \/docs\/:splat 301!$/m)
})
