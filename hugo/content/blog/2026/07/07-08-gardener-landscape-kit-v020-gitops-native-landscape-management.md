---
aliases:
  - >-
    /blog/2026/07/08/gardener-landscape-kit-v020-gitops-native-landscape-management
authors:
  - avatar: 'https://avatars.githubusercontent.com/timuthy'
    login: timuthy
    name: Tim Usner
github_repo: 'https://github.com/gardener/documentation'
github_subdir: hugo/content/blog/2026/07
linkTitle: 'Gardener Landscape Kit v0.2.0: GitOps-Native Landscape Management'
newsSubtitle: 'July 08, 2026'
params:
  github_branch: master
path_base_for_github_subdir:
  from: >-
    content/blog/2026/07/07-08-gardener-landscape-kit-v020-gitops-native-landscape-management.md
  to: 07-08-gardener-landscape-kit-v020-gitops-native-landscape-management.md
publishdate: '2026-07-08'
tags:
  - feature-announcement
  - extensions
title: 'Gardener Landscape Kit v0.2.0: GitOps-Native Landscape Management'
local: true
---

# Gardener Landscape Kit v0.2.0: GitOps-Native Landscape Management

Managing a Gardener landscape involves deploying and keeping in sync a large collection of components — the Gardener core components, provider, network, OS and general extensions, and their configurations. Until now, each operator had to solve this problem individually. The Gardener Landscape Kit (GLK), proposed with [GEP-49](https://github.com/gardener/gardener/blob/master/docs/proposals/49-gardener-landscape-kit.md), aims to close that gap by providing an opinionated, but extensible and customizable toolkit for bootstrapping and maintaining Gardener landscapes.

With v0.2.0, GLK has reached a set of milestones worth sharing. This post walks through what's new and how it works in practice.

## What is the Gardener Landscape Kit?

GLK is a CLI tool and a collection of templates that helps operators generate a GitOps-ready directory structure for a Gardener landscape. It generates Kubernetes manifests intended to be applied via [Flux](https://fluxcd.io/) and uses [Kustomize](https://kustomize.io/) as the layering mechanism for configuration overrides.

The two core commands are:

- **`generate`** — generates or updates the manifest structure for a `base` (shared config across landscapes) or a specific `landscape` (concrete, landscape-specific overrides on top of the base).
- **`resolve`** — reads an [OCM component descriptor](https://ocm.software/docs/getting-started/component-descriptor-example/) and resolves version and image information into a `components.yaml` that GLK can consume.

The design mirrors what Kustomize users already know: a `base` holds shared resources, individual landscape overlays extend or override them. GLK makes this concrete for Gardener by generating the right structure out of the box.

## Multi-Component Inheritance

Previously, overriding a single component property — say, pinning a specific Gardener version for one landscape — required duplicating the entire component config. Any future update to the built-in defaults would then diverge silently from your override.

v0.2.0 introduces a three-level inheritance chain: `landscape` → `base` → built-in. The `resolve` command now generates and updates a `components.yaml` override file within the target directory. You can express a partial override (e.g., just `version`) and GLK merges it with the full built-in component config on every run. This means your landscape-specific pinning stays in sync with upstream GLK defaults automatically, without manual reconciliation.

## Repositories Configuration

Paths within each repository are specified relative to that repository's root, and the `generate` commands take the repository's root directory as the target. This makes multi-repository setups (where `base` and each landscape live in separate repos) and mono-repository setups (everything in one repo) equally straightforward to configure.

## More Built-In Extensions

GLK ships with a curated set of components that reflect the Gardener ecosystem. v0.2.0 adds five more extensions to the built-in catalog:

- `runtime-gvisor`
- `shoot-cert-service`
- `shoot-dns-service`
- `shoot-networking-problemdetector`
- `shoot-oidc-service`

Operators using any of these extensions no longer need to maintain their own component definitions — GLK generates and maintains them.

## Day-Two Operations via GitHub Actions

Bootstrapping a landscape once is useful. Keeping it current over time is the harder problem. GLK ships a GitHub Actions workflow that runs GLK commands like `generate` and `resolve` automatically whenever you open a pull request against your landscape repository. Any change you commit triggers a re-generation, and the resulting diff is added to the same PR. This gives operators a review checkpoint: inspect what GLK changed, merge if it looks right.

Custom components — extensions that aren't part of the upstream catalog — are fully supported alongside built-in ones. GLK will leave your custom directories untouched on re-generation while still resolving version information from OCM descriptors for those components if you supply them.

## What's Coming

The team is actively working on:

- **Migration logic** — version-aware migration steps embedded in GLK, so that upgrading Gardener or an extension can automatically apply the necessary API or manifest changes across your landscape repositories.
- **`Gardenlet` and `ManagedSeed` resource generation** — currently operators still have to create these manually after bootstrapping; that gap will be closed.
- **Qualified image vector** — a community-verified record of component version combinations that have been tested together at scale on a production landscape, contributed back to the GLK repository so everyone can benefit from that validation.

## Getting Started

> [!WARNING]
> GLK is under active development. Breaking changes occur frequently. It is not yet ready for production use.

Install the `glk` binary for your target release and point it at a `components.yaml` (download from <https://github.com/gardener/gardener-landscape-kit>):

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/gardener/gardener-landscape-kit/HEAD/install.sh)" -- \
  --components-file path/to/components.yaml
```

From there, `glk generate base <target-dir>` and `glk generate landscape <target-dir>` get you started.

---

**References:**
- [📽️ Review Meeting Recording (starts at 19:41)](https://youtu.be/b82zsHo-PIc?t=1181)
- [gardener-landscape-kit repository](https://github.com/gardener/gardener-landscape-kit)
- [PR #169 — Multi-component inheritance](https://github.com/gardener/gardener-landscape-kit/pull/169)
- [PR #356 — Repositories configuration](https://github.com/gardener/gardener-landscape-kit/pull/356)
- [PR #99 — New extensions](https://github.com/gardener/gardener-landscape-kit/pull/99)
