# PR0 — Add `sitemap-diff` infrastructure

**Status**: Design — pending implementation
**Date**: 2026-06-02
**Author**: klocke-io
**Master spec**: [`README.md`](./README.md)

## Scope

Introduce a `sitemap-diff` gate that runs on every PR, builds the site twice (PR HEAD + `master`), diffs the generated `sitemap.xml`, and posts URL drift as a PR comment. Independent of the docs-sync rework — useful immediately for human PRs and reused inline by PR1's docs-sync pipeline.

## Purpose

The gate exists to surface **changes to the public URL surface** of the site, so we don't silently break inbound links from external sites (search engines, other gardener.cloud properties, third-party blogs) when pages move or get removed. It is **not** a content-link checker — it does not look at links inside markdown files or the rendered HTML body.

Single source of truth: the built `sitemap.xml`. If a URL leaves the sitemap, an external link to it is at risk; reviewer must confirm a redirect exists or accept the breakage.

## Out of scope

- Any docforge / docs-sync changes (PR1).
- VitePress `srcDir` change (PR2).
- Checking links **within** markdown content or rendered HTML. Deferred; if we want it later, ship as a separate gate.

## Why now (before PR1)

- The shared script is reused inline by PR1's `docs-sync.yml` (decision: direct push vs PR path depends on `ci_ok` which includes sitemap-diff). Shipping it first keeps PR1's diff focused on the docs-sync pipeline.
- Human PRs benefit immediately, regardless of when PR1 lands.
- Independent rollout: branch protection can require `sitemap-diff` as soon as the workflow is green on `master`.

## Components

### 1. Shared script — `.github/scripts/sitemap-diff.sh`

Inputs (env): `BUILD_DIR` (defaults to `.vitepress/dist`), `OUT` (defaults to `./sitemap-paths.txt`).

Steps:
1. Build VitePress (caller's responsibility — script does not rebuild).
2. Extract every `<loc>` URL from `<BUILD_DIR>/sitemap.xml`.
3. Normalize (strip trailing slash, sort, unique) and write to `$OUT`.
4. Exit 0. Comparing against a baseline is the caller's job.

Single artifact (`sitemap-paths.txt`) by design — keeps the script trivially testable and the diff trivially `comm`-able.

### 2. PR workflow — `.github/workflows/sitemap-diff.yml`

Triggered on every PR. Builds PR HEAD and `master` in separate worktrees, diffs the two sitemap-paths files, posts a PR comment with added/removed URLs. **Never fails the check** — URL drift is informational. Reviewer decides whether removed URLs need redirects.

```yaml
name: sitemap-diff
on:
  pull_request:
    types: [opened, synchronize, reopened]
concurrency:
  group: sitemap-diff-${{ github.event.pull_request.number }}
  cancel-in-progress: true
jobs:
  diff:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 0 }
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      # Build PR HEAD
      - run: npm ci && npx vitepress build
      - run: OUT=/tmp/paths-pr.txt .github/scripts/sitemap-diff.sh
      # Build master baseline (separate worktree so PR HEAD stays untouched)
      - run: git worktree add /tmp/master-baseline origin/master
      - working-directory: /tmp/master-baseline
        run: npm ci && npx vitepress build && OUT=/tmp/paths-master.txt $GITHUB_WORKSPACE/.github/scripts/sitemap-diff.sh
      # Compare
      - run: |
          comm -23 /tmp/paths-master.txt /tmp/paths-pr.txt > /tmp/paths-removed.txt
          comm -13 /tmp/paths-master.txt /tmp/paths-pr.txt > /tmp/paths-added.txt
      - name: Post PR comment
        run: .github/scripts/sitemap-diff-comment.sh
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          PR: ${{ github.event.pull_request.number }}
```

PR comment format:

```
<!-- sitemap-diff-bot -->
### Sitemap diff

This PR changes the public URL surface (sitemap.xml).

- ➕ added URLs: 12
- ➖ removed URLs: 3

⚠️ Removed URLs may break inbound links from external sites. Confirm a redirect is in place for each, or accept the breakage intentionally.

<details><summary>Removed URLs (3)</summary>

  - /old/page-a
  - /old/page-b
  - /old/page-c
</details>

<details><summary>Added URLs (12)</summary>

  - /new/page-1
  - …
</details>
```

The check is **never red**. Sitemap drift is a fact, not a regression. Failing on every page move would be too noisy and would block legitimate restructures.

### 3. Comment formatter — `.github/scripts/sitemap-diff-comment.sh`

Reads `/tmp/paths-removed.txt` and `/tmp/paths-added.txt`, formats the markdown comment above, posts via `gh pr comment $PR --body-file -`.

Idempotency: find existing comment by marker (`<!-- sitemap-diff-bot -->`), edit if present, create otherwise. One bot comment per PR regardless of push count.

### 4. Branch protection (out-of-band, repo settings)

Optional: add `sitemap-diff` to `master` branch protection as a required check **only** if/when we want to force reviewer acknowledgement of the comment. Default recommendation: leave it as a non-required check, since it never fails. Listed here so the reviewer can decide at merge time.

## Testing strategy

- **Shared script**: unit test — feed a fixture `sitemap.xml` with three known URLs, run `sitemap-diff.sh`, assert `$OUT` lists exactly those three sorted/deduped.
- **PR workflow end-to-end**: open a draft PR that adds one page and removes one page; assert the workflow posts a comment listing exactly that one added and one removed URL.
- **Comment idempotency**: push twice in a row, assert exactly one bot comment after both runs (edited, not appended).


## Reviewability

Tight diff: one shared script, one workflow, one comment formatter, one README paragraph. No coupling to existing build pipeline — purely additive.
