---
title: "Announcing cluster-api-provider-gardener: Manage Gardener Clusters with Cluster API"
linkTitle: "Announcing cluster-api-provider-gardener: Manage Gardener Clusters with Cluster API"
newsSubtitle: August 04, 2025
publishdate: 2025-08-04
authors:
  - avatar: https://avatars.githubusercontent.com/LucaBernstein
    login: LucaBernstein
    name: Luca Bernstein
  - avatar: https://avatars.githubusercontent.com/tobschli
    login: tobschli
    name: Tobias Schlicht
aliases: ["/blog/2025/08/04/announcing-cluster-api-provider-gardener"]
tags:
  - Cluster API
  - CAPI
  - GAPI
  - CAPGa
  - KCP
---

## Announcing cluster-api-provider-gardener: Manage Gardener Clusters with Cluster API

We're pleased to announce the release of [cluster-api-provider-gardener (CAPGa)](https://github.com/gardener/cluster-api-provider-gardener/), an open-source [Cluster API](https://cluster-api.sigs.k8s.io/) provider that leverages Gardener as the underlying platform for cluster lifecycle management.

<!-- truncate -->

### What is cluster-api-provider-gardener (CAPGa)?

CAPGa allows you to manage Kubernetes clusters using declarative `cluster.x-k8s.io` Cluster API manifests, with Gardener acting as the cloud-agnostic provider and cluster orchestrator.

