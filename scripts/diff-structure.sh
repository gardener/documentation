#!/usr/bin/env bash
# SPDX-FileCopyrightText: 2018 SAP SE or an SAP affiliate company and Gardener contributors
#
# SPDX-License-Identifier: Apache-2.0
#
# Diff the generated site structure (sitemap URLs) of the current working tree
# against a baseline, to detect added / removed / renamed pages caused by a change.
#
# The comparison is done over the <loc> URLs in .vitepress/dist/sitemap.xml, which
# is the authoritative list of pages VitePress actually publishes. <lastmod> is
# ignored because it changes on every build.
#
# This script does NOT run docforge or post-process. It only runs ci-install + build.
# hugo/content is committed to git (docforge aggregates it daily, e.g. the
# "chore(content): aggregate docs" commits on master), so every ref carries its own
# content and builds standalone.
#
# The baseline builds the target ref's committed content; "after" builds your working
# tree (committed + uncommitted). The diff therefore surfaces ANY sitemap change,
# whether caused by code (post-processing, config.mts, theme) or by content edits.
#
# Usage:
#   scripts/diff-structure.sh master        # baseline = latest origin/master
#   scripts/diff-structure.sh branch-origin # baseline = merge-base of HEAD and master
#   scripts/diff-structure.sh working        # baseline = current dist/, then rebuild HEAD
#
# working mode is two-phase:
#   1) scripts/diff-structure.sh working --snapshot   # capture current dist as baseline
#   2) ... make your change ...
#   3) scripts/diff-structure.sh working              # rebuild HEAD and diff vs snapshot

set -euo pipefail

REPO_ROOT="$(git rev-parse --show-toplevel)"
cd "$REPO_ROOT"

SITEMAP_REL=".vitepress/dist/sitemap.xml"
OUT_DIR="/tmp/diff-structure"
mkdir -p "$OUT_DIR"

MODE="${1:-}"
FLAG="${2:-}"

extract_locs() {
  # $1 = path to sitemap.xml, $2 = output file (sorted, unique loc URLs)
  local sitemap="$1" out="$2"
  if [ ! -f "$sitemap" ]; then
    echo "ERROR: sitemap not found: $sitemap" >&2
    return 1
  fi
  grep -oE '<loc>[^<]+</loc>' "$sitemap" \
    | sed -E 's#</?loc>##g' \
    | sort -u > "$out"
  echo "  -> $(wc -l <"$out" | tr -d ' ') URLs -> $out"
}

build_only() {
  # Runs in the current directory. Renders whatever markdown sits in hugo/content.
  # No docforge, no post-process -- caller is responsible for hugo/content state.
  if [ ! -d hugo/content ] || [ -z "$(ls -A hugo/content 2>/dev/null)" ]; then
    echo "ERROR: hugo/content is missing or empty in $(pwd)." >&2
    echo "       Populate it (e.g. copy from a built checkout) before building." >&2
    return 1
  fi
  echo "==> ci-install"
  make ci-install >/dev/null
  echo "==> build"
  make build >/dev/null
}

build_baseline_in_worktree() {
  # $1 = git ref to check out, $2 = label used for worktree dir + output file
  local ref="$1" label="$2"
  local resolved
  resolved="$(git rev-parse --verify "$ref")"
  local wt="$OUT_DIR/wt-$label"

  echo "==> Preparing baseline '$label' at $ref ($resolved)"
  # Clean up a stale worktree from a previous run.
  if git worktree list --porcelain | grep -q "^worktree $wt$"; then
    git worktree remove --force "$wt"
  fi
  rm -rf "$wt"

  git worktree add --detach "$wt" "$resolved"

  # The ref carries its own committed hugo/content (docforge aggregates it daily into
  # git, e.g. "chore(content): aggregate docs"). We build THAT content, so the diff
  # reflects both code and content differences between the ref and your working tree.
  if [ ! -d "$wt/hugo/content" ] || [ -z "$(ls -A "$wt/hugo/content" 2>/dev/null)" ]; then
    echo "ERROR: $ref has no hugo/content checked out at $wt/hugo/content." >&2
    echo "       Expected committed content on that ref." >&2
    git worktree remove --force "$wt"
    return 1
  fi

  (
    cd "$wt"
    build_only
  )
  extract_locs "$wt/$SITEMAP_REL" "$OUT_DIR/baseline.txt"

  git worktree remove --force "$wt"
}

