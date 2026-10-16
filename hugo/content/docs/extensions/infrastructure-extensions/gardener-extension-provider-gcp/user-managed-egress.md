---
github_repo: 'https://github.com/gardener/gardener-extension-provider-gcp'
github_subdir: docs/usage
params:
  github_branch: master
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/infrastructure-extensions/gardener-extension-provider-gcp/user-managed-egress.md
  to: user-managed-egress.md
persona: Users
title: User Managed Egress
prev: false
next: false
---
<!-- BANNER:MANAGED -->
<!--
   █▀▀ ▀█▀ █▀█ █▀█
   ▀▀█  █  █ █ █▀▀
   ▀▀▀  ▀  ▀▀▀ ▀

   ┌────────────────────────────────────────────────┐
   │  MANAGED FILE — aggregated from upstream       │
   │                                                │
   │  Editing here is pointless: The nightly        │
   │  aggregation run overwrites this file.         │
   │                                                │
   │  Open a PR against the source instead: ─────┐  │
   │                          ┌──┐    ┌──────────┘  │
   │                          └──│────┘             │
   │           ┌─────────────────┘                  │
   └───────────│────────────────────────────────────┘
               ▼               
   https://github.com/gardener/gardener-extension-provider-gcp/blob/master/docs/usage/user-managed-egress.md
-->


# User-Managed Egress (BYO Subnet Mode)

By default the GCP provider extension creates and manages all network infrastructure for a shoot cluster: VPC, worker subnet, Cloud Router, and Cloud NAT gateway.
**BYO subnet mode** lets you opt out of this management and bring your own pre-provisioned VPC and subnets.
Gardener will use — but never create, modify, or delete — your VPC and subnet(s).
You own the egress topology entirely.

Gardener still manages the following on your behalf in BYO mode:

