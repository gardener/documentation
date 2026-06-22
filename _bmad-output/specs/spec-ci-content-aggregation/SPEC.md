---
title: 'CI-Based Content Aggregation (Design Document)'
type: 'design-document'
created: '2026-06-22'
status: 'ready-for-dev'
---

# CI-Based Content Aggregation

**Date:** 2026-06-22 (refined 2026-06-22)
**Author:** Niklas (with Claude)
**Status:** Approved (refined)

> **Note:** This is the canonical design document. Implementation is split across two PRs, each tracked by its own quick-dev spec under `_bmad-output/implementation-artifacts/`:
>
> - `spec-ci-aggregation-pr1.md` — CI workflow + first aggregated commit + Netlify reduction + `part-managed.js`
> - `spec-ci-aggregation-pr2.md` — `website/` removal + enforcement workflow + manifest cleanup + Vale/og-image fixes (depends on PR 1)

## Problem

Docforge currently runs on every Netlify build to aggregate documentation from `website/` (local) and remote repositories (`gardener/gardener`, `gardener/dashboard`, etc.) into `hugo/content/`. This causes:

- Local previews take ~1 minute (Docforge + post-processing on every clean build)
- `GITHUB_OAUTH_TOKEN` is required to build the project locally
- Docforge hits GitHub API rate limits and has caching quirks
- Netlify build minutes are consumed by aggregation work that rarely changes
- Syntax errors in upstream sources surface as sudden Netlify build failures

## Goal

Move Docforge aggregation and post-processing out of every-build paths into a scheduled CI job that:

1. Runs on weekdays at 04:00 UTC (also manually triggerable)
2. Aggregates content, post-processes, verifies the build, then commits the result to `master`
3. Opens a PR if the build fails, so a human can address upstream breakage
4. Reduces Netlify's build command to a plain `npx vitepress build`
5. Allows `website/` to be deleted; aggregated content lives directly in the committed `hugo/content/` tree

A second concern: once `website/` is gone, local-maintained and remote-aggregated files coexist in the same tree. The design must differentiate the two so maintainers know which files they own and tooling can prevent local edits to remote files (which would be overwritten by the next aggregation run).

## Architecture

```
WEEKDAYS 04:00 UTC + manual_dispatch
┌────────────────────────────────────────────────┐
│ GitHub Action: aggregate-content.yml          │
│  1. docforge aggregate (remotes only)         │
│  2. post-process (part-1, part-2,             │
│     part-index, part-3, part-managed)         │
│  3. vitepress build (verify)                  │
│  4a. green → push hugo/content/ to master     │
│  4b. red   → open/update PR for review        │
└────────────────────────────────────────────────┘
                  │
                  ▼
        master @ hugo/content/  (committed)
                  │
                  ▼
┌────────────────────────────────────────────────┐
│ Netlify (every push)                          │
│ npx vitepress build → dist/                   │
└────────────────────────────────────────────────┘

PR EVENTS on hugo/content/**:
┌────────────────────────────────────────────────┐
│ GitHub Action: enforce-managed-files.yml      │
│  Reject PRs that edit files with              │
│  `managed: true` frontmatter                  │
│  (skip when actor is github-actions[bot])     │
└────────────────────────────────────────────────┘
```

## Components

### 1. Differentiation Mechanism: Explicit `local` / `managed` Frontmatter Markers

Each file in `hugo/content/` is classified as either **locally maintained** or **managed** (i.e. aggregated from upstream). Classification is recorded as an **explicit positive marker** in frontmatter, set once and never re-derived from upstream-frontmatter heuristics.

**Markers:**

- Locally-maintained files carry `local: true`
- Managed (upstream-aggregated) files carry `managed: true`
- A file must carry exactly one of the two markers

**Seeding rule (one-time, in PR 1)** — applied during the first PR 1 aggregation run, before commit:

A file is seeded as **locally maintained** (`local: true`) iff:

- The file path matches a root-level allowlist (`hugo/content/index.md`, `hugo/content/_index.md`), OR
- `frontmatter.github_repo` matches `^https?://github\.com/gardener/documentation/?$` **AND** `frontmatter.github_subdir` starts with `website/` (or equals `website`)

Everything else is seeded as **managed** (`managed: true`).

The seeding rule keys on `github_subdir` starting with `website/` **only on the PR 1 seed pass**, because that is the last moment those values still reflect the upstream source. Verified against the current 1011-file tree: 0 parse failures, 0 false positives, 0 false negatives.

