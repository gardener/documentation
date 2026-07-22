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

## Disabled OS services

During node provisioning, this extension disables and removes the following Flatcar/CoreOS components, as they are not needed in a Gardener-managed cluster:

- **Docker**: Only `containerd` is used as the container runtime. The Flatcar docker sysext image is removed by linking `/etc/extensions/docker-flatcar.raw` to `/dev/null`, so it is not loaded at boot.
- **update-engine**: Automatic OS updates are not desired, since node updates are managed by Gardener (e.g. via machine image version updates). The unit is masked by linking `/etc/systemd/system/update-engine.service` to `/dev/null`.
- **locksmithd**: The reboot manager for update-engine is not needed without automatic OS updates. The unit is masked by linking `/etc/systemd/system/locksmithd.service` to `/dev/null`.
- **systemd-sysupdate**: The newer systemd-based update mechanism would periodically check for updates and even reboot the node automatically. Both `systemd-sysupdate.timer` and `systemd-sysupdate-reboot.timer` are masked by linking them to `/dev/null` under `/etc/systemd/system/`.

Note that simply disabling these units would not be sufficient: Flatcar ships vendor "wants" symlinks under the read-only `/usr/lib/systemd/system` hierarchy, which pull the units in on every boot regardless of their enablement state. Masking via `/etc` (which takes precedence over `/usr`) is reboot-safe.

## AWS VPC settings for CoreOS workers

Gardener allows you to create CoreOS based worker nodes by:
1. Using a Gardener managed VPC
1. Reusing a VPC that already exists (VPC `id` specified in [InfrastructureConfig](/docs/extensions/infrastructure-extensions/gardener-extension-provider-aws/usage/#infrastructureconfig)]

If the second option applies to your use-case please make sure that your VPC has enabled **DNS Support**. Otherwise CoreOS based nodes aren't able to join or operate in your cluster properly.

**[DNS](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-dns.html)** settings (required):

- `enableDnsHostnames`: true (necessary for collecting [node metrics](https://kubernetes.io/docs/tasks/debug-application-cluster/resource-metrics-pipeline/))
- `enableDnsSupport`: true
