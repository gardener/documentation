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
managed: true
---

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