**Steady-state rule (every aggregation run after PR 1):**

- Files already carrying `local: true` are **not touched** by the classifier (their content was last regenerated in PR 1 and now lives only in the committed tree)
- Files already carrying `managed: true` keep the marker (Docforge has just rewritten them this run)
- Files with neither marker are **newly aggregated from a new upstream source** → mark `managed: true`

This decouples the classifier from `website/`-path heuristics and from any future Docforge frontmatter-shape change. The one-time seed in PR 1 is the only place those heuristics live; afterwards, the marker on disk is authoritative.

**Edge cases (verified):**

- 66 `_index.md` / `index.md` stub files lack `github_repo` entirely (synthesized by Docforge to fill the directory hierarchy). They are seeded as **managed** under the default rule. This is correct — they are regenerated on every run and should not be hand-edited.
- 3 files come from `stackitcloud/gardener-extension-provider-stackit` (non-gardener org). The rule seeds them as managed via the `repo !== gardener/documentation` branch.
- 7 synthetic section landing pages (`/docs/extensions/others/_index.md`, `/docs/other-components/_index.md`, etc.) are generated from `website/documentation/...`. They are correctly seeded as locally maintained because their `github_subdir` starts with `website/`.
- 1 `.html` file (`/public/hardend_shoots_report.html`) — walker only processes `.md`, so it is skipped.
- Static assets under `hugo/content/public/` (favicon, logos, og-image, etc.) are aggregated by Docforge from `website/public/` and committed as part of `hugo/content/`. They are not `.md` files, so the classifier ignores them. They follow the same "frozen after PR 1" lifecycle as locally-maintained markdown — see Section 8.

### 2. Post-Processing Phase: `part-managed.js`

New phase, runs as the last step of `make post-process`. Two responsibilities:

1. **Apply the classifier** (seed in PR 1, steady-state from PR 2 onwards — see Section 1)
2. **For locally-maintained files: rewrite `github_repo` / `github_subdir`** to point at their new location in `gardener/documentation` (`hugo/content/<relpath>`). This makes the existing `Edit this page` URL builder in `.vitepress/config.mts` (which composes `${github_repo}/tree/master/${github_subdir}/${fileName}`) resolve to the actually-editable file. Without this rewrite, edit-links on ex-`website/` files 404 the moment `website/` is deleted in PR 2.

The rewrite runs on every aggregation pass and is idempotent (writing the same `github_repo`/`github_subdir` is a no-op write that gray-matter normalizes consistently). Locally-maintained files are not regenerated by Docforge after PR 2, so the rewrite is effectively a one-time stamp from the PR 1 run; subsequent runs do not touch these files because they are skipped by the classifier (`local: true` already set) and the rewrite step is gated on the classifier.

```javascript
import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

const ROOT = process.argv[2] || './hugo/content';
const TARGET_REPO = 'https://github.com/gardener/documentation';

// PR 1 SEED HEURISTICS — used only when a file has no local/managed marker yet
const LOCAL_REPO_PATTERN = /^https?:\/\/github\.com\/gardener\/documentation\/?$/;
const LOCAL_SUBDIR_PATTERN = /^website(\/|$)/;
const LOCAL_PATH_ALLOWLIST = [
  /^_index\.md$/,
  /^index\.md$/,
];

function seedClassification(fm, relativePath) {
  if (LOCAL_PATH_ALLOWLIST.some(re => re.test(relativePath))) return 'local';
  if (typeof fm.github_repo === 'string'
      && typeof fm.github_subdir === 'string'
      && LOCAL_REPO_PATTERN.test(fm.github_repo)
      && LOCAL_SUBDIR_PATTERN.test(fm.github_subdir)) {
    return 'local';
  }
  return 'managed';
}

function rewriteLocalEditLink(fm, relativePath) {
  // Point Edit-this-page at the actual location of the file in gardener/documentation
  const dir = path.posix.dirname(relativePath);
  fm.github_repo = TARGET_REPO;
  fm.github_subdir = dir === '.' ? 'hugo/content' : `hugo/content/${dir}`;
  // path_base_for_github_subdir.to (if present) overrides the filename in the URL builder.
  // For locally-maintained files we want the URL builder to use the actual filename, so
  // drop any inherited override.
  if (fm.path_base_for_github_subdir) delete fm.path_base_for_github_subdir;
}

async function walk(dir, root) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full, root);
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      await processFile(full, root);
    }
  }
}

async function processFile(file, root) {
  try {
    const raw = await fs.readFile(file, 'utf8');
    const parsed = matter(raw);
    const relativePath = path.relative(root, file);
    const fm = parsed.data;

    const hasLocal = fm.local === true;
    const hasManaged = fm.managed === true;

    let classification;
    if (hasLocal) classification = 'local';
    else if (hasManaged) classification = 'managed';
    else classification = seedClassification(fm, relativePath); // PR 1 seed path

    let mutated = false;

    if (classification === 'local') {
      if (!hasLocal) { fm.local = true; mutated = true; }
      if (hasManaged) { delete fm.managed; mutated = true; }
      // Rewrite edit-link target to the file's actual location in this repo
      const desiredRepo = TARGET_REPO;
      const dir = path.posix.dirname(relativePath);
      const desiredSubdir = dir === '.' ? 'hugo/content' : `hugo/content/${dir}`;
      if (fm.github_repo !== desiredRepo || fm.github_subdir !== desiredSubdir) {
        rewriteLocalEditLink(fm, relativePath);
        mutated = true;
      }
    } else {
      if (!hasManaged) { fm.managed = true; mutated = true; }
      if (hasLocal) { delete fm.local; mutated = true; }
    }

    if (mutated) {
      const rebuilt = matter.stringify(parsed.content, fm);
      await fs.writeFile(file, rebuilt, 'utf8');
    }
  } catch (err) {
    console.error(`Error processing ${file}: ${err.message}`);
    process.exit(1);
  }
}

(async () => {
  try {
    await walk(ROOT, ROOT);
    console.log('Managed marker pass complete.');
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
})();
```

