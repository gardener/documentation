#!/usr/bin/env bash

set -euo pipefail

if [ -z "${GITHUB_OAUTH_TOKEN:-}" ]; then
    token=$(gh auth token --hostname github.com)
    export GITHUB_OAUTH_TOKEN="$token"
fi

if [ -z "$GITHUB_OAUTH_TOKEN" ]; then
    echo "The environment variable GITHUB_OAUTH_TOKEN must be set!"
    exit 1
fi

docker build -t gardener-documentation:dev --load --secret id=GITHUB_OAUTH_TOKEN .
docker run --rm -p 5173:5173 gardener-documentation:dev
