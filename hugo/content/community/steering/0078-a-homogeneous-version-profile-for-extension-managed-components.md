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
- 💬 **Key Discussion Points:**
- ➡️ **Next Steps:**
