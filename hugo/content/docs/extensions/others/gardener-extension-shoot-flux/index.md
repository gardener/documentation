---
description: Gardener extension for deploying Flux GitOps toolkit for shoot clusters.
github_repo: 'https://github.com/stackitcloud/gardener-extension-shoot-flux'
github_subdir: .
params:
  github_branch: main
path_base_for_github_subdir:
  from: content/docs/extensions/others/gardener-extension-shoot-flux/_index.md
  to: README.md
title: Flux
weight: 90
prev: false
next: false
---
<!-- BANNER:MANAGED -->
<!--
   █▀▀ ▀█▀ █▀█ █▀█
   ▀▀█  █  █ █ █▀▀
   ▀▀▀  ▀  ▀▀▀ ▀

   ┌────────────────────────────────────────────────┐
   │  MANAGED FILE — aggregated from upstream       │
   │                                                │
   │  Editing here is pointless: The nightly        │
   │  aggregation run overwrites this file.         │
   │                                                │
   │  Open a PR against the source instead: ─────┐  │
   │                          ┌──┐    ┌──────────┘  │
   │                          └──│────┘             │
   │           ┌─────────────────┘                  │
   └───────────│────────────────────────────────────┘
               ▼               
   https://github.com/stackitcloud/gardener-extension-shoot-flux/blob/main/./README.md
-->


# Gardener Extension for Flux

