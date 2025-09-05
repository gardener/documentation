---
title: "A Deep Dive into Gardener's IPv6 Journey"
linkTitle: "A Deep Dive into Gardener's IPv6 Journey"
newsSubtitle: September 5, 2025
publishdate: 2025-09-05
authors:
- avatar: https://avatars.githubusercontent.com/ScheererJ
  login: ScheererJ
  name: Johannes Scheerer
  email: johannes.scheerer@sap.com
aliases: ["/blog/2025/09/05/ipv6-update"]
---

The internet is built on the Internet Protocol (IP), and for decades, its fourth version, IPv4, has been the bedrock of global connectivity. However, the explosive growth of the internet, a phenomenon that began in the 1990s, made it clear that the 32-bit address space of IPv4 was finite and rapidly depleting. The long-foreseen solution, IPv6, with its vast 128-bit address space, has been around for nearly 30 years, but its adoption has been a slow and steady marathon rather than a sprint.

Today, the need for IPv6 is no longer a distant future concern; it's a present-day reality driven by market forces, technological evolution, and even government mandates. At Gardener, we've been on a multi-year journey to integrate IPv6 deeply and thoughtfully into our managed Kubernetes offerings.

This post, following a recent talk on the subject, will walk you through the "why" of IPv6, the various transition strategies, and a detailed look at how we've implemented robust IPv6 support in Gardener across different cloud providers. A special thanks goes to Axel Siebenborn and Sebastian Stauch, who did the majority of the work, and to the provider extension teams for their invaluable contributions.

### Why We Can't Just "Turn Off IPv6" Anymore

For years, a common IT joke and a genuine troubleshooting step was to "turn off IPv6 to fix the problem." This stemmed from early, rocky implementations. But why was IPv6 created in the first place, and why is its adoption now accelerating?

#### The IPv4 Exhaustion Problem

An IPv4 address is a 32-bit number, allowing for roughly 4.3 billion unique addresses. In the 1990s, it became obvious this wouldn't be enough. To delay the inevitable, the Internet Engineering Task Force (IETF) introduced two key mitigations:

