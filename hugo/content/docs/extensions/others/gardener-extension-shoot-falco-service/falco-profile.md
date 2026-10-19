---
github_repo: 'https://github.com/gardener/gardener-extension-shoot-falco-service'
github_subdir: docs
params:
  github_branch: main
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/others/gardener-extension-shoot-falco-service/falco-profile.md
  to: falco-profile.md
title: Falco Profile
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
   https://github.com/gardener/gardener-extension-shoot-falco-service/blob/main/docs/falco-profile.md
-->


# Falco Profile

Similar to the cloud profile, the Falco profile resource in the Garden cluster lists available Falco versions and supporting components such as Falcosidekick. This resource helps manage available versions for users and the Gardener Falco extension.

```bash
$ kubectl get falcoprofile falco -o yaml
apiVersion: falco.gardener.cloud/v1alpha1
kind: FalcoProfile
metadata:
  name: falco
spec:
  images:
    falco:
    - repository: falcosecurity/falco
      tag: 0.40.0
      version: 0.40.0
    - repository: falcosecurity/falco
      tag: 0.41.3
      version: 0.41.3
    - repository: falcosecurity/falco
      tag: 0.42.0
      version: 0.42.0
    falcosidekick:
    - repository: falcosecurity/falcosidekick
      tag: 2.31.1
      version: 2.31.1
    - repository: falcosecurity/falcosidekick
      tag: 2.32.0
      version: 2.32.0
  versions:
    falco:
    - classification: supported
      rulesVersion: 3.2.0
      version: 0.40.0
    - classification: supported
      rulesVersion: 4.0.0
      version: 0.41.3
    - classification: supported
      rulesVersion: 4.0.0
      version: 0.42.0
    falcosidekick:
    - classification: deprecated
      version: 2.31.1
    - classification: supported
      version: 2.32.0
```

Any non-expired Falco version listed above can be configured in the shoot manifest. If no version is specified in the shoot manifest, the latest Falco version tagged as "supported" will be used by default.

The `falcosidekick` section is used internally by the extension.
