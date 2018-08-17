---
title: Watching logs of several pods
type: Blog
---

One thing that always bothered me was that I couldn't get logs of several pods at once with `kubectl`. A simple 
`tail -f <path-to-logfile>` isn't possible. Certainly you can use `kubectl logs -f <pod-id>`, but it doesn't 
help if you want to monitor more than one pod at a time.

This is something you really need a lot, at least if you run several instances of a pod behind a `deployment`
and you don't have setup a log viewer service like Kibana.

{{% blog_img "logo" "blog-kubetail.png" %}}


kubetail comes to the rescue, it is a small bash script that allows you to aggregate log files of several pods at 
the same time in a simple way. The script is called `kubetail` and is available at 
[https://github.com/johanhaleby/kubetail](https://github.com/johanhaleby/kubetail).

