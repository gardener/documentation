---
github_repo: 'https://github.com/stackitcloud/gardener-extension-provider-stackit'
github_subdir: docs/usage
params:
  github_branch: main
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/infrastructure-extensions/gardener-extension-provider-stackit/usage.md
  to: usage.md
persona: Users
title: Usage
prev: false
next: false
---
<!-- BANNER:MANAGED -->
<!--
   █▀▀ ▀█▀ █▀█ █▀█
   ▀▀█  █  █ █ █▀▀
   ▀▀▀  ▀  ▀▀▀ ▀

   ┌────────────────────────────────────────────────┐
   │  MANAGED FILE — aggregated from upstream       │
   │                                                │
   │  Editing here is pointless: The nightly        │
   │  aggregation run overwrites this file.         │
   │                                                │
   │  Open a PR against the source instead: ─────┐  │
   │                          ┌──┐    ┌──────────┘  │
   │                          └──│────┘             │
   │           ┌─────────────────┘                  │
   └───────────│────────────────────────────────────┘
               ▼               
   https://github.com/stackitcloud/gardener-extension-provider-stackit/blob/main/docs/usage/usage.md
-->


# Using the STACKIT provider extension with Gardener as end-user

The [`core.gardener.cloud/v1beta1.Shoot` resource](https://github.com/gardener/gardener/blob/master/example/90-shoot.yaml) declares a few fields that are meant to contain provider-specific configuration.

In this document we describe how this configuration looks for STACKIT and provide an example `Shoot` manifest with minimal configuration that you can use to create a STACKIT cluster, except for the landscape-specific information such as cloud profile names and credentials binding names.

## Provider Secret Data

Every shoot cluster references a `CredentialsBinding` via `credentialsBindingName` which itself references a `Secret` by `credentialsRef`. This `Secret` contains the provider credentials of your STACKIT project.
This `Secret` must look as follows:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: core-stackit
  namespace: garden-dev
type: Opaque
data:
  project-id: base64(project-id)
  serviceaccount.json: base64(service-account-key-json)
```

The two required fields are:

| Field | Description |
| --- | --- |
| `project-id` | The STACKIT project identifier. |
| `serviceaccount.json` | The STACKIT service account key in JSON format. |

The service account must be granted the STACKIT permissions required by the deployed components. The roles referenced in this repository are:

| Permission | Purpose |
| --- | --- |
| `nlb.admin` | CCM service-controller, network load balancer and self-hosted shoot exposure controller |
| `alb.admin` | application load balancer controller |
| `blockstorage.admin` | CSI driver |
| `compute.admin` | CCM node-controller and MCM |
| `iaas.network.admin` | bastion and infrastructure controller |
| `iaas.isolated-network.admin` | infrastructure controller |

## Workload identity

Workload identity allows pods in a shoot cluster to authenticate against STACKIT APIs without static service account credentials. When enabled, the extension deploys the `stackit-pod-identity-webhook` into the shoot's control plane and a corresponding `MutatingWebhookConfiguration` into the shoot cluster.

For newly created pods, the webhook injects a projected ServiceAccount token and configures the STACKIT SDK for secretless authentication.

The webhook is only deployed when both of the following conditions are met:

- `EnableSTACKITWorkloadIdentity` feature gate is enabled on the extension (see the [deployment documentation](/docs/extensions/infrastructure-extensions/gardener-extension-provider-stackit/deployment/#enabling-workload-identity))
- Shoot uses a service account token issuer

### Configure a service account token issuer

The shoot must use a service account token issuer. This requirement is met by exactly one of the following two mutually exclusive options:

**Managed issuer** – annotate the shoot with `authentication.gardener.cloud/issuer=managed`:

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: Shoot
metadata:
  name: my-shoot
  namespace: garden-my-project
  annotations:
    authentication.gardener.cloud/issuer: "managed"
```

The managed issuer requires the Gardener Discovery Server to be deployed. Do not set `spec.kubernetes.kubeAPIServer.serviceAccountConfig.issuer` together with this annotation. Annotating the shoot does not trigger reconciliation immediately, so annotate with `gardener.cloud/operation=reconcile` or wait for the maintenance window.

**Custom issuer** – set `spec.kubernetes.kubeAPIServer.serviceAccountConfig.issuer` to a valid `https` URL:

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: Shoot
metadata:
  name: my-shoot
  namespace: garden-my-project
  annotations:
spec:
  kubernetes:
    kubeAPIServer:
      serviceAccountConfig:
        issuer: https://my-issuer.example.com
```

### Establish trust with STACKIT

Workload identity only works if the STACKIT identity provider is configured to trust your cluster's service account issuer:

1. In the STACKIT Portal, configure [Service Account Federation](https://docs.stackit.cloud/platform/access-and-identity/service-accounts/how-tos/manage-service-account-federations/) for the STACKIT Service Account that your workloads will assume.
1. Provide the cluster's `serviceAccountIssuer` URL. The issuer can be retrieved from the shoot's status:
   
   ```bash
   kubectl -n <project> get shoot <shoot> -o jsonpath='{.status.advertisedAddresses[?(@.name=="service-account-issuer")].url}'
   ```

1. Create an assertion mapping on the `sub` claim to restrict the STACKIT Service Account to a specific Kubernetes `ServiceAccount`, formatted exactly as `system:serviceaccount:<namespace>:<name>`.

### Configure your workloads

Enable workload identity for a `ServiceAccount` by annotating it with `workload-identity.stackit.cloud/service-account-email`:

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: app
  namespace: default
  annotations:
    workload-identity.stackit.cloud/service-account-email: "<stackit-service-account-email>"
```

The webhook then injects the projected token volume and the required environment variables (such as `STACKIT_SERVICE_ACCOUNT_EMAIL`) into pods that use this `ServiceAccount`. See the [documentation](https://github.com/stackitcloud/stackit-pod-identity-webhook#serviceaccount-annotations) for the full list of supported annotations and their defaults.

To exclude a pod or namespace from the webhook, set the `workload-identity.stackit.cloud/skip-pod-identity-webhook` label on the pod or namespace.

## `InfrastructureConfig`

The infrastructure configuration mainly describes how the network layout looks like in order to create the shoot worker nodes in a later step.

An example `InfrastructureConfig` for the STACKIT extension looks as follows:

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: Shoot
metadata:
  name: johndoe-stackit
  namespace: garden-dev
spec:
  provider:
    infrastructureConfig:
      apiVersion: stackit.provider.extensions.gardener.cloud/v1alpha1
      kind: InfrastructureConfig
      networks:
        workers: 10.250.0.0/19
```

The `networks.workers` section describes the CIDR for the (isolated) network that is used for all shoot worker nodes, i.e., VMs which later run your applications. You can freely choose this CIDR and it is your responsibility to properly design the network layout to suit your needs.

Instead of creating a new network, you can reuse an existing network by specifying its ID via `networks.id`:

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: Shoot
metadata:
  name: johndoe-stackit
  namespace: garden-dev
spec:
  provider:
    infrastructureConfig:
      apiVersion: stackit.provider.extensions.gardener.cloud/v1alpha1
      kind: InfrastructureConfig
      networks:
        id: 12345678-abcd-efef-08af-0123456789ab
```

When `networks.id` is set, the `networks.workers` CIDR must not be set. The `networks.id` value must be a valid STACKIT network ID (UUID).

> [!NOTE]
> `networks.worker` is a deprecated alias for `networks.workers`. If both are set, `networks.workers` takes precedence.

The optional `networks.dnsServers` field overrides the DNS servers configured in the `CloudProfile` (`CloudProfileConfig.dnsServers`) and is used when the worker network is created:

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: Shoot
metadata:
  name: johndoe-stackit
  namespace: garden-dev
spec:
  provider:
    infrastructureConfig:
      apiVersion: stackit.provider.extensions.gardener.cloud/v1alpha1
      kind: InfrastructureConfig
      networks:
        workers: 10.250.0.0/19
        dnsServers:
          - 1.1.1.1
```

The whole `networks` section is immutable after cluster creation.

## `ControlPlaneConfig`

The control plane configuration mainly contains values for the STACKIT-specific control plane components (`cloud-controller-manager` and CSI driver), as well as the optional Application Load Balancer controller.

An example `ControlPlaneConfig` for the STACKIT extension looks as follows:

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: Shoot
metadata:
  name: johndoe-stackit
  namespace: garden-dev
spec:
  provider:
    controlPlaneConfig:
      apiVersion: stackit.provider.extensions.gardener.cloud/v1alpha1
      kind: ControlPlaneConfig
      cloudControllerManager:
        name: stackit
        # featureGates:
        #   SomeKubernetesFeature: true
      storage:
        csi:
          name: stackit
      applicationLoadBalancer:
        enabled: true
        ingress:
          enabled: true
```

### `cloudControllerManager`

The optional `cloudControllerManager.name` field selects which cloud-controller-manager is deployed:

- `stackit` (default) – the STACKIT cloud-controller-manager.

The `cloudControllerManager.featureGates` field contains a map of explicitly enabled or disabled feature gates. For production usage it's not recommended to use this field at all, as you can enable alpha features or disable beta/stable features, potentially impacting cluster stability. If you don't want to configure anything, simply omit the key in the YAML specification.

### `storage.csi`

The optional `storage.csi.name` field selects the CSI driver for block storage:

- `stackit` (default) – the STACKIT CSI driver.

### `applicationLoadBalancer`

The optional `applicationLoadBalancer` section enables the STACKIT Application Load Balancer (ALB) controller:

- `applicationLoadBalancer.enabled` activates the ALB integration.
- `applicationLoadBalancer.ingress.enabled` activates the Ingress controller for the ALB.

When the ALB is enabled, at least one controller source (currently only `ingress`) must be enabled.

> **Note:** ALB support must be enabled in the admission webhook configuration before it can be used in a shoot. See [Deployment](/docs/extensions/infrastructure-extensions/gardener-extension-provider-stackit/deployment/) for details.

### Deprecated fields

The `zone` field is deprecated and will be removed in a future version. Don't use it anymore.

## `WorkerConfig`

Each worker group in a shoot may contain provider-specific configurations and options. These are contained in the `providerConfig` section of a worker group and can be configured using a `WorkerConfig` object. An example of a `WorkerConfig` within a shoot looks as follows:

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: Shoot
metadata:
  name: johndoe-stackit
  namespace: garden-dev
spec:
  provider:
    workers:
      - name: worker-xoluy
        providerConfig:
          apiVersion: stackit.provider.extensions.gardener.cloud/v1alpha1
          kind: WorkerConfig
          # nodeTemplate: # (to be specified only if the node capacity would be different from cloudprofile info during runtime)
          #   capacity:
          #     cpu: 2
          #     nvidia.com/gpu: 0
          #     memory: 50Gi
```

### Node Templates

The `nodeTemplate` section allows overriding the capacity of the nodes as defined by the server flavor specified in the `CloudProfile`'s `machineTypes`. This is useful for dynamic scenarios as it allows customizing cluster-autoscaler's behavior for this worker group with the provided values (e.g., scaling a node group from zero).

## `SelfHostedShootExposureConfig`

For [self-hosted shoots](https://gardener.cloud/docs/gardener/extensions/resources/selfhostedshootexposure/), the `SelfHostedShootExposure` resource's `providerConfig` section can be used to configure the STACKIT load balancer that exposes the control plane. An example looks as follows:

```yaml
apiVersion: extensions.gardener.cloud/v1alpha1
kind: SelfHostedShootExposure
metadata:
  name: self-hosted-exposure
  namespace: kube-system
spec:
  type: stackit
  providerConfig:
    apiVersion: stackit.provider.extensions.gardener.cloud/v1alpha1
    kind: SelfHostedShootExposureConfig
    loadBalancer:
      planID: p10
      # accessControl:
      #   allowedSourceRanges:
      #   - 203.0.113.0/24
```

- `loadBalancer.planID` specifies the service plan (size) of the load balancer. Defaults to `p10`. Check the [STACKIT Load Balancer documentation](https://docs.stackit.cloud/products/network/load-balancing-and-content-delivery/network-load-balancer/reference/service-plans/) for all supported plans.
- `loadBalancer.accessControl.allowedSourceRanges` restricts which source IP ranges (CIDRs) may reach the load balancer. An empty or missing list means no source-IP restriction is applied.

## Example `Shoot` manifest

Please find below an example `Shoot` manifest:

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: Shoot
metadata:
  name: johndoe-stackit
  namespace: garden-dev
spec:
  cloudProfile:
    name: stackit
  region: eu01
  credentialsBindingName: core-stackit
  provider:
    type: stackit
    infrastructureConfig:
      apiVersion: stackit.provider.extensions.gardener.cloud/v1alpha1
      kind: InfrastructureConfig
      networks:
        workers: 10.250.0.0/19
    controlPlaneConfig:
      apiVersion: stackit.provider.extensions.gardener.cloud/v1alpha1
      kind: ControlPlaneConfig
      cloudControllerManager:
        name: stackit
      storage:
        csi:
          name: stackit
    workers:
      - name: worker-xoluy
        machine:
          type: MY-MACHINE-TYPE
        minimum: 2
        maximum: 2
        zones:
          - eu01-1
  networking:
    nodes: 10.250.0.0/19
    type: calico
  kubernetes:
    version: 1.33.0
  maintenance:
    autoUpdate:
      kubernetesVersion: true
      machineImageVersion: true
```

## CSI volume provisioners

By default, every STACKIT shoot cluster is deployed with the STACKIT CSI driver, which uses the `block-storage.csi.stackit.cloud` provisioner.
