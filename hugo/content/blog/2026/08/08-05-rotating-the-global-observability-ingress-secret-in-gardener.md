---
title: Rotating the Global Observability Ingress Secret in Gardener
linkTitle: Rotating the Global Observability Ingress Secret in Gardener
newsSubtitle: 'August 05, 2026'
publishdate: 2026-08-05T00:00:00.000Z
authors:
  - avatar: 'https://avatars.githubusercontent.com/vicwicker'
    login: vicwicker
    name: Victor Herrero Otal
tags:
  - feature-announcement
  - security
  - observability
aliases:
  - >-
    /blog/2026/08/05/rotating-the-global-observability-ingress-secret-in-gardener
local: true
github_repo: 'https://github.com/gardener/documentation'
github_subdir: hugo/content/blog/2026/08
path_base_for_github_subdir:
  from: >-
    content/blog/2026/08/08-05-rotating-the-global-observability-ingress-secret-in-gardener.md
  to: 08-05-rotating-the-global-observability-ingress-secret-in-gardener.md
---

# Rotating the Global Observability Ingress Secret in Gardener

Gardener uses a shared secret to authenticate federation traffic between the aggregate Prometheus instances on each seed and the garden Prometheus in the runtime cluster. Until v1.148, this *global observability ingress secret* could not be rotated as part of the standard credential rotation mechanism. That gap is now closed.

## Background

Operators can provide their own global observability ingress secret via Gardener's configuration, in which case that custom secret is used as-is. The auto-managed secret described here is the default path — it removes the need for any explicit configuration by generating and rotating the secret automatically, reducing operational overhead for the common case.

The global observability ingress secret is used by:

- The **gardenlet** on each seed, which picks it up from the virtual cluster and configures basic authentication on the aggregate Prometheus ingress.
- The **gardener-operator**, which reads it from the virtual cluster and stores a copy in the runtime cluster so the garden Prometheus knows which credentials to use.

Prior to v1.148, the secret was owned and created by the **gardener-controller-manager (GCM)** in the virtual cluster. Everyone else read it from there. This ownership model made rotation difficult: the `Garden` resource's credential rotation annotation is handled by gardener-operator, not GCM, so there was no clean path to propagate a rotation signal across component boundaries.

## What Changed

Ownership of the global observability ingress secret moved from GCM to **gardener-operator** ([gardener/gardener#15284](https://github.com/gardener/gardener/pull/15284)).

The new flow looks like this:

1. **gardener-operator** creates the secret directly in the runtime cluster (managed by its Secrets Manager) and mirrors a copy into the virtual cluster.
2. **gardenlet** reads from the virtual cluster as before and propagates the secret to the seed cluster.

Because gardener-operator now owns the secret, annotating the `Garden` resource with the credential rotation trigger is all that is needed — no special propagation logic, no branching across components. The rotation runs through the same path as every other credential.

## Migration Path

Upgrading from v1.147 to v1.148 does not change the secret value. The migration path works as follows:

- On first reconciliation after the upgrade, gardener-operator reads the existing secret from the virtual cluster (still managed by GCM at that point) and stores it in the runtime cluster under its own ownership.
- The GCM-managed secret in the virtual cluster is cleaned up, leaving only the copy mirrored by the gardener-operator.
- Federation continues to work without interruption — no rotation is triggered automatically.

The first time the `Garden` resource is annotated for observability credential rotation after the upgrade, the new code path takes over and issues fresh credentials.

## Trying It Out

To rotate the global observability ingress secret manually:

```bash
kubectl annotate garden local \
  gardener.cloud/operation=rotate-observability-credentials
```

After the `Garden` resource reconciles, the old password is invalidated and the new secret becomes active across all seeds.

## Source Material

- [📽️ Review Meeting 2026/08/05 — Global Observability Ingress Secret Rotation segment](https://youtu.be/X07luCqDtno?t=423)
- [Review meeting agenda and recording](https://gardener.cloud/community/review-meetings/2026-reviews/)
- [gardener/gardener#15284 — Global Observability Ingress Secret Rotation](https://github.com/gardener/gardener/pull/15284)
