---
aliases:
  - /docs/contribute/code/documentation-roles/
github_repo: 'https://github.com/gardener/documentation'
github_subdir: hugo/content/contribute/contribution-process
params:
  github_branch: master
path_base_for_github_subdir:
  from: content/contribute/contribution-process/documentation-roles.md
  to: documentation-roles.md
title: "Documentation Roles"
outline: 2
weight: 40
prev: false
next: false
local: true
---

# Documentation Roles

This document describes documentation-specific contribution roles within the Gardener community.
The [general community roles](/contribute/contribution-process/roles/) are tailored to code repositories. Documentation roles have their own requirements and responsibilities because maintaining the aggregated documentation across the different repositories requires editorial and structural expertise.

## Documentation Members

Documentation members are the same as Gardener community members .
To learn more about the general membership requirements and responsibilities, please refer to the [members section](/contribute/contribution-process/roles/#member).

## Documentation Reviewer

Documentation reviewers are responsible for assessing the quality, clarity, and structural correctness of documentation contributions.
They are granted the privilege to use the `/lgtm` comment on pull requests in the [documentation repository](https://github.com/gardener/documentation).
Reviewers are technically defined in the [`OWNERS_ALIASES`](https://github.com/gardener/documentation/blob/master/OWNERS_ALIASES) file of the documentation repository.

**Requirements**
- Member of the Gardener org
- Solid understanding of the Gardener documentation structure.
- Familiarity with the documentation tooling, i.e., [Docforge](https://github.com/gardener/docforge) aggregation, the [VitePress](https://vitepress.dev/) site generator, Markdown, and the local build, post-processing, and preview workflow
- Enabled GitHub notifications for PR invites and documentation issues

**Responsibilities**
- Regular contributions in the form of pull requests, reviews, and issues for the documentation
- Tracking of open documentation pull requests and issues
- Responsiveness, especially during documentation reviews and discussions

**How to become a documentation reviewer**
- Demonstrate the requirements through previous contributions (documentation changes, PR review participation, issue discussions).
- Obtain sponsorship from at least two approvers of the [documentation repository](https://github.com/gardener/documentation).
- Open a [documentation reviewer request](https://github.com/gardener/documentation/issues/new?template=documentation_reviewer_role.yaml). If accepted, an approver creates a PR to update [`OWNERS_ALIASES`](https://github.com/gardener/documentation/blob/master/OWNERS_ALIASES) of the documentation repository.

## Documentation Approver

Documentation approvers are deeply involved in the holistic maintenance, structure, and operation of the [Gardener documentation](https://gardener.cloud/).
In addition to approver permissions on the [documentation repository](https://github.com/gardener/documentation), they hold approver permissions for the `/docs` folder of every project referenced in the [Docforge manifest files](https://github.com/gardener/documentation/tree/master/.docforge), which [Docforge](https://github.com/gardener/docforge) aggregates into the final documentation.
This cross-repository permission ensures smooth documentation maintenance, comparable to setups where all documentation lives in one central repository rather than being colocated with the code.
They are granted the privilege to approve pull requests by using the `/approve` comment.

**Requirements**
- Deep understanding of the Gardener documentation lifecycle
- Sustained contributions to the documentation, e.g., improving structure, wording, and presentation

**Responsibilities**
- Maintain the overall structure, presentation, and operation of the aggregated documentation
- Must limit changes in repositories other than the documentation repository to organizational or technical adjustments (fixing syntax, restructuring folders, adapting presentation, improving wording, etc.)
- Never alter the underlying meaning of content in other repositories without prior approval from an [approver](/contribute/contribution-process/roles/#approver) of that repository

**How to become a documentation approver**
- Obtain sponsorship from a quorum of approvers of the target repository; nomination is initiated by one or more existing approvers through a new PR, which must receive positive reviews from the quorum.
