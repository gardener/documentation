---
title: Request X.509 Certificates
description: "X.509 Certificates For TLS Communication"
type: tutorial-page
level: beginner
index: 10
category: Certificates
scope: app-developer
---

# Request X.509 Certificates 

## Introduction
Dealing with applications on Kubernetes which offer service endpoints (e.g. HTTP) may also require you to enable a 
secured communication via SSL/TLS. Gardener let's you request a commonly trusted X.509 certificate for your application 
endpoint. Furthermore, Gardener takes care about the renewal process for your requested certificate.

Let's get the basics straight first. If this is too long for you, you can read below how to get certificates by

 - [Certificate Resources](#request-a-certificate-via-certificate)
 - [Ingress](#request-a-certificate-via-ingress)
 - [Service](#request-a-certificate-via-service) 


## Restrictions

### Domains
Certificates may be received for any subdomain of your shoot's domain (see `.spec.dns.domain` of your shoot resource).

### Character Restrictions
Due to the ACME protocol specification, at least one domain of the domains you request a certificate for must not exceed a character limit of 64  (CN - Common Name).

For example, the following request is invalid:

```yaml
apiVersion: cert.gardener.cloud/v1alpha1
kind: Certificate
metadata:
  name: cert-invalid
  namespace: default
spec:
  commonName: morethan64characters.ingress.shoot.project.default-domain.gardener.cloud
```

But it is valid to request a certificate for this domain if you have at least one domain which does not exceed the mentioned limit:

```yaml
apiVersion: cert.gardener.cloud/v1alpha1
kind: Certificate
metadata:
  name: cert-example
  namespace: default
spec:
  commonName: short.ingress.shoot.project.default-domain.gardener.cloud
  dnsNames:
  - morethan64characters.ingress.shoot.project.default-domain.gardener.cloud
```

## Certificate Resources
Every X.509 certificate is represented by a Kubernetes custom resource `certificate.cert.gardener.cloud` in your cluster. A `Certificate` resource may be used to initiate a new certificate request as well as to manage its lifecycle. Gardener's certificate service regularly checks the expiration timestamp of Certificates, triggers a renewal process if necessary and replaces the existing X.509 certificate with a new one.

> Your application should be able to reload replaced certificates in a timely manner to avoid service disruptions.

Certificates can either be requested by creating `Certificate` resources in the Kubernetes cluster or by configuring `Ingress` or `Service` (type `LoadBalancer`) resources. If the latter is used, a `Certificate` resource will automatically be created by Gardener's certificate service.

If you're interested in the current progress of your request, you're advised to consult the `Certificate`'s `status` subresource. You'll also find error descriptions in the `status` in case the issuance failed.

Certificate status example:

```yaml
apiVersion: cert.gardener.cloud/v1alpha1
kind: Certificate
...
status:
  commonName: short.ingress.shoot.project.default-domain.gardener.cloud
  expirationDate: "2020-02-27T15:39:10Z"
  issuerRef:
    name: garden
    namespace: shoot--foo--bar
  lastPendingTimestamp: "2019-11-29T16:38:40Z"
  observedGeneration: 11
  state: Ready
```


## Examples
### Request a certificate via Certificate

```yaml
apiVersion: cert.gardener.cloud/v1alpha1
kind: Certificate
metadata:
  name: cert-example
  namespace: default
spec:
  commonName: short.ingress.shoot.project.default-domain.gardener.cloud
  dnsNames:
  - morethan64characters.ingress.shoot.project.default-domain.gardener.cloud
  secretRef:
    name: cert-example
    namespace: default
```

> `spec.commonName` (required) specifies for which domain the certificate request will be created. This entry must comply with the [64 character](#Character-Restrictions) limit.

> `spec.dnsName` additional domains the certificate should be valid for. Entries in this list can be longer than 64 characters.

> `spec.secretRef` specifies the secret which contains the certificate/key pair. If the secret is not available yet, it'll be created automatically as soon as the X.509 certificate has been issued.

### Request a wildcard certificate via Certificate

```yaml
apiVersion: cert.gardener.cloud/v1alpha1
kind: Certificate
metadata:
  name: cert-wildcard
  namespace: default
spec:
  commonName: '*.ingress.shoot.project.default-domain.gardener.cloud'
  secretRef:
    name: cert-wildcard
    namespace: default
```

> `spec.commonName` (required) specifies for which domain the certificate request will be created. This entry must comply with the [64 character](#Character-Restrictions) limit.

> Please note that verifications for wildcard domain certificates only succeed if the subdomain and wildcard domain are on the same level. For example: A certificate for `*.example.com` works for `foo.example.com` but not for `foo.bar.example.com`.

> `spec.secretRef` specifies the secret which contains the certificate/key pair. If the secret is not available yet, it'll be created automatically as soon as the X.509 certificate has been issued.

### Request a certificate via Ingress

```yaml
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  name: vuejs-ingress
  annotations:
    cert.gardener.cloud/purpose: managed
spec:
  tls:
  # Must not exceed 64 characters.
  - hosts:
    - short.ingress.shoot.project.default-domain.gardener.cloud
    - morethan64characters.ingress.shoot.project.default-domain.gardener.cloud
    # Certificate and private key reside in this secret.
    secretName: testsecret-tls
  rules:
  - host: morethan64characters.ingress.shoot.project.default-domain.gardener.cloud
    http:
      paths:
      - backend:
          serviceName: vuejs-svc
          servicePort: 8080
```

> `metadata.annotations` must contain `cert.gardener.cloud/purpose: managed` to activate the certificate service on this resource.

> `spec.tls[].hosts` specifies for which domains the certificate request will be created. The first entry is always taken to fill the `Common Name` field and must therefore comply with the [64 character](#Character-Restrictions) limit.

> `spec.tls[].secretName` specifies the secret which contains the certificate/key pair to be used by this Ingress. If the secret is not available yet, it'll be created automatically as soon as the certificate has been issued. Once configured, you're not advised to change the name while the Ingress is still managed by the certificate service.

### Request a wildcard certificate via Ingress

```yaml
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  name: vuejs-ingress
  annotations:
    cert.gardener.cloud/purpose: managed
spec:
  tls:
  # Must not exceed 64 characters.
  - hosts:
    - "*.ingress.shoot.project.default-domain.gardener.cloud"
    # Certificate and private key reside in this secret.
    secretName: testsecret-tls
  rules:
  - host: morethan64characters.ingress.shoot.project.default-domain.gardener.cloud
    http:
      paths:
      - backend:
          serviceName: vuejs-svc
          servicePort: 8080
```

> `metadata.annotations` must contain `cert.gardener.cloud/purpose: managed` to activate the certificate service on this resource.

> `spec.tls[].hosts` please make sure the wildcard domain complies with the [64 character](#Character-Restrictions) limit.

> Please note that verifications for wildcard domain certificates only succeed if the subdomain and wildcard domain are on the same level. For example: A certificate for `*.example.com` works for `foo.example.com` but not for `foo.bar.example.com`.

### Request a certificate via Service

```yaml
apiVersion: v1
kind: Service
metadata:
  annotations:
    cert.gardener.cloud/secretname: test-service-secret
    dns.gardener.cloud/dnsnames: "service.shoot.project.default-domain.gardener.cloud, morethan64characters.svc.shoot.project.default-domain.gardener.cloud"
    dns.gardener.cloud/ttl: "600"
  name: test-service
  namespace: default
spec:
  ports:
    - name: http
      port: 80
      protocol: TCP
      targetPort: 8080
  type: LoadBalancer
```

> `metadata.annotations[cert.gardener.cloud/secretname]` specifies the secret which contains the certificate/key pair. If the secret is not available yet, it'll be created automatically as soon as the certificate has been issued.

> `metadata.annotations[dns.gardener.cloud/dnsnames]` specifies for which domains the certificate request will be created. The first entry is always taken to fill the `Common Name` field and must therefore comply with the [64 character](#Character-Restrictions) limit.

### Request a wildcard certificate via Service

```yaml
apiVersion: v1
kind: Service
metadata:
  annotations:
    cert.gardener.cloud/secretname: test-service-secret
    dns.gardener.cloud/dnsnames: "*.service.shoot.project.default-domain.gardener.cloud"
    dns.gardener.cloud/ttl: "600"
  name: test-service
  namespace: default
spec:
  ports:
    - name: http
      port: 80
      protocol: TCP
      targetPort: 8080
  type: LoadBalancer
```

> `metadata.annotations[cert.gardener.cloud/secretname]` specifies the secret which contains the certificate/key pair. If the secret is not available yet, it'll be created automatically as soon as the certificate has been issued.

> `metadata.annotations[dns.gardener.cloud/dnsnames]` please make sure the wildcard domain complies with the [64 character](#Character-Restrictions) limit.

> Please note that verifications for wildcard domain certificates only succeed if the subdomain and wildcard domain are on the same level. For example: A certificate for `*.example.com` works for `foo.example.com` but not for `foo.bar.example.com`.

<style>
#body-inner blockquote {
    border: 0;
    padding: 10px;
    margin-top: 40px;
    margin-bottom: 40px;
    border-radius: 4px;
    background-color: rgba(0,0,0,0.05);
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    position:relative;
    padding-left:60px;
}
#body-inner blockquote:before {
    content: "!";
    font-weight: bold;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    background-color: #00a273;
    color: white;
    vertical-align: middle;
    margin: auto;
    width: 36px;
    font-size: 30px;
    text-align: center;
}
</style>
