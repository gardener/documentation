---
category: Getting Started
github_repo: 'https://github.com/gardener/gardener-extension-provider-alicloud'
github_subdir: docs/usage
level: beginner
params:
  github_branch: master
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/infrastructure-extensions/gardener-extension-provider-alicloud/kubernetes-cluster-on-alicloud-with-gardener.md
  to: kubernetes-cluster-on-alicloud-with-gardener.md
persona: Users
scope: app-developer
title: Create a Kubernetes Cluster on Alibaba Cloud with Gardener
prev: false
next: false
managed: true
---

# Create a Kubernetes Cluster on Alibaba Cloud with Gardener

### Overview

Gardener allows you to create a Kubernetes cluster on different infrastructure providers. This tutorial will guide you through the process of creating a cluster on Alibaba Cloud.

### Prerequisites

- You have created an [Alibaba Cloud account](https://www.alibabacloud.com).
- You have access to the Gardener dashboard and have permissions to create projects.

### Steps

1. Go to the Gardener dashboard and create a project.
   
     <img src="/docs/extensions/infrastructure-extensions/gardener-extension-provider-alicloud/images/new-gardener-project.png">
   
   > To be able to add shoot clusters to this project, you must first create a technical user on Alibaba Cloud with sufficient permissions.

1. Choose *Secrets*, then the plus icon <img src="/docs/extensions/infrastructure-extensions/gardener-extension-provider-alicloud/images/plus-icon.png"> and select *AliCloud*.
   
    <img src="/docs/extensions/infrastructure-extensions/gardener-extension-provider-alicloud/images/alicloud-create-secret.png">

1. To copy the policy for Alibaba Cloud from the Gardener dashboard, click on the help icon <img src="/docs/extensions/infrastructure-extensions/gardener-extension-provider-alicloud/images/help-icon.png"> for Alibaba Cloud secrets, and choose copy <img src="/docs/extensions/infrastructure-extensions/gardener-extension-provider-alicloud/images/copy-icon.png">.
   
    <img src="/docs/extensions/infrastructure-extensions/gardener-extension-provider-alicloud/images/alicloud-copy-policy.png">

1. Create a custom policy in Alibaba Cloud:
   1. Log on to your Alibaba account and choose *RAM* \> *Permissions* \> *Policies*.
      
        <img src="/docs/extensions/infrastructure-extensions/gardener-extension-provider-alicloud/images/alicloud-create-policy.png">
   
   1. Enter the name of your policy.
   1. Select `Script`.
   1. Paste the policy that you copied from the Gardener dashboard to this custom policy.
   1. Choose *OK*.
      
        <img src="/docs/extensions/infrastructure-extensions/gardener-extension-provider-alicloud/images/alicloud-paste-policy.png">

1. In the Alibaba Cloud console, create a new technical user:
   1. Choose *RAM* \> *Users*.
   1. Choose *Create User*.
      
        <img src="/docs/extensions/infrastructure-extensions/gardener-extension-provider-alicloud/images/alicloud-create-user.png">
   
   1. Enter a logon and display name for your user.
   1. Select *Open API Access*.
   1. Choose *OK*.
      
        <img src="/docs/extensions/infrastructure-extensions/gardener-extension-provider-alicloud/images/alicloud-input-user.png">
   
   > After the user is created, `AccessKeyId` and `AccessKeySecret` are generated and displayed. Remember to save them. The `AccessKey` is used later to create secrets for Gardener.
   
     <img src="/docs/extensions/infrastructure-extensions/gardener-extension-provider-alicloud/images/alicloud-user-created.png">

1. Assign the policy you created to the technical user:
   1. Choose *RAM* \> *Permissions* \> *Grants*.
   1. Choose *Grant Permission*.
      
        <img src="/docs/extensions/infrastructure-extensions/gardener-extension-provider-alicloud/images/alicloud-grant-permission.png">
   
   1. Select *Alibaba Cloud Account*.
   1. Assign the policy you’ve created before to the technical user.
      
        <img src="/docs/extensions/infrastructure-extensions/gardener-extension-provider-alicloud/images/alicloud-assign-policy.png">

1. Create your secret.
   
   1. Type the name of your secret.
   1. Copy and paste the `Access Key ID` and `Secret Access Key` you saved when you created the technical user on Alibaba Cloud.
   1. Choose *Add secret*.
      <img src="/docs/extensions/infrastructure-extensions/gardener-extension-provider-alicloud/images/alicloud-create-secret-1.png">
   
   > After completing these steps, you should see your newly created secret in the *Infrastructure Secrets* section.
   
    <img src="/docs/extensions/infrastructure-extensions/gardener-extension-provider-alicloud/images/alicloud-create-secret-2.png">

1. To create a new cluster, choose *Clusters* and then the plus sign in the upper right corner.
   
    <img src="/docs/extensions/infrastructure-extensions/gardener-extension-provider-alicloud/images/alicloud-new-cluster.png">

1. In the *Create Cluster* section:
   1. Select *AliCloud* in the *Infrastructure* tab.
   1. Type the name of your cluster in the *Cluster Details* tab.
   1. Choose the secret you created before in the *Infrastructure Details* tab.
   1. Choose *Create*.
      
         <img src="/docs/extensions/infrastructure-extensions/gardener-extension-provider-alicloud/images/alicloud-create-cluster.png">

1. Wait for your cluster to get created.
   
     <img src="/docs/extensions/infrastructure-extensions/gardener-extension-provider-alicloud/images/alicloud-processing-cluster.png">

## Result

After completing the steps in this tutorial, you will be able to see and download the kubeconfig of your cluster. With it you can create shoot clusters on Alibaba Cloud.
<img src="/docs/extensions/infrastructure-extensions/gardener-extension-provider-alicloud/images/alicloud-kubeconfig.png">

> The size of persistent volumes in your shoot cluster must at least be 20 GiB large. If you choose smaller sizes in your Kubernetes PV definition, the allocation of cloud disk space on Alibaba Cloud fails.
