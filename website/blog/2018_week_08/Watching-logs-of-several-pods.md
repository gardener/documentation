---
title: Watching logs of several pods
authors: 
- name: Andreas Herz
  email: andreas.herz@sap.com
  avatar: https://avatars1.githubusercontent.com/u/1155039?v=4
publishdate: 2018-06-11
archivedate: 2018-07-11
---

One thing that always bothered me was that I couldn't get logs of several pods at once with `kubectl`. A simple 
`tail -f <path-to-logfile>` isn't possible. Certainly you can use `kubectl logs -f <pod-id>`, but it doesn't 
help if you want to monitor more than one pod at a time.

This is something you really need a lot, at least if you run several instances of a pod behind a `deployment`
and you don't have setup a log viewer service like Kibana.

![](blog-kubetail.png)


kubetail comes to the rescue, it is a small bash script that allows you to aggregate log files of several pods at 
the same time in a simple way. The script is called `kubetail` and is available at 
[GitHub](https://github.com/johanhaleby/kubetail).

