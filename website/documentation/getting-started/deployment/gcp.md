---
title: Deploying Gardener on GCP
---

# Deploy Gardener on GCP

## Prerequisites

* A project on [GCP](https://console.cloud.google.com/)
  * A zone in [GCP Cloud DNS](https://console.cloud.google.com/net-services/dns/zones) 
* Tools:
  * [gcloud](https://docs.cloud.google.com/sdk/docs/install-sdk#latest-version)
  * [helm](https://helm.sh/docs/intro/install/#through-package-managers)
  * [GNU sed](https://www.gnu.org/software/sed/)
  * [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl)
    * [gke-gcloud-auth-plugin](https://docs.cloud.google.com/kubernetes-engine/docs/how-to/cluster-access-for-kubectl#install_plugin)


## Create a Runtime Cluster on GKE

> [!NOTE]
> [GKE Autopilot clusters](https://docs.cloud.google.com/kubernetes-engine/docs/concepts/autopilot-overview) cannot be used as a runtime cluster.

Create a [GKE cluster on GCP](https://console.cloud.google.com/kubernetes/list/overview). 
Make sure to enable [vertical Pod autoscaling](https://docs.cloud.google.com/kubernetes-engine/docs/concepts/verticalpodautoscaler).

Take note of the region that you choose for your cluster e.g. `europe-north1`.

*Reference documentation:*
* [Runtime Cluster](https://gardener.cloud/docs/gardener/deployment/setup_gardener/#runtime-cluster)

## Set the Environment Variables

In the commands in the sections below we'll frequently need the name of the GCP project, the GCP region, and the GKE cluster.

Set the environment variables for these accordingly.

```shell
export GARDENER_GCP_PROJECT=<gcp-project>
export GARDENER_GCP_REGION=<gcp-region>
export GARDENER_GKE_CLUSTER=<gke-cluster>
```

## Set Your `kubectl` Context to Your GKE Runtime Cluster

Set your `kubectl` context to your newly created GKE runtime cluster using the `gcloud` CLI.

```shell
gcloud auth login
gcloud container clusters get-credentials $GARDENER_GKE_CLUSTER --region $GARDENER_GCP_REGION --project $GARDENER_GCP_PROJECT
```

Verify that the `kubectl` context changed:

```shell
kubectl config current-context
```

*Output:*

```terminaloutput
gke_<gcp-project>_<gcp-region>_<gke-cluster>
```

Verify the connection to your GKE runtime cluster by fetching the nodes:

```shell
kubectl get nodes
```

*Output:*

```terminaloutput
NAME                                       STATUS   ROLES    AGE   VERSION
gke-runtime-2-default-pool-446fba09-7ghv   Ready    <none>   19h   v1.36.4-gke.2377000
gke-runtime-2-default-pool-446fba09-8kc6   Ready    <none>   19h   v1.36.4-gke.2377000
gke-runtime-2-default-pool-446fba09-k58m   Ready    <none>   19h   v1.36.4-gke.2377000
gke-runtime-2-default-pool-5f0dacf3-3js5   Ready    <none>   19h   v1.36.4-gke.2377000
gke-runtime-2-default-pool-5f0dacf3-f0tp   Ready    <none>   19h   v1.36.4-gke.2377000
gke-runtime-2-default-pool-5f0dacf3-fqqf   Ready    <none>   19h   v1.36.4-gke.2377000
gke-runtime-2-default-pool-ee60a788-5zbn   Ready    <none>   19h   v1.36.4-gke.2377000
gke-runtime-2-default-pool-ee60a788-r245   Ready    <none>   19h   v1.36.4-gke.2377000
gke-runtime-2-default-pool-ee60a788-rcqn   Ready    <none>   19h   v1.36.4-gke.2377000
```

## Deploy the Gardener Operator

We'll deploy the [Gardener Operator](https://gardener.cloud/docs/gardener/concepts/operator/) into the runtime cluster to bootstrap Gardener.
It is responsible for reconciling `Extension` and `Garden` resources.

Install the operator using its Helm chart.

```shell
helm upgrade \
  --install gardener-operator \
  --namespace=garden \
  --create-namespace \
  oci://europe-docker.pkg.dev/gardener-project/releases/charts/gardener/operator:v1.155.0 \
  --set replicaCount=2
```

Verify that the `gardener-operator` deployment is coming up:
```shell
kubectl get deploy -n garden gardener-operator --watch
```

*Output:*

```terminal
NAME                READY   UP-TO-DATE   AVAILABLE   AGE
gardener-operator   2/2     2            2           29s
```

## Deploy `Extension`s

Gardener is built on an [extensibility concept](https://gardener.cloud/docs/gardener/extensions/#extensibility-overview) and makes use of various extensions.
A Gardener landscape needs a minimum set of extensions that cover the following functions: 
* Talking to an infrastructure provider
* Providing an operating system for cluster nodes
* Taking care of external DNS management
* Provisioning TLS certificates
* Installing the [container network interface (CNI)](https://kubernetes.io/docs/concepts/extend-kubernetes/compute-storage-net/network-plugins/)

### GCP Provider Extension

We'll use the [GCP provider extension](https://gardener.cloud/docs/extensions/infrastructure-extensions/gardener-extension-provider-gcp/) for managing resources on the GCP infrastructure.

Apply the extension from the [repository](https://github.com/gardener/gardener-extension-provider-gcp).

```shell
kubectl apply -f https://raw.githubusercontent.com/gardener/gardener-extension-provider-gcp/refs/tags/v1.58.1/example/extension.yaml
```

Verify that the extension has been created:
```shell
kubectl get extop provider-gcp
```

*Output:*

```terminaloutput
NAME           INSTALLED   REQUIRED RUNTIME   REQUIRED VIRTUAL   AGE
provider-gcp   False                                             25s
```

### Garden Linux Operating System Extension

> [!NOTE]
> You could choose any of the available [operating system extensions](https://gardener.cloud/docs/extensions/os-extensions/).

We'll use [Garden Linux](https://docs.gardenlinux.org/) as the operating system for our cluster nodes.

Install the operating system extension for Garden Linux from the [repository](https://github.com/gardener/gardener-extension-os-gardenlinux).

```shell
kubectl apply -f https://raw.githubusercontent.com/gardener/gardener-extension-os-gardenlinux/refs/tags/v0.51.0/example/extension.yaml
```

Verify that the extension has been created:

```shell
kubectl get extop os-gardenlinux
```

*Output:*

```terminaloutput
NAME             INSTALLED   REQUIRED RUNTIME   REQUIRED VIRTUAL   AGE
os-gardenlinux   False                                             8s
```

### DNS Extension

Gardener uses the DNS extension to provide external DNS management capabilities.

Install the DNS extension from the [repository](https://github.com/gardener/gardener-extension-shoot-dns-service).

```shell
kubectl apply -f https://raw.githubusercontent.com/gardener/gardener-extension-shoot-dns-service/refs/tags/v1.95.1/example/extension-shoot-dns-service.yaml
```

Verify that the extension has been created:

```shell
kubectl get extop extension-shoot-dns-service
```

*Output:*

```terminaloutput
NAME                          INSTALLED   REQUIRED RUNTIME   REQUIRED VIRTUAL   AGE
extension-shoot-dns-service   False                                             7s
```

### Certificate Extension

Gardener uses the certificate extension to provision and manage the lifecycle of TLS certificates.
The certificates are automatically provisioned using the [ACME protocol](https://en.wikipedia.org/wiki/Automatic_Certificate_Management_Environment).
The extension makes use of [Let's Encrypt](https://letsencrypt.org/) as the [certificate authority (CA)](https://en.wikipedia.org/wiki/Certificate_authority).

Install the certificate extension from the [repository](https://github.com/gardener/gardener-extension-shoot-cert-service).
Your email address is required for Let's Encrypt.

```shell
EMAIL=<your-email>
curl -s https://raw.githubusercontent.com/gardener/gardener-extension-shoot-cert-service/refs/tags/v1.67.0/example/extension.yaml | sed -E "s/[[:alnum:]_.+-]+@example\.com/$EMAIL/" | kubectl apply -f -
```

Verify that the extension has been created and that your email is used for ACME:

```shell
kubectl get extop extension-shoot-cert-service -oyaml | grep -C 1 'email:'
```

*Output:*

```terminaloutput
            acme:
              email: <your-email>
              server: https://acme-v02.api.letsencrypt.org/directory
--
            acme:
              email: <your-email>
              server: https://acme-v02.api.letsencrypt.org/directory
```

### Calico Extension

> [!NOTE]
> You can also choose [Cilium](https://cilium.io/) as your CNI using the [Cilium extension](https://github.com/gardener/gardener-extension-networking-cilium).

A [container network interface (CNI)](https://kubernetes.io/docs/concepts/extend-kubernetes/compute-storage-net/network-plugins/) is required for the clusters.
We'll use [Calico](https://docs.tigera.io/calico/latest/about/) as the CNI for the Gardener managed shoot clusters.

Install the Calico extension from the [repository](https://github.com/gardener/gardener-extension-networking-calico).

```shell
kubectl apply -f https://raw.githubusercontent.com/gardener/gardener-extension-networking-calico/refs/tags/v1.60.3/example/extension.yaml
```

Verify that the extension has been created:

```shell
kubectl get extop networking-calico
```
*
*Output:*

```terminaloutput
NAME                INSTALLED   REQUIRED RUNTIME   REQUIRED VIRTUAL   AGE
networking-calico   False                                             12s
```

### Verify Extensions

```shell
kubectl get extop
```

```terminaloutput
NAME                           INSTALLED   REQUIRED RUNTIME   REQUIRED VIRTUAL   AGE
extension-shoot-cert-service   False                                             3m54s
extension-shoot-dns-service    False                                             6m22s
networking-calico              False                                             11s
os-gardenlinux                 False                                             6m34s
provider-gcp                   False                                             7m40s
```

Reference documentation: [Gardener Extension for Calico Networking](https://gardener.cloud/docs/extensions/network-extensions/gardener-extension-networking-calico/)

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

A YAML file named `secret-gcp.yaml` is now saved in your working directory.

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
SUBNET=$(gcloud container clusters describe $GARDENER_GKE_CLUSTER --location $GARDENER_GCP_REGION --project $GARDENER_GCP_PROJECT --format="value(subnetwork)")
gcloud container clusters describe $GARDENER_GKE_CLUSTER --location $GARDENER_GCP_REGION --project $GARDENER_GCP_PROJECT \
  --format="table(ipAllocationPolicy.clusterIpv4CidrBlock:label=POD,ipAllocationPolicy.servicesIpv4CidrBlock:label=SERVICE)"
gcloud compute networks subnets describe $SUBNET --region $GARDENER_GCP_REGION --project $GARDENER_GCP_PROJECT --format="table(ipCidrRange:label=NODE)"
```

```terminaloutput
POD             SERVICE
10.72.128.0/17  34.118.224.0/20
NODE
10.166.0.0/20
```

## Get the Availability Zones from Your GKE Cluster

```shell
gcloud container clusters describe $GARDENER_GKE_CLUSTER --location $GARDENER_GCP_REGION --project=$GARDENER_GCP_PROJECT --format="value(locations)" | tr ';' '\n' | sort
```

```terminaloutput
europe-north1-a
europe-north1-b
europe-north1-c
```

## Deploy the `Garden` Resource

```yaml
apiVersion: operator.gardener.cloud/v1alpha1
kind: Garden
metadata:
  name: garden
spec:
  extensions:
    - providerConfig:
        apiVersion: service.cert.extensions.gardener.cloud/v1alpha1
        generateControlPlaneCertificate: true
        kind: CertConfig
      type: controlplane-cert-service
  dns:
    providers:
    - name: primary
      type: google-clouddns
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
      - <node-cidr> # TODO: Use the node CIDR range of your GKE cluster
      pods:
      - <pod-cidr> # TODO: Use the pod CIDR range of your GKE cluster
      services:
      - <service-cidr> # TODO: Use the service CIDR range of your GKE cluster
    provider:
      region: <gcp-region> # TODO: Use the region of your GKE cluster
      zones: # TODO: Use the availability zones of your GKE cluster
      - <gcp-zone-1>
      - <gcp-zone-2>
      - <gcp-zone-3>
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
          region: <gcp-region> # TODO: Use the region of your GKE cluster
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
    maintenance:
      timeWindow:
        begin: 220000+0100
        end: 230000+0100
```

```shell
kubectl apply -f garden.yaml
```

Verify:

```shell
kubectl get garden --watch
```

```terminal
NAME     K8S VERSION   GARDENER VERSION   LAST OPERATION   RUNTIME   VIRTUAL   API SERVER   OBSERVABILITY   AGE
garden   1.33.5        v1.133.0           Succeeded        True      True      True         False           10m
```

Reference documentation: [How to Set Up a Gardener Landscape | Garden](https://gardener.cloud/docs/gardener/deployment/setup_gardener/#garden)

## Access the Virtual Garden Cluster

To access the virtual garden cluster, generate a kubeconfig for it using the `generate-kubeconfig.sh` helper script from the [`gardener/gardener`](https://github.com/gardener/gardener) GitHub repository.

Clone the repository and change into it:

```shell
git clone https://github.com/gardener/gardener.git
cd gardener
```

Run the `generate-kubeconfig.sh` helper script:

```shell
./hack/usage/generate-kubeconfig.sh virtual-garden --runtime-kubeconfig '<runtime-cluster-kubeconfig>' --garden-name garden > ~/Downloads/garden-kubeconfig.yaml # TODO: Use the path to the kubeconfig of your GKE runtime cluster. If you ran `gcloud container clusters get-credentials` earlier, your kubeconfig path will be `~/.kube/config`.
```

Set Your Context to the Virtual Garden Cluster

```shell
export KUBECONFIG="~/Downloads/garden-kubeconfig.yaml"
```

Verify your current context:

```shell
kubectl config current-context
```

```terminaloutput
virtual-garden
```

## Deploy Infrastructure `Secret`s in the Virtual Garden Cluster

Create a `Secret` in your virtual garden cluster:


```shell
kubectl apply -f secret-gcp.yaml
```

Verify:
```shell
kubectl get secret -n garden gcp
```

```terminaloutput
NAME   TYPE     DATA   AGE
gcp    Opaque   1      9h
```

## Create a `CredentialsBinding`

Create a `CredentialsBinding` that links the `gcp` secret to a provider account identity. The Shoot resource references this binding by name.

```yaml
apiVersion: security.gardener.cloud/v1alpha1
kind: CredentialsBinding
metadata:
  name: my-provider-account
  namespace: garden
provider:
  type: gcp
credentialsRef:
  apiVersion: v1
  kind: Secret
  name: gcp
  namespace: garden
```

```shell
kubectl apply -f credentials-binding.yaml
```

## Create the First `Seed` Cluster

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
            name: gcp
            namespace: garden
          provider: gcp
          region: <gcp-region> # TODO: Use the region of your GKE cluster
          providerConfig:
            apiVersion: gcp.provider.extensions.gardener.cloud/v1alpha1
            kind: BackupBucketConfig
        dns:
          internal:
            credentialsRef:
              apiVersion: v1
              kind: Secret
              name: gcp
              namespace: garden
            domain: internal.soil.<gcp-dns-zone> # TODO: Use your DNS zone
            type: google-clouddns
          provider:
            credentialsRef:
              apiVersion: v1
              kind: Secret
              name: gcp
              namespace: garden
            type: google-clouddns
        extensions:
        - providerConfig:
            apiVersion: service.cert.extensions.gardener.cloud/v1alpha1
            generateControlPlaneCertificate: true
            kind: CertConfig
          type: controlplane-cert-service
        ingress:
          controller:
            kind: nginx
          domain: ingress.soil.<gcp-dns-zone> # TODO: Use your DNS zone
        networks:
          nodes: <node-cidr> # TODO: Use the node CIDR range of your GKE cluster
          pods: <pod-cidr> # TODO: Use the pod CIDR range of your GKE cluster
          services: <service-cidr> # TODO: Use the service CIDR range of your GKE cluster
          shootDefaults:
            pods: 100.112.0.0/13
            services: 100.160.0.0/13
        provider:
          region: <gcp-region> # TODO: Use the region of your GKE cluster
          type: gcp
          zones: # TODO: Use the availability zones of your GKE cluster
          - <gcp-zone-1>
          - <gcp-zone-2>
          - <gcp-zone-3>
        settings:
          loadBalancerServices:
            externalTrafficPolicy: Local
            zones:
            # TODO: Use an availability zones of your GKE cluster
            - externalTrafficPolicy: Local
              name: <gcp-zone-1> 
            - externalTrafficPolicy: Local
              name: <gcp-zone-2>
            - externalTrafficPolicy: Local
              name: <gcp-zone-3>
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
        tag: v1.155.0
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

```terminaloutput
NAME   STATUS   LAST OPERATION               PROVIDER   REGION          AGE     VERSION    K8S VERSION
soil   Ready    Reconcile Succeeded (100%)   gcp        europe-north1   2m23s   v1.155.0   v1.36.4-gke.2377000
```

## Create a `CloudProfile`

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: CloudProfile
metadata:
  name: gcp
spec:
  type: gcp
  providerConfig:
    apiVersion: gcp.provider.extensions.gardener.cloud/v1alpha1
    kind: CloudProfileConfig
    machineImages:
      - name: gardenlinux
        versions:
          - version: 2150.14.0
            image: projects/sap-se-gcp-gardenlinux/global/images/gardenlinux-f03494b5e33cba13-2150-14-0-a213f775 ## TODO:
  kubernetes:
    versions:
      - version: 1.36.5
  machineImages:
    - name: gardenlinux
      versions:
        - version: 2150.14.0
  machineTypes:
    - name: n4-standard-2
      cpu: "2"
      gpu: "0"
      memory: 8Gi
      usable: true
  volumeTypes: # optional (not needed in every environment, may only be specified if no machineType has a `storage` field)
    - name: hyperdisk-balanced
      class: standard
      usable: true
  regions:
    - name: europe-north1
      zones:
      # TODO: Use the availability zones of your GKE cluster
        - name: <gcp-zone-1>
        - name: <gcp-zone-2>
        - name: <gcp-zone-3>
```

```shell
kubectl apply -f cloud-profile.yaml
```

Verify:

```shell
kubectl get cloudprofile   
```

```terminaloutput
NAME   PROVIDER   AGE
gcp    gcp        75s
```

Reference documentation: [How to Set Up a Gardener Landscape | Cloud Profile](https://gardener.cloud/docs/gardener/deployment/setup_gardener/#cloud-profile)

## Create a `Project`

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: Project
metadata:
  name: my-project
spec:
  namespace: garden-my-project
  tolerations:
    defaults:
    - key: seed.gardener.cloud/protected
    whitelist:
    - key: seed.gardener.cloud/protected
```

```shell
kubectl apply -f project.yaml
```

Verify:

```shell
kubectl get project
```

```terminaloutput
NAME         NAMESPACE           STATUS   OWNER        CREATOR      AGE
my-project   garden-my-project   Ready    admin-user   admin-user   78s
```

## Create a `CredentialsBinding`

```yaml
apiVersion: security.gardener.cloud/v1alpha1
kind: CredentialsBinding
metadata:
  name: my-provider-account
  namespace: garden-my-project
provider:
  type: gcp
credentialsRef:
  apiVersion: v1
  kind: Secret
  name: gcp
  namespace: garden
```

```shell
kubectl apply -f credentials-binding.yaml
```

Verify:

```shell
kubectl get credentialsbindings -n garden-my-project
```

```terminaloutput
NAME                  PROVIDER   APIVERSION   KIND     NAME         AGE
my-provider-account   gcp        v1           Secret   garden/gcp   30s
```

## Create a `Shoot`

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: Shoot
metadata:
  name: my-shoot
  namespace: garden-my-project
spec:
  tolerations:
  - key: seed.gardener.cloud/protected
  seedName: soil
  cloudProfile:
    name: gcp
  credentialsBindingName: my-provider-account
  region: europe-north1
  networking:
    type: calico
    nodes: 10.180.0.0/16
  provider:
    infrastructureConfig:
      apiVersion: gcp.provider.extensions.gardener.cloud/v1alpha1
      kind: InfrastructureConfig
      networks:
        workers: 10.180.0.0/16
    controlPlaneConfig:
      apiVersion: gcp.provider.extensions.gardener.cloud/v1alpha1
      kind: ControlPlaneConfig
      zone: europe-north1-a
    type: gcp
    workers:
    - name: default
      machine:
        type: n4-standard-2
      cri:
        name: containerd
      minimum: 1
      maximum: 2
      maxSurge: 1
      maxUnavailable: 0
      zones:
      - europe-north1-a
      volume:
        type: hyperdisk-balanced
        size: 50Gi
```

```shell
kubectl apply -f shoot.yaml
```

Verify:

```shell
kubectl get shoot -n garden-my-project
```

```terminaloutput
NAME       CLOUDPROFILE   PROVIDER   REGION          K8S VERSION   HIBERNATION   LAST OPERATION               STATUS    AGE
my-shoot   gcp            gcp        europe-north1   1.36.5        Awake         Reconcile Succeeded (100%)   healthy   14m
```

## Access Your Shoot Cluster

```shell
./hack/usage/generate-kubeconfig.sh shoot --namespace garden-my-project --shoot-name my-shoot --admin > ~/Downloads/shoot-kubeconfig.yaml
```

Set Your Context to the Virtual Garden Cluster

```shell
export KUBECONFIG="~/Downloads/shoot-kubeconfig.yaml"
```

Verify that you can access your shoot cluster:

```shell
kubectl get pods -n kube-system --kubeconfig ~/Downloads/shoot-kubeconfig.yaml 
```

```terminaloutput
NAME                                                  READY   STATUS    RESTARTS   AGE
blackbox-exporter-6c89f6fb75-4b489                    1/1     Running   0          13m
blackbox-exporter-6c89f6fb75-xjdc6                    1/1     Running   0          13m
calico-node-48zvq                                     1/1     Running   0          12m
calico-node-dl92c                                     1/1     Running   0          12m
calico-node-vertical-autoscaler-7ffc4f587d-jrt4m      1/1     Running   0          13m
calico-typha-deploy-778cc4df64-chxwf                  1/1     Running   0          11m
calico-typha-deploy-778cc4df64-rwfwl                  1/1     Running   0          11m
calico-typha-horizontal-autoscaler-55ff8f8cb5-wht89   1/1     Running   0          13m
calico-typha-vertical-autoscaler-6b86fc8fcd-gqknc     1/1     Running   0          13m
coredns-67f8c5c9c-fxwdl                               1/1     Running   0          13m
coredns-67f8c5c9c-wddhl                               1/1     Running   0          13m
csi-driver-node-lmmk7                                 3/3     Running   0          12m
csi-driver-node-mnwm7                                 3/3     Running   0          12m
kube-proxy-default-v1.36.5-5l59k                      2/2     Running   0          12m
kube-proxy-default-v1.36.5-8srb6                      2/2     Running   0          12m
metrics-server-b6b9c99d7-4kj85                        1/1     Running   0          13m
metrics-server-b6b9c99d7-ck88j                        1/1     Running   0          13m
node-exporter-2dncv                                   1/1     Running   0          12m
node-exporter-6rwjx                                   1/1     Running   0          12m
node-problem-detector-fws5h                           1/1     Running   0          12m
node-problem-detector-v2r4z                           1/1     Running   0          12m
vpn-shoot-69fffd49fc-jkzs2                            1/1     Running   0          13m
```
