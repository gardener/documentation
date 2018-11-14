---
title: Auditing Kubernetes for Secure Setup
type: Blog
---

Along the way we found different kinds of security issues, for example due to misconfiguration or missing isolation, 
as well as two problems with upstream Kubernetes which especially come into picture in the Control-Plane-as-a-Service 
architecture.

{{% blog_img "overview" "teaser.svg" %}}


In the last summer, the [Gardener team](https://github.com/gardener/gardener) worked on assessing the security of 
different Gardener managed Kubernetes installations. **The goal of this ongoing work is to increase the security of 
all Gardener stakeholders in the Open Source community.** Following the Gardener architecture, the control plane of a 
Gardener managed shoot cluster resides in the corresponding seed cluster. This is a 
[Control-Plane-as-a-Service](https://kubernetes.io/blog/2018/05/17/gardener/#kubernetes-control-plane) with 
a [network air gap](https://kubernetes.io/blog/2018/05/17/gardener/#network-air-gap).


..read some more on [Auditing Kubernetes for Secure Setup](../readmore/insecure).
