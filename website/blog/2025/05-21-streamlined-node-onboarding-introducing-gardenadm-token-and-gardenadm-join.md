---
title: "Streamlined Node Onboarding: Introducing `gardenadm token` and `gardenadm join`"
linkTitle: "Streamlined Node Onboarding: Introducing `gardenadm token` and `gardenadm join`"
newsSubtitle: May 21, 2025
publishdate: 2025-05-21
authors:
- avatar: https://avatars.githubusercontent.com/rfranzke
  email: rafael.franzke@sap.com
  login: rfranzke
  name: Rafael Franzke
aliases: ["/blog/2025/05/21/streamlined-node-onboarding-introducing-gardenadm-token-and-gardenadm-join"]
---

Gardener continues to enhance its `gardenadm` tool, simplifying the management of autonomous Shoot clusters. Recently, new functionalities have been introduced to streamline the process of adding worker nodes to these clusters: the `gardenadm token` command suite and the corresponding `gardenadm join` command. These additions offer a more convenient and Kubernetes-native experience for cluster expansion.

### Managing Bootstrap Tokens with `gardenadm token`

A key aspect of securely joining nodes to a Kubernetes cluster is the use of bootstrap tokens. The new `gardenadm token` command provides a set of subcommands to manage these tokens effectively within your autonomous Shoot cluster's control plane node. This functionality is analogous to the familiar `kubeadm token` commands.

The available subcommands include:

*   **`gardenadm token list`**: Displays all current bootstrap tokens. You can also use the `--with-token-secrets` flag to include the token secrets in the output for easier inspection.
*   **`gardenadm token generate`**: Generates a cryptographically random bootstrap token. This command only prints the token; it does not create it on the server.
*   **`gardenadm token create [token]`**: Creates a new bootstrap token on the server. If you provide a token (in the format `[a-z0-9]{6}.[a-z0-9]{16}`), it will be used. If no token is supplied, `gardenadm` will automatically generate a random one and create it.
    *   A particularly helpful option for this command is `--print-join-command`. When used, instead of just outputting the token, it prints the complete `gardenadm join` command, ready to be copied and executed on the worker node you intend to join. You can also specify flags like `--description`, `--validity`, and `--worker-pool-name` to customize the token and the generated join command.
*   **`gardenadm token delete <token-value...>`**: Deletes one or more bootstrap tokens from the server. You can specify tokens by their ID, the full token string, or the name of the Kubernetes Secret storing the token (e.g., `bootstrap-token-<id>`).

These commands provide comprehensive control over the lifecycle of bootstrap tokens, enhancing security and operational ease.

### Joining Worker Nodes with `gardenadm join`

Once a bootstrap token is created (ideally using `gardenadm token create --print-join-command` on a control plane node), the new `gardenadm join` command facilitates the process of adding a new worker node to the autonomous Shoot cluster.

The command is executed on the prospective worker machine and typically looks like this:

```bash
gardenadm join --bootstrap-token <token_id.token_secret> --ca-certificate <base64_encoded_ca_bundle> --gardener-node-agent-secret-name <os_config_secret_name> <control_plane_api_server_address>
```

Key parameters include:

*   `--bootstrap-token`: The token obtained from the `gardenadm token create` command.
*   `--ca-certificate`: The base64-encoded CA certificate bundle of the cluster's API server.
*   `--gardener-node-agent-secret-name`: The name of the Secret in the `kube-system` namespace of the control plane that contains the OperatingSystemConfig (OSC) for the `gardener-node-agent`. This OSC dictates how the node should be configured.
*   `<control_plane_api_server_address>`: The address of the Kubernetes API server of the autonomous cluster.

Upon execution, `gardenadm join` performs several actions:
1.  It discovers the Kubernetes version of the control plane using the provided bootstrap token and CA certificate.
2.  It checks if the `gardener-node-agent` has already been initialized on the machine.
3.  If not already joined, it prepares the `gardener-node-init` configuration. This involves setting up a systemd service (`gardener-node-init.service`) which, in turn, downloads and runs the `gardener-node-agent`.
4.  The `gardener-node-agent` then uses the bootstrap token to securely download its specific OperatingSystemConfig from the control plane.
5.  Finally, it applies this configuration, setting up the kubelet and other necessary components, thereby officially joining the node to the cluster.

After the node has successfully joined, the bootstrap token used for the process will be automatically deleted by the `kube-controller-manager` once it expires. However, it can also be manually deleted immediately using `gardenadm token delete` on the control plane node for enhanced security.

These new `gardenadm` commands significantly simplify the expansion of autonomous Shoot clusters, providing a robust and user-friendly mechanism for managing bootstrap tokens and joining worker nodes.

### Further Information

*   **`gardenadm token` Pull Request:** [GEP-28] `gardenadm token` commands (#11934)
*   **`gardenadm join` Pull Request:** [GEP-28] `gardenadm join`: Support joining worker nodes (#11942)
*   **Recording of the demo:** Watch the demo starting at [12m48s](https://youtu.be/ssvXpPliOY0?t=768)