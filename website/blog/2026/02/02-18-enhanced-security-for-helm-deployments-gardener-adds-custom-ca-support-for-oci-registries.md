---
title: "Enhanced Security for Helm Deployments: Gardener Adds Custom CA Support for OCI Registries"
linkTitle: "Enhanced Security for Helm Deployments: Gardener Adds Custom CA Support for OCI Registries"
newsSubtitle: February 18, 2026
publishdate: 2026-02-18
authors:
- avatar: https://avatars.githubusercontent.com/shafeeqes
  email: shafeeque.e.s@sap.com
  login: shafeeqes
  name: Shafeeque E S
aliases: ["/blog/2026/02/18/enhanced-security-for-helm-deployments-gardener-adds-custom-ca-support-for-oci-registries"]
---

Gardener continues to enhance its security and flexibility, particularly for users operating in air-gapped environments or utilizing private infrastructure. A new feature now allows operators to specify a custom Certificate Authority (CA) bundle when pulling Helm charts from OCI registries. This is a significant improvement for environments where registries are secured with custom or self-signed TLS certificates.

### The Challenge of Private Registries

Previously, while Gardener supported authentication to private OCI registries using pull secrets, it lacked a way to establish trust with registries that use a custom TLS certificate chain. This would result in "x509: certificate signed by unknown authority" errors, preventing the download of Helm charts for extensions and other components.

### A New Level of Trust: `caBundleSecretRef`

To solve this, a new optional field, `caBundleSecretRef`, has been added to the `ociRepository` configuration in the following resources:
- `operator.gardener.cloud/v1alpha1.Extension`
- `core.gardener.cloud/v1beta1.ControllerDeployment`
- `core.gardener.cloud/v1.ControllerDeployment`

This field allows you to reference a Kubernetes Secret that contains the necessary CA bundle to verify the OCI registry's TLS certificate.

### How It Works

The process is straightforward:

1.  **Create a CA Bundle Secret**: First, you create a standard Kubernetes Secret in the `garden` namespace. This secret must contain the PEM-encoded CA certificate bundle under the data key `bundle.crt`.

2.  **Label the Secret**: For the `gardenlet` to use this secret, it must be labeled with `gardener.cloud/role: oci-ca-bundle`. This label allows Gardener's controllers to find the secret and propagate it to the virtual garden, making it available during reconciliation.

3.  **Reference the Secret**: Finally, you reference this secret by name in the `caBundleSecretRef` field within the `ociRepository` block of your `Extension` or `ControllerDeployment` manifest.

Here is an example of how to configure an extension to use a private OCI registry with a custom CA:

First, create the secret containing your CA bundle:
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: my-registry-ca
  namespace: garden
  labels:
    gardener.cloud/role: oci-ca-bundle
type: Opaque
data:
  bundle.crt: <base64-encoded-ca-bundle>
```

Next, reference this secret in your `Extension` definition:
```yaml
apiVersion: operator.gardener.cloud/v1alpha1
kind: Extension
metadata:
  name: provider-example
spec:
  deployment:
    extension:
      helm:
        ociRepository:
          repository: registry.example.com/charts/extension
          tag: v1.0.0
          caBundleSecretRef:
            name: my-registry-ca
          pullSecretRef:
            name: my-pull-secret
```

With this configuration, Gardener will use the provided CA bundle to securely pull the Helm chart, enabling seamless deployment of extensions from your private registries.

This feature is the first step in a broader effort to improve support for custom CAs. Future updates will extend this capability, for example, to the `gardener-node-agent` for pulling images during node bootstrapping.

---
### Explore Further
- [Recording of the presentation](https://youtu.be/jScp5zha7Fc?t=1922)
- [GitHub Pull Request #13868](https://github.com/gardener/gardener/pull/13868)