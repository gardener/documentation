---
description: Learn how to set up a local development environment
github_repo: 'https://github.com/gardener/gardener-extension-auditing'
github_subdir: docs/development
params:
  github_branch: main
path_base_for_github_subdir:
  from: >-
    content/contribute/extensions/gardener-extension-auditing/getting-started-locally.md
  to: getting-started-locally.md
persona: Developers
title: Deploying Auditing Extension Locally
prev: false
next: false
managed: true
---

# Deploying Auditing Extension Locally

## Setup without Gardener Operator

### Prerequisites

- Make sure that you have a running local Gardener setup. The steps to complete this can be found in the [Deploying Gardener Locally guide](/contribute/developer-starter-kit/getting_started_locally/).

### Setting up the Auditing Extension

Make sure that your `KUBECONFIG` environment variable is targeting the local Gardener cluster. When this is ensured, run:

```bash
make extension-up
```

The corresponding make target will build the extension image, load it into the kind cluster Nodes, and deploy the auditing ControllerDeployment and ControllerRegistration resources. The container image in the ControllerDeployment will be the image that was build and loaded into the kind cluster Nodes.

In addition to than an echo server will be deployed in its own Namespace which can be used as a dummy auditlogging backend.

The make target will then deploy the auditing admission component. It will build the admission image, load it into the kind cluster Nodes, and finally install the admission component charts to the kind cluster.

### Creating a Shoot Cluster

1. Create a secret containing the credentials used for mTLS.
   
   ```bash
   kubectl -n garden-local create secret generic echo-server-creds \
       --from-file=ca.crt=example/local-setup/dev/certs/ca.crt \
       --from-file=client.crt=example/local-setup/dev/certs/client.crt \
       --from-file=client.key=example/local-setup/dev/certs/client.key
   ```

