# Visual Regression Testing für die Gardener-Doku

Datum: 2026-09-14

## Ziel

Ein Test, der gerenderte Seiten der gebauten VitePress-Site gegen gespeicherte
Baseline-Screenshots vergleicht. Pixel-Abweichungen werden im HTML-Report rot
markiert. Ein kompletter Lauf (alle Seiten) und ein git-basierter Lauf (nur
geänderte Seiten) müssen beide möglich sein.

## Werkzeug

Playwright mit `toHaveScreenshot()`. Native Visual-Regression:

- eingebauter Pixel-Diff, kein eigener Diff-Algorithmus
- eingebauter HTML-Report mit Baseline / Aktuell / Diff nebeneinander, Diff rot
- Baseline via `--update-snapshots`, danach vergleicht jeder Lauf dagegen

Neue dev-Dependency: `@playwright/test`. Passt zum bestehenden Node-Test-Setup
(Node >= 24, pnpm).

## Routenquelle: sitemap.xml

Die Routen kommen NICHT aus einem selbstgebauten Markdown→URL-Mapping, sondern
aus `.vitepress/dist/sitemap.xml`. Das ist die autoritative Publikationsliste
von VitePress und dieselbe Quelle, die `scripts/diff-structure.sh` schon nutzt.
Weniger Code, keine Mapping-Fehler (cleanUrls, index.md, flatten-single-dirs
sind darin schon aufgelöst).

## Architektur

```
scripts/visual/
  routes.mjs          # liest dist/sitemap.xml → Routenliste
                      #   VISUAL_MODE=all  → alle <loc> URLs
                      #   VISUAL_MODE=diff → nur URLs, deren Quell-.md im git-diff liegt
tests/visual/
  pages.spec.ts       # parametrisierte Spec, iteriert über routes
  pages.spec.ts-snapshots/   # committete Baseline-PNGs
playwright.config.ts  # preview-server, Toleranz, Font-/Animations-Handling
```

## Ablauf

```
make build                     → .vitepress/dist/ (inkl. sitemap.xml)
      │
      ▼
routes.mjs  ──VISUAL_MODE=all──▶  alle <loc>
            ──VISUAL_MODE=diff─▶  git diff --name-only <base> gefiltert auf
                           hugo/content/**.md → passende <loc>
      │
      ▼
playwright  ── startet `vitepress preview` (webServer in config),
               fullPage-Screenshot pro Route, Vergleich gegen Baseline
      │
      ▼
playwright show-report         → Diff rot pro Seite
```

## Komponenten

### routes.mjs

- Parst `.vitepress/dist/sitemap.xml`, extrahiert `<loc>` URLs, gibt Pfade zurück.
- `VISUAL_MODE=all` (default): alle Routen.
- `VISUAL_MODE=diff`: `git diff --name-only <base>...HEAD` (base default `origin/master`,
  überschreibbar via env), gefiltert auf `hugo/content/**.md`. Jeder geänderte
  Markdown-Pfad wird auf seine Route abgebildet und gegen die sitemap-Routen
  geschnitten (fällt eine Seite weg, ist sie nicht mehr in der sitemap → kein
  Screenshot, korrekt).
- Reine ESM-Funktion, exportiert `getRoutes()`. Kein CLI-Framework.

### pages.spec.ts

```ts
import { getRoutes } from '../../scripts/visual/routes.mjs'
const routes = await getRoutes()
for (const route of routes) {
  test(`visual ${route}`, async ({ page }) => {
    await page.goto(route)
    await expect(page).toHaveScreenshot(`${slug(route)}.png`, { fullPage: true })
  })
}
```

### playwright.config.ts

- `webServer`: `pnpm exec vitepress preview`, `port: 4173`, `reuseExistingServer`.
- `use.baseURL`: `http://localhost:4173/`.
- `reporter: 'html'`.
- Determinismus (gegen Fehl-Diffs):
  - `toHaveScreenshot.maxDiffPixelRatio: 0.01` als Toleranz.
  - Animationen aus (`animations: 'disabled'`, Playwright-default bei Screenshot).
  - Ein einziges Projekt, ein Viewport (Desktop, 1280×720), Chromium. Kein
    Multi-Browser (YAGNI — Layout-Regression, nicht Cross-Browser-Test).
- `expect.timeout` moderat erhöht wegen Mermaid-Rendering.

## Determinismus-Risiken (bewusst adressiert)

- **Mermaid-Diagramme** rendern client-seitig und können minimal driften. Toleranz
  via `maxDiffPixelRatio` fängt das ab. Falls einzelne Mermaid-Seiten weiter
  rauschen: gezielt höhere Toleranz pro Seite oder mask, erst wenn es auftritt.
- **Web-Fonts**: `page.goto` wartet auf `networkidle` reicht meist nicht; die Spec
  wartet zusätzlich auf `document.fonts.ready` vor dem Screenshot.
- **Animationen**: von Playwright beim Screenshot deaktiviert.

## Baseline-Größe

`VISUAL_MODE=all` erzeugt ~870 PNGs (mehrere hundert MB im git). Das ist real und wird
dokumentiert. `VISUAL_MODE=diff` erzeugt nur wenige. Baseline wird committet, sonst gibt
es nichts zu vergleichen. Wenn die Repo-Größe ein Problem wird, ist der
Upgrade-Pfad git-lfs — nicht jetzt einbauen (YAGNI).

## Bewusst weggelassen (YAGNI)

- Kein interaktives Seite-für-Seite-Durchklicken. Der HTML-Report zeigt alle
  Diffs; Akzeptieren neuer Baselines = `--update-snapshots` nach Sichtung.
- Kein eigener Diff-Algorithmus (Playwright macht Pixel-Diff).
- Kein Multi-Browser, kein Mobile-Viewport.
- Kein eigenes CLI-Framework für routes.mjs (env-Flag genügt).

## Makefile-Integration

```makefile
visual-baseline:   ## Build + Screenshots aller Seiten als neue Baseline
	$(MAKE) build && pnpm exec playwright test --update-snapshots

visual:            ## Build + Visual-Regression aller Seiten, dann Report
	$(MAKE) build && VISUAL_MODE=all pnpm exec playwright test; \
	pnpm exec playwright show-report

visual-diff:       ## Nur git-geänderte Seiten gegen Baseline
	$(MAKE) build && VISUAL_MODE=diff pnpm exec playwright test; \
	pnpm exec playwright show-report
```

## Test-Strategie für den Code selbst

`routes.mjs` bekommt einen Node-`--test` Selbsttest (passt zum bestehenden
`node --test post-processing/lib/*.test.js`): sitemap-Parsing und der
git-diff→Route-Filter gegen eine kleine Fixture-sitemap. Die Playwright-Specs
selbst sind der Test des Renderings, brauchen keinen weiteren Test.
