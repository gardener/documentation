---
title: Contribute
description: Contributors guides for code and documentation
persona: Developers
weight: 110
aside: false
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
    details: 'Browse the developer docs for the core Gardener functionality – development guidelines, information about networking, observability, how to extend Gardener, and more.',
    link: '/contribute/gardener/'
  },
  {
    title: 'Extensions',
    details: 'Browse the developer docs for Gardener extensions, including the extensions for infrastructure providers, DNS services, registry cache, and more.',
    link: '/contribute/extensions/'
  },
  {
    title: 'Other Components',
    details: 'Browse the developer docs for components maintained alongside Gardener, such as Dependency Watchdog, etcd-druid, Machine Controller Manager, and others.',
    link: '/contribute/other-components/'
  },
  {
    title: 'Dashboard',
    details: 'Browse the developer docs for the Gardener web UI – architecture, local development setup, contribution and testing guidelines.',
    link: '/contribute/dashboard/'
  },
  {
    title: 'Documentation',
    details: 'Browse the guidelines for contributing documentation – writing style, structure, tooling, and how to add or update content.',
    link: '/contribute/documentation/'
  }
]"/>
