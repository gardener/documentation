---
title: 'GEP-0078: A Homogeneous Version Profile for Extension-Managed Components'
prev: false
next: false
---
<!-- BANNER:LOCAL -->
<!--
   █▀█ █▄▀
   █ █ █▀▄
   ▀▀▀ ▀ ▀

   ┌────────────────────────────────────────────────┐
   │  LOCAL FILE — maintained in gardener/          │
   │  documentation                                 │
   │                                                │
   │  Go ahead and edit this file directly.         │
   │  Changes here are the source of truth.         │
   └────────────────────────────────────────────────┘
-->



# GEP-0078: A Homogeneous Version Profile for Extension-Managed Components

- 📌 **GEP Tracking Issue:** https://github.com/gardener/enhancements/issues/78
- 📖 **GEP Link:** https://github.com/gardener/enhancements/pull/79
- ✍🏻 **Author(s):** [@DockToFuture](https://github.com/DockToFuture) (Sebastian Stauch)
- 🗓️ **Presentations:** 2026-10-01, 10:00 - 11:00 Europe/Berlin
- 🎥 **Recording:** https://youtu.be/dOjf5fjmYts
- 👨‍⚖️ **Decisions:**- 💬 **Key Discussion Points:**
  - `diki` does not fit the `ExtensionProfile` because the operator deploys a single fixed version and version management (diki version, ruleset version) occurs within the shoot cluster — not via Gardener's lifecycle mechanisms. `DikiVersionConfig` as a CRD managed by `diki` directly in the shoot is the established approach.
  - Tim Ebert raised concern that informative-only inclusion of `diki` in the extension profile is confusing, since users cannot select from the top-level component versions list and the profile may be slightly stale due to maintenance window reconciliation timing.
  - `falco-sidekick` was discussed as another poor fit: its version is tightly coupled to Falco and better expressed as a field in Falco's extension component config rather than as an independently selectable component in the `ExtensionProfile`.
  - Aleksandar Savchev requested that operating system (e.g., Garden Linux) versions be expressible as a compatibility constraint, citing recent cases where new Garden Linux versions broke Falco.
  - Vladimir Nachev proposed using CEL expressions instead of explicit Kubernetes version fields for compatibility, making the API more future-proof and avoiding the need to extend it for every new compatibility dimension.
  - Rafael Franzke proposed that the extension profile should support multiple versioned components (as a components list), analogous to machine images in the cloud profile, rather than a single version field.
  - The revised `ExtensionProfile` and `Shoot` API designs were sketched in a HackMD document: https://hackmd.io/@timebertt/rkDda5oqGg
  - The applicability of the extension profile to non-generic extension types (e.g., container runtime extensions like Kata or GVisor, which are configured per worker pool) was raised; agreed out of scope for now but the API should remain extensible.
- ➡️ **Next Steps:**- 💬 **Key Discussion Points:**
  - `diki` does not fit the `ExtensionProfile` because the operator deploys a single fixed version and version management (diki version, ruleset version) occurs within the shoot cluster — not via Gardener's lifecycle mechanisms. `DikiVersionConfig` as a CRD managed by `diki` directly in the shoot is the established approach.
  - Tim Ebert raised concern that informative-only inclusion of `diki` in the extension profile is confusing, since users cannot select from the top-level component versions list and the profile may be slightly stale due to maintenance window reconciliation timing.
  - `falco-sidekick` was discussed as another poor fit: its version is tightly coupled to Falco and better expressed as a field in Falco's extension component config rather than as an independently selectable component in the `ExtensionProfile`.
  - Aleksandar Savchev requested that operating system (e.g., Garden Linux) versions be expressible as a compatibility constraint, citing recent cases where new Garden Linux versions broke Falco.
  - Vladimir Nachev proposed using CEL expressions instead of explicit Kubernetes version fields for compatibility, making the API more future-proof and avoiding the need to extend it for every new compatibility dimension.
  - Rafael Franzke proposed that the extension profile should support multiple versioned components (as a components list), analogous to machine images in the cloud profile, rather than a single version field.
  - The revised `ExtensionProfile` and `Shoot` API designs were sketched in a HackMD document: https://hackmd.io/@timebertt/rkDda5oqGg
  - The applicability of the extension profile to non-generic extension types (e.g., container runtime extensions like Kata or GVisor, which are configured per worker pool) was raised; agreed out of scope for now but the API should remain extensible.
