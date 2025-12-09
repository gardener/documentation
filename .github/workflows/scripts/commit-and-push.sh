#!/bin/bash
# Script: commit-and-push.sh
# Purpose: Commit and push PR preview files to gh-pages branch
# Usage: PR_NUMBER=<number> ./commit-and-push.sh

set -euo pipefail

echo "=== Starting commit-and-push.sh ==="
echo "PR_NUMBER: ${PR_NUMBER:-<not set>}"

if [ -z "${PR_NUMBER:-}" ]; then
  echo "Error: PR_NUMBER environment variable is required"
  exit 1
fi

echo "Changing directory to: other-repo"
cd other-repo
echo "Current directory: $(pwd)"

# Set git identity for this repository (not inherited from parent repo)
echo "Setting git identity..."
git config user.name "GitHub Actions Bot"
git config user.email "actions@github.com"

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

# Remove existing preview directory if it exists
PREVIEW_DIR="pr-preview/pr-${PR_NUMBER}"
echo "Removing existing preview directory: ${PREVIEW_DIR}"
rm -rf "${PREVIEW_DIR}"

# Create pr-preview directory structure
echo "Creating preview directory: ${PREVIEW_DIR}"
mkdir -p "${PREVIEW_DIR}"

# Copy built files
SOURCE_DIR="../.vitepress/dist"
echo "Copying built files from: ${SOURCE_DIR}"
echo "Destination: ${PREVIEW_DIR}/"
cp -r ${SOURCE_DIR}/* "${PREVIEW_DIR}/"
echo "Files copied. Directory contents:"
ls -la "${PREVIEW_DIR}/" | head -20

# Stage changes
echo "Staging changes: git add ${PREVIEW_DIR}"
git add "${PREVIEW_DIR}"

# Check if there are changes to commit
echo "Checking for staged changes..."
if git diff --staged --quiet; then
  echo "No changes detected in preview files. Skipping commit and push."
  exit 0
fi

echo "Changes detected. Git status:"
git status --short

# Commit and push
COMMIT_MSG="Deploy PR #${PR_NUMBER} preview"
echo "Committing changes with message: ${COMMIT_MSG}"
git commit -m "${COMMIT_MSG}"

REMOTE_BRANCH="origin gh-pages"
echo "Pushing to: ${REMOTE_BRANCH}"
git push origin gh-pages
echo "Preview deployed successfully"
echo "Preview URL should be available at: https://<username>.github.io/<repo>/pr-preview/pr-${PR_NUMBER}/"
