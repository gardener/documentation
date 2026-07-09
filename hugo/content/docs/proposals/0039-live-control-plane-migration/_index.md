---
github_repo: 'https://github.com/gardener/enhancements'
github_subdir: geps/0039-live-control-plane-migration
params:
  github_branch: main
path_base_for_github_subdir:
  from: content/docs/proposals/0039-live-control-plane-migration/README.md
  to: README.md
title: 0039 Live Control Plane Migration
prev: false
next: false
managed: true
---

# GEP-0039: Live Control Plane Migration

## Terminology

**Source `Seed`** is the seed that currently hosts the control plane of the shoot cluster.

**Destination `Seed`** is the seed to which the control plane of the shoot cluster is being migrated.

**Distant Regions** are regions separated geographically with a round-trip distance greater than the configured threshold.

## Summary

This proposal introduces Live Control Plane Migration (Live CPM) in Gardener, enabling migration of a shoot cluster’s control plane without API server downtime.

Live CPM adds support for phased control plane migration, allowing critical components to be brought up in the destination seed while the source control plane remains active. It introduces mechanisms to maintain etcd data consistency during migration and to preserve connectivity for webhooks throughout the process.

---

## Motivation

The existing CPM process is mature but results in a downtime window typically lasting 10-20 minutes. This violates the high-availability requirements for certain mission-critical applications running in shoot clusters.

Introducing Live CPM would:

1. Allow migration of a shoot's control plane with zero downtime.
1. Enable cleanup of legacy seeds.
1. Become the foundation for seed autoscaling.

---

## Goals

1. Achieve **zero-downtime** for the shoot cluster's Kubernetes API server during the migration process.
1. Maintain **etcd data consistency** between the source and destination seed control planes throughout the migration phase by using a temporary 5-member etcd cluster (briefly expanding to 6 members before the source members are removed).
1. Maintain fully functional VPN tunnel throughout the migration for the webhooks or logs/exec to remain operational.

## Non-Goals

1. Allow Live CPM for non-HA shoots.
1. Allow changing the Shoot spec during migration.
1. Allowing Live CPM between distant regions.
1. Replacing the current CPM solution.
1. Retaining the old logs and metrics from the source seed.
1. Migrating `VPACheckpoint`s from the source to the destination seed.

---

## Proposal

### Approach

Live CPM is orchestrated by `gardenlet` through a step-based, coordinated process, where the source and destination `gardenlet`s work in conjunction, each responsible for specific stages of the migration. Progress is tracked explicitly in the `Shoot` status to ensure deterministic coordination.

It aims to achieve migration by:

1. Setting up the core control plane components (API server, etcd) on the destination seed while the control plane components in the source seed are still active.
1. Using a temporary 5-member etcd cluster (3 members in the source seed + 2 in the destination seed), briefly expanded to 6 members during the handover, to ensure data consistency.
1. Using a temporary VPN to keep the shoot webhooks active throughout the migration process.

The goal is to provide a user experience where the Shoot control plane remains fully operational with no observable downtime for API server traffic.

By default, **[Control Plane Migration (CPM)](/docs/gardener/control_plane_migration/)** is triggered when a `Shoot`’s `.spec.seedName` is changed to a `Seed` that differs from `.status.seedName`.

To trigger **Live CPM**, a new operation annotation, `gardener.cloud/operation=live-migrate`, will be introduced. If a Shoot has this annotation set at the time the migration is triggered, Live CPM will be performed instead of the normal CPM.

> [!NOTE]
> Setting the annotation `gardener.cloud/operation=live-migrate` will be **forbidden** for hibernated Shoots, as live migration provides no benefit in this case. If a hibernated Shoot needs to be migrated, the normal CPM should be used instead.

### Prerequisites

