---
title: Machine Controller Manager
linkTitle: Machine Controller Manager
newsSubtitle: January 25, 2021
type: blog
publishdate: 2021-01-25
archivedate: 2021-02-25
authors:
- name: Samarth S Deyagond
  email: samarth.deyagond@sap.com
  avatar: https://avatars.githubusercontent.com/u/32246441?s=460&u=2e611ee3c06533c3ec9d73e0557bab1432446657&v=4
aliases: ["/blog/2021/01/25/01"]
---

Kubernetes is a cloud-native enabler built around the principles for a resilient, manageable, observable, highly automated, loosely coupled system. We know that Kubernetes is infrastructure agnostic with the help of provider specific [Cloud Controller Manager](https://kubernetes.io/docs/concepts/architecture/cloud-controller/). But Kubernetes has explicitly externalized the mangement of the nodes. Once they appear - correctly configured - in the cluster, Kubernetes can use them. If nodes fail, Kubernetes can't do anything about it, external tooling is required. But every tool, every provider is different. So, why not elevate node management to a first class Kubernetes citizen? Why not create a Kubernetes native resource that manages machines just like pods? Such an approach is brought to you by the [Machine Controller Manager](https://github.com/gardener/machine-controller-manager) (aka MCM), which, of course, is an open sourced project. MCM gives you the following benefits:

- seamlessly manage machines/nodes with a declarative API (of course, across different cloud providers),
- integrate generically with the [cluster autoscaler](https://github.com/kubernetes/autoscaler/tree/master/cluster-autoscaler),
- plugin with tools such as the [node-problem-detector](https://github.com/kubernetes/node-problem-detector),
- transport the immutability design principle to machine/nodes as well, and last but not least,
- implement e.g. rolling upgrades of machines/nodes.

## Machine Controller Manager aka MCM
[Machine Controller Manager](https://github.com/gardener/machine-controller-manager) is a group of cooperative controllers that manage the lifecycle of the worker machines. It is inspired by the design of Kube Controller Manager in which various sub controllers manage their respective Kubernetes Clients.

Machine Controller Manager reconciles a set of Custom Resources namely `MachineDeployment`, `MachineSet` and `Machines` which are managed & monitored by their controllers `MachineDeployment Controller`, `MachineSet Controller`, `Machine Controller` respectively along with another cooperative controller called the `Safety Controller`.

## Understanding the sub-controllers and Custom Resources of MCM
The Custom Resources `MachineDeployment`, `MachineSet` and `Machines` are very much analogous to the native K8s resources of `Deployment`, `ReplicaSet` and `Pods` respectively. So, in the context of MCM:

- `MachineDeployment` provides a declarative update for `MachineSet` and `Machines`. `MachineDeployment Controller` reconciles the `MachineDeployment` objects and manages the lifecycle of `MachineSet` objects. `MachineDeployment` consumes provider specific `MachineClass` in its `spec.template.spec` which is the template of the VM spec that would be spawned on the cloud by MCM.
- `MachineSet` ensures that the specified number of `Machine` replicas are running at a given point of time. `MachineSet Controller` reconciles the `MachineSet` objects and manages the lifecycle of `Machine` objects.
- `Machines` are the actual VMs running on the cloud platform provided by one of the supported cloud providers. `Machine Controller` is the controller that actually communicates with the cloud provider to create/update/delete machines on the cloud.
- There is a `Safety Controller` responsible for handling the unidentified or unknown behaviours from the cloud providers.
- Along with the above Custom Controllers and Resources, MCM requires the `MachineClass` to use K8s `Secret` that stores cloudconfig (initialization scripts used to create VMs) and cloud specific credentials.


 
## Working of MCM
 
<img title="Figure 1: In-Tree Machine Controller Manager" src="images/00.png" style="width:90%; height:auto" />
<figcaption style="text-align:center;margin-top: 0px;margin-bottom: 30px;font-size: 90%;">Figure 1: In-Tree Machine Controller Manager</figcaption>

In MCM, there are two K8s clusters in the scope — a *Control Cluster* and a *Target Cluster*. Control Cluster is the K8s cluster where the MCM is installed to manage the machine lifecycle of the Target Cluster. In other words, Control Cluster is the one where the machine-* objects are stored. Target Cluster is where all the node objects are registered. These clusters can be two distinct clusters or the same cluster, whichever fits.

When a `MachineDeployment` object is created, `MachineDeployment Controller` creates the corresponding `MachineSet` object. The `MachineSet Controller` in-turn creates the `Machine` objects. The `Machine Controller` then talks to the cloud provider API and actually creates the VMs on the cloud.

The cloud initialization script that is introduced into the VMs via the K8s `Secret` consumed by the `MachineClasses` talks to the KCM (K8s Controller Manager) and creates the node objects. Nodes after registering themselves to the Target Cluster, start sending health signals to the machine objects. That is when MCM updates the status of the machine object from `Pending` to `Running`.
 
## More on Safety Controller
Safety Controller contains following functions:

**Orphan VM handling**:

- It lists all the VMs in the cloud; matching the tag of given cluster name and maps the VMs with the `Machine` objects using the `ProviderID` field. VMs without any backing `Machine` objects are logged and deleted after confirmation.
- This handler runs every 30 minutes and is configurable via `--machine-safety-orphan-vms-period` flag.

**Freeze mechanism**:
- `Safety Controller` freezes the `MachineDeployment` and `MachineSet controller` if the number of `Machine` objects goes beyond a certain threshold on top of `Spec.Replicas`. It can be configured by the flag `--safety-up` or `--safety-down` and also `--machine-safety-overshooting-period`.
- `Safety Controller` freezes the functionality of the MCM if either of the `target-apiserver` or the `control-apiserver` is not reachable.
- `Safety Controller` unfreezes the MCM automatically once situation is resolved to normal. A `freeze` label is applied on `MachineDeployment`/`MachineSet` to enforce the freeze condition.

## Evolution of MCM from In-Tree to Out-of-Tree (OOT)
MCM supports declarative management of machines in a K8s Cluster on various cloud providers like AWS, Azure, GCP, AliCloud, OpenStack, Metal-stack, Packet, KubeVirt, VMWare, Yandex. It can, of course, be easily extended to support other cloud providers.

Going ahead having the implementation of the Machine Controller Manager supporting too many cloud providers would be too much upkeep from both a development and a maintenance point of view. Which is why, the `Machine Controller` component of MCM has been moved to Out-of-Tree design where `Machine Controller` for respective cloud provider runs as an independent executable; even though typically packaged under the same deployment.

<img title="Figure 2: Out-Of-Tree Machine Controller Manager" src="images/01.png" style="width:90%; height:auto" />
<figcaption style="text-align:center;margin-top: 0px;margin-bottom: 30px;font-size: 90%;">Figure 2: Out-Of-Tree (OOT) Machine Controller Manager</figcaption>

This OOT Machine Controller will implement a common interface to manage the VMs on the respective cloud provider. Now, while `Machine Controller` deals with the `Machine` objects, Machine Controller Manager (MCM) deals with higher level objects such as `MachineSet` and `MachineDeployment` objects.

A lot of contributions are already being made towards OOT Machine Controller Manager for various cloud providers. Below are the links to the repositories:

- [Out of Tree Machine Controller Manager for AliCloud](https://github.com/gardener/machine-controller-manager-provider-alicloud)
- [Out of Tree Machine Controller Manager for AWS](https://github.com/gardener/machine-controller-manager-provider-aws)
- [Out of Tree Machine Controller Manager for Azure](https://github.com/gardener/machine-controller-manager-provider-azure)
- [Out of Tree Machine Controller Manager for GCP](https://github.com/gardener/machine-controller-manager-provider-gcp)
- [Out of Tree Machine Controller Manager for KubeVirt](https://github.com/gardener/machine-controller-manager-provider-kubevirt)
- [Out of Tree Machine Controller Manager for Metal](https://github.com/metal-stack/machine-controller-manager-provider-metal)
- [Out of Tree Machine Controller Manager for vSphere](https://github.com/gardener/machine-controller-manager-provider-vsphere)
- [Out of Tree Machine Controller Manager for Yandex](https://github.com/gardener/machine-controller-manager-provider-yandex)

Watch [this](https://youtu.be/p9BJRpdkxjU) video our YouTube [Gardener Project](https://www.youtube.com/channel/UCwUhwKFREV8Su0gwAJQX7tw) channel to understand more about OOT MCM.

## Who uses MCM?
**[Gardener](http://gardener.cloud)**

MCM is originally developed and employed by a K8s Control Plane as a Service called Gardener. However, the MCM’s design is elegant enough to be employed when managing the machines of any independent K8s clusters, without having to necessarily associate it with Gardener.

**[Metal Stack](https://metal-stack.io)**

Metal-stack is a set of microservices that implements Metal as a Service (MaaS). It enables you to turn your hardware into elastic cloud infrastructure. Metal-stack employs the Machine Controller Manager [adopted](https://github.com/metal-stack/machine-controller-manager-provider-metal) to their Metal API. Check out an introduction to [here](https://www.youtube.com/watch?v=XE-Kpyn8x2k).

**[Sky UK Limited](http://sky.com)**

Sky UK Limited (a broadcaster) migrated their Kubernetes node management from Ansible to Machine Controller Manager. Check out [this](https://youtu.be/yF4wq7GAeEM) video on our YouTube [Gardener Project](https://www.youtube.com/channel/UCwUhwKFREV8Su0gwAJQX7tw) channel.

Also, other interesting use cases with MCM are implemented by Kubernetes enthusiasts, who for example adjusted the Machine Controller Manager to provision machines in the cloud to extend a local Raspberry-Pi K3s cluster. Read more about it [here](https://nativecloud.dev/scale-out-your-raspberry-pi-k3s-cluster-to-the-cloud/) or Check out [this](https://youtu.be/UuveyEOn4_o?t=60) video on our YouTube [Gardener Project](https://www.youtube.com/channel/UCwUhwKFREV8Su0gwAJQX7tw) channel.

## Conclusion
Machine Controller Manager is the leading automation tool for machine management for, and in, Kubernetes. And the best part is that it is open sourced. It is freely (and easily) usable and extensible, and the community more than welcomes contributions. 

Whether you want to know more about Machine Controller Manager or find out about a similar scope for your solutions, then visit the GitHub page [machine-controller-manager](https://github.com/gardener/machine-controller-manager). We are so excited to see what you achieve with Machine Controller Manager.