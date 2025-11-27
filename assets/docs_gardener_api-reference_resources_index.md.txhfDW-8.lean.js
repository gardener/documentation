import{c as a,o as s,j as e,a as o}from"./chunks/framework.Bfq10Vlj.js";const p=JSON.parse('{"title":"Resources","description":"","frontmatter":{"github_repo":"https://github.com/gardener/gardener","github_subdir":"docs/api-reference","params":{"github_branch":"master"},"path_base_for_github_subdir":{"from":"content/docs/gardener/api-reference/resources.md","to":"resources.md"},"title":"Resources","prev":false,"next":false},"headers":[],"relativePath":"docs/gardener/api-reference/resources/index.md","filePath":"docs/gardener/api-reference/resources.md","lastUpdated":null}'),d={name:"docs/gardener/api-reference/resources/index.md"},l=Object.assign(d,{setup(c){const r=`<p>Packages:</p>
<ul>
<li>
<a href="/docs/gardener/api-reference/resources/#resources.gardener.cloud/v1alpha1">resources.gardener.cloud/v1alpha1</a>
</li>
</ul>
<h2 id="resources.gardener.cloud/v1alpha1">resources.gardener.cloud/v1alpha1</h2>
<p>
<p>Package v1alpha1 contains the configuration of the Gardener Resource Manager.</p>
</p>
Resource Types:
<ul></ul>
<h3 id="resources.gardener.cloud/v1alpha1.ManagedResource">ManagedResource
</h3>
<p>
<p>ManagedResource describes a list of managed resources.</p>
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
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.33/#objectmeta-v1-meta">
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
<a href="/docs/gardener/api-reference/resources/#resources.gardener.cloud/v1alpha1.ManagedResourceSpec">
ManagedResourceSpec
</a>
</em>
</td>
<td>
<p>Spec contains the specification of this managed resource.</p>
<br/>
<br/>
<table>
<tr>
<td>
<code>class</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>Class holds the resource class used to control the responsibility for multiple resource manager instances</p>
</td>
</tr>
<tr>
<td>
<code>secretRefs</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.33/#localobjectreference-v1-core">
[]Kubernetes core/v1.LocalObjectReference
</a>
</em>
</td>
<td>
<p>SecretRefs is a list of secret references.</p>
</td>
</tr>
<tr>
<td>
<code>injectLabels</code></br>
<em>
map[string]string
</em>
</td>
<td>
<em>(Optional)</em>
<p>InjectLabels injects the provided labels into every resource that is part of the referenced secrets.</p>
</td>
</tr>
<tr>
<td>
<code>forceOverwriteLabels</code></br>
<em>
bool
</em>
</td>
<td>
<em>(Optional)</em>
<p>ForceOverwriteLabels specifies that all existing labels should be overwritten. Defaults to false.</p>
</td>
</tr>
<tr>
<td>
<code>forceOverwriteAnnotations</code></br>
<em>
bool
</em>
</td>
<td>
<em>(Optional)</em>
<p>ForceOverwriteAnnotations specifies that all existing annotations should be overwritten. Defaults to false.</p>
</td>
</tr>
<tr>
<td>
<code>keepObjects</code></br>
<em>
bool
</em>
</td>
<td>
<em>(Optional)</em>
<p>KeepObjects specifies whether the objects should be kept although the managed resource has already been deleted.
Defaults to false.</p>
</td>
</tr>
<tr>
<td>
<code>equivalences</code></br>
<em>
[][]k8s.io/apimachinery/pkg/apis/meta/v1.GroupKind
</em>
</td>
<td>
<em>(Optional)</em>
<p>Equivalences specifies possible group/kind equivalences for objects.</p>
</td>
</tr>
<tr>
<td>
<code>deletePersistentVolumeClaims</code></br>
<em>
bool
</em>
</td>
<td>
<em>(Optional)</em>
<p>DeletePersistentVolumeClaims specifies if PersistentVolumeClaims created by StatefulSets, which are managed by this
resource, should also be deleted when the corresponding StatefulSet is deleted (defaults to false).</p>
</td>
</tr>
</table>
</td>
</tr>
<tr>
<td>
<code>status</code></br>
<em>
<a href="/docs/gardener/api-reference/resources/#resources.gardener.cloud/v1alpha1.ManagedResourceStatus">
ManagedResourceStatus
</a>
</em>
</td>
<td>
<p>Status contains the status of this managed resource.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="resources.gardener.cloud/v1alpha1.ManagedResourceSpec">ManagedResourceSpec
</h3>
<p>
(<em>Appears on:</em>
<a href="/docs/gardener/api-reference/resources/#resources.gardener.cloud/v1alpha1.ManagedResource">ManagedResource</a>)
</p>
<p>
<p>ManagedResourceSpec contains the specification of this managed resource.</p>
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
<em>(Optional)</em>
<p>Class holds the resource class used to control the responsibility for multiple resource manager instances</p>
</td>
</tr>
<tr>
<td>
<code>secretRefs</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.33/#localobjectreference-v1-core">
[]Kubernetes core/v1.LocalObjectReference
</a>
</em>
</td>
<td>
<p>SecretRefs is a list of secret references.</p>
</td>
</tr>
<tr>
<td>
<code>injectLabels</code></br>
<em>
map[string]string
</em>
</td>
<td>
<em>(Optional)</em>
<p>InjectLabels injects the provided labels into every resource that is part of the referenced secrets.</p>
</td>
</tr>
<tr>
<td>
<code>forceOverwriteLabels</code></br>
<em>
bool
</em>
</td>
<td>
<em>(Optional)</em>
<p>ForceOverwriteLabels specifies that all existing labels should be overwritten. Defaults to false.</p>
</td>
</tr>
<tr>
<td>
<code>forceOverwriteAnnotations</code></br>
<em>
bool
</em>
</td>
<td>
<em>(Optional)</em>
<p>ForceOverwriteAnnotations specifies that all existing annotations should be overwritten. Defaults to false.</p>
</td>
</tr>
<tr>
<td>
<code>keepObjects</code></br>
<em>
bool
</em>
</td>
<td>
<em>(Optional)</em>
<p>KeepObjects specifies whether the objects should be kept although the managed resource has already been deleted.
Defaults to false.</p>
</td>
</tr>
<tr>
<td>
<code>equivalences</code></br>
<em>
[][]k8s.io/apimachinery/pkg/apis/meta/v1.GroupKind
</em>
</td>
<td>
<em>(Optional)</em>
<p>Equivalences specifies possible group/kind equivalences for objects.</p>
</td>
</tr>
<tr>
<td>
<code>deletePersistentVolumeClaims</code></br>
<em>
bool
</em>
</td>
<td>
<em>(Optional)</em>
<p>DeletePersistentVolumeClaims specifies if PersistentVolumeClaims created by StatefulSets, which are managed by this
resource, should also be deleted when the corresponding StatefulSet is deleted (defaults to false).</p>
</td>
</tr>
</tbody>
</table>
<h3 id="resources.gardener.cloud/v1alpha1.ManagedResourceStatus">ManagedResourceStatus
</h3>
<p>
(<em>Appears on:</em>
<a href="/docs/gardener/api-reference/resources/#resources.gardener.cloud/v1alpha1.ManagedResource">ManagedResource</a>)
</p>
<p>
<p>ManagedResourceStatus is the status of a managed resource.</p>
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
<a href="/docs/gardener/api-reference/core/#core.gardener.cloud/v1beta1.Condition">
[]github.com/gardener/gardener/pkg/apis/core/v1beta1.Condition
</a>
</em>
</td>
<td>
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
<p>ObservedGeneration is the most recent generation observed for this resource.</p>
</td>
</tr>
<tr>
<td>
<code>resources</code></br>
<em>
<a href="/docs/gardener/api-reference/resources/#resources.gardener.cloud/v1alpha1.ObjectReference">
[]ObjectReference
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Resources is a list of objects that have been created.</p>
</td>
</tr>
<tr>
<td>
<code>secretsDataChecksum</code></br>
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>SecretsDataChecksum is the checksum of referenced secrets data.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="resources.gardener.cloud/v1alpha1.ObjectReference">ObjectReference
</h3>
<p>
(<em>Appears on:</em>
<a href="/docs/gardener/api-reference/resources/#resources.gardener.cloud/v1alpha1.ManagedResourceStatus">ManagedResourceStatus</a>)
</p>
<p>
<p>ObjectReference is a reference to another object.</p>
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
<code>ObjectReference</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.33/#objectreference-v1-core">
Kubernetes core/v1.ObjectReference
</a>
</em>
</td>
<td>
<p>
(Members of <code>ObjectReference</code> are embedded into this type.)
</p>
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
<p>Labels is a map of labels that were used during last update of the resource.</p>
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
<p>Annotations is a map of annotations that were used during last update of the resource.</p>
</td>
</tr>
</tbody>
</table>
<hr/>
<p><em>
Generated with <a href="https://github.com/ahmetb/gen-crd-api-reference-docs">gen-crd-api-reference-docs</a>
</em></p>`;return(n,t)=>(s(),a("div",null,[t[0]||(t[0]=e("h1",{id:"resources",tabindex:"-1"},[o("Resources "),e("a",{class:"header-anchor",href:"#resources","aria-label":'Permalink to "Resources"'},"​")],-1)),e("div",{innerHTML:r})]))}});export{p as __pageData,l as default};
