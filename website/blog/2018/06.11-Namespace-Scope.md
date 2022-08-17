---
title: Namespace Scope
authors: 
- name: Andreas Herz
  email: andreas.herz@sap.com
  avatar: https://avatars1.githubusercontent.com/u/1155039?v=4
publishdate: 2018-06-11
archivedate: 2018-07-11
---
**Should I use:**
<ul style="list-style:none">
    <li>❌ one namespace per user/developer?</li>
    <li>❌ one namespace per team?</li>
    <li>❌ one per service type?</li>
    <li>❌ one namespace per application type?</li>
    <li>😄 <b>one namespace per running instance of your application?</b></li>
</ul>

**Apply the [Principle of Least Privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege)**
 
All user accounts should run at all times **as few privileges as possible**, and also 
launch applications with as few privileges as possible. If you share a cluster for 
different user separated by a `namespace`, **all user has access to all `namespaces`** and 
services per default. It can happen that a user **accidentally uses and destroys** the 
`namespace` of a productive application or the `namespace` of another developer.

**Keep in mind: By default namespaces don't provide:**
 - Network isolation
 - Access Control
 - Audit Logging on user level
