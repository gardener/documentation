// SPDX-FileCopyrightText: Contributors to the Gardener project
//
// SPDX-License-Identifier: Apache-2.0
import { test, expect } from '@playwright/test';
import { getRoutes } from '../../scripts/visual/routes.mjs';

// Turn a route path into a filesystem-safe snapshot name.
function slug(route: string): string {
  const s = route.replace(/^\/|\/$/g, '').replace(/\//g, '__');
  return s === '' ? 'index' : s;
}

const routes = await getRoutes();

for (const route of routes) {
  test(`visual ${route}`, async ({ page }) => {
    // Block all third-party requests (analytics, chat widgets, external
    // avatars/fonts). They fail or drift under `vitepress preview` and only
    // add noise; screenshots should capture our own rendered content.
    await page.route('**/*', (r) => {
      const url = r.request().url();
      const isLocal = url.startsWith('http://localhost:');
      const isInline = url.startsWith('data:') || url.startsWith('blob:');
      return isLocal || isInline ? r.continue() : r.abort();
    });
    await page.goto(route, { waitUntil: 'networkidle' });
    // Web fonts settle after networkidle; wait so text metrics are stable.
    await page.evaluate(() => document.fonts.ready);
    await expect(page).toHaveScreenshot(`${slug(route)}.png`, {
      fullPage: true,
    });
  });
}
