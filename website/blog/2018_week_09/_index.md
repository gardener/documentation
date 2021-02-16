---
title: Namespace Isolation
type: Blog
authors: 
- name: Andreas Herz
  email: andreas.herz@sap.com
  avatar: https://avatars1.githubusercontent.com/u/1155039?v=4
publishdate: 2018-06-11
archivedate: 2018-07-11
---

...or **DENY all traffic from other namespaces**


You can configure a **NetworkPolicy** to deny all traffic from other namespaces while allowing all traffic 
coming from the same namespace the pod is deployed to. There are many reasons why you may chose to configure Kubernetes 
network policies:
 - Isolate multi-tenant deployments
 - Regulatory compliance
 - Ensure containers assigned to different environments (e.g. dev/staging/prod) cannot interfere with each another                                                

![](blog-namespaceisolation.png)


..read on [Namespace Isolation](https://github.com/gardener/documentation/blob/master/website/documentation/guides/applications/network-isolation/_index.md) how to configure it.