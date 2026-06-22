---
project_name: 'gardener-documentation'
user_name: 'Niklas'
date: '2026-06-18'
sections_completed: ['technology_stack', 'language_specific', 'framework_specific', 'testing', 'code_quality', 'workflow', 'critical_rules']
status: 'complete'
optimized_for_llm: true
existing_patterns_found: 0
---

# Project Context for AI Agents

_This file contains critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss._

---

## Technology Stack & Versions

### Site & Theme
- **VitePress** 1.6.4 (`.vitepress/config.mts`) — wrap final config with `withMermaid(defineConfig({...}))`; `withMermaid` is the outer HOC.
- **Vue** 3.5.16 (exact pin) — theme components in `.vitepress/theme/components/` as PascalCase SFCs (`<script setup lang="ts">`).
- **Theme entry:** `.vitepress/theme/index.ts` — `extends: DefaultTheme`, slot overrides via `Layout()` (`doc-before`, `aside-top`, `aside-outline-before`, `home-features-before`, `layout-bottom`); global components registered in `enhanceApp()` (currently `YouTubeVideo`, `VPFeatures`, `CardGrid`). No auto-import — register explicitly.
- **TypeScript** with `strict: true`, ESM-only (`"type": "module"`), `tsconfig.json` `include` is **only** `.vitepress/**/*` — `scripts/` and content are NOT type-checked.
- **Mermaid** ^11.15.0 + `vitepress-plugin-mermaid` ^2.0.17 — `mermaid: { securityLevel: 'strict' }` is enforced.
- **Sidebar:** `vitepress-sidebar` 1.33.1 wrapped by custom generators in `.vitepress/theme/*-sidebar.ts` via `generateWeightSortedSidebar()` helper (`utils/sidebar.ts`); generators read from `hugo/content/` at build time.
- **Search:** local provider with custom MiniSearch tokenizer + section splitter in `getSearchConfig()` — works around a VitePress 1.6.3 anchor-extraction bug. Do not regress to default `provider: 'local'` without the override.
- **i18n:** none — site is EN only, no `locales` config.
- **Base path:** `siteBase = process.env.VITE_PUBLIC_BASE_PATH || ''`; `make build` sets it empty explicitly.

### Markdown Pipeline
- `markdown.languages: ['go']` plus aliases mapping `golang→go`, `code|shell|term|b|terminaloutput→shell`.
- `markdown.config(md)` adds `v-pre` to inline code tokens — Vue interpolation in `` `code` `` is **disabled** project-wide. Curly-brace examples in inline code are safe.
- `ignoreDeadLinks: true` with TODO `// enable after migration` — internal links are NOT validated by VitePress build today.
- VitePress-flavored markdown extensions are available (containers `::: tip`, `::: warning`, `::: details`; code groups; line highlighting `{2,4-6}`).

### Content Pipeline (Hugo legacy → VitePress)
- **`hugo/` is legacy naming, not Hugo.** Project migrated from Hugo/Docsy to VitePress; the directory name and `srcDir: 'hugo/content'` are convention-frozen. Never suggest Hugo commands.
- **Aggregator:** `docforge` v0.57.0 (Go binary at `./bin/docforge`, gitignored; downloaded by `make docforge-download`). Config: `.docforge/config.yaml`, manifests under `.docforge/*.yaml`. Requires `GITHUB_OAUTH_TOKEN` env or `gh auth login`.
- **Docforge flags in use:** `hugo: true`, `persona-filter-enabled`, `aliases-enabled`, `docsy-edit-this-page-enabled`, `skip-link-validation: true`.
- **Post-processing:** `make post-process` runs 4 phases (`post-processing/part-1.js`, `part-2.js`, `part-index.js`, `part-3.js`) — translates remaining Hugo/Docsy syntax (`_index.md` → `index.md`, shortcodes, etc.) into VitePress-compatible markdown. **Required after every docforge run.**
- Pipeline order: `website/` (+ remote repos via Docforge manifests) → `docforge` aggregates into `hugo/content/` → `make post-process` rewrites → VitePress builds.

