---
title: "Gardener: Powering Enterprise Kubernetes at Scale and Europe's Sovereign Cloud Future"
linkTitle: "Gardener: Powering Enterprise Kubernetes at Scale and Europe's Sovereign Cloud Future"
newsSubtitle: May 12, 2025
publishdate: 2025-05-12
authors:
- name: Vedran Lerenc
  email: vedran.lerenc@sap.com
  avatar: https://avatars.githubusercontent.com/vlerenc
aliases: ["/blog/2025/05/12/01"]
---

The Kubernetes ecosystem is dynamic, offering a wealth of tools to manage the complexities of modern cloud-native applications. For enterprises seeking to provision and manage Kubernetes clusters efficiently, securely, and at scale, a robust and comprehensive solution is paramount. Gardener, born from years of managing tens of thousands of clusters efficiently across diverse platforms and in demanding environments, stands out as a fully open-source choice for delivering fully managed Kubernetes Clusters as a Service. It already empowers organizations like SAP, STACKIT, T-Systems, and others (see [adopters](https://gardener.cloud/adopter)) and has become a core technology for [NeoNephos](https://neonephos.org/projects), a project aimed at advancing digital autonomy in Europe (see [KubeCon London 2025 Keynote](https://www.youtube.com/watch?v=85MDID9Ju04&t=621s) and [press announcement](https://neonephos.org/2025/03/31/the-linux-foundation-announces-the-launch-of-neonephos-to-advance-digital-autonomy-in-europe)).

### The Gardener Approach: An Architecture Forged by Experience

At the heart of Gardener's architecture is the concept of "Kubeception" (see [readme](https://github.com/gardener/gardener?tab=readme-ov-file#gardener) and [architecture](https://github.com/gardener/gardener/blob/master/docs/concepts/architecture.md)). This approach involves using Kubernetes to manage Kubernetes. Gardener runs on a Kubernetes cluster (called a **runtime cluster**), facilitates access through a self-managed node-less Kubernetes cluster (the **garden cluster**), manages Kubernetes control planes as pods within other self-managed Kubernetes clusters that provide high scalability (called **seed clusters**), and ultimately provisions end-user Kubernetes clusters (called **shoot clusters**).

This multi-layered architecture isn't complexity for its own sake. Gardener's design and extensive feature set are the product of over eight years of continuous development and refinement, directly shaped by the high-scale, security-sensitive, and enterprise-grade requirements of its users. Experience has shown that such a sophisticated structure is key to addressing significant challenges in scalability, security, and operational manageability. For instance:

*   **Scalability:** Gardener achieves considerable scalability through its use of **seed clusters**, which it also manages. This allows for the distribution of control planes, preventing bottlenecks. The design even envisions leveraging Gardener to host its own management components (as an [**autonomous cluster**](https://github.com/gardener/gardener/blob/master/docs/proposals/28-autonomous-shoot-clusters.md)), showcasing its resilience without risking circular dependencies.
*   **Security:** A fundamental principle in Gardener is the strict isolation of control planes from data planes. This extends to Gardener itself, which runs in a dedicated management cluster but exposes its API to end-users through a workerless virtual cluster. This workerless cluster acts as an isolated access point, presenting no compute surface for potentially malicious pods, thereby significantly enhancing security.
*   **API Power & User Experience:** Gardener utilizes the full capabilities of the Kubernetes API server. This enables advanced functionalities and sophisticated API change management. Crucially, for the end-user, interaction remains 100% Kubernetes-native. Users employ standard custom resources to instruct Gardener, meaning any tool, library, or language binding that supports Kubernetes CRDs inherently supports Gardener.

### Delivering Fully Managed Kubernetes Clusters as a Service

Gardener provides a comprehensive "fully managed Kubernetes Clusters as a Service" offering. This means it handles much more than just spinning up a cluster; it manages the entire lifecycle and operational aspects. Here’s a glimpse into its capabilities:

1.  **Full Cluster Lifecycle Management:**
    *   **Infrastructure Provisioning:** Gardener takes on the provisioning and management of underlying cloud infrastructure, including VPCs, subnets, NAT gateways, security groups, IAM roles, and virtual machines across a wide range of providers like AWS, Azure, GCP, OpenStack, and more.
    *   **Worker Node Management:** It meticulously manages worker pools, covering OS images, machine types, autoscaling configurations (min/max/surge), update strategies, volume management, CRI configuration, and provider-specific settings.

2.  **Enterprise Platform Governance:**
    Gardener is designed with the comprehensive needs of enterprise platform operators in mind. Managing a fleet of clusters for an organization requires more than just provisioning; it demands clear governance over available resources, versions, and their lifecycle. Gardener addresses this through its declarative API, allowing platform administrators to define and enforce policies such as which Kubernetes versions are "supported," "preview," or "deprecated," along with their expiration dates. Similarly, it allows control over available machine images, their versions, and lifecycle status. This level of granular control and lifecycle management for the underlying components of a Kubernetes service is crucial for enterprise adoption and stable operations. This is a key consideration often left as an additional implementation burden for platform teams using other cluster provisioning tools, where such governance features must be built on top. Gardener, by contrast, integrates these concerns directly into its API and operational model, simplifying the task for platform operators.

3.  **Advanced Networking:**
    *   **CNI Plugin Management:** Gardener manages the deployment and configuration of CNI plugins such as Calico or Cilium.
    *   **Dual-Stack Networking:** It offers comprehensive support for IPv4, IPv6, and dual-stack configurations for pods, services, and nodes.
    *   **NodeLocal DNS Cache:** To enhance DNS performance and reliability, Gardener can deploy and manage NodeLocal DNS.

4.  **Comprehensive Autoscaling:**
    *   **Cluster Autoscaler:** Gardener manages the Cluster Autoscaler for worker nodes, enabling dynamic scaling based on pod scheduling demands.
    *   **Horizontal and Vertical Pod Autoscaler (VPA):** It manages HPA/VPA for workloads and applies it to control plane components, optimizing resource utilization (see [blog](https://gardener.cloud/blog/2025/04-17-leaner-clusters-lower-bills)).

5.  **Operational Excellence & Maintenance:**
    *   **Automated Kubernetes Upgrades:** Gardener handles automated Kubernetes version upgrades for both control plane and worker nodes, with configurable maintenance windows.
    *   **Automated OS Image Updates:** It manages automated machine image updates for worker nodes.
    *   **Cluster Hibernation:** To optimize costs, Gardener supports hibernating clusters, scaling down components during inactivity.
    *   **Scheduled Maintenance:** It allows defining specific maintenance windows for predictability.
    *   **Robust Credentials Rotation:** Gardener features automated mechanisms for rotating all credentials. It deploys fine-grained individual CAs, certificates, credentials, and secrets for each and every component, whether Kubernetes-related like service account keys or ETCD encryption keys or Gardener-related like opt-in SSH keys or observability credentials. The Gardener installation, the seeds, and all shoots have their own distinct sets of credentials — amounting to more than 150 per cluster. All these credentials are rotated automatically where possible. This granular approach effectively prevents lateral movement, significantly bolstering the security posture.

6.  **Enhanced Security & Access Control:**
    *   **OIDC Integration:** Gardener supports OIDC configuration for the `kube-apiserver` for secure user authentication.
    *   **Customizable Audit Policies:** It allows specifying custom audit policies for detailed logging.
    *   **Managed Service Account Issuers:** Gardener can manage service account issuers, enhancing workload identity security.
    *   **SSH Access Control:** It provides mechanisms to manage SSH access to worker nodes securely if opted in (Gardener itself doesn't require SSH access to worker nodes).
    *   **Workload Identity:** Gardener supports workload identity features, allowing pods to securely authenticate to cloud provider services.

7.  **Powerful Extensibility:**
    *   **Extension Framework and Ecosystem:** Gardener features a robust extension mechanism for deep integration of cloud providers, operating systems, container runtimes, or services like DNS management, certificate management, registry caches, network filtering, image signature verification, and more.
    *   **Catered to Platform Builders:** This extensibility also allows platform builders to deploy custom extensions into the self-managed seed cluster infrastructure that hosts shoot cluster control planes. This offers robust isolation for these custom components from the user's shoot cluster worker nodes, enhancing both security and operational stability.

8.  **Integrated DNS and Certificate Management:**
    *   **External DNS Management:** Gardener can manage DNS records for the cluster's API server and services via its `shoot-dns-service` extension.
    *   **Automated Certificate Management:** Through extensions like `shoot-cert-service`, it manages TLS certificates, including ACME integration. Gardener also provides its own robust DNS (`dns-management`) and certificate (`cert-management`) solutions designed for enterprise scale. These custom solutions were developed because, at the scale Gardener operates, many deep optimizations were necessary, e.g., to avoid being rate-limited by upstream providers.

### A Kubernetes-Native Foundation for Sovereign Cloud

The modern IT landscape is rapidly evolving away from primitive virtual machines towards distributed systems. Kubernetes has emerged as the de facto standard for deploying and managing these modern, cloud-native applications and services at scale. Gardener is squarely positioned at the forefront of this shift, offering a Kubernetes-native approach to managing Kubernetes clusters themselves. It possesses a mature, declarative, Kubernetes-native API for full cluster lifecycle management. Unlike services that might expose proprietary APIs, Gardener’s approach is inherently Kubernetes-native and multi-cloud. This unified API is comprehensive, offering a consistent way to manage diverse cluster landscapes.

Its nature as a fully open-source project is particularly relevant for initiatives like NeoNephos, which aim to build sovereign cloud solutions. All core features, stable releases, and essential operational components are available to the community. This inherent cloud-native, Kubernetes-centric design, coupled with its open-source nature and ability to run on diverse infrastructures (including on-premise and local cloud providers), provides the transparency, control, and technological independence crucial for digital sovereignty. Gardener delivers full sovereign control *today*, enabling organizations to run all modern applications and services at scale with complete authority over their infrastructure and data. This is a significant reason why many cloud providers and enterprises that champion sovereignty are choosing Gardener as their foundation and actively contributing to its ecosystem.

### Operational Depth Reflecting Real-World Scale

Gardener's operational maturity is a direct reflection of its long evolution, shaped by the demands of enterprise users and real-world, large-scale deployments. This maturity translates into statistical evidence and track records of uptime for end-users and their critical services. For instance, Gardener includes fully automated, incremental etcd backups with a recovery point objective (RPO) of five minutes and supports autonomous, hands-off restoration workflows via `etcd-druid`. Features like Vertical Pod Autoscalers (VPAs), PodDisruptionBudgets (PDBs), NetworkPolicies, PriorityClasses, and sophisticated pod placement strategies are integral to Gardener's offering, ensuring high availability and fault tolerance. Gardener's automation deals with many of the usual exceptions and does not require human DevOps intervention for most operational tasks. This depth of experience and automation ultimately translates into first-class Service Level Agreements (SLAs) that businesses can trust and rely on. As a testament to this, SAP entrusts Gardener with its Systems of Record. This level of operational excellence enables Gardener to meet the expectations of today’s most demanding Kubernetes use cases.

### Conclusion: A Solid Foundation for Your Kubernetes Strategy

For enterprises and organizations seeking a comprehensive, truly open-source solution for managing the full lifecycle of Kubernetes clusters at scale, Gardener offers a compelling proposition. Its mature architecture, rich feature set, operational robustness, built-in enterprise governance capabilities, and commitment to the open-source community provide a solid foundation for running demanding Kubernetes workloads with confidence. This makes it a suitable technical underpinning for ambitious projects like NeoNephos, contributing to a future of greater digital autonomy.

We invite you to explore [Gardener](https://gardener.cloud/) and discover how it can empower your enterprise-grade and -scale Kubernetes journey.
