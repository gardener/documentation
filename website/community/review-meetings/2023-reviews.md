---
title: 2023
weight: -2023
---

# Gardener Review Meetings (2023)

In case you couldn't participate and are interested in catching up, you can find the contents of the review meetings we have had in 2023 here.

The meetings were recorded, but not published.

## Reviews

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
- 🪓 [DEVELOPER] The `extensions/pkg/controller/operatingsystemconfig/oscommon` package is deprecated and will be removed as soon as the `UseGardenerNodeAgent` feature gate has been promoted to GA. OS extension developers should start adapting to this new feature, see [documentation](https://github.com/gardener/gardener/blob/master/docs/extensions/resources/operatingsystemconfig.md#what-needs-to-be-implemented-to-support-a-new-operating-system) and [example](https://github.com/rfranzke/gardener/tree/gna/osc-api/pkg/provider-local/controller/operatingsystemconfig) based on `provider-local`. [#8647](https://github.com/gardener/gardener/pull/8647)

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
- ✨ [DEVELOPER] It is now easier to annotate `Service`s related to extensions serving webhook handlers that must be reached `by kube-apiserver`s running in separate namespaces such that the respective network traffic gets allowed. Please refer to [this guide](https://github.com/gardener/gardener/blob/master/docs/operations/network_policies.md#webhook-servers) for all information. [...]. [#8076](https://github.com/gardener/gardener/pull/8076)
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
- 📖 [DEVELOPER] The Gardener project has introduced a policy for the number of supported Kubernetes versions [read it here](https://github.com/gardener/gardener/tree/master/docs/usage/shoot-operations/supported_k8s_versions.md#support-timeline). [#7300](https://github.com/gardener/gardener/pull/7300)

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
