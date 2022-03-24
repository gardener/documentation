---
title: Can Kubernetes upgrade automatically?
---

There is no automatic migration of major/minor versions of Kubernetes. You need to update your clusters manually or press the *Upgrade* button in the Dashboard.

Before updating a cluster you should be aware of the potential errors this might cause. The following video will dive into a Kubernetes outage in production that Monzo experienced, its causes and effects, and the architectural and operational lessons learned.

<iframe width="560" height="315" src="https://www.youtube.com/embed/OUYTNywPk-s" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

It is therefore recommended to first update your test cluster and validate it before performing changes on a productive environment.
