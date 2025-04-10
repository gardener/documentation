---
title: Access Control List Extension
---

# Gardener Access Control List Extension

An Access Control List (ACL) is a list of permissions attached to an object, specifying which users or system processes are granted or denied access to that object.

Gardener utilizes the ACL extension to control access to shoot clusters using an allow-list mechanism, allowing you to specify which IP addresses or CIDR blocks are allowed to access the Kubernetes API and other services in the shoot cluster.

This extension supports multiple ingress namespaces, enhancing its flexibility for various deployment scenarios. The extension leverages Istio's envoy proxy to insert additional configuration that limits access to specific clusters, impacting different external traffic flows such as Kubernetes API listeners, service listeners, and VPN listeners.

The extension's functionality and limitations are intricately managed to handle different access types effectively, ensuring robust security for Kubernetes API servers.

> [!NOTE]
> The ACL extension is not part of Gardener and is maintained by a different company.

You can find more information in the [Gardener ACL Extension](https://github.com/stackitcloud/gardener-extension-acl) repository.