- The source and destination seed clusters must not be in Distant Regions. Gardener can use the `gardener-scheduler` [ConfigMap](https://github.com/gardener/gardener/blob/v1.134.1/docs/concepts/scheduler.md#minimal-distance-strategy) to evaluate the inter-seed "distance" (for example, network latency).
  - Operators can define a custom threshold by annotating this ConfigMap with `migration.gardener.cloud/inter-seed-distance-threshold=<value>` (for example, `180` when the distance metric is network latency in milliseconds).
    - The value of 180 was derived from extensive empirical testing across AWS, GCP, and Azure.
    - At ≥200ms inter-seed latency, kube-apiserver enters `CrashLoopBackOff` on restart. The root cause is the cache initialization phase: on startup, kube-apiserver issues LIST requests for all resource types, and at high latency these operations exceed built-in startup timeouts before the cache is fully populated. The 180ms threshold provides a 20ms safety buffer below this observed failure boundary to account for transient network variability.
    - If operators use a different distance metric (e.g., normalized weights rather than milliseconds), they must adjust the threshold accordingly.
  - If the scheduler `ConfigMap` or the threshold annotation is not provided, Gardener cannot determine the distance between seeds. In this case, migration is only allowed if the seeds are in the same region. For seeds in different regions, operators can force a migration by annotating the Shoot with `migration.gardener.cloud/allow-distant-regions=true`, fully aware of the associated risks.
- Both the source and destination seed clusters must be healthy and run the same gardenlet version.
  - The Gardener API Server will reject the migration if the gardenlet versions do not match.
  - Before starting, each gardenlet reads the other's version from the `Seed` resource and blocks until both sides report the same version. This ensures safe coordination if either gardenlet is upgraded during migration.
- Network connectivity between the source and destination seeds.

### Gardener

#### Shoot API

A new field `status.liveMigration.conditions` will be introduced to track migration progress using standard Shoot conditions. Each migration step is represented as a distinct condition type, enabling granular observability and allowing the migration to resume from any point if interrupted.

```yaml
status:
  liveMigration:
    conditions:
    - type: SourceEtcdPreparedForPeerJoin
      status: "True"
      lastTransitionTime: "2025-03-15T10:00:00Z"
      lastUpdateTime: "2025-03-15T10:00:05Z"
      reason: EtcdExposedViaPeerURLs
      message: "Source etcd members exposed and ready for peer connections"
    - type: DestinationEtcdPeersJoined
      status: "True"
      lastTransitionTime: "2025-03-15T10:01:00Z"
      lastUpdateTime: "2025-03-15T10:02:30Z"
      reason: PeersJoinedSuccessfully
      message: "Two etcd peers successfully joined the existing etcd cluster"
    ...
    - type: SourceSeedCleanUp
      status: "Progressing"
      lastTransitionTime: "2025-03-15T10:03:00Z"
      lastUpdateTime: "2025-03-15T10:03:45Z"
      reason: CleanUpInProgress
      message: "Source seed resources are being cleaned up"
```

Each gardenlet (source and destination) updates relevant conditions as migration progresses through different steps.

A new `lastOperation` type `LiveMigrate` will be introduced. The `lastOperation` field in the Shoot status will indicate that a live migration is in progress and direct users to `status.liveMigration` for detailed progress tracking.

#### etcd Peer Communication

Each etcd member pod is individually exposed to enable direct and controlled peer communication during migration required for the [five member etcd cluster](#five-member-etcd-cluster), allowing it to communicate with its peers across both the source and destination seed clusters. This exposure is achieved via Istio, leveraging the `IngressGateway` loadbalancer in both the source and destination seeds.

For both source and destination seeds, the following resources are created:

- A single `Gateway` resource.
- A `VirtualService` per etcd member to perform host-based routing to the respective etcd member `Service`, and a `DestinationRule` per etcd member to configure traffic policies for those connections.
- One `DNSRecord` per etcd member ( With domain name `<etcd-pod-name>.<etcd-pod-namespace>.<seed-name>.<internal-domain>`), each pointing to the `Seed` Istio `IngressGateway` loadbalancer, with traffic routed to the correct member via the corresponding `VirtualService`.

#### Components with Shoot webhooks and Controllers reconciling shoot objects

For components with webhooks or controllers running in the `Seed` (e.g., Lakom extension), a brief unavailability is acceptable during the handover to the destination control plane. Webhook requests may fail, and controllers may not reconcile Shoot resources until the destination components are ready. For the initial implementation of Live CPM, this short unavailability is considered an acceptable trade-off. Future iterations may aim to eliminate this downtime entirely.

#### Live Migration Flow

![LiveCPM flow diagram](/docs/proposals/0039-live-control-plane-migration/livecpm-flow.svg)

### etcd-druid

#### Five member etcd cluster

- To achieve zero downtime and maintain etcd data consistency, the cluster first grows from three to five members by adding two members in the destination seed. A five-member cluster is chosen so the source side keeps its quorum even if connectivity between the seeds is lost. Before removing the source members, a third destination member is added, briefly making the cluster six members. Once all three source members are removed, the cluster settles at three members in the destination seed.
- To achieve a five-member etcd cluster, etcd-druid will introduce the following functionality:
  - **Multiple peer addresses**: Each member can have multiple peer addresses, and these peer addresses can be exposed through a load balancer to allow communication between members spanning different Kubernetes clusters.
  - **Bootstrap with existing cluster**: A new functionality will be introduced so that when a new etcd CR is created, its members can join an existing etcd cluster created by a different etcd CR.
  - **Skipping Peer Certificate SAN Validation**:
    `-peer-skip-client-san-verification` flag allows etcd peer connections to skip client certificate SAN (Subject Alternative Name) verification during TLS handshakes.
    During Live CPM, etcd peer communication spans multiple Kubernetes clusters and is routed through load balancers. etcd performs reverse lookup–based identity verification for peer connections, which would require the load balancer IPs to be present in the peer certificate SANs or resolvable within the etcd pod. However, these load balancer IPs cannot be configured deterministically, as traffic is source-NATed to node IPs before reaching the etcd pods. As a result, reverse lookup cannot reliably resolve the original peer endpoint, causing certificate verification to fail.
    Skipping SAN verification allows peer communication to succeed during the temporary five-member cluster phase while still preserving TLS encryption.

![LiveCPM etcd](/docs/proposals/0039-live-control-plane-migration/livecpm-etcd.svg)

An alternative approach involves combining the `MigrateExtensionsBeforeKAPI` and `MigrateDNSRecords` steps, and the `DestinationKAPIReady` and `EtcdMigrationComplete` steps. This would require migrating the DNS record (shallow-delete) before the kube-apiserver starts on the destination. The final decision on this approach will be made during the implementation phase.

#### Member removal from the cluster

- During the five-member cluster formation, the destination etcd CR holds the bootstrap fields needed to join the source cluster. To finish the migration, one more member is added to the destination etcd CR (bringing the total to six) as mentioned before, and then the three source members are removed by clearing those bootstrap fields. The destination etcd-druid then removes the members using the [GEP-28](https://github.com/gardener/enhancements/tree/main/geps/0028-self-hosted-shoot-clusters) mechanism, which calls HTTP endpoints on the backup-restore sidecar.

#### Decoupling Member Names from Pod Names

- Currently, member names are same as the pod names of the etcd members. In a five-member cluster where members are spread across two Kubernetes clusters, pod names can be the same since they are derived from the etcd CR. This leads to issues where new members cannot join due to conflicting member names.
- To prevent this, etcd member names should be decoupled from the etcd pod names. At the time of writing the GEP, it is not yet clear how this will be implemented, but the related [issue](https://github.com/gardener/etcd-backup-restore/issues/896) can be followed for updates.

- **ETCD Druid API**
  
  - **`additionalAdvertisePeerUrls`**
    
    ```yaml
    apiVersion: druid.gardener.cloud/v1alpha1
    kind: Etcd
    metadata:
      name: etcd-target
    spec:
      etcd:
        # ... existing config ...
        additionalAdvertisePeerUrls:
        - memberName: etcd-target-0
          urls:
          - "http://target-lb-0.elb.amazonaws.com:2380"
        - memberName: etcd-target-1
          urls:
          - "http://target-lb-1.elb.amazonaws.com:2380"
        - memberName: etcd-target-2
          urls:
          - "http://target-lb-2.elb.amazonaws.com:2380"
    ```
  
  - **`bootstrapWithExistingCluster`**
  
  - API changes to allow passing additional etcd flags via the ETCD Druid custom resource.
  
  - Member name prefixes to enable decoupling of etcd members from their underlying infrastructure.

### VPN

In Gardener, VPN connectivity is essential for webhooks, which must remain operational throughout the migration. The VPN is also required for interactive commands like `kubectl logs`, `kubectl exec`, and `kubectl port-forward`, as well as for scraping shoot metrics.

To achieve this, a temporary VPN tunnel is established from the shoot cluster to the destination seed using a temporary VPN shoot client with a dedicated DNS record. Once the VPN tunnel from the shoot cluster to the destination seed is established using the original VPN shoot client, the temporary VPN client is removed.

![LiveCPM VPN flow](/docs/proposals/0039-live-control-plane-migration/livecpm-vpn.svg)

### Failures and Recovery Strategy

#### **ETCD Quorum loss**

##### The destination members are unable to join

If the five-member cluster cannot be formed because the destination members fail to join, it indicates a fundamental environment issue — likely that the user forced a migration across regions where latency exceeds the supported limits. In this scenario, the safest course of action is to abort the migration and revert to the normal CPM.

To trigger an abort, the annotation `migration.shoot.gardener.cloud/abort-live-migration=true` should be added to the Shoot. This is permitted only while the `DestinationEtcdPeersJoined` condition has status `False` with an appropriate failure reason. Once annotated, you can switch the seed name back to the source seed in the Shoot spec; the gardenlets will then orchestrate the cleanup of migration-specific resources across both the source and destination seeds. The destination gardenlet will also take care to remove the newly added members from the etcd cluster.

##### Quorum is lost at any other stage

It is also possible that quorum is lost at a later stage due to unexpected failures. In such cases, the quorum should first be restored manually by the human operator in the source cluster using backups. Once the source is healthy and the required steps are performed with the destination etcd CR, the migration can resume to re-form the five-member cluster and continue.

#### Kube API Server is unhealthy

##### ETCD is unhealthy

If the Kube API Server (KAPI) is down because the underlying etcd has lost quorum, follow the recovery steps outlined under ETCD Quorum Loss.

##### ETCD is healthy

If ETCD is healthy but the Kube API Server is unable to come up in the destination, it is likely due to the etcd cluster spanning distant regions and the Kube API Server using linearized reads. In this situation, some downtime is unavoidable, and we must prioritize recovering the Kube API Server in the destination cluster.

By applying the annotation `migration.gardener.cloud/force-shrink-etcd=true`, you signal the destination gardenlet to preemptively scaleup the destination etcd to three members and remove the three source members before deploying the destination Kube API Server as part of the flow. With all etcd members now running in the destination seed, the Kube API Server should be able to start successfully. Consequently, the member removal step at the end of the standard flow will be treated as a no-op.

On the source side, the presence of this annotation instructs the gardenlet to skip readiness checks for ETCD and KAPI, as these components will naturally fail once their members are removed. The system will immediately update DNS records to point to the destination KAPI. As a result, a brief period of downtime is expected.

> [!NOTE]
> A comprehensive step-by-step guide will be provided to help recover from various issues. Other failures not explicitly documented above should not be specific to live CPM and can be handled through standard recovery procedures, with or without manual intervention.

### Future Scope

- Implement LiveCPM for non-HA shoots.
- Automated LiveCPM for seed management.
- Multihop LiveCPM for migration to distant regions.
- Add a configuration option to allow operators to define, on a `Seed` level, which other seeds are available or unavailable for migration. This could be implemented using a label selector.

## Alternatives

### etcd Mirror Maker

[etcd Mirror Maker](https://github.com/etcd-io/etcd/blob/main/etcdctl/doc/mirror_maker.md) is an etcd feature that continuously replicates key-value data from a source etcd cluster to a destination etcd cluster using an initial sync followed by asynchronous update propagation. However, it has the following limitations:

- **Revision loss**: etcd Mirror Maker does not preserve revision history during initial sync, which violates Kubernetes watch and consistency guarantees.
- **Unsafe cutover**: Mirror Maker provides no atomic cutover mechanism, allowing stale writes during endpoint switching.
- **Asynchronous replication**: The asynchronous replication model cannot guarantee that the destination etcd is fully caught up at any point in time.
- **Latency sensitivity**: Replication throughput degrades significantly with increased network latency, making it unreliable even across nearby regions.
- **Downtime requirement**: Preventing data inconsistency would require stopping writes to the source etcd, which contradicts the zero-downtime goal of Live CPM.

### etcd Gateway

ETCD Gateway is an approach where etcd instances in the destination seed initially act as proxies that route traffic to their corresponding etcd members in the source seed cluster.

- Three etcd pods are started in the destination seed cluster in proxy mode, forwarding all requests to their respective source etcd members.
- Each destination etcd pod is then converted into an actual etcd member one by one, while the corresponding source etcd member is switched to proxy mode.
- Once all members are migrated, the source etcd cluster is shut down.
  
  However, this approach has the following limitations:

- **Reduced fault tolerance**: During each transition step, one etcd member is temporarily unavailable, reducing quorum resilience.
- **Operational complexity**: The proxy-to-member and member-to-proxy transitions require precise coordination and are difficult to automate safely.

### 3-Member etcd Cluster

This approach migrates etcd by moving members one by one from the source seed to the destination seed, while keeping the etcd cluster size at three throughout the process.

However, this approach has the following limitations:

- **Temporary loss of quorum safety**: During each member migration, the cluster operates with reduced fault tolerance, as only two members remain fully available.
- **No strong availability guarantees**: While the cluster may remain functional under ideal conditions, it cannot guarantee continuous availability under real-world load or failure scenarios.
