---
github_repo: 'https://github.com/gardener/gardener-extension-envoy-gateway'
github_subdir: docs/usage
params:
  github_branch: main
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/others/gardener-extension-envoy-gateway/getting-started.md
  to: getting-started.md
persona: Users
title: Getting Started
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
   https://github.com/gardener/gardener-extension-envoy-gateway/blob/main/docs/usage/getting-started.md
-->


# Getting started

This page walks through a complete first request through the extension:
enable it on a shoot, create a `Gateway`, attach an `HTTPRoute`, and hit the
LoadBalancer with `curl`. Follow it top-to-bottom and you should have a
working ingress in ~5 minutes after the shoot has reconciled.

If you're looking for the field reference, see
[configuration.md](/docs/extensions/others/gardener-extension-envoy-gateway/configuration/). If something goes wrong along the way,
see [troubleshooting.md](/docs/extensions/others/gardener-extension-envoy-gateway/troubleshooting/).

## Prerequisites

* A Gardener landscape where an operator has already registered the
  extension. If you're the operator, follow
  [deployment.md](/docs/extensions/others/gardener-extension-envoy-gateway/deployment/) first.
* A shoot with `spec.purpose: evaluation` (enforced by the admission
  webhook during the GEP-68 incubation phase).
* `kubectl` access to the shoot cluster.

## 1. Enable the extension on your shoot

Add the extension to `spec.extensions`:

```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: Shoot
metadata:
  name: my-shoot
  namespace: garden-my-project
spec:
  purpose: evaluation
  extensions:
    - type: envoy-gateway
      providerConfig:
        apiVersion: envoy-gateway.extensions.gardener.cloud/v1alpha1
        kind: EnvoyGatewayConfig
        controlPlane:
          logLevel: info
  # ... rest of the shoot spec
```

Apply it and wait for the shoot to reconcile. When the extension has
finished, the shoot cluster contains:

* The Envoy Gateway control-plane Deployment (2 replicas by default) in
  `kube-system`.
* A single `GatewayClass` named `gardener-envoy-gateway` in `Accepted=True`
  state.
* Standard-channel Gateway API CRDs (`Gateway`, `HTTPRoute`, `GRPCRoute`,
  `ReferenceGrant`, `BackendTLSPolicy`, `ListenerSet`).
* Envoy Gateway's own CRDs (`EnvoyProxy`, `BackendTrafficPolicy`, …).

Sanity-check from the shoot:

```bash
kubectl get gatewayclass gardener-envoy-gateway
# NAME                     CONTROLLER                                       ACCEPTED   AGE
# gardener-envoy-gateway   gateway.envoyproxy.io/gatewayclass-controller    True       1m
```

## 2. Deploy a demo backend

Anything that speaks HTTP works. `httpbin` is a common choice:

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: demo
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: httpbin
  namespace: demo
spec:
  replicas: 1
  selector:
    matchLabels: { app: httpbin }
  template:
    metadata:
      labels: { app: httpbin }
    spec:
      containers:
        - name: httpbin
          image: mccutchen/go-httpbin:v2.15.0
          ports:
            - containerPort: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: httpbin
  namespace: demo
spec:
  selector: { app: httpbin }
  ports:
    - name: http
      port: 80
      targetPort: 8080
```

## 3. Create a Gateway

The `Gateway` is the L4 listener the LB routes traffic to. It references
the `gardener-envoy-gateway` `GatewayClass` and opens port 80:

```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: Gateway
metadata:
  name: demo
  namespace: demo
spec:
  gatewayClassName: gardener-envoy-gateway
  listeners:
    - name: http
      port: 80
      protocol: HTTP
      allowedRoutes:
        namespaces:
          from: Same
```

Apply it. Envoy Gateway spawns a per-`Gateway` Envoy Deployment and a
LoadBalancer `Service` in the shoot; the cloud-provider LB controller
provisions the underlying LB and writes its address back to
`Gateway.status.addresses`:

```bash
kubectl -n demo wait --for=condition=Programmed gateway/demo --timeout=5m
kubectl -n demo get gateway demo -o jsonpath='{.status.addresses[0].value}'
# 34.107.xxx.yyy
```

If the address stays empty for more than ~5 minutes, see the
[Gateway stays Programmed=False](/docs/extensions/others/gardener-extension-envoy-gateway/troubleshooting/#my-gateway-stays-programmedfalse)
section.

## 4. Attach an HTTPRoute

The `HTTPRoute` describes routing rules and picks the `Gateway` it attaches
to via `parentRefs`:

```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: HTTPRoute
metadata:
  name: httpbin
  namespace: demo
spec:
  parentRefs:
    - name: demo
  rules:
    - matches:
        - path:
            type: PathPrefix
            value: /
      backendRefs:
        - name: httpbin
          port: 80
```

## 5. Send a request

```bash
LB=$(kubectl -n demo get gateway demo -o jsonpath='{.status.addresses[0].value}')
curl -s "http://${LB}/get" | jq .

# {
#   "headers": {
#     "Host": ["34.107.xxx.yyy"],
#     "User-Agent": ["curl/8.5.0"],
#     ...
#   },
#   "method": "GET",
#   "url": "http://34.107.xxx.yyy/get"
# }
```

That's the full path: extension → `GatewayClass` → `Gateway` → cloud LB →
Envoy data-plane → `HTTPRoute` → your backend `Service`.

## Cleanup

Remove the demo resources; leave the extension alone if you want to keep
using it:

```bash
kubectl delete namespace demo
```

The Envoy data-plane Deployment and its LoadBalancer Service are cleaned up
automatically once the `Gateway` disappears.

To also remove the extension itself from the shoot, delete the
`spec.extensions[]` entry. The extension refuses to detach while
user-owned `Gateway` objects still exist in the shoot — see the delete
guard in [configuration.md](/docs/extensions/others/gardener-extension-envoy-gateway/configuration/#lifecycle).

## Next steps

* Route by hostname, headers, or method — see the upstream
  [HTTPRoute reference](https://gateway-api.sigs.k8s.io/api-types/httproute/).
* Terminate TLS at the `Gateway` — see the upstream
  [TLS termination guide](https://gateway-api.sigs.k8s.io/guides/tls/).
* Tune the Envoy proxy (resources, tracing, access logs) via a custom
  `EnvoyProxy` referenced from `Gateway.spec.infrastructure.parametersRef`.
* Migrating from `Ingress`? The upstream
  [Migrating from Ingress](https://gateway-api.sigs.k8s.io/guides/getting-started/migrating-from-ingress/)
  guide is the best starting point.
