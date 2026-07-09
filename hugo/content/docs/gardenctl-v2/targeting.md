---
github_repo: 'https://github.com/gardener/gardenctl-v2'
github_subdir: docs/usage
params:
  github_branch: master
path_base_for_github_subdir:
  from: content/docs/gardenctl-v2/targeting.md
  to: targeting.md
persona: Users
title: Targeting
prev: false
next: false
managed: true
---

# Targeting
You can set a target to use it in subsequent commands.

The target has a hierarchical structure that looks like this:
```
garden
├── project 
│   └── shoot
│       └── control-plane
└── seed
```
You can show the current target with `gardenctl target view`.

## Arguments

Set the target by setting the values in sequence.
```
# target garden
gardenctl target garden landscape-dev

# target project
gardenctl target project my-project

# target shoot
gardenctl target shoot my-shoot

# target control plane of my-shoot
#gardenctl target control-plane
```

## Flags

You can also use target flags to modify the target. Using flags, you can set the target with one command.
```
# target shoot
gardenctl target --garden landscape-dev --project my-project --shoot my-shoot

# target control plane
gardenctl target --garden landscape-dev --project my-project --shoot my-shoot --control-plane
```

The target flags can be used with other commands as well. If used with other commands than target, they will
not modify the current target though. In these cases the current target will be overwritten with the provided target values for
the command execution.

## Patterns

You can define patterns for each garden in the `gardenctl` configuration. Each pattern is a regex which allows to
target clusters with custom patterns. This allows you define individual patterns, e.g. to target clusters via
domains.

For example,the following pattern allows you to target clusters using a dashboard domain:
```
https://dashboard\.gardener\.cloud/namespace/(?P<namespace>[^/]+)/shoots/(?P<shoot>[^/]+)
```
The following command would then target the shoot `my-cluster` in the project with namespace `garden-my-project` for the garden where this pattern is defined in the configuration:
```
gardenctl target https://dashboard.gardener.cloud/namespace/garden-my-project/shoots/my-cluster
```

If a target is not complete, e.g. if the project is missing, it may be completed automatically. However, this is only
possible if the target can be identified unambiguously. Moreover, if a garden has already been targeted, subsequent target
commands will prefer this garden but the garden may be changed, if another garden can be identified unambiguously, e.g.
by using a target pattern with a prefix that is unique for a garden.

## Unset
Using the target command, you can unset target values. Please notice that unsetting a deeper target level will also unset
its leafs. Example:

```bash
# target control plane
gardenctl target --garden landscape-dev --project my-project --shoot my-shoot --control-plane

# unset control plane, shoot will still be targeted
gardenctl target unset control-plane

# unset project, will unset shoot as well, garden will still be targeted
gardenctl target unset project
```
