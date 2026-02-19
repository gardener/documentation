---
title: "Introducing Automated Credential Rotation"
linkTitle: "Introducing Automated Credential Rotation"
newsSubtitle: January 28, 2026
publishdate: 2026-01-28
authors:
- avatar: https://avatars.githubusercontent.com/AleksandarSavchev
  login: AleksandarSavchev
  name: Aleksandar Savchev
aliases: ["/blog/2026/01/28/introducing-automated-credential-rotation"]
---

Maintaining a strong security posture is crucial for any Kubernetes environment. A key aspect of this is the regular rotation of credentials. To simplify this essential task and reduce operational overhead, Gardener now supports the automatic rotation of several critical credentials during a `Shoot` cluster's maintenance window.

### Enhanced Security, Effortlessly

Previously, users were responsible for manually triggering credential rotations. With this new enhancement, you can now configure your `Shoot` clusters to automatically handle the rotation of:

*   **SSH keypair** for worker nodes
*   **Observability passwords**
*   **etcd encryption key**

This ensures that credentials are rotated consistently and on schedule, bolstering the security of your clusters without requiring manual intervention.

### How to Enable Automatic Rotation

You can opt-in to this feature by defining the desired rotation schedule in the `Shoot` manifest under the `.spec.maintenance.autoRotation` field.

During the daily maintenance window, the `gardener-controller-manager` will check if the configured rotation period has passed since the last successful rotation for a given credential. If it has, a new rotation will be initiated automatically.

Here is an example of how to configure it:

```yaml
spec:
  maintenance:
    autoRotation:
      credentials:
        # Set this field to enable automatic rotation for observability credentials
        observability:
          rotationPeriod: 168h # Rotates every 7 days
        # Set this field to enable automatic rotation for the SSH keypair
        sshKeypair:
          rotationPeriod: 168h # Rotates every 7 days
        # Set this field to enable automatic rotation for the etcd encryption key
        etcdEncryptionKey:
          rotationPeriod: 168h # Rotates every 7 days
```

If you specify a credential type (like `observability: {}`) but omit the `rotationPeriod`, it will default to `168h` (7 days). The rotation period can be configured to be between 30 minutes and 90 days.

To disable automatic rotation for a specific credential, you can set its `rotationPeriod` to `0`. Manual rotation via annotations remains available if you need to trigger a rotation outside of the scheduled maintenance window.

This new capability makes it easier than ever to follow security best practices, helping you keep your Gardener-managed Kubernetes clusters secure and up-to-date.

### Further Reading

*   [Recording of "Automatic Credentials Rotation During Shoot Maintenance"](https://youtu.be/2rOOsQWLO_w)
*   [GitHub Pull Request: Add option to automatically rotate credentials in the Maintenance window](https://github.com/gardener/gardener/pull/13493)