---
github_repo: 'https://github.com/gardener/gardenctl-v2'
github_subdir: docs/help
params:
  github_branch: master
path_base_for_github_subdir:
  from: content/docs/gardenctl-v2/help/gardenctl_rc.md
  to: gardenctl_rc.md
title: Gardenctl Rc
prev: false
next: false
managed: true
---

# Gardenctl Rc

## gardenctl rc

Generate a gardenctl startup script for the specified shell

### Synopsis

Generate a gardenctl startup script for the specified shell that contains various tweaks,
such as setting environment variables, loading completions and adding some helpful aliases or functions.

See each sub-command's help for details on how to use the generated shell startup script.

### Options

```
  -h, --help   help for rc
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
* [gardenctl rc bash](/docs/gardenctl-v2/help/gardenctl_rc_bash/)	 - Generate a gardenctl startup script for bash
* [gardenctl rc fish](/docs/gardenctl-v2/help/gardenctl_rc_fish/)	 - Generate a gardenctl startup script for fish
* [gardenctl rc powershell](/docs/gardenctl-v2/help/gardenctl_rc_powershell/)	 - Generate a gardenctl startup script for powershell
* [gardenctl rc zsh](/docs/gardenctl-v2/help/gardenctl_rc_zsh/)	 - Generate a gardenctl startup script for zsh
