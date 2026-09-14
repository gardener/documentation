# Visual Regression Testing Implementation Plan

> **For agentic workers:**
> REQUIRED SUB-SKILL: superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Playwright-basierte Visual-Regression, die gerenderte VitePress-Seiten gegen committete Baseline-Screenshots vergleicht, mit einem `all`-Modus (alle Seiten aus sitemap.xml) und einem `diff`-Modus (nur git-geänderte Seiten).

**Architecture:** `routes.mjs` liest `.vitepress/dist/sitemap.xml`, extrahiert die Routen und filtert im `diff`-Modus über das git-Diff der `hugo/content/**.md`-Quelldateien. Die parametrisierte Playwright-Spec iteriert über diese Routen und macht pro Route einen fullPage-Screenshot-Vergleich. Playwright startet `vitepress preview` selbst und erzeugt den HTML-Report mit dem eingebauten Pixel-Diff.

**Tech Stack:** `@playwright/test` (neue dev-Dependency), Node >= 24 ESM, pnpm, VitePress 1.6.4, `node --test` für den routes.mjs-Selbsttest.

## Global Constraints

- Node >= 24, ESM (`"type": "module"` im package.json), pnpm@11.5.1.
- Code-Kommentare auf Englisch (nie Deutsch).
- `routes.mjs`-Selbsttest im Stil von `node --test post-processing/lib/*.test.js` (`import { test } from 'node:test'; import assert from 'node:assert/strict'`).
- Kein neues CLI-Framework, Modus-Steuerung nur via `VISUAL_MODE`-env-Flag (`all` default, `diff`).
- Ein Viewport: Desktop 1280×720, Chromium, ein Projekt. Kein Multi-Browser, kein Mobile.
- `maxDiffPixelRatio: 0.01` als Toleranz.
- Baseline-PNGs werden committet.
- SPDX-Header in neuen Skript-/Config-Dateien im Repo-Stil (`# SPDX-FileCopyrightText: Contributors to the Gardener project` / `# SPDX-License-Identifier: Apache-2.0`), Kommentar-Syntax je Dateityp.

## Fakten aus dem Codebase (verifiziert, nicht raten)

- `.vitepress/config.mts`: `srcDir: 'hugo/content'`, `cleanUrls: true`, `base: process.env.VITE_PUBLIC_BASE_PATH || ''`.
- `make build` läuft mit `VITE_PUBLIC_BASE_PATH=''` → base leer → sitemap-loc-Pfade sind `/foo/bar/`.
- `sitemap.hostname: 'https://gardener.cloud'` → `<loc>` enthält volle URLs `https://gardener.cloud/foo/bar/`. `routes.mjs` muss den Origin abschneiden und **relative Pfade** zurückgeben (Playwright hängt sie an `baseURL`).
- `rewrites(id)` in config.mts: `indexPattern = /\/?_?index\.md$/i`. Regel: wenn `id` NICHT auf index matcht und auf `.md` endet → `id.slice(0,-3) + '/index.md'`.
- `hugo/content` ist committet und bereits post-processed (flatten-single-dirs etc. sind im git-Stand schon angewandt). Das git-Diff auf `hugo/content/**.md` liegt also im finalen Zustand. Reverse-Mapping muss nur `rewrites` + `cleanUrls` nachbilden, KEIN flatten.
- `git diff --name-only <base>...HEAD` liefert Pfade relativ zum Repo-Root, also `hugo/content/...`.

### Reverse-Mapping md→Route (Kern des diff-Modus)

Für einen geänderten Pfad `hugo/content/<rest>`:
1. `srcDir`-Prefix `hugo/content/` entfernen → `<rest>` (z.B. `docs/foo/bar.md`, `docs/foo/index.md`, `index.md`).
2. rewrites nachbilden: matcht `<rest>` auf `/\/?_?index\.md$/i`?
   - **ja** (index/_index): Route-Pfad = Verzeichnis von `<rest>` mit führendem und abschließendem `/`. `index.md` → `/`; `docs/foo/index.md` → `/docs/foo/`.
   - **nein**: `<rest>` = `docs/foo/bar.md` → rewrite zu `docs/foo/bar/index.md` → cleanUrls → `/docs/foo/bar/`.
