---
title: "Enabling Node-Local DNS Without Node Rollouts"
linkTitle: "Enabling Node-Local DNS Without Node Rollouts"
newsSubtitle: August 27, 2025
publishdate: 2025-08-27
authors:
- avatar: https://avatars.githubusercontent.com/ScheererJ
  email: johannes.scheerer@sap.com
  login: ScheererJ
  name: Johannes Scheerer
aliases: ["/blog/2025/08/27/enabling-node-local-dns-without-node-rollouts"]
---

The `node-local-dns` feature in Kubernetes significantly improves DNS reliability and performance by running a dedicated caching agent on each cluster node. However, enabling or disabling this feature in Gardener historically required a full, time-consuming rolling update of all worker nodes. A recent enhancement streamlines this process, improving operational efficiency and reducing disruption.

### The Challenge: Disruptive Configuration Changes

Previously, toggling the `node-local-dns` setting would alter the worker pool hash. This change automatically triggered a rolling update, replacing every node in the cluster to apply the new configuration. For large clusters or for workloads sensitive to disruption, this operation could be cumbersome, requiring significant time and planning.

### The Solution: In-Place Updates

Starting with Kubernetes `v1.34`, Gardener now manages `node-local-dns` configuration changes without requiring a node rollout. When the feature is disabled, Gardener deploys a temporary cleanup job on the affected nodes. This job safely removes the `iptables` rules and other networking configurations associated with `node-local-dns`, allowing pods to revert to the standard cluster DNS setup seamlessly.

This enhancement makes enabling or disabling `node-local-dns` a much faster and less disruptive operation.

It is important to note that a node rollout is still triggered for this configuration change under two specific conditions:
*   If the cluster is running a Kubernetes version older than `v1.34`.
*   If `kube-proxy` is configured to run in `IPVS` mode.

### Architectural Changes

To facilitate this new update mechanism, the deployment architecture for `node-local-dns` has been updated. Instead of a single, global DaemonSet, Gardener now deploys a separate `node-local-dns` DaemonSet for each worker pool. Each of these is named `node-local-dns-<worker-pool-name>`.

This change introduces a **breaking change** for users of the `gardener-extension-networking-cilium` extension. To ensure compatibility, you must upgrade the Cilium extension to a version that supports the new per-pool DaemonSet naming convention. The required versions are:
*   `v1.42.1`
*   `v1.41.3`
*   `v1.40.4`

Additionally, to better handle infrastructures that may throttle a large number of TCP connections, `node-local-dns` now defaults to using UDP for queries to upstream DNS servers, which can help prevent connection timeout issues.

### Further Reading
*   [Watch the presentation on YouTube (starting at 0:46)](https://youtu.be/K15fRoS2WVs?t=46)
*   [Original Pull Request on GitHub](https://github.com/gardener/gardener/pull/12422)
*   [Cilium Extension Compatibility Pull Request](https://github.com/gardener/gardener-extension-networking-cilium/pull/622)