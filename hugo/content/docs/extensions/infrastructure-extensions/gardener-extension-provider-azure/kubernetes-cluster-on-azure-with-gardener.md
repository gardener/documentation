---
category: Getting Started
github_repo: 'https://github.com/gardener/gardener-extension-provider-azure'
github_subdir: docs/usage
level: beginner
params:
  github_branch: master
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/infrastructure-extensions/gardener-extension-provider-azure/kubernetes-cluster-on-azure-with-gardener.md
  to: kubernetes-cluster-on-azure-with-gardener.md
persona: Users
scope: app-developer
title: Create a Kubernetes Cluster on Azure with Gardener
prev: false
next: false
managed: true
---

# Create a Kubernetes Cluster on Azure with Gardener

### Overview

Gardener allows you to create a Kubernetes cluster on different infrastructure providers. This tutorial will guide you through the process of creating a cluster on Azure.

### Prerequisites

- You have created an [Azure account](https://azure.microsoft.com/en-us/).
- You have access to the Gardener dashboard and have permissions to create projects.
- You have an Azure Service Principal assigned to your subscription.

### Steps

1. Go to the Gardener dashboard and create a *Project*.
   
    <img src="/docs/extensions/infrastructure-extensions/gardener-extension-provider-azure/images/new-gardener-project.png">

1. Get the properties of your Azure AD tenant, Subscription and Service Principal.
   
   Before you can provision and access a Kubernetes cluster on Azure, you need to add the Azure service principal, AD tenant and subscription credentials in Gardener.
   Gardener needs the credentials to provision and operate the Azure infrastructure for your Kubernetes cluster.
   
   **Ensure that the Azure service principal has the actions defined within the [Azure Permissions](https://github.com/gardener/gardener-extension-provider-azure/blob/master/usage/azure-permissions.md) within your Subscription assigned.
   If no fine-grained permission/actions are required, then simply the built-in `Contributor` role can be assigned.**
   
   - Tenant ID
     
     To find your `TenantID`, follow this [guide](https://learn.microsoft.com/en-us/azure/active-directory/fundamentals/how-to-find-tenant).
   
   - SubscriptionID
     
     To find your `SubscriptionID`, search for and select *Subscriptions*.
     <img src="/docs/extensions/infrastructure-extensions/gardener-extension-provider-azure/images/azure-select-subscription.png">
     
     After that, copy the `SubscriptionID` from your subscription of choice.
     <img src="/docs/extensions/infrastructure-extensions/gardener-extension-provider-azure/images/azure-choose-subscription.png">
   
   - Service Principal (SPN)
     
     A service principal consist of a `ClientID` (also called `ApplicationID`) and a Client Secret. For more information, see [Application and service principal objects in Azure Active Directory](https://docs.microsoft.com/en-us/azure/active-directory/develop/app-objects-and-service-principals). You need to obtain the:
     - Client ID
       
       Access the [Azure Portal](https://portal.azure.com) and navigate to the *Active Directory* service.
       Within the service navigate to *App registrations* and select your service principal. Copy the `ClientID` you see there.
     
     - Client Secret
       
       Secrets for the Azure Account/Service Principal can be generated/rotated via the Azure Portal.
       After copying your `ClientID`, in the *Detail* view of your Service Principal navigate to *Certificates & secrets*. In the section, you can generate a new secret.

1. Choose *Secrets*, then the plus icon <img src="/docs/extensions/infrastructure-extensions/gardener-extension-provider-azure/images/plus-icon.png"> and select *Azure*.
   
    <img src="/docs/extensions/infrastructure-extensions/gardener-extension-provider-azure/images/create-secret-azure.png">

1. Create your secret.
   
   1. Type the name of your secret.
   1. Copy and paste the `TenantID`, `SubscriptionID` and the Service Principal credentials (`ClientID` and `ClientSecret`).
   1. Choose *Add secret*.
      <img src="/docs/extensions/infrastructure-extensions/gardener-extension-provider-azure/images/add-azure-secret.png">
   
   > After completing these steps, you should see your newly created secret in the *Infrastructure Secrets* section.
   
    <img src="/docs/extensions/infrastructure-extensions/gardener-extension-provider-azure/images/secret-stored.png">

1. Register resource providers for your subscription.
   1. Go to your Azure dashboard
   1. Navigate to *Subscriptions* -> <your_subscription>
   1. Pick resource providers from the sidebar
   1. Register microsoft.Network
   1. Register microsoft.Compute

1. To create a new cluster, choose *Clusters* and then the plus sign in the upper right corner.
   
    <img src="/docs/extensions/infrastructure-extensions/gardener-extension-provider-azure/images/new-cluster.png">

1. In the *Create Cluster* section:
   1. Select *Azure* in the *Infrastructure* tab.
   1. Type the name of your cluster in the *Cluster Details* tab.
   1. Choose the secret you created before in the *Infrastructure Details* tab.
   1. Choose *Create*.
   
    <img src="/docs/extensions/infrastructure-extensions/gardener-extension-provider-azure/images/create-cluster.png">

1. Wait for your cluster to get created.
   
    <img src="/docs/extensions/infrastructure-extensions/gardener-extension-provider-azure/images/processing-cluster.png">

### Result

After completing the steps in this tutorial, you will be able to see and download the kubeconfig of your cluster.

  <img src="/docs/extensions/infrastructure-extensions/gardener-extension-provider-azure/images/copy-kubeconfig.png">