3. Ergebnis-Pfad gegen die sitemap-Routen schneiden. Nur wenn der Pfad in der sitemap-Menge liegt, wird er zurückgegeben (fällt eine Seite weg oder ist eine md nicht publiziert → korrekt kein Screenshot).

---

## File Structure

- `scripts/visual/routes.mjs` — ESM-Modul, exportiert `getRoutes()`. Parst sitemap, im diff-Modus git-Diff-Filter. Einzige Logik-Datei, einzige Verantwortung: Routenliste liefern. Exportiert zusätzlich reine Hilfsfunktionen für den Test.
- `scripts/visual/routes.test.mjs` — `node --test` Selbsttest gegen eine Inline-Fixture-sitemap und Fixture-Diff-Pfade.
- `tests/visual/pages.spec.ts` — parametrisierte Playwright-Spec.
- `tests/visual/pages.spec.ts-snapshots/` — committete Baseline-PNGs (entsteht bei `--update-snapshots`).
- `playwright.config.ts` — webServer, baseURL, Toleranz, Reporter, Viewport.
- `package.json` — `@playwright/test` als devDependency, `test:visual-routes`-Script.
- `Makefile` — `visual-baseline`, `visual`, `visual-diff` Targets.
- `.gitignore` — Playwright-Artefakte (`test-results/`, `playwright-report/`) ignorieren, Snapshots NICHT.

---

### Task 1: routes.mjs Grundgerüst + sitemap-Parsing (all-Modus)

**Files:**
- Create: `scripts/visual/routes.mjs`
- Test: `scripts/visual/routes.test.mjs`

**Interfaces:**
- Produces:
  - `parseSitemapLocs(xml: string): string[]` — extrahiert relative Route-Pfade aus sitemap-XML (Origin abgeschnitten).
  - `getRoutes(): Promise<string[]>` — liest `.vitepress/dist/sitemap.xml`, gibt im all-Modus alle Routen zurück.

- [ ] **Step 1: Write failing test für parseSitemapLocs**

`scripts/visual/routes.test.mjs`:
```js
// SPDX-FileCopyrightText: Contributors to the Gardener project
//
// SPDX-License-Identifier: Apache-2.0
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseSitemapLocs } from './routes.mjs';

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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test scripts/visual/routes.test.mjs`
Expected: FAIL (`parseSitemapLocs` not exported / not a function)

- [ ] **Step 3: Write minimal implementation**

