---
title: Glossary
description: Commonly used terms in Gardener
persona: Users
weight: 90
---

# Purpose

Synonyms and inconsistent writing style makes it hard for beginners to get into a new topic. This glossary aims to help users to get a better understanding of Gardener and authors to use the right terminology.

Contributions are most welcome!

If you would like to contribute please check first if your new term is already part of the [Standardized Kubernetes Glossary](https://kubernetes.io/docs/reference/glossary/?fundamental=true), and if so refrain from adding it here. Whenever you see the need to explain Kubernetes terminology or to refer to Kubernetes concepts it is recommended that you link to the official Kubernetes documentation in your section.

## Gardener Glossary

If you add anything to the list please keep it in alphabetical order.

| Term | Definition | Related Term |
| ---- | ---------- | ------------ |
| cloud provider secret | А resource storing confidential data used to authenticate Gardener and Kubernetes components for infrastructure operations. <br><br> When a new cluster is created in a Gardener project, the project admin who creates the cluster specification must select the infrastructure secret that will be used to manage IaaS resources required for the new cluster. | [secret](https://kubernetes.io/docs/concepts/configuration/secret/) |
| Gardener API server | An API server designed to run inside a Kubernetes cluster whose API it wants to extend. <br><br> After registration, it is used to expose resources native to Gardener such as cloud profiles, shoots, seeds and secret bindings.  | [kube-apiserver](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/) |
| garden cluster control plane | A control plane that manages the overall creation, modification, and deletion of clusters. | [control plane](https://kubernetes.io/docs/reference/glossary/?all=true#term-control-plane) | 
| Gardener controller manager | A component that runs next to the Gardener API server which runs several control loops that do not require talking to any seed or shoot cluster. | [kube-controller-manager](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-controller-manager/) |
| Gardener project | A consolidation of project members, clusters, and secrets of the underlying IaaS provider used to organize teams and clusters in a meaningful way. | none |
| Gardener scheduler | A controller that watches newly created shoots and assigns a seed cluster to them. | [kube-scheduler](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-scheduler/) |
| gardenlet | An agent that manages seed clusters decentrally; reads the desired state from the Gardener API Server and updates the current state. <br><br> The gardenlet has a similar role as the _kubelet_ in Kubernetes, which manages the workload of a node decentrally; gardenlet manages the shoot clusters (workload) of a seed cluster instead. More information: [gardenlet](https://github.com/gardener/gardener/blob/master/docs/concepts/gardenlet.md). | [kubelet](https://kubernetes.io/docs/reference/command-line-tools-reference/kubelet/) |
| garden cluster | A dedicated Kubernetes cluster that the Gardener control plane runs in. | [cluster](https://kubernetes.io/docs/reference/glossary/?fundamental=true#term-cluster) |
| project "Gardener"| An open source project that focuses on operating, monitoring, and managing Kubernetes clusters. | none |
| physical garden cluster | A physical cluster of the IaaS provider that is used to install Gardener in. | none |
| secretBinding | A resource that makes it possible for shoot clusters to connect to the cloud provider secret. | none | 
| seed cluster | A cluster that hosts shoot cluster control planes as pods in order to manage shoot clusters. | [node](https://kubernetes.io/docs/reference/glossary/?all=true#term-node) |
| shoot cluster | A Kubernetes runtime for the actual applications or services consisting of a shoot control plane running on the seed cluster and worker nodes hosting the actual workload. | [pod](https://kubernetes.io/docs/reference/glossary/?fundamental=true#term-pod) |
| shoot cluster control plane | A [Kubernetes control plane](https://kubernetes.io/docs/concepts/overview/components/#control-plane-components) used to run the actual end-user workload. It is hosted in the form of pods on a seed cluster. | [control plane](https://kubernetes.io/docs/reference/glossary/?all=true#term-control-plane) |
| soil cluster | A cluster that is created manually and is used as host for other seeds. <br><br> Sometimes it is technically impossible that Gardener can install shoot clusters on an infrastructure, for example, because the infrastructure is not supported or protected by a firewall. In such cases you can create a soil cluster on that infrastructure manually as a host for seed clusters. From inside the firewall, seed clusters can reach the garden cluster outside the firewall. This is possible since Gardener delegated cluster management to the _Gardenlet_. | none |
| virtual garden cluster | A cluster without any nodes that runs the Kubernetes API server, etcd, and stores Gardener metadata like projects, shoot resources, seed resources, secrets, and others. <br><br> The virtual garden cluster is installed on the physical garden cluster (base cluster of IaaS provider) during the installation of Gardener. Thanks to the virtual garden cluster, Gardener has full control over all Gardener metadata. This full control simplifies the support for the backup, restore, recovery, migration, relocation, or recreation of this data, because it can be implemented independently from the underlying physical garden cluster. | none |
