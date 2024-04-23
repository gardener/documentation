---
title: "Gardener's Registry Cache Extension: Another Cost Saving Win and More"
linkTitle: "Gardener's Registry Cache Extension: Another Cost Saving Win and More"
newsSubtitle: April 22, 2024
publishdate: 2024-04-22
authors:
- name: Ismail Alidzhikov
  email: ismail.alidzhikov@sap.com
  avatar: https://avatars.githubusercontent.com/u/9372594
aliases: ["/blog/2024/04/22/01"]
---

## Use Cases

In Kubernetes, on every Node the container runtime daemon pulls the container images that are configured in the Pods' specifications running on the corresponding Node. Although these container images are cached on the Node's file system after the initial pull operation, there are imperfections with this setup.

New Nodes are often created due to events such as auto-scaling (scale up), rolling updates, or replacements of unhealthy Nodes. A new Node would need to pull the images running on it from the container registry because the Node's cache is initially empty. Pulling an image from a registry incurs network traffic and registry costs.

To reduce network traffic and registry costs for your Shoot cluster, it is recommended to enable the Gardener's Registry Cache extension to run a registry as pull-through cache in the Shoot cluster.

The use cases of using a pull-through cache are not only limited to cost savings. Using a pull-through cache makes the Kubernetes cluster resilient to failures with the upstream registry - outages, failures due to rate limiting.

## Solution

Gardener's Registry Cache extension deploys and manages a pull-through cache registry in the Shoot cluster.

A pull-through cache registry is a registry that caches container images in its storage The first time when an image is requested from the pull-through cache, it pulls the image from the upstream registry, returns it to the client and stores it in its local storage. On subsequent requests for the same image, the pull-through cache serves the image from its storage. In this way network traffic to the upstream registry is avoided.

Imagine that you have a DaemonSet in your Kubernetes cluster. In a cluster without a pull-through cache, every Node must pull the same container image from the upstream registry. In a cluster with a pull-through cache, the image is pulled once from the upstream registry and served later for all Nodes.

![A Shoot cluster setup with a registry cache for Docker Hub (docker.io)](images/shoot-cluster-with-registry-cache.png "A Shoot cluster setup with a registry cache for Docker Hub (docker.io)")

<p style="text-align: center; font-style: italic;">A Shoot cluster setup with a registry cache for Docker Hub (docker.io).</p>

## Cost Considerations

An image pull represents ingress traffic for a virtual machine (data is entering to the system from outside) and egress traffic for the upstream registry (data is leaving the system).

Ingress traffic from the internet to a virtual machine is free of charge on AWS, GCP and Azure. However, the cloud providers charge NAT gateway costs for inbound and outbound data processed by the NAT gateway based on the processed data volume (per GB). The container registry offering on the cloud providers charge for egress traffic - again, based on the data volume (per GB).

Having all of this in mind, the Registry Cache extension reduces NAT gateway costs for the Shoot cluster and container registry costs.

## Try It Out!

We would also like to encourage you to try it! As a Gardener user you can also reduce your infrastructure costs and increase resilience by enabling the Registry Cache for your Shoot clusters. The Registry Cache extension is a great fit for long running Shoot clusters that have high image pull rate.

For more information, refer to the Registry Cache extension documentation!
