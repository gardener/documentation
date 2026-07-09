---
github_repo: 'https://github.com/gardener/gardener-extension-shoot-dns-service'
github_subdir: docs/usage/workloadidentity
params:
  github_branch: master
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/others/gardener-extension-shoot-dns-service/workloadidentity/aws.md
  to: aws.md
persona: Users
title: Aws
prev: false
next: false
managed: true
---

# Using `WorkloadIdentity` for `AWS Route53`

To use `WorkloadIdentity` for `AWS Route53`, you can create a `WorkloadIdentity` resource in the project namespace in the Garden cluster with the necessary configuration for AWS authentication.

Note that the `spec.targetSystem.type` has to be set to `aws` although the type of the DNS provider is `aws-route53`. This allows to use the same `WorkloadIdentity` for different types of AWS resources, e.g., for infrastructure purposes and for `DNSProvider` purposes.

To create a `WorkloadIdentity`, follow the instructions in the [AWS Workload Identity Federation documentation](https://gardener.cloud/docs/extensions/infrastructure-extensions/gardener-extension-provider-aws/usage/#aws-workload-identity-federation) of the AWS Provider extension.

For the required permissions, please refer to the [Required permissions of an `aws-route53` DNS provider](https://github.com/gardener/external-dns-management/tree/master/docs/aws-route53#required-permissions).
