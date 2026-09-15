// SPDX-FileCopyrightText: Contributors to the Gardener project
//
// SPDX-License-Identifier: Apache-2.0

// Route source for visual-regression tests. Reads the VitePress-generated
// sitemap (the authoritative published-page list) and, in diff mode, narrows
// it to pages whose source markdown changed in the git diff.
import { readFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..', '..');
const SITEMAP_PATH = path.join(REPO_ROOT, '.vitepress', 'dist', 'sitemap.xml');

const SRC_PREFIX = 'hugo/content/';
// Mirror of indexPattern in .vitepress/config.mts rewrites().
const INDEX_PATTERN = /\/?_?index\.md$/i;

// Extract <loc> URLs from sitemap XML and return them as origin-relative paths
// (Playwright appends them to baseURL). Same <loc> extraction as
// scripts/diff-structure.sh, but keeps only the path.
export function parseSitemapLocs(xml) {
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  return locs.map((url) => new URL(url).pathname);
}

// Given git-changed paths and the set of published routes, return the routes
// of changed hugo/content markdown files, intersected with the sitemap so that
// removed or unpublished pages drop out.
export function changedMdToRoutes(diffPaths, sitemapRoutes) {
  const routeSet = new Set(sitemapRoutes);
  const result = [];
  const seen = new Set();
  for (const p of diffPaths) {
    if (!p.startsWith(SRC_PREFIX) || !p.endsWith('.md')) continue;
    const route = mdPathToRoute(p);
    if (routeSet.has(route) && !seen.has(route)) {
      seen.add(route);
      result.push(route);
    }
  }
  return result;
}

function gitChangedMdPaths(base) {
  const out = execFileSync(
    'git',
    ['diff', '--name-only', `${base}...HEAD`],
    { cwd: REPO_ROOT, encoding: 'utf8' },
  );
  return out.split('\n').filter(Boolean);
}

export async function getRoutes() {
  const xml = await readFile(SITEMAP_PATH, 'utf8');
  const routes = parseSitemapLocs(xml);

  if (process.env.VISUAL_MODE === 'diff') {
    const base = process.env.VISUAL_DIFF_BASE || 'origin/master';
    const changed = gitChangedMdPaths(base);
    return changedMdToRoutes(changed, routes);
  }

  return routes;
}

// Map a repo-relative hugo/content/**.md path to its published route path,
// mirroring the rewrites() + cleanUrls behaviour in .vitepress/config.mts.
// Non-index page foo/bar.md -> /foo/bar/ ; index.md -> its directory + '/'.
export function mdPathToRoute(mdPath) {
  const rest = mdPath.startsWith(SRC_PREFIX)
    ? mdPath.slice(SRC_PREFIX.length)
    : mdPath;

  if (INDEX_PATTERN.test(rest)) {
    const dir = path.posix.dirname(rest);
    return dir === '.' ? '/' : `/${dir}/`;
  }

  // rewrites: foo/bar.md -> foo/bar/index.md ; cleanUrls -> /foo/bar/
  return `/${rest.slice(0, -'.md'.length)}/`;
}
