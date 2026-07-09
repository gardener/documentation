---
github_repo: 'https://github.com/gardener/gardener-extension-shoot-rsyslog-relp'
github_subdir: docs/usage
params:
  github_branch: main
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/others/gardener-extension-shoot-rsyslog-relp/configuration.md
  to: configuration.md
persona: Users
title: Configuration
prev: false
next: false
managed: true
---

# Configuring the Rsyslog Relp Extension

## Introduction

As a cluster owner, you might need audit logs on a Shoot node level. With these audit logs you can track actions on your nodes like privilege escalation, file integrity, process executions, and who is the user that performed these actions. Such information is essential for the security of your Shoot cluster. Linux operating systems collect such logs via the `auditd` and `journald` daemons. However, these logs can be lost if they are only kept locally on the operating system. You need a reliable way to send them to a remote server where they can be stored for longer time periods and retrieved when necessary.

[Rsyslog](https://www.rsyslog.com/) offers a solution for that. It gathers and processes logs from `auditd` and `journald` and then forwards them to a remote server. Moreover, `rsyslog` can make use of the RELP protocol so that logs are sent reliably and no messages are lost.

The `shoot-rsyslog-relp` extension is used to configure `rsyslog` on each Shoot node so that the following can take place:
1. `Rsyslog` reads logs from the `auditd` and `journald` sockets.
1. The logs are filtered based on the program name, syslog severity and content of the message.
1. The logs are enriched with metadata containing the name of the Project in which the Shoot is created, the name of the Shoot, the UID of the Shoot, and the hostname of the node on which the log event occurred.
1. The enriched logs are sent to the target remote server via the RELP protocol.

The following graph shows a rough outline of how that looks in a Shoot cluster:
![rsyslog-logging-architecture](/docs/extensions/others/gardener-extension-shoot-rsyslog-relp/images/rsyslog-logging-architecture.png)

## Shoot Configuration

The extension is not globally enabled and must be configured per Shoot cluster. The Shoot specification has to be adapted to include the `shoot-rsyslog-relp` extension configuration, which specifies the target server to which logs are forwarded, its port, and some optional rsyslog settings described in the examples below.

Below is an example `shoot-rsyslog-relp` extension configuration as part of the Shoot spec:

```yaml
kind: Shoot
metadata:
  name: bar
  namespace: garden-foo
...
spec:
  extensions:
  - type: shoot-rsyslog-relp
    providerConfig:
      apiVersion: rsyslog-relp.extensions.gardener.cloud/v1alpha1
      kind: RsyslogRelpConfig
      # Set the target server to which logs are sent. The server must support the RELP protocol.
      target: some.rsyslog-relp.server
      # Set the port of the target server.
      port: 10250
      # Define rules to select logs from which programs and with what syslog severity
      # are forwarded to the target server.
      loggingRules:
      - severity: 4
        programNames: ["kubelet", "audisp-syslog"]
        # Set regular expression to match or exclude messages based on their content.
        # messageContent:
        #   regex: "foo"
        #   exclude: "bar"
      - severity: 1
        programNames: ["audisp-syslog"]
      # Define an interval of 90 seconds at which the current connection is broken and re-established.
      # By default this value is 0 which means that the connection is never broken and re-established.
      rebindInterval: 90
      # Set the timeout for relp sessions to 90 seconds. If set too low, valid sessions may be considered
      # dead and tried to recover.
      timeout: 90
      # Set how often an action is retried before it is considered to have failed.
      # Failed actions discard log messages. Setting `-1` here means that messages are never discarded.
      resumeRetryCount: -1
      # Configures rsyslog to report continuation of action suspension, e.g. when the connection to the target
      # server is broken.
      reportSuspensionContinuation: true
      # Add tls settings if tls should be used to encrypt the connection to the target server.
      tls:
        enabled: true
        # Use `name` authentication mode for the tls connection.
        authMode: name
        # Only allow connections if the server's name is `some.rsyslog-relp.server`
        permittedPeer:
        - "some.rsyslog-relp.server"
        # Reference to the resource which contains certificates used for the tls connection.
        # It must be added to the `.spec.resources` field of the Shoot.
        secretReferenceName: rsyslog-relp-tls
        # Instruct librelp on the Shoot nodes to use the gnutls tls library.
        tlsLib: gnutls
      # Add auditConfig settings if you want to customize node level auditing.
      auditConfig:
        enabled: true
        # Reference to the resource which contains the audit configuration.
        # It must be added to the `.spec.resources` field of the Shoot.
        configMapReferenceName: audit-config
  resources:
    # Add the rsyslog-relp-tls secret in the resources field of the Shoot spec.
    - name: rsyslog-relp-tls
      resourceRef:
        apiVersion: v1
        kind: Secret
        name: rsyslog-relp-tls-v1
    - name: audit-config
      resourceRef:
        apiVersion: v1
        kind: ConfigMap
        name: audit-config-v1
...
```

### Choosing Which Log Messages to Send to the Target Server

The `.loggingRules` field defines rules about which logs should be sent to the target server. When a log is processed by rsyslog, it is compared against the list of rules in order. If the program name, the syslog severity of the log messages and the message content matches the rule, the message is forwarded to the target server. The following table describes the syslog severity and their corresponding codes:

```
Numerical         Severity
  Code

  0               Emergency: system is unusable
  1               Alert: action must be taken immediately
  2               Critical: critical conditions
  3               Error: error conditions
  4               Warning: warning conditions
  5               Notice: normal but significant condition
  6               Informational: informational messages
  7               Debug: debug-level messages
```

Below is an example with a `.loggingRules` section that will only forward logs from the `kubelet` program with syslog severity of 6 or lower that don't contain "bar" and any other program with syslog severity of 2 or lower:

```yaml
apiVersion: rsyslog-relp.extensions.gardener.cloud/v1alpha1
kind: RsyslogRelpConfig
target: localhost
port: 1520
loggingRules:
- severity: 6
  programNames: ["kubelet"]
  messageContent:
    exclude: "bar"
- severity: 2
```

You can use a minimal `shoot-rsyslog-relp` extension configuration to forward all logs to the target server:

```yaml
apiVersion: rsyslog-relp.extensions.gardener.cloud/v1alpha1
kind: RsyslogRelpConfig
target: some.rsyslog-relp.server
port: 10250
loggingRules:
- severity: 7
```

### Securing the Communication to the Target Server with TLS

The communication to the target server is not encrypted by default. To enable encryption, set the `.tls.enabled` field in the `shoot-rsyslog-relp` extension configuration to `true`. In this case, an immutable secret which contains the TLS certificates used to establish the TLS connection to the server must be created in the same project namespace as your Shoot.

An example Secret is given below:

> **Note:**  The secret must be immutable

```yaml
kind: Secret
apiVersion: v1
metadata:
  name: rsyslog-relp-tls-v1
  namespace: garden-foo
immutable: true
data:
  ca: |
    -----BEGIN BEGIN RSA PRIVATE KEY-----
    ...
    -----END RSA PRIVATE KEY-----
  crt: |
    -----BEGIN BEGIN RSA PRIVATE KEY-----
    ...
    -----END RSA PRIVATE KEY-----
  key: |
    -----BEGIN BEGIN RSA PRIVATE KEY-----
    ...
    -----END RSA PRIVATE KEY-----
```

The Secret must be referenced in the Shoot's `.spec.resources` field and the corresponding resource entry must be referenced in the `.tls.secretReferenceName` of the `shoot-rsyslog-relp` extension configuration:

```yaml
kind: Shoot
metadata:
  name: bar
  namespace: garden-foo
...
spec:
  extensions:
  - type: shoot-rsyslog-relp
    providerConfig:
      apiVersion: rsyslog-relp.extensions.gardener.cloud/v1alpha1
      kind: RsyslogRelpConfig
      target: some.rsyslog-relp.server
      port: 10250
      loggingRules:
      - severity: 7
      tls:
        enabled: true
        secretReferenceName: rsyslog-relp-tls
  resources:
    - name: rsyslog-relp-tls
      resourceRef:
        apiVersion: v1
        kind: Secret
        name: rsyslog-relp-tls-v1
...
```

You can set a few additional parameters for the TLS connection: `.tls.authMode`, `tls.permittedPeer`, and `tls.tlsLib`. Refer to the rsyslog documentation for more information on these parameters:
- [`.tls.authMode`](https://docs.rsyslog.com/doc/reference/parameters/omrelp-tls-authmode.html)
- [`.tls.permittedPeer`](https://docs.rsyslog.com/doc/reference/parameters/omrelp-tls-permittedpeer.html)
- [`.tls.tlsLib`](https://docs.rsyslog.com/doc/reference/parameters/imrelp-tls-tlslib.html)

### Configuring the Audit Daemon on the Shoot Nodes

The `shoot-rsyslog-relp` extension also allows you to configure the Audit Daemon (`auditd`) on the Shoot nodes.

By default, the audit rules located under the `/etc/audit/rules.d` directory on your Shoot's nodes will be moved to `/etc/audit/rules.d.original` and the following rules will be placed under the `/etc/audit/rules.d` directory: [00-base-config.rules](https://github.com/gardener/gardener-extension-shoot-rsyslog-relp/blob/main/pkg/webhook/operatingsystemconfig/resources/auditrules/00-base-config.rules), [10-privilege-escalation.rules](https://github.com/gardener/gardener-extension-shoot-rsyslog-relp/blob/main/pkg/webhook/operatingsystemconfig/resources/auditrules/10-privilege-escalation.rules), [11-privilege-special.rules](https://github.com/gardener/gardener-extension-shoot-rsyslog-relp/blob/main/pkg/webhook/operatingsystemconfig/resources/auditrules/11-privileged-special.rules), [12-system-integrity.rules](https://github.com/gardener/gardener-extension-shoot-rsyslog-relp/blob/main/pkg/webhook/operatingsystemconfig/resources/auditrules/12-system-integrity.rules). Next, `augerules --load` will be called and the audit daemon (`auditd`) restarted so that the new rules can take effect.

Alternatively, you can define your own `auditd` rules to be placed on your Shoot's nodes by using the following configuration:
```yaml
apiVersion: rsyslog-relp.extensions.gardener.cloud/v1alpha1
kind: Auditd
auditRules: |
  ## First rule - delete all existing rules
  -D
  ## Now define some custom rules
  -a exit,always -F arch=b64 -S setuid -S setreuid -S setgid -S setregid -F auid>0 -F auid!=-1 -F key=privilege_escalation
  -a exit,always -F arch=b64 -S execve -S execveat -F euid=0 -F auid>0 -F auid!=-1 -F key=privilege_escalation
```

In this case the original rules are also backed up in the `/etc/audit/rules.d.original` directory.

To deploy this configuration, it must be embedded in an immutable ConfigMap.

> [!NOTE]
> The data key storing this configuration must be named `auditd`.

An example `ConfigMap` is given below:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: audit-config-v1
  namespace: garden-foo
immutable: true
data:
  auditd: |
    apiVersion: rsyslog-relp.extensions.gardener.cloud/v1alpha1
    kind: Auditd
    auditRules: |
      ## First rule - delete all existing rules
      -D
      ## Now define some custom rules
      -a exit,always -F arch=b64 -S setuid -S setreuid -S setgid -S setregid -F auid>0 -F auid!=-1 -F key=privilege_escalation
      -a exit,always -F arch=b64 -S execve -S execveat -F euid=0 -F auid>0 -F auid!=-1 -F key=privilege_escalation
```

After creating such a `ConfigMap`, it must be included in the Shoot's `spec.resources` array and then referenced from the `providerConfig.auditConfig.configMapReferenceName` field in the `shoot-rsyslog-relp` extension configuration.

An example configuration is given below:

```yaml
kind: Shoot
metadata:
  name: bar
  namespace: garden-foo
...
spec:
  extensions:
  - type: shoot-rsyslog-relp
    providerConfig:
      apiVersion: rsyslog-relp.extensions.gardener.cloud/v1alpha1
      kind: RsyslogRelpConfig
      target: some.rsyslog-relp.server
      port: 10250
      loggingRules:
      - severity: 7
      auditConfig:
        enabled: true
        configMapReferenceName: audit-config
  resources:
    - name: audit-config
      resourceRef:
        apiVersion: v1
        kind: ConfigMap
        name: audit-config-v1
```

Finally, by setting `providerConfig.auditConfig.enabled` to `false` in the `shoot-rsyslog-relp` extension configuration, the original audit rules on your Shoot's nodes will not be modified and `auditd` will not be restarted.

Examples on how the `providerConfig.auditConfig.enabled` field functions are given below:

- The following deploys the extension default audit rules as of today:
  ```yaml
  providerConfig:
    auditConfig:
      enabled: true
  ```
- The following deploys only the rules specified in the referenced ConfigMap:
  ```yaml
  providerConfig:
    auditConfig:
      enabled: true
      configMapReferenceName: audit-config
  ```
- Both of the following do not deploy any audit rules:
  ```yaml
  providerConfig:
    auditConfig:
      enabled: false
      configMapReferenceName: audit-config
  ```
  ```yaml
  providerConfig:
    auditConfig:
      enabled: false
  ```