1.  **[Classless Inter-Domain Routing (CIDR)](https://www.rfc-editor.org/rfc/rfc1519):** In the early days, IPv4 addresses were allocated in rigid "classes" (Class A, B, C). If a company needed 300 addresses, they couldn't get a small block; they had to be assigned a Class B block (`/16`), which contains 65,536 addresses, wasting over 99% of them. CIDR replaced this with variable-length subnet masking, allowing network prefixes of any length and enabling far more efficient allocation.
2.  **[Network Address Translation (NAT)](https://www.rfc-editor.org/rfc/rfc1631):** You use this every day. Your home router gets a single public IPv4 address from your ISP, but all your devices (laptops, phones, TVs) get private, internal addresses (like `192.168.x.x`). The router translates traffic, making many devices share one public address.

These mitigations were incredibly successful, extending IPv4's life by decades. However, they were just that: mitigations. The central registry, IANA, allocated its last IPv4 block in 2011 ([details](https://en.wikipedia.org/wiki/IPv4_address_exhaustion)). The regional registries followed, with RIPE (the European registry) handing out its final block in 2019.

Today, there are no "new" IPv4 addresses. A thriving market has emerged where addresses are bought and sold. At the height of the pandemic, a single IPv4 address could cost up to $60. While the price has settled to around $40-$50, hyperscalers are actively buying up large blocks, renting them to customers, and turning a handsome profit. This scarcity and cost create a powerful economic incentive to move to IPv6.

#### Enter IPv6: A Sea of Addresses

IPv6 solves the exhaustion problem with a 128-bit address space—an almost unimaginably large number. Instead of the dotted-decimal format of IPv4, it uses a hexadecimal notation, like `2001:0db8:85a3:0000:0000:8a2e:0370:7334`. A handy feature is that long strings of zeros can be compressed with a double colon (`::`), so the previous example could be shortened to `2001:0db8:85a3::8a2e:0370:7334`.

### Navigating the Transition: Strategies and Concepts

Moving from an IPv4-only world to one that embraces IPv6 isn't a simple switch. It involves a transition period where both protocols coexist.

#### Single-Stack vs. Dual-Stack

*   **Single-Stack:** The network operates with only one IP family, either IPv4-only or IPv6-only.
*   **Dual-Stack:** The network runs both IPv4 and IPv6 simultaneously. Every interface, pod, and service gets an address from each family.

While dual-stack seems like the obvious path, it can introduce complexity—what some call "dual-pain." You have two network stacks to manage, monitor, and troubleshoot. A failure in one might be masked by the other, leading to confusing behavior.

Modern operating systems and browsers use a concept called **["Happy Eyeballs" (RFC 6555)](https://www.rfc-editor.org/rfc/rfc6555)**. When you type a domain name, the system requests both the IPv4 (`A`) and IPv6 (`AAAA`) records. It then tries to connect using both protocols in parallel and simply uses whichever connection establishes first, dropping the other. This creates a seamless user experience and has been a key driver of IPv6 adoption, especially in mobile networks where carriers have aggressively rolled out IPv6.

#### The Path to IPv6-Only

The ultimate goal for many is to return to the simplicity of a single-stack network, but this time with IPv6. However, the internet will have IPv4-only destinations for a long time. How can an IPv6-only client reach them?

The solution is **DNS64 and NAT64**.
1.  An IPv6-only client asks its DNS server to resolve `ipv4-only-service.com`.
2.  The DNS server sees only an IPv4 address for that service.
3.  The DNS64 server *synthesizes* an IPv6 address, typically by embedding the 32-bit IPv4 address within a special IPv6 prefix.
4.  It returns this fake IPv6 address to the client.
5.  The client sends its traffic to this address, which is routed to a NAT64 gateway.
6.  The NAT64 gateway extracts the IPv4 address, translates the packet headers, and forwards the traffic to the actual IPv4 destination.

This clever trick allows connectivity but has one major drawback: it breaks DNSSEC, which relies on cryptographic signatures to validate DNS records. If a server in the middle is modifying the response, the signature becomes invalid.

For the reverse scenario—an IPv4 client reaching an IPv6-only service—the solution often lies in a **translating load balancer** at the edge. The load balancer has both IPv4 and IPv6 addresses but translates all incoming traffic to IPv6 for the backend services. This is a powerful feature offered by cloud providers like AWS, but it can obscure the original client's IP address unless additional protocols like the PROXY protocol are used.

### The Business Driver: Why IPv6 Became a Priority

For Gardener, the major catalyst for a full-fledged IPv6 effort came from an unexpected place: a [2020 US government mandate](https://www.whitehouse.gov/wp-content/uploads/2020/11/M-21-07.pdf). This directive requires federal agencies to complete their transition to **IPv6-only** networks, with a target of 80% completion by 2025.

Crucially, this mandate stipulates that new government contracts must include IPv6 support or a "reliable roadmap" to it. An internal roadmap is often not considered "reliable" enough. You need to have a working implementation, so we started implementing IPv6 support in Gardener.

### Gardener's IPv6 Philosophy and Implementation

When we started this project, we established a few core principles to avoid repeating the past and to build a clean, modern networking foundation.

#### Principle 1: No NAT for IPv6

We decided to do "IPv6 the IPv6 way." This means **no Network Address Translation (NAT) for IPv6**. While IPv6 has a concept of private addresses called [Unique Local Addresses (ULA)](https://en.wikipedia.org/wiki/Unique_local_address), we chose to avoid them. Instead, we use **publicly routable IPv6 addresses** for everything: nodes, pods, and even services.

This might sound alarming from a security perspective, but "publicly routable" does not mean "publicly accessible." We explicitly configure firewall rules (e.g., AWS Security Groups) to block unsolicited inbound traffic, achieving the same security posture as a NAT gateway but in a stateless, more explicit way. This avoids the complexity of stateful NAT gateways, which can be a bottleneck and a single point of failure.

#### Principle 2: Simplified Routing with Prefix Delegation

IPv6 makes routing far simpler. Instead of complex overlays or managing individual routes for each node, we use **prefix delegation**. Each node in a cluster is assigned a large block of IP addresses for its pods (e.g., a `/80` on AWS or a `/96` on GCP). The underlying cloud infrastructure then knows that any traffic destined for an IP in that block should be routed directly to that node. This is efficient, scalable, and leverages the native capabilities of the cloud.

### A Tour of IPv6 Features in Gardener

Gardener now offers a spectrum of IPv6 capabilities, allowing users to adopt it at their own pace.

#### For AWS

1.  **IPv6 Ingress for IPv4 Clusters:** This is the easiest entry point. Your cluster remains entirely IPv4 internally, but you can expose services via a dual-stack AWS Network Load Balancer (NLB). The NLB handles protocol translation, allowing IPv6 clients to connect to your IPv4 services. This is great for simple web services but doesn't support egress (outbound) IPv6 traffic. For more details, see [Using IPv4/IPv6 (dual-stack) Ingress](https://github.com/gardener/gardener-extension-provider-aws/blob/master/docs/usage/dual-stack-ingress.md).

2.  **IPv6-only Clusters:** To truly test if your application is IPv6-ready, you need to remove the IPv4 crutch. An IPv6-only cluster enforces this. To connect to the legacy IPv4 internet, these clusters are configured to use the cloud provider's DNS64/NAT64 service.
    ```yaml
    # Shoot.yaml
    spec:
      networking:
        ipFamilies:
          - IPv6
    ```

3.  **Dual-Stack Clusters:** This is the most flexible option, providing full IPv4 and IPv6 connectivity for both ingress and egress. Pods and services get addresses from both families. You simply add `IPv6` to the `ipFamilies` list. The order determines the primary IP family.
    ```yaml
    # Shoot.yaml
    spec:
      networking:
        ipFamilies:
          - IPv4
          - IPv6
    ```
    You can find comprehensive details in the [Gardener AWS Provider IPv6 Documentation](https://github.com/gardener/gardener-extension-provider-aws/blob/master/docs/usage/ipv6.md).

#### For GCP

The implementation on GCP is slightly different due to the platform's specific capabilities. GCP does not offer a translating load balancer or a managed NAT64 gateway, so our focus has been on providing a first-class dual-stack experience.

Key differences include:
*   **Subnet Configuration:** IPv6 is enabled on a per-subnet basis. Gardener creates a dedicated subnet for nodes and a virtual one just to reserve an IPv6 range for services.
*   **Routing:** Instead of creating explicit routes in the VPC route table (as was done for IPv4 native routing), the dual-stack implementation uses GCP's Alias IP Ranges feature, assigning pod CIDRs directly to the node's network interface.
*   **Ingress:** The [`ingress-gce`](https://github.com/kubernetes/ingress-gce) controller is used to provision dual-stack load balancers.

Creating a dual-stack cluster is as simple as on AWS:
```yaml
# Shoot.yaml
spec:
  networking:
    ipFamilies:
    - IPv4
    - IPv6
```
For more on the GCP implementation, refer to the [Gardener GCP Provider IPv6 Documentation](https://github.com/gardener/gardener-extension-provider-gcp/blob/master/docs/usage/ipv6.md).

#### Migrating Existing Clusters

Perhaps the most critical feature for our users is the ability to migrate existing, production IPv4-only clusters to dual-stack without downtime. We designed a careful, multi-stage process to make this possible.

1.  **Precondition:** The cluster must be using native routing (i.e., the pod overlay network must be disabled). This is a prerequisite for dual-stack networking in Gardener.
2.  **Trigger Migration:** The user simply updates the `Shoot` spec, changing `ipFamilies` from `[IPv4]` to `[IPv4, IPv6]`.
3.  **Infrastructure Reconciliation:** Gardener automatically reconfigures the underlying cloud infrastructure (VPC, subnets, routing) to support IPv6.
4.  **Staged Node Rollout:** This is the key to a controlled migration. The nodes must be replaced to acquire IPv6 addresses and pod prefixes. This is **not** triggered automatically. Cluster owners can roll out nodes on their own schedule, one by one or all at once during a maintenance window. A `DualStackNodesMigrationReady` condition in the shoot status tracks this progress.
5.  **Finalization:** Once all nodes are migrated, Gardener completes the configuration of the control plane (like `kube-apiserver`) and the CNI. Following this, CoreDNS is reconfigured, and the `kube-dns` service is switched to dual-stack.

After migration, new pods will get both IPv4 and IPv6 addresses. Existing pods and services will need to be recreated to become fully dual-stack.

This process is detailed in our [Dual-Stack Network Migration documentation](https://github.com/gardener/gardener/blob/master/docs/usage/networking/dual-stack-networking-migration.md) and further explained in our blog post on [Enabling Seamless IPv4 to Dual-Stack Migration for Kubernetes Clusters on GCP](https://gardener.cloud/blog/2025/06/06-18-enabling-seamless-ipv4-to-dual-stack-migration-for-kubernetes-clusters-on-gcp/).

### Monitoring in a Dual-Stack World

Troubleshooting can be more complex in a dual-stack environment. To help with this, we've enhanced Gardener's [`network-problem-detector`](https://github.com/gardener/network-problem-detector). It now runs its connectivity checks for both protocols independently. In the results, you will see distinct checks for IPv4 and IPv6 (e.g., `node-to-node-ipv4` and `node-to-node-ipv6`), making it easy to pinpoint if a problem is specific to one protocol family.

The journey to IPv6 is well underway. To help you navigate it, here is a quick reference guide to the current state of IPv6 support in Gardener across major cloud providers.

### IPv6 Support in Gardener: A Quick Reference

This summary outlines what is supported, where, and what you need to know as a cluster owner.

#### Amazon Web Services (AWS)

*   **Supported Modes:**
    *   `Dual-Stack` (IPv4 + IPv6)
    *   `IPv6-Only`

*   **Key Considerations:**
    *   **Architecture:** IPv6 is configured at both the VPC and subnet level. Gardener leverages Amazon-provided IPv6 CIDR blocks.
    *   **IPv6-Only:** This mode is fully supported because AWS provides the necessary components for legacy compatibility: a protocol-translating Network Load Balancer (for IPv4 clients to reach IPv6 services) and a managed NAT64/DNS64 gateway (for IPv6-only pods to reach IPv4 destinations).
    *   **Instance Types:** Dual-stack and IPv6-only clusters require [Nitro-based instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-types.html#instance-hypervisor-type) to support assigning IPv6 prefixes to nodes.
    *   **Migration:** A mature, staged migration path from IPv4-only to dual-stack is available.

#### Google Cloud Platform (GCP)

*   **Supported Modes:**
    *   `Dual-Stack` (IPv4 + IPv6)

*   **Limitations & Considerations:**
    *   **No IPv6-Only:** Gardener does not offer an IPv6-only mode on GCP. This is a platform limitation, as GCP currently lacks managed, built-in services for protocol translation like a NAT64 gateway or translating load balancers. Without them, an IPv6-only cluster would be isolated from the IPv4 internet.
    *   **Architecture:** IPv6 is configured at the subnet level, not the VPC level. Gardener automatically handles the creation of necessary subnets for nodes and services.
    *   **Ingress:** Dual-stack load balancers are provisioned using the [`ingress-gce`](https://github.com/kubernetes/ingress-gce) controller, which is a mandatory component for dual-stack clusters on GCP.
    *   **Migration:** A staged migration from IPv4-only to dual-stack is also supported, following a similar process to AWS.

#### Other Cloud Providers (Azure, Alicloud, OpenStack, etc.)

*   **Supported Modes:**
    *   IPv6 support for other cloud providers is not yet implemented.

As the digital landscape continues its inexorable shift, Gardener is committed to providing a robust, flexible, and future-proof foundation for your Kubernetes workloads, ensuring you are ready for the next generation of internet networking.
