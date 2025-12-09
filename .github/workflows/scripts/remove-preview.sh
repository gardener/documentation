#!/bin/bash
# Script: remove-preview.sh
# Purpose: Remove PR preview from gh-pages branch when PR is closed
# Usage: PR_NUMBER=<number> ./remove-preview.sh

set -euo pipefail

echo "=== Starting remove-preview.sh ==="
echo "PR_NUMBER: ${PR_NUMBER:-<not set>}"

echo "=== Git Configuration ==="
echo "Git user.name: $(git config user.name || echo '<not set>')"
echo "Git user.email: $(git config user.email || echo '<not set>')"
echo "Git remote origin URL: $(git config --get remote.origin.url || echo '<not set>')"
echo "========================="

if [ -z "${PR_NUMBER:-}" ]; then
  echo "Error: PR_NUMBER environment variable is required"
  exit 1
fi

echo "Changing directory to: other-repo"
cd other-repo
echo "Current directory: $(pwd)"

echo "=== Git Configuration in other-repo ==="
echo "Git user.name: $(git config user.name || echo '<not set>')"
echo "Git user.email: $(git config user.email || echo '<not set>')"
echo "Git remote origin URL: $(git config --get remote.origin.url || echo '<not set>')"
echo "========================================"

# Switch to gh-pages branch
echo "Fetching gh-pages branch from origin"
git fetch origin gh-pages
echo "Checking out gh-pages branch"
git checkout gh-pages
echo "Current branch: $(git branch --show-current)"

# Remove preview directory if it exists
PREVIEW_DIR="pr-preview/pr-${PR_NUMBER}"
echo "Checking for preview directory: ${PREVIEW_DIR}"

if [ -d "${PREVIEW_DIR}" ]; then
  echo "Preview directory exists. Removing: ${PREVIEW_DIR}"
  rm -rf "${PREVIEW_DIR}"

  echo "Staging removal: git add -A ${PREVIEW_DIR}"
  git add -A "${PREVIEW_DIR}"

  echo "Checking for staged changes..."
  if git diff --staged --quiet; then
    echo "No changes detected after removal. Nothing to commit."
    exit 0
  fi

  echo "Changes detected. Git status:"
  git status --short

  COMMIT_MSG="Remove PR #${PR_NUMBER} preview"
  echo "Committing changes with message: ${COMMIT_MSG}"
  git commit -m "${COMMIT_MSG}"

  REMOTE_BRANCH="origin gh-pages"
  echo "Pushing to: ${REMOTE_BRANCH}"
  git push origin gh-pages
  echo "Preview removed successfully"
else
  echo "Preview directory does not exist: ${PREVIEW_DIR}"
  echo "Nothing to clean up"
fi