**Makefile integration:**

```makefile
.PHONY: post-processing-part-managed
post-processing-part-managed:
	node post-processing/part-managed.js ./hugo/content

.PHONY: post-process
post-process:
	@$(MAKE) post-processing-part-1
	@$(MAKE) post-processing-part-2
	@$(MAKE) post-processing-part-index
	@$(MAKE) post-processing-part-3
	@$(MAKE) post-processing-part-managed
```

`part-managed` runs last so prior phases cannot accidentally overwrite the marker or the rewritten edit-link fields.

**Verification on the PR 1 tree:** spot-check that for a locally-maintained file at `hugo/content/blog/2024/foo.md`, after the pass the frontmatter contains `local: true`, `github_repo: https://github.com/gardener/documentation`, `github_subdir: hugo/content/blog/2024`. The `Edit this page` link in the rendered preview must open `https://github.com/gardener/documentation/tree/master/hugo/content/blog/2024/foo.md` and resolve (HTTP 200).

### 3. Aggregation Workflow: `aggregate-content.yml`

```yaml
name: Aggregate Documentation Content

on:
  schedule:
    - cron: '0 4 * * 1-5'   # Mon-Fri 04:00 UTC
  workflow_dispatch:

permissions:
  contents: write
  pull-requests: write

concurrency:
  group: aggregate-content
  cancel-in-progress: false

jobs:
  aggregate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          fetch-depth: 0

      - uses: actions/setup-node@v4
        with:
          node-version: 24

      - name: Install deps
        run: npm ci

      - name: Aggregate (docforge)
        env:
          DOCFORGE_CONFIG: .docforge/config.yaml
          GITHUB_OAUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: make docforge-ci

      - name: Post-process
        run: make post-process

      - name: Verify build
        id: build
        run: make build
        continue-on-error: true

      - name: Push on success
        if: steps.build.outcome == 'success'
        run: |
          git config user.name  "github-actions[bot]"
          git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
          git add hugo/content/
          if git diff --cached --quiet; then
            echo "No content changes"
            exit 0
          fi
          git commit -m "chore(content): aggregate docs $(date -u +%Y-%m-%d)"
          git push origin master

      - name: Open PR on failure
        if: steps.build.outcome == 'failure'
        uses: peter-evans/create-pull-request@v7
        with:
          branch: bot/content-aggregation-failure
          title: "🚨 Content aggregation build failed"
          body: |
            Daily content aggregation produced a tree that fails `make build`.

            **Action required:** review the diff, fix the broken upstream source(s),
            then close this PR (next nightly run will pick up the fix).

            **Note:** If no CI checks ran on this PR, close and reopen it once —
            PRs created by `GITHUB_TOKEN` do not trigger downstream workflows by default.
          commit-message: "chore(content): aggregation with build failure"
          add-paths: hugo/content/
```

