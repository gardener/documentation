---
title: "Gardener Dashboard 1.80: Streamlined Credentials, Enhanced Cluster Views, and Real-Time Updates"
linkTitle: "Gardener Dashboard 1.80: Streamlined Credentials, Enhanced Cluster Views, and Real-Time Updates"
newsSubtitle: May 19, 2025
publishdate: 2025-05-19
authors:
- avatar: https://avatars.githubusercontent.com/grolu
  login: grolu
  name: Lukas Gross
aliases: ["/blog/2025/05/19/gardener-dashboard-180-streamlined-credentials-enhanced-cluster-views-and-real-time-updates"]
---

# Gardener Dashboard 1.80: Streamlined Credentials, Enhanced Cluster Views, and Real-Time Updates

Gardener Dashboard version 1.80 introduces several significant enhancements aimed at improving user experience, credentials management, and overall operational efficiency. These updates bring more clarity to credential handling, a smoother experience for managing large numbers of clusters, and a move towards a more reactive interface.

### Unified and Enhanced Credentials Management

The management of secrets and credentials has been significantly revamped for better clarity and functionality:

*   **Introducing CredentialsBindings:** The dashboard now fully supports `CredentialsBinding` resources alongside the existing `SecretBinding` resources. This allows for referencing both Secrets and, in the future, Workload Identities more explicitly. While `CredentialsBindings` referencing Workload Identity resources are visible for cluster creation, editing or deleting them via the dashboard is not yet supported.
*   **"Credentials" Page:** The former "Secrets" page has been renamed to "Credentials." It features a new "Kind" column and distinct icons to clearly differentiate between `SecretBinding` and `CredentialsBinding` types, especially useful when resources share names. The column showing the referenced credential resource name has been removed as this information is part of the binding's details.
*   **Contextual Information and Safeguards:** When editing a secret, all its associated data is now displayed, providing better context. If an underlying secret is referenced by multiple bindings, a hint is shown to prevent unintended impacts. Deletion of a binding is prevented if the underlying secret is still in use by another binding.
*   **Simplified Creation and Editing:** New secrets created via the dashboard will now automatically generate a `CredentialsBinding`. While existing `SecretBindings` remain updatable, the creation of new `SecretBindings` through the dashboard is no longer supported, encouraging the adoption of the more versatile `CredentialsBinding`. The edit dialog for secrets now pre-fills current data, allowing for easier modification of specific fields.
*   **Handling Missing Secrets:** The UI now provides clear information and guidance if a `CredentialsBinding` or `SecretBinding` references a secret that no longer exists.

### Revamped Cluster List for Improved Scalability

Navigating and managing a large number of clusters is now more efficient:

*   **Virtual Scrolling:** The cluster list has adopted virtual scrolling. Rows are rendered dynamically as you scroll, replacing the previous pagination system. This significantly improves performance and provides a smoother browsing experience, especially for environments with hundreds or thousands of clusters.
*   **Optimized Row Display:** The height of individual rows in the cluster list has been reduced, allowing more clusters to be visible on the screen at once. Additionally, expandable content within a row (like worker details or ticket labels) now has a maximum height with internal scrolling, ensuring consistent row sizes and smooth virtual scrolling performance.

### Real-Time Updates for Projects

The dashboard is becoming more dynamic with the introduction of real-time updates:

*   **Instant Project Changes:** Modifications to projects, such as creation or deletion, are now reflected instantly in the project list and interface without requiring a page reload. This is achieved through WebSocket communication.
*   **Foundation for Future Reactivity:** This enhancement for projects lays the groundwork for bringing real-time updates to other resources within the dashboard, such as Seeds and the Garden resource, in future releases.

### Other Notable Enhancements

*   **Kubeconfig Update:** The kubeconfig generated for garden cluster access via the "Account" page now uses the `--oidc-pkce-method` flag, replacing the deprecated `--oidc-use-pkce` flag. Users encountering deprecation messages should redownload their kubeconfig.
*   **Notification Behavior:** Kubernetes warning notifications are now automatically dismissed after 5 seconds. However, all notifications will remain visible as long as the mouse cursor is hovering over them, giving users more time to read important messages.
*   **API Server URL Path:** Support has been added for kubeconfigs that include a path in the API server URL.

These updates in Gardener Dashboard 1.80 collectively enhance usability, provide better control over credentials, and improve performance for large-scale operations.

For a comprehensive list of all features, bug fixes, and contributor acknowledgments, please refer to the [official release notes](https://github.com/gardener/dashboard/releases/tag/1.80.0).
You can also view the segment of the community call discussing these dashboard updates [here](https://youtu.be/ZwurVm1IJ7o?t=1793).
