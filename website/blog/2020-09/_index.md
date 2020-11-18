---
title: Gardener v1.9 and v1.10 Released
linkTitle: Gardener v1.9 and v1.10
newsSubtitle: September 11, 2020
type: blog
publishdate: 2020-09-11
archivedate: 2020-11-19
authors:
- name: Rafael Franzke
  email: rafael.franzke@sap.com
  avatar: https://avatars2.githubusercontent.com/u/19169361?s=460&v=4
aliases: ["/blog/2020/09/11/00"]
---

Summer holidays aren't over yet, still, the Gardener community was able to release two new minor versions in the past weeks.
Despite being limited in capacity these days, we were able to reach some major milestones, like adding Kubernetes v1.19 support and the long-delayed automated gardenlet certificate rotation.
Whilst we continue to work on topics related to scalability, robustness, and better observability, we agreed to adjust our focus a little more into the areas of development productivity, code quality and unit/integration testing for the upcoming releases.

## Notable Changes in v1.10

[Gardener v1.10](https://github.com/gardener/gardener/releases/tag/v1.10.0) was a comparatively small release (measured by the number of changes) but it comes with some major features!

### Kubernetes 1.19 support ([gardener/gardener#2799](https://github.com/gardener/gardener/pull/2799))

The newest minor release of Kubernetes is now supported by Gardener (and all the maintained provider extensions)!
Predominantly, we have enabled CSI migration for OpenStack now that it got promoted to beta, i.e. 1.19 shoots will no longer use the in-tree Cinder volume provisioner.
The CSI migration enablement for Azure got postponed (to at least 1.20) due to some issues that the Kubernetes community is trying to fix in the 1.20 release cycle.
As usual, the [1.19 release notes](https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.19.md) should be considered before upgrading your shoot clusters.

### Automated certificate rotation for gardenlet ([gardener/gardener#2542](https://github.com/gardener/gardener/pull/2542))

Similar to the kubelet, the gardenlet supports TLS bootstrapping when deployed into a new seed cluster.
It will request a client certificate for the garden cluster using the `CertificateSigningRequest` API of Kubernetes and store the generated results in a `Secret` object in the `garden` namespace of its seed.
These certificates are usually valid for one year.
We have now added support for automatic renewals if the expiration dates are approaching.

### Improved monitoring alerts ([gardener/gardener#2776](https://github.com/gardener/gardener/pull/2776))

We have worked on a larger refactoring to improve reliability and accuracy of our monitoring alerts for both shoot control planes in the seed as well as shoot system components running on worker nodes.
The improvements are primarily for operators and should result in less false positive alerts.
Also, the alerts should fire less frequently and are better grouped in order to reduce to overall amount of alerts.

### Seed deletion protection ([gardener/gardener#2732](https://github.com/gardener/gardener/pull/2732))

Our validation to improve robustness and countermeasures against accidental mistakes has been improved.
Earlier, it was possible to remove the `use-as-seed` annotation for [shooted seeds](https://github.com/gardener/gardener/blob/master/docs/usage/shooted_seed.md) or directly set the `deletionTimestamp` on `Seed` objects, despite of the fact that they might still run shoot control planes.
Seed deletion would not start in these cases, although, it would disrupt the system unnecessarily, and result in some unexpected behaviour.
The Gardener API server is now forbidding such requests if the seeds are not completely empty yet.

### Logging improvements for Loki (multiple PRs)

After we released our large logging stack refactoring (from EFK to Loki) with [Gardener v1.8](https://gardener.cloud/blog/2020-08/00/), we have continued to work on reliability, quality and user feedback in general.
We aren't done yet, though, Gardener v1.10 includes a bunch of improvements which will help to graduate the `Logging` feature gate to beta and GA, eventually.

## Notable Changes in v1.9

The [v1.9 release](https://github.com/gardener/gardener/releases/tag/v1.9.0) contained tons of small improvements and adjustments in various areas of the code base and a little less new major features.
However, we don't want to miss the opportunity to highlight a few of them.

### CRI validation in `CloudProfile`s ([gardener/gardener#2137](https://github.com/gardener/gardener/pull/2137))

A couple of releases back we have introduced support for `containerd` and the `ContainerRuntime` extension API.
The supported container runtimes are operating system specific, and until now it wasn't possible for end-users to easily figure out whether they can enable `containerd` or other `ContainerRuntime` extensions for their shoots.
With this change, Gardener administrators/operators can now provide that information in the `.spec.machineImages` section in the `CloudProfile` resource.
This also allows for enhanced validation and prevents misconfigurations.

### New shoot event controller ([gardener/gardener#2649](https://github.com/gardener/gardener/pull/2649))

The shoot controllers in both the `gardener-controller-manager` and `gardenlet` fire several `Event`s for some important operations (e.g., automated hibernation/wake-up due to hibernation schedule, automated Kubernetes/machine image version update during maintenance, etc.).
Earlier, the only way to prolong the lifetime of these events was to modify the `--event-ttl` command line parameter of the garden cluster's `kube-apiserver`.
This came with the disadvantage that *all* events were kept for a longer time (not only those related to `Shoot`s that an operator is usually interested in and ideally wants to store for a couple of days).
The new shoot event controller allows to achieve this by deleting non-shoot events.
This helps operators and end-users to better understand which changes were applied to their shoots by Gardener.

### Early deployment of the logging stack for new shoots ([gardener/gardener#2750](https://github.com/gardener/gardener/pull/2750))

Since the first introduction of the `Logging` feature gate two years back the logging stack was only deployed at the very end of the shoot creation.
This had the disadvantage that control plane pod logs were not kept in case the shoot creation flow is interrupted before the logging stack could be deployed.
In some situations, this was preventing fetching relevant information about why a certain control plane component crashed.
We now deploy the logging stack very early in the shoot creation flow to always have access to such information.
