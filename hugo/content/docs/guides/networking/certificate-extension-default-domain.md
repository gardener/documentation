---
aliases:
  - /managing-certificates-with-gardener-default-domain
category: Networking
description: >-
  Use the Gardener cert-management to get fully managed, publicly trusted TLS
  certificates
github_repo: 'https://github.com/gardener/gardener-extension-shoot-cert-service'
github_subdir: docs/usage
last_reviewed: 07.29.2022
level: beginner
params:
  github_branch: master
path_base_for_github_subdir:
  from: content/docs/guides/networking/certificate-extension-default-domain.md
  to: request_default_domain_cert.md
publishdate: '2022-07-29'
scope: operator
tags:
  - task
title: Manage Certificates with Gardener for Default Domain
weight: 40
prev: false
next: false
managed: true
---

# Manage certificates with Gardener for default domain

## Introduction
Dealing with applications on Kubernetes which offer a secure service endpoints (e.g. HTTPS) also require you to enable a
secured communication via SSL/TLS. With the [certificate extension](https://github.com/gardener/gardener-extension-shoot-cert-service) enabled, Gardener can manage commonly trusted X.509 certificate for your application
endpoint. From initially requesting certificate, it also handeles their renewal in time using the free Let's Encrypt API.

**There are two senarios with which you can use the certificate extension**
- You want to use a certificate for a subdomain the shoot's default DNS (see `.spec.dns.domain` of your shoot resource, e.g. `short.ingress.shoot.project.default-domain.gardener.cloud`). If this is your case, please keep reading this article.
- You want to use a certificate for a custom domain. If this is your case, please see [Manage certificates with Gardener for public domain](/docs/guides/networking/certificate-extension/)

## Prerequisites

Before you start this guide there are a few requirements you need to fulfill:

- You have an existing shoot cluster

Since you are using the default DNS name, all DNS configuration should already be done and ready.

## Issue a certificate
Every X.509 certificate is represented by a Kubernetes custom resource `certificate.cert.gardener.cloud` in your cluster. A `Certificate` resource may be used to initiate a new certificate request as well as to manage its lifecycle. Gardener's certificate service regularly checks the expiration timestamp of Certificates, triggers a renewal process if necessary and replaces the existing X.509 certificate with a new one.

> Your application should be able to reload replaced certificates in a timely manner to avoid service disruptions.

Certificates can be requested via 3 resources type
- Ingress
- Service (type LoadBalancer)
- certificate (Gardener CRD)

If either of the first 2 are used, a corresponding `Certificate` resource will automatically be created.

### Using an ingress Resource
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: amazing-ingress
  annotations:
    cert.gardener.cloud/purpose: managed
    #cert.gardener.cloud/issuer: custom-issuer                    # optional to specify custom issuer (use namespace/name for shoot issuers)
    #cert.gardener.cloud/follow-cname: "true"                     # optional, same as spec.followCNAME in certificates
    #cert.gardener.cloud/secret-labels: "key1=value1,key2=value2" # optional labels for the certificate secret
    #cert.gardener.cloud/preferred-chain: "chain name"            # optional to specify preferred-chain (value is the Subject Common Name of the root issuer)
    #cert.gardener.cloud/private-key-algorithm: ECDSA             # optional to specify algorithm for private key, allowed values are 'RSA' or 'ECDSA'
    #cert.gardener.cloud/private-key-size: "384"                  # optional to specify size of private key, allowed values for RSA are "2048", "3072", "4096" and for ECDSA "256" and "384"spec:
  tls:
  - hosts:
    # Must not exceed 64 characters.
    - short.ingress.shoot.project.default-domain.gardener.cloud
    # Certificate and private key reside in this secret.
    secretName: tls-secret
  rules:
  - host: short.ingress.shoot.project.default-domain.gardener.cloud
    http:
      paths:
      - pathType: Prefix
        path: "/"
        backend:
          service:
            name: amazing-svc
            port:
              number: 8080
```

### Using a service type LoadBalancer
```yaml
apiVersion: v1
kind: Service
metadata:
  annotations:
    cert.gardener.cloud/purpose: managed
    # Certificate and private key reside in this secret.
    cert.gardener.cloud/secretname: tls-secret
    # You may add more domains separated by commas (e.g. "service.shoot.project.default-domain.gardener.cloud, amazing.shoot.project.default-domain.gardener.cloud")
    dns.gardener.cloud/dnsnames: "service.shoot.project.default-domain.gardener.cloud" 
    dns.gardener.cloud/ttl: "600"
    #cert.gardener.cloud/issuer: custom-issuer                    # optional to specify custom issuer (use namespace/name for shoot issuers)
    #cert.gardener.cloud/follow-cname: "true"                     # optional, same as spec.followCNAME in certificates
    #cert.gardener.cloud/secret-labels: "key1=value1,key2=value2" # optional labels for the certificate secret
    #cert.gardener.cloud/preferred-chain: "chain name"            # optional to specify preferred-chain (value is the Subject Common Name of the root issuer)
    #cert.gardener.cloud/private-key-algorithm: ECDSA             # optional to specify algorithm for private key, allowed values are 'RSA' or 'ECDSA'
    #cert.gardener.cloud/private-key-size: "384"                  # optional to specify size of private key, allowed values for RSA are "2048", "3072", "4096" and for ECDSA "256" and "384"  name: test-service
  namespace: default
spec:
  ports:
    - name: http
      port: 80
      protocol: TCP
      targetPort: 8080
  type: LoadBalancer
```

### Using the custom Certificate resource
```yaml
apiVersion: cert.gardener.cloud/v1alpha1
kind: Certificate
metadata:
  name: cert-example
  namespace: default
spec:
  commonName: short.ingress.shoot.project.default-domain.gardener.cloud
  secretRef:
    name: tls-secret
    namespace: default
  # Optionnal if using the default issuer
  issuerRef:
    name: garden
```

If you're interested in the current progress of your request, you're advised to consult the description, more specifically the `status` attribute in case the issuance failed.

## Request a wildcard certificate
In order to avoid the creation of multiples certificates for every single endpoints, you may want to create a wildcard certificate for your shoot's default cluster.

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: amazing-ingress
  annotations:
    cert.gardener.cloud/purpose: managed
    cert.gardener.cloud/commonName: "*.ingress.shoot.project.default-domain.gardener.cloud"
spec:
  tls:
  - hosts:
    - amazing.ingress.shoot.project.default-domain.gardener.cloud
    secretName: tls-secret
  rules:
  - host: amazing.ingress.shoot.project.default-domain.gardener.cloud
    http:
      paths:
      - pathType: Prefix
        path: "/"
        backend:
          service:
            name: amazing-svc
            port:
              number: 8080
```

Please note that this can also be achived by directly adding an annotation to a Service type LoadBalancer. You could also create a Certificate object with a wildcard domain.

## More information
For more information and more examples about using the certificate extension, please see [Manage certificates with Gardener for public domain](/docs/guides/networking/certificate-extension/)
