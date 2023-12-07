---
title: Kubernetes Cluster Hardening Procedure
description: "Compliant user management of your Gardener projects"
level: advanced
category: Security
publishdate: 2023-10-10
tags: ["task"]
aliases: ["/docs/guides/kubernetes-hardening/"]
---

## Overview
The Gardener team takes security seriously, which is why we mandate the Security Technical Implementation Guide (STIG) for Kubernetes as published by the Defense Information Systems Agency (DISA) [here](https://public.cyber.mil/stigs/downloads/). We offer Gardener adopters the opportunity to show compliance with DISA Kubernetes STIG via the compliance checker tool [diki](https://github.com/gardener/diki). The latest release in machine readable format can be found in the [STIGs Document Library](https://public.cyber.mil/stigs/downloads/?_dl_facet_stigs=container-platform) by searching for Kubernetes.

## Kubernetes Clusters Security Requirements

[DISA Kubernetes STIG version 1 release 10](https://cyber.trackr.live/stig/Kubernetes/1/10) contains 93 rules overall. **Only the following rules, however, apply to you**. Some of them are secure-by-default, so your responsibility is to make sure that they are not changed. For your convenience, the requirements are grouped logically and per role:

## Rules Relevant for Cluster Admins

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

## Rules Relevant for Service Providers

|ID| Description | Secure By Default | Comments |
| -------- | ------- | ------- | ------- |
|242376|The Kubernetes Controller Manager must use TLS 1.2, at a minimum, to protect the confidentiality of sensitive data during electronic dissemination.|||
|242377|The Kubernetes Scheduler must use TLS 1.2, at a minimum, to protect the confidentiality of sensitive data during electronic dissemination.|||
|242378|The Kubernetes API Server must use TLS 1.2, at a minimum, to protect the confidentiality of sensitive data during electronic dissemination.
|242379|The Kubernetes etcd must use TLS to protect the confidentiality of sensitive data during electronic dissemination.|||
|242380|The Kubernetes etcd must use TLS to protect the confidentiality of sensitive data during electronic dissemination.|||
|242381|The Kubernetes Controller Manager must create unique service accounts for each work payload.|||
|242382|The Kubernetes API Server must enable Node,RBAC as the authorization mode.|||
|242384|The Kubernetes Scheduler must have secure binding.|||
|242385|The Kubernetes Controller Manager must have secure binding.|||
|242386|The Kubernetes API server must have the insecure port flag disabled.|||
|242387|The Kubernetes Kubelet must have the "readOnlyPort" flag disabled.|||
|242388|The Kubernetes API server must have the insecure bind address not set.|||
|242389|The Kubernetes API server must have the secure port set.|||
|242391|The Kubernetes Kubelet must have anonymous authentication disabled.|||
|242392|The Kubernetes kubelet must enable explicit authorization.|||
|242396|Kubernetes Kubectl cp command must give expected access and results.|||
|242397|The Kubernetes kubelet staticPodPath must not enable static pods.|||
|242404|Kubernetes Kubelet must deny hostname override.|||
|242405|The Kubernetes manifests must be owned by root.|||
|242406|The Kubernetes KubeletConfiguration file must be owned by root.|||
|242407|The Kubernetes KubeletConfiguration files must have file permissions set to 644 or more restrictive.|||
|242408|The Kubernetes manifest files must have least privileges.|||
|242409|Kubernetes Controller Manager must disable profiling.|||
|242410|The Kubernetes API Server must enforce ports, protocols, and services (PPS) that adhere to the Ports, Protocols, and Services Management Category Assurance List (PPSM CAL).|||
|242411|The Kubernetes Scheduler must enforce ports, protocols, and services (PPS) that adhere to the Ports, Protocols, and Services Management Category Assurance List (PPSM CAL).|||
|242412|The Kubernetes Controllers must enforce ports, protocols, and services (PPS) that adhere to the Ports, Protocols, and Services Management Category Assurance List (PPSM CAL).|||
|242413|The Kubernetes etcd must enforce ports, protocols, and services (PPS) that adhere to the Ports, Protocols, and Services Management Category Assurance List (PPSM CAL).|||
|242418|The Kubernetes API server must use approved cipher suites.|||
|242419|Kubernetes API Server must have the SSL Certificate Authority set.|||
|242420|Kubernetes Kubelet must have the SSL Certificate Authority set.|||
|242421|Kubernetes Controller Manager must have the SSL Certificate Authority set.|||
|242422|Kubernetes API Server must have a certificate for communication.|||
|242423|Kubernetes etcd must enable client authentication to secure service.|||
|242424|Kubernetes Kubelet must enable tlsPrivateKeyFile for client authentication to secure service.|||
|242425|Kubernetes Kubelet must enable tlsCertFile for client authentication to secure service.|||
|242426|Kubernetes etcd must enable client authentication to secure service.|||
|242427|Kubernetes etcd must have a key file for secure communication.|||
|242428|Kubernetes etcd must have a certificate for communication.|||
|242429|Kubernetes etcd must have the SSL Certificate Authority set.|||
|242430|Kubernetes etcd must have a certificate for communication.|||
|242431|Kubernetes etcd must have a key file for secure communication.|||
|242432|Kubernetes etcd must have peer-cert-file set for secure communication.|||
|242433|Kubernetes etcd must have a peer-key-file set for secure communication.|||
|242435|Kubernetes must prevent non-privileged users from executing privileged functions to include disabling, circumventing, or altering implemented security safeguards/countermeasures or the installation of patches and updates.|||
|242438|Kubernetes API Server must configure timeouts to limit attack surface.|||
|242443|Kubernetes must contain the latest updates as authorized by IAVMs, CTOs, DTMs, and STIGs.|||
|242444|The Kubernetes component manifests must be owned by root.|||
|242445|The Kubernetes component etcd must be owned by etcd.|||
|242446|The Kubernetes conf files must be owned by root.|||
|242447|The Kubernetes Kube Proxy must have file permissions set to 644 or more restrictive.|||
|242448|The Kubernetes Kube Proxy must be owned by root.|||
|242449|The Kubernetes Kubelet certificate authority file must have file permissions set to 644 or more restrictive.|||
|242450|The Kubernetes Kubelet certificate authority must be owned by root.|||
|242451|The Kubernetes component PKI must be owned by root.|||
|242452|The Kubernetes kubelet KubeConfig must have file permissions set to 644 or more restrictive.|||
|242453|The Kubernetes kubelet KubeConfig file must be owned by root.|||
|242454|The Kubernetes kubeadm.conf must be owned by root.|||
|242455|The Kubernetes kubeadm.conf must have file permissions set to 644 or more restrictive.|||
|242456|The Kubernetes kubelet config must have file permissions set to 644 or more restrictive.|||
|242457|The Kubernetes kubelet config must be owned by root.|||
|242459|The Kubernetes etcd must have file permissions set to 644 or more restrictive.|||
|242460|The Kubernetes admin.conf must have file permissions set to 644 or more restrictive.|||
|242466|The Kubernetes PKI CRT must have file permissions set to 644 or more restrictive.|||
|242467|The Kubernetes PKI keys must have file permissions set to 600 or more restrictive.|||
|245542|Kubernetes API Server must disable basic authentication to protect information in transit.|||
|245544|Kubernetes endpoints must use approved organizational certificate and key pair to protect information in transit.|||
|254801|Kubernetes must enable PodSecurity admission controller on static pods and Kubelets.|||