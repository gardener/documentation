#!/bin/bash
# Script: commit-and-push.sh
# Purpose: Commit and push PR preview files to gh-pages branch
# Usage: PR_NUMBER=<number> ./commit-and-push.sh

set -euo pipefail

if [ -z "${PR_NUMBER:-}" ]; then
  echo "Error: PR_NUMBER environment variable is required"
  exit 1
fi

cd other-repo

# Switch to gh-pages branch
git fetch origin gh-pages
git checkout gh-pages

# Remove existing preview directory if it exists
rm -rf "pr-preview/pr-${PR_NUMBER}"

# Create pr-preview directory structure
mkdir -p "pr-preview/pr-${PR_NUMBER}"

# Copy built files
cp -r ../.vitepress/dist/* "pr-preview/pr-${PR_NUMBER}/"

# Stage changes
git add "pr-preview/pr-${PR_NUMBER}"

# Check if there are changes to commit
if git diff --staged --quiet; then
  echo "No changes detected in preview files. Skipping commit and push."
  exit 0
fi

# Commit and push
git commit -m "Deploy PR #${PR_NUMBER} preview"
git push origin gh-pages
echo "Preview deployed successfully"
