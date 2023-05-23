---
title: Pull Request Description
---

<!-- contains only public information -->

## Overview

When opening a pull request, it is best to give all the necessary details in order to help out the reviewers understand your changes and why you are proposing them. Here is the template that you will need to fill out:

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
- Be as descriptive as needed.
- Only use lists if you are describing multiple different additions.
- You can freely use [markdown formatting](../documentation/formatting-guide/_index.md#formatting-of-inline-elements), including links.

You can find various examples in the Releases sections of the [gardener/documentation](https://github.com/gardener/documentation/releases) and [gardener/gardener](https://github.com/gardener/gardener/releases) repositories.