Specifically, CAPGa implements the Cluster API's provider interfaces to manage Gardener's [Shoot clusters](https://gardener.cloud/about/) as Cluster API `Cluster` resources. This allows users to provision, update, and delete clusters managed by Gardener via standard Cluster API tooling and workflows.

The following figure illustrates the semantic bi-directional mapping of Cluster API (CAPI) resources to Gardener API (GAPI) resources and vice versa:

![Image showing the interaction of CAPI and Gardener through CAPGa](./static/capi-interaction-gardener-capga.svg)

### What is the difference between Gardener API and Cluster API?

Gardener and Cluster API both aim to automate Kubernetes cluster management, but they approach the problem from different directions and target different user groups.

#### Gardener API: Platform-first and top-down

Gardener is a top-down, platform-oriented solution designed to deliver homogeneous Kubernetes clusters across clouds as a service. It was built for application or service teams who require consistent, production-ready Kubernetes clusters without managing internal details.
- A single manifest defines an entire cluster (`Shoot`) with platform-specific defaults.
- Users benefit from a user experience layer, sensible defaults, and well-integrated extensions (e.g., DNS, worker pools, cloud-specific settings).
- Cluster lifecycle is abstracted: versioning, networking, and OS images are managed centrally.
- Clusters can be managed across multiple cloud providers simultaneously.

This setup is depicted in the following illustration, where the Gardener API is used to manage clusters as a service:

![Illustration: Gardener managed by service team](./static/gardener-managed.drawio.svg)

#### Cluster API: Infrastructure-centric and bottom-up

Cluster API (CAPI), by contrast, is a bottom-up framework for building cluster management solutions. It targets infrastructure teams who need fine-grained control over every component of a Kubernetes cluster and understand how to assemble them.
- A cluster is defined via multiple resource manifests (Cluster, MachineDeployment, KubeadmConfig, etc.).
- Each resource is reconciled by dedicated controllers.
- There is no opinionated user interface; users must understand the internals of Kubernetes cluster bootstrapping.
- It is powerful for building your own platform but requires substantial operational ownership.

This setup is illustrated below, where the end user manages the full lifecycle of the Cluster API management plane:

![Illustration: Cluster API self-managed](./static/user-managed-capi.drawio.svg)

> [!NOTE]  
> You can think of Gardener as a second evolutionary stage of Cluster API: more opinionated, more integrated, and focused on platform-level concerns.

### When to use which?

This brings us to the question of when to use `CAPI` and when to use `GAPI`.
The following table outlines some helpful criteria for your evaluation:

|                      | Cluster API                          | Gardener API                                  |
|----------------------|--------------------------------------|-----------------------------------------------|
| Target audience      | Infrastructure / platform engineers  | Application / service teams                   |
| Interface style      | Multiple manifests, component-driven | Single manifest, opinionated, platform-driven |
| Ownership            | End user manages infrastructure      | Platform team manages infrastructure          |
| Multi-cloud support  | Configure it yourself                | Built-in                                      |
| Lifecycle automation | Assemble from primitives             | Out-of-the-box automation                     |

#### Cluster API: Managed by End User

With a plain Cluster API setup, the end user owns and operates the full lifecycle of the management plane. This includes:
- Deploying and maintaining the Cluster API controllers.
- Managing the management cluster where CAPI runs.
- Handling upgrades, backups, and scaling of the management plane.
- Ensuring availability of all controller components and CRDs.
- Managing cloud credentials and secrets for the target clusters.

This approach offers maximum control and flexibility, but also maximum operational responsibility. It is suitable for teams with deep infrastructure expertise who need tailored setups or are building platforms themselves.

If Cluster API is used to build a Kubernetes-as-a-Service offering for end users, platform teams must create a secure abstraction layer on top of Cluster API. This ensures that end users do not directly access the management cluster or its components, but instead interact with a controlled interface that abstracts away the complexities of the underlying infrastructure.

#### Gardener API + CAPGa: Managed by Service Teams

GAPI and CAPI (with CAPGa) ultimately expose different API styles for the same Kubernetes-as-a-Service domain, while both are semantically congruent in using the Kubernetes Resource Model (KRM).
With modern developments built on top of generic Kubernetes control planes, such as [KCP](https://www.kcp.io/) with [Platform Mesh](https://documentation.apeirora.eu/best-practices/platform-mesh), platform teams can offer both APIs to end users in a secure manner (fully as-a-Service).
Like Gardener, the Kubernetes runtime with CAPGa and Cluster API can be hosted and operated by platform or service teams.
Only their KRM-based APIs are exposed to the end user.
As an end user:
- You do not need to provision or maintain a CAPI management cluster.
- You interact with a unified, shared API (Gardener + CAPI) exposed through KCP.
- The platform team ensures the control plane is available, secure, and up to date.
- You consume cluster lifecycle management as a service, focusing on cluster intents rather than the orchestration machinery.

This model significantly reduces the operational burden for the user and promotes standardization and governance, while still offering the flexibility of Cluster API resources and workflows.

> [!TIP]  
> Further information, especially on the concept of the platform mesh, maintaining a digital twin, and multi-planes, can be found in the [Apeiro documentation](https://documentation.apeirora.eu/best-practices/control-planes/crt).

### Why did we build CAPGa?

Gardener provides a powerful way to manage Kubernetes clusters at scale across many infrastructures. At the same time, Cluster API has become a widely adopted standard for cluster management. CAPGa bridges these two projects, giving users a way to manage Gardener clusters with Cluster API-compatible controllers and tools.

This unlocks several new use cases:
- Users familiar with CAPI tooling can now manage Gardener-based clusters.
- Integrators can incorporate Gardener into existing Cluster API-based workflows.
- Platform providers can gradually move towards a unified control plane, incorporating Gardener while still using familiar CAPI resources.
- CAPGa even enables bi-directional interaction between Gardener and Cluster API, allowing users to manage clusters through both APIs seamlessly.

### Key Features

- **Cluster API compatibility**: Use familiar Cluster API resources to create and manage Kubernetes clusters.
- **Retain Gardener benefits**: Leverage Gardener's support for various infrastructures, automatic version updates, hibernation, and much more.
- **KCP Support**: Integrated support for KCP, the [New Era of Multi-Tenant Control Planes](https://documentation.apeirora.eu/blog/2025/03/25/kcp-multi-tenant-control-planes).

### Demo

![demo](./static/demo.gif)

### Integrated KCP support

CAPGa comes with built-in [KCP](https://www.kcp.io/) support, allowing users to interact with a shared, multi-tenant control plane that is purpose-built for Kubernetes-like APIs beyond traditional container workloads.

The long-term goal is to support CAPGa within a centrally managed _Platform Mesh_ built on top of KCP. This approach eliminates the need for users to provision and operate a dedicated Kubernetes cluster solely to host their Cluster API components. At the same time, users can interact directly with the Gardener API through the same unified control plane, enabling flexible and consistent cluster lifecycle management across both interfaces. This scenario is also illustrated in the image below.

![Managing Gardener clusters through Platform Mesh using the Gardener API, Cluster API and KCP](./static/platform-mesh.drawio.svg)

### Contributing

We encourage anyone interested to try out CAPGa and share their experiences. If you encounter issues or have ideas for improvements, please open an issue or a pull request in the [GitHub repository](https://github.com/gardener/cluster-api-provider-gardener). Contributions are very welcome.
