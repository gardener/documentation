---
github_repo: 'https://github.com/gardener/gardener-extension-shoot-rsyslog-relp'
github_subdir: docs/usage
params:
  github_branch: main
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/others/gardener-extension-shoot-rsyslog-relp/monitoring.md
  to: monitoring.md
persona: Users
title: Monitoring
prev: false
next: false
managed: true
---

# Monitoring

The `shoot-rsyslog-relp` extension exposes metrics for the `rsyslog` service running on a Shoot's nodes so that they can be easily viewed by cluster owners and operators in the Shoot's Prometheus and Plutono instances. The exposed monitoring data offers valuable insights into the operation of the `rsyslog` service and can be used to detect and debug ongoing issues. This guide describes the various metrics, alerts and logs available to cluster owners and operators.

## Metrics
Metrics for the `rsyslog` service originate from its `impstats` module. These include the number of messages in the various queues, the number of ingested messages, the number of processed messages by configured actions, system resources used by the `rsyslog` service, and others. More information about them can be found in the [`impstats` documentation](https://www.rsyslog.com/doc/configuration/modules/impstats.html) and the [statistics counter documentation](https://www.rsyslog.com/doc/configuration/rsyslog_statistic_counter.html). They are exposed via the [`node-exporter`](https://github.com/prometheus/node_exporter?tab=readme-ov-file#node-exporter) running on each Shoot node and are scraped by the Shoot's [Prometheus instance](/docs/gardener/monitoring/#shoot-prometheus).

These metrics can also be viewed in a dedicated dashboard named `Rsyslog Stats` in the Shoot's Plutono instance. You can select the node for which you wish the metrics to be displayed from the `Node` dropdown menu (by default metrics are summed over all nodes).

Following is a list of all exposed `rsyslog` metrics. The `name` and `origin` labels can be used to determine wether the metric is for: a [queue](https://www.rsyslog.com/doc/configuration/rsyslog_statistic_counter.html#queue), an [action](https://www.rsyslog.com/doc/configuration/rsyslog_statistic_counter.html#queue), [plugins](https://www.rsyslog.com/doc/configuration/rsyslog_statistic_counter.html#plugins) or [system stats](https://www.rsyslog.com/doc/configuration/modules/impstats.html#statistic-counter); the `node` label can be used to determine the node the metric originates from:

#### rsyslog_pstat_submitted
Number of messages that were submitted to the `rsyslog` service from its input. Currently `rsyslog` uses the `/run/systemd/journal/syslog` socket as input.
- Type: Counter
- Labels: `name` `node` `origin`

#### rsyslog_pstat_processed
Number of messages that are successfully processed by an action and sent to the target server.
- Type: Counter
- Labels: `name` `node` `origin`

#### rsyslog_pstat_failed
Number of messages that could not be processed by an action nor sent to the target server.
- Type: Counter
- Labels: `name` `node` `origin`

#### rsyslog_pstat_suspended
Total number of times an action suspended itself. Note that this counts the number of times the action transitioned from active to suspended state. The counter is no indication of how long the action was suspended or how often it was retried.
- Type: Counter
- Labels: `name` `node` `origin`

#### rsyslog_pstat_suspended_duration
The total number of seconds this action was disabled.
- Type: Counter
- Labels: `name` `node` `origin`

#### rsyslog_pstat_resumed
The total number of times this action resumed itself. A resumption occurs after the action has detected that a failure condition does no longer exist.
- Type: Counter
- Labels: `name` `node` `origin`

#### rsyslog_pstat_utime
User time used in microseconds.
- Type: Counter
- Labels: `name` `node` `origin`

#### rsyslog_pstat_stime
System time used in microsends.
- Type: Counter
- Labels: `name` `node` `origin`

#### rsyslog_pstat_maxrss
Maximum resident set size
- Type: Gauge
- Labels: `name` `node` `origin`

#### rsyslog_pstat_minflt
Total number of minor faults the task has made per second, those which have not required loading a memory page from disk.
- Type: Counter
- Labels: `name` `node` `origin`

#### rsyslog_pstat_majflt
Total number of major faults the task has made per second, those which have required loading a memory page from disk.
- Type: Counter
- Labels: `name` `node` `origin`

#### rsyslog_pstat_inblock
Filesystem input operations.
- Type: Counter
- Labels: `name` `node` `origin`

#### rsyslog_pstat_oublock
Filesystem output operations.
- Type: Counter
- Labels: `name` `node` `origin`

#### rsyslog_pstat_nvcsw
Voluntary context switches.
- Type: Counter
- Labels: `name` `node` `origin`

#### rsyslog_pstat_nivcsw
Involuntary context switches.
- Type: Counter
- Labels: `name` `node` `origin`

#### rsyslog_pstat_openfiles
Number of open files.
- Type: Counter
- Labels: `name` `node` `origin`

#### rsyslog_pstat_size
Messages currently in queue.
- Type: Gauge
- Labels: `name` `node` `origin`

#### rsyslog_pstat_enqueued
Total messages enqueued.
- Type: Counter
- Labels: `name` `node` `origin`

#### rsyslog_pstat_full
Times queue was full.
- Type: Counter
- Labels: `name` `node` `origin`

#### rsyslog_pstat_discarded_full
Messages discarded due to queue being full.
- Type: Counter
- Labels: `name` `node` `origin`

#### rsyslog_pstat_discarded_nf
Messages discarded when queue not full.
- Type: Counter
- Labels: `name` `node` `origin`

#### rsyslog_pstat_maxqsize
Maximum size queue has reached.
- Type: Gauge
- Labels: `name` `node` `origin`

#### rsyslog_augenrules_load_success
Shows whether the `augenrules --load` command was executed successfully or not on the node.
- Type: Gauge
- Labels: `node`

## Alerts

There are three alerts defined for the `rsyslog` service in the Shoot's Prometheus instance:

#### RsyslogTooManyRelpActionFailures
This indicates that the cumulative failure rate in processing `relp` action messages is greater than 2%. In other words, it compares the rate of processed `relp` action messages to the rate of failed `relp` action messages and fires an alert when the following expression evaluates to true:

```
sum(rate(rsyslog_pstat_failed{origin="core.action",name="rsyslg-relp"}[5m])) / sum(rate(rsyslog_pstat_processed{origin="core.action",name="rsyslog-relp"}[5m])) > bool 0.02`
```

#### RsyslogRelpActionProcessingRateIsZero
This indicates that no messages are being sent to the upstream rsyslog target by the `relp` action. An alert is fired when the following expression evaluates to true:

```
rate(rsyslog_pstat_processed{origin="core.action",name="rsyslog-relp"}[5m]) == 0
```

#### RsyslogRelpAuditRulesNotLoadedSuccessfully
This indicates that `augenrules --load` was not executed successfully when called to load the configured audit rules. You should check if the `auditd` configuration you provided is valid. An alert is fired when the following expression evaluates to true:

```
absent(rsyslog_augenrules_load_success == 1)
```

Users can subscribe to these alerts by following the Gardener [alerting guide](/docs/gardener/monitoring/alerting/#alerting-for-users).

## Logging

There are two ways to view the logs of the `rsyslog` service running on the Shoot's nodes - either using the `Explore` tab of the Shoot's Plutono instance, or `ssh`-ing directly to a node.

To view logs in Plutono, navigate to the `Explore` tab and select `vali` from the `Explore` dropdown menu. Afterwards enter the following `vali` query:

`{nodename="<name-of-node>"} |~ "\"unit\":\"rsyslog.service\""`

Notice that you cannot use the `unit` label to filter for the `rsyslog.service` unit logs. Instead, you have to `grep` for the service as displayed in the example above.

To view logs when directly `ssh`-ing to a node in the Shoot cluster, use either of the following commands on the node:

`systemctl status rsyslog`

`journalctl -u rsyslog`
