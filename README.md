# Dummy PRs
# Gardener Documentation

## Structure

### Manifest files

The manifest files can be found in the [.docforge](https://github.com/gardener/documentation/tree/master/.docforge) folder and they describe how the documentation will be mapped in the [https://gardener.cloud/](https://gardener.cloud/) website. The main manifest file, which is the entry point of the website build, is [website.yaml](https://github.com/gardener/documentation/blob/master/.docforge/website.yaml). It links content and other manifest files in this repository.
At the last level of linking, it can be seen that the manifests point to manifests from other repositories in the gardener organization. An example of such a manifest is [documentation.yaml](https://github.com/gardener/documentation/blob/master/.docforge/documentation/documentation.yaml).

### Content
This repository holds cross-component documents which are linked by the manifest files and displayed in the website. These documents can be found in the [website](https://github.com/gardener/documentation/tree/master/website) directory.

All documents that are related to a specific component can be found in the documentation of its repository. Such documents are aggregated on the website by using manifest files.


*More about how this documentation is used and displayed on the website can be found in [gardener/website-generator](https://github.com/gardener/website-generator)*
