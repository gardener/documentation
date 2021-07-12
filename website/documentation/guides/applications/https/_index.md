---
title: HTTPS with self Signed Certificate
remote: https://github.com/freegroup/kube-https.git
level: intermediate
category: Certificates
scope: app-developer
---
## Configuring ingress with front-end TLS

It is always recommended to enable encryption for services to prevent traffic interception and 
man-in-the-middle attacks - even in DEV environments. 

![Screen](https://raw.githubusercontent.com/freegroup/kube-https/master/images/ingress-https.png?raw=true "Screenshot")

You should configure front-end Transport Layer Security (TLS) so that the ingress controller can secure 
access to a service from the client to the load balancer by using HTTPS.

We will use basic procedure here. If your configuration requires advanced security options, please refer 
to official CloudFlare's [cfssl](https://github.com/cloudflare/cfssl) documentation.

## Before you begin
At first, you need to have a Kubernetes cluster, and the kubectl command-line tool must be configured to communicate 
with your cluster. If you do not already have a cluster, you can create one by using Gardener

### Install CFSSL
The first step in securing Docker and Kubernetes is to set up a PKI infrastructure for managing TLS certificates.

### Initialize a CA
Before we can generate any certs we need to initialize a CA.

```bash
mkdir cfssl
cd cfssl
cfssl print-defaults config > ca-config.json
cfssl print-defaults csr > ca-csr.json
```
### Configure CA options
Now we can configure signing options inside ca-config.json config file. Default options 
contain following preconfigured fields:

 - profiles: www with server auth (TLS Web Server Authentication) X509 V3 extension and client with client auth (TLS Web Client Authentication) X509 V3 extension.
 - expiry: with 8760h default value (or 365 days)

For compliance let's edit the `ca-config.json` file and rename ***www*** profile into **server**

Edit the `ca-csr.json` to your needs. See example below. Keep in mind that the **hosts** entries must match
all your ingress entries.

example `ca-csr.json` 
```json
{
    "CN": "Gardener Self Signed CA",
    "hosts": [
        "ui.ingress.https-test.cpet.shoot.canary.k8s-hana.ondemand.com",
        "api.ingress.https-test.cpet.shoot.canary.k8s-hana.ondemand.com"
    ],
    "key": {
        "algo": "rsa",
        "size": 2048
    },
    "names": [
        {
            "C": "US",
            "ST": "CA",
            "L": "San Francisco"
        }
    ]
}
```

And generate CA with defined options:

```sh
cfssl gencert -initca ca-csr.json | cfssljson -bare ca -
```

You'll get following files:

 - ca-key.pem
 - ca.csr
 - ca.pem

**Note: Please keep ca-key.pem file in safe. This key allows to create any kind of certificates within your CA.**


## Generate server certificate

```sh
cfssl print-defaults csr > server.json
```

Most important values for server certificate are Common Name (CN) and hosts. We have to substitute them, for example:
```json
{
    "CN": "Gardener Self Signed CA",
    "hosts": [
        "ui.ingress.https-test.cpet.shoot.canary.k8s-hana.ondemand.com",
        "api.ingress.https-test.cpet.shoot.canary.k8s-hana.ondemand.com"
    ],
    "key": {
        "algo": "rsa",
        "size": 2048
    },
    "names": [
        {
            "C": "US",
            "ST": "CA",
            "L": "San Francisco"
        }
    ]
}

```

Now we are ready to generate server certificate and private key:

```sh
cfssl gencert -ca=ca.pem -ca-key=ca-key.pem -config=ca-config.json -profile=server server.json | cfssljson -bare server
```

You'll get following files:
 - server-key.pem
 - server.csr
 - server.pem


## Configure Kubernetes ingress with TLS
To configure front-end TLS, you need to create a TLS certificate (already done above), create a Kubernetes secret, update 
applicable .yaml files, apply your .yaml file changes, regenerate ingress controllers, and visit the application.

 
## Create Kubernetes secret

```sh
kubectl create secret tls tls-secret --key ./server-key.pem --cert server.pem
```


## Create Service / Ingress

now you can referenc ethe TLS secret within your ingress definition

example ingress definition
```yaml
apiVersion: v1
kind: Service
metadata:
  labels:
    app: node-server
  name: node-svc
  namespace: default
spec:
  type: NodePort
  ports:
    - port: 8080
  selector:
    app: node-server
---
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: node-ingress
spec:
  tls:
  - hosts:
    - ui.ingress.https-test.cpet.shoot.canary.k8s-hana.ondemand.com
    secretName: tls-secret
  rules:
  - host: ui.ingress.https-test.cpet.shoot.canary.k8s-hana.ondemand.com
    http:
      paths:
      - backend:
          serviceName: node-svc
          servicePort: 8080

```
