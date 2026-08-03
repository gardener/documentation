---
github_repo: 'https://github.com/gardener/gardener-extension-provider-aws'
github_subdir: docs/usage
params:
  github_branch: master
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/infrastructure-extensions/gardener-extension-provider-aws/bring-your-own-vpc.md
  to: bring-your-own-vpc.md
persona: Users
title: Bring Your Own Vpc
prev: false
next: false
managed: true
---

# AWS Infrastructure Setup for Bring-Your-Own VPC

There are multiple ways to create the required AWS infrastructure for a bring-your-own VPC setup.
The examples below show one possible approach and are meant as a basic reference.
Your actual setup may differ depending on your networking requirements and organizational policies.

## Minimal Example (VPC only)

If you only want to bring your own VPC and let Gardener create all other infrastructure (subnets, route tables, NAT gateway, security groups, etc.), the minimum required setup is:

1. Create a VPC with an IPv4 CIDR block (and an IPv6 CIDR block for IPv6-only or dual-stack clusters).
1. Go to **VPC → Edit DNS settings**: enable **DNS resolution** and **DNS hostnames**.
1. Create an Internet Gateway and attach it to your VPC.

> [!NOTE]
> Gardener will not create an Internet Gateway for an existing VPC, so it must be created manually even in the minimal case.

Then reference the VPC by ID in your shoot's `infrastructureConfig`:

```yaml
networks:
  vpc:
    id: vpc-xxxxxxxx
  zones:
    - name: ...
      workers: ...
      public: ...
      internal: ...
```

## Full Custom Infrastructure Examples

The following examples cover the case where you want to bring your own subnets, route tables, security groups, and other networking resources in addition to the VPC. Use these as a starting point if your setup requires full control over the AWS networking infrastructure.

### IPv4 Cluster

1. Create a new VPC with an IPv4 CIDR block.
1. Go to **VPC → Edit DNS settings**: enable **DNS resolution** and **DNS hostnames**.
1. Create a worker subnet in this VPC and choose the correct availability zone. Optionally create public and internal subnets.
1. Optionally create a security group with:
   - **Inbound**: All traffic from itself (select "Custom" and paste the security group ID — you may need to save first and edit again to self-reference).
   - **Outbound**: All traffic to `0.0.0.0/0`.
1. Create an Internet Gateway and attach it to your VPC.
1. Create a NAT Gateway in a public subnet.
1. Create an internal route table for the workers (and optional internal subnet) with:
   - Route: `0.0.0.0/0` → your NAT Gateway.
   - Add subnet associations for your worker subnet (and optionally internal subnets).
1. Optionally create a public route table (for public load balancer subnets) with:
   - Route: `0.0.0.0/0` → your Internet Gateway.
   - Add subnet associations for your public subnets.

Reference your existing resources in the shoot's `infrastructureConfig`:

```yaml
networks:
  vpc:
    id: vpc-xxxxxxxx
  nodesSecurityGroupID: sg-xxxxxxxxxxxxxxxx   # optional
  zones:
    - name: eu-central-1a
      workersSubnetID: subnet-xxxxxxxxxxxxxxxx
      publicSubnetID: subnet-yyyyyyyyyyyyyyyy  # optional
      internalSubnetID: subnet-zzzzzzzzzzzzzz  # optional
```

### IPv6-only Cluster

1. Create a VPC with an IPv6 CIDR block and enable **DNS resolution** and **DNS hostnames**.
1. Create an Egress-Only Internet Gateway for the VPC.
1. Create worker subnets with IPv6 CIDR blocks, **DNS64** and **Enable auto-assign IPv6 address** enabled.
   Optionally create subnets with IPv6 CIDR blocks for internal and public load balancers. These subnets still need some IPv4 addresses since AWS Load Balancers require IPv4.
1. Create a NAT Gateway and attach it to your VPC.
1. Create a private route table for workers (and optionally for internal load balancers) with:
   - Route: `::/0` → the Egress-Only Internet Gateway.
   - Route: `64:ff9b::/96` → the NAT Gateway (for NAT64).
   - Add subnet associations for your worker subnet (and optionally internal subnets).
