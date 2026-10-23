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
esc() { printf '%s' "$1" | sed 's/[][\.*^$#|()+?{}]/\\&/g'; }

# Pin prefixes and disable external diff tools so user git config cannot change the format.
# git diff --no-index exits 1 when there are differences.
# Strip the two root dirs from header lines so files show as a/x vs b/x, not as renames.
{ git -c core.quotePath=false -c core.safecrlf=false diff --no-index -M --no-color --no-ext-diff \
	--src-prefix=a/ --dst-prefix=b/ "$OLD" "$NEW" || [ $? -eq 1 ]; } |
	sed -E "/^(diff --git|--- |\+\+\+ |rename (from|to) |Binary files )/s#(^|[ab]/|rename (from|to) )($(esc "$OLD")|$(esc "$NEW"))/#\1#g" \
	> "$OUT/content.diff"

if [ ! -s "$OUT/content.diff" ]; then
	echo "No differences between $OLD and $NEW."
	exit 0
fi

pnpm exec diff2html -s side -t "structure-preview: $OLD -> $NEW" \
	-i file -F "$OUT/diff.html" -- "$OUT/content.diff" >/dev/null

echo "Content diff ($(grep -c '^diff --git' "$OUT/content.diff") files): open $OUT/diff.html"
