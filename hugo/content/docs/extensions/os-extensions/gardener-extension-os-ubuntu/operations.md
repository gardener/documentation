---
github_repo: 'https://github.com/gardener/gardener-extension-os-ubuntu'
github_subdir: docs/operations
params:
  github_branch: master
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/os-extensions/gardener-extension-os-ubuntu/operations.md
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
   https://github.com/gardener/gardener-extension-os-ubuntu/blob/master/docs/operations/operations.md
-->


# Ubuntu Extension Configuration for Operators

This document describes the available configuration options and provides examples.

## Extension configuration

The configuration allows operators to customize how Ubuntu worker nodes are provisioned.

### Minimal configuration

When no `config` is provided (or it is empty), the extension uses sensible defaults:

- NTP daemon: `systemd-timesyncd`
- Unattended upgrades: enabled
- Default packages: `containerd`, `runc`, `socat`, `nfs-common`, `logrotate`, `jq`, `policykit-1` (all unpinned)
- No additional apt repositories
- Ubuntu default apt mirrors

### Full example

The following shows an `Extension` resource with a fully populated `config`:

```yaml
apiVersion: operator.gardener.cloud/v1alpha1
kind: Extension
metadata:
  name: os-ubuntu
spec:
  deployment:
    extension:
      helm:
        values:
          config:
            disableUnattendedUpgrades: true
            ntp:
              daemon: ntpd
              ntpd:
                servers:
                  - 0.pool.ntp.org
                  - 1.pool.ntp.org
                  - 2.pool.ntp.org
                  - 3.pool.ntp.org
                interfaces:
                  - enp1s0
                  - enp2s0
            aptRepositories:
              - name: docker
                uri: https://download.docker.com/linux/ubuntu
                key: |
                  -----BEGIN PGP PUBLIC KEY BLOCK-----
                  ...
                  -----END PGP PUBLIC KEY BLOCK-----
            dependencies:
              - name: containerd.io
                version: "1.7.29-1~ubuntu.22.04~jammy"
                ubuntuVersion: "22.04"
                hold: true
              - name: containerd.io
                version: "2.2.4-1~ubuntu.26.04~resolute"
                ubuntuVersion: "26.04"
                ubuntuBuildSerial: "20260713"
                hold: true
              - name: containerd.io
                version: "2.2.6-1~ubuntu.26.04~resolute"
                ubuntuVersion: "26.04"
                hold: true
              - name: socat
              - name: nfs-common
              - name: logrotate
              - name: jq
              - name: policykit-1
            apt:
              primary:
                - arches: [amd64]
                  uri: http://mirror.example.com/ubuntu/
                - arches: [arm64]
                  uri: http://mirror.example.com/ports/
```

## Configuration reference

### `disableUnattendedUpgrades`

| Type | Required | Default |
| --- | --- | --- |
| `bool` | no | `false` |

When set to `true`, the extension writes an `apt` configuration snippet (`/etc/apt/apt.conf.d/99-auto-upgrades.conf`) that disables `Unattended-Upgrade` on the node:

```plain
APT::Periodic::Unattended-Upgrade "0";
```

When `false` (the default), Ubuntu's default unattended upgrade behaviour is preserved.

### `ntp`

| Type | Required | Default |
| --- | --- | --- |
| `*NTPConfig` | no | `{ daemon: systemd-timesyncd }` |

Configures time synchronisation on the node.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `daemon` | `string` | yes | `systemd-timesyncd` | The NTP daemon to use. Must be one of `systemd-timesyncd` or `ntpd`. |
| `ntpd` | `*NTPDConfig` | no |  | Additional configuration. Only allowed when `daemon` is `ntpd`; setting it with `systemd-timesyncd` is rejected by validation. |

`NTPDConfig` fields:

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `servers` | `[]string` | yes |  | List of NTP server addresses. Must contain at least one entry. |
| `interfaces` | `[]string` | no |  | List of network interfaces for `ntpd` to bind to. |

Example:

```yaml
ntp:
  daemon: ntpd
  ntpd:
    servers:
      - 0.pool.ntp.org
      - 1.pool.ntp.org
    interfaces:
      - enp1s0
      - enp2s0
```

### `aptRepositories`

| Type | Required | Default |
| --- | --- | --- |
| `[]AptRepository` | no | `[]` |

A list of additional apt repositories configured on every Ubuntu worker node via cloud-init.
Each entry produces an `apt.sources` definition in the generated cloud-config.
Repository names must be unique across the list.

