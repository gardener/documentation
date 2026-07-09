---
github_repo: 'https://github.com/gardener/gardenctl-v2'
github_subdir: docs/help
params:
  github_branch: master
path_base_for_github_subdir:
  from: content/docs/gardenctl-v2/help/gardenctl_resolve_shoot.md
  to: gardenctl_resolve_shoot.md
title: Gardenctl Resolve Shoot
prev: false
next: false
managed: true
---

# Gardenctl Resolve Shoot

## gardenctl resolve shoot

Resolve shoot for the current target

### Synopsis

Resolve shoot for the current target.
This command is particularly useful when you need to understand which shoot the current target translates to, regardless of whether a seed or a shoot is targeted.
It fetches and displays information about its associated garden, project, seed, and shoot, including any access restrictions in place.
A garden and either a seed or shoot must be specified, either from a previously saved target or directly via target flags. Target flags temporarily override the saved target for the current command run.

```
gardenctl resolve shoot [flags]
```

### Examples

```
# Resolve shoot for managed seed
gardenctl resolve shoot --garden mygarden --seed myseed

# Resolve shoot. Output in json format
gardenctl resolve shoot --garden mygarden --shoot myseed -ojson

# Resolve shoot cluster details for a shoot that might have the same name as others across different projects
# Use fully qualified target flags to specify the correct garden, project, and shoot
gardenctl resolve shoot --garden mygarden --project myproject --shoot myshoot
```

### Options

```
      --control-plane    target control plane of shoot, use together with shoot argument
      --garden string    target the given garden cluster
  -h, --help             help for shoot
  -o, --output string    One of 'yaml' or 'json'. (default "yaml")
      --project string   target the given project
      --seed string      target the given seed cluster
      --shoot string     target the given shoot cluster
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

* [gardenctl resolve](/docs/gardenctl-v2/help/gardenctl_resolve/)	 - Resolve the current target
