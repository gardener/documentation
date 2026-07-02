# PR1 — Decouple docforge from per-build pipeline

**Status**: Design — pending implementation
**Date**: 2026-06-02
**Author**: klocke-io
**Master spec**: [`README.md`](./README.md)
**Depends on**: PR0 (`sitemap-diff.sh` exists; PR1 wires it into inline CI)

## Scope

Two-part PR — could ship as a single PR or as `1a` + `1b` if the snapshot diff drowns the workflow review:

- **Part 1a — Commit current `hugo/` snapshot** so docforge output is tracked in git. Drop `hugo/` from `.gitignore`. Commit current generated tree as-is. Commit initial `.docforge-managed-files.txt` listing every path in that snapshot.
- **Part 1b — Decouple build + ship docs-sync action**. Drop docforge from `ci-build`. Add `.github/docs-sync/run.sh` (single source of truth). Add `.github/workflows/docs-sync.yml`. Wire inline sitemap-diff from PR0. Direct-push happy path; PR path on conflicts or CI failure.

Recommended split: ship as two PRs (`1a` then `1b`) so reviewers can fast-skim the snapshot blob and focus on the workflow logic. PR1a must merge before PR1b — 1b's first scheduled run depends on the snapshot + initial manifest existing on `master`.

## Out of scope

- `sitemap-diff.sh` itself (PR0).
- `/website/*` fileTree strip and VitePress `srcDir` switch (PR2). PR1 still writes into `hugo/`.

## Components

### 1. Action — `.github/workflows/docs-sync.yml`

Triggers:
- `schedule: cron 0 3 * * 1-5` (03:00 UTC, weekdays)
- `workflow_dispatch` (manual)

Concurrency:
```yaml
concurrency:
  group: docs-sync
  cancel-in-progress: false
```
Serializes runs sharing this group key. A manual trigger fired while a scheduled run is in flight queues; the in-flight run completes uninterrupted. Pinned to `false` (not `true`) because cancelling mid-pipeline leaves `.docforge-out/` half-written and may abandon a pushed branch without a PR.

Steps (pipeline phases run via `.github/docs-sync/run.sh` — see §6 below):
1. Checkout `master`.
2. `phase_download_docforge` — install docforge binary.
3. `phase_run_docforge` — `DOCFORGE_CONFIG=.docforge/config.yaml`, output `.docforge-out/`.
4. `phase_post_process` — run post-processing scripts (§4) against `.docforge-out/`.
5. `phase_format_guard` — fail if any extension outside allow-list (§2).
6. `phase_inject_markers` — prepend `###DO NOT CHANGE MANUALLY###` to every marker-able text file.
7. `phase_conflict_check` — every text file in `.docforge-out/`; target = `hugo/` for PR1. Record conflicts when target exists without marker. Live, not no-op (§3).
8. `phase_generate_manifest` + `phase_rsync_flip` — `rsync -a -c --files-from=<new-manifest>` from `.docforge-out/` → target; apply deletion set; **stage** updated `.docforge-managed-files.txt` and content (does not commit; commit happens in step 12 or 13).
9. **Inline CI**: run the same checks human PRs face today against the staged working tree:
   - VitePress build
   - lint
   - spell-check

   Capture overall result as `ci_ok` (boolean). Failures do not abort the workflow; they route the run to the PR path so a human sees the failure on a PR diff.

   **Sitemap-diff** (`.github/scripts/sitemap-diff.sh` from PR0) also runs against the staged tree to capture the URL drift introduced by this sync run, but it is informational only and never affects `ci_ok`. The output is attached to the commit message (direct-push path) or PR description (PR path) so reviewers can see which URLs the bot added/removed.
10. **No-changes path**: if `git status` clean (after the rsync flip produced no diff), fire notifier "no changes" and exit successfully.
11. **Decision**:
    - `conflicts == empty` AND `ci_ok == true` → **direct-push path** (step 12).
    - Otherwise → **PR path** (step 13).
12. **Direct-push path** (happy path, no human attention needed):
    - Commit content + manifest on `master`.
    - Push directly to `master` using GitHub App installation token (App is on branch-protection bypass list — see §9 and §9.1).
    - Notifier outcome: `synced (direct push)`.
