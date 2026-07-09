---
github_repo: 'https://github.com/gardener/gardenctl-v2'
github_subdir: docs/help
params:
  github_branch: master
path_base_for_github_subdir:
  from: content/docs/gardenctl-v2/help/gardenctl_config_set-openstack-authurl.md
  to: gardenctl_config_set-openstack-authurl.md
title: Gardenctl Config Set Openstack Authurl
prev: false
next: false
managed: true
---

# Gardenctl Config Set Openstack Authurl

## gardenctl config set-openstack-authurl

Configure allowed OpenStack auth URLs

### Synopsis

Configure allowed OpenStack auth URLs for provider environment validation.

This command allows you to set one or more OpenStack auth URLs that will be allowed
when using the provider-env command. By default, setting new URIs will replace any
existing authURL patterns in the configuration.

```
gardenctl config set-openstack-authurl [flags]
```

### Examples

```
# Set single authURL (replaces existing)
gardenctl config set-openstack-authurl --uri-pattern https://keystone.example.com:5000/v3

# Set multiple authURLs (replaces existing)
gardenctl config set-openstack-authurl \
  --uri-pattern https://keystone.example.com:5000/v3 \
  --uri-pattern https://keystone.another.com/v3

# Clear all authURL patterns
gardenctl config set-openstack-authurl --clear
```

### Options

```
      --clear                     Clear all OpenStack authURL patterns from the configuration
  -h, --help                      help for set-openstack-authurl
      --uri-pattern stringArray   OpenStack auth URL to allow. May be specified multiple times. Setting URIs will replace any existing authURL patterns.
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

* [gardenctl config](/docs/gardenctl-v2/help/gardenctl_config/)	 - Modify gardenctl configuration file using subcommands
