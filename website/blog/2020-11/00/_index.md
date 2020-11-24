---
title: Gardener v1.11 and v1.12 Released
linkTitle: Gardener v1.11 and v1.12
newsSubtitle: November 4, 2020
type: blog
publishdate: 2020-11-04
archivedate: 2020-11-25
authors:
- name: Tim Usner
  email: tim.usner@sap.com
  avatar: https://avatars2.githubusercontent.com/u/40451181?s=460&u=4df34635cf86b924700ef4152ec8462eeaa35721&v=4
aliases: ["/blog/2020/11/04/00"]
---

Two months after our last Gardener release update, we are happy again to present release v1.11 and v1.12 in this blog post. Control plane migration, load balancer consolidation, new security features are just a few topics we progressed with. As always, a detailed list of features, improvements, and bug fixes can be found in the [release notes](https://github.com/gardener/gardener/releases) of each release. If you are going to update from a previous Gardener version, please take your time to go through the action items in the release notes.

## Notable Changes in v1.12

Release v1.12, fresh from the oven, is shipped with plenty of improvements, features and some API changes we want to pick up in the next sections. 

### Drop Functionless DNS Providers ([gardener/gardener#3036](https://github.com/gardener/gardener/pull/3036))

This release drops the support for so-called functionless DNS providers. Those are providers in a shoot’s specification (`.spec.dns.providers`) which don’t serve the shoot’s domain (`.spec.dns.domain`), but are created by Gardener in the seed cluster to serve DNS requests coming from the shoot cluster. If such providers don’t specify a `type` or `secretName` the creation or update request for the corresponding shoot is denied.

### Seed Taints ([gardener/gardener#2955](https://github.com/gardener/gardener/pull/2955))

In an earlier release, we reserved a dedicated section in `seed.spec.settings` as a replacement for `disable-capacity-reservation, disable-dns, invisible` taints. These already deprecated taints were still considered and synced, which gave operators enough time to switch their integration to the new `settings` field. As of version v1.12, support for them has been discontinued and they are automatically removed from seed objects. You may use the actual taint names in a future release of Gardener again.

### Load Balancer Events During Shoot Reconciliation ([gardener/gardener#3028](https://github.com/gardener/gardener/pull/3028))

As Gardener is capable of managing thousands of clusters, it is crucial to keep operation efforts at a minimum. This release demonstrates this endeavor by further improving error reporting to the end user. During a shoot’s reconciliation, Gardener creates `Services` of type `LoadBalancer` in the shoot cluster, e.g. for VPN or Nginx-Ingress addon, and waits for a successful creation. However, in the past we experienced that occurring issues caused by  the party creating the load balancer (typically [Cloud-Controller-Manager]( https://kubernetes.io/docs/concepts/architecture/cloud-controller/)) are only exposed in the logs or as events. Gardener now fetches these event messages and propagates them to the shoot status in case of a failure. Users can then often fix the problem themselves, if for example the failure discloses an exhausted quota on the cloud provider.

### KonnectivityTunnel Feature Per Shoot([gardener/gardener#3007](https://github.com/gardener/gardener/pull/3007))

Since release `v1.6` Gardener has been capable of reversing the tunnel direction from the seed to the shoot via the `KonnectivityTunnel` feature gate ([more information]( https://github.com/gardener/gardener/blob/master/docs/usage/reverse-tunnel.md)). With this release we make it possible to control the feature per shoot. We recommend to selectively enable the `KonnectivityTunnel`, as it is still in `alpha` state.

### Reference Protection ([gardener/gardener#2771](https://github.com/gardener/gardener/pull/2771), [gardener/gardener 1708419](https://github.com/gardener/gardener/commit/17084191c752c206537b9506b54828f4d723d9b7))

Shoot clusters may refer to external objects, like `Secrets` for specified DNS providers or they have a reference to an audit policy `ConfigMap`. Deleting those objects while any shoot still references them causes sever errors, often only recoverable by an immense amount of manual operations effort. To prevent such scenarios, Gardener now adds a new finalizer `gardener.cloud/reference-protection` to these objects and removes it as soon as the object itself becomes releasable. Due to compatibility reasons, we decided that the handling for audit policy `ConfigMaps` is delivered as an opt-in feature first, so please familiarize yourself with the necessary settings in the Gardener Controller Manager [component config](https://github.com/gardener/gardener/blob/3db1c41726dc5f669e015f294b690d330b55bbf1/example/20-componentconfig-gardener-controller-manager.yaml#L28) if you already plan to enable it.

### Support For Resource Quotas ([gardener/gardener#2627](https://github.com/gardener/gardener/pull/2627))

After the Kubernetes upstream change ([kubernetes/kubernetes#93537](https://github.com/kubernetes/kubernetes/pull/93537)) for externalizing the backing admission plugin has been accepted, we are happy to announce the support of [ResourceQuotas]( https://kubernetes.io/docs/concepts/policy/resource-quotas/) for Gardener offered resource kinds. [ResourceQuotas](https://kubernetes.io/docs/concepts/policy/resource-quotas/) allow you to specify a maximum number of objects per namespace, especially for end-user objects like `Shoots` or `SecretBindings` in a project namespace. Even though the admission plugin is enabled by default in the Gardener API Server, make sure the Kube Controller Manager runs the `resourcequota` controller as well.

### Watch Out Developers, Terraformer v2 Is Coming! ([gardener/gardener#3034](https://github.com/gardener/gardener/pull/3034))

Although not only related to Gardener core, but still an important milestone to mention, is the preparation towards [Terraformer v2](https://github.com/gardener/terraformer/pull/48) in the [extensions library](https://github.com/gardener/gardener/tree/master/extensions). With Terraformer v2, Gardener extensions using Terraform scripts will benefit from great consistency improvements. Please check out [#3034](https://github.com/gardener/gardener/pull/3034)) which demonstrates necessary steps to transition to Terraformer v2 as soon as it’s been released.

## Notable Changes in v1.11

The Gardener community worked eagerly to deliver plenty of improvements with version v1.11. Those help us to further progress with topics like [control plane migration]( https://github.com/gardener/gardener/blob/master/docs/proposals/07-shoot-control-plane-migration.md), which is actively being worked on, or to harden our load balancer consolidation ([APIServerSNI](https://github.com/gardener/gardener/blob/master/docs/proposals/08-shoot-apiserver-via-sni.md)) feature.
Besides improvements and fixes (full list available in release notes), this release as well contains major features and we don’t want to miss a chance to walk you through them.

### Gardener Admission Controller ([gardener/gardener#2832](https://github.com/gardener/gardener/pull/2832)), ([gardener/gardener#2781](https://github.com/gardener/gardener/pull/2781))

In this release, all admission related HTTP handlers moved from the Gardener Controller Manager (GCM) to the new component [Gardener Admission Controller]( https://github.com/gardener/gardener/blob/master/docs/concepts/admission-controller.md). The admission controller is rather a small component as opposed to GCM with regards to memory footprint and CPU consumption, and thus allows you to run multiple replicas of it much cheaper than it was before. We certainly recommend specifying the admission controller deployment with more than one replica, since it reduces the odds of a system-wide outage and increases the performance of your Gardener service.

Besides the already known `Namespace` and Kubeconfig `Secret` validation, a new admission handler `Resource-Size-Validator` was added to the admission controller. It allows operators to restrict the size for all kinds of Kubernetes objects, especially sent by end-users to the Kubernetes or Gardener API Server. We address a security concern with this feature to prevent denial of service attacks in which an attacker artificially increases the size of objects to exhaust your object store, API server caches, or to let Gardener and Kubernetes controllers run out-of-memory. The [documentation](https://github.com/gardener/gardener/blob/master/docs/concepts/admission-controller.md#resource-size-validator) reveals an approach of finding the right resource size for your setup and why you should create exceptions for technical users and operators.

### Deferring Shoot Progress Reporting ([gardener/gardener#2909](https://github.com/gardener/gardener/pull/2909)),

Shoot progress reporting is the continuous update process of a shoot’s `.status.lastOperation` field while the shoot is being reconciled by Gardener. Many steps are involved during reconciliation and depending on the size of your setup, the updates might become an issue for the Gardener API Server which will refrain to process further requests for a certain period.
With `.controllers.shoot.progressReportPeriod` in Gardenlet’s component configuration, you can now delay these updates for the specified period.

### New Policy For Controller Registrations ([gardener/gardener#2896](https://github.com/gardener/gardener/pull/2896)),

A while ago, we added support for different policies in `ControllerRegistrations` which determine under which circumstances the deployments of registration controllers happen in affected seed clusters. If you specify the new policy `AlwaysExceptNoShoots`, the respective extension controller will be deployed to all seed cluster hosting at least one shoot cluster. After all shoot clusters from a seed are gone, the extension deployment will be deleted again.
A full list of supported policies can be found [here]( https://github.com/gardener/gardener/blob/master/docs/extensions/controllerregistration.md#deployment-configuration-options).
