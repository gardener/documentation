---
title: "2026-02: Autoscaling PersistentVolumeClaims"
---

- ✍🏻 **Author(s):** [@plkokanov](https://github.com/plkokanov) (Plamen Kokanov), [@Kostov6](https://github.com/Kostov6) (Viktor Kostov)
- 🗓️ **Presentation:** 2026-02-03, 15:00 - 16:00 CET and 2026-02-04, 10:00 - 11:00 CET
- 🎥 **Recording:** [click here](https://youtu.be/JJmFiZvuMBY)
- 👨‍⚖️ **Decisions & Agreements:**
  - **Seed settings scope**
    - Provider-specific settings (e.g., max capacity, cooldown duration) will be moved out of seed settings.
    - These will be implemented via **provider extension webhooks** to reduce API surface and ops overhead.
    - Rationale: provider-specific logic should not live in generic Gardener APIs.
    - Along this way, `.spec.volume.minimumSize` will be **deprecated** and moved into a webhook as well.
  - **Scale-up failure handling**
    - Behavior depends on the CSI driver.
    - Kubernetes ≥1.34 supports **rollback of failed resize operations** which can be used.
    - Evicting pods after a failed resize was considered, though this would require a strategy field in the PVCA API and exposure via seed settings.
    - **Decision**: No explicit *Evict* strategy; rely on kubelet conditions.
  - **Metrics source**
    - HPA/VPA use the Kubernetes metrics API.
    - There is **no active upstream work** to expose PVC disk metrics via metrics-server; PVC metrics are still **alpha**.
    - PVCA metric queries must be **configurable** to support multiple Kubernetes versions (already foreseen).
  - **Shoot cluster support**
    - Supporting shoots is a long-term goal (not in scope for now), but currently blocked by missing metrics (no Prometheus for shoot PVCs).
    - **Outlook**:
      - Open an upstream Kubernetes proposal to add PVC metrics to the metrics-server.
      - This is a prerequisite for shoot support and removes the Prometheus dependency.
- 👨‍⚖️ **Documentation Requirements**
  - **Non-goals**
    - PVC downscaling.
    - Shoot cluster support (for now).
  - **Downscaling**
    - Clearly document why downscaling is not supported.
  - **Testing**
    - Metrics-related tests should live in **gardener/gardener**, not in **gardener/pvc-autoscaler**.
  - **ETCD volumes**
    - ETCD volumes are out of scope.
    - Reason: ETCD teams plan to orchestrate this via **druid**.
  - **API field explanations**
    - Clarify fields such as *stabilization duration window* and others.
  - **Admission considerations**
    - Admission webhook for mutating PVCs on creation is **not required** today.
    - Existing controllers handle concurrent PVC spec updates correctly.
    - An admission component may be needed if downscaling is introduced in the future.
  - **Runtime / operator context**
    - Clarify runtime cluster and **gardener-operator** involvement.
  - **IOPS**
    - IOPS are **out of scope** for the initial API to avoid bloating it.
    - Future support could be via an additional metric source, likely on the StorageClass.
    - Current workaround: increase `minCapacity` to trade storage for performance.

## Proposal

[Autoscaling PersistentVolumeClaims](https://github.com/gardener/pvc-autoscaler/blob/master/docs/proposals/autoscaling-pvcs.md)
