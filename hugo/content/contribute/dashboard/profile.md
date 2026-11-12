---
github_repo: 'https://github.com/gardener/dashboard'
github_subdir: docs/development
params:
  github_branch: master
path_base_for_github_subdir:
  from: content/contribute/dashboard/profile.md
  to: profile.md
persona: Developers
title: Profile
prev: false
next: false
---
<!-- BANNER:MANAGED -->
<!--
   █▀▀ ▀█▀ █▀█ █▀█
   ▀▀█  █  █ █ █▀▀
   ▀▀▀  ▀  ▀▀▀ ▀

   ┌────────────────────────────────────────────────┐
   │  MANAGED FILE — aggregated from upstream       │
   │                                                │
   │  Editing here is pointless: The nightly        │
   │  aggregation run overwrites this file.         │
   │                                                │
   │  Open a PR against the source instead: ─────┐  │
   │                          ┌──┐    ┌──────────┘  │
   │                          └──│────┘             │
   │           ┌─────────────────┘                  │
   └───────────│────────────────────────────────────┘
               ▼               
   https://github.com/gardener/dashboard/blob/master/docs/development/profile.md
-->


# Profiling the Backend

The backend provides a `serve:profile` script that starts the server with the
Node.js inspector enabled. This allows Chrome DevTools to attach to the running
backend for CPU and memory profiling.

## Prerequisites

Set up the local backend configuration and the Garden cluster kubeconfig as
described in [Setting Up a Local Development Environment](/contribute/dashboard/local-setup/).

## Start the backend with the inspector

From the `backend` directory, start the server using:

```sh
yarn serve:profile
```

The backend starts as usual on the configured HTTP port (by default
`http://localhost:3030`) and exposes the Node.js inspector on
`127.0.0.1:9229`.

## Connect Chrome DevTools

1. Open `chrome://inspect` in Chrome.
1. Under **Remote Target**, find the backend Node.js process and select
   **inspect**.
1. In the DevTools window that opens, use the **Performance** panel to record
   a CPU profile, or the **Memory** panel to take heap snapshots.

If the backend process is not listed, select **Configure...** on
`chrome://inspect` and ensure that `localhost:9229` is configured. Keep the
terminal running `yarn serve:profile` open while profiling.

Stop the backend with `Ctrl+C` when profiling is complete.
