---
description: >-
  Gardener extension controller which deploys pull-through caches for container
  registries.
github_repo: 'https://github.com/gardener/gardener-extension-registry-cache'
github_subdir: .
params:
  github_branch: main
path_base_for_github_subdir:
  from: content/docs/extensions/others/gardener-extension-registry-cache/_index.md
  to: README.md
title: Registry Cache
prev: false
next: false
managed: true
---

# Gardener Extension for Registry Cache

[![REUSE status](https://api.reuse.software/badge/github.com/gardener/gardener-extension-registry-cache)](https://api.reuse.software/info/github.com/gardener/gardener-extension-registry-cache)
[![CI Build status](https://github.com/gardener/gardener-extension-registry-cache/actions/workflows/non-release.yaml/badge.svg)](https://github.com/gardener/gardener-extension-registry-cache/actions/workflows/non-release.yaml)

Gardener extension controller which deploys pull-through caches for container registries.

## Usage

### Registry Cache

- [Configuring the Registry Cache Extension](/docs/extensions/others/gardener-extension-registry-cache/registry-cache/configuration/) - learn what is the use-case for a pull-through cache, how to enable it and configure it
- [How to provide credentials for upstream repository?](/docs/extensions/others/gardener-extension-registry-cache/registry-cache/upstream-credentials/)
- [Registry Cache Observability](/docs/extensions/others/gardener-extension-registry-cache/registry-cache/observability/) - learn what metrics and alerts are exposed and how to view the registry cache logs

### Registry Mirror

- [Configuring the Registry Mirror Extension](/docs/extensions/others/gardener-extension-registry-cache/registry-mirror/configuration/) - learn what is the use-case for a registry mirror, how to enable and configure it
- [How to provide a certificate authority bundle for a private mirror?](/docs/extensions/others/gardener-extension-registry-cache/registry-mirror/ca-bundle-for-private-mirror/)

## Local Setup and Development

- [Deploying Registry Cache Extension Locally](/contribute/extensions/gardener-extension-registry-cache/getting-started-locally/) - learn how to set up a local development environment
- [Deploying Registry Cache Extension in Gardener's Remote Setup](/contribute/extensions/gardener-extension-registry-cache/getting-started-remotely/) - learn how to set up a remote development environment using an existing Kubernetes cluster
- [Developer Docs for Gardener Extension Registry Cache](/contribute/extensions/gardener-extension-registry-cache/extension-registry-cache/) - learn about the inner workings
