---
title: Core
url: /api-reference/core
remote: https://github.com/gardener/gardener/blob/master/hack/api-reference/core.md
type: docs
---
<p>Packages:</p>
<ul>
<li>
<a href="#core.gardener.cloud%2fv1beta1">core.gardener.cloud/v1beta1</a>
</li>
</ul>
<h2 id="core.gardener.cloud/v1beta1">core.gardener.cloud/v1beta1</h2>
<p>
<p>Package v1beta1 is a version of the API.</p>
</p>
Resource Types:
<ul><li>
<a href="#core.gardener.cloud/v1beta1.BackupBucket">BackupBucket</a>
</li><li>
<a href="#core.gardener.cloud/v1beta1.BackupEntry">BackupEntry</a>
</li><li>
<a href="#core.gardener.cloud/v1beta1.CloudProfile">CloudProfile</a>
</li><li>
<a href="#core.gardener.cloud/v1beta1.ControllerInstallation">ControllerInstallation</a>
</li><li>
<a href="#core.gardener.cloud/v1beta1.ControllerRegistration">ControllerRegistration</a>
</li><li>
<a href="#core.gardener.cloud/v1beta1.Plant">Plant</a>
</li><li>
<a href="#core.gardener.cloud/v1beta1.Project">Project</a>
</li><li>
<a href="#core.gardener.cloud/v1beta1.Quota">Quota</a>
</li><li>
<a href="#core.gardener.cloud/v1beta1.SecretBinding">SecretBinding</a>
</li><li>
<a href="#core.gardener.cloud/v1beta1.Seed">Seed</a>
</li><li>
<a href="#core.gardener.cloud/v1beta1.Shoot">Shoot</a>
</li></ul>
<h3 id="core.gardener.cloud/v1beta1.BackupBucket">BackupBucket
</h3>
<p>
<p>BackupBucket holds details about backup bucket</p>
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
<code>apiVersion</code></br>
string</td>
<td>
<code>
core.gardener.cloud/v1beta1
</code>
</td>
</tr>
<tr>
<td>
<code>kind</code></br>
string
</td>
<td><code>BackupBucket</code></td>
</tr>
<tr>
<td>
<code>metadata</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.15/#objectmeta-v1-meta">
Kubernetes meta/v1.ObjectMeta
</a>
</em>
</td>
<td>
<p>Standard object metadata.</p>
Refer to the Kubernetes API documentation for the fields of the
<code>metadata</code> field.
</td>
</tr>
<tr>
<td>
<code>spec</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.BackupBucketSpec">
BackupBucketSpec
</a>
</em>
</td>
<td>
<p>Specification of the Backup Bucket.</p>
<br/>
<br/>
<table>
<tr>
<td>
<code>provider</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.BackupBucketProvider">
BackupBucketProvider
</a>
</em>
</td>
<td>
<p>Provider hold the details of cloud provider of the object store.</p>
</td>
</tr>
<tr>
<td>
<code>providerConfig</code></br>
<em>
<a href="https://godoc.org/k8s.io/apimachinery/pkg/runtime#RawExtension">
k8s.io/apimachinery/pkg/runtime.RawExtension
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>ProviderConfig is the configuration passed to BackupBucket resource.</p>
</td>
</tr>
<tr>
<td>
<code>secretRef</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.15/#secretreference-v1-core">
Kubernetes core/v1.SecretReference
</a>
</em>
</td>
<td>
<p>SecretRef is a reference to a secret that contains the credentials to access object store.</p>
</td>
</tr>
<tr>
<td>
<code>seedName</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>SeedName holds the name of the seed allocated to BackupBucket for running controller.</p>
</td>
</tr>
</table>
</td>
</tr>
<tr>
<td>
<code>status</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.BackupBucketStatus">
BackupBucketStatus
</a>
</em>
</td>
<td>
<p>Most recently observed status of the Backup Bucket.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.BackupEntry">BackupEntry
</h3>
<p>
<p>BackupEntry holds details about shoot backup.</p>
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
<code>apiVersion</code></br>
string</td>
<td>
<code>
core.gardener.cloud/v1beta1
</code>
</td>
</tr>
<tr>
<td>
<code>kind</code></br>
string
</td>
<td><code>BackupEntry</code></td>
</tr>
<tr>
<td>
<code>metadata</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.15/#objectmeta-v1-meta">
Kubernetes meta/v1.ObjectMeta
</a>
</em>
</td>
<td>
<p>Standard object metadata.</p>
Refer to the Kubernetes API documentation for the fields of the
<code>metadata</code> field.
</td>
</tr>
<tr>
<td>
<code>spec</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.BackupEntrySpec">
BackupEntrySpec
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Spec contains the specification of the Backup Entry.</p>
<br/>
<br/>
<table>
<tr>
<td>
<code>bucketName</code></br>
<em>
string
</em>
</td>
<td>
<p>BucketName is the name of backup bucket for this Backup Entry.</p>
</td>
</tr>
<tr>
<td>
<code>seedName</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>SeedName holds the name of the seed allocated to BackupEntry for running controller.</p>
</td>
</tr>
</table>
</td>
</tr>
<tr>
<td>
<code>status</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.BackupEntryStatus">
BackupEntryStatus
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Status contains the most recently observed status of the Backup Entry.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.CloudProfile">CloudProfile
</h3>
<p>
<p>CloudProfile represents certain properties about a provider environment.</p>
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
<code>apiVersion</code></br>
string</td>
<td>
<code>
core.gardener.cloud/v1beta1
</code>
</td>
</tr>
<tr>
<td>
<code>kind</code></br>
string
</td>
<td><code>CloudProfile</code></td>
</tr>
<tr>
<td>
<code>metadata</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.15/#objectmeta-v1-meta">
Kubernetes meta/v1.ObjectMeta
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Standard object metadata.</p>
Refer to the Kubernetes API documentation for the fields of the
<code>metadata</code> field.
</td>
</tr>
<tr>
<td>
<code>spec</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.CloudProfileSpec">
CloudProfileSpec
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Spec defines the provider environment properties.</p>
<br/>
<br/>
<table>
<tr>
<td>
<code>caBundle</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>CABundle is a certificate bundle which will be installed onto every host machine of shoot cluster targeting this profile.</p>
</td>
</tr>
<tr>
<td>
<code>kubernetes</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.KubernetesSettings">
KubernetesSettings
</a>
</em>
</td>
<td>
<p>Kubernetes contains constraints regarding allowed values of the &lsquo;kubernetes&rsquo; block in the Shoot specification.</p>
</td>
</tr>
<tr>
<td>
<code>machineImages</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.MachineImage">
[]MachineImage
</a>
</em>
</td>
<td>
<p>MachineImages contains constraints regarding allowed values for machine images in the Shoot specification.</p>
</td>
</tr>
<tr>
<td>
<code>machineTypes</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.MachineType">
[]MachineType
</a>
</em>
</td>
<td>
<p>MachineTypes contains constraints regarding allowed values for machine types in the &lsquo;workers&rsquo; block in the Shoot specification.</p>
</td>
</tr>
<tr>
<td>
<code>providerConfig</code></br>
<em>
<a href="https://godoc.org/k8s.io/apimachinery/pkg/runtime#RawExtension">
k8s.io/apimachinery/pkg/runtime.RawExtension
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>ProviderConfig contains provider-specific configuration for the profile.</p>
</td>
</tr>
<tr>
<td>
<code>regions</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.Region">
[]Region
</a>
</em>
</td>
<td>
<p>Regions contains constraints regarding allowed values for regions and zones.</p>
</td>
</tr>
<tr>
<td>
<code>seedSelector</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.15/#labelselector-v1-meta">
Kubernetes meta/v1.LabelSelector
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>SeedSelector contains an optional list of labels on <code>Seed</code> resources that marks those seeds whose shoots may use this provider profile.
An empty list means that all seeds of the same provider type are supported.
This is useful for environments that are of the same type (like openstack) but may have different &ldquo;instances&rdquo;/landscapes.</p>
</td>
</tr>
<tr>
<td>
<code>type</code></br>
<em>
string
</em>
</td>
<td>
<p>Type is the name of the provider.</p>
</td>
</tr>
<tr>
<td>
<code>volumeTypes</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.VolumeType">
[]VolumeType
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>VolumeTypes contains constraints regarding allowed values for volume types in the &lsquo;workers&rsquo; block in the Shoot specification.</p>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.ControllerInstallation">ControllerInstallation
</h3>
<p>
<p>ControllerInstallation represents an installation request for an external controller.</p>
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
<code>apiVersion</code></br>
string</td>
<td>
<code>
core.gardener.cloud/v1beta1
</code>
</td>
</tr>
<tr>
<td>
<code>kind</code></br>
string
</td>
<td><code>ControllerInstallation</code></td>
</tr>
<tr>
<td>
<code>metadata</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.15/#objectmeta-v1-meta">
Kubernetes meta/v1.ObjectMeta
</a>
</em>
</td>
<td>
<p>Standard object metadata.</p>
Refer to the Kubernetes API documentation for the fields of the
<code>metadata</code> field.
</td>
</tr>
<tr>
<td>
<code>spec</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.ControllerInstallationSpec">
ControllerInstallationSpec
</a>
</em>
</td>
<td>
<p>Spec contains the specification of this installation.</p>
<br/>
<br/>
<table>
<tr>
<td>
<code>registrationRef</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.15/#objectreference-v1-core">
Kubernetes core/v1.ObjectReference
</a>
</em>
</td>
<td>
<p>RegistrationRef is used to reference a ControllerRegistration resources.</p>
</td>
</tr>
<tr>
<td>
<code>seedRef</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.15/#objectreference-v1-core">
Kubernetes core/v1.ObjectReference
</a>
</em>
</td>
<td>
<p>SeedRef is used to reference a Seed resources.</p>
</td>
</tr>
</table>
</td>
</tr>
<tr>
<td>
<code>status</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.ControllerInstallationStatus">
ControllerInstallationStatus
</a>
</em>
</td>
<td>
<p>Status contains the status of this installation.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.ControllerRegistration">ControllerRegistration
</h3>
<p>
<p>ControllerRegistration represents a registration of an external controller.</p>
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
<code>apiVersion</code></br>
string</td>
<td>
<code>
core.gardener.cloud/v1beta1
</code>
</td>
</tr>
<tr>
<td>
<code>kind</code></br>
string
</td>
<td><code>ControllerRegistration</code></td>
</tr>
<tr>
<td>
<code>metadata</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.15/#objectmeta-v1-meta">
Kubernetes meta/v1.ObjectMeta
</a>
</em>
</td>
<td>
<p>Standard object metadata.</p>
Refer to the Kubernetes API documentation for the fields of the
<code>metadata</code> field.
</td>
</tr>
<tr>
<td>
<code>spec</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.ControllerRegistrationSpec">
ControllerRegistrationSpec
</a>
</em>
</td>
<td>
<p>Spec contains the specification of this registration.</p>
<br/>
<br/>
<table>
<tr>
<td>
<code>resources</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.ControllerResource">
[]ControllerResource
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Resources is a list of combinations of kinds (DNSProvider, Infrastructure, Generic, &hellip;) and their actual types
(aws-route53, gcp, auditlog, &hellip;).</p>
</td>
</tr>
<tr>
<td>
<code>deployment</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.ControllerDeployment">
ControllerDeployment
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Deployment contains information for how this controller is deployed.</p>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.Plant">Plant
</h3>
<p>
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
<code>apiVersion</code></br>
string</td>
<td>
<code>
core.gardener.cloud/v1beta1
</code>
</td>
</tr>
<tr>
<td>
<code>kind</code></br>
string
</td>
<td><code>Plant</code></td>
</tr>
<tr>
<td>
<code>metadata</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.15/#objectmeta-v1-meta">
Kubernetes meta/v1.ObjectMeta
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Standard object metadata.</p>
Refer to the Kubernetes API documentation for the fields of the
<code>metadata</code> field.
</td>
</tr>
<tr>
<td>
<code>spec</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.PlantSpec">
PlantSpec
</a>
</em>
</td>
<td>
<p>Spec contains the specification of this Plant.</p>
<br/>
<br/>
<table>
<tr>
<td>
<code>secretRef</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.15/#localobjectreference-v1-core">
Kubernetes core/v1.LocalObjectReference
</a>
</em>
</td>
<td>
<p>SecretRef is a reference to a Secret object containing the Kubeconfig of the external kubernetes
clusters to be added to Gardener.</p>
</td>
</tr>
<tr>
<td>
<code>endpoints</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.Endpoint">
[]Endpoint
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Endpoints is the configuration plant endpoints</p>
</td>
</tr>
</table>
</td>
</tr>
<tr>
<td>
<code>status</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.PlantStatus">
PlantStatus
</a>
</em>
</td>
<td>
<p>Status contains the status of this Plant.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.Project">Project
</h3>
<p>
<p>Project holds certain properties about a Gardener project.</p>
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
<code>apiVersion</code></br>
string</td>
<td>
<code>
core.gardener.cloud/v1beta1
</code>
</td>
</tr>
<tr>
<td>
<code>kind</code></br>
string
</td>
<td><code>Project</code></td>
</tr>
<tr>
<td>
<code>metadata</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.15/#objectmeta-v1-meta">
Kubernetes meta/v1.ObjectMeta
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Standard object metadata.</p>
Refer to the Kubernetes API documentation for the fields of the
<code>metadata</code> field.
</td>
</tr>
<tr>
<td>
<code>spec</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.ProjectSpec">
ProjectSpec
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Spec defines the project properties.</p>
<br/>
<br/>
<table>
<tr>
<td>
<code>createdBy</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.15/#subject-v1-rbac">
Kubernetes rbac/v1.Subject
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>CreatedBy is a subject representing a user name, an email address, or any other identifier of a user
who created the project.</p>
</td>
</tr>
<tr>
<td>
<code>description</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>Description is a human-readable description of what the project is used for.</p>
</td>
</tr>
<tr>
<td>
<code>owner</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.15/#subject-v1-rbac">
Kubernetes rbac/v1.Subject
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Owner is a subject representing a user name, an email address, or any other identifier of a user owning
the project.
IMPORTANT: Be aware that this field will be removed in the <code>v1</code> version of this API in favor of the <code>owner</code>
role. The only way to change the owner will be by moving the <code>owner</code> role. In this API version the only way
to change the owner is to use this field.
TODO: Remove this field in favor of the <code>owner</code> role in <code>v1</code>.</p>
</td>
</tr>
<tr>
<td>
<code>purpose</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>Purpose is a human-readable explanation of the project&rsquo;s purpose.</p>
</td>
</tr>
<tr>
<td>
<code>members</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.ProjectMember">
[]ProjectMember
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Members is a list of subjects representing a user name, an email address, or any other identifier of a user,
group, or service account that has a certain role.</p>
</td>
</tr>
<tr>
<td>
<code>namespace</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>Namespace is the name of the namespace that has been created for the Project object.
A nil value means that Gardener will determine the name of the namespace.</p>
</td>
</tr>
<tr>
<td>
<code>tolerations</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.ProjectTolerations">
ProjectTolerations
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Tolerations contains the tolerations for taints on seed clusters.</p>
</td>
</tr>
</table>
</td>
</tr>
<tr>
<td>
<code>status</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.ProjectStatus">
ProjectStatus
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Most recently observed status of the Project.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.Quota">Quota
</h3>
<p>
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
<code>apiVersion</code></br>
string</td>
<td>
<code>
core.gardener.cloud/v1beta1
</code>
</td>
</tr>
<tr>
<td>
<code>kind</code></br>
string
</td>
<td><code>Quota</code></td>
</tr>
<tr>
<td>
<code>metadata</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.15/#objectmeta-v1-meta">
Kubernetes meta/v1.ObjectMeta
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Standard object metadata.</p>
Refer to the Kubernetes API documentation for the fields of the
<code>metadata</code> field.
</td>
</tr>
<tr>
<td>
<code>spec</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.QuotaSpec">
QuotaSpec
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Spec defines the Quota constraints.</p>
<br/>
<br/>
<table>
<tr>
<td>
<code>clusterLifetimeDays</code></br>
<em>
int32
</em>
</td>
<td>
<em>(Optional)</em>
<p>ClusterLifetimeDays is the lifetime of a Shoot cluster in days before it will be terminated automatically.</p>
</td>
</tr>
<tr>
<td>
<code>metrics</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.15/#resourcelist-v1-core">
Kubernetes core/v1.ResourceList
</a>
</em>
</td>
<td>
<p>Metrics is a list of resources which will be put under constraints.</p>
</td>
</tr>
<tr>
<td>
<code>scope</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.15/#objectreference-v1-core">
Kubernetes core/v1.ObjectReference
</a>
</em>
</td>
<td>
<p>Scope is the scope of the Quota object, either &lsquo;project&rsquo; or &lsquo;secret&rsquo;.</p>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.SecretBinding">SecretBinding
</h3>
<p>
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
<code>apiVersion</code></br>
string</td>
<td>
<code>
core.gardener.cloud/v1beta1
</code>
</td>
</tr>
<tr>
<td>
<code>kind</code></br>
string
</td>
<td><code>SecretBinding</code></td>
</tr>
<tr>
<td>
<code>metadata</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.15/#objectmeta-v1-meta">
Kubernetes meta/v1.ObjectMeta
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Standard object metadata.</p>
Refer to the Kubernetes API documentation for the fields of the
<code>metadata</code> field.
</td>
</tr>
<tr>
<td>
<code>secretRef</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.15/#secretreference-v1-core">
Kubernetes core/v1.SecretReference
</a>
</em>
</td>
<td>
<p>SecretRef is a reference to a secret object in the same or another namespace.</p>
</td>
</tr>
<tr>
<td>
<code>quotas</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.15/#objectreference-v1-core">
[]Kubernetes core/v1.ObjectReference
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Quotas is a list of references to Quota objects in the same or another namespace.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.Seed">Seed
</h3>
<p>
<p>Seed represents an installation request for an external controller.</p>
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
<code>apiVersion</code></br>
string</td>
<td>
<code>
core.gardener.cloud/v1beta1
</code>
</td>
</tr>
<tr>
<td>
<code>kind</code></br>
string
</td>
<td><code>Seed</code></td>
</tr>
<tr>
<td>
<code>metadata</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.15/#objectmeta-v1-meta">
Kubernetes meta/v1.ObjectMeta
</a>
</em>
</td>
<td>
<p>Standard object metadata.</p>
Refer to the Kubernetes API documentation for the fields of the
<code>metadata</code> field.
</td>
</tr>
<tr>
<td>
<code>spec</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.SeedSpec">
SeedSpec
</a>
</em>
</td>
<td>
<p>Spec contains the specification of this installation.</p>
<br/>
<br/>
<table>
<tr>
<td>
<code>backup</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.SeedBackup">
SeedBackup
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Backup holds the object store configuration for the backups of shoot (currently only etcd).
If it is not specified, then there won&rsquo;t be any backups taken for shoots associated with this seed.
If backup field is present in seed, then backups of the etcd from shoot control plane will be stored
under the configured object store.</p>
</td>
</tr>
<tr>
<td>
<code>dns</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.SeedDNS">
SeedDNS
</a>
</em>
</td>
<td>
<p>DNS contains DNS-relevant information about this seed cluster.</p>
</td>
</tr>
<tr>
<td>
<code>networks</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.SeedNetworks">
SeedNetworks
</a>
</em>
</td>
<td>
<p>Networks defines the pod, service and worker network of the Seed cluster.</p>
</td>
</tr>
<tr>
<td>
<code>provider</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.SeedProvider">
SeedProvider
</a>
</em>
</td>
<td>
<p>Provider defines the provider type and region for this Seed cluster.</p>
</td>
</tr>
<tr>
<td>
<code>secretRef</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.15/#secretreference-v1-core">
Kubernetes core/v1.SecretReference
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>SecretRef is a reference to a Secret object containing the Kubeconfig and the cloud provider credentials for
the account the Seed cluster has been deployed to.</p>
</td>
</tr>
<tr>
<td>
<code>taints</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.SeedTaint">
[]SeedTaint
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Taints describes taints on the seed.</p>
</td>
</tr>
<tr>
<td>
<code>volume</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.SeedVolume">
SeedVolume
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Volume contains settings for persistentvolumes created in the seed cluster.</p>
</td>
</tr>
<tr>
<td>
<code>settings</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.SeedSettings">
SeedSettings
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Settings contains certain settings for this seed cluster.</p>
</td>
</tr>
</table>
</td>
</tr>
<tr>
<td>
<code>status</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.SeedStatus">
SeedStatus
</a>
</em>
</td>
<td>
<p>Status contains the status of this installation.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.Shoot">Shoot
</h3>
<p>
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
<code>apiVersion</code></br>
string</td>
<td>
<code>
core.gardener.cloud/v1beta1
</code>
</td>
</tr>
<tr>
<td>
<code>kind</code></br>
string
</td>
<td><code>Shoot</code></td>
</tr>
<tr>
<td>
<code>metadata</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.15/#objectmeta-v1-meta">
Kubernetes meta/v1.ObjectMeta
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Standard object metadata.</p>
Refer to the Kubernetes API documentation for the fields of the
<code>metadata</code> field.
</td>
</tr>
<tr>
<td>
<code>spec</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.ShootSpec">
ShootSpec
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Specification of the Shoot cluster.</p>
<br/>
<br/>
<table>
<tr>
<td>
<code>addons</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.Addons">
Addons
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Addons contains information about enabled/disabled addons and their configuration.</p>
</td>
</tr>
<tr>
<td>
<code>cloudProfileName</code></br>
<em>
string
</em>
</td>
<td>
<p>CloudProfileName is a name of a CloudProfile object.</p>
</td>
</tr>
<tr>
<td>
<code>dns</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.DNS">
DNS
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>DNS contains information about the DNS settings of the Shoot.</p>
</td>
</tr>
<tr>
<td>
<code>extensions</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.Extension">
[]Extension
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Extensions contain type and provider information for Shoot extensions.</p>
</td>
</tr>
<tr>
<td>
<code>hibernation</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.Hibernation">
Hibernation
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Hibernation contains information whether the Shoot is suspended or not.</p>
</td>
</tr>
<tr>
<td>
<code>kubernetes</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.Kubernetes">
Kubernetes
</a>
</em>
</td>
<td>
<p>Kubernetes contains the version and configuration settings of the control plane components.</p>
</td>
</tr>
<tr>
<td>
<code>networking</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.Networking">
Networking
</a>
</em>
</td>
<td>
<p>Networking contains information about cluster networking such as CNI Plugin type, CIDRs, &hellip;etc.</p>
</td>
</tr>
<tr>
<td>
<code>maintenance</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.Maintenance">
Maintenance
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Maintenance contains information about the time window for maintenance operations and which
operations should be performed.</p>
</td>
</tr>
<tr>
<td>
<code>monitoring</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.Monitoring">
Monitoring
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Monitoring contains information about custom monitoring configurations for the shoot.</p>
</td>
</tr>
<tr>
<td>
<code>provider</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.Provider">
Provider
</a>
</em>
</td>
<td>
<p>Provider contains all provider-specific and provider-relevant information.</p>
</td>
</tr>
<tr>
<td>
<code>purpose</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.ShootPurpose">
ShootPurpose
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Purpose is the purpose class for this cluster.</p>
</td>
</tr>
<tr>
<td>
<code>region</code></br>
<em>
string
</em>
</td>
<td>
<p>Region is a name of a region.</p>
</td>
</tr>
<tr>
<td>
<code>secretBindingName</code></br>
<em>
string
</em>
</td>
<td>
<p>SecretBindingName is the name of the a SecretBinding that has a reference to the provider secret.
The credentials inside the provider secret will be used to create the shoot in the respective account.</p>
</td>
</tr>
<tr>
<td>
<code>seedName</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>SeedName is the name of the seed cluster that runs the control plane of the Shoot.</p>
</td>
</tr>
<tr>
<td>
<code>seedSelector</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.15/#labelselector-v1-meta">
Kubernetes meta/v1.LabelSelector
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>SeedSelector is an optional selector which must match a seed&rsquo;s labels for the shoot to be scheduled on that seed.</p>
</td>
</tr>
<tr>
<td>
<code>resources</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.NamedResourceReference">
[]NamedResourceReference
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Resources holds a list of named resource references that can be referred to in extension configs by their names.</p>
</td>
</tr>
<tr>
<td>
<code>tolerations</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.Toleration">
[]Toleration
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Tolerations contains the tolerations for taints on seed clusters.</p>
</td>
</tr>
</table>
</td>
</tr>
<tr>
<td>
<code>status</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.ShootStatus">
ShootStatus
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Most recently observed status of the Shoot cluster.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.Addon">Addon
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.KubernetesDashboard">KubernetesDashboard</a>, 
<a href="#core.gardener.cloud/v1beta1.NginxIngress">NginxIngress</a>)
</p>
<p>
<p>Addon allows enabling or disabling a specific addon and is used to derive from.</p>
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
<p>Enabled indicates whether the addon is enabled or not.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.Addons">Addons
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.ShootSpec">ShootSpec</a>)
</p>
<p>
<p>Addons is a collection of configuration for specific addons which are managed by the Gardener.</p>
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
<code>kubernetesDashboard</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.KubernetesDashboard">
KubernetesDashboard
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>KubernetesDashboard holds configuration settings for the kubernetes dashboard addon.</p>
</td>
</tr>
<tr>
<td>
<code>nginxIngress</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.NginxIngress">
NginxIngress
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>NginxIngress holds configuration settings for the nginx-ingress addon.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.AdmissionPlugin">AdmissionPlugin
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.KubeAPIServerConfig">KubeAPIServerConfig</a>)
</p>
<p>
<p>AdmissionPlugin contains information about a specific admission plugin and its corresponding configuration.</p>
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
<p>Name is the name of the plugin.</p>
</td>
</tr>
<tr>
<td>
<code>config</code></br>
<em>
<a href="https://godoc.org/k8s.io/apimachinery/pkg/runtime#RawExtension">
k8s.io/apimachinery/pkg/runtime.RawExtension
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Config is the configuration of the plugin.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.Alerting">Alerting
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.Monitoring">Monitoring</a>)
</p>
<p>
<p>Alerting contains information about how alerting will be done (i.e. who will receive alerts and how).</p>
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
<code>emailReceivers</code></br>
<em>
[]string
</em>
</td>
<td>
<em>(Optional)</em>
<p>MonitoringEmailReceivers is a list of recipients for alerts</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.AuditConfig">AuditConfig
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.KubeAPIServerConfig">KubeAPIServerConfig</a>)
</p>
<p>
<p>AuditConfig contains settings for audit of the api server</p>
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
<code>auditPolicy</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.AuditPolicy">
AuditPolicy
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>AuditPolicy contains configuration settings for audit policy of the kube-apiserver.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.AuditPolicy">AuditPolicy
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.AuditConfig">AuditConfig</a>)
</p>
<p>
<p>AuditPolicy contains audit policy for kube-apiserver</p>
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
<code>configMapRef</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.15/#objectreference-v1-core">
Kubernetes core/v1.ObjectReference
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>ConfigMapRef is a reference to a ConfigMap object in the same namespace,
which contains the audit policy for the kube-apiserver.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.AvailabilityZone">AvailabilityZone
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.Region">Region</a>)
</p>
<p>
<p>AvailabilityZone is an availability zone.</p>
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
<p>Name is an an availability zone name.</p>
</td>
</tr>
<tr>
<td>
<code>unavailableMachineTypes</code></br>
<em>
[]string
</em>
</td>
<td>
<em>(Optional)</em>
<p>UnavailableMachineTypes is a list of machine type names that are not availability in this zone.</p>
</td>
</tr>
<tr>
<td>
<code>unavailableVolumeTypes</code></br>
<em>
[]string
</em>
</td>
<td>
<em>(Optional)</em>
<p>UnavailableVolumeTypes is a list of volume type names that are not availability in this zone.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.BackupBucketProvider">BackupBucketProvider
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.BackupBucketSpec">BackupBucketSpec</a>)
</p>
<p>
<p>BackupBucketProvider holds the details of cloud provider of the object store.</p>
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
string
</em>
</td>
<td>
<p>Type is the type of provider.</p>
</td>
</tr>
<tr>
<td>
<code>region</code></br>
<em>
string
</em>
</td>
<td>
<p>Region is the region of the bucket.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.BackupBucketSpec">BackupBucketSpec
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.BackupBucket">BackupBucket</a>)
</p>
<p>
<p>BackupBucketSpec is the specification of a Backup Bucket.</p>
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
<code>provider</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.BackupBucketProvider">
BackupBucketProvider
</a>
</em>
</td>
<td>
<p>Provider hold the details of cloud provider of the object store.</p>
</td>
</tr>
<tr>
<td>
<code>providerConfig</code></br>
<em>
<a href="https://godoc.org/k8s.io/apimachinery/pkg/runtime#RawExtension">
k8s.io/apimachinery/pkg/runtime.RawExtension
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>ProviderConfig is the configuration passed to BackupBucket resource.</p>
</td>
</tr>
<tr>
<td>
<code>secretRef</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.15/#secretreference-v1-core">
Kubernetes core/v1.SecretReference
</a>
</em>
</td>
<td>
<p>SecretRef is a reference to a secret that contains the credentials to access object store.</p>
</td>
</tr>
<tr>
<td>
<code>seedName</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>SeedName holds the name of the seed allocated to BackupBucket for running controller.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.BackupBucketStatus">BackupBucketStatus
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.BackupBucket">BackupBucket</a>)
</p>
<p>
<p>BackupBucketStatus holds the most recently observed status of the Backup Bucket.</p>
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
<code>providerStatus</code></br>
<em>
<a href="https://godoc.org/k8s.io/apimachinery/pkg/runtime#RawExtension">
k8s.io/apimachinery/pkg/runtime.RawExtension
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>ProviderStatus is the configuration passed to BackupBucket resource.</p>
</td>
</tr>
<tr>
<td>
<code>lastOperation</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.LastOperation">
LastOperation
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>LastOperation holds information about the last operation on the BackupBucket.</p>
</td>
</tr>
<tr>
<td>
<code>lastError</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.LastError">
LastError
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>LastError holds information about the last occurred error during an operation.</p>
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
<p>ObservedGeneration is the most recent generation observed for this BackupBucket. It corresponds to the
BackupBucket&rsquo;s generation, which is updated on mutation by the API Server.</p>
</td>
</tr>
<tr>
<td>
<code>generatedSecretRef</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.15/#secretreference-v1-core">
Kubernetes core/v1.SecretReference
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>GeneratedSecretRef is reference to the secret generated by backup bucket, which
will have object store specific credentials.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.BackupEntrySpec">BackupEntrySpec
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.BackupEntry">BackupEntry</a>)
</p>
<p>
<p>BackupEntrySpec is the specification of a Backup Entry.</p>
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
<code>bucketName</code></br>
<em>
string
</em>
</td>
<td>
<p>BucketName is the name of backup bucket for this Backup Entry.</p>
</td>
</tr>
<tr>
<td>
<code>seedName</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>SeedName holds the name of the seed allocated to BackupEntry for running controller.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.BackupEntryStatus">BackupEntryStatus
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.BackupEntry">BackupEntry</a>)
</p>
<p>
<p>BackupEntryStatus holds the most recently observed status of the Backup Entry.</p>
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
<code>lastOperation</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.LastOperation">
LastOperation
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>LastOperation holds information about the last operation on the BackupEntry.</p>
</td>
</tr>
<tr>
<td>
<code>lastError</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.LastError">
LastError
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>LastError holds information about the last occurred error during an operation.</p>
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
<p>ObservedGeneration is the most recent generation observed for this BackupEntry. It corresponds to the
BackupEntry&rsquo;s generation, which is updated on mutation by the API Server.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.CRI">CRI
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.Worker">Worker</a>)
</p>
<p>
<p>CRI contains information about the Container Runtimes.</p>
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
<a href="#core.gardener.cloud/v1beta1.CRIName">
CRIName
</a>
</em>
</td>
<td>
<p>The name of the CRI library</p>
</td>
</tr>
<tr>
<td>
<code>containerRuntimes</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.ContainerRuntime">
[]ContainerRuntime
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>ContainerRuntimes is the list of the required container runtimes supported for a worker pool.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.CRIName">CRIName
(<code>string</code> alias)</p></h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.CRI">CRI</a>)
</p>
<p>
<p>CRIName is a type alias for the CRI name string.</p>
</p>
<h3 id="core.gardener.cloud/v1beta1.CloudInfo">CloudInfo
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.ClusterInfo">ClusterInfo</a>)
</p>
<p>
<p>CloudInfo contains information about the cloud</p>
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
string
</em>
</td>
<td>
<p>Type is the cloud type</p>
</td>
</tr>
<tr>
<td>
<code>region</code></br>
<em>
string
</em>
</td>
<td>
<p>Region is the cloud region</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.CloudProfileSpec">CloudProfileSpec
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.CloudProfile">CloudProfile</a>)
</p>
<p>
<p>CloudProfileSpec is the specification of a CloudProfile.
It must contain exactly one of its defined keys.</p>
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
<code>caBundle</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>CABundle is a certificate bundle which will be installed onto every host machine of shoot cluster targeting this profile.</p>
</td>
</tr>
<tr>
<td>
<code>kubernetes</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.KubernetesSettings">
KubernetesSettings
</a>
</em>
</td>
<td>
<p>Kubernetes contains constraints regarding allowed values of the &lsquo;kubernetes&rsquo; block in the Shoot specification.</p>
</td>
</tr>
<tr>
<td>
<code>machineImages</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.MachineImage">
[]MachineImage
</a>
</em>
</td>
<td>
<p>MachineImages contains constraints regarding allowed values for machine images in the Shoot specification.</p>
</td>
</tr>
<tr>
<td>
<code>machineTypes</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.MachineType">
[]MachineType
</a>
</em>
</td>
<td>
<p>MachineTypes contains constraints regarding allowed values for machine types in the &lsquo;workers&rsquo; block in the Shoot specification.</p>
</td>
</tr>
<tr>
<td>
<code>providerConfig</code></br>
<em>
<a href="https://godoc.org/k8s.io/apimachinery/pkg/runtime#RawExtension">
k8s.io/apimachinery/pkg/runtime.RawExtension
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>ProviderConfig contains provider-specific configuration for the profile.</p>
</td>
</tr>
<tr>
<td>
<code>regions</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.Region">
[]Region
</a>
</em>
</td>
<td>
<p>Regions contains constraints regarding allowed values for regions and zones.</p>
</td>
</tr>
<tr>
<td>
<code>seedSelector</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.15/#labelselector-v1-meta">
Kubernetes meta/v1.LabelSelector
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>SeedSelector contains an optional list of labels on <code>Seed</code> resources that marks those seeds whose shoots may use this provider profile.
An empty list means that all seeds of the same provider type are supported.
This is useful for environments that are of the same type (like openstack) but may have different &ldquo;instances&rdquo;/landscapes.</p>
</td>
</tr>
<tr>
<td>
<code>type</code></br>
<em>
string
</em>
</td>
<td>
<p>Type is the name of the provider.</p>
</td>
</tr>
<tr>
<td>
<code>volumeTypes</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.VolumeType">
[]VolumeType
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>VolumeTypes contains constraints regarding allowed values for volume types in the &lsquo;workers&rsquo; block in the Shoot specification.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.ClusterAutoscaler">ClusterAutoscaler
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.Kubernetes">Kubernetes</a>)
</p>
<p>
<p>ClusterAutoscaler contains the configration flags for the Kubernetes cluster autoscaler.</p>
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
<code>scaleDownDelayAfterAdd</code></br>
<em>
<a href="https://godoc.org/k8s.io/apimachinery/pkg/apis/meta/v1#Duration">
Kubernetes meta/v1.Duration
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>ScaleDownDelayAfterAdd defines how long after scale up that scale down evaluation resumes (default: 1 hour).</p>
</td>
</tr>
<tr>
<td>
<code>scaleDownDelayAfterDelete</code></br>
<em>
<a href="https://godoc.org/k8s.io/apimachinery/pkg/apis/meta/v1#Duration">
Kubernetes meta/v1.Duration
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>ScaleDownDelayAfterDelete how long after node deletion that scale down evaluation resumes, defaults to scanInterval (defaults to ScanInterval).</p>
</td>
</tr>
<tr>
<td>
<code>scaleDownDelayAfterFailure</code></br>
<em>
<a href="https://godoc.org/k8s.io/apimachinery/pkg/apis/meta/v1#Duration">
Kubernetes meta/v1.Duration
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>ScaleDownDelayAfterFailure how long after scale down failure that scale down evaluation resumes (default: 3 mins).</p>
</td>
</tr>
<tr>
<td>
<code>scaleDownUnneededTime</code></br>
<em>
<a href="https://godoc.org/k8s.io/apimachinery/pkg/apis/meta/v1#Duration">
Kubernetes meta/v1.Duration
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>ScaleDownUnneededTime defines how long a node should be unneeded before it is eligible for scale down (default: 30 mins).</p>
</td>
</tr>
<tr>
<td>
<code>scaleDownUtilizationThreshold</code></br>
<em>
float64
</em>
</td>
<td>
<em>(Optional)</em>
<p>ScaleDownUtilizationThreshold defines the threshold in % under which a node is being removed</p>
</td>
</tr>
<tr>
<td>
<code>scanInterval</code></br>
<em>
<a href="https://godoc.org/k8s.io/apimachinery/pkg/apis/meta/v1#Duration">
Kubernetes meta/v1.Duration
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>ScanInterval how often cluster is reevaluated for scale up or down (default: 10 secs).</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.ClusterInfo">ClusterInfo
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.PlantStatus">PlantStatus</a>)
</p>
<p>
<p>ClusterInfo contains information about the Plant cluster</p>
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
<code>cloud</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.CloudInfo">
CloudInfo
</a>
</em>
</td>
<td>
<p>Cloud describes the cloud information</p>
</td>
</tr>
<tr>
<td>
<code>kubernetes</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.KubernetesInfo">
KubernetesInfo
</a>
</em>
</td>
<td>
<p>Kubernetes describes kubernetes meta information (e.g., version)</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.Condition">Condition
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.ControllerInstallationStatus">ControllerInstallationStatus</a>, 
<a href="#core.gardener.cloud/v1beta1.PlantStatus">PlantStatus</a>, 
<a href="#core.gardener.cloud/v1beta1.SeedStatus">SeedStatus</a>, 
<a href="#core.gardener.cloud/v1beta1.ShootStatus">ShootStatus</a>)
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
<a href="#core.gardener.cloud/v1beta1.ConditionType">
ConditionType
</a>
</em>
</td>
<td>
<p>Type of the Shoot condition.</p>
</td>
</tr>
<tr>
<td>
<code>status</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.ConditionStatus">
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
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.15/#time-v1-meta">
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
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.15/#time-v1-meta">
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
<p>The reason for the condition&rsquo;s last transition.</p>
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
<p>A human readable message indicating details about the transition.</p>
</td>
</tr>
<tr>
<td>
<code>codes</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.ErrorCode">
[]ErrorCode
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Well-defined error codes in case the condition reports a problem.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.ConditionStatus">ConditionStatus
(<code>string</code> alias)</p></h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.Condition">Condition</a>)
</p>
<p>
<p>ConditionStatus is the status of a condition.</p>
</p>
<h3 id="core.gardener.cloud/v1beta1.ConditionType">ConditionType
(<code>string</code> alias)</p></h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.Condition">Condition</a>)
</p>
<p>
<p>ConditionType is a string alias.</p>
</p>
<h3 id="core.gardener.cloud/v1beta1.ContainerRuntime">ContainerRuntime
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.CRI">CRI</a>)
</p>
<p>
<p>ContainerRuntime contains information about worker&rsquo;s available container runtime</p>
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
string
</em>
</td>
<td>
<p>Type is the type of the Container Runtime.</p>
</td>
</tr>
<tr>
<td>
<code>providerConfig</code></br>
<em>
<a href="https://godoc.org/k8s.io/apimachinery/pkg/runtime#RawExtension">
k8s.io/apimachinery/pkg/runtime.RawExtension
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>ProviderConfig is the configuration passed to container runtime resource.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.ControllerDeployment">ControllerDeployment
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.ControllerRegistrationSpec">ControllerRegistrationSpec</a>)
</p>
<p>
<p>ControllerDeployment contains information for how this controller is deployed.</p>
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
string
</em>
</td>
<td>
<p>Type is the deployment type.</p>
</td>
</tr>
<tr>
<td>
<code>providerConfig</code></br>
<em>
<a href="https://godoc.org/k8s.io/apimachinery/pkg/runtime#RawExtension">
k8s.io/apimachinery/pkg/runtime.RawExtension
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>ProviderConfig contains type-specific configuration.</p>
</td>
</tr>
<tr>
<td>
<code>policy</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.ControllerDeploymentPolicy">
ControllerDeploymentPolicy
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Policy controls how the controller is deployed. It defaults to &lsquo;OnDemand&rsquo;.</p>
</td>
</tr>
<tr>
<td>
<code>seedSelector</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.15/#labelselector-v1-meta">
Kubernetes meta/v1.LabelSelector
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>SeedSelector contains an optional label selector for seeds. Only if the labels match then this controller will be
considered for a deployment.
An empty list means that all seeds are selected.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.ControllerDeploymentPolicy">ControllerDeploymentPolicy
(<code>string</code> alias)</p></h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.ControllerDeployment">ControllerDeployment</a>)
</p>
<p>
<p>ControllerDeploymentPolicy is a string alias.</p>
</p>
<h3 id="core.gardener.cloud/v1beta1.ControllerInstallationSpec">ControllerInstallationSpec
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.ControllerInstallation">ControllerInstallation</a>)
</p>
<p>
<p>ControllerInstallationSpec is the specification of a ControllerInstallation.</p>
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
<code>registrationRef</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.15/#objectreference-v1-core">
Kubernetes core/v1.ObjectReference
</a>
</em>
</td>
<td>
<p>RegistrationRef is used to reference a ControllerRegistration resources.</p>
</td>
</tr>
<tr>
<td>
<code>seedRef</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.15/#objectreference-v1-core">
Kubernetes core/v1.ObjectReference
</a>
</em>
</td>
<td>
<p>SeedRef is used to reference a Seed resources.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.ControllerInstallationStatus">ControllerInstallationStatus
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.ControllerInstallation">ControllerInstallation</a>)
</p>
<p>
<p>ControllerInstallationStatus is the status of a ControllerInstallation.</p>
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
<a href="#core.gardener.cloud/v1beta1.Condition">
[]Condition
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Conditions represents the latest available observations of a ControllerInstallations&rsquo;s current state.</p>
</td>
</tr>
<tr>
<td>
<code>providerStatus</code></br>
<em>
<a href="https://godoc.org/k8s.io/apimachinery/pkg/runtime#RawExtension">
k8s.io/apimachinery/pkg/runtime.RawExtension
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>ProviderStatus contains type-specific status.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.ControllerRegistrationSpec">ControllerRegistrationSpec
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.ControllerRegistration">ControllerRegistration</a>)
</p>
<p>
<p>ControllerRegistrationSpec is the specification of a ControllerRegistration.</p>
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
<code>resources</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.ControllerResource">
[]ControllerResource
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Resources is a list of combinations of kinds (DNSProvider, Infrastructure, Generic, &hellip;) and their actual types
(aws-route53, gcp, auditlog, &hellip;).</p>
</td>
</tr>
<tr>
<td>
<code>deployment</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.ControllerDeployment">
ControllerDeployment
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Deployment contains information for how this controller is deployed.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.ControllerResource">ControllerResource
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.ControllerRegistrationSpec">ControllerRegistrationSpec</a>)
</p>
<p>
<p>ControllerResource is a combination of a kind (DNSProvider, Infrastructure, Generic, &hellip;) and the actual type for this
kind (aws-route53, gcp, auditlog, &hellip;).</p>
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
<p>Kind is the resource kind, for example &ldquo;OperatingSystemConfig&rdquo;.</p>
</td>
</tr>
<tr>
<td>
<code>type</code></br>
<em>
string
</em>
</td>
<td>
<p>Type is the resource type, for example &ldquo;coreos&rdquo; or &ldquo;ubuntu&rdquo;.</p>
</td>
</tr>
<tr>
<td>
<code>globallyEnabled</code></br>
<em>
bool
</em>
</td>
<td>
<em>(Optional)</em>
<p>GloballyEnabled determines if this ControllerResource is required by all Shoot clusters.</p>
</td>
</tr>
<tr>
<td>
<code>reconcileTimeout</code></br>
<em>
<a href="https://godoc.org/k8s.io/apimachinery/pkg/apis/meta/v1#Duration">
Kubernetes meta/v1.Duration
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>ReconcileTimeout defines how long Gardener should wait for the resource reconciliation.</p>
</td>
</tr>
<tr>
<td>
<code>primary</code></br>
<em>
bool
</em>
</td>
<td>
<em>(Optional)</em>
<p>Primary determines if the controller backed by this ControllerRegistration is responsible for the extension
resource&rsquo;s lifecycle. This field defaults to true. There must be exactly one primary controller for this kind/type
combination.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.DNS">DNS
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.ShootSpec">ShootSpec</a>)
</p>
<p>
<p>DNS holds information about the provider, the hosted zone id and the domain.</p>
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
<code>domain</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>Domain is the external available domain of the Shoot cluster. This domain will be written into the
kubeconfig that is handed out to end-users.</p>
</td>
</tr>
<tr>
<td>
<code>providers</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.DNSProvider">
[]DNSProvider
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Providers is a list of DNS providers that shall be enabled for this shoot cluster. Only relevant if
not a default domain is used.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.DNSIncludeExclude">DNSIncludeExclude
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.DNSProvider">DNSProvider</a>)
</p>
<p>
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
<code>include</code></br>
<em>
[]string
</em>
</td>
<td>
<em>(Optional)</em>
<p>Include is a list of resources that shall be included.</p>
</td>
</tr>
<tr>
<td>
<code>exclude</code></br>
<em>
[]string
</em>
</td>
<td>
<em>(Optional)</em>
<p>Exclude is a list of resources that shall be excluded.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.DNSProvider">DNSProvider
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.DNS">DNS</a>)
</p>
<p>
<p>DNSProvider contains information about a DNS provider.</p>
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
<code>domains</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.DNSIncludeExclude">
DNSIncludeExclude
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Domains contains information about which domains shall be included/excluded for this provider.</p>
</td>
</tr>
<tr>
<td>
<code>primary</code></br>
<em>
bool
</em>
</td>
<td>
<em>(Optional)</em>
<p>Primary indicates that this DNSProvider is used for shoot related domains.</p>
</td>
</tr>
<tr>
<td>
<code>secretName</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>SecretName is a name of a secret containing credentials for the stated domain and the
provider. When not specified, the Gardener will use the cloud provider credentials referenced
by the Shoot and try to find respective credentials there (primary provider only). Specifying this field may override
this behavior, i.e. forcing the Gardener to only look into the given secret.</p>
</td>
</tr>
<tr>
<td>
<code>type</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>Type is the DNS provider type.</p>
</td>
</tr>
<tr>
<td>
<code>zones</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.DNSIncludeExclude">
DNSIncludeExclude
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Zones contains information about which hosted zones shall be included/excluded for this provider.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.DataVolume">DataVolume
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.Worker">Worker</a>)
</p>
<p>
<p>DataVolume contains information about a data volume.</p>
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
<p>Name of the volume to make it referencable.</p>
</td>
</tr>
<tr>
<td>
<code>type</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>Type is the type of the volume.</p>
</td>
</tr>
<tr>
<td>
<code>size</code></br>
<em>
string
</em>
</td>
<td>
<p>VolumeSize is the size of the volume.</p>
</td>
</tr>
<tr>
<td>
<code>encrypted</code></br>
<em>
bool
</em>
</td>
<td>
<em>(Optional)</em>
<p>Encrypted determines if the volume should be encrypted.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.Endpoint">Endpoint
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.PlantSpec">PlantSpec</a>)
</p>
<p>
<p>Endpoint is an endpoint for monitoring, logging and other services around the plant.</p>
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
<p>Name is the name of the endpoint</p>
</td>
</tr>
<tr>
<td>
<code>url</code></br>
<em>
string
</em>
</td>
<td>
<p>URL is the url of the endpoint</p>
</td>
</tr>
<tr>
<td>
<code>purpose</code></br>
<em>
string
</em>
</td>
<td>
<p>Purpose is the purpose of the endpoint</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.ErrorCode">ErrorCode
(<code>string</code> alias)</p></h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.Condition">Condition</a>, 
<a href="#core.gardener.cloud/v1beta1.LastError">LastError</a>)
</p>
<p>
<p>ErrorCode is a string alias.</p>
</p>
<h3 id="core.gardener.cloud/v1beta1.ExpirableVersion">ExpirableVersion
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.KubernetesSettings">KubernetesSettings</a>, 
<a href="#core.gardener.cloud/v1beta1.MachineImage">MachineImage</a>)
</p>
<p>
<p>ExpirableVersion contains a version and an expiration date.</p>
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
<code>version</code></br>
<em>
string
</em>
</td>
<td>
<p>Version is the version identifier.</p>
</td>
</tr>
<tr>
<td>
<code>expirationDate</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.15/#time-v1-meta">
Kubernetes meta/v1.Time
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>ExpirationDate defines the time at which this version expires.</p>
</td>
</tr>
<tr>
<td>
<code>classification</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.VersionClassification">
VersionClassification
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Classification defines the state of a version (preview, supported, deprecated)</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.Extension">Extension
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.ShootSpec">ShootSpec</a>)
</p>
<p>
<p>Extension contains type and provider information for Shoot extensions.</p>
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
string
</em>
</td>
<td>
<p>Type is the type of the extension resource.</p>
</td>
</tr>
<tr>
<td>
<code>providerConfig</code></br>
<em>
<a href="https://godoc.org/k8s.io/apimachinery/pkg/runtime#RawExtension">
k8s.io/apimachinery/pkg/runtime.RawExtension
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>ProviderConfig is the configuration passed to extension resource.</p>
</td>
</tr>
<tr>
<td>
<code>disabled</code></br>
<em>
bool
</em>
</td>
<td>
<em>(Optional)</em>
<p>Disabled allows to disable extensions that were marked as &lsquo;globally enabled&rsquo; by Gardener administrators.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.Gardener">Gardener
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.SeedStatus">SeedStatus</a>, 
<a href="#core.gardener.cloud/v1beta1.ShootStatus">ShootStatus</a>)
</p>
<p>
<p>Gardener holds the information about the Gardener version that operated a resource.</p>
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
<code>id</code></br>
<em>
string
</em>
</td>
<td>
<p>ID is the Docker container id of the Gardener which last acted on a resource.</p>
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
<p>Name is the hostname (pod name) of the Gardener which last acted on a resource.</p>
</td>
</tr>
<tr>
<td>
<code>version</code></br>
<em>
string
</em>
</td>
<td>
<p>Version is the version of the Gardener which last acted on a resource.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.Hibernation">Hibernation
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.ShootSpec">ShootSpec</a>)
</p>
<p>
<p>Hibernation contains information whether the Shoot is suspended or not.</p>
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
<p>Enabled specifies whether the Shoot needs to be hibernated or not. If it is true, the Shoot&rsquo;s desired state is to be hibernated.
If it is false or nil, the Shoot&rsquo;s desired state is to be awaken.</p>
</td>
</tr>
<tr>
<td>
<code>schedules</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.HibernationSchedule">
[]HibernationSchedule
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Schedules determine the hibernation schedules.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.HibernationSchedule">HibernationSchedule
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.Hibernation">Hibernation</a>)
</p>
<p>
<p>HibernationSchedule determines the hibernation schedule of a Shoot.
A Shoot will be regularly hibernated at each start time and will be woken up at each end time.
Start or End can be omitted, though at least one of each has to be specified.</p>
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
<code>start</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>Start is a Cron spec at which time a Shoot will be hibernated.</p>
</td>
</tr>
<tr>
<td>
<code>end</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>End is a Cron spec at which time a Shoot will be woken up.</p>
</td>
</tr>
<tr>
<td>
<code>location</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>Location is the time location in which both start and and shall be evaluated.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.HorizontalPodAutoscalerConfig">HorizontalPodAutoscalerConfig
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.KubeControllerManagerConfig">KubeControllerManagerConfig</a>)
</p>
<p>
<p>HorizontalPodAutoscalerConfig contains horizontal pod autoscaler configuration settings for the kube-controller-manager.
Note: Descriptions were taken from the Kubernetes documentation.</p>
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
<code>cpuInitializationPeriod</code></br>
<em>
<a href="https://godoc.org/k8s.io/apimachinery/pkg/apis/meta/v1#Duration">
Kubernetes meta/v1.Duration
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>The period after which a ready pod transition is considered to be the first.</p>
</td>
</tr>
<tr>
<td>
<code>downscaleDelay</code></br>
<em>
<a href="https://godoc.org/k8s.io/apimachinery/pkg/apis/meta/v1#Duration">
Kubernetes meta/v1.Duration
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>The period since last downscale, before another downscale can be performed in horizontal pod autoscaler.</p>
</td>
</tr>
<tr>
<td>
<code>downscaleStabilization</code></br>
<em>
<a href="https://godoc.org/k8s.io/apimachinery/pkg/apis/meta/v1#Duration">
Kubernetes meta/v1.Duration
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>The configurable window at which the controller will choose the highest recommendation for autoscaling.</p>
</td>
</tr>
<tr>
<td>
<code>initialReadinessDelay</code></br>
<em>
<a href="https://godoc.org/k8s.io/apimachinery/pkg/apis/meta/v1#Duration">
Kubernetes meta/v1.Duration
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>The configurable period at which the horizontal pod autoscaler considers a Pod “not yet ready” given that it’s unready and it has  transitioned to unready during that time.</p>
</td>
</tr>
<tr>
<td>
<code>syncPeriod</code></br>
<em>
<a href="https://godoc.org/k8s.io/apimachinery/pkg/apis/meta/v1#Duration">
Kubernetes meta/v1.Duration
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>The period for syncing the number of pods in horizontal pod autoscaler.</p>
</td>
</tr>
<tr>
<td>
<code>tolerance</code></br>
<em>
float64
</em>
</td>
<td>
<em>(Optional)</em>
<p>The minimum change (from 1.0) in the desired-to-actual metrics ratio for the horizontal pod autoscaler to consider scaling.</p>
</td>
</tr>
<tr>
<td>
<code>upscaleDelay</code></br>
<em>
<a href="https://godoc.org/k8s.io/apimachinery/pkg/apis/meta/v1#Duration">
Kubernetes meta/v1.Duration
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>The period since last upscale, before another upscale can be performed in horizontal pod autoscaler.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.KubeAPIServerConfig">KubeAPIServerConfig
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.Kubernetes">Kubernetes</a>)
</p>
<p>
<p>KubeAPIServerConfig contains configuration settings for the kube-apiserver.</p>
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
<code>KubernetesConfig</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.KubernetesConfig">
KubernetesConfig
</a>
</em>
</td>
<td>
<p>
(Members of <code>KubernetesConfig</code> are embedded into this type.)
</p>
</td>
</tr>
<tr>
<td>
<code>admissionPlugins</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.AdmissionPlugin">
[]AdmissionPlugin
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>AdmissionPlugins contains the list of user-defined admission plugins (additional to those managed by Gardener), and, if desired, the corresponding
configuration.</p>
</td>
</tr>
<tr>
<td>
<code>apiAudiences</code></br>
<em>
[]string
</em>
</td>
<td>
<em>(Optional)</em>
<p>APIAudiences are the identifiers of the API. The service account token authenticator will
validate that tokens used against the API are bound to at least one of these audiences.
Defaults to [&ldquo;kubernetes&rdquo;].</p>
</td>
</tr>
<tr>
<td>
<code>auditConfig</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.AuditConfig">
AuditConfig
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>AuditConfig contains configuration settings for the audit of the kube-apiserver.</p>
</td>
</tr>
<tr>
<td>
<code>enableBasicAuthentication</code></br>
<em>
bool
</em>
</td>
<td>
<em>(Optional)</em>
<p>EnableBasicAuthentication defines whether basic authentication should be enabled for this cluster or not.</p>
</td>
</tr>
<tr>
<td>
<code>oidcConfig</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.OIDCConfig">
OIDCConfig
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>OIDCConfig contains configuration settings for the OIDC provider.</p>
</td>
</tr>
<tr>
<td>
<code>runtimeConfig</code></br>
<em>
map[string]bool
</em>
</td>
<td>
<em>(Optional)</em>
<p>RuntimeConfig contains information about enabled or disabled APIs.</p>
</td>
</tr>
<tr>
<td>
<code>serviceAccountConfig</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.ServiceAccountConfig">
ServiceAccountConfig
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>ServiceAccountConfig contains configuration settings for the service account handling
of the kube-apiserver.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.KubeControllerManagerConfig">KubeControllerManagerConfig
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.Kubernetes">Kubernetes</a>)
</p>
<p>
<p>KubeControllerManagerConfig contains configuration settings for the kube-controller-manager.</p>
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
<code>KubernetesConfig</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.KubernetesConfig">
KubernetesConfig
</a>
</em>
</td>
<td>
<p>
(Members of <code>KubernetesConfig</code> are embedded into this type.)
</p>
</td>
</tr>
<tr>
<td>
<code>horizontalPodAutoscaler</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.HorizontalPodAutoscalerConfig">
HorizontalPodAutoscalerConfig
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>HorizontalPodAutoscalerConfig contains horizontal pod autoscaler configuration settings for the kube-controller-manager.</p>
</td>
</tr>
<tr>
<td>
<code>nodeCIDRMaskSize</code></br>
<em>
int32
</em>
</td>
<td>
<em>(Optional)</em>
<p>NodeCIDRMaskSize defines the mask size for node cidr in cluster (default is 24)</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.KubeProxyConfig">KubeProxyConfig
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.Kubernetes">Kubernetes</a>)
</p>
<p>
<p>KubeProxyConfig contains configuration settings for the kube-proxy.</p>
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
<code>KubernetesConfig</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.KubernetesConfig">
KubernetesConfig
</a>
</em>
</td>
<td>
<p>
(Members of <code>KubernetesConfig</code> are embedded into this type.)
</p>
</td>
</tr>
<tr>
<td>
<code>mode</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.ProxyMode">
ProxyMode
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Mode specifies which proxy mode to use.
defaults to IPTables.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.KubeSchedulerConfig">KubeSchedulerConfig
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.Kubernetes">Kubernetes</a>)
</p>
<p>
<p>KubeSchedulerConfig contains configuration settings for the kube-scheduler.</p>
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
<code>KubernetesConfig</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.KubernetesConfig">
KubernetesConfig
</a>
</em>
</td>
<td>
<p>
(Members of <code>KubernetesConfig</code> are embedded into this type.)
</p>
</td>
</tr>
<tr>
<td>
<code>kubeMaxPDVols</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>KubeMaxPDVols allows to configure the <code>KUBE_MAX_PD_VOLS</code> environment variable for the kube-scheduler.
Please find more information here: <a href="https://kubernetes.io/docs/concepts/storage/storage-limits/#custom-limits">https://kubernetes.io/docs/concepts/storage/storage-limits/#custom-limits</a>
Note that using this field is considered alpha-/experimental-level and is on your own risk. You should be aware
of all the side-effects and consequences when changing it.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.KubeletConfig">KubeletConfig
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.Kubernetes">Kubernetes</a>, 
<a href="#core.gardener.cloud/v1beta1.WorkerKubernetes">WorkerKubernetes</a>)
</p>
<p>
<p>KubeletConfig contains configuration settings for the kubelet.</p>
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
<code>KubernetesConfig</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.KubernetesConfig">
KubernetesConfig
</a>
</em>
</td>
<td>
<p>
(Members of <code>KubernetesConfig</code> are embedded into this type.)
</p>
</td>
</tr>
<tr>
<td>
<code>cpuCFSQuota</code></br>
<em>
bool
</em>
</td>
<td>
<em>(Optional)</em>
<p>CPUCFSQuota allows you to disable/enable CPU throttling for Pods.</p>
</td>
</tr>
<tr>
<td>
<code>cpuManagerPolicy</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>CPUManagerPolicy allows to set alternative CPU management policies (default: none).</p>
</td>
</tr>
<tr>
<td>
<code>evictionHard</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.KubeletConfigEviction">
KubeletConfigEviction
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>EvictionHard describes a set of eviction thresholds (e.g. memory.available<1Gi) that if met would trigger a Pod eviction.
Default:
memory.available:   &ldquo;100Mi/1Gi/5%&rdquo;
nodefs.available:   &ldquo;5%&rdquo;
nodefs.inodesFree:  &ldquo;5%&rdquo;
imagefs.available:  &ldquo;5%&rdquo;
imagefs.inodesFree: &ldquo;5%&rdquo;</p>
</td>
</tr>
<tr>
<td>
<code>evictionMaxPodGracePeriod</code></br>
<em>
int32
</em>
</td>
<td>
<em>(Optional)</em>
<p>EvictionMaxPodGracePeriod describes the maximum allowed grace period (in seconds) to use when terminating pods in response to a soft eviction threshold being met.
Default: 90</p>
</td>
</tr>
<tr>
<td>
<code>evictionMinimumReclaim</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.KubeletConfigEvictionMinimumReclaim">
KubeletConfigEvictionMinimumReclaim
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>EvictionMinimumReclaim configures the amount of resources below the configured eviction threshold that the kubelet attempts to reclaim whenever the kubelet observes resource pressure.
Default: 0 for each resource</p>
</td>
</tr>
<tr>
<td>
<code>evictionPressureTransitionPeriod</code></br>
<em>
<a href="https://godoc.org/k8s.io/apimachinery/pkg/apis/meta/v1#Duration">
Kubernetes meta/v1.Duration
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>EvictionPressureTransitionPeriod is the duration for which the kubelet has to wait before transitioning out of an eviction pressure condition.
Default: 4m0s</p>
</td>
</tr>
<tr>
<td>
<code>evictionSoft</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.KubeletConfigEviction">
KubeletConfigEviction
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>EvictionSoft describes a set of eviction thresholds (e.g. memory.available<1.5Gi) that if met over a corresponding grace period would trigger a Pod eviction.
Default:
memory.available:   &ldquo;200Mi/1.5Gi/10%&rdquo;
nodefs.available:   &ldquo;10%&rdquo;
nodefs.inodesFree:  &ldquo;10%&rdquo;
imagefs.available:  &ldquo;10%&rdquo;
imagefs.inodesFree: &ldquo;10%&rdquo;</p>
</td>
</tr>
<tr>
<td>
<code>evictionSoftGracePeriod</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.KubeletConfigEvictionSoftGracePeriod">
KubeletConfigEvictionSoftGracePeriod
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>EvictionSoftGracePeriod describes a set of eviction grace periods (e.g. memory.available=1m30s) that correspond to how long a soft eviction threshold must hold before triggering a Pod eviction.
Default:
memory.available:   1m30s
nodefs.available:   1m30s
nodefs.inodesFree:  1m30s
imagefs.available:  1m30s
imagefs.inodesFree: 1m30s</p>
</td>
</tr>
<tr>
<td>
<code>maxPods</code></br>
<em>
int32
</em>
</td>
<td>
<em>(Optional)</em>
<p>MaxPods is the maximum number of Pods that are allowed by the Kubelet.
Default: 110</p>
</td>
</tr>
<tr>
<td>
<code>podPidsLimit</code></br>
<em>
int64
</em>
</td>
<td>
<em>(Optional)</em>
<p>PodPIDsLimit is the maximum number of process IDs per pod allowed by the kubelet.</p>
</td>
</tr>
<tr>
<td>
<code>imagePullProgressDeadline</code></br>
<em>
<a href="https://godoc.org/k8s.io/apimachinery/pkg/apis/meta/v1#Duration">
Kubernetes meta/v1.Duration
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>ImagePullProgressDeadline describes the time limit under which if no pulling progress is made, the image pulling will be cancelled.
Default: 1m</p>
</td>
</tr>
<tr>
<td>
<code>failSwapOn</code></br>
<em>
bool
</em>
</td>
<td>
<em>(Optional)</em>
<p>FailSwapOn makes the Kubelet fail to start if swap is enabled on the node. (default true).</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.KubeletConfigEviction">KubeletConfigEviction
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.KubeletConfig">KubeletConfig</a>)
</p>
<p>
<p>KubeletConfigEviction contains kubelet eviction thresholds supporting either a resource.Quantity or a percentage based value.</p>
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
<code>memoryAvailable</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>MemoryAvailable is the threshold for the free memory on the host server.</p>
</td>
</tr>
<tr>
<td>
<code>imageFSAvailable</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>ImageFSAvailable is the threshold for the free disk space in the imagefs filesystem (docker images and container writable layers).</p>
</td>
</tr>
<tr>
<td>
<code>imageFSInodesFree</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>ImageFSInodesFree is the threshold for the available inodes in the imagefs filesystem.</p>
</td>
</tr>
<tr>
<td>
<code>nodeFSAvailable</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>NodeFSAvailable is the threshold for the free disk space in the nodefs filesystem (docker volumes, logs, etc).</p>
</td>
</tr>
<tr>
<td>
<code>nodeFSInodesFree</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>NodeFSInodesFree is the threshold for the available inodes in the nodefs filesystem.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.KubeletConfigEvictionMinimumReclaim">KubeletConfigEvictionMinimumReclaim
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.KubeletConfig">KubeletConfig</a>)
</p>
<p>
<p>KubeletConfigEvictionMinimumReclaim contains configuration for the kubelet eviction minimum reclaim.</p>
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
<code>memoryAvailable</code></br>
<em>
<a href="https://godoc.org/k8s.io/apimachinery/pkg/api/resource#Quantity">
k8s.io/apimachinery/pkg/api/resource.Quantity
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>MemoryAvailable is the threshold for the memory reclaim on the host server.</p>
</td>
</tr>
<tr>
<td>
<code>imageFSAvailable</code></br>
<em>
<a href="https://godoc.org/k8s.io/apimachinery/pkg/api/resource#Quantity">
k8s.io/apimachinery/pkg/api/resource.Quantity
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>ImageFSAvailable is the threshold for the disk space reclaim in the imagefs filesystem (docker images and container writable layers).</p>
</td>
</tr>
<tr>
<td>
<code>imageFSInodesFree</code></br>
<em>
<a href="https://godoc.org/k8s.io/apimachinery/pkg/api/resource#Quantity">
k8s.io/apimachinery/pkg/api/resource.Quantity
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>ImageFSInodesFree is the threshold for the inodes reclaim in the imagefs filesystem.</p>
</td>
</tr>
<tr>
<td>
<code>nodeFSAvailable</code></br>
<em>
<a href="https://godoc.org/k8s.io/apimachinery/pkg/api/resource#Quantity">
k8s.io/apimachinery/pkg/api/resource.Quantity
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>NodeFSAvailable is the threshold for the disk space reclaim in the nodefs filesystem (docker volumes, logs, etc).</p>
</td>
</tr>
<tr>
<td>
<code>nodeFSInodesFree</code></br>
<em>
<a href="https://godoc.org/k8s.io/apimachinery/pkg/api/resource#Quantity">
k8s.io/apimachinery/pkg/api/resource.Quantity
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>NodeFSInodesFree is the threshold for the inodes reclaim in the nodefs filesystem.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.KubeletConfigEvictionSoftGracePeriod">KubeletConfigEvictionSoftGracePeriod
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.KubeletConfig">KubeletConfig</a>)
</p>
<p>
<p>KubeletConfigEvictionSoftGracePeriod contains grace periods for kubelet eviction thresholds.</p>
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
<code>memoryAvailable</code></br>
<em>
<a href="https://godoc.org/k8s.io/apimachinery/pkg/apis/meta/v1#Duration">
Kubernetes meta/v1.Duration
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>MemoryAvailable is the grace period for the MemoryAvailable eviction threshold.</p>
</td>
</tr>
<tr>
<td>
<code>imageFSAvailable</code></br>
<em>
<a href="https://godoc.org/k8s.io/apimachinery/pkg/apis/meta/v1#Duration">
Kubernetes meta/v1.Duration
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>ImageFSAvailable is the grace period for the ImageFSAvailable eviction threshold.</p>
</td>
</tr>
<tr>
<td>
<code>imageFSInodesFree</code></br>
<em>
<a href="https://godoc.org/k8s.io/apimachinery/pkg/apis/meta/v1#Duration">
Kubernetes meta/v1.Duration
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>ImageFSInodesFree is the grace period for the ImageFSInodesFree eviction threshold.</p>
</td>
</tr>
<tr>
<td>
<code>nodeFSAvailable</code></br>
<em>
<a href="https://godoc.org/k8s.io/apimachinery/pkg/apis/meta/v1#Duration">
Kubernetes meta/v1.Duration
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>NodeFSAvailable is the grace period for the NodeFSAvailable eviction threshold.</p>
</td>
</tr>
<tr>
<td>
<code>nodeFSInodesFree</code></br>
<em>
<a href="https://godoc.org/k8s.io/apimachinery/pkg/apis/meta/v1#Duration">
Kubernetes meta/v1.Duration
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>NodeFSInodesFree is the grace period for the NodeFSInodesFree eviction threshold.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.Kubernetes">Kubernetes
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.ShootSpec">ShootSpec</a>)
</p>
<p>
<p>Kubernetes contains the version and configuration variables for the Shoot control plane.</p>
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
<code>allowPrivilegedContainers</code></br>
<em>
bool
</em>
</td>
<td>
<em>(Optional)</em>
<p>AllowPrivilegedContainers indicates whether privileged containers are allowed in the Shoot (default: true).</p>
</td>
</tr>
<tr>
<td>
<code>clusterAutoscaler</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.ClusterAutoscaler">
ClusterAutoscaler
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>ClusterAutoscaler contains the configration flags for the Kubernetes cluster autoscaler.</p>
</td>
</tr>
<tr>
<td>
<code>kubeAPIServer</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.KubeAPIServerConfig">
KubeAPIServerConfig
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>KubeAPIServer contains configuration settings for the kube-apiserver.</p>
</td>
</tr>
<tr>
<td>
<code>kubeControllerManager</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.KubeControllerManagerConfig">
KubeControllerManagerConfig
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>KubeControllerManager contains configuration settings for the kube-controller-manager.</p>
</td>
</tr>
<tr>
<td>
<code>kubeScheduler</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.KubeSchedulerConfig">
KubeSchedulerConfig
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>KubeScheduler contains configuration settings for the kube-scheduler.</p>
</td>
</tr>
<tr>
<td>
<code>kubeProxy</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.KubeProxyConfig">
KubeProxyConfig
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>KubeProxy contains configuration settings for the kube-proxy.</p>
</td>
</tr>
<tr>
<td>
<code>kubelet</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.KubeletConfig">
KubeletConfig
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Kubelet contains configuration settings for the kubelet.</p>
</td>
</tr>
<tr>
<td>
<code>version</code></br>
<em>
string
</em>
</td>
<td>
<p>Version is the semantic Kubernetes version to use for the Shoot cluster.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.KubernetesConfig">KubernetesConfig
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.KubeAPIServerConfig">KubeAPIServerConfig</a>, 
<a href="#core.gardener.cloud/v1beta1.KubeControllerManagerConfig">KubeControllerManagerConfig</a>, 
<a href="#core.gardener.cloud/v1beta1.KubeProxyConfig">KubeProxyConfig</a>, 
<a href="#core.gardener.cloud/v1beta1.KubeSchedulerConfig">KubeSchedulerConfig</a>, 
<a href="#core.gardener.cloud/v1beta1.KubeletConfig">KubeletConfig</a>)
</p>
<p>
<p>KubernetesConfig contains common configuration fields for the control plane components.</p>
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
<code>featureGates</code></br>
<em>
map[string]bool
</em>
</td>
<td>
<em>(Optional)</em>
<p>FeatureGates contains information about enabled feature gates.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.KubernetesDashboard">KubernetesDashboard
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.Addons">Addons</a>)
</p>
<p>
<p>KubernetesDashboard describes configuration values for the kubernetes-dashboard addon.</p>
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
<code>Addon</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.Addon">
Addon
</a>
</em>
</td>
<td>
<p>
(Members of <code>Addon</code> are embedded into this type.)
</p>
</td>
</tr>
<tr>
<td>
<code>authenticationMode</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>AuthenticationMode defines the authentication mode for the kubernetes-dashboard.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.KubernetesInfo">KubernetesInfo
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.ClusterInfo">ClusterInfo</a>)
</p>
<p>
<p>KubernetesInfo contains the version and configuration variables for the Plant cluster.</p>
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
<code>version</code></br>
<em>
string
</em>
</td>
<td>
<p>Version is the semantic Kubernetes version to use for the Plant cluster.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.KubernetesSettings">KubernetesSettings
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.CloudProfileSpec">CloudProfileSpec</a>)
</p>
<p>
<p>KubernetesSettings contains constraints regarding allowed values of the &lsquo;kubernetes&rsquo; block in the Shoot specification.</p>
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
<code>versions</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.ExpirableVersion">
[]ExpirableVersion
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Versions is the list of allowed Kubernetes versions with optional expiration dates for Shoot clusters.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.LastError">LastError
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.BackupBucketStatus">BackupBucketStatus</a>, 
<a href="#core.gardener.cloud/v1beta1.BackupEntryStatus">BackupEntryStatus</a>, 
<a href="#core.gardener.cloud/v1beta1.ShootStatus">ShootStatus</a>)
</p>
<p>
<p>LastError indicates the last occurred error for an operation on a resource.</p>
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
<code>description</code></br>
<em>
string
</em>
</td>
<td>
<p>A human readable message indicating details about the last error.</p>
</td>
</tr>
<tr>
<td>
<code>taskID</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>ID of the task which caused this last error</p>
</td>
</tr>
<tr>
<td>
<code>codes</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.ErrorCode">
[]ErrorCode
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Well-defined error codes of the last error(s).</p>
</td>
</tr>
<tr>
<td>
<code>lastUpdateTime</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.15/#time-v1-meta">
Kubernetes meta/v1.Time
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Last time the error was reported</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.LastOperation">LastOperation
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.BackupBucketStatus">BackupBucketStatus</a>, 
<a href="#core.gardener.cloud/v1beta1.BackupEntryStatus">BackupEntryStatus</a>, 
<a href="#core.gardener.cloud/v1beta1.ShootStatus">ShootStatus</a>)
</p>
<p>
<p>LastOperation indicates the type and the state of the last operation, along with a description
message and a progress indicator.</p>
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
<code>description</code></br>
<em>
string
</em>
</td>
<td>
<p>A human readable message indicating details about the last operation.</p>
</td>
</tr>
<tr>
<td>
<code>lastUpdateTime</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.15/#time-v1-meta">
Kubernetes meta/v1.Time
</a>
</em>
</td>
<td>
<p>Last time the operation state transitioned from one to another.</p>
</td>
</tr>
<tr>
<td>
<code>progress</code></br>
<em>
int32
</em>
</td>
<td>
<p>The progress in percentage (0-100) of the last operation.</p>
</td>
</tr>
<tr>
<td>
<code>state</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.LastOperationState">
LastOperationState
</a>
</em>
</td>
<td>
<p>Status of the last operation, one of Aborted, Processing, Succeeded, Error, Failed.</p>
</td>
</tr>
<tr>
<td>
<code>type</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.LastOperationType">
LastOperationType
</a>
</em>
</td>
<td>
<p>Type of the last operation, one of Create, Reconcile, Delete.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.LastOperationState">LastOperationState
(<code>string</code> alias)</p></h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.LastOperation">LastOperation</a>)
</p>
<p>
<p>LastOperationState is a string alias.</p>
</p>
<h3 id="core.gardener.cloud/v1beta1.LastOperationType">LastOperationType
(<code>string</code> alias)</p></h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.LastOperation">LastOperation</a>)
</p>
<p>
<p>LastOperationType is a string alias.</p>
</p>
<h3 id="core.gardener.cloud/v1beta1.Machine">Machine
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.Worker">Worker</a>)
</p>
<p>
<p>Machine contains information about the machine type and image.</p>
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
string
</em>
</td>
<td>
<p>Type is the machine type of the worker group.</p>
</td>
</tr>
<tr>
<td>
<code>image</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.ShootMachineImage">
ShootMachineImage
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Image holds information about the machine image to use for all nodes of this pool. It will default to the
latest version of the first image stated in the referenced CloudProfile if no value has been provided.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.MachineImage">MachineImage
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.CloudProfileSpec">CloudProfileSpec</a>)
</p>
<p>
<p>MachineImage defines the name and multiple versions of the machine image in any environment.</p>
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
<p>Name is the name of the image.</p>
</td>
</tr>
<tr>
<td>
<code>versions</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.ExpirableVersion">
[]ExpirableVersion
</a>
</em>
</td>
<td>
<p>Versions contains versions and expiration dates of the machine image</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.MachineType">MachineType
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.CloudProfileSpec">CloudProfileSpec</a>)
</p>
<p>
<p>MachineType contains certain properties of a machine type.</p>
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
<code>cpu</code></br>
<em>
<a href="https://godoc.org/k8s.io/apimachinery/pkg/api/resource#Quantity">
k8s.io/apimachinery/pkg/api/resource.Quantity
</a>
</em>
</td>
<td>
<p>CPU is the number of CPUs for this machine type.</p>
</td>
</tr>
<tr>
<td>
<code>gpu</code></br>
<em>
<a href="https://godoc.org/k8s.io/apimachinery/pkg/api/resource#Quantity">
k8s.io/apimachinery/pkg/api/resource.Quantity
</a>
</em>
</td>
<td>
<p>GPU is the number of GPUs for this machine type.</p>
</td>
</tr>
<tr>
<td>
<code>memory</code></br>
<em>
<a href="https://godoc.org/k8s.io/apimachinery/pkg/api/resource#Quantity">
k8s.io/apimachinery/pkg/api/resource.Quantity
</a>
</em>
</td>
<td>
<p>Memory is the amount of memory for this machine type.</p>
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
<p>Name is the name of the machine type.</p>
</td>
</tr>
<tr>
<td>
<code>storage</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.MachineTypeStorage">
MachineTypeStorage
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Storage is the amount of storage associated with the root volume of this machine type.</p>
</td>
</tr>
<tr>
<td>
<code>usable</code></br>
<em>
bool
</em>
</td>
<td>
<em>(Optional)</em>
<p>Usable defines if the machine type can be used for shoot clusters.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.MachineTypeStorage">MachineTypeStorage
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.MachineType">MachineType</a>)
</p>
<p>
<p>MachineTypeStorage is the amount of storage associated with the root volume of this machine type.</p>
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
<code>class</code></br>
<em>
string
</em>
</td>
<td>
<p>Class is the class of the storage type.</p>
</td>
</tr>
<tr>
<td>
<code>size</code></br>
<em>
<a href="https://godoc.org/k8s.io/apimachinery/pkg/api/resource#Quantity">
k8s.io/apimachinery/pkg/api/resource.Quantity
</a>
</em>
</td>
<td>
<p>StorageSize is the storage size.</p>
</td>
</tr>
<tr>
<td>
<code>type</code></br>
<em>
string
</em>
</td>
<td>
<p>Type is the type of the storage.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.Maintenance">Maintenance
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.ShootSpec">ShootSpec</a>)
</p>
<p>
<p>Maintenance contains information about the time window for maintenance operations and which
operations should be performed.</p>
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
<code>autoUpdate</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.MaintenanceAutoUpdate">
MaintenanceAutoUpdate
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>AutoUpdate contains information about which constraints should be automatically updated.</p>
</td>
</tr>
<tr>
<td>
<code>timeWindow</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.MaintenanceTimeWindow">
MaintenanceTimeWindow
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>TimeWindow contains information about the time window for maintenance operations.</p>
</td>
</tr>
<tr>
<td>
<code>confineSpecUpdateRollout</code></br>
<em>
bool
</em>
</td>
<td>
<em>(Optional)</em>
<p>ConfineSpecUpdateRollout prevents that changes/updates to the shoot specification will be rolled out immediately.
Instead, they are rolled out during the shoot&rsquo;s maintenance time window. There is one exception that will trigger
an immediate roll out which is changes to the Spec.Hibernation.Enabled field.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.MaintenanceAutoUpdate">MaintenanceAutoUpdate
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.Maintenance">Maintenance</a>)
</p>
<p>
<p>MaintenanceAutoUpdate contains information about which constraints should be automatically updated.</p>
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
<code>kubernetesVersion</code></br>
<em>
bool
</em>
</td>
<td>
<p>KubernetesVersion indicates whether the patch Kubernetes version may be automatically updated (default: true).</p>
</td>
</tr>
<tr>
<td>
<code>machineImageVersion</code></br>
<em>
bool
</em>
</td>
<td>
<p>MachineImageVersion indicates whether the machine image version may be automatically updated (default: true).</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.MaintenanceTimeWindow">MaintenanceTimeWindow
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.Maintenance">Maintenance</a>)
</p>
<p>
<p>MaintenanceTimeWindow contains information about the time window for maintenance operations.</p>
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
<code>begin</code></br>
<em>
string
</em>
</td>
<td>
<p>Begin is the beginning of the time window in the format HHMMSS+ZONE, e.g. &ldquo;220000+0100&rdquo;.
If not present, a random value will be computed.</p>
</td>
</tr>
<tr>
<td>
<code>end</code></br>
<em>
string
</em>
</td>
<td>
<p>End is the end of the time window in the format HHMMSS+ZONE, e.g. &ldquo;220000+0100&rdquo;.
If not present, the value will be computed based on the &ldquo;Begin&rdquo; value.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.Monitoring">Monitoring
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.ShootSpec">ShootSpec</a>)
</p>
<p>
<p>Monitoring contains information about the monitoring configuration for the shoot.</p>
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
<code>alerting</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.Alerting">
Alerting
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Alerting contains information about the alerting configuration for the shoot cluster.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.NamedResourceReference">NamedResourceReference
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.ShootSpec">ShootSpec</a>)
</p>
<p>
<p>NamedResourceReference is a named reference to a resource.</p>
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
<p>Name of the resource reference.</p>
</td>
</tr>
<tr>
<td>
<code>resourceRef</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.15/#crossversionobjectreference-v1-autoscaling">
Kubernetes autoscaling/v1.CrossVersionObjectReference
</a>
</em>
</td>
<td>
<p>ResourceRef is a reference to a resource.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.Networking">Networking
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.ShootSpec">ShootSpec</a>)
</p>
<p>
<p>Networking defines networking parameters for the shoot cluster.</p>
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
string
</em>
</td>
<td>
<p>Type identifies the type of the networking plugin.</p>
</td>
</tr>
<tr>
<td>
<code>providerConfig</code></br>
<em>
<a href="https://godoc.org/k8s.io/apimachinery/pkg/runtime#RawExtension">
k8s.io/apimachinery/pkg/runtime.RawExtension
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>ProviderConfig is the configuration passed to network resource.</p>
</td>
</tr>
<tr>
<td>
<code>pods</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>Pods is the CIDR of the pod network.</p>
</td>
</tr>
<tr>
<td>
<code>nodes</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>Nodes is the CIDR of the entire node network.</p>
</td>
</tr>
<tr>
<td>
<code>services</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>Services is the CIDR of the service network.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.NginxIngress">NginxIngress
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.Addons">Addons</a>)
</p>
<p>
<p>NginxIngress describes configuration values for the nginx-ingress addon.</p>
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
<code>Addon</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.Addon">
Addon
</a>
</em>
</td>
<td>
<p>
(Members of <code>Addon</code> are embedded into this type.)
</p>
</td>
</tr>
<tr>
<td>
<code>loadBalancerSourceRanges</code></br>
<em>
[]string
</em>
</td>
<td>
<em>(Optional)</em>
<p>LoadBalancerSourceRanges is list of whitelist IP sources for NginxIngress</p>
</td>
</tr>
<tr>
<td>
<code>config</code></br>
<em>
map[string]string
</em>
</td>
<td>
<em>(Optional)</em>
<p>Config contains custom configuration for the nginx-ingress-controller configuration.
See <a href="https://github.com/kubernetes/ingress-nginx/blob/master/docs/user-guide/nginx-configuration/configmap.md#configuration-options">https://github.com/kubernetes/ingress-nginx/blob/master/docs/user-guide/nginx-configuration/configmap.md#configuration-options</a></p>
</td>
</tr>
<tr>
<td>
<code>externalTrafficPolicy</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.15/#serviceexternaltrafficpolicytype-v1-core">
Kubernetes core/v1.ServiceExternalTrafficPolicyType
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>ExternalTrafficPolicy controls the <code>.spec.externalTrafficPolicy</code> value of the load balancer <code>Service</code>
exposing the nginx-ingress. Defaults to <code>Cluster</code>.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.OIDCConfig">OIDCConfig
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.KubeAPIServerConfig">KubeAPIServerConfig</a>)
</p>
<p>
<p>OIDCConfig contains configuration settings for the OIDC provider.
Note: Descriptions were taken from the Kubernetes documentation.</p>
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
<code>caBundle</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>If set, the OpenID server&rsquo;s certificate will be verified by one of the authorities in the oidc-ca-file, otherwise the host&rsquo;s root CA set will be used.</p>
</td>
</tr>
<tr>
<td>
<code>clientAuthentication</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.OpenIDConnectClientAuthentication">
OpenIDConnectClientAuthentication
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>ClientAuthentication can optionally contain client configuration used for kubeconfig generation.</p>
</td>
</tr>
<tr>
<td>
<code>clientID</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>The client ID for the OpenID Connect client, must be set if oidc-issuer-url is set.</p>
</td>
</tr>
<tr>
<td>
<code>groupsClaim</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>If provided, the name of a custom OpenID Connect claim for specifying user groups. The claim value is expected to be a string or array of strings. This flag is experimental, please see the authentication documentation for further details.</p>
</td>
</tr>
<tr>
<td>
<code>groupsPrefix</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>If provided, all groups will be prefixed with this value to prevent conflicts with other authentication strategies.</p>
</td>
</tr>
<tr>
<td>
<code>issuerURL</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>The URL of the OpenID issuer, only HTTPS scheme will be accepted. If set, it will be used to verify the OIDC JSON Web Token (JWT).</p>
</td>
</tr>
<tr>
<td>
<code>requiredClaims</code></br>
<em>
map[string]string
</em>
</td>
<td>
<em>(Optional)</em>
<p>ATTENTION: Only meaningful for Kubernetes &gt;= 1.11
key=value pairs that describes a required claim in the ID Token. If set, the claim is verified to be present in the ID Token with a matching value.</p>
</td>
</tr>
<tr>
<td>
<code>signingAlgs</code></br>
<em>
[]string
</em>
</td>
<td>
<em>(Optional)</em>
<p>List of allowed JOSE asymmetric signing algorithms. JWTs with a &lsquo;alg&rsquo; header value not in this list will be rejected. Values are defined by RFC 7518 <a href="https://tools.ietf.org/html/rfc7518#section-3.1">https://tools.ietf.org/html/rfc7518#section-3.1</a></p>
</td>
</tr>
<tr>
<td>
<code>usernameClaim</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>The OpenID claim to use as the user name. Note that claims other than the default (&lsquo;sub&rsquo;) is not guaranteed to be unique and immutable. This flag is experimental, please see the authentication documentation for further details. (default &ldquo;sub&rdquo;)</p>
</td>
</tr>
<tr>
<td>
<code>usernamePrefix</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>If provided, all usernames will be prefixed with this value. If not provided, username claims other than &lsquo;email&rsquo; are prefixed by the issuer URL to avoid clashes. To skip any prefixing, provide the value &lsquo;-&rsquo;.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.OpenIDConnectClientAuthentication">OpenIDConnectClientAuthentication
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.OIDCConfig">OIDCConfig</a>)
</p>
<p>
<p>OpenIDConnectClientAuthentication contains configuration for OIDC clients.</p>
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
<code>extraConfig</code></br>
<em>
map[string]string
</em>
</td>
<td>
<em>(Optional)</em>
<p>Extra configuration added to kubeconfig&rsquo;s auth-provider.
Must not be any of idp-issuer-url, client-id, client-secret, idp-certificate-authority, idp-certificate-authority-data, id-token or refresh-token</p>
</td>
</tr>
<tr>
<td>
<code>secret</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>The client Secret for the OpenID Connect client.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.PlantSpec">PlantSpec
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.Plant">Plant</a>)
</p>
<p>
<p>PlantSpec is the specification of a Plant.</p>
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
<code>secretRef</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.15/#localobjectreference-v1-core">
Kubernetes core/v1.LocalObjectReference
</a>
</em>
</td>
<td>
<p>SecretRef is a reference to a Secret object containing the Kubeconfig of the external kubernetes
clusters to be added to Gardener.</p>
</td>
</tr>
<tr>
<td>
<code>endpoints</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.Endpoint">
[]Endpoint
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Endpoints is the configuration plant endpoints</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.PlantStatus">PlantStatus
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.Plant">Plant</a>)
</p>
<p>
<p>PlantStatus is the status of a Plant.</p>
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
<a href="#core.gardener.cloud/v1beta1.Condition">
[]Condition
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Conditions represents the latest available observations of a Plant&rsquo;s current state.</p>
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
<p>ObservedGeneration is the most recent generation observed for this Plant. It corresponds to the
Plant&rsquo;s generation, which is updated on mutation by the API Server.</p>
</td>
</tr>
<tr>
<td>
<code>clusterInfo</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.ClusterInfo">
ClusterInfo
</a>
</em>
</td>
<td>
<p>ClusterInfo is additional computed information about the newly added cluster (Plant)</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.ProjectMember">ProjectMember
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.ProjectSpec">ProjectSpec</a>)
</p>
<p>
<p>ProjectMember is a member of a project.</p>
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
<code>Subject</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.15/#subject-v1-rbac">
Kubernetes rbac/v1.Subject
</a>
</em>
</td>
<td>
<p>
(Members of <code>Subject</code> are embedded into this type.)
</p>
<p>Subject is representing a user name, an email address, or any other identifier of a user, group, or service
account that has a certain role.</p>
</td>
</tr>
<tr>
<td>
<code>role</code></br>
<em>
string
</em>
</td>
<td>
<p>Role represents the role of this member.
IMPORTANT: Be aware that this field will be removed in the <code>v1</code> version of this API in favor of the <code>roles</code>
list.
TODO: Remove this field in favor of the <code>owner</code> role in <code>v1</code>.</p>
</td>
</tr>
<tr>
<td>
<code>roles</code></br>
<em>
[]string
</em>
</td>
<td>
<em>(Optional)</em>
<p>Roles represents the list of roles of this member.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.ProjectPhase">ProjectPhase
(<code>string</code> alias)</p></h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.ProjectStatus">ProjectStatus</a>)
</p>
<p>
<p>ProjectPhase is a label for the condition of a project at the current time.</p>
</p>
<h3 id="core.gardener.cloud/v1beta1.ProjectSpec">ProjectSpec
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.Project">Project</a>)
</p>
<p>
<p>ProjectSpec is the specification of a Project.</p>
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
<code>createdBy</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.15/#subject-v1-rbac">
Kubernetes rbac/v1.Subject
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>CreatedBy is a subject representing a user name, an email address, or any other identifier of a user
who created the project.</p>
</td>
</tr>
<tr>
<td>
<code>description</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>Description is a human-readable description of what the project is used for.</p>
</td>
</tr>
<tr>
<td>
<code>owner</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.15/#subject-v1-rbac">
Kubernetes rbac/v1.Subject
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Owner is a subject representing a user name, an email address, or any other identifier of a user owning
the project.
IMPORTANT: Be aware that this field will be removed in the <code>v1</code> version of this API in favor of the <code>owner</code>
role. The only way to change the owner will be by moving the <code>owner</code> role. In this API version the only way
to change the owner is to use this field.
TODO: Remove this field in favor of the <code>owner</code> role in <code>v1</code>.</p>
</td>
</tr>
<tr>
<td>
<code>purpose</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>Purpose is a human-readable explanation of the project&rsquo;s purpose.</p>
</td>
</tr>
<tr>
<td>
<code>members</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.ProjectMember">
[]ProjectMember
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Members is a list of subjects representing a user name, an email address, or any other identifier of a user,
group, or service account that has a certain role.</p>
</td>
</tr>
<tr>
<td>
<code>namespace</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>Namespace is the name of the namespace that has been created for the Project object.
A nil value means that Gardener will determine the name of the namespace.</p>
</td>
</tr>
<tr>
<td>
<code>tolerations</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.ProjectTolerations">
ProjectTolerations
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Tolerations contains the tolerations for taints on seed clusters.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.ProjectStatus">ProjectStatus
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.Project">Project</a>)
</p>
<p>
<p>ProjectStatus holds the most recently observed status of the project.</p>
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
<p>ObservedGeneration is the most recent generation observed for this project.</p>
</td>
</tr>
<tr>
<td>
<code>phase</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.ProjectPhase">
ProjectPhase
</a>
</em>
</td>
<td>
<p>Phase is the current phase of the project.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.ProjectTolerations">ProjectTolerations
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.ProjectSpec">ProjectSpec</a>)
</p>
<p>
<p>ProjectTolerations contains the tolerations for taints on seed clusters.</p>
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
<code>defaults</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.Toleration">
[]Toleration
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Defaults contains a list of tolerations that are added to the shoots in this project by default.</p>
</td>
</tr>
<tr>
<td>
<code>whitelist</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.Toleration">
[]Toleration
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Whitelist contains a list of tolerations that are allowed to be added to the shoots in this project. Please note
that this list may only be added by users having the <code>spec-tolerations-whitelist</code> verb for project resources.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.Provider">Provider
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.ShootSpec">ShootSpec</a>)
</p>
<p>
<p>Provider contains provider-specific information that are handed-over to the provider-specific
extension controller.</p>
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
string
</em>
</td>
<td>
<p>Type is the type of the provider.</p>
</td>
</tr>
<tr>
<td>
<code>controlPlaneConfig</code></br>
<em>
<a href="https://godoc.org/k8s.io/apimachinery/pkg/runtime#RawExtension">
k8s.io/apimachinery/pkg/runtime.RawExtension
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>ControlPlaneConfig contains the provider-specific control plane config blob. Please look up the concrete
definition in the documentation of your provider extension.</p>
</td>
</tr>
<tr>
<td>
<code>infrastructureConfig</code></br>
<em>
<a href="https://godoc.org/k8s.io/apimachinery/pkg/runtime#RawExtension">
k8s.io/apimachinery/pkg/runtime.RawExtension
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>InfrastructureConfig contains the provider-specific infrastructure config blob. Please look up the concrete
definition in the documentation of your provider extension.</p>
</td>
</tr>
<tr>
<td>
<code>workers</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.Worker">
[]Worker
</a>
</em>
</td>
<td>
<p>Workers is a list of worker groups.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.ProxyMode">ProxyMode
(<code>string</code> alias)</p></h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.KubeProxyConfig">KubeProxyConfig</a>)
</p>
<p>
<p>ProxyMode available in Linux platform: &lsquo;userspace&rsquo; (older, going to be EOL), &lsquo;iptables&rsquo;
(newer, faster), &lsquo;ipvs&rsquo; (newest, better in performance and scalability).
As of now only &lsquo;iptables&rsquo; and &lsquo;ipvs&rsquo; is supported by Gardener.
In Linux platform, if the iptables proxy is selected, regardless of how, but the system&rsquo;s kernel or iptables versions are
insufficient, this always falls back to the userspace proxy. IPVS mode will be enabled when proxy mode is set to &lsquo;ipvs&rsquo;,
and the fall back path is firstly iptables and then userspace.</p>
</p>
<h3 id="core.gardener.cloud/v1beta1.QuotaSpec">QuotaSpec
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.Quota">Quota</a>)
</p>
<p>
<p>QuotaSpec is the specification of a Quota.</p>
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
<code>clusterLifetimeDays</code></br>
<em>
int32
</em>
</td>
<td>
<em>(Optional)</em>
<p>ClusterLifetimeDays is the lifetime of a Shoot cluster in days before it will be terminated automatically.</p>
</td>
</tr>
<tr>
<td>
<code>metrics</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.15/#resourcelist-v1-core">
Kubernetes core/v1.ResourceList
</a>
</em>
</td>
<td>
<p>Metrics is a list of resources which will be put under constraints.</p>
</td>
</tr>
<tr>
<td>
<code>scope</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.15/#objectreference-v1-core">
Kubernetes core/v1.ObjectReference
</a>
</em>
</td>
<td>
<p>Scope is the scope of the Quota object, either &lsquo;project&rsquo; or &lsquo;secret&rsquo;.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.Region">Region
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.CloudProfileSpec">CloudProfileSpec</a>)
</p>
<p>
<p>Region contains certain properties of a region.</p>
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
<p>Name is a region name.</p>
</td>
</tr>
<tr>
<td>
<code>zones</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.AvailabilityZone">
[]AvailabilityZone
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Zones is a list of availability zones in this region.</p>
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
<p>Labels is an optional set of key-value pairs that contain certain administrator-controlled labels for this region.
It can be used by Gardener administrators/operators to provide additional information about a region, e.g. wrt
quality, reliability, access restrictions, etc.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.SeedBackup">SeedBackup
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.SeedSpec">SeedSpec</a>)
</p>
<p>
<p>SeedBackup contains the object store configuration for backups for shoot (currently only etcd).</p>
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
<code>provider</code></br>
<em>
string
</em>
</td>
<td>
<p>Provider is a provider name.</p>
</td>
</tr>
<tr>
<td>
<code>providerConfig</code></br>
<em>
<a href="https://godoc.org/k8s.io/apimachinery/pkg/runtime#RawExtension">
k8s.io/apimachinery/pkg/runtime.RawExtension
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>ProviderConfig is the configuration passed to BackupBucket resource.</p>
</td>
</tr>
<tr>
<td>
<code>region</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>Region is a region name.</p>
</td>
</tr>
<tr>
<td>
<code>secretRef</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.15/#secretreference-v1-core">
Kubernetes core/v1.SecretReference
</a>
</em>
</td>
<td>
<p>SecretRef is a reference to a Secret object containing the cloud provider credentials for
the object store where backups should be stored. It should have enough privileges to manipulate
the objects as well as buckets.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.SeedDNS">SeedDNS
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.SeedSpec">SeedSpec</a>)
</p>
<p>
<p>SeedDNS contains DNS-relevant information about this seed cluster.</p>
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
<code>ingressDomain</code></br>
<em>
string
</em>
</td>
<td>
<p>IngressDomain is the domain of the Seed cluster pointing to the ingress controller endpoint. It will be used
to construct ingress URLs for system applications running in Shoot clusters.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.SeedNetworks">SeedNetworks
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.SeedSpec">SeedSpec</a>)
</p>
<p>
<p>SeedNetworks contains CIDRs for the pod, service and node networks of a Kubernetes cluster.</p>
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
<code>nodes</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>Nodes is the CIDR of the node network.</p>
</td>
</tr>
<tr>
<td>
<code>pods</code></br>
<em>
string
</em>
</td>
<td>
<p>Pods is the CIDR of the pod network.</p>
</td>
</tr>
<tr>
<td>
<code>services</code></br>
<em>
string
</em>
</td>
<td>
<p>Services is the CIDR of the service network.</p>
</td>
</tr>
<tr>
<td>
<code>shootDefaults</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.ShootNetworks">
ShootNetworks
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>ShootDefaults contains the default networks CIDRs for shoots.</p>
</td>
</tr>
<tr>
<td>
<code>blockCIDRs</code></br>
<em>
[]string
</em>
</td>
<td>
<em>(Optional)</em>
<p>BlockCIDRs is a list of network addresses that should be blocked for shoot control plane components running
in the seed cluster.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.SeedProvider">SeedProvider
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.SeedSpec">SeedSpec</a>)
</p>
<p>
<p>SeedProvider defines the provider type and region for this Seed cluster.</p>
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
string
</em>
</td>
<td>
<p>Type is the name of the provider.</p>
</td>
</tr>
<tr>
<td>
<code>providerConfig</code></br>
<em>
<a href="https://godoc.org/k8s.io/apimachinery/pkg/runtime#RawExtension">
k8s.io/apimachinery/pkg/runtime.RawExtension
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>ProviderConfig is the configuration passed to Seed resource.</p>
</td>
</tr>
<tr>
<td>
<code>region</code></br>
<em>
string
</em>
</td>
<td>
<p>Region is a name of a region.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.SeedSettingExcessCapacityReservation">SeedSettingExcessCapacityReservation
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.SeedSettings">SeedSettings</a>)
</p>
<p>
<p>SeedSettingExcessCapacityReservation controls the excess capacity reservation for shoot control planes in the
seed. When enabled then this is done via PodPriority and requires the Seed cluster to have Kubernetes version 1.11
or the PodPriority feature gate as well as the scheduling.k8s.io/v1alpha1 API group enabled.</p>
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
<p>Enabled controls whether the excess capacity reservation should be enabled.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.SeedSettingLoadBalancerServices">SeedSettingLoadBalancerServices
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.SeedSettings">SeedSettings</a>)
</p>
<p>
<p>SeedSettingLoadBalancerServices controls certain settings for services of type load balancer that are created in the
seed.</p>
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
<p>Annotations is a map of annotations that will be injected/merged into every load balancer service object.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.SeedSettingScheduling">SeedSettingScheduling
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.SeedSettings">SeedSettings</a>)
</p>
<p>
<p>SeedSettingScheduling controls settings for scheduling decisions for the seed.</p>
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
<code>visible</code></br>
<em>
bool
</em>
</td>
<td>
<p>Visible controls whether the gardener-scheduler shall consider this seed when scheduling shoots. Invisible seeds
are not considered by the scheduler.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.SeedSettingShootDNS">SeedSettingShootDNS
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.SeedSettings">SeedSettings</a>)
</p>
<p>
<p>SeedSettingShootDNS controls the shoot DNS settings for the seed.</p>
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
<p>Enabled controls whether the DNS for shoot clusters should be enabled. When disabled then all shoots using the
seed won&rsquo;t get any DNS providers, DNS records, and no DNS extension controller is required to be installed here.
This is useful for environments where DNS is not required.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.SeedSettings">SeedSettings
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.SeedSpec">SeedSpec</a>)
</p>
<p>
<p>SeedSettings contains certain settings for this seed cluster.</p>
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
<code>excessCapacityReservation</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.SeedSettingExcessCapacityReservation">
SeedSettingExcessCapacityReservation
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>ExcessCapacityReservation controls the excess capacity reservation for shoot control planes in the seed.</p>
</td>
</tr>
<tr>
<td>
<code>scheduling</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.SeedSettingScheduling">
SeedSettingScheduling
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Scheduling controls settings for scheduling decisions for the seed.</p>
</td>
</tr>
<tr>
<td>
<code>shootDNS</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.SeedSettingShootDNS">
SeedSettingShootDNS
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>ShootDNS controls the shoot DNS settings for the seed.</p>
</td>
</tr>
<tr>
<td>
<code>loadBalancerServices</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.SeedSettingLoadBalancerServices">
SeedSettingLoadBalancerServices
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>LoadBalancerServices controls certain settings for services of type load balancer that are created in the
seed.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.SeedSpec">SeedSpec
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.Seed">Seed</a>)
</p>
<p>
<p>SeedSpec is the specification of a Seed.</p>
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
<code>backup</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.SeedBackup">
SeedBackup
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Backup holds the object store configuration for the backups of shoot (currently only etcd).
If it is not specified, then there won&rsquo;t be any backups taken for shoots associated with this seed.
If backup field is present in seed, then backups of the etcd from shoot control plane will be stored
under the configured object store.</p>
</td>
</tr>
<tr>
<td>
<code>dns</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.SeedDNS">
SeedDNS
</a>
</em>
</td>
<td>
<p>DNS contains DNS-relevant information about this seed cluster.</p>
</td>
</tr>
<tr>
<td>
<code>networks</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.SeedNetworks">
SeedNetworks
</a>
</em>
</td>
<td>
<p>Networks defines the pod, service and worker network of the Seed cluster.</p>
</td>
</tr>
<tr>
<td>
<code>provider</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.SeedProvider">
SeedProvider
</a>
</em>
</td>
<td>
<p>Provider defines the provider type and region for this Seed cluster.</p>
</td>
</tr>
<tr>
<td>
<code>secretRef</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.15/#secretreference-v1-core">
Kubernetes core/v1.SecretReference
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>SecretRef is a reference to a Secret object containing the Kubeconfig and the cloud provider credentials for
the account the Seed cluster has been deployed to.</p>
</td>
</tr>
<tr>
<td>
<code>taints</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.SeedTaint">
[]SeedTaint
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Taints describes taints on the seed.</p>
</td>
</tr>
<tr>
<td>
<code>volume</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.SeedVolume">
SeedVolume
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Volume contains settings for persistentvolumes created in the seed cluster.</p>
</td>
</tr>
<tr>
<td>
<code>settings</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.SeedSettings">
SeedSettings
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Settings contains certain settings for this seed cluster.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.SeedStatus">SeedStatus
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.Seed">Seed</a>)
</p>
<p>
<p>SeedStatus is the status of a Seed.</p>
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
<code>gardener</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.Gardener">
Gardener
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Gardener holds information about the Gardener which last acted on the Shoot.</p>
</td>
</tr>
<tr>
<td>
<code>kubernetesVersion</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>KubernetesVersion is the Kubernetes version of the seed cluster.</p>
</td>
</tr>
<tr>
<td>
<code>conditions</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.Condition">
[]Condition
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Conditions represents the latest available observations of a Seed&rsquo;s current state.</p>
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
<p>ObservedGeneration is the most recent generation observed for this Seed. It corresponds to the
Seed&rsquo;s generation, which is updated on mutation by the API Server.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.SeedTaint">SeedTaint
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.SeedSpec">SeedSpec</a>)
</p>
<p>
<p>SeedTaint describes a taint on a seed.</p>
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
<code>key</code></br>
<em>
string
</em>
</td>
<td>
<p>Key is the taint key to be applied to a seed.</p>
</td>
</tr>
<tr>
<td>
<code>value</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>Value is the taint value corresponding to the taint key.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.SeedVolume">SeedVolume
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.SeedSpec">SeedSpec</a>)
</p>
<p>
<p>SeedVolume contains settings for persistentvolumes created in the seed cluster.</p>
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
<code>minimumSize</code></br>
<em>
<a href="https://godoc.org/k8s.io/apimachinery/pkg/api/resource#Quantity">
k8s.io/apimachinery/pkg/api/resource.Quantity
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>MinimumSize defines the minimum size that should be used for PVCs in the seed.</p>
</td>
</tr>
<tr>
<td>
<code>providers</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.SeedVolumeProvider">
[]SeedVolumeProvider
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Providers is a list of storage class provisioner types for the seed.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.SeedVolumeProvider">SeedVolumeProvider
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.SeedVolume">SeedVolume</a>)
</p>
<p>
<p>SeedVolumeProvider is a storage class provisioner type.</p>
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
<code>purpose</code></br>
<em>
string
</em>
</td>
<td>
<p>Purpose is the purpose of this provider.</p>
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
<p>Name is the name of the storage class provisioner type.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.ServiceAccountConfig">ServiceAccountConfig
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.KubeAPIServerConfig">KubeAPIServerConfig</a>)
</p>
<p>
<p>ServiceAccountConfig is the kube-apiserver configuration for service accounts.</p>
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
<code>issuer</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>Issuer is the identifier of the service account token issuer. The issuer will assert this
identifier in &ldquo;iss&rdquo; claim of issued tokens. This value is a string or URI.
Defaults to URI of the API server.</p>
</td>
</tr>
<tr>
<td>
<code>signingKeySecretName</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.15/#localobjectreference-v1-core">
Kubernetes core/v1.LocalObjectReference
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>SigningKeySecret is a reference to a secret that contains an optional private key of the
service account token issuer. The issuer will sign issued ID tokens with this private key.
Only useful if service account tokens are also issued by another external system.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.ShootMachineImage">ShootMachineImage
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.Machine">Machine</a>)
</p>
<p>
<p>ShootMachineImage defines the name and the version of the shoot&rsquo;s machine image in any environment. Has to be
defined in the respective CloudProfile.</p>
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
<p>Name is the name of the image.</p>
</td>
</tr>
<tr>
<td>
<code>providerConfig</code></br>
<em>
<a href="https://godoc.org/k8s.io/apimachinery/pkg/runtime#RawExtension">
k8s.io/apimachinery/pkg/runtime.RawExtension
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>ProviderConfig is the shoot&rsquo;s individual configuration passed to an extension resource.</p>
</td>
</tr>
<tr>
<td>
<code>version</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>Version is the version of the shoot&rsquo;s image.
If version is not provided, it will be defaulted to the latest version from the CloudProfile.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.ShootNetworks">ShootNetworks
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.SeedNetworks">SeedNetworks</a>)
</p>
<p>
<p>ShootNetworks contains the default networks CIDRs for shoots.</p>
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
<code>pods</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>Pods is the CIDR of the pod network.</p>
</td>
</tr>
<tr>
<td>
<code>services</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>Services is the CIDR of the service network.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.ShootPurpose">ShootPurpose
(<code>string</code> alias)</p></h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.ShootSpec">ShootSpec</a>)
</p>
<p>
<p>ShootPurpose is a type alias for string.</p>
</p>
<h3 id="core.gardener.cloud/v1beta1.ShootSpec">ShootSpec
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.Shoot">Shoot</a>)
</p>
<p>
<p>ShootSpec is the specification of a Shoot.</p>
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
<code>addons</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.Addons">
Addons
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Addons contains information about enabled/disabled addons and their configuration.</p>
</td>
</tr>
<tr>
<td>
<code>cloudProfileName</code></br>
<em>
string
</em>
</td>
<td>
<p>CloudProfileName is a name of a CloudProfile object.</p>
</td>
</tr>
<tr>
<td>
<code>dns</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.DNS">
DNS
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>DNS contains information about the DNS settings of the Shoot.</p>
</td>
</tr>
<tr>
<td>
<code>extensions</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.Extension">
[]Extension
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Extensions contain type and provider information for Shoot extensions.</p>
</td>
</tr>
<tr>
<td>
<code>hibernation</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.Hibernation">
Hibernation
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Hibernation contains information whether the Shoot is suspended or not.</p>
</td>
</tr>
<tr>
<td>
<code>kubernetes</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.Kubernetes">
Kubernetes
</a>
</em>
</td>
<td>
<p>Kubernetes contains the version and configuration settings of the control plane components.</p>
</td>
</tr>
<tr>
<td>
<code>networking</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.Networking">
Networking
</a>
</em>
</td>
<td>
<p>Networking contains information about cluster networking such as CNI Plugin type, CIDRs, &hellip;etc.</p>
</td>
</tr>
<tr>
<td>
<code>maintenance</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.Maintenance">
Maintenance
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Maintenance contains information about the time window for maintenance operations and which
operations should be performed.</p>
</td>
</tr>
<tr>
<td>
<code>monitoring</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.Monitoring">
Monitoring
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Monitoring contains information about custom monitoring configurations for the shoot.</p>
</td>
</tr>
<tr>
<td>
<code>provider</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.Provider">
Provider
</a>
</em>
</td>
<td>
<p>Provider contains all provider-specific and provider-relevant information.</p>
</td>
</tr>
<tr>
<td>
<code>purpose</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.ShootPurpose">
ShootPurpose
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Purpose is the purpose class for this cluster.</p>
</td>
</tr>
<tr>
<td>
<code>region</code></br>
<em>
string
</em>
</td>
<td>
<p>Region is a name of a region.</p>
</td>
</tr>
<tr>
<td>
<code>secretBindingName</code></br>
<em>
string
</em>
</td>
<td>
<p>SecretBindingName is the name of the a SecretBinding that has a reference to the provider secret.
The credentials inside the provider secret will be used to create the shoot in the respective account.</p>
</td>
</tr>
<tr>
<td>
<code>seedName</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>SeedName is the name of the seed cluster that runs the control plane of the Shoot.</p>
</td>
</tr>
<tr>
<td>
<code>seedSelector</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.15/#labelselector-v1-meta">
Kubernetes meta/v1.LabelSelector
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>SeedSelector is an optional selector which must match a seed&rsquo;s labels for the shoot to be scheduled on that seed.</p>
</td>
</tr>
<tr>
<td>
<code>resources</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.NamedResourceReference">
[]NamedResourceReference
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Resources holds a list of named resource references that can be referred to in extension configs by their names.</p>
</td>
</tr>
<tr>
<td>
<code>tolerations</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.Toleration">
[]Toleration
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Tolerations contains the tolerations for taints on seed clusters.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.ShootStatus">ShootStatus
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.Shoot">Shoot</a>)
</p>
<p>
<p>ShootStatus holds the most recently observed status of the Shoot cluster.</p>
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
<a href="#core.gardener.cloud/v1beta1.Condition">
[]Condition
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Conditions represents the latest available observations of a Shoots&rsquo;s current state.</p>
</td>
</tr>
<tr>
<td>
<code>constraints</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.Condition">
[]Condition
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Constraints represents conditions of a Shoot&rsquo;s current state that constraint some operations on it.</p>
</td>
</tr>
<tr>
<td>
<code>gardener</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.Gardener">
Gardener
</a>
</em>
</td>
<td>
<p>Gardener holds information about the Gardener which last acted on the Shoot.</p>
</td>
</tr>
<tr>
<td>
<code>hibernated</code></br>
<em>
bool
</em>
</td>
<td>
<p>IsHibernated indicates whether the Shoot is currently hibernated.</p>
</td>
</tr>
<tr>
<td>
<code>lastOperation</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.LastOperation">
LastOperation
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>LastOperation holds information about the last operation on the Shoot.</p>
</td>
</tr>
<tr>
<td>
<code>lastErrors</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.LastError">
[]LastError
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>LastErrors holds information about the last occurred error(s) during an operation.</p>
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
<p>ObservedGeneration is the most recent generation observed for this Shoot. It corresponds to the
Shoot&rsquo;s generation, which is updated on mutation by the API Server.</p>
</td>
</tr>
<tr>
<td>
<code>retryCycleStartTime</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.15/#time-v1-meta">
Kubernetes meta/v1.Time
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>RetryCycleStartTime is the start time of the last retry cycle (used to determine how often an operation
must be retried until we give up).</p>
</td>
</tr>
<tr>
<td>
<code>seedName</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>SeedName is the name of the seed cluster that runs the control plane of the Shoot. This value is only written
after a successful create/reconcile operation. It will be used when control planes are moved between Seeds.</p>
</td>
</tr>
<tr>
<td>
<code>technicalID</code></br>
<em>
string
</em>
</td>
<td>
<p>TechnicalID is the name that is used for creating the Seed namespace, the infrastructure resources, and
basically everything that is related to this particular Shoot.</p>
</td>
</tr>
<tr>
<td>
<code>uid</code></br>
<em>
<a href="https://godoc.org/k8s.io/apimachinery/pkg/types#UID">
k8s.io/apimachinery/pkg/types.UID
</a>
</em>
</td>
<td>
<p>UID is a unique identifier for the Shoot cluster to avoid portability between Kubernetes clusters.
It is used to compute unique hashes.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.Toleration">Toleration
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.ProjectTolerations">ProjectTolerations</a>, 
<a href="#core.gardener.cloud/v1beta1.ShootSpec">ShootSpec</a>)
</p>
<p>
<p>Toleration is a toleration for a seed taint.</p>
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
<code>key</code></br>
<em>
string
</em>
</td>
<td>
<p>Key is the toleration key to be applied to a project or shoot.</p>
</td>
</tr>
<tr>
<td>
<code>value</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>Value is the toleration value corresponding to the toleration key.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.VersionClassification">VersionClassification
(<code>string</code> alias)</p></h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.ExpirableVersion">ExpirableVersion</a>)
</p>
<p>
<p>VersionClassification is the logical state of a version according to <a href="https://github.com/gardener/gardener/blob/master/docs/operations/versioning.md">https://github.com/gardener/gardener/blob/master/docs/operations/versioning.md</a></p>
</p>
<h3 id="core.gardener.cloud/v1beta1.Volume">Volume
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.Worker">Worker</a>)
</p>
<p>
<p>Volume contains information about the volume type, size, and encryption.</p>
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
<em>(Optional)</em>
<p>Name of the volume to make it referencable.</p>
</td>
</tr>
<tr>
<td>
<code>type</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>Type is the type of the volume.</p>
</td>
</tr>
<tr>
<td>
<code>size</code></br>
<em>
string
</em>
</td>
<td>
<p>VolumeSize is the size of the volume.</p>
</td>
</tr>
<tr>
<td>
<code>encrypted</code></br>
<em>
bool
</em>
</td>
<td>
<em>(Optional)</em>
<p>Encrypted determines if the volume should be encrypted.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.VolumeType">VolumeType
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.CloudProfileSpec">CloudProfileSpec</a>)
</p>
<p>
<p>VolumeType contains certain properties of a volume type.</p>
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
<code>class</code></br>
<em>
string
</em>
</td>
<td>
<p>Class is the class of the volume type.</p>
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
<p>Name is the name of the volume type.</p>
</td>
</tr>
<tr>
<td>
<code>usable</code></br>
<em>
bool
</em>
</td>
<td>
<em>(Optional)</em>
<p>Usable defines if the volume type can be used for shoot clusters.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.Worker">Worker
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.Provider">Provider</a>)
</p>
<p>
<p>Worker is the base definition of a worker group.</p>
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
<p>Annotations is a map of key/value pairs for annotations for all the <code>Node</code> objects in this worker pool.</p>
</td>
</tr>
<tr>
<td>
<code>caBundle</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>CABundle is a certificate bundle which will be installed onto every machine of this worker pool.</p>
</td>
</tr>
<tr>
<td>
<code>cri</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.CRI">
CRI
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>CRI contains configurations of CRI support of every machine in the worker pool</p>
</td>
</tr>
<tr>
<td>
<code>kubernetes</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.WorkerKubernetes">
WorkerKubernetes
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Kubernetes contains configuration for Kubernetes components related to this worker pool.</p>
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
<p>Labels is a map of key/value pairs for labels for all the <code>Node</code> objects in this worker pool.</p>
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
<p>Name is the name of the worker group.</p>
</td>
</tr>
<tr>
<td>
<code>machine</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.Machine">
Machine
</a>
</em>
</td>
<td>
<p>Machine contains information about the machine type and image.</p>
</td>
</tr>
<tr>
<td>
<code>maximum</code></br>
<em>
int32
</em>
</td>
<td>
<p>Maximum is the maximum number of VMs to create.</p>
</td>
</tr>
<tr>
<td>
<code>minimum</code></br>
<em>
int32
</em>
</td>
<td>
<p>Minimum is the minimum number of VMs to create.</p>
</td>
</tr>
<tr>
<td>
<code>maxSurge</code></br>
<em>
<a href="https://godoc.org/k8s.io/apimachinery/pkg/util/intstr#IntOrString">
k8s.io/apimachinery/pkg/util/intstr.IntOrString
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>MaxSurge is maximum number of VMs that are created during an update.</p>
</td>
</tr>
<tr>
<td>
<code>maxUnavailable</code></br>
<em>
<a href="https://godoc.org/k8s.io/apimachinery/pkg/util/intstr#IntOrString">
k8s.io/apimachinery/pkg/util/intstr.IntOrString
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>MaxUnavailable is the maximum number of VMs that can be unavailable during an update.</p>
</td>
</tr>
<tr>
<td>
<code>providerConfig</code></br>
<em>
<a href="https://godoc.org/k8s.io/apimachinery/pkg/runtime#RawExtension">
k8s.io/apimachinery/pkg/runtime.RawExtension
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>ProviderConfig is the provider-specific configuration for this worker pool.</p>
</td>
</tr>
<tr>
<td>
<code>taints</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.15/#taint-v1-core">
[]Kubernetes core/v1.Taint
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Taints is a list of taints for all the <code>Node</code> objects in this worker pool.</p>
</td>
</tr>
<tr>
<td>
<code>volume</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.Volume">
Volume
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Volume contains information about the volume type and size.</p>
</td>
</tr>
<tr>
<td>
<code>dataVolumes</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.DataVolume">
[]DataVolume
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>DataVolumes contains a list of additional worker volumes.</p>
</td>
</tr>
<tr>
<td>
<code>kubeletDataVolumeName</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>KubeletDataVolumeName contains the name of a dataVolume that should be used for storing kubelet state.</p>
</td>
</tr>
<tr>
<td>
<code>zones</code></br>
<em>
[]string
</em>
</td>
<td>
<em>(Optional)</em>
<p>Zones is a list of availability zones that are used to evenly distribute this worker pool. Optional
as not every provider may support availability zones.</p>
</td>
</tr>
<tr>
<td>
<code>systemComponents</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.WorkerSystemComponents">
WorkerSystemComponents
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>SystemComponents contains configuration for system components related to this worker pool</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.WorkerKubernetes">WorkerKubernetes
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.Worker">Worker</a>)
</p>
<p>
<p>WorkerKubernetes contains configuration for Kubernetes components related to this worker pool.</p>
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
<code>kubelet</code></br>
<em>
<a href="#core.gardener.cloud/v1beta1.KubeletConfig">
KubeletConfig
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Kubelet contains configuration settings for all kubelets of this worker pool.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="core.gardener.cloud/v1beta1.WorkerSystemComponents">WorkerSystemComponents
</h3>
<p>
(<em>Appears on:</em>
<a href="#core.gardener.cloud/v1beta1.Worker">Worker</a>)
</p>
<p>
<p>WorkerSystemComponents contains configuration for system components related to this worker pool</p>
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
<code>allow</code></br>
<em>
bool
</em>
</td>
<td>
<p>Allow determines whether the pool should be allowed to host system components or not (defaults to true)</p>
</td>
</tr>
</tbody>
</table>
<hr/>
