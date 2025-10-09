---
title: Deploying Gardener on OpenStack
---

# Deploying Gardener on OpenStack

TODO: introduction

## Content

1. Prerequisites
2. Deploy the Gardener Operator
3. Deploying `Extension`s
4. Deploying infrastructure `Secret`s
5. Deploying the `Garden` resource
6. Creating a `Seed` cluster
7. Creating a `CloudProfile`

## Prerequisites

* Runtime cluster
  * Associated `Node`, `Pod`, and `Service` CIDR ranges 
* DNS zone
* OpenStack service user
  * DNS application credentials
  * Backup application credentials

## Deploy the Gardener Operator

TODO: paragraph

```shell
helm upgrade \
  --install gardener-operator \
  --namespace=garden \
  --create-namespace \
  oci://europe-docker.pkg.dev/gardener-project/releases/charts/gardener/operator:v1.129.0 \
  --set replicaCount=3
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

## Deploying infrastructure `Secret`s

### DNS `Secret`

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: core-openstack
  namespace: garden-dev
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

```

## Deploying the `Garden` resource

## Creating a `Seed` cluster

## Creating a `CloudProfile`
