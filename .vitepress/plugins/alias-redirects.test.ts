import { test } from 'node:test'
import assert from 'node:assert/strict'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  collectAliasEntries,
  deriveImplicitAliases,
  matchPrefixRedirect,
  normalizeTargetUrl,
  buildNetlifyRedirects,
} from './alias-redirects.ts'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const srcDir = path.join(repoRoot, 'hugo/content')

test('deriveImplicitAliases maps blog, gardener usage, and contribute moves', () => {
  assert.deepEqual(
    deriveImplicitAliases('blog/2020/10/10.19-shoot-reconciliation-details.md'),
    ['/blog/2020/10.19-shoot-reconciliation-details/'],
  )
  assert.deepEqual(
    deriveImplicitAliases('docs/gardener/shoot/shoot_access.md'),
    [
      '/docs/gardener/shoot_access/',
      '/docs/gardener/usage/shoot_access/',
      '/docs/gardener/usage/shoot/shoot_access/',
    ],
  )
  assert.deepEqual(
    deriveImplicitAliases('contribute/developer-starter-kit/local_setup.md'),
    [
      '/docs/gardener/local_setup/',
      '/docs/gardener/development/local_setup/',
      '/docs/gardener/deployment/local_setup/',
    ],
  )
  assert.deepEqual(
    deriveImplicitAliases('contribute/other-components/etcd-druid/changing-api.md'),
    ['/docs/other-components/etcd-druid/changing-api/'],
  )
})

test('normalizeTargetUrl preserves external https targets and hashes', () => {
  assert.equal(
    normalizeTargetUrl('https://github.com/gardener/enhancements/tree/main/geps'),
    'https://github.com/gardener/enhancements/tree/main/geps',
  )
  assert.equal(
    normalizeTargetUrl('/docs/gardener/shoot/shoot_access#section'),
    '/docs/gardener/shoot/shoot_access/#section',
  )
  assert.equal(
    normalizeTargetUrl('/hardened_shoots_report.html'),
    '/hardened_shoots_report.html',
  )
})

test('matchPrefixRedirect resolves proposals and legacy /documentation prefixes', () => {
  assert.equal(
    matchPrefixRedirect('/docs/proposals/0016-adminkubeconfig-subresource/readme/'),
    'https://github.com/gardener/enhancements/tree/main/geps',
  )
  assert.equal(
    matchPrefixRedirect('/documentation/030-architecture/'),
    '/docs/getting-started/architecture/',
  )
  assert.equal(
    matchPrefixRedirect('/documentation/guides/applications/network-isolation/'),
    '/docs/guides/applications/network-isolation/',
  )
})

test('collectAliasEntries resolves top Plausible 404 paths with zero warnings', async () => {
  const { redirects, warnings } = await collectAliasEntries(srcDir, '/')

  assert.deepEqual(warnings, [])
  assert.equal(
    redirects.get('/contribute/documentation/pr-guidelines/')?.targetPath,
    '/contribute/contribution-process/pr-guidelines/',
  )
  assert.equal(
    redirects.get('/docs/gardener/local_setup/')?.targetPath,
    '/contribute/developer-starter-kit/local_setup/',
  )
  assert.equal(
    redirects.get('/blog/2020/12.03-stackit-kubernetes-engine-with-gardener/')?.targetPath,
    '/blog/2020/12/12.03-stackit-kubernetes-engine-with-gardener/',
  )
  assert.equal(
    redirects.get('/docs/extensions/others/gardener-extension-shoot-rsyslog-relp/getting-started/')?.targetPath,
    '/contribute/extensions/gardener-extension-shoot-rsyslog-relp/getting-started/',
  )
  assert.equal(
    redirects.get('/hardend_shoots_report.html')?.targetPath,
    '/hardened_shoots_report.html',
  )

  const netlifyBody = buildNetlifyRedirects(
    [{ aliasPath: '/about/', redirect: { sourcePath: 'STATIC_REDIRECTS', targetPath: '/' } }],
    '/',
  )
  assert.match(netlifyBody, /\/about\/ \/ 301!/)
  assert.match(netlifyBody, /\/docs\/proposals\/\* https:\/\/github\.com\/gardener\/enhancements\/tree\/main\/geps 301!/)
})