**Pre-flight repo settings** (one-time, by a maintainer):

1. `Settings → Actions → General → Workflow permissions` → "Read and write permissions" + check "Allow GitHub Actions to create and approve pull requests"
2. `Settings → Branches → master → Branch protection` → add `github-actions[bot]` to the bypass list for required reviews

**Operations note:** Workflows triggered by `pull_request` events do not run on PRs that were opened by `GITHUB_TOKEN`. If the bot opens a failure-PR and the team wants Vale (or other PR checks) to run, the PR must be closed and reopened once. All PR-event workflows must therefore also declare `workflow_dispatch` so they can be triggered manually from the Actions tab.

### 4. Enforcement Workflow: `enforce-managed-files.yml`

```yaml
name: Enforce Managed Files

on:
  pull_request:
    paths:
      - 'hugo/content/**/*.md'
  workflow_dispatch:

permissions:
  contents: read
  pull-requests: write

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  check:
    name: Block edits to managed files
    runs-on: ubuntu-latest
    if: github.actor != 'github-actions[bot]'
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
          persist-credentials: false

      - uses: actions/setup-node@v4
        with:
          node-version: 24

      - run: npm ci

      - name: Check changed files
        run: |
          git diff --name-only --diff-filter=AM \
            origin/${{ github.base_ref }}...HEAD \
            -- 'hugo/content/**/*.md' \
            | xargs -r node hack/check-managed.mjs
```

**Helper script `hack/check-managed.mjs`:**

```javascript
import fs from 'node:fs/promises';
import matter from 'gray-matter';

const files = process.argv.slice(2);
const violations = [];

for (const file of files) {
  try {
    const raw = await fs.readFile(file, 'utf8');
    const parsed = matter(raw);
    if (parsed.data.managed === true) {
      const upstream = parsed.data.github_repo && parsed.data.github_subdir
        ? `${parsed.data.github_repo}/blob/master/${parsed.data.github_subdir}`
        : '(unknown source)';
      violations.push({ file, upstream });
    }
  } catch (err) {
    console.error(`Error parsing ${file}: ${err.message}`);
    process.exit(2);
  }
}

if (violations.length > 0) {
  console.error('\n🚫 The following files are aggregated from upstream sources:\n');
  for (const { file, upstream } of violations) {
    console.error(`  ${file}`);
    console.error(`    → edit upstream: ${upstream}\n`);
  }
  console.error('Local edits will be overwritten by the next nightly aggregation run.');
  console.error('Open a PR against the upstream source repository instead.\n');
  process.exit(1);
}

console.log('All changed content files are locally maintained ✓');
```

The enforcement script trusts the `managed: true` marker (does not re-derive the classification). The classification logic lives in exactly one place: `part-managed.js`. Files without a marker are not flagged — they are either newly-introduced locally-maintained files or upstream files for which `part-managed.js` has not yet run. This is a convenience system for maintainers, not protection against bad actors.

### 5. Netlify Build Reduction

`netlify.toml` build command becomes:

```toml
[build]
  command = "npm ci && npx vitepress build"
  publish = ".vitepress/dist"
```

No Docforge, no post-processing on Netlify. Existing `[[headers]]` block remains.

### 6. `.gitignore` Changes

Remove the broad `hugo/**` rule. Keep only the Hugo-legacy artifact directories that may still be created by local tooling:

```
hugo/resources/_gen
hugo/.forestry
```

`hugo/public` is **not** kept — verified absent from the working tree; no tooling in this project writes to it. The string was carried forward from the Hugo era. Site-served static assets (favicon, logos, og-image) live under `hugo/content/public/` (see Section 8), which is part of the committed content tree and not gitignored.

Remove the `!.github/**/*.yaml` and `!.docforge/**/*.yaml` whitelists — they were paired with the broad ignore and become dead lines (the global `*.yaml` ignore higher up still requires the second whitelist; keep that one).

### 7. Docforge Manifest Cleanup (PR 2)

`.docforge/website.yaml` and any child manifest must stop referencing `/website/...`. Concretely:

- Remove `fileTree: /website/blog`, `/website/community`, `/website/about` entries
- Remove the `file: /website/index.md` root reference
- Remove `/website/documentation/...` `file:` references and synthetic section pages
- The `dir: contribution-process` subtree under `contribute.yaml` (currently `fileTree: /website/contribute/contribution-process`) is dropped
- Remove the `dir: public` block (`.docforge/website.yaml:28-31`) that currently aggregates `../website/public` into `hugo/content/public/`. The block becomes dead after `website/` is deleted, and the static assets are already committed under `hugo/content/public/` from the PR 1 aggregation run (see Section 8).
- Docforge now aggregates **only** external sources; locally maintained files and static assets exist solely in the committed `hugo/content/` tree

