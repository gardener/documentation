---
title: "Streamlining Dependencies: The New Gardener API Go Submodule"
linkTitle: "Streamlining Dependencies: The New Gardener API Go Submodule"
newsSubtitle: March 04, 2026
publishdate: 2026-03-04
authors:
- avatar: https://avatars.githubusercontent.com/LucaBernstein
  login: LucaBernstein
  name: Luca Bernstein
aliases: ["/blog/2026/03/04/streamlining-dependencies-the-new-gardener-api-go-submodule"]
---

For developers building tools and extensions that interact with Gardener, a long-standing challenge has been the need to import the entire `gardener/gardener` repository, even when only the API type definitions were required. This practice pulled in a large number of dependencies, increasing the footprint and complexity of dependent projects.

With the release of Gardener v1.137, this is changing. We are pleased to introduce a dedicated Go submodule for the Gardener API types, making them more modular and easier to consume.

### A Lighter Way to Import Gardener APIs

The core of this change is the introduction of `github.com/gardener/gardener/pkg/apis` as its own Go module. Projects that only need to work with Gardener's API objects can now import this submodule specifically, without inheriting the full dependency tree of the main Gardener repository.

This results in a significantly smaller dependency footprint, simplifying dependency management and speeding up build times for a wide range of tools in the Gardener ecosystem.

### How It Works

To achieve this separation, we have refactored the Gardener codebase. The API type definitions and essential functionality remain in the new `pkg/apis` submodule. The associated helper and validation logic, which often carries heavier dependencies, has been moved to a new `pkg/api` package within the main `gardener/gardener` module.

This change not only benefits external developers but also improves the internal separation of concerns within the Gardener project itself.

### What This Means for Developers

This is a breaking change for developers who depend on Gardener. When updating to version 1.137 or later, you will need to make the following adjustments:

1.  **Update `go.mod`:** Add a new entry for the API submodule. Your `go.mod` file will now contain separate `require` directives for both the main module and the new apis submodule, for example:
    ```go
    require (
        github.com/gardener/gardener/pkg/apis <version>
        github.com/gardener/gardener/gardener <version>
    )
    ```

2.  **Update Import Paths:** Due to the extensive refactoring, many package paths have changed. For instance, validation and helper packages have been moved from `pkg/apis/...` to `pkg/api/...`, and component configurations have also been relocated.

To make this transition as smooth as possible, we have created a Gist with a series of shell commands that programmatically update the import paths in your project.

**[You can find the migration script in this Gist](https://gist.github.com/LucaBernstein/a0a4bd39fb1232511ed0b65432fff653)**

This change is a significant first step toward greater modularity. In the future, we may look at extracting other components, such as the extension library, into their own submodules.

### Further Reading

*   [Community Meeting Recording](https://youtu.be/axIwAmhJ_Hw?t=1401)
*   [Original Pull Request on GitHub](https://github.com/gardener/gardener/pull/13536)