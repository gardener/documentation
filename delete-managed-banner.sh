#!/usr/bin/env bash
set -euo pipefail

# Deletes files recursively that contain the managed banner marker.
# When deleting a file leaves its directory without any .md files, the whole
# directory is removed (including remaining assets), walking upwards so parent
# directories that lose their last .md collapse as well.
# Dry-run by default; pass --force to actually delete.

usage() {
  echo "Usage: $0 [--force] <path>" >&2
  echo "  Without --force: only lists matching files and directories (dry-run)." >&2
  exit 1
}
FORCE=0
TARGET=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --force) FORCE=1; shift ;;
    -h|--help) usage ;;
    -*) echo "Unknown option: $1" >&2; usage ;;
    *) TARGET="$1"; shift ;;
  esac
done

[[ -z "$TARGET" ]] && usage

if [[ ! -d "$TARGET" ]]; then
  echo "Error: '$TARGET' is not a directory" >&2
  exit 1
fi

# Normalize TARGET to an absolute path so the upward walk has a hard stop
# and cannot escape above the requested root.
ROOT="$(cd "$TARGET" && pwd)"

# The marker is unique enough on its own; matching the whole ASCII block
# would be brittle across encodings.
MARKER='<!-- BANNER:MANAGED -->'

# Collect matches null-delimited to handle any filename safely.
mapfile -d '' -t MATCHES < <(grep -rlZ --fixed-strings "$MARKER" "$ROOT" 2>/dev/null || true)

COUNT=${#MATCHES[@]}

if [[ $COUNT -eq 0 ]]; then
  echo "No files contain the marker under '$ROOT'."
  exit 0
fi

# True when the directory contains no .md files at any depth below it.
dir_has_no_md() {
  local dir="$1"
  [[ -z "$(find "$dir" -type f -name '*.md' -print -quit)" ]]
}

# If a directory has lost all its .md files, remove it entirely (including any
# leftover assets) and repeat for the parent, stopping at ROOT (exclusive).
prune_md_less_dirs() {
  local dir="$1"
  while [[ "$dir" != "$ROOT" && "$dir" == "$ROOT"/* ]]; do
    [[ -d "$dir" ]] || break
    dir_has_no_md "$dir" || break
    rm -rf -- "$dir"
    echo "removed dir (no .md left): $dir"
    dir="$(dirname "$dir")"
  done
}

if [[ $FORCE -eq 1 ]]; then
  for f in "${MATCHES[@]}"; do
    # A parent may already be gone if a sibling deletion pruned it.
    [[ -e "$f" ]] || continue
    rm -- "$f"
    echo "deleted: $f"
    prune_md_less_dirs "$(dirname "$f")"
  done
  echo "Deleted $COUNT file(s)."
else
  echo "Dry-run: $COUNT file(s) would be deleted (pass --force to delete):"
  for f in "${MATCHES[@]}"; do
    echo "  $f"
  done
fi
