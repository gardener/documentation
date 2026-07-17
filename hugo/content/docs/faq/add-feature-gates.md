---
github_repo: 'https://github.com/gardener/documentation'
github_subdir: hugo/content/docs/faq
params:
  github_branch: master
path_base_for_github_subdir:
  from: content/docs/faq/add-feature-gates.md
  to: add-feature-gates.md
title: "How do you add K8S feature gates to a shoot cluster?"
prev: false
next: false
local: true
---

# How do you add K8S feature gates to a shoot cluster?

## Adding a Feature Gate

In order to add a feature gate, add it as `enabled` to the appropriate section of the `shoot.yaml` file:

```yaml
SectionName:
    featureGates:
        SomeKubernetesFeature: true
```

The available sections are `kubelet`, `kubernetes`, `kubeAPIServer`, `kubeControllerManager`, `kubeScheduler`, and `kubeProxy`.

For more detals, see [the example shoot.yaml file](https://github.com/gardener/gardener/blob/master/example/90-shoot.yaml).

## What is the expected downtime when updating the `shoot.yaml`?

No downtime is expected after executing a `shoot.yaml` update.
