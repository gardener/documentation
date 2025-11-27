---
title: '2022'
weight: -2022
outline: 3
prev: false
next: false
---

# Gardener Review Meetings (2022)

In case you couldn't participate and are interested in catching up, you can find the contents of the review meetings we have had in 2022 here.

Note that all review meetings in 2022 were SAP-internal meetings back then. Despite those, we also had a few [Community Meetings](./2022-community.md) in the public.

## Reviews

### 2022/12/07 - [v1.61](https://github.com/gardener/gardener/releases/tag/v1.61.0) Release

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                      |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@grolu](https://github.com/grolu) | `10m` | 🕹 Recent Gardener Dashboard Features | [dashboard (repo)](https://github.com/gardener/dashboard) |
| [@shreyas-s-rao](https://github.com/shreyas-s-rao) | `5m` | 📊 Grafana Dashboard For Multi-Node ETCD | [#7023](https://github.com/gardener/gardener/pull/7023) |
| [@DockToFuture](https://github.com/DockToFuture) | `10m` | 🕸️ Removal Of Overlay Networks | [backlog#29 (issue)](https://github.com/gardener/backlog/issues/29) |
| [@kon-angelo](https://github.com/kon-angelo) | `5m` | 🏷️ Annotate OpenStack VMs With Pool Labels | [provider-openstack#511](https://github.com/gardener/gardener-extension-provider-openstack/pull/511) |
| [@rfranzke](https://github.com/rfranzke) | `10m` | 🧑🏼‍🌾 Introduction Of Gardener Operator | [#7009](https://github.com/gardener/gardener/pull/7009), [#7048](https://github.com/gardener/gardener/pull/7048) |

#### No Demo, But Still Worth Celebrating 🎉

- 🪓 [USER] Gardener does no longer support shoot clusters with Kubernetes versions `< 1.20`. [...] [#6987](https://github.com/gardener/gardener/pull/6987)
- ✨ [USER] The `kube-apiserver` is now verifying the server certificates presented by `kubelet`s. [#7047](https://github.com/gardener/gardener/pull/7047)
- 🪓 [OPERATOR] The already deprecated `SeedKubeScheduler` feature gate is now removed. [...] Instead, use the `bin-packing` scheduling profile. [#7052](https://github.com/gardener/gardener/pull/7052)
- ✨ [OPERATOR] The `gardener-seed-admission-controller` binary has been dropped from the code. Its logic has been merged into `gardener-resource-manager`. [#7053](https://github.com/gardener/gardener/pull/7053)

<hr />

### 2022/11/23 - [v1.60](https://github.com/gardener/gardener/releases/tag/v1.60.0) Release

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                      |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@rfranzke](https://github.com/rfranzke) | `10m` | 👨‍👩‍👦 High Availability Deployment Configurations | [#6967](https://github.com/gardener/gardener/pull/6967), [#6982](https://github.com/gardener/gardener/pull/6982), [#6989](https://github.com/gardener/gardener/pull/6989), [#6992](https://github.com/gardener/gardener/pull/6992) |
| [@seshachalam-yv](https://github.com/seshachalam-yv) | `5m` | 🧪 E2E Tests For Upgrading `Shoot`s To Become Highly Available | [#6910](https://github.com/gardener/gardener/pull/6910) |
| [@istvanballok](https://github.com/istvanballok), [@rickardsjp](https://github.com/rickardsjp) | `10m` | 🧾 Monthly Average Resource Usage of `Shoot`s | [#6944](https://github.com/gardener/gardener/pull/6944) |
| [@axel7born](https://github.com/axel7born) | `5m` | 🚦 Disable DNS Query Forwarding For External Domains | [#6942](https://github.com/gardener/gardener/pull/6942) |
| [@danielfoehrKn](https://github.com/danielfoehrKn) | `10m` | 🔫 Prevent `containerd`-Monitor From Terminating `containerd-shim`s | [#6696](https://github.com/gardener/gardener/pull/6696) |

#### No Demo, But Still Worth Celebrating 🎉

- ✨ [OPERATOR] The field `ManagedSeed.spec.seedTemplate` has been deprecated and will be removed very soon in a future release of Gardener. [...] [#7006](https://github.com/gardener/gardener/pull/7006)
- ✨ [OPERATOR] The seed `vpa-recommender` is no longer scaled by VPA. Instead, fixed resource request values are used. [#7001](https://github.com/gardener/gardener/pull/7001)
- 🐛 [OPERATOR] A bug was fixed where sometimes the `kube-apiserver` was deleted during shoot deletion flow even though there were still shoot managed resources present. [#7008](https://github.com/gardener/gardener/pull/7008)
- ✨ [DEPENDENCY] `Deployment`s or `StatefulSet`s deployed by extensions in seed or shoot clusters can now benefit from the new `high-availability-config` webhook for automatically mutating the HA-related configuration of these resources. Please refer to [this](https://github.com/gardener/gardener/blob/master/docs/extensions/conventions.md#high-availability-of-deployed-components) document. [#6967](https://github.com/gardener/gardener/pull/6967)
- ✨ [DEPENDENCY] Extension controllers no longer perform owner checks based on the owner `DNSRecord` at the start of their reconciliations. [#6973](https://github.com/gardener/gardener/pull/6973)

<hr />

### 2022/11/09 - [v1.59](https://github.com/gardener/gardener/releases/tag/v1.59.0) Release

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                      |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@rfranzke](https://github.com/rfranzke) | `5m` | 👨‍👩‍👦 High Availability-related API Changes | [#6914](https://github.com/gardener/gardener/pull/6914), [#6915](https://github.com/gardener/gardener/pull/6915) | 
| [@briantopping](https://github.com/briantopping), [@tuxgoose](https://github.com/tuxgoose) | `10m` | 🧪 TestMachinery Running Alongside of Google Cloud VMware Engine | [provider-vsphere (repo)](https://github.com/gardener/gardener-extension-provider-vsphere/) |
| [@dimityrmirchev](https://github.com/dimityrmirchev) | `5m` | 📝 `kubelet` Container Logs Maximum Configurations | [#6702](https://github.com/gardener/gardener/pull/6702) |

#### No Demo, But Still Worth Celebrating 🎉

- ✨ [USER] The rotation procedure of the `ServiceAccount` token signing key has been improved. [#6943](https://github.com/gardener/gardener/pull/6943) 
- ✨ [OPERATOR] The `ManagedResource`s related to seed system components are now labeled with `gardener.cloud/role=system-component`. [#6836](https://github.com/gardener/gardener/pull/6836) 
- ✨ [DEPENDENCY] Extensions can now use the `extensions/pkg/util.{DetermineError,DetermineErrorCodes}` functions for conveniently handling errors with codes. [#6912](https://github.com/gardener/gardener/pull/6912) 
- ✨ [DEPENDENCY] `gardener-extensions-controller` package includes CLI parameter for `--log-level` and `--log-format` now. [#6875](https://github.com/gardener/gardener/pull/6875) 
- ✨ [DEVELOPER] The `gardener-resource-manager` component has been reworked entirely. It now uses a component config instead of CLI flags. Also, its Helm chart has been reworked entirely. [#6865](https://github.com/gardener/gardener/pull/6865) 

<hr />

### 2022/11/02 - [v1.58](https://github.com/gardener/gardener/releases/tag/v1.58.0) Release (Part II)

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                      |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@petersutter](https://github.com/petersutter) | `10m` | 🕹 Recent Gardener Dashboard Updates | [dashboard (repo)](https://github.com/gardener/dashboard) |
| [@plkokanov](https://github.com/plkokanov) | `10m` | 💓 Extension Controller Heartbeats | [#6626](https://github.com/gardener/gardener/pull/6626) |
| [@rfranzke](https://github.com/rfranzke) | `10m` | 🪪 `kubelet`'s Server Certificate | [#6784](https://github.com/gardener/gardener/pull/6784) |

<hr />

### 2022/10/26 - [v1.58](https://github.com/gardener/gardener/releases/tag/v1.58.0) Release (Part I)

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                      |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@istvanballok](https://github.com/istvanballok) | `5m` | 🔫 Eliminating VPA Exporter | [#6771](https://github.com/gardener/gardener/pull/6771) |
| [@istvanballok](https://github.com/istvanballok) | `10m` | 🤯 Remote Local Setup - WHAT??? | [#6730](https://github.com/gardener/gardener/pull/6730) |
| [@timuthy](https://github.com/timuthy) | `10m` | 🚿 Topology Spread Constraints | [#6665](https://github.com/gardener/gardener/pull/6665), [#6674](https://github.com/gardener/gardener/pull/6674), [#6685](https://github.com/gardener/gardener/pull/6685) |
| [@axel7born](https://github.com/axel7born) | `10m` | 🔒 Network Policies in `Seed`s for Istio | [#6765](https://github.com/gardener/gardener/pull/6765), [#6826](https://github.com/gardener/gardener/pull/6826) |
| [@timebertt](https://github.com/timebertt) | `5m` | ⚡️ Making Resource-Manager's Health Controller Lightning-Fast | [#6770](https://github.com/gardener/gardener/pull/6770) |

#### No Demo, But Still Worth Celebrating 🎉

- 🪓 [USER] `Shoot`s with failure tolerance type `node` can be scheduled on `Seed`s with `.spec.highAvailability != nil` only. [#6833](https://github.com/gardener/gardener/pull/6833)
- 🐛 [USER] Shoot worker definitions are now validated using `.spec.kubernetes.kubelet` when `.spec.provider.workers[].kubernetes.kubelet` is not specified. [#6741](https://github.com/gardener/gardener/pull/6741)
- 🪓 [OPERATOR] `HAControlPlanes` feature flag is removed from `gardener-scheduler`. [#6833](https://github.com/gardener/gardener/pull/6833)
- 🪓 [OPERATOR] Remove `DNSProvider` from supported extension kinds. [#6840](https://github.com/gardener/gardener/pull/6840)
- 🐛 [OPERATOR] Remove `/scale` subresource from `Etcd` CRD. [#6850](https://github.com/gardener/gardener/pull/6850)
- ✨ [OPERATOR] Short names for `Machine` (`mc`), `MachineClass` (`mcc`), `MachineDeployment` (`mcd`), and `MachineSet` (`mcs`) resources are now added. [#6787](https://github.com/gardener/gardener/pull/6787)
- ✨ [OPERATOR] Gardenlet will not start in case the seed configuration is incorrect, i.e. if the node, pod or service network specified in the Seed resource do not match to the cluster reality. [#6782](https://github.com/gardener/gardener/pull/6782)

<hr />

### 2022/10/12 - [v1.57](https://github.com/gardener/gardener/releases/tag/v1.57.0) Release

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                      |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@seshachalam-yv](https://github.com/seshachalam-yv) | `5m` | 🧪 Local E2E Tests For High Availability Scenario | [#6719](https://github.com/gardener/gardener/pull/6719) |
| [@vpnachev](https://github.com/vpnachev) | `10m` | ✍️ Extension For Image Signature Verification | [shoot-lakom-service (repo)](https://github.com/gardener/gardener-extension-shoot-lakom-service) |
| [@ialidzhikov](https://github.com/ialidzhikov) | `5m` | 🪴 Seed Selector in `CloudProfile` and `Shoot`| [#6680](https://github.com/gardener/gardener/pull/6680) |

#### No Demo, But Still Worth Celebrating 🎉

- ✨ [USER] The create/modify/delete permissions for `ServiceAccount`s assigned to `Project` members with the admin role are now removed. Read permissions are preserved. [...] [#6740](https://github.com/gardener/gardener/pull/6740)
- 🪓 [OPERATOR] Deprecated functions `DeprecatedDetermineError` and `DeprecatedDetermineErrorCodes` will be dropped in the upcoming releases, extensions using these functions now need to use their own methods to get the error code from the errors. [#6677](https://github.com/gardener/gardener/pull/6677)
- ✨ [OPERATOR] Logs from pods managed by `garden-resource-manager` will be scraped and stored in the shoot's Loki. [#6748](https://github.com/gardener/gardener/pull/6748)
- ✨ [OPERATOR] The `ShootCARotation` and `ShootSARotation` feature gates have been promoted to beta and are now enabled by default. [...] [#6734](https://github.com/gardener/gardener/pull/6734)

<hr />

### 2022/10/06 - [v1.56](https://github.com/gardener/gardener/releases/tag/v1.56.0) Release

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                      |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@rishabh-11](https://github.com/rishabh-11) | `10m` | 🍼 Configurable Throughput for AWS Disks | [machine-controller-manager-provider-aws#95](https://github.com/gardener/machine-controller-manager-provider-aws/pull/95) |
| [@ScheererJ](https://github.com/ScheererJ) | `10m` | 🧷 Make Istio's Ingress Gateway Traffic Zone-Aware | [#6653](https://github.com/gardener/gardener/pull/6653) |
| [@shafeeqes](https://github.com/shafeeqes) | `10m` | ⎈ Kubernetes 1.25 Support | [#6638](https://github.com/gardener/gardener/pull/6638) |
| [@plkokanov](https://github.com/plkokanov) | `10m` | 🔍 Validation For Admission Plugins | [#6625](https://github.com/gardener/gardener/pull/6625) |

#### No Demo, But Still Worth Celebrating 🎉

- ✨ [USER] Introduce shoot spec field `spec.controlPlane` to allow enabling HA control planes with failure tolerance type of `node` or `zone`. [...] [#6530](https://github.com/gardener/gardener/pull/6530)
- ✨ [OPERATOR] gardenlet is now using `gcr.io/distroless/static-debian11:nonroot` instead of versions of `alpine` as a base image. [#6641](https://github.com/gardener/gardener/pull/6641)
- ✨ [DEVELOPER] The e2e tests do now also tear down the Gardener environment, effectively verifying whether the `Seed` deletion works as expected. [#6664](https://github.com/gardener/gardener/pull/6664)

<hr />

### 2022/09/21 - [v1.55](https://github.com/gardener/gardener/releases/tag/v1.55.0) Release (Part II)

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                      |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@plkokanov](https://github.com/plkokanov) | `10m` | 🌓 `Progressing` Status For `Seed` Conditions  | [#6551](https://github.com/gardener/gardener/pull/6551), [#6587](https://github.com/gardener/gardener/pull/6587), [#6590](https://github.com/gardener/gardener/pull/6590) |
| [@oliver-goetz](https://github.com/oliver-goetz) | `5m` | 🗿 Replacement Of Release Milestone GitHub Action | [#6627](https://github.com/gardener/gardener/pull/6627) |
| [@istvanballok](https://github.com/istvanballok), [@wyb1](https://github.com/wyb1), [@rickardsjp](https://github.com/rickardsjp) | `15m` | 📊 `containerd`-Related Monitoring Fixes | [#6574](https://github.com/gardener/gardener/pull/6574), [#6628](https://github.com/gardener/gardener/pull/6628) |
| [@rfranzke](https://github.com/rfranzke) | `5m` | 💿 Local Container Image Pull-Through Cache | [#6591](https://github.com/gardener/gardener/pull/6591) |

<hr />

### 2022/09/14 - [v1.55](https://github.com/gardener/gardener/releases/tag/v1.55.0) Release (Part I)

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                      |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@grolu](https://github.com/grolu) | `5m` | 🕹 Dashboard Release Updates | [dashboard@1.61.0](https://github.com/gardener/dashboard/releases/tag/1.61.0) |
| [@ishan16696](https://github.com/ishan16696) | `10m` | 💾 ETCD Member Restoration | [etcd-backup-restore#509](https://github.com/gardener/etcd-backup-restore/pull/509) |
| [@ialidzhikov](https://github.com/ialidzhikov) | `5m` | ⛓ Do Not Run Privileged Containers | [backlog#7 (issue)](https://github.com/gardener/backlog/issues/7) |
| [@MartinWeindel](https://github.com/MartinWeindel), [@ScheererJ](https://github.com/ScheererJ) | `10m` | 🚏 Custom AWS Route Controller | [provider-aws#591](https://github.com/gardener/gardener-extension-provider-aws/pull/591), [provider-aws#596](https://github.com/gardener/gardener-extension-provider-aws/pull/596) |
| [@shafeeqes](https://github.com/shafeeqes) | `5m` | 🛡 `PodSecurityPolicy` -> Pod Security Admission Migration Update | [#5250 (issue)](https://github.com/gardener/gardener/issues/5250) |

#### No Demo, But Still Worth Celebrating 🎉

- ✨ [DEVELOPER] The existing `ManagedSeed` e2e test has been enhanced with verifications for the three gardenlet kubeconfig rotation scenarios. [#6568](https://github.com/gardener/gardener/pull/6568)
- ✨ [OPERATOR] gardenlet's `SeedKubeScheduler` feature gate is now deprecated in favor of the bin-packing scheduling profile that can be configured for a `Shoot` referred by a `ManagedSeed`. [#6599](https://github.com/gardener/gardener/pull/6599)
- ✨ [OPERATOR] Gardenlet now checks that the seed network configuration conforms to the reality in the seed cluster in case the seed is a shoot itself. [#6576](https://github.com/gardener/gardener/pull/6576)
- 🐛 [OPERATOR] A bug has been fixed which caused the `EveryNodeReady` condition on Shoots to become `False` and complaining about outdated cloud configs on nodes during rolling updates. [#6555](https://github.com/gardener/gardener/pull/6555)

<hr />

### 2022/08/31 - [v1.54](https://github.com/gardener/gardener/releases/tag/v1.54.0) Release

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                      |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@ialidzhikov](https://github.com/ialidzhikov) | `10m` | 🛡 Seccomp Profile Defaulting For Seed Workload | [#6450](https://github.com/gardener/gardener/pull/6450) |
| [@MartinWeindel](https://github.com/MartinWeindel) | `5m` | 🌍 Network Problem Detector Updates | [shoot-networking-problemdetector#21](https://github.com/gardener/gardener-extension-shoot-networking-problemdetector/pull/21), [shoot-networking-problemdetector#18](https://github.com/gardener/gardener-extension-shoot-networking-problemdetector/pull/18) |
| [@ScheererJ](https://github.com/ScheererJ) | `10m` | 📬 Shoot DNS Rewriting | [#6192](https://github.com/gardener/gardener/pull/6192) |
| [@MartinWeindel](https://github.com/MartinWeindel) | `5m` | 🏋🏻‍♂️ Weighted Routing Policy For `DNSEntry`s | [external-dns-management#270](https://github.com/gardener/external-dns-management/pull/270) |
| [@timuthy](https://github.com/timuthy) | `10m` | 📌 Zone Pinning on Multi-Zonal Seeds | [#6579](https://github.com/gardener/gardener/pull/6579) |

#### No Demo, But Still Worth Celebrating 🎉

- ✨ [DEVELOPER] Gardener envtest now supports running against an existing gardener setup via `USE_EXISTING_GARDENER`, see [doc](https://github.com/gardener/gardener/blob/master/docs/development/testing.md#debugging-integration-tests) [#6497](https://github.com/gardener/gardener/pull/6497) (will be presented in the next review meeting)
- ✨ [DEVELOPER] A new `gomegacheck` linter is now executed on make check. [...] [#6455](https://github.com/gardener/gardener/pull/6455)
- ✨ [OPERATOR] `Plant` API has been dropped, operators need to clean up `Plant` resources before upgrading the Gardener version to v1.54. [#6472](https://github.com/gardener/gardener/pull/6472)
- ✨ [OPERATOR] The `DNSProvider` extension kind was removed. Please make sure to remove any `ControllerRegistration`s that include the DNSProvider kind. [...] [#6479](https://github.com/gardener/gardener/pull/6479)
- 🐛 [OPERATOR] Shoots are correctly labeled for globally enabled extensions now. [#6534](https://github.com/gardener/gardener/pull/6534)

<hr />

### 2022/08/17 - [v1.53](https://github.com/gardener/gardener/releases/tag/v1.53.0) Release

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                      |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@oliver-goetz](https://github.com/oliver-goetz) | `5m` | ⚙️ Custom REST Configuration For Shoot Clients | [#6276](https://github.com/gardener/gardener/pull/6276) |
| [@unmarshall](https://github.com/unmarshall) | `10m` | 📖 [GEP-20] HA Shoot Control Planes | [#6287](https://github.com/gardener/gardener/pull/6287) |
| [@vlvasilev](https://github.com/vlvasilev) | `10m` | 🪵 Shoot `event-logger` | [#6223](https://github.com/gardener/gardener/pull/6223) |
| [@dimityrmirchev](https://github.com/dimityrmirchev) | `5m` | 🏷 Label All Managed Resources | [#6393](https://github.com/gardener/gardener/pull/6393) |
| [@ishan16696](https://github.com/ishan16696) | `10m` | 🧪 E2E Tests For `etcd-druid` | [etcd-druid#296](https://github.com/gardener/etcd-druid/pull/296) |

#### No Demo, But Still Worth Celebrating 🎉

- ✨ Enforce that Shoot nginx-ingress addon and Seed VPA are not enabled for ManagedSeeds. [#6388](https://github.com/gardener/gardener/pull/6388)
- ✨ Promote the `SecretBindingProviderValidation` feature gate to GA. [#6429](https://github.com/gardener/gardener/pull/6429)
- ✨ Promote `SeedChange` and `CopyEtcdBackupsDuringControlPlaneMigration` feature gates to beta. [#6452](https://github.com/gardener/gardener/pull/6452)

<hr />

### 2022/08/03 - [v1.52](https://github.com/gardener/gardener/releases/tag/v1.52.0) Release

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                      |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@dkistner](https://github.com/dkistner) | `10m` | 🪪 Pod CIDR Allocation For Nodes | [provider-azure#539](https://github.com/gardener/gardener-extension-provider-azure/pull/539) |
| [@timebertt](https://github.com/timebertt) | `5m` | 📝 Streamlined Logging In Controllers | [#4251 (issue)](https://github.com/gardener/gardener/issues/4251) |
| [@acumino](https://github.com/acumino) | `5m` | 🏛 Improvements For Multiple Architectures | [#6324](https://github.com/gardener/gardener/pull/6324), [#6327](https://github.com/gardener/gardener/pull/6327) |
| [@timuthy](https://github.com/timuthy) | `10m` | ⬆️ ETCD Cluster Scale Up | [etcd-backup-restore#487](https://github.com/gardener/etcd-backup-restore/pull/487) |
| [@shafeeqes](https://github.com/shafeeqes) | `5m` | 🩺 Skipping Health Checks For `ManagedResource`s| [#6309](https://github.com/gardener/gardener/pull/6309) |
| [@shafeeqes](https://github.com/shafeeqes) | `5m` | 💂🏻‍♀️ Disabling Admission Plugins | [#6403](https://github.com/gardener/gardener/pull/6403) |

#### No Demo, But Still Worth Celebrating 🎉

- ✨ Promote `DisableDNSProviderManagement` to GA. [#6341](https://github.com/gardener/gardener/pull/6341)
- ✨ Drop support for the `shoot.gardener.cloud/use-as-seed` annotation. [#6379](https://github.com/gardener/gardener/pull/6379)
- 🐛 Fix tools download for aarch64 (arm64) 🐧. [#6314](https://github.com/gardener/gardener/pull/6314)

<hr />

### 2022/07/20 - [v1.51](https://github.com/gardener/gardener/releases/tag/v1.51.0) Release

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                      |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@oliver-goetz](https://github.com/oliver-goetz) | `5m` | 📊 TestGrid For Prow | [ci-infra#257](https://github.com/gardener/ci-infra/pull/257) |
| [@ialidzhikov](https://github.com/ialidzhikov) | `10m` | ⚖️ `Shoot` Scheduling Profiles | [#6251](https://github.com/gardener/gardener/pull/6251) |
| [@wyb1](https://github.com/wyb1) | `5m` | 📖 [GEP-19] Migrating To `prometheus-operator` | [#6151](https://github.com/gardener/gardener/pull/6151) |
| [@kon-angelo](https://github.com/kon-angelo) | `10m` | 🔑 GCP Service Account Creation For Workers | [provider-gcp#451](https://github.com/gardener/gardener-extension-provider-gcp/pull/451) |
| [@ary1992](https://github.com/ary1992) | `5m` | ⚙️ Custom `containerd` Configuration | [#6293@`bdb4247`](https://github.com/gardener/gardener/pull/6293/commits/bdb4247bc664d00e5b734a19a607a632e0eb453f) |
| [@rfranzke](https://github.com/rfranzke) | `10m` | 🪞 Support For `ManagedSeed`s Locally | [#6293](https://github.com/gardener/gardener/pull/6293) |
| [@shafeeqes](https://github.com/shafeeqes) | `5m` | 🛡 `PodSecurityPolicy` -> Pod Security Admission Migration Plan | [#5250 (issue)](https://github.com/gardener/gardener/issues/5250) |

#### No Demo, But Still Worth Celebrating 🎉

- 📖 [DEVELOPER] A new testing strategy and developer guideline has been added. Make sure to check out the document if you want to learn more about the different kinds of tests we use and how to best write them! [#6245](https://github.com/gardener/gardener/pull/6245)
- 🐛 [OPERATOR] Health checks of ManagedResources are more reliable now when updating resources in the referenced secrets. [#6136](https://github.com/gardener/gardener/pull/6136)
- ✨ [OPERATOR] The new `ShootNodeLocalDNSEnabledByDefault` admission plugin of the `gardener-apiserver` (disabled by default) controls whether the `.spec.systemComponents.nodeLocalDNS.enabled` field for newly created Shoot resources is defaulted to true. [...] [#6279](https://github.com/gardener/gardener/pull/6279)
- ✨ [OPERATOR] Several feature gate changes: `SecretBindingProviderValidation` -> beta ([#6240](https://github.com/gardener/gardener/pull/6240)), `ShootMaxTokenExpiration{Overwrite,Validation}` and `RotateSSHKeypairOnMaintenance` -> removed ([#6241](https://github.com/gardener/gardener/pull/6241)), `Shoot{C,S}ARotation` -> beta ([#6252](https://github.com/gardener/gardener/pull/6252))

<hr />

### 2022/07/06 - [v1.50](https://github.com/gardener/gardener/releases/tag/v1.50.0) Release

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                      |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
|  [@ScheererJ](https://github.com/ScheererJ) / [@DockToFuture](https://github.com/DockToFuture) | `5m` | 🌍 Node Local DNS Improvements (Part 2) | [#6057](https://github.com/gardener/gardener/pull/6057) |
| [@rfranzke](https://github.com/rfranzke) | `10m` | 🧹 Automatic Remediation Of Problematic Shoot Webhooks | [#6090](https://github.com/gardener/gardener/pull/6090) |
| [@shafeeqes](https://github.com/shafeeqes) | `5m` | 🪢 New `shoots/binding` API To Bind `Shoot`s To `Seed`s | [#6018](https://github.com/gardener/gardener/pull/6018) |
| [@plkokanov](https://github.com/plkokanov) | `10m` | 🏗 Running Control Plane Migration Locally | [#5987](https://github.com/gardener/gardener/pull/5987), [#6059](https://github.com/gardener/gardener/pull/6059) |
| [@acumino](https://github.com/acumino) | `5m` | 🏛 API Changes For Supporting Multiple Architectures | [#6156](https://github.com/gardener/gardener/pull/6156), [#6178](https://github.com/gardener/gardener/pull/6178), [#6233](https://github.com/gardener/gardener/pull/6233) |
| [@timebertt](https://github.com/timebertt) | `10m` | 🛡 Warnings When Credentials Rotation Is Due | [#6110](https://github.com/gardener/gardener/pull/6110), [#6149](https://github.com/gardener/gardener/pull/6149) |
| [@grolu](https://github.com/grolu) | `5m`    | 🕹 Recent Gardener Dashboard Updates | [dashboard (repo)](https://github.com/gardener/dashboard) |

#### No Demo, But Still Worth Celebrating 🎉

- ✨ [DEVELOPER] `gardener-{apiserver,controller-manager,scheduler,admission-controller,seed-admission-controller,resource-manager}` are now using `gcr.io/distroless/static-debian11:nonroot` instead of versions of `alpine` as a base image. [#6159](https://github.com/gardener/gardener/pull/6159)
- ✨ [DEVELOPER] It is now possible to render charts from embedded file systems (`embed.FS`). The `Render` method of the `chartrenderer.Interface` in favour of `RenderEmbeddedFS`. [...] [#6165](https://github.com/gardener/gardener/pull/6165)
- ✨ [DEPENDENCY] Gardenlet now manages fine-granular `PriorityClasses` that are supposed to be used by all components in order to improve the overall robustness of the system. Find out more in the related [documentation](https://github.com/gardener/gardener/blob/master/docs/development/priority-classes.md). [...] [#6186](https://github.com/gardener/gardener/pull/6186)
- ✨ [OPERATOR] The `WorkerPoolKubernetesVersion` and `DisableDNSProviderManagement` feature gates have been promoted. [#6166](https://github.com/gardener/gardener/pull/6166), [#6142](https://github.com/gardener/gardener/pull/6142)
- ✨ [DEVELOPER] `k8s.io/*`  is now upgraded to `v0.24.1` and `sigs.k8s.io/controller-runtime` is now upgraded to `v0.12.1`. [#6101](https://github.com/gardener/gardener/pull/6101)
- 🐛 [OPERATOR] A disruption free CA rotation is now being supported for HA shoot clusters. [#6099](https://github.com/gardener/gardener/pull/6099)

<hr />

### 2022/06/22 - [v1.49](https://github.com/gardener/gardener/releases/tag/v1.49.0) Release

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                      |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@timuthy](https://github.com/timuthy) | `10m`    | 👨‍👦‍👦 New `HAControlPlane` Feature Gate | [#5741](https://github.com/gardener/gardener/pull/5741) |
| [@Diaphteiros](https://github.com/Diaphteiros) | `5m`    | 🛡 On-Demand Kubeconfig Renewal For `gardenlet` | [#6069](https://github.com/gardener/gardener/pull/6069) |
| [@rfranzke](https://github.com/rfranzke) | `5m`    | 📝 Dump Container Logs Of E2E Tests | [#6088](https://github.com/gardener/gardener/pull/6088), [#6089](https://github.com/gardener/gardener/pull/6089) |
| [@himanshu-kun](https://github.com/himanshu-kun) | `10m`    | 👾 GPU Support For GCP Worker Nodes | [provider-gcp#132 (issue)](https://github.com/gardener/gardener-extension-provider-gcp/issues/132) |
| [@ScheererJ](https://github.com/ScheererJ), [@DockToFuture](https://github.com/DockToFuture) | `10m` | 🌍 Node Local DNS Improvements (Part 1) | [#6057](https://github.com/gardener/gardener/pull/6057) |

#### No Demo, But Still Worth Celebrating 🎉

- ✨ [OPERATOR] A full snapshot of `etcd-main` is now triggered after all Secret were encrypted with the new key after ETCD encryption key rotation. [#6064](https://github.com/gardener/gardener/pull/6064)
- ✨ [OPERATOR] Making `blackbox-exporter` on shoots highly-available, to prevent false positive alerts during rollouts of `blackbox-exporter`, `apiserver-proxy` and worker nodes. [#6025](https://github.com/gardener/gardener/pull/6025)
- ✨ [DEPENDENCY] The generic `Worker` actuator now scales up `machine-controller-manager` Deployment when `Shoot` is hibernating (or waking up) and `machine-controller-manager` Deployment is already scaled down by external actor (`dependency-watchdog`). [#6054](https://github.com/gardener/gardener/pull/6054)

<hr />

### 2022/06/08 - [v1.48](https://github.com/gardener/gardener/releases/tag/v1.48.0) Release

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                      |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@rfranzke](https://github.com/rfranzke) | `10m`    | 🛡 Credentials Rotation (`ServiceAccount` Signing Key, ETCD Encryption Key) | [#5968](https://github.com/gardener/gardener/pull/5968), [#6021](https://github.com/gardener/gardener/pull/6021) |
| [@dimityrmirchev](https://github.com/dimityrmirchev) | `5m`    | 👔 New `serviceaccountmanager` `Project` Member Role | [#5971](https://github.com/gardener/gardener/pull/5971) |
| [@timebertt](https://github.com/timebertt) | `10m`    | 🛡 Extension Webhook Certificate Rotation | [#6003](https://github.com/gardener/gardener/pull/6003) |
| [@acumino](https://github.com/acumino) | `5m`    | ⎈ Kubernetes 1.24 Support | [#6023](https://github.com/gardener/gardener/pull/6023) |
| [@plkokanov](https://github.com/plkokanov) | `10m`    | 🧱 `SeedSystemComponentsHealthy` Condition Use Cases | [#5850 (issue)](https://github.com/gardener/gardener/issues/5850) |
| [@wyb1](https://github.com/wyb1) | `10m`    | 🛰 Make `blackbox-exporter` Work In Local Setup | [#6051](https://github.com/gardener/gardener/pull/6051) |


#### No Demo, But Still Worth Celebrating 🎉

- ✨ [USER] With the new `maintenance.gardener.cloud/operation` annotation for `Shoot`s it is now possible to confine the execution of the respective operation to the shoot cluster's maintenance time window. [#6039](https://github.com/gardener/gardener/pull/6039)
- ✨ [USER] There are two new `rotate-credentials-{start,complete}` operation annotations for `Shoot`s which can be used to start or complete the rotation of all Gardener-provided/Gardener-generated credentials. [#6038](https://github.com/gardener/gardener/pull/6038)
- 🐛 [USER] It is now possible again to migrate the CRIs for existing worker pools in shoot clusters. [#6004](https://github.com/gardener/gardener/pull/6004)
- 📖 [OPERATOR] The `ManagedIstio` and `APIServerSNI` feature gates are now deprecated. They are already turned on by default and will be removed in a future version of Gardener. [#6007](https://github.com/gardener/gardener/pull/6007)


<hr />

### 2022/05/25 - [v1.47](https://github.com/gardener/gardener/releases/tag/v1.47.0) Release

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                      |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@himanshu-kun](https://github.com/himanshu-kun) | `10m`    | 0️⃣ Generic Scale-To-Zero Support | [autoscaler#27 (issue)](https://github.com/gardener/autoscaler/issues/27) |
| [@krgostev](https://github.com/krgostev) | `10m`    | 🩺 `SystemComponentsHealthy` condition for `Seed`s | [#5274](https://github.com/gardener/gardener/pull/5274)
| [@rfranzke](https://github.com/rfranzke) | `5m`    | 🏗 `Progressing` condition for `ManagedResource`s | [#5904](https://github.com/gardener/gardener/pull/5904) |
| [@grolu](https://github.com/grolu) | `10m`    | 🕹 Recent Gardener Dashboard Updates | [dashboard (repo)](https://github.com/gardener/dashboard) |
| [@ary1992](https://github.com/ary1992) | `10m`    | 🛡 Observability Credentials Rotation | [#5926](https://github.com/gardener/gardener/pull/5926) |
| [@MartinWeindel](https://github.com/MartinWeindel) | `10m`    | 🌍 Network Problem Detector Extension | [shoot-networking-problemdetector (repo)](https://github.com/gardener/gardener-extension-shoot-networking-problemdetector) |

#### No Demo, But Still Worth Celebrating 🎉

- 📖 [USER] A new document related to the rotation of the CA certificate rotation has been added. [#5939](https://github.com/gardener/gardener/pull/5939)
- ✨ [DEVELOPER] `provider-local` now allows to enable the `dependency-watchdog-probe` in the seed cluster. [#5937](https://github.com/gardener/gardener/pull/5937)
- ✨ [DEVELOPER] `provider-local` now supports Ingress objects in the `Seed` cluster and now enables using the shoot node logging feature. [#5924](https://github.com/gardener/gardener/pull/5924)
- ✨ [OPERATOR] The `lastActivityTimestamp` of the `Project` is now updated every time a `Plant`, `BackupEntry` or `Shoot` is created, or a `Quota` or `Secret` in the project namespace is referred by a `SecretBinding`. The timestamp is also updated when these resources are updated or deleted. [#5821](https://github.com/gardener/gardener/pull/5821)

<hr />

### 2022/05/11 - [v1.46](https://github.com/gardener/gardener/releases/tag/v1.46.0) Release

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                      |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@timebertt](https://github.com/timebertt)      | `10m`    | 🛡️ Shoot Cluster CA Rotation e2e Demo | [#3292 (issue)](https://github.com/gardener/gardener/issues/3292) |
| [@dimityrmirchev](https://github.com/dimityrmirchev)      | `10m`    | 🧪 Extension e2e Tests Via Local Garden | [shoot-oidc-service#33](https://github.com/gardener/gardener-extension-shoot-oidc-service/pull/33) |
| [@krgostev](https://github.com/krgostev)      | `10m`    | 💾 `Backup{Bucket,Entry}` Support For Local Garden | [#5514](https://github.com/gardener/gardener/pull/5514) |
| [@istvanballok](https://github.com/istvanballok), [@wyb1](https://github.com/wyb1) | `10m`    | 📊 Connectivity Exporter | [connectivity-exporter (repo)](https://github.com/gardener/connectivity-exporter)  |
| [@ialidzhikov](https://github.com/ialidzhikov) | `5m`    | 🔎 Extension `SecretBinding` Validator | [provider-gcp#428](https://github.com/gardener/gardener-extension-provider-gcp/pull/428) |

#### No Demo, But Still Worth Celebrating 🎉

- 📖 [USER] Documentation for accessing the shoot cluster is added here. [#5849](https://github.com/gardener/gardener/pull/5849)
- 📖 [USER] There is a new document explaining the various configurations (and caveats) regarding the ServiceAccount configuration for shoot clusters. [#5888](https://github.com/gardener/gardener/pull/5888)
- ✨ [OPERATOR] The `WorkerPoolKubernetesVersion` feature gate has been promoted to beta and is now enabled by default.  [#5857](https://github.com/gardener/gardener/pull/5857)

<hr />

### 2022/04/27 - [v1.45](https://github.com/gardener/gardener/releases/tag/v1.45.0) Release

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                      |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@Diaphteiros](https://github.com/Diaphteiros)      | `10m`    | 🛡️ Virtual Garden Cluster CA Rotation | [#5735](https://github.com/gardener/gardener/pull/5735) |
| [@acumino](https://github.com/acumino)      | `5m`    | 🔎 API Diff PR Check To Detect Breaking Changes | [#5532](https://github.com/gardener/gardener/pull/5532) |
| [@shafeeqes](https://github.com/shafeeqes)      | `5m`    | 📈 Improved Cloud-Config Downloads To Save I/O | [#5768](https://github.com/gardener/gardener/pull/5768) |
| [@ScheererJ](https://github.com/ScheererJ)      | `10m`    | 🌍 Extension For Networking Filter  | [shoot-networking-filter (repo)](https://github.com/gardener/gardener-extension-shoot-networking-filter) |
| [@BeckerMax](https://github.com/BeckerMax)      | `10m`    | 🛡️ Dedicated Client CA For Shoots | [#5779](https://github.com/gardener/gardener/pull/5779) |
| [@rfranzke](https://github.com/rfranzke)      | `10m`    | 🛡️ Adaptation Of Extensions Library For CA Rotation | [#5803](https://github.com/gardener/gardener/pull/5803) |

#### No Demo, But Still Worth Celebrating 🎉

- 🐛 [OPERATOR] Fixed an issue that could cause the `cloud-config-downloader` to invalidate its credentials token if the node that it is currently running on has issues with the file system where the credentials token is stored (for example when the node runs out of disk space). [#5719](https://github.com/gardener/gardener/pull/5719)
- 📈 [OPERATOR] Increase the QPS and burst value for `kube-apiserver` requests for the `vpa-recommender` of Seed and Shoot clusters to better cope with large cluster sizes. [#5743](https://github.com/gardener/gardener/pull/5743)
- 📈 [OPERATOR] VPA binaries and dependency have been upgraded to 0.10.0. [#5716](https://github.com/gardener/gardener/pull/5716)
- ✨ Several Feature Gate Promotions: `DenyInvalidExtensionResources` ([#5793](https://github.com/gardener/gardener/pull/5793)) and `CachedRuntimeClients` ([#5752](https://github.com/gardener/gardener/pull/5752)) are now GA, `RotateSSHKeypairOnMaintenance` ([#5740](https://github.com/gardener/gardener/pull/5740)) and `ShootMaxTokenExpirationOverwrite` ([#5726](https://github.com/gardener/gardener/pull/5726)) are now beta.

<hr />

### 2022/04/13 - [v1.44](https://github.com/gardener/gardener/releases/tag/v1.44.0) Release

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                      |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@acumino](https://github.com/acumino)      | `5m`    | 🚪 Validation For Locked Feature Gates | [#5667](https://github.com/gardener/gardener/pull/5667) |
| [@ary1992](https://github.com/ary1992)      | `5m`    | 🛡️ Deactivation Of Static Shoot Kubeconfig | [#5649](https://github.com/gardener/gardener/pull/5649) |
| [@ishan16696](https://github.com/ishan16696)      | `10m`    | 💾 New `etcd-druid@v0.8` Release | [#5693](https://github.com/gardener/gardener/pull/5693) |
| [@rfranzke](https://github.com/rfranzke)      | `10m`    | 🛡️ Auto-Rotation Of Expiring Secrets | [#5679](https://github.com/gardener/gardener/pull/5679) |
| [@MartinWeindel](https://github.com/MartinWeindel)      | `10m`    | 🔗 Central DNS Proxy | [shoot-dns-service#104](https://github.com/gardener/gardener-extension-shoot-dns-service/pull/104) |
| [@oliver-goetz](https://github.com/oliver-goetz)      | `10m`    | 🖼 Prow Image Builds | [ci-infra#181](https://github.com/gardener/ci-infra/pull/181) |

#### No Demo, But Still Worth Celebrating 🎉

- 📈 [OPERATOR] CPU limits from all gardener components have been removed to prevent CPU throttling due to reaching limits. [#5627](https://github.com/gardener/gardener/pull/5627)
- 📈 [OPERATOR] Memory limits of all shoot control plane or system components have been removed or adjusted according to measured usage to prevent OOMKills due to reaching the limits. [#5689](https://github.com/gardener/gardener/pull/5689)
- 📈 [OPERATOR] VPA resources now use `controlledValues: RequestsOnly` to prevent the VPA mechanism from proportionally changing the limits, which doesn't make sense. [#5638](https://github.com/gardener/gardener/pull/5638)
- 🛡 [OPERATOR] `dependency-watchdog-probe` does no longer use a client certificate but an auto-rotated `ServiceAccount` token which is only valid for `12h`. [#5685](https://github.com/gardener/gardener/pull/5685)

<hr />

### 2022/03/30 - [v1.43](https://github.com/gardener/gardener/releases/tag/v1.43.0) Release

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                      |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@rfranzke](https://github.com/rfranzke)   | `5m`     | 🚀 Optimized `LIST nodes` Calls                                 | [#5529](https://github.com/gardener/gardener/pull/5529) |
| [@ialidzhikov](https://github.com/ialidzhikov)   | `5m`     | 💎 Improved `CheckDaemonSet` Function                           | [#5628](https://github.com/gardener/gardener/pull/5628) |
| [@timebertt](https://github.com/timebertt)      | `10m`    | 🛡️ New Secrets Manager                                          | [#5503](https://github.com/gardener/gardener/pull/5503) |
| [@acumino](https://github.com/acumino)  | `5m`     | ⚙️ Exclude Reconciliations Of `ManagedResource`s                | [#5556](https://github.com/gardener/gardener/pull/5556) |
| [@vlvasilev](https://github.com/vlvasilev) | `10m`    | 📃 Logs of `kube-system` Pods Are Now Scraped By Loki           | [#5600](https://github.com/gardener/gardener/pull/5600) |
| [@rfranzke](https://github.com/rfranzke)   | `10m`    | 🔧 Move `DNSRecord` Reconciliation Into Maintenance Time Window | [#5531](https://github.com/gardener/gardener/pull/5531) |
| [@oliver-goetz](https://github.com/oliver-goetz)   | `5m`     | 🎢 Move Of `unit` And `integration` Jobs To Prow                |   /                                                      |

#### No Demo, But Still Worth Celebrating 🎉

- ✨ [USER] There is a new Secret for each Shoot in the corresponding Project Namespace (`<shoot-name>.ca-cluster`) which contains the current CA bundle for establishing trust to the Shoot's API server. [#5612](https://github.com/gardener/gardener/pull/5612)
- 🐛 [OPERATOR] An issue causing Shoot deletion to fail in a rare case when the corresponding Shoot Namespace in the Seed is already terminating is now fixed. [#5555](https://github.com/gardener/gardener/pull/5555)
- 🐛 [USER] A race condition has been fixed which can lead to pods without any projected token volumes for newly created shoots. [#5549](https://github.com/gardener/gardener/pull/5549)
- 🐛 [USER] A bug causing shoot reconciliations or deletions to fail with "no matches for kind" errors has been fixed. [#5539](https://github.com/gardener/gardener/pull/5539)
