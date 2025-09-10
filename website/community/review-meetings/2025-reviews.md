---
title: Gardener Review Meetings 2025
weight: -2025
---

## Overview

In case you couldn't participate and are interested in catching up, you can find the contents of the review meetings we have had in 2025 here.

Check back regularly for updates and upcoming topics!

## Reviews

### 2025/09/10 - [v1.127](https://github.com/gardener/gardener/releases/tag/v1.127.0) Release

[📽️ Recording](https://youtu.be/aUCxInp-yaA)

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@rrhubenov](https://github.com/rrhubenov) | `10m` | 🪣 New `OpenTelemetryCollector` Feature Gate | [#12568](https://github.com/gardener/gardener/pull/12568) |
| [@dimityrmirchev](https://github.com/dimityrmirchev) | `5m` | 🔩 Internal DNS Secret Configuration Via `Seed` API | [#12663](https://github.com/gardener/gardener/pull/12663) |
| [@voelzmo](https://github.com/voelzmo) | `10m` | 🌀 `MutatingAdmissionPolicy` For Everyday Operations | [Kubernetes docs](https://kubernetes.io/docs/reference/access-authn-authz/mutating-admission-policy/) |

#### No Demo, But Still Worth Celebrating 🎉

- 🪓 [OPERATOR] ⚠️ Gardener does no longer support garden, seed, or shoot clusters with Kubernetes versions `<= 1.28`. Make sure to upgrade all existing clusters before upgrading to this Gardener version. [#12486](https://github.com/gardener/gardener/pull/12486)
- ✨ [USER] `shoot.spec.secretBindingName` field is deprecated in favour of `shoot.spec.credentialsBindingName` and will be removed after Kubernetes support for version 1.34 is dropped. [...] [#12804](https://github.com/gardener/gardener/pull/12804)
- ✨ [OPERATOR] When `gardenlet` starts up, it now checks the version skew with the `gardener-apiserver` (click [here](https://gardener.cloud/docs/gardener/deployment/version_skew_policy/#gardenlet) for the policy document). [#12863](https://github.com/gardener/gardener/pull/12863)

<hr />

### 2025/08/27 - [v1.126](https://github.com/gardener/gardener/releases/tag/v1.126.0) Release

[📽️ Recording](https://youtu.be/K15fRoS2WVs)

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@ScheererJ](https://github.com/ScheererJ) | `10m` | 🌍 `node-local-dns` Enablement w/o Nodes Rollout | [#12422](https://github.com/gardener/gardener/pull/12422) |
| [@LucaBernstein](https://github.com/LucaBernstein) | `5m` | 🚨 Emergency Stop Of `Shoot` Reconciliations | [#12712](https://github.com/gardener/gardener/pull/12712) |

#### No Demo, But Still Worth Celebrating 🎉

- 🪓 [OPERATOR] ⚠️ The `NewWorkerPoolHash` feature gate has been promoted to beta and is now enabled by default. [...] All provider extensions must be upgraded to a version which includes Gardener `v1.98.0` first to support this feature. [#12550](https://github.com/gardener/gardener/pull/12550)
- 🐛 [USER] Errors that occur during `Worker` reconciliation are now also propagated to the `Shoot` status. [#12769](https://github.com/gardener/gardener/pull/12769)
- 🐛 [OPERATOR] An issue causing the `plutono-datasources` `ConfigMap` to be reconciled by 2 `ManagedResource`s when Seed is Garden managed by `gardener-operator` is now fixed. [...] [#12798](https://github.com/gardener/gardener/pull/12798)

<hr />

### 2025/08/13 - [v1.125](https://github.com/gardener/gardener/releases/tag/v1.125.0) Release

[📽️ Recording](https://youtu.be/v9utQl_WJR0)

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@rfranzke](https://github.com/rfranzke) | `10m` | 🤖 GEP-28: ETCD Management Via `etcd-druid` | [#12391](https://github.com/gardener/gardener/pull/12391) |
| [@marc1404](https://github.com/marc1404) | `5m` | 🚫 No More RBAC Collisions In Kubeconfigs | [#12597](https://github.com/gardener/gardener/pull/12597) |
| [@ialidzhikov](https://github.com/ialidzhikov) | `10m` | 🙅🏼‍♂️ Global Max Allowed Values For VPA | [#12481](https://github.com/gardener/gardener/pull/12481) |
| [@AleksandarSavchev](https://github.com/AleksandarSavchev) | `5m` | 🧱 Robust Config Handling In `gardener-node-agent` | [#12589](https://github.com/gardener/gardener/pull/12589) |
| [@tobschli](https://github.com/tobschli) | `10m` | 🐢 Cluster API Provider For Gardener | [cluster-api-provider-gardener (repo)](https://github.com/gardener/cluster-api-provider-gardener), [blog post](https://gardener.cloud/blog/2025/08/08-04-cluster-api-provider-gardener/) |

#### No Demo, But Still Worth Celebrating 🎉

- 🐛 [OPERATOR] `Seed` registration was fixed for `ManagedSeed`s with seed templates configuring `spec.resources`. [#12652](https://github.com/gardener/gardener/pull/12652)
- 🐛 [OPERATOR] A bug in `gardener-node-agent` that prevented the location for the sandbox image to be configurable to a custom value on worker nodes with containerd `v2.x` was fixed. [#12665](https://github.com/gardener/gardener/pull/12665)
- ✨ [DEVELOPER] The Concourse CICD pipeline has been migrated to GitHub Actions. [#12592](https://github.com/gardener/gardener/pull/12592)

<hr />

### 2025/08/06 - Kubernetes v1.33 Special Edition

[📽️ Recording](https://youtu.be/nmqmiZDaaAc)

#### Demo Agenda 📋

_Presenters:_ [@Kostov6](https://github.com/Kostov6), [@plkokanov](https://github.com/plkokanov), [@RadaBDimitrova](https://github.com/RadaBDimitrova)

| Duration | Topic                                                        | Reference(s)                                                     |
| -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| `15m` | 🎓 Graduation Ceremony<br><small>_Graduated Features_</small> | [KEP-753](https://kep.k8s.io/753), [KEP-3850](https://kep.k8s.io/3850), [KEP-3998](https://kep.k8s.io/3998), [KEP-4193](https://kep.k8s.io/4193), [KEP-2590](https://kep.k8s.io/2590), [KEP-1880](https://kep.k8s.io/1880), [KEP-3866](https://kep.k8s.io/3866), [KEP-4444](https://kep.k8s.io/4444) & [KEP-2433](https://kep.k8s.io/2433), [KEP-2625](https://kep.k8s.io/2625), [KEP-3633](https://kep.k8s.io/3633), [KEP-3094](https://kep.k8s.io/3094), [KEP-1495](https://kep.k8s.io/1495), [KEP-2644](https://kep.k8s.io/2644), [KEP-3857](https://kep.k8s.io/3857) |
| `15m` | 🌸 Beta Bloom<br><small>_Alpha -> Beta Promotions_</small> | [KEP-5100](https://kep.k8s.io/5100), [KEP-4381](https://kep.k8s.io/4381), [KEP-4817](https://kep.k8s.io/4817),  [KEP-5142](https://kep.k8s.io/5142), [KEP-4832](https://kep.k8s.io/4832), [KEP-3257](https://kep.k8s.io/3257), [KEP-3619](https://kep.k8s.io/3619), [KEP-4639](https://kep.k8s.io/4639), [KEP-127](https://kep.k8s.io/127), [KEP-4265](https://kep.k8s.io/4265), [KEP-2902](https://kep.k8s.io/2902), [KEP-3960](https://kep.k8s.io/3960) & [KEP-4818](https://kep.k8s.io/4818), [KEP-5073](https://kep.k8s.io/5073) |
| `10m` | 🗞️ Fresh Off The Press<br><small>_New Alpha Features_</small> | [KEP-4951](https://kep.k8s.io/4951), [KEP-4603](https://kep.k8s.io/4603), [KEP-4960](https://kep.k8s.io/4960), [KEP-5055](https://kep.k8s.io/5055) & [KEP-4816](https://kep.k8s.io/4816) & [KEP-5018](https://kep.k8s.io/5018) & [KEP-4815](https://kep.k8s.io/4815), [KEP-2535](https://kep.k8s.io/2535), [KEP-4742](https://kep.k8s.io/4742), [KEP-5067](https://kep.k8s.io/5067), [KEP-5109](https://kep.k8s.io/5109), [KEP-4205](https://kep.k8s.io/4205), [KEP-4412](https://kep.k8s.io/4412), [KEP-4049](https://kep.k8s.io/4049) |
| `5m` | 🧼 Security, Deprecations & Removals | [CVE-2025-4563](http://issues.k8s.io/132151), [KEP-4004](https://kep.k8s.io/4004). [KEP-4974](https://kep.k8s.io/4974), [KEP-5040](https://kep.k8s.io/5040), [KEP-3503](https://kep.k8s.io/3503) |
| `5m` | 🪴 What's Changing In Gardener | [#11033](https://github.com/gardener/gardener/issues/11033), [#12343](https://github.com/gardener/gardener/pull/12343), [#12115](https://github.com/gardener/gardener/pull/12115) & [#12413](https://github.com/gardener/gardener/pull/12413), [#11502](https://github.com/gardener/gardener/pull/11502) |

<hr />

### 2025/07/30 - [v1.124](https://github.com/gardener/gardener/releases/tag/v1.124.0) Release

[📽️ Recording](https://youtu.be/xYiWsIQ8n1o)

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@timuthy](https://github.com/timuthy) | `10m` | 🖼️ Image Rewriter Extension | [extension-image-rewriter (repo)](https://github.com/gardener/gardener-extension-image-rewriter) |
| [@oliver-goetz](https://github.com/oliver-goetz) | `5m` | ✈️ L7 Load-Balancing Metrics Dashboards | [#12509](https://github.com/gardener/gardener/pull/12509) |
| [@domdom82](https://github.com/domdom82) | `10m` | 🧦 CIDR Overlap w/ `Seed` For HA `Shoot`s | [#12204](https://github.com/gardener/gardener/pull/12204) |
| [@vitanovs](https://github.com/vitanovs) | `10m` | 🚪 Vertical Pod Autoscaler Feature Gates | [#12339](https://github.com/gardener/gardener/pull/12339) |

#### No Demo, But Still Worth Celebrating 🎉

- 🪓 [USER] Starting with Kubernetes v1.34, setting the field `.spec.cloudProfileName` is be forbidden. The field will be dropped from existing `Shoot`s once. Users are advised to drop this field and specify the cloud profile using the `.spec.cloudProfile.name` field instead. [#11816](https://github.com/gardener/gardener/pull/11816)
- 🐛 [OPERATOR] A bug has been fixed which caused `Pod`s from namespaces other than `kube-system` and labeled with `node.gardener.cloud/critical-component=true` to be considered by gardener-resource-manager. [#12557](https://github.com/gardener/gardener/pull/12557)
- 🐛 [OPERATOR] A bug has been fixed which prevented the seed-specific Plutono dashboards from being provided by `gardenlet` in case its seed cluster was the garden runtime cluster at the same time. [#12476](https://github.com/gardener/gardener/pull/12476)

<hr />

### 2025/07/16 - [v1.123](https://github.com/gardener/gardener/releases/tag/v1.123.0) Release

[📽️ Recording](https://youtu.be/NiXCYnrURvU)

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@LucaBernstein](https://github.com/LucaBernstein) | `5m` | 🪄 Defaulting Machine Image Version From Prefix | [#12374](https://github.com/gardener/gardener/pull/12374) |
| [@oliver-goetz](https://github.com/oliver-goetz) | `10m` | 😌 Simplified `gardenlet` Deployment Configuration | [#11996](https://github.com/gardener/gardener/pull/11996) |
| [@timebertt](https://github.com/timebertt) | `10m` | 🏃‍➡️ `Bastion` Controller In `provider-local` | [#12366](https://github.com/gardener/gardener/pull/12366) |
| [@ishan16696](https://github.com/ishan16696) | `15m` | 🙅🏼‍♂️ Immutable Backup Buckets | [#12175](https://github.com/gardener/gardener/pull/12175) |

#### No Demo, But Still Worth Celebrating 🎉

- 🪓 [USER] The deprecated `url` annotation in `<shoot-name>.monitoring` secrets in the project namespace has been removed. Please use the `plutono-url` annotation instead. [#12396](https://github.com/gardener/gardener/pull/12396)
- ✨ [OPERATOR] The `NodeAgentAuthorizer` feature gate has been graduated to GA and is locked to true. [#12405](https://github.com/gardener/gardener/pull/12405)
- ✨ [DEVELOPER] `BackupBucket`/`BackupEntry` controllers now support `WorkloadIdentity` type of credentials, provider extensions may need to adjust the respective controllers or to explicitly disallow `BackupBucket`s of their type to configure `WorkloadIdentity`. [#12321](https://github.com/gardener/gardener/pull/12321)

<hr />

_The occurrence for the [v1.122](https://github.com/gardener/gardener/releases/tag/v1.122.0) release was skipped because of too few topics._

<hr />

### 2025/06/25 - [v1.121](https://github.com/gardener/gardener/releases/tag/v1.121.0) Release

[📽️ Recording](https://youtu.be/kcXSyloteSs)

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@RadaBDimitrova](https://github.com/RadaBDimitrova) | `5m` | 🩺 Improved Health Check For Rolling Updates | [#11869](https://github.com/gardener/gardener/pull/11869) |
| [@ashwani2k](https://github.com/ashwani2k) | `5m` | 📣 `dependency-watchdog` Reports Scale Down | [#12272](https://github.com/gardener/gardener/pull/12272) |
| [@timebertt](https://github.com/timebertt) | `10m` | 🍼 GEP-28: `gardenadm bootstrap` Progress | [#2906 (issue)](https://github.com/gardener/gardener/issues/2906) |
| [@timuthy](https://github.com/timuthy) | `5m` | 🦾 New Capabilities For Extension `Shoot` Webhooks | [#12273](https://github.com/gardener/gardener/pull/12273) |
| [@vpnachev](https://github.com/vpnachev) | `5m` | 🙅 New `DoNotCopyBackupCredentials` Feature Gate | [#12168](https://github.com/gardener/gardener/pull/12168) |

#### No Demo, But Still Worth Celebrating 🎉

- 🪓 [OPERATOR] `gardenlet` no longer deploys `ControlPlane` resources with `.spec.purpose=exposure `for `Shoot`s using unmanaged DNS provider. `gardenlet` will now cleanup any `ControlPlane` exposure resource as part of the reconciliation and deletion flows for such Shoots. [#12162](https://github.com/gardener/gardener/pull/12162)
- 🐛 [USER] A bug causing the `kube-apiserver` to crash when anonymous authentication is configured via `StructuredAuthentication` was fixed. [#12198](https://github.com/gardener/gardener/pull/12198)
- ✨ [DEVELOPER] Introduced new version classifications `unavailable` and `expired`. They are not meant to be set manually but should act as computed classification states. [#12298](https://github.com/gardener/gardener/pull/12298)

<hr />

### 2025/06/18 - [v1.120](https://github.com/gardener/gardener/releases/tag/v1.120.0) Release

[📽️ Recording](https://youtu.be/HguO_KY86ac)

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@DockToFuture](https://github.com/DockToFuture) | `10m` | 👯 Single-Stack IPv4 -> Dual-Stack IPv{4,6} Migration For GCP | [extension-provider-gcp#1010](https://github.com/gardener/gardener-extension-provider-gcp/pull/1010) |
| [@nickytd](https://github.com/nickytd) | `5m` | 🛰️ GEP-34: OpenTelemetry Operator And Collectors | [#11861](https://github.com/gardener/gardener/pull/11861) |
| [@oliver-goetz](https://github.com/oliver-goetz) | `10m` | ⚖️ Cluster-Internal L7 Load-Balancing Endpoints For `kube-apiserver`s | [Summary](https://github.com/gardener-community/hackathon/blob/main/2025-06_Schelklingen/README.md#%EF%B8%8F-cluster-internal-l7-load-balancing-endpoints-for-kube-apiservers) |
| [@timuthy](https://github.com/timuthy) | `10m` | 🛸 Compatibility Fields In `Extension` API | [#11982](https://github.com/gardener/gardener/pull/11982) |

#### No Demo, But Still Worth Celebrating 🎉

- ✨ [OPERATOR] The `Garden` resource has been enhanced with a new field, `spec.VirtualCluster.ETCD.Main.Backup.Region`, which enables the configuration of the backup bucket region. Previously, the region was derived from the provider (`spec.runtimeCluster.provider.region`). This behavior remains as a fallback if the backup region is not explicitly specified. [#12186](https://github.com/gardener/gardener/pull/12186)
- ✨ [DEVELOPER] The `.spec.purpose` field in the `ControlPlane` resource is now deprecated and will be removed in Gardener `v1.123`. In the times before SNI was introduced and unconditionally enabled it was previously used to manage control plane exposure. [#12161](https://github.com/gardener/gardener/pull/12161)

<hr />

### 2025/06/11 - [Hack The Garden](https://github.com/gardener-community/hackathon/blob/main/2025-06_Schelklingen/README.md) Wrap Up

[📽️ Recording](https://youtu.be/TCLXovw43HA)

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@axel7born](https://github.com/axel7born) | `5m` | ⚡️ Replace OpenVPN With Wireguard | [Summary](https://github.com/gardener-community/hackathon/blob/main/2025-06_Schelklingen/README.md#%EF%B8%8Freplace-openvpn-with-wireguard) |
| [@afritzler](https://github.com/afritzler) | `5m` | ⛳️ Make `gardener-operator` Single-Node Ready | [Summary](https://github.com/gardener-community/hackathon/blob/main/2025-06_Schelklingen/README.md#%EF%B8%8F-make-gardener-operator-single-node-ready) |
| [@nickytd](https://github.com/nickytd) | `5m` | 📡 OpenTelemetry Transport For `Shoot` Metrics | [Summary](https://github.com/gardener-community/hackathon/blob/main/2025-06_Schelklingen/README.md#-opentelemetry-transport-for-shoot-metrics) |
| [@rickardsjp](https://github.com/rickardsjp) | `5m` | 🔬 Cluster Network Observability | [Summary](https://github.com/gardener-community/hackathon/blob/main/2025-06_Schelklingen/README.md#-cluster-network-observability) |
| [@tobschli](https://github.com/tobschli) | `5m` | 📝 Signing Of `ManagedResource` Secrets |  [Summary](https://github.com/gardener-community/hackathon/blob/main/2025-06_Schelklingen/README.md#-signing-of-managedresource-secrets) |
| [@Gerrit91](https://github.com/Gerrit91) | `5m` | 🧰 Migrate `ControlPlane` Reconciliation Of Provider Extensions To `ManagedResource`s | [Summary](https://github.com/gardener-community/hackathon/blob/main/2025-06_Schelklingen/README.md#-migrate-control-plane-reconciliation-of-provider-extensions-to-managedresources) |
| [@benedikt-haug](https://github.com/benedikt-haug) | `5m` | ✨ Dashboard Usability Improvements | [Summary](https://github.com/gardener-community/hackathon/blob/main/2025-06_Schelklingen/README.md#-dashboard-usability-improvements) |
| [@klocke-io](https://github.com/klocke-io) | `5m` | 📜 Documentation Revamp | [Summary](https://github.com/gardener-community/hackathon/blob/main/2025-06_Schelklingen/README.md#-documentation-revamp) |
| [@Gerrit91](https://github.com/Gerrit91) | `5m` | ℹ️ Expose EgressCIDRs In `shoot-info` `ConfigMap` | [Summary](https://github.com/gardener-community/hackathon/blob/main/2025-06_Schelklingen/README.md#%E2%84%B9%EF%B8%8F-expose-egresscidrs-in-shoot-info-configmap-%EF%B8%8F) |
| [@kon-angelo](https://github.com/kon-angelo) | `5m` | 📈 Overcome Maximum Of 450 `Node`s On Azure | [Summary](https://github.com/gardener-community/hackathon/blob/main/2025-06_Schelklingen/README.md#-overcome-maximum-of-450-nodes-on-azure) |
| [@Nuckal777](https://github.com/Nuckal777) | `5m` | 🦜 Multiple Parallel Versions In A Gardener Landscape (Canary Deployments) | [Summary](https://github.com/gardener-community/hackathon/blob/main/2025-06_Schelklingen/README.md#-multiple-parallel-versions-in-a-gardener-landscape-fka-canary-deployments) |
| [@rrhubenov](https://github.com/rrhubenov) | `5m` | 🧑‍🔧 Worker Group Node Roll-out | [Summary](https://github.com/gardener-community/hackathon/blob/main/2025-06_Schelklingen/README.md#-worker-group-node-roll-out-%EF%B8%8F) |
| [@kon-angelo](https://github.com/kon-angelo) | `5m` | 👀 Instance Scheduled Events Watcher | [Summary](https://github.com/gardener-community/hackathon/blob/main/2025-06_Schelklingen/README.md#-instance-scheduled-events-watcher) |

#### No Demo, But Still Worth Celebrating 🎉

- ⚖️ Cluster-Internal L7 Load-Balancing Endpoints For `kube-apiserver`s. [Summary](https://github.com/gardener-community/hackathon/blob/main/2025-06_Schelklingen/README.md#%EF%B8%8F-cluster-internal-l7-load-balancing-endpoints-for-kube-apiservers)
- ♻️ GEP-32 – Version Classification Lifecycles. [Summary](https://github.com/gardener-community/hackathon/blob/main/2025-06_Schelklingen/README.md#%EF%B8%8F-gep-32--version-classification-lifecycles-%EF%B8%8F)

<hr />

### 2025/05/21 - [v1.119](https://github.com/gardener/gardener/releases/tag/v1.119.0) Release

[📽️ Recording](https://youtu.be/ssvXpPliOY0)

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@timuthy](https://github.com/timuthy) | `10m` | 🛡️ CVE-2025-47282, CVE-2025-47283, CVE-2025-47284 | [#12136 (issue)](https://github.com/gardener/gardener/pull/12136), [#12137 (issue)](https://github.com/gardener/gardener/pull/12137), [external-dns-management#462 (issue)](https://github.com/gardener/external-dns-management/pull/462) |
| [@shafeeqes](https://github.com/shafeeqes) | `5m` | 💪🏻 Forceful Redeployment Of `gardenlet`s | [#11972](https://github.com/gardener/gardener/pull/11972) |
| [@rfranzke](https://github.com/rfranzke) | `10m` | `gardenadm token` + `gardenadm join`| [#11934](https://github.com/gardener/gardener/pull/11934), [#11942](https://github.com/gardener/gardener/pull/11942) |
| [@ScheererJ](https://github.com/ScheererJ) | `5m` | `kube-proxy`'s Readiness Probe | [#12015](https://github.com/gardener/gardener/pull/12015) |

#### No Demo, But Still Worth Celebrating 🎉

- ✨ [OPERATOR] The support for the already deprecated `shoot.gardener.cloud/managed-seed-api-server` annotation is now removed. Instead, consider enabling high availability for the `ManagedSeed`'s `Shoot` control plane. [#11838](https://github.com/gardener/gardener/pull/11838)
- ✨ [OPERATOR] Spreading Istio `ingress-gateway` pods across hosts is enforced only for zonal Istio deployments now. [#12007](https://github.com/gardener/gardener/pull/12007)

<hr />

### 2025/05/07 - [v1.118](https://github.com/gardener/gardener/releases/tag/v1.118.0) Release

[📽️ Recording](https://youtu.be/ZwurVm1IJ7o)

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@domdom82](https://github.com/domdom82) | `10m` | 🧦 CIDR Overlap w/ `Seed` For Non-HA `Shoot`s | [#11582](https://github.com/gardener/gardener/pull/11582) |
| [@vlerenc](https://github.com/vlerenc) | `10m` | 💰 Leaner Clusters, Lower Bills | [blog post](https://gardener.cloud/blog/2025/04/04-17-Leaner-Clusters-Lower-Bills/) |
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
