---
title: Create a kubernetes cluster on GCP with Gardener
level: beginner
category: Getting Started
scope: app-developer
---

### Prerequisites

-   You need a GCP account.
-   You have access to the Gardener dashboard and have permissions to create projects.

1. Go to the Gardener dashboard and create a *Project*.

    <img src="images/new_gardener_project.jpg">


2. To check which roles are required by Gardener, choose *Secrets*, and click on the help button <img src="images/help_icon.jpg"> for GCP.
    <img src="images/gardenergcpsecret1.jpg">

    <img src="images/gardenergcpsecret2.jpg">

3. [Create a new service account in GCP](https://console.cloud.google.com/iam-admin/serviceaccounts) and assign the roles required by Gardener.

    <img src="images/gcpcreateserviceaccount0.jpg">

    <img src="images/gcpcreateserviceaccount1.jpg">

4. To create a key for the service account, choose *Actions* and then *Create key*.

    <img src="images/gcpcreatekey.jpg">

5. Save the private key of the service account in JSON format.
    <img src="images/gcpdownloadkey.jpg">

    > Note: Save the key of the user, it’s used later to create secrets for Gardener.

6. [Enable the Google compute API](https://console.developers.google.com/apis/library/compute.googleapis.com).

    <img src="images/gcpcomputeengineapi.jpg">


7. [Enable the Google IAM API](https://console.developers.google.com/apis/api/iam.googleapis.com/overview).
    <img src="images/gcpiamapi.jpg">

8. On the Gardener dashboard, choose *Secrets* and then the plus sign <img src="images/plus_icon.jpg"> in the GCP frame to add a new GCP secret.

    <img src="images/gardenergcpsecret01.jpg">

    <img src="images/gardeneraddgcpsecret.jpg">


9.  To create a new cluster, choose *Clusters* and then the plus sign in the lower right corner.

    <img src="images/new_cluster.jpg">

10. On tab *INFRASTRUCTURE*, choose the secret you created before. 


    <img src="images/gcpcreatecluster1.jpg">

    <img src="images/gcpcreatecluster2.jpg">

    <img src="images/create_cluster4.jpg">

    <img src="images/gcpcreatecluster2.jpg">


11. Copy kubeconfig.

    <img src="images/copy_kubeconfig.jpg">