1. Deploy an auditing policy.
   
   [`example/local-setup/audit-policy.yaml`](https://github.com/gardener/gardener-extension-auditing/blob/main/example/local-setup/audit-policy.yaml) contains a Policy specification:
   ```bash
   kubectl apply -f example/local-setup/audit-policy.yaml
   ```

1. Create a Shoot cluster.
   
   [`example/local-setup/shoot.yaml`](https://github.com/gardener/gardener-extension-auditing/blob/main/example/local-setup/shoot.yaml) contains a Shoot specification with the `auditing` extension:
   ```bash
   kubectl apply -f example/local-setup/shoot.yaml
   ```

1. Once the Shoot namespace is created in the seed cluster create a NetworkPolicy which will allow traffic from the auditlog forwarder to the echo server.
   
   [`example/local-setup/netpol.yaml`](https://github.com/gardener/gardener-extension-auditing/blob/main/example/local-setup/netpol.yaml) contains a NetworkPolicy allowing communication between the auditlog forwarder and the echo server:
   ```bash
   kubectl apply -f example/local-setup/netpol.yaml
   ```

## Setup with Gardener Operator

Alternatively, you can deploy the auditing extension in the `gardener-operator` local setup. To do this, make sure you are have a running local setup based on [Alternative Way to Set Up Garden and Seed Leveraging `gardener-operator`](/contribute/developer-starter-kit/getting_started_locally/#alternative-way-to-set-up-garden-and-seed-leveraging-gardener-operator). The `KUBECONFIG` environment variable should target the operator local KinD cluster (i.e. `<path_to_gardener_project>/dev-setup/kubeconfigs/runtime/kubeconfig`).

```bash
export KUBECONFIG=$(pwd)/../gardener/dev-setup/kubeconfigs/runtime/kubeconfig
```

### Creating the auditing `Extension.operator.gardener.cloud` resource:

```bash
make extension-operator-up
```

The corresponding make target will build the auditing admission and extension container images, OCI artifacts for the admission runtime and application charts, and the extension chart. Then, the container images and the OCI artifacts are pushed into the default skaffold registry (i.e. `registry.local.gardener.cloud:5001`). Next, the auditing `Extension.operator.gardener.cloud` resource is deployed into the KinD cluster. Based on this resource the gardener-operator will deploy the auditing admission component, as well as the auditing ControllerDeployment and ControllerRegistration resources.

### Creating a Shoot Cluster

1. Target the Garden cluster.
   
   ```bash
   export KUBECONFIG=$(pwd)/../gardener/dev-setup/kubeconfigs/virtual-garden/kubeconfig
   ```

1. Create a secret containing the credentials used for mTLS.
   
   ```bash
   kubectl -n garden-local create secret generic echo-server-creds \
       --from-file=ca.crt=example/local-setup/dev/certs/ca.crt \
       --from-file=client.crt=example/local-setup/dev/certs/client.crt \
       --from-file=client.key=example/local-setup/dev/certs/client.key
   ```

1. Deploy an auditing policy.
   
   [`example/local-setup/audit-policy.yaml`](https://github.com/gardener/gardener-extension-auditing/blob/main/example/local-setup/audit-policy.yaml) contains a Policy specification:
   ```bash
   kubectl apply -f example/local-setup/audit-policy.yaml
   ```

1. Create a Shoot cluster.
   
   [`example/local-setup/shoot.yaml`](https://github.com/gardener/gardener-extension-auditing/blob/main/example/local-setup/shoot.yaml) contains a Shoot specification with the `auditing` extension:
   ```bash
   kubectl apply -f example/local-setup/shoot.yaml
   ```

1. Once the Shoot namespace is created in the seed cluster create a NetworkPolicy which will allow traffic from the auditlog forwarder to the echo server.
   [`example/local-setup/netpol.yaml`](https://github.com/gardener/gardener-extension-auditing/blob/main/example/local-setup/netpol.yaml) contains a NetworkPolicy allowing communication between the auditlog forwarder and the echo server:
   
   ```bash
   kubectl --kubeconfig $(pwd)/../gardener/dev-setup/kubeconfigs/runtime/kubeconfig apply -f example/local-setup/netpol.yaml
   ```

### Enable the extension for the Garden cluster

1. Target the runtime cluster
   
   ```bash
   export KUBECONFIG=$(pwd)/../gardener/dev-setup/kubeconfigs/runtime/kubeconfig
   ```

1. Create a secret containing the credentials used for mTLS.
   
   ```bash
   kubectl -n garden create secret generic echo-server-creds \
       --from-file=ca.crt=example/local-setup/dev/certs/ca.crt \
       --from-file=client.crt=example/local-setup/dev/certs/client.crt \
       --from-file=client.key=example/local-setup/dev/certs/client.key
   ```

1. Apply audit and network policies
   
   ```bash
   kubectl apply -f example/local-setup/garden/audit-policy.yaml
   kubectl apply -f example/local-setup/garden/audit-policy-garden.yaml
   kubectl apply -f example/local-setup/garden/netpol.yaml
   ```

1. Patch the `Garden` resource to enable the extension
   
   Use `kubectl patch` to add the auditing extension configuration to the existing Garden resource:
   
   ```bash
   kubectl patch garden local --type=merge -p '
   spec:
     extensions:
     - type: auditing
       providerConfig:
         apiVersion: auditing.extensions.gardener.cloud/v1alpha1
         kind: AuditConfiguration
         backends:
         - http:
             url: https://echo-server.echo-server.svc.cluster.local
             tls:
               secretReferenceName: audit-mtls-creds
     resources:
     - name: audit-mtls-creds
       resourceRef:
         apiVersion: v1
         kind: Secret
         name: echo-server-creds
     virtualCluster:
       kubernetes:
         kubeAPIServer:
           auditConfig:
             auditPolicy:
               configMapRef:
                 name: audit-policy
       gardener:
         gardenerAPIServer:
           auditConfig:
             auditPolicy:
               configMapRef:
                 name: audit-policy-garden
   '
   ```
   
   > [!NOTE]
   > 
   > This patch merges the auditing extension configuration with the existing Garden spec. If other extensions are already configured, they will be preserved. The URL points to the local echo-server deployed in the setup, and the secret references the `echo-server-creds` created in step 2.
   
   Verify the extension is enabled:
   
   ```bash
   kubectl get garden local -o jsonpath='{.spec.extensions[?(@.type=="auditing")]}'
   ```

### Delete the auditing `Extension.operator.gardener.cloud` resource

1. Delete any shoots using the extension.
   
   ```bash
   kubectl -n garden-local annotate shoot local confirmation.gardener.cloud/deletion=true
   kubectl -n garden-local delete shoot local --wait=false
   ```

1. Disable the extension if configured for the Garden cluster.
   
   ```bash
   kubectl patch garden local --type=json -p '[
     {"op": "test", "path": "/spec/extensions/0/type", "value": "auditing"},
     {"op": "remove", "path": "/spec/extensions/0"},
     {"op": "test", "path": "/spec/resources/0/name", "value": "audit-mtls-creds"},
     {"op": "remove", "path": "/spec/resources/0"},
     {"op": "remove", "path": "/spec/virtualCluster/kubernetes/kubeAPIServer/auditConfig"},
     {"op": "remove", "path": "/spec/virtualCluster/gardener/gardenerAPIServer/auditConfig"}
   ]'
   ```

1. Make sure the environment variable `KUBECONFIG` points to the operator's local KinD cluster and then run:
   
   ```bash
   make extension-operator-down
   ```
   
   The corresponding make target will delete the `Extension.operator.gardener.cloud` resource. Consequently, the gardener-operator will delete the auditing admission component and auditing ControllerDeployment and ControllerRegistration resources.
