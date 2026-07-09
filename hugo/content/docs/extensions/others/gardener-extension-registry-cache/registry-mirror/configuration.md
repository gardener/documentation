---
description: >-
  Learn what is the use-case for a registry mirror, how to enable and configure
  it
github_repo: 'https://github.com/gardener/gardener-extension-registry-cache'
github_subdir: docs/usage/registry-mirror
params:
  github_branch: main
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/others/gardener-extension-registry-cache/registry-mirror/configuration.md
  to: configuration.md
persona: Users
title: Configuring the Registry Mirror Extension
prev: false
next: false
managed: true
---

# Configuring the Registry Mirror Extension

## Introduction

### Use Case

containerd allows registry mirrors to be configured. Use cases are:
- Usage of public mirror(s) - for example, circumvent issues with the upstream registry such as rate limiting, outages, and others.
- Usage of private mirror(s) - for example, reduce network costs by using a private mirror running in the same network.

### Solution

The registry-mirror extension allows the registry mirror configuration to be configured via the Shoot spec directly.

### How does it work?

When the extension is enabled, the containerd daemon on the Shoot cluster Nodes gets configured to use the requested mirrors as a mirror. For example, if for the upstream `docker.io` the mirror `https://mirror.gcr.io` is configured in the Shoot spec, then containerd gets configured to first pull the image from the mirror (`https://mirror.gcr.io` in that case). If this image pull operation fails, containerd falls back to the upstream itself (`docker.io` in that case).

The extension is based on the contract described in [`containerd` Registry Configuration](/docs/gardener/advanced/containerd-registry-configuration/). The corresponding upstream documentation in containerd is [Registry Configuration - Introduction](https://github.com/containerd/containerd/blob/v2.2.0//docs/hosts.md).

## Shoot Configuration

The Shoot specification has to be adapted to include the `registry-mirror` extension configuration.

Below is an example of `registry-mirror` extension configuration as part of the Shoot spec:

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: Shoot
metadata:
  name: crazy-botany
  namespace: garden-dev
spec:
  extensions:
  - type: registry-mirror
    providerConfig:
      apiVersion: mirror.extensions.gardener.cloud/v1alpha1
      kind: MirrorConfig
      mirrors:
      - upstream: docker.io
        hosts:
        - host: "https://mirror.gcr.io"
          capabilities: ["pull"]
      - upstream: quay.io
        hosts:
        - host: "https://private-mirror.internal"
          caBundleSecretReferenceName: private-mirror-ca-bundle
      - upstream: registry.k8s.io
        hosts:
        - host: "https://harbor.example.com/v2/k8s"
          capabilities: ["pull", "resolve"]
          overridePath: true
  # ...
  resources:
  - name: private-mirror-ca-bundle
    resourceRef:
      apiVersion: v1
      kind: Secret
      name: private-mirror-ca-bundle-v1
```

The `providerConfig` field is required.

The `providerConfig.mirrors` field contains information about the registry mirrors to configure. It is a required field. At least one mirror has to be specified.

The `providerConfig.mirrors[].upstream` field is the remote registry host to mirror. It is a required field.
The value must be a valid DNS subdomain (RFC 1123) and optionally a port (i.e. `<host>[:<port>]`). It must not include a scheme.

The `providerConfig.mirrors[].hosts` field represents the mirror hosts to be used for the upstream. At least one mirror host has to be specified.

The `providerConfig.mirrors[].hosts[].host` field is the mirror host. It is a required field.
The value must include a scheme - `http://` or `https://`.

The `providerConfig.mirrors[].hosts[].capabilities` field represents the operations a host is capable of performing. This also represents the set of operations for which the mirror host may be trusted to perform. Defaults to `["pull"]`. The supported values are `pull` and `resolve`.
See the [capabilities field documentation](https://github.com/containerd/containerd/blob/v2.2.0/docs/hosts.md#capabilities-field) for more information on which operations are considered trusted ones against public/private mirrors.

The `providerConfig.mirrors[].hosts[].caBundleSecretReferenceName` field is reference name for a Secret containing a PEM-encoded certificate authority bundle. The CA bundle is used to verify the TLS certificate of the mirror host. For more details, see [How to provide a certificate authority bundle for a private mirror?](/docs/extensions/others/gardener-extension-registry-cache/registry-mirror/ca-bundle-for-private-mirror/).

The `providerConfig.mirrors[].hosts[].overridePath` field represent the `override_path` field in the [hosts.toml](https://github.com/containerd/containerd/blob/v2.2.0/docs/hosts.md#override_path-field) file for containerd registry configuration. Should be set to `true` only for non-compliant OCI registries which are missing the `/v2` prefix, and the API root endpoint is defined in the host URL path (e.g. `https://harbor.example.com/v2/k8s`). If not set, the `override_path` field defaults to `false` in containerd registry configuration.
