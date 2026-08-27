---
title: 'GEP-0066: Make Shoot Domains Mutable'
prev: false
next: false
---
<!-- BANNER:LOCAL -->
<!--
   █▀█ █▄▀
   █ █ █▀▄
   ▀▀▀ ▀ ▀

   ┌────────────────────────────────────────────────┐
   │  LOCAL FILE — maintained in gardener/            │
   │  documentation.                                  │
   │                                                  │
   │  Go ahead and edit this file directly.           │
   │  Changes here are the source of truth.           │
   └────────────────────────────────────────────────┘
-->


# GEP-0066: Make Shoot Domains Mutable

- 📌 **GEP Tracking Issue:** https://github.com/gardener/enhancements/issues/66
- 📖 **GEP Link:** https://github.com/gardener/enhancements/pull/67
- ✍🏻 **Author(s):** [@ftl](https://github.com/ftl) (Florian Thienel)
- 🗓️ **Presentations:** 2026-08-27, 10:30 - 11:30 Europe/Berlin
- 🎥 **Recording:** https://youtu.be/V311qD0OfMQ
- 👨‍⚖️ **Decisions:**
  - Agreed that shoot owners should be allowed to change the external domain (not restricted to operators only), consistent with how other misconfiguration risks are handled.
  - Decided to use the existing `advertisedAddresses` field to track domain migration state, rather than introducing a new status field; the old domain will be listed under a name such as `obsolete-internal` and removed once migration completes.
  - Decided that the specific name for the obsolete domain entry (e.g., `obsolete-internal`) can be finalised during implementation/PR review, not in the GEP.
  - Decided that disabling the internal domain will only be supported at the seed level (operator-controlled), not as an individual per-shoot setting in the shoot spec, as this satisfies current requirements without additional RBAC complexity.
  - Decided that a custom verb on the seed API to protect against accidental domain changes is out of scope for now, but may be added later if needed.
  - Decided that changing the DNS provider simultaneously with changing the domain will be denied in the first iteration; support for provider switching will be considered a future enhancement to be noted in the proposal.
  - Decided that a shoot status constraint will be set when the internal domain is changed, and users must add a confirmation annotation explicitly to trigger domain migration during the next CA rotation, preventing unintended automated rotation from silently switching the domain.
  - Decided that the existing single-value `internalDomain` field in the seed API will be kept and synced with the new list field for backward compatibility, deprecated after a defined number of releases (following the existing deprecation process), and eventually removed.
  - Agreed that support for domain mutation in self-hosted shoot exposure (GEP-36) should be addressed in a phased manner; changing the domain in self-hosted shoots will be denied until the self-hosted exposure controller is updated, and the GEP should include a paragraph describing the required work.
  - Conceptual alignment reached on all open points; Florian to incorporate outstanding changes and the GEP will be finalised and merged.
- 💬 **Key Discussion Points:**
  - Concern was raised about whether restricting who can modify the external domain via the shoot API is necessary, given that misconfiguration risks are comparable to other user-controllable settings like infrastructure credentials.
  - The `advertisedAddresses` field was proposed as the mechanism to determine whether a new domain has been successfully provisioned, gating further domain updates during rotation.
  - The question of whether disabling the internal domain should be per-shoot or per-seed was discussed, concluding that seed-level control is sufficient for current use cases.
  - A concern was raised that users with automated CA rotation pipelines might unknowingly trigger domain migration; requiring an explicit confirmation annotation was proposed to address this.
  - The question of switching DNS providers when changing a domain was identified as an implicit use case that needs either validation/denial or explicit future support, as omitting handling could allow users to break their clusters.
  - The API compatibility strategy for replacing the single `internalDomain` field in the seed spec with a list was discussed, settling on syncing both fields temporarily followed by deprecation and removal.
  - The impact on self-hosted shoot exposure (GEP-36) was identified as requiring a dedicated paragraph in the GEP and phased implementation in the self-hosted exposure controller.
- ➡️ **Next Steps:**
  - **Florian Thienel**: Update the GEP document to reflect all decisions made in this meeting, including: confirmation annotation requirement for internal domain migration, denial of DNS provider changes in first iteration, API compatibility/deprecation strategy for the seed `internalDomain` field, and a paragraph on self-hosted shoot exposure implications.
  - **Florian Thienel**: Add a note in the GEP listing switching DNS providers as a future enhancement to keep in scope for later iterations.
  - **Tim Ebert / Florian Thienel**: Ensure the GEP documents that domain changes in self-hosted shoots will initially be denied and describes the required changes to the self-hosted exposure controller.
