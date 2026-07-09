---
aliases:
  - /enable-dual-stack-ingress-on-aws
category: Networking
description: Use IPv4/IPv6 (dual-stack) Ingress in an IPv4 single-stack cluster on AWS
github_repo: 'https://github.com/gardener/gardener-extension-provider-aws'
github_subdir: docs/usage
last_reviewed: 11.16.2023
level: beginner
params:
  github_branch: master
path_base_for_github_subdir:
  from: content/docs/guides/networking/dual-stack-ipv4-ipv6-ingress-aws.md
  to: dual-stack-ingress.md
publishdate: '2023-11-16'
scope: operator
title: Enable IPv4/IPv6 (dual-stack) Ingress on AWS
weight: 10
prev: false
next: false
managed: true
---

# Using IPv4/IPv6 (dual-stack) Ingress in an IPv4 single-stack cluster

## Motivation

IPv6 adoption is continuously growing, already overtaking IPv4 in certain regions, e.g. India, or scenarios, e.g. mobile.
Even though most IPv6 installations deploy means to reach IPv4, it might still be beneficial to expose services
natively via IPv4 and IPv6 instead of just relying on IPv4.

## Disadvantages of full IPv4/IPv6 (dual-stack) Deployments

Enabling full IPv4/IPv6 (dual-stack) support in a kubernetes cluster is a major endeavor. It requires a lot of changes
and restarts of all pods so that all pods get addresses for both IP families. A side-effect of dual-stack networking
is that failures may be hidden as network traffic may take the other protocol to reach the target. For this reason and
also due to reduced operational complexity, service teams might lean towards staying in a single-stack environment as
much as possible. Luckily, this is possible with Gardener and IPv4/IPv6 (dual-stack) ingress on AWS.

## Simplifying IPv4/IPv6 (dual-stack) Ingress with Protocol Translation on AWS

Fortunately, the network load balancer on AWS supports automatic protocol translation, i.e. it can expose both IPv4 and
IPv6 endpoints while communicating with just one protocol to the backends. Under the hood, automatic protocol translation
takes place. Client IP address preservation can be achieved by using proxy protocol.

This approach enables users to expose IPv4 workload to IPv6-only clients without having to change the workload/service.
Without requiring invasive changes, it allows a fairly simple first step into the IPv6 world for services just requiring
ingress (incoming) communication.

## Necessary Shoot Cluster Configuration Changes for IPv4/IPv6 (dual-stack) Ingress

To be able to utilize IPv4/IPv6 (dual-stack) Ingress in an IPv4 shoot cluster, the cluster needs to meet two preconditions:
1. `dualStack.enabled` needs to be set to `true` to configure VPC/subnet for IPv6 and add a routing rule for IPv6.
   (This does not add IPv6 addresses to kubernetes nodes.)
1. `loadBalancerController.enabled` needs to be set to `true` as well to use the load balancer controller, which supports
   dual-stack ingress.

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: Shoot
...
spec:
  provider:
    type: aws
    infrastructureConfig:
      apiVersion: aws.provider.extensions.gardener.cloud/v1alpha1
      kind: InfrastructureConfig
      dualStack:
        enabled: true
    controlPlaneConfig:
      apiVersion: aws.provider.extensions.gardener.cloud/v1alpha1
      kind: ControlPlaneConfig
      loadBalancerController:
        enabled: true
...
```

When `infrastructureConfig.networks.vpc.id` is set to the ID of an existing VPC, please make sure that your VPC has an [Amazon-provided IPv6 CIDR block added](https://docs.aws.amazon.com/vpc/latest/userguide/modify-vpcs.html#vpc-associate-ipv6-cidr).

After adapting the shoot specification and reconciling the cluster, dual-stack load balancers can be created using
kubernetes services objects.

## Creating an IPv4/IPv6 (dual-stack) Ingress

With the preconditions set, creating an IPv4/IPv6 load balancer is as easy as annotating a service with the correct
annotations:

```yaml
apiVersion: v1
kind: Service
metadata:
  annotations:
    service.beta.kubernetes.io/aws-load-balancer-ip-address-type: dualstack
    service.beta.kubernetes.io/aws-load-balancer-scheme: internet-facing
    service.beta.kubernetes.io/aws-load-balancer-nlb-target-type: instance
    service.beta.kubernetes.io/aws-load-balancer-type: external
  name: ...
  namespace: ...
spec:
  ...
  type: LoadBalancer
