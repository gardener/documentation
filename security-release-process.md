# Gardener Security Release Process

Gardener is a growing community of volunteers and users. The Gardener community has adopted this security disclosures and response policy to ensure we responsibly handle critical issues.

## Gardener Security Team

Security vulnerabilities should be handled quickly and sometimes privately. The primary goal of this process is to reduce the total time users are vulnerable to publicly known exploits. The Gardener Security Team is responsible for organizing the entire response including internal communication and external disclosure but will need help from relevant developers and release managers to successfully run this process. The initial Gardener Security Team will consist of volunteers subscribed to the private [Gardener Security](https://groups.google.com/forum/#!forum/gardener-security) mailing list. These are the people who have been involved in the initial discussion and volunteered:

* Olaf Beier, (**[@olafbeier](https://github.com/olafbeier)**) 
* Norbert Hamann, (**[@norberthamann](https://github.com/norberthamann)**) 
* Claudia Hölters, (**[@hoeltcl](https://github.com/hoeltcl)**)
* Oliver Kling, (**[@oliverkling](https://github.com/oliverkling)**) 
* Matthias Sohn, (**[@msohn](https://github.com/msohn)**)
* Dirk Marwinski, (**[@marwinski](https://github.com/marwinski)**)
* Vasu Chandrasekhara, (**[@vasu1124](https://github.com/vasu1124)**)
* Vedran Lerenc, (**[@vlerenc](https://github.com/vlerenc)**)
* Frederik Thormaehlen, (**[@ThormaehlenFred](https://github.com/ThormaehlenFred)**)


## Disclosures

### Private Disclosure Processes

The Gardener community asks that all suspected vulnerabilities be privately and responsibly disclosed. If you've found a vulnerability or a potential vulnerability in Gardener please let us know via the Gardener Security mailing list [gardener-security@googlegroups.com](mailto:gardener-security@googlegroups.com). We'll send a confirmation e-mail to acknowledge your report, and we'll send an additional e-mail when we've identified the issue positively or negatively.

### Public Disclosure Processes

If you know of a publicly disclosed security vulnerability please IMMEDIATELY e-mail to the Gardener Security mailing list [gardener-security@googlegroups.com](mailto:gardener-security@googlegroups.com) to inform the Gardener Security Team about the vulnerability so they may start the patch, release, and communication process.

If possible the Gardener Security Team will ask the person making the public report if the issue can be handled via a private disclosure process (for example if the full exploit details have not yet been published). If the reporter denies the request for private disclosure, the Gardener Security Team will move swiftly with the fix and release process. In extreme cases GitHub can be asked to delete the issue but this generally isn't necessary and is unlikely to make a public disclosure less damaging.

## Patch, Release, and Public Communication

For each vulnerability a member of the Gardener Security Team will volunteer to lead coordination with the "Fix Team" and is responsible for sending disclosure e-mails to the rest of the community. This lead will be referred to as the "Fix Lead." The role of the Fix Lead should rotate round-robin across the Gardener Security Team. Note that given the current size of the Gardener community it is likely that the Gardener Security Team is the same as the "Fix team." (I.e., all maintainers). The Gardener Security Team may decide to bring in additional contributors for added expertise depending on the area of the code that contains the vulnerability. All of the time lines below are suggestions and assume a private disclosure. The Fix Lead drives the schedule using his best judgment based on severity and development time. If the Fix Lead is dealing with a public disclosure all time lines become ASAP (assuming the vulnerability has a CVSS score >= 7; see below). If the fix relies on another upstream project's disclosure time line, that will adjust the process as well. We will work with the upstream project to fit their time line and best protect our users.

### Fix Team Organization

These steps should be completed within the first 24 hours of disclosure.

The Fix Lead will work quickly to identify relevant engineers from the affected projects and packages and CC those engineers into the disclosure thread. These selected developers are the Fix Team.
The Fix Lead will give the Fix Team access to a private security repository to develop the fix.

### Fix Development Process

These steps should be completed within the 1-7 days of Disclosure.

The Fix Lead and the Fix Team will create a [CVSS](https://www.first.org/cvss/specification-document) using the [CVSS Calculator](https://www.first.org/cvss/calculator/3.0). The Fix Lead makes the final call on the calculated CVSS; it is better to move quickly than make the CVSS perfect.
The Fix Team will notify the Fix Lead that work on the fix branch is complete once there are LGTMs on all commits in the private repository from one or more maintainers.
If the CVSS score is under 7.0 (a [medium severity score](https://www.first.org/cvss/specification-document#i5)) the Fix Team can decide to slow the release process down in the face of holidays, developer bandwidth, etc. These decisions must be discussed on the the Gardener Security mailing list [gardener-security@googlegroups.com](mailto:gardener-security@googlegroups.com).

### Fix Disclosure Process

With the fix development underway, the Fix Lead needs to come up with an overall communication plan for the wider community. This Disclosure process should begin after the Fix Team has developed a Fix or mitigation so that a realistic time line can be communicated to users.

Disclosure of Forthcoming Fix to Users (Completed within 1-7 days of Disclosure)
The Fix Lead will e-mail the Gardener mailing list [gardener@googlegroups.com](mailto:gardener@googlegroups.com) informing users that a security vulnerability has been disclosed and that a fix will be made available at YYYY-MM-DD HH:MM UTC in the future via this list. This time is the Release Date.
The Fix Lead will include any mitigating steps users can take until a fix is available.
The communication to users should be actionable. They should know when to block time to apply patches, understand exact mitigation steps, etc.

### Fix Release Day (Completed within 1-21 days of Disclosure)

The Release Managers will ensure all the binaries are built, publicly available, and functional before the Release Date. 
The Release Managers will create a new patch release branch from the latest patch release tag + the fix from the security branch. As a practical example if v1.5.3 is the latest patch release in gardener.git a new branch will be created called v1.5.4 which includes only patches required to fix the issue.
The Fix Lead will cherry-pick the patches onto the master branch and all relevant release branches. The Fix Team will [LGTM](https://github.com/lgtmco/lgtm) and merge.
The Release Managers will merge these PRs as quickly as possible. Changes shouldn't be made to the commits even for a typo in the CHANGELOG as this will change the git sha of the already built and commits leading to confusion and potentially conflicts as the fix is cherry-picked around branches.
The Fix Lead will request a CVE from SAP Global Security via email to [cna@sap.com](mailto:cna@sap.com) with all the relevant information (description, potential impact, affected version, fixed version, CVSS v3 base score and supporting documentation for the CVSS score) for every vulnerability.
The Fix Lead will e-mail the Gardener mailing list [gardener@googlegroups.com](mailto:gardener@googlegroups.com) now that everything is public announcing the new releases, the CVE number, the location of the binaries, and the relevant merged PRs to get wide distribution and user action. As much as possible this e-mail should be actionable and include links how to apply the fix to users environments; this can include links to external distributor documentation. The recommended target time is 4pm UTC on a non-Friday weekday. This means the announcement will be seen morning Pacific, early evening Europe, and late evening Asia.
The Fix Lead will remove the Fix Team from the private security repository. 

### Retrospective

These steps should be completed 1-3 days after the Release Date. The retrospective process [should be blameless](https://landing.google.com/sre/book/chapters/postmortem-culture.html).

The Fix Lead will send a retrospective of the process to the Gardener mailing list [gardener@googlegroups.com](mailto:gardener@googlegroups.com) including details on everyone involved, the time line of the process, links to relevant PRs that introduced the issue, if relevant, and any critiques of the response and release process.
The Release Managers and Fix Team are also encouraged to send their own feedback on the process to  the Gardener mailing list [gardener@googlegroups.com](mailto:gardener@googlegroups.com). Honest critique is the only way we are going to get good at this as a community.