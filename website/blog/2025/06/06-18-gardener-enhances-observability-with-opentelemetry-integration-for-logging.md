---
title: "Gardener Enhances Observability with OpenTelemetry Integration for Logging"
linkTitle: "Gardener Enhances Observability with OpenTelemetry Integration for Logging"
newsSubtitle: June 18, 2025
publishdate: 2025-06-18
authors:
- avatar: https://avatars.githubusercontent.com/nickytd
  email: nickytd@gmail.com
  login: nickytd
  name: Niki Dokovski
- avatar: https://avatars.githubusercontent.com/rrhubenov
  email: rrhubenov@gmail.com
  login: rrhubenov
  name: Rado Hubenov
aliases: ["/blog/2025/06/18/gardener-enhances-observability-with-opentelemetry-integration-for-logging"]
---

# Gardener Enhances Observability with OpenTelemetry Integration for Logging

Gardener is advancing its observability capabilities by integrating OpenTelemetry, starting with log collection and processing. This strategic move, outlined in [GEP-34: OpenTelemetry Operator And Collectors](https://github.com/gardener/gardener/pull/11861), lays the groundwork for a more standardized, flexible, and powerful observability framework in line with Gardener's [Observability 2.0 vision](https://github.com/gardener/logging/blob/master/docs/observability-2.0/Observability%202.0.md).

### The Drive Towards Standardization

Gardener's previous observability stack, though effective, utilized vendor-specific formats and protocols. This presented challenges in extending components and integrating with diverse external systems. The adoption of OpenTelemetry addresses these limitations by aligning Gardener with open standards, enhancing interoperability, and paving the way for future innovations like unified visualization, comprehensive tracing support and even LLM integrations via MCP (Model Context Propagation) enabled services.

### Core Components: Operator and Collectors

The initial phase of this integration introduces two key OpenTelemetry components into Gardener-managed clusters:

* **OpenTelemetry Operator:** Deployed on seed clusters (specifically in the `garden` namespace using `ManagedResources`), the [OpenTelemetry Operator for Kubernetes](https://github.com/open-telemetry/opentelemetry-operator) will manage the lifecycle of OpenTelemetry Collector instances across shoot control planes. Its deployment follows a similar pattern to the existing Prometheus and Fluent Bit operators and occurs during the `Seed` reconciliation flow.
* **OpenTelemetry Collectors:** A dedicated OpenTelemetry Collector instance will be provisioned for each shoot control plane namespace (e.g., `shoot--project--name`). These collectors, managed as `Deployment`s by the OpenTelemetry Operator via an [`OpenTelemetryCollector` Custom Resource](https://github.com/open-telemetry/opentelemetry-operator/blob/main/apis/v1beta1/opentelemetrycollector_types.go) created during `Shoot` reconciliation, are responsible for receiving, processing, and exporting observability data, with an initial focus on logs.

### Key Changes and Benefits for Logging

* **Standardized Log Transport:** Logs from various sources will now be channeled through the OpenTelemetry Collector.
  * **Shoot Node Log Collection:** The existing `valitail` systemd service on shoot nodes is being replaced by an OpenTelemetry Collector. This new collector will gather systemd logs (e.g., from `kernel`, `kubelet.service`, `containerd.service`) with parity to `valitail`'s previous functionality and forward them to the OpenTelemetry Collector instance residing in the shoot control plane.
  * **Fluent Bit Integration:** Existing Fluent Bit instances, which act as log shippers on seed clusters, will be configured to forward logs to the OpenTelemetry Collector's receivers. This ensures continued compatibility with the Vali-based setup previously established by [GEP-19](https://github.com/gardener/gardener/blob/master/docs/proposals/19-migrating-observability-stack-to-operators.md).
* **Backend Agility:** While initially the OpenTelemetry Collector will be configured to use its Loki exporter to send logs to the existing Vali backend, this architecture introduces significant flexibility. It allows Gardener to switch to any OpenTelemetry-compatible backend in the future, with plans to eventually migrate to Victoria-Logs.
* **Phased Rollout:** The transition to OpenTelemetry is designed as a phased approach. Existing observability tools like Vali, Fluent Bit, and Prometheus will be gradually integrated and some backends such as Vali will be replaced.
* **Foundation for Future Observability:** Although this GEP primarily targets logging, it critically establishes the foundation for incorporating other observability signals, such as metrics and traces, into the OpenTelemetry framework. Future enhancements may include:
  * Utilizing the OpenTelemetry Collector on shoot nodes to also scrape and process metrics.
  * Replacing the current event logger component with the OpenTelemetry Collector's [`k8s-event` receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/k8seventsreceiver) within the shoot's OpenTelemetry Collector instance.

### Explore Further

This integration marks a significant step in Gardener's observability journey, promising a more robust and adaptable system.

* Dive deeper into the technical details by reading the full proposal: [GEP-34: OpenTelemetry Operator And Collectors](https://github.com/gardener/gardener/pull/11861).
* Watch the segment from the Gardener Review Meeting discussing this feature: [Recording (starts at 14:09)](https://youtu.be/HguO_KY86ac?t=849).
* Learn more about the overall strategy in the [Observability 2.0 vision for Gardener](https://github.com/gardener/logging/blob/master/docs/observability-2.0/Observability%202.0.md).
