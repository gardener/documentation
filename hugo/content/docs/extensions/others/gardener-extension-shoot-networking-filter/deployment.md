---
github_repo: 'https://github.com/gardener/gardener-extension-shoot-networking-filter'
github_subdir: docs/operations
params:
  github_branch: master
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/others/gardener-extension-shoot-networking-filter/deployment.md
  to: deployment.md
persona: Operators
title: Deployment
prev: false
next: false
managed: true
---

# Gardener Networking Policy Filter for Shoots

## Introduction
Gardener allows shoot clusters to filter egress traffic on node level. To support this the Gardener must be installed with the `shoot-networking-filter` extension.

## Configuration

To generally enable the networking filter for shoot objects the `shoot-networking-filter` extension must be registered by providing an appropriate [extension registration](https://github.com/gardener/gardener-extension-shoot-networking-filter/blob/master/example/controller-registration.yaml) in the garden cluster.

Here it is possible to decide whether the extension should be always available for all shoots or whether the extension must be separately enabled per shoot.

If the extension should be used for all shoots the `globallyEnabled` flag should be set to `true`.

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: ControllerRegistration
...
spec:
  resources:
    - kind: Extension
      type: shoot-networking-filter
      globallyEnabled: true
```

### ControllerRegistration
An example of a `ControllerRegistration` for the `shoot-networking-filter` can be found at [controller-registration.yaml](https://github.com/gardener/gardener-extension-shoot-networking-filter/blob/master/example/controller-registration.yaml).

The `ControllerRegistration` contains a Helm chart which eventually deploys the `shoot-networking-filter` to seed clusters. It offers some configuration options, mainly to set up a static filter list or provide the configuration for downloading the filter list from a service endpoint.

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: ControllerDeployment
...
  values:
    egressFilter:
      blackholingEnabled: true

      filterListProviderType: static
      staticFilterList:
        - network: 1.2.3.4/31
          policy: BLOCK_ACCESS
        - network: 5.6.7.8/32
          policy: BLOCK_ACCESS
        - network: ::2/128
          policy: BLOCK_ACCESS

      #filterListProviderType: download
      #downloaderConfig:
      #  endpoint: https://my.filter.list.server/lists/policy
      #  oauth2Endpoint: https://my.auth.server/oauth2/token
      #  refreshPeriod: 1h

      ## if the downloader needs an OAuth2 access token, client credentials can be provided with oauth2Secret
      #oauth2Secret:
      # clientID: 1-2-3-4
      # clientSecret: secret!!
      ## either clientSecret of client certificate is required
      # client.crt.pem: |
      #   -----BEGIN CERTIFICATE-----
      #   ...
      #   -----END CERTIFICATE-----
      # client.key.pem: |
      #   -----BEGIN PRIVATE KEY-----
      #   ...
      #   -----END PRIVATE KEY-----
```

### Tag-Based Filtering

When using filter lists in v2 format (with tags), you can configure tag filters to selectively apply only entries matching specific tag criteria. This is useful when a centrally-managed filter list contains entries for multiple environments, severity levels, or categories.

#### Service-Level Tag Filters

Administrators can configure baseline tag filters in the ControllerDeployment that apply to all shoots:

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: ControllerDeployment
...
  values:
    egressFilter:
      filterListProviderType: download
      downloaderConfig:
        endpoint: https://my.filter.list.server/lists/policy
        refreshPeriod: 1h
      
      # Apply baseline tag filters for all shoots
      tagFilters:
        - name: Fruit
          values:
            - "Apple"
            - "Banana"
          policy: BLOCK_ACCESS
        - name: Color
          values:
            - "Green"
          policy: ALLOW_ACCESS
```

**Tag Filter Behavior:**
- **All entries are always included** in the result
- Tag filters override the policy **only for matching entries** that specify a `policy` field
- If no `policy` is specified in a tag filter, matching entries keep their original policies
- When an entry matches multiple filters with different policies, filters listed **later** take precedence
- In this example: All entries are included, but those tagged as Apple or Banana get their policy overridden to BLOCK_ACCESS, except entries also tagged as Green get overridden to ALLOW_ACCESS (takes precedence)

#### Filter List Format with Tags

The v2 filter list format supports tags:

```json
[
  {
    "entries": [
      {
        "target": "10.0.0.1/32",
        "policy": "BLOCK",
        "tags": [
          {"name": "Fruit", "values": ["Apple"]}
        ]
      },
      {
        "target": "10.0.0.2/32",
        "policy": "BLOCK",
        "tags": [
          {"name": "Fruit", "values": ["Banana"]}
        ]
      },
      {
        "target": "10.0.0.3/32",
        "policy": "BLOCK",
        "tags": [
          {"name": "Fruit", "values": ["Apple"]},
          {"name": "Color", "values": ["Green"]}
        ]
      }
    ]
  }
]
```

See the [usage documentation](/docs/extensions/others/gardener-extension-shoot-networking-filter/shoot-networking-filter/#tag-based-filtering) for more detailed examples and use cases.

### Enablement for a Shoot

If the shoot networking filter is not globally enabled by default (depends on the extension registration on the garden cluster), it can be enabled per shoot. To enable the service for a shoot, the shoot manifest must explicitly add the `shoot-networking-filter` extension.

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: Shoot
...
spec:
  extensions:
    - type: shoot-networking-filter
...
```

If the shoot networking filter is globally enabled by default, it can be disabled per shoot. To disable the service for a shoot, the shoot manifest must explicitly state it.

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: Shoot
...
spec:
  extensions:
    - type: shoot-networking-filter
      disabled: true
...
```
