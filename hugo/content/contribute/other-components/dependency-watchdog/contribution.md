---
github_repo: 'https://github.com/gardener/dependency-watchdog'
github_subdir: docs/development
params:
  github_branch: master
path_base_for_github_subdir:
  from: content/contribute/other-components/dependency-watchdog/contribution.md
  to: contribution.md
persona: Developers
title: Contribution
prev: false
next: false
managed: true
---

# How to contribute?

Contributions are always welcome!

In order to contribute ensure that you have the development environment setup and you familiarize yourself with required steps to build, verify-quality and test.

## Setting up development environment

### Installing Go

Minimum Golang version required: `1.18`.
On MacOS run:
```bash
brew install go
```

For other OS, follow the [installation instructions](https://go.dev/doc/install).

### Installing Git

Git is used as version control for dependency-watchdog. On MacOS run:
```bash
brew install git
```
If you do not have git installed already then please follow the [installation instructions](https://git-scm.com/downloads).

### Installing Docker

In order to test dependency-watchdog containers you will need a local kubernetes setup. Easiest way is to first install Docker. This becomes a pre-requisite to setting up either a vanilla KIND/minikube cluster or a local Gardener cluster.

On MacOS run:
```bash
brew install -cash docker
```
For other OS, follow the [installation instructions](https://docs.docker.com/get-docker/).

### Installing Kubectl

To interact with the local Kubernetes cluster you will need kubectl. On MacOS run:
```bash
brew install kubernetes-cli
```
For other IS, follow the [installation instructions](https://kubernetes.io/docs/tasks/tools/install-kubectl/).

## Get the sources
Clone the repository from Github:

```bash
git clone https://github.com/gardener/dependency-watchdog.git
```

## Using Makefile

For every change following make targets are recommended to run.

```bash
# build the code changes
> make build
# ensure that all required checks pass
> make verify # this will check formatting, linting and will run unit tests
# if you do not wish to run tests then you can use the following make target.
> make check
```
All tests should be run and the test coverage should ideally not reduce.
Please ensure that you have read [testing guidelines](/contribute/other-components/dependency-watchdog/testing/).

Before raising a pull request ensure that if you are introducing any new file then you must add licesence header to all new files. To add license header you can run this make target:
```bash
> make add-license-headers
# This will add license headers to any file which does not already have it.
```
> NOTE: Also have a look at the Makefile as it has other targets that are not mentioned here.

## Raising a Pull Request

To raise a pull request do the following:
1. Create a fork of [dependency-watchdog](https://github.com/gardener/dependency-watchdog)
1. Add [dependency-watchdog](https://github.com/gardener/dependency-watchdog) as upstream remote via
```bash
   git remote add upstream https://github.com/gardener/dependency-watchdog
```
3. It is recommended that you create a git branch and push all your changes for the pull-request.
3. Ensure that while you work on your pull-request, you continue to rebase the changes from upstream to your branch. To do that execute the following command:
```bash
   git pull --rebase upstream master
```
5. We prefer clean commits. If you have multiple commits in the pull-request, then squash the commits to a single commit. You can do this via `interactive git rebase` command. For example if your PR branch is ahead of remote origin HEAD by 5 commits then you can execute the following command and pick the first commit and squash the remaining commits.
```bash
   git rebase -i HEAD~5 #actual number from the head will depend upon how many commits your branch is ahead of remote origin master
```
