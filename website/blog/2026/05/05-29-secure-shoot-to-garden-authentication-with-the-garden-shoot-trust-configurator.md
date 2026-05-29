---
title: "Secure Shoot-to-Garden Authentication with the Garden-Shoot Trust Configurator"
linkTitle: "Secure Shoot-to-Garden Authentication with the Garden-Shoot Trust Configurator"
newsSubtitle: May 29, 2026
publishdate: 2026-05-29
authors:
- avatar: https://avatars.githubusercontent.com/theoddora
  login: theoddora
  name: Theodora Tosheva
tags:
- feature-announcement
- security
aliases: ["/blog/2026/05/29/secure-shoot-to-garden-authentication-with-the-garden-shoot-trust-configurator"]
---

Managing credentials for workloads that need to communicate between shoot clusters and the garden cluster has traditionally been a challenge. Static credentials are difficult to distribute, rotate, and audit. The new `garden-shoot-trust-configurator` eliminates this problem by leveraging native Kubernetes service account identities via OIDC federation.

## The Problem

Workloads running in shoot clusters sometimes need to authenticate against the garden cluster — for example, to query shoot status or perform health checks. Without a trust mechanism, operators would need to create and distribute static credentials, which is both insecure and operationally expensive.

## How It Works

The solution builds on Kubernetes' native service account token projection and OIDC discovery. With just two annotations on a shoot resource, operators can establish trust between a shoot and the garden cluster:

1. **Managed Service Account Issuer** — enables the discovery server to expose the shoot's OpenID Connect configuration via a well-known endpoint.
2. **Trusted shoot annotation** — signals the garden-shoot-trust-configurator to create an `OpenIDConnect` custom resource for this shoot.

Once trust is established, workloads in the shoot can use projected service account tokens to authenticate to the garden cluster's API server. The flow is:

1. A workload in the shoot obtains a projected service account token.
2. It presents this token to the garden cluster's API server.
3. The OIDC webhook authenticator validates the token against the shoot's discovery endpoint and extracts the workload's identity.
4. Standard RBAC in the garden cluster authorizes the request.

No static credentials are involved — identities are derived directly from the shoot's native service accounts.

## Architecture

Three components work together:

- **Discovery server** — deployed via `gardener-operator`, exposes the OpenID Connect configuration and JWKS endpoints for shoots with managed issuers.
- **OIDC webhook authenticator** — validates tokens from trusted shoots and maps them to garden cluster identities with configurable username and group prefixes.
- **Garden-shoot-trust-configurator** — watches for shoots annotated as trusted and automatically creates the corresponding `OpenIDConnect` resources.

Both the trust configurator and the OIDC webhook authenticator are available as a Gardener extension, making deployment straightforward.

## Getting Started

The [public documentation](https://gardener.cloud/docs/gardener/security/shoot_serviceaccounts/#Managed-Service-Account-Issuer) provides a step-by-step guide for enabling trust between shoot and garden clusters. The [garden-shoot-trust-configurator repository](https://github.com/gardener/garden-shoot-trust-configurator) contains the source code and local development instructions.

## Learn More

- [Recording: Garden-Shoot Trust Configuration demo (v1.143 Review Meeting)](https://youtu.be/fpbPv63uHRo?t=1204)
- [garden-shoot-trust-configurator on GitHub](https://github.com/gardener/garden-shoot-trust-configurator)