This breaks the circular "Docforge reads what Docforge wrote" dependency.

### 8. Static Assets (`hugo/content/public/`)

VitePress's effective `publicDir` is `<srcDir>/public` = **`hugo/content/public/`** (default convention; not overridden in `.vitepress/config.mts`). This is where the favicon, logos, og-image, and ~2 MB of other static assets are served from at build time.

Today these assets live in `website/public/` and are copied to `hugo/content/public/` by the `dir: public` block in `.docforge/website.yaml` on every Docforge run. After PR 1 commits the full `hugo/content/` tree (including `hugo/content/public/`), the assets exist in git and no longer depend on the Docforge copy step. PR 2 removes the `dir: public` block along with the rest of the `/website/...` references; the committed `hugo/content/public/` survives because nothing regenerates it.

The classifier in `part-managed.js` only processes `.md` files, so the asset tree is untouched by classification logic. Its lifecycle is the same as locally-maintained markdown: edited directly in `hugo/content/public/` after PR 2, never regenerated. The README "Editing content" section (PR 2) covers this alongside the markdown story.

The hardcoded og-image URL in `.vitepress/config.mts:400` (`https://raw.githubusercontent.com/gardener/documentation/refs/heads/master/website/public/og-gardener.png`) **also breaks** when `website/` is deleted. Update it to `https://raw.githubusercontent.com/gardener/documentation/refs/heads/master/hugo/content/public/og-gardener.png` (or use a webp variant if preferred) as part of PR 2.

**Future work:** evaluate moving these assets to `.vitepress/public/` (the VitePress-idiomatic location) so they no longer sit under the legacy `hugo/` directory. Out of scope for this spec.

## Migration Plan

### PR 1 — CI workflow + first aggregated commit + Netlify reduction

Contents:

- `.github/workflows/aggregate-content.yml`
- `post-processing/part-managed.js`
- `Makefile`: register `post-processing-part-managed` as last phase of `post-process`
- `.gitignore`: remove `hugo/**` rule, keep Hugo-legacy lines
- `netlify.toml`: build command reduced to `npm ci && npx vitepress build`
- `hugo/content/`: committed (manually generated on the PR branch so reviewers can inspect the diff)

Verification before merge:

1. Maintainer triggers `aggregate-content` via `workflow_dispatch` on the PR branch — must complete green
2. Netlify deploy preview renders the site correctly from the committed tree
3. Spot-check: random sample of 10 files — remote files carry `managed: true`, locally-maintained files carry `local: true` (and no `managed`)
4. Spot-check: for at least 3 locally-maintained files (one from `blog/`, one from `community/`, one from `about/`), the rendered `Edit this page` link resolves to a 200 on GitHub (i.e. the rewritten `github_repo`/`github_subdir` point at the real path under `hugo/content/`)
5. Spot-check: `hugo/content/public/` is committed and contains the favicon/logo/og-image assets previously found under `website/public/`

After merge:

- Next cron run (Mon-Fri 04:00 UTC) takes over
- Netlify builds drop from ~1 min to seconds
- `website/` is still present but redundant — it will be removed in PR 2

### PR 2 — `website/` removal + enforcement + manifest cleanup

Contents:

- `.github/workflows/enforce-managed-files.yml`
- `hack/check-managed.mjs`
- `website/` deleted in full
- `.docforge/website.yaml` and child manifests cleaned of all `/website/...` references, **including the `dir: public` block** (Section 7)
- `.vitepress/config.mts`: og-image `<meta>` URL updated from `.../master/website/public/og-gardener.png` to `.../master/hugo/content/public/og-gardener.png` (Section 8)
- `.github/workflows/vale.yml`: `paths:` changed from `website/**/*.md` to `hugo/content/**/*.md`. `filter_mode: added` stays, so only newly added lines are flagged — managed files that ship with pre-existing prose issues don't block, and edits to them are blocked by the enforcement workflow anyway.
- `Makefile vale-run` target: `git diff` path updated from `website/**/*.md` to `hugo/content/**/*.md`. No `managed:` filtering needed — by the time Vale runs locally on changed files, the enforcement workflow has already blocked PRs that touch managed files. Same logic applies in CI.
- README "Editing content" section updated to explain the `local: true` / `managed: true` convention and direct contributors to upstream repos for managed files