13. **PR path** (something needs human review):
    - Close stale prior open `docs-sync/*` PRs with comment "Superseded by #<new-pr-number>" (backfill the number after step 13c).
    - Create branch `docs-sync/<date>-<run_number>` (run number from `${{ github.run_number }}` — guarantees a unique branch even when same-day manual + scheduled runs both produce changes).
    - Commit content + manifest on the branch, push.
    - Open PR against `master`.
    - Apply labels and comments based on cause:
        - `has-conflicts` if conflict list non-empty (comment lists conflict paths).
        - `ci-failed` if inline CI was red (comment links to failing step + log excerpt).
        - Both labels if both apply.
    - Notifier outcome: `needs review: conflicts` / `needs review: CI failed` / `needs review: both`.
14. Notifier always runs at end. Message includes:
    - Trigger: `scheduled` or `manual (@actor)`
    - Outcome (one of: `synced (direct push)`, `needs review: ...`, `no changes`, `nightly failed`)
    - Link to action run + (if PR path) link to PR

Token: GitHub App installation token (see §9.1). Used for both direct-push to `master` and PR-path branch push. Built-in `GITHUB_TOKEN` is insufficient because pushes it makes do not trigger downstream workflows — losing post-push CI on `master` and any other on-push automation.

### 2. Marker injection + format-allowlist guard

After existing `part-1.js`, `part-2.js`, `part-index.js`, `part-3.js` finish, run a new step that recurses through the input dir and prepends a marker to every text file. Format-aware:

- `.md`, `.html`, `.svg`: HTML comment `<!-- ###DO NOT CHANGE MANUALLY### -->`
- `.css`: block comment `/* ###DO NOT CHANGE MANUALLY### */`
- `.png`, `.jpg`, `.jpeg`, `.gif`, `.ico`, `.webp`, `.webmanifest`: no marker possible. Treated as binary/non-marker assets — conflict detection skipped, propagate via rsync, rely on PR diff review for collisions.

The known allow-list is the union of the two groups above. Derived from a fresh enumeration of `hugo/` extensions present today: `css gif html ico jpeg jpg md png svg webmanifest webp`.

Format-allowlist guard step (runs before marker injection): walks `.docforge-out/`, collects every distinct file extension, fails the action if any extension is not in the allow-list. Failure message includes the offending paths and a pointer to the marker-injection script with instructions: "Add the extension to the allow-list and choose a comment syntax (or mark as binary), then re-run the action." This forces a human decision on PR review whenever a new format slips into the docforge output rather than silently emitting an un-marked file.

Idempotent: if marker already on first non-empty line, skip.

### 3. Conflict detection

For each marker-able text file produced in `.docforge-out/`:
- Compute target path: `hugo/<relative-path>` (PR2 will switch the target to `website/`)
- If target file exists AND first non-empty line lacks marker → record conflict
- Output: list to action log + posted as PR comment + sets `has-conflicts` label

Files in non-marker formats (binary assets, `.webmanifest`) skip the check — they propagate via rsync but rely on PR diff review for collision spotting.

**This is live in PR1**, not a no-op. Two real failure modes the check catches even before the PR2 cutover:
- A contributor edits a file in `hugo/` directly (e.g., a quick typo fix) without realizing it gets clobbered. The next sync surfaces this as a conflict instead of silently overwriting.
- Cross-manifest import overlap inside docforge itself: a new file added to a different `gardener/*` repo lands at a path that also gets pulled by a different docforge import. Surfacing this at sync time is the only mechanism we have, since docforge does not detect overlap.

A non-empty conflict list routes the run to the PR path (§1 step 13) with a `has-conflicts` label, so the conflicts surface to a human as a PR comment and never reach `master` silently.

### 4. Post-processing changes

Today every script in `post-processing/part-*.js` hardcodes `BASE_PATH = './hugo/content/'`.

Two changes:
- Accept input dir as CLI arg, default preserved for backwards compat.
  ```js
  const inputDir = process.argv[2] || './hugo/content/';
  ```
- Relocate the directory: `post-processing/` → `.github/docs-sync/post-processing/`. The scripts are exclusively used by the action and the local debug make target; co-locating them with the workflow keeps the surface area cohesive and reduces top-level repo clutter.

Scripts continue mutating files in place. The temp-dir-then-flip approach keeps these scripts isolated from hand-authored files in `website/` — they walk a sandbox tree only.

### 5. Flip mechanism (manifest-driven `rsync -c`)

Action generates a manifest of every file docforge wrote this run:
```
find .docforge-out -type f -printf '%P\n' | sort > .docforge-managed-files.txt
```
The manifest is committed to the repo at the repository root.

**Why a manifest is needed**: without it, the only way to "sync" `.docforge-out/` → target cleanly would be a bulk copy that risks touching hand-authored content. The manifest restricts the copy scope to docforge-owned paths. It also encodes the previous run's footprint, which is what makes deletion detection possible — without an old manifest we cannot tell "user deleted this file" from "docforge no longer emits this file."