```

In case the client IP address should be preserved, the following annotation can be used to enable proxy protocol.
(The pod receiving the traffic needs to be configured for proxy protocol as well.)

```yaml
    service.beta.kubernetes.io/aws-load-balancer-proxy-protocol: "*"
```

Please note that changing an existing `Service` to dual-stack may cause the creation of a new load balancer without
deletion of the old AWS load balancer resource. While this helps in a seamless migration by not cutting existing
connections it may lead to wasted/forgotten resources. Therefore, the (manual) cleanup needs to be taken into account
when migrating an existing `Service` instance.

For more details see [AWS Load Balancer Documentation - Network Load Balancer](https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.4/guide/service/nlb/).

## DNS Considerations to Prevent Downtime During a Dual-Stack Migration

In case the migration of an existing service is desired, please check if there are DNS entries directly linked to the
corresponding load balancer. The migrated load balancer will have a new domain name immediately, which will not be ready
in the beginning. Therefore, a direct migration of the domain name entries is not desired as it may cause a short
downtime, i.e. domain name entries without backing IP addresses.

If there are DNS entries directly linked to the corresponding load balancer and they are managed by the
[shoot-dns-service](https://github.com/gardener/gardener-extension-shoot-dns-service), you can identify this via
annotations with the prefix `dns.gardener.cloud/`. Those annotations can be linked to a `Service`, `Ingress` or
`Gateway` resources. Alternatively, they may also use `DNSEntry` or `DNSAnnotation` resources.

⚠️ **Note:** Shoot owners using external DNS management with versions below v0.26.0 may experience runtime impacts during migration.

For a seamless migration without downtime use the following three step approach:

1. Temporarily prevent direct DNS updates
1. Migrate the load balancer and wait until it is operational
1. Allow DNS updates again

To prevent direct updates of the DNS entries when the load balancer is migrated add the annotation
`dns.gardener.cloud/ignore: 'true'` to all affected resources next to the other `dns.gardener.cloud/...` annotations
before starting the migration. For example, in case of a `Service` ensure that the service looks like the following:

```yaml
kind: Service
metadata:
  annotations:
    dns.gardener.cloud/ignore: 'true'
    dns.gardener.cloud/class: garden
    dns.gardener.cloud/dnsnames: '...'
    ...
```

Next, migrate the load balancer to be dual-stack enabled by adding/changing the corresponding annotations.

You have multiple options how to check that the load balancer has been provisioned successfully. It might be useful
to peek into `status.loadBalancer.ingress` of the corresponding `Service` to identify the load balancer:

- Check in the AWS console for the corresponding load balancer provisioning state
- Perform domain name lookups with `nslookup`/`dig` to check whether the name resolves to an IP address.
- Call your workload via the new load balancer, e.g. using
  `curl --resolve <my-domain-name>:<port>:<IP-address> https://<my-domain-name>:<port>`, which allows you to call your
  service with the "correct" domain name without using actual name resolution.
- Wait a fixed period of time as load balancer creation is usually finished within 15 minutes

Once the load balancer has been provisioned, you can remove the annotation `dns.gardener.cloud/ignore: 'true'` again
from the affected resources. It may take some additional time until the domain name change finally propagates
(up to one hour).

## Important: Check AWS Quotas Before Migration

Before migrating to dual-stack ingress, verify that your AWS account has sufficient quotas to avoid service disruptions.

### Network Load Balancer Quotas

**1. Network Load Balancers per Region**
- **Default limit:** 50 per region
- **Migration impact:** If migrating from Classic Load Balancers to Network Load Balancers, ensure this quota is sufficient
- **Dual-stack migration:** During migration, you temporarily need **double** the number of load balancers

**2. Targets per Network Load Balancer per Availability Zone**
- Migrating from classic load balancers to network load balancers, this quota needs to be checked, as a similar limitation does not exist for classic load balancers.
- **Default limit:** 500 targets per AZ per NLB
- **Critical calculation:** `(number of nodes × number of service ports) ÷ number of availability zones`

- **Example:** 10 nodes × 3 service ports ÷ 2 AZs = 15 targets per AZ (well within limit)
- **Example:** 200 nodes × 5 service ports ÷ 2 AZs = 500 targets per AZ (at limit - consider increasing)

⚠️ **Important:** Quota increase requests can take up to 24-48 hours to process. Plan accordingly.

For complete quota details, see the [AWS Network Load Balancer Limits documentation](https://docs.aws.amazon.com/elasticloadbalancing/latest/network/load-balancer-limits.html).
