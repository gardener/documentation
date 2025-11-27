---
title: "Enhanced Health Checks for Node Rolling Updates"
linkTitle: "Enhanced Health Checks for Node Rolling Updates"
newsSubtitle: June 25, 2025
publishdate: 2025-06-25
authors:
- avatar: https://avatars.githubusercontent.com/RadaBDimitrova
  login: RadaBDimitrova
  name: Rada Dimitrova
aliases: ["/blog/2025/06/25/enhanced-health-checks-for-node-rolling-updates"]
---

# Enhanced Health Checks for Node Rolling Updates

For operators managing Kubernetes clusters, clear and accurate health status is essential for stability and efficient troubleshooting. A recent enhancement to Gardener's `shoot-care` controller improves the precision of health checks during one of the most common operational tasks: rolling updates of worker nodes.

### The Challenge with Rolling Update Status

Previously, when a Shoot cluster's worker nodes underwent a rolling update—for example, during an OS or Kubernetes version upgrade—the health check could report a misleading status. A rolling update involves creating new machines before terminating old ones, causing the total machine count to temporarily exceed the desired replica count. The health check logic would often interpret this state as a scale-down event, reporting the reason `NodesScalingDown`. This was confusing because the cluster was actively rolling out new infrastructure, not reducing its capacity.

### A More Precise Health Check

To resolve this ambiguity, the health check logic has been refined to be more context-aware. The controller now specifically detects when a `MachineDeployment` is in the middle of a rolling update by inspecting its `MachineDeploymentProgressing` condition.

When this condition is active and indicates that a new machine set is being rolled out, the controller assigns a new, more descriptive status: `NodesRollOutScalingUp`. This status is prioritized over other scaling-related conditions, ensuring that operators receive the most accurate information possible. Instead of seeing a confusing `NodesScalingDown` message, they will now see a clear indication that a planned node rollout is in progress.

This improvement provides operators with a much clearer understanding of the cluster's state. The enhanced accuracy reduces confusion during maintenance activities and helps distinguish a normal rolling update from an unintended scaling issue, leading to more confident and effective cluster management.

***

- **To see the code changes, check out the pull request on GitHub:** [#11869](https://github.com/gardener/gardener/pull/11869)
- **To watch the original presentation on this topic, see the recording here:** [Community Meeting Recording](https://youtu.be/kcXSyloteSs?t=68)