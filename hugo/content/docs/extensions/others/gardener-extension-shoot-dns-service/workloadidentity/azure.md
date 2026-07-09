---
github_repo: 'https://github.com/gardener/gardener-extension-shoot-dns-service'
github_subdir: docs/usage/workloadidentity
params:
  github_branch: master
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/others/gardener-extension-shoot-dns-service/workloadidentity/azure.md
  to: azure.md
persona: Users
title: Azure
prev: false
next: false
managed: true
---

# Using `WorkloadIdentity` for `Azure DNS` or `Azure Private DNS`

To use `WorkloadIdentity` for `Azure DNS` or `Azure Private DNS`, you can create a `WorkloadIdentity` resource in the project namespace in the Garden cluster with the necessary configuration for Azure authentication.

Note that the `spec.targetSystem.type` has to be set to `azure` although the type of the DNS provider is `azure-dns` or `azure-privatedns`. This allows to use the same `WorkloadIdentity` for different types of Azure resources, e.g., for infrastructure purposes and for `DNSProvider` purposes.

To create a `WorkloadIdentity`, follow the instructions in the [Azure Workload Identity Federation documentation](https://gardener.cloud/docs/extensions/infrastructure-extensions/gardener-extension-provider-azure/usage/#azure-workload-identity-federation) of the Azure Provider extension.

For the required permissions, please refer to the [Azure DNS Provider](https://github.com/gardener/external-dns-management/tree/master/docs/azure-dns#create-a-service-principal-account)
and the [Azure Private DNS Provider](https://github.com/gardener/external-dns-management/tree/master/docs/azure-private-dns#create-a-service-principal-account).
