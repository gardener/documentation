---
title: Vertical Pod Autoscaler
weight: 6
description: Learn how to enable and use the Vertical Pod Autoscaler in Gardener to automatically adjust pod resource requests and limits based on usage patterns.
tags: [vpa, vertical pod autoscaler, resource management, cpu scaling, memory scaling, pod resources]
page_synonyms: [vertical scaling, pod autoscaling, resource autoscaling, vpa controller, resource optimization]
categories: [scaling, resource management, automation]
---

## Vertical Pod Autoscaler

![vpa](./images/vpa.gif)

When a pod's resource CPU or memory grows, it will hit a limit eventually. Either the pod has resource limits specified or the node will run short of resources. In both cases, the workload might be throttled or even terminated. When this happens, it is often desirable to increase the request or limits. To do this autonomously within certain boundaries is the goal of the Vertical Pod Autoscaler project.

Since it is not part of the standard Kubernetes API, you have to install the CRDs and controller manually. With Gardener, you can simply flip the switch in the shoot's spec and start creating your VPA objects.

Please be aware that VPA and HPA operate in similar domains and might interfere.

A controller & CRDs for vertical pod auto-scaling can be activated via the shoot's spec.
