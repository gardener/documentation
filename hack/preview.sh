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

host_port="${PREVIEW_PORT:-5180}"

docker build -t gardener-documentation:dev --load --secret id=GITHUB_OAUTH_TOKEN .
docker run --rm -p "${host_port}:5173" gardener-documentation:dev
