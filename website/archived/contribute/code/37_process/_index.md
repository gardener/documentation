---
title: Process
remote: https://github.com/gardener/gardener/blob/master/docs/development/process.md
---
# Creating a new Feature

If you want to contribute to  Gardener, please do that always on a dedicated branch on your own fork named after the purpose of the code changes, for example `feature/helm-integration`.
Please do not forget to rebase your branch **regularly**.

If you have finished your work, please create a pull request **based on `master`**. It will be reviewed and merged if no further changes are requested from you.

> [!WARNING]
> Please ensure that your modifications pass the lint checks, formatting checks, static code checks, and unit tests by executing.

```bash
make verify
```

Please do not file your pull request unless you receive a successful response from here!

## Creating a new Release

Please refer to the [Gardener contributor guide](../../_index.md).
