---
github_repo: 'https://github.com/gardener/gardenctl-v2'
github_subdir: docs/help
params:
  github_branch: master
path_base_for_github_subdir:
  from: content/docs/gardenctl-v2/help/gardenctl_config.md
  to: gardenctl_config.md
title: Gardenctl Config
prev: false
next: false
managed: true
---

# Gardenctl Config

## gardenctl config

Modify gardenctl configuration file using subcommands

### Synopsis

Modify gardenctl files using subcommands like "gardenctl config set-garden my-garden"

The loading order follows these rules:
1. If the --config flag is set, then only that file is loaded.
1. If $GCTL_HOME environment variable is set, then it is used as primary search path for the config file. The secondary search path of the home directory is ${HOME}/.garden/.
1. If $GCTL_CONFIG_NAME environment variable is set, then it is used as config filename. Otherwise, the config filename will default to gardenctl-v2. The config name must not include the file extension

### Options

```
  -h, --help   help for config
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
* [gardenctl config delete-garden](/docs/gardenctl-v2/help/gardenctl_config_delete-garden/)	 - Delete the specified garden from the gardenctl configuration
* [gardenctl config set-garden](/docs/gardenctl-v2/help/gardenctl_config_set-garden/)	 - Modify or add a garden to the gardenctl configuration
* [gardenctl config set-openstack-authurl](/docs/gardenctl-v2/help/gardenctl_config_set-openstack-authurl/)	 - Configure allowed OpenStack auth URLs
* [gardenctl config view](/docs/gardenctl-v2/help/gardenctl_config_view/)	 - Print the gardenctl configuration
