---
title: 'Umsetzungsplan — CI Content Aggregation PR 2'
type: 'implementation-plan'
created: '2026-07-15'
status: 'draft'
branch: 'feature/ci-content-aggregation-pr2'
context:
  - '_bmad-output/specs/spec-ci-content-aggregation/SPEC.md (auf feature/bmad-ci-aggregation-spec)'
  - '_bmad-output/implementation-artifacts/spec-ci-aggregation-pr2.md (auf feature/bmad-ci-aggregation-spec)'
---

# Umsetzungsplan PR 2: website/ Entfernung + Enforcement + Manifest-Cleanup

## Status PR 1 (verifiziert am 2026-07-15)

PR 1 (#1011) ist gemerged und stabil. Voraussetzung fuer PR 2 erfuellt:

- `hugo/content/` liegt committed auf `origin/master` (Tree `14f2effd`)
- `github-actions[bot]` committet taeglich: `68c72dde` (07-15), `ca666883` (07-14), `562a0d91` (07-13), `3f879cde` (07-10), `6311c487` (07-09)
- Scheduled `aggregate-content` Runs laufen `success`, mehrere aufeinanderfolgende Commits belegen Idempotenz
- Netlify `ci-build` skippt Aggregation, wenn `hugo/content/` committed ist
- `post-processing/part-managed.js` liegt auf master (Klassifikations-Single-Source)

Damit ist der PR-1-Blocker aus der PR-2-Spec ("Always: PR 1 must be merged and stable first") abgehakt.

## Zielbild

```
VORHER (heute, master)                    NACHHER (nach PR 2)
──────────────────────                    ───────────────────
website/         ← lokale Quelle          [geloescht]
   │  (Docforge liest hier)
   ▼
hugo/content/    ← committed              hugo/content/    ← einzige Quelle, committed
   ├─ *.md managed:true (upstream)           ├─ *.md managed:true (upstream, Docforge)
   ├─ *.md local:true   (ex-website)         ├─ *.md local:true   (direkt editiert)
   └─ public/  (Assets, via dir:public)      └─ public/  (direkt editiert, kein Docforge-Copy)

.docforge/*.yaml → /website/... Refs      .docforge/*.yaml → nur externe Repos
   (zirkulaer: liest was es schrieb)         (Zyklus gebrochen)

Kein Schutz vor Edits an managed-Dateien  enforce-managed-files.yml blockt Edits an
                                              managed:true bei PR-Zeit (skip fuer bot)
```

Kernaussage: nach PR 2 gibt es genau eine Source-of-Truth (`hugo/content/`). Docforge aggregiert nur noch externe Repos. Lokale Dateien und Assets werden direkt im committeten Tree editiert. Edits an `managed:true`-Dateien werden bei PR-Zeit geblockt, weil der naechste naechtliche Run sie sonst ueberschreibt.

## Ist-Zustand: verifizierte Touch-Points (master, 2026-07-15)

Abweichungen gegenueber der PR-2-Spec sind markiert, die Spec war teils veraltet.

### 1. Docforge-Manifeste mit `/website/...` (breiter als Spec angab)

Manifest-Kette: `config.yaml` → `hugo.yaml` → `website.yaml` → Kind-Manifeste.

| Datei | Zeilen mit `/website/...` |
|-------|---------------------------|
| `.docforge/website.yaml` | 7, 10, 21, 26, 28-33 (inkl. `dir: public` Block + `../website/public` + `../website/index.md`) |
| `.docforge/contribute.yaml` | 3, 7, 12, 57, 241 |
| `.docforge/documentation/documentation.yaml` | 3, 6, 10, 27, 29, 231, 233, 236 |
| `.docforge/documentation/other-components.yaml` | 3 |
| `.docforge/documentation/faq.yaml` | 8 |
| `.docforge/documentation/security-and-compliance.yaml` | 2 |
| `.docforge/documentation/gardener-extensions/gardener-extensions.yaml` | 3 |
| `.docforge/adopters/adopters.yaml` | 2, 5 |

Spec nannte nur `website.yaml` + `contribute.yaml`. Real betroffen sind 8 Manifeste. Alle `/website/...` und `../website/...` Referenzen muessen raus.

### 2. og-image URL

`.vitepress/config.mts:403` (Spec sagte 400):
```
content: 'https://raw.githubusercontent.com/gardener/documentation/refs/heads/master/website/public/og-gardener.png'
```
→ Ziel: `.../refs/heads/master/hugo/content/public/og-gardener.webp`

Befund 2026-07-15: die Datei heisst real `og-gardener.webp` (der Asset-Optimizer hat die PNG konvertiert), die URL zeigte aber auf `.png`. Damit war die og-image-URL bereits VOR PR 2 kaputt (404). PR 2 korrigiert Pfad UND Endung. Asset `og-gardener.webp` liegt committed auf master (`7191f347`), URL loest nach Merge auf.

`srcDir` = `hugo/content` (config.mts:15), also `publicDir` = `hugo/content/public/`. Bestaetigt.

### 3. Vale-Workflow `.github/workflows/vale.yml`

- Zeile 7: `paths: - 'website/**/*.md'` → `hugo/content/**/*.md`
- Zeile 32: `files: website/` → `hugo/content/` (Spec erwaehnte diesen Parameter nicht)
- Zeile 36: `filter_mode: added` → bleibt
- Zeile 8: `workflow_dispatch` bereits vorhanden

### 4. Makefile

- Zeile 229: `git diff ... -- 'website/**/*.md'` → `hugo/content/**/*.md`
- Zeilen 230-231: grep-Filter `^website/about/legal-disclosure\.md` und `^website/archived/` → `^hugo/content/about/legal-disclosure\.md` und `^hugo/content/archived/`
- Zeile 110: `OPTIMIZE_DIR ?= website` (Zeilen 117, 124 nutzen es fuer Asset-Optimierung) → `hugo/content`. Bricht sonst nach website/-Loeschung. (Entscheidung 2026-07-15)

### 5. README

"Editing content" Abschnitt um `local:true` / `managed:true` Konvention erweitern.

## Umsetzungsschritte (inkrementell, jeder Schritt einzeln verifizierbar)

Reihenfolge so gewaehlt, dass `website/`-Loeschung ZULETZT kommt, nach allen Referenz-Bereinigungen und nach dem Dry-Run-Nachweis.

### Phase 0 — Pre-flight (Ask-First-Guards)
- [ ] Offene PRs gegen `website/**` pruefen (`gh pr list --search "website in:path"`). Falls vorhanden → HALT, Umleitung koordinieren.
- [ ] Dry-run: `aggregate-content` per `workflow_dispatch` auf diesem Branch triggern, BEVOR Manifeste geaendert werden → Baseline zero-diff bestaetigen.

### Phase 1 — Enforcement (additiv, bricht nichts)
- [ ] `hack/check-managed.mjs` neu (SPEC Section 4): liest argv-Dateiliste, failt bei `managed:true`, druckt Upstream-URL `{github_repo}/blob/master/{github_subdir}`, `process.exit(2)` bei Parse-Fehler. ESM, `node:` Imports, `gray-matter`.
- [ ] `.github/workflows/enforce-managed-files.yml` neu (SPEC Section 4): `pull_request` auf `hugo/content/**/*.md` + `workflow_dispatch`, `if: github.actor != 'github-actions[bot]'`, concurrency-group, `git diff --diff-filter=AM base...HEAD | xargs -r node hack/check-managed.mjs`.
- [ ] Test-Commits auf Branch: managed-Edit → fail, local-Edit → pass, public/-Asset → Workflow laeuft nicht (path-Filter).

### Phase 2 — Referenzen umbiegen (vor Loeschung)
- [ ] `.vitepress/config.mts:403` og-image URL → `hugo/content/public/`.
- [ ] `.github/workflows/vale.yml`: `paths:` (Z7) + `files:` (Z32) → `hugo/content/`.
- [ ] `Makefile`: `vale-run` git-diff Pfad (Z229) + grep-Filter (Z230-231) → `hugo/content/`; `OPTIMIZE_DIR ?= website` (Z110) → `hugo/content/public` (NICHT `hugo/content`: der Optimizer scannt rekursiv, `hugo/content` wuerde 231 managed Upstream-PNGs erfassen, die der naechste Run ueberschreibt; `public/` = 17 lokale Site-Assets, Pendant zum heutigen `website/public`).
- [ ] `README.md`: "Editing content" um `local`/`managed`-Konvention + Upstream-Workflow erweitern.

### Phase 3 — Manifest-Cleanup
- [ ] Alle 8 `.docforge/*.yaml` von `/website/...` und `../website/...` bereinigen (inkl. `dir: public` Block `website.yaml:28-33` und `../website/index.md` Z33).
- [ ] Docforge aggregiert danach nur externe Repos. Lokale Dateien/Assets leben nur noch im committeten Tree.

### Phase 4 — Loeschung + Verifikation
- [ ] Verifikations-Dry-run: `aggregate-content` per `workflow_dispatch` erneut → MUSS zero-diff unter `hugo/content/` (inkl. `public/`) liefern. Bei Diff → HALT (Ask-First), Manifest-Cleanup hat Output veraendert.
- [ ] `website/` komplett loeschen.
- [ ] Netlify Deploy-Preview: Seite rendert identisch, og-image meta-Tag → 200.

## Acceptance (aus PR-2-Spec)

1. Dry-run `aggregate-content` auf Branch → zero-diff unter `hugo/content/` (inkl. `public/`).
2. Netlify-Preview: og-image 200, Seite rendert wie PR-1-Zustand.
3. managed-Edit → Enforcement failt mit Datei + Upstream-URL.
4. local-Edit → Enforcement passt.
5. `public/`-Asset-Edit → Enforcement laeuft nicht (path-Filter).
6. README fuehrt Contributor korrekt zu local (hier editieren) vs managed (upstream PR).
7. Naechster scheduled Run committet zero-diff (steady state).

## Boundaries (aus PR-2-Spec, unveraendert)

**Never:**
- Keine Aenderung an `part-managed.js` (nach PR 1 frozen).
- Keine Aenderung an `aggregate-content.yml` ausser bei Bug.
- Kein `/override-managed` Bypass.
- Keine CodeRabbit-Config-Aenderung.
- Kein Verschieben von `hugo/content/public/` nach `.vitepress/public/` (Future Work).
- Kein Rename von `hugo/` (Future Work).

**Ask First:**
- Dry-run erzeugt Diff gegen PR-1-Baseline → HALT.
- Rollback via `git checkout <sha>~1 -- website/` noetig → HALT.
- Offene PRs gegen `website/**` nach PR-1-Merge → HALT.

## Rollback

Revert dieses PR: stellt `website/` aus History wieder her (`git checkout <PR2-merge-sha>~1 -- website/`), Original-Manifeste (inkl. `dir: public`), og-image URL, Vale-Filter. Enforcement-Workflow via `Settings → Actions` deaktivieren.

## Offene Punkte / Abweichungen zur Spec

- Manifest-Cleanup betrifft 8 Dateien statt der in der Spec genannten 2. Vollstaendige Liste oben.
- og-image ist Zeile 403, nicht 400.
- `vale.yml` hat zusaetzlich `files: website/` (Z32), nicht nur `paths:`.
- `Makefile` hat `OPTIMIZE_DIR ?= website` (Z110) und website-spezifische grep-Filter (Z230-231), beide nicht in der Spec, brechen aber nach Loeschung. Ziel geklaert: `hugo/content` (Entscheidung 2026-07-15).
