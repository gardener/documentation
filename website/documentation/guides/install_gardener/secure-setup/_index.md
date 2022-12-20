---
title: Hardening the Gardener Community Setup
level: advanced
category: Security
scope: operator
---

## Overview
Gardener stakeholders in the Open Source community usually use the [Gardener Setup Scripts](https://github.com/gardener/landscape-setup), to create a Garden cluster based on Kubernetes v1.9 which then can be used to create shoot clusters based on Kubernetes v1.10, v1.11 and v1.12. shoot clusters can play the following roles in a Gardener landscape: 

- Seed cluster
- Shoot cluster 

As Alban Crequy from Kinvolk has recommended in his recent Gardener blog [Auditing Kubernetes for Secure Setup](https://github.com/gardener/documentation/blob/master/website/documentation/guides/applications/insecure-configuration/_index.md), the Gardener Team at SAP has applied several means to harden the Gardener landscapes at SAP. 

## Recommendations
### Mitigation for Gardener CVE-2018-2475
The following recommendations describe how you can harden your Gardener Community Setup by adding a seed cluster hardened with network policies.

- Use the Gardener Setup Scripts to create a garden cluster in a dedicated IaaS account
- Create a shoot cluster in a different IaaS account
- As a precaution, you should not deploy the Kubernetes dashboard on this shoot cluster
- Register this newly created shoot cluster as a seed cluster in the Gardener
- End user shoot clusters can then be created using this newly created seed cluster (which in turn is a shoot cluster). 

A tutorial on how to create a shooted seed cluster can be found at [Setting up the Seed Cluster](https://github.com/gardener/documentation/blob/master/website/documentation/guides/install_gardener/setup-seed/_index.md).

The rationale behind this activity is that Calico network policies harden this seed cluster but the community installer uses Flannel which does not offer these features for the Garden cluster. 

When you have added a hardened seed cluster you are expected not be vulnerable to the Gardener [CVE-2018-2475](https://groups.google.com/forum/#!topic/gardener/Pom2Y70cDpw) anymore.

### Mitigation for Kubernetes CVE-2018-1002105
In addition, when you follow the recommendations in the [recent Gardener Security Announcement](https://groups.google.com/forum/#!topic/gardener/2icxEz0RAK4), you are expected to not be vulnerable to the Kubernetes CVE-2018-1002105 with your hardened Gardener Community Setup.

## Alternative Approach 
For this alternative approach, there is no Gardener blog available, it is not part of the Gardener Setup Scripts, but it was tested by the Gardener Team at SAP. Use GKE to host a Garden cluster based on Kubernetes v1.10, v1.11 and v1.12 (without the Kubernetes dashboard) in a dedicated GCP account. If you do this by your own, please ensure that the network policies are turned on, which might not be the case by default. Then you can apply the security configuration which Alban Crequy from Kinvolk has recommended in his [blog](https://github.com/gardener/documentation/blob/master/website/documentation/guides/applications/insecure-configuration/_index.md) directly in the Garden cluster and create shoot clusters from there in a different IaaS account.