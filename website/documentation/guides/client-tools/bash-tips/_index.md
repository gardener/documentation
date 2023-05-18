---
title: Fun with kubectl Aliases
description: "Some bash tips that save you some time"
level: beginner
index: 40
category: kubectl
scope: app-developer
publishdate: 2019-01-01
aliases: [ "/readmore/bash_tips" ]
---

## Speed up Your Terminal Workflow

Use the Kubernetes command-line tool, `kubectl`, to deploy and manage applications on Kubernetes. Using kubectl, you can inspect cluster resources, as well as create, delete, and update components.


![port-forward](teaser.svg)

You will probably run more than a hundred kubectl commands on some days and you should speed up your terminal workflow with with some shortcuts. Of course, there are good shortcuts and bad shortcuts (lazy coding, lack of security review, etc.), but let's stick with the positives and talk about a good shortcut:  **bash aliases** in your `.profile`.


What are those mysterious `.profile` and `.bash_profile` files you've heard about?

{{% alert color="info"  title="Note" %}}
The contents of a .profile file are executed on every log-in of the owner of the file
{{% /alert %}}


What's the `.bash_profile` then? It's exactly the same, but under a different name. The unix shell you are logging into, in this case OS X, looks for `etc/profile` and loads it if it exists. Then it looks for `~/.bash_profile`, `~/.bash_login` and finally `~/.profile`, and loads the first one of these it finds.


## Populating the `.profile` File

Here is the fantastic time saver that needs to be in your shell profile:


```sh
# time save number one. shortcut for kubectl
#
alias k="kubectl"

# Start a shell in a pod AND kill them after leaving
#
alias ksh="kubectl run busybox -i --tty --image=busybox --restart=Never --rm -- sh"

# opens a bash
#
alias kbash="kubectl run busybox -i --tty --image=busybox --restart=Never --rm -- ash"

# activate/exports the kuberconfig.yaml in the current working directory
#
alias kexport="export KUBECONFIG=`pwd`/kubeconfig.yaml"


# usage: kurl http://your-svc.namespace.cluster.local
#
# we need for this our very own image...never trust an unknown image..
alias kurl="docker run --rm byrnedo/alpine-curl"

```

All the `kubectl` [tab completions](https://kubernetes.io/docs/tasks/tools/install-kubectl/#enabling-shell-autocompletion) still work fine with these aliases, so you’re not losing that speed.

{{% alert color="info"  title="Note" %}}
If the approach above does not work for you add the following lines in your ~/.bashrc instead:
```bash
# time save number one. shortcut for kubectl
#
alias k="kubectl"

# Enable kubectl completion
source <(k completion bash | sed s/kubectl/k/g)
```
{{% /alert %}}