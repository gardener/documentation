---
title: "Leaner Clusters, Lower Bills: A Guide to Kubernetes Cost Optimization"
linkTitle: "Leaner Clusters, Lower Bills: A Guide to Kubernetes Cost Optimization"
newsSubtitle: May 07, 2025
publishdate: 2025-05-07
authors:
- avatar: https://avatars.githubusercontent.com/vlerenc
  email: vedran.lerenc@sap.com
  login: vlerenc
  name: Vedran Lerenc
aliases: ["/blog/2025/05/07/leaner-clusters-lower-bills-a-guide-to-kubernetes-cost-optimization"]
---

As organizations increasingly rely on Kubernetes to manage applications at scale, controlling infrastructure costs—especially for compute resources—is a top priority. Gardener is used to operate tens of thousands of Kubernetes clusters, making resource efficiency a critical concern. This post details Gardener's journey in optimizing Kubernetes-related resource consumption, focusing on compute cost-saving strategies that go beyond standard autoscaling practices.

### Gaining Visibility and Eliminating Waste

The first step to optimization is understanding your spending. By leveraging cloud provider cost reports (like AWS Cost Explorer or Azure Cost Management) and setting up alerts, you can identify major cost drivers and regressions.

Early on, we focused on eliminating obvious waste:
*   **Hibernation:** We automated the hibernation of non-production clusters and reported on those with poor hibernation schedules to curb unnecessary uptime.
*   **Orphaned Resources:** Development and experimentation can leave behind forgotten resources like VMs, disks, and load balancers. To combat this, we developed the `gardener/inventory` tool, which cross-references expected cloud resources against existing ones to detect and report discrepancies.
*   **Seed Consolidation:** We found that consolidating control planes into fewer, larger seed clusters improves efficiency. However, this must be done thoughtfully, as placing control planes in different regions than their worker nodes can lead to high network traffic costs that negate the savings.

### Quick Wins in Networking and Storage

While compute is often the largest expense, we also found significant savings in networking and storage:
*   **Centralized Ingress:** Instead of deploying a separate load balancer for each shoot control plane, we moved to a central Istio ingress-gateway per seed cluster. This dramatically reduced the number of expensive load balancers.
*   **Registry Cache:** To cut down on network traffic from pulling container images, we implemented a registry cache extension, which avoids re-pulling images for every new node.
*   **Reduced Cross-Zonal Traffic:** For high-availability control planes, data transfer between availability zones can be costly. We enabled Kubernetes' Topology Aware Routing to prioritize routing traffic within the same zone, lowering costs.

### A Deep Dive into Compute Cost Optimization

The most significant savings came from a multi-faceted approach to compute utilization, which we break down into two stages: packing pods onto nodes and right-sizing the pods themselves.

#### Packing Pods Tightly

The goal here is to fill the allocatable capacity of your nodes as efficiently as possible.
*   **Bin-Packing:** We switched the Kube-Scheduler profile in our seed clusters from the default `LeastAllocated` strategy to `MostAllocated` (bin-packing). This simple change resulted in over a 20% reduction in machine costs by packing pods onto fewer nodes.
*   **Higher Pod Density:** To make bin-packing effective, nodes must be configured to handle more pods. This involves providing a sufficient IP address range per node, increasing the `--max-pods` kubelet setting, and tuning kernel ARP cache thresholds to prevent network instability at high pod counts.
*   **Fine-Tuning the Cluster Autoscaler:** We adjusted the cluster autoscaler to be more aggressive in scaling down. By increasing the `--scale-down-utilization-threshold` to `0.9`, we instruct the autoscaler to consider removing any node running below 90% utilization if its pods can be safely rescheduled.

#### Right-Sizing Pods with HPA and VPA

This stage focuses on matching a pod's resource requests to its actual usage.
*   **Combining HPA and VPA:** We use both the Horizontal Pod Autoscaler (HPA) and Vertical Pod Autoscaler (VPA) on the same components, like `kube-apiserver`. The key is to configure HPA to scale based on the average resource value (`target.type: AverageValue`) rather than utilization percentage, which prevents conflicts when VPA adjusts the pod's requests.
*   **Tuning VPA:** We tuned VPA parameters to react faster to sustained changes while ignoring minor spikes. We also contributed a `maxAllowed` setting upstream to the VPA controller, preventing it from recommending resource requests that exceed the capacity of any available node.
*   **Avoiding Limits:** We generally avoid setting CPU and memory limits. CPU limits can cause unnecessary throttling, while memory limits can lead to premature pod kills. Instead, we let VPA manage requests and rely on monitoring and alerting to catch excessive usage.

### Data-Driven Machine Type Selection

Choosing the right VM instance type is critical. Our manual selection process was tedious and error-prone, so we developed an automated pool recommender.

This tool analyzes the workload profile across an entire Gardener installation, considering CPU, memory, pod count, and—most importantly—hidden constraints like the maximum number of attachable volumes per instance type. It then simulates the workload on all available machine types, calculating an efficiency score for each. This allows us to consistently select the instance type that offers the best price-performance for a given workload, identifying the true bottleneck, whether it's CPU, memory, or volume attachments.

This data-driven approach also extends to configuring `kube-reserved`. Instead of relying on static, workload-naive formulas from cloud providers, we measure the actual overhead from `kubelet` and the container runtime across thousands of nodes. This allows us to build a predictive model that tailors reservations to the specific workload and pod density, improving both stability and cost-efficiency.

### Further Reading
*   [Recording: Leaner Clusters, Lower Bills](https://youtu.be/ZwurVm1IJ7o?t=930)
*   [Blog Post: Leaner Clusters, Lower Bills: How Gardener Optimized Kubernetes Compute Costs](https://gardener.cloud/blog/2025/04/04-17-Leaner-Clusters-Lower-Bills/)