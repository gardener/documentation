---
aside: false
description: Contributor guides for code and documentation
github_repo: 'https://github.com/gardener/documentation'
github_subdir: hugo/content/contribute
params:
  github_branch: master
path_base_for_github_subdir:
  from: content/contribute/_index.md
  to: _index.md
persona: Developers
title: Contribute
weight: 110
prev: false
next: false
local: true
---

# Welcome to the Contributor page of Gardener

This page is your starting point for contributing to Gardener. It contains all documentation related to developing and documenting Gardener.

We appreciate all kinds of contributions – from fixing a typo to implementing a new feature. Let's grow Gardener together!

## Get Started

<CardGrid :cards="[
{
title: 'Contributor Guide',
details: 'Learn how to contribute to Gardener, including contribution workflows, licensing requirements, and best practices.',
link: '/contribute/contribution-process/contributor-guide'
},
{
title: 'Developer Starter Kit',
details: 'Set up and deploy Gardener locally. Explore key development guidelines, such as testing, validation, and dependency management guidelines.',
link: '/contribute/developer-starter-kit/'
}
]"/>

## Contribute to a Specific Area

<CardGrid :cards="[
{
title: 'Gardener',
details: 'Browse the developer docs for the core Gardener functionality – development and contribution guidelines, information about networking, observability, how to extend Gardener, and more.',
link: '/contribute/gardener/'
},
{
title: 'Extensions',
details: 'Browse the developer docs for the Gardener extensions for infrastructure providers, Kubernetes auditing, registry cache, DNS services, and more.',
link: '/contribute/extensions/'
},
{
title: 'Other Components',
details: 'Browse the developer docs for components such as Dependency Watchdog, etcd-druid, and Machine Controller Manager.',
link: '/contribute/other-components/'
},
{
title: 'Dashboard',
details: 'Browse the developer docs for the Gardener web UI – architecture, local development setup, and testing guidelines.',
link: '/contribute/dashboard/'
},
{
title: 'Documentation',
details: 'Browse the guidelines for contributing documentation – writing style, structure, tooling, and how to add or update content.',
link: '/contribute/documentation/'
}
]"/>
