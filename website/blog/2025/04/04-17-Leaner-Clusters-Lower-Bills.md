---
title: "Leaner Clusters, Lower Bills: How Gardener Optimized Kubernetes Compute Costs"
linkTitle: "Leaner Clusters, Lower Bills: How Gardener Optimized Kubernetes Compute Costs"
newsSubtitle: April 17, 2025
publishdate: 2025-04-17
authors:
- name: Vedran Lerenc
  email: vedran.lerenc@sap.com
  avatar: https://avatars.githubusercontent.com/vlerenc
aliases: ["/blog/2025/04/17/01"]
---

As organizations embrace Kubernetes for managing containerized applications at scale, the underlying infrastructure costs, particularly for compute resources, become a critical factor. Gardener, the open-source Kubernetes management platform, empowers organizations like SAP, STACKIT, T-Systems, and others (see [adopters](https://gardener.cloud/adopter)) to operate tens of thousands of Kubernetes clusters efficiently across diverse environments. Gardener's role as a core technology in initiatives like [NeoNephos](https://neonephos.org/projects), aimed at advancing digital autonomy in Europe (see [KubeCon London 2025 Keynote](https://www.youtube.com/watch?v=85MDID9Ju04&t=621s) and [press announcement](https://neonephos.org/press/2025/the-linux-foundation-announces-the-launch-of-neonephos-to-advance-digital-autonomy-in-europe/)), further underscores the need for cost-effective and sustainable operations.

At the heart of Gardener's architecture is the concept of "Kubeception" (see [readme](https://github.com/gardener/gardener?tab=readme-ov-file#gardener) and [architecture](https://github.com/gardener/gardener/blob/master/docs/concepts/architecture.md)): Gardener runs *on* Kubernetes (called a **runtime cluster**), facilitates access *through* a self-managed node-less Kubernetes cluster (called the **garden cluster**), manages Kubernetes control planes as pods *within* self-managed Kubernetes clusters that provide high scalability to Gardener (called **seed clusters**), and *provisions* end-user Kubernetes clusters (called **shoot clusters**). Therefore, optimizing Gardener's own Kubernetes-related resource consumption directly translates into cost savings across all these layers, benefiting both Gardener service providers and the end-users consuming the managed clusters.

While infrastructure costs span compute, storage, and networking, compute resources (the virtual machines running Kubernetes nodes) typically represent the largest share of the bill. Over the past years, the Gardener team has undertaken a significant effort to optimize these costs. This blog post details our journey, focusing heavily on the compute optimizations that go beyond standard autoscaling practices, ultimately delivering substantial savings that benefit the entire Gardener ecosystem.

We'll build upon the foundations laid out in our [Pod Autoscaling Best Practices Guide](https://github.com/gardener/gardener/blob/master/docs/usage/autoscaling/shoot_pod_autoscaling_best_practices.md). You may want to check it out beforehand, as we'll only touch upon a few key recommendations from it in this blog post, not delving into the full depth required for effective pod autoscaling – a prerequisite for the compute optimizations discussed here.

## Visibility and Initial Measures

### Know Your Spending: Leveraging Observability and IaaS Cost Tools

You can't optimize what you can't measure. Our first step was to gain deep visibility into our spending patterns. We leveraged:

*   **IaaS Cost Reports & Alerts:** Regularly analyzing detailed cost breakdowns from cloud providers (AWS Cost Explorer, Azure Cost Management, GCP Billing Reports) helped us identify major cost drivers across compute, storage, and network usage. Setting up alerts for cost anomalies makes us aware of regressions and unexpected budget overruns.
*   **Cloud Provider Recommendation Tools:** Tools like AWS Trusted Advisor, Azure Advisor's Cost recommendations, and Google Cloud's machine type rightsizing recommendations provided initial, manual pointers towards obvious inefficiencies like underutilized virtual machines or suboptimal instance types.
*   **Internal Usage Reports:** We generated custom reports detailing our own resource consumption. This helped identify and drive down the number and uptime of development and other non-production clusters. Automating the configuration of Gardener's [cluster hibernation feature](https://github.com/gardener/gardener/blob/master/docs/usage/shoot/shoot_hibernate.md) or reporting on clusters with poor hibernation schedules further curbed unnecessary spending. These insights are now integrated into the Gardener Dashboard (our GUI).

### The Reserved Instance / Savings Plan Imperative: Planning for Discounts

Cloud providers offer significant discounts for commitment: Reserved Instances (RIs) on AWS/Azure, Savings Plans (SPs) on AWS/Azure, and Committed Use Discounts (CUDs) on GCP. However, maximizing their benefit requires careful planning, which is not the primary subject of this blog post. Companies typically have tools that generate recommendations from cost reports, suggesting the purchase of new RIs, SPs, or CUDs if on-demand usage consistently increases. Two key learnings emerged in this context, though:

*   **Coordination between Operations and Controlling:** We discovered that technical optimizations and discount commitment purchases *must* go hand-in-hand. A significant 20% utilization improvement can be completely negated if the remaining workload runs on expensive on-demand instances because the RI/SP/CUD purchase didn't account for the change. On-demand pricing can easily be twice or more expensive than committed pricing.
*   **Commitments vs. Spot Pricing:** While Spot Instances/Preemptible virtual machines offer deep discounts, their ephemeral nature makes them unsuitable for critical control plane components. For predictable baseline workloads, well-planned RIs/SPs/CUDs provide substantial, reliable savings and are often more beneficial overall. Spot Instance/Preemptible VM discounts are generally not higher than, and often less than, RI/SP/CUD discounts for comparable commitment levels.

### Early Wins: Finding and Eliminating Resource Waste

We also actively looked for waste, specifically orphaned resources. Development and experimentation inevitably lead to forgotten resources (virtual machines, disks, load balancers, etc.). We implemented processes like requiring all resources to include a personal identifier in the name or as a label/tag to facilitate later cleanup. Initially, we generated simple reports, but it became clear that this task required a more professional approach. Unaccounted-for resources aren't just costly; they can also pose security risks or indicate security incidents. Therefore, we developed the [`gardener/inventory`](https://github.com/gardener/inventory) tool. This tool understands Gardener installations and cross-references expected cloud provider resources (based on Gardener's desired state and implementation) against actually existing resources. It acts as an additional safety net, alerting on discrepancies (e.g., unexpected load balancers for a seed, unmanaged virtual machines in a VPC) which could indicate either cost leakage or a potential security issue, complementing Gardener's existing security measures like high-frequency credentials rotation, image signing and admission, network policies, Falco, etc.

### Consolidation: Avoiding a Fragmented Seed Landscape

If possible, avoid operating too many small seeds unless required by regulations or driven by end-user demand. As Gardener supports control plane migration, you can consolidate your control planes into fewer, larger seeds where reasonable. Since starting Gardener in production in 2017, we've encountered technological advancements (e.g., Azure Availability Sets to Zones) and corrected initial misconfigurations (e.g., too-small CIDR ranges limiting pod/node counts) that necessitated recreating seeds. While hard conflicts (like seed/shoot cluster IP address overlaps) can sometimes block migration to differently configured seeds, you can often at least merge multiple seeds into one or fewer. The key takeaway is that a less fragmented seed landscape generally leads to better efficiency.

However, there is a critical caveat: Gardener allows control planes to reside in different regions (or even different cloud providers) than their worker nodes. This flexibility comes at the cost of inter-regional or internet network traffic. These additional network-related costs can easily negate efficiency gains from seed consolidation. Therefore, consolidate thoughtfully, being mindful that excessive consolidation across regions can significantly increase network costs (intra-region traffic is cheaper than inter-region traffic, and internet traffic is usually the most expensive).

## Quick Wins in Networking and Storage

While compute was our main focus, we also addressed significant cost drivers in networking and storage early on.

### Centralized Ingress & Caching

*   **Centralized Ingress:** In Gardener's early days, each shoot control plane had its own Load Balancer (LB), plus another for the reverse tunnel connection to worker nodes (to reach webhooks, scrape metrics, stream logs, `exec` into pods, etc.). This proliferation of LBs was expensive. We transitioned to a model using a central Istio ingress-gateway per seed cluster with a single LB, leveraging SNI (Server Name Indication) routing to direct traffic to the correct control plane API servers. We also reversed the connection direction: shoots now connect *to* seed clusters, and seeds connect *to* the garden cluster. This reduced the need for LBs exposing seed components and enabled *private* shoots or even *private* seeds behind firewalls.
*   **Registry Cache:** Pulling container images for essential components (like CNI, CSI drivers, kube-proxy) on every new node startup generated significant network traffic and costs. We implemented a [registry cache extension](https://github.com/gardener/gardener-extension-registry-cache), drastically reducing external image pulls (see [blog post](https://gardener.cloud/blog/2024/04-22-gardeners-registry-cache-extension-another-cost-saving-win-and-more)).

### Smarter Networking Habits

*   **Efficient API Usage:** Well-implemented controllers use `watch` requests rather than frequent `list` requests to minimize API server load and improve responsiveness. Leveraging server-side filtering via [label selectors](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#label-selectors) and [field selectors](https://kubernetes.io/docs/concepts/overview/working-with-objects/field-selectors) reduces the amount of data transferred.
*   **Reducing Cross-Zonal Traffic:** Data transfer between availability zones, necessary for highly available control planes, is generally more expensive than within a single zone. We enabled Kubernetes' [Topology Aware Routing](https://kubernetes.io/docs/concepts/services-networking/topology-aware-hints) to help route API server traffic within the same zone where possible, reducing cross-zonal traffic and therefore costs (see [Gardener Issue #6718](https://github.com/gardener/gardener/issues/6718)).
*   **Avoiding Large Resources:** Storing large amounts of data directly in Kubernetes resources (ConfigMaps, Secrets) is inefficient and strains etcd and the network. We utilize blob stores for large payloads, such as control plane etcd or state backups used for automated restoration or control plane migration (with data compressed and encrypted in transit and at rest).
*   **Regression Monitoring:** Implementing regression monitoring for network traffic helped catch seemingly innocent code changes that could inadvertently cause massive spikes in data transfer costs.

### Conscious Storage Consumption

Storage costs were addressed by being mindful of Persistent Volume Claim (PVC) size and performance tiers (e.g., standard HDD vs. premium SSD). Choosing the right storage class based on actual workload needs prevents overspending on unused capacity or unnecessary IOPS.

## Deep Dive into Compute Cost Optimization

This is where the most significant savings were realized. Optimizing compute utilization in Kubernetes is a multi-faceted challenge involving the interplay of several components.

### Understanding Utilization: The Interplay of Scheduler, Cluster Autoscaler, HPA, and VPA

We think of utilization optimization in two stages:

1.  **Packing Pods onto Nodes (Requests vs. Allocatable):** How efficiently are the resource *requests* of your pods filling up the *allocatable* capacity of your nodes? This is primarily influenced by the Kube-Scheduler and the Cluster Autoscaler (CA).
2.  **Right-Sizing Pods (Usage vs. Requests):** How closely does the actual resource *usage* of your pods match their *requests*? This is where Horizontal Pod Autoscaler (HPA) and Vertical Pod Autoscaler (VPA) come in.

You need to optimize *both* stages for maximum efficiency.

### Optimizing Scheduling: Bin-Packing and Pod Priorities with Kube-Scheduler

*   **Bin-Packing:** By default, Kube-Scheduler tries to spread pods across nodes (using the `LeastAllocated` strategy). For cost optimization, *packing* pods tightly onto fewer nodes (using the `MostAllocated` strategy, often called bin-packing) is more effective. Gardener runs Kubernetes control planes as pods on seed clusters. Switching the Kube-Scheduler profile in our seed clusters to prioritize bin-packing yielded over 20% reduction in machine costs for these clusters simply by requiring fewer nodes. We also made this scheduling profile available for shoot clusters (see [Gardener PR #6251](https://github.com/gardener/gardener/pull/6251)).
*   **Pod Priorities:** Assigning proper [Pod Priorities](https://kubernetes.io/docs/concepts/scheduling-eviction/pod-priority-preemption) is important not just for stability but also for cost. High-priority pods (like control plane components) can preempt lower-priority pods if necessary, reducing the need to maintain excess capacity just in case a critical pod needs scheduling space. This avoids unnecessary over-provisioning.

### Voluntary Disruptions: Pod Disruption Budgets

*   **Pod Disruption Budgets:** Defining proper [Pod Disruption Budgets (PDBs)](https://kubernetes.io/docs/tasks/run-application/configure-pdb) helps manage and steer voluntary disruptions safely. We define them consistently for all Gardener components. This provides the necessary control to rebalance, compact, or generally replace underlying machines as needed by us or our automation, contributing to cost efficiency by enabling node consolidation.

### Enabling Higher Pod Density per Node

*   **Node Configuration**: To effectively utilize larger instance types and enable better bin-packing, nodes must be configured to handle more pods. We observed nodes becoming pod-bound (unable to schedule more pods despite available CPU/memory). To prevent this, ensure you configure the following:
    *   **Sufficient IP Addresses**: Provide a large enough `--node-cidr-mask-size` (e.g., `/22` for ~1024 IPs, though assume ~80% effective due to IP reuse; see [kube-controller-manager docs](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-controller-manager)) to allocate sufficient IPs per node.
    *   **Kubelet Capacity**: Set an increased `--max-pods` value (see [kubelet docs](https://kubernetes.io/docs/reference/command-line-tools-reference/kubelet)) to inform the kubelet and scheduler of the node's actual pod capacity.
    *   **Reserved Resources**: Allocate sufficient `--kube-reserved` resources (again, see [kubelet docs](https://kubernetes.io/docs/reference/command-line-tools-reference/kubelet)) to account for system overhead from the increased pod count.
    *   **ARP Cache Tuning**: When running a high number of pods (e.g., 400 or more), the default kernel ARP cache size may be insufficient, leading to an "ARP cache overflow." This triggers constant, CPU-intensive garbage collection, which can destabilize the node and cause networking failures. To mitigate this, you should increase the ARP cache garbage collection thresholds. In a Gardener `Shoot` specification, you can apply these settings via `sysctls`:
        ```yaml
        spec:
          provider:
            workers:
            - name: worker-pool-name
              (...)
              sysctls:
                net.ipv4.neigh.default.gc_thresh2: '1024' # Default is 512
                net.ipv4.neigh.default.gc_thresh3: '2048' # Default is 1024
        ```

### Fine-Tuning the Cluster Autoscaler: Scaling Nodes Efficiently

The cluster autoscaler (CA) adds or removes nodes based on pending pods and node utilization. We tuned its behavior for better cost efficiency:

*   `--scale-down-unneeded-time=15m`: Time a node must be underutilized before CA considers it for removal, allowing removal of persistently unneeded capacity.
*   `--scale-down-delay-after-add=30m`: Prevents CA from removing a node too soon after adding one, reducing potential node thrashing during fluctuating load.
*   `--scale-down-utilization-threshold=0.9`: We significantly increased this threshold (default is 0.5). It instructs CA to attempt removing any node running below 90% utilization *if* it can safely reschedule the existing pods onto other available nodes; otherwise, it does nothing. We have run with this setting successfully for a long time, supported by properly tuned pod priorities, PDBs managing voluntary disruptions, highly available control planes, and Kubernetes' level-triggered, asynchronous nature.

### Mastering Pod Autoscaling: HPA, VPA, and Best Practices

Right-sizing pods dynamically is key. Kubernetes offers HPA and VPA:

*   **Horizontal Pod Autoscaling (HPA):** Scales the *number* of pod replicas based on metrics (CPU/memory utilization, custom metrics). Ideal for stateless applications handling variable request loads.
*   **Vertical Pod Autoscaler (VPA):** Adjusts the CPU/memory *requests* of existing pods. Ideal for stateless and also stateful applications or workloads with fluctuating resource needs over time, without changing replica count.

### Our Best Practices & Learnings:

*   **Combine HPA and VPA for API Servers Safely:** You *can* use HPA and VPA together, even on the same metric (like CPU), but careful configuration is essential. The key is to configure HPA to scale based on the *average value* (`target.type: AverageValue`) rather than *utilization percentage* (`target.type: Utilization`). This prevents conflicts where VPA changes the requests, which would otherwise immediately invalidate HPA's utilization calculation.
    *   *Example HPA targeting average CPU/Memory values:*
        ```yaml
        spec:
          minReplicas: 3
          maxReplicas: 12
          metrics:
          - resource:
              name: cpu
              target:
                averageValue: 6 # Target 6 cores average usage per pod (Note: String value often required)
                type: AverageValue
            type: Resource
          - resource:
              name: memory
              target:
                averageValue: 24Gi # Target 24Gi average usage per pod
                type: AverageValue
            type: Resource
          behavior: # Fine-tune scaling behavior
            scaleDown:
              policies:
              - periodSeconds: 300
                type: Pods
                value: 1
              selectPolicy: Max
              stabilizationWindowSeconds: 1800
            scaleUp:
              policies:
              - periodSeconds: 60
                type: Percent
                value: 100
              selectPolicy: Max
              stabilizationWindowSeconds: 60
          scaleTargetRef:
            apiVersion: apps/v1
            kind: Deployment
            name: kube-apiserver
        ```
*   **Tune VPA Configuration:**
    *   We adjusted VPA parameters like `--target-cpu-percentile` / `--target-memory-percentile` (determining the percentile of historical usage data to include in target recommendations, ignoring spikes above) and margin/bound parameters to make VPA less sensitive to tiny spikes and react faster and more accurately to sustained changes.
    *   We also tuned parameters like `--cpu-histogram-decay-half-life` (from 24h to 15m) and `--recommendation-lower-bound-cpu-percentile` (from 0.5 to 0.7) to follow changes in CPU utilization more closely (work on memory is ongoing).
    *   **VPA `minAllowed`:** We set `minAllowed` (per VPA resource) based on observed usage patterns and historical outage data related to VPA scaling down too aggressively.
    *   **VPA `maxAllowed`:** We set `maxAllowed` (per VPA controller) to prevent request recommendations from exceeding node capacity. We found `maxAllowed` couldn't be configured centrally in the VPA controller, so we contributed this feature upstream (see [Kubernetes Autoscaler Issue #7147](https://github.com/kubernetes/autoscaler/issues/7147) and [corresponding PR](https://github.com/kubernetes/autoscaler/pull/7560)).
*   **Set Pod Requests:** We always set CPU and memory requests for our containers or let VPA manage those.
*   **Tune Pod Requests:** We systematically processed hundreds of components:
    *   Some deployments were placed under VPA management. Others (very small, below VPA's resolution of ~10m cores / 10Mi memory) were removed from VPA and given static requests.
    *   **"Initial" Requests:** For pods managed by VPA, we set initial requests to the observed P5 (5th percentile) of historical usage. This provides a reasonable starting point for VPA.
    *   **"Static" Requests:** For pods not managed by VPA, we set requests to the P95 (95th percentile). This ensures they generally have enough resources; only exceptional spikes might cause issues, where VPA wouldn't typically help either.
*   **Quality of Service (QoS):** Prefer the `Burstable` QoS class (requests set, ideally no limits) for most workloads. Avoid `BestEffort` (no requests/limits), as these pods are the first to be evicted under pressure. Avoid `Guaranteed` (requests match limits), as limits often cause more harm than good. See our [Pod Autoscaling Best Practices Guide](https://github.com/gardener/gardener/blob/master/docs/usage/autoscaling/shoot_pod_autoscaling_best_practices.md#quality-of-service-qos). Pods in the `Guaranteed` QoS class, or generally those with limits, will be actively CPU-throttled and can be OOMKilled even if the node has ample spare capacity. Worse, if containers in the pod are under VPA, their CPU requests/limits often won't scale up appropriately because CPU throttling goes unnoticed by VPA.
    *   **Avoid Limits:** In Gardener's context (and often also elsewhere), setting CPU limits offers few advantages and significant disadvantages, primarily unnecessary throttling. Setting memory limits *can* prevent runaway processes but may also prematurely kill pods. We generally avoid setting limits unless the theoretical maximum resource consumption of a component is well understood. When unsure, let VPA manage requests and rely on monitoring/alerting for excessive usage.

## Data-Driven Machine Type Selection

### Continuous Monitoring: Understanding How Well Our Machines are Utilized

Before optimizing machine type selection, we established comprehensive machine utilization monitoring. This was important during individual improvement steps to validate their effectiveness. We collect key metrics per Gardener installation, cloud provider, seed, and worker pool, and created dashboards to visualize and monitor our machine costs. These dashboards include:
*   Total CPU [in thousand cores], Total Memory [in TB], Total Number of Control Planes [count]
*   Used Capacity CPU [%], Used Capacity Memory [%], Unused vs. Capacity Cost [Currency]
*   Requested Allocatable CPU [%], Requested Allocatable Memory [%], Unrequested vs. Allocatable Cost [Currency]
*   Used Requested CPU [%], Used Requested Memory [%], Unused vs. Requested Cost [Currency]
*   Used Reserved CPU [%, can exceed 100%], Used Reserved Memory [%, can exceed 100%], Unused vs. Reserved Cost [Currency]
*   Nodes with >99% filling levels, broken down by CPU, memory, volumes, and pods (to identify the most critical resource blocking further usage)
*   Effective CPU:memory ratio of the workload (more on that later)

### Why Machine Types Matter: Size, Ratios, Generations, and Hidden Constraints

Selecting the right machine type is critical for cost efficiency. Several factors come into play:

*   **Size:** Larger machines generally lead to less fragmentation (less wasted CPU/memory remainder per node) and better overhead efficiency (system components like kubelet/containerd consume a smaller percentage of total resources). However, smaller machines can be better for low-load scenarios while meeting high-availability constraints (e.g., needing to spread critical pods across 3 zones requires at least 3 nodes).
*   **CPU:Memory Ratio:** Cloud providers offer instance families with different CPU:memory ratios (e.g., high-cpu 1:2, standard 1:4, high-memory 1:8). Matching the instance ratio to your workload's aggregate CPU:memory request ratio minimizes waste.
*   **Generations:** Newer instance generations usually offer better performance and, crucially, better price-performance. This can also shift the effective CPU:memory ratio required by the workload due to performance differences.
*   **Hidden Constraints: Volume Limits:** This proved to be a *major* factor, especially on AWS and Azure. Each instance type has a maximum number of network-attached volumes it can support. Gardener control planes, each with its own etcd cluster requiring persistent volumes for each replica, are heavily impacted. We often found ourselves limited by volume attachments long before hitting CPU or memory limits. Interestingly, ARM-based instance types on Azure support a slightly higher volume limit.

### The Case for Dedicated Pools: Isolating Workloads

While mixing diverse workloads seems efficient at first glance, dedicated node pools for specific workload types proved beneficial for several reasons:

*   **Handling [`safe-to-evict: false`](https://github.com/kubernetes/autoscaler/blob/master/cluster-autoscaler/FAQ.md#what-types-of-pods-can-prevent-ca-from-removing-a-node):** Some pods (like single-replica stateful components for non-HA clusters) cannot be safely evicted by the Cluster Autoscaler. Mixing these with evictable pods on the same node can prevent the CA from scaling down that node, even if it's underutilized, negating cost savings. Placing these non-evictable pods in a dedicated pool (where scale-down might be disabled or carefully managed) isolates this behavior.
*   **Volume Concentration:** Our "etcd" worker pools host primarily etcd pods (high volume count) and daemonsets, while "standard" pools host API servers, controllers, etc. (lower volume concentration). This difference influences the optimal machine type due to volume attachment limits.
*   **Preventing Scheduling Traps:** Ensure critical, long-running pods (like Istio gateways) have node affinities/selectors to land only on their preferred, optimized node pools. Avoid them landing on temporary, large nodes spun up for short-lived bulky pods; if such a pod prevents the large node from scaling down (e.g., because the pool is at its minimum node count), the CA won't automatically replace the underutilized large node with a smaller one. That's a concept called "workload consolidation", today only supported by [Karpenter](https://github.com/kubernetes-sigs/karpenter), which isn't supporting as many cloud providers as CA.

### Analyzing Workload Profiles: Finding the Optimal Instance Size and Family

Early on, we used a guide for operators to estimate a reasonable machine size for a seed cluster based on the number of hosted control planes, e.g.:

| Optimal<br/>Worker Pool (CPUxMem+Vols) | Very Low Seed Utilization<br/>0 <= &vert;control planes&vert; < 15 | Low Seed Utilization<br/>5 <= &vert;control planes&vert; < 30 | Medium Seed Utilization<br/>10 <= &vert;control planes&vert; < 70 | High Seed Utilization<br/>30 <= &vert;control planes&vert; < 180 | Very High Seed Utilization<br/>120 <= &vert;control planes&vert; < &infin; |
|----------|---|---|---|---|---|
| AWS      | `m5.large`(2x8+26)       | `r7i.large`(2x16+32)      | `r7i.xlarge`(4x32+32)      | `r7i.2xlarge`(8x64+32)       | `r7i.2xlarge`(8x64+32)       |
| Azure    | `Standard_D2s_v5`(2x8+4) | `Standard_D4s_v5`(4x16+8) | `Standard_D8s_v5`(8x32+16) | `Standard_D16s_v5`(16x64+32) | `Standard_D16s_v5`(16x64+32) |
| GCP      | `n1-standard-2`(2x8+127) | `n1-standard-4`(4x15+127) | `n1-standard-8`(8x30+127)  | `n1-standard-16`(16x60+127)  | `n1-standard-16`(16x60+127)  |

This guide also recommended specific instance families. Choosing the right family requires calculating the workload's aggregate CPU:memory ratio (total requested CPU : total requested memory across similar workloads). For example, 1000 cores and 6000 GB memory yields a 1:6 ratio.

Next, one must calculate the cost per core and per GB for different instance families and determine the break-even CPU:memory ratio – the point where the resource waste of two families is equal. The cluster autoscaler doesn't perform this cost-aware analysis; it always weights CPU and memory equally (1:1).

To find the optimal family manually, we followed these steps when adding new generations/families:
*   **Cost per Resource Unit:** Determine the effective cost per core and per GB. Example:
    *   Instance A (2 cores, 4 GB) costs €48/month.
    *   Instance B (2 cores, 8 GB) costs €64/month.
    *   Difference: 4 GB and €16 -> €4 per GB.
    *   Cost of 2 cores = €48 - (4 GB * €4/GB) = €32 -> €16 per core.
*   **Break-Even Analysis:** Using the unit costs, calculate the break-even CPU:memory ratio where the cost of waste balances out between two families for your specific workload ratio.

For instance, if the break-even ratio between standard (1:4) and high-memory (1:8) families is 1:5.7, and your workload runs at 1:6, the high-memory family is likely more cost-effective.

### Automating the Choice: A Machine Type Recommender

This manual process was tedious, error-prone, and infrequently performed, leading to suboptimal machine types running in many seeds. To address this, we developed an automated pool recommender based on the following principles:

1.  **Comprehensive Data Collection:** The recommender gathers metrics across the entire Gardener installation for specific seed sets (groups of seeds with similar configurations like provider and region). For every relevant seed, it collects:
    *   **Node Metadata & Specs:** Instance type, pool, zone, capacity, allocatable resources.
    *   **CSI Node Info:** Maximum attachable volume counts per node.
    *   **Pod Specs:** Resource requests (CPU, memory) for all pods, distinguishing daemonset pods.
    *   **Actual Node Usage:** Detailed usage statistics obtained directly from the [kubelet summary API](https://kubernetes.io/docs/reference/instrumentation/node-metrics) (`/api/v1/nodes/NODENAME/proxy/stats/summary`). This provides actual cgroup-level data on CPU and memory consumption for kubelet, container runtime, system overhead, and individual pods. Especially for memory, this was the only reliable method we found to get accurate working set bytes overall (simply summing pod metrics is inaccurate due to page cache/sharing; see kernel docs for [cgroup-v1](https://www.kernel.org/doc/Documentation/cgroup-v1/memory.txt) and [cgroup-v2](https://www.kernel.org/doc/Documentation/cgroup-v2.txt)).

2.  **Analyzing the Data:** Before recommending *new* types, the recommender calculates key metrics that act as predictors and provide context:
    *   **Workload Ratios:** Requested Core : Requested GB, Attached Volume : Requested GB, Scheduled Pod : Requested GB.
    *   **Measured Overhead Ratios:** *Measured* Reserved Core : Pod Count, *Measured* Reserved GB : Pod Count.
    *   **Aggregation:** Machines are grouped by pool within a seed set.
    *   **Performance Normalization:** CPU metrics (usage) are normalized based on relative performance indicators of the analyzed machine type.

3.  **Simulating Workload on Candidate Machines:** This is the core recommendation logic:
    *   **Candidate Iteration:** The system iterates through all *potential* machine types available for the specific provider and region(s).
    *   **Resource Calculation per Candidate:** For each candidate machine type:
        *   Calculate `kube-reserved`: Estimates CPU/memory needed for kubelet/runtime using our measurement-based model, tailored to the candidate's capacity (more on that later).
        *   Account for DaemonSets: Subtracts the average CPU/memory *requests* of DaemonSet pods (derived from current aggregated pool data).
        *   Performance Adjustment: Adjusts CPU calculations (reserved, daemonset, workload requests) based on the candidate's performance factor relative to a baseline.
        *   Calculate Allocatable Resources: Determines CPU/memory available for workload pods after subtracting reserved and DaemonSet resources.
        *   Unschedulable Buffer: Reduces allocatable resources slightly (e.g., by the equivalent of an "average pod") to account for resource fragmentation and imperfect bin-packing, slightly favoring larger nodes.
    *   **Constraint Checking & Usable Resources:** Projects how much of the *aggregated current workload* (total requests) could fit onto the candidate. It considers multiple dimensions, converting them to a common unit (GB-equivalent) using the measured workload ratios:
        *   Performance-adjusted Allocatable CPU (converted to GB-equivalent)
        *   Allocatable Memory (GB)
        *   Attachable Volumes (converted to GB-equivalent)
        *   Schedulable Pods (converted to GB-equivalent)
        The *minimum* of these values determines the actual usable resources for that candidate machine type under the given workload profile – identifying the ***true bottleneck***, i.e. whether a candidate is CPU-, memory-, volume-, pod-, or load-bound and thus potentially suboptimal.
    *   **Cost & Waste Analysis:**
        *   Calculates the base `machine_costs` (`Cores * Cost per Core + GBs * Cost per GB`) for the candidate.
        *   Estimates `excess_costs` (waste) per machine due to factors like:
            *   *Imperfect Packing:* Assumes the "last" node in a zone is only half-utilized on average.
            *   *Scale-Down Disabled:* Increases estimated waste if scale-down is disabled.
            *   *Volume Packing:* Adds potential waste if the workload is heavily volume-constrained, assuming not all nodes can be packed efficiently with volumes.
    *   **Efficiency Score Calculation:** Computes a relative efficiency score for each candidate:
        `Efficiency = (Cost_of_Usable_Resources) / (Base_Machine_Cost + Estimated_Excess_Cost)`
        This score reflects how cost-effectively the candidate machine type can serve the workload, factoring in estimated waste.

4.  **Ranking & Selection:**
    *   **Sorting:** Candidates are ranked primarily by `Efficiency / Cost per Core`. Dividing by cost per core helps prioritize newer/cheaper instance generations or those with better RI/SP coverage, while still heavily favoring the calculated efficiency.
    *   **Preferred Type & Hysteresis:** The top-ranked type is marked as `preferred` and receives the highest CA expander priority. A threshold (e.g., >5% efficiency improvement) prevents switching the preferred type too frequently, avoiding churn (flapping).
    *   **Priority Assignment:** Priorities are assigned for the cluster autoscaler expander, favoring the preferred type and then ranking others based on the sort order.
    *   **Handling Existing/Legacy Pools:** Ensures that pools with currently running nodes, even if suboptimal or using non-standard names, are preserved to avoid disruption. Legacy pools are tainted with a `NoSchedule` taint to allow workload to slowely migrate away from them.

This data-driven, simulation-based approach allowed us to abandon guides like above and manual operations and consistently select machine types that offer the best balance of performance and cost for the specific workloads running on our Gardener seeds.

### Reserving Capacity for Kubelet and Container Runtime: Tailoring `kube-reserved` Beyond Workload-Naive Formulas

As pod packing density increases, accurately accounting for resources needed by the system itself (kubelet, container runtime, OS) becomes critical. Standard cloud provider formulas for `kube-reserved` (see [kubelet options](https://kubernetes.io/docs/reference/command-line-tools-reference/kubelet)) are often workload-naive, based only on total node CPU/memory capacity (see [summary blog post](https://medium.com/@danielepolencic/reserved-cpu-and-memory-in-kubernetes-nodes-65aee1946afd)). They can either over-reserve (wasting resources) or under-reserve (risking node stability). Our experience showed that formulas considering only node capacity and potentially `maxPods` were often significantly inaccurate, leading to either waste or instability.

Therefore, instead of relying on static formulas, we adopted a measurement-based approach combined with predictive modeling:

1.  **Measure Actual Overhead:** We utilize the data already retrieved via the kubelet summary API. By querying this endpoint across thousands of nodes for all our seeds, we collect the *actual* CPU (`usageNanoCores`) and memory (`workingSetBytes`) consumed by the `kubelet` and `runtime` system containers under various conditions (different machine types, workload profiles like ETCD pools, varying pod densities).

2.  **Derive Workload-Aware Ratios:** We then calculate key ratios that correlate overhead with workload characteristics, specifically pod density:
    *   `ratio_1_used_reserved_core_to_pods`: Average number of pods running per actually *used* reserved core (performance-normalized across machine types).
    *   `ratio_1_used_reserved_gi_to_pods`: Average number of pods running per actually *used* reserved GB of memory.

    These ratios capture how much system overhead is typically generated *per pod* on average within a specific pool type for a given seed set. We explored other potential predictors (containers, probes) but found pod count to be the most useful predictor with acceptable standard deviation.

3.  **Predict Expected `kube-reserved`:** We use these measured ratios to *predict* the necessary `kube-reserved` for *any* candidate machine type considered by the Pool Recommender. The model works as follows:
    *   **Base Load:** We observed a consistent base memory overhead even on lightly loaded nodes (e.g., ~200MiB with [Garden Linux](https://github.com/gardenlinux/gardenlinux?tab=readme-ov-file#garden-linux), Gardener's own Debian-based container-optimized OS) and negligible base CPU overhead.
    *   **Estimate Pod-Driven Overhead:** Using the predicted pod density for a candidate machine type (based on its capacity and the workload profile), we multiply this density by the measured `ratio_1_used_reserved_core_to_pods` and `ratio_1_used_reserved_gi_to_pods` to estimate the required `kube-reserved` CPU and memory, respectively. This tailors the reservation to the candidate's specific capacity and performance characteristics.

4.  **Apply Thresholds for Stability:** To prevent minor fluctuations in calculated recommendations from causing constant configuration changes (increasing `kube-reserved` can trigger pod evictions), we apply thresholds (hysteresis).

This tailored, data-driven approach to `kube-reserved` provides better cost optimization and enhanced stability compared to generic, workload-naive formulas.

*Note on `system-reserved`:* You might wonder why we only discussed `kube-reserved` and not `system-reserved`. Similar to our reasoning against resource limits, configuring `system-reserved` can lead to unexpected CPU throttling or OOM kills for critical system processes outside Kubernetes' direct management. Therefore, Gardener focuses on configuring `kube-reserved` and relies on the kubelet's eviction mechanisms to manage overall node pressure. See also [Reserve Compute Resources for System Daemons](https://kubernetes.io/docs/tasks/administer-cluster/reserve-compute-resources/#general-guidelines).

## Looking Ahead: Continuous Improvement and Future Optimizations

Cost optimization is an ongoing process, not a one-time fix. We're actively exploring further improvements:

*   **Addressing Load Imbalances:** VPA assigns the same request to all pods in a managed group (Deployment/StatefulSet/DaemonSet). This is inefficient for workloads with inherent imbalances (e.g., controller leaders vs. followers, etcd leader vs. followers, uneven load distribution across DaemonSet pods).
    *   **Request-Based Load Balancing:** For components like the `kube-apiserver`, default connection-based load balancing can lead to uneven load distribution that VPA handles poorly (resulting in over-provisioning for some pods, under-provisioning for others). We have implemented request-based load balancing to distribute load more evenly, allowing VPA to set more accurate requests (see [related work](https://github.com/gardener/gardener/pull/11085)).
    *   **In-place pod resource updates** (a Kubernetes enhancement) would be particularly beneficial in the future, allowing VPA to adjust resources without requiring pod restarts, further improving efficiency and stability.
*   **Exploring Cilium / Replacing kube-proxy:** Initial tests suggest switching the CNI from Calico to Cilium could yield 5-10% CPU savings on worker nodes, partly because Cilium can replace kube-proxy, reducing overhead. Memory usage appears similar and Gardener has supported Cilium for years. Alternatively, to eliminate kube-proxy without changing CNIs, we could evaluate [Calico's eBPF data plane](https://docs.tigera.io/calico/latest/operations/ebpf/enabling-ebpf), which can also replace kube-proxy.
*   **ARM Architecture:** We are evaluating ARM-based CPUs (AWS Graviton, Azure Cobalt, GCP Axion). They are generally cheaper per core. Even if slightly slower per core (but often with a better price-performance), they offer additional instance family options, potentially allowing a better match to the workload's CPU:memory ratio (e.g., a 1:6 workload x86 ratio might turn into a performance-adjusted 1:5 ARM ratio and thereby result in less waste than x86 instance families of either a 1:4 or 1:8 ratio). Additionally, Azure's ARM instances sometimes offer slightly higher volume attachment limits.

## Conclusion: Sustainable Savings and Key Takeaways

Optimizing Kubernetes compute costs at scale is a complex but rewarding endeavor. Our journey with Gardener involved a multi-pronged approach:

1.  **Establish Visibility:** Use cloud cost tools and internal monitoring to understand spending.
2.  **Strategic Purchasing:** Tightly align RI/SP/CUD purchases with technical optimizations and workload forecasts.
3.  **Clean Up Waste:** Eliminate orphaned resources and leverage features like cluster hibernation.
4.  **Tune Kubernetes Core Components:** Utilize scheduler bin-packing, fine-tune cluster autoscaler parameters, and master HPA/VPA configurations, including safe combined usage.
5.  **Data-Driven Machine Selection:** Analyze workload profiles, use dedicated pools strategically, consider all constraints (especially non-obvious ones like volume limits), and automate machine type recommendations based on real data and simulation.
6.  **Accurate Overheads:** Measure and tailor `kube-reserved` based on actual system usage patterns rather than static formulas.

These efforts have yielded substantial cost reductions for operating Gardener itself and, by extension, for all Gardener adopters running managed Kubernetes clusters. We hope sharing our journey provides valuable insights for your own optimization efforts, whether you're just starting or looking to refine your existing strategies.
