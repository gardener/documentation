---
title: How do you configure Multi-AZ worker pools for different extensions?
---

Configuration of Multi-AZ worker pools depends on the infrastructure.

The zone distribution for the worker pools can be configured generically across all infrastructures. You can find provider-specific details in the `InfrastructureConfig` section of each extension provider repository:

* [AWS](https://github.com/gardener/gardener-extension-provider-aws/blob/master/docs/usage/usage.md#infrastructureconfig) (a VPC with a subnet is required in each zone you want to support)
* [GCP](https://github.com/gardener/gardener-extension-provider-gcp/blob/master/docs/usage/usage.md#infrastructureconfig)
* [Azure](https://github.com/gardener/gardener-extension-provider-azure/blob/master/docs/usage/usage.md#infrastructureconfig)
* [AliCloud](https://github.com/gardener/gardener-extension-provider-alicloud/blob/master/docs/usage-as-end-user.md#infrastructureconfig)
* [OpenStack](https://github.com/gardener/gardener-extension-provider-openstack/blob/master/docs/usage/usage.md#infrastructureconfig)