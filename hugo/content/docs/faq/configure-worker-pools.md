---
github_repo: 'https://github.com/gardener/documentation'
github_subdir: hugo/content/docs/faq
params:
  github_branch: master
path_base_for_github_subdir:
  from: content/docs/faq/configure-worker-pools.md
  to: configure-worker-pools.md
title: "How do you configure Multi-AZ worker pools for different extensions?"
prev: false
next: false
local: true
---

# How do you configure Multi-AZ worker pools for different extensions?

Configuration of Multi-AZ worker pools depends on the infrastructure.

The zone distribution for the worker pools can be configured generically across all infrastructures. You can find provider-specific details in the `InfrastructureConfig` section of each extension provider repository:

* [AWS](/docs/extensions/infrastructure-extensions/gardener-extension-provider-aws/usage/#infrastructureconfig) (a VPC with a subnet is required in each zone you want to support)
* [GCP](/docs/extensions/infrastructure-extensions/gardener-extension-provider-gcp/usage/#infrastructureconfig)
* [Azure](/docs/extensions/infrastructure-extensions/gardener-extension-provider-azure/usage/#infrastructureconfig)
* [AliCloud](/docs/extensions/infrastructure-extensions/gardener-extension-provider-alicloud/usage/#infrastructureconfig)
* [OpenStack](/docs/extensions/infrastructure-extensions/gardener-extension-provider-openstack/usage/#infrastructureconfig)
