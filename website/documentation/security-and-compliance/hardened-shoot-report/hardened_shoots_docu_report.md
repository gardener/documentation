---
title: Gardener Compliance Report
description: "The latest compliance report generated against security hardened shoot clusters"
weight: 30
category: Compliance
---

## Overview

Gardener aims to comply with public security standards and guidelines, such as the [Security Technical Implementation Guide (STIG) for Kubernetes from Defense Information Systems Agency (DISA)](https://public.cyber.mil/stigs/). The DISA Kubernetes STIG is a set of rules that provide recommendations for secure deployment and operation of Kubernetes. It covers various aspects of Kubernetes security, including the configurations of the Kubernetes API server and other components, cluster management, certificate management, handling of updates and patches.

While Gardener aims to follow this guideline, we also recognize that not all of the rules may be directly applicable or optimal for Gardener specific environment. Therefore, some of the requirements are adjusted. Rules that are not applicable to Gardener are skipped given an appropriate justification.

For every release, we check that Gardener is able of creating security hardened shoot clusters, reconfirming that the configurations which are not secure by default (as per [Gardener Kubernetes Cluster Hardening Procedure](https://gardener.cloud/docs/guides/security-and-compliance/kubernetes-hardening/)) are still possible and work as expected.

In order to automate and ease this process, Gardener uses a tool called [diki](https://github.com/gardener/diki).

## Security Hardened Shoot Configurations

The following security hardened shoot configurations were used in order to generate the compliance report.

<details>
<summary>AWS</summary>
<pre><code>
kind: Shoot
apiVersion: core.gardener.cloud/v1beta1
metadata:
  name: aws
spec:
  cloudProfileName: aws
  kubernetes:
    kubeAPIServer:
      admissionPlugins:
        - name: PodSecurity
          config:
            apiVersion: pod-security.admission.config.k8s.io/v1beta1
            kind: PodSecurityConfiguration
            defaults:
              enforce: baseline
              audit: baseline
              warn: baseline
          disabled: false
      auditConfig:
        auditPolicy:
          configMapRef:
            name: audit-policy
    version: "1.28"
    enableStaticTokenKubeconfig: false
  networking:
    type: calico
    pods: 100.64.0.0/12
    nodes: 10.180.0.0/16
    services: 100.104.0.0/13
    ipFamilies:
      - IPv4
  provider:
    type: aws
    controlPlaneConfig:
      apiVersion: aws.provider.extensions.gardener.cloud/v1alpha1
      kind: ControlPlaneConfig
    infrastructureConfig:
      apiVersion: aws.provider.extensions.gardener.cloud/v1alpha1
      kind: InfrastructureConfig
      networks:
        vpc:
          cidr: 10.180.0.0/16
        zones:
          - internal: 10.180.48.0/20
            name: eu-west-1c
            public: 10.180.32.0/20
            workers: 10.180.0.0/19
    workers:
      - cri:
          name: containerd
        name: worker-kkfk1
        machine:
          type: m5.large
          image:
            name: gardenlinux
          architecture: amd64
        maximum: 2
        minimum: 2
        maxSurge: 1
        maxUnavailable: 0
        volume:
          type: gp3
          size: 50Gi
        zones:
          - eu-west-1c
    workersSettings:
      sshAccess:
        enabled: false
  purpose: evaluation
  region: eu-west-1
  secretBindingName: secretBindingName
</code></pre>
</details>
<details>
<summary>Azure</summary>
<pre><code>
kind: Shoot
apiVersion: core.gardener.cloud/v1beta1
metadata:
  name: azure
spec:
  cloudProfileName: az
  kubernetes:
    kubeAPIServer:
      admissionPlugins:
        - name: PodSecurity
          config:
            apiVersion: pod-security.admission.config.k8s.io/v1beta1
            kind: PodSecurityConfiguration
            defaults:
              enforce: baseline
              audit: baseline
              warn: baseline
          disabled: false
      auditConfig:
        auditPolicy:
          configMapRef:
            name: audit-policy
    version: "1.28"
    enableStaticTokenKubeconfig: false
  networking:
    type: calico
    pods: 100.64.0.0/12
    nodes: 10.180.0.0/16
    services: 100.104.0.0/13
    ipFamilies:
      - IPv4
  provider:
    type: azure
    controlPlaneConfig:
      apiVersion: azure.provider.extensions.gardener.cloud/v1alpha1
      kind: ControlPlaneConfig
    infrastructureConfig:
      apiVersion: azure.provider.extensions.gardener.cloud/v1alpha1
      kind: InfrastructureConfig
      networks:
        vnet:
          cidr: 10.180.0.0/16
        workers: 10.180.0.0/16
      zoned: true
    workers:
      - cri:
          name: containerd
        name: worker-g7p4p
        machine:
          type: Standard_A4_v2
          image:
            name: gardenlinux
          architecture: amd64
        maximum: 2
        minimum: 2
        maxSurge: 1
        maxUnavailable: 0
        volume:
          type: StandardSSD_LRS
          size: 50Gi
        zones:
          - '3'
    workersSettings:
      sshAccess:
        enabled: false
  purpose: evaluation
  region: westeurope
  secretBindingName: secretBindingName
</code></pre>
</details>
<details>
<summary>GCP</summary>
<pre><code>
kind: Shoot
apiVersion: core.gardener.cloud/v1beta1
metadata:
  name: gcp
spec:
  cloudProfileName: gcp
  kubernetes:
    kubeAPIServer:
      admissionPlugins:
        - name: PodSecurity
          config:
            apiVersion: pod-security.admission.config.k8s.io/v1beta1
            kind: PodSecurityConfiguration
            defaults:
              enforce: baseline
              audit: baseline
              warn: baseline
          disabled: false
      auditConfig:
        auditPolicy:
          configMapRef:
            name: audit-policy
    version: "1.28"
    enableStaticTokenKubeconfig: false
  networking:
    type: calico
    pods: 100.64.0.0/12
    nodes: 10.180.0.0/16
    services: 100.104.0.0/13
    ipFamilies:
      - IPv4
  provider:
    type: gcp
    controlPlaneConfig:
      apiVersion: gcp.provider.extensions.gardener.cloud/v1alpha1
      kind: ControlPlaneConfig
      zone: europe-west1-b
    infrastructureConfig:
      apiVersion: gcp.provider.extensions.gardener.cloud/v1alpha1
      kind: InfrastructureConfig
      networks:
        workers: 10.180.0.0/16
    workers:
      - cri:
          name: containerd
        name: worker-bex82
        machine:
          type: n1-standard-2
          image:
            name: gardenlinux
          architecture: amd64
        maximum: 2
        minimum: 2
        maxSurge: 1
        maxUnavailable: 0
        volume:
          type: pd-balanced
          size: 50Gi
        zones:
          - europe-west1-b
    workersSettings:
      sshAccess:
        enabled: false
  purpose: evaluation
  region: europe-west1
  secretBindingName: secretBindingName
</code></pre>
</details>
<details>
<summary>OpenStack</summary>
<pre><code>
kind: Shoot
apiVersion: core.gardener.cloud/v1beta1
metadata:
  name: openstack
spec:
  cloudProfileName: converged-cloud-cp
  kubernetes:
    kubeAPIServer:
      admissionPlugins:
        - name: PodSecurity
          config:
            apiVersion: pod-security.admission.config.k8s.io/v1beta1
            kind: PodSecurityConfiguration
            defaults:
              enforce: baseline
              audit: baseline
              warn: baseline
          disabled: false
      auditConfig:
        auditPolicy:
          configMapRef:
            name: audit-policy
    version: "1.28"
    enableStaticTokenKubeconfig: false
  networking:
    type: calico
    pods: 100.64.0.0/12
    nodes: 10.180.0.0/16
    services: 100.104.0.0/13
    ipFamilies:
      - IPv4
  provider:
    type: openstack
    controlPlaneConfig:
      apiVersion: openstack.provider.extensions.gardener.cloud/v1alpha1
      kind: ControlPlaneConfig
      loadBalancerProvider: f5
    infrastructureConfig:
      apiVersion: openstack.provider.extensions.gardener.cloud/v1alpha1
      kind: InfrastructureConfig
      networks:
        workers: 10.180.0.0/16
      floatingPoolName: FloatingIP-external-cp
    workers:
      - cri:
          name: containerd
        name: worker-dqty2
        machine:
          type: g_c2_m4
          image:
            name: gardenlinux
          architecture: amd64
        maximum: 2
        minimum: 2
        maxSurge: 1
        maxUnavailable: 0
        zones:
          - eu-de-1b
    workersSettings:
      sshAccess:
        enabled: false
  purpose: evaluation
  region: eu-de-1
  secretBindingName: secretBindingName
</code></pre>
</details>

## Diki Configuration

The following [diki](https://github.com/gardener/diki) configuration was used in order to test each of the shoot clusters described above. Mind that the rules regarding audit logging are skipped because organizations have different requirements and Gardener can integrate with different audit logging solutions.

<details>
<summary>Configuration</summary>
<pre><code>
metadata: ...
providers:
- id: gardener
  name: Gardener
  metadata: ...
  args: ...
  rulesets:
  - id: disa-kubernetes-stig
    name: DISA Kubernetes Security Technical Implementation Guide
    version: v1r11
    ruleOptions:
    - ruleID: "242402"
      skip:
        enabled: true
        justification: "Gardener can integrate with different audit logging solutions"
    - ruleID: "242403"
      skip:
        enabled: true
        justification: "Gardener can integrate with different audit logging solutions"
    - ruleID: "242414"
      args:
        acceptedPods:
        - podMatchLabels:
            k8s-app: node-local-dns
          namespaceMatchLabels:
            kubernetes.io/metadata.name: kube-system
          justification: "node local dns requires port 53 in order to operate properly"
          ports:
          - 53
    - ruleID: "242445"
      args:
        expectedFileOwner:
          users: ["0", "65532"]
          groups: ["0", "65532"]
    - ruleID: "242446"
      args:
        expectedFileOwner:
          users: ["0", "65532"]
          groups: ["0", "65532"]
    - ruleID: "242451"
      args:
        expectedFileOwner:
          users: ["0", "65532"]
          groups: ["0", "65532"]
    - ruleID: "242462"
      skip:
        enabled: true
        justification: "Gardener can integrate with different audit logging solutions"
    - ruleID: "242463"
      skip:
        enabled: true
        justification: "Gardener can integrate with different audit logging solutions"
    - ruleID: "242464"
      skip:
        enabled: true
        justification: "Gardener can integrate with different audit logging solutions"
    - ruleID: "245543"
      args:
        acceptedTokens:
        - user: "health-check"
          uid: "health-check"
    - ruleID: "254800"
      args:
        minPodSecurityLevel: "baseline"
output:
  minStatus: Passed
</code></pre>
</details>

## Security Compliance Report for Hardened Shoot Clusters

The report can be reviewed directly or downloaded by <a href='./hardened_shoots_report.md' download>clicking here</a>.


