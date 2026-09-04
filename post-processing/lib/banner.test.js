import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  classify,
  buildUpstreamUrl,
  renderBanner,
  hasBanner,
  injectBanner,
  splitLeadingBanner,
} from './banner.js';

function managedData(overrides = {}) {
  return {
    github_repo: 'https://github.com/gardener/gardener',
    github_subdir: 'docs/operations',
    params: { github_branch: 'master' },
    path_base_for_github_subdir: { to: 'managed_seed.md' },
    ...overrides,
  };
}

// --- classify ---

test('classify: github_repo in frontmatter -> managed', () => {
  assert.equal(classify(managedData(), '# Body\n'), 'managed');
});

test('classify: no github_repo, real body -> local', () => {
  assert.equal(classify({ title: 'Overview' }, '# Body\n'), 'local');
});

test('classify: editLink false + empty body -> skip', () => {
  assert.equal(classify({ editLink: false }, '\n  \n'), 'skip');
});

test('classify: editLink false but body present -> local', () => {
  assert.equal(classify({ editLink: false }, '# Real content\n'), 'local');
});

test('classify: auto_generated stub -> generated', () => {
  assert.equal(
    classify({ auto_generated: true, editLink: false }, '\n'),
    'generated',
  );
});

test('classify: auto_generated wins even after banner injected (non-empty body)', () => {
  assert.equal(
    classify({ auto_generated: true, editLink: false }, '<!-- BANNER:GENERATED -->\n'),
    'generated',
  );
});

test('classify: auto_generated never overrides managed', () => {
  assert.equal(
    classify(managedData({ auto_generated: true }), '# Body\n'),
    'managed',
  );
});

// --- buildUpstreamUrl ---

test('buildUpstreamUrl: correct deep link', () => {
  const url = buildUpstreamUrl(managedData());
  assert.equal(
    url,
    'https://github.com/gardener/gardener/blob/master/docs/operations/managed_seed.md',
  );
});

test('buildUpstreamUrl: github_branch falls back to master when params missing', () => {
  const data = managedData({ params: {} });
  const url = buildUpstreamUrl(data);
  assert.equal(
    url,
    'https://github.com/gardener/gardener/blob/master/docs/operations/managed_seed.md',
  );
});

test('buildUpstreamUrl: no double slashes at segment boundaries', () => {
  const data = managedData({
    github_repo: 'https://github.com/gardener/gardener/',
    github_subdir: '/docs/operations/',
    path_base_for_github_subdir: { to: '/managed_seed.md' },
  });
  assert.equal(
    buildUpstreamUrl(data),
    'https://github.com/gardener/gardener/blob/master/docs/operations/managed_seed.md',
  );
});

test('buildUpstreamUrl: error on missing github_repo', () => {
  assert.throws(
    () => buildUpstreamUrl(managedData({ github_repo: undefined })),
    /github_repo/,
  );
});

test('buildUpstreamUrl: error on missing github_subdir', () => {
  assert.throws(
    () => buildUpstreamUrl(managedData({ github_subdir: undefined })),
    /github_subdir/,
  );
});

test('buildUpstreamUrl: uses filePath basename as fallback when to missing', () => {
  const data = managedData({ path_base_for_github_subdir: {} });
  const url = buildUpstreamUrl(data, 'hugo/content/docs/operations/index.md');
  assert.equal(
    url,
    'https://github.com/gardener/gardener/blob/master/docs/operations/index.md',
  );
});

test('buildUpstreamUrl: to takes precedence over filePath basename', () => {
  const url = buildUpstreamUrl(managedData(), 'hugo/content/docs/operations/index.md');
  assert.equal(
    url,
    'https://github.com/gardener/gardener/blob/master/docs/operations/managed_seed.md',
  );
});

test('buildUpstreamUrl: error when neither to nor filePath', () => {
  assert.throws(
    () => buildUpstreamUrl(managedData({ path_base_for_github_subdir: {} })),
    /file name/,
  );
});

// --- renderBanner ---

test('renderBanner: managed contains marker and upstreamUrl', () => {
  const url = 'https://github.com/gardener/gardener/blob/master/docs/operations/managed_seed.md';
  const block = renderBanner('managed', url);
  assert.match(block, /^<!-- BANNER:MANAGED -->/);
  assert.match(block, new RegExp(url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  assert.doesNotMatch(block, /\{upstreamUrl\}/);
});

test('renderBanner: local contains marker, static', () => {
  const block = renderBanner('local', null);
  assert.match(block, /^<!-- BANNER:LOCAL -->/);
  assert.match(block, /source of truth/);
});

test('renderBanner: generated contains marker, static, no upstream url', () => {
  const block = renderBanner('generated', null);
  assert.match(block, /^<!-- BANNER:GENERATED -->/);
  assert.doesNotMatch(block, /\{upstreamUrl\}/);
  assert.doesNotMatch(block, /http/);
});

test('renderBanner: no surrounding whitespace', () => {
  const block = renderBanner('local', null);
  assert.equal(block, block.trim());
});

// --- hasBanner ---

test('hasBanner: detects MANAGED marker', () => {
  assert.equal(hasBanner('<!-- BANNER:MANAGED -->\n<!-- x -->\n# Body'), true);
});

test('hasBanner: detects LOCAL marker', () => {
  assert.equal(hasBanner('<!-- BANNER:LOCAL -->\n<!-- x -->\n# Body'), true);
});

test('hasBanner: detects GENERATED marker', () => {
  assert.equal(hasBanner('<!-- BANNER:GENERATED -->\n<!-- x -->\n# Body'), true);
});

test('hasBanner: false on banner-less content', () => {
  assert.equal(hasBanner('# Body\n\nSome text\n'), false);
});

// --- injectBanner ---

test('injectBanner: places block before body with blank-line separation', () => {
  const block = renderBanner('local', null);
  const out = injectBanner('# Configmap\n\ntext\n', block);
  assert.equal(out, `${block}\n\n# Configmap\n\ntext\n`);
});

test('injectBanner: no double inject when already present', () => {
  const block = renderBanner('local', null);
  const once = injectBanner('# Body\n', block);
  const twice = injectBanner(once, block);
  assert.equal(twice, once);
});

// --- splitLeadingBanner ---

test('splitLeadingBanner: splits leading banner from body', () => {
  const block = renderBanner('local', null);
  const { banner, rest } = splitLeadingBanner(`${block}\n\n# Body\n\ntext\n`);
  assert.equal(banner, block);
  assert.equal(rest, '# Body\n\ntext\n');
});

test('splitLeadingBanner: no banner -> banner null, rest unchanged', () => {
  const input = '# Body\n\ntext\n';
  const { banner, rest } = splitLeadingBanner(input);
  assert.equal(banner, null);
  assert.equal(rest, input);
});

test('splitLeadingBanner: leading whitespace before banner is tolerated', () => {
  const block = renderBanner('managed', 'https://example.com/x.md');
  const { banner, rest } = splitLeadingBanner(`\n\n${block}\n\n# Body\n`);
  assert.equal(banner, block);
  assert.equal(rest, '# Body\n');
});

test('splitLeadingBanner: splits leading GENERATED banner', () => {
  const block = renderBanner('generated', null);
  const { banner, rest } = splitLeadingBanner(`${block}\n\n# Body\n`);
  assert.equal(banner, block);
  assert.equal(rest, '# Body\n');
});
