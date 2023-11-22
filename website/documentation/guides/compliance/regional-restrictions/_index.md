---
title: Regional Restrictions
description: "How Gardener supports regional restrictions"
level: advanced
category: Security
publishdate: 2023-11-22
tags: ["task"]
---

## Shared Responsibility Model

Gardener, like most cloud providers' Kubernetes offerings, is dedicated for a global setup. And just like how most cloud providers offer means to fulfil regional restrictions, Gardener also has some means built in for this purpose. Similarly, Gardener also follows a shared responsibility model where users are obliged to use the provided Gardener means in a way which results in compliance with regional restrictions.

### Regions

Gardener users need to understand that Gardener is a generic tool and has no built-in knowledge about regions as geographical or political conglomerates. For Gardener, regions are only strings. To create regional restrictions is an obligation of all Gardener users who orchestrate existing Gardener functionality to reach evidence which can be audited later on.

### Support for Regional Restrictions

Gardener offers functionality to support the most important kind of regional restrictions in its global setup:

- **No Restriction:** All Seeds in all regions can be allowed to host the control plane of all shoots.
- **Restriction by Dedication:** Shoots running in a region can be configured so that only dedicated seeds in dedicated regions are allowed to host the shoot’s control plane.
- **Restriction by Tainting:** Some seeds running in some dedicated regions are not allowed to host the control plane of any shoots unless explicitly allowed.