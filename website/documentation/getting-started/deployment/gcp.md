# Deploy Gardener on Google Cloud

This guide walks you through setting up a Gardener landscape on Google Cloud.
To bootstrap Gardener, you require an initial Kubernetes cluster, which is called a runtime cluster.
We'll use a GKE runtime cluster and deploy the Gardener Operator to it.
The Gardener Operator reconciles the `Garden` resource to create the virtual garden cluster as the management plane of your landscape.
The virtual garden hosts Gardener resources such as `Seed`, `Project`, and `Shoot`.

If you want to learn more about the concepts and how everything fits together, refer to [How to Set Up a Gardener Landscape](https://gardener.cloud/docs/gardener/deployment/setup_gardener/).

This guide serves as a step-by-step reference for setting up a Gardener landscape.
Hence, it makes a lot of technical assumptions to allow for an easy to follow experience.
Its goal is to provide you with a functional Gardener setup.

## Content

TODO

## Prerequisites

* A project on [GCP](https://console.cloud.google.com/)
  * A zone in [GCP Cloud DNS](https://console.cloud.google.com/net-services/dns/zones)
* Tools:
  * [gcloud](https://docs.cloud.google.com/sdk/docs/install-sdk#latest-version)
  * [helm](https://helm.sh/docs/intro/install/#through-package-managers)
  * [GNU sed](https://www.gnu.org/software/sed/)
  * [jq](https://jqlang.github.io/jq/download/)
  * [yq](https://github.com/mikefarah/yq)
  * [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl)
    * [gke-gcloud-auth-plugin](https://docs.cloud.google.com/kubernetes-engine/docs/how-to/cluster-access-for-kubectl#install_plugin)

## Create a Runtime Cluster on GKE

> [!NOTE]
> [GKE Autopilot clusters](https://docs.cloud.google.com/kubernetes-engine/docs/concepts/autopilot-overview) cannot be used as a runtime cluster.

> [!TIP]
> You can use other Kubernetes clusters as runtime clusters instead of GKE.
> [Vertical pod autoscaling](https://kubernetes.io/docs/concepts/workloads/autoscaling/vertical-pod-autoscale/) should be enabled and the `kube-system` namespace has to be writeable for Gardener.

We need an initial Kubernetes cluster to deploy Gardener.
This initial cluster is called [runtime cluster](https://gardener.cloud/docs/gardener/deployment/setup_gardener/#runtime-cluster).
Create a [GKE cluster on GCP](https://console.cloud.google.com/kubernetes/list/overview).
Make sure to enable [vertical Pod autoscaling](https://docs.cloud.google.com/kubernetes-engine/docs/concepts/verticalpodautoscaler).

Take note of the region that you choose for your cluster, e.g. `europe-north1`.

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

Verify that the `kubectl` context changed.

```shell
kubectl config current-context
```

*Output:*

```terminaloutput
gke_<gcp-project>_<gcp-region>_<gke-cluster>
```

Verify the connection to your GKE runtime cluster by fetching the nodes.

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

Verify that the `gardener-operator` deployment is coming up.

```shell
kubectl get deploy -n garden gardener-operator --watch
```

*Output:*

```terminaloutput
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

Verify that the extension has been created.

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
> You can choose any of the available [operating system extensions](https://gardener.cloud/docs/extensions/os-extensions/).

We'll use [Garden Linux](https://docs.gardenlinux.org/) as the operating system for our cluster nodes.

Install the operating system extension for Garden Linux from the [repository](https://github.com/gardener/gardener-extension-os-gardenlinux).

```shell
kubectl apply -f https://raw.githubusercontent.com/gardener/gardener-extension-os-gardenlinux/refs/tags/v0.51.0/example/extension.yaml
```

Verify that the extension has been created.

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

Verify that the extension has been created.

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

Verify that the extension has been created and that your email is used for ACME.

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
We'll use [Calico](https://docs.tigera.io/calico/latest/about/) as the CNI for the Gardener-managed shoot clusters.

Install the Calico extension from the [repository](https://github.com/gardener/gardener-extension-networking-calico).

```shell
kubectl apply -f https://raw.githubusercontent.com/gardener/gardener-extension-networking-calico/refs/tags/v1.60.3/example/extension.yaml
```

Verify that the extension has been created.

```shell
kubectl get extop networking-calico
```

*Output:*

```terminaloutput
NAME                INSTALLED   REQUIRED RUNTIME   REQUIRED VIRTUAL   AGE
networking-calico   False                                             12s
```

### Verify Extensions

Fetch all extensions to verify that the minimum set of 5 extensions have been created.

```shell
kubectl get extop
```

*Output:*

```terminaloutput
NAME                           INSTALLED   REQUIRED RUNTIME   REQUIRED VIRTUAL   AGE
extension-shoot-cert-service   False                                             3m54s
extension-shoot-dns-service    False                                             6m22s
networking-calico              False                                             11s
os-gardenlinux                 False                                             6m34s
provider-gcp                   False                                             7m40s
```

## Deploy an Infrastructure `Secret` in the Runtime Cluster

We'll need credentials for the GCP infrastructure for Gardener to provision resources on it.

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

Create a `00-§.yaml` file from the downloaded JSON key file and apply it to the runtime cluster.

```shell
KEY_FILE=<path-to-json-key-file>
kubectl create secret generic gcp -n garden --from-file=serviceaccount.json=$KEY_FILE -oyaml --dry-run=client > 00-secret-gcp.yaml
kubectl apply -f 00-secret-gcp.yaml
```

Verify that the secret contains the `serviceaccount.json` in its data.

```shell
kubectl get secret -n garden gcp -oyaml
```

*Output:*

```yaml
apiVersion: v1
data:
  serviceaccount.json: ...
kind: Secret
metadata:
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: ...
  creationTimestamp: "2026-11-11T15:41:58Z"
  finalizers:
  - extensions.gardener.cloud/backupbucket
  - extensions.gardener.cloud/backupentry
  name: gcp
  namespace: garden
  resourceVersion: "1794414857312015003"
  uid: c47342d3-2171-43de-8255-6c5e915f8a65
type: Opaque
```

## Prepare the `Garden` Resource

We need a few configuration values to create the `Garden` resource.

Get the CIDR ranges from your GKE runtime cluster.

```shell
SUBNET=$(gcloud container clusters describe $GARDENER_GKE_CLUSTER --location $GARDENER_GCP_REGION --project $GARDENER_GCP_PROJECT --format="value(subnetwork)")
gcloud container clusters describe $GARDENER_GKE_CLUSTER --location $GARDENER_GCP_REGION --project $GARDENER_GCP_PROJECT \
  --format="table(ipAllocationPolicy.clusterIpv4CidrBlock:label=POD,ipAllocationPolicy.servicesIpv4CidrBlock:label=SERVICE)"
gcloud compute networks subnets describe $SUBNET --region $GARDENER_GCP_REGION --project $GARDENER_GCP_PROJECT --format="table(ipCidrRange:label=NODE)"
```

*Output:*

```terminaloutput
POD             SERVICE
10.72.128.0/17  34.118.224.0/20
NODE
10.166.0.0/20
```

Get the availability zones from your GKE runtime cluster.

```shell
gcloud container clusters describe $GARDENER_GKE_CLUSTER --location $GARDENER_GCP_REGION --project=$GARDENER_GCP_PROJECT --format="value(locations)" | tr ';' '\n' | sort
```

*Output:*

```terminaloutput
europe-north1-a
europe-north1-b
europe-north1-c
```

## Deploy the `Garden` Resource

The Gardener Operator reconciles the `Garden` resource.
Use the template below as a starting point for your configuration.

Fill in the placeholders in the template using the appropriate values for your environment (see the `# TODO: ...` markers).
Save the file as `01-garden.yaml`.

```yaml
# 01-garden.yaml
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

> [!TIP]
> Use `kubectl explain garden` or see the [API reference](https://gardener.cloud/docs/gardener/api-reference/operator/#garden).

Apply the `Garden` resource to the runtime cluster.

```shell
kubectl apply -f 01-garden.yaml
```

Verify that the `Garden` reconciles successfully.

```shell
kubectl get garden --watch
```

*Output:*

```terminaloutput
NAME     K8S VERSION   GARDENER VERSION   LAST OPERATION   RUNTIME   VIRTUAL   API SERVER   OBSERVABILITY   AGE
garden   1.36.4        v1.155.0           Succeeded        True      True      True         True            22h
```

## Access the Virtual Garden Cluster

To access the virtual garden cluster, generate a kubeconfig for it using the [generate-kubeconfig.sh](https://github.com/gardener/gardener/blob/master/hack/usage/generate-kubeconfig.sh) helper script from the `gardener/gardener` repository.

Run the `generate-kubeconfig.sh` helper script.

```shell
bash <(curl -fsSL https://raw.githubusercontent.com/gardener/gardener/refs/heads/master/hack/usage/generate-kubeconfig.sh) \
  virtual-garden \
  --runtime-kubeconfig "$KUBECONFIG" \
  --garden-name garden \
  > 02-garden-kubeconfig.yaml
```

Set your `kubectl` context to the virtual garden cluster.

```shell
export KUBECONFIG="$PWD/02-garden-kubeconfig.yaml"
```

Verify your current `kubectl` context.

```shell
kubectl config current-context
```

*Output:*

```terminaloutput
virtual-garden
```

## Deploy the Infrastructure `Secret` in the Virtual Garden Cluster

We'll reuse the GCP secret from before for the virtual garden cluster.

Apply the GCP secret to the virtual garden cluster.

```shell
kubectl apply -f 00-secret-gcp.yaml
```

Verify that the secret has been created.

```shell
kubectl get secret -n garden gcp
```

*Output:*

```terminaloutput
NAME   TYPE     DATA   AGE
gcp    Opaque   1      9h
```

## Deploy the `Gardenlet`

> [!TIP]
> You don't have to use your runtime cluster as a seed cluster.
> It's possible to deploy the `gardenlet` on another Kubernetes cluster, which registers it as a `Seed` in your `Garden`.
>
> For more details, see [Deploy a gardenlet Manually](https://gardener.cloud/docs/gardener/deployment/deploy_gardenlet_manually/).

We'll use the runtime cluster as the first seed cluster.
Semantically, the runtime cluster becomes the [soil](https://gardener.cloud/docs/glossary/#gardener-glossary) for future seed cluster.

Fill in the placeholders in the template using the appropriate values for your environment (see the `# TODO: ...` markers).
Save the file as `03-gardenlet.yaml`.

```yaml
# 03-gardenlet.yaml
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
        shoots: "20"
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
            # TODO: Use the availability zones of your GKE cluster
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

> [!TIP]
> Use `kubectl explain gardenlet` or see the [API reference](https://gardener.cloud/docs/gardener/api-reference/seedmanagement/#gardenlet).

Apply the `Gardenlet` resource to the virtual garden cluster.

```shell
kubectl apply -f 03-gardenlet.yaml
```

Verify that the `Gardenlet` has been created.

```shell
kubectl get gardenlet -n garden
```

*Output:*

```terminaloutput
NAME   OCI REPOSITORY                                                                       RECONCILED   AGE
soil   europe-docker.pkg.dev/gardener-project/releases/charts/gardener/gardenlet:v1.155.0   True         6h29m
```

The `gardenlet` creates a `Seed` resource based on its configuration.

Verify that the `Seed` resource reconciles successfully.

```shell
kubectl get seed soil --watch
```

*Output:*

```terminaloutput
NAME   STATUS   LAST OPERATION               PROVIDER   REGION          AGE     VERSION    K8S VERSION
soil   Ready    Reconcile Succeeded (100%)   gcp        europe-north1   2m23s   v1.155.0   v1.36.4-gke.2377000
```

## *Optional:* Visit the Gardener Dashboard

You can visit the Gardener Dashboard to visualize your landscape and for managing clusters in a UI.

Open the following URL in your browser:
`https://dashboard.ingress.garden.<dnz-zone>`

While the dashboard can be configured with OIDC, we'll use a token for authentication in this case.

Create a `ServiceAccount` called `dashboard-admin` in the virtual garden cluster.

```shell
kubectl create serviceaccount -n garden dashboard-admin
```

Bind the `dashboard-admin` to the `ClusterRole/cluster-admin`.

```shell
kubectl create clusterrolebinding dashboard-admin \
  --clusterrole=cluster-admin \
  --serviceaccount=garden:dashboard-admin
```

Generate a token for the `ServiceAccount`

```shell
kubectl create token -n garden dashboard-admin
```

Use the token for authentication in the dashboard.

> [!NOTE]
> All following sections can be done in the dashboard.
> The remaining guide continues using `kubectl`.

## Create a `CloudProfile`

In order to host a shoot cluster, at least one `CloudProfile` is required.

Fill in the placeholders in the template using the appropriate values for your environment (see the `# TODO: ...` markers).
Save the file as `04-cloudprofile-gcp.yaml`.

```yaml
# 04-cloudprofile-gcp.yaml
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
          # Find the latest version and image reference on the release page for Garden Linux:
          # https://github.com/gardenlinux/gardenlinux/releases
          - version: 2150.14.0
            image: projects/sap-se-gcp-gardenlinux/global/images/gardenlinux-f03494b5e33cba13-2150-14-0-a213f775
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
  volumeTypes:
    - name: hyperdisk-balanced
      class: standard
      usable: true
  regions:
    - name: <gcp-region> # TODO: Use the region of your GKE cluster
      zones:
      # TODO: Use the availability zones of your GKE cluster
        - name: <gcp-zone-1>
        - name: <gcp-zone-2>
        - name: <gcp-zone-3>
```

> [!TIP]
> Use `kubectl explain cloudprofile` or see the [API reference](https://gardener.cloud/docs/gardener/api-reference/core/#cloudprofile).

Apply the `CloudProfile` resource to the virtual garden cluster.

```shell
kubectl apply -f 04-cloudprofile-gcp.yaml
```

Verify that the `CloudProfile` resource has been created.

```shell
kubectl get cloudprofile
```

*Output:*

```terminaloutput
NAME   PROVIDER   AGE
gcp    gcp        75s
```

## Create a `Project`

Projects are used for logical separation of shoot clusters.

Save the file as `05-project.yaml`.

```yaml
# 05-project.yaml
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

> [!TIP]
> Use `kubectl explain project` or see the [API reference](https://gardener.cloud/docs/gardener/api-reference/core/#project).

Apply the `Project` resource to your virtual garden cluster.

```shell
kubectl apply -f project.yaml
```

Verify that the `Project` has been created.

```shell
kubectl get project
```

*Output:*

```terminaloutput
NAME         NAMESPACE           STATUS   OWNER        CREATOR      AGE
my-project   garden-my-project   Ready    admin-user   admin-user   78s
```

## Create a `CredentialsBinding`

> [!IMPORTANT]
> For productive environments, use separate credentials for shoot clusters.

A shoot cluster needs to reference credentials that are used to provision its infrastructure resources.
We'll reuse the GCP secret from earlier to create a `CredentialsBinding` resource.

Save the file as `06-credentialsbinding-gcp.yaml`

```yaml
# 06-credentialsbinding-gcp.yaml
apiVersion: security.gardener.cloud/v1alpha1
kind: CredentialsBinding
metadata:
  name: gcp
  namespace: garden-my-project
provider:
  type: gcp
credentialsRef:
  apiVersion: v1
  kind: Secret
  name: gcp
  namespace: garden
```

> [!TIP]
> Use `kubectl explain credentialsbinding` or see the [API reference](https://gardener.cloud/docs/gardener/api-reference/security/#credentialsbinding).

Apply the `CredentialsBinding` resource in the namespace of your project.

```shell
kubectl apply -f 06-credentialsbinding-gcp.yaml
```

Verify that the `CredentialsBinding` resource has been created.

```shell
kubectl get credentialsbindings -n garden-my-project
```

*Output:*

```terminaloutput
NAME   PROVIDER   APIVERSION   KIND     NAME         AGE
gcp    gcp        v1           Secret   garden/gcp   30s
```

## Create a `Shoot`

Finally, we'll create our first shoot cluster.

Fill in the placeholders in the template using the appropriate values for your environment (see the `# TODO: ...` markers).
Save the file as `07-shoot.yaml`.

```yaml
# 07-shoot.yaml
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
  region: <cloud-profile-region> # TODO: Use the region from your CloudProfile
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
      zone: <cloud-profile-az-1> # TODO: Use the first availability zone from your CloudProfile
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
      - <cloud-profile-az-1> # TODO: Use the first availability zone from your CloudProfile
      volume:
        type: hyperdisk-balanced
        size: 50Gi
```

> [!TIP]
> Use `kubectl explain shoot` or see the [API reference](https://gardener.cloud/docs/gardener/api-reference/core/#shoot).

Apply the `Shoot` resource in the namespace of your project.

```shell
kubectl apply -f 07-shoot.yaml
```

Verify that your `Shoot` reconciles successfully:

```shell
kubectl get shoot -n garden-my-project my-shoot --watch
```

*Output:*

```terminaloutput
NAME       CLOUDPROFILE   PROVIDER   REGION          K8S VERSION   HIBERNATION   LAST OPERATION               STATUS    AGE
my-shoot   gcp            gcp        europe-north1   1.36.5        Awake         Reconcile Succeeded (100%)   healthy   5h25m
```

## Access Your Shoot Cluster

Finally, to see that your shoot cluster is accessible we'll create a kubeconfig for it.

Run the [generate-kubeconfig.sh](https://github.com/gardener/gardener/blob/master/hack/usage/generate-kubeconfig.sh) script again to generate an admin kubeconfig for your shoot cluster.
It will create a file called `08-shoot-kubeconfig.yaml`.

```shell
bash <(curl -fsSL https://raw.githubusercontent.com/gardener/gardener/refs/heads/master/hack/usage/generate-kubeconfig.sh) \
  shoot \
  --namespace garden-my-project \
  --shoot-name my-shoot \
  --admin \
  > 08-shoot-kubeconfig.yaml
```

Verify the access to your shoot cluster by fetching the `Pod`s in the `kube-system` namespace.

```shell
kubectl get pods -n kube-system --kubeconfig ./08-shoot-kubeconfig.yaml
```

*Output:*

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
