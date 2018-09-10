---
title: Frontend HTTPS
type: Blog
---

{{% blog_img "logo" "blog-https.png" %}}
 
For encrypted communication between the client to the load balancer, you need to specify a TLS private key and 
certificate to be used by the ingress controller.

Create a secret in the namespace of the ingress containing the TLS private key and certificate. Then configure the 
secret name in the TLS configuration section of the ingress specification.

..read on [HTTPS - Self Signed Certificates](../readmore/https) how to configure it.
