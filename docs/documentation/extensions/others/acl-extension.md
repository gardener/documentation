---
title: Access Control List Extension
description: Overview of the Gardener Access Control List (ACL) extension for controlling access to shoot clusters using allow-list mechanisms
tags: [extensions, acl, access-control, security, networking, istio, stackit]
page_synonyms: [acl extension, access control extension, allow-list extension, network access control]
categories: [extensions, security, networking]
---

# Gardener Access Control List Extension

An Access Control List (ACL) is a list of permissions attached to an object, specifying which users or system processes are granted or denied access to that object.

Gardener utilizes the ACL extension to control access to shoot clusters using an allow-list mechanism, allowing you to specify which IP addresses or CIDR blocks are allowed to access the Kubernetes API and other services in the shoot cluster.

This extension supports multiple ingress namespaces, enhancing its flexibility for various deployment scenarios. The extension leverages Istio's envoy proxy to insert additional configuration that limits access to specific clusters, impacting different external traffic flows such as Kubernetes API listeners, service listeners, and VPN listeners.

The extension's functionality and limitations are intricately managed to handle different access types effectively, ensuring robust security for Kubernetes API servers.

> [!NOTE]
> The ACL extension is not part of Gardener and is maintained by STACKIT in their own GitHub organization.

You can find more information in the [Gardener ACL Extension](https://github.com/stackitcloud/gardener-extension-acl) repository.
