---
title: "Dual Autoscaling for Istio Ingress Gateways"
linkTitle: "Dual Autoscaling for Istio Ingress Gateways"
newsSubtitle: April 01, 2026
publishdate: 2026-04-01
authors:
- avatar: https://avatars.githubusercontent.com/oliver-goetz
  login: oliver-goetz
  name: Oliver Götz
aliases: ["/blog/2026/04/01/dual-autoscaling-for-istio-ingress-gateways"]
---

Gardener manages Istio ingress gateways on seed clusters to route traffic to shoot control planes. Until now, these gateways relied on horizontal pod autoscaling (HPA) alone, which worked well for moderate loads but struggled at the extremes: busy seeds needed more CPU than the static resource requests allowed, while quiet seeds wasted resources on oversized pods.

With Gardener v1.139, Istio ingress gateways now use a combined HPA and VPA (vertical pod autoscaler) strategy — the same dual-autoscaling approach already proven on the kube-apiserver.

## The Problem

When testing Layer 7 load balancing on high-traffic seeds, the Gardener team observed that ingress gateway pods would hit their horizontal scaling limits and exhaust their CPU concurrency budget. The result: HTTPS latency to shoot kube-apiservers spiked to 35 seconds in the worst cases, causing widespread control plane instability.

Simply raising the static resource requests would fix busy seeds but waste money on the majority of seeds that carry little traffic. A one-size-fits-all value doesn't exist when the same seed can host gateways ranging from 6 CPUs down to 8 millicores.

## The Solution

The key insight is to let VPA handle the vertical dimension (CPU and memory requests per pod) while HPA handles the horizontal dimension (replica count). To make them coexist without fighting, the HPA scales on the **average CPU value** rather than the average CPU **utilization**. This prevents the classic conflict where VPA raises requests and HPA immediately scales down because utilization dropped.

The target values are differentiated by configuration: seeds with Layer 7 load balancing target 4 CPUs per pod, while seeds without it target 2 CPUs. Maximum replica counts have also been increased — an HA seed with three zones can now scale up to 48 ingress gateway pods.

## Results

In testing, the dual-autoscaling approach adapts cleanly to mixed workloads on the same seed. Busy default ingress gateways scale up to 10 replicas with ~3 CPUs each, while idle zonal gateways stay at the minimum with minimal resource consumption. The VPA recommendations track actual load closely, and the latency issues observed during Layer 7 load balancing testing have been resolved.

## Links

- [Recording (Oliver's talk starts at 0:55)](https://youtu.be/3-PobAcbtbw?t=55)
- [Gardener v1.139 Review Meeting](https://gardener.cloud/community/review-meetings/2026-reviews/)
