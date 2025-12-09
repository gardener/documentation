#!/bin/bash
# Script: remove-preview.sh
# Purpose: Remove PR preview from gh-pages branch when PR is closed
# Usage: PR_NUMBER=<number> ./remove-preview.sh

set -euo pipefail

if [ -z "${PR_NUMBER:-}" ]; then
  echo "Error: PR_NUMBER environment variable is required"
  exit 1
fi

cd other-repo

# Switch to gh-pages branch
git fetch origin gh-pages
git checkout gh-pages

# Remove preview directory if it exists
if [ -d "pr-preview/pr-${PR_NUMBER}" ]; then
  rm -rf "pr-preview/pr-${PR_NUMBER}"
  git add -A "pr-preview/pr-${PR_NUMBER}"
  git commit -m "Remove PR #${PR_NUMBER} preview"
  git push origin gh-pages
  echo "Preview removed successfully"
else
  echo "Preview directory does not exist, nothing to clean up"
fi