Verification before merge:

1. Aggregation workflow runs on PR branch → tree functionally unchanged from PR 1 state (no diff under `hugo/content/`, including `hugo/content/public/`)
2. Netlify deploy preview renders correctly; og-image URL in page source resolves to a 200
3. Test commit editing a `managed: true` file → enforcement workflow must fail with clear message
4. Test commit editing a `local: true` file → enforcement workflow must pass
5. Test commit editing an asset under `hugo/content/public/` → enforcement workflow must pass (asset files are not `.md`, so the workflow's `paths:` filter excludes them; PR is reviewed normally)

After merge:

- Local content is edited directly in `hugo/content/blog/`, `hugo/content/community/`, `hugo/content/about/`, `hugo/content/contribute/contribution-process/`, `hugo/content/index.md`
- Static assets are edited directly in `hugo/content/public/`
- The `Edit this page` link on locally-maintained pages opens the file's actual location in `gardener/documentation`
- Edits to managed files are blocked at PR time with an upstream-source link

### Rollback

- **PR 1:** Revert restores `hugo/**` to `.gitignore` and the original Netlify command. Disable the aggregation workflow via `Settings → Actions`.
- **PR 2:** Revert restores `website/` from history (`git checkout <PR2-merge-sha>~1 -- website/`), the original Docforge manifests (including `dir: public`), and the original og-image URL in `.vitepress/config.mts`. Disable the enforcement workflow.

## Future Work (out of scope)

Tracked separately, after PR 2 is stable:

1. Remove residual Hugo-legacy entries from `.gitignore` (`hugo/resources/_gen`, `hugo/.forestry`); confirm nothing references them
2. Move static assets from `hugo/content/public/` to the VitePress-idiomatic `.vitepress/public/` location (or repo-root `public/`). Removes the last Hugo-era naming from the served-asset path.
3. Rename `hugo/` directory to a non-legacy name (`website/` or `content/`). Affects: `srcDir` in `.vitepress/config.mts`, hardcoded paths in `post-processing/*.js`, Docforge manifests, Makefile targets

## Non-Goals

- No PAT / GitHub App migration — use `GITHUB_TOKEN`. Fall back to PAT only if the first run reveals a permissions block that org policy cannot resolve.
- No `/override-managed` bypass mechanism — admin push to master remains the documented escape hatch for emergencies.
- No link-check CI gate in this scope — tracked as a separate concern.
- No `.html` content handling — the single existing `.html` file is excluded by the walker's `.md` filter.

## Risks and Mitigations

| Risk | Mitigation |
|------|------------|
| `GITHUB_TOKEN` rate limit insufficient for all upstream repos | First run will reveal it; swap to a PAT in `aggregate-content.yml` (one-line change) |
| Branch protection blocks `github-actions[bot]` push despite bypass setting | Pre-flight step documents the exact setting; first failed run gives clear 403 |
| Git history grows large from daily commits | ~5 MB delta/day × 250 weekdays = ~1.25 GB/year. Re-evaluate with `git gc --aggressive` in 2-3 years if needed |
| Docforge writes a new frontmatter shape in a future version that breaks the PR 1 seed heuristics | After PR 1, classification reads the explicit `local`/`managed` markers on disk — frontmatter-shape changes do not affect it. Only re-seeding (rerunning PR 1 from scratch) would be sensitive; not a steady-state risk. |
| PR 1 seed misclassifies a file → wrong marker is committed | Mitigated by spot-check #3 in PR 1 verification. Fix is a one-line frontmatter edit in a follow-up commit; markers are explicit and editable. |
| `Edit this page` link on locally-maintained file still 404s after PR 2 | PR 1 spot-check #4 confirms the rewritten URLs resolve before merge. If a regression appears later, `part-managed.js` re-applies the rewrite on the next aggregation run (idempotent). |
| og-image meta URL forgotten in PR 2 → social previews break | Explicit PR 2 checklist item; PR 2 verification #2 catches it before merge |
| Static assets under `hugo/content/public/` accidentally dropped by manifest cleanup | PR 2 verification #1 diffs the tree against PR 1 state; any unintended deletion of `hugo/content/public/` files shows up there |
| Bot-PR has no CI checks running on it | Documented: close + reopen the PR, or trigger via `workflow_dispatch` |
| Vale workflow needs adjustment after `website/` removal | Included in PR 2 |
