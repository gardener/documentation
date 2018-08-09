---
title: ReadWriteMany - Dynamically Provisioned PV’s Using Amazon EFS
type: Blog
---


The efs-provisioner allows you to mount EFS storage as PersistentVolumes in kubernetes. It consists of a container
that has access to an AWS EFS resource. The container reads a configmap which contains the EFS filesystem ID, the 
AWS region and the name you want to use for your efs-provisioner. This name will be used later when you create a 
storage class.


{{% blog_img "overview" "blog-aws-efs.png" %}}


## Why EFS
1. One app, multiple nodes, same file(s)
1. When you have an application that requires multiple virtual machines to access the same file system at the same time, 
   AWS EFS is a tool that you can use.
1. EFS support encryption.
1. EFS is SSD based storage and its storage capacity and pricing will scale in or out as needed, so there is no need 
   for the system administrator to do additional operations. It can grow to a petabyte scale.
1. EFS now supports NFSv4 lock upgrading and downgrading, so yes, you can use sqlite with EFS… even if it was possible 
   to do it before.
1. Easy to setup


## Why Not EFS
1. Sometimes when you think about using a service like EFS, you may also think about **Cloud Lock** and its negative sides 
1. Making an EFS backup may decrease your production FS performance; the throughput used by backup counts towards 
   your total file system throughput.
1. EFS is expensive compared to EBS (probably 2x more EBS pricing)
1. EFS is not the magical solution for all your distributed FS problems, it can be slow in many cases. Test, benchmark 
   and measure to ensure your if EFS is a good solution for your use case.
1. EFS distributed architecture results in a latency overhead for each file read/write operation.
1. If you have the possibility to use a CDN, don’t use EFS, keep just files that can not be stored in a CDN.
1. It is evident to say, but don’t use EFS as a caching system, sometimes you could be doing this unintentionally.
1. Last but not least, even if EFS is a fully managed NFS, you will face performance problems in many cases, resolving 
   this could take some time and needs some efforts, so brace yourself. 
   

..read some more on [ReadWriteMany](../readmore/readwritemany).
