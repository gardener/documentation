---
aliases:
  - /managing-dns-with-gardener
  - /docs/015-guides/030-networking-lb/managed-dns
category: Networking
description: Setup Gardener-managed DNS records in cluster.
github_repo: 'https://github.com/gardener/gardener-extension-shoot-dns-service'
github_subdir: docs/usage
last_reviewed: 07.19.2022
level: beginner
params:
  github_branch: master
path_base_for_github_subdir:
  from: content/docs/guides/networking/DNS-extension.md
  to: dns_names.md
publishdate: '2022-07-19'
scope: operator
title: Managing DNS with Gardener
weight: 50
prev: false
next: false
managed: true
---

# Request DNS Names in Shoot Clusters

## Introduction
Within a shoot cluster, it is possible to request DNS records via the following resource types:
- [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/)
- [Service](https://kubernetes.io/docs/concepts/services-networking/service/)
- [DNSEntry](https://github.com/gardener/external-dns-management/blob/master/README.md#the-model)

It is necessary that the Gardener installation your shoot cluster runs in is equipped with a `shoot-dns-service` extension. This extension uses the seed's dns management infrastructure to maintain DNS names for shoot clusters. Please ask your Gardener operator if the extension is available in your environment.

## Shoot Feature Gate

In some Gardener setups the `shoot-dns-service` extension is not enabled globally and thus must be configured per shoot cluster. Please adapt the shoot specification by the configuration shown below to activate the extension individually.

```yaml
kind: Shoot
...
spec:
  extensions:
    - type: shoot-dns-service
...
```

## Before you start
You should :
- Have created a shoot cluster
- Have created and correctly configured a DNS Provider (Please consult [this page](/docs/extensions/others/gardener-extension-shoot-dns-service/dns_providers/) for more information)
- Have a basic understanding of DNS (see link under [References](#references))

There are 2 types of DNS that you can use within Kubernetes :
- internal (usually managed by coreDNS)
- external (managed by a public DNS provider).

This page, and the extension, exclusively works for external DNS handling.

Gardener allows 2 way of managing your external DNS:
- Manually, which means you are in charge of creating / maintaining your Kubernetes related DNS entries
- Via the Gardener DNS extension

## Gardener DNS extension
The managed external DNS records feature of the Gardener clusters makes all this easier. You do not need DNS service provider specific knowledge, and in fact you do not need to leave your cluster at all to achieve that. You simply annotate the Ingress / Service that needs its DNS records managed and it will be automatically created / managed by Gardener.

Managed external DNS records are supported with the following DNS provider types:
- aws-route53
- azure-dns
- azure-private-dns
- google-clouddns
- openstack-designate
- alicloud-dns
- cloudflare-dns

### Request DNS records for Ingress resources

To request a DNS name for `Ingress`, `Service` or `Gateway` (Istio or Gateway API) objects in the shoot cluster it must be annotated with the DNS class `garden` and an annotation denoting the desired DNS names.

Example for an annotated Ingress resource:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: amazing-ingress
  annotations:
    # Let Gardener manage external DNS records for this Ingress.
    dns.gardener.cloud/dnsnames: special.example.com # Use "*" to collects domains names from .spec.rules[].host
    dns.gardener.cloud/ttl: "600"
    dns.gardener.cloud/class: garden
    # If you are delegating the certificate management to Gardener, uncomment the following line
    #cert.gardener.cloud/purpose: managed
    # If you're using a load balancer on AWS and expect the creation of both `A` and `AAAA` records, uncomment the following line
    #dns.gardener.cloud/ip-stack: dual-stack
spec:
  rules:
  - host: special.example.com
    http:
      paths:
      - pathType: Prefix
        path: "/"
        backend:
          service:
            name: amazing-svc
            port:
              number: 8080
  # Uncomment the following part if you are delegating the certificate management to Gardener
  #tls:
  #  - hosts:
  #      - special.example.com
  #    secretName: my-cert-secret-name
```

For an Ingress, the DNS names are already declared in the specification. Nevertheless the *dnsnames* annotation must be present. Here a subset of the DNS names of the ingress can be specified. If DNS names for all names are desired, the value `all` can be used.

Keep in mind that ingress resources are ignored unless an ingress controller is set up. Gardener does not provide an ingress controller by default. For more details, see [Ingress Controllers](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/) and [Service](https://kubernetes.io/docs/concepts/services-networking/service/) in the Kubernetes documentation.

### Request DNS records for service type LoadBalancer

Example for an annotated Service (it must have the type `LoadBalancer`) resource:
```yaml
apiVersion: v1
kind: Service
metadata:
  name: amazing-svc
  annotations:
    # Let Gardener manage external DNS records for this Service.
    dns.gardener.cloud/dnsnames: special.example.com
    dns.gardener.cloud/ttl: "600"
    dns.gardener.cloud/class: garden
    # If you're using a load balancer on AWS and expect the creation of both `A` and `AAAA` records, uncomment the following line
    #dns.gardener.cloud/ip-stack: dual-stack
spec:
  selector:
    app: amazing-app
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8080
  type: LoadBalancer
```

### Request `AAAA` DNS records for Dual-Stack load balancers on AWS

For Amazon Route 53 and AWS load balancers, `A` DNS records with alias target are created instead of `CNAME` as an optimization.

To support dual-stack IP addresses in this case, set one of these annotations:

* `service.beta.kubernetes.io/aws-load-balancer-ip-address-type=dualstack` (`Service` only)
* `dns.gardener.cloud/ip-stack=dual-stack` (`Ingress`, `Service`, or `DNSEntry`)

In this case, both `A` and `AAAA` records with alias target records are created.

With the annotation `dns.gardener.cloud/ip-stack=ipv6`, only an `AAAA` record with alias target is created.

### Request DNS records for Gateway resources

Please see [Istio Gateways](/docs/extensions/others/gardener-extension-shoot-dns-service/tutorials/istio-gateways/) or [Gateway API](/docs/extensions/others/gardener-extension-shoot-dns-service/tutorials/gateway-api-gateways/) for details.

### Creating a DNSEntry resource explicitly
It is also possible to create a DNS entry via the Kubernetes resource called `DNSEntry`:
```yaml
apiVersion: dns.gardener.cloud/v1alpha1
kind: DNSEntry
metadata:
  annotations:
    # Let Gardener manage this DNS entry.
    dns.gardener.cloud/class: garden
  name: special-dnsentry
  namespace: default
spec:
  dnsName: special.example.com
  ttl: 600
  targets:
  - 1.2.3.4
```

If one of the accepted DNS names is a direct subname of the shoot's ingress domain, this is already handled by the standard wildcard entry for the ingress domain. Therefore this name should be excluded from the *dnsnames* list in the annotation. If only this DNS name is configured in the ingress, no explicit DNS entry is required, and the DNS annotations should be omitted at all.

You can check the status of the `DNSEntry` with
```bash
$ kubectl get dnsentry
NAME          DNS                                                            TYPE          PROVIDER      STATUS    AGE
mydnsentry    special.example.com     aws-route53   default/aws   Ready     24s
```
As soon as the status of the entry is `Ready`, the provider has accepted the new DNS record. Depending on the provider and your DNS settings and cache, **it may take up to 24 hours for the new entry to be propagated over all internet**.

More examples can be found [here](https://github.com/gardener/external-dns-management/blob/master/examples/)

### Request DNS records for Service/Ingress resources using a DNSAnnotation resource

In rare cases it may not be possible to add annotations to a `Service` or `Ingress` resource object.

E.g.: the helm chart used to deploy the resource may not be adaptable for some reason or some automation is used, which always restores the original content of the resource object by dropping any additional annotations.

In these cases, it is recommended to use an additional `DNSAnnotation` resource in order to have more flexibility than `DNSentry` resources. The `DNSAnnotation` resource makes the DNS shoot service behave as if annotations have been added to the referenced resource.

For the Ingress example shown above, you can create a `DNSAnnotation` resource alternatively to provide the annotations.

```yaml
apiVersion: dns.gardener.cloud/v1alpha1
kind: DNSAnnotation
metadata:
  annotations:
    dns.gardener.cloud/class: garden
  name: test-ingress-annotation
  namespace: default
spec:
  resourceRef:
    kind: Ingress
    apiVersion: networking.k8s.io/v1
    name: test-ingress
    namespace: default
  annotations:
    dns.gardener.cloud/dnsnames: '*'
    dns.gardener.cloud/class: garden    
```

Note that the DNSAnnotation resource itself needs the `dns.gardener.cloud/class=garden` annotation. This also only works for annotations known to the DNS shoot service (see [Accepted External DNS Records Annotations](#accepted-external-dns-records-annotations)).

For more details, see also [DNSAnnotation objects](https://github.com/gardener/external-dns-management#dnsannotation-objects)

### Accepted External DNS Records Annotations

Here are all the accepted annotations related to the DNS extension:

| Annotation | Description |
| --- | --- |
| dns.gardener.cloud/dnsnames | Mandatory for service and ingress resources, accepts a comma-separated list of DNS names if multiple names are required. For ingress you can use the special value `'*'`. In this case, the DNS names are collected from `.spec.rules[].host`. |
| dns.gardener.cloud/class | Mandatory, in the context of the shoot-dns-service it must always be set to `garden`. |
| dns.gardener.cloud/ttl | Recommended, overrides the default Time-To-Live of the DNS record. |
| dns.gardener.cloud/cname-lookup-interval | Only relevant if multiple domain name targets are specified. It specifies the lookup interval for CNAMEs to map them to IP addresses (in seconds) |
| dns.gardener.cloud/realms | Internal, for restricting provider access for shoot DNS entries. Typcially not set by users of the shoot-dns-service. |
| dns.gardener.cloud/ip-stack | Only relevant for provider type `aws-route53` if target is an AWS load balancer domain name. Can be set for service, ingress and DNSEntry resources. It specify which DNS records with alias targets are created instead of the usual `CNAME` records. If the annotation is not set (or has the value `ipv4`), only an `A` record is created. With value `dual-stack`, both `A` and `AAAA` records are created. With value `ipv6` only an `AAAA` record is created. |
| dns.gardener.cloud/ignore | Optional, with the possible values: `true`, `reconcile`, or `full`. For values `true` and `reconcile`, the reconciliation is skipped. `true` is an alias for `reconcile`. For value `full` both reconciliation and deletion operations are skipped. |
| dns.gardener.cloud/target-hard-ignore | Optional, for a generated target `DNSEntry` to ignore it on reconciliation. It is not propagated from source objects to the target `DNSEntry`. **Important:** The entry is even ignored on deletion, so use with caution to avoid orphaned entries. |
| service.beta.kubernetes.io/aws-load-balancer-ip-address-type=dualstack | For services, behaves similar to `dns.gardener.cloud/ip-stack=dual-stack`. |
| loadbalancer.openstack.org/load-balancer-address | Internal, for services only: support for PROXY protocol on Openstack (which needs a hostname as ingress). Typcially not set by users of the shoot-dns-service. |

If one of the accepted DNS names is a direct subdomain of the shoot's ingress domain, this is already handled by the standard wildcard entry for the ingress domain. Therefore, this name should be excluded from the *dnsnames* list in the annotation. If only this DNS name is configured in the ingress, no explicit DNS entry is required, and the DNS annotations should be omitted at all.

## Troubleshooting
### General DNS tools
To check the DNS resolution, use the `nslookup` or `dig` command.
```bash
$ nslookup special.your-domain.com
```
or with dig
```bash
$ dig +short special.example.com
Depending on your network settings, you may get a successful response faster using a public DNS server (e.g. 8.8.8.8, 8.8.4.4, or 1.1.1.1)

dig @8.8.8.8 +short special.example.com
```

### DNS record events

The DNS controller publishes Kubernetes events for the resource which requested the DNS record (Ingress, Service, DNSEntry). These events reveal more information about the DNS requests being processed and are especially useful to check any kind of misconfiguration, e.g. requests for a domain you don't own.

Events for a successfully created DNS record:
```
$ kubectl describe service my-service

Events:
  Type    Reason          Age                From                    Message
  ----    ------          ----               ----                    -------
  Normal  dns-annotation  19s                dns-controller-manager  special.example.com: dns entry is pending
  Normal  dns-annotation  19s (x3 over 19s)  dns-controller-manager  special.example.com: dns entry pending: waiting for dns reconciliation
  Normal  dns-annotation  9s (x3 over 10s)   dns-controller-manager  special.example.com: dns entry active
```

Please note, events vanish after their retention period (usually `1h`).

### DNSEntry status

`DNSEntry` resources offer a `.status` sub-resource which can be used to check the current state of the object.

Status of a erroneous `DNSEntry`.
```
  status:
    message: No responsible provider found
    observedGeneration: 3
    provider: remote
    state: Error
```

## Troubleshooting entries quota

If a `DNSProvider` has set the `.spec.quotas.entries=<max-entries>` field, you can check on the shoot cluster
if you hit the limit with the usual means.

1. For `DNSEntry` resources created on the shoot, check the status of the resource.
   If the quota is exceeded, the status will indicate an error related to quota limits.
   The message will show something like `"provider <provider-name> has reached its entries quota (max=...)"`.
1. For annotated source resources like `Ingress` and `Service`, check the events of the resource
   with `kubectl -n <object-namespace> get events --field-selector involvedObject.name=<object-name>`

The quota limit may be changed by the shoot annotation `service.dns.extensions.gardener.cloud/default-external-provider-entries-quota`.
However, the value is bounded by the extension configuration `defaultExternalProviderEntriesQuotaMax`.

## References
- [Understanding DNS](https://www.cloudflare.com/en-ca/learning/dns/what-is-dns)
- [Kubernetes Internal DNS](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/)
- [DNSEntry API (Golang)](https://github.com/gardener/external-dns-management/blob/master/pkg/apis/dns/v1alpha1/dnsentry.go)
- [Managing Certificates with Gardener](/docs/guides/networking/certificate-extension/)
