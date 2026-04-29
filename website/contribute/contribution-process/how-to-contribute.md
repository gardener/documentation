---
title: How to Contribute
persona: Developers
weight: 5
---

Thank you for your interest in contributing to Gardener. This page provides an overview of how to get started, what to expect from the contribution process, and how to connect with the community.

## Prerequisites

Before contributing to Gardener, please review and complete the following requirements.

### Code of Conduct

All members of the Gardener community must abide by the
[Contributor Covenant](https://www.contributor-covenant.org/version/2/1/code_of_conduct/).
Only by respecting each other can we develop a productive, collaborative community.
Please report abusive, harassing, or unacceptable behavior to [gardener.opensource@sap.com](mailto:gardener.opensource@sap.com) and/or a Gardener project maintainer.

### Developer Certificate of Origin

Contributors must accept a Developer Certificate of Origin (DCO) before submitting their first pull request. This happens in an automated fashion during the submission process. We use [the standard DCO text of the Linux Foundation](https://developercertificate.org/).

### License

Your contributions to Gardener must be licensed properly:

* Code contributions must be licensed under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0)
* Documentation contributions must be licensed under the [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/legalcode)
* You need to sign the Contributor License Agreement. We are using *[CLA assistant](https://cla-assistant.io/)*, which provides a click-through workflow for accepting the CLA. For company contributors, the company also needs to sign a corporate license agreement.

## Contributing

Gardener uses GitHub to manage and review pull requests.

* If you are a new contributor, see [Steps to Contribute](#steps-to-contribute).
* For trivial fixes or improvements, go ahead and create a pull request.
* For larger, more complex changes, first discuss your ideas
  on our [mailing list](https://groups.google.com/forum/?fromgroups#!forum/gardener) to avoid unnecessary work and to give you and us a good deal
  of inspiration.
* Relevant coding style guidelines are the [Go Code Review
  Comments](https://github.com/golang/go/wiki/CodeReviewComments)
  and the _Formatting and style_ section of Peter Bourgon's [Go: Best Practices for Production Environments](http://peter.bourgon.org/go-in-production/#formatting-and-style).

### Steps to Contribute

If you'd like to work on an issue, please claim it first by commenting on the corresponding GitHub issue. This prevents multiple contributors from working on the same issue simultaneously.

If you have questions about an issue, leave a comment in the issue, and one of the maintainers will help you.

Please follow the [Pull Request Checklist](#pull-request-checklist) to ensure a smooth review process.

### Pull Request Checklist

* Branch from `master`. Before submitting your pull request, rebase your changes onto the current `master` branch.
* Keep commits small and self-contained. Each commit should compile and pass all tests independently.
* Test your changes thoroughly before you commit them. Preferably, automate your testing with [unit / integration tests](https://github.com/gardener/gardener/blob/master/docs/development/testing.md). If tested manually, describe the test scope in the PR description (e.g., "Test passed: Upgrade K8s version from 1.14.5 to 1.15.2 on AWS, Azure, GCP, Alicloud, OpenStack.").
* Write a clear and detailed [Pull Request description](../documentation/pr-guidelines.md) to help reviewers understand your changes.
* Create *Work In Progress [WIP]* pull requests only if you need a clarification or an explicit review before continuing your work.
* If your patch is not getting reviewed or you need a specific person to review it, you can @mention a reviewer or request a review via our [mailing list](https://groups.google.com/forum/?fromgroups#!forum/gardener).
* If you add new features, make sure that they are documented in the [Gardener documentation](https://github.com/gardener/documentation).
* After a review:
  * If a review requires you to change your commit(s), please test the changes again.
  * Address each reviewer’s feedback in a separate commit. Do not mix the feedback from multiple reviews in a single commit.
  * Mark resolved comments as *resolved* in GitHub.
  * Add a comment to notify reviewers when updates are ready for another review.

### Contributing Bigger Changes

If you want to contribute bigger changes to Gardener, such as when introducing new API resources and their corresponding controllers, or implementing an approved [Gardener Enhancement Proposal](https://github.com/gardener/gardener/tree/master/docs/proposals), follow the guidelines in [Contributing Bigger Changes](./contributing-bigger-changes.md).

### Adding Already Existing Documentation

If you want to add documentation that already exists on GitHub to the website, you should update the central manifest instead of duplicating the content. To find out how to do that, see [Adding Already Existing Documentation](../documentation/adding-existing-documentation.md).

## Issues and Planning

We use GitHub issues to track bugs and enhancement requests. When opening an issue, provide enough details for others to understand and reproduce the problem. You may use the provided issue template, but it is not required.

## Community

### Slack

We use the [Gardener Project workspace](https://gardener-cloud.slack.com) for public communication related to the Gardener project.

### Mailing List

[gardener@googlegroups.com](https://groups.google.com/forum/?fromgroups#!forum/gardener)

The mailing list is hosted on Google Groups. To receive emails, [join the group](https://support.google.com/groups/answer/1067205) as you would any other Google Group.