1. Optionally create an Internet Gateway and attach it to the VPC (required if you want public load balancers).
1. Optionally create a public route table for public load balancers with:
   - Route: `::/0` → the Internet Gateway.
   - Route: `0.0.0.0/0` → the Internet Gateway.
   - Add subnet associations for your public subnets.
1. Optionally create a security group with:
   - **Inbound**: All traffic from itself (select "Custom" and paste the security group ID — you may need to save first and edit again to self-reference).
   - **Outbound**: All traffic to `::/0`.

Reference your existing resources in the shoot's `infrastructureConfig` and set `ipFamilies` to `IPv6`:

```yaml
networking:
  ipFamilies:
    - IPv6
provider:
  type: aws
  infrastructureConfig:
    apiVersion: aws.provider.extensions.gardener.cloud/v1alpha1
    kind: InfrastructureConfig
    networks:
      vpc:
        id: vpc-xxxxxxxx
      nodesSecurityGroupID: sg-xxxxxxxxxxxxxxxx   # optional
      zones:
        - name: eu-central-1a
          workersSubnetID: subnet-xxxxxxxxxxxxxxxx
          publicSubnetID: subnet-yyyyyyyyyyyyyyyy  # optional
          internalSubnetID: subnet-zzzzzzzzzzzzzz  # optional
```

### Dual-Stack Cluster

