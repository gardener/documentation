---
title: 2026
weight: -2026
outline: 3
---

# Gardener Review Meetings (2026)

In case you couldn't participate and are interested in catching up, you can find the contents of the review meetings we have had in 2026 here.

Meetings are recorded and published on [Gardener's YouTube channel](https://www.youtube.com/playlist?list=PLozz-rrEP0dvhVTsHqa8plb7Ai6dG6Ox4).

Check back regularly for updates and upcoming topics!

## Reviews

### 2026/04/29 - [v1.141](https://github.com/gardener/gardener/releases/tag/v1.141.0) Release

[📽️ Recording]()

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@rfranzke](https://github.com/rfranzke) | `5m` | 🩺 `gardener-node-agent` Monitors `systemd` Unit Health | [#14496](https://github.com/gardener/gardener/pull/14496) |
| [@Shreyas-s14](https://github.com/Shreyas-s14) | `10m` | 🔂 etcd 3.4→3.5 Upgrade Path in `etcd-druid` | [etcd-druid#1281](https://github.com/gardener/etcd-druid/pull/1281), [etcd-druid#1300](https://github.com/gardener/etcd-druid/pull/1300) |
| [@ScheererJ](https://github.com/ScheererJ) | `5m` | 🏜️ Ingress NGINX Retirement | [#13448 (issue)](https://github.com/gardener/gardener/issues/13448) |
| [@timebertt](https://github.com/timebertt) | `10m` | 🐳 Local `cloud-controller-manager` for Load Balancers | [#14415](https://github.com/gardener/gardener/pull/14415) |
| [@AleksandarSavchev](https://github.com/AleksandarSavchev) | `5m` | 🔐 New `aesgcm` and `secretbox` Encryption Provider Types | [#14034](https://github.com/gardener/gardener/pull/14034) |
| [@petersutter](https://github.com/petersutter), [@grolu](https://github.com/grolu), [@klocke-io](https://github.com/klocke-io) | `10m` | 🕹 Gardener Dashboard Update | [1.84.0 (release)](https://github.com/gardener/dashboard/releases/tag/1.84.0) |

#### No Demo, But Still Worth Celebrating 🎉

- 🪓 [USER] Newly created `Shoot`s now have a set period of `28d` for etcd encryption key rotation. [#14034](https://github.com/gardener/gardener/pull/14034)
- 🪓 [OPERATOR] The `NewWorkerPoolHash` feature gate has been promoted to GA and can no longer be disabled. [#14531](https://github.com/gardener/gardener/pull/14531)
- 🐛 [USER] Cluster-proportional autoscaling of coredns now works with Kubernetes >= 1.33 [#14638](https://github.com/gardener/gardener/pull/14638)
- 🐛 [OPERATOR] The garbage collection logic now also deletes pods that are stuck due to preemption by the kubelet or scheduler. [#14519](https://github.com/gardener/gardener/pull/14519)

<hr />

### 2026/04/15 - [v1.140](https://github.com/gardener/gardener/releases/tag/v1.140.0) Release

[📽️ Recording](https://youtu.be/drpgkEjONwQ)

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@rrhubenov](https://github.com/rrhubenov) | `5m` | 🗑️ `RemoveVali` Feature Gate for `Vali` Instance Removal | [#14279](https://github.com/gardener/gardener/pull/14279) |
| [@rfranzke](https://github.com/rfranzke) | `10m` | 🌐 `NetworkPolicy` Controller Optimization | [#14410](https://github.com/gardener/gardener/pull/14410) |
| [@ScheererJ](https://github.com/ScheererJ) | `10m` | 🖥️ [GEP-28] Self-Hosted `Shoot` API Server Direct Access in Local Setup | [#14370](https://github.com/gardener/gardener/pull/14370) |
| [@tobschli](https://github.com/tobschli) | `10m` | 🎮 [GEP-28] Extension Management & `gardenlet` Controllers | [#2906 (issue)](https://github.com/gardener/gardener/issues/2906) |

#### No Demo, But Still Worth Celebrating 🎉

- 🐛 [OPERATOR] Fix a bug where the `shoot-care` controller cannot reconcile shoots with `spec.maintenance.confineSpecUpdateRollout=true` and updated DNS credentials, i.e. `shoot.spec.dns.providers[].credentialsRef`, until the shoot is reconciled. [#14397](https://github.com/gardener/gardener/pull/14397)
- 🐛 [USER] Fixed `EveryNodeReady` shoot condition incorrectly reporting `NodeAgentUnhealthy` for nodes not managed by MCM. [#14509](https://github.com/gardener/gardener/pull/14509)
- ❗️ [OPERATOR] Ingress-GCE no longer requires deployment of `BackendConfig` CRDs. In addition, the deployment of the default-http-backend in the shoot is no longer necessary and hence removed. [gardener-extension-provider-gcp#1320](https://github.com/gardener/gardener-extension-provider-gcp/pull/1320)
- 🐛 [OPERATOR] Fixing an issue where a rapid scale up and scale down can result in a cordoned machine in the cluster. [machine-controller-manager#1090](https://github.com/gardener/machine-controller-manager/pull/1090)

<hr />

### 2026/04/01 - [v1.139](https://github.com/gardener/gardener/releases/tag/v1.139.0) Release

[📽️ Recording](https://youtu.be/3-PobAcbtbw)

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@oliver-goetz](https://github.com/oliver-goetz) | `10m` | ⚖️ Dual Autoscaling for `istio-ingressgateway` with `VPA` and `HPA` | [#14313](https://github.com/gardener/gardener/pull/14313) |
| [@timuthy](https://github.com/timuthy) | `5m` | 🔐 Static Username Prefixes for `{Admin,Viewer}KubeconfigRequest`s | [#14252](https://github.com/gardener/gardener/pull/14252) |
| [@rfranzke](https://github.com/rfranzke) | `10m` | 🌐 Zone-Aware `Shoot` Control Plane Placement | [#14238](https://github.com/gardener/gardener/pull/14238) |
| [@jamand](https://github.com/jamand) | `5m` | 🌐 Custom Domain Support for `gardener-discovery-server` | [#14126](https://github.com/gardener/gardener/pull/14126) |
| [@DockToFuture](https://github.com/DockToFuture) | `10m` | 🚪 New [Traefik](https://github.com/traefik/traefik) Extension for `Shoot`s | [extension-shoot-traefik (repo)](https://github.com/gardener/gardener-extension-shoot-traefik) |

#### No Demo, But Still Worth Celebrating 🎉

- 🪓 [OPERATOR] Garden `.status.encryptedResources` field is removed, use Garden `.status.credentials.encryptionAtRest.resources` instead. [#14354](https://github.com/gardener/gardener/pull/14354)
- 🪓 [OPERATOR] The `raise-spec-limits` verb has been removed for `NamespacedCloudProfile`s because it is no-longer needed. [#14344](https://github.com/gardener/gardener/pull/14344)
- 🐛 [OPERATOR] A bug causing the `gardenlet` to crash during startup was fixed. Earlier, the startup procedure occasionally failed on large-scale seed clusters due to cache sync timeouts. [#14408](https://github.com/gardener/gardener/pull/14408)
- 🐛 [OPERATOR] An issue preventing the `shootstate-controller` of gardenlet to populate all required states to the ShootState for a self-hosted Shoot is now fixed. [#14339](https://github.com/gardener/gardener/pull/14339)

<hr />

### 2026/03/18 - [v1.138](https://github.com/gardener/gardener/releases/tag/v1.138.0) Release

[📽️ Recording](https://youtu.be/JQLnnNJHOew)

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@rfranzke](https://github.com/rfranzke) | `10m` | 🔄 Serial `OperatingSystemConfig` Reconciliation Coordination in `gardener-node-agent` | [#14129](https://github.com/gardener/gardener/pull/14129) |
| [@cerealsnow](https://github.com/cerealsnow) | `10m` | 🌍 Local Setup DNS via bind9 — No More `/etc/hosts` Manipulation | [#14062](https://github.com/gardener/gardener/pull/14062) |
| [@oliver-goetz](https://github.com/oliver-goetz) | `10m` | 🏗️ Provider Extensions Setup Migrated to `gardener-operator`-Based `remote` Setup | [#13994](https://github.com/gardener/gardener/pull/13994) |
| [@nickytd](https://github.com/nickytd) | `5m` | 🏷️ `ShootAdvertisedAddress` `Application` Field for UI-Friendly Endpoint Names | [#14140](https://github.com/gardener/gardener/pull/14140) |
| [@acumino](https://github.com/acumino) | `5m` | 🗺️ `gardenadm init/join` Availability Zone Support via `--zone` Flag | [#14081](https://github.com/gardener/gardener/pull/14081) |

#### No Demo, But Still Worth Celebrating 🎉

- ❗️ [OPERATOR] Hard memory limit on istio-ingress has been removed. Memory is managed by VPA in all cases now. [#14197](https://github.com/gardener/gardener/pull/14197)
- 🐛 [OPERATOR] Fixed a race condition in the `ControllerInstallation` reconciler that could create duplicate installations due to reading from a stale informer cache instead of the API server. [#14274](https://github.com/gardener/gardener/pull/14274)
- 🐛 [OPERATOR] The per-worker-pool `node-local-dns` `DaemonSet`s now also include the name of the worker in their label selector and in their Pods' labels. This resolves an issue where each of the corresponding `VPA`s targeted all `node-cache` containers from all of these `DaemonSet`s resulting in incorrect resource recommendations. [#14294](https://github.com/gardener/gardener/pull/14294)

<hr />

### 2026/03/11 - Kubernetes v1.35 Special Edition

[📽️ Recording](https://youtu.be/BV3w1l6lz-k)

#### Demo Agenda 📋

_Presenters:_ [@timuthy](https://github.com/timuthy), [@rfranzke](https://github.com/rfranzke)

| Duration | Topic                                                        | Reference(s)                                                     |
| -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| `15m` | 🎓 Graduation Ceremony<br><small>_Graduated Features_</small> | [KEP-1287](https://kep.k8s.io/1287), [KEP-5067](https://kep.k8s.io/5067), [KEP-4381](https://kep.k8s.io/4381), [KEP-3015](https://kep.k8s.io/3015), [KEP-4368](https://kep.k8s.io/4368), [KEP-4622](https://kep.k8s.io/4622), [KEP-5504](https://kep.k8s.io/5504) |
| `20m` | 🌸 Beta Bloom<br><small>_Alpha -> Beta Promotions_</small> | [KEP-4742](https://kep.k8s.io/4742), [KEP-4192](https://kep.k8s.io/4192), [KEP-4876](https://kep.k8s.io/4876), [KEP-5598](https://kep.k8s.io/5598), [KEP-961](https://kep.k8s.io/961), [KEP-5295](https://kep.k8s.io/5295), [KEP-127](https://kep.k8s.io/127), [KEP-4639](https://kep.k8s.io/4639), [KEP-2535](https://kep.k8s.io/2535), [KEP-5307](https://kep.k8s.io/5307), [KEP-3973](https://kep.k8s.io/3973) |
| `10m` | 🗞️ Fresh Off The Press<br><small>_New Alpha Features_</small> | [KEP-4671](https://kep.k8s.io/4671), [KEP-5284](https://kep.k8s.io/5284), [KEP-4828](https://kep.k8s.io/4828), [KEP-4827](https://kep.k8s.io/4827), [KEP-5440](https://kep.k8s.io/5440), [KEP-5237](https://kep.k8s.io/5237), [KEP-5471](https://kep.k8s.io/5471) |
| `5m` | 🧼 Security, Deprecations & Removals | [KEP-5495](https://kep.k8s.io/5495), [KEP-4033](https://kep.k8s.io/4033), [KEP-5573](https://kep.k8s.io/5573), [KEP-4781](https://kep.k8s.io/4781) |
| `5m` | 🪴 What's Changing In Gardener | [#13687](https://github.com/gardener/gardener/issues/13687), [#13845](https://github.com/gardener/gardener/pull/13845), [#13707](https://github.com/gardener/gardener/pull/13707) |

<hr />

### 2026/03/04 - [v1.137](https://github.com/gardener/gardener/releases/tag/v1.137.0) Release

[📽️ Recording](https://youtu.be/axIwAmhJ_Hw)

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@rfranzke](https://github.com/rfranzke) | `5m` | 🏠 GEPs Moved to New `gardener/enhancements` Repository | [#14043](https://github.com/gardener/gardener/pull/14043) |
| [@rfranzke](https://github.com/rfranzke) | `5m` | 🔑 Secrets Manager: Config Functions and Lazy CA Loading | [#14000](https://github.com/gardener/gardener/pull/14000) |
| [@rrhubenov](https://github.com/rrhubenov) | `10m` | 🪵 `VictoriaLogsBackend` Feature Gate | [#13988](https://github.com/gardener/gardener/pull/13988) |
| [@ScheererJ](https://github.com/ScheererJ) | `5m` | 🖥️ Node-Specific Configuration Files in `gardener-node-agent` | [#13412](https://github.com/gardener/gardener/pull/13412) |
| [@LucaBernstein](https://github.com/LucaBernstein) | `5m` | 📦 Go Submodule for Gardener APIs | [#13536](https://github.com/gardener/gardener/pull/13536) |

#### No Demo, But Still Worth Celebrating 🎉

- 🪓 [DEVELOPER] When using `ModeService` in the extension webhook library, the specified service port is now properly propagated when constructing the `admissionregistrationv1.WebhookClientConfig` for `{Validating,Mutating}WebhookConfiguration`s (previously, it was not specified at all and defaulted to `443` by Kubernetes). Make sure to specify `--webhook-config-service-port` to prevent falling back to the `--webhook-config-server-port` (if configured). [#14063](https://github.com/gardener/gardener/pull/14063)
- 🐛 [OPERATOR] Fixed the shoot-care controller panic for clusters where `.status.credentials.rotation` exists but `.status.credentials.encryptionAtRest` is nil. [#14147](https://github.com/gardener/gardener/pull/14147)
- 🐛 [OPERATOR] An issue causing the control-plane migration to get stuck if the source backup entry deployment was retried is now fixed. [#14091](https://github.com/gardener/gardener/pull/14091)
- 🐛 [USER] An issue which lead to a nil pointer in gardenlet when a Shoot had an empty `.spec.addons` structure defined is now fixed. [#14112](https://github.com/gardener/gardener/pull/14112)

<hr />

### 2026/02/18 - [v1.136](https://github.com/gardener/gardener/releases/tag/v1.136.0) Release

[📽️ Recording](https://youtu.be/jScp5zha7Fc)

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@oliver-goetz](https://github.com/oliver-goetz) | `5m` | 📝 `kube-apiserver` Access Logs | [#13569](https://github.com/gardener/gardener/pull/13569) |
| [@maxmsap](https://github.com/maxmsap) | `5m` | 🧲 `provider-ironcore`: Experimental GPU Support | [ironcore-dev/roadmap#31](https://github.com/ironcore-dev/roadmap/issues/31) |
| [@rfranzke](https://github.com/rfranzke) | `5m` | 📣 Manifest Propagation To `Shoot`s | [#13614](https://github.com/gardener/gardener/pull/13614) |
| [@vitanovs](https://github.com/vitanovs) | `10m` | ♻️ `InPlaceOrRecreate` VPA Update Mode Webhook | [#12940](https://github.com/gardener/gardener/pull/12940), [#13573](https://github.com/gardener/gardener/pull/13573) |
| [@DockToFuture](https://github.com/DockToFuture) | `5m` | 🤝 Seamless Overlay Network Switch | [networking-calico#779](https://github.com/gardener/gardener-extension-networking-calico/pull/779), [aws-custom-route-controller#411](https://github.com/gardener/aws-custom-route-controller/pull/411) |
| [@shafeeqes](https://github.com/shafeeqes) | `5m` | 🪪 Custom CA Bundle Support For Helm Repositories | [#13868](https://github.com/gardener/gardener/pull/13868) |
| [@timuthy](https://github.com/timuthy) | `5m` | ➕ Leftover Toleration During `Shoot` Cleanup | [#13918](https://github.com/gardener/gardener/pull/13918) |

#### No Demo, But Still Worth Celebrating 🎉

- ✨ [USER] Shoot addons (`.spec.addons`) have been deprecated and will be forbidden starting with Kubernetes 1.35. Their usage was already discouraged for productive clusters, as they now only include unmaintained components (Kubernetes dashboard and Ingress NGINX Controller). [#13845](https://github.com/gardener/gardener/pull/13845)
- ✨ [USER] The `Shoot` field `.spec.seedSelector` can now be adjusted for already scheduled shoots, as long as the new selector still selects the assigned seed. [#13920](https://github.com/gardener/gardener/pull/13920)
- ✨ [OPERATOR] The `gardener-controller-manager` now increases all `ResourceQuota`s in project namespaces when a Gardener update leads to Gardener creating more resources in them. This was introduced to prevent failing `Shoot` reconciliations when `ResourceQuota`s of projects are near their limit. [#13850](https://github.com/gardener/gardener/pull/13850)

<hr />

### 2026/01/28 - [v1.135](https://github.com/gardener/gardener/releases/tag/v1.135.0) Release

[📽️ Recording](https://youtu.be/2rOOsQWLO_w)

#### Demo Agenda 📋

| Presenter(s)  | Duration | Topic                                                        | Reference(s)                                                     |
| ----------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| [@AleksandarSavchev](https://github.com/AleksandarSavchev) | `5m` | 🔑 Automatic Credentials Rotation During `Shoot` Maintenance | [#13493](https://github.com/gardener/gardener/pull/13493) |
| [@LucaBernstein](https://github.com/LucaBernstein) | `5m` | 🩹 TokenRequestor: Remediate Outdated `ServiceAccount` Tokens | [#13630](https://github.com/gardener/gardener/pull/13630) |
| [@domdom82](https://github.com/domdom82) | `10m` | 🔄 HA VPN Round-Robin Bonding Mode | [#13649](https://github.com/gardener/gardener/pull/13649) |
| [@vpnachev](https://github.com/vpnachev) | `5m` | 🪪 `WorkloadIdentity` Support For DNS | [#13720](https://github.com/gardener/gardener/pull/13720), [#13680](https://github.com/gardener/gardener/pull/13680), [#13469](https://github.com/gardener/gardener/pull/13469) |
| [@vicwicker](https://github.com/vicwicker) | `10m` | 🩺 Prometheus Health Checks In Care Controllers | [#13341](https://github.com/gardener/gardener/pull/13341) |
| [@kon-angelo](https://github.com/kon-angelo) | `5m` | 🧑‍💼 `ManagedResource` Support In Generic `ControlPlane` Actuator | [#13585](https://github.com/gardener/gardener/pull/13585) |
| [@marc1404](https://github.com/marc1404) | `5m` | ☸️ Kubernetes Minor Version Retention | [#13471](https://github.com/gardener/gardener/pull/13471) |

#### No Demo, But Still Worth Celebrating 🎉

- ✨ [OPERATOR] `gardenlet` can now propagate static manifests stored in the seed cluster's `garden` namespace to all shoot namespaces. Read all about it [here](https://github.com/gardener/gardener/tree/master/docs/extensions/static-manifests.md). [#13614](https://github.com/gardener/gardener/pull/13614)
- ✨ [DEVELOPER] The generic control-plane webhook is now capable of ensuring the `kube-apiserver` and `kube-controller-manager` `Deployment`s, as well as `etcd`s, of the virtual garden cluster. [#13635](https://github.com/gardener/gardener/pull/13635)
- ✨ [DEPENDENCY] `CredentialsBinding`s can now reference `core.gardener.cloud/v1beta1.InternalSecret` resources. Provider extensions should start validating them similar to references for `v1.Secret` resources. [#13759](https://github.com/gardener/gardener/pull/13759)

<hr />

### 2026/01/21 - Kubernetes v1.34 Special Edition

[📽️ Recording](https://youtu.be/ksbM6eZo6Pg)

#### Demo Agenda 📋

_Presenters:_ [@ScheererJ](https://github.com/ScheererJ), [@tobschli](https://github.com/tobschli)

| Duration | Topic                                                        | Reference(s)                                                     |
| -------- | ------------------------------------------------------------ | ------------------------------------------------------- |
| `25m` | 🎓 Graduation Ceremony<br><small>_Graduated Features_</small> | [KEP-4381](https://kep.k8s.io/4381), [KEP-3939](https://kep.k8s.io/3939), [KEP-1790](https://kep.k8s.io/1790), [KEP-3751](https://kep.k8s.io/3751), [KEP-5080](https://kep.k8s.io/5080), [KEP-4601](https://kep.k8s.io/4601), [KEP-3331](https://kep.k8s.io/3331), [KEP-4633](https://kep.k8s.io/4633), [KEP-3960](https://kep.k8s.io/3960), [KEP-4818](https://kep.k8s.io/4818), [KEP-2400](https://kep.k8s.io/2400), [KEP-4033](https://kep.k8s.io4033/) |
| `15m` | 🌸 Beta Bloom<br><small>_Alpha -> Beta Promotions_</small> | [KEP-4412](https://kep.k8s.io/4412), [KEP-740](https://kep.k8s.io/740), [KEP-3104](https://kep.k8s.io/3104), [KEP-2837](https://kep.k8s.io/2837), [KEP-3962](https://kep.k8s.io/3962), [KEP-5073](https://kep.k8s.io/5073), [KEP-1287](https://kep.k8s.io1287/) |
| `10m` | 🗞️ Fresh Off The Press<br><small>_New Alpha Features_</small> | [KEP-5295](https://kep.k8s.io/5295), [KEP-4317](https://kep.k8s.io/4317), [KEP-5307](https://kep.k8s.io/5307), [KEP-3721](https://kep.k8s.io3721/) |
| `5m` | 🧼 Security, Deprecations & Removals | [KEP-4033](https://kep.k8s.io/4033), [KEP-3015](https://kep.k8s.io3015/) |
| `5m` | 🪴 What's Changing In Gardener | [#12814](https://github.com/gardener/gardener/issues/12814), [#12883](https://github.com/gardener/gardener/pull/12883) |
