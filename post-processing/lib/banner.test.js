import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  classify,
  buildUpstreamUrl,
  renderBanner,
  hasBanner,
  injectBanner,
  splitLeadingBanner,
  bannerKind,
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

test('classify: editLink false but body present -> local', () => {
  assert.equal(classify({ editLink: false }, '# Real content\n'), 'local');
});

test('classify: auto_generated stub -> managed', () => {
  assert.equal(
    classify({ auto_generated: true, editLink: false }, '\n'),
    'managed',
  );
});

test('classify: auto_generated wins even after banner injected (non-empty body)', () => {
  assert.equal(
    classify({ auto_generated: true, editLink: false }, '<!-- BANNER:MANAGED -->\n'),
    'managed',
  );
});

test('classify: empty index.md with no source -> managed (docforge empty index)', () => {
  assert.equal(classify({}, '\n', 'hugo/content/docs/faq/index.md'), 'managed');
});

test('classify: empty index.md still managed after MANAGED banner injected', () => {
  const banner = renderBanner('managed', {});
  assert.equal(classify({}, `${banner}\n`, 'hugo/content/docs/faq/index.md'), 'managed');
});

test('classify: empty index.md still managed under a stale GENERATED banner', () => {
  // Legacy banner from before the GENERATED type was dropped. classify must strip
  // it too, otherwise the empty aggregator index would be misclassified as local.
  const stale = '<!-- BANNER:GENERATED -->\n<!-- x -->';
  assert.equal(classify({}, `${stale}\n`, 'hugo/content/docs/faq/index.md'), 'managed');
});

test('classify: non-index empty file -> local', () => {
  assert.equal(classify({}, '\n', 'hugo/content/docs/foo/bar.md'), 'local');
});

test('classify: auto_generated never overrides managed', () => {
  assert.equal(
    classify(managedData({ auto_generated: true }), '# Body\n'),
    'managed',
  );
});


test('classify: blog segment elsewhere does not force local', () => {
  assert.equal(
    classify(managedData(), '# Body\n', './hugo/content/docs/blog-tooling/x.md'),
    'managed',
  );
});

test('classify: local:true wins over github_repo', () => {
  assert.equal(classify(managedData({ local: true }), '# Body\n'), 'local');
});

test('classify: local:true wins over auto_generated', () => {
  assert.equal(classify({ auto_generated: true, local: true }, '\n'), 'local');
});

test('classify: local:true wins over empty index.md', () => {
  assert.equal(
    classify({ local: true }, '\n', 'hugo/content/docs/foo/index.md'),
    'local',
  );
});

test('classify: local not true does not force local (regression)', () => {
  assert.equal(classify(managedData({ local: false }), '# Body\n'), 'managed');
  assert.equal(classify(managedData(), '# Body\n'), 'managed');
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

test('renderBanner: managed with url contains marker and upstreamUrl', () => {
  const url = 'https://github.com/gardener/gardener/blob/master/docs/operations/managed_seed.md';
  const block = renderBanner('managed', { url });
  assert.match(block, /^<!-- BANNER:MANAGED -->/);
  assert.match(block, /aggregated from upstream/);
  assert.match(block, new RegExp(url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  assert.doesNotMatch(block, /\{upstreamUrl\}/);
});

test('renderBanner: managed auto_generated stub, no url, links part-index', () => {
  const block = renderBanner('managed', { autoGenerated: true });
  assert.match(block, /^<!-- BANNER:MANAGED -->/);
  assert.match(block, /navigation stub/);
  assert.match(block, /part-index\.js/);
  assert.doesNotMatch(block, /http/);
});

test('renderBanner: managed empty docforge index, no url, links .docforge', () => {
  const block = renderBanner('managed', {});
  assert.match(block, /^<!-- BANNER:MANAGED -->/);
  assert.match(block, /empty aggregator index/);
  assert.match(block, /\.docforge\//);
  assert.doesNotMatch(block, /http/);
});

test('renderBanner: local contains marker, static', () => {
  const block = renderBanner('local', {});
  assert.match(block, /^<!-- BANNER:LOCAL -->/);
  assert.match(block, /source of truth/);
});

test('renderBanner: no surrounding whitespace', () => {
  const block = renderBanner('local', {});
  assert.equal(block, block.trim());
});

// --- hasBanner ---

test('hasBanner: detects MANAGED marker', () => {
  assert.equal(hasBanner('<!-- BANNER:MANAGED -->\n<!-- x -->\n# Body'), true);
});

test('hasBanner: detects LOCAL marker', () => {
  assert.equal(hasBanner('<!-- BANNER:LOCAL -->\n<!-- x -->\n# Body'), true);
});

test('hasBanner: false on banner-less content', () => {
  assert.equal(hasBanner('# Body\n\nSome text\n'), false);
});

// --- bannerKind ---

test('bannerKind: detects MANAGED', () => {
  const block = renderBanner('managed', { url: 'https://example.com/x.md' });
  assert.equal(bannerKind(`${block}\n\n# Body\n`), 'managed');
});

test('bannerKind: detects LOCAL', () => {
  const block = renderBanner('local', {});
  assert.equal(bannerKind(`${block}\n\n# Body\n`), 'local');
});

test('bannerKind: null when no leading banner', () => {
  assert.equal(bannerKind('# Body\n\ntext\n'), null);
});

test('bannerKind: null on legacy GENERATED banner (type dropped)', () => {
  assert.equal(bannerKind('<!-- BANNER:GENERATED -->\n<!-- x -->\n\n# Body\n'), null);
});

// --- injectBanner ---

test('injectBanner: places block before body with blank-line separation', () => {
  const block = renderBanner('local', {});
  const out = injectBanner('# Configmap\n\ntext\n', block);
  assert.equal(out, `${block}\n\n# Configmap\n\ntext\n`);
});

test('injectBanner: no double inject when already present', () => {
  const block = renderBanner('local', {});
  const once = injectBanner('# Body\n', block);
  const twice = injectBanner(once, block);
  assert.equal(twice, once);
});

// --- splitLeadingBanner ---

test('splitLeadingBanner: splits leading banner from body', () => {
  const block = renderBanner('local', {});
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
  const block = renderBanner('managed', { url: 'https://example.com/x.md' });
  const { banner, rest } = splitLeadingBanner(`\n\n${block}\n\n# Body\n`);
  assert.equal(banner, block);
  assert.equal(rest, '# Body\n');
});

test('splitLeadingBanner: does not match legacy GENERATED banner', () => {
  const input = '<!-- BANNER:GENERATED -->\n<!-- x -->\n\n# Body\n';
  const { banner, rest } = splitLeadingBanner(input);
  assert.equal(banner, null);
  assert.equal(rest, input);
});
