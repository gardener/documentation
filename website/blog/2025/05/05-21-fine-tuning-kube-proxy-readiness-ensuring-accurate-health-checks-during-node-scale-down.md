---
title: "Fine-Tuning kube-proxy Readiness: Ensuring Accurate Health Checks During Node Scale-Down"
linkTitle: "Fine-Tuning kube-proxy Readiness: Ensuring Accurate Health Checks During Node Scale-Down"
newsSubtitle: May 21, 2025
publishdate: 2025-05-21
authors:
- avatar: https://avatars.githubusercontent.com/ScheererJ
  email: johannes.scheerer@sap.com
  login: ScheererJ
  name: Johannes Scheerer
aliases: ["/blog/2025/05/21/fine-tuning-kube-proxy-readiness-ensuring-accurate-health-checks-during-node-scale-down"]
---

# Fine-Tuning kube-proxy Readiness: Ensuring Accurate Health Checks During Node Scale-Down

Gardener has recently refined how it determines the readiness of `kube-proxy` components within managed Kubernetes clusters. This adjustment leads to more accurate system health reporting, especially during node scale-down operations orchestrated by `cluster-autoscaler`.

### The Challenge: kube-proxy Readiness During Node Scale-Down

Previously, Gardener utilized `kube-proxy`'s `/healthz` endpoint for its readiness probe. While generally effective, this endpoint's behavior changed in Kubernetes 1.28 (as part of [KEP-3836](https://github.com/alexanderConstantinescu/kubernetes-enhancements/blob/e3d8adae9cf79338add2149db0900e47a4c64338/keps/sig-network/3836-kube-proxy-improved-ingress-connectivity-reliability/README.md?plain=1#L105-L107) and implemented in [kubernetes/kubernetes#116470](https://github.com/kubernetes/kubernetes/pull/116470)). The `/healthz` endpoint now reports `kube-proxy` as unhealthy if its node is marked for deletion by `cluster-autoscaler` (e.g., via a specific taint) or has a deletion timestamp.

This behavior is intended to help external load balancers (particularly those using `externalTrafficPolicy: Cluster` on infrastructures like GCP) avoid sending *new* traffic to nodes that are about to be terminated. However, for Gardener's internal system component health checks, this meant that `kube-proxy` could appear unready for extended periods if node deletion was delayed due to `PodDisruptionBudgets` or long `terminationGracePeriodSeconds`. This could lead to misleading "unhealthy" states for the cluster's system components.

### The Solution: Aligning with Upstream kube-proxy Enhancements

To address this, Gardener now leverages the `/livez` endpoint for `kube-proxy`'s readiness probe in clusters running Kubernetes version 1.28 and newer. The `/livez` endpoint, also introduced as part of the aforementioned `kube-proxy` improvements, checks the actual liveness of the `kube-proxy` process itself, without considering the node's termination status.

For clusters running Kubernetes versions 1.27.x and older (where `/livez` is not available), Gardener will continue to use the `/healthz` endpoint for the readiness probe.

This change, detailed in [gardener/gardener#12015](https://github.com/gardener/gardener/pull/12015), ensures that Gardener's readiness check for `kube-proxy` accurately reflects `kube-proxy`'s operational status rather than the node's lifecycle state. It's important to note that this adjustment does not interfere with the goals of KEP-3836; cloud controller managers can still utilize the `/healthz` endpoint for their load balancer health checks as intended.

### Benefits for Gardener Operators

This enhancement brings a key benefit to Gardener operators:
*   **More Accurate System Health:** The system components health check will no longer report `kube-proxy` as unhealthy simply because its node is being gracefully terminated by `cluster-autoscaler`. This reduces false alarms and provides a clearer view of the cluster's actual health.
*   **Smoother Operations:** Operations teams will experience fewer unnecessary alerts related to `kube-proxy` during routine scale-down events, allowing them to focus on genuine issues.

By adapting its `kube-proxy` readiness checks, Gardener continues to refine its operational robustness, providing a more stable and predictable management experience.

### Further Information
*   **GitHub Pull Request:** [gardener/gardener#12015](https://github.com/gardener/gardener/pull/12015)
*   **Recording of the presentation segment:** [Watch on YouTube (starts at the relevant section)](https://youtu.be/ssvXpPliOY0?t=1151)
*   **Upstream KEP:** [KEP-3836: Kube-proxy improved ingress connectivity reliability](https://github.com/alexanderConstantinescu/kubernetes-enhancements/blob/e3d8adae9cf79338add2149db0900e47a4c64338/keps/sig-network/3836-kube-proxy-improved-ingress-connectivity-reliability/README.md?plain=1#L105-L107)
*   **Upstream Kubernetes PR:** [kubernetes/kubernetes#116470](https://github.com/kubernetes/kubernetes/pull/116470)