### Authoring Stack
- **Vale** with custom `Gardener` style (`.vale/styles/Gardener/`, config `.vale.ini`). Custom vocab: `GardenerTerms`, `ThirdPartyProducts`, `TechJargon`, `General`. Suppress per-block via `<!-- vale Gardener.<Rule> = NO -->`.
  - currently the workflow is disabled, work in progress. 
- **Blog post layout:** `website/blog/YEAR/MONTH/post.md`. Frontmatter is Hugo-style (legacy from Docsy era):
  ```yaml
  title: "..."
  linkTitle: "..."
  newsSubtitle: "Month DD, YYYY"
  publishdate: YYYY-MM-DD       # date-only, no time/zone
  authors:
    - avatar: https://avatars.githubusercontent.com/<login>
      email: <optional>
      login: <github-handle>
      name: "Full Name"
  tags: [...]
  aliases: ["/blog/YYYY/MM/DD/slug"]
  ```
- **Asset optimization:** `sharp` ^0.34.5 powers `make optimize-assets` (dry-run) / `optimize-assets-write` — converts large PNGs to WebP and rewrites references.

### Utilities & Misc
- `gray-matter` 4.0.3 + `js-yaml` 4.1.1 — frontmatter parsing in sidebar generators / scripts.
- `lodash-es` 4.18.1 — **never `lodash` (CJS)**. Prefer per-method imports for tree-shaking: `import debounce from 'lodash-es/debounce'`.

### Reproducibility & Supply Chain
- **Package manager:** npm; `package-lock.json` is the only lockfile. **No `packageManager` field, no Corepack pin.**
- **Node version:** **not pinned** in repo (no `.nvmrc`, no `engines`, no `.node-version`). Sources of truth diverge:
  - `Dockerfile` uses `node:24.5.0-alpine3.21` (digest-pinned) for `make docker-preview`
  - `@types/node` is `20.11.27` (only a typings hint, not a runtime pin)
  - Netlify uses platform default unless overridden in `netlify.toml` (currently no `NODE_VERSION`)
  - **Treat Node 20+ as minimum; assume Node 24 in containerized builds.**
- **`.npmrc`:** `min-release-age=7` — newly published packages only become installable after 7 days (supply-chain delay).
- **Axios override:** `>0.30.4 <=1.14.0` (security override in `package.json`) — do not relax without re-checking advisories.
- **Docforge binary:** version pinned in `Makefile` (`v0.57.0`); fetched via curl from GitHub releases (no SHA verification today).
- **Docforge remote sources:** refs in `.docforge/*.yaml` manifests — pinning policy lives in those files.
- **CI workflow inventory:** only `.github/workflows/vale.yml` exists. There is **no** TypeScript-check gate, **no** VitePress build gate, **no** link-check gate. Build correctness rides on the Netlify deploy.

### Build Outputs (gitignored)
- `.vitepress/dist/` — VitePress build output (Netlify publish dir).
- `.vitepress/cache/` — VitePress cache.
- `bin/` — Docforge binary.
- `hugo/**` — entire aggregated content tree (regenerated each build); whitelist: `.docforge/**/*.yaml`, `.github/**/*.yaml`. Note: `.gitignore` globally ignores `*.yaml` — when adding YAML elsewhere, add an explicit `!path/...` whitelist.

## Critical Implementation Rules

### Language-Specific Rules

#### TypeScript / ESM
- Project is ESM-only (`"type": "module"`). All imports use ESM syntax — `require` is forbidden.
- TypeScript checking scope is **only** `.vitepress/**/*` (config.mts, theme/, plugins/, shared/). Code under `scripts/` and `post-processing/` is plain JS with **no** type checks — agents must not assume TS in these directories.
- `tsconfig.json` enables `allowImportingTsExtensions: true` — **always include the file extension** in TS imports: `import x from './foo.ts'`, not `'./foo'`. Pattern is project-wide (see `.vitepress/config.mts`); follow it.
- Imports for Node built-ins use the `node:` protocol: `import { fileURLToPath } from 'node:url'`, not `'url'`.
- No path aliases configured (`tsconfig.json` has no `paths`). All theme imports are relative.
- `allowSyntheticDefaultImports: true` and `allowJs: true` are set; `types: ['vite/client']` provides Vite client types in `.vitepress/**/*`. Do not add other ambient types without updating tsconfig.
- `vueCompilerOptions.vitePressExtensions: [".md"]` — the Vue compiler treats `.md` as Vue-aware; embedded components in markdown go through Vue's template compiler.

