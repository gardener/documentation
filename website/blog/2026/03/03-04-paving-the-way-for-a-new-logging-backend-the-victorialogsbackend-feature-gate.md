---
title: "Paving the Way for a New Logging Backend: The `VictoriaLogsBackend` Feature Gate"
linkTitle: "Paving the Way for a New Logging Backend: The `VictoriaLogsBackend` Feature Gate"
newsSubtitle: March 04, 2026
publishdate: 2026-03-04
authors:
- avatar: https://avatars.githubusercontent.com/rrhubenov
  login: rrhubenov
  name: rhubenov
aliases: ["/blog/2026/03/04/paving-the-way-for-a-new-logging-backend-the-victorialogsbackend-feature-gate"]
---

As part of Gardener's ongoing effort to evolve its observability stack, outlined in [GEP-35](https://github.com/gardener/gardener/blob/master/docs/proposals/35-observability2.0-victoria-logs.md), the first step has been taken to integrate VictoriaLogs as the future log aggregation system, eventually replacing Vali. A new feature gate, `VictoriaLogsBackend`, has been introduced to facilitate a smooth, phased migration.

### A New Feature Gate for a Gradual Transition

The `VictoriaLogsBackend` feature gate, available for both `gardenlet` and `gardener-operator`, allows you to start experimenting with the new logging backend. When enabled, Gardener deploys a `VictoriaLogs` instance in every `Garden`, `Seed`, and `Shoot` cluster.

Crucially, this initial phase is designed for safety and stability. The existing Vali instance remains active and continues to receive logs. This parallel deployment ensures that the logging pipeline is not interrupted during the transition period.

### How It Works: Dual-Writing Logs

With the `VictoriaLogsBackend` feature gate enabled, the OpenTelemetry Collector is reconfigured to send logs to both the existing Vali instance and the new VictoriaLogs instance. This dual-writing mechanism is key to the migration strategy, guaranteeing that no logs are lost and allowing for direct comparison and verification between the two systems.

The architectural change is straightforward: logs collected by Fluent Bit and processed by the OpenTelemetry Collector are now routed to two destinations instead of one.

### Exploring the New VictoriaLogs UI

While Gardener's current dashboarding tool, Plutono, does not have a native integration for VictoriaLogs, you can still explore your logs through the powerful, feature-rich UI provided by VictoriaMetrics itself, known as the VMUI.

To access it, you can port-forward the `logging-vl` service in the respective cluster namespace. The UI offers valuable statistics and a different way to query and visualize your log data. For those running a local Gardener setup, this feature gate is enabled by default, making it easy to start experimenting right away.

### What's Next?

This update represents the first major step in the migration to VictoriaLogs. Future releases will build upon this foundation, culminating in a final step that will introduce another feature gate to cleanly remove Vali, completing the transition. Stay tuned for more updates as we continue to enhance Gardener's observability capabilities.

***

### Further Reading

*   [Gardener Review Meeting Recording (2026-03-04)](https://youtu.be/axIwAmhJ_Hw?t=566)
*   [[GEP-35] Deploy Victoria-Logs (Garden, Seed, Shoot Clusters) Pull Request](https://github.com/gardener/gardener/pull/13988)
*   [GEP-35: Observability 2.0 - VictoriaLogs](https://github.com/gardener/gardener/blob/master/docs/proposals/35-observability2.0-victoria-logs.md)
*   [Umbrella Issue: GEP-35 Implementation](https://github.com/gardener/gardener/issues/13709)