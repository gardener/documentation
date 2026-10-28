---
aside: false
description: Contributor guides for code and documentation
persona: Developers
title: Contribute
weight: 110
prev: false
next: false
---
<!-- BANNER:LOCAL -->
<!--
   █▀█ █▄▀
   █ █ █▀▄
   ▀▀▀ ▀ ▀

   ┌────────────────────────────────────────────────┐
   │  LOCAL FILE — maintained in gardener/            │
   │  documentation.                                  │
   │                                                  │
   │  Go ahead and edit this file directly.           │
   │  Changes here are the source of truth.           │
   └────────────────────────────────────────────────┘
-->


# Welcome to the Contributor Page of Gardener

This page is your starting point for contributing to Gardener. It contains all documentation related to developing and documenting Gardener.

We appreciate all kinds of contributions – from fixing a typo to implementing a new feature. Let's grow Gardener together!

## Get Started

<CardGrid :columns="2" :cards="[
{
title: 'Contribution Process',
details: 'Learn how to contribute to Gardener, including contribution workflows, licensing requirements, and best practices.',
link: '/contribute/contribution-process/'
},
{
title: 'Developer Starter Kit',
details: 'Set up and deploy Gardener locally. Explore key development guidelines, such as testing, validation, and dependency management guidelines.',
link: '/contribute/developer-starter-kit/'
}
]"/>

## Choose How to Contribute

<CardGrid :cards="[
{
title: 'Contribute to the Core',
details: 'Development guidelines and information for working on the core Gardener functionality.',
link: '/contribute/gardener/'
},
{
title: 'Build Extensions',
details: 'CRD conventions, health checks, admission webhooks, and lifecycle management for new extensions.',
link: '/contribute/build-extensions/'
},
{
title: 'Work on Existing Extensions',
details: 'Developer docs for the Gardener extensions for infrastructure providers, DNS, registry cache, and more.',
link: '/contribute/extensions/'
},
{
title: 'Contribute to Existing Components',
details: 'Developer docs for Dependency Watchdog, etcd-druid, and Machine Controller Manager.',
link: '/contribute/other-components/'
},
{
title: 'Contribute to the Dashboard',
details: 'Architecture, local development setup, and testing guidelines for the Gardener web UI.',
link: '/contribute/dashboard/'
},
{
title: 'Write Documentation',
details: 'Writing style, content structure, tooling, and guidelines for writing documentation and other content for Gardener.',
link: '/contribute/documentation/'
}
]"/>
