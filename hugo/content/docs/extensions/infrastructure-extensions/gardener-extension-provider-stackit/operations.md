---
github_repo: 'https://github.com/stackitcloud/gardener-extension-provider-stackit'
github_subdir: docs/operations
params:
  github_branch: main
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/infrastructure-extensions/gardener-extension-provider-stackit/operations.md
  to: operations.md
persona: Operators
title: Operations
prev: false
next: false
---
<!-- BANNER:MANAGED -->
<!--
   █▀▀ ▀█▀ █▀█ █▀█
   ▀▀█  █  █ █ █▀▀
   ▀▀▀  ▀  ▀▀▀ ▀

   ┌────────────────────────────────────────────────┐
   │  MANAGED FILE — aggregated from upstream       │
   │                                                │
   │  Editing here is pointless: The nightly        │
   │  aggregation run overwrites this file.         │
   │                                                │
   │  Open a PR against the source instead: ─────┐  │
   │                          ┌──┐    ┌──────────┘  │
   │                          └──│────┘             │
   │           ┌─────────────────┘                  │
   └───────────│────────────────────────────────────┘
               ▼               
   https://github.com/stackitcloud/gardener-extension-provider-stackit/blob/main/docs/operations/operations.md
-->


# Using the STACKIT provider extension with Gardener as operator

The [`core.gardener.cloud/v1beta1.CloudProfile` resource](https://github.com/gardener/gardener/blob/master/example/30-cloudprofile.yaml) declares a `providerConfig` field that is meant to contain provider-specific configuration.

In this document we describe how this configuration looks like for STACKIT and provide an example `CloudProfile` manifest with minimal configuration that you can use to allow creating STACKIT shoot clusters.

## `CloudProfileConfig`

The cloud profile configuration contains information about the real machine image IDs in the STACKIT environment (image names/IDs).
You have to map every version that you specify in `.spec.machineImages[].versions` here such that the STACKIT extension knows the image ID for every version you want to offer.

It also contains optional default values for DNS servers that shall be used for shoots.

### `machineImages`

The `machineImages` field maps the machine images declared in `.spec.machineImages` of the `CloudProfile` to region-specific image IDs.

With `spec.machineCapabilities` in the `CloudProfile` (available since Gardener *v1.131.0*), map every `capabilityFlavor` of `.spec.machineImages[].versions` to a corresponding `capabilityFlavors` entry in the `CloudProfileConfig`. Each entry groups region-specific image IDs under a set of `capabilities` (e.g., `architecture`):

```yaml
apiVersion: stackit.provider.extensions.gardener.cloud/v1alpha1
kind: CloudProfileConfig
machineImages:
  - name: ubuntu
    versions:
      - version: "22.04"
        capabilityFlavors:
          - capabilities:
              architecture: [amd64]
            regions:
              - name: eu01
                id: <image-id>
          - capabilities:
              architecture: [arm64]
            regions:
              - name: eu01
                id: <image-id>
```

If `spec.machineCapabilities` is not used, the legacy `architectures` field in `.spec.machineImages[].versions` is used instead. In that case, region-specific image IDs are mapped using the `regions` field, with an optional `architecture` field per region entry specifying the CPU architecture (defaults to `amd64`):

```yaml
apiVersion: stackit.provider.extensions.gardener.cloud/v1alpha1
kind: CloudProfileConfig
machineImages:
  - name: ubuntu
    versions:
      - version: "22.04"
        regions:
          - name: eu01
            id: <image-id>
            architecture: amd64
```

An optional `image` field at the version level can be used as a fallback (image name) if no region mapping is found. This fallback only works for the `amd64` architecture and is strongly discouraged; prefer explicit image IDs.

### `dnsServers`

In the `dnsServers[]` list you can specify IP addresses that are used as DNS configuration for created shoot networks.

### `rescanBlockStorageOnResize`

The `rescanBlockStorageOnResize` field specifies whether the storage plugin scans and checks the new block device size before it resizes the filesystem.

### `storageClasses`

The `storageClasses` field enables the creation of Kubernetes `StorageClass`es for shoots. Each entry can define a `name`, whether it is `default`, `parameters`, `annotations`, `labels`, `reclaimPolicy`, and `volumeBindingMode`. The provisioner is set automatically by the extension to `block-storage.csi.stackit.cloud` (the STACKIT CSI driver).

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: CloudProfile
metadata:
  name: stackit
spec:
  storageClasses:
    - name: default
      default: true
      parameters:
        type: "storage_premium_perf4"
```

### `bastion`

The `bastion.rootDiskSize` field allows adjusting the root disk size of the bastion server. It defaults to `25`.

## Example `CloudProfile` manifest

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: CloudProfile
metadata:
  name: stackit
spec:
  machineCapabilities:
    - name: architecture
      values: [amd64, arm64]
  type: stackit
  kubernetes:
    versions:
      - version: 1.33.0
  machineImages:
    - name: ubuntu
      versions:
        - version: "22.04"
          capabilityFlavors:
            - architecture: [amd64]
            - architecture: [arm64]
  machineTypes:
    - name: <machine-type>
      cpu: "4"
      gpu: "0"
      memory: 8Gi
      capabilities:
        architecture: [amd64]
      storage:
        type: storage_premium_perf4
        size: 40Gi
  regions:
    - name: eu01
      zones:
        - name: eu01-1
  providerConfig:
    apiVersion: stackit.provider.extensions.gardener.cloud/v1alpha1
    kind: CloudProfileConfig
    machineImages:
      - name: ubuntu
        versions:
          - version: "22.04"
            capabilityFlavors:
              - capabilities:
                  architecture: [amd64]
                regions:
                  - name: eu01
                    id: <image-id>
              - capabilities:
                  architecture: [arm64]
                regions:
                  - name: eu01
                    id: <image-id>
    dnsServers:
      - 1.1.1.1
    rescanBlockStorageOnResize: true
    storageClasses:
      - name: default
        default: true
        parameters:
          type: "storage_premium_perf4"
    bastion:
      rootDiskSize: 25
```

## DNS records

The extension supports the `DNSRecord` resource of type `stackit`. An example looks as follows:

```yaml
apiVersion: extensions.gardener.cloud/v1alpha1
kind: DNSRecord
metadata:
  name: dnsrecord-external
  namespace: shoot--foobar--stackit
spec:
  type: stackit
  secretRef:
    name: dnsrecord-external
    namespace: shoot--foobar--stackit
  name: api.example.foobar.shoot.example.com
  recordType: A # Use A, CNAME, or TXT
  values: # list of IP addresses for A records, a single hostname for CNAME records, or a list of texts for TXT records.
    - 1.2.3.4
  # zone: some-zone-uuid
  # ttl: 120
```

The referenced `Secret` contains the same `project-id` and `serviceaccount.json` fields as the [provider secret](/docs/extensions/infrastructure-extensions/gardener-extension-provider-stackit/usage/#provider-secret-data). If `zone` is not set, the extension looks up the matching hosted zone by listing the zones of the project and matching against the record name; the resolved zone ID is persisted in the `DNSRecord` status. The STACKIT DNS API is global, so the region is not used to select an endpoint. The `ttl` field defaults to `120` seconds and must be within the STACKIT-allowed range of `60` to `99999999` seconds.
