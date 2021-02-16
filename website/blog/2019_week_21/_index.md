---
title: Cluster Overprovisioning
type: Blog
authors: 
- name: Andreas Herz
  email: andreas.herz@sap.com
  avatar: https://avatars1.githubusercontent.com/u/1155039?v=4
publishdate: 2019-06-11
archivedate: 2019-07-11
---
This tutorial describes how to overprovisioning of cluster nodes for scaling and failover. This is desired 
when you have work load that need to scale up quickly without waiting for the new cluster nodes to be created 
and join the cluster.

![teaser](teaser.png)

A similar problem occurs when crashing a node from the Hyperscaler. This must be replaced by Kubernetes as fast 
as possible. The solution can be **overprovisioning** of nodes



..read some more on [Cluster Overprovisioning](https://github.com/gardener-samples/kube-overprovisioning/blob/master/README.md).


