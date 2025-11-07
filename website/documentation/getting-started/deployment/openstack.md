---
title: Deploying Gardener on OpenStack
---

# Deploying Gardener on OpenStack

TODO: introduction

## Content

1. Prerequisites
2. Deploy the Gardener Operator
3. Deploying `Extension`s
4. Deploying infrastructure `Secret`s in the runtime cluster
5. Deploying the `Garden` resource
6. Accessing the virtual garden cluster
7. Deploying infrastructure `Secret`s in the virtual garden cluster
8. Creating the first `Seed` cluster
9. Creating a `CloudProfile`

## Prerequisites

* Runtime cluster
  * Associated `Node`, `Pod`, and `Service` CIDR ranges 
* DNS zone
* OpenStack service user
  * DNS application credentials
  * Backup application credentials

### Tools

* kubectl
* helm

## Deploy the Gardener Operator

TODO: paragraph

```shell
helm upgrade \
  --install gardener-operator \
  --namespace=garden \
  --create-namespace \
  oci://europe-docker.pkg.dev/gardener-project/releases/charts/gardener/operator:v1.131.1 \
  --set replicaCount=3
```

Verify:
```shell
kubectl get deploy -n garden gardener-operator
```

```terminal
NAME                READY   UP-TO-DATE   AVAILABLE   AGE
gardener-operator   3/3     3            3           29s
```

TODO: reference documentation

## Deploying `Extension`s

### OpenStack Provider Extension

<details>
    <summary>Manifest</summary>

```yaml
apiVersion: operator.gardener.cloud/v1alpha1
kind: Extension
metadata:
  annotations:
    security.gardener.cloud/pod-security-enforce: baseline
  name: provider-openstack
spec:
  deployment:
    admission:
      runtimeCluster:
        helm:
          ociRepository:
            ref: europe-docker.pkg.dev/gardener-project/public/charts/gardener/extensions/admission-openstack-runtime:v1.49.1
      virtualCluster:
        helm:
          ociRepository:
            ref: europe-docker.pkg.dev/gardener-project/public/charts/gardener/extensions/admission-openstack-application:v1.49.1
    extension:
      helm:
        ociRepository:
          ref: europe-docker.pkg.dev/gardener-project/public/charts/gardener/extensions/provider-openstack:v1.49.1
      injectGardenKubeconfig: true
  resources:
  - kind: BackupBucket
    type: openstack
  - kind: BackupEntry
    type: openstack
  - kind: Bastion
    type: openstack
  - kind: ControlPlane
    type: openstack
  - kind: DNSRecord
    type: openstack-designate
  - kind: Infrastructure
    type: openstack
  - kind: Worker
    type: openstack
```
</details>

Verify:
```terminal
extension.operator.gardener.cloud/provider-openstack created
```

### Garden Linux Operating System Extension

<details>
    <summary>Manifest</summary>

```yaml
apiVersion: operator.gardener.cloud/v1alpha1
kind: Extension
metadata:
  annotations:
    security.gardener.cloud/pod-security-enforce: baseline
  name: os-gardenlinux
spec:
  deployment:
    extension:
      helm:
        ociRepository:
          ref: europe-docker.pkg.dev/gardener-project/public/charts/gardener/extensions/os-gardenlinux:v0.33.0
  resources:
  - kind: OperatingSystemConfig
    type: gardenlinux
  - kind: OperatingSystemConfig
    type: memoryone-gardenlinux
```
</details>

Verify:

```terminal
extension.operator.gardener.cloud/os-gardenlinux created
```

### DNS Extension

<details>
    <summary>Manifest</summary>

```yaml
apiVersion: operator.gardener.cloud/v1alpha1
kind: Extension
metadata:
  annotations:
    security.gardener.cloud/pod-security-enforce: baseline
  name: extension-shoot-dns-service
spec:
  deployment:
    admission:
      runtimeCluster:
        helm:
          ociRepository:
            ref: europe-docker.pkg.dev/gardener-project/releases/charts/gardener/extensions/shoot-dns-service-admission-runtime:v1.70.0
      virtualCluster:
        helm:
          ociRepository:
            ref: europe-docker.pkg.dev/gardener-project/releases/charts/gardener/extensions/shoot-dns-service-admission-application:v1.70.0
    extension:
      helm:
        ociRepository:
          ref: europe-docker.pkg.dev/gardener-project/releases/charts/gardener/extensions/shoot-dns-service:v1.70.0
  resources:
  - autoEnable:
    - shoot
    clusterCompatibility:
    - shoot
    kind: Extension
    type: shoot-dns-service
    workerlessSupported: true
```
</details>

Verify:

```terminal
extension.operator.gardener.cloud/extension-shoot-dns-service created
```

### Certificate Extension

<details>
    <summary>Manifest</summary>

