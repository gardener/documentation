---
title: Adoption of In-Place Pod Resource Updates in Gardener
linkTitle: Adoption of In-Place Pod Resource Updates in Gardener
newsSubtitle: May 19, 2026
publishdate: 2026-05-19
authors:
- avatar: https://avatars.githubusercontent.com/vitanovs
  login: vitanovs
  name: Stoyan Vitanov
aliases: [/blog/2026/05/11/in-place-pod-resource-updates]
tags:
- autoscaling
- vpa
---

As Kubernetes workloads evolve, the need for dynamic resource adjustments becomes increasingly critical. Traditional `Pod` resource updates require `Pod` recreation, leading to an increased operational cost and potential service disruptions.
To address this shortcoming, Kubernetes introduced a new way of updating `Pod` resources _in-place_, without the need to _evict_ workloads in order to apply the configuration change. With the [v1.27](https://kubernetes.io/releases/1.27/) release, a new `resize` subresource got introduced to the `Pod`'s API, acting as an interface to the underlaying CRI implementations that manage the _cgroups_ settings.


## What are the key benefits of _in-place_ Pod resource updates ?

Having the ability to bypass the rollout process when updating `Pod` resources, drastically improves the scaling efficiency. The overhead cost of performing `Pod` scheduling and subsequent application initialization are among the primary benefits of the new _update_ mechanism. The following points summarize the key factors when considering using _in-place_ updates:

- __Zero-downtime scaling__: Resources get adjusted without `Pod` recreation or service interruption
- __Reduced scheduling overhead__: No need to re-schedule `Pod`s across the cluster
- __Reduced initialization overhead__: Applications __do not__ go through full initialization all over again
- __Preserved `Pod` identity__: `Pod` names, IPs, and volumes remain unchanged
- __Improved resource efficiency__: More granular and responsive resource optimization

To read more about the feature, refer to the official [documentation](https://kubernetes.io/blog/2025/12/19/kubernetes-v1-35-in-place-pod-resize-ga/).

## How Gardener utilizes the new _update_ mechanism ?

Gardener relies heavily on the [Vertical Pod Autoscaler](https://github.com/kubernetes/autoscaler) to advance the resource usage optimization and keep the _out-of-the-box_ components running as efficiently as possible. With [v1.4.0](https://github.com/kubernetes/autoscaler/releases/tag/vertical-pod-autoscaler-1.4.0) release, Vertical Pod Autoscaler introduced the ability to configure a new `.spec.updatePolicy.updateMode` for the `vpa` resources:

```yaml
apiVersion: autoscaling.k8s.io/v1
kind: VerticalPodAutoscaler
metadata:
  name: demo-vpa
spec:
  targetRef:
    apiVersion: "apps/v1"
    kind:       Deployment
    name:       demo
  updatePolicy:
    updateMode: "InPlaceOrRecreate"
```

effectively performing _in-place_ resource updates, and _falling back_ to _eviction_ in case of failure. Adopting the release created the opportunity to leverage the new _update_ mechanism and with Gardener [v1.137](https://github.com/gardener/gardener/releases/tag/v1.137.0) a new automatic migration mechanism was introduced.

Historically, `vpa` resources, created for the different Gardener components, were configured to use _update mode_ `Auto` as it was the default option that mimics the behavior of `Recreate` - _evicting_ `Pod`s to apply newly [calculated resource recommendations](https://github.com/kubernetes/autoscaler/blob/master/vertical-pod-autoscaler/docs/components.md#implementation-of-the-recommender). The following Vertical Pod Autoscaler [v1.5.0](https://github.com/kubernetes/autoscaler/releases/tag/vertical-pod-autoscaler-1.5.0) release, had the `Auto` _update mode_ deprecated, which left only two viable options to configure for continuous scaling - `Recreate` and `InPlaceOrRecreate`. The following diagram illustrates the _flow_ of `Pod` resource updates that is used in Gardener through the Vertical Pod Autoscaler setup:

```mermaid
graph LR
    A[VPA Recommender] -->|New recommendation| B[VPA Updater]
    B -->|PATCH /resize subresource| C[API Server]
    C -->|Update request| D[Kubelet]
    D -->|UpdateContainerResources| E[CRI Runtime]
    E -->|Update cgroups| F[Running Container]
    F -->|Status update| D
    D -->|Pod status| C
```

The _key_ functionality that stands behind the improved resource management are the Linux [cgroups](https://www.man7.org/linux/man-pages/man7/cgroups.7.html), responsible for grouping processes and limiting the host resources they are allowed to utilize.

### How are `VerticalPodAutoscaler` resources configured ?

As with any configuration change that affects the entire cluster setup, migrating the `vpa` resources _update mode_, presented a unique challenge that we tackled using the [Gardener Resource Manager](https://github.com/gardener/gardener/blob/master/docs/concepts/resource-manager.md) and it's extensible nature.
Using a dedicated `MutatingWebhook` to filter relevant `vpa` resources and apply the _update mode_ change, we managed to make the migration automatic and ease the rollout. Alongside the resource manager _webhook_,  deployed via `VPAInPlaceUpdates` _feature gate_, available for `gardenlet` and [Gardener Operator](https://github.com/gardener/gardener/blob/master/docs/concepts/operator.md), an additional _rollback_ mechanism was also introduced. Considering the variety of workloads that could be affected, additional _migration_ scripts on `gardenlet` and Gardener `operator` initialization are taking care of reverting the _update mode_ change, based on the `VPAInPlaceUpdates` feature gate enablement. With all of these changes available since Gardener [v1.137](https://github.com/gardener/gardener/releases/tag/v1.137.0), adopting the _in-place_ update mode is fully operational and ready to be configured.
To read more about the [usage](https://github.com/gardener/gardener/blob/master/docs/usage/autoscaling/in-place-resource-updates.md) and [enabling](https://github.com/gardener/gardener/blob/master/docs/operations/enabling-in-place-resource-updates.md), refer to the official documentation.

## Monitoring

Performing configuration migrations could become an exhaustive task without a handy dashboard to look at and evaluate the state of the process. For this reason, as part of the effort to support _in-place_ Pod resource updates, we introduced a brand new _dashboard_ for the `vpa-updater` component.

![VPA Updater Dashboard Overview](./images/in-place-pod-resource-updates/vpa-updater-dashboard-overview.png)

With sections covering overviews of `VerticalPodAutoscaler` resources within a cluster, segregated by _update mode_, to panels displaying success rates per individual resource, the new dashboard can be used for both monitoring and providing status reports related to applied resource recommendations.

## References

The following list of references can be used for further reading and technical deep dive into the topic.

### Kubernetes Documentation

- [In-Place Pod Resize (GA in v1.35)](https://kubernetes.io/blog/2025/12/19/kubernetes-v1-35-in-place-pod-resize-ga/)
- [Resize Container Resources](https://kubernetes.io/docs/tasks/configure-pod-container/resize-container-resources/)
- [Pod v1 API Reference - resize subresource](https://kubernetes.io/docs/reference/kubernetes-api/workload-resources/pod-v1/#operations-pod-v1-resize)

### Vertical Pod Autoscaler

- [VPA v1.4.0 Release Notes](https://github.com/kubernetes/autoscaler/releases/tag/vertical-pod-autoscaler-1.4.0) (introduced InPlaceOrRecreate)
- [VPA v1.5.0 Release Notes](https://github.com/kubernetes/autoscaler/releases/tag/vertical-pod-autoscaler-1.5.0) (deprecated Auto mode)
- [VPA In-Place Updates Documentation](https://github.com/kubernetes/autoscaler/blob/master/vertical-pod-autoscaler/docs/features.md#in-place-updates-inplaceorrecreate)

### Gardener Documentation

- [Usage: In-Place Resource Updates](https://github.com/gardener/gardener/blob/master/docs/usage/autoscaling/in-place-resource-updates.md)
- [Operations: Enabling In-Place Resource Updates](https://github.com/gardener/gardener/blob/master/docs/operations/enabling-in-place-resource-updates.md)
- [Gardener Resource Manager](https://github.com/gardener/gardener/blob/master/docs/concepts/resource-manager.md)
- [Gardener v1.137.0 Release Notes](https://github.com/gardener/gardener/releases/tag/v1.137.0)

### Technical Deep Dives

- [Linux cgroups v2](https://www.kernel.org/doc/html/latest/admin-guide/cgroup-v2.html)
- [CRI (Container Runtime Interface) Specification](https://github.com/kubernetes/cri-api)
