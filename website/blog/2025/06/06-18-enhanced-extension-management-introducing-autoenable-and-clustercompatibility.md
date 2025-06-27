---
title: "Enhanced Extension Management: Introducing `autoEnable` and `clusterCompatibility`"
linkTitle: "Enhanced Extension Management: Introducing `autoEnable` and `clusterCompatibility`"
newsSubtitle: June 18, 2025
publishdate: 2025-06-18
authors:
- avatar: https://avatars.githubusercontent.com/timuthy
  login: timuthy
  name: Tim Usner
aliases: ["/blog/2025/06/18/enhanced-extension-management-introducing-autoenable-and-clustercompatibility"]
---

Gardener's extension mechanism has been enhanced with two new fields in the `ControllerRegistration` and `operatorv1alpha1.Extension` APIs, offering operators more granular control and improved safety when managing extensions. These changes, detailed in [PR #11982](https://github.com/gardener/gardener/pull/11982), introduce `autoEnable` and `clusterCompatibility` for resources of `kind: Extension`.

### Fine-Grained Automatic Enablement with `autoEnable`

Previously, operators could use the `globallyEnabled` field to automatically enable an extension resource for all shoot clusters. This field is now deprecated and will be removed in Gardener `v1.123`.

The new `autoEnable` field replaces `globallyEnabled` and provides more flexibility. Operators can now specify an array of cluster types for which an extension should be automatically enabled. The supported cluster types are:
*   `shoot`
*   `seed`
*   `garden`

This allows, for example, an extension to be automatically enabled for all seed clusters or a combination of cluster types, which was not possible with the boolean `globallyEnabled` field.

If `autoEnable` includes `shoot`, it behaves like the old `globallyEnabled: true` for shoot clusters. If an extension is not set to `autoEnable` for a specific cluster type, it must be explicitly enabled in the respective cluster's manifest (e.g., `Shoot` manifest for a shoot cluster).

```yaml
# Example in ControllerRegistration or operatorv1alpha1.Extension spec.resources
- kind: Extension
  type: my-custom-extension
  autoEnable:
  - shoot
  - seed
  # globallyEnabled: true # This field is deprecated
```

### Ensuring Correct Deployments with `clusterCompatibility`

To enhance safety and prevent misconfigurations, the `clusterCompatibility` field has been introduced. This field allows extension developers and operators to explicitly define which cluster types a generic Gardener extension is compatible with. The supported cluster types are:
*   `shoot`
*   `seed`
*   `garden`

Gardener will validate that an extension is only enabled or automatically enabled for cluster types listed in its `clusterCompatibility` definition. If `clusterCompatibility` is not specified for an `Extension` kind, it defaults to `['shoot']`. This provides an important safeguard, ensuring that extensions are not inadvertently deployed to environments they are not designed for.

```yaml
# Example in ControllerRegistration or operatorv1alpha1.Extension spec.resources
- kind: Extension
  type: my-custom-extension
  autoEnable:
  - shoot
  clusterCompatibility: # Defines where this extension can be used
  - shoot
  - seed
```

### Important Considerations for Operators

*   **Deprecation of `globallyEnabled`**: Operators should migrate from `globallyEnabled` to the new `autoEnable` field for `kind: Extension` resources. `globallyEnabled` is deprecated and scheduled for removal in Gardener `v1.123`.
*   **Breaking Change for Garden Extensions**: The introduction of `clusterCompatibility` is a breaking change for operators managing garden extensions via `gardener-operator`. If your `Garden` custom resource specifies `spec.extensions`, you must update the corresponding `operatorv1alpha1.Extension` resources to include `garden` in the `clusterCompatibility` array for those extensions intended to run in the garden cluster.

These new fields provide more precise control over extension lifecycle management across different cluster types within the Gardener ecosystem, improving both operational flexibility and system stability.

For further details, you can review the [original pull request (#11982)](https://github.com/gardener/gardener/pull/11982) and watch the [demonstration in the Gardener Review Meeting (starting at 41:23)](https://youtu.be/HguO_KY86ac?t=2483).