#### Vue 3 SFC patterns
- Use `<script setup lang="ts">` — Options API is not used in this codebase. Match neighbors.
- Component filenames are PascalCase (`Banner.vue`, `BlogIndex.vue`). One component per file. Sidebar/util TS files are kebab-case (`blog-sidebar.ts`, `docs-sidebar.ts`).
- Components are **not** auto-imported. Two registration paths:
  - **Global in Markdown:** add `app.component('Name', Comp)` inside `enhanceApp({ app })` in `.vitepress/theme/index.ts`.
  - **Theme layout slot:** add a slot to the `h(DefaultTheme.Layout, null, { ... })` call inside `Layout()` in `.vitepress/theme/index.ts`.
- Inline code in Markdown is rendered with `v-pre` (Vue interpolation disabled project-wide). When you actually need Vue templating, write a real Vue component — do not work around the `v-pre` patch.
- Browser-only code (anything touching `window`, `document`, browser-only mermaid APIs) MUST be wrapped in `<ClientOnly>` or guarded by `import.meta.env.SSR`. VitePress prerenders at build time; unguarded browser refs throw during `make build`.

#### Plain JS in `scripts/` and `post-processing/`
- Plain ESM `.js` / `.mjs`, executed by Node directly. No transpile step, no type check, no lint.
- Follow the existing pattern: argv parsing, `try/catch` with `console.error('Error:', err.message)` + `process.exit(1)` on fatal failures (see `post-processing/part-index.js`).
- Use Node built-ins (`node:fs`, `node:path`, `node:url`) — keep these scripts dependency-light. Adding a new dep here is high-friction (`.npmrc` `min-release-age=7` quarantine).

#### Library import conventions
- `lodash-es` only — never `lodash` (CJS). Prefer per-method imports for tree-shaking: `import debounce from 'lodash-es/debounce'`.
- `gray-matter` + `js-yaml` are the blessed frontmatter/YAML parsers. Do not introduce alternatives (`yaml`, `front-matter`, etc.).
- New runtime dependencies require justification — `.npmrc` enforces a 7-day quarantine, and there is no automated dependency-update gate today.

#### Error handling
- Throw real `Error` instances in TS/Vue code; do not swallow exceptions with empty `catch`.
- In Node scripts, log with operation context (path, function name) before `process.exit(1)`.
- Sidebar generators / content readers must fail loudly when `hugo/content/` is missing or empty — silent empty sidebars hide the fact that a dev forgot `make local-preview`.

### Framework-Specific Rules (VitePress / Vue Theme)

#### `.vitepress/config.mts` lifecycle
- Single config exports `withMermaid(defineConfig({ ... }))`. Order matters: `withMermaid` is the outermost wrapper.
- Sidebars are pre-computed at module-load time into `allSidebars` (a const at module scope), then handed to VitePress. New sidebar sections must be added to that const, not lazy-built per request.
- `transformPageData(pageData)` runs for every page during render:
  - For `blog/**` pages, it auto-injects `outline: false` if the page didn't explicitly set `outline`.
  - For empty `index.md` pages (no markdown body), it auto-injects `frontmatter.taxonomyChildren` from the matching sidebar — these are then rendered by the `TaxonomyIndex` component (slotted into `doc-before`). Do not write index pages with empty bodies expecting a default landing page; rely on the taxonomy injection.
