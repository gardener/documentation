#!/usr/bin/env bash

set -euo pipefail

docker build -t gardener-documentation:dev --load .
docker run --rm -p "5173:5173" gardener-documentation:dev
