---
title: 'CI Content Aggregation — PR 1: workflow + first aggregated commit + Netlify reduction'
type: 'feature'
created: '2026-06-22'
status: 'completed'
context:
  - '_bmad-output/specs/spec-ci-content-aggregation/SPEC.md'
  - '_bmad-output/project-context.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Docforge runs on every Netlify build to aggregate `website/` + remote repos into `hugo/content/`. This causes ~1-min local previews, requires `GITHUB_OAUTH_TOKEN` locally, consumes Netlify minutes for work that rarely changes, and turns upstream syntax errors into Netlify build failures.

**Approach:** Move aggregation + post-processing into a scheduled GitHub Action (weekdays 04:00 UTC + `workflow_dispatch`) that aggregates, post-processes, verifies the build, then pushes the result to `master`. Reduce Netlify's build command to plain `npx vitepress build`. Introduce explicit `local: true` / `managed: true` frontmatter markers (seeded in this PR's first run) so that PR 2 can safely delete `website/` while keeping `Edit this page` links working.

## Boundaries & Constraints

**Always:**
- The PR must produce a **committed `hugo/content/` tree on the PR branch** that a reviewer can diff. The maintainer triggers `aggregate-content` via `workflow_dispatch` against the PR branch to generate it.
- `part-managed.js` runs as the **last** phase of `make post-process`; earlier phases must not see or alter the `local`/`managed` markers.
- Every `.md` file under `hugo/content/` ends this PR carrying exactly one of `local: true` or `managed: true` in frontmatter.
- For locally-maintained files, `github_repo` is rewritten to `https://github.com/gardener/documentation` and `github_subdir` to `hugo/content/<dir>` so the existing edit-link URL builder in `.vitepress/config.mts:287-291` resolves to a real path.
- For locally-maintained files, **rewrite** (do not delete) `path_base_for_github_subdir` so that `from = content/<relativePath>` and `to = <basename of relativePath>`. Without this, the `rewrites(id)` function in `.vitepress/config.mts:60-63` rewrites every non-index `.md` to `<path>/index.md`, the URL builder falls back to `filePath.split("/").pop() === "index.md"`, and **all edit-links on non-index files produce 404s** (verified against built `dist/`: e.g. `about/legal-disclosure.md` becomes `about/legal-disclosure/index.md`).
- The aggregation workflow is **idempotent**: a second run produces no diff under `hugo/content/` (verified by PR 2 pre-flight).
- Follow project conventions: plain ESM in `post-processing/`, `node:` protocol imports, `gray-matter` + `js-yaml` only, no new runtime deps (`.npmrc` 7-day quarantine).
- `website/` stays present and unchanged in this PR — its deletion is PR 2's job.

