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
- 👨‍⚖️ **Decisions:**
  - Agreed to remove `diki` from the main `ExtensionProfile` proposal, as it does not fit the model of user-selectable, lifecycle-managed component versions.
  - Agreed to retain a dedicated section in the GEP document explaining why `diki` does not fit the `ExtensionProfile`, including how it is solved in practice: `diki` manages its own versions via a `DikiVersionConfig` CRD deployed directly in the shoot cluster.
  - Agreed to remove the read-only field introduced for the `diki` special case from the API design, as it is no longer needed.
  - `falco-sidekick` version is not a good fit for the `ExtensionProfile` either; it should be a field in Falco's extension component config instead.
  - Agreed to replace the flat versions list in the extension profile spec with a components list (each component containing its own list of versions), modeled after the machine image list in the cloud profile; the `Shoot` API follows the same shape via `.spec.extensions[].components[].{name,version}`.
  - Agreed to replace the Kubernetes-specific compatibility constraints with a CEL-expression-based compatibility validation section (list of structs with description + CEL rule, ANDed together); compatibility constraints against other component versions or components of other extensions are deferred to a later phase.
  - Agreed to support a top-level default update strategy with an optional per-component override; per-component override is possible in the API design but deferred as an active feature.
  - Agreed to retain the explicit boolean `enabled` field for auto-updates rather than introducing a `none` strategy value.
  - Deferred worker-pool-level version selectability for extension components; no immediate use case was confirmed, but the API should remain extensible to avoid breaking changes later.
  - Seed compatibility was not discussed and is out of scope for this GEP.
  - Agreed to remove `diki` from the main `ExtensionProfile` proposal, as it does not fit the model of user-selectable, lifecycle-managed component versions.
  - Agreed to retain a dedicated section in the GEP document explaining why `diki` does not fit the `ExtensionProfile`, including how it is solved in practice: `diki` manages its own versions via a `DikiVersionConfig` CRD deployed directly in the shoot cluster.
  - Agreed to remove the read-only field introduced for the `diki` special case from the API design, as it is no longer needed.
  - `falco-sidekick` version is not a good fit for the `ExtensionProfile` either; it should be a field in Falco's extension component config instead.
  - Agreed to replace the flat versions list in the extension profile spec with a components list (each component containing its own list of versions), modeled after the machine image list in the cloud profile; the `Shoot` API follows the same shape via `.spec.extensions[].components[].{name,version}`.
  - Agreed to replace the Kubernetes-specific compatibility constraints with a CEL-expression-based compatibility validation section (list of structs with description + CEL rule, ANDed together); compatibility constraints against other component versions or components of other extensions are deferred to a later phase.
  - Agreed to support a top-level default update strategy with an optional per-component override; per-component override is possible in the API design but deferred as an active feature.
  - Agreed to retain the explicit boolean `enabled` field for auto-updates rather than introducing a `none` strategy value.
  - Deferred worker-pool-level version selectability for extension components; no immediate use case was confirmed, but the API should remain extensible to avoid breaking changes later.
  - Seed compatibility was not discussed and is out of scope for this GEP.
- 💬 **Key Discussion Points:**
  - `diki` does not fit the `ExtensionProfile` because the operator deploys a single fixed version and version management (diki version, ruleset version) occurs within the shoot cluster — not via Gardener's lifecycle mechanisms. `DikiVersionConfig` as a CRD managed by `diki` directly in the shoot is the established approach.
  - Tim Ebert raised concern that informative-only inclusion of `diki` in the extension profile is confusing, since users cannot select from the top-level component versions list and the profile may be slightly stale due to maintenance window reconciliation timing.
  - `falco-sidekick` was discussed as another poor fit: its version is tightly coupled to Falco and better expressed as a field in Falco's extension component config rather than as an independently selectable component in the `ExtensionProfile`.
  - Aleksandar Savchev requested that operating system (e.g., Garden Linux) versions be expressible as a compatibility constraint, citing recent cases where new Garden Linux versions broke Falco.
  - Vladimir Nachev proposed using CEL expressions instead of explicit Kubernetes version fields for compatibility, making the API more future-proof and avoiding the need to extend it for every new compatibility dimension.
  - Rafael Franzke proposed that the extension profile should support multiple versioned components (as a components list), analogous to machine images in the cloud profile, rather than a single version field.
  - The revised `ExtensionProfile` and `Shoot` API designs were sketched in a HackMD document: https://hackmd.io/@timebertt/rkDda5oqGg
  - The applicability of the extension profile to non-generic extension types (e.g., container runtime extensions like Kata or GVisor, which are configured per worker pool) was raised; agreed out of scope for now but the API should remain extensible.
- ➡️ **Next Steps:**
  - **Sebastian Stauch**: Incorporate the revised API design from https://hackmd.io/@timebertt/rkDda5oqGg (components list, CEL-based compatibility validations, consolidated update strategy, removal of `diki` special case and read-only field) into the GEP proposal document.
  - **Sebastian Stauch**: Add a dedicated section to the GEP explaining why `diki` does not fit the `ExtensionProfile` and documenting `DikiVersionConfig` as the reference approach for similar future cases.
  - **All reviewers**: Conduct another offline review round of the updated GEP proposal and continue finalization in the pull request.
  - **Tim Ebert**: Double-check the updated API design in the PR review to ensure it remains extensible for potential future worker-pool-level version selectability without requiring breaking changes.