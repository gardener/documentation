---
title: Contribution Guide
remote: https://github.com/gardener/documentation/blob/master/CONTRIBUTING.md
---
# Contributing to Gardener

## Code of conduct

All members of the Gardener community must abide by the
[CNCF Code of Conduct](https://github.com/cncf/foundation/blob/master/code-of-conduct.md).
Only by respecting each other can we develop a productive, collaborative community.
Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting [gardener.opensource@sap.com](mailto:gardener.opensource@sap.com) and/or a Gardener project maintainer.

## Contributing

Gardener uses GitHub to manage reviews of pull requests.

* If you are a new contributor see: [Steps to Contribute](#steps-to-contribute)

* If you have a trivial fix or improvement, go ahead and create a pull request,
  addressing (with `@...`) a suitable maintainer of this repository (see
  [CODEOWNERS](https://github.com/gardener/gardener/blob/master/CODEOWNERS) of the
  repository you want to contribute to) in the description of the pull request.

* If you plan to do something more involved, first discuss your ideas
  on our [mailing list](https://groups.google.com/forum/?fromgroups#!forum/gardener).
  This will avoid unnecessary work and surely give you and us a good deal
  of inspiration.

* Relevant coding style guidelines are the [Go Code Review
  Comments](https://github.com/golang/go/wiki/CodeReviewComments)
  and the _Formatting and style_ section of Peter Bourgon's [Go: Best
  Practices for Production
  Environments](http://peter.bourgon.org/go-in-production/#formatting-and-style).

## Steps to Contribute

Should you wish to work on an issue, please claim it first by commenting on the GitHub issue that you want to work on it. This is to prevent duplicated efforts from contributors on the same issue.

If you have questions about one of the issues, with or without the tag, please comment on them and one of the maintainers will clarify it.

We kindly ask you to follow the [Pull Request Checklist](#Pull-Request-Checklist) to ensure reviews can happen accordingly.

## Contributing Code

You are welcome to contribute code to Gardener in order to fix a bug or to implement a new feature.

The following rules govern code contributions:

* Contributions must be licensed under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0)
* You need to sign the [Developer Certificate of Origin](#developer-certificate-of-origin).

## Contributing Documentation

You are welcome to contribute documentation to Gardener.

The following rules govern documentation contributions:

* Contributions must be licensed under the [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/legalcode)
* You need to sign the [Developer Certificate of Origin](#developer-certificate-of-origin).

## Developer Certificate of Origin

Due to legal reasons, contributors will be asked to accept a Developer Certificate of Origin (DCO) before they submit the first pull request to this projects, this happens in an automated fashion during the submission process. We use [the standard DCO text of the Linux Foundation](https://developercertificate.org/).

## Pull Request Checklist

* Branch from the master branch and, if needed, rebase to the current master branch before submitting your pull request. If it doesn't merge cleanly with master you may be asked to rebase your changes.

* Commits should be as small as possible, while ensuring that each commit is correct independently (i.e., each commit should compile and pass tests).

* Test your changes as thoroughly as possible before your commit them. Preferably, automate your test by unit / integration (e.g. [Gardener integration testing](https://github.com/gardener/gardener/blob/master/docs/testing/integration_tests.md)) tests. If tested manually, provide information about the test scope in the PR description (e.g. “Test passed: Upgrade K8s version from 1.14.5 to 1.15.2 on AWS, Azure, GCP, Alicloud, Openstack.”).

* Create _Work In Progress [WIP]_ pull requests only if you need a clarification or an explicit review before you can continue your work item.

* If your patch is not getting reviewed or you need a specific person to review it, you can @-reply a reviewer asking for a review in the pull request or a comment, or you can ask for a review on our [mailing list](https://groups.google.com/forum/?fromgroups#!forum/gardener).

* Post review:
  * If a review requires you to change your commit(s), please test the changes again.
  * Amend the affected commit(s) and force push onto your branch.
  * Set respective comments in your GitHub review to resolved.
  * Create a general PR comment to notify the reviewers that your amendments are ready for another round of review.

## Issues and Planning

We use GitHub issues to track bugs and enhancement requests. Please provide as much context as possible when you open an issue. The information you provide must be comprehensive enough to reproduce that issue for the assignee. Therefore, contributors may use but aren't restricted to the issue template provided by the Gardener maintainers.

ZenHub is used for planning:

* Install the [ZenHub Chrome plugin](https://chrome.google.com/webstore/detail/zenhub-for-github/ogcgkffhplmphkaahpmffcafajaocjbd)
* Login to [ZenHub](https://www.zenhub.com/)
* Open the [Gardener ZenHub workspace](https://app.zenhub.com/workspace/o/gardener/gardener)

## Security Release Process

See [Security Release Process](../12-security_guide/_index.md)

## Community

### Slack Channel

[#gardener](https://kubernetes.slack.com/messages/gardener), sign up [here](http://slack.k8s.io/)

### Mailing List

[gardener@googlegroups.com](https://groups.google.com/forum/?fromgroups#!forum/gardener)

The mailing list is hosted through Google Groups. To receive the lists' emails, [join](https://support.google.com/groups/answer/1067205) the group, as you would any other Google Group.

### Twitter

Follow [@GardenerProject](https://twitter.com/GardenerProject) on Twitter. Please mention @GardenerProject
in your own posts about Gardener.

### Accessing community documents

In order to foster real time collaboration there are working documents and notes that are taken in Google Docs,
and then transferred to this repository if appropriate.

To gain edit access for these documents, you must subscribe to the
[gardener mailing list](https://groups.google.com/forum/?fromgroups#!forum/gardener),
as these documents are shared automatically with anyone who subscribes to that list.

### Weekly Meeting

We have a PUBLIC and RECORDED weekly meeting. We meet every Friday at [10:00 CET](https://www.google.de/search?q=10+CET+to+local+time) over Zoom. Find recordings in the [Gardener Youtube channel](https://www.youtube.com/channel/UCwUhwKFREV8Su0gwAJQX7tw/videos). Let us know if you want to participate and live in a timezone where 10:00 CET is in the night, we can also schedule meetings on Thursday [17:00 CET](https://www.google.de/search?q=17+CET+to+local+time).

See the meeting calendar on the web at [calendar.google.com](https://calendar.google.com/calendar/embed?src=gardener.cloud.community%40gmail.com), or paste this [iCal url](https://calendar.google.com/calendar/ical/gardener.cloud.community%40gmail.com/public/basic.ics) into any iCal client.

If you have a topic you'd like to present or would like to see discussed, please propose a specific date on the [Gardener Community Meeting Agenda](https://docs.google.com/document/d/1314v8ziVNQPjdBrWp-Y4BYrTDlv7dq2cWDFIa9SMaP4). Find minutes in the same document. Please upload slides or other documents you presented to the
[Gardener Community Meeting folder](https://drive.google.com/drive/u/0/folders/1myXFoaFL_9fYJdUwnZcIXMBpx3dynhM8). Subscribe to the [gardener mailing list](https://groups.google.com/forum/?fromgroups#!forum/gardener) to get edit permissions.
