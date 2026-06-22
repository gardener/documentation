---
title: 'CI Content Aggregation — PR 2: website/ removal + enforcement + manifest cleanup'
type: 'feature'
created: '2026-06-22'
status: 'draft'
context:
  - '_bmad-output/specs/spec-ci-content-aggregation/SPEC.md'
  - '_bmad-output/implementation-artifacts/spec-ci-aggregation-pr1.md'
  - '_bmad-output/project-context.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** After PR 1, `website/` is redundant — its content lives in the committed `hugo/content/` tree, but `website/` still exists alongside it. Until `website/` is deleted and Docforge stops referencing it, maintainers face two source-of-truth locations and the circular "Docforge reads what Docforge wrote" dependency persists. Additionally, locally-maintained files in `hugo/content/` need protection: a contributor editing a `managed: true` file would have their work silently overwritten by the next nightly aggregation.

**Approach:** Delete `website/` entirely; clean all `/website/...` references from `.docforge/*.yaml` manifests (including the `dir: public` block); add a PR-time enforcement workflow that blocks edits to `managed: true` files; update the hardcoded og-image URL in `.vitepress/config.mts` and the Vale workflow path filter to point at `hugo/content/`.

## Boundaries & Constraints

**Always:**
- **PR 1 must be merged and stable first.** Verified by: `hugo/content/` is committed on `master` and at least one scheduled aggregation run has produced a clean diff-free run.
- Re-running the aggregation workflow on this PR branch must produce **zero diff** under `hugo/content/` (including `hugo/content/public/`). This is the load-bearing pre-flight.
- Enforcement workflow skips when `github.actor == 'github-actions[bot]'` (the aggregation bot's commits must not block themselves).
- Enforcement workflow trusts the `managed: true` marker — does not re-derive classification. Single classification site is `part-managed.js` (from PR 1).
- All `/website/...` references in `.docforge/*.yaml` must be removed, including the `dir: public` block (`.docforge/website.yaml:28-31`).
- The og-image URL in `.vitepress/config.mts` must be updated to `master/hugo/content/public/og-gardener.png` in the same PR as the `website/` deletion.
- The Vale workflow `paths:` filter and `Makefile vale-run` `git diff` path must be updated from `website/**/*.md` to `hugo/content/**/*.md` in the same PR.
- README "Editing content" section updated to explain the `local: true` / `managed: true` convention and direct contributors to upstream source repos for managed files.
- Follow project conventions: ESM-only, `node:` protocol imports, `gray-matter` for frontmatter parsing in the enforcement script.

**Ask First:**
- If the dry-run aggregation on the PR branch produces **any** diff against the PR 1 baseline `hugo/content/`, HALT — investigate before continuing (something in the manifest cleanup affected output).
- If `git checkout <PR1-merge-sha>~1 -- website/` is needed for rollback, HALT and ask before executing.
- If contributors have opened PRs against `website/**` after PR 1 merged but before this PR lands, HALT — coordinate redirection before deleting the directory.

**Never:**
- No changes to `part-managed.js` (frozen after PR 1).
- No changes to the aggregation workflow (`aggregate-content.yml`) unless a bug surfaces — separate concern.
- No `/override-managed` bypass mechanism in the enforcement workflow.
- No CodeRabbit-config changes (`coderabbit.yml` ignore-paths) in this PR — separate cleanup.
- No relocation of `hugo/content/public/` to `.vitepress/public/` (deferred to future work in the design doc).
- No rename of `hugo/` directory (deferred to future work).
- No `.gitignore` cleanup beyond what PR 1 already did.
- No edits to top-level governance docs unsolicited.

## I/O & Edge-Case Matrix

Enforcement workflow `enforce-managed-files.yml` + `hack/check-managed.mjs`:

| Scenario | Changed files in PR | Actor | Expected behavior |
|----------|---------------------|-------|-------------------|
| Contributor edits a managed file | `hugo/content/docs/foo.md` with `managed: true` | human | Workflow fails; comment lists offending file + upstream source URL |
| Contributor edits a local file | `hugo/content/blog/2026/post.md` with `local: true` | human | Workflow passes |
| Contributor edits asset under public/ | `hugo/content/public/logo.png` | human | Workflow's `paths:` filter excludes non-.md; workflow doesn't run; PR reviewed normally |
| Aggregation bot pushes managed-file changes | any `hugo/content/**/*.md` | `github-actions[bot]` | Workflow short-circuits via `if: github.actor != 'github-actions[bot]'`; passes by skipping |
| Contributor adds new locally-maintained file | new `hugo/content/blog/2027/post.md` with `local: true` | human | Workflow passes |
| Contributor adds new file with neither marker | new `hugo/content/foo.md`, no `local`/`managed` | human | Workflow passes (the check only flags `managed: true`; new local files are uncategorized but harmless until next aggregation runs `part-managed.js`) |
| Contributor edits a managed file but file frontmatter is malformed | parse error in `gray-matter` | human | Script `process.exit(2)` with clear error citing file path; workflow fails |

</frozen-after-approval>

## Code Map

To be populated by step-02. Expected touch-points based on the design document:

- `.github/workflows/enforce-managed-files.yml` -- **new** — PR-time check on `hugo/content/**/*.md`, skips bot, runs `hack/check-managed.mjs`
- `hack/check-managed.mjs` -- **new** — reads passed file list, fails if any carries `managed: true`, prints upstream source URLs
- `website/` -- **deleted entirely** (full directory removal)
- `.docforge/website.yaml` -- remove all `/website/...` references: `fileTree: /website/blog`, `/website/community`, `/website/about`, `file: /website/index.md`, `/website/documentation/...`, plus the `dir: public` block (lines 28-31)
- `.docforge/contribute.yaml` (or child manifest) -- remove `dir: contribution-process` subtree referencing `/website/contribute/contribution-process`
- Any other `.docforge/*.yaml` child manifest -- audit for `/website/...` strings; remove
- `.vitepress/config.mts:400` -- update og-image URL from `master/website/public/og-gardener.png` to `master/hugo/content/public/og-gardener.png`
- `.github/workflows/vale.yml` -- change `paths:` from `website/**/*.md` to `hugo/content/**/*.md`; keep `filter_mode: added`; add `workflow_dispatch` if missing (per design-doc Section 3 operations note)
- `Makefile` `vale-run` target -- update `git diff` path filter from `website/**/*.md` to `hugo/content/**/*.md`
- README -- replace/expand "Editing content" section to cover `local` / `managed` markers and upstream-source workflow for managed files

## Tasks & Acceptance

**Execution:**
- [ ] Pre-flight: confirm PR 1 merged on `master`; confirm at least one post-merge scheduled aggregation run produced no diff
- [ ] `hack/check-managed.mjs` -- create per design-doc Section 4 (reads argv file list, fails on `managed: true`, prints upstream URLs)
- [ ] `.github/workflows/enforce-managed-files.yml` -- create per design-doc Section 4 (pull_request on `hugo/content/**/*.md`, skip-if-bot, concurrency group, `workflow_dispatch`)
- [ ] `.docforge/website.yaml` -- remove all `/website/...` references including `dir: public` block
- [ ] `.docforge/contribute.yaml` and any child manifests -- audit + remove `/website/...` references
- [ ] `.vitepress/config.mts:400` -- update og-image URL
- [ ] `.github/workflows/vale.yml` -- swap `paths:` filter
- [ ] `Makefile` `vale-run` -- swap `git diff` path filter
- [ ] `README.md` -- update "Editing content" section
- [ ] `website/` -- delete entire directory
- [ ] Verification dry-run: trigger `aggregate-content` via `workflow_dispatch` on the PR branch; confirm zero diff under `hugo/content/`
- [ ] Test commit on PR branch: attempt to edit a `managed: true` file; enforcement must fail with clear message
- [ ] Test commit on PR branch: attempt to edit a `local: true` file; enforcement must pass
- [ ] Test commit on PR branch: edit an asset under `hugo/content/public/`; enforcement workflow doesn't run (path filter); PR reviewable

**Acceptance:**

1. **Given** the PR branch with `website/` deleted, manifest cleanup, og-image URL update, Vale path swap, and enforcement workflow added, **when** `aggregate-content` runs via `workflow_dispatch`, **then** zero diff is produced under `hugo/content/` (including `hugo/content/public/`).
2. **Given** the PR branch, **when** Netlify renders the deploy preview, **then** the page source's og-image meta tag resolves to a 200 and the site renders identically to PR 1 state.
3. **Given** a test commit on the PR branch editing a `managed: true` file, **when** the enforcement workflow runs, **then** it fails with a message naming the file and citing the upstream source URL (`{github_repo}/blob/master/{github_subdir}`).
4. **Given** a test commit on the PR branch editing a `local: true` file, **when** the enforcement workflow runs, **then** it passes.
5. **Given** a test commit on the PR branch editing an asset under `hugo/content/public/`, **when** PR events fire, **then** the enforcement workflow does not run (path filter excludes non-`.md`).
6. **Given** the merged PR, **when** a contributor follows the updated README "Editing content" section, **then** they can identify whether a file is locally maintained (edit here) or managed (open PR upstream).
7. **Given** the merged PR, **when** the next scheduled `aggregate-content` run fires, **then** it commits to `master` with no diff (steady state).

**Rollback:** Revert this PR — restores `website/` from history (`git checkout <PR2-merge-sha>~1 -- website/`), the original Docforge manifests, og-image URL, Vale filter. Disable the enforcement workflow via `Settings → Actions`. Document in PR description.

## Dependencies

**Blocked by:** `spec-ci-aggregation-pr1.md` must be merged AND at least one scheduled aggregation run must have completed cleanly on `master` post-merge.

## Risk Highlights (excerpt; full list in design-doc Section "Risks and Mitigations")

- og-image URL forgotten → AC #2 catches it; explicit Execution checklist item
- Static assets accidentally dropped by manifest cleanup → AC #1 diff-check catches it
- Bot-PR has no CI checks → documented escape hatch: close+reopen, or `workflow_dispatch`
- Open PRs against `website/**` mid-flight → "Ask First" guard before deletion
