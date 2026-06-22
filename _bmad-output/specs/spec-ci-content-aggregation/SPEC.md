# CI-Based Content Aggregation

**Date:** 2026-06-22
**Author:** Niklas (with Claude)
**Status:** Approved

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

### 1. Differentiation Mechanism: `managed: true` Frontmatter Marker

Each file in `hugo/content/` is classified as either **locally maintained** or **managed** (i.e. aggregated from upstream). The marker lives in frontmatter.

**Classification rule** (locally maintained iff):

- The file path matches a root-level allowlist (`hugo/content/index.md`, `hugo/content/_index.md`), OR
- `frontmatter.github_repo` matches `^https?://github\.com/gardener/documentation/?$` **AND** `frontmatter.github_subdir` starts with `website/` (or equals `website`)

Everything else is **managed** and receives `managed: true`.

**Why `github_repo` and `github_subdir`:** Docforge writes these fields automatically when `docsy-edit-this-page-enabled: true` is set in `.docforge/config.yaml`. Verified against the current 1011-file tree: 0 parse failures, 0 false positives, 0 false negatives.

**Edge cases (verified):**

- 66 `_index.md` / `index.md` stub files lack `github_repo` entirely (synthesized by Docforge to fill the directory hierarchy). They will be classified as **managed** under the default rule. This is correct — they are regenerated on every run and should not be hand-edited.
- 3 files come from `stackitcloud/gardener-extension-provider-stackit` (non-gardener org). The rule classifies them as managed via the `repo !== gardener/documentation` branch.
- 7 synthetic section landing pages (`/docs/extensions/others/_index.md`, `/docs/other-components/_index.md`, etc.) are generated from `website/documentation/...`. They are correctly classified as locally maintained because their `github_subdir` starts with `website/`.
- 1 `.html` file (`/public/hardend_shoots_report.html`) — walker only processes `.md`, so it is skipped.

### 2. Post-Processing Phase: `part-managed.js`

New phase, runs as the last step of `make post-process`:

```javascript
import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

const ROOT = process.argv[2] || './hugo/content';

const LOCAL_REPO_PATTERN = /^https?:\/\/github\.com\/gardener\/documentation\/?$/;
const LOCAL_SUBDIR_PATTERN = /^website(\/|$)/;
const LOCAL_PATH_ALLOWLIST = [
  /^_index\.md$/,
  /^index\.md$/,
];

function isLocallyMaintained(fm, relativePath) {
  if (LOCAL_PATH_ALLOWLIST.some(re => re.test(relativePath))) return true;
  if (typeof fm.github_repo !== 'string') return false;
  if (typeof fm.github_subdir !== 'string') return false;
  return LOCAL_REPO_PATTERN.test(fm.github_repo)
      && LOCAL_SUBDIR_PATTERN.test(fm.github_subdir);
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

    const local = isLocallyMaintained(parsed.data, relativePath);
    const hasMarker = parsed.data.managed === true;

    if (!local && !hasMarker) {
      parsed.data.managed = true;
      const rebuilt = matter.stringify(parsed.content, parsed.data);
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

`part-managed` runs last so prior phases cannot accidentally overwrite the marker.

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

The enforcement script trusts the marker (does not re-derive the classification). The classification logic lives in exactly one place: `part-managed.js`. This is a convenience system for maintainers, not protection against bad actors.

### 5. Netlify Build Reduction

`netlify.toml` build command becomes:

```toml
[build]
  command = "npm ci && npx vitepress build"
  publish = ".vitepress/dist"
```

No Docforge, no post-processing on Netlify. Existing `[[headers]]` block remains.

### 6. `.gitignore` Changes

Remove the broad `hugo/**` rule. Keep only the Hugo-legacy artifact directories:

```
hugo/public
hugo/resources/_gen
hugo/.forestry
```

Remove the `!.github/**/*.yaml` and `!.docforge/**/*.yaml` whitelists — they were paired with the broad ignore and become dead lines (the global `*.yaml` ignore higher up still requires the second whitelist; keep that one).

### 7. Docforge Manifest Cleanup (PR 2)

`.docforge/website.yaml` and any child manifest must stop referencing `/website/...`. Concretely:

- Remove `fileTree: /website/blog`, `/website/community`, `/website/about` entries
- Remove the `file: /website/index.md` root reference
- Remove `/website/documentation/...` `file:` references and synthetic section pages
- The `dir: contribution-process` subtree under `contribute.yaml` (currently `fileTree: /website/contribute/contribution-process`) is dropped
- Docforge now aggregates **only** external sources; locally maintained files exist solely in the committed `hugo/content/` tree

This breaks the circular "Docforge reads what Docforge wrote" dependency.

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
3. Spot-check: random sample of 10 files — remote files carry `managed: true`, local files don't

After merge:

- Next cron run (Mon-Fri 04:00 UTC) takes over
- Netlify builds drop from ~1 min to seconds
- `website/` is still present but redundant — it will be removed in PR 2

### PR 2 — `website/` removal + enforcement + manifest cleanup

Contents:

- `.github/workflows/enforce-managed-files.yml`
- `hack/check-managed.mjs`
- `website/` deleted in full
- `.docforge/website.yaml` and child manifests cleaned of all `/website/...` references
- `.github/workflows/vale.yml`: `paths:` changed from `website/**/*.md` to `hugo/content/**/*.md`. `filter_mode: added` stays, so only newly added lines are flagged — managed files that ship with pre-existing prose issues don't block, and edits to them are blocked by the enforcement workflow anyway.
- `Makefile vale-run` target: `git diff` path updated from `website/**/*.md` to `hugo/content/**/*.md`. No `managed:` filtering needed — by the time Vale runs locally on changed files, the enforcement workflow has already blocked PRs that touch managed files. Same logic applies in CI.
- README "Editing content" section updated to explain the `managed: true` convention and direct contributors to upstream repos

Verification before merge:

1. Aggregation workflow runs on PR branch → tree functionally unchanged from PR 1 state
2. Test commit editing a `managed: true` file → enforcement workflow must fail with clear message
3. Test commit editing a non-managed file → enforcement workflow must pass

After merge:

- Local content is edited directly in `hugo/content/blog/`, `hugo/content/community/`, `hugo/content/about/`, `hugo/content/contribute/contribution-process/`, `hugo/content/index.md`
- Edits to managed files are blocked at PR time with an upstream-source link

### Rollback

- **PR 1:** Revert restores `hugo/**` to `.gitignore` and the original Netlify command. Disable the aggregation workflow via `Settings → Actions`.
- **PR 2:** Revert restores `website/` from history (`git checkout <PR2-merge-sha>~1 -- website/`) and the original Docforge manifests. Disable the enforcement workflow.

## Future Work (out of scope)

Tracked separately, after PR 2 is stable:

1. Remove residual Hugo-legacy entries from `.gitignore` (`hugo/public`, `hugo/resources/_gen`, `hugo/.forestry`); confirm nothing references them
2. Rename `hugo/` directory to a non-legacy name (`website/` or `content/`). Affects: `srcDir` in `.vitepress/config.mts`, hardcoded paths in `post-processing/*.js`, Docforge manifests, Makefile targets

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
| Docforge writes a new frontmatter shape in a future version that breaks classification | `part-managed.js` is the single classification site; one-file fix. Sample assertions in implementation plan will catch it during the upgrade |
| Bot-PR has no CI checks running on it | Documented: close + reopen the PR, or trigger via `workflow_dispatch` |
| Vale workflow needs adjustment after `website/` removal | Included in PR 2 |
