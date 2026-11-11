---
title: Deploying Gardener on GCP
---

# Deploying Gardener on GCP

## Prerequisites

* A project on [GCP](https://console.cloud.google.com/)
  * A zone in [GCP Cloud DNS](https://console.cloud.google.com/net-services/dns/zones) 
* CLIs:
  * [gcloud](https://docs.cloud.google.com/sdk/docs/install-sdk#latest-version)
  * [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl)
  * [helm](https://helm.sh/docs/intro/install/#through-package-managers)
  * [GNU sed](https://www.gnu.org/software/sed/)

## Create a Runtime Cluster on GKE

Create a [GKE Autopilot cluster on GCP](https://console.cloud.google.com/kubernetes/list/overview).
Take note of the region that you choose for your cluster e.g. `europe-north1`.

## Set your `kubectl` Context to your Runtime Cluster

> [!NOTE]
> Useful information that users should know, even when skimming content.

Set your `kubectl` context to your newly created runtime cluster.

```shell
PROJECT=<gcp-project>
REGION=<gcp-region>
gcloud auth login
gcloud container clusters get-credentials runtime --region $REGION --project $PROJECT
```

Verify:
```shell
kubectl cluster-info
```

```terminaloutput
Kubernetes control plane is running at https://35.228.239.233
GLBCDefaultBackend is running at https://35.228.239.233/api/v1/namespaces/kube-system/services/default-http-backend:http/proxy
KubeDNS is running at https://35.228.239.233/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy
Metrics-server is running at https://35.228.239.233/api/v1/namespaces/kube-system/services/https:metrics-server:/proxy

To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
```

## Deploy the Gardener Operator

```shell
helm upgrade \
  --install gardener-operator \
  --namespace=garden \
  --create-namespace \
  oci://europe-docker.pkg.dev/gardener-project/releases/charts/gardener/operator:v1.155.0 \
  --set replicaCount=2 \
  --set config.featureGates.VictoriaLogsBackend=true \
  --set config.featureGates.RemoveVali=true
```

Verify:
```shell
kubectl get deploy -n garden gardener-operator --watch
```

```terminal
NAME                READY   UP-TO-DATE   AVAILABLE   AGE
gardener-operator   2/2     2            2           29s
```

## Deploying `Extension`s

### GCP Provider Extension

```shell
kubectl apply -f https://raw.githubusercontent.com/gardener/gardener-extension-provider-gcp/refs/tags/v1.58.1/example/extension.yaml
```

Verify:
```terminal
kubectl get extop provider-gcp
```

```terminaloutput
NAME           INSTALLED   REQUIRED RUNTIME   REQUIRED VIRTUAL   AGE
provider-gcp   False                                             25s
```

### Garden Linux Operating System Extension

```shell
kubectl apply -f https://raw.githubusercontent.com/gardener/gardener-extension-os-gardenlinux/refs/tags/v0.51.0/example/extension.yaml
```

Verify:

```terminal
kubectl get extop os-gardenlinux
```

```shell
NAME             INSTALLED   REQUIRED RUNTIME   REQUIRED VIRTUAL   AGE
os-gardenlinux   False                                             8s
```

### DNS Extension

```shell
kubectl apply -f https://raw.githubusercontent.com/gardener/gardener-extension-shoot-dns-service/refs/tags/v1.95.1/example/extension-shoot-dns-service.yaml
```

Verify:

```terminal
kubectl get extop extension-shoot-dns-service
```

```terminaloutput
NAME                          INSTALLED   REQUIRED RUNTIME   REQUIRED VIRTUAL   AGE
extension-shoot-dns-service   False                                             7s
```

### Certificate Extension

```shell
EMAIL=<your-email>
curl -s https://raw.githubusercontent.com/gardener/gardener-extension-shoot-cert-service/refs/tags/v1.67.0/example/extension.yaml | sed "s/\S\+@example.com/$EMAIL/" | kubectl apply -f -
```

Verify:

```terminal
kubectl get extop extension-shoot-cert-service
```

```shell
NAME                           INSTALLED   REQUIRED RUNTIME   REQUIRED VIRTUAL   AGE
extension-shoot-cert-service   False                                             46s
```

### Calico Extension

```shell
kubectl apply -f https://raw.githubusercontent.com/gardener/gardener-extension-networking-calico/refs/tags/v1.60.3/example/extension.yaml
```

Verify:

```terminal
kubectl get extop networking-calico
```

```terminaloutput
NAME                INSTALLED   REQUIRED RUNTIME   REQUIRED VIRTUAL   AGE
networking-calico   False                                             12s
```

### Verify Extensions

```shell
kubectl get extop
```

```terminal
NAME                           INSTALLED   REQUIRED RUNTIME   REQUIRED VIRTUAL   AGE
extension-shoot-cert-service   False                                             3m54s
extension-shoot-dns-service    False                                             6m22s
networking-calico              False                                             11s
os-gardenlinux                 False                                             6m34s
provider-gcp                   False                                             7m40s
```

## Deploy an Infrastructure `Secret` in the Runtime Cluster

Create a JSON key for a [service account](https://console.cloud.google.com/iam-admin/serviceaccounts) in your GCP project.
Download the JSON key for the service account.

The service account JSON looks similar to this:
```json
{
  "type": "service_account",
  "project_id": "<gcp-project>",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "...-compute@developer.gserviceaccount.com",
  "client_id": "...",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/...-compute%40developer.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}
```

```shell
KEY_FILE=<path-to-json-key-file>
kubectl create secret generic gcp -n garden --from-file=serviceaccount.json=$KEY_FILE -oyaml --dry-run=client > secret-gcp.yaml
kubectl apply -f secret-gcp.yaml
```

```terminaloutput
secret/gcp created
```

Verify:
```shell
kubectl get secret -n garden gcp
```

```terminaloutput
NAME   TYPE     DATA   AGE
gcp    Opaque   1      60s
```

## Get the CIDR Ranges from Your GKE Cluster

```shell
PROJECT=<gcp-project>
REGION=<gcp-region>
CLUSTER=<gke-cluster>
SUBNET=$(gcloud container clusters describe $CLUSTER --location $REGION --project $PROJECT --format="value(subnetwork)")
gcloud container clusters describe $CLUSTER --location $REGION --project $PROJECT \
  --format="table(ipAllocationPolicy.clusterIpv4CidrBlock:label=POD,ipAllocationPolicy.servicesIpv4CidrBlock:label=SERVICE)"
gcloud compute networks subnets describe $SUBNET --region $REGION --project $PROJECT --format="table(ipCidrRange:label=NODE)"
```

```terminaloutput
POD             SERVICE
10.72.128.0/17  34.118.224.0/20
NODE
10.166.0.0/20
```

## Get the Availability Zones from Your GKE Cluster

```shell
PROJECT=<gcp-project>
REGION=<gcp-region>
CLUSTER=<gke-cluster>
gcloud container clusters describe $CLUSTER --location $REGION --project=$PROJECT --format="value(locations)" | tr ';' '\n' | sort
```

```terminaloutput
europe-north1-a
europe-north1-b
europe-north1-c
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
      type: gcp
      secretRef:
        name: gcp
  runtimeCluster:
    ingress:
      domains:
      - name: ingress.garden.<gcp-dns-zone> # TODO: Use your DNS zone
        provider: primary
      controller:
        kind: nginx
    networking:
      nodes:
      - <node-cidr> # TODO: Use the Node CIDR range
      pods:
      - <pod-cidr> # TODO: Use the Pod CIDR range
      services:
      - <service-cidr> # TODO: Use the Service CIDR range
    provider:
      region: <gcp-region> # TODO: Use the region from your GKE cluster
      zones: # TODO: Use the availability zones of your GKE cluster
      - <gke-az-1>
      - <gke-az-2>
      - <gke-az-3>
    settings:
      verticalPodAutoscaler:
        enabled: false
      topologyAwareRouting:
        enabled: true
  virtualCluster:
    controlPlane:
      highAvailability: {}
    dns:
      domains:
      - name: garden.<gcp-dns-zone> # TODO: Use your DNS zone
        provider: primary
    etcd:
      main:
        backup:
          region: <gcp-region> # TODO: Use the region from your GKE cluster
          provider: gcp
          secretRef:
            name: gcp
        storage:
          capacity: 25Gi
      events:
        storage:
          capacity: 10Gi
    kubernetes:
      version: 1.36.4 # Use the latest supported Kubernetes version from Gardener: https://github.com/gardener/gardener#k8s-conformance-test-coverage-
    gardener:
      clusterIdentity: gardener
      gardenerDashboard: {}
      gardenerDiscoveryServer: {}
    networking:
      services:
      - 100.64.0.0/13
```

Verify:

```shell
kubectl get garden --watch
```

```terminal
NAME     K8S VERSION   GARDENER VERSION   LAST OPERATION   RUNTIME   VIRTUAL   API SERVER   OBSERVABILITY   AGE
garden   1.33.5        v1.133.0           Succeeded        True      True      True         False           10m
```

## Accessing the virtual garden cluster

```shell
# in gardener/gardener
./hack/usage/generate-kubeconfig.sh virtual-garden --runtime-kubeconfig '<runtime cluster kubeconfig>' --garden-name garden > ~/Downloads/garden-kubeconfig.yaml
```

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
          type: openstack
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
        tag: v1.133.0
    image:
      pullPolicy: IfNotPresent
    podLabels:
      networking.resources.gardener.cloud/to-virtual-garden-kube-apiserver-tcp-443: allowed
    replicaCount: 2
    revisionHistoryLimit: 2
```

Verify:

```shell
kubectl get seed --watch
```

```terminal

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
