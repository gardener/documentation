---
github_repo: 'https://github.com/gardener/gardenctl-v2'
github_subdir: docs/usage
params:
  github_branch: master
path_base_for_github_subdir:
  from: content/docs/gardenctl-v2/provider-env.md
  to: provider-env.md
persona: Users
title: Provider Env
prev: false
next: false
managed: true
---

# Configure Cloud Provider CLIs with provider-env

The `provider-env` command generates a shell script to configure cloud provider CLIs (aws, az, gcloud, openstack, aliyun, hcloud) for the currently targeted shoot or managed seed. Evaluate the generated script in your shell to export the required environment variables and perform any necessary provider CLI setup.

## Basic usage

Generate and evaluate the script for your shell. Example for `bash`:

```bash
eval "$(gardenctl provider-env bash)"
```

The `gardenctl rc` aliases described in the [Recommended Shell Configuration](/docs/gardenctl-v2/#recommended-shell-configuration) provide shortcuts for these commands: `gp` for the default provider environment and `gpc` for `--control-plane`.

Alternatively, you can generate the script for other shells using subcommands: `bash`, `zsh`, `fish`, `powershell`.

The generated script:
- Sets provider-specific environment variables for the target
- Uses a temporary session directory so your default CLI configs are not modified
- Supports `--unset` to clean up and log out/revoke credentials

> [!NOTE]
> `provider-env` can resolve provider credentials for shoots and managed seeds. It cannot generate provider credentials for non-managed seeds.

Ensure the respective provider CLI is installed on your system. See the `gardenctl provider-env` [help](/docs/gardenctl-v2/help/gardenctl_provider-env/#synopsis) for links.

## Overriding templates or adding custom providers

To override templates or add support for an out-of-tree provider, place a template file under the `templates` directory in your gardenctl home (`$GCTL_HOME` or `$HOME/.garden`). Use existing templates under `pkg/env/templates/` as reference.

## OpenStack: Allowed `authURL` patterns (required)

For OpenStack targets, `gardenctl` validates the `authURL` (the OpenStack Keystone authentication endpoint) from the credentials against a list of allowed patterns.  
You can configure allowed patterns via the gardenctl configuration file or via command-line flags.

> [!NOTE]
> - **You must configure** these allowed patterns; otherwise `provider-env` will fail with a validation error for OpenStack.
> - There are **no built-in defaults** because OpenStack auth endpoints are installation-specific.

### Configure via gardenctl config

Use the `gardenctl config set-openstack-authurl` command to configure allowed OpenStack auth endpoints. Example:

```bash
# Set allowed authURL (replaces existing patterns)
gardenctl config set-openstack-authurl --uri-pattern https://keystone.example.com:5000/v3

# Set multiple authURLs (replaces existing patterns)
gardenctl config set-openstack-authurl \
  --uri-pattern https://keystone.example.com:5000/v3 \
  --uri-pattern https://keystone.another.com/v3

# Clear all authURL patterns
gardenctl config set-openstack-authurl --clear
```

Alternatively, you can manually edit the config file at `~/.garden/gardenctl-v2.yaml`:

```yaml
provider:
  openstack:
    allowedPatterns:
    - field: authURL
      uri: https://keystone.example.com:5000/v3
```

### Configure via command-line flags

You can augment configuration with flags when running `provider-env`:

- `--openstack-allowed-uri-patterns` allows a simplified `field=uri` syntax. Example:
  
  ```bash
  gardenctl provider-env bash \
    --openstack-allowed-uri-patterns="authURL=https://keystone.example.com:5000/v3"
  ```

For GCP, gardenctl uses built-in default validation patterns for standard endpoints; custom configuration via flags or config is not supported.
