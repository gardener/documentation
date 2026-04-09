---
title: Reporting a Security Incident
---

## Before You Report

### Check the Affected Version

Only supported versions receive patches. If using an old version, verify the issue exists in the latest release before reporting.

### Do Not Disclose Publicly

**Do not** file a public GitHub issue, post to the mailing list, or discuss the vulnerability in the public Slack channel until the Gardener Security Team has had the opportunity to assess and address it. Public disclosure before a fix is available increases risk for all users.

## How to Submit a Report

### Option 1 — Private Email (Preferred)

Send an e-mail to [gardener-security@lists.neonephos.org](mailto:gardener-security@lists.neonephos.org).

This is a private security mailing list monitored by the [Gardener Security Team](#who-handles-your-report). Use it for:
- Newly discovered vulnerabilities you have not yet disclosed anywhere
- Suspected vulnerabilities you are unsure about
- Coordinated disclosure requests

### Option 2 — GitHub Private Security Advisory

You can also use GitHub's built-in private vulnerability reporting feature directly in the affected Gardener repository:

1. Navigate to the relevant Gardener repository on GitHub (e.g., `https://github.com/gardener/gardener`).
1. Click the **Security** tab.
1. Click **Report a vulnerability**.
1. Fill in the advisory form and submit.

GitHub will keep the report private and notify the repository maintainers. This path is especially useful if you want to attach code snippets, diffs, or files.

## Report Template

Please use this template when submitting a security vulnerability. Fill in as much as possible:

```
---
Subject: [SECURITY] Vulnerability Report
---

### 1. Description of the Vulnerability

**Summary:**
[Provide a clear, concise summary of the issue]

**Vulnerability Type:**
[e.g., privilege escalation, information disclosure, remote code execution, 
authentication bypass, SSRF, injection, etc.]

---

### 2. Affected Component(s)

**Repository/Component:**
[e.g., gardener/gardener, gardener/machine-controller-manager, extension name]

**Affected File(s) / Module(s):**
[List affected files or modules if known]

---

### 3. Affected Version(s)

**Versions affected:**
[Specify exact version(s) where issue was reproduced]

**Also present in:**
- [ ] Latest release
- [ ] master/main branch

---

### 4. Steps to Reproduce

1. [First step]
2. [Second step]
3. [Continue with detailed steps]
4. Observe: [What happens that should not happen]

---

### 5. Proof of Concept (PoC)

**Demonstration:**
[Attach scripts, configurations, request payloads, or code snippets]

**Evidence:**
[Include screenshots, logs, or other evidence]

**Note:** Do not include working exploit code if publicly released.

---

### 6. Impact Assessment

**What an attacker can achieve:**
[Describe potential impact]

**Blast radius:**
- [ ] Single Shoot cluster
- [ ] All Shoots in a Seed
- [ ] Entire Gardener control plane
- [ ] Other: [specify]

**Preconditions required:**
[e.g., authenticated access, specific cloud provider, specific extension]

---

### 7. CVSS Score (optional)

**Estimated CVSS v3.0 Score:**
[Score, e.g., 7.5]

**Vector String:**
[e.g., CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N]

[Get help: https://www.first.org/cvss/calculator/3.0]

---

### 8. Suggested Fix or Mitigation (optional)

**Proposed fix:**
[Describe potential solutions or workarounds]

**Patch/PR:**
[Link to proposed patch if available]

---

### 9. Your Contact Information

**Name/Handle:**
[Your name or GitHub handle]

**Email:**
[Your preferred contact email]

**Credit preference:**
- [ ] Credit me in CVE advisory
- [ ] Credit me in release notes
- [ ] Anonymous disclosure preferred

**Disclosure timeline:**
[Any specific constraints, e.g., "coordinated with CVE numbering authority by DATE"]
```

## What Happens After Your Report

### 1. Acknowledgement
The Gardener Security Team will send a confirmation e-mail acknowledging receipt of your report. You will also receive a follow-up e-mail once the team has made a positive or negative determination about the issue.

### 2. Triage & CVSS Scoring
The Security Team reproduces the issue and assesses severity. The [Security Officer](#who-handles-your-report) finalizes the CVSS score.

### 3. Fix Development
A **Fix Lead** directs a **Fix Team** in a private repository. You may review the fix before release.

### 4. Fix Disclosure & Communication
Once a fix is ready, the Fix Lead communicates a release date to the [Gardener mailing list](https://groups.google.com/forum/#!forum/gardener) and includes any interim mitigation steps users can apply.

### 5. Release
The fix is released as a patch version. A CVE is requested via the [GitHub Security Advisory process](https://docs.github.com/en/code-security/security-advisories). The release announcement is sent to:
- The [Gardener mailing list](mailto:gardener@googlegroups.com)
- The [#general Slack channel](https://gardener-cloud.slack.com/archives/CAPMD6DCG)

### 6. Retrospective
After the release, the Fix Lead sends a blameless retrospective to the Gardener mailing list covering the timeline, contributors, and lessons learned.

## Severity & Prioritisation

| CVSS v3 Score | Severity | Pace |
|---|---|---|
| 9.0 – 10.0 | Critical | Immediate — all timelines become ASAP |
| 7.0 – 8.9 | High | Immediate — all timelines become ASAP |
| 4.0 – 6.9 | Medium | Normal pace; may be adjusted around holidays or bandwidth |
| 0.1 – 3.9 | Low | Normal pace; may be adjusted around holidays or bandwidth |

CVSS ≥ 7.0 is high-priority and accelerated regardless of disclosure method.

## Public Disclosure of an Already-Known Vulnerability

If a vulnerability is already public (blog, GitHub issue, advisory), immediately email [gardener-security@lists.neonephos.org](mailto:gardener-security@lists.neonephos.org) to trigger the patch and release process.

## Who Handles Your Report

### Security Officer
| Name | GitHub |
|---|---|
| Eva Kuhnle-Heck | [@HeckEK](https://github.com/HeckEK) |

### Security Team
| Name | GitHub |
|---|---|
| Christian Cwienk | [@ccwienk](https://github.com/ccwienk) |
| Donka Dimitrova | [@donistz](https://github.com/donistz) |
| Eva Kuhnle-Heck | [@HeckEK](https://github.com/HeckEK) |
| Vedran Lerenc | [@vlerenc](https://github.com/vlerenc) |
| Dirk Marwinski | [@marwinski](https://github.com/marwinski) |
| Jordan Jordanov | [@jordanjordanov](https://github.com/jordanjordanov) |

All Security Team members are subscribed to the private [Gardener Security mailing list](mailto:gardener-security@lists.neonephos.org).

---

## Communication Channels Summary

| Purpose | Channel |
|---|---|
| Report a new vulnerability (private) | [gardener-security@lists.neonephos.org](mailto:gardener-security@lists.neonephos.org) |
| Report via GitHub (private) | GitHub → repo → Security tab → "Report a vulnerability" |
| General security announcements | [Gardener mailing list](mailto:gardener@googlegroups.com) |
| Security announcements (Slack) | [#general](https://gardener-cloud.slack.com/archives/CAPMD6DCG) on [gardener.cloud Slack](https://gardener.cloud/community/community-bio/) |
| Public mailing list discussions | [Google Groups — gardener](https://groups.google.com/forum/#!forum/gardener) |