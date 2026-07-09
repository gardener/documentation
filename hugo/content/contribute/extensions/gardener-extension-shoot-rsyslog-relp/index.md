---
description: Developer documentation for the node audit logging extension
github_repo: 'https://github.com/gardener/gardener-extension-shoot-rsyslog-relp'
github_subdir: .
params:
  github_branch: main
path_base_for_github_subdir:
  from: >-
    content/contribute/extensions/gardener-extension-shoot-rsyslog-relp/_index.md
  to: README.md
title: Node Audit Logging
prev: false
next: false
managed: true
---

# Gardener Extension to configure rsyslog with relp module

[![REUSE status](https://api.reuse.software/badge/github.com/gardener/gardener-extension-shoot-rsyslog-relp)](https://api.reuse.software/info/github.com/gardener/gardener-extension-shoot-rsyslog-relp)
[![CI Build status](https://github.com/gardener/gardener-extension-shoot-rsyslog-relp/actions/workflows/non-release.yaml/badge.svg)](https://github.com/gardener/gardener-extension-shoot-rsyslog-relp/actions/workflows/non-release.yaml)
[![Go Report Card](https://goreportcard.com/badge/github.com/gardener/gardener-extension-shoot-rsyslog-relp)](https://goreportcard.com/report/github.com/gardener/gardener-extension-shoot-rsyslog-relp)

Gardener extension controller which configures the rsyslog and auditd services installed on shoot nodes.

## Usage

- [Configuring the Rsyslog Relp Extension](/docs/extensions/others/gardener-extension-shoot-rsyslog-relp/configuration/) - learn what is the use-case for rsyslog-relp, how to enable it and configure it

## Local Setup and Development

* [Deploying the Rsyslog Relp Extension Locally](/contribute/extensions/gardener-extension-shoot-rsyslog-relp/getting-started/) - learn how to set up a local development environment
* [Developer Docs for Gardener Shoot Rsyslog Relp Extension](/contribute/extensions/gardener-extension-shoot-rsyslog-relp/shoot-rsyslog-relp/) -  learn about the inner workings
* [Validation Guidelines for Gardener Shoot Rsyslog Relp Extension](/contribute/extensions/gardener-extension-shoot-rsyslog-relp/input-validation/) - learn about input validation specifics
