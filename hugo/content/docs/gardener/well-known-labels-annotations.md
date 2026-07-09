---
github_repo: 'https://github.com/gardener/gardener'
github_subdir: docs/operations
params:
  github_branch: master
path_base_for_github_subdir:
  from: content/docs/gardener/well-known-labels-annotations.md
  to: well-known-labels-annotations.md
persona: Operators
title: Well Known Labels Annotations
prev: false
next: false
managed: true
---

# Well-Known Labels and Annotations

This document serves both as a reference to the values and as a coordination point for assigning values.

## Labels and annotations used on API objects

### seed.gardener.cloud/provider

**Type**: Label

**Example**: `seed.gardener.cloud/provider: "aws"`

**Used on**: `Seed` Objects

Identifies the seed provider's type. It can be used to configure a seed selector for the shoot.

### seed.gardener.cloud/region

**Type**: Label

**Example**: `seed.gardener.cloud/region: "us-east-1"`

**Used on**: `Seed` Objects

Identifies the seed provider's region. It can be used to configure a seed selector for the shoot.
