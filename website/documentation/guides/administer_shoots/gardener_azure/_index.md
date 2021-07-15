---
title: Create shoot clusters in Azure
level: beginner
category: Getting Started
scope: app-developer
---

# Create shoot clusters in Azure

### Prerequisites

-   You need an Azure account.
-   You have access to the Gardener dashboard and have permissions to create projects.


Before you can provision and access a Kubernetes cluster on Azure, you need to add the account credentials in Gardener. 
Gardener needs the credentials to provision and operate the Azure infrastructure for your Kubernetes cluster.

> Ensure that the account has the **contributor** role.


1. Request a new service account on Azure. 

    You must [request a new service account](https://jira.multicloud.int.sap/plugins/servlet/desk/portal/2) first, if you don't have one.

    <img src="images/request_spn.jpg">



    Naming Convention for the Service UserID: `azrspn_<PartOfSubName>_usecase`

    <img src="images/request_spn1.jpg">


2. Get properties of your Azure account/Service Principal.
    -  Tenant ID
    
        The TenantID is also called DirectoryID - https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/Properties.
        <img src="images/azuregettenantid.jpg">

    -  ClientID
        Select the subscription.
        <img src="images/azureselectsubscription.jpg">

    - Select the SPN.
        <img src="images/azureselectspn.jpg">

    *Note:* The ClientID is also called ApplicationID.
    <img src="images/azuregetclientid.jpg">

    - Client Secret
        Secrets for the Azure Account/Service Principal can be genereted/rotated via the Azure Portal.
        Access the [Azure Portal](https://portal.azure.com) and navigate to the `Active Directory` service.
        Within the service navigate to `App registrations` and select your service principal. 
        In the detail view navigate to `Certificates & secrets`. In the section, you can generate a new secret for the Service Principal.

3. On the Gardener dashboard, choose *Secrets* and then the plus sign <img src="images/plus_icon.jpg"> in the Azure frame to add a new Azure secret.

    <img src="images/gardenernewazuresecret.jpg">

5. Provide the details for the Azure service account.  
    After processing the ticket, you’ll receive the Service Principle credentials via email.
    Copy "Key Value" from the email into "Client Secret".

    <img src="images/gardeneraddazuresecret.jpg">

