---
title: Glossary
description: Commonly used terms in Gardener
persona: Users
weight: 90
---
## Purpose

Synonyms and inconsistent writing style makes it hard for beginners to get into a new topic. This glossary aims to help users to get a better understanding of Gardener and authors to use the right terminology.

Contributions are most welcome!

If you would like to contribute please check first if your new term is already part of the [Standardized Kubernetes Glossary](https://kubernetes.io/docs/reference/glossary/?fundamental=true), and if so refrain from adding it here. Whenever you see the need to explain Kubernetes terminology or to refer to Kubernetes concepts it is recommended that you link to the official Kubernetes documentation in your section.

## Gardener Glossary

If you add anything to the list please keep it in alphabetical order.

| Term | Definition | Related Term |
| ---- | ---------- | ------------ |
| admission plugin | A piece of code that intercepts requests to the Kubernetes API server prior to persistence of the object, but after the request is authenticated and authorized. Gardener uses them for various purposes, e.g. `PodSecurity`. | [Dynamic Admission Control](https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/) |
| API aggregation | A way to extend Kubernetes with more APIs by writing an extension API server that the main API server proxies to. Gardener uses this for its own API resources. | [Extension API Server](https://kubernetes.io/docs/tasks/extend-kubernetes/setup-extension-api-server/) |
| APIService | A Kubernetes resource that registers an API server in the main Kubernetes API server. Gardener uses this to register its extension API server. | [API Aggregation](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/apiserver-aggregation) |
| audit policy | Defines what events should be recorded by the Kubernetes API server. Users can configure this for their shoot clusters in Gardener. | [Auditing](https://kubernetes.io/docs/tasks/debug/debug-cluster/audit/) |
| bastion host | A special-purpose computer on a network specifically designed and configured to withstand attacks. `gardenctl` can automatically set up a bastion host for SSH access to nodes. | SSH Access to a Node That Failed to Join the Cluster |
| cloud provider secret | А resource storing confidential data used to authenticate Gardener and Kubernetes components for infrastructure operations. <br><br> When a new cluster is created in a Gardener project, the project admin who creates the cluster specification must select the infrastructure secret that will be used to manage IaaS resources required for the new cluster. | [secret](https://kubernetes.io/docs/concepts/configuration/secret/) |
| CloudProfile | A Gardener resource that provides information about supported Kubernetes versions, OS versions, regions, machine types, etc., for a specific IaaS provider. Each shoot references a CloudProfile. | Shoot Cluster |
| cluster autoscaler | A Kubernetes component that automatically adjusts the size of a Kubernetes cluster by adding or removing nodes based on pod scheduling needs and resource utilization thresholds. Gardener has a forked version compatible with its `machine-controller-manager`. | Machine Controller Manager (MCM) |
| Concourse | An open-source continuous integration and delivery (CI/CD) tool used by Gardener for its CI/CD infrastructure. | CI/CD |
| control plane | The set of components that manage a Kubernetes cluster, including the API server, controller manager, scheduler, and etcd. In Gardener, a shoot cluster's control plane runs in a seed cluster. | [kube-apiserver](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/), [etcd](https://etcd.io/docs/) |
| Contributor Covenant | The code of conduct that all members of the Gardener community must abide by. | Code of Conduct |
| Creative Commons Attribution 4.0 International License | The license under which documentation contributions to Gardener must be made. | License |
| CRD (Custom Resource Definition) | A way to extend the Kubernetes API with custom resources. Gardener itself is built using CRDs. | [Custom Resource](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/) |
| Developer Certificate of Origin (DCO) | A declaration that contributors make, stating they have the right to submit their contributions under the project's license. Required for contributions to Gardener. | License |
| diki | A compliance checker tool used by Gardener to show compliance with security standards like DISA Kubernetes STIG. | DISA Kubernetes STIG |
| DISA Kubernetes STIG | The Security Technical Implementation Guide (STIG) for Kubernetes from the Defense Information Systems Agency (DISA), which provides recommendations for secure deployment and operation of Kubernetes. Gardener aims to comply with this standard. | Security Hardened Shoot Configurations |
| DocForge | A tool used by Gardener to develop, validate, and integrate documentation sources from various repositories into documentation bundles. | Documentation-as-code |
| etcd | A consistent and highly-available key value store used as Kubernetes' backing store for all cluster data. Gardener deploys etcd instances for shoot control planes. | Control Plane |
| ExposureClass | A Gardener feature that allows exposing the Kubernetes apiserver in a corporate network not exposed to the public internet, as an alternative to ACL extensions. | Access Control List Extension |
| Gardener API server | An API server designed to run inside a Kubernetes cluster whose API it wants to extend. <br><br> After registration, it is used to expose resources native to Gardener such as cloud profiles, shoots, seeds and secret bindings.  | [kube-apiserver](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/) |
| garden cluster | A dedicated Kubernetes cluster that the Gardener control plane runs in. This cluster is nodeless and stores all Gardener-related resources. | [cluster](https://kubernetes.io/docs/reference/glossary/?fundamental=true#term-cluster) |
| garden cluster control plane | A control plane that manages the overall creation, modification, and deletion of clusters. | [control plane](https://kubernetes.io/docs/reference/glossary/?all=true#term-control-plane) |
| Gardener controller manager | A component that runs next to the Gardener API server which runs several control loops that do not require talking to any seed or shoot cluster. | [kube-controller-manager](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-controller-manager/) |
| Gardener Enhancement Proposal (GEP) | A design document for proposing major changes or new features to the Gardener project. | Contributing Bigger Changes |
| gardenlet | An agent that manages seed clusters decentrally; reads the desired state from the Gardener API Server and updates the current state. It's analogous to the kubelet for nodes, but for shoot clusters on a seed. | [kubelet](https://kubernetes.io/docs/reference/command-line-tools-reference/kubelet/) |
| Gardener project | A consolidation of project members, clusters, and secrets of the underlying IaaS provider used to organize teams and clusters in a meaningful way. Each project corresponds to a Kubernetes namespace in the garden cluster. | Namespaces on YAML level |
| Gardener Resource Manager (GRM) | A Gardener-specific component responsible for deploying and managing Kubernetes resources required for cluster functionality within shoot clusters, reconciled via `ManagedResource` objects. | ManagedResource |
| Gardener scheduler | A controller that watches newly created shoots and assigns a seed cluster to them based on factors like capacity and affinity. | [kube-scheduler](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-scheduler/) |
| GardenLinux | A Debian-based operating system optimized for running Kubernetes nodes, often used as the machine image for Gardener shoot cluster worker nodes. | Machine Image |
| hibernation | A Gardener feature that shuts down all components of a shoot cluster (both data and control plane) to reduce costs, typically used for non-production clusters. | Shoot Lifecycle |
| InitContainer | A specialized container that runs before other containers in a Pod. They can be used to perform setup tasks. | [Pod Lifecycle](https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#init-containers) |
| Kubeception | The concept of running Kubernetes on Kubernetes. Gardener uses this by hosting shoot cluster control planes on seed clusters. | Seed Cluster, Shoot Cluster |
| KubeConfig | A file used to configure access to Kubernetes clusters for clients like kubectl. Gardener provides ways to obtain kubeconfigs for garden, seed, and shoot clusters. | [kubectl](https://kubernetes.io/docs/reference/kubectl/) |
| Machine Controller Manager (MCM) | A Gardener component that runs in the seed cluster and is responsible for provisioning, managing, and deleting virtual machines that become worker nodes for shoot clusters. It acts on `MachineClass`, `MachineDeployment`, and `MachineSet` resources. | Worker Pool |
| ManagedResource | A Kubernetes Custom Resource used by the Gardener Resource Manager (GRM) to describe and reconcile a set of Kubernetes resources that need to be deployed and managed in a seed or shoot cluster. | Gardener Resource Manager (GRM) |
| OIDC (OpenID Connect) | An identity layer on top of OAuth 2.0. Gardener supports OIDC for authenticating users to shoot clusters via an identity provider. | Authentication |
| physical garden cluster | A physical cluster of the IaaS provider that is used to install Gardener in. | none |
| Plutono | A Grafana fork used in Gardener's observability stack for dashboard visualization of metrics and logs. | Observability |
| PodDisruptionBudget (PDB) | A Kubernetes feature that limits the number of concurrently disrupted pods for an application, ensuring availability during voluntary disruptions like node drains or upgrades. | [Voluntary Disruptions](https://kubernetes.io/docs/concepts/workloads/pods/disruptions/#voluntary-and-involuntary-disruptions) |
| project "Gardener"| An open source project that focuses on operating, monitoring, and managing Kubernetes clusters. | none |
| Prometheus | An open-source systems monitoring and alerting toolkit used by Gardener for collecting metrics from control plane components and nodes. | Observability |
| secretBinding | A Gardener resource that allows a shoot cluster in one project (namespace) to securely reference an infrastructure secret stored in another project (namespace). | Cloud Provider Secret |
| seed cluster | A Kubernetes cluster that hosts the control planes of one or more shoot clusters. It runs components like the gardenlet and machine-controller-manager. | Kubeception, Shoot Cluster Control Plane |
| shoot cluster | An end-user Kubernetes cluster managed by Gardener. Its control plane runs on a seed cluster, and its worker nodes run on the specified IaaS provider. | Kubeception, Worker Node |
| shoot cluster control plane | A [Kubernetes control plane](https://kubernetes.io/docs/concepts/overview/components/#control-plane-components) used to run the actual end-user workload. It is hosted in the form of pods on a seed cluster. | [control plane](https://kubernetes.io/docs/reference/glossary/?all=true#term-control-plane) |
| soil cluster | A cluster that is created manually and is used as host for other seeds. <br><br> Sometimes it is technically impossible that Gardener can install shoot clusters on an infrastructure, for example, because the infrastructure is not supported or protected by a firewall. In such cases you can create a soil cluster on that infrastructure manually as a host for seed clusters. From inside the firewall, seed clusters can reach the garden cluster outside the firewall. This is possible since Gardener delegated cluster management to the _Gardenlet_. | none |
| Tailscale | A mesh VPN service based on WireGuard that can be used to secure access to the Kubernetes apiserver. | [WireGuard](https://www.wireguard.com/) |
| Vali | A Loki fork used in Gardener's observability stack for collecting and querying logs from control plane components and nodes. | Observability |
| Velero | An open-source tool for backing up and restoring Kubernetes cluster resources and persistent volumes. Not provided by Gardener by default, but can be used by users. | Backup and Restore of Kubernetes Objects |
| virtual garden cluster | A cluster without any nodes that runs the Kubernetes API server, etcd, and stores Gardener metadata like projects, shoot resources, seed resources, secrets, and others. <br><br> The virtual garden cluster is installed on the physical garden cluster (base cluster of IaaS provider) during the installation of Gardener. Thanks to the virtual garden cluster, Gardener has full control over all Gardener metadata. This full control simplifies the support for the backup, restore, recovery, migration, relocation, or recreation of this data, because it can be implemented independently from the underlying physical garden cluster. | none |
| webhook | A mechanism for Kubernetes to extend its functionality by calling external HTTP services during API requests. Gardener uses validating and mutating webhooks, and users can deploy their own. | [Dynamic Admission Control](https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/) |
| workerless shoot | A Gardener shoot cluster that is provisioned without any worker nodes, consisting only of a control plane. Useful for orchestration or API-only use cases. | Control Plane as a Service |