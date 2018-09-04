---
title: Shared storage with S3 backend
type: Blog
---

The storage is definitely the most complex and important part of an application setup, once this part is completed, 
one of the most problematic parts could be solved.

Mounting a S3 bucket into a pod using [FUSE](https://github.com/libfuse/libfuse) allows to access data stored in S3 via 
the filesystem. The mount is a pointer to an S3 location, so the data is never synced locally. Once mounted, any pod 
can read or even write from that directory without the need for explicit keys.


{{% blog_img "logo" "blog-s3-shared-storage.png" %}}


However, it can be used to import and parse large amounts of data into a database.

..read on [Shared S3 Storage](/app/s3) how to configure it.