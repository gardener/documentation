---
title: Namespace Isolation
type: Blog
---

...or **DENY all traffic from other namespaces**


You can configure a **NetworkPolicy** to deny all traffic from other namespaces while allowing all traffic 
coming from the same namespace the pod is deployed to. There are many reasons why you may chose to configure Kubernetes 
network policies:
 - Isolate multi-tenant deployments
 - Regulatory compliance
 - Ensure containers assigned to different environments (e.g. dev/staging/prod) cannot interfere with each another                                                

{{% blog_img "logo" "blog-namespaceisolation.png" %}}


..read on [Namespace Isolation](/howto/networkisolation) how to configure it.