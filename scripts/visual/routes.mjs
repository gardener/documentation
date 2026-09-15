// SPDX-FileCopyrightText: Contributors to the Gardener project
//
// SPDX-License-Identifier: Apache-2.0

// Route source for visual-regression tests. Reads the VitePress-generated
// sitemap (the authoritative published-page list) and, in diff mode, narrows
// it to pages whose source markdown changed in the git diff.
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..', '..');
const SITEMAP_PATH = path.join(REPO_ROOT, '.vitepress', 'dist', 'sitemap.xml');

// Extract <loc> URLs from sitemap XML and return them as origin-relative paths
// (Playwright appends them to baseURL). Same <loc> extraction as
// scripts/diff-structure.sh, but keeps only the path.
export function parseSitemapLocs(xml) {
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  return locs.map((url) => new URL(url).pathname);
}

export async function getRoutes() {
  const xml = await readFile(SITEMAP_PATH, 'utf8');
  return parseSitemapLocs(xml);
}