- `rewrites(id)` rewrites any non-`_index.md` markdown path to `<path>/index.md` — folder-based routing. New top-level files in `hugo/content/` follow this convention.
- `buildEnd(siteConfig)` calls `generateAliasRedirects(siteConfig)` — every page's `aliases` frontmatter array becomes a static HTML redirect file in `dist/`. To redirect old URLs, add `aliases: ["/old/path"]` to the new page's frontmatter; do not write redirect HTML by hand.
- `srcExclude` currently skips `**/archived/**`, `**/community-bio.md`, `**/html/**`, and one specific extension reference doc. Append here when content must not be built.

#### Sidebar generators
- All sidebar generators live in `.vitepress/theme/*-sidebar.ts` (`blog-sidebar.ts`, `community-sidebar.ts`, `contribute-sidebar.ts`, `docs-sidebar.ts`).
- Most go through `generateWeightSortedSidebar()` in `utils/sidebar.ts`, which:
  1. Calls `vitepress-sidebar` `generateSidebar()` against `documentRootPath: '/hugo/content'`
  2. Sorts entries by `weight:` frontmatter field (lowest first)
  3. Filters out `_index.md` entries (those are folder index pages, not nav items)
  4. Removes empty groups
  5. Adds trailing slashes to links
- The `weight:` frontmatter field is the **only** way to control docs/community sidebar ordering. Without `weight`, items are pushed to the end. Document this when introducing new content.
- `blog-sidebar.ts` does **not** use `generateWeightSortedSidebar` — blog posts are sorted by date prefix in the filename (`MM-DD-slug.md`), not by `weight`. Year folders descend numerically (newest top).
- Sidebar generators read from disk at build time. They must run **after** `make post-process` has produced `hugo/content/`. Calling `make dev` without a prior `make local-preview` (or `make docforge-ci && make post-process`) will produce empty/broken sidebars.

#### Theme composition
- Custom theme entry: `.vitepress/theme/index.ts`. Composition pattern is fixed:
  - `extends: DefaultTheme` keeps stock VitePress UI.
  - Slot overrides go into the `Layout()` `h(DefaultTheme.Layout, null, { ... })` call. Each slot returns a `h(Component)` call.
  - Globally available components (usable in any markdown file as `<Name />`) are registered via `app.component('Name', Comp)` inside `enhanceApp`.
- Currently slotted components: `TaxonomyIndex` (`doc-before`), `BlogPostMeta` (`aside-top`), `PageActions` (`aside-outline-before`), `Banner` (`home-features-before`), `VPFooter` (`layout-bottom`).
- Currently global-in-markdown: `YouTubeVideo`, `VPFeatures`, `CardGrid`. Authors can use these directly in `.md` content.
- `style.css` in the theme directory is the single source of CSS. No CSS-in-JS, no preprocessor; CSS variables follow VitePress's `--vp-*` token system.

