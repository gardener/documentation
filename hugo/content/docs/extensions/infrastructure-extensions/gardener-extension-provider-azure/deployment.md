---
github_repo: 'https://github.com/gardener/gardener-extension-provider-azure'
github_subdir: docs/operations
params:
  github_branch: master
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/infrastructure-extensions/gardener-extension-provider-azure/deployment.md
  to: deployment.md
persona: Operators
title: Deployment
prev: false
next: false
managed: true
---

# Deployment of the Azure provider extension

**Disclaimer:** This document is NOT a step by step installation guide for the Azure provider extension and only contains some configuration specifics regarding the installation of different components via the helm charts residing in the Azure provider extension [repository](https://github.com/gardener/gardener-extension-provider-azure).

## gardener-extension-admission-azure

### Authentication against the Garden cluster
There are several authentication possibilities depending on whether or not [the concept of *Virtual Garden*](https://github.com/gardener/garden-setup#concept-the-virtual-cluster) is used.

#### *Virtual Garden* is not used, i.e., the `runtime` Garden cluster is also the `target` Garden cluster.

**Automounted Service Account Token**
The easiest way to deploy the `gardener-extension-admission-azure` component will be to not provide `kubeconfig` at all. This way in-cluster configuration and an automounted service account token will be used. The drawback of this approach is that the automounted token will not be automatically rotated.

#### *Virtual Garden* is used, i.e., the `runtime` Garden cluster is different from the `target` Garden cluster.

**Service Account**
The easiest way to setup the authentication will be to create a service account and the respective roles will be bound to this service account in the `target` cluster. Then use the generated service account token and craft a `kubeconfig` which will be used by the workload in the `runtime` cluster. This approach does not provide a solution for the rotation of the service account token. However, this setup can be achieved by setting `.Values.global.virtualGarden.enabled: true` and following these steps:

1. Deploy the `application` part of the charts in the `target` cluster.
1. Get the service account token and craft the `kubeconfig`.
1. Set the crafted `kubeconfig` and deploy the `runtime` part of the charts in the `runtime` cluster.

**Client Certificate**
Another solution will be to bind the roles in the `target` cluster to a `User` subject instead of a service account and use a client certificate for authentication. This approach does not provide a solution for the client certificate rotation. However, this setup can be achieved by setting both `.Values.global.virtualGarden.enabled: true` and `.Values.global.virtualGarden.user.name`, then following these steps:

1. Generate a client certificate for the `target` cluster for the respective user.
1. Deploy the `application` part of the charts in the `target` cluster.
1. Craft a `kubeconfig` using the already generated client certificate.
1. Set the crafted `kubeconfig` and deploy the `runtime` part of the charts in the `runtime` cluster.
