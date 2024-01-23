---
title: Gardener Projects
weight: 3
---

## Overview

![](./images/overview.png)

Gardener is all about Kubernetes clusters, which we call shoots. However, Gardener also does user management, delicate permission management and offers technical accounts to integrate its services into other infrastructures. It allows you to create several quotas and it needs credentials to connect to cloud providers. All of these are arranged in multiple fully contained projects, each of which belongs to a dedicated user and / or group.

## Projects on YAML Level

Projects are a Kubernetes resource which can be expressed by YAML. The resource specification can be found in the [API reference documentation](https://github.com/gardener/gardener/blob/master/docs/api-reference/core.md/#core.gardener.cloud/v1beta1.Project).

A project's specification defines a name, a description (which is a free-text field), a purpose (again, a free-text field), an owner, and members. In Gardener, user management is done on a project level. Therefore, projects can have different members with certain roles.

In Gardener, a user can have one of five different roles: `owner`, `admin`, `viewer`, `UAM`, and `service account manager`. A member with the `viewer` role can see and list all clusters but cannot create, delete or modify them. For that, a member would need the `admin` role. Another important role would be the `uam` role - members with that role are allowed to manage members and technical users for a project. The `owner` of a project is allowed to do all of that, regardless of what other roles might be assigned to him.

Projects are getting reconciled by Gardener's project-controller, a component of Gardener's controller manager. The status of the last reconcilation, along with any potential failures, will be recorded in the project's `status` field.

For more information, see [Projects](https://github.com/gardener/gardener/blob/master/docs/usage/projects.md).

In case you are interested, you can also view the source code for:
- [The structure of a project API object](https://github.com/gardener/gardener/blob/master/pkg/apis/core/types_project.go) 
- [Reconciling a project](https://github.com/gardener/gardener/blob/master/pkg/controllermanager/controller/project/project/reconciler.go)

## Gardener Projects and Kubernetes Namespaces

{{% alert color="info"  title="Note" %}}
Each Gardener project corresponds to a Kubernetes namespace and all project specific resources are placed into it.
{{% /alert %}}

Even though projects are a dedicated Kubernetes resource, every project also corresponds to a dedicated namespace in the garden cluster. All project resources - including shoots - are placed into this namespace. 

You can ask Gardener to use a specific namespace name in the project manifest but usually, this field should be left empty. The namespace then gets created automatically by Gardener's project-controller, with its name getting generated from the project's name, prefixed by "garden-".

ResourceQuotas - if any - will be enforced on the project namespace.

{{% alert color="info"  title="Quotas" %}}
Since all Gardener resources are custom Kubernetes resources, the usual and well established concept of `resourceQuotas` in Kubernetes can also be applied to Gardener resources. With a `resourceQuota` that sets a hard limit on (e.g., `count/shoots.core.gardener.cloud`) you can restrict the number of shoot clusters that can be created in a project.
{{% /alert %}}

## Infrastructure Secrets

For Gardener to create all relevant infrastructure that a shoot cluster needs inside a cloud provider, it needs to know how to authenticate to the cloud provider's API. This is done through regular secrets.

![](./images/secret.png)

Through the Gardener dashboard, secrets can be created for each supported cloud provider (using the dashboard is the preferred way, as it provides interactive help on what information needs to be placed into the secret and how the corresponding user account on the cloud provider should be configured). All of that is stored in a standard, opaque Kubernetes secret.

Inside of a shoot manifest, a reference to that secret is given so that Gardener knows which secret to use for a given shoot. Consequently, different shoots, even though they are in the same project, can be created on multiple different cloud provider accounts. However, instead of referring to the secret directly, Gardener introduces another layer of indirection called a SecretBinding. 

In the shoot manifest, we refer to a SecretBinding and the SecretBinding in turn refers to the actual secret.

## SecretBindings

![](./images/secretbindings.png)

With SecretBindings, it is possible to reference the same infrastructure secret in different projects across namespaces. This has the following advantages:​
- Infrastructure secrets can be kept in one project (and thus namespace) with limited access. Through SecretsBindings, the secrets can be used in other projects (and thus namespaces) without being able to read their contents.​
- Infrastructure secrets can be kept at one central place (a dedicated project) and be used by many other projects. This way, if a credential rotation is required, they only need to be changed in the secrets at that central place and not in all projects that reference them.

## Service Accounts

![](./images/service-account.png)

Since Gardener is 100% Kubernetes, it can be easily used in a programmatic way - by just sending the resource manifest of a Gardener resource to its API server. To do so, a kubeconfig file and a (technical) user that the kubeconfig maps to are required.

Next to project members, a project can have several service accounts - simple Kubernetes service accounts that are created in a project's namespace. Consequently, every service account will also have its own, dedicated kubeconfig and they can be granted different roles through RoleBindings.

To integrate Gardener with other infrastructure or CI/CD platforms, one can create a service account, obtain its kubeconfig and then automatically send shoot manifests to the Gardener API server. With that, Kubernetes clusters can be created, modified or deleted on the fly whenever they are needed.