print_diff() {
  # $1 = baseline file, $2 = after file
  # Optional env:
  #   DIFF_OUT_FILE  -- if set, the formatted diff is also written here.
  #   DIFF_META_FILE -- if set, "added=<n>" / "removed=<n>" are written here
  #                     (consumable via GITHUB_OUTPUT in CI).
  local base="$1" after="$2"
  local added removed
  added="$(comm -13 "$base" "$after")"
  removed="$(comm -23 "$base" "$after")"

  local n_added n_removed
  n_added="$( [ -z "$added" ] && echo 0 || printf '%s\n' "$added" | wc -l | tr -d ' ' )"
  n_removed="$( [ -z "$removed" ] && echo 0 || printf '%s\n' "$removed" | wc -l | tr -d ' ' )"

  {
    echo
    echo "================ STRUCTURE DIFF ================"
    echo "baseline: $base ($(wc -l <"$base" | tr -d ' ') URLs)"
    echo "after   : $after ($(wc -l <"$after" | tr -d ' ') URLs)"
    echo "-----------------------------------------------"
    echo "ADDED   ($n_added):"
    [ -n "$added" ] && printf '  + %s\n' $added || echo "  (none)"
    echo "REMOVED ($n_removed):"
    [ -n "$removed" ] && printf '  - %s\n' $removed || echo "  (none)"
    echo "==============================================="
    echo "NOTE: a rename shows up as one REMOVED (old path) + one ADDED (new path)."
    if [ "$n_added" -eq 0 ] && [ "$n_removed" -eq 0 ]; then
      echo "RESULT: no structural change in sitemap URLs."
    else
      echo "RESULT: structure changed ($n_added added, $n_removed removed)."
    fi
  } | if [ -n "${DIFF_OUT_FILE:-}" ]; then tee "$DIFF_OUT_FILE"; else cat; fi

  if [ -n "${DIFF_META_FILE:-}" ]; then
    {
      echo "added=$n_added"
      echo "removed=$n_removed"
    } > "$DIFF_META_FILE"
  fi
}

warn_content_state() {
  cat >&2 <<EOF

!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  This script does NOT run docforge or post-process. It only builds.
  Baseline builds the committed hugo/content of the target ref.
  "after" builds YOUR working tree's hugo/content (incl. uncommitted edits).
  The diff therefore reflects ANY sitemap change: code OR content.
  Make sure your working tree holds exactly the state you want to compare.
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

EOF
}

case "$MODE" in
  master)
    warn_content_state
    echo "==> Fetching origin/master"
    git fetch origin master
    build_baseline_in_worktree "origin/master" "master"
    echo "==> Building current working tree (HEAD + uncommitted)"
    build_only
    extract_locs "$REPO_ROOT/$SITEMAP_REL" "$OUT_DIR/after.txt"
    print_diff "$OUT_DIR/baseline.txt" "$OUT_DIR/after.txt"
    ;;

  branch-origin)
    warn_content_state
    mb="$(git merge-base HEAD origin/master 2>/dev/null || git merge-base HEAD master)"
    echo "==> Branch origin (merge-base) = $mb"
    build_baseline_in_worktree "$mb" "branch-origin"
    echo "==> Building current working tree (HEAD + uncommitted)"
    build_only
    extract_locs "$REPO_ROOT/$SITEMAP_REL" "$OUT_DIR/after.txt"
    print_diff "$OUT_DIR/baseline.txt" "$OUT_DIR/after.txt"
    ;;

  working)
    if [ "$FLAG" = "--snapshot" ]; then
      echo "==> Snapshotting current dist as baseline (no rebuild)"
      extract_locs "$REPO_ROOT/$SITEMAP_REL" "$OUT_DIR/baseline.txt"
      echo "Baseline captured. Make your change, then run:"
      echo "  scripts/diff-structure.sh working"
      exit 0
    fi
    if [ ! -f "$OUT_DIR/baseline.txt" ]; then
      echo "ERROR: no baseline found. Run first:" >&2
      echo "  scripts/diff-structure.sh working --snapshot" >&2
      exit 1
    fi
    echo "==> Rebuilding current working tree (HEAD + uncommitted)"
    build_only
    extract_locs "$REPO_ROOT/$SITEMAP_REL" "$OUT_DIR/after.txt"
    print_diff "$OUT_DIR/baseline.txt" "$OUT_DIR/after.txt"
    ;;

  *)
    cat >&2 <<'EOF'
This script builds committed hugo/content per ref (no docforge, no post-process).
The diff surfaces ANY sitemap change, from code or from content edits.

Usage:
  scripts/diff-structure.sh master
      Baseline = origin/master (fresh worktree, builds master's committed content),
      compared to your working tree (committed + uncommitted).

  scripts/diff-structure.sh branch-origin
      Baseline = merge-base(HEAD, master), i.e. where your branch forked off.
      Builds that ref's content, compared to your working tree.

  scripts/diff-structure.sh working --snapshot
      Capture the CURRENT .vitepress/dist/sitemap.xml as baseline (no rebuild).
  scripts/diff-structure.sh working
      Rebuild the working tree and diff against that snapshot.
      Use to check whether one specific in-progress change alters the sitemap.
EOF
    exit 1
    ;;
esac
