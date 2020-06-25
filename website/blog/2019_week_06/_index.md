---
title: Manually adding a node to an existing cluster
type: Blog
authors: 
- name: Andreas Herz
  email: andreas.herz@sap.com
  avatar: https://avatars1.githubusercontent.com/u/1155039?v=4
publishdate: 2019-06-11
archivedate: 2019-07-11
---

Gardener has an excellent ability to [automatically scale machines](/components/mcm/) for the cluster. From the point of view 
of scalability, there is **no need for manual intervention**. 


{{< blog_img link="teaser.svg" >}}


This tutorial is useful for those end-users who need specifically configured nodes, which are not yet supported 
by Gardener. For example: an end-user who wants some workload that requires `runnc` instead of `runc` as container 
runtime.


..read some more on [Adding Nodes to a Cluster](../readmore/adding-nodes).


