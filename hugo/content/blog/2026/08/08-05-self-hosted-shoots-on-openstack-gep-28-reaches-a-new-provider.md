---
title: "Self-Hosted Shoots on OpenStack: GEP-28 Reaches a New Provider"
linkTitle: "Self-Hosted Shoots on OpenStack: GEP-28 Reaches a New Provider"
newsSubtitle: August 05, 2026
publishdate: 2026-08-05
authors:
- avatar: https://avatars.githubusercontent.com/tobschli
  login: tobschli
  name: Tobias Schlicht
tags:
- feature-announcement
- self-hosted-shoots
- openstack
aliases: ["/blog/2026/08/05/self-hosted-shoots-on-openstack-gep-28-reaches-a-new-provider"]
---

[GEP-28](https://github.com/gardener/gardener/blob/master/docs/proposals/28-self-hosted-shoot-clusters.md) describes Gardener's model for self-hosted shoot clusters — shoot clusters whose control planes run not in a dedicated seed, but on the shoot's own infrastructure. The reference implementation targets local KinD-based setups, but the goal was always broader provider coverage. With v1.148, self-hosted shoots now work on OpenStack.

## What Needed Fixing

Getting `gardenadm bootstrap` to succeed on OpenStack required three targeted fixes:

**SSH not enabled for control plane nodes.** `gardenadm` needs to SSH into the first control plane node to run `gardenadm init` on it. Operating systems that do not enable SSH by default (GardenLinux in the `gardenadm` scenario being one example) would cause the machine to come up but be unreachable. `gardenadm bootstrap` now always enables SSH for control plane nodes of self-hosted shoots ([gardener/gardener#15270](https://github.com/gardener/gardener/pull/15270)).

**Zone not propagated to `gardenadm init`.** The `kube-system` namespace carries a `high-availability-config.resources.gardener.cloud/consider=true` label, which causes pods there — including the cloud-controller-manager — to receive node affinity rules based on the `topology.kubernetes.io/zone` label. Since the CCM is responsible for adding that label, a chicken-and-egg situation prevented it from scheduling. The fix detects the zone from the first control plane machine and passes it via the `--zone` flag to `gardenadm init`. Additionally, a missing `reconcile` operation annotation on the OperatingSystemConfig patch caused the observed generation to stall; that annotation is now set correctly ([gardener/gardener#15369](https://github.com/gardener/gardener/pull/15369)).

**Machine adoption after infrastructure pivot.** Once `gardenadm` pivots to managing the infrastructure, the machine-controller-manager-provider-openstack needs to be able to look up machine status. Without a `GetMachineStatus` implementation, the provider fell back to looking for a `machine` label on the node — a label that is never applied on self-hosted shoots because the machine is created without a target kubeconfig. Implementing `GetMachineStatus` closes this gap ([gardener/machine-controller-manager-provider-openstack#405](https://github.com/gardener/machine-controller-manager-provider-openstack/pull/405)).

## The Result

With these three changes in place, `gardenadm bootstrap` completes successfully on OpenStack. The demo in the v1.148 review meeting showed a self-hosted shoot bootstrapped end-to-end — machines created via the OpenStack extension, `gardenadm init` executed on the first control plane node over SSH, and the resulting cluster reachable with the generated kubeconfig.

## What's Next

With a working self-hosted shoot on OpenStack, the next step is implementing `SelfHostedShootExposure` (GEP-36) for this provider — exposing the shoot's API server via an OpenStack load balancer. That work is currently in progress as an open PR ([gardener-extension-provider-openstack#1401](https://github.com/gardener/gardener-extension-provider-openstack/pull/1401)).

## Source Material

- [📽️ Review Meeting 2026/08/05 — Self-Hosted Shoot on OpenStack segment](https://youtu.be/X07luCqDtno?t=1359)
- [Review meeting agenda and recording](https://gardener.cloud/community/review-meetings/2026-reviews/)
- [gardener/gardener#15270 — Always enable SSH for self-hosted shoot control plane nodes](https://github.com/gardener/gardener/pull/15270)
- [gardener/gardener#15369 — Fixes for managed scenario (zone flag + OSC reconcile annotation)](https://github.com/gardener/gardener/pull/15369)
- [machine-controller-manager-provider-openstack#405 — Implement GetMachineStatus](https://github.com/gardener/machine-controller-manager-provider-openstack/pull/405)
- [gardener-extension-provider-openstack#1401 — SelfHostedShootExposure (open PR)](https://github.com/gardener/gardener-extension-provider-openstack/pull/1401)
