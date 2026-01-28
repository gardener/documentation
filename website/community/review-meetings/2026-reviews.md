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
