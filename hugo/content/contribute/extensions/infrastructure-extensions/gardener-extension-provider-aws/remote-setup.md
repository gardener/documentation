---
github_repo: 'https://github.com/gardener/gardener-extension-provider-aws'
github_subdir: docs/development
params:
  github_branch: master
path_base_for_github_subdir:
  from: >-
    content/contribute/extensions/infrastructure-extensions/gardener-extension-provider-aws/remote-setup.md
  to: remote-setup.md
persona: Developers
title: Remote Setup
prev: false
next: false
managed: true
---

# Remote Cluster Setup

This guide describes how to build and deploy the AWS provider extension to a remote Kubernetes cluster for development and testing.

## Prerequisites

A Gardener installation deployed remotely following the [Gardener Remote Setup Guide](https://gardener.cloud/docs/gardener/deployment/getting_started_remotely/)

**Important:** Ensure your `kubectl` context is set to the correct remote cluster before running any commands. The deployment process automatically detects the cluster's registry URL from the active kubeconfig.

## Building and Deploying

### Deploy Everything

To build Docker images, Helm charts, and deploy the extension in one command:

```bash
make deploy-remote
```

This will:
1. Build the provider and admission Docker images
1. Push images to the cluster's registry
1. Package the Helm charts
1. Push charts to the cluster's registry
1. Generate the extension manifest with correct registry references
1. Apply the extension to the cluster

### Individual Steps

You can also run individual steps:

```bash
# Build Docker images
make docker-images

# Push Docker images
make docker-push

# Build Helm charts
make helm-charts

# Push Helm charts
make helm-push

# Generate extension manifest
make extension-manifest

# Apply extension to cluster
make extension-apply
```

## Platform-Specific Notes

### ARM Macs (Apple Silicon)

When building on ARM Macs (M1/M2/M3), you must specify the target platform as `linux/amd64` since Kubernetes clusters typically run on AMD64 architecture:

```bash
TARGET_PLATFORMS=linux/amd64 make deploy-remote
```

Or for individual steps:

```bash
TARGET_PLATFORMS=linux/amd64 make docker-images
make docker-push helm-charts helm-push extension-manifest extension-apply
```

## Generated Artifacts

All build artifacts are placed in the `remote/` directory (gitignored):
- `remote/*.tgz` - Helm chart packages
- `remote/extension.yaml` - Generated extension manifest with registry URLs

## Registry Configuration

The deployment automatically derives the registry URL from your cluster's API server:
- API server: `api.example.shoot.dev.k8s-hana.ondemand.com`
- Registry: `reg.example.shoot.dev.k8s-hana.ondemand.com`

The extension manifest is configured to pull images using the `gardener-images` secret.
