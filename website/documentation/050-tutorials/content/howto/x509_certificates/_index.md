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

## Restrictions

### Domains
Certificates can only be received for **Default Domains**. Custom domains for Shoot clusters are not covered by this service.

### Character Restrictions
Due to the ACME protocol specification, certificates for domains exceeding a limit of 64 characters cannot be issued.

## Process
### 1. Create Ingress Resource (optional)
In order to request a certificate for a domain managed by Gardener an **Ingress** is required. In case you don't 
already have one, take the following as an example:

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: vuejs-ingress
spec:
  tls:
  # Gardener managed default domain.
  # Must not exceed 64 characters.
  - hosts:
    - test.ingress.<GARDENER-CLUSTER>.<GARDENER-PROJECT>.shoot.example.com
    # Certificate and private key reside in this secret.
    secretName: testsecret-tls
  rules:
  - host: test.ingress.<GARDENER-CLUSTER>.<GARDENER-PROJECT>.shoot.example.com
    http:
      paths:
      - backend:
          serviceName: vuejs-svc
          servicePort: 8080
```

`spec.tls[].hosts` specifies for which domains a certificate request will be created. Wildcard domains can also be handled but should be used with caution since overlapping domain names are not permitted in the request.

`spec.tls[].secretName` specifies the secret which contains the certificate/key pair to be used by this Ingress. If the secret is not available yet, it'll be created automatically as soon as the certificate has been issued.

Please note, Ingress resources aren't required to be properly functional in this context. They can also be used to 
solely request certificates, which in turn can be used for further scenarios.

### 2. Label Ingress Resource
The label `garden.sapcloud.io/purpose: managed-cert` instructs Gardener to handle certificate issuance for the domains 
found in labeled Ingress.

> Domains not managed by Gardener are ignored.

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: tls-example-ingress
  labels:
    # Let Gardener manage certificates for this Ingress.
    garden.sapcloud.io/purpose: managed-cert
...
```

### 3. Request Status
> Processing a certificate request takes several minutes due to domain ownership verification and ACME communication.

Follow the **Events** of the **Ingress** resource to get latest updates about the request progress:

```sh
$ kubectl -n <Namespace> describe ingress <Ingress Name>
Events:
  Type     Reason          Age                  From                         Message
  ----     ------          ----                 ----                         -------
  Normal   CREATE          11m                  nginx-ingress-controller     Ingress default/vuejs-ingress
  Normal   Certificate     4m52s                Cert-Broker-Ingress-Control  Certificate request initiated
  Normal   CreateOrder     4m49s                Cert-Broker-Ingress-Control  Created new ACME order, attempting validation...
  Normal   DomainVerified  2m33s                Cert-Broker-Ingress-Control  Domain "test.ingress.<GARDENER-CLUSTER>.<GARDENER-PROJECT>.shoot.example.com" verified with "dns-01" validation
  Normal   IssueCert       20s                  Cert-Broker-Ingress-Control  Issuing certificate...
  ...
```

The following events will appear as soon as the certificate has been issued to your cluster:

```sh
Events:
  ...
  Normal   CertObtained    14s                  Cert-Broker-Ingress-Control  Obtained certificate from ACME server
  Normal   CertIssued      14s                  Cert-Broker-Ingress-Control  Certificate issued successfully
```

## Ingress Changes
Changes to the `.spec.tls` section of your Ingress will subsequently affect certificate management. Thus, it is 
possible to request certificates for changed or extended domains any time. Changing the `secretName` in your Ingress 
is not encouraged, though.




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
