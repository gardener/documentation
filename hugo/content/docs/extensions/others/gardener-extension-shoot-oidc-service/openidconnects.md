---
github_repo: 'https://github.com/gardener/gardener-extension-shoot-oidc-service'
github_subdir: docs/usage
params:
  github_branch: master
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/others/gardener-extension-shoot-oidc-service/openidconnects.md
  to: openidconnects.md
persona: Users
title: Openidconnects
prev: false
next: false
managed: true
---

# Register OpenID Connect provider in Shoot Clusters

## Introduction
Within a shoot cluster, it is possible to dynamically register OpenID Connect providers. It is necessary that the Gardener installation your shoot cluster runs in is equipped with a `shoot-oidc-service` extension. Please ask your Gardener operator if the extension is available in your environment.

> [!IMPORTANT]
> Kubernetes v1.29 introduced support for [Structured Authentication](https://kubernetes.io/blog/2024/04/25/structured-authentication-moves-to-beta/).
> Gardener allows the use of this feature for shoot clusters with Kubernetes version >= 1.30.
> 
> Structured Authentication should be preferred over the Gardener OIDC Extension in case:
> - you do not need more than 64 authenticators (a limitation that is tracked in <https://github.com/kubernetes/kubernetes/issues/122809>)
> - you do not need to register an issuer twice (anyways not recommended since it can lead to misconfiguration and user impersonation if done poorly)
> - you need the ability to write custom expressions to map and validate claims
> - you need support for multiple audiences per authenticator
> - you need support for providers that don't support OpenID connect discovery
> 
> See how to make use of [Structured Authentication in Gardener](https://gardener.cloud/docs/gardener/shoot/shoot_access/#structured-authentication).

## Shoot Feature Gate

In most of the Gardener setups the `shoot-oidc-service` extension is not enabled globally and thus must be configured per shoot cluster. Please adapt the shoot specification by the configuration shown below to activate the extension individually.

```yaml
kind: Shoot
...
spec:
  extensions:
    - type: shoot-oidc-service
...
```

## OpenID Connect provider

In order to register an OpenID Connect provider an `openidconnect` resource should be deployed in the shoot cluster.

> [!CAUTION]
> It is **strongly** recommended to **NOT** disable prefixing since it may result in unwanted impersonations.
> The rule of thumb is to always use meaningful and unique prefixes for both `username` and `groups`.
> A good way to ensure this is to use the name of the `openidconnect` resource as shown in the example below.

> [!CAUTION]
> It is **strongly** recommended to have **unique** issuer URLs across all `openidconnect`s and other places that might contain issuer URL configurations related to authentication (e.g. [Structured Authentication](https://kubernetes.io/docs/reference/access-authn-authz/authentication/#using-authentication-configuration) even forbids that).
> Users handled by an issuer must be identified in a consistent, predictable and unique way!

```yaml
apiVersion: authentication.gardener.cloud/v1alpha1
kind: OpenIDConnect
metadata:
  name: abc
spec:
  # issuerURL is the URL the provider signs ID Tokens as.
  # This will be the "iss" field of all tokens produced by the provider and is used for configuration discovery.
  issuerURL: https://abc-oidc-provider.example

  # audiences specifies the list of acceptable audience(s) values ("aud" claim) for the ID token
  audiences:
  - my-shoot-cluster

  # usernameClaim is the JWT field to use as the user's username.
  usernameClaim: sub

  # usernamePrefix, if specified, causes claims mapping to username to be prefix with the provided value.
  # A value "oidc:" would result in usernames like "oidc:john".
  # If not provided, the prefix defaults to "( .metadata.name )/". The value "-" can be used to disable all prefixing.
  usernamePrefix: "abc:"

  # groupsClaim, if specified, causes the OIDCAuthenticator to try to populate the user's groups with an ID Token field.
  # If the groupsClaim field is present in an ID Token the value must be a string or list of strings.
  # groupsClaim: groups

  # groupsPrefix, if specified, causes claims mapping to group names to be prefixed with the value.
  # A value "oidc:" would result in groups like "oidc:engineering" and "oidc:marketing".
  # If not provided, the prefix defaults to "( .metadata.name )/".
  # The value "-" can be used to disable all prefixing.
  # groupsPrefix: "abc:"

  # caBundle is a PEM encoded CA bundle which will be used to validate the OpenID server's certificate. If unspecified, system's trusted certificates are used.
  # caBundle: <base64 encoded bundle>

  # supportedSigningAlgs sets the accepted set of JOSE signing algorithms that can be used by the provider to sign tokens.
  # The default value is RS256.
  # supportedSigningAlgs:
  # - RS256

  # requiredClaims, if specified, causes the OIDCAuthenticator to verify that all the
  # required claims key value pairs are present in the ID Token.
  # requiredClaims:
  #   customclaim: requiredvalue

  # maxTokenExpirationSeconds if specified, sets a limit in seconds to the maximum validity duration of a token.
  # Tokens issued with validity greater that this value will not be verified.
  # Setting this will require that the tokens have the "iat" and "exp" claims.
  # maxTokenExpirationSeconds: 3600

  # jwks if specified, provides an option to specify JWKS keys offline.
  # jwks:
  #   keys is a base64 encoded JSON webkey Set. If specified, the OIDCAuthenticator skips the request to the issuer's jwks_uri endpoint to retrieve the keys.
  #   keys: <base64 encoded jwks>
```
