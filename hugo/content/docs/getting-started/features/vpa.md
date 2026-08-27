---
title: Vertical Pod Autoscaler
weight: 6
prev: false
next: false
---
<!-- BANNER:LOCAL -->
<!--
   █▀█ █▄▀
   █ █ █▀▄
   ▀▀▀ ▀ ▀

   ┌────────────────────────────────────────────────┐
   │  LOCAL FILE — maintained in gardener/            │
   │  documentation.                                  │
   │                                                  │
   │  Go ahead and edit this file directly.           │
   │  Changes here are the source of truth.           │
   └────────────────────────────────────────────────┘
-->


# Vertical Pod Autoscaler

![vpa](/docs/getting-started/features/images/vpa.gif)

When a pod's resource CPU or memory grows, it will hit a limit eventually. Either the pod has resource limits specified or the node will run short of resources. In both cases, the workload might be throttled or even terminated. When this happens, it is often desirable to increase the request or limits. To do this autonomously within certain boundaries is the goal of the Vertical Pod Autoscaler project.

Since the [Vertical Pod Autoscaler](https://github.com/kubernetes/autoscaler/tree/master/vertical-pod-autoscaler#readme) (VPA) is not part of the standard Kubernetes API, you would normally have to install the CRDs and controller manually. With Gardener, however, you can simply set `spec.kubernetes.verticalPodAutoscaler.enabled=true` in the shoot's spec and start creating your VPA objects.

Please be aware that VPA and HPA operate in similar domains and might interfere.
