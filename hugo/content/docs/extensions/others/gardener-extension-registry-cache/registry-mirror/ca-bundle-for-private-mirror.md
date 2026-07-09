---
github_repo: 'https://github.com/gardener/gardener-extension-registry-cache'
github_subdir: docs/usage/registry-mirror
params:
  github_branch: main
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/others/gardener-extension-registry-cache/registry-mirror/ca-bundle-for-private-mirror.md
  to: ca-bundle-for-private-mirror.md
persona: Users
title: How to provide a certificate authority bundle for a private mirror?
prev: false
next: false
managed: true
---

# How to provide a certificate authority bundle for a private mirror?

A private mirror can use a self-signed certificate. In order to support such private mirrors the certificate authority bundle needs to be provided for the mirror host.

## Procedure

1. Create an immutable Secret with the certificate authority bundle in the Garden cluster.
   
   ```bash
   kubectl create -f - <<EOF
   apiVersion: v1
   kind: Secret
   metadata:
     name: private-mirror-ca-bundle-v1
     namespace: garden-dev
   type: Opaque
   immutable: true
   data:
     bundle.crt: <base64-encoded-ca-bundle>
   EOF
   ```

1. Add the newly created Secret as a reference to the Shoot spec, and then to the registry-mirror extension configuration.
   
   In the registry-mirror configuration, set the `caBundleSecretReferenceName` field. It should point to a resource reference under `spec.resources`. The resource reference itself points to the Secret in project namespace.
   
   ```yaml
   apiVersion: core.gardener.cloud/v1beta1
   kind: Shoot
   # ...
   spec:
     extensions:
     - type: registry-mirror
       providerConfig:
         apiVersion: mirror.extensions.gardener.cloud/v1alpha3
         kind: MirrorConfig
         mirrors:
        - upstream: quay.io
          hosts:
          - host: "https://private-mirror.internal"
            caBundleSecretReferenceName: private-mirror-ca-bundle
     # ...
     resources:
     - name: private-mirror-ca-bundle
       resourceRef:
         apiVersion: v1
         kind: Secret
         name: private-mirror-ca-bundle-v1
   # ...
   ```