```yaml
apiVersion: operator.gardener.cloud/v1alpha1
kind: Extension
metadata:
  annotations:
    security.gardener.cloud/pod-security-enforce: baseline
  name: extension-shoot-cert-service
spec:
  deployment:
    extension:
      helm:
        ociRepository:
          ref: europe-docker.pkg.dev/gardener-project/public/charts/gardener/extensions/shoot-cert-service:v1.53.0
      injectGardenKubeconfig: true
      policy: Always
      runtimeClusterValues:
        certificateConfig:
          defaultIssuer:
            acme:
              email: some.user@example.com
              server: https://acme-v02.api.letsencrypt.org/directory
            name: garden
      values:
        certificateConfig:
          defaultIssuer:
            acme:
              email: some.user@example.com
              server: https://acme-v02.api.letsencrypt.org/directory
            name: garden
  resources:
  - autoEnable:
    - shoot
    clusterCompatibility:
    - shoot
    kind: Extension
    type: shoot-cert-service
    workerlessSupported: true
  - clusterCompatibility:
    - garden
    - seed
    kind: Extension
    lifecycle:
      delete: AfterKubeAPIServer
      reconcile: BeforeKubeAPIServer
    type: controlplane-cert-service
```
</details>

Verify:

```terminal
extension.operator.gardener.cloud/extension-shoot-cert-service created
```

### Calico Extension

<details>
    <summary>Manifest</summary>

```yaml
apiVersion: operator.gardener.cloud/v1alpha1
kind: Extension
metadata:
  annotations:
    security.gardener.cloud/pod-security-enforce: baseline
  name: networking-calico
spec:
  deployment:
    admission:
      runtimeCluster:
        helm:
          ociRepository:
            ref: europe-docker.pkg.dev/gardener-project/public/charts/gardener/extensions/admission-calico-runtime:v1.51.0
      virtualCluster:
        helm:
          ociRepository:
            ref: europe-docker.pkg.dev/gardener-project/public/charts/gardener/extensions/admission-calico-application:v1.51.0
    extension:
      helm:
        ociRepository:
          ref: europe-docker.pkg.dev/gardener-project/public/charts/gardener/extensions/networking-calico:v1.51.0
  resources:
  - kind: Network
    type: calico
```
</details>

Verify:

```terminal
extension.operator.gardener.cloud/networking-calico created
```

### Verify Extensions

```shell
kubectl get extop
```

```terminal
NAME                           INSTALLED   REQUIRED RUNTIME   REQUIRED VIRTUAL   AGE
extension-shoot-cert-service   False       False                                 31m
extension-shoot-dns-service    False       False                                 33m
networking-calico              False       False                                 30m
os-gardenlinux                 False       False                                 34m
provider-openstack             False       False                                 36m
```

## Deploying infrastructure `Secret`s in the runtime cluster

### DNS `Secret`

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: garden-dns
  namespace: garden
type: Opaque
stringData:
  authUrl: <auth-url> # TODO: 
  domainName: <domain-name> # TODO: 
  tenantName: <tenant-name> # TODO:

  applicationCredentialID: <application-credential-id> # TODO:
  applicationCredentialName: <application-credential-name> # TODO:
  applicationCredentialSecret: <application-credential-secret> # TODO:
```

### Backup `Secret`

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: virtual-garden-etcd-main-backup
  namespace: garden
type: Opaque
stringData:
  authURL: <auth-url> # TODO:
  domainName: <domain-name> # TODO:
  tenantName: <tenant-name> # TODO:
  username: <username> # TODO:
  password: <password> # TODO:
```

## Deploying the `Garden` resource

```yaml
apiVersion: operator.gardener.cloud/v1alpha1
kind: Garden
metadata:
  name: garden
spec:
  dns:
    providers:
    - name: primary
      type: openstack-designate
      secretRef:
        name: garden-dns
  runtimeCluster:
    ingress:
      domains:
      - name: ingress.garden.<base-domain> # TODO: 
        provider: primary
      controller:
        kind: nginx
    networking:
      nodes:
      - <node-cidr> # TODO: Get values from GKE
      pods:
      - <pod-cidr> # TODO: Get values from GKE
      services:
      - <service-cidr> # TODO: Get values from GKE
    provider:
      region: <region> # TODO: Use region from GKE cluster
      zones: # TODO: Use zones of the region
      - <zone-1> 
      - <zone-2>
      - <zone-3>
    settings:
      verticalPodAutoscaler:
        enabled: false # TODO: Enable if runtime cluster does not bring its own VPA
      topologyAwareRouting:
        enabled: true
  virtualCluster:
    controlPlane:
      highAvailability: {}
    dns:
      domains:
      - name: api.garden.<base-domain> # TODO:
        provider: primary
    etcd:
      main:
        backup:
          provider: openstack
          secretRef:
            name: virtual-garden-etcd-main-backup
        storage:
          capacity: 25Gi
      events:
        storage:
          capacity: 10Gi
    kubernetes:
      version: 1.33.5
    gardener:
      clusterIdentity: gardener
      gardenerDashboard: {}
      gardenerDiscoveryServer: {}
    maintenance:
      timeWindow:
        begin: 220000+0100
        end: 230000+0100
    networking:
      services:
      - 100.64.0.0/13
```

Verify:

```shell
kubectl get garden --watch
```

## Accessing the virtual garden cluster

## Deploying infrastructure `Secret`s in the virtual garden cluster

### DNS `Secret`

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: soil-dns
  namespace: garden
