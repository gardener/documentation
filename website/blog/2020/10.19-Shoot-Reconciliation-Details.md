---
title: Shoot Reconciliation Details
linkTitle: Shoot Reconciliation
newsSubtitle: October 23, 2020
publishdate: 2020-10-19
authors:
- name: Daniel Foehr
  email: daniel.foehr@sap.com
  avatar: https://avatars3.githubusercontent.com/u/33809186?s=400&u=92ab34a3539c11c498710aed9ddd1749032b36cb&v=4
aliases: ["/blog/2020/10/23/00"]
---

Do you want to understand how Gardener creates and updates Kubernetes clusters (Shoots)?
Well, it's complicated, but if you are not afraid of large diagrams and are a visual learner like me, this might be useful to you.

## Introduction

In this blog post I will share a technical diagram which attempts to tie together the 
various components involved when Gardener creates a Kubernetes cluster.
I have created and curated the diagram, which visualizes the Shoot reconciliation flow since I started developing on Gardener.
Aside from serving as a memory aid for myself, I created it in hopes that it may potentially help contributors to understand a core piece of the complex Gardener machinery. 
Please be advised that the diagram and components involved are large. 
Although it can be easily divided into multiple diagrams, I want to show all the components and connections in a single diagram to create an overview of the reconciliation flow.

The goal is to visualize the interactions of the components involved in the Shoot creation. 
It is not intended to serve as a documentation of every component involved. 

## Background

Taking a step back, the Gardener [READ.me](https://github.com/gardener/gardener/blob/master/README.md) states 

> In essence, Gardener is an [extension API server](https://kubernetes.io/docs/tasks/access-kubernetes-api/setup-extension-api-server/) 
that comes along with a bundle of custom controllers. 
It introduces new API objects in an existing Kubernetes cluster (which is called **garden** cluster) in order to use them for the 
management of end-user Kubernetes clusters (which are called **shoot** clusters). 
These shoot clusters are described via [declarative cluster specifications](https://github.com/gardener/gardener/blob/master/example/90-shoot.yaml) which are observed by the controllers.
They will bring up the clusters, reconcile their state, perform automated updates and make sure they are always up and running.

This means that Gardener, just like any Kubernetes controller, creates Kubernetes clusters (Shoots) using a reconciliation loop.

The [Gardenlet](https://github.com/gardener/gardener/blob/master/docs/concepts/gardenlet.md) contains the controller and reconciliation loop responsible for the creation, update, deletion and migration of Shoot cluster (there are more, but we spare them in this article).
In addition, the [Gardener Controller Manager](https://github.com/gardener/gardener/blob/master/docs/concepts/controller-manager.md) also reconciles Shoot resources, but only for seed-independent functionality such as Shoot hibernation, Shoot maintenance or quota control.

This blog post is about the reconciliation loop in the Gardenlet responsible for creating and updating Shoot clusters. 
The code [can be found here](https://github.com/gardener/gardener/blob/master/pkg/gardenlet/controller/shoot/shoot_control_reconcile.go).
The reconciliation loops of the extension controllers can be found in their individual repositories.

## Shoot reconciliation flow diagram 

When Gardner creates a Shoot cluster, there are three conceptual layers involved: the Garden cluster, the Seed cluster and the Shoot cluster. 
Each layer represents a top-level section in the diagram (similar to a lane in a BPMN diagram). 

It might seem confusing, that the Shoot cluster itself is a layer, because the whole flow in the first place is about creating the Shoot cluster.
I decided to introduce this separate layer to make a clear distinction between which resources exist in the Seed API server (managed by Gardener) and which in the Shoot API server (accessible by the Shoot owner).   

Each section contains several components.
Components are mostly Kubernetes resources in a Gardener installation (e.g. the gardenlet deployment in the Seed cluster).

This is the list of components:

**(Virtual) Garden Cluster**
- Gardener Extension API server
- Validating Provider Webhooks
- Project Namespace

**Seed Cluster**
- Gardenlet
- Seed API server 
  - every Shoot Control Plane has a dedicated namespace in the Seed.
- Cloud Provider (owned by Stakeholder). 
  - Arguably part of the Shoot cluster but used by components in the Seed cluster to create the infrastructure for the Shoot.
- [Gardener DNS extension](https://github.com/gardener/external-dns-management)
- Provider Extension (such as [gardener-extension-provider-aws](https://github.com/gardener/gardener-extension-provider-aws))
- [Gardener Extension ETCD Druid](https://github.com/gardener/etcd-druid)
- [Gardener Resource Manager](https://github.com/gardener/gardener-resource-manager)
- Operating System Extension (such as [gardener-extension-os-gardenlinux](https://github.com/gardener/gardener-extension-os-gardenlinux))
- Networking extension (such as [gardener-extension-networking-cilium](https://github.com/gardener/gardener-extension-networking-cilium))
- [Machine Controller Manager](https://github.com/gardener/machine-controller-manager)
- ContainerRuntime Extension (such as [gardener-extension-runtime-gvisor](https://github.com/gardener/gardener-extension-runtime-gvisor))
- Shoot API server (in the Shoot Namespace in the Seed cluster)

**Shoot Cluster**
- Cloud Provider compute API (owned by Stakeholder) - for VM/Node creation.
- VM / Bare metal node hosted by Cloud Provider (in Stakeholder owned account).


### How to use the diagram
The diagram 
- should be read from top to bottom - starting in the top left corner with the creation of the Shoot resource via the Gardener Extension API server.
- should not require an encompassing documentation / description.
  More detailed documentation on the components itself, can usually be found in the respective repository.
- does not show which activities execute in parallel (many) and also does not describe the exact dependencies between the steps. 
  This can be found out by [looking at the source code](https://github.com/gardener/gardener/blob/master/pkg/gardenlet/controller/shoot/shoot_control_reconcile.go).
  It however tries to put the activities in a logical order of executing during the reconciliation flow. 

Occasionally, there is an info box with additional information next to parts in the diagram that in my point of view require further explanation.
Large example resource for the Gardener CRDs (e.g Worker CRD, Infrastructure CRD) are placed on the left side and are referenced by a dotted line (-----).

Be aware, that Gardener is an evolving project, so the diagram will most likely be already outdated by the time you are reading this.
Nevertheless, it should give a solid starting point for further explorations into the details of Gardener.

### Flow diagram

The diagram can be found below and on [Github.com](https://github.com/danielfoehrKn/diagrams/tree/master/gardener/shoot-reconciliation).
There are multiple formats available (svg, vsdx, draw.io, html).

Please open an issue or open a PR in the repository if information is missing or is incorrect. 
Thanks! 

<img style="width:300px; height: auto; margin: 0;auto" src="https://raw.githubusercontent.com/danielfoehrKn/diagrams/master/gardener/shoot-reconciliation/gardener_reconcile_with_grid.png" target="_blank"></a>