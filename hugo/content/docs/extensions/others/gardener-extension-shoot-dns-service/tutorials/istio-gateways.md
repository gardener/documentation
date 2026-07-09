---
github_repo: 'https://github.com/gardener/gardener-extension-shoot-dns-service'
github_subdir: docs/usage/tutorials
params:
  github_branch: master
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/others/gardener-extension-shoot-dns-service/tutorials/istio-gateways.md
  to: istio-gateways.md
persona: Users
title: Istio Gateways
prev: false
next: false
managed: true
---

# Using annotated Istio Gateway and/or Istio Virtual Service as Source
This tutorial describes how to use annotated Istio Gateway resources as source for DNSEntries with the Gardener shoot-dns-service extension.

## Install Istio on your cluster

Using a new or existing shoot cluster, follow the [Istio Getting Started](https://istio.io/latest/docs/setup/getting-started/) to download and install Istio.

These are the typical commands for the istio demo installation

```bash
export KUEBCONFIG=...
curl -L https://istio.io/downloadIstio | sh -
istioctl install --set profile=demo -y
kubectl label namespace default istio-injection=enabled
```

## Verify that Istio Gateway/VirtualService Source works

### Install a sample service
With automatic sidecar injection:
```bash
$ kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.20/samples/httpbin/httpbin.yaml
```

### Using a Gateway as a source
#### Create an Istio Gateway:
```bash
$ cat <<EOF | kubectl apply -f -
apiVersion: networking.istio.io/v1alpha3
kind: Gateway
metadata:
  name: httpbin-gateway
  namespace: istio-system
  annotations:
    dns.gardener.cloud/dnsnames: "*"
    dns.gardener.cloud/class: garden
spec:
  selector:
    istio: ingressgateway # use Istio default gateway implementation
  servers:
  - port:
      number: 80
      name: http
      protocol: HTTP
    hosts:
    - "httpbin.example.com" # this is used by the dns-controller-manager to extract DNS names
EOF
```

#### Configure routes for traffic entering via the Gateway:
```bash
$ cat <<EOF | kubectl apply -f -
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: httpbin
  namespace: default
spec:
  hosts:
  - "httpbin.example.com" # this is also used by the dns-controller-manager to extract DNS names
  gateways:
  - istio-system/httpbin-gateway
  http:
  - match:
    - uri:
        prefix: /status
    - uri:
        prefix: /delay
    route:
    - destination:
        port:
          number: 8000
        host: httpbin
EOF
```

You should now see events in the namespace of the gateway:

```bash
$ kubectl -n istio-system get events --sort-by={.metadata.creationTimestamp}
LAST SEEN   TYPE      REASON                 OBJECT                                       MESSAGE
...
38s         Normal    dns-annotation         gateway/httpbin-gateway                      httpbin.example.com: created dns entry object shoot--foo--bar/httpbin-gateway-gateway-zpf8n
38s         Normal    dns-annotation         gateway/httpbin-gateway                      httpbin.example.com: dns entry pending: waiting for dns reconciliation
38s         Normal    dns-annotation         gateway/httpbin-gateway                      httpbin.example.com: dns entry is pending
36s         Normal    dns-annotation         gateway/httpbin-gateway                      httpbin.example.com: dns entry active
```

### Using a VirtualService as a source

If the `Gateway` resource is annotated with `dns.gardener.cloud/dnsnames: "*"`, hosts from all referencing  `VirtualServices` resources
are automatically extracted. These resources don't need an additional annotation.

#### Create an Istio Gateway:
```bash
$ cat <<EOF | kubectl apply -f -
apiVersion: networking.istio.io/v1alpha3
kind: Gateway
metadata:
  name: httpbin-gateway
  namespace: istio-system
  annotations:
    dns.gardener.cloud/dnsnames: "*"
    dns.gardener.cloud/class: garden
spec:
  selector:
    istio: ingressgateway # use Istio default gateway implementation
  servers:
  - port:
      number: 80
      name: http
      protocol: HTTP
    hosts:
    - "*"
EOF
```

#### Configure routes for traffic entering via the Gateway:
```bash
$ cat <<EOF | kubectl apply -f -
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: httpbin
  namespace: default  
spec:
  hosts:
  - "httpbin.example.com" # this is used by dns-controller-manager to extract DNS names
  gateways:
  - istio-system/httpbin-gateway
  http:
  - match:
    - uri:
        prefix: /status
    - uri:
        prefix: /delay
    route:
    - destination:
        port:
          number: 8000
        host: httpbin
EOF
```

This should show a similar events as above.

To get the targets to the extracted DNS names, the shoot-dns-service controller is able to gather information from the kubernetes service of the Istio Ingress Gateway.

**Note**: It is also possible to set the targets my specifying an Ingress resource using the `dns.gardener.cloud/ingress` annotation on the Istio Ingress Gateway resource.

**Note**: It is also possible to set the targets manually by using the `dns.gardener.cloud/targets` annotation on the Istio Ingress Gateway resource.

### Access the sample service using `curl`
```bash
$ curl -I http://httpbin.example.com/status/200
HTTP/1.1 200 OK
server: istio-envoy
date: Tue, 13 Feb 2024 07:49:37 GMT
content-type: text/html; charset=utf-8
access-control-allow-origin: *
access-control-allow-credentials: true
content-length: 0
x-envoy-upstream-service-time: 15
```

Accessing any other URL that has not been explicitly exposed should return an HTTP 404 error:
```bash
$ curl -I http://httpbin.example.com/headers
HTTP/1.1 404 Not Found
date: Tue, 13 Feb 2024 08:09:41 GMT
server: istio-envoy
transfer-encoding: chunked
```