- **CCM-authored custom routes** — the in-cluster Cloud Controller Manager creates `shoot--*` custom routes per node (single-stack IPv4 only) and removes them when the corresponding node is deleted. At shoot deletion Gardener sweeps any residual `shoot--*` routes belonging to this cluster.
- **CCM-authored firewall rules** — the CCM creates `k8s-fw-*` firewall rules per `Service type=LoadBalancer` and removes them when the Service is deleted. At shoot deletion Gardener sweeps any residual `k8s-fw-*` rules tag-scoped to this cluster as a safety net (see [Deletion / teardown](#deletion--teardown)).
- **Bastion firewall rules** — the bastion controller creates three tag-scoped firewall rules when a bastion is requested and removes them when the bastion is deleted.

## When to use this

- You need a specific egress design (user-owned Cloud NAT, NVA/VPN route, private cluster with no default route).
- Multiple shoot clusters must share a single VPC and subnet.
- Your organization's security policy requires audited, infrastructure-as-code-managed network resources.
- You want to reuse an existing subnet that was provisioned outside of Gardener.

## Sharing a VPC across multiple clusters

> [!IMPORTANT]
> When multiple shoots share a single BYO VPC **with overlay networking disabled**, you must give each shoot **non-overlapping pod CIDRs** (and, in practice, non-overlapping node and service CIDRs too).

This matters because in routes-based (non-overlay) networking the CCM programs one VPC-wide `shoot--*` route per node, mapping a pod CIDR to that node instance. GCP has no per-cluster route table — all routes live in the VPC's single routing table. If two clusters in the same VPC use overlapping pod CIDRs, their routes collide and pod traffic from one cluster can be misrouted to a node in the other.

Note that **all dual-stack (IPv4 + IPv6) shoots run with overlay disabled**, because GCP IPv6 forces overlay off — so this constraint always applies to dual-stack clusters sharing a VPC. Overlay-enabled single-stack shoots encapsulate pod traffic and do not program pod-CIDR routes into the VPC, so they are not affected.

Gardener **cannot** detect this conflict for you: each shoot is validated only against its own declared CIDRs, and the extension has no cross-shoot awareness. Guaranteeing non-overlapping CIDRs across shoots that share a VPC is the responsibility of whoever allocates shoot networking (your IPAM / operator).

## How it works

Setting `networks.subnetWorkers` in `InfrastructureConfig` activates BYO subnet mode.
Gardener detects this and switches the infrastructure reconciler to a read-only path for your network resources:

- The worker subnet, Cloud Router, Cloud NAT, and the four static firewall rules are **not created**.
- At reconciliation time Gardener verifies the referenced VPC and subnet(s) exist; it does not mutate them.
- At shoot deletion Gardener **does not delete** the BYO VPC or subnets.

The in-cluster Cloud Controller Manager still writes firewall rules and custom routes into your VPC at runtime — see [What Gardener writes into your VPC at runtime](#what-gardener-writes-into-your-vpc-at-runtime).

## Configuration

### Single-stack IPv4

```yaml
apiVersion: gcp.provider.extensions.gardener.cloud/v1alpha1
kind: InfrastructureConfig
networks:
  vpc:
    name: my-vpc          # must exist before shoot creation
  subnetWorkers:
    name: my-workers      # must exist before shoot creation
```

Corresponding shoot spec:

```yaml
spec:
  networking:
    ipFamilies: [IPv4]
    nodes:    10.100.0.0/16
    pods:     10.96.0.0/11
    services: 10.200.0.0/20
```

The worker subnet's primary IPv4 range must **contain** `shoot.spec.networking.nodes` and must not overlap with `shoot.spec.networking.pods` or `shoot.spec.networking.services`.

### Dual-stack (IPv4 + IPv6)

```yaml
apiVersion: gcp.provider.extensions.gardener.cloud/v1alpha1
kind: InfrastructureConfig
networks:
  vpc:
    name: my-vpc
  subnetWorkers:
    name: my-workers
    podSecondaryRangeName: my-pods   # name of the secondary range on my-workers
  subnetServices:
    name: my-services
```

Corresponding shoot spec:

```yaml
spec:
  networking:
    ipFamilies: [IPv4, IPv6]
    nodes:    10.100.0.0/16
    pods:     10.96.0.0/11
    services: 10.200.0.0/20
```

See [Pre-provisioning — dual-stack](#pre-provisioning--dual-stack) for the exact subnet requirements.

## Pre-provisioning

### Pre-provisioning — single-stack IPv4

**1. Create the VPC** (skip if reusing an existing one):

```bash
gcloud compute networks create my-vpc \
  --project=<project> \
  --subnet-mode=custom
```

**2. Create the worker subnet:**

```bash
gcloud compute networks subnets create my-workers \
  --project=<project> \
  --network=my-vpc \
  --region=<region> \
  --range=10.100.0.0/16
```

The primary range (`--range`) must be inside `shoot.spec.networking.nodes` and must not overlap with `shoot.spec.networking.pods` or `shoot.spec.networking.services`.

**3. Create firewall rules** (see [Required firewall rules — single-stack](#required-firewall-rules--single-stack)).

**4. Provision egress** of your choice, for example a user-owned Cloud NAT:

```bash
gcloud compute routers create my-router \
  --project=<project> \
  --network=my-vpc \
  --region=<region>

gcloud compute routers nats create my-nat \
  --project=<project> \
  --router=my-router \
  --region=<region> \
  --nat-all-subnet-ip-ranges \
  --auto-allocate-nat-external-ips
```

### Pre-provisioning — dual-stack

**1. Create the VPC** (skip if reusing an existing one):

```bash
gcloud compute networks create my-vpc \
  --project=<project> \
  --subnet-mode=custom
```

**2. Create the worker subnet with dual-stack and a secondary range for pods:**

```bash
gcloud compute networks subnets create my-workers \
  --project=<project> \
  --network=my-vpc \
  --region=<region> \
  --range=10.100.0.0/16 \
  --stack-type=IPV4_IPV6 \
  --ipv6-access-type=EXTERNAL \
  --secondary-range=my-pods=10.96.0.0/11
```

Requirements:
- `--range` must be inside `shoot.spec.networking.nodes` and must not overlap with pods or services CIDRs.
- `--secondary-range` name must match `subnetWorkers.podSecondaryRangeName`; its CIDR must **exactly equal** `shoot.spec.networking.pods`.
- `--stack-type=IPV4_IPV6` and `--ipv6-access-type=EXTERNAL` are required so GCP assigns an external `/64` IPv6 CIDR.

**3. Create the services subnet:**

```bash
gcloud compute networks subnets create my-services \
  --project=<project> \
  --network=my-vpc \
  --region=<region> \
  --range=192.168.255.0/29 \
  --stack-type=IPV4_IPV6 \
  --ipv6-access-type=EXTERNAL
```

The primary IPv4 range (`--range`) is required by GCP but is not used by Gardener — choose any small non-overlapping range.
`--stack-type=IPV4_IPV6` and `--ipv6-access-type=EXTERNAL` are required.

**4. Create firewall rules** (see [Required firewall rules — dual-stack](#required-firewall-rules--dual-stack)).

**5. Provision egress** of your choice (same as single-stack, or configure IPv6 egress via Cloud NAT or Internet Gateway as needed).

## Required firewall rules

Gardener does not create the static firewall rules in BYO mode.
You must pre-provision rules that cover the same traffic paths.

Replace `<technicalID>` with the shoot's technical ID (e.g. `shoot--myproject--mycluster`).
You can find this value in `shoot.status.technicalID` after shoot creation, but since you need the rules before creation you can derive it from the shoot name: `shoot--<project>--<name>`.

Using `--target-tags=<technicalID>` scopes rules to shoot worker VMs only — recommended for shared VPCs.
Omit `--target-tags` to make the rules apply to all VMs on the VPC (matches today's managed-mode behavior).

### Required firewall rules — single-stack

```bash
# Allow intra-shoot traffic (node-to-node, pod-to-node via VPC routes)
# In single-stack mode pods are routed via per-node VPC routes — only the nodes CIDR is needed.
gcloud compute firewall-rules create <name>-allow-internal \
  --project=<project> \
  --network=my-vpc \
  --direction=INGRESS \
  --priority=1000 \
  --action=ALLOW \
  --source-ranges=<networks.workers> \
  --target-tags=<technicalID> \
  --rules=icmp,ipip,tcp:1-65535,udp:1-65535

# Allow GCP load-balancer health-check probes
gcloud compute firewall-rules create <name>-allow-health-checks \
  --project=<project> \
  --network=my-vpc \
  --direction=INGRESS \
  --priority=1000 \
  --action=ALLOW \
  --source-ranges=35.191.0.0/16,130.211.0.0/22,209.85.152.0/22,209.85.204.0/22 \
  --target-tags=<technicalID> \
  --rules=tcp:30000-32767,udp:30000-32767
```

### Required firewall rules — dual-stack

Dual-stack shoots additionally require IPv6 mirrors.
Retrieve the IPv6 CIDRs assigned to your subnets after creation:

```bash
gcloud compute networks subnets describe my-workers --project=<project> --region=<region> --format='value(externalIpv6Prefix)'
gcloud compute networks subnets describe my-services --project=<project> --region=<region> --format='value(externalIpv6Prefix)'
```

```bash
# IPv4 rules (same as single-stack above)
gcloud compute firewall-rules create <name>-allow-internal ...
gcloud compute firewall-rules create <name>-allow-health-checks ...

# IPv6 intra-shoot traffic
gcloud compute firewall-rules create <name>-allow-internal-ipv6 \
  --project=<project> \
  --network=my-vpc \
  --direction=INGRESS \
  --action=ALLOW \
  --priority=1000 \
  --source-ranges=<workers-ipv6-cidr>,<services-ipv6-cidr> \
  --target-tags=<technicalID> \
  --rules=58,ipip,tcp:1-65535,udp:1-65535

# IPv6 GCP load-balancer health-check probes
gcloud compute firewall-rules create <name>-allow-health-checks-ipv6 \
  --project=<project> \
  --network=my-vpc \
  --direction=INGRESS \
  --action=ALLOW \
  --priority=1000 \
  --source-ranges=2600:2d00:1:b029::/64,2600:2d00:1:1::/64,2600:1901:8001::/48 \
  --target-tags=<technicalID> \
  --rules=tcp:30000-32767,udp:30000-32767
```

## Required IAM permissions

Gardener's GCP principal (the service account referenced by the shoot's `SecretBinding`/`CredentialsBinding`) still needs project-level IAM permissions to manage CCM-authored firewall rules and custom routes at runtime:

| Permission | Reason |
| --- | --- |
| `compute.firewalls.create`, `compute.firewalls.update`, `compute.firewalls.delete` | CCM creates/deletes `k8s-fw-*` rules per `Service type=LoadBalancer` |
| `compute.routes.create`, `compute.routes.delete` | CCM writes per-node pod-CIDR routes (single-stack IPv4 only) |
| `compute.networks.get`, `compute.subnetworks.get` | Infrastructure reconciler verifies BYO resources exist |

The full permissions list for the shoot service account is unchanged from managed mode.
The above highlights the subset that remains relevant in BYO mode.

## What Gardener writes into your VPC at runtime

Activating BYO subnet mode does not prevent Gardener's in-cluster controllers from writing into your VPC.
The table below describes every write that can occur after shoot creation.

| Component | Runs in | Writes to your VPC | Cleaned up by |
| --- | --- | --- | --- |
| **MCM** | seed | Creates/deletes worker VMs in the nodes subnet; attaches network tags (`<technicalID>`, `kubernetes-io-cluster-<technicalID>`, `kubernetes-io-role-node`) to every VM NIC | MCM on scale-down / node deletion |
| **CCM (IPv4 routing)** | shoot | Creates one `shoot--*` custom route per node for pod-CIDR routing (single-stack IPv4 only) | `ensureKubernetesRoutesDeleted` on shoot delete; CCM on node deletion |
| **CCM (LoadBalancer)** | shoot | Creates `k8s-fw-<hash>` firewall rule + `k8s-<hash>-hc` health-check rule per `Service type=LoadBalancer`, scoped by tag to `<technicalID>` VMs | CCM on Service delete |
| **`ingress-gce`** | seed (dual-stack only) | Creates `k8s-fw-l7-*` firewall rules + global forwarding rules, backend services, health checks, NEGs | `ingress-gce` on Ingress/Service delete; residual `k8s-fw-*` rules swept by the infrastructure reconciler on shoot delete |
| **Bastion controller** | seed | Creates bastion VM + disk + NIC in the nodes subnet; creates three tag-scoped firewall rules for SSH access | Bastion controller on Bastion CR delete |
| **Infrastructure reconciler (delete)** | seed | Removes residual CCM-authored `shoot--*` custom routes (single-stack IPv4 only) and `k8s-fw-*` firewall rules belonging to this cluster at shoot deletion time. Does **not** remove the static user-created firewall rules. | — |

> [!IMPORTANT]
> Do not run competing automation against the CCM-authored `k8s-fw-*` firewall rules or `shoot--*` custom routes.
> These resources are managed by the in-cluster CCM lifecycle; external interference will cause reconciliation errors or broken networking.

## Immutability

`networks.subnetWorkers` cannot be added to or removed from an existing shoot.
The subnet name and `podSecondaryRangeName` are immutable once the shoot is created.

To change the subnet you must delete the shoot and create a new one.

## Status fields

In BYO mode `shoot.status.provider.egressCIDRs` is always empty.
Egress IPs are managed entirely by your own egress topology and are not reported by Gardener.

## Deletion / teardown

On shoot deletion Gardener:

- **Does not delete** your VPC, worker subnet, or services subnet.
- **Does not delete** your Cloud Router or Cloud NAT (they were never created).
- **Does not delete** the static firewall rules you created during pre-provisioning (they were never created by Gardener, and in BYO mode they are yours to manage).
- **Does delete** CCM-authored `k8s-fw-*` firewall rules tag-scoped to this cluster (filter: `k8s` prefix + `TargetTag` == shoot technical ID). This is a safety net for the force-delete case where the CCM is gone before it can remove its own LoadBalancer rules; on a graceful delete the CCM removes them first. The exact `TargetTag` match means rules belonging to other clusters sharing the same VPC are left untouched.
- **Does delete** CCM-authored `shoot--*` custom routes belonging to this cluster (single-stack IPv4 only). Routes are selected by next-hop instance ownership, so routes belonging to other clusters sharing the same VPC are left untouched.

Gardener sweeps only resources it (or its in-cluster CCM) authored and can attribute to this cluster — the tag-scoped `k8s-fw-*` rules and next-hop-scoped `shoot--*` routes. It never touches your VPC, subnets, router, NAT, or the static firewall rules you provisioned. Stale `shoot--*` routes are the most important to remove because they are VPC-wide and, if their pod CIDR overlaps another cluster in the same VPC, can misroute that cluster's traffic; the `k8s-fw-*` sweep is primarily hygiene, since a rule targeting deleted VMs is inert.

If the shoot is force-deleted before Gardener completes the sweep, residual `k8s-fw-<hash>` rules or `shoot--*` routes may remain in your VPC.
Check for and remove any residual `k8s-fw-<hash>` rules and `shoot--*` routes after forced shoot deletion.

> [!NOTE]
> If multiple clusters share this VPC, see [Sharing a VPC across multiple clusters](#sharing-a-vpc-across-multiple-clusters) for the pod-CIDR overlap constraint that prevents cross-cluster route misrouting.
