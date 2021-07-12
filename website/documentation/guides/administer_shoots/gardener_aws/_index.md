---
title: Create a kubernetes cluster in AWS with Gardener
level: beginner
category: Getting Started
reviewer:
status:
last_reviewed:
scope: app-developer
---

### Prerequisites

-   You need an AWS account.
-   You have access to the Gardener dashboard and have permissions to create projects.

1. Go to the Gardener dashboard and create a *Project*.

    <img src="images/new_gardener_project.jpg">


2. To copy the policy for AWS from the Gardener dashboard, choose *Secrets*, click on the help icon <img src="images/help_icon.jpg"> for AWS secrets, and choose copy <img src="images/copy_icon.png">.

    <img src="images/gardener_copy_policy.jpg">

3. To [create a new policy](https://console.aws.amazon.com/iam/home?#/policies) in AWS, paste the policy that you copied from the Gardener dashboard to this custom policy.

    <img src="images/create_policy.jpg">

    <img src="images/review_policy.jpg">

4. [Create a new technical user](https://console.aws.amazon.com/iam/home?#/users$new?step=details).

    <img src="images/adduser.jpg">

    <img src="images/attachpolicy.jpg">

    <img src="images/finishuser.jpg">

     > Note: After the user is created, `Access key ID` and `Secret access key` are generated and displayed. Remember to save them. The `Access key ID` is used later to create secrets for Gardener.


    <img src="images/savekeys.jpg">

5. On the Gardener dashboard, choose *Secrets* and then the plus sign <img src="images/plus_icon.jpg"> in the AWS frame to add a new AWS secret.

6. Copy the `Access Key ID` and `Secret Access Key` you saved when you created the technical user on AWS.


    <img src="images/add_AWS_Secret.jpg">

    <img src="images/secret_stored.jpg">

7. To create a new cluster, choose *Clusters* and then the plus sign in the lower right corner.

    <img src="images/new_cluster.jpg">

8. On tab *INFRASTRUCTURE*, choose the secret you created before. The technical user related to the chosen Secret is used to create infrastructure resources.

    <img src="images/create_cluster2.jpg">

    <img src="images/create_cluster3.jpg">

    <img src="images/create_cluster4.jpg">

    <img src="images/create_cluster5.jpg">


9. Copy kubeconfig.

    <img src="images/copy_kubeconfig.jpg">