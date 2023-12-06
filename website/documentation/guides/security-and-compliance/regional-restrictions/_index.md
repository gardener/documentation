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

- **No Restriction:** All seeds in all regions can be allowed to host the control plane of all shoots.
- **Restriction by Dedication:** Shoots running in a region can be configured so that only dedicated seeds in dedicated regions are allowed to host the shoot’s control plane. This can be achieved by adding labels to a seed and subsequently restricting shoot control plane placement to appropriately labeled seeds by using the field `spec.seedSelector` ([example](https://github.com/gardener/gardener/blob/v1.84.1/example/90-shoot.yaml#L365-L368)).
- **Restriction by Tainting:** Some seeds running in some dedicated regions are not allowed to host the control plane of any shoots unless explicitly allowed. This can be achieved by tainting seeds appropriately ([example](https://github.com/gardener/gardener/blob/v1.84.1/example/50-seed.yaml#L86-L88)) which in turn requires explicit tolerations if a shoot's control plane should be placed on such tainted seeds ([example](https://github.com/gardener/gardener/blob/v1.84.1/example/90-shoot.yaml#L360-L361)).