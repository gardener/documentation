#!/usr/bin/env bash
# SPDX-FileCopyrightText: Contributors to the Gardener project
#
# SPDX-License-Identifier: Apache-2.0

# Render the diff hugo/content -> .preview/content as browsable HTML (diff2html).
# Called by `make structure-preview` after aggregation, before the preview server.
# Usage: scripts/preview-diff.sh [old-dir] [new-dir] [out-dir]
set -euo pipefail

OLD="${1:-hugo/content}"
NEW="${2:-.preview/content}"
OUT="${3:-.preview}"

# git diff --no-index exits 1 when there are differences.
git -c core.quotePath=false -c core.safecrlf=false diff --no-index -M --no-color "$OLD" "$NEW" > "$OUT/content.raw.diff" || [ $? -eq 1 ]

# Strip the two root dirs from header lines so files show as a/x vs b/x, not as renames.
sed -E "/^(diff --git|--- |\+\+\+ |rename (from|to) )/s#($OLD|$NEW)/##g" \
	"$OUT/content.raw.diff" > "$OUT/content.diff"
rm "$OUT/content.raw.diff"

if [ ! -s "$OUT/content.diff" ]; then
	echo "No differences between $OLD and $NEW."
	exit 0
fi

pnpm dlx diff2html-cli@5.2.15 -s side -t "structure-preview: $OLD -> $NEW" \
	-i file -F "$OUT/diff.html" -- "$OUT/content.diff" >/dev/null

echo
echo "Content diff ($(grep -c '^diff --git' "$OUT/content.diff") files): open $OUT/diff.html"
echo
