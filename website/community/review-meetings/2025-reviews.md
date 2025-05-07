---
title: Gardener Review Meetings 2025
weight: -2025
---

## Overview

In case you couldn't participate and are interested in catching up, you can find the contents of the review meetings we have had in 2025 here.

Check back regularly for updates and upcoming topics!

## Reviews

### 2025/05/07 - [v1.118](https://github.com/gardener/gardener/releases/tag/v1.118.0) Release

[📽️ Recording](https://youtu.be/ZwurVm1IJ7o)

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@domdom82](https://github.com/domdom82) | `10m` | 🧦 CIDR Overlap w/ `Seed` For Non-HA `Shoot`s | [#11582](https://github.com/gardener/gardener/pull/11582) |
| [@vlerenc](https://github.com/vlerenc) | `10m` | 💰 Leaner Clusters, Lower Bills | [blog post](https://gardener.cloud/blog/2025/04-17-leaner-clusters-lower-bills/) |
| [@grolu](https://github.com/grolu) | `10m` | 🕹 Recent Gardener Dashboard Features | [1.80.0 (release)](https://github.com/gardener/dashboard/releases/tag/1.80.0) |
| [@shafeeqes](https://github.com/shafeeqes), [@ary1992](https://github.com/ary1992) | `15m` | 🦋 In-Place Node Updates | [#11191](https://github.com/gardener/gardener/pull/11191), [#11393](https://github.com/gardener/gardener/pull/11393), [#11631](https://github.com/gardener/gardener/pull/11631), [#11713](https://github.com/gardener/gardener/pull/11713), [#11718](https://github.com/gardener/gardener/pull/11718), [#11843](https://github.com/gardener/gardener/pull/11843), [#11844](https://github.com/gardener/gardener/pull/11844), [#11953](https://github.com/gardener/gardener/pull/11953) |

#### No Demo, But Still Worth Celebrating 🎉

- 🐛 [OPERATOR] Gardener core components are automatically restarted (due to a failing liveness probe) in case their Kubernetes API server watch caches do not sync for `3m`. [#11966](https://github.com/gardener/gardener/pull/11966)
- ✨ [USER] The CA bundle of the kubelet is now available via a `ConfigMap` the project's namespace, called `<shoot-name>.ca-kubelet`. [#11916](https://github.com/gardener/gardener/pull/11916)
- ✨ [OPERATOR] The `Seed` API feature new field `spec.backup.credentialsRef`, it is of type `corev1.ObjectReference` and is allowed to refer to a `Secret`. [#11583](https://github.com/gardener/gardener/pull/11583)

<hr />

### 2025/04/23 - [v1.117](https://github.com/gardener/gardener/releases/tag/v1.117.0) Release

[📽️ Recording](https://youtu.be/XB63kan-AtM)

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@axel7born](https://github.com/axel7born) | `10m` | 👯 Single-Stack IPv4 -> Dual-Stack IPv{4,6} Migration | [#11692](https://github.com/gardener/gardener/pull/11692) |
| [@oliver-goetz](https://github.com/oliver-goetz) | `5m` | 🐭 SPDY Support For L7 Load-Balancing | [#11807](https://github.com/gardener/gardener/pull/11807) |
| [@oliver-goetz](https://github.com/oliver-goetz) | `10m` | 🧑‍⚕️ `Extension` Care Controller | [#11769](https://github.com/gardener/gardener/pull/11769) |
| [@hendrikKahl](https://github.com/hendrikKahl) | `5m` | 🚀 `machine-controller-manager` Processing Throughput | [#11879](https://github.com/gardener/gardener/pull/11879) |

#### No Demo, But Still Worth Celebrating 🎉

- 🪓 [USER] The VPA version is updated to 1.3.0. Upstream VPA 1.3.0 does no longer serve API version `autoscaling.k8s.io/v1beta2`. Gardener's VPA installation will continue to serve API version `autoscaling.k8s.io/v1beta2` until Gardener v1.119. [...] [#11774](https://github.com/gardener/gardener/pull/11774)
- ✨ [OPERATOR] `NamespacedCloudProfile.spec.limits.maxNodesTotal` can now also be used to override the limit defined in the parent `CloudProfile` with an increased value. Increasing requires additional permissions granted by the custom verb `raise-spec-limits`. [#11796](https://github.com/gardener/gardener/pull/11796)
- ✨ [OPERATOR] `gardener-operator` automatically adds the `networking.resources.gardener.cloud/to-virtual-garden-kube-apiserver-tcp-443: allowed` label to the gardenlet deployment in case it is deployed to the garden runtime cluster. Thus, it is not required anymore to configure this label in the `Gardenlet` resource. [#11855](https://github.com/gardener/gardener/pull/11855)

<hr />

### 2025/04/09 - [v1.116](https://github.com/gardener/gardener/releases/tag/v1.116.0) Release

[📽️ Recording](https://youtu.be/lzPqY44rYmI)

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@vitanovs](https://github.com/vitanovs) | `10m` | 🎮 New `ShootState` Finalizer Controller | [#11491](https://github.com/gardener/gardener/pull/11491) |
| [@unmarshall](https://github.com/unmarshall), [@Shreyas-s14](https://github.com/Shreyas-s14) | `10m` | 🤖 `etcd-druid` CEL Validations + API Module | [#11545](https://github.com/gardener/gardener/pull/11545) |
| [@rfranzke](https://github.com/rfranzke) | `5m` | 👮 Bug Fixes In `NetworkPolicy` Controller | [#11780](https://github.com/gardener/gardener/pull/11780) |
| [@timuthy](https://github.com/timuthy) | `10m` | 🧩 Extensions For `Seed` Reconciliations | [#11764](https://github.com/gardener/gardener/pull/11764) |
| [@ScheererJ](https://github.com/ScheererJ) | `10m` | 🐓 GEP-28 Update: Autonomous Shoot Clusters | [#2906 (issue)](https://github.com/gardener/gardener/issues/2906) |

#### No Demo, But Still Worth Celebrating 🎉

- 🪓 [OPERATOR] Please note, if you configure `spec.extensions` in your `Garden` resource: `gardener-operator` adds a `garden-` prefix to all extension resources configured via the `Garden`. Existing extension resources (not prefixed) will be deleted automatically at the end of the reconciliation. [...]. [#11764](https://github.com/gardener/gardener/pull/11764)
- 🪓 [DEVELOPER] The extension `class` field in the generic extension controller was removed. Please use the new field `classes` instead. [#11764](https://github.com/gardener/gardener/pull/11764)
- ✨ [OPERATOR] The feature gate `NewVPN` has been graduated to GA. It was already enabled by default and can now no longer be turned off. The feature gate will be removed in a future release. [#11714](https://github.com/gardener/gardener/pull/11714)

<hr />

### 2025/03/26 - [v1.115](https://github.com/gardener/gardener/releases/tag/v1.115.0) Release

[📽️ Recording](https://youtu.be/YptPT04uPz0)

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@shafeeqes](https://github.com/shafeeqes) | `10m` | 🗑️ Drop `TokenInvalidator` Controller And Webhook | [#11497](https://github.com/gardener/gardener/pull/11497) |
| [@LucaBernstein](https://github.com/LucaBernstein) | `5m` | 🔌 Latest `NamespacedCloudProfile`s Features | [#11647](https://github.com/gardener/gardener/pull/11647), [#11550](https://github.com/gardener/gardener/pull/11550) |
| [@ialidzhikov](https://github.com/ialidzhikov) | `10m` | 🚏 Replace `TopologyAwareHints` With `ServiceTrafficDistribution` | [#11178](https://github.com/gardener/gardener/pull/11178) |
| [@ScheererJ](https://github.com/ScheererJ) | `5m` | ⚙️ Better CoreDNS Configurability | [#11526](https://github.com/gardener/gardener/pull/11526) |
| [@oliver-goetz](https://github.com/oliver-goetz) | `10m` | 🌅 Drop `HorizontalPodAutoscaler` For `gardener-apiserver`| [#11684](https://github.com/gardener/gardener/pull/11684) |
| [@hendrikKahl](https://github.com/hendrikKahl) | `5m` | 🏃 GOAWAY Chance For `gardener-apiserver` | [#11551](https://github.com/gardener/gardener/pull/11551) |

#### No Demo, But Still Worth Celebrating 🎉

- ✨ [USER] If the Gardener operator has defined a control plane wildcard certificate, the `.status.advertisedAddresses` of the `Shoot` contain an entry with an endpoint secured by this certificate. Note that this endpoint is specific to the seed cluster the Shoot is scheduled to. Read all about it in [this document](https://github.com/gardener/gardener/blob/master/docs/usage/shoot/shoot_access.md). [#11612](https://github.com/gardener/gardener/pull/11612)
- ✨ [OPERATOR] The `injectGardenKubeconfig` field is defaulted to `true` for extensions responsible for `Worker` resources when registered via the `operator.gardener.cloud/v1alpha1.Extension` API. [#11658](https://github.com/gardener/gardener/pull/11658)

<hr />

### 2025/03/12 - [v1.114](https://github.com/gardener/gardener/releases/tag/v1.114.0) Release

[📽️ Recording](https://youtu.be/ZSjT8daa39s)

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@AleksandarSavchev](https://github.com/AleksandarSavchev) | `5m` | ⛔️ Deny-All `NetworkPolicy` In `kube-system` Namespace For `Shoot`s | [#11502](https://github.com/gardener/gardener/pull/11502) |
| [@timuthy](https://github.com/timuthy) | `10m` | 🍭 Minimum Resource Requirements For `Shoot` ETCD + API Server | [#11252](https://github.com/gardener/gardener/pull/11252) |
| [@timuthy](https://github.com/timuthy) | `5m` | 🔨 `Extension` Example Manifest Generator | [#11329](https://github.com/gardener/gardener/pull/11329) |
| [@Wieneo](https://github.com/Wieneo) | `5m` | 🗑️ Dropping Reserved VPN Authz Server | [#11338](https://github.com/gardener/gardener/pull/11338) |
| [@oliver-goetz](https://github.com/oliver-goetz) | `10m` | ⚖️ L7 Load-Balancing For Requests To `kube-apiserver`s | [#11085](https://github.com/gardener/gardener/pull/11085) |
| [@rfranzke](https://github.com/rfranzke) | `5m` | 🔑 Garden Access For Extensions No Longer By Default | [#11593](https://github.com/gardener/gardener/pull/11593) |

#### No Demo, But Still Worth Celebrating 🎉

- 🪓 [OPERATOR] ⚠️ Gardener does no longer support garden, seed, or shoot clusters with Kubernetes versions <= 1.26. Make sure to upgrade all existing clusters before upgrading to this Gardener version. [#10664](https://github.com/gardener/gardener/pull/10664)
- 🪓 [USER] All `Seed`s are now automatically labeled with `name.seed.gardener.cloud/<name>=true` (⚠ no longer `seed.gardener.cloud/<name>=true`) where `<name>` is their own name, and (if applicable) the name of their parent seed in case they are managed seeds. This label can be used as selector for requests. [#11479](https://github.com/gardener/gardener/pull/11479)
- ✨ [OPERATOR] `gardener-operator` now waits for required `Extension`s to get ready early in the reconcile flow. It addresses use-cases where extensions run mutating webhooks in the garden runtime cluster that must be present when Garden components are deployed. [#11523](https://github.com/gardener/gardener/pull/11523)

<hr />

### 2025/03/05 - Kubernetes v1.32 Special Edition

[📽️ Recording](https://youtu.be/e_AgrDuL8KQ)

#### Demo Agenda 📋

_Presenters:_ [@marc1404](https://github.com/marc1404), [@LucaBernstein](https://github.com/LucaBernstein)

| Duration | Topic                                                        | Reference(s)                                                     |
| -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| `10m` | 🎓 Graduation Ceremony<br><small>_Graduated Features_</small> | [KEP-4358](https://github.com/kubernetes/enhancements/blob/master/keps/sig-api-machinery/4358-custom-resource-field-selectors/README.md), [KEP-1967](https://github.com/kubernetes/enhancements/blob/master/keps/sig-node/1967-size-memory-backed-volumes/README.md), [KEP-4193](https://github.com/kubernetes/enhancements/blob/master/keps/sig-auth/4193-bound-service-account-token-improvements/README.md), [KEP-3221](https://github.com/kubernetes/enhancements/blob/master/keps/sig-auth/3221-structured-authorization-configuration/README.md), [KEP-1847](https://github.com/kubernetes/enhancements/blob/master/keps/sig-apps/1847-autoremove-statefulset-pvcs/README.md) |
| `10m` | 🌸 Beta Bloom<br><small>_Alpha -> Beta Promotions_</small> | [KEP-4368](https://github.com/kubernetes/enhancements/blob/master/keps/sig-apps/4368-support-managed-by-for-batch-jobs/README.md), [KEP-4633](https://github.com/kubernetes/enhancements/blob/master/keps/sig-auth/4633-anonymous-auth-configurable-endpoints/README.md), [KEP-4247](https://github.com/kubernetes/enhancements/blob/master/keps/sig-scheduling/4247-queueinghint/README.md), [KEP-1790](https://github.com/kubernetes/enhancements/blob/master/keps/sig-storage/1790-recover-resize-failure/README.md), [KEP-3476](https://github.com/kubernetes/enhancements/blob/master/keps/sig-storage/3476-volume-group-snapshot/README.md), [KEP-4381](https://github.com/kubernetes/enhancements/blob/master/keps/sig-node/4381-dra-structured-parameters/README.md), [KEP-4601](https://github.com/kubernetes/enhancements/blob/master/keps/sig-auth/4601-authorize-with-selectors/README.md), [KEP-3157](https://github.com/kubernetes/enhancements/blob/master/keps/sig-api-machinery/3157-watch-list/README.md) |
| `10m` | 🗞️ Fresh Off The Press<br><small>_New Alpha Features_</small> | [KEP-4832](https://github.com/kubernetes/enhancements/blob/master/keps/sig-scheduling/4832-async-preemption/README.md), [KEP-3962](https://github.com/kubernetes/enhancements/blob/master/keps/sig-api-machinery/3962-mutating-admission-policies/README.md), [KEP-2837](https://github.com/kubernetes/enhancements/blob/master/keps/sig-node/2837-pod-level-resource-spec/README.md), [KEP-4818](https://github.com/kubernetes/enhancements/blob/master/keps/sig-node/4818-allow-zero-value-for-sleep-action-of-prestop-hook/README.md), [KEP-4817](https://github.com/kubernetes/enhancements/blob/master/keps/sig-node/4817-resource-claim-device-status/README.md), [KEP-4827](https://github.com/kubernetes/enhancements/blob/master/keps/sig-instrumentation/4827-component-statusz/README.md) & [KEP-4828](https://github.com/kubernetes/enhancements/blob/master/keps/sig-instrumentation/4828-component-flagz/README.md), [KEP-4802](https://github.com/kubernetes/enhancements/blob/master/keps/sig-windows/4802-windows-node-shutdown/README.md) & [KEP-4885](https://github.com/kubernetes/enhancements/blob/master/keps/sig-windows/4885-windows-cpu-and-memory-affinity/README.md) |
| `5m` | 🧼 Security, Deprecations & Removals | [CVE-2025-0426](https://github.com/kubernetes/kubernetes/issues/130016), [CVE-2024-9042](https://github.com/kubernetes/kubernetes/issues/129654), [KEP-4381](https://github.com/kubernetes/enhancements/blob/master/keps/sig-node/4381-dra-structured-parameters/README.md), [kubernetes/kubernetes#127017](https://github.com/kubernetes/kubernetes/pull/127017) |
| `5m` | 🪴 What's Changing In Gardener | [#11020](https://github.com/gardener/gardener/pull/11020), [#10666](https://github.com/gardener/gardener/pull/10666), [#10858](https://github.com/gardener/gardener/pull/10858) |

<hr />

### 2025/02/26 - [v1.113](https://github.com/gardener/gardener/releases/tag/v1.113.0) Release

[📽️ Recording](https://youtu.be/r-uCCfjRu7I)

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@maboehm](https://github.com/maboehm) | `5m` | 👷 Maximum Node Count For `Shoot`s | [#11279](https://github.com/gardener/gardener/pull/11279) |
| [@domdom82](https://github.com/domdom82) | `5m` | 👀 ACL Reconciliation On Infrastructure Changes | [extension-acl#105](https://github.com/stackitcloud/gardener-extension-acl/pull/106) |
| [@Wieneo](https://github.com/Wieneo) | `5m` | 🎭 GEP-30: Rework API Server Proxy | [#11214 (issue)](https://github.com/gardener/gardener/issues/11214) |
| [@ishan16696](https://github.com/ishan16696) | `10m` | 🐛 Fix Failing ETCD Restorations | [etcd-backup-restore#778 (issue)](https://github.com/gardener/etcd-backup-restore/issues/778) |
| [@timebertt](https://github.com/timebertt) | `5m` | 🪜 Refactor E2E Tests To Ordered `It`s | [#11379 (issue)](https://github.com/gardener/gardener/issues/11379) |
| [@vpnachev](https://github.com/vpnachev) | `5m` | 📢 Public Gardener Information Discovery | [#11238](https://github.com/gardener/gardener/pull/11238) |

#### No Demo, But Still Worth Celebrating 🎉

- 🐛 [USER] The ETCD encryption config now properly configures a 32-byte key. [#11150](https://github.com/gardener/gardener/pull/11150)
- ✨ [OPERATOR] Enhance the `gardener-operator` to allow specification of more than a single network range for `.spec.runtimeCluster.networking.{nodes,pods,services}`, and `.spec.virtualCluster.networking.services`, which also allows dual-stack configurations. [#11251](https://github.com/gardener/gardener/pull/11251)
- ✨ [OPERATOR] Shoot system and Shoot control plane containers, which do not require privilege escalations, now forbid privilege escalation explicitly. There is an issue in Kubernetes about the privilege escalation configuration being true by default. [#11241](https://github.com/gardener/gardener/pull/11241)

<hr />

### 2025/02/19 - [v1.112](https://github.com/gardener/gardener/releases/tag/v1.112.0) Release

[📽️ Recording](https://youtu.be/HSuMK9oz9Hw)

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@domdom82](https://github.com/domdom82) | `5m` | 🛡️ Prevent Leaking `kube-apiserver`'s Service IP in `Shoot` | [#10949](https://github.com/gardener/gardener/pull/10949) |
| [@rfranzke](https://github.com/rfranzke) | `10m` | 🤹‍♂️ Credentials Rotation Without Workers Rollout | [#11027](https://github.com/gardener/gardener/pull/11027) |
| [@oliver-goetz](https://github.com/oliver-goetz) | `5m` | 🌯 Wrapper For `OperatingSystemConfig` Provisioning Script | [#11208](https://github.com/gardener/gardener/pull/11208) |
| [@marc1404](https://github.com/marc1404) | `10m` | 💥 Cluster Autoscaler Priority Expander Config | [#11045](https://github.com/gardener/gardener/pull/11045) |
| [@petersutter](https://github.com/petersutter) | `5m` | 🗼 Structured Authentication With Dashboard | [#11080](https://github.com/gardener/gardener/pull/11080) |

#### No Demo, But Still Worth Celebrating 🎉

- ✨ [USER] All `Seed`s are now automatically labeled with `seed.gardener.cloud/<name>=true` where `<name>` is their own name, and (if applicable) the name of their parent seed in case they are managed seeds. This label can be used as selector for requests. [#11062](https://github.com/gardener/gardener/pull/11062)
- 📖 [OPERATOR] Rewrite Setup Gardener document [#11260](https://github.com/gardener/gardener/pull/11260)

<hr />

### 2025/02/12 - [v1.111](https://github.com/gardener/gardener/releases/tag/v1.111.0) Release

[📽️ Recording](https://youtu.be/JJHELb0wJyg)

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@marc1404](https://github.com/marc1404) | `5m` | ⚙️ Default Machine Image Version | [#10954](https://github.com/gardener/gardener/pull/10954) |
| [@timuthy](https://github.com/timuthy) | `10m` | 👨🏻‍🌾 Gardener Operator Manages `Extension` Resources | [#11192](https://github.com/gardener/gardener/pull/11192), [#11001](https://github.com/gardener/gardener/pull/11001) |
| [@dimityrmirchev](https://github.com/dimityrmirchev) | `5m` | 🚫 `Secret`/`ConfigMap` Tampering Protection | [#11108](https://github.com/gardener/gardener/pull/11108) |
| [@oliver-goetz](https://github.com/oliver-goetz) | `5m` | 🗑️ Improved Deletion Logic In `gardener-node-agent` | [#11015](https://github.com/gardener/gardener/pull/11015) |

#### No Demo, But Still Worth Celebrating 🎉

- ✨ [USER] Expired versions from the `NamespacedCloudProfile` are always dropped, except for already applied versions. [#10910](https://github.com/gardener/gardener/pull/10910)
- ✨ [OPERATOR] Now `vali` contains the managed control plane logs from the early stages of `Shoot` reconcile. [#11082](https://github.com/gardener/gardener/pull/11082)
- 🐛 [OPERATOR] An issue was fixed in `gardener-operator` that prevented configuring OIDC for `gardener-dashboard` while using Structured Authentication. [#11080](https://github.com/gardener/gardener/pull/11080)
