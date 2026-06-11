# Decouple docforge from build — master spec

**Status**: Design — pending implementation
**Date**: 2026-06-02
**Author**: klocke-io


The work is split across three independently-shippable PRs. Each PR has its own file in this directory:

| PR | File | Scope |
|----|------|-------|
| PR0 | [`pr0-link-check.md`](pr0-sitemap-diff.md) | Add `sitemap-diff` infra (shared script + PR workflow). Independent of docs-sync. |
| PR1 | [`pr1-decouple-build.md`](./pr1-decouple-build.md) | Commit current `hugo/` snapshot, drop docforge from per-build pipeline, ship `docs-sync` GitHub Action. |
| PR2 | [`pr2-migrate-to-website.md`](./pr2-migrate-to-website.md) | Strip `/website/*` fileTree from docforge config, switch VitePress `srcDir` to `./website`, delete `hugo/`. |

This README captures the problem, goals, architecture overview, and cross-PR decision log. Read it first; then jump to the PR file you're working on.

## Problem

Today every Netlify build runs `docforge` to pull markdown from many `gardener/*` repos, then runs four post-processing scripts, then VitePress builds the result. This pain hits every contributor, not just CI:

- **Local development**: every contributor needs a `GITHUB_OAUTH_TOKEN` to run docforge locally; first-time onboarding friction.
- **Local preview**: `make local-preview` takes ~1 minute because docforge dominates wall time.
- **CI flake**: docforge rate-limit / cache hiccups cause sudden Netlify failures unrelated to the PR under review.
- **Lost edits**: markdown edits in the working tree are clobbered by the next docforge run because `hugo/` is regenerated, not tracked.
- **Wasted credits**: Netlify spends build minutes on a step whose inputs change at most once a day.

## Goals

1. Remove `docforge` and its post-processing from the per-build pipeline. Build = VitePress only.
2. Run `docforge` once per weekday via GitHub Action (`docs-sync`), commit the output to the repo.
3. Generated content lives directly under `website/` next to hand-authored content, not in a separate `hugo/` tree.
4. Every docforge-managed text file carries an inline marker so editors and humans see "do not edit by hand."
5. No `GITHUB_OAUTH_TOKEN` required for local preview, Netlify builds, or contributor onboarding.
6. Hand-authored content cannot be silently overwritten by a docforge run.
7. **No more source-mirror loops**: sources live where they are served. Today docforge reads `/website/{blog,community,about,public,index.md}` and writes copies into `hugo/`. After cutover this round-trip disappears: those dirs ARE the served content; docforge only contributes the externally-pulled content.
8. **Sitemap drift visibility**: introduce a `sitemap-diff` gate so doc PRs (human or bot) post the added/removed URL set as a comment, letting reviewers spot URL changes that may break inbound links from external sites.
   So a PR that drops `gardener.cloud/docs/*` URLs would surface those removals in the PR diff for the reviewer to confirm a redirect is in place.

## Non-goals (deferred)
- Conflict detection on binary assets (images). v1 covers text files only; binary collisions surface via PR diff review.
- Checking links within the md files

## Architecture overvie

The docs-sync action is named `docs-sync`. Docforge is just one step inside it; the action is the user-facing concept.

```
                   ┌──────────────────────────────────────┐
                   │ GitHub Action: docs-sync.yml         │
                   │ schedule: weekdays + workflow_dispatch│
                   └──────────────────────────────────────┘
                                    │
                ┌───────────────────┼───────────────────┐
                ▼                   ▼                   ▼
         docforge writes     post-processing       conflict-check
         .docforge-out/      mutates .docforge-out/ scans for
                             + injects marker       overwrites
                             + format-allowlist     of un-marked
                               guard                files in target
                                    │
                                    ▼
                         rsync -c (filter:
                         .docforge-managed-files.txt
                         old vs new) → target
                                    │
                                    ▼
                         inline CI (build/lint/spell/sitemap-diff)
                         against staged tree → ci_ok
                                    │
                            ┌───────┴───────┐
                            │               │
                  conflicts==∅ && ci_ok    else
                            │               │
                            ▼               ▼
                  commit + push       branch + commit + PR
                  master directly     + has-conflicts /
                  (App token, on      ci-failed labels
                  bypass list)        (close stale prior PRs)
                            │               │
                            └───────┬───────┘
                                    ▼
                  notify Slack (or email fallback) with
                  outcome + trigger source (scheduled/manual+actor)
```

The `sitemap-diff` shared script (`.github/scripts/sitemap-diff.sh`) has two callers:
1. `.github/workflows/sitemap-diff.yml` — runs on every PR (introduced in PR0).
2. `docs-sync.yml` — runs inline against the staged tree to surface URL drift in the bot's commit/PR (wired up in PR1).

Same script in both contexts = identical gate semantics regardless of who or what is producing the change.

## Phasing rationale

PR0 ships first because:
- Independent of the docs-sync rework — usable as soon as it merges.
- Gives human PRs the sitemap-diff gate immediately.
- PR1 reuses the same script in the inline-CI step; having PR0 already merged keeps PR1's diff focused on the docs-sync pipeline.

PR1 ships second because PR2's first scheduled run depends on the snapshot + initial manifest existing on `master`, and on the workflow being live.

PR2 ships third because the `/website/*` fileTree strip + VitePress `srcDir` flip are a coordinated cutover and benefit from PR1 having stabilized in production for at least one full sync cycle.

## Cross-PR decision log

| Decision | Choice | Reason |
|----------|--------|--------|
| Action name | `docs-sync.yml` | Docforge is a means to an end; the action's user-facing concept is doc syncing |
| Post-processing location | `.github/docs-sync/post-processing/` | Co-locate with workflow that owns them |
| Conflict check active in PR1 | Live, not no-op | Catches hand edits to `hugo/` and cross-manifest import overlap even pre-cutover |
| Update flow | Direct push to `master` when conflicts==∅ and inline CI green; PR only when human review actually needed | Auto-merge had two non-obvious blockers (`GITHUB_TOKEN` doesn't trigger PR-event CI; CODEOWNERS bypass); inline-CI + direct-push avoids both |
| Sitemap drift visibility | Shared `sitemap-diff.sh` script invoked from PR workflow + inline in `docs-sync.yml`; comments PRs with added/removed URLs; never fails the check | Same gate for human PRs and bot runs; surfaces URL drift to reviewers without blocking legitimate page moves |
| File-format allow-list | Enumerated from current `hugo/` extensions; CI guard fails on new extensions | Forces human review when a new format slips in rather than silently dropping marker |
| rsync mode | `rsync -a -c` (checksum) | Cleaner PRs — skip mtime-only churn |
| No-changes path | Explicit: skip PR creation, fire "no changes" notification | Avoid empty bot PRs |
| Source-mirror loops | Stripped in PR2 | Sources live where they're served |
| Single source of truth for pipeline | `.github/docs-sync/run.sh` with phase functions; called by both action and Makefile `docs-sync` target | Any pipeline change touches one file; identical CI + local-debug behavior |
| Push token | GitHub App installation token (not built-in `GITHUB_TOKEN`) | App-token-authored pushes propagate normal events so on-`push: master` automation runs |
| Branch-protection bypass | Bot identity on master bypass list | Direct-push possible without dropping protection for humans |