Sync logic per run:
1. Read previous manifest from repo (if present).
2. Generate new manifest from current `.docforge-out/`.
3. Compute deletion set: paths in old manifest but not in new manifest.
4. `rsync -a -c --files-from=<new-manifest> .docforge-out/ <target>/` — `-c` (checksum mode) skips files whose content hash matches the target. Avoids mtime-only churn so the bot PR contains only real content changes.
5. For each path in deletion set:
   - If target file no longer exists: skip silently (user already removed).
   - Otherwise delete.
6. Stage updated `.docforge-managed-files.txt` along with content changes via `git add`. **No commit here** — `phase_rsync_flip` only mutates the working tree and stages. Commit + push + PR is owned by the action layer (§1 step 11–12), so commit metadata (message, author) lives next to the github-specific code, not buried in `run.sh`.

Hand-authored files outside the manifest are never touched. Upstream deletions propagate via the deletion set. Binary assets are covered because they live in the manifest just like text files.

### 6. Single source of truth: `.github/docs-sync/run.sh`

The pipeline steps (download docforge, run docforge, post-process, format-allowlist guard, marker injection, conflict-check, manifest generation, rsync flip) live as discrete bash functions in `.github/docs-sync/run.sh`. Both consumers call this script — no parallel reimplementation:

- **Action** (`docs-sync.yml`) calls `run.sh` phase-by-phase as separate workflow steps so each phase shows up as its own log group and a failure points to the right phase. The action layer owns only what is github-specific: branch / direct-push decision, `git push`, PR open (when needed), label/comment, notifier.
- **Makefile** target calls `run.sh --local`, which runs every phase up through marker injection + conflict-check against `.docforge-out/`, then **stops**. No rsync flip, no commit, no PR. Output stays in `.docforge-out/` for inspection. Conflict-check output prints to stdout.

Phase functions exposed by `run.sh`:

| Function | Action uses | `--local` uses |
|----------|-------------|----------------|
| `phase_download_docforge` | yes | yes |
| `phase_run_docforge` | yes | yes |
| `phase_post_process` | yes | yes |
| `phase_format_guard` | yes | yes |
| `phase_inject_markers` | yes | yes |
| `phase_conflict_check` | yes | yes (prints, never fails build) |
| `phase_generate_manifest` | yes | no |
| `phase_rsync_flip` | yes | no |

Action workflow snippet (illustrative):
```yaml
- run: .github/docs-sync/run.sh phase_download_docforge
- run: .github/docs-sync/run.sh phase_run_docforge
- run: .github/docs-sync/run.sh phase_post_process
- run: .github/docs-sync/run.sh phase_format_guard
- run: .github/docs-sync/run.sh phase_inject_markers
- run: .github/docs-sync/run.sh phase_conflict_check
- run: .github/docs-sync/run.sh phase_generate_manifest
- run: .github/docs-sync/run.sh phase_rsync_flip
- # github-specific: inline CI run, decision (direct-push vs PR path), commit/push/PR/label/notify
```

Configuration (target dir, output dir, conflict-check behavior local-vs-CI) flows via env vars set by each caller. Defaults baked into `run.sh` match CI behavior; `--local` overrides only what diverges (skip flip phases, soft-fail conflict-check).

This guarantees: any change to pipeline logic — new post-processing step, allow-list extension, marker syntax tweak — touches exactly one file and is identical in CI and local debug.

### 7. Build pipeline (Makefile / Netlify)

Before:
```makefile
ci-build: docforge-ci install post-process build
local-preview: ... docforge-ci ... post-process ... preview
```

After PR1:
```makefile
ci-build: install build

local-preview: install build
	npx vitepress preview

# Local debug only — never updates upstream docs.
docs-sync:
	./.github/docs-sync/run.sh --local
```

`docforge-ci` and `post-process` Makefile targets are **removed**. `local-preview` is reduced to install + build + preview — no docforge invocation.

### 8. Notifier (pluggable)

Action job reads `secrets.SLACK_WEBHOOK_URL`. If present, POST JSON to webhook. Else fall back to existing email path. Single shell helper, called from each notification site (failure / synced / needs-review / no-changes). Every message includes:
- Trigger source: `scheduled` or `manual (@<actor>)`
- Outcome label
- Link to the action run
- Link to the PR (if any)

### 9. Repository configuration (one-time setup)

