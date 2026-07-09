---
github_repo: 'https://github.com/gardener/gardenctl-v2'
github_subdir: docs/help
params:
  github_branch: master
path_base_for_github_subdir:
  from: content/docs/gardenctl-v2/help/gardenctl_provider-env.md
  to: gardenctl_provider-env.md
title: Gardenctl Provider Env
prev: false
next: false
managed: true
---

# Gardenctl Provider Env

## gardenctl provider-env

Generate the cloud provider CLI configuration script for the specified shell

### Synopsis

Generate the cloud provider CLI configuration script for the specified shell.
See each sub-command's help for details on how to use the generated script.

The generated script sets the environment variables for the cloud provider CLI of the targeted shoot.
When targeting a shoot control plane, the generated script configures the provider CLI for the seed
infrastructure account that hosts that control plane.
Only managed seeds are supported, because gardenctl needs the backing shoot to resolve the seed
infrastructure credentials.
In addition, the Azure CLI requires to sign in with a service principal and the gcloud CLI requires to activate a service-account.
Thereby the configuration location of the corresponding cloud provider CLI is pointed to a temporary folder in the
session directory, so that the standard configuration files in the user's home folder are not affected.
By using the --unset flag you can force a logout or revoke the service-account.

The CLI of a corresponding cloud provider must be installed.
Please refer to the installation instructions of the respective provider:
* Amazon Web Services (aws) - https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html
* Microsoft Azure (az) - https://docs.microsoft.com/cli/azure/install-azure-cli
* Google cloud (gcloud) - https://cloud.google.com/sdk/docs/install
* Openstack (openstack) - https://docs.openstack.org/newton/user-guide/common/cli-install-openstack-command-line-clients.html
* Alibaba cloud (aliyun) - alicloud - https://www.alibabacloud.com/help/product/29991.htm
* Hetzner cloud (hcloud) - https://community.hetzner.com/tutorials/howto-hcloud-cli

To overwrite the default templates or add support for custom (out of tree) cloud providers place a template
for the respective provider in the "templates" folder of the gardenctl home directory ($GCTL_HOME or $HOME/.garden).
Please refer to the templates of the already supported cloud providers which can be found
here https://github.com/gardener/gardenctl-v2/tree/master/pkg/cmd/env/templates.

For shoots of provider type openstack, the authURL field must be validated against allowed patterns.
There are no built-in default allowed patterns for OpenStack because auth endpoints are installation-specific,
so you must explicitly configure allowed authURL patterns.

Use 'gardenctl config set-openstack-authurl --uri-pattern https://keystone.example.com:5000/v3' to configure allowed auth URLs.
See 'gardenctl config set-openstack-authurl --help' for more details.
Alternatively, you can use the --openstack-allowed-patterns or --openstack-allowed-uri-patterns flags for runtime overrides.

```
gardenctl provider-env [flags]
```

### Options

```
  -y, --confirm-access-restriction                    Confirm any access restrictions. Set this flag only if you are completely aware of the access restrictions.
      --control-plane                                 target control plane of shoot, use together with shoot argument
  -f, --force                                         Deprecated. Use --confirm-access-restriction instead. Generate the script even if there are access restrictions to be confirmed.
      --garden string                                 target the given garden cluster
  -h, --help                                          help for provider-env
      --openstack-allowed-patterns stringArray        Additional allowed patterns for OpenStack credential fields in JSON format.
                                                      Note: Only the 'authURL' field is supported for OpenStack pattern validation.
                                                      Each pattern should be a JSON object with fields like:
                                                      {"field": "authURL", "host": "keystone.example.com"}
                                                      {"field": "authURL", "host": "keystone.example.com", "path": "/v3"}
                                                      {"field": "authURL", "regexValue": "^https://[a-z0-9.-]+\\.example\\.com(:[0-9]+)?/.*$"}
                                                      These are merged with defaults and configuration.
      --openstack-allowed-uri-patterns strings        Simplified URI patterns for OpenStack credential fields in the format 'field=uri'.
                                                      Note: Only the 'authURL' field is supported for OpenStack pattern validation.
                                                      For example:
                                                      "authURL=https://keystone.example.com:5000/v3"
                                                      "authURL=https://keystone.example.com/identity/v3"
                                                      The URI is parsed and host and path are set accordingly. These are merged with defaults and configuration.
  -o, --output string                                 One of 'yaml' or 'json'.
      --project string                                target the given project
      --seed string                                   target the given seed cluster
      --shoot string                                  target the given shoot cluster
      --stackit-allowed-patterns stringArray          Additional allowed patterns for STACKIT credential fields in JSON format.
                                                      Note: Only the 'aud' field in the serviceaccount under credentials is supported for STACKIT pattern validation.
                                                      Each pattern should be a JSON object with fields like:
                                                      {"field": "aud", "host": "https://example.com"}
                                                      {"field": "aud", "regexValue": "^https://[a-z0-9.-]+\\.example\\.com(:[0-9]+)?/.*$"}
                                                      These are merged with defaults and configuration.
      --stackit-allowed-uri-patterns strings          Simplified URI patterns for STACKIT credential fields in the format 'field=uri'.
                                                      Note: Only the 'aud' field in the serviceaccount under credentials is supported for STACKIT pattern validation.
                                                      For example:
                                                      "aud=https://example.com"
                                                      The URI is parsed and host and path are set accordingly. These are merged with defaults and configuration.
  -u, --unset                                         Generate the script to unset the cloud provider CLI environment variables and logout.
      --workload-identity-token-expiration duration   Requested expiration for workload identity tokens. The server may enforce a maximum. (default 1h0m0s)
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
* [gardenctl provider-env bash](/docs/gardenctl-v2/help/gardenctl_provider-env_bash/)	 - Generate the cloud provider CLI configuration script for bash
* [gardenctl provider-env fish](/docs/gardenctl-v2/help/gardenctl_provider-env_fish/)	 - Generate the cloud provider CLI configuration script for fish
* [gardenctl provider-env powershell](/docs/gardenctl-v2/help/gardenctl_provider-env_powershell/)	 - Generate the cloud provider CLI configuration script for powershell
* [gardenctl provider-env zsh](/docs/gardenctl-v2/help/gardenctl_provider-env_zsh/)	 - Generate the cloud provider CLI configuration script for zsh
