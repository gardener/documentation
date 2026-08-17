---
github_repo: 'https://github.com/ironcore-dev/gardener-extension-provider-ironcore'
github_subdir: docs/development
params:
  github_branch: main
path_base_for_github_subdir:
  from: >-
    content/contribute/extensions/infrastructure-extensions/gardener-extension-provider-ironcore/local-setup.md
  to: local-setup.md
persona: Developers
title: Local Setup
prev: false
next: false
managed: true
---

# Local Setup

### admission-ironcore

`admission-ironcore` is an admission webhook server which is responsible for the validation of the cloud provider (ironcore in this case) specific fields and resources. The Gardener API server is cloud provider agnostic and it wouldn't be able to perform similar validation.

Follow the steps below to run the admission webhook server locally.

1. Start the Gardener API server.
   
   For details, check the Gardener [local setup](/contribute/developer-starter-kit/local_setup/).

1. Start the webhook server
   
   Make sure that the `KUBECONFIG` environment variable is pointing to the local garden cluster.
   
   ```bash
   make start-admission
   ```

1. Setup the `ValidatingWebhookConfiguration`.
   
   `hack/dev-setup-admission-ironcore.sh` will configure the webhook Service which will allow the kube-apiserver of your local cluster to reach the webhook server. It will also apply the `ValidatingWebhookConfiguration` manifest.
   
   ```bash
   ./hack/dev-setup-admission-ironcore.sh
   ```

You are now ready to experiment with the `admission-ironcore` webhook server locally.
