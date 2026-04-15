---
title: Reporting a Security Incident
---

## Before You Report

### Check the Affected Version

Only supported versions receive patches. If using an outdated version, verify the issue exists in any of the supported versions before reporting.

### Do Not Disclose Publicly

**Do not** file a public GitHub issue, post to the mailing list, or discuss the vulnerability in the public Slack channel until the Gardener Security Team has had the opportunity to assess and address it. Public disclosure before a fix is available increases risk for all users.

## How to Submit a Report

### Option 1 — GitHub Private Security Advisory (Preferred)

Use GitHub's built-in private vulnerability reporting feature directly in the affected Gardener repository:

1. Navigate to the relevant Gardener repository on GitHub (e.g., `https://github.com/gardener/gardener`).
1. Click the **Security** tab.
1. Click **Report a vulnerability**.
1. Fill in the advisory form and submit.

### Option 2 — Private Email

You can also send an e-mail to [gardener-security@lists.neonephos.org](mailto:gardener-security@lists.neonephos.org).

This is a private security mailing list monitored by the [Gardener Security Team](https://github.com/gardener/.github/blob/main/SECURITY.md#gardener-security-team). Use it for:
- Newly discovered vulnerabilities you have not yet disclosed anywhere
- Suspected vulnerabilities you are unsure about
- Coordinated disclosure requests

## Public Disclosure of an Already-Known Vulnerability

If a vulnerability is already public (blog, GitHub issue, advisory), immediately email [gardener-security@lists.neonephos.org](mailto:gardener-security@lists.neonephos.org) to trigger the patch and release process.