---
title: "Simplify Multi-Cluster Configuration with Static Manifest Propagation"
linkTitle: "Simplify Multi-Cluster Configuration with Static Manifest Propagation"
newsSubtitle: February 18, 2026
publishdate: 2026-02-18
authors:
- avatar: https://avatars.githubusercontent.com/rfranzke
  email: rafael.franzke@sap.com
  login: rfranzke
  name: Rafael Franzke
aliases: ["/blog/2026/02/18/simplify-multi-cluster-configuration-with-static-manifest-propagation"]
---

Managing configurations consistently across a fleet of Kubernetes clusters can be a complex task. Operators often need a straightforward way to deploy baseline resources—such as security policies, resource quotas, or RBAC rules—to all or a subset of their clusters without the overhead of building and maintaining a full-blown extension.

Gardener now introduces a new feature that directly addresses this need: **Static Manifest Propagation from Seeds to Shoots**. This enhancement provides a declarative, centralized mechanism for distributing Kubernetes manifests to Shoot clusters.

### How It Works

The mechanism is simple yet powerful. During a Shoot reconciliation, the `gardenlet` component scans the `garden` namespace in its Seed cluster for any `Secret` resources labeled with `gardener.cloud/purpose=shoot-static-manifest`.

For each `Secret` it finds, `gardenlet` performs the following actions:
1.  It copies the `Secret` into the Shoot's control plane namespace within the Seed.
2.  It creates or updates a single `ManagedResource` that references all such `Secret`s.
3.  The `gardener-resource-manager` in the Shoot then ensures that the manifests contained within these `Secret`s are applied to the Shoot cluster.

This process runs automatically on every reconciliation, ensuring that the configurations in the Shoot clusters remain synchronized with the source manifests defined in the Seed.

### Getting Started: A Practical Example

To propagate a static manifest, such as a `ResourceQuota` or a `ClusterRole`, you simply create a `Secret` in the Seed's `garden` namespace.

1.  **Prepare your manifests** in a YAML file.
    ```yaml
    # my-manifests.yaml
    ---
    apiVersion: v1
    kind: ResourceQuota
    metadata:
      name: default-quota
      namespace: default
    spec:
      hard:
        pods: "50"
    ---
    apiVersion: rbac.authorization.k8s.io/v1
    kind: ClusterRole
    metadata:
      name: org-viewer
    rules:
    - apiGroups: [""]
      resources: ["pods", "services"]
      verbs: ["get", "list", "watch"]
    ```

2.  **Create a labeled `Secret`** in the `garden` namespace of your Seed cluster from this file.
    ```bash
    kubectl create secret generic my-static-manifests \
      --from-file=manifests.yaml=my-manifests.yaml \
      --namespace=garden \
      --dry-run=client -o yaml | \
      kubectl label --local -f - gardener.cloud/purpose=shoot-static-manifest | \
      kubectl apply -f -
    ```
Once applied, the next reconciliation of any Shoot on that Seed will deploy these resources. Updating the `Secret` in the `garden` namespace will automatically roll out the changes, and deleting it will clean up the resources from the Shoots.

### Targeting Specific Shoots

By default, manifests are propagated to all Shoot clusters on a given Seed. However, you can target specific Shoots by adding the `static-manifests.shoot.gardener.cloud/selector` annotation to your `Secret`. This annotation takes a standard Kubernetes label selector in JSON format, which is matched against the labels of the Shoot resource.

For example, to apply a manifest only to Shoots with the label `environment: production`, you would annotate your `Secret` like this:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: production-only-manifests
  namespace: garden
  labels:
    gardener.cloud/purpose: shoot-static-manifest
  annotations:
    static-manifests.shoot.gardener.cloud/selector: |
      {"matchLabels":{"environment":"production"}}
data:
  # ... your base64-encoded manifest data
```

### Important Considerations

-   **Static Only**: As the name implies, this feature is for purely static manifests. No templating or dynamic value injection is supported. For more complex scenarios, creating a Gardener extension remains the recommended approach.
-   **Resource Conflicts**: Operators are responsible for ensuring that propagated manifests do not conflict with resources managed by Gardener or other extensions.
-   **Health and Visibility**: If any resource deployed via this mechanism fails to apply or become healthy, the issue will be reflected in the `ManagedResource` status and will cause the Shoot's `SystemComponentsHealthy` condition to become `False`, providing clear visibility for operators.

This new feature empowers operators to enforce consistency and manage baseline configurations across their landscape of Shoot clusters with greater ease and efficiency.

### Further Reading

-   [Recording of the Presentation](https://youtu.be/jScp5zha7Fc?t=714)
-   [Pull Request #13614](https://github.com/gardener/gardener/pull/13614)
-   [Official Documentation](https://github.com/gardener/gardener/tree/master/docs/extensions/static-manifests.md)