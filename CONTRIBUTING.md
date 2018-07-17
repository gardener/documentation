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
  Comments](https://code.google.com/p/go-wiki/wiki/CodeReviewComments)
  and the _Formatting and style_ section of Peter Bourgon's [Go: Best
  Practices for Production
  Environments](http://peter.bourgon.org/go-in-production/#formatting-and-style).

## Steps to Contribute

Should you wish to work on an issue, please claim it first by commenting on the GitHub issue that you want to work on it. This is to prevent duplicated efforts from contributors on the same issue.

If you have questions about one of the issues, with or without the tag, please comment on them and one of the maintainers will clarify it.

## Contributing Code

You are welcome to contribute code to Gardener in order to fix a bug or to implement a new feature.

The following rules govern code contributions:
* Contributions must be licensed under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0)
* You need to sign the Contributor License Agreement. We are using *[CLA assistant](https://cla-assistant.io/)* providing a click-through workflow for accepting the CLA. For company contributors additionally the company needs to sign a corporate license agreement. See the following sections for details.

## Contributing Documentation

You are welcome to contribute documentation to Gardener.

The following rules govern documentation contributions:
* Contributions must be licensed under the [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/legalcode)
* You need to sign the Contributor License Agreement. We are using *[CLA assistant](https://cla-assistant.io/)* providing a click-through workflow for accepting the CLA. For company contributors additionally the company needs to sign a corporate license agreement. See the following sections for details.

## Individual Contributor License Agreement

When you contribute (code, documentation, or anything else), be aware that we only accept contributions 
under the Gardener project's license (see previous sections) and you need to agree to the
[Individual Contributor License Agreement](https://gist.github.com/CLAassistant/bd1ea8ec8aa0357414e8).
This applies to all contributors, including those contributing on behalf of a company. If you agree to its content, click on the link posted by the CLA assistant as a comment to the pull request. Click it to review the CLA, then accept it on the next screen if you agree to it. CLA assistant will save your decision for upcoming contributions and will notify you if there is any change to the CLA in the meantime.

## Corporate Contributor License Agreement

If employees of a company contribute code, in **addition** to the individual agreement above, there needs to be one company agreement submitted. This is mainly for the protection of the contributing employees.

An authorized company representative needs to download, fill, and print
the [Corporate Contributor License Agreement](/doc/cla/SAP%20Corporate%20Contributor%20License%20Agreement%20(5-26-15).pdf) form. Then either:

-   Scan it and e-mail it to [opensource@sap.com](mailto:opensource@sap.com) and [gardener.opensource@sap.com](mailto:gardener.opensource@sap.com)
-   Fax it to: +49 6227 78-45813
-   Send it by letter to: *Industry Standards & Open Source Team, Dietmar-Hopp-Allee 16, 69190 Walldorf, Germany*

The form contains a list of employees who are authorized to contribute on behalf of your company. When this list changes, please let us know.

## Pull Request Checklist

* Branch from the master branch and, if needed, rebase to the current master branch before submitting your pull request. If it doesn't merge cleanly with master you may be asked to rebase your changes.

* Commits should be as small as possible, while ensuring that each commit is correct independently (i.e., each commit should compile and pass tests).

* If your patch is not getting reviewed or you need a specific person to review it, you can @-reply a reviewer asking for a review in the pull request or a comment, or you can ask for a review on our [mailing list](https://groups.google.com/forum/?fromgroups#!forum/gardener).

* Add tests relevant to the fixed bug or new feature.

## Issues and Planning

We use GitHub issues to track bugs and enhancement requests and ZenHub for planning.
* Install the [ZenHub Chrome plugin](https://chrome.google.com/webstore/detail/zenhub-for-github/ogcgkffhplmphkaahpmffcafajaocjbd)
* Login to [ZenHub](https://www.zenhub.com/)
* Open the [Gardener ZenHub workspace](https://app.zenhub.com/workspace/o/gardener/gardener)

## Security Release Process

See [Security Release Process](https://github.com/gardener/documentation/blob/master/security-release-process.md)
