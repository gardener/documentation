---
category: Networking
description: How to change the alerting on expiring certificates
github_repo: 'https://github.com/gardener/gardener-extension-shoot-cert-service'
github_subdir: docs/usage
level: beginner
params:
  github_branch: master
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/others/gardener-extension-shoot-cert-service/alerting.md
  to: alerting.md
persona: Users
publishdate: '2023-07-20'
scope: operator
tags:
  - task
title: Changing alerting settings
prev: false
next: false
managed: true
---

# Changing alerting settings

Certificates are normally renewed automatically 30 days before they expire.
As a second line of defense, there is an alerting in Prometheus activated if the certificate is a few days
before expiration. By default, the alert is triggered 15 days before expiration.

You can configure the days in the `providerConfig` of the extension.
Setting it to 0 disables the alerting.

In this example, the days are changed to 3 days before expiration.

```yaml
kind: Shoot
...
spec:
  extensions:
  - type: shoot-cert-service
    providerConfig:
      apiVersion: service.cert.extensions.gardener.cloud/v1alpha1
      kind: CertConfig
      alerting:
        certExpirationAlertDays: 3
```
