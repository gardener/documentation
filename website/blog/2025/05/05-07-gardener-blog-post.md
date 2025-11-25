---
title: "Leaner Clusters, Lower Bills: How Gardener Optimizes Kubernetes Compute Costs"
linkTitle: "Leaner Clusters, Lower Bills: How Gardener Optimizes Kubernetes Compute Costs"
newsSubtitle: May 07, 2025
publishdate: 2025-05-07
authors:
- avatar: https://avatars.githubusercontent.com/vlerenc
  email: vedran.lerenc@sap.com
  login: vlerenc
  name: Vedran Lerenc
aliases: ["/blog/2025/05/07/leaner-clusters-lower-bills-how-gardener-optimizes-kubernetes-compute-costs"]
---

As organizations scale their Kubernetes adoption, managing the associated infrastructure costs becomes a top priority. For Gardener, which operates tens of thousands of Kubernetes clusters, optimizing resource consumption is not just a best practice—it's a core operational principle. By refining how we manage our own Kubernetes-based infrastructure, we generate significant cost savings that benefit the entire Gardener ecosystem.

While costs span compute, storage, and networking, compute resources typically account for the largest portion of the bill. This post details Gardener's journey in optimizing these costs, going beyond standard practices to achieve substantial and sustainable savings.

### Gaining Visibility and Finding Early Wins

You can't optimize what you can't measure. Our first step was to gain deep visibility into our spending patterns using a combination of cloud provider cost-analysis tools and custom internal reports. This allowed us to identify major cost drivers, track down unnecessary development clusters, and enforce hibernation schedules.

We also developed the `gardener/inventory` tool to combat resource waste. This tool cross-references the desired state in Gardener against actual cloud provider resources, flagging orphaned or unexpected components like unmanaged virtual machines or load balancers. This not only cuts costs but also serves as an additional security check.

Further savings were realized through:
*   **Seed Consolidation:** Merging smaller seed clusters into fewer, larger ones improves efficiency. However, this must be balanced against network costs, as placing a control plane far from its worker nodes can negate the savings.
*   **Centralized Ingress:** We transitioned from one load balancer per shoot control plane to a single, centralized Istio ingress-gateway per seed, drastically reducing the number of expensive load balancers.
*   **Registry Caching:** Implementing a registry cache extension significantly cut down on network traffic and costs from repeatedly pulling container images.
*   **Topology-Aware Routing:** For high-availability control planes, enabling topology-aware routing minimizes expensive cross-availability zone traffic.

### A Deep Dive into Compute Optimization

The most significant savings came from a two-stage approach to compute optimization: packing pods more efficiently onto nodes and right-sizing the pods themselves.

#### Stage 1: Efficiently Packing Pods onto Nodes

The goal here is to maximize the utilization of each node's allocatable capacity. We achieved this by:

*   **Bin-Packing:** We configured the Kube-Scheduler to use a bin-packing strategy, which tightly packs pods onto fewer nodes rather than spreading them out. This simple change reduced machine costs by over 20% in our seed clusters.
*   **Higher Pod Density:** To make bin-packing effective on larger instances, we configured nodes to handle more pods by increasing the available IP addresses per node, raising the `max-pods` kubelet setting, and tuning the kernel's ARP cache to prevent overflow.
*   **Tuning the Cluster Autoscaler:** We adjusted the cluster autoscaler to be more aggressive in scaling down. By increasing the `scale-down-utilization-threshold` to `0.9`, we instruct the autoscaler to consider removing any node running below 90% utilization if its pods can be safely rescheduled elsewhere.

#### Stage 2: Right-Sizing Pods with HPA and VPA

This stage focuses on aligning a pod's resource requests with its actual usage. The Horizontal Pod Autoscaler (HPA) and Vertical Pod Autoscaler (VPA) are the primary tools here. Our key learnings include:

*   **Combining HPA and VPA:** It is possible to use both on the same workload, even for the same metric like CPU. The key is to configure HPA to scale based on the average value (`AverageValue`) of the metric, not the utilization percentage, which prevents conflicts when VPA adjusts the pod's requests.
*   **Tuning VPA:** We adjusted VPA's configuration to react more quickly to sustained changes while ignoring minor, temporary spikes. We also contributed an upstream change to allow setting a global `maxAllowed` value in the VPA controller, preventing it from recommending resources that exceed node capacity.
*   **Avoiding Limits:** We generally avoid setting CPU or memory limits. CPU limits can cause unnecessary throttling, while memory limits can lead to premature OOMKills. We prefer to let VPA manage requests and rely on monitoring and alerting for excessive usage.

### Data-Driven Machine Type Selection

Choosing the right machine type is critical. The optimal choice depends on the CPU-to-memory ratio, instance generation, and hidden constraints like the maximum number of attachable volumes—a major factor for Gardener's etcd clusters.

To move beyond manual analysis, we developed an automated pool recommender. This tool:
1.  **Collects comprehensive data** on node specs, pod requests, and actual resource usage from the kubelet's summary API.
2.  **Simulates the workload** on all available machine types for a given provider and region.
3.  **Identifies the true bottleneck** (CPU, memory, volumes, or pods) for each candidate machine.
4.  **Calculates an efficiency score** based on cost and potential waste.
5.  **Ranks the candidates** and assigns priorities for the cluster autoscaler, ensuring we consistently use the most cost-effective machine types for our specific workload profile.

This data-driven approach also extends to configuring `kube-reserved`. Instead of relying on generic, workload-naive formulas, we use our measured overhead data to predict the actual resources needed by the kubelet and container runtime, enhancing both stability and cost-efficiency.

### The Journey Continues

Cost optimization is an ongoing process. We are currently exploring further improvements, including request-based load balancing to address VPA's limitations with imbalanced workloads, evaluating Cilium as a more efficient CNI, and analyzing the price-performance benefits of ARM-based architectures.

By taking a holistic, data-driven approach, Gardener has successfully reduced its compute costs, delivering value to all users of the platform.

***

### Further Reading

*   [Recording: Leaner Clusters, Lower Bills](https://youtu.be/ZwurVm1IJ7o?t=930s)
*   [Blog Post: Leaner Clusters, Lower Bills: How Gardener Optimized Kubernetes Compute Costs](https://gardener.cloud/blog/2025/04/04-17-Leaner-Clusters-Lower-Bills/)