[![reuse compliant](https://reuse.software/badge/reuse-compliant.svg)](https://reuse.software/)

[Project Gardener](https://github.com/gardener/gardener) implements the automated management and operation of [Kubernetes](https://kubernetes.io/) clusters as a service.
Its main principle is to leverage Kubernetes concepts for all of its tasks.

This controller implements Gardener's extension contract for the `shoot-flux` extension.
The latest release's `ControllerRegistration` resource that can be used to register this controller to Gardener can be found [here](https://github.com/stackitcloud/gardener-extension-shoot-flux/releases/latest/download/controller-registration.yaml).

Please find more information regarding the extensibility concepts and a detailed proposal [here](https://github.com/gardener/gardener/blob/master/docs/proposals/01-extensibility.md).

<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->
**Table of Contents**

- [Gardener Extension for Flux](#gardener-extension-for-flux)
- [What does this package provide?](#what-does-this-package-provide)
  - [Example use case](#example-use-case)
  - [shoot-info ConfigMap](#shoot-info-configmap)
- [How to...](#how-to)
  - [Use it as a gardener operator](#use-it-as-a-gardener-operator)
  - [Develop this extension locally](#develop-this-extension-locally)
    - [Prerequisites](#prerequisites)
    - [Running and Debugging the controller](#running-and-debugging-the-controller)
- [General concepts and how it works internally](#general-concepts-and-how-it-works-internally)
- [Last remarks](#last-remarks)

<!-- markdown-toc end -->

# What does this package provide?
The general idea of this controller is to install the [fluxcd](https://fluxcd.io/) controllers together with a flux source resource ([GitRepository](https://fluxcd.io/docs/components/source/gitrepositories/) or [OCIRepository](https://fluxcd.io/flux/components/source/ocirepositories/)) and a [flux kustomization resource](https://fluxcd.io/docs/components/kustomize/kustomization/) into newly created shoot clusters.
In consequence, your fresh shoot cluster will be reconciled to the state defined in the source repository (Git or OCI) by the fluxcd controllers.
Thus, this extension provides a general approach to install addons to shoot clusters.

**Source Types**:
- **Git Repository**: Use traditional Git repositories (GitHub, GitLab, etc.) to store your Kubernetes manifests
- **OCI Repository**: Use OCI-compliant container registries (ghcr.io, Docker Hub, etc.) to store pre-built manifests as OCI artifacts. This is particularly useful when using code generators like CUE, Jsonnet, or KCL in CI pipelines.

## Example use case
Let's say you have a CI-workflow which needs a kubernetes cluster with some basic components, such as [cert-manager](https://cert-manager.io/) or [minio](https://min.io/).
Thus, your CI-workflow creates a `Shoot` on which you perform all your actions.
However, the process of creating the `Shoot` and installing the needed components takes for several minutes holding you back from effectively running your CI-pipeline.
In this case, you can make use of this extension and pre-spawn `Shoot`s, which are automatically equipped with fluxcd and reconciled to the state defined in a Git repository.
Of course, there is a trade-off, as your pre-spawned shoots will consume some resources (either in terms of money, if running in a public cloud, or in terms of physical resources).
However, in certain scenarios, this approach will dramatically improve the effectiveness of you CI-workflow.

## `shoot-info` `ConfigMap`

If the extension is enabled for a shoot cluster a `ConfigMap` named `shoot-info` with information about the shoot
is created in the flux namespace. The `ConfigMap` can be used in [`substituteFrom`](https://fluxcd.io/flux/components/kustomize/kustomizations/#post-build-variable-substitution)
in `Kustomizations`. The following information is provided:

| key | purpose | example value |
| --- | --- | --- |
| SHOOT_INFO_CLUSTER_IDENTITY | the unique cluster identity which is unique even if the cluster gets re-created. | shoot--someproject--testcluster-5fdf7ca4-5cse-4ab0-a5c4-54faf32f8765-garden |
| SHOOT_INFO_GARDEN_CLUSTER_IDENTITY | the cluster identity of the shoot. This value is also the last segment of the cluster identity. | garden |
| SHOOT_INFO_NAME | name of the shoot cluster. Be aware that there can be multiple clusters with the same name in different projects. | testcluster |
| SHOOT_INFO_TECHNICAL_ID | contains name of the shoot cluster and the gardener project it's created in. This is unique per gardener installation. | shoot--someproject--testcluster |
|  |  |  |

Like the other resources (flux installation) provisioned by this configMap is not deleted when the extension is removed
from the shoot cluster. This behaviour is intentional to keep the flux installation intact and allow the user to remove
it in a controlled manner. Please be aware that the `configMap` is no longer updated when the extension is no longer active.

## Source Configuration Format

The extension supports both **Git** and **OCI** repositories as Flux sources. The configuration uses a unified format where the source type is determined by the `apiVersion` and `kind` fields within the `template`.

### Configuration Format

For **Git repositories**:
```yaml
source:
  template:
    apiVersion: source.toolkit.fluxcd.io/v1
    kind: GitRepository
    spec:
      url: https://github.com/example/repo
      ref:
        branch: main
  secretResourceName: my-git-credentials
```

For **OCI repositories**:
```yaml
source:
  template:
    apiVersion: source.toolkit.fluxcd.io/v1beta2
    kind: OCIRepository
    spec:
      url: oci://ghcr.io/example/manifests
      ref:
        tag: latest
  secretResourceName: my-oci-credentials  # optional
```

**Key Points:**
- The `template` field directly contains the full source resource manifest with `apiVersion` and `kind`
- The source type (Git or OCI) is automatically determined from the `kind` field
- `secretResourceName` is optional and references a secret in the Seed cluster that will be synced to the Shoot

# How to...

## Use it as a gardener operator
Of course, you need to apply the `controller-registration` resources to the garden cluster first.
You can find the corresponding yaml-files in our [releases](https://github.com/stackitcloud/gardener-extension-shoot-flux/releases).
Moreover, you will need some configuration pointing to the git repository you want to use as a basis for flux.
This configuration is provided on a per-project basis via a `ConfigMap`:
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: flux-config
  namespace: YOUR-PROJECT-NAMESPACE
data:
  fluxVersion: v0.29.5 # optional, if not defined the latest release will be used
  repositoryUrl: ssh://git@github.com/THE-OWNER/THE-REPO
  repositoryBranch: main
  repositoryType: private
```
At the time writing this, the extension-controller will generate a new SSH-keypair for you, if the `repositoryType` is set to private. This keypair will be stored in the garden cluster as a `Secret` and you will need to make the public key available to you git SSH-server, so that flux can read from your repository. Note: On e.g. github.com, this can be achieved by adding a deploy key to your Git repository.

Next you can deploy a `Shoot` with the `shoot-flux` extension enabled:
```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: Shoot
metadata:
  name: bar
  namespace: garden-foo
spec:
  extensions:
  - type: shoot-flux
...
```
Then, your shoot cluster should be reconciled to the declarative definition in your Git repository.

## Develop this extension locally
### Prerequisites
* A local installation of Go
* A Gardener (could also be the [local setup](https://gardener.cloud/docs/gardener/development/getting_started_locally/))

### Running and Debugging the controller
* Place the kubeconfig of the `Seed` cluster in `PATH-TO-REPO-ROOT/dev/kubeconfig`
* Set `ignoreResources=true` and `replicaCount=0` in `PATH-TO-REPO-ROOT/charts/gardener-extension-shoot-flux/values.yaml`
* Generate the `controller-registration.yaml` by e.g.
```shell
./vendor/github.com/gardener/gardener/hack/generate-controller-registration.sh shoot-flux charts/gardener-extension-shoot-flux v0.0.1 example/controller-registration.yaml Extension:shoot-flux
```
* Apply it to the garden cluster:
```shell
kubectl apply -f PATH-TO-REPO-ROOT/example/controller-registration.yaml
```
* Run and debug the controller with [dlv](https://github.com/go-delve/delve) by:
```shell
dlv debug ./cmd/gardener-extension-shoot-flux -- --kubeconfig=dev/kubeconfig.yaml  --ignore-operation-annotation=true --leader-election=false --gardener-version="v1.44.4"
```
* You can set breakpoints now, and instruct dlv to run the controller by entering "c" into the dlv commandline.
* Lastly, deploy a `ConfigMap` pointing to a git repository and a `Shoot` with the `shoot-flux` extension enabled (as explained [above](#use-it-as-a-gardener-operator)).

# General concepts and how it works internally
Generally, this extension was motivated by the idea of enabling Gardener operators to pre-configure `Shoot` clusters with addons.
Obviously, a declarative approach to the configuration makes sense in this scenario.
Consequently fluxcd was chosen as a more general configuration tool for Kubernetes clusters.
From this basis, a Gardener operator can track the configuration of `Shoot` clusters in Git repositories and configure all `Shoot`s in a project to use a configuration via a `ConfigMap` in the project namespace.
This overall workflow is depicted in the block diagram below.

```
                 ┌─────────────────────────────────────────────────────────┐
                 │ Gardener operator                                       │
                 ├─────────────────────────────────────────────────────────┤
                 │ - A human being                                         │
                 │                                                         ├────────────┐
                 │                                                         │            │
                 │                                                         │            │
                 └────────┬────────────────────────────────────────────────┘            │
                          │                           ▲                                 │configures
                          │deploys                    │                                 │SSH-key
                          │Configmap                  │read SSH-key                     │
                          │                           │                                 │
                          ▼                           │                                 │
                 ┌────────────────────────────────────┴───────────────────┐             │
                 │ Garden cluster                                         │             │
                 ├────────────────────────┬─────────────────────────┬─────┤             │
                 │ Projetct 1             │ Project 2               │ ... │             ▼
                 ├────────────────────────┼─────────────────────────┼─────┤  ┌─────────────────────┐
                 │- Configmap containing  │- Configmap containing   │     │  │ Git repository      │
                 │  flux configuration    │  flux configuration     │     │  ├─────────────────────┤
                 │                        │                         │     │  │ - Configuration for │
            ┌───►│- ControllerRegistration│- ControllerRegistration │ ... │  │   shoot clusters    │
            │    │                        │                         │     │  └─────────────────────┘
            │    │- Shoot with extension  │- Shoot with extension   │     │             ▲
            │    │  enabled               │  enabled                │     │             │
            │    │                        │                         │     │             │
read config │    │                        │                         │     │             │
and generate│    └────────────────────────┴─────────────────────────┴─────┘             │reconcile
SSH-keys    │                                                                           │
            │    ┌────────────────────────┐     ┌────────────────────────┐              │
            │    │ Seed cluster           │     │ Shoot cluster          │              │
            │    ├────────────────────────┤     ├────────────────────────┤              │
            │    │- Controller watching   │     │                        │              │
            └────┼─ extension resource    │     │- Flux controllers  ────┼──────────────┘
                 │     │                  │     │                        │
                 │     │deploys           │     │- GitRepository resource│
                 │     │                  │     │                        │
                 │     ▼                  │     │- A main kustomization  │
                 │- Managed resources     │     │                        │
                 │  for flux controllers  │     │                        │
                 │  and flux config       │     │                        │
                 │                        │     │                        │
                 └────────────────────────┘     └────────────────────────┘
```
Wait! How does the controller in the `Seed` cluster communicate to the garden cluster?
Actually, we are just using the `Secret` containing the `gardenlet-kubeconfig` which should be available, when the gardenlet is run inside the `Seed` cluster.
Of course, this is not a rock solid solution, but it was an easy way to achieve the overall goal by simple means.

# Last remarks
This extensions is still in a preliminary state and contains some hacks.
However, the work and testing is still ongoing and the extension will be continuously improved.
In general, you could consider the current state of the extension as kind of a minimal working example for Gardener extensions, as it is very low complex to this point.
