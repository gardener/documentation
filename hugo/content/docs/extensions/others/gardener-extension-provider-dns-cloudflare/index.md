---
description: Gardener extension controller for Cloudflare as a DNS provider.
github_repo: 'https://github.com/schrodit/gardener-extension-provider-dns-cloudflare'
github_subdir: .
params:
  github_branch: main
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/others/gardener-extension-provider-dns-cloudflare/_index.md
  to: README.md
title: Cloudflare
weight: 45
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
   https://github.com/schrodit/gardener-extension-provider-dns-cloudflare/blob/main/./README.md
-->


# [Gardener DNS Extension for Cloudflare](https://gardener.cloud)

[![Build](https://github.com/schrodit/gardener-extension-provider-dns-cloudflare/actions/workflows/build.yaml/badge.svg)](https://github.com/schrodit/gardener-extension-provider-dns-cloudflare/actions/workflows/build.yaml)

Project Gardener implements the automated management and operation of [Kubernetes](https://kubernetes.io/) clusters as a service.
Its main principle is to leverage Kubernetes concepts for all of its tasks.

Gardener supports external controllers for provider-specific behavior, as described in [GEP-1](https://github.com/gardener/gardener/blob/master/docs/proposals/01-extensibility.md).

This controller implements Gardener's extension contract for the Cloudflare provider.

An example for a `ControllerRegistration` resource that can be used to register this controller to Gardener can be found [here](https://github.com/schrodit/gardener-extension-provider-dns-cloudflare/blob/main/example/controller-registration.yaml).

Please find more information regarding the extensibility concepts and a detailed proposal [here](https://github.com/gardener/gardener/blob/master/docs/proposals/01-extensibility.md).

## Supported Kubernetes versions

Compatibility follows the [Gardener dependency in `go.mod`](https://github.com/schrodit/gardener-extension-provider-dns-cloudflare/blob/main/go.mod). See [Gardener's supported shoot Kubernetes versions](https://gardener.cloud/docs/gardener/shoot-operations/supported_k8s_versions/) for the current list. The local test target and API reference generation both use Kubernetes `1.37`; these settings do not define the full range of supported shoot versions.

---

## How to start using or developing this extension controller locally

Run `make start` to start the controller locally.

Static code checks and tests can be executed by running `make verify`. We are using Go modules for Golang package dependency management and [Ginkgo](https://github.com/onsi/ginkgo)/[Gomega](https://github.com/onsi/gomega) for testing.

## Releases

[Release Please](https://github.com/googleapis/release-please-action) uses its Go strategy to maintain a release pull request on `main`, updating `CHANGELOG.md` and `.release-please-manifest.json` from Conventional Commits. Use `fix:` for bug fixes, `feat:` for features, and `!` or a `BREAKING CHANGE:` footer for breaking changes. Before version 1.0, breaking changes bump the minor version.

Merge the release pull request to create the next `v*` tag and GitHub release. The release workflow checks out that tag, builds and uploads binaries with GoReleaser while preserving the Release Please notes, and publishes the versioned container image and Helm chart to GHCR. Separately, the build workflow publishes a snapshot image and chart after tests pass on pushes to `main`.

Enable **Allow GitHub Actions to create and approve pull requests** in the repository's Actions settings. To run CI automatically on release pull requests, configure the `RELEASE_PLEASE_TOKEN` Actions secret with a token that can write repository contents, issues, and pull requests. Without that secret, the workflow uses `GITHUB_TOKEN`; GitHub does not automatically trigger CI for pull requests it creates, so release PR checks must be triggered manually.

## Feedback and Support

Feedback and contributions are always welcome. Please report bugs or suggestions as [GitHub issues](https://github.com/schrodit/gardener-extension-provider-dns-cloudflare/issues) or join our [Slack channel #gardener](https://kubernetes.slack.com/messages/gardener) (please invite yourself to the Kubernetes workspace [here](http://slack.k8s.io)).

## Learn more!

Please find further resources about out project here:

* [Our landing page gardener.cloud](https://gardener.cloud/)
* ["Gardener, the Kubernetes Botanist" blog on kubernetes.io](https://kubernetes.io/blog/2018/05/17/gardener/)
* ["Gardener Project Update" blog on kubernetes.io](https://kubernetes.io/blog/2019/12/02/gardener-project-update/)
* [GEP-1 (Gardener Enhancement Proposal) on extensibility](https://github.com/gardener/gardener/blob/master/docs/proposals/01-extensibility.md)
* [GEP-4 (New `core.gardener.cloud/v1alpha1` API)](https://github.com/gardener/gardener/blob/master/docs/proposals/04-new-core-gardener-cloud-apis.md)
* [Extensibility API documentation](https://github.com/gardener/gardener/tree/master/docs/extensions)
* [Gardener Extensions Golang library](https://godoc.org/github.com/gardener/gardener/extensions/pkg)
* [Gardener API Reference](https://gardener.cloud/api-reference/)
