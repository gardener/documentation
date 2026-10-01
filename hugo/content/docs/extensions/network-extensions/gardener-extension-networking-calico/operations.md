---
github_repo: 'https://github.com/gardener/gardener-extension-networking-calico'
github_subdir: docs/operations
params:
  github_branch: master
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/network-extensions/gardener-extension-networking-calico/operations.md
  to: operations.md
persona: Operators
title: Operations
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
   https://github.com/gardener/gardener-extension-networking-calico/blob/master/docs/operations/operations.md
-->


# Using the Calico networking extension with Gardener as operator

This document explains configuration options supported by the networking-calico extension.

### Run calico-node in non-privileged and non-root mode

**Feature State**: `Alpha`

##### Motivation

Running containers in privileged mode is not recommended as privileged containers run with all [linux capabilities](https://man7.org/linux/man-pages/man7/capabilities.7.html) enabled and can access the host's resources. Running containers in privileged mode opens number of security threats such as breakout to underlying host OS.

##### Support for non-privileged and non-root mode

The Calico project has a preliminary support for running the calico-node component in non-privileged mode. Similar to [Tigera Calico operator](https://github.com/tigera/operator) the networking-calico extension can also run calico-node in non-privileged and non-root mode. This feature is controller via feature gate named `NonPrivilegedCalicoNode`. The feature gates are configured in the [ControllerConfiguration](https://github.com/gardener/gardener-extension-networking-calico/blob/master/example/00-componentconfig.yaml) of networking-calico. The corresponding ControllerDeployment configuration that enables the `NonPrivilegedCalicoNode` would look like:

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: ControllerDeployment
metadata:
  name: networking-calico
type: helm
providerConfig:
  values:
    chart: <omitted>
    config:
      featureGates:
        NonPrivilegedCalicoNode: false
```

##### Limitations

- The support for the non-privileged mode in the Calico project is not ready for productive usage. The [upstream documentation](https://projectcalico.docs.tigera.io/security/non-privileged) states that in non-privileged mode the support for features added after Calico v3.21 is not guaranteed.
- Calico in non-privileged mode does not support eBPF dataplane. That's why when eBPF dataplane is enabled, calico-node has to run in privileged mode (even when the `NonPrivilegedCalicoNode` feature gate is enabled).
- (At the time of writing this guide) there is the following issue [projectcalico/calico#5348](https://github.com/projectcalico/calico/issues/5348) that is not addressed.
- (At the time of writing this guide) the upstream adoptions seems to be low. The Calico charts and manifest in [projectcalico/calico](https://github.com/projectcalico/calico) run calico-node in privileged mode.

### Seamless overlay network mode switching

**Feature State**: `Alpha`

##### Motivation

When switching Calico from overlay mode (IPIP) to non-overlay mode, there is a critical transition period where pod-to-pod communication can be disrupted if the network routes are not properly configured. In non-overlay mode, Calico relies on the cloud provider's route controller to create routes for pod-to-pod communication. If overlay is disabled before these routes are created, pods may lose connectivity.

##### Support for seamless overlay switching

The `SeamlessOverlaySwitch` feature gate enables validation of node routes before disabling overlay networking. When this feature is enabled and an overlay-to-non-overlay switch is detected, the extension will:

1. Check that all nodes have the `NetworkUnavailable` condition set to `False` with reason `RouteCreated`
1. Only proceed with disabling overlay once routes are confirmed to be in place

This prevents connectivity issues during the transition period. The feature is controlled via feature gate named `SeamlessOverlaySwitch`. The feature gates are configured in the [ControllerConfiguration](https://github.com/gardener/gardener-extension-networking-calico/blob/master/example/00-componentconfig.yaml) of networking-calico. The corresponding ControllerDeployment configuration that enables the `SeamlessOverlaySwitch` would look like:

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: ControllerDeployment
metadata:
  name: networking-calico
type: helm
providerConfig:
  values:
    chart: <omitted>
    config:
      featureGates:
        SeamlessOverlaySwitch: true
```

##### Kubernetes version requirements

The seamless overlay switch relies on the `MutatingAdmissionPolicy` admission API. The availability of this API depends on the shoot's Kubernetes version:

| Kubernetes version | MutatingAdmissionPolicy state | What you need to do |
| --- | --- | --- |
| < 1.34 | Alpha (off by default) | Explicitly enable via feature gate and runtimeConfig (see below) |
| >= 1.34, < 1.36 | Beta, but [off by default per KEP-3136](https://github.com/kubernetes/enhancements/tree/master/keps/sig-architecture/3136-beta-apis-off-by-default) | Explicitly enable via feature gate and runtimeConfig (see below) |
| >= 1.36 | GA (always on) | Nothing — seamless switch activates automatically |

**Enabling MutatingAdmissionPolicy on Kubernetes < 1.36**

For shoots on 1.33 (alpha) or 1.34 / 1.35 (beta, off by default per KEP-3136), the feature must be opted in explicitly. Set the feature gate and the matching `runtimeConfig` entry in the shoot spec:

```yaml
spec:
  kubernetes:
    version: 1.34.3
    kubeAPIServer:
      featureGates:
        MutatingAdmissionPolicy: true
      runtimeConfig:
        admissionregistration.k8s.io/v1alpha1: true
        admissionregistration.k8s.io/v1beta1: true
```

The API is served under `v1alpha1` on 1.33 and promoted to `v1beta1` on 1.34. Enabling both runtimeConfig entries keeps the configuration valid across upgrades between these versions.

**Migrating from Kubernetes 1.35 → 1.36**

On 1.36 the feature graduates to GA and is locked on, so the explicit feature gate and `runtimeConfig` entries are no longer required (and `MutatingAdmissionPolicy: false` is rejected). Remove any explicit overrides before or during the upgrade:

```yaml
spec:
  kubernetes:
    version: 1.36.0
    kubeAPIServer:
      featureGates:
        # Remove or omit any prior MutatingAdmissionPolicy setting
```

##### Behavior

- **`SeamlessOverlaySwitch` enabled**: The extension validates that routes are created before disabling overlay. If routes are not ready, the reconciliation will fail with a retriable error, keeping overlay enabled until routes are confirmed.
- **`SeamlessOverlaySwitch` disabled**: The extension will disable overlay immediately when requested, without checking for route readiness. This may result in temporary connectivity issues during the transition.

##### Limitations

This validation only applies when switching from overlay-enabled to overlay-disabled. It does not affect other configuration changes.

### `gardener-kube-apiserver` `GlobalNetworkSet`

The extension can maintain a Calico `GlobalNetworkSet` named `gardener-kube-apiserver` in every shoot cluster, holding the IP address(es) of the load balancer in front of the shoot's `kube-apiserver`. Shoot owners reference it from their own Calico policies in order to restrict egress traffic to the `kube-apiserver`, see the [usage documentation](/docs/extensions/network-extensions/gardener-extension-networking-calico/usage/#restricting-access-to-the-kube-apiserver).

The feature is disabled by default. The operator can enable it for all shoots handled by an extension deployment in its component configuration:

```yaml
apiVersion: calico.networking.extensions.config.gardener.cloud/v1alpha1
kind: ControllerConfiguration
kubeAPIServerGlobalNetworkSet:
  enabled: true
```

Shoots override this via `.spec.networking.providerConfig.kubeAPIServerGlobalNetworkSet.enabled`. The value from the `providerConfig` applies if it is set, otherwise the value from the component configuration, otherwise the feature is disabled.

##### Address source

The addresses are read from the `DNSRecord`s labelled `gardener.cloud/role=controlplane` and `role in (internal, external)` in the shoot's control plane namespace. `gardenlet` writes the address of the seed's istio ingress gateway load balancer into them, and the record type states what kind of address that is:

- `A`/`AAAA` records: `spec.values` already are the IP addresses and are used as they are.
- `CNAME` records: `spec.values` is the hostname of the load balancer, as used by infrastructures whose load balancers are exposed via hostnames. The extension resolves it during the reconciliation and publishes the resulting IP addresses. Resolution is retried within the reconciliation before it fails.

The `GlobalNetworkSet` is part of the calico chart, hence of the same `ManagedResource` as the CRD it needs, and is recomputed with every shoot reconciliation. How often that happens depends on the `gardenlet` configuration (`controllers.shoot.syncPeriod`, `controllers.shoot.reconcileInMaintenanceOnly`) and on the shoot's maintenance time window - on landscapes which reconcile in the maintenance time window only, once a day. Nothing watches the `DNSRecord`s in between.

For `A`/`AAAA` records that is sufficient, because `DNSRecord.spec.values` is written by the same shoot reconciliation, which updates it before the `Network`. The exception is a reconciliation failing *after* the `DNSRecord` was updated but *before* the `Network` was reconciled: DNS then points to the new address while the set still holds the previous one, and policy covered pods lose access to the kube-apiserver until the next successful reconciliation. The shoot is in `lastOperation.state: Error` meanwhile. The inverse is harmless - if the `DNSRecord` could not be updated either, DNS and the set stay consistent.

For resolved hostnames the addresses can change without any change to the `DNSRecord`, so the set stays outdated until the next shoot reconciliation - which may be a day away, see above.

> ⚠️ Should pods be unable to reach the `kube-apiserver` after a control plane migration, after an `ExposureClass` or high availability change, after the istio ingress gateway load balancer of a seed was recreated, or after the addresses behind its hostname changed, trigger a reconciliation of the affected shoots: `kubectl -n garden-<project> annotate shoot <name> gardener.cloud/operation=reconcile`. If the shoot's `lastOperation.state` is `Failed`, `gardener.cloud/operation=retry` is required instead - `reconcile` is ignored in that state.

##### The reconciliation fails if the addresses cannot be determined

A `GlobalNetworkSet` which does not hold the addresses is worse than none at all: it matches nothing, so every policy referring to it silently blocks traffic to the `kube-apiserver`. The extension therefore fails the reconciliation of the `Network` resource rather than publishing an incomplete set. This happens if no `DNSRecord` publishes an address - either because the addresses are not published yet, which resolves itself during the shoot's creation, or because the `kube-apiserver` has no managed DNS at all, i.e. the internal domain provider is `unmanaged` - and if a hostname cannot be resolved within the reconciliation. All of these errors are retryable, the reconciliation is retried by `gardenlet`.

Hibernated shoots are exempt. `gardenlet` destroys the `kube-apiserver` `DNSRecord`s while a shoot is hibernated, so the addresses cannot be determined, and failing would keep the shoot's reconciliation failing for as long as it stays hibernated. The set is left out of the calico chart meanwhile - a hibernated cluster runs no pods which could need it - and is published again with the first reconciliation after the wake-up, which recreates the `DNSRecord`s.

##### Inspecting the deployed set

The set is a regular resource in the shoot cluster:

```bash
kubectl get globalnetworkset gardener-kube-apiserver -o yaml
```

Its source of truth is the `extension-networking-calico-config` `ManagedResource` in the shoot's control plane namespace, which the gardener-resource-manager applies and reverts manual changes to. If the set is missing or holds unexpected addresses, check the `Network` resource's status and the extension's logs in the control plane namespace - a failed reconciliation is the usual cause.
