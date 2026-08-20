---
title: External DNS Management
weight: 4
prev: false
next: false
---
<!-- BANNER:LOCAL -->
<!--
   █▀█ █▄▀
   █ █ █▀▄
   ▀▀▀ ▀ ▀

   ┌────────────────────────────────────────────────┐
   │  LOCAL FILE — maintained in gardener/            │
   │  documentation.                                  │
   │                                                  │
   │  Go ahead and edit this file directly.           │
   │  Changes here are the source of truth.           │
   └────────────────────────────────────────────────┘
-->


# External DNS Management

When you deploy to Kubernetes, there is no native management of external DNS. Instead, the cloud-controller-manager requests (mostly IPv4) addresses for every service of type LoadBalancer. Of course, the Ingress resource helps here, but how is the external DNS entry for the ingress controller managed?

Essentially, some sort of automation for DNS management is missing.

## Automating DNS Management

![automate-dns-management](/docs/getting-started/features/images/automate-dns-management.webp)

From a user's perspective, it is desirable to work with already known resources and concepts. Hence, the DNS management offered by Gardener plugs seamlessly into Kubernetes resources and you do not need to "leave" the context of the shoot cluster.

To request a DNS record creation/update, a Service or Ingress resource is annotated accordingly. The shoot-dns-service extension (if configured) will pick up the request, create a DNSEntry resource, and reconcile it to have an actual DNS record created at a configured DNS provider. Gardener supports the following providers:

- aws-route53
- azure-dns
- azure-private-dns
- google-clouddns
- openstack-designate
- alicloud-dns
- cloudflare-dns

For more information, see [DNS Names](/docs/guides/networking/DNS-extension/).

## DNS Provider

For the above to work, a DNS provider is needed. This is managed via the DNSProvider resource. Every shoot has a default provider that is used to set up the API server's public DNS record. It can be used to request subdomains as well.

![](/docs/getting-started/features/images/dns-provider.webp)

In addition, a shoot can reference credentials to a DNS provider. These can be used to manage custom domains.

Please have a look at the [documentation for the Gardener DNS extension](/docs/guides/networking/DNS-extension/) for further details.
