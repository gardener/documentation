---
title: "GEP-0043: Spegel Support in Registry Cache Extension"

---
- 📌 **GEP Tracking Issue:** https://github.com/gardener/enhancements/issues/43
- 📖 **GEP Link:** https://github.com/gardener/enhancements/pull/44
- ✍🏻 **Author(s):** [@dimitar-kostadinov](https://github.com/dimitar-kostadinov) (Dimitar Kostadinov)
- 🗓️ **Presentations:** 2026-02-17, 15:00 - 16:00 Europe/Berlin; 2026-07-16, 10:00 - 11:00 Europe/Berlin
- 🎥 **Recording:** https://youtu.be/5kDSlmE5c8k
- 👨‍⚖️ **Decisions:**
  - Approved the `systemd` unit approach (over the `DaemonSet` approach) for running Spegel in the `registry-cache` extension, based on the evaluation of all four POC branches.
  - Agreed to merge the GEP PR by end of the week, with Dimitar Kostadinov to first resolve addressed review comments and remaining participants to flag any final changes by end of day.