---
title: Organization
---

The Gardener project implements the *documentation-as-code* paradigm. Essentially this means that:
- Documentation resides close to the code it describes - in the corresponding GitHub repositories. Only documentation with regards to cross-cutting concerns that cannot be affiliated to a specific component repository is hosted in the general [gardener/documentation](https://github.com/gardener/documentation) repository.
- We use tools to develop, validate and integrate documentation *sources*
- The change management process is largely automated with automatic validation, integration and deployment using [docforge](https://github.com/gardener/docforge) and [docs-toolbelt](https://github.com/gardener/docs-toolbelt).
- The documentation sources are intended for *reuse* and *not bound* to a specific publishing platform.
- The physical organization in a repository is irrelevant for the tool support. What needs to be maintained is the intended result in a [docforge](https://github.com/gardener/docforge) documentation bundle manifest configuration, very much like virtual machines configurations, that docforge can reliably recreate in any case.
- We use GitHub as distributed, versioning storage system and [docforge](https://github.com/gardener/docforge) to pull sources in their desired state to forge documentation bundles according to a desired specification provided as a manifest.

## Content Organization

Documentation that can be affiliated to component is hosted and maintained in the component repository.

A recommended template for organizing documentation sources is to place them all in a `docs` folder and organize it there per role activity. For example:

```
repositoryX
|_ docs
   |_ usage
   |  |_ images
   |  |_ 01.png
   |  |_ hibernation.md
   |_ operations
   |_ deployment
```

Do not use folders just because they are in the template. Stick to the predefined roles and corresponding activities for naming convention. A system makes it easier to maintain and get oriented.

- User: `usage`
- Operator: `operations`
- Gardener (service) provider: `deployment`
- Gardener Developer: `development`
- Gardener Extension Developer: `extensions`


## Publishing on gardener.cloud

The Gardener website is one of the multiple optional publishing channels where the source material might end up as documentation. We use docforge and automated integration and publish process to enable transparent change
management. 

To have documentation published on the website it is necessary to use the docforge manifests available at [gardener/documentation/.docforge] adn register a reference to your documentation.

> **Note**: This is work in progress and we are transitioning to a more transparent way of integrating component
> documentation. This guide will be updated as we progress.
 
These manifests describe a particular publishing goal, i.e. using Hugo to publish on the website, and you will find out that they contain Hugo-specific front-matter properties.
Consult with the documentation maintainers for details. Use the gardener channel in slack or open a PR.