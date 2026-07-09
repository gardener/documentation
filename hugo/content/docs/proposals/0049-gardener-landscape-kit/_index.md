---
github_repo: 'https://github.com/gardener/enhancements'
github_subdir: geps/0049-gardener-landscape-kit
params:
  github_branch: main
path_base_for_github_subdir:
  from: content/docs/proposals/0049-gardener-landscape-kit/README.md
  to: README.md
title: 0049 Gardener Landscape Kit
prev: false
next: false
managed: true
---

# GEP-0049: Gardener Landscape Kit

## Summary

The Gardener Landscape Kit (GLK, or `gardener-landscape-kit`) aims to deliver tools and best practices for managing Gardener, from small-size to large-scale landscapes.
It introduces a modular framework that **generates** resources for Gardener and well-known extensions, building on Kubernetes as the underlying deployment system.
With [Kubernetes](https://kubernetes.io/), [Flux](https://fluxcd.io/), [Kustomize](https://kubernetes.io/docs/tasks/manage-kubernetes-objects/kustomization/) and co., a wide range of widely accepted tools are utilized, enabling an efficient and extensible configuration management for operators.

## Motivation

While Gardener brings great abstraction and extensibility for managed Kubernetes clusters, it currently lacks a project addressing the setup routines and maintenance of such landscapes.
Gardener operators are required to implement configuration and landscape management themselves, leading not only to additional complexity for new-starters, but also to significant investments in enterprises.

GLK provides an important reference implementation for the community. Currently, every company using Gardener in production has its own deployment setup, which means changes in gardener-operator and related components must consider many different use cases and setups. By establishing best practices, common approaches, and recommendations through GLK, the community can move together more closely in these regards.

Previous attempts to address these needs were made in projects like [garden-setup](https://github.com/gardener-attic/garden-setup). These solutions typically built another abstraction layer and automation on top of Gardener, which proved unsustainable in the long run: they involved brittle upgrade procedures, supported only a fixed set of landscape configurations, and required significant ongoing maintenance effort from project developers.
In contrast, the Gardener Landscape Kit (GLK) works by exposing the involved Gardener APIs and resources directly to operators, rather than introducing a new abstraction layer. This approach promises more flexibility for landscape operators and less maintenance effort for developers.

### Goals

- Generate Kubernetes manifests for Gardener, well-known extensions and utility controllers.
- Apply GitOps principles for configuration management.
- Allow modifications to the Flux deployment configurations created by GLK, for instance by adding custom components or adjusting the deployment flow.
- Support update and migration scenarios for included components.
- Reduce implementation effort for components integrating into GLK.
- Optionally support manifest template processing through [OCM](https://ocm.software/), as the standard transport tool in [NeoNephos](https://neonephos.org/). Operators not using OCM can choose alternative mechanisms for image selection, transport, and overwrites.
- Maintaining a default, static vector of compatible component versions.
- Provide examples and documentation demonstrating best practices for promotion workflows across environments (e.g., base repository releases to landscape repositories).

### Non-Goals

- Serving a unified API (abstraction) for landscape management.
- Definition of a compatibility matrix for Gardener and extensions.
- Provide holistic default configuration.
- Building OCM component descriptors.
- Bootstrapping a Gardener landscape from scratch, i.e., a running Kubernetes cluster is required.

## Proposal

The Gardener Landscape Kit is an executable toolkit designed to generate and update Kubernetes manifests that, once deployed via Flux, establish a Gardener landscape. It is composed of the following core building blocks:

**Manifest Generation**

GLK generates Kubernetes manifests for Gardener and its extensions using a modular, component-based approach. Each component (e.g., `gardener-operator`, `garden`, `provider-xyz`) is responsible for producing/updating one or more manifests and may define dependencies on other components (see the [components chapter](#components) for more details). Operators can review and modify generated manifests, with manual changes preserved across subsequent generations. These manifests are intended to be managed in a Git repository, enabling GitOps workflows.

**OCI Image Resolution**

GLK automates the resolution and substitution of OCI image references (e.g., in `Helm` charts or `Extension` resources). It consults either an [OCM](https://ocm.software/) component descriptor or a default image vector maintained by GLK.
This ensures:
- **Consistent Deployments:** Operators can deploy Gardener and extensions with validated versions out of the box, without manual release management.
- **Image Transportation:** Validated deployments and images can be promoted across environments (e.g., `Dev` → `QA` → `Prod`).
- **Sovereign Cloud Support:** Required images can be mirrored to private registries for isolated or air-gapped environments.

**Deployment System**

GLK standardizes on [Flux](https://fluxcd.io/) as the primary deployment system, leveraging its strong GitOps support and Kubernetes-native design. GLK generates Flux based configuration to establish a seamless and automated deployment flow.
Further key benefits include:
- Native Kubernetes integration
- First-class GitOps workflows
- Built-in encryption support via [SOPS](https://fluxcd.io/flux/guides/mozilla-sops/) or [Sealed Secrets](https://fluxcd.io/flux/guides/sealed-secrets/)
- CNCF graduation and broad community adoption ([adopters](https://fluxcd.io/adopters/))
- Extensive documentation and support

![Gardener Landscape Kit diagram](/docs/proposals/0049-gardener-landscape-kit/glk-basics.svg)

### Notes/Constraints/Caveats

The Gardener Landscape Kit (GLK) is a standalone toolkit, not a Kubernetes controller, meaning it does not directly watch or reconcile cluster resources.
Its primary use cases are:

- **Local Execution**: For initial setup, such as onboarding a new landscape by generating manifests and initializing repositories.
- **Automated Execution**: For ongoing operations, GLK is designed to run in automated environments like CI/CD pipelines or Kubernetes `Job`s. This is the intended way to apply updates, adopt new GLK releases, and integrate new component versions.

To support these scenarios, GLK will provide reference workflows and best-practice configurations.

### Risks and Mitigations

At this point, there hasn't been identified any major risks.

## Design Details

The Gardener Landscape Kit is a standalone executable. Its primary subcommand, `generate`, creates the Kubernetes manifest files that operators commit to Git. These manifests are then automatically deployed to the target cluster(s) by Flux as part of a GitOps workflow.

### Repositories

Git repositories are an essential part for landscape and configuration management. In essence, the landscape kit differentiates between two types of repositories to foster reusability across landscapes:

- **Base Repository**: This repository contains the core landscape configurations, modules, and shared resources that are common across multiple landscapes.
- **Landscape Repository**: These repositories are specific to individual landscapes and typically contain overlay configurations that are merged with the ones found in the base repository.

> [!NOTE]
> GLK supports both organizational models: a separate repository per landscape (repo-per-landscape) or managing all landscapes in a single monorepo. The choice depends on the operator's preferences and existing organizational structure.

Also see the Kustomize [base and overlay documentation](https://kubernetes.io/docs/tasks/manage-kubernetes-objects/kustomization/#bases-and-overlays) for more information.

Technically, the Gardener Landscape Kit doesn't use Git directly, but prepares and operates on the directory structure of the filesystem.

### Components

**Definition**

In GLK, a component is responsible for generating a set of manifests for the `base` and/or `landscape` target repositories. These components often correspond to a Gardener sub-project, such as [`gardener/gardener`](https://github.com/gardener/gardener) or various extensions like [`gardener/gardener-extension-provider-openstack`](https://github.com/gardener/gardener-extension-provider-openstack).

To ensure a smooth deployment flow, a single conceptual component may be split into smaller ones to properly manage dependencies. For example, deploying the Gardener core involves two components:

- A `gardener-operator` component, which installs the Operator Helm chart.
- A `garden` component, which creates the Garden resource in the runtime cluster.

From a technical standpoint, each component implements the `component` interface shown below. GLK invokes the implementations, which are maintained in-tree within the GLK repository, when running the `generate base` or `generate landscape` commands.

```go
// Interface is the component's interface that each component must implement.
type Interface interface {
	// Name returns the component name.
	Name() string
	// GenerateBase generates the component base dir.
	GenerateBase(Options) error
	// GenerateLandscape generates the component landscape dir.
	GenerateLandscape(LandscapeOptions) error
}
```

During the generation of `base` or `landscape`, components can also manage migrations in two ways:
- **Manifest Modification**: By modifying existing manifests in the target repositories (e.g., when API changes require moving a value from a deprecated field to a new one).
- **In-Cluster Migration**: By emitting Kubernetes `Job`, or similar deployable manifests, that execute migration tasks in any cluster Flux has access to (typically virtual and runtime garden cluster).

> [!NOTE]
> Migration in this scope pertain to checked-in manifests, e.g. the [`OperatorConfiguration`](https://github.com/gardener/gardener/blob/master/example/operator/10-componentconfig.yaml), or if not checked-in, any unmanaged resources in the runtime cluster, such as a backup `Secret`.
> Any resources managed by Gardener or its extensions, such as control-plane `Deployment`s, are still expected to be migrated by their respective controllers during reconciliation or bootstrap processes (see [Gardenlet migration](https://github.com/gardener/gardener/blob/master/cmd/gardenlet/app/migration.go) for an example).

All generated manifests include basic configuration, reasonable defaults, and inline comments to help operators discover and understand available configuration options. GLK preserves any modifications made by operators through a three-way merge strategy. It maintains a copy of each originally generated manifest in a `.glk` system directory, enabling GLK to detect and merge operator changes with newly generated content. A configuration option allows operators to decide whether merge conflicts should be automatically resolved by preserving custom values, or whether conflicts should be marked in the file for manual resolution.

**Initial Scope**

The following components are part of the initial delivery scope:

| Component Name | Description |
| --- | --- |
| `flux` | Flux deployment and controller configuration ([Source controller](https://fluxcd.io/flux/components/source/), [Kustomize controller](https://fluxcd.io/flux/components/kustomize/), [Helm controller](https://fluxcd.io/flux/components/helm/)) |
| `gardener-operator` | [`HelmRelease`](https://fluxcd.io/flux/components/source/) for `gardener-operator` |
| `gardener-garden` | [`Kustomization`](https://fluxcd.io/flux/components/kustomize/kustomizations/) for `Garden` resource |
| `virtual-garden-access` | [`Kustomization`](https://fluxcd.io/flux/components/kustomize/kustomizations/) for generating a Kubeconfig for Flux for the virtual garden |
| `garden-config` | [`Kustomization`](https://fluxcd.io/flux/components/kustomize/kustomizations/) for resources applied to the virtual garden |
| `extension-networking-{calico,cilium}` | [`Kustomization`](https://fluxcd.io/flux/components/kustomize/kustomizations/) for networking `Extension` resources |
| `extension-os-{gardenlinux,suse-chost}` | [`Kustomization`](https://fluxcd.io/flux/components/kustomize/kustomizations/) for OS `Extension` resources |
| `extension-provider-{alicloud,azure,aws,gcp,openstack}` | [`Kustomization`](https://fluxcd.io/flux/components/kustomize/kustomizations/) for provider `Extension` resources |
| `extension-runtime-gvisor` | [`Kustomization`](https://fluxcd.io/flux/components/kustomize/kustomizations/) for runtime `Extension` resource |
| `extension-shoot-cert-service` | [`Kustomization`](https://fluxcd.io/flux/components/kustomize/kustomizations/) for certificate service `Extension` resource |
| `extension-shoot-dns-service` | [`Kustomization`](https://fluxcd.io/flux/components/kustomize/kustomizations/) for DNS service `Extension` resource |
| `extension-shoot-networking-problemdetector` | [`Kustomization`](https://fluxcd.io/flux/components/kustomize/kustomizations/) for network problem detector `Extension` resource |
| `extension-shoot-oidc-service` | [`Kustomization`](https://fluxcd.io/flux/components/kustomize/kustomizations/) for OIDC service `Extension` resource |

**Acceptance Criteria**

GLK should contain components of common interest for the community. Throughout the development of the project, this soft requirement must be redefined, such as:
- Component owners (maintainers of the respective Gardener sub-projects, such as `gardener/gardener` or extension repositories) are obliged to implement component updates and migrations.
- A test environment continuously verifies new component versions.
- Adding a new component must follow to be defined requirements of GLK; needs approval of GLK maintainers.

**Deployment Flow**

The following diagram illustrates the basic deployment flow established by the generated Flux manifests, primarily leveraging [`Kustomization`](https://fluxcd.io/flux/components/kustomize/api/v1/) and [`HelmRelease`](https://fluxcd.io/flux/components/helm/api/v2/) resources.

![Gardener Landscape Kit flow](/docs/proposals/0049-gardener-landscape-kit/glk-flow.svg)

### Versions and OCI References

A key feature of GLK is its ability to resolve version and OCI information for the manifests it generates. Landscape operators can choose from three resolution strategies:

- **Default Versions**: GLK can use the default OCI image references and component versions embedded in its release (see this [example](https://github.com/gardener/gardener-landscape-kit/blob/main/componentvector/components.yaml)). An optional `ReleaseBranch` update strategy instructs GLK to download the latest version information from its own release branch. This is useful for applying patch or minor component updates without needing a new GLK release. This strategy is intended to help getting started with Gardener and operate non-productive landscapes.

- **OCM Component Descriptors**: [OCM](https://ocm.software/) component descriptors can be used to let GLK resolve OCI references in generated manifests. In addition, this strategy may produce [image vector overwrites](/docs/gardener/deployment/image_vector/) and [image vector component overwrites](/docs/gardener/deployment/image_vector/#image-vectors-for-dependent-components) for Gardener and extensions. This is the recommended approach for productive landscapes that use OCM for releases and component transport.

- **Manual**: This strategy gives operators full control over GLK's version vector (see this [example](https://github.com/gardener/gardener-landscape-kit/blob/main/componentvector/components.yaml)). This allows using tools like [Renovate](https://github.com/renovatebot/renovate) to manage version updates according to a custom policy.

### Configuration API

A configuration file is required for GLK. Below is an excerpt of the planned API.

```yaml
apiVersion: config.glk.gardener.cloud/v1alpha1
kind: LandscapeKitConfiguration
# paths: # path information for GLK to generate manifests in the filesystem
#   base: ./base
#   landscape: ./
# git: # git repository information used for Flux source configuration
#   url: https://github.com/<org>/<repo>
#   ref:
#     branch: <branch-name>
# oci: # OCI repository information used for Flux source configuration - alternative to git
#   url: https://oci-registry.com/<org>/<repo>
# components: # Control of enabled and disabled components
#   exclude: # optional - to explicitly exclude components, otherwise none are excluded by default
#   - component-name
#   include: # optional - to explicitly include components, otherwise all are included by default
#   - component-name 
# ocm: # optional - to resolve OCI references with OCM information
#   repositories:
#   - <repo-url>
#   rootComponent:
#     name: <component-name>
#     version: <component-version>
# versionConfig: # optional - version information source when OCM is not used 
#   componentsVectorFile: ./versions.yaml
#   defaultVersionsUpdateStrategy: ReleaseBranch
```

## Drawbacks

The following drawbacks have been identified for the Gardener Landscape Kit:

- **Lack of Unified Landscape Abstraction**: GLK does not provide a unified abstraction layer for landscape management. As a result, operators must interact with the APIs of individual Gardener projects to understand the configuration and available options. This can increase the operational burden, especially for beginners. For instance, an abstraction layer might encapsulate and simplify DNS configuration for the entire landscape at a single place, whereas without this abstraction the configuration is scattered between multiple resources like `Garden`, `Extension`, `Seed`, etc.
- **Opinionated Structure May Limit Adoption**: The directory layout and component model enforced by GLK are opinionated and may not align with the structure of existing landscapes. This can make migration to GLK challenging or unattractive for operators with established setups.

## Alternatives

One alternative is to build a dedicated landscape operator that introduces an additional abstraction layer for managing Gardener landscapes. However, internal proof-of-concept work indicated that Gardener's existing abstractions are already sufficient for most use cases. Adding another layer would likely result in duplicated functionality and increased complexity for both developers and operators.

## Appendix

Parts of the Gardener Landscape Kit have already been implemented to PoC purposes - see [`gardener/gardener-landscape-kit`](https://github.com/gardener/gardener-landscape-kit).
