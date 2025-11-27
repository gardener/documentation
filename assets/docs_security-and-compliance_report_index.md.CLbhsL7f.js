import{_ as n,c as a,o as r,a2 as t}from"./chunks/framework.Bfq10Vlj.js";const p=JSON.parse('{"title":"Gardener Compliance Report","description":"The latest compliance report generated against security hardened shoot clusters","frontmatter":{"category":"Compliance","description":"The latest compliance report generated against security hardened shoot clusters","github_repo":"https://github.com/gardener/documentation","github_subdir":"website/documentation/security-and-compliance/hardened-shoot-report","params":{"github_branch":"master"},"path_base_for_github_subdir":{"from":"content/docs/security-and-compliance/report.md","to":"hardened_shoots_docu_report.md"},"title":"Gardener Compliance Report","weight":30,"prev":false,"next":false},"headers":[],"relativePath":"docs/security-and-compliance/report/index.md","filePath":"docs/security-and-compliance/report.md","lastUpdated":null}'),o={name:"docs/security-and-compliance/report/index.md"};function s(i,e,u,d,c,l){return r(),a("div",null,e[0]||(e[0]=[t(`<h1 id="gardener-compliance-report" tabindex="-1">Gardener Compliance Report <a class="header-anchor" href="#gardener-compliance-report" aria-label="Permalink to &quot;Gardener Compliance Report&quot;">​</a></h1><h2 id="overview" tabindex="-1">Overview <a class="header-anchor" href="#overview" aria-label="Permalink to &quot;Overview&quot;">​</a></h2><p>Gardener aims to comply with public security standards and guidelines, such as the <a href="https://public.cyber.mil/stigs/" target="_blank" rel="noreferrer">Security Technical Implementation Guide (STIG) for Kubernetes from Defense Information Systems Agency (DISA)</a>. The DISA Kubernetes STIG is a set of rules that provide recommendations for secure deployment and operation of Kubernetes. It covers various aspects of Kubernetes security, including the configurations of the Kubernetes API server and other components, cluster management, certificate management, handling of updates and patches.</p><p>While Gardener aims to follow this guideline, we also recognize that not all of the rules may be directly applicable or optimal for Gardener specific environment. Therefore, some of the requirements are adjusted. Rules that are not applicable to Gardener are skipped given an appropriate justification.</p><p>For every release, we check that Gardener is able of creating security hardened shoot clusters, reconfirming that the configurations which are not secure by default (as per <a href="/docs/security-and-compliance/kubernetes-hardening/">Gardener Kubernetes Cluster Hardening Procedure</a>) are still possible and work as expected.</p><p>In order to automate and ease this process, Gardener uses a tool called <a href="https://github.com/gardener/diki" target="_blank" rel="noreferrer">diki</a>.</p><h2 id="security-hardened-shoot-configurations" tabindex="-1">Security Hardened Shoot Configurations <a class="header-anchor" href="#security-hardened-shoot-configurations" aria-label="Permalink to &quot;Security Hardened Shoot Configurations&quot;">​</a></h2><p>The following security hardened shoot configurations were used in order to generate the compliance report.</p><details><summary>AWS</summary><pre><code>
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
    version: &quot;1.31&quot;
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
</code></pre></details><details><summary>Azure</summary><pre><code>
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
    version: &quot;1.31&quot;
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
          - &#39;3&#39;
    workersSettings:
      sshAccess:
        enabled: false
  purpose: evaluation
  region: westeurope
  secretBindingName: secretBindingName
</code></pre></details><details><summary>GCP</summary><pre><code>
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
    version: &quot;1.31&quot;
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
</code></pre></details><details><summary>OpenStack</summary><pre><code>
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
    version: &quot;1.31&quot;
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
</code></pre></details><p>For every created Security Hardened Shoot, additional NetworkPolicies are configured for the default, kube-public and kube-node-lease namespaces, in order to comply with <a href="https://github.com/gardener/diki/blob/main/docs/rulesets/security-hardened-k8s/ruleset.md#2000---ingress-and-egress-traffic-must-be-restricted-by-default" target="_blank" rel="noreferrer">Rule 2000 of the Security Hardened Kubernetes ruleset</a>. This configuration is done since Gardener does not take care of the NetworkPolicies in the aforementioned namespaces.</p><h2 id="diki-configuration" tabindex="-1">Diki Configuration <a class="header-anchor" href="#diki-configuration" aria-label="Permalink to &quot;Diki Configuration&quot;">​</a></h2><p>The following <a href="https://github.com/gardener/diki" target="_blank" rel="noreferrer">diki</a> configuration was used in order to test each of the shoot clusters described above. Mind that the rules regarding audit logging are skipped because organizations have different requirements and Gardener can integrate with different audit logging solutions.</p><details><summary>Configuration</summary><pre><code>
metadata: ...
providers:
- id: gardener
  name: Gardener
  metadata: ...
  args: ...
  rulesets:
  - id: disa-kubernetes-stig
    name: DISA Kubernetes Security Technical Implementation Guide
    version: v2r3
    args:
      maxRetries: 5
    ruleOptions: 
    - ruleID: &quot;242402&quot;
      skip:
        enabled: true
        justification: Gardener can integrate with different audit logging solutions.
    - ruleID: &quot;242403&quot;
      skip:
        enabled: true
        justification: Gardener can integrate with different audit logging solutions.
    - ruleID: &quot;242414&quot;
      args:
        acceptedPods:
        - podMatchLabels:
            k8s-app: node-local-dns
          namespaceMatchLabels:
            kubernetes.io/metadata.name: kube-system
          justification: &quot;Node local dns requires port 53 in order to operate properly.&quot;
          ports:
          - 53
    - ruleID: &quot;242445&quot;
      args:
        expectedFileOwner:
          users: [&quot;0&quot;, &quot;65532&quot;]
          groups: [&quot;0&quot;, &quot;65532&quot;]
    - ruleID: &quot;242446&quot;
      args:
        expectedFileOwner:
          users: [&quot;0&quot;, &quot;65532&quot;]
          groups: [&quot;0&quot;, &quot;65532&quot;]
    - ruleID: &quot;242451&quot;
      args:
        expectedFileOwner:
          users: [&quot;0&quot;, &quot;65532&quot;]
          groups: [&quot;0&quot;, &quot;65532&quot;]
    - ruleID: &quot;242462&quot;
      skip:
        enabled: true
        justification: Gardener can integrate with different audit logging solutions.
    - ruleID: &quot;242463&quot;
      skip:
        enabled: true
        justification: Gardener can integrate with different audit logging solutions.
    - ruleID: &quot;242464&quot;
      skip:
        enabled: true
        justification: Gardener can integrate with different audit logging solutions.
    - ruleID: &quot;245543&quot;
      args:
        acceptedTokens:
        - user: &quot;health-check&quot;
          uid: &quot;health-check&quot;
    - ruleID: &quot;254800&quot;
      args:
        minPodSecurityStandardsProfile: &quot;baseline&quot;
- id: garden
  name: &quot;Garden&quot;
  metadata: ...
  args: ...
  rulesets:
  - id: security-hardened-shoot-cluster
    name: Security Hardened Shoot Cluster
    version: v0.2.1
    args: ...
    ruleOptions: 
    - ruleID: &quot;1000&quot;
      args:
        extensions:
        - type: shoot-lakom-service
    - ruleID: &quot;2007&quot;
      args:
        minPodSecurityStandardsProfile: baseline
- id: managedk8s
  name: &quot;Managed Kubernetes&quot;
  metadata: ...
  args: ...
  rulesets:
  - id: security-hardened-k8s
    name: Security Hardened Kubernetes Cluster
    version: v0.1.0
    ruleOptions: 
    - ruleID: &quot;2001&quot;
      args:
        acceptedPods:
        - matchLabels:
            k8s-app: calico-node
            resources.gardener.cloud/managed-by: gardener
          namespaceMatchLabels:
            kubernetes.io/metadata.name: kube-system
          justification: &quot;Gardener managed resources are accepted to allow privilege escalation.&quot;
        - matchLabels:
            app: csi
            resources.gardener.cloud/managed-by: gardener
          namespaceMatchLabels:
            kubernetes.io/metadata.name: kube-system
          justification: &quot;Gardener managed resources are accepted to allow privilege escalation.&quot;
        - matchLabels:
            gardener.cloud/role: network-problem-detector
            resources.gardener.cloud/managed-by: gardener
          namespaceMatchLabels:
            kubernetes.io/metadata.name: kube-system
          justification: &quot;Gardener managed resources are accepted to allow privilege escalation.&quot;
        - matchLabels:
            app: node-problem-detector
            resources.gardener.cloud/managed-by: gardener
          namespaceMatchLabels:
            kubernetes.io/metadata.name: kube-system
          justification: &quot;Gardener managed resources are accepted to allow privilege escalation.&quot;
        - matchLabels:
            role: proxy
            resources.gardener.cloud/managed-by: gardener
          namespaceMatchLabels:
            kubernetes.io/metadata.name: kube-system
          justification: &quot;Gardener managed resources are accepted to allow privilege escalation.&quot;
        - matchLabels:
            app: vpn-shoot
            resources.gardener.cloud/managed-by: gardener
          namespaceMatchLabels:
            kubernetes.io/metadata.name: kube-system
          justification: &quot;Gardener managed resources are accepted to allow privilege escalation.&quot;
    - ruleID: &quot;2003&quot;
      args:
        acceptedPods:
        - matchLabels:
            k8s-app: calico-node
            resources.gardener.cloud/managed-by: gardener
          namespaceMatchLabels:
            kubernetes.io/metadata.name: kube-system
          justification: &quot;Gardener managed resources are accepted to use a wider range of volume types.&quot;
          volumeNames:
          - lib-modules
          - var-run-calico
          - var-lib-calico
          - xtables-lock
          - cni-bin-dir
          - cni-net-dir
          - cni-log-dir
          - policysync
        - matchLabels:
            app: csi
            resources.gardener.cloud/managed-by: gardener
          namespaceMatchLabels:
            kubernetes.io/metadata.name: kube-system
          justification: &quot;Gardener managed resources are accepted to use a wider range of volume types.&quot;
          volumeNames:
          - registration-dir
          - plugin-dir
          - kubelet-dir
          - pods-mount-dir
          - host-dev
          - device-dir
          - sys-devices-dir
          - scsi-host-dir
        - matchLabels:
            k8s-app: egress-filter-applier
            resources.gardener.cloud/managed-by: gardener
          namespaceMatchLabels:
            kubernetes.io/metadata.name: kube-system
          justification: &quot;Gardener managed resources are accepted to use a wider range of volume types.&quot;
          volumeNames:
          - xtables-lock
        - matchLabels:
            role: proxy
            resources.gardener.cloud/managed-by: gardener
          namespaceMatchLabels:
            kubernetes.io/metadata.name: kube-system
          justification: &quot;Gardener managed resources are accepted to use a wider range of volume types.&quot;
          volumeNames:
          - ssl-certs-hosts
          - kernel-modules
          - kube-proxy-dir
          - kube-proxy-mode
          - xtables-lock
        - matchLabels:
            gardener.cloud/role: network-problem-detector
            resources.gardener.cloud/managed-by: gardener
          namespaceMatchLabels:
            kubernetes.io/metadata.name: kube-system
          justification: &quot;Gardener managed resources are accepted to use a wider range of volume types.&quot;
          volumeNames:
          - log
          - output
        - matchLabels:
            component: node-exporter
            gardener.cloud/role: monitoring
            resources.gardener.cloud/managed-by: gardener
          namespaceMatchLabels:
            kubernetes.io/metadata.name: kube-system
          justification: &quot;Gardener managed resources are accepted to use a wider range of volume types.&quot;
          volumeNames:
          - host
          - textfile
        - matchLabels:
            k8s-app: node-local-dns
            resources.gardener.cloud/managed-by: gardener
          namespaceMatchLabels:
            kubernetes.io/metadata.name: kube-system
          justification: &quot;Gardener managed resources are accepted to use a wider range of volume types.&quot;
          volumeNames:
          - xtables-lock
        - matchLabels:
            app: node-problem-detector
            resources.gardener.cloud/managed-by: gardener
          namespaceMatchLabels:
            kubernetes.io/metadata.name: kube-system
          justification: &quot;Gardener managed resources are accepted to use a wider range of volume types.&quot;
          volumeNames:
          - log
          - localtime
          - kmsg
        - matchLabels:
            app: vpn-shoot
            resources.gardener.cloud/managed-by: gardener
          namespaceMatchLabels:
            kubernetes.io/metadata.name: kube-system
          justification: &quot;Gardener managed resources are accepted to use a wider range of volume types.&quot;
          volumeNames:
          - dev-net-tun
    - ruleID: &quot;2005&quot;
      args:
        allowedImages:
        - prefix: &quot;europe-docker.pkg.dev/sap-se-gcp-k8s-c-delivery/&quot;
        - prefix: &quot;europe-docker.pkg.dev/gardener-project/&quot;
        - prefix: &quot;quay.io/prometheus/&quot; # required by node-exporter and blackbox-exporter
        - prefix: &quot;registry.k8s.io/coredns/&quot; # required by coredns
        - prefix: &quot;registry.k8s.io/dns/&quot; # required by node-local-dns
        - prefix: &quot;registry.k8s.io/metrics-server/&quot; # required by metric-server
        - prefix: &quot;registry.k8s.io/sig-storage/&quot; # required by csi-driver-node
        - prefix: &quot;registry.k8s.io/cloud-provider-gcp/&quot; # required by csi-driver-node
        - prefix: &quot;registry.k8s.io/node-problem-detector/&quot; # required by node-problem-detector
    - ruleID: &quot;2006&quot;
      args:
        acceptedClusterRoles:
        - matchLabels:
            kubernetes.io/bootstrapping: rbac-defaults
          justification: &quot;Default RBAC Roles.&quot;
        - matchLabels:
            gardener.cloud/role: vpa
            resources.gardener.cloud/managed-by: gardener
          justification: &quot;VPA RBAC Roles require */scale permissions to vertically scale resources.&quot;
    - ruleID: &quot;2007&quot;
      args:
        acceptedClusterRoles:
        - matchLabels:
            kubernetes.io/bootstrapping: rbac-defaults
          justification: &quot;Default RBAC Roles.&quot;
        - matchLabels:
            gardener.cloud/role: vpa
            resources.gardener.cloud/managed-by: gardener
          justification: &quot;VPA RBAC Roles require */scale permissions to vertically scale resources.&quot;
    - ruleID: &quot;2008&quot;
      args:
        acceptedPods:
        - matchLabels:
            k8s-app: calico-node
            resources.gardener.cloud/managed-by: gardener
          namespaceMatchLabels:
            kubernetes.io/metadata.name: kube-system
          justification: &quot;Gardener managed resources are accepted to use hostPath volumes.&quot;
          volumeNames:
          - lib-modules
          - var-run-calico
          - var-lib-calico
          - xtables-lock
          - cni-bin-dir
          - cni-net-dir
          - cni-log-dir
          - policysync
        - matchLabels:
            app: csi
            resources.gardener.cloud/managed-by: gardener
          namespaceMatchLabels:
            kubernetes.io/metadata.name: kube-system
          justification: &quot;Gardener managed resources are accepted to use hostPath volumes.&quot;
          volumeNames:
          - registration-dir
          - plugin-dir
          - kubelet-dir
          - pods-mount-dir
          - host-dev
          - device-dir
          - sys-devices-dir
          - scsi-host-dir
        - matchLabels:
            k8s-app: egress-filter-applier
            resources.gardener.cloud/managed-by: gardener
          namespaceMatchLabels:
            kubernetes.io/metadata.name: kube-system
          justification: &quot;Gardener managed resources are accepted to use hostPath volumes.&quot;
          volumeNames:
          - xtables-lock
        - matchLabels:
            role: proxy
            resources.gardener.cloud/managed-by: gardener
          namespaceMatchLabels:
            kubernetes.io/metadata.name: kube-system
          justification: &quot;Gardener managed resources are accepted to use hostPath volumes.&quot;
          volumeNames:
          - ssl-certs-hosts
          - kernel-modules
          - kube-proxy-dir
          - kube-proxy-mode
          - xtables-lock
        - matchLabels:
            gardener.cloud/role: network-problem-detector
            resources.gardener.cloud/managed-by: gardener
          namespaceMatchLabels:
            kubernetes.io/metadata.name: kube-system
          justification: &quot;Gardener managed resources are accepted to use hostPath volumes.&quot;
          volumeNames:
          - log
          - output
        - matchLabels:
            component: node-exporter
            gardener.cloud/role: monitoring
            resources.gardener.cloud/managed-by: gardener
          namespaceMatchLabels:
            kubernetes.io/metadata.name: kube-system
          justification: &quot;Gardener managed resources are accepted to use hostPath volumes.&quot;
          volumeNames:
          - host
          - textfile
        - matchLabels:
            k8s-app: node-local-dns
            resources.gardener.cloud/managed-by: gardener
          namespaceMatchLabels:
            kubernetes.io/metadata.name: kube-system
          justification: &quot;Gardener managed resources are accepted to use hostPath volumes.&quot;
          volumeNames:
          - xtables-lock
        - matchLabels:
            app: node-problem-detector
            resources.gardener.cloud/managed-by: gardener
          namespaceMatchLabels:
            kubernetes.io/metadata.name: kube-system
          justification: &quot;Gardener managed resources are accepted to use hostPath volumes.&quot;
          volumeNames:
          - log
          - localtime
          - kmsg
        - matchLabels:
            app: vpn-shoot
            resources.gardener.cloud/managed-by: gardener
          namespaceMatchLabels:
            kubernetes.io/metadata.name: kube-system
          justification: &quot;Gardener managed resources are accepted to use hostPath volumes.&quot;
          volumeNames:
          - dev-net-tun
output:
  minStatus: Passed
</code></pre></details><h2 id="security-compliance-report-for-hardened-shoot-clusters" tabindex="-1">Security Compliance Report for Hardened Shoot Clusters <a class="header-anchor" href="#security-compliance-report-for-hardened-shoot-clusters" aria-label="Permalink to &quot;Security Compliance Report for Hardened Shoot Clusters&quot;">​</a></h2><p>The report can be directly viewed by clicking <a href="/hardend_shoots_report.html" target="_self">here</a> or downloaded by clicking <a href="/hardened_shoots_report.html" download="hardened_shoots_report">here</a></p>`,18)]))}const g=n(o,[["render",s]]);export{p as __pageData,g as default};