`scripts/visual/routes.mjs`:
```js
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test scripts/visual/routes.test.mjs`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add scripts/visual/routes.mjs scripts/visual/routes.test.mjs
git commit -m "feat(visual): add routes.mjs sitemap parsing for all mode"
```

---

### Task 2: Reverse-Mapping md-Pfad → Route

**Files:**
- Modify: `scripts/visual/routes.mjs`
- Modify: `scripts/visual/routes.test.mjs`

**Interfaces:**
- Consumes: `parseSitemapLocs` (Task 1).
- Produces: `mdPathToRoute(mdPath: string): string` — bildet einen Repo-relativen `hugo/content/**.md`-Pfad auf seinen Route-Pfad ab, indem es rewrites + cleanUrls aus config.mts nachbildet.

- [ ] **Step 1: Write failing test**

In `scripts/visual/routes.test.mjs` ergänzen:
```js
import { mdPathToRoute } from './routes.mjs';

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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test scripts/visual/routes.test.mjs`
Expected: FAIL (`mdPathToRoute` not a function)

- [ ] **Step 3: Write minimal implementation**

In `routes.mjs` ergänzen (Konstante oben, Funktion darunter):
```js
const SRC_PREFIX = 'hugo/content/';
// Mirror of indexPattern in .vitepress/config.mts rewrites().
const INDEX_PATTERN = /\/?_?index\.md$/i;

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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test scripts/visual/routes.test.mjs`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add scripts/visual/routes.mjs scripts/visual/routes.test.mjs
git commit -m "feat(visual): add md-path to route reverse mapping"
```

---

### Task 3: diff-Modus in getRoutes

**Files:**
- Modify: `scripts/visual/routes.mjs`
- Modify: `scripts/visual/routes.test.mjs`

**Interfaces:**
- Consumes: `parseSitemapLocs`, `mdPathToRoute`.
- Produces:
  - `changedMdToRoutes(diffPaths: string[], sitemapRoutes: string[]): string[]` — testbare Kernfunktion, mappt geänderte md-Pfade auf Routen und schneidet gegen sitemap.
  - `getRoutes()` erweitert um `VISUAL_MODE=diff` (nutzt `git diff`).

- [ ] **Step 1: Write failing test für changedMdToRoutes**

In `scripts/visual/routes.test.mjs` ergänzen:
```js
import { changedMdToRoutes } from './routes.mjs';

test('changedMdToRoutes: keeps only md paths that resolve to a sitemap route', () => {
  const diff = [
    'hugo/content/docs/foo/bar.md',   // -> /docs/foo/bar/ (in sitemap)
    'hugo/content/docs/gone.md',      // -> /docs/gone/ (NOT in sitemap, dropped)
    'Makefile',                       // non-md, dropped
    'hugo/content/docs/foo/index.md', // -> /docs/foo/ (in sitemap)
  ];
  const sitemap = ['/', '/docs/foo/', '/docs/foo/bar/'];
  assert.deepEqual(changedMdToRoutes(diff, sitemap), [
    '/docs/foo/bar/',
    '/docs/foo/',
  ]);
});

test('changedMdToRoutes: no matching changes -> empty', () => {
  assert.deepEqual(changedMdToRoutes(['README.md'], ['/']), []);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test scripts/visual/routes.test.mjs`
Expected: FAIL (`changedMdToRoutes` not a function)

- [ ] **Step 3: Write minimal implementation**

In `routes.mjs` ergänzen (Import oben + Funktionen):
```js
import { execFileSync } from 'node:child_process';
```
```js
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
```

`getRoutes()` ersetzen durch:
```js
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test scripts/visual/routes.test.mjs`
Expected: PASS (alle Tests aus Task 1-3)

- [ ] **Step 5: Commit**

```bash
git add scripts/visual/routes.mjs scripts/visual/routes.test.mjs
git commit -m "feat(visual): add diff mode to getRoutes via git diff"
```

---

### Task 4: package.json — Dependency + test-Script

**Files:**
- Modify: `package.json`

**Interfaces:**
- Produces: `@playwright/test` devDependency, `test:visual-routes` npm-Script.

- [ ] **Step 1: @playwright/test als dev-Dependency installieren**

Run: `pnpm add -D @playwright/test`
Danach: `pnpm exec playwright install chromium`
Expected: `@playwright/test` erscheint unter `devDependencies` in `package.json`, Chromium wird heruntergeladen.

- [ ] **Step 2: routes-Test-Script ergänzen**

In `package.json` unter `scripts`:
```json
  "scripts": {
    "test": "node --test post-processing/lib/*.test.js",
    "test:visual-routes": "node --test scripts/visual/routes.test.mjs"
  },
```

- [ ] **Step 3: Verify**

Run: `pnpm run test:visual-routes`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore(visual): add @playwright/test dev dependency"
```

---

### Task 5: playwright.config.ts

**Files:**
- Create: `playwright.config.ts`

**Interfaces:**
- Produces: Playwright-Config mit webServer (`vitepress preview` :4173), baseURL, Chromium 1280×720, HTML-Reporter, `maxDiffPixelRatio: 0.01`, testDir `tests/visual`.

- [ ] **Step 1: Config schreiben**

`playwright.config.ts`:
```ts
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
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
```

- [ ] **Step 2: Verify config parses**

Run: `pnpm exec playwright test --list` (nach Task 6 liefert das die Testliste; hier nur Syntaxcheck — falls tests/visual noch leer ist, ist "no tests found" ok, kein Config-Fehler)
Expected: kein Config-Parse-Fehler.

- [ ] **Step 3: Commit**

```bash
git add playwright.config.ts
git commit -m "feat(visual): add playwright config with preview server"
```

---

### Task 6: pages.spec.ts

**Files:**
- Create: `tests/visual/pages.spec.ts`

**Interfaces:**
- Consumes: `getRoutes()` aus `../../scripts/visual/routes.mjs`.
- Produces: pro Route ein `test('visual <route>')` mit fullPage-Screenshot-Assertion.

- [ ] **Step 1: Spec schreiben**

`tests/visual/pages.spec.ts`:
```ts
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
    await page.goto(route, { waitUntil: 'networkidle' });
    // Web fonts settle after networkidle; wait so text metrics are stable.
    await page.evaluate(() => document.fonts.ready);
    await expect(page).toHaveScreenshot(`${slug(route)}.png`, {
      fullPage: true,
    });
  });
}
```

- [ ] **Step 2: Verify test-discovery**

Voraussetzung: `make build` wurde gelaufen (sitemap.xml existiert).
Run: `make build && pnpm exec playwright test --list`
Expected: Liste mit `visual /...`-Tests, Anzahl entspricht sitemap-loc-Anzahl.

- [ ] **Step 3: Commit**

```bash
git add tests/visual/pages.spec.ts
git commit -m "feat(visual): add parametrized visual regression spec"
```

---

### Task 7: .gitignore für Playwright-Artefakte

**Files:**
- Modify: `.gitignore`

**Interfaces:**
- Produces: ignoriert `test-results/`, `playwright-report/`, `blob-report/`, `.playwright/`. Snapshots (`*-snapshots/`) bleiben getrackt.

- [ ] **Step 1: Einträge ergänzen**

Ans Ende von `.gitignore`:
```
# Playwright visual-regression artifacts (baseline snapshots ARE committed)
test-results/
playwright-report/
blob-report/
```

- [ ] **Step 2: Verify**

Run: `git status --porcelain` nach einem Testlauf → keine der obigen Ordner erscheinen als untracked.

- [ ] **Step 3: Commit**

```bash
git add .gitignore
git commit -m "chore(visual): ignore playwright report artifacts"
```

---

### Task 8: Makefile-Targets

**Files:**
- Modify: `Makefile`

**Interfaces:**
- Produces: `visual-baseline`, `visual`, `visual-diff` Targets.

- [ ] **Step 1: Targets ergänzen**

Am Ende des Makefiles (mit `.PHONY`):
```makefile
.PHONY: visual-baseline
visual-baseline: ## Build + screenshots of all pages as the new baseline
	$(MAKE) build && VISUAL_MODE=all pnpm exec playwright test --update-snapshots

.PHONY: visual
visual: ## Build + visual regression of all pages, then open report
	$(MAKE) build && VISUAL_MODE=all pnpm exec playwright test; \
	pnpm exec playwright show-report

.PHONY: visual-diff
visual-diff: ## Visual regression of only git-changed pages, then open report
	$(MAKE) build && VISUAL_MODE=diff pnpm exec playwright test; \
	pnpm exec playwright show-report
```

- [ ] **Step 2: Verify targets sichtbar**

Run: `make help 2>/dev/null | grep visual` oder `grep -n "^visual" Makefile`
Expected: drei Targets sichtbar.

- [ ] **Step 3: Commit**

```bash
git add Makefile
git commit -m "feat(visual): add visual, visual-diff, visual-baseline make targets"
```

---

### Task 9: End-to-End Baseline erzeugen + Smoke-Test

**Files:**
- Create: `tests/visual/pages.spec.ts-snapshots/` (durch `--update-snapshots`)

**Interfaces:**
- Consumes: alle vorigen Tasks.
- Produces: committete Baseline-PNGs.

- [ ] **Step 1: Baseline über EINE Route smoke-testen (schnell, kein 870-PNG-Lauf)**

Run: `make build && VISUAL_MODE=diff VISUAL_DIFF_BASE=HEAD~1 pnpm exec playwright test --update-snapshots`
Zweck: schneller Nachweis, dass preview-Server, Route-Auflösung, Font-Wait und Screenshot funktionieren, ohne die volle Baseline zu erzeugen. Falls `HEAD~1` keine content-Änderung hat, liefert diff 0 Routen → stattdessen eine feste Route testen:
Run alternativ: `make build && pnpm exec playwright test -g "visual /" --update-snapshots` (matcht die erste Route).
Expected: mindestens ein Snapshot-PNG unter `tests/visual/pages.spec.ts-snapshots/` entsteht, Testlauf grün.

- [ ] **Step 2: Re-run ohne update → muss grün gegen frische Baseline sein**

Run: (dieselbe Route ohne `--update-snapshots`)
Expected: PASS (Vergleich gegen eben erzeugte Baseline).

- [ ] **Step 3: Volle Baseline erzeugen**

Run: `make visual-baseline`
Expected: alle sitemap-Routen bekommen ein PNG (~870 Dateien). Lauf grün.

- [ ] **Step 4: Commit Baseline**

```bash
git add tests/visual/pages.spec.ts-snapshots
git commit -m "chore(visual): add baseline screenshots"
```

Hinweis: Der Baseline-Commit ist mehrere hundert MB. Das ist im Spec dokumentiert und akzeptiert; Upgrade-Pfad git-lfs (nicht jetzt).

---

### Task 10: README-Doku für den visual-Workflow

**Files:**
- Modify: `scripts/visual/routes.mjs` (Doc-Kommentar bereits vorhanden) — optional kurze `scripts/visual/README.md`.
- Create: `scripts/visual/README.md`

**Interfaces:** keine.

- [ ] **Step 1: Kurz-README schreiben**

`scripts/visual/README.md`:
```markdown
# Visual Regression

- `make visual` — build + screenshot all pages, compare against baseline, open report.
- `make visual-diff` — only pages whose source markdown changed vs `origin/master`
  (override base with `VISUAL_DIFF_BASE=<ref>`).
- `make visual-baseline` — build + record a fresh baseline (`--update-snapshots`).

Routes come from `.vitepress/dist/sitemap.xml` (run `make build` first).
Baseline PNGs live in `tests/visual/pages.spec.ts-snapshots/` and are committed.
```

- [ ] **Step 2: Commit**

```bash
git add scripts/visual/README.md
git commit -m "docs(visual): document visual regression workflow"
```

---

## Self-Review

**1. Spec coverage:**
- Playwright `toHaveScreenshot`, HTML-Report, Baseline via `--update-snapshots` → Task 5, 6, 8, 9. ✓
- Routen aus sitemap.xml → Task 1. ✓
- `VISUAL_MODE=all` / `=diff` → Task 3. ✓
- git-diff base `origin/master` überschreibbar → Task 3 (`VISUAL_DIFF_BASE`). ✓
- Reverse-Mapping md→Route + Schnitt gegen sitemap → Task 2, 3. ✓
- webServer preview :4173, baseURL, reporter html, maxDiffPixelRatio 0.01, animations disabled (Playwright-default), expect.timeout erhöht → Task 5. ✓
- Ein Viewport Desktop 1280×720 Chromium → Task 5. ✓
- `document.fonts.ready` Font-Wait → Task 6. ✓
- routes.mjs node --test Selbsttest → Task 1-3. ✓
- Makefile visual/visual-diff/visual-baseline → Task 8. ✓
- Baseline-Größe dokumentiert → Task 9 Hinweis + Task 10 README. ✓

**2. Placeholder scan:** Keine TBD/TODO. Jeder Step hat Code oder konkreten Befehl. ✓

**3. Type consistency:** `parseSitemapLocs`, `mdPathToRoute`, `changedMdToRoutes`, `getRoutes`, `slug`, `SRC_PREFIX`, `INDEX_PATTERN`, `REPO_ROOT`, `SITEMAP_PATH` — Namen über Tasks konsistent. `getRoutes` in Task 1 definiert, in Task 3 vollständig ersetzt (nicht additiv), Spec zeigt finale Version. ✓

**Abweichung vom Spec (bewusst, dokumentiert im Plan):** Das Spec sagt "loc URLs → Pfade" ohne Origin-Handling; da `sitemap.hostname` gesetzt ist, enthalten locs volle URLs. `parseSitemapLocs` schneidet den Origin ab und gibt relative Pfade zurück, die Playwright an `baseURL` hängt. Das ist der einzige inhaltliche Zusatz gegenüber dem Spec-Pseudocode.
