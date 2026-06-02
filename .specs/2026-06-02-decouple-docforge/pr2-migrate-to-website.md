# PR2 — Migrate generated docs to `website/`

**Status**: Design — pending implementation
**Date**: 2026-06-02
**Author**: klocke-io
**Master spec**: [`README.md`](./README.md)
**Depends on**: PR1 (docs-sync action live; snapshot + manifest committed)

## Scope

Cutover from `hugo/` to `website/` as the docforge sync target and VitePress source. Strip `/website/*` `fileTree` entries from docforge config so the source-mirror loop disappears. Delete the now-redundant top-level `hugo/` tree.

## Out of scope

- Pipeline shape changes — the action and `run.sh` are unchanged from PR1; only the target dir flips.
- `sitemap-diff.sh` / `sitemap-diff.yml` — already shipped in PR0.
- `website/hugo/` migration — already deleted in commit `a89b53a1` before this work began.

## Why this is a separate PR

- PR1 stabilizes the docs-sync action against the existing `hugo/` target. PR2 only flips the target. Splitting isolates "did the action work" (PR1) from "did the target switch lose URLs" (PR2).
- Lets PR1 run for at least one full sync cycle on `master` before any user-facing URL changes go live.
- The `srcDir` flip + `/website/*` strip + `hugo/` delete are a coordinated cutover that benefits from a clean diff to review.

## Components

### 1. Strip `/website/*` from docforge config

Strip `.docforge/website.yaml` of all `/website/*` `fileTree` entries. Post-cutover, docforge no longer reads from `website/`; sources live where they are served. The remaining docforge structure entries cover only externally-sourced content (e.g., `documentation/`, `adopters/`, `contribute/`, the security report HTML).

This breaks the source-mirror loop (goal #7 in master spec): today docforge reads `/website/{blog,community,about,public,index.md}` and writes copies into `hugo/`. After cutover those dirs ARE the served content; docforge only contributes externally-pulled content.

### 2. Verify and adjust `dir:` mappings

Verify `website/` already has the structure that docforge will write into. Adjust `.docforge/website.yaml` `dir:` mappings as needed (e.g., rename `dir: docs` → `dir: documentation` to match existing folder name) so the rsync flip lands files in the right place.

### 3. Switch flip target

Update `phase_rsync_flip` (or its env config) so `<target>` resolves to `website/` instead of `hugo/`. The phase logic itself is unchanged from PR1.

The first PR2 sync run produces a large diff: every docforge-managed path moves from `hugo/` to `website/`. Expected and reviewed via the cutover validation procedure below.

### 4. VitePress config

Update `.vitepress/config`:
```js
srcDir: './website'
```

### 5. Delete top-level `hugo/`

Remove the entire `hugo/` directory. Snapshot lives in git history if ever needed.

### 6. Post-processing path adjustments

Update post-processing scripts where their behavior depends on `hugo/content/` path semantics (e.g., link rewriting). Audit each `part-*.js` for hardcoded `hugo/` substrings and adjust to either accept the target as a CLI arg (already done in PR1 for the input dir) or derive from the input dir.

## Data flow per nightly run (final state, post-PR2)

1. Action checks out `master` at HEAD.
2. Docforge fetches from `gardener/*` repos using `GITHUB_TOKEN`. Sources are external only — no `/website/*` fileTree reads.
3. Output lands in `.docforge-out/`.
4. Post-processing mutates `.docforge-out/` in place; format-allowlist guard runs; marker injection runs.
5. Conflict-check compares `.docforge-out/` against `website/`; produces conflict list.
6. `rsync -c` via manifest from `.docforge-out/` → `website/`, restricted to managed paths; deletion set applied. Working tree now reflects the proposed update.
7. Inline CI runs against the staged tree (VitePress build, lint, spell-check); produces `ci_ok`. Sitemap-diff runs informationally to capture URL drift.
8. If working tree clean: notifier "no changes", exit.
9. Decision:
   - `conflicts == empty` AND `ci_ok == true` → commit on `master`, push directly using App token; notifier "synced (direct push)".
   - Otherwise → PR path with `has-conflicts` and/or `ci-failed` labels; notifier "needs review: …".
10. Notifier fires on outcome.

## Cutover validation (mandatory before merge)

Verify URL stability before deleting `hugo/`:

1. On master HEAD before applying PR2:
   ```bash
   npm ci && npx vitepress build
   OUT=/tmp/paths-before.txt .github/scripts/sitemap-diff.sh
   ```
2. Apply PR2 changes locally (switch `srcDir`, strip `/website/*` fileTree, run a fresh sync).
3. Build again, run the script:
   ```bash
   npx vitepress build
   OUT=/tmp/paths-after.txt .github/scripts/sitemap-diff.sh
   ```
4. **URL diff** — `diff /tmp/paths-before.txt /tmp/paths-after.txt` must be empty, OR every removed/moved URL is explicitly justified in the PR description (with redirect plan if applicable).
5. Visual spot-check a handful of high-traffic pages (homepage, top-level guides) against the current Netlify deploy to catch render-level regressions the URL diff cannot see.

The PR0 `sitemap-diff` workflow runs the same diff on PR open, but the manual procedure above runs it once **before** opening the PR so URL drift can be caught and addressed locally without burning CI cycles.

## Error handling

Same as PR1 — the action and `run.sh` shape is unchanged. The only PR2-specific failure mode is target-dir misconfiguration:

- Rsync flip writes to wrong dir (e.g., `website/` typo) → action fails on inline CI step (VitePress build cannot find expected paths) → routed to PR path with `ci-failed` label.
- `dir:` mapping mismatch with existing `website/` structure → manifests don't line up → conflict-check surfaces this as conflicts on the first run.

Both modes surface to a human via the PR path; neither lands silently on `master`.

## Documentation updates

- `README.md`: update any references to `hugo/` as the served-content root. After PR2, the served content root is `website/`.
- `.docforge/website.yaml`: comment header noting `/website/*` sources were intentionally stripped at cutover; do not re-add.
- Migration note in PR description: link to the cutover validation results so reviewers can see "URL set unchanged" before approving.

## Reviewability

Tight diff (post-PR1):
- `.docforge/website.yaml` — entries removed, `dir:` mappings adjusted.
- `.vitepress/config` — `srcDir` change.
- `hugo/` directory — deleted (large blob in diff but a single conceptual change).
- `phase_rsync_flip` target — config change in `run.sh` or workflow env.
- Post-processing scripts — only paths that depended on `hugo/content/` semantics.

Sequence the PR commits so the snapshot delete is the last commit; reviewers can review the config + script changes in isolation before facing the blob delete.
