---
title: Gardener Review Meetings 2024
weight: -2024
---

## Overview

In case you couldn't participate and are interested in catching up, you can find the contents of the review meetings we have had in 2024 here.

## Reviews

### 2024/12/18 - [v1.109](https://github.com/gardener/gardener/releases/tag/v1.109.0) and [v1.110](https://github.com/gardener/gardener/releases/tag/v1.110.0) Releases

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@timuthy](https://github.com/timuthy) | `5m` | 🫣 Virtual Cluster Watch In `gardener-operator` | [#10663](https://github.com/gardener/gardener/pull/10663) |
| [@oliver-goetz](https://github.com/oliver-goetz) | `10m` | 💂 Node Agent Authorizer | [#10781](https://github.com/gardener/gardener/pull/10781) |
| [@tobschli](https://github.com/tobschli) | `5m` | 🐛 Fix `Shoot` SSH Keypair Rotation | [#10671](https://github.com/gardener/gardener/pull/10671) |
| [@maboehm](https://github.com/maboehm) | `5m` | 🪪 Support More Use-Cases For `TokenRequestor` | [#10988](https://github.com/gardener/gardener/pull/10988) |
| [@axel7born](https://github.com/axel7born) | `5m` | 🧑‍🧒 IPv4/IPv6 Dual Stack `Shoot`s on AWS| [#10803](https://github.com/gardener/gardener/pull/10803) |

#### No Demo, But Still Worth Celebrating 🎉

- 🪓 [OPERATOR] The deprecated and unconditionally disabled `HVPA` and `HVPAForShootedSeed` feature gates are removed. [...] [#10853](https://github.com/gardener/gardener/pull/10853)
- 🪓 [DEVELOPER] Extension webhooks need to remove the provider type `Predicates` and add an `ObjectSelector` against the object's provider type label instead. [#10896](https://github.com/gardener/gardener/pull/10896)
- 🐛 [OPERATOR] `seed-authorizer` and structured authorization webhooks of shoot `kube-apiserver`s no longer use the default TTL for `AuthorizedTTL` and `UnauthorizedTTL`. [#10703](https://github.com/gardener/gardener/pull/10703)

<hr />

### 2024/12/11 - [Hack The Garden](https://github.com/gardener-community/hackathon/blob/main/2024-12_Schelklingen/README.md) Wrap Up

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@damyan](https://github.com/damyan) | `5m` | 🌐 IPv6 Support On [IronCore](https://github.com/ironcore-dev) | [Summary](https://github.com/gardener-community/hackathon/blob/main/2024-12_Schelklingen/README.md#-ipv6-support-on-ironcore) |
| [@LucaBernstein](https://github.com/LucaBernstein) | `5m` | 💡 Gardener SLIs: Shoot Cluster Creation/Deletion Times | [Summary](https://github.com/gardener-community/hackathon/blob/main/2024-12_Schelklingen/README.md#-gardener-slis-shoot-cluster-creationdeletion-times) |
| [@Gerrit91](https://github.com/Gerrit91) | `5m` | 🔁 Version Classification Lifecycle In `CloudProfile`s | [Summary](https://github.com/gardener-community/hackathon/blob/main/2024-12_Schelklingen/README.md#-version-classification-lifecycle-in-cloudprofiles) |
| [@rfranzke](https://github.com/rfranzke) | `5m` | 🛡️ Enhanced `Seed` Authorizer With Label/Field Selectors | [Summary](https://github.com/gardener-community/hackathon/blob/main/2024-12_Schelklingen/README.md#%EF%B8%8F-enhanced-seed-authorizer-with-labelfield-selectors) |
| [@hown3d](https://github.com/hown3d) | `5m` | 🔑 Bring Your Own ETCD Encryption Key Via Key Management Systems | [Summary](https://github.com/gardener-community/hackathon/blob/main/2024-12_Schelklingen/README.md#-bring-your-own-etcd-encryption-key-via-key-management-systems) |
| [@MichaelEischer](https://github.com/MichaelEischer) | `5m` | ⚖️ Load Balancing For Calls To `kube-apiserver`s | [Summary](https://github.com/gardener-community/hackathon/blob/main/2024-12_Schelklingen/README.md#%EF%B8%8F-load-balancing-for-calls-to-kube-apiservers) |
| [@Nuckal777](https://github.com/Nuckal777) | `5m` | 🪴 Validate PoC For In-Place Node Updates Of Shoot Clusters | [Summary](https://github.com/gardener-community/hackathon/blob/main/2024-12_Schelklingen/README.md#-validate-poc-for-in-place-node-updates-of-shoot-clusters) |
| [@ialidzhikov](https://github.com/ialidzhikov) | `5m` | 🚀 Prevent `Pod` Scheduling Issues Due To Overscaling | [Summary](https://github.com/gardener-community/hackathon/blob/main/2024-12_Schelklingen/README.md#-prevent-pod-scheduling-issues-due-to-overscaling) |
| [@maboehm](https://github.com/maboehm) | `5m` | 💪🏻 Prevent Multiple `systemd` Unit Restarts On Reconciliation Errors | [Summary](https://github.com/gardener-community/hackathon/blob/main/2024-12_Schelklingen/README.md#-prevent-multiple-systemd-unit-restarts-on-reconciliation-errors) |
| [@rfranzke](https://github.com/rfranzke) | `5m` | 🤹‍♂️ Trigger Nodes Rollout Individually Per Worker Pool During Credentials Rotation | [Summary](https://github.com/gardener-community/hackathon/blob/main/2024-12_Schelklingen/README.md#%EF%B8%8F-trigger-nodes-rollout-individually-per-worker-pool-during-credentials-rotation) |
| [@dergeberl](https://github.com/dergeberl) | `5m` | 🚏 Replace `TopologyAwareHints` with `ServiceTrafficDistribution` | [Summary](https://github.com/gardener-community/hackathon/blob/main/2024-12_Schelklingen/README.md#-replace-topologyawarehints-with-servicetrafficdistribution) |
| [@oliver-goetz](https://github.com/oliver-goetz) | `5m` | ⬆️ Deploy Prow Via Flux | [Summary](https://github.com/gardener-community/hackathon/blob/main/2024-12_Schelklingen/README.md#%EF%B8%8F-deploy-prow-via-flux) |
| [@timebertt](https://github.com/timebertt) | `5m` | ⛓️‍💥 E2E Test Skeleton For Autonomous Shoot Clusters | [Summary](https://github.com/gardener-community/hackathon/blob/main/2024-12_Schelklingen/README.md#%EF%B8%8F-e2e-test-skeleton-for-autonomous-shoot-clusters) |
| [@tobschli](https://github.com/tobschli) | `5m` | 🫄 `cluster-autoscaler`'s `ProvisioningRequest` API | [Summary](https://github.com/gardener-community/hackathon/blob/main/2024-12_Schelklingen/README.md#-cluster-autoscalers-provisioningrequest-api) |
| [@Gerrit91](https://github.com/Gerrit91) | `5m` | 🐢 Cluster API Provider For Gardener | [Summary](https://github.com/gardener-community/hackathon/blob/main/2024-12_Schelklingen/README.md#-cluster-api-provider-for-gardener) |

#### No Demo, But Still Worth Celebrating 🎉

- 🪪 Support More Use-Cases For `TokenRequestor`. [Summary](https://github.com/gardener-community/hackathon/blob/main/2024-12_Schelklingen/README.md#-support-more-use-cases-for-tokenrequestor)
- 👀 Watch `ManagedResource`s In `Shoot` Care Controller. [Summary](https://github.com/gardener-community/hackathon/blob/main/2024-12_Schelklingen/README.md#-watch-managedresources-in-shoot-care-controller)
- 👨🏼‍💻 Make `cluster-autoscaler` Work In Local Setup. [Summary](https://github.com/gardener-community/hackathon/blob/main/2024-12_Schelklingen/README.md#-make-cluster-autoscaler-work-in-local-setup)
- 🧹 Use Structured Authorization In Local KinD Cluster. [Summary](https://github.com/gardener-community/hackathon/blob/main/2024-12_Schelklingen/README.md#-use-structured-authorization-in-local-kind-cluster)
- 🧹 Drop Internal Versions From Component Configuration APIs. [Summary](https://github.com/gardener-community/hackathon/blob/main/2024-12_Schelklingen/README.md#-drop-internal-versions-from-component-configuration-apis)
- 🐛 Fix Non-Functional Shoot Node Logging In Local Setup. [Summary](https://github.com/gardener-community/hackathon/blob/main/2024-12_Schelklingen/README.md#-fix-non-functional-shoot-node-logging-in-local-setup)
- 🧹 No Longer Generate Empty `Secret` For `reconcile` `OperatingSystemConfig`s. [Summary](https://github.com/gardener-community/hackathon/blob/main/2024-12_Schelklingen/README.md#-no-longer-generate-empty-secret-for-reconcile-operatingsystemconfigs)
- 🖥️ Generic Monitoring Extension. [Summary](https://github.com/gardener-community/hackathon/blob/main/2024-12_Schelklingen/README.md#%EF%B8%8F-generic-monitoring-extension)

<hr />

### 2024/11/20 - [v1.108](https://github.com/gardener/gardener/releases/tag/v1.108.0) Release

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@LucaBernstein](https://github.com/LucaBernstein) | `10m` | 🖼️ Custom Machine Images For `NamespacedCloudProfile`s | [#10629](https://github.com/gardener/gardener/pull/10629), [#10811](https://github.com/gardener/gardener/pull/10811) |
| [@dimitar-kostadinov](https://github.com/dimitar-kostadinov) | `5m` | 💳 TLS Between Registry Cache And `containerd` | [#10831](https://github.com/gardener/gardener/pull/10831), [registry-cache#245](https://github.com/gardener/gardener-extension-registry-cache/pull/245) |
| [@unmarshall](https://github.com/unmarshall) | `10m` | 🤖 ETCD Druid `v0.23` | [etcd-druid (release)](https://github.com/gardener/etcd-druid/releases/tag/v0.23.0) |
| [@MartinWeindel](https://github.com/MartinWeindel) | `10m` | 👩‍🌾 Gardener Operator Deploys `BackupBucket`/`DNSRecord` | [#10645](https://github.com/gardener/gardener/pull/10645) |
| [@istvanballok](https://github.com/istvanballok) | `10m` | 🛝 Gardener Demo Playground | [demo (website)](https://demo.gardener.cloud) |

#### No Demo, But Still Worth Celebrating 🎉

- 🐛 [OPERATOR] Fixed an issue that that could occur during control plane migration causing the `core.gardener.cloud/v1beta1.BackupEntry` to be reconciled after it was successfully migrated, but before it was restored. [#10761](https://github.com/gardener/gardener/pull/10761)
- ✨ [USER] The URLs of Shoot `plutono`, `prometheus` and `alertmanager` are now stored as annotations in `<shoot-name>.monitoring` secret in the project namespace. [#10735](https://github.com/gardener/gardener/pull/10735)

<hr />

### 2024/11/06 - [v1.107](https://github.com/gardener/gardener/releases/tag/v1.107.0) Release

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@timuthy](https://github.com/timuthy) | `10m` | 🪪 Structured Authorization Configuration | [#10682](https://github.com/gardener/gardener/pull/10682) |
| [@tobschli](https://github.com/tobschli) | `10m` | ⛔ Shoot Access Restrictions | [#10654](https://github.com/gardener/gardener/pull/10654) |
| [@petersutter](https://github.com/petersutter) | `5m` |  🕹 Recent Gardener Dashboard Features | [1.78.0](https://github.com/gardener/dashboard/releases/tag/1.78.0) |

#### No Demo, But Still Worth Celebrating 🎉

- ✨ [OPERATOR] A new required controller was added to gardener-operator. It maintains the RequiredRuntime condition for Extension resources to indicate that the extension deployment is required in the Garden-Runtime cluster. [#10650](https://github.com/gardener/gardener/pull/10650)
- ✨ [USER] Gardener reports the cluster's egress CIDRs in Shoot.status.networking.egressCIDRs if supported by the used provider extension. [#10240](https://github.com/gardener/gardener/pull/10240)
- 🪓 [OPERATOR] The gardener/controlplane Helm chart has been deprecated and will be removed after v1.135 has been released (around beginning of 2026). We urge you to switch to a gardener-operator-based installation. Read all about it here. [#10706](https://github.com/gardener/gardener/pull/10706)

<hr />

### 2024/10/23 - [v1.106](https://github.com/gardener/gardener/releases/tag/v1.106.0) Release

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@plkokanov](https://github.com/plkokanov) | `5m` | 🫐 `vpa-recommender` Metrics Collection | [#10517](https://github.com/gardener/gardener/pull/10517) |
| [@grolu](https://github.com/grolu) | `5m` | 📊 Dashboard Adaptations In `gardener-operator` | [#10572](https://github.com/gardener/gardener/pull/10572) |
| [@andrerun](https://github.com/andrerun) | `5m` | 📖 GEP-29: Autoscaling Storage Volumes | [#10690](https://github.com/gardener/gardener/pull/10690) |
| [@DockToFuture](https://github.com/DockToFuture), [@axel7born](https://github.com/axel7born) | `10m` | 🛜 IPv6 Shoot Clusters on AWS | [provider-aws#1024](https://github.com/gardener/gardener-extension-provider-aws/pull/1024) |
| [@ary1992](https://github.com/ary1992) | `5m` | 🎮 `k8s.io/*` + `controller-runtime` Upgrades | [#10459](https://github.com/gardener/gardener/pull/10459) |
| [@ialidzhikov](https://github.com/ialidzhikov) | `10m` | ⎈ Kubernetes 1.31 Support | [#10472](https://github.com/gardener/gardener/pull/10472) |

#### No Demo, But Still Worth Celebrating 🎉

- 🪓 [OPERATOR] The `HVPA` and `HVPAForShootedSeed` feature gates have been deprecated and locked to false. Disable the `HVPA` and `HVPAForShootedSeed` feature gates if you have them enabled before upgrading to this version of Gardener. [#10659](https://github.com/gardener/gardener/pull/10659)
- ✨ [OPERATOR] Gardener generated certificates are valid `1 minute` before issuance to handle some amount of clock skew. [#10603](https://github.com/gardener/gardener/pull/10603)
- ✨ [DEVELOPER] Allow `gosec` to be consumed from `gardener/gardener`. [#10642](https://github.com/gardener/gardener/pull/10642)

<hr />

### 2024/10/16 - [ApeiroRA](https://apeirora.eu/) Special Edition & [v1.105](https://github.com/gardener/gardener/releases/tag/v1.105.0) Release

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@mkorbi](https://github.com/mkorbi), [@phyrog](https://github.com/phyrog) | `25m` | 🌲 CO2/Green Monitoring Via [Kubecost](https://www.kubecost.com/) | [extension-shoot-kubecost (repo)](https://github.com/Liquid-Reply/gardener-extension-shoot-kubecost), [extension-shoot-kepler (repo)](https://github.com/Liquid-Reply/gardener-extension-shoot-kepler) |
| [@rfranzke](https://github.com/rfranzke) | `5m` | 🎱 Support For 80+ Worker Pools | [#10542](https://github.com/gardener/gardener/pull/10542) |
| [@oliver-goetz](https://github.com/oliver-goetz) | `10m` | 👨🏻‍🌾 `gardener-operator` Deploys `Extension` Resources | [#10518](https://github.com/gardener/gardener/pull/10518) |

#### No Demo, But Still Worth Celebrating 🎉

- 🐛 [OPERATOR] When checking whether a `Deployment` rollout is complete, stale `Pod`s are now ignored and no longer counted. [#10548](https://github.com/gardener/gardener/pull/10548)
- ✨ [OPERATOR] `gardenlet` now performs garbage collection of stale `Pod`s in all namespaces (except `kube-system`) in the seed cluster. [#10548](https://github.com/gardener/gardener/pull/10548)
- ✨ [OPERATOR] The `TopologySpreadConstraint` calculation was improved for workload spread across multiple zones. This especially leads to a more balanced distribution of `kube-apiserver` and `istio` replicas in seed clusters. [#10608](https://github.com/gardener/gardener/pull/10608)

<hr />

### 2024/09/25 - [v1.104](https://github.com/gardener/gardener/releases/tag/v1.104.0) Release

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@LucaBernstein](https://github.com/LucaBernstein) | `5m` | 🪪 Custom RBAC Verbs For `NamespacedCloudProfile`s | [#10485](https://github.com/gardener/gardener/pull/10485) |
| [@dimityrmirchev](https://github.com/dimityrmirchev) | `5m` | ➡️ Migrating From `SecretBinding` to `CredentialsBinding` | [#10365](https://github.com/gardener/gardener/pull/10365) |
| [@ScheererJ](https://github.com/ScheererJ) | `10m` | 🐹 Golang-Based VPN Implementation | [#9774](https://github.com/gardener/gardener/pull/9774) |
| [@ScheererJ](https://github.com/ScheererJ) | `5m` | 📖 GEP-28: Autonomous Shoot Clusters | [#10536](https://github.com/gardener/gardener/pull/10536) |

#### No Demo, But Still Worth Celebrating 🎉

- ✨ [OPERATOR] The `gardener-operator` metrics are now automatically scraped by the `garden` Prometheus. [#10464](https://github.com/gardener/gardener/pull/10464)
- ✨ [OPERATOR] Alerts based on the `proposals_failed_total` metric of the `etcd` cluster are not raised anymore. [#10524](https://github.com/gardener/gardener/pull/10524)

<hr />

### 2024/09/11 - [v1.103](https://github.com/gardener/gardener/releases/tag/v1.103.0) Release

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@dimityrmirchev](https://github.com/dimityrmirchev) | `10m` | 🔑 Token Requestor Controller For `WorkloadIdentity`s | [#10298](https://github.com/gardener/gardener/pull/10298) |
| [@LucaBernstein](https://github.com/LucaBernstein) | `5m` | ⚙️ New API: `NamespacedCloudProfile` | [#10266](https://github.com/gardener/gardener/pull/10266) |
| [@timuthy](https://github.com/timuthy) | `10m` | 👨🏻‍🌾 `gardener-operator` Deploys Extension Admission Components | [#10277](https://github.com/gardener/gardener/pull/10277) |

#### No Demo, But Still Worth Celebrating 🎉

- ✨ [OPERATOR] `kube-proxy` now has a readiness probe so that a `Node` will only become ready for workloads after `kube-proxy` was ready at least once. [#10407](https://github.com/gardener/gardener/pull/10407)
- ✨ [OPERATOR] Host spread for shoots with failure tolerance `node` (`.spec.controlPlane.highAvailability.failureTolerance.type`) is now accomplished via `minDomains`. Earlier, this happened at a best effort basis only. If a seed was having less than 3 nodes at the time the control-plane pods were scheduled, the desired pod distribution was not possible. [#10400](https://github.com/gardener/gardener/pull/10400)

<hr />

### 2024/08/28 - [v1.102](https://github.com/gardener/gardener/releases/tag/v1.102.0) Release

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@AleksandarSavchev](https://github.com/AleksandarSavchev) | `10m` | 🪪 Structured Authentication For `Shoot` and `Garden` | [#10244](https://github.com/gardener/gardener/pull/10244) |
| [@ialidzhikov](https://github.com/ialidzhikov) | `5m` | ⚙️ VPA Recommender Configurability | [#10221](https://github.com/gardener/gardener/pull/10221) |
| [@plkokanov](https://github.com/plkokanov) | `10m` | 🕴️ Cross-Provider Control Plane Migration | [#10323](https://github.com/gardener/gardener/pull/10323) |
| [@vicwicker](https://github.com/vicwicker) | `10m` | 📊 Migrate VPA Metrics To `CustomResourceState` Metrics | [#9941](https://github.com/gardener/gardener/pull/9941) |

#### No Demo, But Still Worth Celebrating 🎉

- 🪓 [OPERATOR] When the `NewWorkerPoolHash` feature gate is enabled, the calculation now also rolls worker nodes of `Shoot`s when changing `systemReserved` in the `kubelet` configuration. Worker pools are not rolled if the sum of `kubeReserved` and `systemReserved` does not change. [...] [#10290](https://github.com/gardener/gardener/pull/10290)
- 🐛 [USER] Fixes a bug preventing shoot clusters with annotation `shoot.gardener.cloud/skip-readiness: "true"` to be created. [#10317](https://github.com/gardener/gardener/pull/10317)
- ✨ [OPERATOR] The `.spec.deployment.vpa` field in the `seedmanagement.gardener.cloud/v1alpha1.{Gardenlet,ManagedSeed}` APIs is deprecated and has no effect anymore. It will be removed in a future version. Now, gardenlet deploys its own VPA as part of the `Seed` reconciliation (after it ensured the VPA CRD exists). [#10299](https://github.com/gardener/gardener/pull/10299)
- 📖 [DEVELOPER] [This document](https://github.com/gardener/gardener/blob/master/docs/development/process.md) now contains a guide for developers how to handle deprecations and backwards-compatibility of changes. [#10294](https://github.com/gardener/gardener/pull/10294)

<hr />

### 2024/08/14 - [v1.101](https://github.com/gardener/gardener/releases/tag/v1.101.0) Release

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@vpnachev](https://github.com/vpnachev) | `10m` | 🔑 `token` Subresource For `WorkloadIdentity` API | [#10042](https://github.com/gardener/gardener/pull/10042) |
| [@nkraetzschmar](https://github.com/nkraetzschmar) | `5m` | 🐧 Secure Boot On Gardenlinux | [gardenlinux#2237](https://github.com/gardenlinux/gardenlinux/pull/2237) |
| [@rfranzke](https://github.com/rfranzke) | `10m` | 🪴 `gardenlet` Management Via `gardener-operator` | [#10161](https://github.com/gardener/gardener/pull/10161), [#10218](https://github.com/gardener/gardener/pull/10218) |
| [@timuthy](https://github.com/timuthy) | `10m` | 🪞 Registry Mirror Management Via `OperatingSystemConfig` | [#10050](https://github.com/gardener/gardener/pull/10050), [#10167](https://github.com/gardener/gardener/pull/10167) |

#### No Demo, But Still Worth Celebrating 🎉

- 🪓 [DEVELOPER] The IPv4 addresses for the local Gardener setup was changed from `127.0.0.x` to `172.18.255.x` (default `kind` subnet) to resolve an issue on developer machines which can't use additional IP addressed from the `127.0.0.0/8` space. [...] [#10019](https://github.com/gardener/gardener/pull/10019)
- 🪓 [DEVELOPER] The legacy method of providing monitoring configuration via `ConfigMap`s labeled with `extensions.gardener.cloud/configuration=monitoring` has been removed. See this instead. [#10220](https://github.com/gardener/gardener/pull/10220)
- 🐛 [OPERATOR] Fixed a bug in the `vpa-eviction-requirements` controller causing `etcd`s to be evicted for downscaling outside of their maintenance window. [#10202](https://github.com/gardener/gardener/pull/10202)

<hr />

### 2024/07/31 - [v1.100](https://github.com/gardener/gardener/releases/tag/v1.100.0) Release

#### Demo Agenda 📋

_No topics available for presentation, hence, meeting was canceled._

#### No Demo, But Still Worth Celebrating 🎉

- 🐛 [USER] A bug causing `sshd` running in cluster pods to receive a `SIGTERM` when `SSHAccess` for worker nodes is disabled is now fixed. [#10123](https://github.com/gardener/gardener/pull/10123)
- ✨ [USER] Added document in which we share our pod autoscaling best practices with end users. [#10083](https://github.com/gardener/gardener/pull/10083)
- ✨ [OPERATOR] Scrape vpa-admission-controller metrics with prometheus. [#10033](https://github.com/gardener/gardener/pull/10033)

<hr />

### 2024/07/24 - [v1.99](https://github.com/gardener/gardener/releases/tag/v1.99.0) Release

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@ScheererJ](https://github.com/ScheererJ) | `10m` | 📡 Network Range Propagation From Extensions | [#9998](https://github.com/gardener/gardener/pull/9998) |
| [@MartinWeindel](https://github.com/MartinWeindel) | `5m` | 👨🏻‍🌾 `gardener-operator` Manages [Cert Management](https://github.com/gardener/cert-management) | [#9957](https://github.com/gardener/gardener/pull/9957) |

#### No Demo, But Still Worth Celebrating 🎉

- 🐛 [USER] Erroneous warnings for incomplete shoots credentials rotation has been fixed. [#10059](https://github.com/gardener/gardener/pull/10059)

<hr />

### 2024/07/17 - [v1.98](https://github.com/gardener/gardener/releases/tag/v1.98.0) Release

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@LucaBernstein](https://github.com/LucaBernstein) | `5m` | 🥅 Object Selector For Extension Webhooks | [#9981](https://github.com/gardener/gardener/pull/9981), [#10026](https://github.com/gardener/gardener/pull/10026) |
| [@MichaelEischer](https://github.com/MichaelEischer) | `10m` | 🔄 New Worker Pool Hash Calculation For Rolling Updates | [#9865](https://github.com/gardener/gardener/pull/9865) |
| [@dimityrmirchev](https://github.com/dimityrmirchev) | `5m` | 🪢 `CredentialsBinding`: Successor Of `SecretBinding` | [#9853](https://github.com/gardener/gardener/pull/9853) |
| [@istvanballok](https://github.com/istvanballok) | `10m` | 🪜 Renovated Remote Local Setup | [#9980](https://github.com/gardener/gardener/pull/9980) |
| [@oliver-goetz](https://github.com/oliver-goetz) | `5m` | 🚔 Introduce `gosec` For Static Application Security Testing (SAST) | [#9959](https://github.com/gardener/gardener/pull/9959) |

#### No Demo, But Still Worth Celebrating 🎉

- 🪓 [OPERATOR] The [Resource Size Validator](https://github.com/gardener/gardener/blob/master/docs/concepts/admission-controller.md) of the `gardener-admission-controller` ignores `status` subresource and `metadata.managedFields` for resource size limits. [...] [#10011](https://github.com/gardener/gardener/pull/10011)
- 🪓 [DEPENDENCY] The `extensions/pkg/webhook/cloudprovider.Args#EnableObjectSelector` field is now removed. The corresponding webhook's object selector is now enforced unconditionally. [#10027](https://github.com/gardener/gardener/pull/10027)
- ✨ [OPERATOR] `kube-apiserver` HPA's max replicas count from 3 to 6 in `VPAAndHPA` autoscaling mode to support very large control planes. [#9971](https://github.com/gardener/gardener/pull/9971)
- ✨ [OPERATOR] The `data` in `ManagedResource` secrets is now compressed with Brotli and stored under a single data key `data.yaml.br`. [#9964](https://github.com/gardener/gardener/pull/9964)

<hr />

### 2024/06/19 - [v1.97](https://github.com/gardener/gardener/releases/tag/v1.97.0) Release

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@timuthy](https://github.com/timuthy) | `5m` | 🚫 Register `Node` Tains With Kubelet | [#9872](https://github.com/gardener/gardener/pull/9872) |
| [@acumino](https://github.com/acumino) | `5m` | 🧰 Update Shoot Maintenance State If Last Maintenance Failed | [#9945](https://github.com/gardener/gardener/pull/9945) |

#### No Demo, But Still Worth Celebrating 🎉

- ✨ [DEVELOPER] `gardener-operator` local development setup supports creating seeds, shoots and managed-seeds now. [#9763](https://github.com/gardener/gardener/pull/9763)
- ✨ [OPERATOR] `gardenlet` is now capable of keeping itself updated by pulling configuration and deployment values from the garden cluster. [#9874](https://github.com/gardener/gardener/pull/9874)
- 🐛 [OPERATOR] Fix a regression where `etcd` alerts for the virtual Garden cluster did not work. [#9973](https://github.com/gardener/gardener/pull/9973)
- 🪓 [DEVELOPER] The deprecated fields `.spec.{reloadConfigFilePath,command}` and `.status.{units,files}` have been removed from the `extensions.gardener.cloud/v1alpha1.OperatingSystemConfig` API. [#9885](https://github.com/gardener/gardener/pull/9885)

<hr />

### 2024/06/05 - [v1.96](https://github.com/gardener/gardener/releases/tag/v1.96.0) Release

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@ScheererJ](https://github.com/ScheererJ) | `10m` | 📢 Proxy  Protocol Termination On Load Balancers In `Seed`s | [#9844](https://github.com/gardener/gardener/pull/9844) |
| [@MichaelEischer](https://github.com/MichaelEischer) | `5m` | 📋 Improved `OperatingSystemConfig` Rollout Check For `Node`s | [#9757](https://github.com/gardener/gardener/pull/9757) |
| [@MartinWeindel](https://github.com/MartinWeindel) | `5m` | 🔄 [Secrets Manager](https://github.com/gardener/gardener/blob/master/docs/development/secrets_management.md): Configurable Validity Percentage For Auto-Renewal | [#9819](https://github.com/gardener/gardener/pull/9819) |
| [@dimityrmirchev](https://github.com/dimityrmirchev) | `10m` | 👨🏻‍🌾 `gardener-operator` Manages [Discovery Server](https://github.com/gardener/gardener-discovery-server) | [#9746](https://github.com/gardener/gardener/pull/9746) |
| [@marwinski](https://github.com/marwinski) | `10m` | 👮 GEP-27: [Falco Extension](https://github.com/gardener/gardener-extension-shoot-falco-service) | [#9845](https://github.com/gardener/gardener/pull/9845) |

#### No Demo, But Still Worth Celebrating 🎉

- 🪓 [DEVELOPER] The `allow-shoot-networks` `NetworkPolicy` has been dropped entirely, hence, the `networking.gardener.cloud/to-shoot-networks=allowed` label has no effect anymore and should be removed. [#9752](https://github.com/gardener/gardener/pull/9752)
- 🪓 [DEPENDENCY] The `extensions/pkg/webhook/controlplane/genericmutator.Ensurer#EnsureKubeAPIServerService` func is removed. This func was used before the introduction of `ManagedIstio`/`APIServerSNI` (when the `kube-apiserver` `Service` was of type `LoadBalancer`) to set cloud provider specific annotations to the `Service`. [...] [#9770](https://github.com/gardener/gardener/pull/9770)
- ✨ [OPERATOR] A new `core.gardener.cloud/v1` API version is introduced which only includes the `ControllerDeployment` resource for now. The new version of the `ControllerDeployment` drops the type and `providerConfig` fields in favor of a well-structured section for helm-based `ControllerDeployments`. [#9771](https://github.com/gardener/gardener/pull/9771)
- ✨ [OPERATOR] It is now possible to specify an OCI repository in `ControllerDeployment`s describing from where the Helm chart can be pulled (instead of specifying a `base64`-encoded chart in the specification). [#9823](https://github.com/gardener/gardener/pull/9823), [Summary](https://github.com/gardener-community/hackathon/blob/main/2024-05_Schelklingen/README.md#%EF%B8%8F-oci-helm-release-reference-for-controllerdeployments)

<hr />

### 2024/05/29 - [v1.95](https://github.com/gardener/gardener/releases/tag/v1.95.0) Release

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@shafeeqes](https://github.com/shafeeqes) | `5m` | ⎈ Kubernetes 1.30 Support | [#9508](https://github.com/gardener/gardener/pull/9508) |
| [@ialidzhikov](https://github.com/ialidzhikov) | `10m` | 🚀 VPA- and HPA-Based Autoscaling For `kube-apiserver` | [#9678](https://github.com/gardener/gardener/pull/9678) |
| [@rfranzke](https://github.com/rfranzke) | `10m` | 👀 Four-Eyes Approval Concept For `Shoot` Deletion | [#9680](https://github.com/gardener/gardener/pull/9680) |
| [@ScheererJ](https://github.com/ScheererJ) | `5m` | 🧪 IPv6-Only E2E Tests In Prow | [#9693](https://github.com/gardener/gardener/pull/9693) |

#### No Demo, But Still Worth Celebrating 🎉

- ❗️ [DEVELOPER] The legacy method for extensions to provide observability configuration for shoot clusters (via `ConfigMap`s labelled with `extensions.gardener.cloud/configuration=monitoring`) is deprecated and will be removed in a future release. Please refer to [this document](https://github.com/gardener/gardener/blob/master/docs/extensions/logging-and-monitoring.md#extensions-monitoring-integration) to get information about the new, recommended way, and start migrating to it. [#9695](https://github.com/gardener/gardener/pull/9695)
- ❗️ [DEVELOPER] The `extensions.gardener.cloud/v1alpha1.Worker` resource now has a new `.spec.pools[].userDataSecretRef` field which references a `Secret` containing the actual user data. The `.spec.pools[].userData` field is deprecated and will be removed in a future version. [...] [#9722](https://github.com/gardener/gardener/pull/9722)
- 🐛 [USER] A bug has has been fixed which caused unneeded `gardener-node-agent` reconciliations after each `Shoot` reconciliation even if the underlying `OperatingSystemConfig` did not contain relevant changes. [#9723](https://github.com/gardener/gardener/pull/9723)

<hr />

### 2024/05/22 - [Hack The Garden](https://github.com/gardener-community/hackathon/blob/main/2024-05_Schelklingen/README.md) Wrap Up

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@maboehm](https://github.com/maboehm) | `5m` | 🗃️ OCI Helm Release Reference For `ControllerDeployment`s | [Summary](https://github.com/gardener-community/hackathon/blob/main/2024-05_Schelklingen/README.md#%EF%B8%8F-oci-helm-release-reference-for-controllerdeployments) |
| [@oliver-goetz](https://github.com/oliver-goetz) | `5m` | 👨🏼‍💻 `gardener-operator` Local Development Setup With `gardenlet`s | [Summary](https://github.com/gardener-community/hackathon/blob/main/2024-05_Schelklingen/README.md#-gardener-operator-local-development-setup-with-gardenlets) |
| [@kon-angelo](https://github.com/kon-angelo) | `5m` | 👨🏻‍🌾 Extensions For Garden Cluster Via `gardener-operator` | [Summary](https://github.com/gardener-community/hackathon/blob/main/2024-05_Schelklingen/README.md#-extensions-for-garden-cluster-via-gardener-operator) |
| [@rfranzke](https://github.com/rfranzke) | `5m` | 🪄 Gardenlet Self-Upgrades For Unmanaged `Seed`s | [Summary](https://github.com/gardener-community/hackathon/blob/main/2024-05_Schelklingen/README.md#-gardenlet-self-upgrades-for-unmanaged-seeds) |
| [@Gerrit91](https://github.com/Gerrit91) | `5m` | 🦺 Type-Safe Configurability in `OperatingSystemConfig` For `containerd`, DNS, NTP, etc. | [Summary](https://github.com/gardener-community/hackathon/blob/main/2024-05_Schelklingen/README.md#-type-safe-configurability-in-operatingsystemconfig-for-containerd-dns-ntp-etc) |
| [@majst01](https://github.com/majst01) | `5m` | 👮 Expose Shoot API Server In [Tailscale](https://tailscale.com/) VPN | [Summary](https://github.com/gardener-community/hackathon/blob/main/2024-05_Schelklingen/README.md#-expose-shoot-api-server-in-tailscale-vpn) |
| [@hown3d](https://github.com/hown3d) | `5m` | ⌨️ Rewrite [gardener/vpn2](https://github.com/gardener/vpn2) From Bash To Golang | [Summary](https://github.com/gardener-community/hackathon/blob/main/2024-05_Schelklingen/README.md#%EF%B8%8F-rewrite-gardenervpn2-from-bash-to-golang) |
| [@ScheererJ](https://github.com/ScheererJ) | `5m` | 🕳️ Pure IPv6-Based VPN Tunnel | [Summary](https://github.com/gardener-community/hackathon/blob/main/2024-05_Schelklingen/README.md#%EF%B8%8F-pure-ipv6-based-vpn-tunnel) |
| [@timebertt](https://github.com/timebertt) | `5m` | 👐 Harmonize Local VPN Setup With Real-World Scenario | [Summary](https://github.com/gardener-community/hackathon/blob/main/2024-05_Schelklingen/README.md#-harmonize-local-vpn-setup-with-real-world-scenario) |
| [@timuthy](https://github.com/timuthy) | `5m` | 🍞 Compression For `ManagedResource` `Secret`s | [Summary](https://github.com/gardener-community/hackathon/blob/main/2024-05_Schelklingen/README.md#-compression-for-managedresource-secrets) |
| [@afritzler](https://github.com/afritzler) | `5m` | 🚛 Making [Shoot Flux Extension](https://github.com/stackitcloud/gardener-extension-shoot-flux) Production-Ready | [Summary](https://github.com/gardener-community/hackathon/blob/main/2024-05_Schelklingen/README.md#-making-shoot-flux-extension-production-ready) |

#### No Demo, But Still Worth Celebrating 🎉

- ✨ An approach for supporting Cilium `v1.15+` for highly-available `Shoot`s has been developed. [Summary](https://github.com/gardener-community/hackathon/blob/main/2024-05_Schelklingen/README.md#-support-cilium-v115-for-ha-shoots)
- ✨ The contents of the `machine-controller-manager-provider-local` repository have been merged into the `gardener` repository to improve development productivity. [Summary](https://github.com/gardener-community/hackathon/blob/main/2024-05_Schelklingen/README.md#-move-machine-contoller-manager-provider-local-repository-into-gardenergardener)
- ✨ The `vendor` folder is going to be removed from OS extensions. [Summary](https://github.com/gardener-community/hackathon/blob/main/2024-05_Schelklingen/README.md#%EF%B8%8F-stop-vendoring-third-party-code-in-os-extensions)
- ✨ Embedded files are now considered for local image builds with Skaffold. [Summary](https://github.com/gardener-community/hackathon/blob/main/2024-05_Schelklingen/README.md#-consider-embedded-files-for-local-image-builds)

<hr />

### 2024/05/08 - [v1.94](https://github.com/gardener/gardener/releases/tag/v1.94.0) Release

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@voelzmo](https://github.com/voelzmo) | `10m` | 🚀 VPA For ETCD Autoscaling | [#8984](https://github.com/gardener/gardener/pull/8984) |
| [@oliver-goetz](https://github.com/oliver-goetz) | `5m` | 🔎 Worker Node Count Validation | [#9599](https://github.com/gardener/gardener/pull/9599) |
| [@rfranzke](https://github.com/rfranzke) | `10m` | 📊 Dynamic Plutono Dashboard Reconciliation | [#9624](https://github.com/gardener/gardener/pull/9624) |
| [@petersutter](https://github.com/petersutter) | `10m` | 🎮 `gardener-operator` Manages Dashboard + Web Terminal Controller | [#9583](https://github.com/gardener/gardener/pull/9583), [#9646](https://github.com/gardener/gardener/pull/9646) |

#### No Demo, But Still Worth Celebrating 🎉

- ❗️ [OPERATOR] Five minutes Infrastructure Cleanup Wait Period during shoot deletion was removed. Shoot annotation `shoot.gardener.cloud/infrastructure-cleanup-wait-period-seconds` which could be used to configure this period was removed, too. [#9632](https://github.com/gardener/gardener/pull/9632)
- ✨ [OPERATOR] `gardener-node-agent` no longer watches all `Node`s in the cluster but restricts to only the `Node` it is responsible for (with the help of label/field selectors). This should lead to a significant reduction of network I/O, especially for shoot clusters with many nodes. [#9672](https://github.com/gardener/gardener/pull/9672)
- 🐛 [OPERATOR] `gardener-operator` is now capable of reconciling shoot cluster-specific `NetworkPolicy`s in case the garden cluster is a seed cluster at the same time. [#9658](https://github.com/gardener/gardener/pull/9658)

<hr />

### 2024/04/24 - [v1.93](https://github.com/gardener/gardener/releases/tag/v1.93.0) Release

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@maboehm](https://github.com/maboehm) | `10m` | 🔄 New `AfterWorker` Extension Lifecycle Strategy | [#9472](https://github.com/gardener/gardener/pull/9472) |
| [@MichaelEischer](https://github.com/MichaelEischer) | `10m` | 🏨 Machine Type Dependent Resource Reservations | [#9449](https://github.com/gardener/gardener/pull/9449) |
| [@rfranzke](https://github.com/rfranzke) | `5m` | 🔎 Garden Prometheis Managed By `prometheus-operator` | [#9543](https://github.com/gardener/gardener/pull/9543), [#9606](https://github.com/gardener/gardener/pull/9606) |
| [@oliver-goetz](https://github.com/oliver-goetz) | `10m` | 🐛 Fix Kubelet Data Volume Usage | [#9609](https://github.com/gardener/gardener/pull/9609) |

#### No Demo, But Still Worth Celebrating 🎉

- ❗️ [OPERATOR] Set `kube-apiserver` `maxReplicas=3` for all Shoots that are not annotated with `alpha.control-plane.scaling.shoot.gardener.cloud/scale-down-disabled=true`. [#9605](https://github.com/gardener/gardener/pull/9605)
- ✨ [OPERATOR] A new gardenlet feature gate called `ShootManagedIssuer` was introduced. This feature gate guards the functionality described in GEP-24 until all of the components mentioned in the enhancement proposal are implemented by Gardener. [#9489](https://github.com/gardener/gardener/pull/9489)
- 🐛 [OPERATOR] Istio-ingress gateway dashboard now shows the correct sent tcp traffic metric and the correct memory usage. [#9596](https://github.com/gardener/gardener/pull/9596)

<hr />

### 2024/04/10 - [v1.92](https://github.com/gardener/gardener/releases/tag/v1.92.0) Release

#### Demo Agenda 📋

_No topics available for presentation, hence, meeting was canceled._

#### No Demo, But Still Worth Celebrating 🎉

- 🪓 [OPERATOR] The graduated `UseGardenerNodeAgent` feature gate has been dropped. [...]. [#9477](https://github.com/gardener/gardener/pull/9477)
- 🪓 [DEVELOPER] The deprecated oscommon package has been removed. [#9477](https://github.com/gardener/gardener/pull/9477)
- ✨ [OPERATOR] Secret `openvpn-diffie-hellman-key` in the `garden` namespace containing the Diffie-Hellmann key can be deleted from landscapes as it is no longer needed. [#9386](https://github.com/gardener/gardener/pull/9386)
- ✨ [DEVELOPER] A new extension lifecycle strategy `reconcile: AfterWorker` is now available for Extensions to use in their `ControllerRegistration`. [#9472](https://github.com/gardener/gardener/pull/9472)

<hr />

### 2024/03/27 - [v1.91](https://github.com/gardener/gardener/releases/tag/v1.91.0) Release

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@rfranzke](https://github.com/rfranzke) | `5m` | 🚨 Alertmanager For Garden Clusters | [#9301](https://github.com/gardener/gardener/pull/9301), [#9065 (issue)](https://github.com/gardener/gardener/issues/9065) |
| [@rfranzke](https://github.com/rfranzke) | `5m` | 🐶 Health Checks For Dependency Watchdog Actions | [#9376](https://github.com/gardener/gardener/pull/9376) |
| [@ScheererJ](https://github.com/ScheererJ) | `10m` | 🚦 Replace `kube-apiserver` `Ingress` Resources With `Istio` Exposure | [#9300](https://github.com/gardener/gardener/pull/9300) |
| [@shafeeqes](https://github.com/shafeeqes) | `5m` | 🧽 Force Kubernetes Upgrade Removes Unsupported Feature Gates + Admission Plugins | [#9365](https://github.com/gardener/gardener/pull/9365) |
| [@dimityrmirchev](https://github.com/dimityrmirchev) | `10m` | 🎫 Managed Shoot OIDC Issuer | [#9196](https://github.com/gardener/gardener/pull/9196), [#9354](https://github.com/gardener/gardener/pull/9354), [#9157 (issue)](https://github.com/gardener/gardener/issues/9157) |

#### No Demo, But Still Worth Celebrating 🎉

- ✨ [OPERATOR] Operators can create duplicate istio ingress gateways for migration if the zone names should be changed in the `Seed` specification. [#9304](https://github.com/gardener/gardener/pull/9304)
- ✨ [DEVELOPER] The `{garden,seed,shoot}-care` controllers now incorporate `ManagedResources` into all relevant conditions, and it is possible to override the condition type into which a `ManagedResource`'s status gets incorporated via the `care.gardener.cloud/condition-type label`. [...] [#9313](https://github.com/gardener/gardener/pull/9313)

<hr />

### 2024/03/13 - [v1.90](https://github.com/gardener/gardener/releases/tag/v1.90.0) Release

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@rishabh-11](https://github.com/rishabh-11) | `10m` | 🐶 Dependency Watchdog Considers Node `Lease`s | [dependency-watchdog#94](https://github.com/gardener/dependency-watchdog/pull/94), [#9072](https://github.com/gardener/gardener/pull/9072) |
| [@ScheererJ](https://github.com/ScheererJ) | `5m` | 🌏 Add IP Stack To `DNSRecord`s | [#9289](https://github.com/gardener/gardener/pull/9289) |
| [@kon-angelo](https://github.com/kon-angelo) | `10m` | 🗃️ AWS ECR Credentials Provider For Kubelet | [provider-aws#854](https://github.com/gardener/gardener-extension-provider-aws/pull/854) |
| [@rfranzke](https://github.com/rfranzke) | `5m` | 🩺 Health Checks For `VerticalPodAutoscaler`s | [#9211](https://github.com/gardener/gardener/pull/9211) |
| [@oliver-goetz](https://github.com/oliver-goetz) | `10m` | 🤖 Renovate Bot | [ci-infra#1163](https://github.com/gardener/ci-infra/pull/1163), [#9197](https://github.com/gardener/gardener/pull/9197) |

#### No Demo, But Still Worth Celebrating 🎉

- 🪓 [OPERATOR] ⚠️ Gardener does no longer support garden, seed, or shoot clusters with Kubernetes versions `== 1.24`. Make sure to upgrade all existing clusters before upgrading to this Gardener version. [#8989](https://github.com/gardener/gardener/pull/8989)
- 🐛 [DEPENDENCY] An issue was fixed that sometimes led to leaked `extension-controlplane-shoot-webhooks` which blocked the shoot deletion. [#9209](https://github.com/gardener/gardener/pull/9209)
- ✨ [OPERATOR] The `UseGardenerNodeAgent` feature gate has been promoted to GA. It was already enabled by default and can now no longer be turned off. The feature gate will be removed in a future release. [#9208](https://github.com/gardener/gardener/pull/9208)

<hr />

### 2024/02/28 - [v1.89](https://github.com/gardener/gardener/releases/tag/v1.89.0) Release

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@ScheererJ](https://github.com/ScheererJ) | `10m` | ⚖️ Drop `nginx-ingress` Load Balancer In Favor Of `Istio` | [#9038](https://github.com/gardener/gardener/pull/9038) |
| [@shafeeqes](https://github.com/shafeeqes) | `5m` | ⎈ Skip Minor Kubernetes Version Upgrades | [#9185](https://github.com/gardener/gardener/pull/9185) |
| [@rfranzke](https://github.com/rfranzke) | `10m` | 🔎 Seed Prometheis Managed By `prometheus-operator` | [#9128](https://github.com/gardener/gardener/pull/9128), [#9159](https://github.com/gardener/gardener/pull/9159), [#9200](https://github.com/gardener/gardener/pull/9200), [#9163](https://github.com/gardener/gardener/pull/9163) |
| [@petersutter](https://github.com/petersutter) | `5m` | 📄 Read-Only Kubeconfigs For `Shoot`s in Dashboard and CLI | [dashboard#1711 (issue)](https://github.com/gardener/dashboard/issues/1711) |

#### No Demo, But Still Worth Celebrating 🎉

- ✨ [USER] The shoot cluster CA bundle is now stored in a `ConfigMap` in the project namespace of the garden cluster, in addition to storing it in a `Secret`. This `ConfigMap` shares the same name as the pre-existing Secret, which is `<shoot-name>.ca-cluster`. The `Secret` will be removed in a future Gardener release. [...] [#9123](https://github.com/gardener/gardener/pull/9123)
- ✨ [OPERATOR] The `UseGardenerNodeAgent` feature gate has been promoted to beta and is now turned on by default. [#9161](https://github.com/gardener/gardener/pull/9161)
- ✨ [OPERATOR] Add condition type `ObservabilityComponentsHealthy` for extension health check, it will allow extensions to register with this type. [#9092](https://github.com/gardener/gardener/pull/9092)

<hr />

### 2024/02/14 - [v1.88](https://github.com/gardener/gardener/releases/tag/v1.88.0) Release

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@rfranzke](https://github.com/rfranzke) | `10m` | 🛡️ Additional/Custom RBAC Permissions For Extensions | [#9079](https://github.com/gardener/gardener/pull/9079) |
| [@oliver-goetz](https://github.com/oliver-goetz) | `10m` | 👨🏻‍🌾 `gardener` Linux User On `Shoot` Worker Nodes | [#9077](https://github.com/gardener/gardener/pull/9077) |
| [@tobschli](https://github.com/tobschli) | `5m` | 🩺 `EveryNodeReady` Considers `gardener-node-agent` Health | [#9073](https://github.com/gardener/gardener/pull/9073) |
| [@MartinWeindel](https://github.com/MartinWeindel) | `10m` | ✍🏻 Istio Resources As Source Objects For DNS Records | [external-dns-management#354](https://github.com/gardener/external-dns-management/pull/354) |

#### No Demo, But Still Worth Celebrating 🎉

- 🪓 [OPERATOR] The `docker` CRI is no longer supported for machine images in the `CloudProfile`. Docker CRI was already not supported for `Shoot`s with Kubernetes versions `>= v1.23`, so adding this CRI is a no-op currently. Please remove all the usages of `docker` CRI from your `CloudProfile`s before upgrading to this version. [#9135](https://github.com/gardener/gardener/pull/9135)
- 🐛 [OPERATOR] A bug has been fixed which was preventing `valitail` systemd services on shoot workers from starting when the `UseGardenerNodeAgent` feature gate is enabled. [#9149](https://github.com/gardener/gardener/pull/9149)
- 🐛 [USER] The `kube-apiserver` deployment is annotated to mark the completion of labeling the resources for encrytion so that this step is not repeated in case the "label removal" step fails and resources are partially without the label. [#9147](https://github.com/gardener/gardener/pull/9147)
- ✨ [OPERATOR] `BackupEntry`s and `Shoot`s are now labelled with `seed.gardener.cloud/<seed-name>=true` where `<seed-name>` is the value of `.spec.seedName` or `.status.seedName`. This allows for server-side filtering when watching these resources by leveraging a label selector. [#9089](https://github.com/gardener/gardener/pull/9089)

<hr />

### 2024/01/31 - [v1.87](https://github.com/gardener/gardener/releases/tag/v1.87.0) Release

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@timebertt](https://github.com/timebertt) | `10m` | 🌏 IPv6 Single-Stack In Local Gardener | [#8574](https://github.com/gardener/gardener/pull/8574) |
| [@axel7born](https://github.com/axel7born) | `10m` | 👨🏼‍💻 Local Setup For Dual-Stack Seeds | [#8983](https://github.com/gardener/gardener/pull/8983) |
| [@acumino](https://github.com/acumino) | `5m` | ⎈ Kubernetes 1.29 Support | [#8976](https://github.com/gardener/gardener/pull/8976) |
| [@ScheererJ](https://github.com/ScheererJ) | `10m` | 👨‍👨‍👦 Spread Istio Pods Across Hosts | [#8970](https://github.com/gardener/gardener/pull/8970) |
| [@shafeeqes](https://github.com/shafeeqes) | `10m` | 🔓 Custom Resource Encryption in ETCD | [#8842](https://github.com/gardener/gardener/pull/8842), [#8966](https://github.com/gardener/gardener/pull/8966) |

#### No Demo, But Still Worth Celebrating 🎉

- 🪓 [OPERATOR] The deprecated field `seed.spec.secretRef` has been removed from the `Seed` API. Please check your `Seed`s and remove any usage before upgrading to this Gardener version. [#8896](https://github.com/gardener/gardener/pull/8896)
- 🪓 [OPERATOR] Migration code for Plutono and Vali is now removed. Consider manual cleanup for longterm broken `Shoot`s as described in the PR to avoid leaking Loki's PV. [#8999](https://github.com/gardener/gardener/pull/8999)
- ✨ [OPERATOR] The components managed by gardener now use PDBs with `unhealthyPodEvictionPolicy: AlwaysAllow` for clusters with kubernetes version >= 1.26. [...] [#8969](https://github.com/gardener/gardener/pull/8969)

<hr />

### 2024/01/24 - [v1.86](https://github.com/gardener/gardener/releases/tag/v1.86.0) Release

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@grolu](https://github.com/grolu) | `10m` | 🕹 Recent Gardener Dashboard Features | [dashboard (repo)](https://github.com/gardener/dashboard) |
| [@holgerkoser](https://github.com/holgerkoser) | `10m` | 📈 "All Projects" Dashboard Page Scalability Improvements | [dashboard#1637](https://github.com/gardener/dashboard/pull/1637) |
| [@rfranzke](https://github.com/rfranzke) | `5m` | 📖 Read-Only Kubeconfigs For `Shoot`s | [#8870](https://github.com/gardener/gardener/pull/8870) |
| [@oliver-goetz](https://github.com/oliver-goetz) | `5m` | 💾 Registry Cache For E2E Tests In Prow | [#8880](https://github.com/gardener/gardener/pull/8880) |

#### No Demo, But Still Worth Celebrating 🎉

- 🪓 [DEVELOPER] Support for the deprecated NetworkPolicy annotations `networking.resources.gardener.cloud/from-policy-allowed-ports` and `networking.resources.gardener.cloud/from-policy-pod-label-selector` has been removed. Use `networking.resources.gardener.cloud/from-<some-alias>-allowed-ports` instead (documentation). [#8883](https://github.com/gardener/gardener/pull/8883)
- 🐛 [OPERATOR] A bug causing the `Shoot` to use the wrong istio load balancer if the `ExposureClass` name and the exposureclass handler name are not the same is now fixed. [#8926](https://github.com/gardener/gardener/pull/8926)
- ✨ [OPERATOR] Add `egressCIDRs` field to the `infrastructureStatus` resource. This allows provider-extensions to specify a list of stable CIDRs used as source IP for traffic generated by the shoot's worker nodes. [#8888](https://github.com/gardener/gardener/pull/8888)
