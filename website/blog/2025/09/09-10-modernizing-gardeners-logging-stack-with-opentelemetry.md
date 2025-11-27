---
title: "Modernizing Gardener's Logging Stack with OpenTelemetry"
linkTitle: "Modernizing Gardener's Logging Stack with OpenTelemetry"
newsSubtitle: September 10, 2025
publishdate: 2025-09-10
authors:
- avatar: https://avatars.githubusercontent.com/rrhubenov
  login: rrhubenov
  name: rhubenov
aliases: ["/blog/2025/09/10/modernizing-gardeners-logging-stack-with-opentelemetry"]
---

# Modernizing Gardener's Logging Stack with OpenTelemetry

Gardener is introducing a significant enhancement to its logging architecture for shoot clusters. By enabling the new `OpenTelemetryCollector` feature gate, shoots will be instrumented with the power and flexibility of the [OpenTelemetry Collector](https://opentelemetry.io/docs/collector/) to process and route shoot logs. This marks a key step in the evolution of Gardener's observability stack, as outlined in [GEP-34](https://github.com/gardener/gardener/blob/master/docs/proposals/34-observability2.0-opentelemtry-operator-and-collectors.md).

### A More Flexible Logging Pipeline

Previously, Gardener's logging pipeline was tightly coupled: `valitail` agents on shoot nodes would send logs directly to a `Vali` instance in the shoot's control plane. While effective, this setup offered limited flexibility for integrating with other observability backends.

With the `OpenTelemetryCollector` feature gate enabled, the architecture is updated to be more modular. Logs are now routed through an OpenTelemetry Collector, which is deployed in the shoot's control plane. This collector acts as an intermediary, receiving logs and then forwarding them to the `Vali` persistence layer. This change effectively decouples the log shipping and processing from the final storage backend.

### Key Advantages of the New Approach

The introduction of the OpenTelemetry Collector brings several key benefits:

*   **Enhanced Flexibility:** The collector can be configured to export logs to various backends, not just `Vali`. This makes it significantly easier to replace or supplement `Vali` with other solutions like Grafana Loki or third-party observability platforms in the future.
*   **Future-Proof Extensibility:** This architecture lays the groundwork for allowing shoot owners to forward logs to their own custom-defined endpoints through extensions, providing greater control over their observability data.
*   **Industry Standardization:** By adopting OpenTelemetry, Gardener aligns with a growing industry standard for telemetry data, ensuring better interoperability and leveraging a vibrant open-source community.

### How It Works

When the `OpenTelemetryCollector` feature gate is activated, Gardener adjusts the logging stack's configuration. The OpenTelemetry Operator, now part of Gardener, manages the lifecycle of the `OpenTelemetryCollector` custom resource.

The Ingress responsible for receiving logs is updated to point to the collector's gRPC receiver endpoint. Consequently, the `kube-rbac-proxy` container, which secures this endpoint, is moved from the `Vali` deployment to the new collector deployment. From an end-user perspective, the logging experience in the Gardener dashboard remains consistent, ensuring a seamless transition.

This update is a foundational move towards a more powerful, flexible, and standardized observability framework within Gardener.

### Further Reading

*   **[Watch the Presentation](https://youtu.be/aUCxInp-yaA?t=29)**
*   **[GitHub Pull Request #12568](https://github.com/gardener/gardener/pull/12568)**
*   **[GEP-34: Observability 2.0 - OpenTelemetry Operator and Collectors](https://github.com/gardener/gardener/blob/master/docs/proposals/34-observability2.0-opentelemtry-operator-and-collectors.md)**
*   **[OpenTelemetry Collector Documentation](https://opentelemetry.io/docs/collector/)**
