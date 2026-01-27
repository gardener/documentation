---
title: "2026-06: SLO extension"
---

- ✍🏻 **Author(s):** [etiennnr](https://github.com/etiennnr) (Étienne Kemp-Rousseau)
- 🗓️ **Presentation:** _(TBD)_
- 🎥 **Recording:** _(TBD)_
- 👨‍⚖️ **Decisions:**
  - _pending_

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Motivation](#motivation)
- [Proposal](#proposal)
- [Impact and Alternatives](#impact-and-alternatives)
- [Decision Request](#decision-request)
- [References](#references)

## Motivation

**What is the problem/opportunity?**

Although Gardener and Kubernetes expose a lot of metrics, there is presently no easy way to evaluate the availability of a shoot from the customer (shoot owner/operator) perspective. In the context that Gardener is meant to run a multitude of Kubernetes clusters at scale, operating it is usually not an easy endeavor. Having such means to measure and monitor the shoot's reliability is a key aspect from both customer happiness and operation excellence.

**Why should we care?**

Day-2 operation tooling is a must to help drive adoption. This also mimics industry best practices as described in the [SRE book](https://sre.google/sre-book/table-of-contents/).

This extension also enables Gardener operators and developers to make data-driven decisions about reliability vs feature prioritization while providing clear visibility into system health.

**Who benefits (users, developers, platform teams)?**

Gardener operation team: Having a ready to go extension to help with reliability and day-to-day operations

Developers: Having SLOs is a great tool to help prioritize between reliability and feature issues.

Users: Since SLOs are internal objectives meant for Gardener operators, they are normally not shared with the end users (shoot owners/operators). However, better reliability generally makes customers happy, which in turn drives user adoption.

## Proposal

**What is being proposed?**

An SLO (service level objective) extension that provides a standardized framework for measuring and monitoring shoot cluster reliability, always from the customer perspective. By customer perspective, we want to focus on metrics that would reflect the customer's experience and satisfaction.

**What changes, features, or decisions are required?**

This extension delivers 4 core capabilities:

- **Default and custom SLI**: A set of predefined SLIs based on industry best practices for Kubernetes clusters and Gardener specifics, but always from the customer perspective. However, since the needs of each Gardener operator may vary, these defaults will be configurable. There should also be the ability to define custom SLIs based on specific metrics exposed by Gardener or the shoot clusters. However, those SLIs would need to be generic across the landscape.
- **Configurable SLOs**: The SLOs parameters (SLI, threshold, ...) should be configurable. Then a templating engine would generate the necessary Prometheus recording rules and Perses dashboards.
- **SLO-based alerting**: Since we have the data to calculate SLO violations and burn rates (SRE best practice), we should also provide, as part of the extension, the capability to configure an Alertmanager based on those SLOs. Again, this should be configurable to fit the needs of each Gardener operator.
- **Monitoring infrastructure**: The extension should provide the necessary monitoring infrastructure to collect, store, and visualize SLO-related metrics. This includes Prometheus rules for SLI calculation, Perses dashboards for visualization, Prometheus alerts for SLO violations, Alertmanager to manage those alerts, etc.

The extension builds on the [Observability 2.0](../technical/2025-03-observability-2.0.md) infrastructure (Prometheus and Perses operators), using a dedicated Prometheus instance in the runtime cluster to collect and aggregate SLO-specific metrics without impacting existing monitoring systems.

**Include diagrams or examples where helpful.**

Technical architecture details, specific SLO definitions, and implementation design will be presented in a subsequent Technical Steering proposal upon approval.

## Impact and Alternatives

**What are the potential risks, downsides, or trade-offs?**

The primary complexity involves managing dedicated Prometheus infrastructure and coordinating resource changes across both runtime and seed clusters. However, this is mitigated by building on the proven Observability 2.0 foundation, which already handles similar cross-cluster orchestration.

**What alternative approaches were considered?**

- **Reusing existing Prometheus instances**: Rejected due to risk of impacting other critical metrics. Since SLO calculations can be resource-intensive, isolating them ensures stability and separation of concerns.
- **Manual dashboarding without framework**: Considered but lacks the standardization and ease-of-use needed for broad adoption across operators.

## Decision Request

**What decision is needed from the committee?**

Should we invest in developing this SLO extension as a strategic initiative to improve operational excellence and help drive Gardener adoption? Upon approval, a detailed technical design will be prepared for Technical Steering review.

## References

- [Kubernetes's SLI / SLO](https://github.com/kubernetes/community/blob/master/sig-scalability/slos/slos.md)
- [SRE Book](https://sre.google/sre-book/table-of-contents/) (why)
- [SRE Workbook](https://sre.google/workbook/table-of-contents/) (how)
