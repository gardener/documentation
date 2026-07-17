---
github_repo: 'https://github.com/gardener/documentation'
github_subdir: hugo/content/docs/faq
params:
  github_branch: master
path_base_for_github_subdir:
  from: content/docs/faq/dns-config.md
  to: dns-config.md
title: "What are the meanings of different DNS configuration options?"
prev: false
next: false
local: true
---

# What are the meanings of different DNS configuration options?

## Can you adapt a DNS configuration to be used by the workload on the cluster (CoreDNS configuration)?

Yes, you can. Information on that can be found in [Custom DNS Configuration](/docs/gardener/networking/custom-dns-config/).

## How to use custom domain names using a DNS provider?

### Creating custom domain names for the Gardener infrastructure DNS records using DNSRecords resources

With DNSRecords internal and external domain names of the kube-apiserver are set, as well as the deprecated ingress domain name and an “owner” [DNS record](/docs/gardener/extensions/resources/dnsrecord/) for the owning seed.

For this purpose, you need either a provider extension supporting the needed resource kind `DNSRecord/<provider-type>` or a special extension.

All main providers support their respective IaaS specific DNS servers:

* AWS => `DNSRecord/aws-route53`
* GCP => `DNSRecord/google-cloudns`
* Azure => `DNSRecord/azure-dns`
* Openstack => `DNSRecord/openstack-designate`
* AliCloud => `DNSRecord/alicloud-dns`

For Cloudflare there is a [community extension](https://github.com/schrodit/gardener-extension-provider-dns-cloudflare) existing.

For other providers like [Netlify](https://www.netlify.com/) and [infoblox](https://www.infoblox.com/) there is currently no known supporting extension, however, they are supported for [shoot-dns-service](/docs/extensions/others/gardener-extension-shoot-dns-service/).

### Creating domain names for cluster resources like ingress or services with services of type Loadbalancers and for TLS certificates

For this purpose, the shoot-dns-service extension is used (DNSProvider and DNSEntry resources).

You can read more on it in these documents:

* [Deployment of the Shoot DNS Service Extension](/docs/extensions/others/gardener-extension-shoot-dns-service/deployment/)
* [Request DNS Names in Shoot Clusters](/docs/guides/networking/DNS-extension/)
* [DNS Providers](/docs/extensions/others/gardener-extension-shoot-dns-service/dns_providers/)
* [Gardener DNS Management for Shoots](/docs/extensions/others/gardener-extension-shoot-dns-service/deployment/)
* [Request X.509 Certificates](/docs/guides/networking/certificate-extension/)
* [Gardener Certificate Management](/docs/extensions/others/gardener-extension-shoot-cert-service/deployment/)
