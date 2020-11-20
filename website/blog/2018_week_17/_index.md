---
title: Frontend HTTPS
type: Blog
authors: 
- name: Andreas Herz
  email: andreas.herz@sap.com
  avatar: https://avatars1.githubusercontent.com/u/1155039?v=4
publishdate: 2018-06-11
archivedate: 2018-07-11
---

![](blog-https.png)
 
For encrypted communication between the client to the load balancer, you need to specify a TLS private key and 
certificate to be used by the ingress controller.

Create a secret in the namespace of the ingress containing the TLS private key and certificate. Then configure the 
secret name in the TLS configuration section of the ingress specification.

..read on [HTTPS - Self Signed Certificates](https://github.com/gardener/documentation/blob/master/website/documentation/guides/applications/https/_index.md) how to configure it.
