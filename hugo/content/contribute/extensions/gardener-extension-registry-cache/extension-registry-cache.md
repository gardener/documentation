---
description: Learn about the inner workings
github_repo: 'https://github.com/gardener/gardener-extension-registry-cache'
github_subdir: docs/development
params:
  github_branch: main
path_base_for_github_subdir:
  from: >-
    content/contribute/extensions/gardener-extension-registry-cache/extension-registry-cache.md
  to: extension-registry-cache.md
persona: Developers
title: Developer Docs for Gardener Extension Registry Cache
prev: false
next: false
managed: true
---

# Developer Docs for Gardener Extension Registry Cache

This document outlines how Shoot reconciliation and deletion works for a Shoot with the registry-cache extension enabled.

## Shoot Reconciliation

This section outlines how the reconciliation works for a Shoot with the registry-cache extension enabled.

### Extension Enablement / Reconciliation

This section outlines how the extension enablement/reconciliation works, e.g., the extension has been added to the Shoot spec.

1. As part of the Shoot reconciliation flow, the gardenlet deploys the [Extension](/docs/gardener/extensions/resources/extension/) resource.
1. The registry-cache extension reconciles the Extension resource. [pkg/controller/cache/actuator.go](https://github.com/gardener/gardener-extension-registry-cache/blob/main/pkg/controller/cache/actuator.go) contains the implementation of the [extension.Actuator](https://github.com/gardener/gardener/blob/v1.88.0/extensions/pkg/controller/extension/actuator.go) interface. The reconciliation of an Extension of type `registry-cache` consists of the following steps:
   1. The registry-cache extension deploys resources to the Shoot cluster via ManagedResource. For every configured upstream, it creates a StatefulSet (with PVC), Service, and other resources.
   1. It lists all Services from the `kube-system` namespace that have the `upstream-host` label. It will return an error (and retry in exponential backoff) until the Services count matches the configured registries count.
   1. When there is a Service created for each configured upstream registry, the registry-cache extension populates the Extension resource status. In the Extension status, for each upstream, it maintains an endpoint (in the format `http://<cluster-ip>:5000`) which can be used to access the registry cache from within the Shoot cluster. `<cluster-ip>` is the cluster IP of the registry cache Service. The cluster IP of a Service is assigned by the Kubernetes API server on Service creation.
1. As part of the Shoot reconciliation flow, the gardenlet deploys the [OperatingSystemConfig](/docs/gardener/extensions/resources/operatingsystemconfig/) resource.
1. The registry-cache extension serves a webhook that mutates the OperatingSystemConfig resource for Shoots having the registry-cache extension enabled (the corresponding namespace gets labeled by the gardenlet with `extensions.gardener.cloud/registry-cache=true`). [pkg/webhook/cache/ensurer.go](https://github.com/gardener/gardener-extension-registry-cache/blob/main/pkg/webhook/cache/ensurer.go) contains an implementation of the [genericmutator.Ensurer](https://github.com/gardener/gardener/blob/v1.88.0/extensions/pkg/webhook/controlplane/genericmutator/mutator.go) interface.
   1. The webhook appends or updates `RegistryConfig` entries in the [OperatingSystemConfig CRI](/docs/gardener/extensions/resources/operatingsystemconfig/#cri-support) configuration that corresponds to configured registry caches in the Shoot. The `RegistryConfig` readiness probe is enabled so that [gardener-node-agent](/docs/gardener/concepts/node-agent/) creates a `hosts.toml` containerd registry configuration file when all `RegistryConfig` hosts are reachable.

### Extension Disablement

This section outlines how the extension disablement works, i.e., the extension has to be removed from the Shoot spec.

1. As part of the Shoot reconciliation flow, the gardenlet destroys the [Extension](/docs/gardener/extensions/resources/extension/) resource because it is no longer needed.
   1. The extension deletes the ManagedResource containing the registry cache resources.
   1. The OperatingSystemConfig resource will not be mutated and no `RegistryConfig` entries will be added or updated. The [gardener-node-agent](/docs/gardener/concepts/node-agent/) detects that `RegistryConfig` entries have been removed or changed and deletes or updates corresponding `hosts.toml` configuration files under `/etc/containerd/certs.d` folder.

## Shoot Deletion

This section outlines how the deletion works for a Shoot with the registry-cache extension enabled.

1. As part of the Shoot deletion flow, the gardenlet destroys the [Extension](/docs/gardener/extensions/resources/extension/) resource.
   1. The extension deletes the ManagedResource containing the registry cache resources.
