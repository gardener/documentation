---
title: Organizing Access Using kubeconfig Files
type: Blog
authors: 
- name: Andreas Herz
  email: andreas.herz@sap.com
  avatar: https://avatars1.githubusercontent.com/u/1155039?v=4
publishdate: 2019-06-11
archivedate: 2019-07-11
---

The kubectl command-line tool uses `kubeconfig` files to find the information it needs to choose a cluster and 
communicate with the API server of a cluster.

![teaser](teaser.svg)


> What happens if your kubeconfig file of your production cluster is leaked or published by accident?

Since there is no possibility to rotate or revoke the initial kubeconfig, there is only one 
way to protect your infrastructure or application if it is has leaked - **delete the cluster**.



..learn more on [Work with kubeconfig files](https://github.com/gardener/documentation/blob/master/website/documentation/guides/client_tools/working-with-kubeconfig/_index.md).

