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
  assert.equal(matchPrefixRedirect('/documentation/030-architecture/'), '/docs/getting-started/architecture/')
  assert.equal(
    matchPrefixRedirect('/Documentation/guides/applications/network-isolation/'),
    '/docs/guides/applications/network-isolation/',
  )
  // Collapsed slashes: a crafted splat cannot become a protocol-relative URL.
  assert.equal(matchPrefixRedirect('/documentation//evil.example/'), '/docs/evil.example/')
  assert.equal(matchPrefixRedirect('/docs/gardener/'), null)
})

test('collectAliasEntries resolves top Plausible 404 paths with zero warnings', async () => {
  const { redirects, warnings } = await collectAliasEntries(srcDir, '/')

  assert.deepEqual(warnings, [])
  const target = (alias: string) => redirects.get(alias.toLowerCase())?.targetPath

  assert.equal(target('/contribute/documentation/pr-guidelines/'), '/contribute/contribution-process/pr-guidelines/')
  assert.equal(target('/docs/gardener/local_setup/'), '/contribute/developer-starter-kit/local_setup/')
  // The operator page still lives under /docs/, not the contributor copy.
  assert.equal(target('/docs/gardener/getting_started_locally/'), '/docs/gardener/deployment/getting_started_locally/')
  assert.equal(target('/hardend_shoots_report.html'), '/hardened_shoots_report.html')

  // Lookup is case-insensitive, but the written path keeps the observed casing.
  const stackit = redirects.get('/blog/2020/12.03-stackit-kubernetes-engine-with-gardener/')
  assert.equal(stackit?.targetPath, '/blog/2020/12/12.03-stackit-kubernetes-engine-with-gardener/')
  assert.equal(stackit?.aliasPath, '/blog/2020/12.03-STACKIT-Kubernetes-Engine-with-Gardener/')
})

test('buildNetlifyRedirects emits forced 301s for aliases and prefix rules', () => {
  const body = buildNetlifyRedirects([{ aliasPath: '/about/', sourcePath: 'STATIC_REDIRECTS', targetPath: '/' }])
  assert.match(body, /^\/about\/ \/ 301!$/m)
  assert.match(body, /^\/docs\/proposals\/\* https:\/\/github\.com\/gardener\/enhancements\/tree\/main\/geps 301!$/m)
  assert.match(body, /^\/documentation\/\* \/docs\/:splat 301!$/m)
})
