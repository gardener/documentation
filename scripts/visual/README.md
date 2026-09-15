# Visual Regression

- `make visual` — build + screenshot all pages, compare against baseline, open report.
- `make visual-diff` — only pages whose source markdown changed vs `origin/master`
  (override base with `VISUAL_DIFF_BASE=<ref>`).
- `make visual-baseline` — build + record a fresh baseline (`--update-snapshots`).

Routes come from `.vitepress/dist/sitemap.xml` (run `make build` first).

Baseline PNGs live in `tests/visual/pages.spec.ts-snapshots/` and are **not**
committed (hundreds of MB); the directory is git-ignored. Regenerate the
baseline locally with `make visual-baseline` before running a comparison.
git-lfs is the later upgrade path if the baseline should be shared.
