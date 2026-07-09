---
description: >-
  A watchdog which actively looks out for disruption and recovery of critical
  services
github_repo: 'https://github.com/gardener/dependency-watchdog'
github_subdir: .
params:
  github_branch: master
path_base_for_github_subdir:
  from: content/docs/other-components/dependency-watchdog/_index.md
  to: README.md
title: Dependency Watchdog
prev: false
next: false
managed: true
---

# Dependency Watchdog
<img src="/docs/other-components/dependency-watchdog/gardener-dwd.png" style="width:200px">

[![REUSE status](https://api.reuse.software/badge/github.com/gardener/dependency-watchdog)](https://api.reuse.software/info/github.com/gardener/dependency-watchdog)
[![Build](https://github.com/gardener/dependency-watchdog/actions/workflows/non-release.yaml/badge.svg)](https://github.com/gardener/dependency-watchdog/actions/workflows/non-release.yaml)
[![Unit Tests](https://testgrid.k8s.io/q/summary/gardener-dependency-watchdog/ci-dependency-watchdog-unit/tests_status?style=svg)](https://testgrid.k8s.io/q/summary/gardener-dependency-watchdog/ci-dependency-watchdog-unit/tests_status)
[![Go Report Card](https://goreportcard.com/badge/github.com/gardener/dependency-watchdog)](https://goreportcard.com/report/github.com/gardener/dependency-watchdog)
[![GoDoc](https://godoc.org/github.com/gardener/dependency-watchdog?status.svg)](https://pkg.go.dev/github.com/gardener/dependency-watchdog)

## Overview
A watchdog which actively looks out for disruption and recovery of critical services. If there is a disruption then it will prevent cascading failure by conservatively scaling down dependent configured resources and if a critical service has just recovered then it will expedite the recovery of dependent services/pods.

Avoiding cascading failure is handled by [Prober](/docs/other-components/dependency-watchdog/concepts/prober/) component and expediting recovery of dependent services/pods is handled by [Weeder](/docs/other-components/dependency-watchdog/concepts/weeder/)  component. These are separately deployed as individual pods.

### Current Limitation & Future Scope
Although in the current offering the `Prober` is tailored to handle one such use case of `kube-apiserver` connectivity, but the usage of prober can be extended to solve similar needs for other scenarios where the components involved might be different.

## Start using or developing the Dependency Watchdog

See our documentation in the /docs repository, please [find the index here](https://github.com/gardener/dependency-watchdog/blob/master/docs/README.md).

## Feedback and Support

We always look forward to active community engagement.

Please report bugs or suggestions on how we can enhance `dependency-watchdog` to address additional recovery scenarios on [GitHub issues](https://github.com/gardener/dependency-watchdog/issues)
