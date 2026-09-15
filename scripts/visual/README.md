# Visual Regression

- `make visual` — build + screenshot all pages, compare against baseline, open report.
- `make visual-diff` — only pages whose source markdown changed vs `origin/master`
  (override base with `VISUAL_DIFF_BASE=<ref>`).
- `make visual-baseline` — build + record a fresh baseline (`--update-snapshots`).
- `make visual-against BASE=<ref>` — render `<ref>` as the baseline and compare the
  current working tree against it (default `BASE=origin/master`). Builds `<ref>` in a
  throwaway git worktree, so nothing needs committing first.

Routes come from `.vitepress/dist/sitemap.xml` (run `make build` first).

Baseline PNGs live in `tests/visual/pages.spec.ts-snapshots/` and are **not**
committed (hundreds of MB); the directory is git-ignored. Regenerate the
baseline locally with `make visual-baseline` before running a comparison.
git-lfs is the later upgrade path if the baseline should be shared.

## CI

`.github/workflows/visual-regression.yml` runs `make visual-against BASE=origin/master`
on Linux and publishes the HTML report to GitHub Pages under a per-PR folder. It runs:

- once when a PR is **opened** (bot PRs and fork PRs are skipped), and
- on demand when a collaborator comments `/visual-regression` on the PR
  (this path works for fork PRs too, as it runs in the base-repo context).

The report is published to the `gh-pages` branch under `pr-<n>/` and reachable at
`https://<owner>.github.io/<repo>/pr-<n>/`. When the PR closes, that folder is
removed from `gh-pages`.

Setup: GitHub Pages must be served from the `gh-pages` branch
(Settings → Pages → Source: "Deploy from a branch", branch `gh-pages`, `/root`).
No secrets are needed; the workflow uses the built-in `GITHUB_TOKEN`.

Note: report PNGs accumulate in the `gh-pages` branch history. Squash that branch
periodically if its size becomes a concern.


