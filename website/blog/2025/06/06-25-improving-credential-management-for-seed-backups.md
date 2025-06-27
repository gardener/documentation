---
title: "Improving Credential Management for Seed Backups"
linkTitle: "Improving Credential Management for Seed Backups"
newsSubtitle: June 25, 2025
publishdate: 2025-06-25
authors:
- avatar: https://avatars.githubusercontent.com/dimityrmirchev
  email: dimitar.mirchev@sap.com
  login: dimityrmirchev
  name: Dimitar Mirchev
- avatar: https://avatars.githubusercontent.com/vpnachev
  email: vladimir.nachev@sap.com
  login: vpnachev
  name: Vladimir Nachev
aliases: ["/blog/2025/06/25/improving-credential-management-for-seed-backups"]
---

Gardener has introduced a new feature gate, `DoNotCopyBackupCredentials`, to enhance the security and clarity of how backup credentials for managed seeds are handled. This change moves away from an implicit credential-copying mechanism to a more explicit and secure configuration practice.

### The Old Behavior and Its Drawbacks

Previously, when setting up a managed seed, the controller would automatically copy the shoot's infrastructure credentials to serve as the seed's backup credentials if a backup secret was not explicitly provided. While this offered some convenience, it had several disadvantages:

*   **Promoted Poor Security Practices:** It encouraged the use of the same credentials for both shoot infrastructure and seed backups, violating the principle of least privilege and credential segregation.
*   **Caused Confusion:** The implicit copying of secrets could be confusing for operators, as the source of the backup credential was not immediately obvious from the configuration.
*   **Inconsistent with Modern Credentials:** The mechanism worked for `Secret`-based credentials but was not compatible with `WorkloadIdentity`, which cannot be simply copied.

### The New Approach: Explicit Credential Management

The new `DoNotCopyBackupCredentials` feature gate, when enabled in `gardenlet`, disables this automatic copying behavior. With the gate active, operators are now required to explicitly create and reference a secret for the seed backup.

If `seed.spec.backup.credentialsRef` points to a secret that does not exist, the reconciliation process will fail with an error, ensuring that operators consciously provide a dedicated credential for backups. This change promotes the best practice of using separate, segregated credentials for infrastructure and backups, significantly improving the security posture of the landscape.

### For Operators: What You Need to Do

When you enable the `DoNotCopyBackupCredentials` feature gate, you must ensure that any `Seed` you configure has a pre-existing secret for its backup.

For setups where credentials were previously copied, Gardener helps with the transition. The controller will stop managing the lifecycle of these copied secrets. To help operators identify them for cleanup, these secrets will be labeled with `secret.backup.gardener.cloud/status=previously-managed`. You can then review these secrets and manage them accordingly.

This enhancement is a step towards more robust, secure, and transparent operations in Gardener, giving operators clearer control over credential management.

### Further Reading

*   **[GitHub Pull Request #12168](https://github.com/gardener/gardener/pull/12168)**
*   **[Recording of the talk](https://youtu.be/kcXSyloteSs)**