Same as [IPv6-only](#ipv6-only-cluster) with the following differences:

1. Worker subnets should not be IPv6-native — nodes receive both IPv4 and IPv6 addresses.
1. No DNS64 is needed for the worker subnet since nodes have IPv4 and can reach IPv4 endpoints directly.
1. The worker route table needs an additional route: `0.0.0.0/0` → NAT Gateway (for IPv4 egress).
1. If a security group is created, it needs an additional outbound rule: All traffic to `0.0.0.0/0`.

The shoot config is the same as the IPv6-only example above, but with `ipFamilies` set to both `IPv4` and `IPv6`:

```yaml
networking:
  ipFamilies:
    - IPv4
    - IPv6
provider:
  type: aws
  infrastructureConfig:
    apiVersion: aws.provider.extensions.gardener.cloud/v1alpha1
    kind: InfrastructureConfig
    networks:
      vpc:
        id: vpc-xxxxxxxx
      nodesSecurityGroupID: sg-xxxxxxxxxxxxxxxx   # optional
      zones:
        - name: eu-central-1a
          workersSubnetID: subnet-xxxxxxxxxxxxxxxx
          publicSubnetID: subnet-yyyyyyyyyyyyyyyy  # optional
          internalSubnetID: subnet-zzzzzzzzzzzzzz  # optional
```

## Overlay Networking and Route Tables

When using BYO subnets, the overlay networking setting and IP family together determine what Gardener does with your worker route tables. The overlay setting defaults to disabled via a mutating webhook when using calico or cilium as the network plugin.

### IPv4-only cluster, overlay disabled (default)

Gardener tags your worker route tables with the cluster tag (`kubernetes.io/cluster/<technical-shoot-name>=shared`) so the [aws-custom-route-controller](https://github.com/gardener/aws-custom-route-controller) can find them. The controller then programs one route per worker node (`<node-pod-cidr> → <node-ENI>`).

- **Route entries are written into your tables.** These entries are managed by the controller — added when nodes join, removed when nodes leave. Do not manually manage these entries.
- **The 500-entry default limit applies to your existing tables.** Each worker node consumes one route entry. Account for pre-existing entries when sizing your cluster. The default AWS quota is 500 routes per route table (hard limit: 1000).
- **Pod CIDRs must not conflict with existing routes.** Ensure your shoot's pod CIDR does not overlap with routes already present in your worker route tables.
- **Avoid shared route tables.** If your worker subnets share a route table with other subnets outside the cluster, pod CIDR routes will be written into that shared table and may affect traffic in the broader VPC.

> [!WARNING]
> When a shoot is deleted, Gardener removes the cluster tag from your BYO route tables but does **not** delete the pod CIDR routes that were written into them. Any routes whose target ENI has since been terminated will become blackhole entries in your route table. You must clean these up manually after shoot deletion by removing all routes with destinations within the shoot's pod CIDR.

### IPv4-only cluster, overlay enabled

The custom route controller is not deployed. Pod-to-pod routing is handled entirely by the CNI via encapsulation (e.g. VXLAN). Gardener skips tagging the worker route tables, so they remain completely untouched.

### Dual-stack cluster (IPv4 + IPv6)

Overlay must be disabled (enforced by validation). Gardener tags the worker route tables with the cluster tag so the custom route controller can program IPv4 pod CIDR routes, the same as the IPv4-only overlay-disabled case above. The IPv6 pod addresses are routed natively via ENI prefix delegation and do not require route table entries.

### IPv6-only cluster

Overlay must be disabled (enforced by validation). The custom route controller is not deployed — IPv6 pod routing is handled natively by the VPC via ENI prefix delegation and no pod CIDR routes are written into your route tables. Gardener does not tag the worker route tables, so they remain completely untouched.

## LB Subnet Discovery via Tags

Instead of specifying `publicSubnetID` and `internalSubnetID` explicitly, you can let Gardener discover your load balancer subnets by tagging them. During infrastructure reconciliation, Gardener searches the VPC for subnets carrying the appropriate role tags and the cluster tag, then stores the discovered subnet IDs in `infraStatus` and uses their CIDRs to configure security group rules.

The required tags are:

| Tag key | Value | Subnet |
| --- | --- | --- |
| `kubernetes.io/cluster/<technical-shoot-name>` | `shared` | both public and internal |
| `kubernetes.io/role/elb` | `1` | public LB subnet |
| `kubernetes.io/role/internal-elb` | `1` | internal LB subnet |

The technical shoot name follows the pattern `shoot--<project>--<shoot-name>`, which is also the seed namespace the shoot runs in (e.g. `shoot--remote--my-shoot`).

> [!WARNING]
> **The AWS console silently hides leading and trailing whitespace in tag keys and values.** A tag key entered as `  kubernetes.io/role/elb ` (with a leading space) looks identical to `kubernetes.io/role/elb` in the console, but the underlying API stores the space and the discovery filter will not match it.

## Load Balancer Subnet Selection by CCM and ALB Controller

Even after Gardener has stored subnet IDs in `infraStatus`, the two in-cluster controllers that actually provision load balancers — the **Cloud Controller Manager (CCM)** and the **AWS Load Balancer Controller (ALB controller)** — perform their own independent subnet discovery at the time a Service or Ingress is created.
This means that subnets you have **not** configured in the shoot spec can still be selected.
The most dangerous configuration is a partial one: if you configure only a public or only an internal load balancer subnet, the other type will be discovered from the VPC without any explicit guidance, and an arbitrary subnet may be selected without any visible indication.

### Cloud Controller Manager (CCM)

The CCM provisions Classic ELBs and NLBs for `Service` objects of type `LoadBalancer`.

**Internal vs. public load balancers**

The load balancer type is controlled by the Service annotation:

```
service.beta.kubernetes.io/aws-load-balancer-internal: "true"   # internal (private)
# annotation absent or set to "false"                           # public (internet-facing)
```

**Subnet discovery**

If the Service carries the annotation `service.beta.kubernetes.io/aws-load-balancer-subnets`, the CCM uses exactly those subnets (by ID or name tag). Otherwise it performs auto-discovery:

1. It queries **all subnets in the VPC** and filters by the cluster tag `kubernetes.io/cluster/<cluster-name>` (subnets without any cluster tag are also included as fallback candidates).
1. For each Availability Zone it selects **one subnet** using the following priority:
   - Subnet tagged `kubernetes.io/role/elb` (for public LBs) or `kubernetes.io/role/internal-elb` (for internal LBs).
   - If tied, prefer the subnet with the cluster tag.
   - If still tied, choose the subnet with the lexicographically smaller ID.
1. For **public** load balancers the CCM additionally filters out private subnets — it inspects the subnet's route table and skips any subnet that has no route to an Internet Gateway.

> [!WARNING]
> If you only configure an `internalSubnetID` in the shoot spec (or only tag an internal-ELB subnet), the CCM still performs VPC-wide discovery for **public** load balancers. It will select any subnet in the VPC that has a route to an Internet Gateway and carries the `kubernetes.io/role/elb` tag — or, if no role-tagged subnet exists, any public subnet at all. This can cause the CCM to use subnets that you never referenced in the shoot spec.

**Avoiding unexpected subnet selection**

- Tag every subnet you want the CCM to use for public load balancers with `kubernetes.io/role/elb` (value `1`) and the cluster tag `kubernetes.io/cluster/<cluster-name>` (value `shared`). If you provide the subnet ID via `publicSubnetID` in the shoot spec, Gardener applies these tags automatically during infrastructure reconciliation.
- Tag every subnet you want the CCM to use for internal load balancers with `kubernetes.io/role/internal-elb` and the cluster tag. Likewise, providing the subnet ID via `internalSubnetID` causes Gardener to apply these tags automatically.
- Removing both tags from a subnet is **not** sufficient to exclude it: the CCM treats subnets with no `kubernetes.io/cluster/*` prefix tag at all as valid candidates, so an entirely untagged subnet can still be selected. The role tags and cluster tag only affect the tie-breaking priority within an AZ, not whether the subnet is considered in the first place.
- If neither `publicSubnetID` nor `internalSubnetID` is configured in any zone, Gardener disables the CCM service controller entirely (`--controllers=*,-service`). In this case `Service` objects of type `LoadBalancer` will remain in `<pending>` state with no events or diagnostics.

### AWS Load Balancer Controller (ALB Controller)

The ALB controller provisions ALBs and NLBs for `Ingress` objects and for Services annotated with `service.beta.kubernetes.io/aws-load-balancer-type: external`.

**Explicit vs. auto-discovery**

Like the CCM, the ALB controller first checks for an explicit subnet specification:
- Annotation `alb.ingress.kubernetes.io/subnets` (Ingress) or `service.beta.kubernetes.io/aws-load-balancer-subnets` (Service).
- `IngressClassParams.spec.loadBalancerSubnets` or `IngressClassParams.spec.subnets.tags`.

If none of these are present, it falls back to **auto-discovery**:

1. It queries all subnets in the VPC and looks for those tagged `kubernetes.io/role/elb` (internet-facing) or `kubernetes.io/role/internal-elb` (internal).
1. If **no** role-tagged subnets exist anywhere in the VPC, it falls back to selecting subnets by their actual reachability (public or private) based on route table analysis.
1. From the role-tagged (or reachability-discovered) candidates, subnets tagged for a **different** cluster (`kubernetes.io/cluster/<other-name>`) are excluded.
1. From the eligible candidates it keeps only subnets with at least 8 available IP addresses.
1. Finally, it selects **one subnet per Availability Zone**, preferring the subnet with the current cluster tag; ties are broken lexicographically by subnet ID.

> [!WARNING]
> The ALB controller performs VPC-wide subnet discovery regardless of what is configured in the shoot spec. If role tags exist on subnets you did not intend to expose, the ALB controller will use them. If no role tags exist at all, the controller may fall back to selecting subnets purely by internet reachability, which can produce surprising results.

**Avoiding unexpected subnet selection**

- Tag subnets intended for internet-facing ALBs with `kubernetes.io/role/elb` (value `1`) and `kubernetes.io/cluster/<cluster-name>` (value `shared` or `owned`).
- Tag subnets intended for internal ALBs with `kubernetes.io/role/internal-elb` and the cluster tag.
- Do **not** tag subnets with role tags unless you want them selected for load balancers.
- The ALB controller is **disabled by default**. It must be explicitly enabled by setting `loadBalancerController.enabled: true` in the shoot's `providerConfig`. If it is not enabled, none of the subnet discovery described above applies.
