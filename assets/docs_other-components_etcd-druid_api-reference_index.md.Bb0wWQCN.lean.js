import{c as d,o,j as e,a}from"./chunks/framework.Bfq10Vlj.js";const s=JSON.parse('{"title":"API Reference","description":"","frontmatter":{"github_repo":"https://github.com/gardener/etcd-druid-api","github_subdir":"docs/api-reference","params":{"github_branch":"main"},"path_base_for_github_subdir":{"from":"content/docs/other-components/etcd-druid/api-reference.md","to":"druid.md"},"persona":"Developers","title":"API Reference","prev":false,"next":false},"headers":[],"relativePath":"docs/other-components/etcd-druid/api-reference/index.md","filePath":"docs/other-components/etcd-druid/api-reference.md","lastUpdated":null}'),c={name:"docs/other-components/etcd-druid/api-reference/index.md"},m=Object.assign(c,{setup(n){const r=`<p>Packages:</p>
<ul>
<li>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1">druid.gardener.cloud/v1alpha1</a>
</li>
</ul>
<h2 id="druid.gardener.cloud/v1alpha1">druid.gardener.cloud/v1alpha1</h2>
<p>
<p>Package v1alpha1 is the v1alpha1 version of the etcd-druid API.</p>
</p>
Resource Types:
<ul></ul>
<h3 id="druid.gardener.cloud/v1alpha1.BackupSpec">BackupSpec
</h3>
<p>
(<em>Appears on:</em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.EtcdSpec">EtcdSpec</a>)
</p>
<p>
<p>BackupSpec defines parameters associated with the full and delta snapshots of etcd.</p>
</p>
<table>
<thead>
<tr>
<th>Field</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>port</code></br>
<em>
int32
</em>
</td>
<td>
<em>(Optional)</em>
<p>Port define the port on which etcd-backup-restore server will be exposed.</p>
</td>
</tr>
<tr>
<td>
<code>tls</code></br>
<em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.TLSConfig">
TLSConfig
</a>
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>image</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>Image defines the etcd container image and tag</p>
</td>
</tr>
<tr>
<td>
<code>store</code></br>
<em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.StoreSpec">
StoreSpec
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Store defines the specification of object store provider for storing backups.</p>
</td>
</tr>
<tr>
<td>
<code>resources</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.25/#resourcerequirements-v1-core">
Kubernetes core/v1.ResourceRequirements
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Resources defines compute Resources required by backup-restore container.
More info: <a href="https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/">https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/</a></p>
</td>
</tr>
<tr>
<td>
<code>compactionResources</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.25/#resourcerequirements-v1-core">
Kubernetes core/v1.ResourceRequirements
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>CompactionResources defines compute Resources required by compaction job.
More info: <a href="https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/">https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/</a></p>
</td>
</tr>
<tr>
<td>
<code>fullSnapshotSchedule</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>FullSnapshotSchedule defines the cron standard schedule for full snapshots.</p>
</td>
</tr>
<tr>
<td>
<code>garbageCollectionPolicy</code></br>
<em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.GarbageCollectionPolicy">
GarbageCollectionPolicy
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>GarbageCollectionPolicy defines the policy for garbage collecting old backups</p>
</td>
</tr>
<tr>
<td>
<code>garbageCollectionPeriod</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.25/#duration-v1-meta">
Kubernetes meta/v1.Duration
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>GarbageCollectionPeriod defines the period for garbage collecting old backups</p>
</td>
</tr>
<tr>
<td>
<code>deltaSnapshotPeriod</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.25/#duration-v1-meta">
Kubernetes meta/v1.Duration
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>DeltaSnapshotPeriod defines the period after which delta snapshots will be taken</p>
</td>
</tr>
<tr>
<td>
<code>deltaSnapshotMemoryLimit</code></br>
<em>
k8s.io/apimachinery/pkg/api/resource.Quantity
</em>
</td>
<td>
<em>(Optional)</em>
<p>DeltaSnapshotMemoryLimit defines the memory limit after which delta snapshots will be taken</p>
</td>
</tr>
<tr>
<td>
<code>compression</code></br>
<em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.CompressionSpec">
CompressionSpec
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>SnapshotCompression defines the specification for compression of Snapshots.</p>
</td>
</tr>
<tr>
<td>
<code>enableProfiling</code></br>
<em>
bool
</em>
</td>
<td>
<em>(Optional)</em>
<p>EnableProfiling defines if profiling should be enabled for the etcd-backup-restore-sidecar</p>
</td>
</tr>
<tr>
<td>
<code>etcdSnapshotTimeout</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.25/#duration-v1-meta">
Kubernetes meta/v1.Duration
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>EtcdSnapshotTimeout defines the timeout duration for etcd FullSnapshot operation</p>
</td>
</tr>
<tr>
<td>
<code>leaderElection</code></br>
<em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.LeaderElectionSpec">
LeaderElectionSpec
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>LeaderElection defines parameters related to the LeaderElection configuration.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="druid.gardener.cloud/v1alpha1.ClientService">ClientService
</h3>
<p>
(<em>Appears on:</em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.EtcdConfig">EtcdConfig</a>)
</p>
<p>
<p>ClientService defines the parameters of the client service that a user can specify</p>
</p>
<table>
<thead>
<tr>
<th>Field</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>annotations</code></br>
<em>
map[string]string
</em>
</td>
<td>
<em>(Optional)</em>
<p>Annotations specify the annotations that should be added to the client service</p>
</td>
</tr>
<tr>
<td>
<code>labels</code></br>
<em>
map[string]string
</em>
</td>
<td>
<em>(Optional)</em>
<p>Labels specify the labels that should be added to the client service</p>
</td>
</tr>
</tbody>
</table>
<h3 id="druid.gardener.cloud/v1alpha1.CompactionMode">CompactionMode
(<code>string</code> alias)</p></h3>
<p>
(<em>Appears on:</em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.SharedConfig">SharedConfig</a>)
</p>
<p>
<p>CompactionMode defines the auto-compaction-mode: ‘periodic’ or ‘revision’.
‘periodic’ for duration based retention and ‘revision’ for revision number based retention.</p>
</p>
<h3 id="druid.gardener.cloud/v1alpha1.CompressionPolicy">CompressionPolicy
(<code>string</code> alias)</p></h3>
<p>
(<em>Appears on:</em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.CompressionSpec">CompressionSpec</a>)
</p>
<p>
<p>CompressionPolicy defines the type of policy for compression of snapshots.</p>
</p>
<h3 id="druid.gardener.cloud/v1alpha1.CompressionSpec">CompressionSpec
</h3>
<p>
(<em>Appears on:</em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.BackupSpec">BackupSpec</a>)
</p>
<p>
<p>CompressionSpec defines parameters related to compression of Snapshots(full as well as delta).</p>
</p>
<table>
<thead>
<tr>
<th>Field</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>enabled</code></br>
<em>
bool
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>policy</code></br>
<em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.CompressionPolicy">
CompressionPolicy
</a>
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
</tbody>
</table>
<h3 id="druid.gardener.cloud/v1alpha1.Condition">Condition
</h3>
<p>
(<em>Appears on:</em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.EtcdCopyBackupsTaskStatus">EtcdCopyBackupsTaskStatus</a>, 
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.EtcdStatus">EtcdStatus</a>)
</p>
<p>
<p>Condition holds the information about the state of a resource.</p>
</p>
<table>
<thead>
<tr>
<th>Field</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>type</code></br>
<em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.ConditionType">
ConditionType
</a>
</em>
</td>
<td>
<p>Type of the Etcd condition.</p>
</td>
</tr>
<tr>
<td>
<code>status</code></br>
<em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.ConditionStatus">
ConditionStatus
</a>
</em>
</td>
<td>
<p>Status of the condition, one of True, False, Unknown.</p>
</td>
</tr>
<tr>
<td>
<code>lastTransitionTime</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.25/#time-v1-meta">
Kubernetes meta/v1.Time
</a>
</em>
</td>
<td>
<p>Last time the condition transitioned from one status to another.</p>
</td>
</tr>
<tr>
<td>
<code>lastUpdateTime</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.25/#time-v1-meta">
Kubernetes meta/v1.Time
</a>
</em>
</td>
<td>
<p>Last time the condition was updated.</p>
</td>
</tr>
<tr>
<td>
<code>reason</code></br>
<em>
string
</em>
</td>
<td>
<p>The reason for the condition’s last transition.</p>
</td>
</tr>
<tr>
<td>
<code>message</code></br>
<em>
string
</em>
</td>
<td>
<p>A human-readable message indicating details about the transition.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="druid.gardener.cloud/v1alpha1.ConditionStatus">ConditionStatus
(<code>string</code> alias)</p></h3>
<p>
(<em>Appears on:</em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.Condition">Condition</a>)
</p>
<p>
<p>ConditionStatus is the status of a condition.</p>
</p>
<h3 id="druid.gardener.cloud/v1alpha1.ConditionType">ConditionType
(<code>string</code> alias)</p></h3>
<p>
(<em>Appears on:</em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.Condition">Condition</a>)
</p>
<p>
<p>ConditionType is the type of condition.</p>
</p>
<h3 id="druid.gardener.cloud/v1alpha1.CrossVersionObjectReference">CrossVersionObjectReference
</h3>
<p>
(<em>Appears on:</em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.EtcdStatus">EtcdStatus</a>)
</p>
<p>
<p>CrossVersionObjectReference contains enough information to let you identify the referred resource.</p>
</p>
<table>
<thead>
<tr>
<th>Field</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>kind</code></br>
<em>
string
</em>
</td>
<td>
<p>Kind of the referent</p>
</td>
</tr>
<tr>
<td>
<code>name</code></br>
<em>
string
</em>
</td>
<td>
<p>Name of the referent</p>
</td>
</tr>
<tr>
<td>
<code>apiVersion</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>API version of the referent</p>
</td>
</tr>
</tbody>
</table>
<h3 id="druid.gardener.cloud/v1alpha1.Etcd">Etcd
</h3>
<p>
<p>Etcd is the Schema for the etcds API</p>
</p>
<table>
<thead>
<tr>
<th>Field</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>metadata</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.25/#objectmeta-v1-meta">
Kubernetes meta/v1.ObjectMeta
</a>
</em>
</td>
<td>
Refer to the Kubernetes API documentation for the fields of the
<code>metadata</code> field.
</td>
</tr>
<tr>
<td>
<code>spec</code></br>
<em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.EtcdSpec">
EtcdSpec
</a>
</em>
</td>
<td>
<br/>
<br/>
<table>
<tr>
<td>
<code>selector</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.25/#labelselector-v1-meta">
Kubernetes meta/v1.LabelSelector
</a>
</em>
</td>
<td>
<p>selector is a label query over pods that should match the replica count.
It must match the pod template’s labels.
More info: <a href="https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#label-selectors">https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#label-selectors</a></p>
</td>
</tr>
<tr>
<td>
<code>labels</code></br>
<em>
map[string]string
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>annotations</code></br>
<em>
map[string]string
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>etcd</code></br>
<em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.EtcdConfig">
EtcdConfig
</a>
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>backup</code></br>
<em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.BackupSpec">
BackupSpec
</a>
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>sharedConfig</code></br>
<em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.SharedConfig">
SharedConfig
</a>
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>schedulingConstraints</code></br>
<em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.SchedulingConstraints">
SchedulingConstraints
</a>
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>replicas</code></br>
<em>
int32
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>priorityClassName</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>PriorityClassName is the name of a priority class that shall be used for the etcd pods.</p>
</td>
</tr>
<tr>
<td>
<code>storageClass</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>StorageClass defines the name of the StorageClass required by the claim.
More info: <a href="https://kubernetes.io/docs/concepts/storage/persistent-volumes#class-1">https://kubernetes.io/docs/concepts/storage/persistent-volumes#class-1</a></p>
</td>
</tr>
<tr>
<td>
<code>storageCapacity</code></br>
<em>
k8s.io/apimachinery/pkg/api/resource.Quantity
</em>
</td>
<td>
<em>(Optional)</em>
<p>StorageCapacity defines the size of persistent volume.</p>
</td>
</tr>
<tr>
<td>
<code>volumeClaimTemplate</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>VolumeClaimTemplate defines the volume claim template to be created</p>
</td>
</tr>
</table>
</td>
</tr>
<tr>
<td>
<code>status</code></br>
<em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.EtcdStatus">
EtcdStatus
</a>
</em>
</td>
<td>
</td>
</tr>
</tbody>
</table>
<h3 id="druid.gardener.cloud/v1alpha1.EtcdConfig">EtcdConfig
</h3>
<p>
(<em>Appears on:</em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.EtcdSpec">EtcdSpec</a>)
</p>
<p>
<p>EtcdConfig defines parameters associated etcd deployed</p>
</p>
<table>
<thead>
<tr>
<th>Field</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>quota</code></br>
<em>
k8s.io/apimachinery/pkg/api/resource.Quantity
</em>
</td>
<td>
<em>(Optional)</em>
<p>Quota defines the etcd DB quota.</p>
</td>
</tr>
<tr>
<td>
<code>defragmentationSchedule</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>DefragmentationSchedule defines the cron standard schedule for defragmentation of etcd.</p>
</td>
</tr>
<tr>
<td>
<code>serverPort</code></br>
<em>
int32
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>clientPort</code></br>
<em>
int32
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>image</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>Image defines the etcd container image and tag</p>
</td>
</tr>
<tr>
<td>
<code>authSecretRef</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.25/#secretreference-v1-core">
Kubernetes core/v1.SecretReference
</a>
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>metrics</code></br>
<em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.MetricsLevel">
MetricsLevel
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Metrics defines the level of detail for exported metrics of etcd, specify ‘extensive’ to include histogram metrics.</p>
</td>
</tr>
<tr>
<td>
<code>resources</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.25/#resourcerequirements-v1-core">
Kubernetes core/v1.ResourceRequirements
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Resources defines the compute Resources required by etcd container.
More info: <a href="https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/">https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/</a></p>
</td>
</tr>
<tr>
<td>
<code>clientUrlTls</code></br>
<em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.TLSConfig">
TLSConfig
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>ClientUrlTLS contains the ca, server TLS and client TLS secrets for client communication to ETCD cluster</p>
</td>
</tr>
<tr>
<td>
<code>peerUrlTls</code></br>
<em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.TLSConfig">
TLSConfig
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>PeerUrlTLS contains the ca and server TLS secrets for peer communication within ETCD cluster
Currently, PeerUrlTLS does not require client TLS secrets for gardener implementation of ETCD cluster.</p>
</td>
</tr>
<tr>
<td>
<code>etcdDefragTimeout</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.25/#duration-v1-meta">
Kubernetes meta/v1.Duration
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>EtcdDefragTimeout defines the timeout duration for etcd defrag call</p>
</td>
</tr>
<tr>
<td>
<code>heartbeatDuration</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.25/#duration-v1-meta">
Kubernetes meta/v1.Duration
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>HeartbeatDuration defines the duration for members to send heartbeats. The default value is 10s.</p>
</td>
</tr>
<tr>
<td>
<code>clientService</code></br>
<em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.ClientService">
ClientService
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>ClientService defines the parameters of the client service that a user can specify</p>
</td>
</tr>
</tbody>
</table>
<h3 id="druid.gardener.cloud/v1alpha1.EtcdCopyBackupsTask">EtcdCopyBackupsTask
</h3>
<p>
<p>EtcdCopyBackupsTask is a task for copying etcd backups from a source to a target store.</p>
</p>
<table>
<thead>
<tr>
<th>Field</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>metadata</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.25/#objectmeta-v1-meta">
Kubernetes meta/v1.ObjectMeta
</a>
</em>
</td>
<td>
Refer to the Kubernetes API documentation for the fields of the
<code>metadata</code> field.
</td>
</tr>
<tr>
<td>
<code>spec</code></br>
<em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.EtcdCopyBackupsTaskSpec">
EtcdCopyBackupsTaskSpec
</a>
</em>
</td>
<td>
<br/>
<br/>
<table>
<tr>
<td>
<code>sourceStore</code></br>
<em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.StoreSpec">
StoreSpec
</a>
</em>
</td>
<td>
<p>SourceStore defines the specification of the source object store provider for storing backups.</p>
</td>
</tr>
<tr>
<td>
<code>targetStore</code></br>
<em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.StoreSpec">
StoreSpec
</a>
</em>
</td>
<td>
<p>TargetStore defines the specification of the target object store provider for storing backups.</p>
</td>
</tr>
<tr>
<td>
<code>maxBackupAge</code></br>
<em>
uint32
</em>
</td>
<td>
<em>(Optional)</em>
<p>MaxBackupAge is the maximum age in days that a backup must have in order to be copied.
By default all backups will be copied.</p>
</td>
</tr>
<tr>
<td>
<code>maxBackups</code></br>
<em>
uint32
</em>
</td>
<td>
<em>(Optional)</em>
<p>MaxBackups is the maximum number of backups that will be copied starting with the most recent ones.</p>
</td>
</tr>
<tr>
<td>
<code>waitForFinalSnapshot</code></br>
<em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.WaitForFinalSnapshotSpec">
WaitForFinalSnapshotSpec
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>WaitForFinalSnapshot defines the parameters for waiting for a final full snapshot before copying backups.</p>
</td>
</tr>
</table>
</td>
</tr>
<tr>
<td>
<code>status</code></br>
<em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.EtcdCopyBackupsTaskStatus">
EtcdCopyBackupsTaskStatus
</a>
</em>
</td>
<td>
</td>
</tr>
</tbody>
</table>
<h3 id="druid.gardener.cloud/v1alpha1.EtcdCopyBackupsTaskSpec">EtcdCopyBackupsTaskSpec
</h3>
<p>
(<em>Appears on:</em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.EtcdCopyBackupsTask">EtcdCopyBackupsTask</a>)
</p>
<p>
<p>EtcdCopyBackupsTaskSpec defines the parameters for the copy backups task.</p>
</p>
<table>
<thead>
<tr>
<th>Field</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>sourceStore</code></br>
<em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.StoreSpec">
StoreSpec
</a>
</em>
</td>
<td>
<p>SourceStore defines the specification of the source object store provider for storing backups.</p>
</td>
</tr>
<tr>
<td>
<code>targetStore</code></br>
<em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.StoreSpec">
StoreSpec
</a>
</em>
</td>
<td>
<p>TargetStore defines the specification of the target object store provider for storing backups.</p>
</td>
</tr>
<tr>
<td>
<code>maxBackupAge</code></br>
<em>
uint32
</em>
</td>
<td>
<em>(Optional)</em>
<p>MaxBackupAge is the maximum age in days that a backup must have in order to be copied.
By default all backups will be copied.</p>
</td>
</tr>
<tr>
<td>
<code>maxBackups</code></br>
<em>
uint32
</em>
</td>
<td>
<em>(Optional)</em>
<p>MaxBackups is the maximum number of backups that will be copied starting with the most recent ones.</p>
</td>
</tr>
<tr>
<td>
<code>waitForFinalSnapshot</code></br>
<em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.WaitForFinalSnapshotSpec">
WaitForFinalSnapshotSpec
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>WaitForFinalSnapshot defines the parameters for waiting for a final full snapshot before copying backups.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="druid.gardener.cloud/v1alpha1.EtcdCopyBackupsTaskStatus">EtcdCopyBackupsTaskStatus
</h3>
<p>
(<em>Appears on:</em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.EtcdCopyBackupsTask">EtcdCopyBackupsTask</a>)
</p>
<p>
<p>EtcdCopyBackupsTaskStatus defines the observed state of the copy backups task.</p>
</p>
<table>
<thead>
<tr>
<th>Field</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>conditions</code></br>
<em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.Condition">
[]Condition
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Conditions represents the latest available observations of an object’s current state.</p>
</td>
</tr>
<tr>
<td>
<code>observedGeneration</code></br>
<em>
int64
</em>
</td>
<td>
<em>(Optional)</em>
<p>ObservedGeneration is the most recent generation observed for this resource.</p>
</td>
</tr>
<tr>
<td>
<code>lastError</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>LastError represents the last occurred error.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="druid.gardener.cloud/v1alpha1.EtcdMemberConditionStatus">EtcdMemberConditionStatus
(<code>string</code> alias)</p></h3>
<p>
(<em>Appears on:</em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.EtcdMemberStatus">EtcdMemberStatus</a>)
</p>
<p>
<p>EtcdMemberConditionStatus is the status of an etcd cluster member.</p>
</p>
<h3 id="druid.gardener.cloud/v1alpha1.EtcdMemberStatus">EtcdMemberStatus
</h3>
<p>
(<em>Appears on:</em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.EtcdStatus">EtcdStatus</a>)
</p>
<p>
<p>EtcdMemberStatus holds information about a etcd cluster membership.</p>
</p>
<table>
<thead>
<tr>
<th>Field</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>name</code></br>
<em>
string
</em>
</td>
<td>
<p>Name is the name of the etcd member. It is the name of the backing <code>Pod</code>.</p>
</td>
</tr>
<tr>
<td>
<code>id</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>ID is the ID of the etcd member.</p>
</td>
</tr>
<tr>
<td>
<code>role</code></br>
<em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.EtcdRole">
EtcdRole
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Role is the role in the etcd cluster, either <code>Leader</code> or <code>Member</code>.</p>
</td>
</tr>
<tr>
<td>
<code>status</code></br>
<em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.EtcdMemberConditionStatus">
EtcdMemberConditionStatus
</a>
</em>
</td>
<td>
<p>Status of the condition, one of True, False, Unknown.</p>
</td>
</tr>
<tr>
<td>
<code>reason</code></br>
<em>
string
</em>
</td>
<td>
<p>The reason for the condition’s last transition.</p>
</td>
</tr>
<tr>
<td>
<code>lastTransitionTime</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.25/#time-v1-meta">
Kubernetes meta/v1.Time
</a>
</em>
</td>
<td>
<p>LastTransitionTime is the last time the condition’s status changed.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="druid.gardener.cloud/v1alpha1.EtcdRole">EtcdRole
(<code>string</code> alias)</p></h3>
<p>
(<em>Appears on:</em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.EtcdMemberStatus">EtcdMemberStatus</a>)
</p>
<p>
<p>EtcdRole is the role of an etcd cluster member.</p>
</p>
<h3 id="druid.gardener.cloud/v1alpha1.EtcdSpec">EtcdSpec
</h3>
<p>
(<em>Appears on:</em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.Etcd">Etcd</a>)
</p>
<p>
<p>EtcdSpec defines the desired state of Etcd</p>
</p>
<table>
<thead>
<tr>
<th>Field</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>selector</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.25/#labelselector-v1-meta">
Kubernetes meta/v1.LabelSelector
</a>
</em>
</td>
<td>
<p>selector is a label query over pods that should match the replica count.
It must match the pod template’s labels.
More info: <a href="https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#label-selectors">https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#label-selectors</a></p>
</td>
</tr>
<tr>
<td>
<code>labels</code></br>
<em>
map[string]string
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>annotations</code></br>
<em>
map[string]string
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>etcd</code></br>
<em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.EtcdConfig">
EtcdConfig
</a>
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>backup</code></br>
<em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.BackupSpec">
BackupSpec
</a>
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>sharedConfig</code></br>
<em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.SharedConfig">
SharedConfig
</a>
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>schedulingConstraints</code></br>
<em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.SchedulingConstraints">
SchedulingConstraints
</a>
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>replicas</code></br>
<em>
int32
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>priorityClassName</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>PriorityClassName is the name of a priority class that shall be used for the etcd pods.</p>
</td>
</tr>
<tr>
<td>
<code>storageClass</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>StorageClass defines the name of the StorageClass required by the claim.
More info: <a href="https://kubernetes.io/docs/concepts/storage/persistent-volumes#class-1">https://kubernetes.io/docs/concepts/storage/persistent-volumes#class-1</a></p>
</td>
</tr>
<tr>
<td>
<code>storageCapacity</code></br>
<em>
k8s.io/apimachinery/pkg/api/resource.Quantity
</em>
</td>
<td>
<em>(Optional)</em>
<p>StorageCapacity defines the size of persistent volume.</p>
</td>
</tr>
<tr>
<td>
<code>volumeClaimTemplate</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>VolumeClaimTemplate defines the volume claim template to be created</p>
</td>
</tr>
</tbody>
</table>
<h3 id="druid.gardener.cloud/v1alpha1.EtcdStatus">EtcdStatus
</h3>
<p>
(<em>Appears on:</em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.Etcd">Etcd</a>)
</p>
<p>
<p>EtcdStatus defines the observed state of Etcd.</p>
</p>
<table>
<thead>
<tr>
<th>Field</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>observedGeneration</code></br>
<em>
int64
</em>
</td>
<td>
<em>(Optional)</em>
<p>ObservedGeneration is the most recent generation observed for this resource.</p>
</td>
</tr>
<tr>
<td>
<code>etcd</code></br>
<em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.CrossVersionObjectReference">
CrossVersionObjectReference
</a>
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>conditions</code></br>
<em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.Condition">
[]Condition
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Conditions represents the latest available observations of an etcd’s current state.</p>
</td>
</tr>
<tr>
<td>
<code>serviceName</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>ServiceName is the name of the etcd service.</p>
</td>
</tr>
<tr>
<td>
<code>lastError</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>LastError represents the last occurred error.</p>
</td>
</tr>
<tr>
<td>
<code>clusterSize</code></br>
<em>
int32
</em>
</td>
<td>
<em>(Optional)</em>
<p>Cluster size is the size of the etcd cluster.</p>
</td>
</tr>
<tr>
<td>
<code>currentReplicas</code></br>
<em>
int32
</em>
</td>
<td>
<em>(Optional)</em>
<p>CurrentReplicas is the current replica count for the etcd cluster.</p>
</td>
</tr>
<tr>
<td>
<code>replicas</code></br>
<em>
int32
</em>
</td>
<td>
<em>(Optional)</em>
<p>Replicas is the replica count of the etcd resource.</p>
</td>
</tr>
<tr>
<td>
<code>readyReplicas</code></br>
<em>
int32
</em>
</td>
<td>
<em>(Optional)</em>
<p>ReadyReplicas is the count of replicas being ready in the etcd cluster.</p>
</td>
</tr>
<tr>
<td>
<code>ready</code></br>
<em>
bool
</em>
</td>
<td>
<em>(Optional)</em>
<p>Ready is <code>true</code> if all etcd replicas are ready.</p>
</td>
</tr>
<tr>
<td>
<code>updatedReplicas</code></br>
<em>
int32
</em>
</td>
<td>
<em>(Optional)</em>
<p>UpdatedReplicas is the count of updated replicas in the etcd cluster.</p>
</td>
</tr>
<tr>
<td>
<code>labelSelector</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.25/#labelselector-v1-meta">
Kubernetes meta/v1.LabelSelector
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>LabelSelector is a label query over pods that should match the replica count.
It must match the pod template’s labels.</p>
</td>
</tr>
<tr>
<td>
<code>members</code></br>
<em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.EtcdMemberStatus">
[]EtcdMemberStatus
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Members represents the members of the etcd cluster</p>
</td>
</tr>
<tr>
<td>
<code>peerUrlTLSEnabled</code></br>
<em>
bool
</em>
</td>
<td>
<em>(Optional)</em>
<p>PeerUrlTLSEnabled captures the state of peer url TLS being enabled for the etcd member(s)</p>
</td>
</tr>
</tbody>
</table>
<h3 id="druid.gardener.cloud/v1alpha1.GarbageCollectionPolicy">GarbageCollectionPolicy
(<code>string</code> alias)</p></h3>
<p>
(<em>Appears on:</em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.BackupSpec">BackupSpec</a>)
</p>
<p>
<p>GarbageCollectionPolicy defines the type of policy for snapshot garbage collection.</p>
</p>
<h3 id="druid.gardener.cloud/v1alpha1.LeaderElectionSpec">LeaderElectionSpec
</h3>
<p>
(<em>Appears on:</em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.BackupSpec">BackupSpec</a>)
</p>
<p>
<p>LeaderElectionSpec defines parameters related to the LeaderElection configuration.</p>
</p>
<table>
<thead>
<tr>
<th>Field</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>reelectionPeriod</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.25/#duration-v1-meta">
Kubernetes meta/v1.Duration
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>ReelectionPeriod defines the Period after which leadership status of corresponding etcd is checked.</p>
</td>
</tr>
<tr>
<td>
<code>etcdConnectionTimeout</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.25/#duration-v1-meta">
Kubernetes meta/v1.Duration
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>EtcdConnectionTimeout defines the timeout duration for etcd client connection during leader election.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="druid.gardener.cloud/v1alpha1.MetricsLevel">MetricsLevel
(<code>string</code> alias)</p></h3>
<p>
(<em>Appears on:</em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.EtcdConfig">EtcdConfig</a>)
</p>
<p>
<p>MetricsLevel defines the level ‘basic’ or ‘extensive’.</p>
</p>
<h3 id="druid.gardener.cloud/v1alpha1.SchedulingConstraints">SchedulingConstraints
</h3>
<p>
(<em>Appears on:</em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.EtcdSpec">EtcdSpec</a>)
</p>
<p>
<p>SchedulingConstraints defines the different scheduling constraints that must be applied to the
pod spec in the etcd statefulset.
Currently supported constraints are Affinity and TopologySpreadConstraints.</p>
</p>
<table>
<thead>
<tr>
<th>Field</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>affinity</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.25/#affinity-v1-core">
Kubernetes core/v1.Affinity
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Affinity defines the various affinity and anti-affinity rules for a pod
that are honoured by the kube-scheduler.</p>
</td>
</tr>
<tr>
<td>
<code>topologySpreadConstraints</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.25/#topologyspreadconstraint-v1-core">
[]Kubernetes core/v1.TopologySpreadConstraint
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>TopologySpreadConstraints describes how a group of pods ought to spread across topology domains,
that are honoured by the kube-scheduler.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="druid.gardener.cloud/v1alpha1.SecretReference">SecretReference
</h3>
<p>
(<em>Appears on:</em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.TLSConfig">TLSConfig</a>)
</p>
<p>
<p>SecretReference defines a reference to a secret.</p>
</p>
<table>
<thead>
<tr>
<th>Field</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>SecretReference</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.25/#secretreference-v1-core">
Kubernetes core/v1.SecretReference
</a>
</em>
</td>
<td>
<p>
(Members of <code>SecretReference</code> are embedded into this type.)
</p>
</td>
</tr>
<tr>
<td>
<code>dataKey</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>DataKey is the name of the key in the data map containing the credentials.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="druid.gardener.cloud/v1alpha1.SharedConfig">SharedConfig
</h3>
<p>
(<em>Appears on:</em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.EtcdSpec">EtcdSpec</a>)
</p>
<p>
<p>SharedConfig defines parameters shared and used by Etcd as well as backup-restore sidecar.</p>
</p>
<table>
<thead>
<tr>
<th>Field</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>autoCompactionMode</code></br>
<em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.CompactionMode">
CompactionMode
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>AutoCompactionMode defines the auto-compaction-mode:‘periodic’ mode or ‘revision’ mode for etcd and embedded-Etcd of backup-restore sidecar.</p>
</td>
</tr>
<tr>
<td>
<code>autoCompactionRetention</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>AutoCompactionRetention defines the auto-compaction-retention length for etcd as well as for embedded-Etcd of backup-restore sidecar.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="druid.gardener.cloud/v1alpha1.StorageProvider">StorageProvider
(<code>string</code> alias)</p></h3>
<p>
(<em>Appears on:</em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.StoreSpec">StoreSpec</a>)
</p>
<p>
<p>StorageProvider defines the type of object store provider for storing backups.</p>
</p>
<h3 id="druid.gardener.cloud/v1alpha1.StoreSpec">StoreSpec
</h3>
<p>
(<em>Appears on:</em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.BackupSpec">BackupSpec</a>, 
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.EtcdCopyBackupsTaskSpec">EtcdCopyBackupsTaskSpec</a>)
</p>
<p>
<p>StoreSpec defines parameters related to ObjectStore persisting backups</p>
</p>
<table>
<thead>
<tr>
<th>Field</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>container</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>Container is the name of the container the backup is stored at.</p>
</td>
</tr>
<tr>
<td>
<code>prefix</code></br>
<em>
string
</em>
</td>
<td>
<p>Prefix is the prefix used for the store.</p>
</td>
</tr>
<tr>
<td>
<code>provider</code></br>
<em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.StorageProvider">
StorageProvider
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Provider is the name of the backup provider.</p>
</td>
</tr>
<tr>
<td>
<code>secretRef</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.25/#secretreference-v1-core">
Kubernetes core/v1.SecretReference
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>SecretRef is the reference to the secret which used to connect to the backup store.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="druid.gardener.cloud/v1alpha1.TLSConfig">TLSConfig
</h3>
<p>
(<em>Appears on:</em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.BackupSpec">BackupSpec</a>, 
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.EtcdConfig">EtcdConfig</a>)
</p>
<p>
<p>TLSConfig hold the TLS configuration details.</p>
</p>
<table>
<thead>
<tr>
<th>Field</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>tlsCASecretRef</code></br>
<em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.SecretReference">
SecretReference
</a>
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>serverTLSSecretRef</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.25/#secretreference-v1-core">
Kubernetes core/v1.SecretReference
</a>
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>clientTLSSecretRef</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.25/#secretreference-v1-core">
Kubernetes core/v1.SecretReference
</a>
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
</tbody>
</table>
<h3 id="druid.gardener.cloud/v1alpha1.WaitForFinalSnapshotSpec">WaitForFinalSnapshotSpec
</h3>
<p>
(<em>Appears on:</em>
<a href="/docs/other-components/etcd-druid/api-reference/#druid.gardener.cloud/v1alpha1.EtcdCopyBackupsTaskSpec">EtcdCopyBackupsTaskSpec</a>)
</p>
<p>
<p>WaitForFinalSnapshotSpec defines the parameters for waiting for a final full snapshot before copying backups.</p>
</p>
<table>
<thead>
<tr>
<th>Field</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>enabled</code></br>
<em>
bool
</em>
</td>
<td>
<p>Enabled specifies whether to wait for a final full snapshot before copying backups.</p>
</td>
</tr>
<tr>
<td>
<code>timeout</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.25/#duration-v1-meta">
Kubernetes meta/v1.Duration
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Timeout is the timeout for waiting for a final full snapshot. When this timeout expires, the copying of backups
will be performed anyway. No timeout or 0 means wait forever.</p>
</td>
</tr>
</tbody>
</table>
<hr/>
<p><em>
Generated with <a href="https://github.com/ahmetb/gen-crd-api-reference-docs">gen-crd-api-reference-docs</a>
</em></p>`;return(i,t)=>(o(),d("div",null,[t[0]||(t[0]=e("h1",{id:"api-reference",tabindex:"-1"},[a("API Reference "),e("a",{class:"header-anchor",href:"#api-reference","aria-label":'Permalink to "API Reference"'},"​")],-1)),e("div",{innerHTML:r})]))}});export{s as __pageData,m as default};
