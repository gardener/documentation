---
github_repo: 'https://github.com/stackitcloud/gardener-extension-provider-stackit'
github_subdir: docs/development
params:
  github_branch: main
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/infrastructure-extensions/gardener-extension-provider-stackit/releases.md
  to: releases.md
persona: Developers
title: Releases
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
   https://github.com/stackitcloud/gardener-extension-provider-stackit/blob/main/docs/development/releases.md
-->


# Release Procedure

# Table of Contents

- [Overview](#overview)
- [General Information](#general-information)
- [Patch Version (Hotfix)](#patch-version-hotfix)
- [Automated Release Process (Primary Method)](#automated-release-process-primary-method)
- [Manual Release Process (Fallback Method)](#manual-release-process-fallback-method)

## Overview

This document outlines the standard procedure for creating new releases of the STACKIT gardener-extension-provider-stackit.

## General Information

- **Branching Strategy:** All major and minor releases are created from `main` branches. Patch releases are created from `release-v*` branches (see [Patch Release (Hotfix)](#patch-version-hotfix) for more details).
- **Versioning:** Versioning follows official [SemVer 2.0](https://semver.org/)
- **CI/CD System:** All release and image builds are managed by our **Prow CI** infrastructure.

## Patch Version (Hotfix)

A Hotfix is required when a critical bug or security vulnerability is discovered in a stable version that is currently in use, but the main branch has already moved forward with breaking changes or features.

We follow a "Fix-First-in-Main" policy. All fixes must be merged into the main branch before being cherry-picked into a specific release branch.

For example:

```mermaid
gitGraph:
    commit id: "v1.0.0" tag: "v1.0.0"
    branch release-v1.0
    checkout main
    commit id: "Feature A"
    commit id: "Breaking Change"
    commit id: "Bugfix"
    checkout release-v1.0
    cherry-pick id: "Bugfix"
    commit id: "v1.0.1" tag: "v1.0.1"
```

> As shown in the example, the `Critical Bugfix` cannot be released directly from main because that branch already contains unreleased work (like `Feature A` or the `Breaking Change`) that shouldn't be shipped alongside a patch. Isolating the fix on `release-v1.0` ensures we release only the `Critical Bugfix` in the patch release (`v1.0.1`).

1. Create a Pull Request with the bug fix targeting the main branch.
1. Review and merge the `main` branch Pull Request.
1. If a branch for your specific minor version (e.g., `release-v1.0`) doesn't exist yet, create it from the corresponding tag:
   ```bash
   git fetch --all --tags
   git checkout -b release-vx.y vx.y.0
   git push -u origin release-vx.y
   ```
1. Use `/cherry-pick release-vx.y` command in the `main` branch Pull Request. The prow will open the cherry-pick Pull Request against `release-vx.y` branch automatically.
1. Once the cherry-pick PR has been reviewed, approved, and merged, you can promote the changes by creating a new patch release of gardener-extension-provider-stackit.
   For this, publish the draft release on the `release-vx.y` branch for the next patch version (`vx.y.z`) (see [Automated Release Process (Primary Method)](#automated-release-process-primary-method)).

## Automated Release Process (Primary Method)

The primary release method is automated using a tool called `release-tool`. This process is designed to be straightforward and require minimal manual intervention.

1. **Draft Creation:** On every successful merge (post-submit) to the `main` branch and `release-v*` branchs, a Prow job automatically runs the `release-tool`. This tool creates a new draft release on GitHub or updates the existing one with a changelog generated from recent commits.
1. **Publishing the Release:** When the draft is ready, navigate to the repository's "Releases" page on GitHub. Locate the draft, review the changelog, replace the placeholder with your GitHub handle and publish it by clicking the "Publish release" button.

Publishing the release automatically creates the corresponding Git tag (e.g., `v1.3.1`), which triggers a separate Prow job to build the final container images and attach them to the GitHub release.

## Manual Release Process (Fallback Method)

If the `release-tool` or its associated Prow job fails, use the GitHub web UI to create and publish a release:

1. Go to the repository on GitHub and click **Releases** on the right side, then click **Draft new release**.

1. Open the **Select tag** dropdown and choose **Create new tag** at the bottom. Enter the new tag name (for example `v2.1.0`) and pick the target branch/commit, then confirm.

1. Click **Generate release notes** to let GitHub populate the changelog.

1. In the release description, add a line `Released by @<your github handle>` to indicate the publisher.

1. Click **Publish release** to create the release.

Publishing a new release triggers the same Prow release job that builds and publishes the final container images.
