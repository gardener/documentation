---
title: Contribute
description: Contributors guides for code and documentation
persona: Developers
weight: 110
aside: false
---

# Welcome to the Contributor page of Gardener

This page is for anyone interested in contributing to Gardener. It contains information about the architecture, processes, and guidelines behind developing and documenting Gardener.

We appreciate all kinds of contributions – from fixing a typo to implementing a new feature.

## Get Started

<CardGrid :cards="[
  {
    title: 'How to Contribute',
    details: 'Discover the steps for contributing, licensing requirements, and many useful tips',
    link: 'https://gardener.cloud/contribute/contribution-process/how-to-contribute.md'
  },
  {
    title: 'Start Developing',
    details: 'Set up and deploy Gardener locally. Explore key development guidelines, such as testing, validation, and dependency management',
    link: 'https://gardener.cloud/contribute/start-developing/'
  }
]"/>

## Contribute to a Specific Area

<CardGrid :cards="[
  {
    title: 'Gardener',
    details: 'Main developer documentation for the Gardener project – development guidelines, information about networking, observability, how to extend Gardener, and more',
    link: 'https://gardener.cloud/contribute/gardener/'
  },
  {
    title: 'Extensions',
    details: 'Developer documentation for Gardener extensions, including extensions for infrastructure providers, DNS services, registry cache, node audit logging, and Kubernetes auditing',
    link: 'https://gardener.cloud/contribute/extensions/'
  },
  {
    title: 'Other Components',
    details: 'Developer documentation for components maintained alongside Gardener, such as Dependency Watchdog, etcd-druid, Machine Controller Manager, and others',
    link: 'https://gardener.cloud/contribute/other-components/'
  },
  {
    title: 'Dashboard',
    details: 'Developer documentation for the Gardener web UI – architecture, local development setup, contribution and testing guidelines',
    link: 'https://gardener.cloud/contribute/dashboard/'
  },
  {
    title: 'Documentation',
    details: 'Guidelines for contributing to the Gardener documentation – writing style, structure, tooling, and how to add or update content',
    link: 'https://gardener.cloud/contribute/documentation/'
  }
]"/>
