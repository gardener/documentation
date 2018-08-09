---
title: Shared storage with S3 backend
type: Blog
---

The storage is definitely the most complex and important part of an application setup, once this part is completed, 80% 
of the tasks are completed.

Mounting an S3 bucket into a pod using FUSE allows you to access the data as if it were on the local disk. The mount 
is a pointer to an S3 location, so the data is never synced locally. Once mounted, any pod can read or even write 
from that directory without the need for explicit keys.


{{% blog_img "logo" "blog-s3-shared-storage.png" %}}


However, it can be used to import and parse large amounts of data into a database.

..read on [Shared S3 Storage]({{ site.baseurl }}/doc/2017/01/16/app-s3.html) how to configure it.