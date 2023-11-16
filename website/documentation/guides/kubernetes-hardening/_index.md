---
title: Kubernetes Cluster Hardening Procedure for Cluster Admins
description: "Using Cloud Access Management (CAM) for compliant user management of your Gardener Projects"
level: advanced
category: Security
publishdate: 2023-10-10
tags: ["task"]
---

## Overview
The Gardener team takes security seriously, which is why we mandate the Security Technical Implementation Guide (STIG) for Kubernetes as published by the Defense Information Systems Agency (DISA) [here](https://public.cyber.mil/stigs/downloads/). We offer Gardener adopters the opportunity to show compliance with DISA Kubernetes STIG via the compliance checker tool [diki](https://github.com/gardener/diki). The latest release in machine readable format can be found in the [STIGs Document Library](https://public.cyber.mil/stigs/downloads/?_dl_facet_stigs=container-platform) by searching for Kubernetes.

## Kubernetes Clusters Security Requirements

[DISA Kubernetes STIG version 1 release 10](https://cyber.trackr.live/stig/Kubernetes/1/10) contains 93 rules overall. **Only the following 18 rules, however, apply to you as a Gardener Stakeholder/Cluster Admin**. Some of them are secure-by-default, so your responsibility is to make sure that they are not changed. The requirements are grouped logically for your convenience:

### Control Plane Configuration

|ID| Description | Secure By Default | Comments |
| -------- | ------- | ------- | ------- |
|242390|Kubernetes API server must have anonymous authentication disabled| :white_check_mark: |Disabled unless you enable it via [enableAnnonymousAuthentication](https://gardener.cloud/docs/gardener/api-reference/core/#kubeapiserverconfig)  |
|245543|Kubernetes API Server must disable token authentication to protect information in transit|:white_check_mark:|Disabled unless you enable it via [enableStaticTokenKubeconfig](https://gardener.cloud/docs/gardener/api-reference/core/#kubernetes)|
|242400|Kubernetes API server must have Alpha APIs disabled| :white_check_mark:| Disabled unless you enable it via [featureGates](https://gardener.cloud/docs/gardener/api-reference/core/#kubernetesconfig)|
|242436|Kubernetes API server must have the ValidatingAdmissionWebhook enabled|:white_check_mark:|Enabled unless you disable it explicitly via [admissionPlugins](https://gardener.cloud/docs/gardener/api-reference/core/#kubeapiserverconfig)|
|242398|Kubernetes DynamicAuditing must not be enabled|:white_check_mark:|Disabled unless you enable it via [featureGates](https://gardener.cloud/docs/gardener/api-reference/core/#kubernetesconfig)|
|242399|Kubernetes DynamicKubeletConfig must not be enabled|:white_check_mark:|Disabled unless you enable it via [featureGates](https://gardener.cloud/docs/gardener/api-reference/core/#kubernetesconfig)|
|242393|Kubernetes Worker Nodes must not have sshd service running| :x: | Active to allow debugging of network issues, but it is possible to deactivate via the [sshAccess](https://gardener.cloud/docs/gardener/api-reference/core/#core.gardener.cloud/v1beta1.SSHAccess) setting|
|242394|Kubernetes Worker Nodes must not have the sshd service enabled| :x: | Enabled to allow debugging of network issues, but it is possible to deactivate via the [sshAccess](https://gardener.cloud/docs/gardener/api-reference/core/#core.gardener.cloud/v1beta1.SSHAccess) setting|
|242434|Kubernetes Kubelet must enable kernel protection|:white_check_mark:|Enabled for Kubernetes v1.26 or later unless disabled explicitly via [protectKernalDefaults](https://gardener.cloud/docs/gardener/api-reference/core/#kubeletconfig)|
|245541|Kubernetes Kubelet must not disable timeouts|:white_check_mark:| Enabled for Kubernetes v1.26 or later unless disabled explicitly via [streamingConnectionIdleTimeout](https://gardener.cloud/docs/gardener/api-reference/core/#kubeletconfig)|

### End User Workload
|ID| Description | Secure By Default | Comments |
| -------- | ------- | ------- | ------- |
|242395|Kubernetes dashboard must not be enabled|:white_check_mark:| Not installed unless you install it via [kubernetesDashboard](https://gardener.cloud/docs/gardener/api-reference/core/#addon).|
|242414|Kubernetes cluster must use non-privileged host ports for user pods|:x:| Do not use any ports below 1024 for your own workload.|
|242415|Secrets in Kubernetes must not be stored as environment variables|:x:| Always mount secrets as volumes and never as environment variables.|
|242383|User-managed resources must be created in dedicated namespaces|:x:| Create and use your own/dedicated namespaces and never place anything into the default, kube-system, kube-public, or kube-node-lease namespace. The default namespace is never to be used while the other above listed namespaces are only to be used by the Kubernetes provider (here Gardener).|
|242417|Kubernetes must separate user functionality|:x:| While 242383 is about all resources, this rule is specifically about pods. Create and use your own/dedicated namespaces and never place pods into the default, kube-system, kube-public, or kube-node-lease namespace. The default namespace is never to be used while the other above listed namespaces are only to be used by the Kubernetes provider (here Gardener).|
|242437|Kubernetes must have a pod security policy set|:white_check_mark:| Set, but Gardener can only set default pod security policies (PSP) and does so only until v1.24 as with v1.25 PSPs were removed (deprecated since v1.21) and replaced with [Pod Security Standards](https://kubernetes.io/docs/concepts/security/pod-security-standards) (see [this blog](https://kubernetes.io/blog/2021/04/06/podsecuritypolicy-deprecation-past-present-and-future) for more information). Whatever the technology, you are responsible to configure custom-tailured appropriate PSPs respectively use them or PSSs, depending on your own workload and security needs (only you know what a pod should be allowed to do).|
|242442|Kubernetes must remove old components after updated versions have been installed|:x:| While Gardener manages all its components in its system namespaces (automated), you are naturally responsible for your own workload.|
|254800|Kubernetes must have a Pod Security Admission control file configured|:x:| Gardener ensures that the pod security configuration allows system components to be deployed in the kube-system namespace but does not set configurations that can affect user namespaces. It is recommended that users enforce a minimum of [baseline pod security level for their workload](https://kubernetes.io/docs/concepts/security/pod-security-admission/#pod-security-levels) via [PodSecurity admission plugin](https://gardener.cloud/docs/gardener/pod-security/#admission-configuration-for-the-podsecurity-admission-plugin). |