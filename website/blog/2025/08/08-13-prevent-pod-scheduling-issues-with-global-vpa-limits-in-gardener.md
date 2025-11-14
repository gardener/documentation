---
title: "Prevent Pod Scheduling Issues with Global VPA Limits in Gardener"
linkTitle: "Prevent Pod Scheduling Issues with Global VPA Limits in Gardener"
newsSubtitle: August 13, 2025
publishdate: 2025-08-13
authors:
- avatar: https://avatars.githubusercontent.com/ialidzhikov
  login: ialidzhikov
  name: Ismail Alidzhikov
aliases: ["/blog/2025/08/13/prevent-pod-scheduling-issues-with-global-vpa-limits-in-gardener"]
---

The Vertical Pod Autoscaler (VPA) is a powerful tool for automatically adjusting pod resource requests, but it has a known limitation: its recommendations can sometimes exceed the allocatable resources of any node in the cluster. This can cause pods to become unschedulable and get stuck in a `Pending` state, leading to workload disruption that requires manual intervention.

To address this, Gardener has introduced a new global configuration option for the VPA.

### A Global Cap for VPA Recommendations

You can now set a global maximum for VPA recommendations by using the new `maxAllowed` field. This field has been added to the VPA configuration section in the `Shoot`, `Seed`, and `Garden` resources. It allows cluster administrators to define a cluster-wide ceiling for CPU and memory recommendations issued by the VPA recommender.

By setting this global limit, you can prevent the VPA from suggesting resource values that are impossible to satisfy within your cluster, thereby avoiding unschedulable pods caused by over-scaling.

### Configuration and Precedence

To use this feature, you can specify the `maxAllowed` values in your resource definitions. For example, in a `Shoot` manifest:

```yaml
spec:
  kubernetes:
    verticalPodAutoscaler:
      enabled: true
      maxAllowed:
        cpu: 8
        memory: 16Gi
```

The recommended practice is to set these values based on the largest node's allocatable capacity in your cluster, while also subtracting the resource requests of system components like daemon sets and including a safety margin.

It's important to note that these global settings act as a default cap. If you define a `maxAllowed` value directly within a specific `VerticalPodAutoscaler` resource for a particular workload, that local setting will take precedence over the global configuration.

This enhancement provides a crucial safeguard, making VPA usage in Gardener more robust and predictable.

### Further Information

*   **Watch the presentation:** [Recording on YouTube](https://youtu.be/v9utQl_WJR0?t=953)
*   **See the implementation:** [Pull Request #12481 on GitHub](https://github.com/gardener/gardener/pull/12481)
*   **Learn more about the upstream feature:** [Specifying global maximum allowed resources](https://github.com/kubernetes/autoscaler/blob/master/vertical-pod-autoscaler/docs/examples.md#specifying-global-maximum-allowed-resources-to-prevent-pods-from-being-unschedulable)