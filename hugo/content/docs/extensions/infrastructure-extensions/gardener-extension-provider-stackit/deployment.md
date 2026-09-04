---
github_repo: 'https://github.com/stackitcloud/gardener-extension-provider-stackit'
github_subdir: docs/operations
params:
  github_branch: main
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/infrastructure-extensions/gardener-extension-provider-stackit/deployment.md
  to: deployment.md
persona: Operators
title: Deployment
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
   https://github.com/stackitcloud/gardener-extension-provider-stackit/blob/main/docs/operations/deployment.md
-->


# Deployment of the STACKIT provider extension

**Disclaimer:** This document is NOT a step by step installation guide for the STACKIT provider extension and only contains some configuration specifics regarding the installation of the different components via the helm charts residing in this repository.

## gardener-extension-admission-stackit

### Authentication against the Garden cluster

By default, the admission component uses in-cluster configuration to talk to the Garden cluster. To use an explicit kubeconfig instead, set `.Values.kubeconfig` in the `admission-stackit-runtime` chart. The value is the kubeconfig content as a string; the chart base64-encodes it into a `Secret` that is mounted into the pod (passed via `--kubeconfig=/etc/gardener-extension-admission-stackit/kubeconfig/kubeconfig`). When `kubeconfig` is set, the pod's service account token is not automounted.

Alternatively, use a projected service account token volume by setting `.Values.projectedKubeconfig`:

```yaml
projectedKubeconfig:
  baseMountPath: /var/run/secrets/gardener.cloud
  genericKubeconfigSecretName: generic-token-kubeconfig
  tokenSecretName: access-stackit-admission
```

This mounts a generic kubeconfig and a token from the two referenced secrets into the pod.

### Virtual Garden

When a *Virtual Garden* is used (i.e., the admission webhook runs in the `runtimeCluster` while the webhook configurations are maintained in a separate `virtualCluster`), set `.Values.gardener.virtualCluster.enabled: true` in the `admission-stackit-runtime` chart (the default).

This switches the admission webhook configuration from service mode to URL mode (`--webhook-config-mode=url`) and sets the `SOURCE_CLUSTER` environment variable. The `admission-stackit-virtual-garden` chart deploys a `ServiceAccount`, `ClusterRole`, and `ClusterRoleBinding` into the virtual cluster.

### Enabling Application Load Balancer support

The Application Load Balancer (ALB) controller is disabled by default in the admission webhook. To allow shoots to enable ALB support via `ControlPlaneConfig.applicationLoadBalancer.enabled: true`, the admission webhook must be configured with `allowApplicationLoadBalancerController: true`.

Set this in the `admission-stackit-runtime` chart values:

```yaml
# charts/gardener-extension-admission-stackit/charts/runtime/values.yaml
allowApplicationLoadBalancerController: true
```

When this flag is `false` (the default), any shoot attempting to enable the ALB controller will be rejected by the admission webhook with a validation error.

When ALB support is enabled, the `EnsureSTACKITALBDeletion` feature gate should also be enabled on the provider extension. It ensures that Application Load Balancers belonging to a shoot are deleted during cluster deletion; without it, remaining ALBs block the cluster deletion until they are removed manually. The feature gate is `Alpha` and defaults to `false`. Enable it via the `featureGates` value in the `gardener-extension-provider-stackit` chart:

```yaml
featureGates:
  EnsureSTACKITALBDeletion: true
```

## gardener-extension-provider-stackit

### Enabling Workload Identity

Workload identity for shoot clusters is an alpha feature that is disabled by default. To enable it, set the `EnableSTACKITWorkloadIdentity` feature gate on the provider extension via the `featureGates` value in the `gardener-extension-provider-stackit` chart:

```yaml
featureGates:
  EnableSTACKITWorkloadIdentity: true
```

Once enabled, a shoot must also use a service account token issuer for the webhook to be deployed. See the [usage documentation](/docs/extensions/infrastructure-extensions/gardener-extension-provider-stackit/usage/#workload-identity) for details.
