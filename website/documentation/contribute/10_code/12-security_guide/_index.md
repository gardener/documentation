---
title: Security Release Process
remote: https://github.com/gardener/documentation/blob/master/security-release-process.md
---
# Gardener Security Release Process

Gardener is a growing community of volunteers and users. The Gardener community has adopted this security disclosure and response policy to ensure we responsibly handle critical issues.

## Gardener Security Team

Security vulnerabilities should be handled quickly and sometimes privately. The primary goal of this process is to reduce the total time users are vulnerable to publicly known exploits.
The Gardener Security Team is responsible for organizing the entire response including internal communication and external disclosure but will need help from relevant developers and release managers to successfully run this process. The initial Gardener Security Team will consist of the following volunteers:

* Olaf Beier, (**[@olafbeier](https://github.com/olafbeier)**)
* Vasu Chandrasekhara, (**[@vasu1124](https://github.com/vasu1124)**)
* Alban Crequy, (**[@alban](https://github.com/alban)**)
* Norbert Hamann, (**[@norberthamann](https://github.com/norberthamann)**)
* Claudia H&ouml;lters, (**[@hoeltcl](https://github.com/hoeltcl)**)
* Oliver Kling, (**[@oliverkling](https://github.com/oliverkling)**)
* Vedran Lerenc, (**[@vlerenc](https://github.com/vlerenc)**)
* Dirk Marwinski, (**[@marwinski](https://github.com/marwinski)**)
* Michael Schubert, (**[@schu](https://github.com/schu)**)
* Matthias Sohn, (**[@msohn](https://github.com/msohn)**)
* Frederik Thormaehlen, (**[@ThormaehlenFred](https://github.com/ThormaehlenFred)**)
* Christian Cwienk (**[@ccwienk](https://github.com/ccwienk)**)


## Disclosures

### Private Disclosure Processes

The Gardener community asks that all suspected vulnerabilities be privately and responsibly disclosed. If you've found a vulnerability or a potential vulnerability in Gardener please let us know by writing an e-mail to [secure@sap.com](mailto:secure@sap.com). We'll send a confirmation e-mail to acknowledge your report, and we'll send an additional e-mail when we've identified the issue positively or negatively.

### Public Disclosure Processes

If you know of a publicly disclosed vulnerability please IMMEDIATELY e-mail to [secure@sap.com](mailto:secure@sap.com) to inform the Gardener Security Team about the vulnerability so they may start the patch, release, and communication process.

If possible the Gardener Security Team will ask the person making the public report if the issue can be handled via a [private disclosure process](#private-disclosure-process) (for example if the full exploit details have not yet been published). If the reporter denies the request for private disclosure, the Gardener Security Team will move swiftly with the fix and release process. In extreme cases GitHub can be asked to delete the issue but this generally isn't necessary and is unlikely to make a public disclosure less damaging.

## Patch, Release, and Public Communication

For each vulnerability a member of the Gardener Security Team will volunteer to lead coordination with the "Fix Team" and is responsible for sending disclosure e-mails to the rest of the community. This lead will be referred to as the "Fix Lead." The role of the Fix Lead should rotate round-robin across the Gardener Security Team. Note that given the current size of the Gardener community it is likely that the Gardener Security Team is the same as the "Fix team." (I.e., all maintainers). The Gardener Security Team may decide to bring in additional contributors for added expertise depending on the area of the code that contains the vulnerability. All of the time lines below are suggestions and assume a private disclosure. The Fix Lead drives the schedule using his best judgment based on severity and development time. If the Fix Lead is dealing with a public disclosure all time lines become ASAP (assuming the vulnerability has a CVSS score >= 7; see below). If the fix relies on another upstream project's disclosure time line, that will adjust the process as well. We will work with the upstream project to fit their time line and best protect our users.

### Fix Team Organization

The Fix Lead will work quickly to identify relevant engineers from the affected projects and packages and CC those engineers into the disclosure thread. These selected developers are the Fix Team.
The Fix Lead will give the Fix Team access to a private security repository to develop the fix.

### Fix Development Process

The Fix Lead and the Fix Team will create a [CVSS](https://www.first.org/cvss/specification-document) using the [CVSS Calculator](https://www.first.org/cvss/calculator/3.0). The Fix Lead makes the final call on the calculated CVSS; it is better to move quickly than make the CVSS perfect.
The Fix Team will notify the Fix Lead that work on the fix branch is complete once there are LGTMs on all commits in the private repository from one or more maintainers.
If the CVSS score is under 7.0 (a [medium severity score](https://www.first.org/cvss/specification-document#i5)) the Fix Team can decide to slow the release process down in the face of holidays, developer bandwidth, etc. These decisions must be discussed on the private [Gardener Security mailing list](#communication-channel).

### Fix Disclosure Process

With the fix development underway, the Fix Lead needs to come up with an overall communication plan for the wider community. This Disclosure process should begin after the Fix Team has developed a Fix or mitigation so that a realistic time line can be communicated to users. The Fix Lead will inform the [Gardener mailing list](#communication-channel) that a security vulnerability has been disclosed and that a fix will be made available in the future on a certain release date. The Fix Lead will include any mitigating steps users can take until a fix is available. The communication to Gardener users should be actionable. They should know when to block time to apply patches, understand exact mitigation steps, etc.

### Fix Release Day

The Release Managers will ensure all the binaries are built, publicly available, and functional before the Release Date.
The Release Managers will create a new patch release branch from the latest patch release tag + the fix from the security branch. As a practical example if v0.12.0 is the latest patch release in gardener.git a new branch will be created called v0.12.1 which includes only patches required to fix the issue.
The Fix Lead will cherry-pick the patches onto the master branch and all relevant release branches. The Fix Team will [LGTM](https://github.com/lgtmco/lgtm) and merge.
The Release Managers will merge these PRs as quickly as possible. Changes shouldn't be made to the commits even for a typo in the CHANGELOG as this will change the git sha of the already built and commits leading to confusion and potentially conflicts as the fix is cherry-picked around branches.
The Fix Lead will request a CVE from the SAP Product Security Response Team via email to [cna@sap.com](mailto:cna@sap.com) with all the relevant information (description, potential impact, affected version, fixed version, CVSS v3 base score and supporting documentation for the CVSS score) for every vulnerability. The Fix Lead will inform the [Gardener mailing list](#communication-channel) and announce the new releases, the CVE number (if available), the location of the binaries, and the relevant merged PRs to get wide distribution and user action.

As much as possible this e-mail should be actionable and include links how to apply the fix to users environments; this can include links to external distributor documentation. The recommended target time is 4pm UTC on a non-Friday weekday. This means the announcement will be seen morning Pacific, early evening Europe, and late evening Asia.
The Fix Lead will remove the Fix Team from the private security repository.

### Retrospective

These steps should be completed after the Release Date. The retrospective process [should be blameless](https://landing.google.com/sre/book/chapters/postmortem-culture.html).

The Fix Lead will send a retrospective of the process to the [Gardener mailing list](#communication-channel) including details on everyone involved, the time line of the process, links to relevant PRs that introduced the issue, if relevant, and any critiques of the response and release process.
The Release Managers and Fix Team are also encouraged to send their own feedback on the process to the [Gardener mailing list](#communication-channel). Honest critique is the only way we are going to get good at this as a community.


### Communication Channel

The [private](#private-disclosure-process) or [public disclosure process](#public-disclosure-process) should be triggered exclusively by writing an e-mail to [secure@sap.com](mailto:secure@sap.com).

Gardener security announcements will be communicated by the Fix Lead sending an e-mail to the [Gardener mailing list](https://groups.google.com/forum/#!forum/gardener) (reachable via [gardener@googlegroups.com](mailto:gardener@googlegroups.com)) as well as posting a link in the [Gardener Slack channel](https://kubernetes.slack.com/messages/CB57N0BFG/details/). Public discussions about Gardener security announcements and retrospectives, will primarily happen in the Gardener mailing list. Thus Gardener community members who are interested in participating in discussions related to the Gardener Security Release Process are encouraged to join the Gardener mailing list ([how to find and join a group](https://support.google.com/groups/answer/1067205?hl=en))

The members of the [Gardener Security Team](#gardener-security-team) are subscribed to the private [Gardener Security mailing list](https://groups.google.com/forum/#!forum/gardener-security) (reachable via [gardener-security@googlegroups.com](mailto:gardener-security@googlegroups.com)).
