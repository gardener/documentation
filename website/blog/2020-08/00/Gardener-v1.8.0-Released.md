---
title: Gardener v1.8.0 Released
linkTitle: Gardener v1.8.0
newsSubtitle: August 06, 2020
publishdate: 2020-08-06
archivedate: 2020-10-31
authors:
- name: Rafael Franzke
  email: rafael.franzke@sap.com
  avatar: https://avatars2.githubusercontent.com/u/19169361?s=460&v=4
aliases: ["/blog/2020/08/06/00"]
---

Even if we are in the midst of the summer holidays, a new Gardener release came out yesterday: v1.8.0! It's main themes are the large change of our logging stack to Loki (which was already explained in detail on a [blog post on grafana.com](https://grafana.com/blog/2020/07/15/gardener-saps-kubernetes-as-a-service-open-source-project-is-moving-its-logging-stack-to-loki/)), more configuration options to optimize the utilization of a shoot, node-local DNS, new project roles, and significant improvements for the Kubernetes client that Gardener uses to interact with the many different clusters.

## Notable Changes

### Logging 2.0: EFK stack replaced by Loki ([gardener/gardener#2515](https://github.com/gardener/gardener/pull/2515))

Since two years or so Gardener could optionally provision a dedicated logging stack per seed and per shoot which was based on fluent-bit, fluentd, ElasticSearch and Kibana. This feature was still hidden behind an alpha-level feature gate and never got promoted to beta so far. Due to various limitations of this solution we decided to replace the EFK stack with Loki. As we already have Prometheus and Grafana deployments for both users and operators by default for all clusters the choice was just natural.
Please find out more on this topic at [this dedicated blog post](https://grafana.com/blog/2020/07/15/gardener-saps-kubernetes-as-a-service-open-source-project-is-moving-its-logging-stack-to-loki/).

### Cluster identities and `DNSOwner` objects ([gardener/gardener#2471](https://github.com/gardener/gardener/pull/2471), [gardener/gardener#2576](https://github.com/gardener/gardener/pull/2576))

The shoot control plane migration topic is ongoing since a few months already, and we are very much progressing with it. A first alpha version will probably make it out soon. As part of these endeavors, we introduced cluster identities and the usage of `DNSOwner` objects in this release. Both are needed to gracefully migrate the `DNSEntry` extension objects from the old seed to the new seed as part of the control plane migration process.
Please find out more on this topic at [this blog post](https://kubernetes.io/blog/2019/12/02/gardener-project-update/#control-plane-migration-between-seed-clusters).

### New `uam` role for `Project` members to limit user access management privileges ([gardener/gardener#2611](https://github.com/gardener/gardener/pull/2611))

In order to allow external user access management system to integrate with Gardener and to fulfil certain compliance aspects, we have introduced a new role called `uam` for `Project` members (next to `admin` and `viewer`). Only if a user has this role then he/she is allowed to add/remove other human users to the respective `Project`. By default, all newly created `Project`s assign this role only to the owner while, for backwards-compatibility reasons, it will be assigned for all members for existing projects. Project owners can steadily revoke this access as desired.
Interestingly, the `uam` role is backed by a custom RBAC verb called `manage-members`, i.e., the Gardener API server is only admitting changes to the human `Project` members if the respective user is bound to this RBAC verb.

### New node-local DNS feature for shoots ([gardener/gardener#2528](https://github.com/gardener/gardener/pull/2528))

By default, we are using CoreDNS as DNS plugin in shoot clusters which we auto-scale horizontally using HPA. However, in some situations we are discovering certain bottlenecks with it, e.g., unreliable UDP connections, unnecessary node hopping, inefficient load balancing, etc.
To further optimize the DNS performance for shoot clusters, it is now possible to enable a new alpha-level feature gate in the gardenlet's componentconfig: `NodeLocalDNS`. If enabled, all shoots will get a new `DaemonSet` to run a DNS server on each node.

### More kubelet and API server configurability ([gardener/gardener#2574](https://github.com/gardener/gardener/pull/2574), [gardener/gardener#2668](https://github.com/gardener/gardener/pull/2668))

One large benefit of Gardener is that it allows you to optimize the usage of your control plane as well as worker nodes by exposing relevant configuration parameters in the `Shoot` API.
In this version, we are adding support to configure kubelet's values for `systemReserved` and `kubeReserved` resources as well as the kube-apiserver's watch cache sizes.
This allows end-users to get to better node utilization and/or performance for their shoot clusters.

### Configurable timeout settings for machine-controller-manager ([gardener/gardener#2563](https://github.com/gardener/gardener/pull/2563))

One very central component in Project Gardener is the [machine-controller-manager](https://github.com/gardener/machine-controller-manager) for managing the worker nodes of shoot clusters. It has extensive qualities with respect to node lifecycle management and rolling updates. As such, it uses certain timeout values, e.g. when creating or draining nodes, or when checking their health.
Earlier, those were not customizable by end-users, but we are adding this possibility now. You can fine-grain these settings per worker pool in the `Shoot` API such that you can optimize the lifecycle management of your worker nodes even more!

### Improved usage of cached client to reduce network I/O ([gardener/gardener#2635](https://github.com/gardener/gardener/pull/2635), [gardener/gardener#2637](https://github.com/gardener/gardener/pull/2637))

In the last Gardener release v1.7 we have introduced a huge refactoring the clients that we use to interact with the many different Kubernetes clusters. This is to further optimize the network I/O performed by leveraging watches and caches as good as possible. It's still an alpha-level feature that must be explicitly enabled in the Gardenlet's component configuration, though, with this release we have improved certain things in order to pave the way for beta promotion. For example, we were initially also using a cached client when interacting with shoots. However, as the gardenlet runs in the seed as well (and thus can communicate cluster-internally with the kube-apiservers of the respective shoots) this cache is not necessary and just memory overhead. We have removed it again and saw the memory usage getting lower again. More to come!

### AWS EBS volume encryption by default ([gardener/gardener-extension-provider-aws#147](https://github.com/gardener/gardener-extension-provider-aws/pull/147))

The `Shoot` API already exposed the possibility to encrypt the root disks of worker nodes since quite a while, but it was disabled by default (for backwards-compatibility reasons). With this release we have change this default, so new shoot worker nodes will be provisioned with encrypted root disks out-of-the-box. However, the `g4dn` instance types of AWS don't support this encryption, so when you use them you have to explicitly disable the encryption in the worker pool configuration.

### Liveness probe for Gardener API server deployment ([gardener/gardener#2647](https://github.com/gardener/gardener/pull/2647))

A small, but very valuable improvement is the introduction of a liveness probe for our Gardener API server. As it's built with the same library like the Kubernetes API server, it exposes two endpoints at `/livez` and `/readyz` which were created exactly for the purpose of live- and readiness probes.
With Gardener v1.8 the Helm chart contains a liveness probe configuration by default, and we are awaiting an upstream fix ([kubernetes/kubernetes#93599](https://github.com/kubernetes/kubernetes/issues/93599)) to also enable the readiness probe. This will help in a smoother rolling update of the Gardener API server pods, i.e., preventing clients from talking to a not yet initialized or already terminating API server instance.

### Webhook ports changed to enable OpenShift ([gardener/gardener#2660](https://github.com/gardener/gardener/pull/2660))

In order to make it possible to run Gardener on OpenShift clusters as well, we had to make a change in the port configuration for the webhooks we are using in both Gardener and the extension controllers. Earlier, all the webhook servers directly exposed port `443`, i.e., a system port which is a security concern and disallowed in OpenShift. We have changed this port now across all places and also adapted our network policies accordingly. This is most likely not the last necessary change to enable this scenario, however, it's a great improvement to push the project forward.

If you're interested in more details and even more improvements you can find all release notes for Gardener v1.8.0 here: https://github.com/gardener/gardener/releases/tag/v1.8.0