Every `AptRepository` has the following fields:

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `name` | `string` | yes |  | Unique identifier for the apt source. Used as the key in cloud-init's `apt.sources` map. Must be unique across all entries. Must match `^[a-zA-Z0-9][a-zA-Z0-9._-]*$` (alphanumeric, dots, underscores, hyphens). |
| `uri` | `string` | yes |  | Base URI of the apt repository (e.g. `https://download.docker.com/linux/ubuntu`). Must be a valid URL with scheme and host. |
| `key` | `string` | no | `""` | ASCII-armored GPG public key used to sign the repository's `Release` file. Mutually exclusive with `keyUrl`. If both `key` and `keyUrl` are empty, the repository is configured **without** GPG signature verification, which is strongly discouraged for production use. When provided, cloud-init writes the key to a file and references it via `signed-by=$KEY_FILE`. |
| `keyUrl` | `string` | no | `""` | URL to download the GPG key from. Mutually exclusive with `key`. When provided, cloud-init downloads the key via `write_files` to `/etc/apt/keyrings/<name>.<keyFormat>` and references it via `signed-by=/etc/apt/keyrings/<name>.<keyFormat>`. Must be a valid URL with scheme and host. |
| `keyFormat` | `string` | no | `"asc"` | Format of the GPG key served by `keyUrl`. Must match the key's content: `asc` for ASCII-armored keys (apt dearmors them) or `gpg` for binary keyrings. Only valid when `keyUrl` is set. |
| `suite` | `string` | no | `"$RELEASE"` | The apt suite/distribution. The literal `$RELEASE` is substituted by cloud-init with the release codename of the running Ubuntu version (e.g. `jammy`, `noble`). |
| `components` | `[]string` | no | `["stable"]` | List of apt components to enable for the repository. |

Example with inline GPG key:

```yaml
aptRepositories:
  - name: docker
    uri: https://download.docker.com/linux/ubuntu
    key: |
      -----BEGIN PGP PUBLIC KEY BLOCK-----
      ...
      -----END PGP PUBLIC KEY BLOCK-----
```

Example with GPG key URL (preferred for frequently rotated keys):

```yaml
aptRepositories:
  - name: docker
    uri: https://download.docker.com/linux/ubuntu
    keyUrl: https://download.docker.com/linux/ubuntu/gpg
    # keyFormat defaults to "asc" (ASCII-armored). Use "gpg" for binary keyrings.
    keyFormat: asc
```

When `aptRepositories` is empty (the default), no additional apt sources are added and only the default Ubuntu archives (or the custom mirror configured via `apt`) are used.

### `dependencies`

| Type | Required | Default |
| --- | --- | --- |
| `[]DependencyConfig` | no | default package set |

A list of apt packages to install on every Ubuntu worker node.
Each entry describes one package, optionally pinned to a specific Ubuntu version and/or build serial.

If `dependencies` is omitted entirely (i.e. not present in the config), the extension installs the following default unpinned set:

```plain
containerd, runc, socat, nfs-common, logrotate, jq, policykit-1
```

If `dependencies` is explicitly set (even to an empty list), the default set is **not** installed.
Any packages from the default set that are still needed must be listed explicitly — as shown in the full example above, where `socat`, `nfs-common`, `logrotate`, `jq`, and `policykit-1` are listed alongside the pinned `containerd.io`.

Every `DependencyConfig` has the following fields:

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `name` | `string` | yes |  | Name of the apt package. Must match `^[a-z0-9][a-z0-9.+-]+$`. |
| `version` | `string` | no | `""` (latest available) | Exact apt package version to install (e.g. `1.7.29-1~ubuntu.22.04~jammy`). If empty, the latest available version is installed. |
| `ubuntuVersion` | `string` | no | `""` (matches all) | Restricts this dependency to a specific Ubuntu version. The value is matched against `VERSION_ID` from `/etc/os-release` (e.g. `22.04`, `24.04`, `26.04`). Must match `^[0-9]+\.[0-9]+$`. |
| `ubuntuBuildSerial` | `string` | no | `""` (matches all) | Restricts this dependency to a specific Ubuntu image build serial. The value is matched against the `serial` field in `/etc/cloud/build.info` (e.g. `20260713`). Must be numeric (digits and dots). |
| `hold` | `bool` | no | `false` | When `true`, the package is placed on `apt-mark hold` after installation so that subsequent `apt upgrade` runs do not update it. |

#### Matching semantics

When a dependency specifies `ubuntuVersion` and/or `ubuntuBuildSerial`, the generated provisioning script evaluates entries at boot time:

- Each pinned entry is checked against the node's actual Ubuntu version (from `/etc/os-release`) and build serial (from `/etc/cloud/build.info`).
- The **first** matching entry is installed with its specified `version` and `hold` setting.
- If no pinned entry matches, the script falls back to installing the package without a version pin **if** an unpinned entry (no `ubuntuVersion` and no `ubuntuBuildSerial`) for the same package name exists in the list.
- If neither a matching pin nor an unpinned fallback exists, the script prints an error to `stderr` and continues.

