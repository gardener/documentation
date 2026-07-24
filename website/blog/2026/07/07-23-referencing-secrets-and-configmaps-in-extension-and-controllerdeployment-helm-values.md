---
title: "Referencing Secrets and ConfigMaps in Extension and ControllerDeployment Helm Values"
linkTitle: "Referencing Secrets and ConfigMaps in Extension and ControllerDeployment Helm Values"
newsSubtitle: July 23, 2026
publishdate: 2026-07-23
authors:
- avatar: https://avatars.githubusercontent.com/oliver-goetz
  login: oliver-goetz
  name: Oliver Götz
tags:
- feature-announcement
- extensions
- helm
aliases: ["/blog/2026/07/23/referencing-secrets-and-configmaps-in-extension-and-controllerdeployment-helm-values"]
---

Gardener extensions and controller deployments are configured via Helm values embedded directly in `Extension` (`operator.gardener.cloud`) and `ControllerDeployment` (`core.gardener.cloud`) objects. Until now, this meant sensitive data — credentials, certificates, environment-specific configuration — had to be stored inline in these objects. That created friction: the objects are not encrypted at rest in the runtime cluster, external secret management systems had to update the extension object itself, and credential rotation could conflict with extension version management since both touch the same object.

Gardener v1.147 introduces a `resources` field on both object types, allowing you to reference `Secret`s and `ConfigMap`s from the `garden` namespace and template their values into the Helm chart via Go template expressions.

## How It Works

Declare references in the object's `resources` field, then use `{{ .resources.<name>.data.<key> }}` expressions anywhere in the Helm values:

```yaml
apiVersion: operator.gardener.cloud/v1alpha1
kind: Extension
metadata:
  name: provider-foo
spec:
  deployment:
    resources:
    - name: myCredentials
      resourceRef:
        apiVersion: v1
        kind: Secret
        name: provider-foo-credentials
    - name: myConfig
      resourceRef:
        apiVersion: v1
        kind: ConfigMap
        name: provider-foo-config
    extension:
      values:
        credentials:
          username: "{{ .resources.myCredentials.data.username }}"
          password: "{{ .resources.myCredentials.data.password }}"
        endpoint: "{{ .resources.myConfig.data.endpoint }}"
```

For `Extension`, the references are resolved by `gardener-operator` against the garden runtime cluster and can be used in `spec.deployment.extension.values`, `spec.deployment.extension.runtimeClusterValues`, and `spec.deployment.admission.values`.

For `ControllerDeployment`, the references are resolved by `gardenlet` against the virtual garden cluster and can be used in `helm.values`.

Referenced objects must reside in the `garden` namespace and carry the label `gardener.cloud/role: resource-reference`. This label is required so that the controllers watching them can pick up changes and trigger reconciliation — meaning when a `Secret` or `ConfigMap` value changes, the extension or controller deployment is automatically reconciled with the new values.

## Admission Validation

To catch misconfiguration early, admission validation enforces:

- Every `{{ ... }}` expression in the values must match exactly the form `{{ .resources.<name>.data.<key> }}`. Other Go template constructs are rejected.
- The referenced `<name>` must be declared in the same object's `resources` list. Referencing an undeclared name is rejected at admission time.

Invalid characters in names (dashes, underscores — only alphanumeric characters are allowed) are also caught immediately.

## Reference Protection

A finalizer (`reference-protection`) is added to any referenced `Secret` or `ConfigMap` by the reference controller, preventing accidental deletion while the object is in use by an extension or controller deployment.

## ControllerDeployment Without an Extension Object

`ControllerDeployment` resources can also use resource references independently, without a corresponding `Extension` object. In this case, the referenced `Secret`s and `ConfigMap`s must be created manually in the `garden` namespace of the virtual garden cluster.

## Further Reading

- [📽️ Recording (Review Meeting 2026/07/22)](https://youtu.be/Xs5TbQjLBKY?t=2774)
- [Extension registration documentation](https://github.com/gardener/gardener/blob/master/docs/extensions/registration.md)
- [gardener/gardener#14979](https://github.com/gardener/gardener/pull/14979)
