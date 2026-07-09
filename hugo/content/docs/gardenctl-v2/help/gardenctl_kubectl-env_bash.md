---
github_repo: 'https://github.com/gardener/gardenctl-v2'
github_subdir: docs/help
params:
  github_branch: master
path_base_for_github_subdir:
  from: content/docs/gardenctl-v2/help/gardenctl_kubectl-env_bash.md
  to: gardenctl_kubectl-env_bash.md
title: Gardenctl Kubectl Env Bash
prev: false
next: false
managed: true
---

# Gardenctl Kubectl Env Bash

## gardenctl kubectl-env bash

Generate a script that points KUBECONFIG to the targeted cluster for bash

### Synopsis

Generate a script that points KUBECONFIG to the targeted cluster for bash.

To load the kubectl configuration script in your current shell session:
$ eval "$(gardenctl kubectl-env bash)"

To apply this setting automatically in every shell session, consider adding the command at the end of your ~/.bashrc file.

```
gardenctl kubectl-env bash [flags]
```

### Options

```
  -h, --help   help for bash
```

### Options inherited from parent commands

```
      --access-level string                 Override the default kubeconfig access level when targeting shoots or seeds. One of "admin", "viewer", "auto".
      --add-dir-header                      If true, adds the file directory to the header of the log messages
      --admin                               shorthand for --access-level=admin
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
  -u, --unset                               Generate the script to unset the KUBECONFIG environment variable for 
  -v, --v Level                             number for the log level verbosity
      --viewer                              shorthand for --access-level=viewer
      --vmodule moduleSpec                  comma-separated list of pattern=N settings for file-filtered logging
```

### SEE ALSO

* [gardenctl kubectl-env](/docs/gardenctl-v2/help/gardenctl_kubectl-env/)	 - Generate a script that points KUBECONFIG to the targeted cluster for the specified shell
