---
github_repo: 'https://github.com/gardener/gardener-extension-shoot-dns-service'
github_subdir: docs/usage/tutorials
params:
  github_branch: master
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/others/gardener-extension-shoot-dns-service/tutorials/gateway-api-gateways.md
  to: gateway-api-gateways.md
persona: Users
title: Gateway Api Gateways
prev: false
next: false
managed: true
---

# Using annotated Gateway API Gateway and/or HTTPRoutes as Source
This tutorial describes how to use annotated Gateway API resources as source for DNSEntries with the Gardener shoot-dns-service extension.

The dns-controller-manager supports the resources `Gateway` and `HTTPRoute`.

## Install Istio on your cluster

Using a new or existing shoot cluster, follow the Istio [Kubernetes Gateway API](https://istio.io/latest/docs/tasks/traffic-management/ingress/gateway-api/) to
install the Gateway API and to install Istio.

These are the typical commands for the Istio installation with the Kubernetes Gateway API:

```bash
export KUEBCONFIG=...
curl -L https://istio.io/downloadIstio | sh -
kubectl get crd gateways.gateway.networking.k8s.io &> /dev/null || \
  { kubectl kustomize "github.com/kubernetes-sigs/gateway-api/config/crd?ref=v1.0.0" | kubectl apply -f -; }
istioctl install --set profile=minimal -y
kubectl label namespace default istio-injection=enabled
```

## Verify that Gateway Source works

### Install a sample service
With automatic sidecar injection:
```bash
$ kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.20/samples/httpbin/httpbin.yaml
```

### Using a Gateway as a source

Deploy the Gateway API configuration including a single exposed route (i.e., /get):
```bash
kubectl create namespace istio-ingress
kubectl apply -f - <<EOF
apiVersion: gateway.networking.k8s.io/v1
kind: Gateway
metadata:
  name: gateway
  namespace: istio-ingress
  annotations:
    dns.gardener.cloud/dnsnames: "*.example.com"
    dns.gardener.cloud/class: garden
spec:
  gatewayClassName: istio
  listeners:
  - name: default
    hostname: "*.example.com"  # this is used by dns-controller-manager to extract DNS names
    port: 80
    protocol: HTTP
    allowedRoutes:
      namespaces:
        from: All
---
apiVersion: gateway.networking.k8s.io/v1
kind: HTTPRoute
metadata:
  name: http
  namespace: default
spec:
  parentRefs:
  - name: gateway
    namespace: istio-ingress
  hostnames: ["httpbin.example.com"]  # this is used by dns-controller-manager to extract DNS names too
  rules:
  - matches:
    - path:
        type: PathPrefix
        value: /get
    backendRefs:
    - name: httpbin
      port: 8000
EOF
```

You should now see events in the namespace of the gateway:

```bash
$ kubectl -n istio-system get events --sort-by={.metadata.creationTimestamp}
LAST SEEN   TYPE      REASON                 OBJECT                                       MESSAGE
...
38s         Normal    dns-annotation         service/gateway-istio                      httpbin.example.com: created dns entry object shoot--foo--bar/gateway-istio-service-zpf8n
38s         Normal    dns-annotation         service/gateway-istio                      httpbin.example.com: dns entry pending: waiting for dns reconciliation
38s         Normal    dns-annotation         service/gateway-istio                      httpbin.example.com: dns entry is pending
36s         Normal    dns-annotation         service/gateway-istio                      httpbin.example.com: dns entry active
```

#### Using a HTTPRoute as a source

If the `Gateway` resource is annotated with `dns.gardener.cloud/dnsnames: "*"`, hostnames from all referencing  `HTTPRoute` resources
are automatically extracted. These resources don't need an additional annotation.

Deploy the Gateway API configuration including a single exposed route (i.e., /get):

```bash
kubectl create namespace istio-ingress
kubectl apply -f - <<EOF
apiVersion: gateway.networking.k8s.io/v1
kind: Gateway
metadata:
  name: gateway
  namespace: istio-ingress
  annotations:
    dns.gardener.cloud/dnsnames: "*"
    dns.gardener.cloud/class: garden
spec:
  gatewayClassName: istio
  listeners:
  - name: default
    hostname: null  # not set 
    port: 80
    protocol: HTTP
    allowedRoutes:
      namespaces:
        from: All
---
apiVersion: gateway.networking.k8s.io/v1
kind: HTTPRoute
metadata:
  name: http
  namespace: default
spec:
  parentRefs:
  - name: gateway
    namespace: istio-ingress
  hostnames: ["httpbin.example.com"]  # this is used by dns-controller-manager to extract DNS names too
  rules:
  - matches:
    - path:
        type: PathPrefix
        value: /get
    backendRefs:
    - name: httpbin
      port: 8000
EOF
```

This should show a similar events as above.

#### Access the sample service using `curl`
```bash
$ curl -I http://httpbin.example.com/get
HTTP/1.1 200 OK
server: istio-envoy
date: Tue, 13 Feb 2024 08:09:41 GMT
content-type: application/json
content-length: 701
access-control-allow-origin: *
access-control-allow-credentials: true
x-envoy-upstream-service-time: 19
```

Accessing any other URL that has not been explicitly exposed should return an HTTP 404 error:
```bash
$ curl -I http://httpbin.example.com/headers
HTTP/1.1 404 Not Found
date: Tue, 13 Feb 2024 08:09:41 GMT
server: istio-envoy
transfer-encoding: chunked
```
