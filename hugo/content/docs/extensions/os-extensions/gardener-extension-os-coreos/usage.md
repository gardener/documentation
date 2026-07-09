---
github_repo: 'https://github.com/gardener/gardener-extension-os-coreos'
github_subdir: docs/usage
params:
  github_branch: master
path_base_for_github_subdir:
  from: content/docs/extensions/os-extensions/gardener-extension-os-coreos/usage.md
  to: usage.md
persona: Users
title: Usage
prev: false
next: false
managed: true
---

# Using the CoreOS extension with Gardener as end-user

The [`core.gardener.cloud/v1beta1.Shoot` resource](https://github.com/gardener/gardener/blob/master/example/90-shoot.yaml) declares a few fields that must be considered when this OS extension is used.

In this document we describe how this configuration looks like and under which circumstances your attention may be required.

## AWS VPC settings for CoreOS workers

Gardener allows you to create CoreOS based worker nodes by:
1. Using a Gardener managed VPC
1. Reusing a VPC that already exists (VPC `id` specified in [InfrastructureConfig](/docs/extensions/infrastructure-extensions/gardener-extension-provider-aws/usage/#infrastructureconfig)]

If the second option applies to your use-case please make sure that your VPC has enabled **DNS Support**. Otherwise CoreOS based nodes aren't able to join or operate in your cluster properly.

**[DNS](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-dns.html)** settings (required):

- `enableDnsHostnames`: true (necessary for collecting [node metrics](https://kubernetes.io/docs/tasks/debug-application-cluster/resource-metrics-pipeline/))
- `enableDnsSupport`: true
