#!/usr/bin/env bash
# SPDX-FileCopyrightText: Contributors to the Gardener project
#
# SPDX-License-Identifier: Apache-2.0
#
# Visual regression against an arbitrary git ref as baseline.
#
# Playwright compares screenshots against on-disk baseline PNGs, not branch
# against branch. This script produces the baseline from <ref> and compares
# the current working tree against it, both rendered by the same spec:
#
#   1. add a temp worktree for <ref>, build its dist there
#   2. copy that dist into THIS worktree, screenshot it as the baseline
#      (--update-snapshots writes PNGs next to the spec, gitignored)
#   3. build the current working tree, screenshot it and compare
#   4. open the HTML report; remove the temp worktree
#
# The <ref> content does not need docforge/post-process: hugo/content is
# committed and already post-processed, so `vitepress build` alone renders it.
#
# Usage: scripts/visual/visual-against.sh [<ref>]   (default: origin/master)
set -euo pipefail

REF="${1:-origin/master}"
REPO_ROOT="$(git rev-parse --show-toplevel)"
DIST="$REPO_ROOT/.vitepress/dist"
TMP_WT="$REPO_ROOT/.claude/worktrees/.visual-baseline-$$"

git rev-parse --verify -q "$REF^{commit}" >/dev/null \
  || { echo "ref not resolvable: $REF" >&2; exit 2; }

# Refresh remote-tracking refs so an origin/* baseline is current. Offline or
# a non-remote ref (a local branch/SHA) is fine; ignore fetch failure.
echo "==> fetching latest remote refs"
git -C "$REPO_ROOT" fetch --quiet 2>/dev/null || true

cleanup() {
  git -C "$REPO_ROOT" worktree remove --force "$TMP_WT" 2>/dev/null || true
  git -C "$REPO_ROOT" worktree prune 2>/dev/null || true
}
trap cleanup EXIT

echo "==> baseline: building $REF in a temp worktree"
git -C "$REPO_ROOT" worktree add --detach "$TMP_WT" "$REF"
# Build the temp worktree's content from THIS worktree (using our node_modules)
# by passing its root to vitepress. No node_modules is created in the temp
# worktree, so pnpm never tries to purge/reinstall ours.
( cd "$REPO_ROOT" && VITE_PUBLIC_BASE_PATH='' pnpm exec vitepress build "$TMP_WT" )

echo "==> baseline: rendering $REF as the baseline snapshots"
rm -rf "$DIST"
cp -R "$TMP_WT/.vitepress/dist" "$DIST"
# Do not fail on a single page that can't be screenshotted: --update-snapshots
# exits non-zero if any snapshot fails to render, which under `set -e` would
# discard all the baselines that DID succeed and kill the whole run. The
# missing baseline surfaces as a diff in the compare step below, which is where
# it belongs.
( cd "$REPO_ROOT" && VISUAL_FRESH_SERVER=1 VISUAL_MODE=all pnpm exec playwright test --update-snapshots ) || true

echo "==> current: building working tree and comparing"
( cd "$REPO_ROOT" && VITE_PUBLIC_BASE_PATH='' pnpm exec vitepress build )
# Do not fail the script on visual diffs; we want the report either way.
# VISUAL_FRESH_SERVER forces a new preview server per run so this compare
# screenshots the current build, not the baseline server still serving.
( cd "$REPO_ROOT" && VISUAL_FRESH_SERVER=1 VISUAL_MODE=all pnpm exec playwright test ) || true

# Remove the temp worktree before show-report, which blocks serving the
# report until the user stops it; the EXIT trap stays as a failure fallback.
cleanup

# On CI (VISUAL_CI set) leave playwright-report/ on disk for deployment; the
# blocking show-report is only useful for a local, interactive run.
if [ -z "${VISUAL_CI:-}" ]; then
  ( cd "$REPO_ROOT" && pnpm exec playwright show-report ) || true
fi
