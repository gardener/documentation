---
title: 'GEP-0063: Diki extension'
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


# GEP-0063: Diki extension

- 📌 **GEP Tracking Issue:** https://github.com/gardener/enhancements/issues/63
- 📖 **GEP Link:** https://github.com/gardener/enhancements/pull/64
- ✍🏻 **Author(s):** [@AleksandarSavchev](https://github.com/AleksandarSavchev) (Aleksandar Savchev)
- 🗓️ **Presentations:** 2026-07-30, 10:00 - 11:00 Europe/Berlin
- 🎥 **Recording:** https://youtu.be/qhvhVDORBQQ
- 👨‍⚖️ **Decisions:**
  - Approved GEP-0063 ("Diki extension") with a few minor open items remaining to be resolved before merging, potentially within the same week.
  - Decided that compliance report outputs will not be deleted when the corresponding resource is removed from the cluster, to preserve audit trails and avoid requiring delete permissions on external storage.
  - Decided that Diki jobs will run in the seed cluster (shoot control plane namespace) rather than in the target cluster, enabling future global persistence configuration and support for workerless shoots.
  - Decided that the CRDs will not be placed in the virtual garden cluster (previously considered approach dropped due to concerns about load on the virtual cluster).
  - Decided that when implementing rulesets that check the shoot spec, the Cluster resource in the seed will be used instead of querying the virtual garden cluster directly.
  - Decided that versioning of rules and rulesets will not be solved in the initial scope; a joint solution (potentially reusable across Diki, Falco, and other extensions) will be addressed in a follow-up.
- 💬 **Key Discussion Points:**
  - The reasoning for not deleting report outputs — audit trail requirements and avoiding delete permissions on external storage — was noted as missing from the GEP document.
  - The rationale for running jobs in the seed cluster rather than the target cluster was also found to be insufficiently documented.
  - Running Diki in the control plane enables scanning workerless shoots for rules that do not target pods or nodes.
  - Users who prefer not to use the extension can still deploy the Diki operator directly; the extension's value lies in tighter integration and future features such as global persistence.
  - Versioning of rule sets is a known unsolved problem shared with other extensions (Falco, Envoy proxy); a common API similar to Cloud Profile is anticipated.
  - The original proposal to place CRDs in the virtual cluster was dropped due to concerns about load on the virtual garden cluster.
- ➡️ **Next Steps:**
  - Aleksandar Savchev to add documentation to the GEP explaining why report outputs are not deleted when resources are removed.
  - Aleksandar Savchev to add documentation explaining why Diki jobs run in the seed cluster rather than the target cluster.
  - Aleksandar Savchev to resolve remaining minor open items on the pull request so it can be merged, targeting the same week.
  - Gardener team to align on a joint versioning/profile solution for Diki, Falco, and other extensions in a future discussion (separate GEP); Diki extension will reuse whatever solution is agreed upon.
