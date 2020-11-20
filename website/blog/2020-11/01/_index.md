---
title: "Case Study: Migrating ETCD Volumes in Production"
description: In this case study, our friends from metal-stack lead you through their journey of migrating Gardener ETCD volumes in their production environment.
linkTitle: Gardener ETCD Volumes Migration
newsSubtitle: November 20, 2020
type: blog
publishdate: 2020-11-20
archivedate: 2020-12-31
authors:
- name: Gerrit Schwerthelm
  email: gerrit.schwerthelm@x-cellent.com
  avatar: https://avatars0.githubusercontent.com/u/15035165?s=460&u=c595c06cc88ee6e13de3dc818f556b7f66618aab&v=4
aliases: ["/blog/2020/11/20/00"]
---

> This is a guest commentary from <span style="white-space:nowrap">[metal-stack](https://metal-stack.io/)</span>.<br><br>metal-stack is a software that provides an API for provisioning and managing physical servers in the data center. To categorize this product, the terms "Metal-as-a-Service" (MaaS) or "bare metal cloud" are commonly used.

One reason you stumble upon this blog post could be that you saw errors like the following in your ETCD instances:

```
etcd-main-0 etcd 2020-09-03 06:00:07.556157 W | etcdserver: read-only range request "key:\"/registry/deployments/shoot--pwhhcd--devcluster2/kube-apiserver\" " with result "range_response_count:1 size:9566" took too long (13.95374909s) to execute
```

As it turns out, 14 seconds are way too slow for running Kubernetes API servers. It makes them go into the crash loop (leader election fails). Even worse, this whole thing is self-amplifying: The longer a response takes, the more requests queue up, leading to response times increasing further and further. The system is very unlikely to recover. 😞

On Github, you can easily find the reason for this problem. Most probably your disks are too slow (see [etcd-io/etcd#10860](https://github.com/etcd-io/etcd/issues/10860)). So, when you are (like in our case) on GKE and run your ETCD on their default persistent volumes, consider moving from standard disks to SSDs and the error messages should disappear. A guide on how to use SSD volumes on GKE can be found [here](https://cloud.google.com/kubernetes-engine/docs/how-to/persistent-volumes/ssd-pd).

Case closed? Well. For some people it might. But when you are seeing this in your Gardener infrastructure, likely, there is something going wrong. The entire ETCD management is fully managed by the Gardener, which makes the problem a bit more interesting to look at. This blog post strives topics such as:

- Gardener operating principles
- Gardener architecture and ETCD management
- Pitfalls with multi-cloud environments
- Migrating GCP volumes to a new storage class

We from metal-stack learned quite a lot about the capabilities of Gardener through this problem. We are happy to share this experience with a broader audience. Gardener adopters and operators read on.

## How Gardener Manages ETCDs

In our infrastructure, we use the Gardener to provision Kubernetes clusters on bare metal machines in our own data centers using <span style="white-space:nowrap">[metal-stack](https://metal-stack.io/)</span>. Even if the entire stack could be running on-premise, our initial [seed cluster](https://gardener.cloud/documentation/concepts/core-components/api-server/#seeds) and the [metal control plane](https://docs.metal-stack.io/stable/overview/architecture/#Metal-Control-Plane) are hosted on GKE. This way, we do not need to manage a single Kubernetes cluster in our entire landscape manually. As soon as we have Gardener deployed on this initial cluster, we can spin up further Seeds in our own data centers through the concept of [shooted seeds](https://github.com/gardener/gardener/blob/master/docs/usage/shooted_seed.md).

To make this easier to understand, let us give you a simplified picture of how our Gardener production setup looks like:

<img title="Production Setup" src="01-001.svg"  style="width:80vw; height:auto">
<figcaption style="text-align:center;margin-top: -25px;margin-bottom: 30px;font-size: 90%;">Figure 1: Simplified View on Our Production Setup</figcaption>

For every [shoot cluster](https://gardener.cloud/documentation/concepts/core-components/api-server/#shoots), Gardener deploys an individual, standalone ETCD as a stateful set into a _shoot namespace_. The deployment of the ETCD stateful set is managed by a controller called [etcd-druid](https://github.com/gardener/etcd-druid), which reconciles a special resource of the kind `etcds.druid.gardener.cloud`. This `Etcd` resource is getting deployed during the shoot provisioning flow in the [Gardenlet](https://github.com/gardener/gardener/blob/v1.8.2/docs/concepts/gardenlet.md).

For failure-safety, the etcd-druid deploys the official ETCD container image along with a sidecar project called [etcd-backup-restore](https://github.com/gardener/etcd-backup-restore). The sidecar automatically takes backups of the ETCD and stores them at a cloud provider, e.g. in S3 Buckets, Google Buckets, or similar. In case the ETCD comes up without or with corrupted data, the sidecar looks into the backup buckets and automatically restores the latest backup before ETCD starts up. This entire approach basically takes away the pain for operators to manually have to restore data in the event of data loss.

> We found the etcd-backup-restore project very intriguing. It was the inspiration for us to come up with a similar sidecar for the databases we use with metal-stack. This project is called [backup-restore-sidecar](https://github.com/metal-stack/backup-restore-sidecar). We can cope with postgres and rethinkdb database at the moment and more to come. Feel free to check it out when you are interested.

As it's the nature for multi-cloud applications to act upon a variety of cloud providers, with a single installation of Gardener, it is easily possible to spin up new Kubernetes clusters not only on GCP, but on other supported cloud platforms, too.

When the Gardenlet deploys a resource like the `Etcd` resource into a shoot namespace, a provider-specific extension-controller has the chance to manipulate it through a [mutating webhook](https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/#mutatingadmissionwebhook). This way, a cloud provider can adjust the generic Gardener resource to fit his provider-specific needs. For every cloud that Gardener supports, there is such an extension-controller. For metal-stack, we also maintain one, it's called [gardener-extension-provider-metal](https://github.com/metal-stack/gardener-extension-provider-metal).

> A side note for cloud providers: Meanwhile, new cloud providers can be added _fully_ out-of-tree, i.e. without touching any of the Gardener sources. This works through [API extensions](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/apiserver-aggregation/) and [CRDs](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/). The Gardener handles generic resources and backpacks provider-specific configuration through raw extensions. When you are a cloud provider on your own, this is really encouraging because you can integrate with Gardener without any burdens. You can find documentation on how to integrate your cloud into the Gardener [here](https://github.com/gardener/gardener/blob/v1.12.1/docs/development/new-cloud-provider.md) and [here](https://github.com/gardener/gardener/blob/master/docs/extensions/overview.md).

## The Mistake Is in the Deployment

> This section contains code examples from Gardener v1.8.

Now that we know how the ETCDs are managed by the Gardener, we can come back to the original problem from the beginning of this article. It turned out that the real problem was a misconfiguration in our deployment. The Gardener actually _does_ use SSD-backed storage on GCP for ETCDs by default. During reconciliation, the [gardener-extension-controller-gcp](https://github.com/gardener/gardener-extension-provider-gcp) deploys a storage class called `gardener.cloud-fast` that enables accessing SSDs on GCP.

But for some reason, in our cluster we did not find such a storage class. And even more interesting, we did not use the `gardener-extension-provider-gcp` for any shoot reconciliation, only for ETCD backup purposes. And that was the big mistake we made: We reconciled the shoot control plane completely with `gardener-extension-provider-metal` even though our initial `Seed` actually runs on GKE and specific parts of the shoot control plane should be reconciled by the GCP extension-controller instead!

This is how the initial `Seed` resource looked like:

```
apiVersion: core.gardener.cloud/v1beta1
kind: Seed
metadata:
  name: initial-seed
spec:
  ...
  provider:
    region: gke
    type: metal
  ...
...
```

Surprisingly, this configuration was working pretty well for a long time. The initial seed properly produced the Kubernetes control planes of our shooted seeds that looked like this:

```
$ kubectl get controlplanes.extensions.gardener.cloud
NAME                 TYPE    PURPOSE    STATUS      AGE
fra-equ01            metal              Succeeded   85d
fra-equ01-exposure   metal   exposure   Succeeded   85d
```

And this is another interesting observation: There are two `ControlPlane` resources. One regular resource and one with an `exposure` purpose. Gardener distinguishes between two types for this exact reason: Environments where the shoot control plane runs on a different cloud provider than the Kubernetes worker nodes. The regular `ControlPlane` resource gets reconciled by the provider configured in the `Shoot` resource, the `exposure` type `ControlPlane` by the provider configured in the `Seed` resource.

With the existing configuration the `gardener-extension-provider-gcp` does not kick in and hence, it neither deploys the `gardener.cloud-fast` storage class nor does it mutate the `Etcd` resource to point to it. And in the end, we are left with ETCD volumes using the default storage class (which is what we do for ETCD stateful sets in the metal-stack seeds, because our default storage class uses [csi-lvm](https://github.com/metal-stack/csi-lvm) that writes into logical volumes on the SSD disks in our physical servers).

The correction we had to make was a one-liner: Setting the provider type of the initial `Seed` resource to `gcp`.

```
$ kubectl get seed initial-seed -o yaml
apiVersion: core.gardener.cloud/v1beta1
kind: Seed
metadata:
  name: initial-seed
spec:
  ...
  provider:
    region: gke
    type: gcp # <-- here
  ...
...
```

This change moved over the control plane exposure reconciliation to the `gardener-extension-provider-gcp`:

```
$ kubectl get -n <shoot-namespace> controlplanes.extensions.gardener.cloud
NAME                 TYPE    PURPOSE    STATUS      AGE
fra-equ01            metal              Succeeded   85d
fra-equ01-exposure   gcp     exposure   Succeeded   85d
```

And boom, after some time of waiting for all sorts of magic reconciliations taking place in the background, the missing storage class suddenly appeared:

```
$ kubectl get sc
NAME                  PROVISIONER            
gardener.cloud-fast   kubernetes.io/gce-pd
standard (default)    kubernetes.io/gce-pd
```

Also, the `Etcd` resource was now configured properly to point to the new storage class:

```
$ kubectl get -n <shoot-namespace> etcd etcd-main -o yaml
apiVersion: druid.gardener.cloud/v1alpha1
kind: Etcd
metadata:
  ...
  name: etcd-main
spec:
  ...
  storageClass: gardener.cloud-fast # <-- was pointing to default storage class before!
  volumeClaimTemplate: main-etcd
...
```

> Only the `etcd-main` storage class gets changed to `gardener.cloud-fast`. The `etcd-events` configuration will still point to standard disk storage because this ETCD is much less occupied as compared to the `etcd-main` stateful set.

## The Migration

Now that the deployment was in place such that this mistake would not repeat in the future, we still had the ETCDs running on the default storage class. The reconciliation does not delete the existing persistent volumes (PVs) on its own.

To bring production back up quickly, we temporarily moved the ETCD pods to other nodes in the GKE cluster. These were nodes which were less occupied, such that the disk throughput was a little higher than before. But surely that was not a final solution.

For a proper solution we had to move the ETCD data out of the standard disk PV into a SSD-based PV.

Even though we had the etcd-backup-restore sidecar, we did not want to fully rely on the restore mechanism to do the migration. The backup should only be there for emergency situations when something goes wrong. Thus, we came up with another approach to introduce the SSD volume: GCP disk snapshots. This is how we did the migration:

1. Scale down etcd-druid to zero in order to prevent it from disturbing your migration
1. Scale down the kube-apiservers deployment to zero, then wait for the ETCD stateful to take another clean snapshot
1. Scale down the ETCD stateful set to zero as well
1. (in order to prevent Gardener from trying to bring up the downscaled resources, we used small shell constructs like `while true; do kubectl scale deploy etcd-druid --replicas 0 -n garden; sleep 1; done`)
1. Take a drive snapshot in GCP from the volume that is referenced by the ETCD PVC
1. Create a new disk in GCP from the snapshot on a SSD disk
1. Delete the existing PVC and PV of the ETCD (oops, data is now gone!)
1. Manually deploy a PV into your Kubernetes cluster that references this new SSD disk
1. Manually deploy a PVC with the name of the original PVC and let it reference the PV that you have just created
1. Scale up the ETCD stateful set and check that ETCD is running properly
1. (if something went terribly wrong, you still have the backup from the etcd-backup-restore sidecar, delete the PVC and PV again and let the sidecar bring up ETCD instead)
1. Scale up the kube-apiserver deployment again
1. Scale up etcd-druid again
1. (stop your shell hacks ;D)

This approach worked very well for us and we were able to fix our production deployment issue. And what happened: We have never seen any crashing kube-apiservers again. 🎉

## Conclusion

As bad as problems in production are, they are the best way for learning from your mistakes. For new users of the Gardener it can be pretty overwhelming to understand the rich configuration possibilities that the Gardener brings. However, once you get a hang of how the Gardener works, the application offers an exceptional versatility that makes it very much suitable for production use-cases like ours.

This example has shown how Gardener:

- Can handle arbitrary layers of infrastructure hosted by different cloud providers.
- Allows provider-specific tweaks to gain ideal performance for every cloud you want to support.
- Leverages Kubernetes core principles across the entire project architecture, making it vastly extensible and resilient.
- Brings useful disaster recovery mechanisms to your infrastructure (e.g. with etcd-backup-restore).

We hope that you could take away something new through this blog post. With this article we also want to thank the SAP Gardener team for helping us to integrate Gardener with metal-stack. It's been a great experience so far. 😄 😍