**Ask First:**
- If the maintainer's first `workflow_dispatch` run reveals that `GITHUB_TOKEN` rate limits are insufficient for all upstream repos, HALT and ask before switching to a PAT.
- If `Settings → Actions → General` cannot be set to "Read and write permissions" + "Allow GitHub Actions to create and approve pull requests" (org policy block), HALT — this is a non-skippable pre-flight.
- If branch protection on `master` cannot grant `github-actions[bot]` a bypass for required reviews, HALT.
- If the PR 1 seed pass classifies any file unexpectedly (spot-check #3), HALT before merging and surface the misclassified path for review.

**Never:**
- No PAT migration unless first run forces it; default is `GITHUB_TOKEN`.
- No `/override-managed` bypass mechanism — admin push remains the documented escape hatch.
- No link-check CI gate in this PR (separate concern).
- No `.html` content handling — walker filters to `.md` only.
- No deletion of `website/` in this PR.
- No removal of the `dir: public` Docforge block in this PR (still load-bearing until PR 2).
- No og-image URL change in this PR (`website/public/...` still resolves; gets fixed in PR 2 alongside `website/` deletion).
- No Vale workflow `paths:` change in this PR (still `website/**/*.md`; PR 2 swaps it).
- No new test framework — the project has none and adding one is a separate product decision.
- No edits to top-level governance docs (README, CONTRIBUTING, GOVERNANCE, OWNERS, LICENSE).

## I/O & Edge-Case Matrix

`part-managed.js` classifier seed pass (one-time, only when neither marker present):

| Scenario | Input frontmatter | Expected marker | Edit-link rewrite |
|----------|-------------------|-----------------|-------------------|
| Locally-maintained content from `website/` | `github_repo: https://github.com/gardener/documentation`, `github_subdir: website/blog/2024/foo` | `local: true` | `github_repo` → `https://github.com/gardener/documentation`, `github_subdir` → `hugo/content/blog/2024`; rewrite `path_base_for_github_subdir` to `{from: content/blog/2024/foo.md, to: foo.md}` (do NOT delete it — the URL builder needs it to survive VitePress rewrites) |
| Root index pages | path is `index.md` or `_index.md` at `hugo/content/` root | `local: true` | Rewrite `github_subdir` → `hugo/content` (no subdir); rewrite `path_base_for_github_subdir` to `{from: content/index.md, to: index.md}` |
| Synthetic section landing under website/documentation | `github_subdir: website/documentation/...` | `local: true` | Rewrite as above |
| Remote-aggregated file (gardener/gardener etc.) | `github_repo: https://github.com/gardener/gardener`, `github_subdir: docs/...` | `managed: true` | No rewrite |
| Stub `_index.md` synthesized by Docforge | no `github_repo` field | `managed: true` | No rewrite |
| Non-gardener org file (stackitcloud) | `github_repo: https://github.com/stackitcloud/...` | `managed: true` | No rewrite |
| `.html` file under hugo/content | any | skipped (walker filters .md) | n/a |
| Static asset under hugo/content/public/ | n/a (not .md) | skipped | n/a |

Steady-state pass (PR 2+ aggregation runs):

| Scenario | State on disk | Behavior |
|----------|---------------|----------|
| File already has `local: true` | marker present | Untouched (no re-classification, no re-rewrite if fields already correct) |
| File already has `managed: true` | marker present | Marker kept; Docforge has just rewritten content this run |
| Newly-aggregated file from new upstream | neither marker | Stamp `managed: true` |
| File somehow has both markers | both present | HALT with clear error (data corruption) |

</frozen-after-approval>

## Code Map

**Plan-Pass verification (2026-06-22)** — 5 design assumptions checked against the live tree (1011 `.md` files under `hugo/content/`):

| # | Assumption | Verdict | Notes |
|---|------------|---------|-------|
| A1 | Seed regex set classifies cleanly (0 FP / 0 FN) | ✅ verified | 1011 files, 0 parse errors, 0 stackitcloud false positives, 66 stub-`_index.md` correctly fall into `managed`. **Correction:** SPEC.md Section 1 says "7 synthetic section landing pages from `website/documentation/`" — actual count is **103 files** (all of `docs/**` minus upstream-aggregated ones). Rule still matches correctly. |
| A2 | Edit-link builder at `.vitepress/config.mts:287-291` | ✅ verified | URL composition exactly `${github_repo}/tree/master/${github_subdir}/${fileName}`. `fileName = path_base_for_github_subdir?.to ?? filePath.split("/").pop()`. |
| A3 | `hugo/content/public/` exists post-Docforge with assets | ✅ verified | Tree exists; favicon, logos, branding/, og-image present. **Correction:** og-image is `og-gardener.webp` (not `.png` as design-doc Section 8 claims) — PR 2 og-image URL update must use `.webp`. |
| A4 | Makefile post-process chain: part-1 → part-2 → part-index → part-3 | ✅ verified | `Makefile:158-162`. New `part-managed` target appends as 5th phase. |
| A5 | `.docforge/website.yaml:28-31` has `dir: public` block | ✅ verified | Lines 28-31 contain `dir: public` / `fileTree: ../website/public`. |

**Design defect discovered & corrected in this spec:**

The original design-doc / spec said "drop `path_base_for_github_subdir`" on locally-maintained files. This is **wrong** — it breaks all edit-links on non-index files. Reason:

1. `.vitepress/config.mts:60-63` `rewrites(id)` maps every non-index `.md` to `<path>/index.md` (e.g. `about/legal-disclosure.md` → `about/legal-disclosure/index.md`)
2. VitePress sets `page.filePath` to the rewritten path (verified via built `dist/` asset hash `about_legal-disclosure_index.md.DD_cEuWb`)
3. With `path_base_for_github_subdir` dropped, the URL builder falls back to `filePath.split("/").pop() === "index.md"` for every non-index file → 404
4. Today **945 / 1011 (94 %) files** carry `path_base_for_github_subdir.to`, all 362 future-local files included — they all hit this path

Fix: **rewrite** `path_base_for_github_subdir` to `{ from: content/<relativePath>, to: basename(relativePath) }` instead of deleting it. Boundaries + I/O matrix updated above.

**Touch-points (final):**

- `post-processing/part-managed.js` -- **new** — classifier + edit-link rewrite (`github_repo`, `github_subdir`, `path_base_for_github_subdir`), last phase of `make post-process`
- `Makefile` -- register `post-processing-part-managed` target, append to `post-process` chain (last, after `part-3`)
- `.github/workflows/aggregate-content.yml` -- **new** — scheduled aggregation workflow with build verification + push-on-green / PR-on-red
- `.gitignore` -- remove broad `hugo/**` rule; keep `hugo/resources/_gen`, `hugo/.forestry`; drop dead `hugo/public` line; remove paired whitelist lines that become dead
- `netlify.toml` -- **add** a `[build]` block with `command = "npx vitepress build"` and `publish = ".vitepress/dist"`; keep existing `[[headers]]` block. **Note:** the repo's `netlify.toml` currently has NO `[build]` block (build command lives in the Netlify UI override — that override must be cleared as part of the PR rollout, document in PR description). The `npm ci &&` prefix from the original spec was **dropped** — Netlify auto-runs `npm install` from lockfile presence, prefixing would double-install (~20-40s wasted per build).
- `hugo/content/` -- **first aggregated tree committed on the PR branch** (generated by maintainer via `workflow_dispatch`); not hand-edited

## POC verification (2026-06-22) — five sub-agent passes

Each touch-point was validated as a non-destructive POC by an independent sub-agent. Findings folded into the spec below; defects rolled into the Boundaries above.

| POC | Verdict | Headline finding |
|-----|---------|------------------|
| `part-managed.js` | ✅ PASS with one critical fix | **gray-matter `cache: false` required** (see below) |
| `aggregate-content.yml` | ✅ PASS with one fix | `git push origin master` is wrong on PR-branch dispatch → use `HEAD:${{ github.ref_name }}` |
| `.gitignore` + `netlify.toml` | ❌ NEEDS-CHANGES | Spec missed the standalone `content` line; `netlify.toml` has no existing `[build]` block; drop `npm ci &&` |
| `Makefile` | ✅ PASS | Diff applies clean; `make -n post-process` lists all 5 phases in correct order |
| Edit-link end-to-end | ✅ PASS | All 3 reproduction cases MATCH; AC #4 spot-check files need adjustment (see below) |

**Critical implementation detail discovered by POC #1 (must be in `part-managed.js`):**

`gray-matter` has an undocumented content-keyed cache that returns the SAME `data` object reference for two reads of identical raw content. `post-processing/part-index.js` creates byte-identical `_index.md` / `index.md` pairs in many directories. Without disabling the cache, mutating one half of a pair shows the marker as already-set when the other half is read, causing ~129 `index.md` files to be silently skipped on pass 1. **Fix:** call `matter(raw, { cache: false })` in `part-managed.js`. Without this, idempotency claims fail.

**`.gitignore` change set (final, after POC #3):**

Remove these lines:
- `content` (standalone, line 16 — would block committing `hugo/content/`)
- `hugo/**`
- `hugo/public`
- `!.github/**/*.yaml` (dead — only `vale.yml` exists, and PR 1's new workflow uses `.yml` extension)

Keep:
- `hugo/resources/_gen`, `hugo/.forestry` (Hugo legacy artifacts)
- `!.docforge/**/*.yaml` (load-bearing — 10+ real `.yaml` files there)
- everything else unchanged

**Workflow YAML fixes (after POC #2):**
- Replace `git push origin master` with `git push origin HEAD:${{ github.ref_name }}` so `workflow_dispatch` on a PR branch pushes to that branch, not `master`. AC #1 (maintainer triggers `workflow_dispatch` on PR branch and gets a commit pushed) depends on this.
- Optional: bump `actions/setup-node@v4` → `@v5`; optional SHA-pinning to match `.github/workflows/vale.yml` style. Neither is blocking.
- GITHUB_TOKEN rate limit is **likely OK**: ~36 upstream repos × ~10 API calls = ~360 reqs vs the 1000/hr/repo ceiling; raw blob fetches via `raw.githubusercontent.com` don't count.

**AC #4 file selection (after POC #5):**

`hugo/content/about/legal-disclosure.md`, `privacy.md`, `terms-of-use.md` and `blog/index.md` all carry `editLink: false` in frontmatter → PageActions.vue renders no edit link. AC #4 must pick test files that actually render the link. Revised spot-check set:
- One real blog post: `hugo/content/blog/<year>/<month>/<slug>.md` (e.g. any 2024 or 2025 post)
- One community file: any non-index `.md` under `hugo/content/community/`
- One doc page: any non-index `.md` under `hugo/content/docs/`

## Tasks & Acceptance

**Execution:**
- [ ] `post-processing/part-managed.js` -- create script per design-doc Section 2 (classifier + edit-link rewrite, idempotent, `.md`-only walker)
- [ ] `Makefile` -- add `post-processing-part-managed` target; append to `post-process` chain as **last** phase
- [ ] `.github/workflows/aggregate-content.yml` -- create workflow per design-doc Section 3 (cron `0 4 * * 1-5` + `workflow_dispatch`, `concurrency` group, build-verify, push-on-success, PR-on-failure via `peter-evans/create-pull-request@v7`)
- [ ] `.gitignore` -- remove `content` (standalone), `hugo/**`, `hugo/public`, and `!.github/**/*.yaml` (dead); keep `hugo/resources/_gen`, `hugo/.forestry`, `!.docforge/**/*.yaml`
- [ ] `netlify.toml` -- **add** `[build]` block: `command = "npx vitepress build"`, `publish = ".vitepress/dist"`; keep existing `[[headers]]` block. PR description must mention that the Netlify UI build-command override has to be cleared at rollout.
- [ ] Maintainer pre-flight: `Settings → Actions → General` → "Read and write permissions" + "Allow GitHub Actions to create and approve pull requests"; branch protection bypass for `github-actions[bot]` on `master` — document in PR description
- [ ] Maintainer triggers `workflow_dispatch` on the PR branch to produce the first `hugo/content/` commit; reviewer inspects diff

**Acceptance:**

1. **Given** the PR branch with workflow + script + config changes, **when** the maintainer runs `aggregate-content` via `workflow_dispatch`, **then** the workflow completes green and pushes a commit to the PR branch with the full `hugo/content/` tree.
2. **Given** the committed `hugo/content/` tree, **when** Netlify builds the PR preview, **then** the site renders correctly and the build command resolves to `npx vitepress build` (the Netlify UI override has been cleared so the repo's `netlify.toml` is authoritative).
3. **Given** a random sample of 10 files from the committed tree, **when** their frontmatter is inspected, **then** files originating from `website/` carry `local: true` (no `managed:`) and files from remote upstreams carry `managed: true` (no `local:`).
4. **Given** at least 3 locally-maintained files **that render an edit link** (i.e. without `editLink: false` in frontmatter) — one from `hugo/content/blog/<year>/<month>/<slug>.md`, one non-index file from `hugo/content/community/`, one non-index file from `hugo/content/docs/` — **when** their rendered "Edit this page" link is followed, **then** it resolves to `https://github.com/gardener/documentation/tree/master/hugo/content/<...>/<file>.md` returning HTTP 200.
5. **Given** the committed tree, **when** `hugo/content/public/` is listed, **then** it contains the favicon, logos, and og-image previously found under `website/public/`.
6. **Given** the merged PR, **when** the next scheduled aggregation run fires (Mon–Fri 04:00 UTC), **then** it commits to `master` without manual intervention.
7. **Given** a deliberately broken upstream commit (test scenario — optional), **when** the aggregation workflow's build verification fails, **then** the workflow opens a PR titled `🚨 Content aggregation build failed` on branch `bot/content-aggregation-failure` with the diff and required-action instructions.

**Rollback:** Revert this PR — restores `hugo/**` + `content` in `.gitignore` and original `netlify.toml` (no `[build]` block). Disable the `aggregate-content` workflow via `Settings → Actions`. Restore the Netlify UI build-command override.

## Reference Implementations (POC-validated)

These are the exact artifacts the sub-agent POCs produced and validated. Use as-is unless you find something better while implementing.

### `post-processing/part-managed.js`

```javascript
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import matter from 'gray-matter';

const ROOT = process.argv[2] || './hugo/content';
const TARGET_REPO = 'https://github.com/gardener/documentation';

const LOCAL_REPO_PATTERN = /^https?:\/\/github\.com\/gardener\/documentation\/?$/;
const LOCAL_SUBDIR_PATTERN = /^website(\/|$)/;
const LOCAL_PATH_ALLOWLIST = [/^_index\.md$/, /^index\.md$/];

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
  const dir = path.posix.dirname(relativePath);
  const base = path.posix.basename(relativePath);
  fm.github_repo = TARGET_REPO;
  fm.github_subdir = dir === '.' ? 'hugo/content' : `hugo/content/${dir}`;
  fm.path_base_for_github_subdir = { from: `content/${relativePath}`, to: base };
}

async function walk(dir, root, counters) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, root, counters);
    else if (entry.isFile() && entry.name.endsWith('.md')) await processFile(full, root, counters);
  }
}

async function processFile(file, root, counters) {
  const raw = await fs.readFile(file, 'utf8');
  // gray-matter shares `data` refs for byte-identical inputs; part-index.js
  // creates _index.md/index.md byte-twins. Disable cache so mutations stay
  // file-local and idempotency holds.
  const parsed = matter(raw, { cache: false });
  const relativePath = path.relative(root, file).split(path.sep).join('/');
  const fm = parsed.data;

  const hasLocal = fm.local === true;
  const hasManaged = fm.managed === true;
  if (hasLocal && hasManaged) {
    throw new Error(
      `Data corruption: file has BOTH 'local: true' and 'managed: true' — ${file}. ` +
      `Resolve manually before re-running part-managed.js.`
    );
  }

  let classification;
  if (hasLocal) classification = 'local';
  else if (hasManaged) classification = 'managed';
  else classification = seedClassification(fm, relativePath);

  let mutated = false;
  if (classification === 'local') {
    counters.local += 1;
    if (!hasLocal) { fm.local = true; mutated = true; }
    if (hasManaged) { delete fm.managed; mutated = true; }
    const dir = path.posix.dirname(relativePath);
    const base = path.posix.basename(relativePath);
    const desiredSubdir = dir === '.' ? 'hugo/content' : `hugo/content/${dir}`;
    const desiredFrom = `content/${relativePath}`;
    const pb = fm.path_base_for_github_subdir;
    const pbOk = pb && typeof pb === 'object' && pb.from === desiredFrom && pb.to === base;
    if (fm.github_repo !== TARGET_REPO || fm.github_subdir !== desiredSubdir || !pbOk) {
      rewriteLocalEditLink(fm, relativePath);
      mutated = true;
    }
  } else {
    counters.managed += 1;
    if (!hasManaged) { fm.managed = true; mutated = true; }
    if (hasLocal) { delete fm.local; mutated = true; }
  }

  if (mutated) {
    const rebuilt = matter.stringify(parsed.content, fm);
    await fs.writeFile(file, rebuilt, 'utf8');
    counters.mutated += 1;
  }
}

(async () => {
  try {
    const counters = { local: 0, managed: 0, mutated: 0 };
    await walk(ROOT, ROOT, counters);
    console.log(`Managed marker pass complete. local=${counters.local} managed=${counters.managed} mutated=${counters.mutated}`);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
})();
```

### `Makefile` diff

```diff
--- a/Makefile
+++ b/Makefile
@@ -153,12 +153,17 @@ post-processing-part-index:
 post-processing-part-3:
 	node post-processing/part-3.js --update-report-link --process-api-html

+.PHONY: post-processing-part-managed
+post-processing-part-managed:
+	node post-processing/part-managed.js ./hugo/content
+
 .PHONY: post-process
 post-process: ## Run post-processing scripts
 	@$(MAKE) post-processing-part-1
 	@$(MAKE) post-processing-part-2
 	@$(MAKE) post-processing-part-index
 	@$(MAKE) post-processing-part-3
+	@$(MAKE) post-processing-part-managed

 .PHONY: build
 build: ## Build the documentation site
```

Recipe-line indentation MUST be a single literal TAB. Apply with `git apply` / `patch`, not by paste into a tab-stripping editor.

### `.github/workflows/aggregate-content.yml`

```yaml
name: Aggregate Documentation Content

on:
  schedule:
    - cron: '0 4 * * 1-5'
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
          git push origin HEAD:${{ github.ref_name }}

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

### `netlify.toml` (full body)

```toml
[build]
    command = "npx vitepress build"
    publish = ".vitepress/dist"

[[headers]]
    for = "/*"
    [headers.values]
        X-Frame-Options = "DENY"
```

(Headers block preserved verbatim from current `netlify.toml`. The repo currently has NO `[build]` block — this PR adds it. UI override on Netlify must be cleared at rollout.)

## Dependencies

This PR is a **prerequisite for** `spec-ci-aggregation-pr2.md` (website removal + enforcement). PR 2 cannot start until PR 1 is merged and the first scheduled aggregation run has produced a clean `master` snapshot.

## Risk Highlights (excerpt; full list in design-doc Section "Risks and Mitigations")

- `GITHUB_TOKEN` rate limit insufficient → first run reveals it; one-line swap to PAT
- Branch protection blocks bot push → pre-flight documented; first failed run gives clear 403
- PR 1 seed misclassifies a file → mitigated by spot-check #3 + AC #3; markers are explicit + editable
- Edit-this-page 404 regression → AC #4 catches it before merge; rewrite is idempotent
