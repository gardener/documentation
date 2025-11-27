import{c as i,o as n,j as e,a as r}from"./chunks/framework.Bfq10Vlj.js";const s=JSON.parse('{"title":"Authentication","description":"","frontmatter":{"github_repo":"https://github.com/gardener/gardener","github_subdir":"docs/api-reference","params":{"github_branch":"master"},"path_base_for_github_subdir":{"from":"content/docs/gardener/api-reference/authentication.md","to":"authentication.md"},"title":"Authentication","prev":false,"next":false},"headers":[],"relativePath":"docs/gardener/api-reference/authentication/index.md","filePath":"docs/gardener/api-reference/authentication.md","lastUpdated":null}'),d={name:"docs/gardener/api-reference/authentication/index.md"},h=Object.assign(d,{setup(o){const a=`<p>Packages:</p>
<ul>
<li>
<a href="/docs/gardener/api-reference/authentication/#authentication.gardener.cloud/v1alpha1">authentication.gardener.cloud/v1alpha1</a>
</li>
</ul>
<h2 id="authentication.gardener.cloud/v1alpha1">authentication.gardener.cloud/v1alpha1</h2>
<p>
<p>Package v1alpha1 is a version of the API.
“authentication.gardener.cloud/v1alpha1” API is already used for CRD registration and must not be served by the API server.</p>
</p>
Resource Types:
<ul></ul>
<h3 id="authentication.gardener.cloud/v1alpha1.AdminKubeconfigRequest">AdminKubeconfigRequest
</h3>
<p>
<p>AdminKubeconfigRequest can be used to request a kubeconfig with admin credentials
for a Shoot cluster.</p>
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
<a href="/docs/gardener/api-reference/authentication/#authentication.gardener.cloud/v1alpha1.AdminKubeconfigRequestSpec">
AdminKubeconfigRequestSpec
</a>
</em>
</td>
<td>
<p>Spec is the specification of the AdminKubeconfigRequest.</p>
<br/>
<br/>
<table>
<tr>
<td>
<code>expirationSeconds</code></br>
<em>
int64
</em>
</td>
<td>
<em>(Optional)</em>
<p>ExpirationSeconds is the requested validity duration of the credential. The
credential issuer may return a credential with a different validity duration so a
client needs to check the ‘expirationTimestamp’ field in a response.
Defaults to 1 hour.</p>
</td>
</tr>
</table>
</td>
</tr>
<tr>
<td>
<code>status</code></br>
<em>
<a href="/docs/gardener/api-reference/authentication/#authentication.gardener.cloud/v1alpha1.AdminKubeconfigRequestStatus">
AdminKubeconfigRequestStatus
</a>
</em>
</td>
<td>
<p>Status is the status of the AdminKubeconfigRequest.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="authentication.gardener.cloud/v1alpha1.AdminKubeconfigRequestSpec">AdminKubeconfigRequestSpec
</h3>
<p>
(<em>Appears on:</em>
<a href="/docs/gardener/api-reference/authentication/#authentication.gardener.cloud/v1alpha1.AdminKubeconfigRequest">AdminKubeconfigRequest</a>)
</p>
<p>
<p>AdminKubeconfigRequestSpec contains the expiration time of the kubeconfig.</p>
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
<code>expirationSeconds</code></br>
<em>
int64
</em>
</td>
<td>
<em>(Optional)</em>
<p>ExpirationSeconds is the requested validity duration of the credential. The
credential issuer may return a credential with a different validity duration so a
client needs to check the ‘expirationTimestamp’ field in a response.
Defaults to 1 hour.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="authentication.gardener.cloud/v1alpha1.AdminKubeconfigRequestStatus">AdminKubeconfigRequestStatus
</h3>
<p>
(<em>Appears on:</em>
<a href="/docs/gardener/api-reference/authentication/#authentication.gardener.cloud/v1alpha1.AdminKubeconfigRequest">AdminKubeconfigRequest</a>)
</p>
<p>
<p>AdminKubeconfigRequestStatus is the status of the AdminKubeconfigRequest containing
the kubeconfig and expiration of the credential.</p>
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
<code>kubeconfig</code></br>
<em>
[]byte
</em>
</td>
<td>
<p>Kubeconfig contains the kubeconfig with cluster-admin privileges for the shoot cluster.</p>
</td>
</tr>
<tr>
<td>
<code>expirationTimestamp</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.33/#time-v1-meta">
Kubernetes meta/v1.Time
</a>
</em>
</td>
<td>
<p>ExpirationTimestamp is the expiration timestamp of the returned credential.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="authentication.gardener.cloud/v1alpha1.ViewerKubeconfigRequest">ViewerKubeconfigRequest
</h3>
<p>
<p>ViewerKubeconfigRequest can be used to request a kubeconfig with viewer credentials (excluding Secrets)
for a Shoot cluster.</p>
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
<a href="/docs/gardener/api-reference/authentication/#authentication.gardener.cloud/v1alpha1.ViewerKubeconfigRequestSpec">
ViewerKubeconfigRequestSpec
</a>
</em>
</td>
<td>
<p>Spec is the specification of the ViewerKubeconfigRequest.</p>
<br/>
<br/>
<table>
<tr>
<td>
<code>expirationSeconds</code></br>
<em>
int64
</em>
</td>
<td>
<em>(Optional)</em>
<p>ExpirationSeconds is the requested validity duration of the credential. The
credential issuer may return a credential with a different validity duration so a
client needs to check the ‘expirationTimestamp’ field in a response.
Defaults to 1 hour.</p>
</td>
</tr>
</table>
</td>
</tr>
<tr>
<td>
<code>status</code></br>
<em>
<a href="/docs/gardener/api-reference/authentication/#authentication.gardener.cloud/v1alpha1.ViewerKubeconfigRequestStatus">
ViewerKubeconfigRequestStatus
</a>
</em>
</td>
<td>
<p>Status is the status of the ViewerKubeconfigRequest.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="authentication.gardener.cloud/v1alpha1.ViewerKubeconfigRequestSpec">ViewerKubeconfigRequestSpec
</h3>
<p>
(<em>Appears on:</em>
<a href="/docs/gardener/api-reference/authentication/#authentication.gardener.cloud/v1alpha1.ViewerKubeconfigRequest">ViewerKubeconfigRequest</a>)
</p>
<p>
<p>ViewerKubeconfigRequestSpec contains the expiration time of the kubeconfig.</p>
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
<code>expirationSeconds</code></br>
<em>
int64
</em>
</td>
<td>
<em>(Optional)</em>
<p>ExpirationSeconds is the requested validity duration of the credential. The
credential issuer may return a credential with a different validity duration so a
client needs to check the ‘expirationTimestamp’ field in a response.
Defaults to 1 hour.</p>
</td>
</tr>
</tbody>
</table>
<h3 id="authentication.gardener.cloud/v1alpha1.ViewerKubeconfigRequestStatus">ViewerKubeconfigRequestStatus
</h3>
<p>
(<em>Appears on:</em>
<a href="/docs/gardener/api-reference/authentication/#authentication.gardener.cloud/v1alpha1.ViewerKubeconfigRequest">ViewerKubeconfigRequest</a>)
</p>
<p>
<p>ViewerKubeconfigRequestStatus is the status of the ViewerKubeconfigRequest containing
the kubeconfig and expiration of the credential.</p>
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
<code>kubeconfig</code></br>
<em>
[]byte
</em>
</td>
<td>
<p>Kubeconfig contains the kubeconfig with viewer privileges (excluding Secrets) for the shoot cluster.</p>
</td>
</tr>
<tr>
<td>
<code>expirationTimestamp</code></br>
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.33/#time-v1-meta">
Kubernetes meta/v1.Time
</a>
</em>
</td>
<td>
<p>ExpirationTimestamp is the expiration timestamp of the returned credential.</p>
</td>
</tr>
</tbody>
</table>
<hr/>
<p><em>
Generated with <a href="https://github.com/ahmetb/gen-crd-api-reference-docs">gen-crd-api-reference-docs</a>
</em></p>`;return(c,t)=>(n(),i("div",null,[t[0]||(t[0]=e("h1",{id:"authentication",tabindex:"-1"},[r("Authentication "),e("a",{class:"header-anchor",href:"#authentication","aria-label":'Permalink to "Authentication"'},"​")],-1)),e("div",{innerHTML:a})]))}});export{s as __pageData,h as default};
