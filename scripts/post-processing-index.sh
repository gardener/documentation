#!/bin/bash

set -euo pipefail

find "$1" -type f -name "_index.md" | while read -r file; do
  dir=$(dirname "$file")
  cp "$file" "$dir/index.md"
done
