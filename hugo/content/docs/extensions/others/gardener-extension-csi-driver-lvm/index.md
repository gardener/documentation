---
description: >-
  Gardener extension controller which deploys the LVM CSI driver for shoot
  clusters.
github_repo: 'https://github.com/metal-stack/gardener-extension-csi-driver-lvm'
github_subdir: .
params:
  github_branch: main
path_base_for_github_subdir:
  from: content/docs/extensions/others/gardener-extension-csi-driver-lvm/_index.md
  to: README.md
title: csi-driver-lvm
weight: 50
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
   https://github.com/metal-stack/gardener-extension-csi-driver-lvm/blob/main/./README.md
-->


# gardener-extension-csi-driver-lvm

[![GitHub License](https://img.shields.io/github/license/metal-stack/gardener-extension-csi-driver-lvm)](https://github.com/metal-stack/gardener-extension-csi-driver-lvm/blob/main/LICENSE)
[![Build](https://github.com/metal-stack/gardener-extension-csi-driver-lvm/actions/workflows/build.yaml/badge.svg)](https://github.com/metal-stack/gardener-extension-csi-driver-lvm/actions/workflows/build.yaml)

[Project Gardener](https://gardener.cloud/) implements the automated management and operation of [Kubernetes](https://kubernetes.io/) clusters as a service. This controller implements Gardener's extension contract for providing **[csi-driver-lvm](https://github.com/metal-stack/csi-driver-lvm)** in a shoot cluster.

It reconciles the `Extension` resources of `type: csi-driver-lvm`.

For more detailed documentation about the extension contract, please refer to the [Gardener docs](/docs/gardener/extensions/).

As a safety measurement, the extension checks for the old [csi-lvm](https://github.com/metal-stack/csi-lvm/tree/master) and stops reconciling if the old driver is still available.

The following storage classes will be created by default:

- `csi-driver-lvm-linear` for linear volumes
- `csi-driver-lvm-mirror` for mirrored volumes for improved redundancy on multiple physical volumes
- `csi-driver-lvm-striped` for striped volumes for improved performance on multiple physical volumes
- `csi-lvm` for backwards compatibility with type linear.

When encryption is enabled (see below), three additional LUKS-encrypted storage classes are created:

- `csi-driver-lvm-linear-encrypted`
- `csi-driver-lvm-mirror-encrypted`
- `csi-driver-lvm-striped-encrypted`

See [docs/migration.md](/docs/extensions/others/gardener-extension-csi-driver-lvm/migration/) for further information about migrating from `csi-lvm` to `csi-driver-lvm`.

## Example

An example `ControllerRegistration` resource that can be used to register this controller to Gardener can be found [here](https://github.com/metal-stack/gardener-extension-csi-driver-lvm/blob/main/example/controller-registration.yaml).

## LUKS Encryption

LUKS block-device encryption can be enabled per shoot by adding an `encryption` field to the `providerConfig`. When set, the three encrypted storage classes above are created. Each class instructs the CSI node plugin to open the LUKS device using a key read from a Secret in the shoot cluster.

### Setup

1. Create the LUKS key Secret in the shoot cluster:
   
   ```sh
   kubectl -n <namespace> create secret generic csi-lvm-encryption-secret \
     --from-literal=passphrase="$(openssl rand -base64 32)"
   ```
   
   > **Important:** This Secret is part of your cluster's recovery data. Back it up securely. Losing it makes encrypted volumes permanently inaccessible.

1. Reference the Secret in the shoot's `providerConfig`:
   
   ```yaml
   extensions:
   - type: csi-driver-lvm
     providerConfig:
       apiVersion: csi-driver-lvm.metal.extensions.gardener.cloud/v1alpha1
       kind: CsiDriverLvmConfig
       devicePattern: /dev/nvme[0-9]n[0-9]
       hostWritePath: /etc/lvm
       encryption:
         secretRef:
           name: csi-lvm-encryption-secret
           namespace: <namespace>
   ```

1. Create a PVC using one of the encrypted storage classes:
   
   ```yaml
   apiVersion: v1
   kind: PersistentVolumeClaim
   metadata:
     name: my-encrypted-pvc
   spec:
     accessModes: [ReadWriteOnce]
     storageClassName: csi-driver-lvm-linear-encrypted
     resources:
       requests:
         storage: 10Gi
   ```

### Notes

- Both `secretRef.name` and `secretRef.namespace` are required when `encryption` is set; the extension will refuse to reconcile with either field empty.
- The Secret is user-owned and is not managed by the extension. It will not be deleted or overwritten during reconciliation.
- `StorageClass.parameters` are immutable in Kubernetes. If you need to change the secret reference, delete the encrypted storage classes manually and allow the extension to recreate them.
- Removing `encryption` from `providerConfig` deletes the encrypted storage classes but does **not** affect existing PVCs or the underlying LUKS devices.

## Development

This extension can be developed in the gardener-local devel environment. Before make sure you have created loop-devices on your machine (identical to how you would develop the csi-driver-lvm locally, refer to the repository [docs](https://github.com/metal-stack/csi-driver-lvm?tab=readme-ov-file#development) for further information).

```sh
for i in 100 101; do fallocate -l 1G loop${i}.img ; sudo losetup /dev/loop${i} loop${i}.img; done
sudo losetup -a
# use this for recreation or cleanup
# for i in 100 101; do sudo losetup -d /dev/loop${i}; rm -f loop${i}.img; done
```

1. Start up the local devel environment
1. The extension's docker image can be pushed into Kind using `make push-to-gardener-local`
1. Install the extension `kubectl apply -k example/`
1. Parametrize the `example/shoot.yaml` and apply with `kubectl -f example/shoot.yaml`

## Feedback and Support

Feedback and contributions are always welcome! Please report bugs or suggestions as [GitHub issues](https://github.com/metal-stack/gardener-extension-csi-driver-lvm/issues) or reach out to our [community](https://metal-stack.io/community).
