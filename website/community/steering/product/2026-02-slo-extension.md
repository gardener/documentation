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
- [Appendix](#references)

## Motivation

**What is the problem/opportunity?**

Although Gardener and kubernetes expose a lot of metrics, there are presently no easy way to evaluate the availability of a shoot from the shoot-owner perspective. In the context that Gardener is meant to run a multitude of kubernetes clusters at scale, operating it is usually not an easy endavour.

**Why should we care?**

Day-2 operation tooling is a must to help drive adoption.

**Who benefits (users, developers, platform teams)?**

Operation team(s): Having a ready to go extension to help with reliability and day-to-day operations

Developers: Having SLOs is a great tool to help prioritize between reliability and feature.

Users : Since SLOs are internal objectives for the meant for the team running Gardener, they are normally not shared with the users. However, better reliability generaly makes customers happy, which intern drives user adoption.

## Proposal

**What is being proposed?**

An SLO extension that provides a standardized framework for measuring and monitoring shoot cluster reliability from the shoot-owner perspective. This extension enables Gardener operators to make data-driven decisions about reliability vs feature prioritization while providing clear visibility into system health.

**What changes, features, or decisions are required?**

This extension delivers three core capabilities:

- **Default and custom SLI**: A set of predefined SLIs based on industry best practices for Kubernetes clusters. However, since the needs of each operators may vary, these defaults will configurable. There should also be the ability to define custom SLIs based on specific metrics exposed by Gardener or the shoot clusters. However, those SLIs would be generic across the landscape.
- **Configurable SLOs**: The SLOs perametrcs (SLI, threshold, ...) should be configurable. Then a templating engine would generate the necessary Prometheus recording rules and Perses dashboards.
- **SLO-based alerting**: Since we have the data to calculate SLO violations and burn rates (SRE best practice), we should also provide as part of the extension the capability to configure an Alertmanager based on those SLOs.

The extension builds on the observability 2.0 infrastructure (Prometheus and Perses operators), using a dedicated Prometheus instance in the runtime cluster to collect and aggregate SLO-specific metrics without impacting existing monitoring systems.

**Include diagrams or examples where helpful.**

Technical architecture details, specific SLO definitions, and implementation design will be presented in a subsequent Technical Steering proposal upon approval.

## Impact and Alternatives

**What are the potential risks, downsides, or trade-offs?**

The primary complexity involves managing dedicated Prometheus infrastructure and coordinating resource changes across both runtime and seed clusters. However, this is mitigated by building on the proven observability 2.0 foundation, which already handles similar cross-cluster orchestration.

**What alternative approaches were considered?**

- **Reusing existing Prometheus instances**: Rejected due to risk of impacting other critical metrics. Since SLO calculations can be resource-intensive, isolating them ensures stability and separation of concerns.

## Decision Request

**What decision is needed from the committee?**

Should we invest in developing this SLO extension as a strategic initiative to improve operational excellence and drive Gardener adoption? Upon approval, a detailed technical design will be prepared for Technical Steering review.

## References

- [Kubernetes's SLI / SLO](https://github.com/kubernetes/community/blob/master/sig-scalability/slos/slos.md)
- [SRE Book](https://sre.google/sre-book/table-of-contents/) (why)
- [SRE Workbook](https://sre.google/workbook/table-of-contents/) (how)
