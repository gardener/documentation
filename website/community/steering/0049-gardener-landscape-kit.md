---
title: "GEP-0049: Gardener Landscape Kit"
---

- 📌 **GEP Tracking Issue:** https://github.com/gardener/enhancements/issues/49
- 📖 **GEP Link:** https://github.com/gardener/enhancements/pull/48
- ✍🏻 **Author(s):** [@timuthy](https://github.com/timuthy) (Tim Usner)
- 🗓️ **Presentation:** 2026-03-25, 15:00 - 16:00 CET
- 🎥 **Recording:** https://youtu.be/VHi-y3chH1s
- 👨‍⚖️ **Decisions & Agreements:**
  - Currently, the resolution of the three-way merge is automatic, but it is possible to make conflicts visible to operators so they can be addressed manually instead => Adapted https://github.com/gardener/enhancements/pull/48 accordingly
  - At the moment, Gardener Landscape Kit is primarily git-based. An alternative approach could be to allow OCI-based repositories => Adapted https://github.com/gardener/enhancements/pull/48 accordingly
  - The version vector provided per default might not be qualified, i.e. there might not be a test coverage for the version vector. There will be a follow-up discussion whether some qualified/tested combination of component versions could be provided.
  - The proposal is good overall and shall be implemented.
