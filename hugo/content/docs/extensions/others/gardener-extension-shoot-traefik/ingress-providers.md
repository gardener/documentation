---
github_repo: 'https://github.com/gardener/gardener-extension-shoot-traefik'
github_subdir: docs/usage
params:
  github_branch: main
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/others/gardener-extension-shoot-traefik/ingress-providers.md
  to: ingress-providers.md
persona: Users
title: Ingress Providers
prev: false
next: false
managed: true
---

# Register Traefik Extension in Shoot Clusters

## Introduction

The `shoot-traefik` extension deploys a [Traefik](https://traefik.io) ingress controller into a Gardener shoot cluster. It can serve either the standard Kubernetes Ingress (`KubernetesIngress`) or an NGINX-compatible variant (`KubernetesIngressNGINX`) that translates a subset of NGINX annotations — useful when migrating away from the legacy nginx-ingress addon.

It is necessary that the Gardener installation your shoot cluster runs in is equipped with a `shoot-traefik` extension. Please ask your Gardener operator if the extension is available in your environment. The shoot's `spec.purpose` must be `evaluation`; the admission webhook rejects the extension on shoots with any other purpose.

> [!NOTE]
> If your goal is to retire the legacy nginx-ingress addon, read this guide *together with* the upstream [Nginx Ingress Retirement and Migration Guide](https://github.com/gardener/gardener/pull/15099), which covers feature gates, DNS cutover, certificate handling, and the migration FAQ.

## Shoot Feature Gate

In most Gardener setups the `shoot-traefik` extension is not enabled globally and thus must be configured per shoot cluster. Adapt the shoot specification with the configuration shown below to activate the extension:

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: Shoot
metadata:
  name: my-shoot
  namespace: garden-my-project
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

Once the shoot reconciles, Traefik runs in the shoot's `kube-system` namespace and is exposed by a `LoadBalancer` Service. You can inspect it with the shoot kubeconfig:

```bash
kubectl -n kube-system get pods -l app=traefik
kubectl -n kube-system get svc  -l app=traefik
```

## IngressProvider

The `ingressProvider` field selects the Kubernetes Ingress provider Traefik should serve. It controls the ingress class that your `Ingress` resources must reference.

| Value | Ingress class | When to use |
| --- | --- | --- |
| `KubernetesIngress` *(default)* | `traefik` | New deployments and shoots that use Traefik-native features and annotations. |
| `KubernetesIngressNGINX` | `nginx` | Migrations from the NGINX ingress controller — existing `Ingress` resources keep working without changing `ingressClassName`, and a subset of NGINX annotations is translated. |

Switching the value later is allowed, but the ingress class changes with it. Every `Ingress` in the shoot must have its `ingressClassName` updated to match.

For the exact list of NGINX annotations Traefik translates, see [Traefik NGINX Annotations Support](https://doc.traefik.io/traefik/reference/routing-configuration/kubernetes/ingress-nginx/). Advanced annotations such as `server-snippet` and `configuration-snippet` are not translated — use a Traefik [`Middleware`](https://doc.traefik.io/traefik/reference/routing-configuration/kubernetes/crd/) CRD instead.

```yaml
kind: Shoot
...
spec:
  extensions:
    - type: shoot-traefik
      providerConfig:
        apiVersion: traefik.extensions.gardener.cloud/v1alpha1
        kind: TraefikConfig
        spec:
          ingressProvider: KubernetesIngressNGINX
...
```

## Replicas

The `replicas` field controls the number of Traefik pods in the shoot. The default is `2`.

```yaml
kind: Shoot
...
spec:
  extensions:
    - type: shoot-traefik
      providerConfig:
        apiVersion: traefik.extensions.gardener.cloud/v1alpha1
        kind: TraefikConfig
        spec:
          replicas: 3
...
```

## LogLevel

The `logLevel` field sets Traefik's log verbosity. Defaults to `Info`. Allowed values are `Debug`, `Info`, `Warn`, `Error`, `Fatal`, and `Panic`. `Debug` is helpful while diagnosing an `Ingress` that isn't matching or an unsupported NGINX annotation.

```yaml
kind: Shoot
...
spec:
  extensions:
    - type: shoot-traefik
      providerConfig:
        apiVersion: traefik.extensions.gardener.cloud/v1alpha1
        kind: TraefikConfig
        spec:
          logLevel: Debug
...
```

## Dashboard

The `dashboard` field enables the Traefik dashboard, which exposes the live routing configuration and diagnostics on port `9000`. The dashboard is only reachable from inside the cluster; access it through `kubectl port-forward`:

```bash
kubectl -n kube-system port-forward svc/traefik 9000:9000
# then open http://localhost:9000/dashboard/
```

> [!WARNING]
> The dashboard and the API expose every configuration element, including sensitive data. Access should be reserved for administrators, and the dashboard should not be enabled on production-like clusters.

```yaml
kind: Shoot
...
spec:
  extensions:
    - type: shoot-traefik
      providerConfig:
        apiVersion: traefik.extensions.gardener.cloud/v1alpha1
        kind: TraefikConfig
        spec:
          dashboard: true
...
```

## Configuration Reference

All fields live under `providerConfig.spec` (`apiVersion: traefik.extensions.gardener.cloud/v1alpha1`, `kind: TraefikConfig`).

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `ingressProvider` | string | `KubernetesIngress` | Kubernetes Ingress provider Traefik should serve. One of `KubernetesIngress` (ingress class `traefik`) or `KubernetesIngressNGINX` (ingress class `nginx`). |
| `replicas` | int32 | `2` | Number of Traefik pods in the shoot. |
| `logLevel` | string | `Info` | Traefik log verbosity. One of `Debug`, `Info`, `Warn`, `Error`, `Fatal`, `Panic`. |
| `dashboard` | bool | `false` | Enables the Traefik dashboard on port `9000`. Not recommended for production-like clusters. |

## Further Reading

- [Nginx Ingress Retirement and Migration Guide (gardener/gardener PR #15099)](https://github.com/gardener/gardener/pull/15099)
- [Traefik Kubernetes Ingress Documentation](https://doc.traefik.io/traefik/reference/install-configuration/providers/kubernetes/kubernetes-ingress/)
- [Traefik NGINX Annotations Support](https://doc.traefik.io/traefik/reference/routing-configuration/kubernetes/ingress-nginx/)
- [NGINX to Traefik Migration Guide](https://doc.traefik.io/traefik/migrate/nginx-to-traefik/)
- [Kubernetes Ingress Specification](https://kubernetes.io/docs/concepts/services-networking/ingress/)
