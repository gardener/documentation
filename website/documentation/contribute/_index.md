---
title: Contribute
description: Contributors guides for code and documentation
sidebar: true
menu: sln
persona: Developers
weight: 110
---

# Contributing to Gardener

## Welcome

Welcome to the Contributor section of Gardener. Here you can learn how it is possible for you to contribute your ideas and expertise to the project and have it grow even more.

## Prerequisites

Before you begin contributing to Gardener, there are a couple of things you should become familiar with and complete first.

### Code of Conduct

All members of the Gardener community must abide by the
[Contributor Covenant](https://www.contributor-covenant.org/version/2/1/code_of_conduct/).
Only by respecting each other can we develop a productive, collaborative community.
Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting [gardener.opensource@sap.com](mailto:gardener.opensource@sap.com) and/or a Gardener project maintainer.

### Developer Certificate of Origin

Due to legal reasons, contributors will be asked to accept a Developer Certificate of Origin (DCO) before they submit the first pull request to this projects, this happens in an automated fashion during the submission process. We use [the standard DCO text of the Linux Foundation](https://developercertificate.org/).

### License

Your contributions to Gardener must be licensed properly:

* Code contributions must be licensed under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0)
* Documentation contributions must be licensed under the [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/legalcode)

## Contributing

Gardener uses GitHub to manage reviews of pull requests.

* If you are a new contributor see: [Steps to Contribute](#steps-to-contribute)

* If you have a trivial fix or improvement, go ahead and create a pull request.

* If you plan to do something more involved, first discuss your ideas
  on our [mailing list](https://groups.google.com/forum/?fromgroups#!forum/gardener).
  This will avoid unnecessary work and surely give you and us a good deal
  of inspiration.

* Relevant coding style guidelines are the [Go Code Review
  Comments](https://github.com/golang/go/wiki/CodeReviewComments)
  and the _Formatting and style_ section of Peter Bourgon's [Go: Best Practices for Production Environments](http://peter.bourgon.org/go-in-production/#formatting-and-style).

### Steps to Contribute

Should you wish to work on an issue, please claim it first by commenting on the GitHub issue that you want to work on it. This is to prevent duplicated efforts from contributors on the same issue.

If you have questions about one of the issues, with or without the tag, please comment on them and one of the maintainers will clarify it.

We kindly ask you to follow the [Pull Request Checklist](#pull-request-checklist) to ensure reviews can happen accordingly.

### Pull Request Checklist

* Branch from the master branch and, if needed, rebase to the current master branch before submitting your pull request. If it doesn't merge cleanly with master you may be asked to rebase your changes.

* Commits should be as small as possible, while ensuring that each commit is correct independently (i.e., each commit should compile and pass tests).

* Test your changes as thoroughly as possible before your commit them. Preferably, automate your testing with [unit / integration tests](https://github.com/gardener/gardener/blob/master/docs/development/testing.md). If tested manually, provide information about the test scope in the PR description (e.g., “Test passed: Upgrade K8s version from 1.14.5 to 1.15.2 on AWS, Azure, GCP, Alicloud, Openstack.”).

* When creating the PR, follow the [Pull Request Creation Guidelines](./documentation/pr-guidelines.md) to help out the reviewers understand your changes.

* Create *Work In Progress [WIP]* pull requests only if you need a clarification or an explicit review before you can continue your work item.

* If your patch is not getting reviewed or you need a specific person to review it, you can @-reply a reviewer asking for a review in the pull request or a comment, or you can ask for a review on our [mailing list](https://groups.google.com/forum/?fromgroups#!forum/gardener).

* If you add new features, make sure that they are documented in the [Gardener documentation](https://github.com/gardener/documentation).

* If your changes are relevant for operators, consider to update the [ops toolbelt image](https://github.com/gardener/ops-toolbelt).

* Post review:
  * If a review requires you to change your commit(s), please test the changes again.
  * Address the PR review feedback from a reviewer in a separate commit to make it easier for the reviewer to check how their feedback has been addressed. Do not mix PR review feedback from multiple reviews in a single commit. Create a separate commit per a review.
  * Set respective comments in your GitHub review to resolved.
  * Create a general PR comment to notify the reviewers that your amendments are ready for another round of review.
  
### Contributing Bigger Changes

If you want to contribute bigger changes to Gardener, such as when introducing new API resources and their corresponding controllers, or implementing an approved [Gardener Enhancement Proposal](https://github.com/gardener/gardener/tree/master/docs/proposals), follow the guidelines outlined in [Contributing Bigger Changes](./code/contributing-bigger-changes.md).

### Adding Already Existing Documentation

If you want to add documentation that already exists on GitHub to the website, you should update the central manifest instead of duplicating the content. To find out how to do that, see [Adding Already Existing Documentation](./documentation/adding-existing-documentation.md).

## Issues and Planning

We use GitHub issues to track bugs and enhancement requests. Please provide as much context as possible when you open an issue. The information you provide must be comprehensive enough to reproduce that issue for the assignee. Therefore, contributors may use but aren't restricted to the issue template provided by the Gardener maintainers.

## Community

### Slack

We use the [Gardener Project workspace](https://gardener-cloud.slack.com) for public communication related to the Gardener project.
Check out the [Community Bio](../../community/_index.md) for an invite link to join the workspace.

Historically, we used the [#gardener](https://kubernetes.slack.com/messages/gardener) channel in the [Kubernetes workspace](http://slack.k8s.io/).

### Mailing List

[gardener@googlegroups.com](https://groups.google.com/forum/?fromgroups#!forum/gardener)

The mailing list is hosted through Google Groups. To receive the lists' emails, [join the group](https://support.google.com/groups/answer/1067205) as you would any other Google Group.

### Other

For additional channels where you can reach us, as well as links to our bi-weekly meetings, visit the [Community page](../../community/_index.md).
