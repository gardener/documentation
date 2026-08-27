import { test } from 'node:test';
import assert from 'node:assert/strict';

import { buildUpstreamUrl } from './upstream-url.js';

// Exact copy of the inline logic from .vitepress/config.mts (pageActions edit link).
// VitePress serializes the url function and re-evaluates it without module scope,
// so config.mts cannot import buildUpstreamUrl. This copy here mirrors the inline
// version; the tests below enforce that it yields URLs identical to buildUpstreamUrl.
// If one side drifts, the test breaks.
function configInlineEditLink(frontmatter, filePath) {
  const to = frontmatter['path_base_for_github_subdir']?.to;
  const fileName = to || filePath.split('/').pop();
  const branch = frontmatter['params']?.github_branch || 'master';
  return [frontmatter['github_repo'], 'blob', branch, frontmatter['github_subdir'], fileName]
    .map((s) => String(s).replace(/^\/+|\/+$/g, ''))
    .join('/');
}

const cases = [
  {
    name: 'managed index.md with to=README.md (the 404 case)',
    fm: {
      github_repo: 'https://github.com/gardener/gardener',
      github_subdir: 'docs',
      params: { github_branch: 'master' },
      path_base_for_github_subdir: { to: 'README.md' },
    },
    filePath: 'docs/gardener/index.md',
  },
  {
    name: 'to missing -> filePath basename',
    fm: {
      github_repo: 'https://github.com/gardener/gardener',
      github_subdir: 'docs/operations',
    },
    filePath: 'docs/operations/foo.md',
  },
  {
    name: 'non-master branch',
    fm: {
      github_repo: 'https://github.com/gardener/dashboard',
      github_subdir: 'docs',
      params: { github_branch: 'release-v1' },
      path_base_for_github_subdir: { to: 'usage.md' },
    },
    filePath: 'docs/dashboard/usage.md',
  },
  {
    name: 'slashes at segment boundaries',
    fm: {
      github_repo: 'https://github.com/gardener/gardener/',
      github_subdir: '/docs/operations/',
      path_base_for_github_subdir: { to: '/managed_seed.md' },
    },
    filePath: 'x.md',
  },
];

for (const c of cases) {
  test(`config inline edit-link == buildUpstreamUrl: ${c.name}`, () => {
    assert.equal(
      configInlineEditLink(c.fm, c.filePath),
      buildUpstreamUrl(c.fm, c.filePath),
      'config.mts inline edit-link derivation drifted from buildUpstreamUrl',
    );
  });
}
