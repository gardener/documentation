// SPDX-FileCopyrightText: Contributors to the Gardener project
//
// SPDX-License-Identifier: Apache-2.0
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseSitemapLocs, mdPathToRoute } from './routes.mjs';

const FIXTURE = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://gardener.cloud/</loc><lastmod>2026-09-14</lastmod></url>
  <url><loc>https://gardener.cloud/docs/foo/</loc></url>
  <url><loc>https://gardener.cloud/docs/foo/bar/</loc></url>
</urlset>`;

test('parseSitemapLocs: strips origin, returns relative paths', () => {
  assert.deepEqual(parseSitemapLocs(FIXTURE), [
    '/',
    '/docs/foo/',
    '/docs/foo/bar/',
  ]);
});

test('mdPathToRoute: root index.md -> /', () => {
  assert.equal(mdPathToRoute('hugo/content/index.md'), '/');
});

test('mdPathToRoute: nested index.md -> dir with trailing slash', () => {
  assert.equal(mdPathToRoute('hugo/content/docs/foo/index.md'), '/docs/foo/');
});

test('mdPathToRoute: _index.md treated as index', () => {
  assert.equal(mdPathToRoute('hugo/content/docs/foo/_index.md'), '/docs/foo/');
});

test('mdPathToRoute: content page -> rewrites to /dir/page/', () => {
  assert.equal(mdPathToRoute('hugo/content/docs/foo/bar.md'), '/docs/foo/bar/');
});