#### Mermaid
- `mermaid: { securityLevel: 'strict' }` is enforced in config. Do not relax to `loose` — that allows arbitrary HTML in diagrams, which is a content-injection risk given remote-aggregated content.
- Diagrams are written as fenced code blocks with `mermaid` language: ` ```mermaid `. The plugin renders them client-side, so SSR is fine — no `<ClientOnly>` needed for the standard case.

#### Search override (do not regress)
- The local search provider has a custom `_splitIntoSections` and MiniSearch tokenizer in `getSearchConfig()` — they fix a duplicate-anchor bug in VitePress 1.6.3 and extract `tags` / `categories` frontmatter into the search index.
- When upgrading VitePress, **diff the upstream `chunk-*.js` `splitPageIntoSections` implementation** before removing the override; the bug may persist. Re-running with the override on a fixed VitePress is harmless.

#### Markdown content patterns
- VitePress containers (`::: tip`, `::: warning`, `::: danger`, `::: details`), code groups, and line-highlighting are available — prefer these over hand-rolled HTML or Hugo-style shortcodes.
- Frontmatter fields recognized by this site:
  - `weight` (number) — sidebar ordering; lower = earlier
  - `aliases` (string[]) — redirect sources, generated as HTML redirect files at build
  - `outline` (boolean | array) — VitePress outline; auto-set to `false` for blog posts
  - `title`, `linkTitle`, `description` — standard
  - Blog-only: `publishdate` (`YYYY-MM-DD`), `newsSubtitle`, `authors[]`, `tags[]`
- The Docforge config sets `aliases-enabled: true` and `docsy-edit-this-page-enabled: true` — aliases from upstream Hugo content are preserved through aggregation. Don't strip them in post-processing without checking redirect coverage.

#### Build-time vs. runtime
- VitePress prerenders pages at `make build`. Anything browser-only (DOM access, browser-only mermaid APIs, `IntersectionObserver`, etc.) must be wrapped in `<ClientOnly>` or guarded by `import.meta.env.SSR === false`.
- `transformPageData` and sidebar generators run in Node at build time — they may use `node:fs`, but must not throw on missing files (prefer warnings) lest a single broken markdown file abort the whole build.

### Testing Rules

#### Reality check (read first)
- This repo has **no automated test suite**: no Vitest, no Jest, no Playwright, no Cypress, no `tests/` or `__tests__` directories. The `package.json` has no `test` script.
- The only automated quality gate is **Vale prose linting** on `website/**/*.md` (`.github/workflows/vale.yml`, `fail_on_error: true`, `--minAlertLevel=warning`, `filter_mode: added`).
- There is **no** TypeScript-check CI gate, **no** VitePress build CI gate, **no** link-check CI gate. Build correctness is verified at Netlify deploy time.

#### Do not introduce a test framework without explicit alignment
- Adding Vitest, Playwright, etc. is a **product decision**, not an implementation detail. Do not add `test` scripts, `vitest.config.ts`, or test files unsolicited.
- If a change genuinely needs a regression guard, surface that to the user and decide together — don't sneak `*.test.ts` files into PRs.

#### How to verify changes manually
- **Code-only change** (`.vitepress/**`): `make dev` (assumes `hugo/content/` already populated). Open `http://localhost:5173`, exercise the affected routes/components.
- **Local content change** (`website/**`): `make local-preview` does the full clean rebuild (clears `hugo/`, runs Docforge, post-processes, builds, previews). Slow but correct.
- **Remote content experiment**: edit directly in `hugo/content/**` and `make dev` — but treat as throwaway; the real fix must be PR'd to the upstream source repo (e.g. `gardener/gardener`, `gardener/dashboard`).
- **Production-like build**: `make build` (= `vitepress build`). Catches SSR errors, broken Vue templates, and missing dependencies that `make dev` may tolerate.

#### Vale workflow
- **Local lint of changed files:** `make vale` (auto-installs the binary, then `make vale-run` lints `git diff` markdown files in `website/`, excluding `legal-disclosure.md` and `archived/`).
- **CI lint:** Vale runs on every PR that touches `website/**/*.md`. `filter_mode: added` means **only newly added lines** are flagged — pre-existing prose violations don't block, but new ones do.
- **Suppress a rule per-block** when a violation is intentional and justified:
  ```markdown
  <!-- vale Gardener.<RuleName> = NO -->
  ...intentionally non-conforming text...
  <!-- vale Gardener.<RuleName> = YES -->
  ```
- Don't disable styles repo-wide to bypass a single false-positive. Add the term to `.vale/styles/config/vocabularies/<Vocab>/accept.txt` instead.

#### Smoke checks before declaring "done"
For non-trivial changes, run at least:
1. `make build` — must complete without error.
2. `make dev` — render the affected routes; visually confirm no broken layout, no console errors.
3. If markdown changed: `make vale` on the touched files.
4. If sidebar generators / `transformPageData` / theme entry changed: verify the affected sections (docs, blog, community, contribute landing) still render and navigate correctly.

There is no automated equivalent for these — they are the manual contract.

### Code Quality & Style Rules

#### Linting reality
- **No ESLint, no Prettier, no Stylelint** in this repo. There is no automated formatter or code linter for TS/Vue/JS.
- Style is enforced by **convention and code review**: read the closest existing file in the same directory and match its formatting, indentation, quote style, and import order.
- Vale lints prose only (`.md` files in `website/**`). It does not see code in `.vitepress/**`, `scripts/**`, or `post-processing/**`.

#### Naming conventions (observed)
- **Vue SFCs:** PascalCase, one component per file — `Banner.vue`, `BlogIndex.vue`, `VPFooter.vue`. Prefix with `VP` only when intentionally mirroring a VitePress default-theme component (`VPFooter`, `VPFeature`, `VPSidebarItem`).
- **TypeScript files:** kebab-case for theme/sidebar/util files — `blog-sidebar.ts`, `community-sidebar.ts`, `alias-redirects.ts`. camelCase exports inside.
- **Plain JS scripts:** kebab-case — `optimize-assets.mjs`, `part-index.js`, `part-1.js`.
- **Functions:** camelCase. **Types/Interfaces:** PascalCase. **Constants:** SCREAMING_SNAKE_CASE only for true module-level constants; otherwise camelCase.
- **CSS variables:** match VitePress's `--vp-*` token system; project-specific overrides go in `.vitepress/theme/style.css`.

#### Formatting (observed conventions)
- 2-space indentation across TS, JS, Vue, YAML.
- Single quotes in TS/JS; double quotes in YAML/Markdown frontmatter strings only when required.
- Semicolons in TS/JS files (matches existing `.ts` files).
- Trailing comma in multiline arrays/objects is the existing pattern — keep it.
- One blank line between top-level declarations; no blank line at file start; final newline at file end.

#### Comments — WHY, not WHAT
- Default to writing **no comments**. Code with named identifiers documents itself.
- Add a comment only when the *why* is non-obvious: a hidden constraint, a workaround for a specific upstream bug (e.g. the search override comment in `config.mts`), a license/security note.
- Do **not** describe what the code does, reference the current task or PR, or leave `// TODO` markers without an issue link or owner.
- Multi-line block comments and JSDoc walls are not used in this codebase. Match the terse single-line style.

#### File organization
- `.vitepress/config.mts` — single source of site config. Helper functions (`getNavConfig`, `getSearchConfig`, etc.) live in the same file at module scope.
- `.vitepress/theme/` — theme code. Components in `components/`, sidebar generators at the root, shared utilities in `utils/`, theme entry `index.ts`.
- `.vitepress/plugins/` — Vite plugins (e.g. `alias-redirects.ts`).
- `.vitepress/shared/` — code shared between build-time and theme runtime (e.g. `blogMetadata.ts`).
- `.vitepress/data/` — VitePress data loaders (`*.data.ts`).
- `scripts/` — top-level utility scripts, plain ESM.
- `post-processing/` — Hugo→VitePress translation phases, plain ESM, executed sequentially by `make post-process`.
- `hack/` — operational shell scripts (not part of the build).

#### Documentation
- **Do not create new `*.md` files** outside `website/`, `_bmad/**`, or `docs/` unless the user explicitly asks. No README files, no architecture decision records, no design notes generated proactively.
- The repo's existing top-level docs (`README.md`, `CONTRIBUTING.md`, `GOVERNANCE.md`, `OWNERS`, `LICENSE`) are governance documents — do not edit casually; require maintainer approval.

#### Reuse over abstraction
- Match neighboring code's degree of abstraction. The codebase is intentionally thin and direct — three similar functions are preferable to a premature parameterized helper.
- Don't add error-handling, fallbacks, or validation for scenarios the framework already covers (VitePress, Vue, Vite). Trust the framework guarantees.
- Don't add feature flags or backwards-compatibility shims when a direct change is possible — the only consumer is this repo.

### Development Workflow Rules

#### Pick the right Make target
- `make local-preview` — clean rebuild: deletes `hugo/`, runs `docforge-ci`, `install`, `post-process`, `build`, then `vitepress preview`. **The only correct way to verify content changes** and the safe default after pulling.
- `make dev` — `npx vitepress dev`. Fast feedback loop for `.vitepress/**` edits only. Assumes `hugo/content/` is already populated; on a fresh checkout it produces empty sidebars.
- `make build` — `VITE_PUBLIC_BASE_PATH='' npx vitepress build`. Local equivalent of the Netlify production build; catches SSR errors.
- `make ci-build` — `docforge-ci install post-process build`. What CI runs end-to-end.
- `make post-process` — re-runs the 4 phases (`part-1.js`, `part-2.js`, `part-index.js`, `part-3.js`) without re-aggregating. Use after manual edits to `hugo/content/` if you want to re-trigger the Hugo→VitePress translation.
- `make docforge-ci` — non-interactive Docforge run with `DOCFORGE_CONFIG=.docforge/config.yaml`. Used by `local-preview` and CI. Prefer over `make docforge-run` (which prompts before overwriting).
- `make docker-preview` — containerized full preview via `hack/preview.sh`. Use when local Node/toolchain is unavailable.
- `make vale` — installs Vale (v3.14.2) into `bin/` and lints changed `website/**/*.md` against the local Gardener style.
- `make optimize-assets` (dry-run) / `make optimize-assets-write` — `sharp`-based PNG→WebP conversion under `OPTIMIZE_DIR=website` with rewrite of references. Default `OPTIMIZE_MIN_KB=200` and an explicit favicon/og-image skip list.

#### Three-mode content workflow
- **Code-only changes** (`.vitepress/**`, theme, plugins): one-time `make local-preview` to seed `hugo/content/`, then `make dev` for the iteration loop.
- **Local content changes** (`website/**`): run `docforge` to re-aggregate, then `make post-process` to translate Hugo/Docsy syntax. Only then will edits be visible.
- **Remote content experimentation**: edits to `hugo/content/**` are **throwaway** (regenerated on every aggregation). The permanent fix must be PR'd to the upstream source repo (`gardener/gardener`, `gardener/dashboard`, `gardener/gardenctl-v2`, etc.). Never tell a user to "just edit `hugo/content/`" as a real fix.

#### Environment requirements
- `DOCFORGE_CONFIG=.docforge/config.yaml` and `GITHUB_OAUTH_TOKEN` (a GitHub PAT, or use `gh auth login` and export the token) must be set before `make docforge-run`. `docforge-ci` exports `DOCFORGE_CONFIG` itself but still needs `GITHUB_OAUTH_TOKEN` for the GitHub API rate limit when fetching remote content. See `docs/resources/github-token-guide.md`.
- Persist these in `~/.zshrc` / `~/.bashrc`; the Make target fails fast with a setup hint if either is missing.

#### Branch & commit conventions
- Branch names: `feature/<short-description>` or `fix/<short-description>`. Match the conventional-commit type to the branch prefix.
- Conventional Commits: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `feat(blog):`, etc. Subject ≤ ~70 chars, imperative, no trailing period. Match recent `git log` style — most commits in this repo are `docs:` or `feat(blog):`.
- Create new commits rather than amending merged ones; do not force-push to `master`.

#### Pull requests
- Use `.github/pull_request_template.md`. Replace the `/kind TODO` line with one or more of: `api-change | bug | cleanup | discussion | enhancement | epic | flake | impediment | poc | post-mortem | question | regression | task | technical-debt | test`.
- Fill **What this PR does / why we need it** and **Which issue(s) this PR fixes** (`Fixes #<issue>`). The template explicitly forbids company-internal information — strip SAP-internal references, ticket IDs, and intranet URLs before opening.
- CodeRabbit AI review is configured (`.coderabbit.yml`) to **ignore `website/**`** — content-only PRs receive no automated AI review feedback. Code PRs (`.vitepress/**`, `scripts/**`, `post-processing/**`, root configs) do get reviewed.

#### CI gates today (cross-ref Tech Stack)
- Only `.github/workflows/vale.yml` runs on PRs (Vale lints `website/**/*.md`, `filter_mode: added`). There is no TS-check, no VitePress build, no link-check gate.
- Build correctness rides on the Netlify deploy preview. Treat the preview deploy URL as the canonical "did it build" signal until further CI is added.

### Critical Don't-Miss Rules

- **`hugo/` is legacy naming** — never suggest Hugo CLI commands, Docsy theme features, or Hugo layouts. VitePress is the only generator. (See Tech Stack — Content Pipeline.)
- **Editing `hugo/content/**` is throwaway** — every aggregation regenerates it. The permanent fix lives in the upstream source repo (see Three-mode content workflow).
- **Never skip `make post-process` after a `docforge` run** — `_index.md`, shortcodes, alerts, and folder navigation all break silently otherwise.
- **Do not run `make dev` on a fresh checkout** — without `hugo/content/` populated, sidebars render empty. Run `make local-preview` first.
- **Never import from `lodash` (CJS)** — only `lodash-es`, prefer per-method imports.
- **Always include the explicit `.ts` extension** in TS imports — `tsconfig.json` enables `allowImportingTsExtensions` and the convention is project-wide.
- **Do not add ESLint, Prettier, Stylelint, Vitest, Jest, Playwright, or Cypress** without explicit user alignment — none exist today and adding one is a product decision.
- **Do not create `*.md` documentation files** (READMEs, ADRs, design notes) outside `website/**`, `_bmad/**`, or `docs/**` unsolicited.
- **Do not casually add runtime dependencies** — `.npmrc` enforces a 7-day quarantine (`min-release-age=7`) and there is no automated dependency-update gate.
- **Do not relax the axios override** (`>0.30.4 <=1.14.0` in `package.json`) without re-checking advisories.
- **Do not remove the `getSearchConfig()` override** without diffing the upstream VitePress `splitPageIntoSections` for the anchor-extraction bug. Regression yields duplicate-anchor search results.
- **Do not change `mermaid: { securityLevel: 'strict' }` to `'loose'`** — content-injection risk given Docforge aggregates from many remote sources.
- **Do not introduce auto-import for Vue components** (e.g. `unplugin-vue-components`). Components are explicitly registered in `enhanceApp()` or slotted in `Layout()`.
- **Wrap browser-only code** in `<ClientOnly>` or guard with `import.meta.env.SSR` — VitePress prerenders at build time and unguarded `window`/`document` refs break `make build`.
- **Do not hand-write redirect HTML** — add `aliases: ["/old/path"]` to the new page's frontmatter; `buildEnd` generates the redirect file automatically.
- **Do not drop `weight:` frontmatter** from docs/community pages — it is the only way to control sidebar order; missing values silently push items to the end.
- **Do not edit top-level governance docs** (`README.md`, `CONTRIBUTING.md`, `GOVERNANCE.md`, `OWNERS`, `LICENSE`) without maintainer approval.
- **Do not commit generated/binary artifacts** — `hugo/**`, `bin/`, `.vitepress/dist/`, `.vitepress/cache/`, `node_modules/` are all gitignored intentionally.
- **`.gitignore` globally ignores `*.yaml`** — when adding a YAML file in a new location, append an explicit `!path/...` whitelist or it will silently not be committed.
- **Never include company-internal information in a PR** — the pull request template explicitly forbids it.
- **Do not force-push to `master`, amend merged commits, or pass `--no-verify`** without explicit user approval.

---

## Usage Guidelines

**For AI Agents:**

- Read this file before implementing any code.
- Follow ALL rules exactly as documented; when in doubt, prefer the more restrictive option.
- Cross-reference sections rather than re-deriving facts (e.g. CI inventory lives in Tech Stack and Testing; workflow targets in Workflow Rules).
- If a new pattern emerges that contradicts these rules, surface it to the user before encoding it.

**For Humans:**

- Keep this file lean and focused on agent needs — duplicate facts get stale.
- Update when the technology stack changes (VitePress major bump, Docforge bump, lockfile/Node-pin policy changes, new CI gate, new lint/test framework).
- Review periodically and prune rules that have become obvious or that the toolchain now enforces automatically.

Last Updated: 2026-06-18
