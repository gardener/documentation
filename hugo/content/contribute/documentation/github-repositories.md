---
aliases:
  - /docs/contribute/documentation/github-repositories/
github_repo: 'https://github.com/gardener/documentation'
github_subdir: hugo/content/contribute/documentation
params:
  github_branch: master
path_base_for_github_subdir:
  from: content/contribute/documentation/github-repositories.md
  to: github-repositories.md
title: "GitHub Repositories"
prev: false
next: false
local: true
---

# GitHub Repositories

All repositories in the [gardener](https://github.com/gardener) GitHub organization are managed through [Peribolos](https://docs.prow.k8s.io/docs/components/cli-tools/peribolos/), a tool from the Kubernetes project that reconciles GitHub organization settings — including repositories, teams, and memberships — against a declarative configuration file.

## How Repository Management Works

The source of truth for all repositories and their settings is the [`org.yaml`](https://github.com/gardener/org/blob/main/config/org.yaml) file in the `gardener/org` repository. A Peribolos job runs periodically and reconciles the actual state of the GitHub organization against the configuration declared in that file.

This means:

- **All repository changes must be made via `org.yaml`** — the Peribolos job will overwrite any manual changes made directly in GitHub.
- Changes such as creating a repository, updating its description, adjusting team permissions, or toggling settings must be submitted as a pull request to `gardener/org`.

## Requesting a New Repository

To request the creation of a new repository in the Gardener organization:

1. [Open an issue](https://github.com/gardener/org/issues/new?template=repo_create.yaml) in the `gardener/org` repository using the provided template.
2. Fill in the required details such as the repository name, description, and purpose.
3. The org owners will review the request and, once approved, add the repository to `org.yaml` and submit the corresponding pull request.

## Making Changes to Existing Repositories

To change settings of an existing repository (e.g., update its description, visibility, or team access):

1. Open a pull request against [gardener/org](https://github.com/gardener/org) that modifies the relevant entry in `config/org.yaml`.
2. Describe the reason for the change in the pull request description.
3. Once the pull request is merged, the Peribolos job picks up the change and applies it to the GitHub organization.