PR1 also requires (out-of-band, repo settings, not code):
- Branch protection on `master`: require status checks for human PRs (existing CI), require linear history if desired. **Bot identity (GitHub App, §9.1) added to the bypass list** so direct pushes from `docs-sync.yml` can land on protected `master` without a PR. Human contributors still go through normal review. (`sitemap-diff` from PR0 is informational and not required.)
- Optional: `SLACK_WEBHOOK_URL` repo secret. If absent, notifier falls back to email.
- Workflow permission: `contents: write` and `pull-requests: write` granted to the bot identity used for push + PR open (GitHub App installation token per §9.1).

These are documented in the PR description so the reviewer can apply them at merge time.

#### 9.1 Direct-push prerequisites

The action pushes to `master` directly on the happy path (§1 step 12). Two settings must hold:

**A. Token that triggers downstream workflows on `master`.**
Pushes authenticated with the built-in `GITHUB_TOKEN` do not trigger any downstream workflow runs (documented GitHub behavior to prevent recursion). For direct push to `master`, that means existing on-`push: master` automation (post-push CI, deploy hooks, anything watching `main`) silently does not run. We lose the safety net that catches problems even after merge.

Fix: use a **GitHub App installation token**, minted fresh each run via `actions/create-github-app-token@v1`. App-token-authored pushes propagate normal events, so post-`master`-push workflows run as expected. Create a small repo-scoped App with `contents: write` + `pull_requests: write`, install on the repo, mint a token in `docs-sync.yml`.

**B. Branch protection bypass for the bot identity.**
`master` is a protected branch — direct push without a PR is normally rejected. Configure under Settings → Branches → master: add the GitHub App as an allowed actor under "Allow specified actors to bypass required pull requests" (and any "Restrict who can push" rule). The App now has surgical bypass for direct-push; human contributors are unaffected.

Without these two, direct pushes either fail outright (no bypass) or succeed without triggering the downstream automation we depend on (`GITHUB_TOKEN`).

**Why no auto-merge?** Earlier drafts opened a PR on every run and relied on auto-merge. That introduced two non-obvious blockers (PR-event triggers, CODEOWNERS bypass) and required a label→status-check translation workflow (`conflict-gate`). Direct-push-on-success eliminates all of that: the workflow runs the same checks Netlify and master CI run today (inline, before deciding to push), and only opens a PR when something actually needs human eyes. Simpler and the PRs that do exist are by definition the ones a human should look at.

## Data flow per nightly run (PR1 state — target still `hugo/`)

1. Action checks out `master` at HEAD.
2. Docforge fetches from `gardener/*` repos using `GITHUB_TOKEN`. Sources still include `/website/*` (will be stripped in PR2).
3. Output lands in `.docforge-out/`.
4. Post-processing mutates `.docforge-out/` in place; format-allowlist guard runs; marker injection runs.
5. Conflict-check compares `.docforge-out/` against `hugo/`; produces conflict list.
6. `rsync -c` via manifest from `.docforge-out/` → `hugo/`, restricted to managed paths; deletion set applied. Working tree now reflects the proposed update.
7. Inline CI runs against the staged tree (VitePress build, lint, spell-check); produces `ci_ok`. Sitemap-diff also runs against the staged tree to capture URL drift for the commit message / PR description (informational, not part of `ci_ok`).
8. If working tree clean: notifier "no changes", exit.
9. Decision:
   - `conflicts == empty` AND `ci_ok == true` → commit on `master`, push directly using App token (App on bypass list); notifier "synced (direct push)".
   - Otherwise → close stale prior `docs-sync/*` PRs with cross-link, branch `docs-sync/<date>-<run_number>`, commit, push, open PR, apply `has-conflicts` and/or `ci-failed` labels with explanatory comments; notifier "needs review: …".
10. Notifier fires on outcome.

## Error handling

- Docforge non-zero exit → action fails → notifier "nightly failed" → no push, no PR.
- Post-processing script throws → same.
- Format-allowlist guard finds new extension → action fails → notifier "nightly failed" with extension list. Human must update marker-injection script.
- Conflict-check finds entries → routed to PR path (does not abort run); PR opened with `has-conflicts` label and comment; notifier "needs review: conflicts".
- Inline CI red → routed to PR path; PR opened with `ci-failed` label and link to failing logs; notifier "needs review: CI failed".
- Conflicts AND CI red → PR path with both labels; notifier "needs review: both".
- Rsync failure → action fails → notifier "nightly failed".
- Direct push to `master` rejected (e.g., bypass list misconfigured) → action fails → notifier "nightly failed: direct push rejected; check App bypass config".
- No diff after rsync → no commit, no push, no PR; notifier "no changes" (low-priority — possibly suppressed by default; configurable).

