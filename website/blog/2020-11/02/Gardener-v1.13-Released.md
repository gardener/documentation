---
title: Gardener v1.13 Released
linkTitle: Gardener v1.13
newsSubtitle: November 23, 2020
publishdate: 2020-11-23
archivedate: 2021-01-22
authors:
- name: Rafael Franzke
  email: rafael.franzke@sap.com
  avatar: https://avatars2.githubusercontent.com/u/19169361?s=460&v=4
aliases: ["/blog/2020/11/23/00"]
---

Dear community, we're happy to announce a new minor release of Gardener, in fact, the 16th in 2020!
v1.13 came out just today after a couple of weeks of code improvements and feature implementations.
As usual, this blog post provides brief summaries for the most notable changes that we introduce with this version.
Behind the scenes (and not explicitly highlighted below) we are progressing on internal code restructurings and refactorings to ease further extensions and to enhance development productivity.
Speaking of those: You might be interested in watching [the recording of the last Gardener Community Meeting](https://www.youtube.com/watch?v=4sQs_Hj6xpY) which includes a detailed session for [v2 of Terraformer](https://github.com/gardener/terraformer/releases/tag/v2.0.0-rc.0), a complete rewrite in Golang and improved state handling.

## Notable Changes in v1.13

The main themes of Gardener's v1.13 release are increments for feature gate promotions, scalability and robustness, and cleanups and refactorings.
The community plans to continue on those and wants to deliver at least one more release in 2020.

### Automatic Quotas for Gardener Resources ([gardener/gardener#3072](https://github.com/gardener/gardener/pull/3072))

Gardener already supports `ResourceQuota`s since the last release, however, it was still up to operators/administrators to create these objects in project namespaces.
Obviously, in large Gardener installations with thousands of projects, this is a quite challenging task.
With this release, we are shipping an improvement in the `Project` controller in the gardener-controller-manager that allows to automatically create `ResourceQuota`s based on configuration.
Operators can distinguish via project label selectors which default quotas shall be defined for various projects.
Please find [more details here](https://github.com/gardener/gardener/blob/v1.13.0/docs/concepts/controller-manager.md#main-reconciler)!

### Resource Capacity and Reservations for Seeds ([gardener/gardener#3075](https://github.com/gardener/gardener/pull/3075))

The larger the Gardener landscape, the more seed cluster you require.
Naturally, they have (based on constraints of the underlying infrastructure provider and/or seed cluster configuration) limits of how many shoots they can accommodate.
Until this release, there were no means to prevent seed cluster from becoming overloaded (and potentially die due to this load).
Now you define resource capacity and reservations in the [gardenlet's component configuration](https://github.com/gardener/gardener/blob/v1.13.0/example/20-componentconfig-gardenlet.yaml#L68-L70), similar to how the kubelet announces allocatable resources for `Node` objects.
We are [defaulting this to 250 shoots](https://github.com/gardener/gardener/blob/v1.13.0/charts/gardener/gardenlet/values.yaml#L100-L102), but you might want to adapt this value for your own environment.

### Distributed Gardenlet Rollout for Shooted Seeds ([gardener/gardener#3135](https://github.com/gardener/gardener/pull/3135))

With the same motivation, i.e., to improve catering with large landscapes, we allow operators to configure distributed rollouts of gardenlets for shooted seeds.
When a new Gardener version is being deployed in landscapes with a high number of shooted seeds, gardenlets of earlier versions were immediately re-deploying copies of themselves into the shooted seeds they manage.
This leads to a large number of new gardenlet pods that all roughly start at the same time.
Depending on the size of the landscape, this may trouble the gardener-apiservers as all of them are starting to fill their caches and create watches at the same time.
By default, this rollout is now randomized [within a `5m` time window](https://github.com/gardener/gardener/blob/v1.13.0/example/20-componentconfig-gardenlet.yaml#L63-L64), i.e., it may take up to `5m` until all gardenlets in all seeds have been updated.

### Progressing on Beta-Promotion for `APIServerSNI` Feature Gate ([gardener/gardener#3082](https://github.com/gardener/gardener/pull/3082), [gardener/gardener#3143](https://github.com/gardener/gardener/pull/3143))

The alpha `APIServerSNI` feature will drastically reduce the costs for load balancers in the seed clusters, thus, it is effectively contributing to Gardener's "minimal TCO" goal.
In this release we are introducing an important improvement that optimizes the connectivity when pods talk to their control plane by avoiding an extra network hop.
This is realized by a `MutatingWebhookConfiguration` whose server runs as a sidecar container in the kube-apiserver pod in the seed (only when the `APIServerSNI` feature gate is enabled).
The webhook injects a `KUBERNETES_SERVICE_HOST` environment variable into pods in the shoot which prevents the additional network hop to the `apiserver-proxy` on all worker nodes.
You can read more about it in [this document](https://github.com/gardener/gardener/blob/v1.13.0/docs/usage/apiserver-sni-injection.md).

### More Control Plane Configurability ([gardener/gardener#3141](https://github.com/gardener/gardener/pull/3141), [gardener/gardener#3139](https://github.com/gardener/gardener/pull/3139))

A main capability beloved by Gardener users is its openness when it comes to configurability and fine-tuning of the Kubernetes control plane components.
Most managed Kubernetes offerings are not exposing options of the master components, but Gardener's [`Shoot` API](https://github.com/gardener/gardener/blob/v1.13.0/example/90-shoot.yaml) offers a selected set of settings.
With this release we are allowing to change the maximum number of (non-)mutating requests for the kube-apiserver of shoot clusters.
Similarly, the grace period before deleting pods on failed nodes can now be fine-grained for the kube-controller-manager.

### Improved `Project` Resource Handling ([gardener/gardener#3137](https://github.com/gardener/gardener/pull/3137), [gardener/gardener#3136](https://github.com/gardener/gardener/pull/3136), [gardener/gardener#3179](https://github.com/gardener/gardener/pull/3179))

`Project`s are an important resource in the Gardener ecosystem as they enable collaboration with team members.
A couple of improvements have landed into this release.
Firstly, duplicates in the member list were not validated so far.
With this release, the gardener-apiserver is automatically merging them, and in future releases requests with duplicates will be denied.
Secondly, specific `Project`s may now be excluded from the [stale checks](https://github.com/gardener/gardener/blob/v1.13.0/docs/concepts/controller-manager.md#stale-projects-reconciler) if desired.
Lastly, namespaces for `Project`s that were adopted (i.e., those that exist before the `Project` already) will now no longer deleted when the `Project` is being deleted.
Please note that this only applies for newly created `Project`s.

### Removal of Deprecated Labels and Annotations ([gardener/gardener#3094](https://github.com/gardener/gardener/pull/3094))

The `core.gardener.cloud` API group succeeded the old `garden.sapcloud.io` API group in the beginning of 2020, however, a lot of labels and annotations with the old API group name were still supported.
We have continued with the process of removing those deprecated (but replaced with the new API group name) names.
Concretely, the project labels `garden.sapcloud.io/role=project` and `project.garden.sapcloud.io/name=<project-name>` are no longer supported now.
Similarly, the `shoot.garden.sapcloud.io/use-as-seed` and `shoot.garden.sapcloud.io/ignore-alerts` annotations got deleted.
We are not finished yet, but we do small increments and plan to progress on the topic until we finally got rid of all artifacts with the old API group name.

### `NodeLocalDNS` Network Policy Rules Adapted ([gardener/gardener#3184](https://github.com/gardener/gardener/pull/3184))

The alpha `NodeLocalDNS` feature was already [introduced and explained with Gardener v1.8](https://gardener.cloud/blog/2020-08/00/) with the motivation to overcome certain bottlenecks with the horizontally auto-scaled CoreDNS in all shoot cluster.
Unfortunately, due to a bug in the network policy rules, it was not working in all environments.
We have fixed this one now, so it should be ready for further tests and investigations.
Come give it a try!

Please bear in mind that this blog post only highlights the most noticeable changes and improvements, but there is a whole bunch more, including a ton of bug fixes in older versions! Come check out the [full release notes](https://github.com/gardener/gardener/releases/tag/v1.13.0) and share your feedback in our [#gardener](https://kubernetes.slack.com/archives/CB57N0BFG) Slack channel!
