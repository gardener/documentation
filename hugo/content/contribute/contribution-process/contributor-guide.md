---
aliases:
  - /docs/contribute/
  - /docs/contribute/code/
persona: Developers
title: Contributor Guide
weight: 10
prev: false
next: false
---
<!-- BANNER:LOCAL -->
<!--
   █▀█ █▄▀
   █ █ █▀▄
   ▀▀▀ ▀ ▀

   ┌────────────────────────────────────────────────┐
   │  LOCAL FILE — maintained in gardener/            │
   │  documentation.                                  │
   │                                                  │
   │  Go ahead and edit this file directly.           │
   │  Changes here are the source of truth.           │
   └────────────────────────────────────────────────┘
-->


# Contributor Guide

Thank you for your interest in contributing to Gardener. This page provides an overview of how to get started, what to expect from the contribution process, and how to connect with the community.

## Prerequisites

Before contributing to Gardener, please review and complete the following requirements.

### Code of Conduct

All members of the Gardener community must abide by the [Linux Foundation Europe's Code of Conduct](https://linuxfoundation.eu/policies/code-of-conduct).
Only by respecting each other can we develop a productive, collaborative community.
Please report abusive, harassing, or unacceptable behavior to [gardener-tsc@lists.neonephos.org](mailto:gardener-tsc@lists.neonephos.org) and/or a Gardener project maintainer.

### Developer Certificate of Origin

Contributors sign off that they adhere to the [Developer Certificate of Origin (DCO)](https://developercertificate.org/) when making contributions to the project.
This happens by adding a `Signed-off-by` line to commit messages.

<details>
<summary>Signing off on commits</summary>

A signed-off commit message looks like this:
```text
This is my commit message

Signed-off-by: Random J Developer <random@developer.example.org>
```

Make sure to configure your identity in the Git config:

```shell
git config --global user.name "Random J Developer"
git config --global user.email "random@developer.example.org"
```

In your `~/.gitconfig` this looks like this:

```text
[user]
  name = Random J Developer
  email = random@developer.example.org
```

You can sign off on commits by adding `-s` to the `git commit` command:

```shell
git commit -s -m 'This is my commit message'
```

If you want to sign off on every commit by default, you could add a `prepare-commit-msg` Git hook:

1. If not already present create a folder for your Git hooks. You can choose any path, e.g. `mkdir ~/git-hooks`
2. Configure the hooks path in your `~/.gitconfig`
```text
[core]
hooksPath = ~/git-hooks
```
3. Create the file `~/git-hooks/prepare-commit-msg` and add:
```shell
#!/bin/sh
SOB=$(git var GIT_COMMITTER_IDENT | sed -n 's/^\(.*>\).*$/Signed-off-by: \1/p')
git interpret-trailers --in-place --trailer "$SOB" "$1"
```

</details>

### License

Your contributions to Gardener must be licensed properly:

* Code contributions must be licensed under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0)
* Documentation contributions must be licensed under the [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/legalcode)

## Contributing

Gardener uses GitHub to manage and review pull requests.

* If you are a new contributor, see [Steps to Contribute](#steps-to-contribute).
* For trivial fixes or improvements, go ahead and create a pull request.
* For larger, more complex changes, first discuss your ideas
  on our [mailing list](https://groups.google.com/forum/?fromgroups#!forum/gardener) to avoid unnecessary work and to give you and us a good deal
  of inspiration.
* Relevant coding style guidelines are the [Go Code Review
  Comments](https://github.com/golang/go/wiki/CodeReviewComments)
  and the *Formatting and style* section of Peter Bourgon's [Go: Best Practices for Production Environments](http://peter.bourgon.org/go-in-production/#formatting-and-style).

### Steps to Contribute

If you'd like to work on an issue, please claim it first by commenting on the corresponding GitHub issue. This prevents multiple contributors from working on the same issue simultaneously.

If you have questions about an issue, leave a comment in the issue, and one of the maintainers will help you.

Please follow the [Pull Request Checklist](#pull-request-checklist) to ensure a smooth review process.

### Pull Request Checklist

* Branch from `master`. Before submitting your pull request, rebase your changes onto the current `master` branch.
* Keep commits small and self-contained. Each commit should compile and pass all tests independently.
* Test your changes thoroughly before you commit them. Preferably, automate your testing with [unit / integration tests](/contribute/developer-starter-kit/testing/). If tested manually, describe the test scope in the PR description (e.g., "Test passed: Upgrade K8s version from 1.14.5 to 1.15.2 on AWS, Azure, GCP, Alicloud, OpenStack.").
* Write a clear and detailed [Pull Request description](/contribute/documentation/pr-guidelines/) to help reviewers understand your changes.
* Create *Work In Progress [WIP]* pull requests only if you need a clarification or an explicit review before continuing your work.
* If your patch is not getting reviewed or you need a specific person to review it, you can @mention a reviewer or request a review via our [mailing list](https://groups.google.com/forum/?fromgroups#!forum/gardener).
* If you add new features, make sure that they are documented in the [Gardener documentation](https://github.com/gardener/documentation).
* After a review:
  * If a review requires you to change your commit(s), please test the changes again.
  * Address each reviewer’s feedback in a separate commit. Do not mix the feedback from multiple reviews in a single commit.
  * Mark resolved comments as *resolved* in GitHub.
  * Add a comment to notify reviewers when updates are ready for another review.

### Contributing Bigger Changes

If you want to contribute bigger changes to Gardener, such as when introducing new API resources and their corresponding controllers, or implementing an approved [Gardener Enhancement Proposal](https://github.com/gardener/gardener/tree/master/docs/proposals), follow the guidelines in [Contributing Bigger Changes](/contribute/contribution-process/contributing-bigger-changes/).

### Adding Already Existing Documentation

If you want to add documentation that already exists on GitHub to the website, you should update the central manifest instead of duplicating the content. To find out how to do that, see [Adding Already Existing Documentation](/contribute/documentation/adding-existing-documentation/).

## Issues and Planning

We use GitHub issues to track bugs and enhancement requests. When opening an issue, provide enough details for others to understand and reproduce the problem. You may use the provided issue template, but it is not required.

## Community

### Slack

We use the [Gardener Project workspace](https://gardener-cloud.slack.com) for public communication related to the Gardener project.

### Mailing List

[gardener@googlegroups.com](https://groups.google.com/forum/?fromgroups#!forum/gardener)

The mailing list is hosted on Google Groups. To receive emails, [join the group](https://support.google.com/groups/answer/1067205) as you would any other Google Group.