type: Opaque
stringData:
  authUrl: <auth-url> # TODO: 
  domainName: <domain-name> # TODO: 
  tenantName: <tenant-name> # TODO:

  applicationCredentialID: <application-credential-id> # TODO:
  applicationCredentialName: <application-credential-name> # TODO:
  applicationCredentialSecret: <application-credential-secret> # TODO:
```

### Backup `Secret`

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: soil-backup
  namespace: garden
type: Opaque
stringData:
  authURL: <auth-url> # TODO:
  domainName: <domain-name> # TODO:
  tenantName: <tenant-name> # TODO:
  username: <username> # TODO:
  password: <password> # TODO:
```

## Creating the first `Seed` cluster

```yaml
apiVersion: seedmanagement.gardener.cloud/v1alpha1
kind: Gardenlet
metadata:
  name: soil
  namespace: garden
spec:
  config:
    apiVersion: gardenlet.config.gardener.cloud/v1alpha1
    kind: GardenletConfiguration
    logging:
      enabled: true
      shootNodeLogging:
        shootPurposes:
        - infrastructure
    resources:
      capacity:
        shoots: "20" # Consider adjusting
    seedConfig:
      spec:
        backup:
          credentialsRef:
            apiVersion: v1
            kind: Secret
            name: soil-backup
            namespace: garden
          provider: openstack
          region: <region> # TODO: Use OpenStack region
        dns:
          internal:
            credentialsRef:
              apiVersion: v1
              kind: Secret
              name: soil-dns
              namespace: garden
            domain: internal.soil.<base-domain> # TODO:
            type: openstack-designate
          provider:
            secretRef:
              name: soil-dns
              namespace: garden
            type: openstack-designate
        extensions:
        - providerConfig:
            apiVersion: service.cert.extensions.gardener.cloud/v1alpha1
            generateControlPlaneCertificate: true
            kind: CertConfig
          type: controlplane-cert-service
        ingress:
          controller:
            kind: nginx
          domain: ingress.soil.<base-domain> # TODO:
        networks:
          nodes: <node-cidr> # TODO: Use runtime cluster node CIDR
          pods: <pod-cidr> # TODO: Use runtime cluster pod CIDR
          services: <service-cidr> # TODO: Use runtime cluster service CIDR
          shootDefaults:
            pods: 100.112.0.0/13
            services: 100.160.0.0/13
        provider:
          region: <region> # TODO: Use region of GKE runtime cluster
          type: gcp
          zones: # TODO: Use zones of GKE runtime cluster
          - <zone-1>
          - <zone-2>
          - <zone-3>
        settings:
          loadBalancerServices:
            externalTrafficPolicy: Local
            zones:
            - externalTrafficPolicy: Local
              name: <zone-1> # TODO:
            - externalTrafficPolicy: Local
              name: <zone-2> # TODO:
            - externalTrafficPolicy: Local
              name: <zone-3> # TODO:
          topologyAwareRouting:
            enabled: true
          verticalPodAutoscaler:
            enabled: false
        taints:
        - key: seed.gardener.cloud/protected
  deployment:
    helm:
      ociRepository:
        repository: europe-docker.pkg.dev/gardener-project/releases/charts/gardener/gardenlet
        tag: v1.131.1
    image:
      pullPolicy: IfNotPresent
    podLabels:
      networking.resources.gardener.cloud/to-virtual-garden-kube-apiserver-tcp-443: allowed
    replicaCount: 2
    revisionHistoryLimit: 2
```

## Creating a `CloudProfile`

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: CloudProfile
metadata:
  name: openstack
spec:
  kubernetes:
    versions:
    - classification: supported
      expirationDate: "2026-06-28T23:59:59Z" # https://endoflife.date/kubernetes
      version: 1.33.5
  machineImages:
  - name: gardenlinux
    updateStrategy: minor
    versions:
    - architectures:
      - amd64
      - arm64
      classification: supported
      cri:
      - name: containerd
      version: 1877.6
  machineTypes:
  - architecture: <architecture> # TODO: amd64 or arm64
    cpu: "<cpu-count>" # TODO:
    gpu: "<gpu-count>" # TODO:
    memory: <memory> # TODO: Gi
    name: <name> # TODO:
    storage:
      class: standard
      size: <storage-size> # TODO:
      type: default
    usable: true
  regions: 
  - name: <region> # TODO:
    zones:
    - name: <zone-1> # TODO:
    - name: <zone-2> # TODO:
    - name: <zone-3> # TODO:
  providerConfig:
    apiVersion: openstack.provider.extensions.gardener.cloud/v1alpha1
    kind: CloudProfileConfig
    keystoneURLs:
    - region: <region> # TODO:
      url: <keystone-url> # TODO:
    machineImages:
    - name: gardenlinux
      versions:
      - regions:
        - id: <machine-image-id> # TODO:
          name: <region-name> # TODO:
    regions:
    constraints:
      floatingPools:
      - defaultFloatingSubnet: FloatingIP-internet-*
        loadBalancerClasses: 
        - floatingSubnetName: FloatingIP-internet-*
          name: internet
        name: FloatingIP*
        region: <region> # TODO:
```
