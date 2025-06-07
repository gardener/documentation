---
title: What are the meanings of different DNS configuration options?
---

## Can you adapt a DNS configuration to be used by the workload on the cluster (CoreDNS configuration)?

Yes, you can. Information on that can be found in [Custom DNS Configuration](https://github.com/gardener/gardener/blob/master/docs/usage/networking/custom-dns-config.md).

## How to use custom domain names using a DNS provider?
  
### Creating custom domain names for the Gardener infrastructure DNS records using DNSRecords resources

With DNSRecords internal and external domain names of the kube-apiserver are set, as well as the deprecated ingress domain name and an “owner” [DNS record](https://github.com/gardener/gardener/blob/master/docs/extensions/resources/dnsrecord.md) for the owning seed.

For this purpose, you need either a provider extension supporting the needed resource kind `DNSRecord/<provider-type>` or a special extension.

All main providers support their respective IaaS specific DNS servers:

* AWS => `DNSRecord/aws-route53`
* GCP => `DNSRecord/google-cloudns`
* Azure => `DNSRecord/azure-dns`
* Openstack => `DNSRecord/openstack-designate`
* AliCloud => `DNSRecord/alicloud-dns`

For Cloudflare there is a [community extension](https://github.com/schrodit/gardener-extension-provider-dns-cloudflare) existing.

For other providers like [Netlify](https://www.netlify.com/) and [infoblox](https://www.infoblox.com/) there is currently no known supporting extension, however, they are supported for [shoot-dns-service](https://github.com/gardener/gardener-extension-shoot-dns-service/blob/master/README.md).

### Creating domain names for cluster resources like ingress or services with services of type Loadbalancers and for TLS certificates

For this purpose, the shoot-dns-service extension is used (DNSProvider and DNSEntry resources).

You can read more on it in these documents:

* [Deployment of the Shoot DNS Service Extension](https://github.com/gardener/gardener-extension-shoot-dns-service/blob/master/docs/operations/deployment.md)
* [Request DNS Names in Shoot Clusters](https://github.com/gardener/gardener-extension-shoot-dns-service/blob/master/docs/usage/dns_names.md)
* [DNS Providers](https://github.com/gardener/gardener-extension-shoot-dns-service/blob/master/docs/usage/dns_providers.md)
* [Gardener DNS Management for Shoots](https://github.com/gardener/gardener-extension-shoot-dns-service/blob/master/docs/operations/deployment.md)
* [Request X.509 Certificates](https://github.com/gardener/gardener-extension-shoot-cert-service/blob/master/docs/usage/request_cert.md)
* [Gardener Certificate Management](https://github.com/gardener/gardener-extension-shoot-cert-service/blob/master/docs/operations/deployment.md)
