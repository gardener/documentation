---
title: Community
url: /community
---

# Gardener Review Meetings

## What Are the Gardener Review Meetings?

The Gardener Review Meeting is a recurring meeting where we review the latest developments in the Gardener ecosystem. We discuss recent releases, highlight key changes, and showcase live demos of new features and improvements.

This meeting is open to everyone interested in Gardener, from contributors and maintainers to users and community members. We focus on updates relevant to the open-source community while avoiding company-specific details.

## How to Participate

- **Join the Meeting:** Meetings are usually held bi-weekly, typically in the week after a new Gardener version is released. If there are many topics, additional meetings may be scheduled.
- **Present a Topic:** If you would like to showcase a feature, bug fix, or any other relevant topic, reach out to us! Each topic should ideally include a short live demo and last 5-10 minutes.
- **Setup for Demos:** Use a [local](https://gardener.cloud/docs/gardener/deployment/getting_started_locally/#developing-gardener) or [remote](https://gardener.cloud/docs/gardener/deployment/getting_started_locally/#remote-local-setup) setup for your demonstrations if applicable.

📅 **Meeting Invitations:** If you are not already on the invite list and would like to join, message us in our [#gardener](https://kubernetes.slack.com/messages/gardener) Slack channel in the Kubernetes workspace, or get in touch with [@rfranzke (Rafael Franzke)](mailto:rafael.franzke@sap.com).

## Recordings & Public Access

> [!NOTE]
> From 2025 onwards, all meetings are recorded and uploaded publicly to the [Gardener YouTube channel](https://www.youtube.com/@GardenerProject).

If you do not consent to being recorded, please do not enable your microphone or camera, or do not join the meetings.

## Review Meetings in 2025

Below, you’ll find the agendas of past meetings along with links to their recordings. Check back regularly for updates and upcoming topics!

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

## Review Meetings in 2024

<details>
  <summary>Click here to expand the archived overview of the Review Meetings in 2024!</summary>

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

</details>

## Review Meetings in 2023

<details>
  <summary>Click here to expand the archived overview of the Review Meetings in 2023!</summary>

  ### 2023/12/06 - [v1.85](https://github.com/gardener/gardener/releases/tag/v1.85.0) Release

  #### Demo Agenda 📋

  | Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
  | ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
  | [@timuthy](https://github.com/timuthy) | `10m` | 🪪 Auto-Registration + Certificate Management for Extension Admission Webhooks | [#8725](https://github.com/gardener/gardener/pull/8725) |
  | [@acumino](https://github.com/acumino) | `5m` | 🧹 Orphaned `Lease` Garbage Collection | [#8817](https://github.com/gardener/gardener/pull/8817) |
  | [@rfranzke](https://github.com/rfranzke) | `10m` | 🕵️ Introduction Of `gardener-node-agent` | [#8023 (issue)](https://github.com/gardener/gardener/issues/8023) |

  #### No Demo, But Still Worth Celebrating 🎉

  - 🪓 [OPERATOR] All the functionality related to the deprecated field `.spec.secretRef` in `Seed`s has been removed and subsequently `.spec.secretRef` will be dropped from the `Seed` API in a later release of Gardener. Please check your `Seed`s and remove any usage before upgrading to this Gardener version. [#8833](https://github.com/gardener/gardener/pull/8833)
  - ✨ [OPERATOR] The `gardener-resource-manager` deployment procedure was improved. Earlier, GRM was unnecessarily rolled during shoot reconciliation if worker nodes contained custom taints. [#8835](https://github.com/gardener/gardener/pull/8835)

  <hr />

  ### 2023/11/29 - [v1.84](https://github.com/gardener/gardener/releases/tag/v1.84.0) Release

  #### Demo Agenda 📋

  | Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
  | ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
  | [@danielfoehrKn](https://github.com/danielfoehrKn) | `10m` | ⬆️ Machine Image Version Update Strategies | [#8275](https://github.com/gardener/gardener/pull/8275) |
  | [@plkokanov](https://github.com/plkokanov) | `5m` | 🤲🏻 `node-exporter`'s Textfile Collector | [#8721](https://github.com/gardener/gardener/pull/8721) |
  | [@timuthy](https://github.com/timuthy) | `5m` | 🔄 Improved `Shoot` Condition Handling | [#8736](https://github.com/gardener/gardener/pull/8736) |
  | [@shafeeqes](https://github.com/shafeeqes) | `5m` | 🎮 `kube-controller-manager` Controller Enablement Based on APIs | [#8763](https://github.com/gardener/gardener/pull/8763) |
  | [@aaronfern](https://github.com/aaronfern) | `5m` | 🚥 `cluster-autoscaler` Metrics | [#8750](https://github.com/gardener/gardener/pull/8750) |

  #### No Demo, But Still Worth Celebrating 🎉

  - 🪓 [USER] A validation rule was added that forbids changing the primary DNS provider in `.spec.dns.providers` as soon as the `Shoot` was scheduled. [#8761](https://github.com/gardener/gardener/pull/8761)
  - 🪓 [OPERATOR] ⚠️ The deprecated fields `spec.settings.dependencyWatchdog.endpoint` and `spec.settings.dependencyWatchdog.probe` have been removed from the `Seed` API. Please check your `Seed`s and remove any usage before upgrading to this Gardener version. [#8747](https://github.com/gardener/gardener/pull/8747)
  - 🐛 [OPERATOR] During the restore phase of control plane migration, the `machine-controller-manager` is deployed with `0` replicas if it did not exist before or if it existed and was not scaled up yet. This fixes an issue that could cause the `Shoot`'s nodes to get recreated during control plane migration. [#8742](https://github.com/gardener/gardener/pull/8742)
  - ✨ [DEVELOPER] Vendoring has been removed from the project, i.e., there is no `vendor` folder anymore. [#8775](https://github.com/gardener/gardener/pull/8775)

  <hr />

  ### 2023/11/22 - [v1.83](https://github.com/gardener/gardener/releases/tag/v1.83.0) Release

  #### Demo Agenda 📋

  | Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
  | ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
  | [@Kostov6](https://github.com/Kostov6) | `10m` | 🐛 Prevent Unintended `etcd-backup` `Secret` Deletions | [#8709](https://github.com/gardener/gardener/pull/8709) |
  | [@AleksandarSavchev](https://github.com/AleksandarSavchev) | `10m` | 📑 Diki - Gardener Compliance Checker | [diki (repo)](https://github.com/gardener/diki) |
  | [@shafeeqes](https://github.com/shafeeqes) | `5m` | 🔎 API Server Runtime Config Validation | [#8695](https://github.com/gardener/gardener/pull/8695) |
  | [@dimitar-kostadinov](https://github.com/dimitar-kostadinov) | `15m` | 💾 Introduction To `registry-cache` Extension | [registry-cache (repo)](https://github.com/gardener/gardener-extension-registry-cache) |

  #### No Demo, But Still Worth Celebrating 🎉

  - 🐛 [OPERATOR] A bug has been fixed which caused `ServiceAccount`s related to garden access secrets for extensions to leak in the seed namespace in the garden cluster after uninstallation of said extensions. [#8697](https://github.com/gardener/gardener/pull/8697)
  - ✨ [OPERATOR] The `.status.lastOperation` in `core.gardener.cloud/v1beta1.Seed` and `operator.gardener.cloud/v1alpha1.Garden` resources is now only updated each `5s` during a reconciliation. Previously, it was updated immediately when a task was finished. [#8705](https://github.com/gardener/gardener/pull/8705)

  <hr />

  ### 2023/11/15 - [Hack The Garden](https://github.com/gardener-community/hackathon/blob/main/2023-11_Schelklingen/README.md) Wrap Up

  #### Demo Agenda 📋

  | Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
  | ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
  | [@robinschneider](https://github.com/robinschneider) | `5m` | 🏛️ ARM Support For OpenStack Extension | [Summary](https://github.com/gardener-community/hackathon/blob/main/2023-11_Schelklingen/README.md#%EF%B8%8F-arm-support-for-openstack-extension) |
  | [@dergeberl](https://github.com/dergeberl) | `10m` | 🛡️ Make [ACL Extension](https://github.com/stackitcloud/gardener-extension-acl) Production-Ready | [Summary](https://github.com/gardener-community/hackathon/blob/main/2023-11_Schelklingen/README.md#%EF%B8%8F-make-acl-extension-production-ready) |
  | [@oliver-goetz](https://github.com/oliver-goetz) | `5m` | 🕵️ Continuation Of `gardener-node-agent` | [Summary](https://github.com/gardener-community/hackathon/blob/main/2023-11_Schelklingen/README.md#%EF%B8%8F-continuation-of-gardener-node-agent) |
  | [@rfranzke](https://github.com/rfranzke) | `5m` | 🧑🏼‍🌾 Deploy `gardenlet`s Through Custom Resource Via `gardener-operator` | [Summary](https://github.com/gardener-community/hackathon/blob/main/2023-11_Schelklingen/README.md#-deploy-gardenlets-through-custom-resource-via-gardener-operator) |
  | [@Kumm-Kai](https://github.com/Kumm-Kai) | `5m` | 🦅 Shoot Control Plane Live Migration (Without Downtime) | [Summary](https://github.com/gardener-community/hackathon/blob/main/2023-11_Schelklingen/README.md#-shoot-control-plane-live-migration-without-downtime) |
  | [@afritzler](https://github.com/afritzler) | `10m` | 🗄️ Stop Vendoring Third-Party Code In `vendor` Folder | [Summary](https://github.com/gardener-community/hackathon/blob/main/2023-11_Schelklingen/README.md#%EF%B8%8F-stop-vendoring-third-party-code-in-vendor-folder) |
  | [@Gerrit91](https://github.com/Gerrit91) | `5m` | 🔍 Generic Extension For Shoot Cluster Audit Logs | [Summary](https://github.com/gardener-community/hackathon/blob/main/2023-11_Schelklingen/README.md#-generic-extension-for-shoot-cluster-audit-logs) |
  | [@timebertt](https://github.com/timebertt) | `5m` | 🚛 Rework Shoot [Flux Extension](https://github.com/stackitcloud/gardener-extension-shoot-flux) | [Summary](https://github.com/gardener-community/hackathon/blob/main/2023-11_Schelklingen/README.md#-rework-shoot-flux-extension) |

  #### No Demo, But Still Worth Celebrating 🎉

  - ✨ [USER] A discussion about air-gapped shoot clusters was conducted. [Summary](https://github.com/gardener-community/hackathon/blob/main/2023-11_Schelklingen/README.md#-discussion-air-gapped-shoot-clusters)
  - ✨ [DEVELOPER] A new script `hack/update-skaffold-deps.sh` has been added for automatically updating Skaffold dependencies for the binaries. Previously, you had to update them manually in the `skaffold.yaml` file. [Summary](https://github.com/gardener-community/hackathon/blob/main/2023-11_Schelklingen/README.md#-auto-update-skaffold-dependencies)

  <hr />

  ### 2023/10/25 - [v1.82](https://github.com/gardener/gardener/releases/tag/v1.82.0) Release

  #### Demo Agenda 📋

  | Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
  | ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
  | [@rfranzke](https://github.com/rfranzke) | `10m` | 🌀 Improved Machine State Persistence For Shoot Control Plane Migrations | [#8559](https://github.com/gardener/gardener/pull/8559), [#8618](https://github.com/gardener/gardener/pull/8618) |
  | [@acumino](https://github.com/acumino) | `5m` | 📝 No Longer Report Skipped Flow Tasks | [#8541](https://github.com/gardener/gardener/pull/8541) |
  | [@oliver-goetz](https://github.com/oliver-goetz) | `5m` | 🚤 Accelerated API Server Rollouts | [#8640](https://github.com/gardener/gardener/pull/8640) |
  | [@ScheererJ](https://github.com/ScheererJ) | `5m` | 💥 Forceful Managed Resources Finalization | [#8584](https://github.com/gardener/gardener/pull/8584) |

  #### No Demo, But Still Worth Celebrating 🎉

  - 🪓 [DEPENDENCY] The `MachineClassKind()`, `MachineClass()`, and `MachineClassList()` methods have been dropped from the generic `Worker` actuator's interface and do not need to be implemented anymore. [#8559](https://github.com/gardener/gardener/pull/8559)
  - 🪓 [DEPENDENCY] The no longer required `--gardenlet-manages-mcm` option has been removed. All code in provider extensions related to management/deployment of `machine-controller-manager` should be removed. [#8596](https://github.com/gardener/gardener/pull/8596)
  - 🪓 [DEVELOPER] The `extensions/pkg/controller/operatingsystemconfig/oscommon` package is deprecated and will be removed as soon as the `UseGardenerNodeAgent` feature gate has been promoted to GA. OS extension developers should start adapting to this new feature, see [documentation](https://github.com/gardener/gardener/blob/master/docs/extensions/operatingsystemconfig.md#what-needs-to-be-implemented-to-support-a-new-operating-system) and [example](https://github.com/rfranzke/gardener/tree/gna/osc-api/pkg/provider-local/controller/operatingsystemconfig) based on `provider-local`. [#8647](https://github.com/gardener/gardener/pull/8647)

  <hr />

  ### 2023/10/11 - [v1.81](https://github.com/gardener/gardener/releases/tag/v1.81.0) Release

  #### Demo Agenda 📋

  | Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
  | ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
  | [@holgerkoser](https://github.com/holgerkoser) | `5m` | 🎭 Dashboard  Theming + Branding | [dashboard#1568](https://github.com/gardener/dashboard/pull/1568) |
  | [@seshachalam-yv](https://github.com/seshachalam-yv) | `5m` | 📅 Delta Snapshot Retention Period | [etcd-druid#651](https://github.com/gardener/etcd-druid/pull/651) |
  | [@shafeeqes](https://github.com/shafeeqes) | `10m` | 🗑️ Forceful `Shoot` Deletion | [#8414](https://github.com/gardener/gardener/pull/8414), [#8608](https://github.com/gardener/gardener/pull/8608) |
  | [@rfranzke](https://github.com/rfranzke) | `5m` | ℹ️ `Shoot` Scheduling Failure Reason Population | [#8527](https://github.com/gardener/gardener/pull/8527) |
  | [@himanshu-kun](https://github.com/himanshu-kun) | `10m` | 🔙 Autoscaler Early Abort/Backoff | [autoscaler#154](https://github.com/gardener/autoscaler/issues/154) |

  #### No Demo, But Still Worth Celebrating 🎉

  - 🐛 [USER] Gardener refined the scope of the problematic webhook matcher for `Endpoints` objects. Earlier, shoot clusters were assigned a constraint reporting a problem with a `failurePolocy: Fail` webhook acting on these objects. Now, only `Endpoints` in the `kube-system` and `default` namespaces are considered for this check. [#8521](https://github.com/gardener/gardener/pull/8521)
  - ✨ [OPERATOR] The `MachineControllerManagerDeployment` has been promoted to beta and is now enabled by default. Make sure that all registered provider extensions support this feature gate before upgrading to this version of Gardener. [#8526](https://github.com/gardener/gardener/pull/8526)
  - ✨ [OPERATOR] The `DisableScalingClassesForShoots` feature gates has been promoted to GA (and is now always enabled). [#8526](https://github.com/gardener/gardener/pull/8526)

  <hr />

  ### 2023/09/27 - [v1.80](https://github.com/gardener/gardener/releases/tag/v1.80.0) Release

  #### Demo Agenda 📋

  | Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
  | ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
  | [@acumino](https://github.com/acumino) | `5m` | 💽 Enabled Target Cache In `gardener-resource-manager` | [#8483](https://github.com/gardener/gardener/pull/8483) |
  | [@grolu](https://github.com/grolu) | `5m` | 🕹️ Support For Workerless `Shoot`s | [dashboard#1531](https://github.com/gardener/dashboard/pull/1531) |
  | [@plkokanov](https://github.com/plkokanov) | `10m` | 📮 Introduction To `rsyslog-relp` Extension | [shoot-rsyslog-relp (repo)](https://github.com/gardener/gardener-extension-shoot-rsyslog-relp) |
  | [@rfranzke](https://github.com/rfranzke) | `10m` | 🎮 `gardener-operator` Manages Gardener Control Plane | [#8309](https://github.com/gardener/gardener/pull/8309) |
  | [@oliver-goetz](https://github.com/oliver-goetz) | `10m` | 🔂 Seed Credentials Renewing On Garden Credentials Rotation | [#8396](https://github.com/gardener/gardener/pull/8396) |
  | [@oliver-goetz](https://github.com/oliver-goetz) | `5m` | ⎈ Kubernetes 1.28 Support | [#8479](https://github.com/gardener/gardener/pull/8479) |

  #### No Demo, But Still Worth Celebrating 🎉

  - 🐛 [USER] A bug has been fixed which was allowing users to specify an extension of the same type in `.spec.extensions[].type` more than once in the `Shoot` API. [#8457](https://github.com/gardener/gardener/pull/8457)
  - ✨ [USER] Gardener now reports nodes for which the `checksum/cloud-config-data` hasn't been populated yet. This could point towards an error on the node and that not all Gardener related configuration happened successfully. [#8448](https://github.com/gardener/gardener/pull/8448)
  - ✨ [OPERATOR] `gardener-operator` now refuses to start if operators attempt to downgrade or skip minor Gardener versions. Please see [this document](https://github.com/gardener/gardener/blob/master/docs/deployment/version_skew_policy.md) for more information. [#8413](https://github.com/gardener/gardener/pull/8413)
  - ✨ [DEVELOPER] The following golang dependencies have been upgraded, please consult the upstream release notes and [this issue](https://github.com/gardener/gardener/issues/8382) for guidance on upgrading your golang dependencies when vendoring this gardener version: `k8s.io/*` to `v0.28.2`, `sigs.k8s.io/controller-runtime` to `v0.16.2`. [#8464](https://github.com/gardener/gardener/pull/8464)

  <hr />

  ### 2023/09/13 - [v1.79](https://github.com/gardener/gardener/releases/tag/v1.79.0) Release

  #### Demo Agenda 📋

  | Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
  | ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
  | [@ary1992](https://github.com/ary1992) | `10m` | 🎮 `sigs.k8s.io/controller-runtime@v0.15` Upgrade | [#8245](https://github.com/gardener/gardener/pull/8245) |
  | [@oliver-goetz](https://github.com/oliver-goetz) | `10m` | 🫧 Additional Excess Capacity Reservation Configurations | [#8356](https://github.com/gardener/gardener/pull/8356) |
  | [@ScheererJ](https://github.com/ScheererJ) | `10m` | 👨🏼‍💻 Extension Admission Controllers In Local Setup | [#8311](https://github.com/gardener/gardener/pull/8311) |

  #### No Demo, But Still Worth Celebrating 🎉

  - ✨ [USER] When the Kubernetes control plane version is at least `v1.28`, it is now possible to set the worker pool Kubernetes version to be at most three versions behind the control plane version. Earlier, only a skew of at most two versions was allowed. Find more details [here](https://kubernetes.io/blog/2023/08/15/kubernetes-v1-28-release/#changes-to-supported-skew-between-control-plane-and-node-versions). [#8402](https://github.com/gardener/gardener/pull/8402)
  - ✨ [OPERATOR] The `DisablingScalingClassesForShoots` feature gate has been promoted to beta. [#8428](https://github.com/gardener/gardener/pull/8428)
  - ✨ [OPERATOR] The `WorkerlessShoots` feature gate has been promoted to beta and is now turned on by default. Before deploying this Gardener version, make sure that all your registered extensions support this feature gate. [#8417](https://github.com/gardener/gardener/pull/8417)

  <hr />

  ### 2023/08/30 - [v1.78](https://github.com/gardener/gardener/releases/tag/v1.78.0) Release

  #### Demo Agenda 📋

  | Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
  | ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
  | [@schrodit](https://github.com/schrodit) | `20m` | 🌀 How Codesphere Uses Gardener | [codesphere.com (website)](https://codesphere.com/) |
  | [@acumino](https://github.com/acumino) | `5m` | 🧑🏼‍🌾 Gardener Operator Manages Plutono | [#8301](https://github.com/gardener/gardener/pull/8301) |
  | [@aaronfern](https://github.com/aaronfern) | `10m` | 🥾 Golang-Based ETCD Bootstrapping | [etcd-wrapper#3](https://github.com/gardener/etcd-wrapper/pull/3) |

  #### No Demo, But Still Worth Celebrating 🎉

  - ✨ [OPERATOR] It is possible now to trigger a `Seed` reconciliation by annotating the `Seed` with `gardener.cloud/operation=reconcile`. [#8347](https://github.com/gardener/gardener/pull/8347)
  - ✨ [OPERATOR] Status of `Garden` now includes the `ObservabilityComponentsHealthy` condition which show the health of observability components in the garden runtime-cluster. [#8346](https://github.com/gardener/gardener/pull/8346)
  - ✨ [DEPENDENCY] `BackupBucket`/`BackupEntry` controllers: watch secret metadata only. [#8348](https://github.com/gardener/gardener/pull/8348)

  <hr />

  ### 2023/08/16 - [v1.77](https://github.com/gardener/gardener/releases/tag/v1.77.0) Release

  #### Demo Agenda 📋

  | Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
  | ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
  | [@dimityrmirchev](https://github.com/dimityrmirchev) | `10m` | 🔒 Use immutable secrets in `ManagedResource` library | [#8116](https://github.com/gardener/gardener/pull/8116) |
  | [@ialidzhikov](https://github.com/ialidzhikov) | `10m` | 🗂️ Introduce the `ContainerdRegistryHostsDir` feature gate | [#8094](https://github.com/gardener/gardener/pull/8094) | 
  | [@shafeeqes](https://github.com/shafeeqes) | `5m` | 🪓 Split `make generate` targets | [#8289](https://github.com/gardener/gardener/pull/8289) |
  | [@oliver-goetz](https://github.com/oliver-goetz) | `5m` | 🚮 Remove secrets from `gardener-controlplane` helm chart | [#8308](https://github.com/gardener/gardener/pull/8308) |
  | [@timuthy](https://github.com/timuthy) | `10m` | 🌎 Enhance minimal distance algorithm in `gardener-scheduler` | [#8277](https://github.com/gardener/gardener/pull/8277) |

  #### No Demo, But Still Worth Celebrating 🎉

  - 🔄 [OPERATOR] `gardenlet` no longer reports the `Bootstrapped` condition on `Seed`s. Instead, it now reports the progress in `.status.lastOperation`, similar to how it's done for `Shoot`s. [#8290](https://github.com/gardener/gardener/pull/8290)
  - 🔎 [OPERATOR] Operators can now view and manage dashboards for compaction jobs running in shoot control plane. [#8206](https://github.com/gardener/gardener/pull/8206)
  - 📈 [OPERATOR] gardener-operator now takes over management of `fluent-operator` and `vali`. [#8240](https://github.com/gardener/gardener/pull/8240)

  <hr />

  ### 2023/08/02 - [v1.76](https://github.com/gardener/gardener/releases/tag/v1.76.0) Release

  #### Demo Agenda 📋

  | Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
  | ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
  | [@oliver-goetz](https://github.com/oliver-goetz) | `10m` | 🩺 `Garden` Care Controller | [#8158](https://github.com/gardener/gardener/pull/8158), [#8238](https://github.com/gardener/gardener/pull/8238) |
  | [@acumino](https://github.com/acumino) | `5m` | 🔢 Error Code Detection In `Worker` Controller | [#8242](https://github.com/gardener/gardener/pull/8242) |
  | [@dergeberl](https://github.com/dergeberl) | `10m` | 🔑 Garden Cluster Access For Extension Controllers In Seeds | [#8001 (issue)](https://github.com/gardener/gardener/issues/8001) |
  | [@timuthy](https://github.com/timuthy) | `5m` | 📌 Support For Custom Gardener Schedulers | [#8261](https://github.com/gardener/gardener/pull/8261) |
  | [@DockToFuture](https://github.com/DockToFuture), [@axel7born](https://github.com/axel7born) | `10m` | 🔀 AWS IPv4/6 Dual-Stack Support | [provider-aws#778](https://github.com/gardener/gardener-extension-provider-aws/pull/778) |

  #### No Demo, But Still Worth Celebrating 🎉

  - 🪓 [OPERATOR] Removed `service.beta.kubernetes.io/aws-load-balancer-type: nlb` annotation from `istio-ingressgateway` service template. Set this annotation in `Seed` configuration. [...] [#8214](https://github.com/gardener/gardener/pull/8214)
  - ✨ [USER] It is now possible to enable disabled APIs for workerless shoot clusters via `spec.kubernetes.kubeAPIServer.runtimeConfig`. [#8258](https://github.com/gardener/gardener/pull/8258)
  - 🐛 [USER] An issue has been fixed which caused CoreDNS to not rewrite CNAME values in DNS answers. [#8231](https://github.com/gardener/gardener/pull/8231)

  <hr />

  ### 2023/07/19 - [v1.75](https://github.com/gardener/gardener/releases/tag/v1.75.0) Release

  #### Demo Agenda 📋

  | Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
  | ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
  | [@StenlyTU](https://github.com/StenlyTU) | `10m` | 🧑🏼‍🌾 Gardener Operator Deploys `nginx-ingress-{controller,k8s-backend}` | [#7945](https://github.com/gardener/gardener/pull/7945) |
  | [@AleksandarSavchev](https://github.com/AleksandarSavchev) | `5m` | 🚔 Pod Security Enforcements For `Garden` And `Seed` | [#8099](https://github.com/gardener/gardener/pull/8099) |
  | [@acumino](https://github.com/acumino) | `10m` | ⚙️ Kubeconfigs For Admission Plugin Configurations | [#8110](https://github.com/gardener/gardener/pull/8110) |
  | [@shafeeqes](https://github.com/shafeeqes) | `5m` | ⚠️ New `CRDsWithProblematicConversionWebhooks` Constraint For `Shoot`s | [#8159](https://github.com/gardener/gardener/pull/8159) |
  | [@ScheererJ](https://github.com/ScheererJ) | `10m` | 🏎️ Race Mitigation For `NetworkUnavailable` Condition In `Node`s | [provider-gcp#631](https://github.com/gardener/gardener-extension-provider-gcp/pull/631) |
  | [@timuthy](https://github.com/timuthy) | `5m` | 🪄 Kubernetes Version Defaulting | [#8198](https://github.com/gardener/gardener/pull/8198) |

  #### No Demo, But Still Worth Celebrating 🎉

  - 🪓 [DEVELOPER] `Shoot` fields `.spec.dns.providers[].domains` and `.spec.dns.providers[].zones` are now deprecated and expected to be removed in version `v1.87`. Please plan ahead to drop using those fields in extensions. [#8199](https://github.com/gardener/gardener/pull/8199)
  - 🪓 [USER] Adding Gardener-managed finalizers (e.g., `gardener` or `gardener.cloud/reference-protection`) to the `Shoot` on creation is now forbidden. [#8209](https://github.com/gardener/gardener/pull/8209)
  - 🐛 [OPERATOR] A bug causing the `gardenlet` to panic when a ETCD encryption key rotation operation is triggered for a hibernated `Shoot` is now fixed. Now, triggering ETCD encryption key rotation or `ServiceAccount` signing key rotation is forbidden when the `Shoot` is in waking up phase. [#8184](https://github.com/gardener/gardener/pull/8184)

  <hr />

  ### 2023/07/05 - [v1.74](https://github.com/gardener/gardener/releases/tag/v1.74.0) Release

  #### Demo Agenda 📋

  | Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
  | ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
  | [@timuthy](https://github.com/timuthy) | `5m` | 🏷️ Multiple Domains For Garden Clusters | [#8156](https://github.com/gardener/gardener/pull/8156) |
  | [@rfranzke](https://github.com/rfranzke) | `10m` | 📈 [GEP-22] Improved Usage of `ShootState` API | [#8073 (issue)](https://github.com/gardener/gardener/pull/8073) |
  | [@rfranzke](https://github.com/rfranzke) | `5m` | 💪 Keep `kube-proxy` VPA On Kubernetes Patch Updates | [#8071](https://github.com/gardener/gardener/pull/8071) |
  | [@oliver-goetz](https://github.com/oliver-goetz) | `5m` | 🧹 Removal Of Deprecated Development Setups | [#8075](https://github.com/gardener/gardener/pull/8075) |
  | [@timebertt](https://github.com/timebertt) | `5m` | 🔐 Usage Of `InternalSecret` API | [#7999 (issue)](https://github.com/gardener/gardener/issues/7999) |

  #### No Demo, But Still Worth Celebrating 🎉

  - 🪓 [OPERATOR] ⚠️ Gardener does no longer support garden, seed, or shoot clusters with Kubernetes versions `< 1.22`. Make sure to upgrade all existing clusters before upgrading to this Gardener version. [#8087](https://github.com/gardener/gardener/pull/8087)
  - 🐛 [OPERATOR] `gardener-resource-manager`'s `system-components-config` webhook no longer adds the toleration for the `ToBeDeletedByClusterAutoscaler` taint to system components in shoot clusters. The `ToBeDeletedByClusterAutoscaler` taint is maintained by the `cluster-autoscaler`. This was breaking `cluster-autoscaler`'s drain mechanism when scaling down an under-utilized node. It was causing just evicted system components from to be deleted node to be scheduled again on the to be deleted node. [#8172](https://github.com/gardener/gardener/pull/8172)

  <hr />

  ### 2023/06/21 - [v1.73](https://github.com/gardener/gardener/releases/tag/v1.73.0) Release

  #### Demo Agenda 📋

  | Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
  | ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
  | [@voelzmo](https://github.com/voelzmo) | `10m` | 📈 Disabled Scaling Classes For `kube-apiserver` Resource Requirements | [#8003](https://github.com/gardener/gardener/pull/8003) |
  | [@dimitar-kostadinov](https://github.com/dimitar-kostadinov) | `10m` | 🌍 Improved Robustness Of `terraformer` Executions | [#8059](https://github.com/gardener/gardener/pull/8059) |
  | [@rfranzke](https://github.com/rfranzke) | `10m` | 🤖 `machine-controller-manager` Managed By `gardenlet` | [#8015](https://github.com/gardener/gardener/pull/8015), [#8018](https://github.com/gardener/gardener/pull/8018), [#8056](https://github.com/gardener/gardener/pull/8056) |
  | [@shafeeqes](https://github.com/shafeeqes) | `5m` | 🧹 Cleanup `Secret` Reference In `ManagedSeed`s | [#8039](https://github.com/gardener/gardener/pull/8039) |

  #### No Demo, But Still Worth Celebrating 🎉

  - 🪓 [OPERATOR] The field `.spec.secretRef` in the `Seed` API has been deprecated and will be removed in a future release of Gardener. [#8064](https://github.com/gardener/gardener/pull/8064)
  - ✨ [OPERATOR] `gardener-apiserver` now exposes a new `core.gardener.cloud/v1beta1.InternalSecret` API, see the [documentation](https://github.com/gardener/gardener/blob/master/docs/concepts/apiserver.md#internalsecrets) for more information. [#8025](https://github.com/gardener/gardener/pull/8025)
  - ✨ [DEVELOPER] It is now easier to annotate `Service`s related to extensions serving webhook handlers that must be reached `by kube-apiserver`s running in separate namespaces such that the respective network traffic gets allowed. Please refer to [this guide](https://github.com/gardener/gardener/blob/master/docs/usage/network_policies.md#webhook-servers) for all information. [...]. [#8076](https://github.com/gardener/gardener/pull/8076)
  - ✨ [DEVELOPER] `gardenlet`'s `ControllerInstallation` controller now populates the feature gate of `gardenlet` via the Helm values to extensions when they are getting installed. The information is populated via the `.gardener.gardenlet.featureGates` key. It contains a map whose keys are feature gates names and whose values are booleans (depicting the enablement status). [#8011](https://github.com/gardener/gardener/pull/8011)

  <hr />

  ### 2023/06/14 - [v1.72](https://github.com/gardener/gardener/releases/tag/v1.72.0) Release

  #### Demo Agenda 📋

  | Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
  | ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
  | [@ScheererJ](https://github.com/ScheererJ) | `5m` | 🔦 Virtual Garden API Server Exposure Via Istio | [#7953](https://github.com/gardener/gardener/pull/7953) |
  | [@axel7born](https://github.com/axel7born) | `5m` | 🐹 Golang Implementation For Egress Network Filtering | [shoot-networking-filter#64](https://github.com/gardener/gardener-extension-shoot-networking-filter/pull/64) |
  | [@rfranzke](https://github.com/rfranzke) | `5m` | 📐 Improved Accuracy For Local Control Plane Migration E2E Tests | [#7981](https://github.com/gardener/gardener/pull/7981) |
  | [@ishan16696](https://github.com/ishan16696) | `10m` | ⬆️ Improved ETCD Cluster Scale-Up | [etcd-druid#584 (issue)](https://github.com/gardener/etcd-druid/issues/584) |
  | [@kon-angelo](https://github.com/kon-angelo) | `5m` | 🔧 Live AWS EBS Volume Modifications | [provider-aws#754](https://github.com/gardener/gardener-extension-provider-aws/pull/754) |
  | [@elankath](https://github.com/elankath) | `5m` | 🔐 GCP Disk Encryption With Customer-Managed Keys | [provider-gcp#607](https://github.com/gardener/gardener-extension-provider-gcp/pull/607) |
  | [@MartinWeindel](https://github.com/MartinWeindel) | `5m` | 📀 OpenStack Manila CSI Driver | [provider-openstack#572](https://github.com/gardener/gardener-extension-provider-openstack/pull/572) |

  #### No Demo, But Still Worth Celebrating 🎉

  - 🪓 [OPERATOR] It is required to have `ControllerRegistration`s for Kinds `ControlPlane`, `Infrastructure` and `Worker` with the same types used for seeds (`.spec.provider.type`). [...]. [#7928](https://github.com/gardener/gardener/pull/7928)
  - ✨ [USER] The `core/v1alpha1` API version is dropped. Make sure that you don't use the `core/v1alpha1` API version in your machinery. [#7965](https://github.com/gardener/gardener/pull/7965)
  - ✨ [USER] The certificate chains served by `kube-apiserver`s does now include the CA certificates used to sign their server certificates. [#7961](https://github.com/gardener/gardener/pull/7961)
  - 🐛 [USER] A bug that prevented finalizers from being added to referenced `Secret`s or `ConfigMap`s in `.spec.resources` in `Shoot`s has been fixed. [#7995](https://github.com/gardener/gardener/pull/7995)

  <hr />

  ### 2023/06/07 - [v1.71](https://github.com/gardener/gardener/releases/tag/v1.71.0) Release

  #### Demo Agenda 📋

  | Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
  | ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
  | [@shafeeqes](https://github.com/shafeeqes) | `5m` | 💡 Improved Validation For `Shoot` Worker Pool Config | [#7855](https://github.com/gardener/gardener/pull/7855) |
  | [@ScheererJ](https://github.com/ScheererJ) | `10m` |  🧑🏼‍🌾 Gardener Operator Updates | [#7881](https://github.com/gardener/gardener/pull/7881), [#7931](https://github.com/gardener/gardener/pull/7931) |
  | [@ialidzhikov](https://github.com/ialidzhikov) | `5m` | ⏱️ Configurable Toleration Seconds For Unready Nodes | [#7861](https://github.com/gardener/gardener/pull/7861) |
  | [@acumino](https://github.com/acumino) | `10m` | 🕹️ Workerless Shoot Clusters | [#7635 (issue)](https://github.com/gardener/gardener/issues/7635) |
  | [@ary1992](https://github.com/ary1992) | `5m` | ⎈ Kubernetes 1.27 Support | [#7883](https://github.com/gardener/gardener/pull/7883) |
  | [@istvanballok](https://github.com/istvanballok) | `10m` | 📊 Replace Grafana With Plutono, Loki With Vali | [#7318](https://github.com/gardener/gardener/pull/7318) |

  #### No Demo, But Still Worth Celebrating 🎉

  - 🪓 [DEVELOPER] Extensions vendoring this `gardener/gardener` version need to provide RBAC privileges for `PATCH apps/depoyments/scale`. [#7868](https://github.com/gardener/gardener/pull/7868)
  - ✨ [OPERATOR] The `HAControlPlanes` feature gate has been promoted to beta and is now turned on by default. [#7867](https://github.com/gardener/gardener/pull/7867)
  - ✨ [OPERATOR] It is now possible to provide namespace selectors for additional namespaces which should be covered by the `NetworkPolicy` controllers of `gardener-operator` or `gardenlet`. [...] [#7929](https://github.com/gardener/gardener/pull/7929)
  - ✨ [DEVELOPER] In order to allow `kube-apiserver` pods of shoot or garden clusters to reach webhook servers, they must no longer be explicitly labeled with `networking.resources.gardener.cloud/to-<service-name>-<protocol>-<port>=allowed`. Instead, it is enough to annotate the `Service` of the webhook server with `networking.resources.gardener.cloud/from-all-webhook-targets-allowed-ports=<ports>`. [#7907](https://github.com/gardener/gardener/pull/7907)
  - 📖 [DEVELOPER] A guideline for developers regarding `TODO` statements has been introduced. [#7939](https://github.com/gardener/gardener/pull/7939)

  <hr />

  ### 2023/05/31 - [Hack The Garden](https://github.com/gardener-community/hackathon/blob/main/2023-05_Leverkusen/README.md) Wrap Up

  #### Demo Agenda 📋

  | Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
  | ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
  | [@majst01](https://github.com/majst01), [@Gerrit91](https://github.com/Gerrit91) | `10m` | 🕵️ Introduction Of `gardener-node-agent` | [Summary](https://github.com/gardener-community/hackathon/blob/main/2023-05_Leverkusen/README.md#-introduction-of-gardener-node-agent) |
  | [@einfachnuralex](https://github.com/einfachnuralex) | `10m` | 🌐 IPv6 Shoot Clusters On Cloud Providers | [Summary](https://github.com/gardener-community/hackathon/blob/main/2023-05_Leverkusen/README.md#-ipv6-on-cloud-provider) |
  | [@JensAc](https://github.com/JensAc) | `10m` | 🌱 Experimenting With Masterful Shoot Clusters | [Summary](https://github.com/gardener-community/hackathon/blob/main/2023-05_Leverkusen/README.md#-bootstrapping-masterful-clusters-aka-autonomous-shoots) |
  | [@timebertt](https://github.com/timebertt) | `10m` | 🔑 Garden Cluster Access For Extension Controllers In Seeds | [Summary](https://github.com/gardener-community/hackathon/blob/main/2023-05_Leverkusen/README.md#-garden-cluster-access-for-extensions-in-seed-clusters) |
  | [@rfranzke](https://github.com/rfranzke) | `10m` | 💾 Replacing `ShootState`s With Backups in Backup Buckets | [Summary](https://github.com/gardener-community/hackathon/blob/main/2023-05_Leverkusen/README.md#-replacement-of-shootstates-with-data-in-backup-buckets) |
  | [@timebertt](https://github.com/timebertt) | `10m` | 🔐 New `InternalSecret`s API In Gardener | [Summary](https://github.com/gardener-community/hackathon/blob/main/2023-05_Leverkusen/README.md#-introducing-internalsecret-resource-in-gardener-api) |

  #### No Demo, But Still Worth Celebrating 🎉

  - ✨ The `machine-controller-manager` deployment procedure has been moved from the generic `Worker` actuator used in extensions controllers into `gardenlet`. [Summary](https://github.com/gardener-community/hackathon/blob/main/2023-05_Leverkusen/README.md#-moving-machine-controller-manager-deployment-responsibility-to-gardenlet)
  - ✨ The accuracy for local control plane migration e2e tests has been increased as much as possible. [Summary](https://github.com/gardener-community/hackathon/blob/main/2023-05_Leverkusen/README.md#-improved-e2e-test-accuracy-for-local-control-plane-migration)
  - ✨ A few of the necessary steps for supporting ETCD encryption for custom resources have been addressed. [Summary](https://github.com/gardener-community/hackathon/blob/main/2023-05_Leverkusen/README.md#-etcd-encryption-for-custom-resources)
  - 🧹 The `apiserver-proxy-pod-mutator` webhook has been moved into `gardener-resource-manager`. [Summary](https://github.com/gardener-community/hackathon/blob/main/2023-05_Leverkusen/README.md#-moving-apiserver-proxy-pod-mutator-webhook-into-gardener-resource-manager)

  <hr />

  ### 2023/05/10 - [v1.70](https://github.com/gardener/gardener/releases/tag/v1.70.0) Release

  #### Demo Agenda 📋

  | Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
  | ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
  | [@Kristian-ZH](https://github.com/Kristian-ZH) | `10m` | 🪵 Introduction Of Fluent Operator | [#7568](https://github.com/gardener/gardener/pull/7568) |
  | ~~[@danielfoehrKn](https://github.com/danielfoehrKn)~~ | ~~`10m`~~ | ~~🧱 Move Prow E2E Tests To `cgroup-v2` Nodes~~ | ~~[#7780](https://github.com/gardener/gardener/pull/7780), [#7797](https://github.com/gardener/gardener/pull/7797)~~ |
  | [@ScheererJ](https://github.com/ScheererJ) | `5m` | 🌽 User-Defined Kernel Settings Per Worker Pool | [#7825](https://github.com/gardener/gardener/pull/7825) |
  | [@rfranzke](https://github.com/rfranzke) | `10m` | 🧑🏼‍🌾 Gardener Operator Manages Istio and `kube-state-metrics` | [#7817](https://github.com/gardener/gardener/pull/7817), [#7836](https://github.com/gardener/gardener/pull/7836) |
  | [@plkokanov](https://github.com/plkokanov) | `10m` | 🔄 Control Plane Migration For HA `Shoot`s | [#7626](https://github.com/gardener/gardener/pull/7626), [#7742](https://github.com/gardener/gardener/pull/7742) |

  #### No Demo, But Still Worth Celebrating 🎉

  - ✨ [OPERATOR] Gardener now supports seed clusters with Kubernetes versions up to `v1.26`. [#7831](https://github.com/gardener/gardener/pull/7831)
  - ✨ [OPERATOR] The [`highavailabilityconfig` webhook](https://github.com/gardener/gardener/blob/master/docs/concepts/resource-manager.md#high-availability-config) configures topology spread constraints with `minDomains=<number-of- zones>`. [...]. [#7826](https://github.com/gardener/gardener/pull/7826)
  - ✨ [OPERATOR] Annotations in `seed.spec.settings.loadBalancerServices.annotations` are now applied to the `nginx-ingress` load balancer service in the seed cluster. [#7835](https://github.com/gardener/gardener/pull/7835)
  - 🧹 [OPERATOR] The promoted or deprecated feature gates `ManagedIstio` and `ReversedVPN` have been removed. [#7830](https://github.com/gardener/gardener/pull/7830)

  <hr />

  ### 2023/04/26 - [v1.69](https://github.com/gardener/gardener/releases/tag/v1.69.0) Release

  #### Demo Agenda 📋

  | Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
  | ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
  | [@oliver-goetz](https://github.com/oliver-goetz) | `10m` | 🐞 Skaffold-Based Debugging Experience | [#7755](https://github.com/gardener/gardener/pull/7755) |
  | ~~[@plkokanov](https://github.com/plkokanov)~~ | ~~`10m`~~ | ~~🔄 Control Plane Migration For HA `Shoot`s~~ | ~~[#7626](https://github.com/gardener/gardener/pull/7626)~~ |
  | [@DockToFuture](https://github.com/DockToFuture) | `10m` | 🔗 E2E Tests For Networking Extensions | [networking-calico#257](https://github.com/gardener/gardener-extension-networking-calico/pull/257), [networking-cilium#261](https://github.com/gardener/gardener-extension-networking-cilium/pull/174) |
  | [@breuerfelix](https://github.com/breuerfelix) | `10m` | 🌱 Local IPv6-Based Seed Clusters | [#7561](https://github.com/gardener/gardener/pull/7561) |

  #### No Demo, But Still Worth Celebrating 🎉

  - ✨ [OPERATOR] The `SeedChange` and `CopyEtcdBackupsDuringControlPlaneMigration` feature gates have been promoted to GA and are now locked to true. [#7763](https://github.com/gardener/gardener/pull/7763)
  - 🐛 [OPERATOR] Fixed potential leaks of `ShootState`s that could happen when a `Shoot` cluster is deleted. This is achieved by no longer exiting early from the deletion flow if the shoot's seed `Namespace` has been deleted. The same logic has been applied to the migration flow for consistency. [#7789](https://github.com/gardener/gardener/pull/7789)
  - 🐛 [OPERATOR] A bug causing kube-controller-manager to fail to clean up ShootState resources is now fixed. [#7793](https://github.com/gardener/gardener/pull/7793)
  - 🧹 [OPERATOR] The `.spec.settings.ownerChecks` field of the `Seed` configuration is deprecated. The "bad-case" control plane migration is being removed in favor of the HA Shoot control planes [...]. [#7748](https://github.com/gardener/gardener/pull/7748)

  <hr />

  ### 2023/04/12 - [v1.68](https://github.com/gardener/gardener/releases/tag/v1.68.0) Release

  #### Demo Agenda 📋

  | Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
  | ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
  | [@ialidzhikov](https://github.com/ialidzhikov) | `5m` | 🚦 Toplogy-Aware-Routing in Garden Cluster | [#7729](https://github.com/gardener/gardener/pull/7729) |
  | [@ary1992](https://github.com/ary1992) |`10m` | ⏳ Restrict Duration Of Reconciliations | [#7147](https://github.com/gardener/gardener/pull/7147) |
  | [@robinschneider](https://github.com/robinschneider) | `5m` | 🔃 Copy Docker Hub Images To Gardener GCR | [#7698](https://github.com/gardener/gardener/pull/7698) |
  | [@timuthy](https://github.com/timuthy) | `10m` | 🧑🏼‍🌾 Gardener Operator Manages `kube-apiserver` | [#7693](https://github.com/gardener/gardener/pull/7693), [#7730](https://github.com/gardener/gardener/pull/7730) |
  | [@timuthy](https://github.com/timuthy) | `5m` | 📸 Trigger ETCD Snapshots Via ~~API Server Proxy~~ Endpoint | [#7714](https://github.com/gardener/gardener/pull/7714) |

  #### No Demo, But Still Worth Celebrating 🎉

  - ✨ [OPERATOR] Enable memory-saver mode for the VPA recommender. It stops tracking resource consumption for Containers without matching VPAs and frees up memory. [#7746](https://github.com/gardener/gardener/pull/7746)
  - ✨ [DEVELOPER] The server certificate of the kube-apiserver deployment now contains the `<service-name>.<namespace>.svc.cluster.local` SAN. [#7735](https://github.com/gardener/gardener/pull/7735)
  - 🐛 [OPERATOR] A bug causing the gardenlet to be unable to access the BackupBucket generated secret in garden namespace is now fixed. [#7708](https://github.com/gardener/gardener/pull/7708)
  - 🐛 [OPERATOR] A bug has been fixed for the Gardener Operator that occasionally caused "404 not-found" errors when garden resources where applied and the operator ran with multiple replicas. [#7739](https://github.com/gardener/gardener/pull/7739)

  <hr />

  ### 2023/04/05 - Special Edition

  #### Demo Agenda 📋

  | Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
  | ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
  | [@vlerenc](https://github.com/vlerenc) | `25m` | 🤪 Gardener Chaos Engineering | [chaos-engineering (repo)](https://github.com/gardener/chaos-engineering) |

  <hr />

  ### 2023/03/29 - [v1.67](https://github.com/gardener/gardener/releases/tag/v1.67.0) Release

  #### Demo Agenda 📋

  | Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
  | ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
  | ~~[@himanshu-kun](https://github.com/himanshu-kun)~~ | ~~`10m`~~ | ~~🐶 Dependency Watchdog v1~~ | ~~[dependency-watchdog (repo)](https://github.com/gardener/dependency-watchdog/), [#6693](https://github.com/gardener/gardener/pull/6693)~~|
  | [@SimonKienzler](https://github.com/SimonKienzler) | `10m` | 🫀 Ensure `CSINode` Readiness Before Scheduling `Pod`s | [#7621](https://github.com/gardener/gardener/pull/7621) |
  | [@timebertt](https://github.com/timebertt) | `5m` | 🔄 Skaffold-Based Development Experience | [#7659](https://github.com/gardener/gardener/pull/7659) |
  | [@grolu](https://github.com/grolu) | `10m` | 🕹 Recent Gardener Dashboard Features | [dashboard (repo)](https://github.com/gardener/dashboard) |
  | [@timuthy](https://github.com/timuthy) | `10m` | 💿 Single Object Cache | [#7632](https://github.com/gardener/gardener/pull/7632), [#7681](https://github.com/gardener/gardener/pull/7681) |

  #### No Demo, But Still Worth Celebrating 🎉

  - 🐛 [OPERATOR] An issue has been fixed which caused undesired PATCH requests when updating the state in the Worker or ShootState resources. [#7637](https://github.com/gardener/gardener/pull/7637)
  - 🐛 [DEVELOPER] A bug in `managedresources.NewRegistry` that was leading to excessive memory usage when this function is called multiple times has been fixed. [#7694](https://github.com/gardener/gardener/pull/7694)
  - ✨ [DEVELOPER] Shoot clusters using `provider-local` can now have multiple worker nodes with `calico` as CNI. [#7684](https://github.com/gardener/gardener/pull/7684)
  - ✨ [DEVELOPER] The local deployment of Gardener with extensions can now deal with multiple seeds. Additional seeds can be added and removed again. [#7673](https://github.com/gardener/gardener/pull/7673)

  <hr />

  ### 2023/03/15 - [v1.66](https://github.com/gardener/gardener/releases/tag/v1.66.0) Release

  #### Demo Agenda 📋

  | Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
  | ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
  | [@shafeeqes](https://github.com/shafeeqes) | `5m` | 👻 Dropped Support For Self-Managed `Ingress` Controllers In `Seed`s | [#7529](https://github.com/gardener/gardener/pull/7529) |
  | [@timuthy](https://github.com/timuthy) | `10m` | 🧑🏻‍⚖️ Adapted `NetworkPolicy`s For `Istio` Namespaces | [#7570](https://github.com/gardener/gardener/pull/7570) |
  | [@ScheererJ](https://github.com/ScheererJ) | `10m` | 🧑🏻‍⚖️ Adapted `NetworkPolicy`s For Extension Namespaces | [#7589](https://github.com/gardener/gardener/pull/7589) |
  | [@ialidzhikov](https://github.com/ialidzhikov) | `10m` | 🚦 Routing Network Traffic Toplogy-Aware | [#7191](https://github.com/gardener/gardener/pull/7191) |

  #### No Demo, But Still Worth Celebrating 🎉

  - 🐛 [USER] Updates to the `AuditPolicy` referenced by `Shoot`s are now also validated against the Kubernetes versions of those shoot clusters. This fixes an issue where it was possible to specify an unsupported `audit.k8s.io` version when updating the `ConfigMap` which contains the `AuditPolicy`. [#7563](https://github.com/gardener/gardener/pull/7563)
  - 🐛 [USER] Fixes control-plane migration of hibernated shoot being stuck if shoot was hibernated for `24h`. [#7608](https://github.com/gardener/gardener/pull/7608)
  - 🪓 [OPERATOR] The `ForceRestore` feature gate has been removed. [#7543](https://github.com/gardener/gardener/pull/7543)
  - ✨ [OPERATOR] The `ManagedSeed` controller does no longer try to sync the `Seed` kubeconfig `Secret` when `Shoot`'s static token kubeconfig is not enabled. [#7546](https://github.com/gardener/gardener/pull/7546)

  <hr />

  ### 2023/03/01 - [v1.65](https://github.com/gardener/gardener/releases/tag/v1.65.0) Release

  #### Demo Agenda 📋

  | Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
  | ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
  | [@axel7born](https://github.com/axel7born) | `5m` | 🥸 Response Rewrite For DNS Search Path Optimization | [#7478](https://github.com/gardener/gardener/pull/7478) |
  | [@shafeeqes](https://github.com/shafeeqes) | `5m` | 🔍 Validation For Admission Plugin Configurations | [#7472](https://github.com/gardener/gardener/pull/7472) |
  | [@shafeeqes](https://github.com/shafeeqes) | `5m` | 🥷🏻 Recreation For Immutable `ConfigMap`s/`Secret`s | [#7516](https://github.com/gardener/gardener/pull/7516) |
  | [@acumino](https://github.com/acumino) | `5m` | 🩺 Shoot System Components Health Checks | [#7462](https://github.com/gardener/gardener/pull/7462) |
  | [@rfranzke](https://github.com/rfranzke) | `5m` | 🧑🏻‍⚖️ Adapted `NetworkPolicy`s For Shoot Control Plane Components | [#7484](https://github.com/gardener/gardener/pull/7484), [#7515](https://github.com/gardener/gardener/pull/7515) |
  | [@Kumm-Kai](https://github.com/Kumm-Kai) | `10m` | 🫀 Schedule Node-Critical `Pod`s First | [#7406](https://github.com/gardener/gardener/pull/7406) |

  #### No Demo, But Still Worth Celebrating 🎉

  - 🪓 [USER] The `core.gardener.cloud/v1alpha1` API is deprecated and will be removed soon. The `core.gardener.cloud/v1beta1` API is already available since a very long time and should be used instead. [#7443](https://github.com/gardener/gardener/pull/7443)
  - 🪓 [OPERATOR] Before upgrading to this Gardener version, `Seed`s using `.spec.dns.ingressDomain` must now finally be switched to using `.spec.ingress` and `.spec.dns.provider` [...]. [#7515](https://github.com/gardener/gardener/pull/7515)
  - 🐛 [OPERATOR] Fix a bug in the etcd deploy flow that erroneously unsets `etcd.spec.etcd.peerUrlTls` in the `Etcd` CRs of high available shoots when marked for hibernation. [#7514](https://github.com/gardener/gardener/pull/7514)

  <hr />

  ### 2023/02/15 - [v1.64](https://github.com/gardener/gardener/releases/tag/v1.64.0) Release

  #### Demo Agenda 📋

  | Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
  | ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
  | [@rfranzke](https://github.com/rfranzke) | `10m` | 🧑🏻‍⚖️ `NetworkPolicy` Controller In `gardener-resource-manager` | [#7392](https://github.com/gardener/gardener/pull/7392), [#7412](https://github.com/gardener/gardener/pull/7412), [#7437](https://github.com/gardener/gardener/pull/7437) |
  | [@himanshu-kun](https://github.com/himanshu-kun) | `5m` | 🏗️ `Progressing` Condition In `MachineDeployment`s | [machine-controller-manager#762](https://github.com/gardener/machine-controller-manager/pull/762) |
  | [@kon-angelo](https://github.com/kon-angelo) | `10m` | 🤸🏼‍♂️ Nodes CIDR Expansion For `Shoot`s | [#7368](https://github.com/gardener/gardener/pull/7368) |
  | [@timebertt](https://github.com/timebertt) | `5m` | 🐛 Simplified Debugging Experience For Integration Tests | [#7431](https://github.com/gardener/gardener/pull/7431) |
  | [@rickardsjp](https://github.com/rickardsjp) | `10m` | ⛙ Unification Of Grafana Deployments | [#7007](https://github.com/gardener/gardener/pull/7007) |

  #### No Demo, But Still Worth Celebrating 🎉

  - ✨ [OPERATOR] The `istio-system` namespace in seed clusters is now labeled with `gardener.cloud/role=istio-system`. All `istio-ingress*` namespaces are now labeled with `gardener.cloud/role=istio-ingress`. [#7389](https://github.com/gardener/gardener/pull/7389)
  - 🐛 [OPERATOR] When deleting a seed the `cluster-identity` config map in `kube-system` namespace is not deleted anymore if it was already existing on seed creation. [#7436](https://github.com/gardener/gardener/pull/7436)
  - 🐛 [OPERATOR] A bug has been fixed which caused the conditions of `Shoot`s to be set to `Unknown` too fast in case the responsible `gardenlet` is no longer posting its heartbeat. [#7404](https://github.com/gardener/gardener/pull/7404)
  - ✨ [DEVELOPER] Add bootstrapping a local IPv6 KinD cluster with `make kind-up IPFAMILY=ipv6`. [#7388](https://github.com/gardener/gardener/pull/7388)

  <hr />

  ### 2023/02/08 - [v1.63](https://github.com/gardener/gardener/releases/tag/v1.63.0) Release (Part III)

  #### Demo Agenda 📋

  | Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
  | ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
  | [@einfachnuralex](https://github.com/einfachnuralex) | `10m` | 🛠️ Development Box On GCP | [#7319](https://github.com/gardener/gardener/pull/7319) |
  | [@acumino](https://github.com/acumino) | `10m` | ⚙️ New `SystemComponentsConfig` Webhook | [#7204](https://github.com/gardener/gardener/pull/7204), [#7304](https://github.com/gardener/gardener/pull/7304) |
  | [@rfranzke](https://github.com/rfranzke) | `5m` | 🚅 Skip Readiness Checks In `Shoot` Flow  | [#7268](https://github.com/gardener/gardener/pull/7268) |
  | [@ialidzhikov](https://github.com/ialidzhikov) | `10m` | ⎈ Kubernetes 1.26 Support | [#7275](https://github.com/gardener/gardener/pull/7275) |
  | [@SimonKienzler](https://github.com/SimonKienzler), [@breuerfelix](https://github.com/breuerfelix) | `10m` | 👮 Access Control For Shoot Clusters | [extension-acl (repo)](https://github.com/stackitcloud/gardener-extension-acl) |

  <hr />

  ### 2023/02/01 - [v1.63](https://github.com/gardener/gardener/releases/tag/v1.63.0) Release (Part II)

  #### Demo Agenda 📋

  | Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
  | ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
  | [@AleksandarSavchev](https://github.com/AleksandarSavchev) | `10m` | 🔒 Disable SSH Access To Worker Nodes | [#7188](https://github.com/gardener/gardener/pull/7188) |
  | [@ary1992](https://github.com/ary1992) | `5m` | 🎮 `controller-runtime` Refactoring | [#4251 (issue)](https://github.com/gardener/gardener/issues/4251) |
  | [@shafeeqes](https://github.com/shafeeqes) | `10m` | 📊 Dashboards For `controller-runtime` Metrics | [#7180](https://github.com/gardener/gardener/pull/7180) |
  | [@ialidzhikov](https://github.com/ialidzhikov) | `5m` | ⛓️ Kubelet Versions Constraints For Machine Image Versions | [#7265](https://github.com/gardener/gardener/pull/7265) |
  | [@timebertt](https://github.com/timebertt) | `10m` | 🚦 [GEP-21] IPv6 Single-Stack Support in Local Gardener | [#7050](https://github.com/gardener/gardener/pull/7050), [#7246](https://github.com/gardener/gardener/pull/7246), [#7288](https://github.com/gardener/gardener/pull/7288) |
  | [@plkokanov](https://github.com/plkokanov) | `5m` | 🏗 Control Plane Migration Status Update | [#5620](https://github.com/gardener/gardener/pull/5620), [#5587](https://github.com/gardener/gardener/pull/5587), [dashboard#1262](https://github.com/gardener/dashboard/pull/1262) |

  #### No Demo, But Still Worth Celebrating 🎉

  - ✨ [USER] The `ServiceAccount` signing key rotation procedure has been improved and should work better for clusters with lots of `ServiceAccount`s or intermittent creations/deletions of new/old `ServiceAccount` secrets. [#7313](https://github.com/gardener/gardener/pull/7313)
  - 🐛 [USER] A bug in the kubelet-monitor script running on all shoot worker nodes has been fixed which was causing to also kill processes other than kubelet only. [#7278](https://github.com/gardener/gardener/pull/7278)
  - ✨ [OPERATOR] The legacy VPN solution has been removed. The feature gates `ReversedVPN`, `ManagedIstio` and `APIServerSNI` are unconditionally enabled (locked to their default values) now. [#7167](https://github.com/gardener/gardener/pull/7167)
  - ✨ [OPERATOR] `gardener-operator` is now managing the load balancer `Service` for exposing the `virtual-garden-kube-apiserver` as part of the virtual garden cluster control plane. It is possible to specify annotations for it via `.spec.runtimeCluster.settings.loadBalancerServices.annotations` in the `Garden` resource. [#7238](https://github.com/gardener/gardener/pull/7238)
  - 🐛 [OPERATOR] When deploying `kube-apiserver` version `v1.24`, Gardener will add the `--shutdown-send-retry-after=true` command line flag to the `kube-apiserver` command. [...]. [#7250](https://github.com/gardener/gardener/pull/7250)
  - ✨ [DEVELOPER] The `HighAvailabilityConfig` webhook now also mutates replica settings of `HPA` and `HVPA` resources. To make use of this handling, please label respective resources with the well known `high-availability-config.resource.gardener.cloud/type` label [...]. [#7226](https://github.com/gardener/gardener/pull/7226)
  - ✨ [DEVELOPER] It is now possible to make secrets manager adopt existing secrets. Find out more in [this document](https://github.com/gardener/gardener/blob/master/docs/development/secrets_management.md#migrating-existing-secrets-to-secretsmanager). [#7243](https://github.com/gardener/gardener/pull/7243)
  - 📖 [DEVELOPER] The Gardener project has introduced a policy for the number of supported Kubernetes versions [read it here](https://github.com/gardener/gardener/tree/master/docs/usage/supported_k8s_versions.md#support-timeline). [#7300](https://github.com/gardener/gardener/pull/7300)

  <hr />

  ### 2023/01/25 - [v1.63](https://github.com/gardener/gardener/releases/tag/v1.63.0) Release (Part I)

  #### Demo Agenda 📋

  | Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
  | ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
  | [@rgroemmer](https://github.com/rgroemmer) | `5m` | 💿 OpenStack `StorageClass`es Via `CloudProfile`s | [provider-openstack#408](https://github.com/gardener/gardener-extension-provider-openstack/pull/408) |
  | [@ScheererJ](https://github.com/ScheererJ) | `10m` | 👨‍👩‍👧 Highly Available Istio Deployment | [#6997](https://github.com/gardener/gardener/pull/6997) |
  | [@shafeeqes](https://github.com/shafeeqes) | `5m` | 👀 New `ObservabilityComponentsHealthy` Condition For `Shoot`s | [#7325](https://github.com/gardener/gardener/pull/7325) |
  | [@acumino](https://github.com/acumino) | `5m` | 🛵 Catching Long-Running Stuck Rollouts | [#7241](https://github.com/gardener/gardener/pull/7241) |

  <hr />

  ### 2023/01/18 - [v1.62](https://github.com/gardener/gardener/releases/tag/v1.62.0) Release

  #### Demo Agenda 📋

  | Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
  | ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
  | [@dimityrmirchev](https://github.com/dimityrmirchev) | `10m` | 🪐 Extension Lifecycle Strategies | [#6999](https://github.com/gardener/gardener/pull/6999) |
  | [@rfranzke](https://github.com/rfranzke) | `10m` | 🧑‍💻 [operator] ETCD Management, Credentials Rotation, Validation | [#7067](https://github.com/gardener/gardener/pull/7067), [#7144](https://github.com/gardener/gardener/pull/7144), [#7225](https://github.com/gardener/gardener/pull/7225) |
  | [@acumino](https://github.com/acumino) | `5m` | 🧰 Tracking Last Maintenance Operation | [#7035](https://github.com/gardener/gardener/pull/7035) |
  | [@oliver-goetz](https://github.com/oliver-goetz) | `10m` | 💻 kind-Based Local Setup For Extensions | [#6678](https://github.com/gardener/gardener/pull/6678) |
  | [@MartinWeindel](https://github.com/MartinWeindel) | `10m` | 👨‍👩‍👦 Highly Available VPN Deployment | [#6978](https://github.com/gardener/gardener/pull/6978) |

  #### No Demo, But Still Worth Celebrating 🎉

  - ✨ [USER] `gardener-admission-controller` now validates `Shoot` Kubernetes version compatibility with Audit Policy API version on `Shoot` update request. [#7205](https://github.com/gardener/gardener/pull/7205)
  - ✨ [USER] It is now possible to configure the general log verbosity and the verbosity for HTTP access logs for the `kube-apiserver` via the `Shoot` specification. [#7094](https://github.com/gardener/gardener/pull/7094)
  - 🐛 [OPERATOR] Prevent updating `Shoot`s which are scheduled to a `Seed` with less then 3 zones to `spec.controlPlane.failureTolerance.type: zone` [#7195](https://github.com/gardener/gardener/pull/7195)
  - 📖 [DEVELOPER] A new document for developers has been added with a checklist for what to pay attention to when adding new components to garden, seed, or shoot clusters. Read it [here](https://github.com/gardener/gardener/blob/master/docs/development/component-checklist.md). [#7125](https://github.com/gardener/gardener/pull/7125)

</details>

## Community Calls (2022 and before)

<details>
  <summary>Click here to expand the archived overview of the Community Calls in 2022 and before!</summary>

  | Topic | Speaker | Date and Time | Link |
  | ----- | ------- | ------------- | ------- |
  |**Get more computing power in Gardener by overcoming Kubelet limitations with CRI-resource-manager** |[Pawel Palucki](https://github.com/ppalucki), [Alexander D. Kanevskiy](https://github.com/kad)|October 20, 2022|[Recording](https://www.youtube.com/watch?v=5a_A3furzlg) <br> [Summary](../blog/2022/10.20-Gardener-Community-Meeting-October-2.md)|
  |**Cilium / Isovalent Presentation**|[Raymond de Jong](https://github.com/raymonddejong)|October 6, 2022|[Recording](https://www.youtube.com/watch?v=46nCdVA-rsc) <br> [Summary](../blog/2022/10.06-Gardener-Community-Meeting-October.md)|
  |**Gardener Extension Development - From scratch to the gardener-extension-shoot-flux**|[Jens Schneider](https://github.com/jensac), Lothar Gesslein|June 9, 2022|[Recording](https://www.youtube.com/watch?v=nG2FRYL05mc&ab_channel=GardenerProject) <br> [Summary](../blog/2022/06.17-Gardener-Community-Meeting-June.md)|
  |**Deploying and Developing Gardener Locally (Without Any External Infrastructure!)**|[Tim Ebert](https://github.com/timebertt), [Rafael Franzke](https://github.com/rfranzke)|March 17, 2022|[Recording](https://www.youtube.com/watch?v=nV_JI8YWwY4&ab_channel=GardenerProject) <br> [Summary](../blog/2022/03.23-Gardener-Community-Meeting-March.md)|
  |**Gardenctl-v2**|[Holger Koser](https://github.com/holgerkoser), [Lukas Gross](https://github.com/grolu), [Peter Sutter](https://github.com/petersutter)|February 17, 2022|[Recording](https://www.youtube.com/watch?v=U1VvyQiE3Jg) <br> [Summary](../blog/2022/02.17-Gardener-Community-Meeting-February.md)|
</details>
