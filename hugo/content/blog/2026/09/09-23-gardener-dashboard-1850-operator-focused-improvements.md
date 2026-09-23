---
title: "Gardener Dashboard 1.85.0: Operator-Focused Improvements"
linkTitle: "Gardener Dashboard 1.85.0: Operator-Focused Improvements"
newsSubtitle: September 23, 2026
publishdate: 2026-09-23
authors:
- avatar: https://avatars.githubusercontent.com/petersutter
  login: petersutter
  name: Peter Sutter
- avatar: https://avatars.githubusercontent.com/grolu
  login: grolu
  name: Lukas Gross
tags:
- feature-announcement
- dashboard
- security
- observability
aliases: ["/blog/2026/09/23/gardener-dashboard-1850-operator-focused-improvements"]
---

This release of the Gardener Dashboard brings a set of improvements aimed at landscape operators: encrypted in-cluster traffic, a richer seed list, a redesigned Operations View, and expanded visibility for landscape viewers.

## In-Cluster TLS Termination for the Dashboard Backend

Previously, traffic between the dashboard backend pod and the ingress gateway was the one unencrypted hop in the request path. The dashboard backend now supports optional TLS termination, closing that gap.

When deploying the dashboard via `gardener-operator`, TLS is set up automatically — the operator provides the required certificate and private key, and handles certificate rotation if the cluster CA changes. For manual deployments, TLS remains opt-in: provide `tls.certFile` and `tls.privateKeyFile` in the dashboard configuration to enable it, or leave them absent to keep the previous behavior unchanged.

## Landscape Viewer Role Recognition

Users with permission to view shoots across all namespaces are now recognized as *landscape viewers* — a distinct role that was previously indistinguishable from regular users. The dashboard now shows a role badge on the avatar and surfaces UI elements previously reserved for operators: the control plane chip, seed readiness column, and direct links to the respective seed.

## Redesigned Operations View

The all-projects shoot list has been redesigned around a clearer Operations View concept. The active filter is now visible directly in the search input field, alongside a toggle that opens a menu with a description and controls for showing all clusters or editing exclusion criteria.

Exclusion criteria — previously a checkbox buried under table options — are now configurable from the Settings page, with descriptions for each option. Operators can configure which clusters to hide from the Operations View (progressing clusters, clusters not requiring operator attention, clusters where issues are user-resolvable) and can set whether Operations View or "all clusters" is the default when opening the page. The exclusion criteria also apply to the seed list.

## Seed List Health and Capacity Indicators

The seed list now shows per-seed shoot health statistics as donut charts alongside shoot capacity indicators, with real-time updates. The health donut distinguishes clusters needing operator attention from those excluded by the Operations View criteria. Both the donut and the capacity indicator link directly to a filtered shoot list — the seed filter and relevant criteria are applied automatically.

## Field-Qualified Search

The shoot and seed list filters now support field-qualified search terms such as `seed:aws-ha` or `-region:eu`, making it easier to narrow down large landscapes without navigating through multiple filter controls.

## Links

- [Recording (dashboard segment)](https://youtu.be/IattXdELxSc?t=512)
- [Gardener Dashboard 1.85.0 release](https://github.com/gardener/dashboard/releases/tag/1.85.0)
