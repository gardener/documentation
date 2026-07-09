---
github_repo: 'https://github.com/gardener/gardenctl-v2'
github_subdir: docs/help
params:
  github_branch: master
path_base_for_github_subdir:
  from: content/docs/gardenctl-v2/help/gardenctl_target.md
  to: gardenctl_target.md
title: Gardenctl Target
prev: false
next: false
managed: true
---

# Gardenctl Target

## gardenctl target

Set scope for next operations, using subcommands or pattern

```
gardenctl target [flags]
```

### Examples

```
# target project "my-project" of garden "my-garden"
gardenctl target --garden my-garden --project my-project

# target shoot "my-shoot" of currently selected project
gardenctl target shoot my-shoot

# Target shoot control-plane using values that match a pattern defined for a specific garden
gardenctl target value/that/matches/pattern --control-plane
```

### Options

```
      --access-level string   Override the default kubeconfig access level when targeting shoots or seeds. One of "admin", "viewer", "auto".
      --admin                 shorthand for --access-level=admin
      --control-plane         target control plane of shoot, use together with shoot argument
      --garden string         target the given garden cluster
  -h, --help                  help for target
      --project string        target the given project
      --seed string           target the given seed cluster
      --shoot string          target the given shoot cluster
      --viewer                shorthand for --access-level=viewer
```

### Options inherited from parent commands

```
      --add-dir-header                      If true, adds the file directory to the header of the log messages
      --alsologtostderr                     log to standard error as well as files (no effect when -logtostderr=true)
      --alsologtostderrthreshold severity   logs at or above this threshold go to stderr when -alsologtostderr=true (no effect when -logtostderr=true)
      --config string                       config file (default is ~/.garden/gardenctl-v2.yaml)
      --legacy-stderr-threshold-behavior    If true, stderrthreshold is ignored when logtostderr=true (legacy behavior). If false, stderrthreshold is honored even when logtostderr=true (default true)
      --log-backtrace-at traceLocation      when logging hits line file:N, emit a stack trace (default :0)
      --log-dir string                      If non-empty, write log files in this directory (no effect when -logtostderr=true)
      --log-file string                     If non-empty, use this log file (no effect when -logtostderr=true)
      --log-file-max-size uint              Defines the maximum size a log file can grow to (no effect when -logtostderr=true). Unit is megabytes. If the value is 0, the maximum file size is unlimited. (default 1800)
      --logtostderr                         log to standard error instead of files (default true)
      --one-output                          If true, only write logs to their native severity level (vs also writing to each lower severity level; no effect when -logtostderr=true)
      --skip-headers                        If true, avoid header prefixes in the log messages
      --skip-log-headers                    If true, avoid headers when opening log files (no effect when -logtostderr=true)
      --stderrthreshold severity            logs at or above this threshold go to stderr when writing to files and stderr (no effect when -logtostderr=true or -alsologtostderr=true unless -legacy_stderr_threshold_behavior=false) (default 2)
  -v, --v Level                             number for the log level verbosity
      --vmodule moduleSpec                  comma-separated list of pattern=N settings for file-filtered logging
```

### SEE ALSO

* [gardenctl](/docs/gardenctl-v2/help/gardenctl/)	 - Gardenctl is a utility to interact with Gardener installations
* [gardenctl target control-plane](/docs/gardenctl-v2/help/gardenctl_target_control-plane/)	 - Target the control plane of the shoot
* [gardenctl target garden](/docs/gardenctl-v2/help/gardenctl_target_garden/)	 - Target a garden
* [gardenctl target project](/docs/gardenctl-v2/help/gardenctl_target_project/)	 - Target a project
* [gardenctl target seed](/docs/gardenctl-v2/help/gardenctl_target_seed/)	 - Target a seed
* [gardenctl target shoot](/docs/gardenctl-v2/help/gardenctl_target_shoot/)	 - Target a shoot
* [gardenctl target unset](/docs/gardenctl-v2/help/gardenctl_target_unset/)	 - Unset target
* [gardenctl target view](/docs/gardenctl-v2/help/gardenctl_target_view/)	 - Print the current target
