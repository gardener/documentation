---
github_repo: 'https://github.com/metal-stack/gardener-extension-csi-driver-lvm'
github_subdir: docs
params:
  github_branch: main
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/others/gardener-extension-csi-driver-lvm/migration.md
  to: migration.md
title: Migration
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
   https://github.com/metal-stack/gardener-extension-csi-driver-lvm/blob/main/docs/migration.md
-->


# Migration from csi-lvm to csi-driver-lvm

The migration from the deprecated [`csi-lvm`](https://github.com/metal-stack/csi-lvm) to the new `csi-driver-lvm` must be performed in multiple steps. In here we assume you are currently using the [gardener-extension-provider-metal](https://github.com/metal-stack/gardener-extension-provider-metal).

1. Add  the the `csi-driver-lvm` extension to the shoot spec.
1. Disable `csi-lvm` in `gardener-extension-provider-metal` by setting `featureGates.disableCsiLvm` to `true`. This allows the `csi-driver-lvm` to be installed.
1. Wait until the shoot has been successfully reconciled.
1. Make sure the `csi-driver-lvm` has been installed and that the `csi-lvm` storage class has been created.
1. Make sure to roll all nodes. Otherwise volumes will stop working after the next restart of a machine.

## Issues

### Why is the Drop-in replacement not possible?

Deploying the new csi-driver-lvm with the same provisioner-name as the old one is not possible, as it causes errors when using k8s sidecar images for controllers.

The provisioner name contains "/", which causes problems with node registrar directories (**metal-stack.io/csi-lvm**):

```sh
I1015 08:09:23.292306 1 node_register.go:53] Starting Registration Server at: /registration/metal-stack.io/csi-lvm-reg.sock

E1015 08:09:23.292482 1 node_register.go:56] failed to listen on socket: /registration/metal-stack.io/csi-lvm-reg.sock with error: listen unix /registration/metal-stack.io/csi-lvm-reg.sock: bind: no such file or directory
```

This problem requires a more complex migration.

## Manual migration
The migration solution so far has been tested manually:

1. create old controller & provisioner
1. create pvcs & pod
1. write files to volumes
1. delete old controller & provisioner
1. install new controller & provisioner with helm
1. add additional storage class with name `csi-lvm` and type linear
   1. mimics old storage class
   1. default storage class (not supported yet -> see default storage class of `gardener-extension-provider-metal`)
1. create new pvcs
1. create new pod with old and new pvcs and test
