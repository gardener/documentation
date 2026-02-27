---
title: "Enhancing Code Quality: New Validation Guidelines for Gardener Developers"
linkTitle: "Enhancing Code Quality: New Validation Guidelines for Gardener Developers"
newsSubtitle: September 24, 2025
publishdate: 2025-09-24
authors:
- avatar: https://avatars.githubusercontent.com/ialidzhikov
  login: ialidzhikov
  name: Ismail Alidzhikov
aliases: ["/blog/2025/09/24/enhancing-code-quality-new-validation-guidelines-for-gardener-developers"]
---

To improve consistency and streamline development, Gardener has introduced a comprehensive set of validation guidelines. Previously, the conventions and best practices for writing validation code were not centrally documented, making it challenging for developers to find the right approach or locate existing validation logic.

These new guidelines, available as two separate documents for core components and extensions, aim to consolidate this knowledge, ensuring that validation is implemented consistently and effectively across the entire Gardener codebase.

### The Importance of Solid Validation

Robust validation is a cornerstone of a secure and stable system. In Gardener, it serves several critical functions:
*   **Security:** It acts as the first line of defense against malicious or malformed input, preventing potential vulnerabilities.
*   **API Consistency:** It ensures that all API resources are well-formed, preventing downstream controllers from acting on invalid data.
*   **System Stability:** By catching invalid configurations early, it prevents unpredictable behavior and runtime errors.
*   **Clear Feedback:** It provides users with fast, actionable feedback during the admission phase, rather than forcing them to wait for a downstream operation to fail.

### Guidelines for Core Components

The primary guideline document focuses on validation within Gardener's core components. It details the various approaches and provides clear instructions on when to use each one.

A key distinction is made between validation that can be performed in the storage layer and validation that requires a dedicated admission plugin:
*   **Storage Layer Validation:** This approach is ideal for simple, self-contained checks that do not require information from other resources. For example, verifying that a field like `.spec.kubernetes.kubeProxy.mode` contains one of the supported values (`IPTables` or `IPVS`).
*   **Admission Plugin Validation:** For more complex scenarios that involve cross-resource checks, an admission plugin is required. A classic example is validating a Shoot's `.spec.region`, which involves checking if the selected region is supported by the referenced `CloudProfile`.

The document also provides a curated list of utility packages and functions from both Kubernetes and Gardener to help standardize common validation tasks, such as checking CIDR ranges, resource quantities, and label selectors. It concludes with general best practices, including how to handle potentially breaking changes when introducing more restrictive validation for existing fields.

### Guidelines for Extensions

A second, more specific document has been created for extension developers. Since Gardener itself is provider-agnostic, it cannot validate the provider-specific configuration fields within its API resources, which are of type `*runtime.RawExtension`.

This responsibility falls to the extensions themselves. The guidelines recommend that:
*   Extensions must use their own admission components to decode and validate their provider-specific configurations.
*   Decoding should be done in **strict mode** to prevent unknown or duplicate fields from being accepted.
*   Extensions should also validate any resources they reference, such as `Secrets` or `ConfigMaps`, to ensure they contain the required data in the correct format.

By following these new guidelines, developers and reviewers can ensure that validation code across the Gardener project and its extensions is consistent, secure, and maintainable.

### Further Reading
*   [Developer Guideline on Validation](https://github.com/gardener/gardener/blob/master/docs/development/validation-guidelines.md)
*   [Validation Guidelines for Extensions](https://github.com/gardener/gardener/blob/master/docs/extensions/validation-guidelines-for-extensions.md)
*   [GitHub Pull Request #12811](https://github.com/gardener/gardener/pull/12811)
*   [Recording of the Talk](https://youtu.be/sfByvNPAnz8?t=1815)