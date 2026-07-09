---
categories:
  - Operators
description: >-
  Enablement of in-place Pod resource updates within Vertical Pod Autoscaler
  deployments
github_repo: 'https://github.com/gardener/gardener'
github_subdir: docs/operations
params:
  github_branch: master
path_base_for_github_subdir:
  from: content/docs/gardener/enabling-in-place-resource-updates.md
  to: enabling-in-place-resource-updates.md
persona: Operators
title: Enabling In-Place Pod Resource Updates
prev: false
next: false
managed: true
---

# Enabling In-Place Updates of Pod Resources

This is a short guide covering the adoption mechanism of `in-place` Pod resource updates in Gardener [Vertical Pod Autoscaler](https://github.com/kubernetes/autoscaler) deployments.

## Compatibility

Refer to the [in-place resource updates](/docs/gardener/autoscaling/in-place-resource-updates/) guide for details on Kubernetes clusters compatibility, [Vertical Pod Autoscaler](https://github.com/kubernetes/autoscaler) feature gate definition and availability.

## Configuration

Gardener provides a dedicated [resource manager](/docs/gardener/concepts/resource-manager/) [webhook](/docs/gardener/concepts/resource-manager/#webhooks) capable of *mutating* VerticalPodAutoscaler resources, configured with [update mode](https://github.com/kubernetes/autoscaler/blob/master/vertical-pod-autoscaler/docs/quickstart.md#contents) `Auto` or `Recreate`, with the `in-place` updates enabling `InPlaceOrRecreate`.
The *mutating* webhook is enabled unconditionally for [resource manager](/docs/gardener/concepts/resource-manager/) deployments managed by both [gardenlet](/docs/gardener/concepts/gardenlet/) and [gardener operator](/docs/gardener/concepts/operator/).

To keep a VerticalPodAutoscaler resource out of the *mutating* webhook scope, add the following `skip` label, indicating that the resource should preserve its current configuration and **not** get  updated:

```
vpa-in-place-updates.resources.gardener.cloud/skip
```

### gardenlet

The *mutating* webhook is enabled unconditionally for [resource manager](/docs/gardener/concepts/resource-manager/) deployments managed by [gardenlet](/docs/gardener/concepts/gardenlet/).

#### Shoot

> When deployed in a `Shoot` cluster, the *mutating* webhook targets `vertical pod autoscaler` resources **inside** the `kube-system` and `kubernetes-dashboard` namespaces.

With the adoption of `Vertical Pod Autoscaler` [1.6.0](https://github.com/kubernetes/autoscaler/releases/tag/vertical-pod-autoscaler-1.6.0), the `InPlaceOrRecreate` feature gate got promoted to *GA* and **cannot** be disabled. Follow the [in-place resource updates](/docs/gardener/autoscaling/in-place-resource-updates/#shoot) guide for more details about the Vertical Pod Autoscaler components setup.

#### Seed

> When deployed in a `Seed` cluster, the *mutating* webhook targets `vertical pod autoscaler` resources **outside** the `kube-system` and `kubernetes-dashboard` namespaces.

With the adoption of `Vertical Pod Autoscaler` [1.6.0](https://github.com/kubernetes/autoscaler/releases/tag/vertical-pod-autoscaler-1.6.0), the `InPlaceOrRecreate` feature gate got promoted to *GA* and **cannot** be disabled. Follow the [in-place resource updates](/docs/gardener/autoscaling/in-place-resource-updates/#seed) guide for more details about the Vertical Pod Autoscaler components setup.

> [!NOTE]
> If you are using a VPA not managed by gardenlet (i.e., Seeds's `.spec.settings.verticalPodAutoscaler.enabled` is set to `false`), ensure that your VPA installation supports in-place resource updates.

### Gardener Operator

The *mutating* webhook is enabled unconditionally for [resource manager](/docs/gardener/concepts/resource-manager/) deployments managed by [gardener operator](/docs/gardener/concepts/operator/).

> [!NOTE]
> If you are using a VPA not managed by gardener-operator (i.e., Garden's `.spec.runtimeCluster.settings.verticalPodAutoscaler.enabled` is set to `false`), ensure that your VPA installation supports in-place resource updates.

## References

- [Gardener Feature Gates](/docs/gardener/deployment/feature_gates/)
- [Vertical Pod Autoscaling In-Place Updates](https://github.com/kubernetes/autoscaler/blob/master/vertical-pod-autoscaler/docs/features.md#in-place-updates-inplaceorrecreate)
- [Vertical Pod Autoscaling In-Place Updates Guide](/docs/gardener/autoscaling/in-place-resource-updates/)
