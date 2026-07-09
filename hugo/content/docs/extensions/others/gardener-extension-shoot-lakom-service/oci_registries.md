---
github_repo: 'https://github.com/gardener/gardener-extension-shoot-lakom-service'
github_subdir: docs
params:
  github_branch: main
path_base_for_github_subdir:
  from: >-
    content/docs/extensions/others/gardener-extension-shoot-lakom-service/oci_registries.md
  to: oci_registries.md
title: Oci Registries
prev: false
next: false
managed: true
---

# OCI Registries

This document aims to introduce the reader to the general architecture of OCI
Registries, their history and jargon that might be encountered.

## History of Container Registries

Most readers might be familiar with the container registry that was introduced
by Docker. It aims to provide a way for developers to store and distribute
container images that can be used for running applications in containers.

In the beginning, the registry was meant to only host images in a way that the
different layers of the image could be downloaded in parallel, while being
assembled on the client side.

In June 2015, multiple companies agreed to standardize the container image format,
including its distribution and runtime. This was the birth of the Open Container
Initiative (OCI).

## Understanding OCI Registries

The most important document that pertains to OCI Registries in the case of Lakom is the [OCI
distribution spec](https://github.com/opencontainers/distribution-spec/blob/main/spec.md).
It outlines the way that artifacts shall be stored and fetched from a registry
that adheres to the OCI standard.

OCI Registries are meant to store *content*. While in the beginning the main
problem that they were trying to solve was image storage, during the evolution
of the image registry concept, a decision was made to make it more general
for storage of any form of objects, sometimes called *artifacts*.

An artifact is an abstract idea of multiple components that together describe
how an object is built along with storing metadata about the object.

To implement this, every OCI registry has to expose an API for creating
3 types of objects:
- Blobs
- Manifests
- Tags

### Blobs

A blob is just a set of bytes. Nothing more. The important part about blobs
is that they are *content addressable*. [Content Addressable Storage (CAS)](https://en.wikipedia.org/wiki/Content-addressable_storage)
is a method of storing data in such a way that the address of the data is derived
from the data itself. This means that if you store the same blob twice, it will
be stored only once, and the address of the blob will be the same. This is achieved
by using the [digest](https://en.wikipedia.org/wiki/Cryptographic_hash_function) of the blob as the address.

This is the actual mechanism for allowing images to be optimal in terms of storage.
Since most images begin by depending on the same base image, this means that
it can be stored only once and referenced by multiple images.

### Manifests

A manifest is just a JSON document. It is stored separately from the blobs.
But similarly to the blobs, it is also content addressable. The manifest gets
formatted to a canonical form and then hashed. The hash becomes the address of
the manifest.

Where manifests become powerful is when they are used to reference to other
manifests or blobs. These references are called [OCI Content Descriptors](https://github.com/opencontainers/image-spec/blob/v1.0.1/descriptor.md).
For example, the Image Manifest that most readers would be familiar with contains
a list of layers that are used to build the image. Each layer is a reference to
a blob.

An additional reference outside the layer references is used for storing
additional configuration. More info can be found in the official [OCI Image Manifest spec](https://github.com/opencontainers/image-spec/blob/v1.0.1/manifest.md).

The term *artifact* is just a generalization over the Image Manifest idea.
The Image Manifest has a specific format that can be found in the aforementioned [OCI Image Manifest spec](https://github.com/opencontainers/image-spec/blob/v1.0.1/manifest.md).
The important field is the `.config.mediaType` field. Based on the official guidelines,
it can be used for defining types other than an image. More info can be found [here](https://github.com/opencontainers/image-spec/blob/main/manifest.md#guidelines-for-artifact-usage).

Combining all of these ideas, we can see that artifacts can be represented by 1
specific object - a manifest. That manifest, based on the media type in the config, can be
interpreted by different programs for their specific use case. Eg. a Helm chart.
Helm charts specifically have a mediaType of `application/vnd.cncf.helm.config.v1+json`.
Layers, too, have a media type. The media type of a layer when the artifact
is a helm chart is one of:
- application/vnd.cncf.helm.config.v1+json
- application/vnd.cncf.helm.chart.content.v1.tar+gzip
- application/vnd.cncf.helm.chart.provenance.v1.prov

More info specifically on Helm charts as OCI Artifacts can be found here: [Helm OCI MediaTypes](https://helm.sh/blog/helm-oci-mediatypes/).

### Tags

While manifests and blobs being content addressable is nice, it becomes hard
to address them in a human-readable format. Tags allow us to add a reference
to a given manifest that differs from the digest of the object.

Normally, whenever we push an image to a registry, if we don't give it an
explicit tag, the registry would most likely give it the tag `latest`. This,
actually is not mandatory based on the distribution spec. Manifests don't
require that they have a tag.

Multiple tags can point to the same manifest.

### Cosign

Cosign is generally a part of the bigger project called [sigstore](https://sigstore.dev/).
Sigstore is an "open-source project for improving software supply chain security".
It aims for developers to have a hassle-free way to sign their artifacts while
leveraging other components that add additional layers of security to the
signature process. Eg. Rekor and Fulcio.

Cosign is a CLI tool aiming to tie all the components of sigstore together.
In our specific case, we use it only as a format for creating signatures and
then verifying them. In theory, we wouldn't need to use Cosign for this, but
it uses a popular format for the signatures and the libraries help us
save work.

In the context of Lakom, what interests us is how Cosign signs OCI artifacts
and how it stores them.
The signing process in a nutshell is the following -- `Sign(sha256(SimpleSigningPayload(sha256(Image Manifest))))`, where:
- Image Manifest is what it says. Just the manifest of the image (artifact).
- sha256 is the hashing algorithm used.
- SimpleSigningPayload is the interesting part here. Instead of just signing the
  hash of the manifest itself, the hash itself is packed into a JSON doc that
  is called the `SimpleSigningPayload`. Example payload:
```json
{
    "critical": {
           "identity": {
               "docker-reference": "testing/manifest"
           },
           "image": {
               "Docker-manifest-digest": "sha256:20be...fe55"
           },
           "type": "cosign container image signature"
    },
    "optional": {
           "creator": "atomic",
           "timestamp": 1458239713
    }
}
```

We can see that the hash of the manifest is stored in the `Docker-manifest-digest`.
Now this object is the one that gets signed using our private key. The signed
version of this objest is the one that gets stored and gets used for
verification.

Storage of the signature is done via an image manifest that gets uploaded
in the same repo as the image, but tagged with `sha256-<container-image-digest>.sig`.
Thus, the signature discovery mechanism is to just fetch the image digest
that is tagged with the aforementioned tag.

More info on this whole process can be found [here](https://github.com/sigstore/cosign/blob/main/specs/SIGNATURE_SPEC.md).

Lakom relies on the cosign libraries to automate this whole process. When
validating an artifact, if we know its digest, we can fetch the signature and
verify it. If the signature is valid, we can be sure that the artifact has not
been tampered with.
