// SPDX-FileCopyrightText: Contributors to the Gardener project
//
// SPDX-License-Identifier: Apache-2.0
import { defineConfig, devices } from '@playwright/test';

// Visual-regression config. Playwright serves the already-built dist via
// `vitepress preview` and screenshots each route from routes.mjs. Single
// desktop Chromium viewport by design (layout regression, not cross-browser).
export default defineConfig({
  testDir: 'tests/visual',
  fullyParallel: true,
  reporter: 'html',
  expect: {
    // Mermaid renders client-side and can drift a few pixels; allow a small ratio.
    timeout: 15_000,
    toHaveScreenshot: { maxDiffPixelRatio: 0.01 },
  },
  use: {
    baseURL: 'http://localhost:4173/',
  },
  projects: [
    {
      name: 'chromium-desktop',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 720 } },
    },
  ],
  webServer: {
    command: 'pnpm exec vitepress preview --port 4173',
    port: 4173,
    // Reuse a running preview locally, EXCEPT when comparing two builds in one
    // run (visual-against): there each build needs its own fresh server, or the
    // second run would screenshot the first build's still-served dist.
    reuseExistingServer: !process.env.CI && !process.env.VISUAL_FRESH_SERVER,
    timeout: 120_000,
  },
});
