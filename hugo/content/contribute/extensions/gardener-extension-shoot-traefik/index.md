---
description: Developer documentation for the Traefik ingress extension
github_repo: 'https://github.com/gardener/gardener-extension-shoot-traefik'
github_subdir: .
params:
  github_branch: main
path_base_for_github_subdir:
  from: content/contribute/extensions/gardener-extension-shoot-traefik/_index.md
  to: README.md
title: Traefik Ingress
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
   https://github.com/gardener/gardener-extension-shoot-traefik/blob/main/./README.md
-->


# gardener-extension-shoot-traefik

The `gardener-extension-shoot-traefik` deploys Traefik ingress controller to Gardener shoot clusters as a replacement for the nginx-ingress-controller which is out of maintenance.

## Features

- **Traefik Ingress Controller**: Deploys Traefik v3.x as the ingress controller in shoot clusters
- **Admission Webhook**: Validates that Traefik extension is only enabled for shoots with purpose "evaluation". Deployed as a separate admission controller using the same binary with the `webhook` subcommand.
- **ManagedResource**: Uses Gardener's ManagedResource mechanism for deployment and lifecycle management
- **Configurable**: Supports custom Traefik image, replicas, and ingress class configuration

## Requirements

- [Go 1.26.x](https://go.dev/) or later
- [GNU Make](https://www.gnu.org/software/make/)
- [Docker](https://www.docker.com/) for local development
- [Gardener Local Setup](https://gardener.cloud/docs/gardener/local_setup/) for local development
- Shoot clusters with purpose "evaluation"

## Usage

You can enable the extension on a [Gardener Shoot cluster](https://gardener.cloud/docs/glossary/_index#gardener-glossary) by adding it to `.spec.extensions`. The shoot's `spec.purpose` must be `evaluation` — this is enforced by an admission webhook.

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: Shoot
spec:
  purpose: evaluation
  extensions:
    - type: shoot-traefik
      providerConfig:
        apiVersion: traefik.extensions.gardener.cloud/v1alpha1
        kind: TraefikConfig
        spec:
          ingressProvider: KubernetesIngress
```

See [docs/usage/ingress-providers.md](/docs/extensions/others/gardener-extension-shoot-traefik/ingress-providers/) for the full configuration reference, ingress-provider details, and the dashboard guide.

## Admission Controller

The extension includes an admission controller that validates Shoot resources to ensure
the Traefik extension can only be enabled for shoots with `purpose: evaluation`.

The admission controller is deployed as a separate component using the same binary
(`extension-traefik webhook`) and has its own Helm charts under
`charts/gardener-extension-admission-shoot-traefik/`. Following the Gardener extension
convention, it consists of two sub-charts:

- **`charts/runtime/`** — Deployed in the runtime cluster. Contains the Deployment,
  Service, RBAC, VPA, and PodDisruptionBudget resources for the webhook server.
- **`charts/application/`** — Deployed in the virtual garden cluster. Contains the
  ClusterRole, ClusterRoleBinding, and ServiceAccount needed for the webhook to
  access Shoot resources.

### Deployment via Gardener Operator

When deploying via `gardener-operator`, the admission controller is automatically
deployed alongside the extension. The `Extension` resource (from group
`operator.gardener.cloud/v1alpha1`) specifies both the extension and the admission
deployment:

```yaml
apiVersion: operator.gardener.cloud/v1alpha1
kind: Extension
metadata:
  name: gardener-extension-shoot-traefik
spec:
  deployment:
    admission:
      runtimeCluster:
        helm:
          ociRepository:
            ref: <registry>/admission-shoot-traefik-runtime:<version>
      virtualCluster:
        helm:
          ociRepository:
            ref: <registry>/admission-shoot-traefik-application:<version>
    extension:
      helm:
        ociRepository:
          ref: <registry>/gardener-extension-shoot-traefik:<version>
  resources:
  - kind: Extension
    type: shoot-traefik
```

See [`examples/operator-extension/`](https://github.com/gardener/gardener-extension-shoot-traefik/tree/main/examples/operator-extension) for a
complete example.

## Development

In order to build a binary of the extension, you can use the following command.

```shell
make build
```

The resulting binary can be found in `bin/extension-traefik`.

In order to build a Docker image of the extension, you can use the following
command.

```shell
make docker-build
```

For local development of the `gardener-extension-shoot-traefik` it is recommended that
you setup a [development Gardener environment](https://gardener.cloud/docs/gardener/local_setup/).

Please refer to the next sections for more information about deploying and
testing the extension in a Gardener development environment.

## Development Environment with Gardener Operator

The extension can also be deployed via the
[Gardener Operator](https://gardener.cloud/docs/gardener/concepts/operator/).

In order to start a local development environment with the Gardener Operator,
please refer to the following documentations.

- [Gardener Operator](https://gardener.cloud/docs/gardener/concepts/operator/)
- [Gardener: Local setup with gardener-operator](https://gardener.cloud/docs/gardener/deployment/getting_started_locally/#alternative-way-to-set-up-garden-and-seed-leveraging-gardener-operator)

In summary, these are the steps you need to follow in order to start a local
development environment with the [Gardener Operator](https://gardener.cloud/docs/gardener/concepts/operator/),
however, please make sure that you read the documents above for additional details.

```shell
make kind-multi-zone-up operator-up operator-seed-up
```

Before you continue with the next steps, make sure that you configure your
`KUBECONFIG` to point to the kubeconfig file of the cluster, which runs the
Gardener Operator.

There will be two kubeconfig files created for you, after the dev environment
has been created.

| Path | Description |
| --- | --- |
| `/path/to/gardener/example/gardener-local/kind/multi-zone/kubeconfig` | Cluster in which `gardener-operator` runs (a.k.a *runtime* cluster) |
| `/path/to/gardener/dev-setup/kubeconfigs/virtual-garden/kubeconfig` | The *virtual* garden cluster |

Throughout this document we will refer to the kubeconfigs for *runtime* and
*virtual* clusters as `$KUBECONFIG_RUNTIME` and `$KUBECONFIG_VIRTUAL`
respectively.

Before deploying the extension we need to target the *runtime* cluster, since
this is where the extension resources for `gardener-operator` reside.

```shell
export KUBECONFIG=$KUBECONFIG_RUNTIME
```

In order to deploy the extension, execute the following command.

```shell
make deploy-operator
```

The `deploy-operator` target takes care of the following.

1. Builds a Docker image of the extension
1. Loads the image into the `kind` cluster nodes
1. Packages the Helm charts (extension + admission) and pushes them to the local registry
1. Deploys the `Extension` (from group `operator.gardener.cloud/v1alpha1`) to
   the *runtime* cluster, which includes the admission controller configuration

Verify that we have successfully created the
`Extension` (from group `operator.gardener.cloud/v1alpha1`) resource.

```shell
$ kubectl --kubeconfig $KUBECONFIG_RUNTIME get extop gardener-extension-shoot-traefik
NAME                               INSTALLED   REQUIRED RUNTIME   REQUIRED VIRTUAL   AGE
gardener-extension-shoot-traefik   True        False              False              85s
```

Verify that the respective `ControllerRegistration` and `ControllerDeployment`
resources have been created by the `gardener-operator` in the *virtual* garden
cluster.

```shell
> kubectl --kubeconfig $KUBECONFIG_VIRTUAL get controllerregistrations,controllerdeployments gardener-extension-shoot-traefik
NAME                                                                          RESOURCES           AGE
controllerregistration.core.gardener.cloud/gardener-extension-shoot-traefik   Extension/traefik   3m50s

NAME                                                                        AGE
controllerdeployment.core.gardener.cloud/gardener-extension-shoot-traefik   3m50s
```

Now we can create an example shoot with our extension enabled. The
[examples/shoot.yaml](https://github.com/gardener/gardener-extension-shoot-traefik/blob/main/examples/shoot.yaml) file provides a ready-to-use shoot
manifest, which we will use.

```shell
kubectl --kubeconfig $KUBECONFIG_VIRTUAL apply -f examples/shoot.yaml
```

Once we create the shoot cluster, `gardenlet` will start deploying our
`gardener-extension-shoot-traefik`, since it is required by our shoot.

Verify that the extension has been successfully installed by checking the
corresponding `ControllerInstallation` resource for our extension.

```shell
$ kubectl --kubeconfig $KUBECONFIG_VIRTUAL get controllerinstallations.core.gardener.cloud
NAME                                     REGISTRATION                       SEED    VALID   INSTALLED   HEALTHY   PROGRESSING   AGE
gardener-extension-shoot-traefik-ng4r8   gardener-extension-shoot-traefik   local   True    True        True      False         2m9s
```

After your shoot cluster has been successfully created and reconciled, verify
that the extension is healthy.

```shell
$ kubectl --kubeconfig $KUBECONFIG_RUNTIME --namespace shoot--local--local get extensions
NAME      TYPE      STATUS      AGE
traefik   traefik   Succeeded   2m37s
```

In order to trigger reconciliation of the extension you can annotate the
extension resource.

```shell
kubectl --kubeconfig $KUBECONFIG_RUNTIME --namespace shoot--local--local annotate extensions traefik gardener.cloud/operation=reconcile
```

# Contributing

`gardener-extension-shoot-traefik` is hosted on
[Github](https://github.com/gardener/gardener-extension-shoot-traefik).

Please contribute by reporting issues, suggesting features or by sending patches
using pull requests.

# License

This project is Open Source and licensed under [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0).
