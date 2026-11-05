---
title: 'GEP-0084: Observability Extension for Gardener'
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



# GEP-0084: Observability Extension for Gardener

- 📌 **GEP Tracking Issue:** https://github.com/gardener/enhancements/issues/84
- 📖 **GEP Link:** https://github.com/gardener/enhancements/pull/85
- ✍🏻 **Author(s):** [@cerealsnow](https://github.com/cerealsnow) (Nick Berthold)
- 🗓️ **Presentations:** 2026-11-05, 10:00 - 11:00 Europe/Berlin
- 🎥 **Recording:** https://youtu.be/plTW7PjLKgU
- 👨‍⚖️ **Decisions:**
  - Decided to drop the shoot-level extension from the proposal and replace it with a config map and namespace annotation approach to avoid exposing an operator-only extension to shoot owners.
  - Decided that the seed-level extension spec (provider config) will remain the location for both seed collector and shoot collector configuration, rather than moving it into the controller deployment component config.
  - Decided that configuration should remain inlined in the provider config spec rather than referenced via config map, as the config is expected to remain small.
  - Decided that when the garden runtime cluster is also a seed, the garden extension takes precedence for the collector managing the garden namespace, and the seed extension is still used for shoot collector configuration; this approach will be documented rather than attempting to merge configurations.
  - Decided that health check gaps for OpenTelemetry collector pods are out of scope for this extension and should be addressed separately in existing Gardener health reporting mechanisms.
  - Decided that the GEP document should be restructured into separate paragraphs describing the garden, seed, and shoot collector scenarios for clarity before re-review.
- 💬 **Key Discussion Points:**
  - The current architecture uses a shoot-level extension to coordinate webhook injection timing with shoot reconciliation, preventing seat-level config changes from being applied to all shoots simultaneously and out of band.
  - A new alternative approach was proposed: the seed extension controller writes an immutable config map (with a checksum-based name) into the garden namespace, and Gardenlet annotates the shoot control plane namespace with the config version during reconciliation, so the mutating webhook always reads the pinned config version for that shoot.
  - Concern was raised that the shoot extension is visible to and hence can be disabled by shoot owners, which is unintuitive from a user experience perspective, motivating the switch to the annotation-based approach.
  - The ordering dependency between the observability extension reconciliation and the deployment of the OpenTelemetry collector during shoot reconciliation was identified as an unaddressed concern that may require a new lifecycle hook.
  - Vladimir raised the general concern that inlining large configurations in extension provider specs contributes to bloat in the cluster object, though the group agreed the observability config is expected to stay small.
  - The scenario where the garden runtime cluster is also a seed was discussed, with agreement that merging garden and seed extension configs is non-trivial and prone to confusion, so precedence rules with documentation are preferred.
  - Secret syncing to shoot namespaces must happen during seed extension reconciliation, using immutable secrets tied to the config map version, and credential rotation will only propagate on the next shoot reconciliation.
- ➡️ **Next Steps:**
  - Nick Berthold to update the GEP document to replace the shoot extension design with the config map and namespace annotation approach.
  - Nick Berthold to restructure the GEP into separate sections describing garden, seed, and shoot collector scenarios for improved clarity.
  - Tim Ebert and Nick Berthold to verify the current reconciliation order between the observability extension and the OpenTelemetry collector deployment, and add a lifecycle ordering constraint if needed.
  - Tim Ebert to address remaining open review comments on the PR, which were noted as minor details.
  - Team to document the behavior when the garden runtime cluster is also a seed (garden extension takes precedence for garden-level collectors; seed extension still used for shoot collectors).