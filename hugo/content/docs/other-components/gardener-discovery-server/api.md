---
github_repo: 'https://github.com/gardener/gardener-discovery-server'
github_subdir: docs
params:
  github_branch: main
path_base_for_github_subdir:
  from: content/docs/other-components/gardener-discovery-server/api.md
  to: api.md
title: Api
prev: false
next: false
managed: true
---

# Gardener Discovery Server API

The Gardener Discovery Server currently handles the following operations:

## Garden Operations

### Retrieve the OpenID Configuration of the Workload Identity Issuer of the Garden cluster

#### Request

```
GET /garden/workload-identity/issuer/.well-known/openid-configuration
```

#### Response

```json
{
  "issuer": "https://local.gardener.cloud/garden/workload-identity/issuer",
  "jwks_uri": "https://local.gardener.cloud/garden/workload-identity/issuer/jwks",
  "response_types_supported": [
    "id_token"
  ],
  "subject_types_supported": [
    "public"
  ],
  "id_token_signing_alg_values_supported": [
    "RS256"
  ]
}
```

### Retrieve the JWKS of the Workload Identity Issuer of the Garden cluster

#### Request

```
GET /garden/workload-identity/issuer/jwks
```

#### Response

```json
{
  "keys": [
    {
      "use": "sig",
      "kty": "RSA",
      "kid": "AvI...vWZ4",
      "alg": "RS256",
      "n": "1X1fsFJluuanoKq6c_...TUsX5bTv6c_c1xoqayFQc",
      "e": "AQAB"
    }
  ]
}
```

## Shoot Operations

### Retrieve the OpenID Configuration of a Shoot cluster

#### Request

```
GET /projects/{projectName}/shoots/{shootUID}/issuer/.well-known/openid-configuration
```

#### Response

```json
{
  "issuer": "https://local.gardener.cloud/projects/local/shoots/7b4ed380-2eea-4cf5-87d9-fd220727bb54/issuer",
  "jwks_uri": "https://local.gardener.cloud/projects/local/shoots/7b4ed380-2eea-4cf5-87d9-fd220727bb54/issuer/jwks",
  "response_types_supported": [
    "id_token"
  ],
  "subject_types_supported": [
    "public"
  ],
  "id_token_signing_alg_values_supported": [
    "RS256"
  ]
}
```

### Retrieve the JWKS of a Shoot cluster

#### Request

```
GET /projects/{projectName}/shoots/{shootUID}/issuer/jwks
```

#### Response

```json
{
  "keys": [
    {
      "use": "sig",
      "kty": "RSA",
      "kid": "AvI...vWZ4",
      "alg": "RS256",
      "n": "1X1fsFJluuanoKq6c_...TUsX5bTv6c_c1xoqayFQc",
      "e": "AQAB"
    }
  ]
}
```

### Retrieve the CA of a Shoot cluster

#### Request

```
GET /projects/{projectName}/shoots/{shootUID}/cluster-ca
```

#### Response

```json
{
  "certs": "-----BEGIN CERTIFICATE-----\n...\n-----END CERTIFICATE-----\n"
}
```
