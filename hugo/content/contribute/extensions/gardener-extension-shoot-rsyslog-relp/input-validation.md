---
github_repo: 'https://github.com/gardener/gardener-extension-shoot-rsyslog-relp'
github_subdir: docs/development
params:
  github_branch: main
path_base_for_github_subdir:
  from: >-
    content/contribute/extensions/gardener-extension-shoot-rsyslog-relp/input-validation.md
  to: input-validation.md
persona: Developers
title: Input Validation
prev: false
next: false
managed: true
---

# Validation Guidelines for Gardener Shoot Rsyslog Relp Extension

This document provides developer guidelines on validation practices and conventions used in the `gardener-extension-shoot-rsyslog-relp` codebase so that the rsyslog and auditd configurations on the Shoot nodes behave as expected and are not vulnerable to malicious input.

For general guidelines on input validation in Gardener, refer to the [Validation Guidelines](/contribute/developer-starter-kit/validation-guidelines/) document in the Gardener repository.

## Validation in the `shoot-rsyslog-relp` extension

The `shoot-rsyslog-relp` extension exposes two APIs, which can be used to configure the rsyslog and auditd daemons running on Shoot nodes:
- [`RsyslogRelpConfig`](https://github.com/gardener/gardener-extension-shoot-rsyslog-relp/blob/main/pkg/apis/rsyslog/types_rsyslog.go) is used to configure rsyslog and is provided as an entry in the `spec.extensions` field array of Gardener Shoots.
  See the [Shoot Configuration](/docs/extensions/others/gardener-extension-shoot-rsyslog-relp/configuration/#shoot-configuration) documentation for more information.
- [`Auditd`](https://github.com/gardener/gardener-extension-shoot-rsyslog-relp/blob/main/pkg/apis/rsyslog/types_auditd.go) is used to configure audit rules and is provided as a data field in a ConfigMap which must be referenced from the `RsyslogRelpConfig`.
  See the [Configuring the Audit Daemon on the Shoot Nodes](/docs/extensions/others/gardener-extension-shoot-rsyslog-relp/configuration/#configuring-the-audit-daemon-on-the-shoot-nodes) documentation for more information.

Validation of these APIs is enforced by an admission webhook that acts on create and update requests for Shoots.

When processing a create or update request for a Shoot, the admission identifies the `shoot-rsyslog-relp` extension entry in the Shoot's `spec.extensions` array by looking for an entry that has type `shoot-rsyslog-relp`. If such an entry does not exist, or if the extension is disabled, the validation is skipped.

When the `shoot-rsyslog-relp` extension entry is present and is not disabled, the validator decodes the entry's `providerConfig` field into an `RsyslogRelpConfig` struct by using strict decoding, so that proper schema validation is performed.

The `RsyslogRelpConfig` struct is validated according to the rules specified in the [Rsyslog Config File](#rsyslog-config-file) section below, including regex validation of string fields and the presence of required fields when features are enabled.

If a Secret that contains the TLS certificates, or a ConfigMap that contains the `Auditd` settings are provided, they are also validated by this admission webhook. More information on those is available in the [TLS Secret](#tls-secret) and [`Auditd` Configuration](#auditd-configuration) sections, respectively.

Note that the Secret and ConfigMap are enforced to be immutable.
This is necessary because the admission webhook only reacts to Shoot updates, not to updates of the referenced resources.
When the user wants to change something in either the Secret or the ConfigMap, new resources must be created and the corresponding entries in the Shoot's `spec.resources` array field must be updated to point to the new resources.
This Shoot update triggers the admission webhook, which validates both the updated Shoot configuration and the newly referenced resources.

For more details on the implementation of the admission webhook check the [`pkg/admission/validator/shoot.go`](https://github.com/gardener/gardener-extension-shoot-rsyslog-relp/blob/main/pkg/admission/validator/shoot.go) file.

Any new APIs added in the future must be validated in a similar way.

### Validation of Rsyslog and Auditd Configuration

The `shoot-rsyslog-relp` extension installs a couple of files on the Shoot's nodes that could be configured by user input via the [`RsyslogRelpConfig`](https://github.com/gardener/gardener-extension-shoot-rsyslog-relp/blob/main/pkg/apis/rsyslog/types_rsyslog.go) and `Auditd` APIs.
These are:
- The `/var/lib/rsyslog-relp-configurator/rsyslog.d/60-audit.conf` file, which contains the rsyslog configuration.
- Certificate authority, client certificate and private key for the tls connection to the rsyslog target server.
- Audit rules files under the `/var/lib/rsyslog-relp-configurator/audit/rules.d` directory.
- The `/var/lib/rsyslog-relp-configurator/configure-rsyslog.sh` script, which copies certificates and rsyslog configuration file and audit rules files to their corresponding directories under `/etc`.

#### Rsyslog Config File

Rsyslog configuration files can contain and run code written in [RainerScript](https://www.rsyslog.com/doc/rainerscript/index.html).
This code could be used to read, modify or execute other files with the permissions of the rsyslog process.
Special care must be taken to ensure that no malicious code can be injected in the `/var/lib/rsyslog-relp-configurator/rsyslog.d/60-audit.conf` file.

Fields in the `RsyslogRelpConfig` API must be validated and their values must be properly escaped before they are passed to the `/var/lib/rsyslog-relp-configurator/rsyslog.d/60-audit.conf` configuration file.

The following validation rules must be strictly followed:

**String Field Validation**

All string fields in the `RsyslogRelpConfig` API must be validated before use. The current implementation validates the following fields:
- `target`: must be a valid IP address or DNS-1123 subdomain (validated using Kubernetes helpers `k8s.io/apimachinery/pkg/util/validation.IsValidIP(...)` and `k8s.io/apimachinery/pkg/util/validation.IsDNS1123Subdomain(...)`).
- `loggingRules.programNames[]`: must contain only printable ASCII characters matching `^[!-~]*$` and must not contain `[`, `:` or `/`.
- `tls.permittedPeer[]`: must match either the fingerprint format `^SHA1:[0-9A-Fa-f]{40}$` or be a valid hostname (DNS-1123 subdomain, wildcards allowed).
- `loggingRules.messageContent.regex` and `loggingRules.messageContent.exclude`: must be valid POSIX Extended Regular Expressions (validated via `regexp.CompilePOSIX`).
- `tls.secretReferenceName` and `auditConfig.configMapReferenceName`: must be non-empty strings when the respective feature is enabled.

**String Escaping**

All string fields used in the generated `/var/lib/rsyslog-relp-configurator/rsyslog.d/60-audit.conf` configuration file must be properly escaped. The current implementation escapes the following fields using [`strconv.Quote`](https://pkg.go.dev/strconv#Quote):
- `loggingRules.programNames[]`: quoted before insertion into `$programname == [...]` lists (see `computeLogFilters()` function).
- `loggingRules.messageContent.regex` and `loggingRules.messageContent.exclude`: quoted before use inside `re_match($msg, ...)` expressions (see `computeLogFilters()` function).
- `tls.permittedPeer[]`: each entry quoted before building `tls.permittedpeer=[...]` (see `getRsyslogTLSValues()` function).

**Requirements for Future Development**

Any new string fields added to the `RsyslogRelpConfig` API must follow the same validation and escaping patterns described above. Use Kubernetes and Gardener validation helpers wherever possible.

#### TLS Secret

If `tls.enabled` is true in the `RsyslogRelpConfig` specification, then the `tls.secretReferenceName` must point to a `Secret` resource in the `Shoot`'s `spec.resources` array. This must in turn be a reference to a `Secret` in the user's project namespace.
This `Secret` contains the necessary TLS certificates.

The `Secret` is validated by the shoot validator admission webhook to ensure that:
- It contains exactly three data keys: `ca` (certificate authority), `crt` (client certificate), and `key` (private key)
- It is marked as immutable
- It contains no extra data entries beyond the three required keys

#### Auditd Configuration

The [`Auditd`](https://github.com/gardener/gardener-extension-shoot-rsyslog-relp/blob/main/pkg/apis/rsyslog/types_auditd.go) API allows users to specify custom audit rules via the `auditRules` field. The audit rules are provided as a multi-line string containing rules in the format expected by the auditd daemon.

The `Auditd` specification is provided in a ConfigMap in the user's project namespace. The `RsyslogRelpConfig`'s `auditConfig.configMapReferenceName` field must point to a ConfigMap resource in the Shoot's `spec.resources` array, which in turn references the actual ConfigMap containing the `Auditd` specification.

When `auditConfig.enabled` is set to true and such a reference is present, the following validation takes place:
1. The ConfigMap is validated to be immutable and to contain a single `data.auditd` entry.
1. The `data.auditd` entry is strictly decoded into an `Auditd` struct.
1. The `auditRules` field is validated to be non-empty. See [pkg/apis/rsyslog/validation/auditd.go](https://github.com/gardener/gardener-extension-shoot-rsyslog-relp/blob/main/pkg/apis/rsyslog/validation/auditd.go) for implementation.
1. The audit rules string is written as-is to `/var/lib/rsyslog-relp-configurator/audit/rules.d/00_shoot_rsyslog_relp.rules` on the shoot nodes (base64-encoded during transport).
1. No escaping or quoting is applied to the audit rules content, as it is written directly to a file and not interpolated into shell scripts or other configuration formats.

The audit rules are validated by the auditd system itself when the `/var/lib/rsyslog-relp-configurator/configure-rsyslog.sh` script calls `augenrules --load`. If the rules are invalid, the script logs an error and reports the failure via metrics, but the extension does not preemptively validate the audit rule syntax.

Users are responsible for ensuring their audit rules conform to the [auditd rules syntax](https://man7.org/linux/man-pages/man8/auditctl.8.html).

#### Rsyslog Configurator Script

The certificates and configuration files that are installed under `/var/lib/rsyslog-relp-configurator/` are copied to the `/etc` directory by the `/var/lib/rsyslog-relp-configurator/configure-rsyslog.sh` script.
Currently this shell script only uses hardcoded constants and does not have any parameters exposed to the outside.
However, if future development adds such functionality, any fields that can be configured from the outside must be properly quoted, to avoid shell expansion and code execution.
