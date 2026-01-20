---
title: "2026-01: Self-Hosted Shoot Exposure"
---

- ✍🏻 **Author(s):** [@timebertt](https://github.com/timebertt) (Tim Ebert)
- 🗓️ **Presentation:** 2026-01-19, 16:00 - 17:00 CET
- 🎥 **Recording:** [click here](https://youtu.be/OodgUQ-cZNA)
- 👨‍⚖️ **Decisions:**
  - Proceed with the proposed approach; the GEP will be merged and implemented as described.
  - Default domains are not relevant, as DNS is required already during bootstrapping; default domains only exist in the garden cluster (accessible only after `gardenadm connect`).
  - DNS strategy does not support health checks, but can support maintenance scenarios (e.g., cordoning nodes removes them from the endpoint set in the `SelfHostedShootExposure` API).
  - Disabling exposure should be possible and fall back to internal DNS (as it is used in the bootstrap phase).
  - `provider-local` implementations with native support for `Service`s of type `LoadBalancer` (e.g., via [`cloud-provider-kind`](https://github.com/kubernetes-sigs/cloud-provider-kind), see [Hackathon results](https://gardener.cloud/community/hackathons/2025-11/#%E2%9A%96%EF%B8%8F%EF%B8%8F-load-balancer-controller-for-provider-local)) is independent, but we try to support it as part of this story.
  - What was previously considered a "future optimization" in the GEP is now part of the immediate optimization scope.
  - Direct `Node` querying ([PR discussion](https://github.com/gardener/gardener/pull/13603#discussion_r2682478134)) in the extension remains unchanged: prefer the existing approach over introducing a generic actuator, leveraging the existing `gardenlet` controller and `port` field in the `SelfHostedShootExposure` API.

## Proposal

[GEP-36: Self-Hosted Shoot Exposure](https://github.com/gardener/gardener/pull/13603)
