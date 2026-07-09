---
description: Gardener extension controller for the STACKIT cloud provider
github_repo: 'https://github.com/stackitcloud/gardener-extension-provider-stackit'
github_subdir: .
params:
  github_branch: main
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/infrastructure-extensions/gardener-extension-provider-stackit/_index.md
  to: README.md
title: Provider STACKIT
prev: false
next: false
managed: true
---

# Gardener Extension Provider STACKIT

[![GitHub License](https://img.shields.io/github/license/stackitcloud/gardener-extension-provider-stackit)](https://www.apache.org/licenses/LICENSE-2.0)

Project Gardener implements the automated management and operation of
[Kubernetes](https://kubernetes.io/) clusters as a service. This controller
implements [Gardener's extension contract](/docs/gardener/extensions/) for the STACKIT provider.

## Included provider-openstack components

This extension includes components derived from the
[openstack-provider](https://github.com/gardener/gardener-extension-provider-openstack)
to support internal migration efforts. These OpenStack components are not
required to use the extension on STACKIT and are only kept for internal
purposes. They will be deleted after the migration is complete.

The packages `pkg/controller/infrastructure` and `pkg/internal/infrastructure`
are mostly copies and should be kept as close to upstream as possible.

## Development

You can find all available make targets by running `make help`.

For information on our workflows, see:

* [Cloudprovider configuration guide](/docs/extensions/infrastructure-extensions/gardener-extension-provider-stackit/cloudprovider/)
* [Development guide](https://github.com/stackitcloud/gardener-extension-provider-stackit/blob/main/docs/development.md)
* [Testing guide](https://github.com/stackitcloud/gardener-extension-provider-stackit/blob/main/docs/testing.md)
* [Release procedure](https://github.com/stackitcloud/gardener-extension-provider-stackit/blob/main/docs/releases.md)

## Feedback and Support

Feedback and contributions are always welcome. Please report bugs or
suggestions as GitHub issues.

Please report bugs or suggestions as GitHub issues or reach out on [Slack](https://gardener-cloud.slack.com/) in the `stackit` channel ([join](https://gardener.cloud/community/) the workspace).