All notifications include trigger context (scheduled vs `manual (@actor)`) and a link to the action run.

## Testing strategy

- **Marker injection**: unit-style script tests in `.github/docs-sync/post-processing/` that feed a sample input tree, run injection, assert marker on first line of every text file and idempotency on second run.
- **Format-allowlist guard**: unit test that injects a `.foo` file into a fake `.docforge-out/`, asserts the guard fails with a useful message.
- **Conflict-check**: shell-level test in CI that creates a fake `.docforge-out/` and a fake target tree with one un-marked overlap, runs the check, asserts non-empty exit list.
- **Rsync flip**: integration test in the action workflow itself — first run on a feature branch, inspect resulting diff manually before merge.
- **End-to-end pre-merge check**: before merging PR1, run `workflow_dispatch` against the feature branch with the PR-base parameter pointed at the feature branch (not `master`) and the direct-push target also overridden to a throwaway branch. Inspect: branch is created, content is correct, inline CI ran, decision routed to either direct-push or PR path as expected.
  - **Permission note**: `workflow_dispatch` runs the workflow file from the selected ref, so a feature branch's not-yet-merged workflow definition will execute. Push targets and PR base are parameterized via action inputs (defaulting to `master`) so a feature-branch test never accidentally pushes to or PRs against real `master`. The bot identity (App installation token, §9.1) carries `contents: write` / `pull-requests: write` regardless of which branch dispatched the run.

## Documentation updates

- `README.md`: substantial rewrite of the "getting started" / "contribute" sections.
  - **Remove**: docforge install steps, `GITHUB_OAUTH_TOKEN` instructions, anything that implies contributors need to run docforge locally for normal previews.
  - **Add**: a "How to manually trigger a docs sync" section covering the workflow_dispatch UI and the `gh workflow run docs-sync.yml` CLI form.
  - **Add**: a "Local debug of docs-sync" subsection pointing at `make docs-sync`, calling out that this writes to `.docforge-out/` for inspection only and does NOT update `hugo/` or `website/`.
- `Makefile`: comment block above the new `docs-sync` target noting it is local-debug only and the real sync runs in CI.
- `.docforge/config.yaml`: comment header noting destination is overridden by the action.

## Phasing rationale (1a vs 1b)

Recommended split: ship as two PRs.

### PR1a — Commit current `hugo/` snapshot

Scope:
- Drop `hugo/` from `.gitignore`.
- Commit current generated `hugo/` tree as-is (thousands of files; single bulk commit).
- Commit initial `.docforge-managed-files.txt` listing every path in that snapshot.

Reviewability: snapshot only. Compare against any recent Netlify deploy artifact to confirm parity.

### PR1b — Decouple + temp-dir flip + marker + direct-push wiring

Scope:
- Drop `docforge-ci` and `post-process` from `ci-build` Makefile target. Remove the standalone `docforge-ci` and `post-process` targets entirely. Add new `docs-sync` Makefile target for local debug. Reduce `local-preview` to install + build + preview.
- Relocate `post-processing/` → `.github/docs-sync/post-processing/`.
- Add `.github/docs-sync/run.sh` (single source of truth — §6).
- Add `.github/workflows/docs-sync.yml` with the full pipeline:
  - phase calls into `run.sh`
  - format-allowlist guard step
  - marker injection step
  - conflict-check (live, not no-op)
  - rsync `-c` flip from `.docforge-out/` into `hugo/` via `.docforge-managed-files.txt` manifest (committed)
  - inline CI: VitePress build + lint + spell-check against staged tree; sitemap-diff also runs (informational, attached to commit/PR)
  - `concurrency: docs-sync` group (§1)
  - Decision: direct push to `master` if conflicts==∅ and CI green; else PR path with labels and stale-PR closure
  - branch `docs-sync/<date>-<run_number>` for PR path
  - skip everything if no changes; notify "no changes"
  - pluggable notifier covering all outcomes
- README: manual trigger instructions (workflow_dispatch UI + `gh workflow run docs-sync.yml`), removal of `GITHUB_OAUTH_TOKEN` setup notes, removal of docforge install steps.
- Repo configuration documented in PR description: branch protection on `master` (require existing CI for human PRs), GitHub App install + bypass-list entry (§9.1), optional Slack secret, workflow permissions.

Reviewability: workflow files + Makefile diff + post-processing relocation + CLI-arg + `run.sh` + format-guard + marker step + inline-CI step. No giant snapshot blob (already shipped in 1a).

PR1a must merge before PR1b — 1b's first scheduled run depends on the snapshot + initial manifest existing on `master`.
