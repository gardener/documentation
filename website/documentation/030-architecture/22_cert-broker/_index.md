---
title: Cert Broker
remote: https://github.com/gardener/cert-broker.git
url: /components/cert-broker/
type: components
---
# cert-broker
Cert-Broker is a complementary component for [Cert-Manager](https://github.com/jetstack/cert-manager). It enables certificate management for Kubernetes clusters which don't operate their own (in-cluster) Cert-Manager, e.g. for  organizational resposibilities the Cert-Manager is located in another cluster.

## Concept
To use or contribute to Cert-Broker it is fundamental to understand its main concept of control and target cluster.

- Control cluster: The cluster which operates an instance of Cert-Manager.
- Target cluster: The cluster which demands TLS certificates by Cert-Manager through the Cert-Broker.

Cert-Broker replicates Ingress resources from the target cluster to a predefined namespace in the control cluster. After the matching TLS Secret resource was created by Cert-Manager, Cert-Broker copies it to the appropriate Namespace in the target cluster. This works similarily in case the certificate is renewed.

## Installation
To install Cert-Broker on the control cluster, fill out the place holders and run
```
helm install charts/cert-broker \
    --name cert-broker \
    --namespace <Namespace> \
    --set certbroker.targetClusterSecret=<Target cluster Kubeconfig> \
    --set certmanager.dns="{"<Domain>"."<DNS Provider>", "<Domain>"."<DNS Provider>"}" \
    --set certmanager.clusterissuer="<Issuer Name>"
```

## Limitations
In case Cert-Manager issues certificates for the target cluster with [Let's Encrypt](https://letsencrypt.org/), the domain's ownership can only be proven by DNS records, i.e. [DNS01 Challenges](http://docs.cert-manager.io/en/latest/reference/issuers/acme/dns01.html?highlight=dns01) must be used.
