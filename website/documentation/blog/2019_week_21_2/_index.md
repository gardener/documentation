---
title: Feature Flags in Kubernetes Applications
type: Blog
---

Feature flags are used to change the behavior of a program at runtime without forcing a restart.

Although they are essential in a native cloud environment, they cannot be implemented without significant 
effort on some platforms. Kubernetes has made this trivial. Here we will implement them through labels and 
annotations, but you can also implement them by connecting directly to the Kubernetes API Server.

{{< blog_img "overview" "teaser.gif"  "no-shadow" >}}


Possible Use Cases
 - turn on/off a specific instance
 - turn on/off profiling of a specific instance
 - change the logging level, to capture detailed logs during a specific event
 - change caching strategy at runtime
 - change timeouts in production
 - toggle on/off some special verification

..read some more on [Feature Flags for App](../readmore/featureflag).


