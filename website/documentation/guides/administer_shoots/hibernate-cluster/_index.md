---
title: Hibernate a Cluster
type: docs
level: intermediate
category: Operation
scope: app-developer
aliases: ["/readmore/hibernate","/050-tutorials/content/howto/hibernate-cluster"]
---


## Problem
If you have built a customer scenario for demo purposes, you don't want to run the cluster all the time. The costs 
would exceed here very fast. You can setup the cluster again for each demo, thanks to *Helm* this works relatively well,
but takes a long time depending on the infrastructure. Furthermore not all 3rd party services are connected yet.


{{% inline_svg "overview" "teaser_patched.svg" %}}


## Set a Gardener Cluster in Hibernate Mode
Fortunately the Gardener offers the possibility to scale the Worker Nodes down to *"Zero"* without much effort.
Follow the slide deck below to bring your Gardner Cluster in Hibernate Mode


> The mechanism to hibernate a cluster has changed. It is not necessary to scale down the workergroups
> to zero. You can now press the **hibernate button** or add the property `hibernation` to the shoot YAML.
> 


{{< slide dir="./slider/" >}}

