---
github_repo: 'https://github.com/gardener/gardener-extension-auditing'
github_subdir: docs/api-reference
params:
  github_branch: main
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/others/gardener-extension-auditing/api-reference/auditing.md
  to: auditing.md
title: Auditing
prev: false
next: false
managed: true
---

# Auditing

<p>Packages:</p>
<ul>
<li>
<a href="#auditing.extensions.gardener.cloud%2fv1alpha1">auditing.extensions.gardener.cloud/v1alpha1</a>
</li>
</ul>

<h2 id="auditing.extensions.gardener.cloud/v1alpha1">auditing.extensions.gardener.cloud/v1alpha1</h2>
<p>

</p>

<h3 id="auditbackend">AuditBackend
</h3>

<p>
(<em>Appears on:</em><a href="#auditconfiguration">AuditConfiguration</a>)
</p>

<p>
AuditBackend defines the configuration for a single audit backend.
It specifies where audit events should be sent and how they should be delivered.
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
<code>deliveryMode</code></br>
<em>
<a href="#deliverymode">DeliveryMode</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>DeliveryMode specifies how messages are delivered to this backend.<br />"Guaranteed" means the request is considered successful only if this backend succeeds.<br />"BestEffort" means delivery is attempted but failures don't affect request success.<br />When only one backend is configured, it is implicitly "Guaranteed".<br />When multiple backends are configured, exactly one must be "Guaranteed".</p>
</td>
</tr>
<tr>
<td>
<code>http</code></br>
<em>
<a href="#backendhttp">BackendHTTP</a>
</em>
</td>
<td>
<p>HTTP specifies the configuration for an HTTP-based audit backend.<br />When configured, audit events will be sent via HTTP to the specified endpoint.</p>
</td>
</tr>

</tbody>
</table>

<h3 id="auditconfiguration">AuditConfiguration
</h3>

<p>
AuditConfiguration contains information about the auditing service configuration.
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
<code>backends</code></br>
<em>
<a href="#auditbackend">AuditBackend</a> array
</em>
</td>
<td>
<p>Backends are all the backends that will receive audit logs.</p>
</td>
</tr>

</tbody>
</table>

<h3 id="backendhttp">BackendHTTP
</h3>

<p>
(<em>Appears on:</em><a href="#auditbackend">AuditBackend</a>)
</p>

<p>
BackendHTTP defines the configuration for an HTTP audit backend.
This backend sends audit events to a remote HTTP endpoint over HTTPS.
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
<code>url</code></br>
<em>
string
</em>
</td>
<td>
<p>URL is the HTTP endpoint where audit events will be sent.<br />This should be a complete HTTPS URL including the protocol, host, and path.</p>
</td>
</tr>
<tr>
<td>
<code>tls</code></br>
<em>
<a href="#tlsconfig">TLSConfig</a>
</em>
</td>
<td>
<p>TLS contains the TLS configuration for secure communication with the HTTP backend.</p>
</td>
</tr>
<tr>
<td>
<code>compression</code></br>
<em>
string
</em>
</td>
<td>
<p>Compression defines the compression algorithm to use for the HTTP request body when forwarding<br />audit events. If unset, no compression is applied. Currently only "gzip" is supported.</p>
</td>
</tr>

</tbody>
</table>

<h3 id="tlsconfig">TLSConfig
</h3>

<p>
(<em>Appears on:</em><a href="#backendhttp">BackendHTTP</a>)
</p>

<p>
TLSConfig defines the TLS configuration for secure communication.
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
<code>secretReferenceName</code></br>
<em>
string
</em>
</td>
<td>
<p>SecretReferenceName is the name reference that leads to a Secret containing the TLS configuration.<br />The secret should contain "client.crt", "client.key" (used for mTLS) and optionally "ca.crt" (used for verifying the server's certificate) keys.</p>
</td>
</tr>

</tbody>
</table>
