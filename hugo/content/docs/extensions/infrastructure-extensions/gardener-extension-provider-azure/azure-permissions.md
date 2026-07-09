---
github_repo: 'https://github.com/gardener/gardener-extension-provider-azure'
github_subdir: docs/usage
params:
  github_branch: master
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/infrastructure-extensions/gardener-extension-provider-azure/azure-permissions.md
  to: azure-permissions.md
persona: Users
title: Azure Permissions
prev: false
next: false
managed: true
---

# Azure Permissions

The following document describes the required Azure actions manage a Shoot cluster on Azure split by the different Azure provider/services.

Be aware some actions are just required if particular deployment scenarios or features e.g. bring your own vNet, use Azure-file, let the Shoot act as Seed, immutable buckets, etc. should be used.

## `Microsoft.Compute`
```
# Required to let Kubernetes manage Azure disks.
Microsoft.Compute/disks/delete
Microsoft.Compute/disks/read
Microsoft.Compute/disks/write

# Required for to fetch meta information about disk and virtual machines sizes.
Microsoft.Compute/locations/diskOperations/read
Microsoft.Compute/locations/operations/read
Microsoft.Compute/locations/vmSizes/read

# Required if csi snapshot capabilities should be used and/or the Shoot should act as a Seed.
Microsoft.Compute/snapshots/delete
Microsoft.Compute/snapshots/read
Microsoft.Compute/snapshots/write

# Required to let Gardener/Machine-Controller-Manager manage the cluster nodes/machines.
Microsoft.Compute/virtualMachines/delete
Microsoft.Compute/virtualMachines/read
Microsoft.Compute/virtualMachines/start/action
Microsoft.Compute/virtualMachines/write

# Required for non-zonal clusters.
Microsoft.Compute/virtualMachineScaleSets/delete
Microsoft.Compute/virtualMachineScaleSets/read
Microsoft.Compute/virtualMachineScaleSets/write
```

## `Microsoft.ManagedIdentity`

```
# Required if a user provided Azure managed identity should attached to the cluster nodes.
Microsoft.ManagedIdentity/userAssignedIdentities/assign/action
Microsoft.ManagedIdentity/userAssignedIdentities/read
```

## `Microsoft.MarketplaceOrdering`

```
# Required if nodes/machines should be created with images hosted on the Azure Marketplace.
Microsoft.MarketplaceOrdering/offertypes/publishers/offers/plans/agreements/read
Microsoft.MarketplaceOrdering/offertypes/publishers/offers/plans/agreements/write
```

## `Microsoft.Network`

```
# Required to let Kubernetes manage services of type 'LoadBalancer'.
Microsoft.Network/loadBalancers/backendAddressPools/join/action
Microsoft.Network/loadBalancers/delete
Microsoft.Network/loadBalancers/read
Microsoft.Network/loadBalancers/write

# Required in case the Shoot should use NatGateway(s).
Microsoft.Network/natGateways/delete
Microsoft.Network/natGateways/join/action
Microsoft.Network/natGateways/read
Microsoft.Network/natGateways/write

# Required to let Gardener/Machine-Controller-Manager manage the cluster nodes/machines.
Microsoft.Network/networkInterfaces/delete
Microsoft.Network/networkInterfaces/ipconfigurations/join/action
Microsoft.Network/networkInterfaces/ipconfigurations/read
Microsoft.Network/networkInterfaces/join/action
Microsoft.Network/networkInterfaces/read
Microsoft.Network/networkInterfaces/write

# Required to let Gardener maintain the basic infrastructure of the Shoot cluster and maintaing LoadBalancer services.
Microsoft.Network/networkSecurityGroups/delete
Microsoft.Network/networkSecurityGroups/join/action
Microsoft.Network/networkSecurityGroups/read
Microsoft.Network/networkSecurityGroups/write

# Required for managing LoadBalancers and NatGateways.
Microsoft.Network/publicIPAddresses/delete
Microsoft.Network/publicIPAddresses/join/action
Microsoft.Network/publicIPAddresses/read
Microsoft.Network/publicIPAddresses/write

# Required for managing the basic infrastructure of a cluster and maintaing LoadBalancer services.
Microsoft.Network/routeTables/delete
Microsoft.Network/routeTables/join/action
Microsoft.Network/routeTables/read
Microsoft.Network/routeTables/routes/delete
Microsoft.Network/routeTables/routes/read
Microsoft.Network/routeTables/routes/write
Microsoft.Network/routeTables/write

# Required to let Gardener maintain the basic infrastructure of the Shoot cluster.
# Only a subset is required for the bring your own vNet scenario.
Microsoft.Network/virtualNetworks/delete # not required for bring your own vnet
Microsoft.Network/virtualNetworks/read
Microsoft.Network/virtualNetworks/subnets/delete
Microsoft.Network/virtualNetworks/subnets/join/action
Microsoft.Network/virtualNetworks/subnets/read
Microsoft.Network/virtualNetworks/subnets/write
Microsoft.Network/virtualNetworks/write # not required for bring your own vnet
```

## `Microsoft.Resources`
```
# Required to let Gardener maintain the basic infrastructure of the Shoot cluster.
Microsoft.Resources/subscriptions/resourceGroups/delete
Microsoft.Resources/subscriptions/resourceGroups/read
Microsoft.Resources/subscriptions/resourceGroups/write
```

## `Microsoft.Storage`
```
# Required if Azure File should be used and/or if the Shoot should act as Seed.
Microsoft.Storage/operations/read
Microsoft.Storage/storageAccounts/blobServices/containers/delete
Microsoft.Storage/storageAccounts/blobServices/containers/read
Microsoft.Storage/storageAccounts/blobServices/containers/write
Microsoft.Storage/storageAccounts/blobServices/read
Microsoft.Storage/storageAccounts/delete
Microsoft.Storage/storageAccounts/listkeys/action
Microsoft.Storage/storageAccounts/read
Microsoft.Storage/storageAccounts/write

# Required if Shoot should act as Seed with immutable ABS containers.
Microsoft.Storage/storageAccounts/blobServices/containers/immutabilityPolicies/extend/action
Microsoft.Storage/storageAccounts/blobServices/containers/immutabilityPolicies/delete
Microsoft.Storage/storageAccounts/blobServices/containers/immutabilityPolicies/write
Microsoft.Storage/storageAccounts/blobServices/containers/immutabilityPolicies/lock/action
Microsoft.Storage/storageAccounts/blobServices/containers/immutabilityPolicies/read
Microsoft.Storage/storageAccounts/managementPolicies/delete
Microsoft.Storage/storageAccounts/managementPolicies/read
Microsoft.Storage/storageAccounts/managementPolicies/write

# Required to configure storage key rotation
Microsoft.Storage/storageAccounts/regeneratekey/action
```
