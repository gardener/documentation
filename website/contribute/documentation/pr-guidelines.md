---
title: Pull Request Creation Guidelines
aliases: ["/docs/contribute/documentation/pr-description"]
---

<!-- contains only public information -->

## Overview

When opening a pull request (PR), there are certain guidelines to follow in regards to clarity, formatting, and descriptiveness. This will help reviewers better understand your proposal.

## Writing a Commit Message/PR Title

When writing a commit message or a PR title, consider the following guidelines:

- Use the imperative, present tense:

    Prefer

    ```md
    Add the super cool feature
    Fix the super important issue
    ```

    instead of

    ```md
    Added the super cool feature
    Fixed the super important issue
    ```

- Follow the [Formatting of Inline Elements guide](./formatting-guide.md#formatting-of-inline-elements):

    Use

    ```md
    Deploy a `Pod`
    Add deprecation notice for `SecretBinding`s
    ```

    instead of

    ```md
    Deploy a pod
    Added deprecation notice for "secretBinding"
    ```

## Writing a PR Description

It is best to give all the necessary details in the PR description in order to help out the reviewers understand your changes and why you are proposing them. Here is the template that you will need to fill out:

```md
**What this PR does / why we need it**:
<!-- Describe the purpose of this PR and what changes have been proposed in it -->
**Which issue(s) this PR fixes**:
Fixes #
<!-- If you are opening a PR in response to a specific issue, linking it will automatically 
close the issue once the PR has been merged -->
**Special notes for your reviewer**:
<!-- Any additional information your reviewer might need to know to better process your PR -->
**Release note**:
<!--  Write your release note:
1. Enter your release note in the below block.
2. If no release note is required, just write "NONE" within the block.

Format of block header: <category> <target_group>
Possible values:
- category:       improvement|noteworthy|action
- target_group:   user|operator|developer
-->
```other operator
EXAMPLE
\```
```

## Writing Release Notes

Some guidelines and tips for writing release notes include:

- Be as descriptive as needed
- Only use lists if you are describing multiple different additions
- You can freely use [markdown formatting](./formatting-guide.md#formatting-of-inline-elements), including links

You can find various examples in the Releases sections of the [gardener/documentation](https://github.com/gardener/documentation/releases) and [gardener/gardener](https://github.com/gardener/gardener/releases) repositories.
