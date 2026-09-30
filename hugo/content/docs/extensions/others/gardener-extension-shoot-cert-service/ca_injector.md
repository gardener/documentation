---
github_repo: 'https://github.com/gardener/gardener-extension-shoot-cert-service'
github_subdir: docs/usage
params:
  github_branch: master
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/others/gardener-extension-shoot-cert-service/ca_injector.md
  to: ca_injector.md
persona: Users
title: Ca Injector
prev: false
next: false
---
<!-- BANNER:MANAGED -->
<!--
   █▀▀ ▀█▀ █▀█ █▀█
   ▀▀█  █  █ █ █▀▀
   ▀▀▀  ▀  ▀▀▀ ▀

   ┌────────────────────────────────────────────────┐
   │  MANAGED FILE — aggregated from upstream       │
   │                                                │
   │  Editing here is pointless: The nightly        │
   │  aggregation run overwrites this file.         │
   │                                                │
   │  Open a PR against the source instead: ─────┐  │
   │                          ┌──┐    ┌──────────┘  │
   │                          └──│────┘             │
   │           ┌─────────────────┘                  │
   └───────────│────────────────────────────────────┘
               ▼               
   https://github.com/gardener/gardener-extension-shoot-cert-service/blob/master/docs/usage/ca_injector.md
-->


# CA Injector

## Overview

Kubernetes resources such as `ValidatingWebhookConfiguration`, `MutatingWebhookConfiguration`,
`CustomResourceDefinition` (conversion webhooks) and `APIService` reference a CA bundle (`caBundle`) that clients use to
verify the TLS certificate served by the webhook or extension API server. Keeping this `caBundle` in sync with a
rotating certificate is error-prone when done manually.

The `caInjector` option enables additional controllers in the `cert-controller-manager` that automatically populate the
`caBundle` field of these resources from a `Certificate` or `Secret`. This is analogous to the CA injector shipped with
cert-manager, but driven by `cert-management`.

When enabled, the following controllers are added to the seed deployment:

- `cainjector-validatingwebhook`
- `cainjector-mutatingwebhook`
- `cainjector-crd`
- `cainjector-apiservice`

## Configuration

Set `caInjector` in the shoot's `Extension` resource under `spec.providerConfig`:

```yaml
kind: Shoot
apiVersion: core.gardener.cloud/v1beta1
...
spec:
  extensions:
  - type: shoot-cert-service
    providerConfig:
      apiVersion: service.cert.extensions.gardener.cloud/v1alpha1
      kind: CertConfig
      caInjector:
        enabled: true
```

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `enabled` | `bool` | yes | Enables the CA injector controllers. When `false` (default), no CA bundles are injected automatically. |

## Annotating target resources

The CA source for each target resource is selected via annotations. Add one of the following annotations to the
`ValidatingWebhookConfiguration`, `MutatingWebhookConfiguration`, `CustomResourceDefinition` or `APIService` whose
`caBundle` should be managed:

| Annotation | Value | Description |
| --- | --- | --- |
| `cert.gardener.cloud/inject-ca-from` | `<namespace>/<name>` | Injects the CA from the referenced `Certificate` resource. |
| `cert.gardener.cloud/inject-ca-from-secret` | `<namespace>/<name>` | Injects the CA directly from the referenced `Secret`. Requires the guard annotation below on that `Secret`. |

The controller watches the annotated resources and keeps their `caBundle` up to date whenever the referenced
`Certificate` or `Secret` changes. The CA is read from the `ca.crt` key of the resolved `Secret`.

### Direct injection from a Secret

For safety, direct injection via `cert.gardener.cloud/inject-ca-from-secret` is not allowed by default. The referenced
`Secret` must explicitly opt in by carrying the following guard annotation; otherwise no CA bundle is injected:

| Annotation | Value | Description |
| --- | --- | --- |
| `cert.gardener.cloud/allow-direct-injection` | `"true"` | Must be set on the `Secret` to permit direct CA injection from it. |

This guard applies only to the `inject-ca-from-secret` path. Injection via `inject-ca-from` (from a `Certificate`) reads
the certificate's own Secret and does not require the guard annotation.

## Example

Enable the CA injector and let it manage the `caBundle` of a webhook configuration from a `Certificate`:

```yaml
kind: Shoot
apiVersion: core.gardener.cloud/v1beta1
metadata:
  name: my-shoot
  namespace: my-project
spec:
  extensions:
  - type: shoot-cert-service
    providerConfig:
      apiVersion: service.cert.extensions.gardener.cloud/v1alpha1
      kind: CertConfig
      caInjector:
        enabled: true
```

```yaml
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingWebhookConfiguration
metadata:
  name: my-webhook
  annotations:
    cert.gardener.cloud/inject-ca-from: my-namespace/my-serving-cert
webhooks:
- name: my-webhook.example.com
  clientConfig:
    service:
      name: my-webhook
      namespace: my-namespace
      path: /validate
    # caBundle is populated automatically by the CA injector
  ...
```
