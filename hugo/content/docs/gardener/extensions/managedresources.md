---
github_repo: 'https://github.com/gardener/gardener'
github_subdir: docs/extensions
params:
  github_branch: master
path_base_for_github_subdir:
  from: content/docs/gardener/extensions/managedresources.md
  to: managedresources.md
title: Managedresources
prev: false
next: false
managed: true
---

# Deploy Resources to the Shoot Cluster

We have introduced a component called [`gardener-resource-manager`](/docs/gardener/concepts/resource-manager/) that is deployed as part of every shoot control plane in the seed.
One of its tasks is to manage CRDs, so called `ManagedResource`s.
Managed resources contain Kubernetes resources that shall be created, reconciled, updated, and deleted by the gardener-resource-manager.

Extension controllers may create these `ManagedResource`s in the shoot namespace if they need to create any resource in the shoot cluster itself, for example RBAC roles (or anything else).

## Where can I find more examples and more information how to use `ManagedResource`s?

Please take a look at the [respective documentation](/docs/gardener/concepts/resource-manager/).
