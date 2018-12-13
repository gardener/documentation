---
title: Hardening the Gardener Community Setup
description: "Hardening the Gardener Community Setup"
type: tutorial-page
level: advanced
index: 5
category: Security
scope: operator
aliases: ["readmore/insecure"]
---

# Hardening the Gardener Community Setup
Gardener stakeholders in the Open Source community usually use the [Gardener Setup Scripts](https://github.com/gardener/landscape-setup), to create a Garden cluster based on Kubernetes v1.9 which then can be used to create Shoot clusters based on Kubernetes v1.10, v1.11 and v1.12. Shoot clusters can play the following roles in a Gardener landscape: 
•	Soil (aka Super Seed) cluster
•	Seed cluster
•	Shoot cluster 
As Alban Crequy from Kinvolk has recommended in his recent Gardener blog [Auditing Kubernetes for Secure Setup](https://gardener.cloud/050-tutorials/content/howto/insecure-configuration/) the Gardener Team at SAP has applied several means to harden the Gardener landscapes at SAP. This blog describes how you can harden your Gardener Community Setup.
 
After using the [Gardener Setup Scripts](https://github.com/gardener/landscape-setup), to create a Garden cluster in a dedicated IaaS account, you register this Garden cluster as Soil cluster in the Garden cluster. From this Soil cluster you create a Shoot cluster in a different IaaS account, which you register in the Garden cluster as a Seed Cluster. As a precaution you should not deploy the Kubernetes dashboard on this Seed cluster. You then need to apply the security configuration which Alban Crequy from Kinvolk has recommended in his [blog](https://gardener.cloud/050-tutorials/content/howto/insecure-configuration/) to this Seed cluster and test it. Most important is to apply and test the described network policies on the Seed cluster. After you have hardened the Seed cluster you can create Shoot clusters for your end users in a IaaS account different from the IaaS accounts where your Garden cluster and your Seed cluster are deployed. When you have hardened the Seed cluster you are expected not be vulnerable to the Gardener [CVE-2018-2475](https://groups.google.com/forum/#!topic/gardener/Pom2Y70cDpw). When you follow the recommendations in the [recent Gardener Security Announcement](https://groups.google.com/forum/#!topic/gardener/2icxEz0RAK4) you are expected not be vulnerable to the Kubernetes CVE-2018-1002105 with your hardened Gardener Community Setup.
 
An alternative not tested by the Gardener Security Team and currently not part of the [Gardener Setup Scripts](https://github.com/gardener/landscape-setup), is to use GKE to host a Garden cluster based on Kubernetes v1.10, v1.11 and v1.12 (without the Kubernetes dashboard) in a dedicated GCP account. If you do this by your own, please ensure that the network policies are turned on which might not be the case by default. Then you can apply the security configuration which Alban Crequy from Kinvolk has recommended in his [blog](https://gardener.cloud/050-tutorials/content/howto/insecure-configuration/) directly in the Garden cluster and create Shoot clusters from there in a different IaaS account. 
