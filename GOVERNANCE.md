# Gardener Governance

This document defines project governance for Gardener. It is meant to be followed by all the developers of the project and the Gardener community.

Common terminology used in this governance document are listed below:
* Team members: Any members of the Github organization.
* Maintainers: Maintainers lead an individual project or parts thereof (CODEOWNERS).
* Projects: A single repository in the Gardener GitHub organization is referred to as a project.
* The Gardener project: The sum of all activities performed under this governance, concerning one or more repositories or the community.

## Projects
Each project must have a CODEOWNERS file with at least one maintainer. Releases should be announced on the mailing list. Any new projects should be first proposed on the developers mailing list following the voting procedures listed below. When a project is no longer relevant, it should be moved to the gardener-attic GitHub organization.

## Roles

### Users
Users are community members who have a need for the project. They are the most important members of the community and without them the project would have no purpose. Anyone can be a user; there are no special requirements.

The project asks its users to participate in the project and community as much as possible. User contributions enable the project team to ensure that they are satisfying the needs of those users. 

### Contributors

Contributors are community members who contribute in concrete ways to the project. Anyone can become a contributor, and contributions can take many forms, as detailed in a [separate document](https://github.com/gardener/documentation/blob/master/website/documentation/contribute/_index.md).
There is no expectation of commitment to the project, no specific skill requirements and no selection process.

### Team Members

Team member status may be given to those who have made ongoing contributions to the Gardener project for at least 3 months. This is usually in the form of code improvements and/or notable work on documentation, but organizing events or user support could also be taken into account.

New members may be proposed by any existing member by email to the [Gardener mailing list](https://groups.google.com/forum/?fromgroups#!forum/gardener). The vote will be decided by majority in which each existing team member has one vote. Team members are added to the GitHub organization as member. They should respect the maintainers of each project. Team members may retire at any time by emailing the team. Team members can be removed by majority vote on the mailing list. For this vote, the member in question is not eligible to vote and does not count towards the quorum.

### Maintainers

The role that conveys decision-making powers is the maintainer.

Maintainers are responsible for one or more projects, and are expected to
* contribute code
* review incoming PRs
* triage issues
* proactively fix bugs
* and generally perform maintainance tasks for these projects.

Overall project goals and directions are discussed and agreed on by the group of all maintainers of all
the Gardener projects.

Maintainers are are added to the gardener Github organization and are listed in the [CODEOWNERS](https://help.github.com/articles/about-codeowners/) file of the respective repository.

## Decisionmaking

Ideally, all project decisions are resolved by lazy consensus. This means that any decision on
technical issues is considered supported by the team as long as nobody objects.

If this is not possible, maintainers may call a vote on the [Gardener mailing list](https://groups.google.com/forum/?fromgroups#!forum/gardener).
Unless otherwise specified in this document, the vote will be decided by majority in which each
maintainer receives one vote.

For all votes, voting must be open for at least one week. The end date should be clearly stated in the call to vote. A vote may be called and closed early if enough votes have come in one way so that further votes cannot change the final decision.
Votes must be called explicitly in a separate thread on the mailing list. The subject must be prefixed with [VOTE]. In the body, the call to vote must state the proposal being voted on. It should reference any discussion leading up to this point.

## Approving PRs

All PRs must receive approval from at least one maintainer before merge.
All repositories are configured to require review from maintainers.

## Changes in Maintainership

New maintainers of a project can be proposed by an existing maintainer by creating a pull request
adding the candidate to the CODEOWNERS file in the project's repository.
A majority vote of the existing maintainers is required on this pull request to approve the new maintainer.

In the same way existing maintainers can resign or be removed by majority vote.
A maintainer with no project activity for half a year is considered to have resigned.

## Changes in Governance

All changes in Governance require a 2/3 majority vote of all maintainers.

## Links
This governance document is based on [Meritocratic Governance Model](http://oss-watch.ac.uk/resources/meritocraticgovernancemodel) published by OSS Watch.