This behavior makes it possible to pin a package to specific image builds while providing a safe fallback for unknown images.

#### Example: pinning `containerd.io` per Ubuntu version

The following snippet installs a pinned version of `containerd.io` on Ubuntu 22.04 and 26.04, while falling back to the latest available version on any other Ubuntu release.

To use version pinning, you must install the `containerd.io` package rather than Ubuntu's default `containerd` package. Unlike upstream Ubuntu repositories, which only host the most recent release, Docker's repositories maintain multiple versions in parallel.

Note: Ensure you have configured the official Docker APT repository before proceeding, as demonstrated in the full example.

```yaml
dependencies:
  - name: containerd.io
    version: "1.7.29-1~ubuntu.22.04~jammy"
    ubuntuVersion: "22.04"
    hold: true
  - name: containerd.io
    version: "2.2.6-1~ubuntu.26.04~resolute"
    ubuntuVersion: "26.04"
    hold: true
  - name: containerd.io
```

#### Example: pinning to a specific image build

To pin a package to a specific combination of Ubuntu version and build serial:

```yaml
dependencies:
  - name: containerd.io
    version: "2.2.6-1~ubuntu.26.04~resolute"
    ubuntuVersion: "26.04"
    ubuntuBuildSerial: "20260713"
    hold: true
  - name: containerd.io
    version: "2.3.0-1~ubuntu.26.04~resolute"
    ubuntuVersion: "26.04"
    ubuntuBuildSerial: "20260812"
    hold: true
  - name: containerd.io
    version: "2.3.0-1~ubuntu.26.04~resolute"
    ubuntuVersion: "26.04"
    hold: true
```

Pinning on the buildSerial is especially useful to roll out package updates safely during Shoot maintenance windows.

To leverage this, your Gardener `CloudProfile` must be configured to expose multiple Machine Image versions simultaneously. By managing different OS image builds (which have distinct build serials) under different lifecycle classifications (`preview`, `supported` or `deprecated`) you can safely stage package updates.

In this example:

1. Shoots running the older supported OS image (serial `20260713`) remain safely pinned to `containerd.io` in version `2.2.6`
1. A newer OS image (serial `20260812`) added to the `CloudProfile` with the preview classification receives the minor update to `containerd.io` in version `2.3.0`
1. Any other unpinned 26.04 image falls back to the broader `2.3.0` rule at the bottom

When a Shoot is updated to the newer preview machine image during its maintenance window, the package version update rolls out alongside it without affecting existing clusters.

Note: Entries are evaluated in order from top to bottom. Because of this, more specific pins (like those containing a buildSerial) must appear before broader ones.

#### Example: supplementing the default packages

When overriding `dependencies` to pin `containerd.io`, the remaining default packages must be listed explicitly if they are still needed:

```yaml
dependencies:
  - name: containerd.io
    version: "1.7.29-1~ubuntu.22.04~jammy"
    ubuntuVersion: "22.04"
    hold: true
  - name: containerd.io
    version: "2.2.6-1~ubuntu.26.04~resolute"
    ubuntuVersion: "26.04"
    hold: true
  - name: socat
  - name: nfs-common
  - name: logrotate
  - name: jq
  - name: policykit-1
```

### `apt` (custom mirror)

| Type | Required | Default |
| --- | --- | --- |
| `*APTConfig` | no | Ubuntu default mirrors |

Configures custom Ubuntu apt mirrors.
When set, the generated cloud-config replaces the default `sources.list` with the provided `primary` and `security` archives.

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `preserveSourcesList` | `bool` | no | `false` | When `false`, the default `sources.list` is overwritten. When `true`, the default sources are kept and the custom archives are added on top. |
| `primary` | `[]APTArchive` | no |  | List of primary archive mirrors. |
| `security` | `[]APTArchive` | no |  | List of security archive mirrors. |

Each `APTArchive` has the following fields:

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `arches` | `[]Architecture` | no |  | CPU architectures this archive serves. Allowed values: `amd64`, `arm64`, `default`. |
| `uri` | `string` | no |  | URI of the archive. Must be a valid URL with scheme and host. |
| `search` | `[]string` | no |  | Ordered list of mirror URIs to try before falling back to `uri`. Each entry must be a valid URL. |
| `searchDNS` | `bool` | no | `false` | When `true`, cloud-init attempts DNS SRV record lookup to find mirrors. |

#### Example: architecture-specific mirrors

It is common to serve Ubuntu packages from different paths depending on the CPU architecture.
The following configures separate mirrors for `amd64` and `arm64`:

```yaml
apt:
  primary:
    - arches: [amd64]
      uri: http://mirror.example.com/ubuntu/
    - arches: [arm64]
      uri: http://mirror.example.com/ports/
```
