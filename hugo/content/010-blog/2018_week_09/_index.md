---
title: Namespace Isolation
type: Blog
---

...or **DENY all traffic from other namespaces**


You can configure a **NetworkPolicy** to deny all the traffic from other namespaces while allowing all the traffic 
coming from the same namespace the pod deployed to. There are many reasons why you may chose to employ Kubernetes 
network policies:
 - Isolate multi-tenant deployments
 - Regulatory compliance
 - Ensure containers assigned to different environments (e.g. dev/staging/prod) cannot interfere with one another                                                

{{% blog_img "logo" "blog-namespaceisolation.png" %}}


..read on [Namespace Isolation]({{ site.baseurl }}/doc/2017/01/16/howto-networkisolation.html) how to configure it.