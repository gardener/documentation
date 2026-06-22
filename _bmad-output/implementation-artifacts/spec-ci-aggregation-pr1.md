---
title: 'CI Content Aggregation — PR 1: workflow + first aggregated commit + Netlify reduction'
type: 'feature'
created: '2026-06-22'
status: 'ready-for-dev'
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
- Drop any inherited `path_base_for_github_subdir.to` on locally-maintained files (the URL builder would otherwise override the filename).
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
| Locally-maintained content from `website/` | `github_repo: https://github.com/gardener/documentation`, `github_subdir: website/blog/2024/foo` | `local: true` | `github_repo` → `https://github.com/gardener/documentation`, `github_subdir` → `hugo/content/blog/2024`; drop `path_base_for_github_subdir.to` if present |
| Root index pages | path is `index.md` or `_index.md` at `hugo/content/` root | `local: true` | Rewrite to `hugo/content` (no subdir) |
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

To be populated by step-02. Expected touch-points based on the design document:

- `post-processing/part-managed.js` -- **new** — classifier + edit-link rewrite, last phase of `make post-process`
- `Makefile` -- register `post-processing-part-managed` target, append it to `post-process` chain (last)
- `.github/workflows/aggregate-content.yml` -- **new** — scheduled aggregation workflow with build verification + push-on-green / PR-on-red
- `.gitignore` -- remove broad `hugo/**` rule; keep `hugo/resources/_gen`, `hugo/.forestry`; drop dead `hugo/public` line; remove paired whitelist lines that become dead
- `netlify.toml` -- reduce build command to `npm ci && npx vitepress build`
- `hugo/content/` -- **first aggregated tree committed on the PR branch** (generated by maintainer via `workflow_dispatch`); not hand-edited

## Tasks & Acceptance

**Execution:**
- [ ] `post-processing/part-managed.js` -- create script per design-doc Section 2 (classifier + edit-link rewrite, idempotent, `.md`-only walker)
- [ ] `Makefile` -- add `post-processing-part-managed` target; append to `post-process` chain as **last** phase
- [ ] `.github/workflows/aggregate-content.yml` -- create workflow per design-doc Section 3 (cron `0 4 * * 1-5` + `workflow_dispatch`, `concurrency` group, build-verify, push-on-success, PR-on-failure via `peter-evans/create-pull-request@v7`)
- [ ] `.gitignore` -- remove broad `hugo/**` rule and associated dead whitelist lines (keep the `*.yaml` whitelist); keep Hugo-legacy `hugo/resources/_gen` and `hugo/.forestry`
- [ ] `netlify.toml` -- replace build command with `npm ci && npx vitepress build`; keep existing `[[headers]]` block
- [ ] Maintainer pre-flight: `Settings → Actions → General` → "Read and write permissions" + "Allow GitHub Actions to create and approve pull requests"; branch protection bypass for `github-actions[bot]` on `master` — document in PR description
- [ ] Maintainer triggers `workflow_dispatch` on the PR branch to produce the first `hugo/content/` commit; reviewer inspects diff

**Acceptance:**

1. **Given** the PR branch with workflow + script + config changes, **when** the maintainer runs `aggregate-content` via `workflow_dispatch`, **then** the workflow completes green and pushes a commit to the PR branch with the full `hugo/content/` tree.
2. **Given** the committed `hugo/content/` tree, **when** Netlify builds the PR preview, **then** the site renders correctly and the build command is the reduced `npm ci && npx vitepress build`.
3. **Given** a random sample of 10 files from the committed tree, **when** their frontmatter is inspected, **then** files originating from `website/` carry `local: true` (no `managed:`) and files from remote upstreams carry `managed: true` (no `local:`).
4. **Given** at least 3 locally-maintained files — one from `hugo/content/blog/`, one from `hugo/content/community/`, one from `hugo/content/about/` — **when** their rendered "Edit this page" link is followed, **then** it resolves to `https://github.com/gardener/documentation/tree/master/hugo/content/<...>/<file>.md` returning HTTP 200.
5. **Given** the committed tree, **when** `hugo/content/public/` is listed, **then** it contains the favicon, logos, and og-image previously found under `website/public/`.
6. **Given** the merged PR, **when** the next scheduled aggregation run fires (Mon–Fri 04:00 UTC), **then** it commits to `master` without manual intervention.
7. **Given** a deliberately broken upstream commit (test scenario — optional), **when** the aggregation workflow's build verification fails, **then** the workflow opens a PR titled `🚨 Content aggregation build failed` on branch `bot/content-aggregation-failure` with the diff and required-action instructions.

**Rollback:** Revert this PR — restores broad `hugo/**` in `.gitignore` and original `netlify.toml`. Disable the `aggregate-content` workflow via `Settings → Actions`.

## Dependencies

This PR is a **prerequisite for** `spec-ci-aggregation-pr2.md` (website removal + enforcement). PR 2 cannot start until PR 1 is merged and the first scheduled aggregation run has produced a clean `master` snapshot.

## Risk Highlights (excerpt; full list in design-doc Section "Risks and Mitigations")

- `GITHUB_TOKEN` rate limit insufficient → first run reveals it; one-line swap to PAT
- Branch protection blocks bot push → pre-flight documented; first failed run gives clear 403
- PR 1 seed misclassifies a file → mitigated by spot-check #3 + AC #3; markers are explicit + editable
- Edit-this-page 404 regression → AC #4 catches it before merge; rewrite is idempotent
