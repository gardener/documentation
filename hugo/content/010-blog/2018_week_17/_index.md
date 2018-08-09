---
title: Frontend HTTPS
type: Blog
---

{{% blog_img "logo" "blog-https.png" %}}
 
 For encrypted communication between the client to the load balancer, you need to specify a TLS private key and 
 certificate to be used by the ingress controller.

For the ingress controller to use the certificate and private key stored in a Kubernetes secret, user needs 
to specify the secret name in the TLS configuration section of their ingress spec. The secret is assumed to 
exist in the same namespace as the ingress.

..read on [HTTPS - Self Signed Certificates](../readmore/https) how to configure it.
