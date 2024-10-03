---
title: Introduction to Gardener
weight: 1
---

## Problem Space

Let's discuss the problem space first. Why does anyone need something like Gardener?

### Running Software

The starting point is this rather simple question: Why would you want to run some software?

Typically, software is run with a purpose and not just for the sake of running it. Whether it is a digital ledger, a company's inventory or a blog - software provides a service to its user.

Which brings us to the way this software is being consumed. Traditionally, software has been shipped on physical / digital media to the customer or end user. There, someone had to install, configure, and operate it. In recent times, the pattern has shifted. More and more solutions are operated by the vendor or a hosting partner and sold as a service ready to be used.

But still, someone needs to install, configure, and maintain it - regardless of where it is installed. And of course, it will run forever once started and is generally resilient to any kind of failures.

For smaller installations things like maintenance, scaling, debugging or configuration can be done in a semi-automatic way. It's probably no fun and most importantly, only a limited amount of instances can be taken care of - similar to how one would take care of a pet.

But when hosting services at scale, there is no way someone can do all this manually at acceptable costs. So we need some vehicle to easily spin up new instances, do lifecycle operations, get some basic failure resilience, and more. How can we achieve that?

## Solution Space 1 - Kubernetes

Let's start solving some of the problems described earlier with Container technology and Kubernetes.

### Containers

Container technology is at the core of the solution space. A container forms a vehicle that is shippable, can easily run in any supported environment and generally adds a powerful abstraction layer to the infrastructure.

However, plain containers do not help with resilience or scaling. Therefore, we need another system for orchestration.

### Orchestration

"Classical" orchestration that just follows the "notes" and moves from `state A` to `state B` doesn't solve all of our problems. We need something else.

Kubernetes operates on the principle of "desired state". With it, you write a construction plan, then have controllers cycle through "observe -> analyze -> act" and transition the actual to the desired state. Those reconciliations ensure that whatever breaks there is a path back to a healthy state.

### Summary

Containers (famously brought to the mainstream as "Docker") and Kubernetes are the ingredients of a fundamental shift in IT. Similar to how the Operating System layer enabled the decoupling of software and hardware, container-related technologies provide an abstract interface to any kind of infrastructure platform for the next-generation of applications.

## Solution Space 2 - Gardener

![operating-apps](./images/operating-apps.png)

So, Kubernetes solves a lot of problems. But how do you get a Kubernetes cluster?

Either:

- Buy a cluster as a service from an external vendor
- Run a Gardener instance and host yourself a cluster with its help

Essentially, it was a "make or buy" decision that led to the founding of Gardener.

### The Reason Why We Choose to "Make It"

Gardener allows to run Kubernetes clusters on various hyperscalers. It offers the same set of basic configuration options independent of the chosen infrastructure. This kind of harmonization supports any multi-vendor strategy while reducing adoption costs for the individual teams. Just imagine having to deal with multiple vendors all offering vastly different Kubernetes clusters.

Of course, there are plenty more reasons - from acquiring operational knowledge to having influence on the developed features - that made the pendulum swing towards "make it".

## What exactly is Gardener?

![universal-kubernetes](./images/universal-kubernetes.png)

Gardener is a system to manage Kubernetes clusters. It is driven by the same "desired state" pattern as Kubernetes itself. In fact, it is using Kubernetes to run Kubernetes.

A user may "desire" clusters with specific configuration on infrastructures such as GCP, AWS, Azure, Alicloud, Openstack, vsphere, ... and Gardener will make sure to create such a cluster and keep it running.

If you take this rather simplistic principle of reconciliation and add the feature-richness of Gardener to it, you end up with universal Kubernetes at scale.

Whether you need fleet management at minimal TCO or to look for a highly customizable control plane - we have it all.

On top of that, Gardener-managed Kubernetes clusters fulfill the conformance standard set out by the CNCF and we submit our test results for certification.

Have a look at the [CNCF map](https://cncf.landscape2.io/?item=platform--certified-kubernetes--installer--gardener) for more information or dive into the [testgrid](https://testgrid.k8s.io/conformance-gardener) directly.

Gardener itself is open-source. Under the umbrella of [github.com/gardener](https://github.com/gardener) we develop the core functionalities as well as the extensions and you are welcome to contribute (by opening issues, feature requests or submitting code).

Last time we counted, there were already 131 projects. That's actually more projects than members of the organization.

As of today, Gardener is mainly developed by SAP employees and SAP is an "adopter" as well, among STACKIT, Telekom, Finanz Informatik Technologie Services GmbH and others. For a full list of adopters, see the [Adopters page](https://github.com/gardener/documentation/blob/master/website/adopter/_index.md).
