# Gardener Documentation
[![REUSE status](https://api.reuse.software/badge/github.com/gardener/documentation)](https://api.reuse.software/info/github.com/gardener/documentation)

## Structure

### Manifest files

The manifest files can be found in the [.docforge](https://github.com/gardener/documentation/tree/master/.docforge) folder and they describe how the documentation will be mapped in the [https://gardener.cloud/](https://gardener.cloud/) website. The main manifest file, which is the entry point of the website build, is [website.yaml](https://github.com/gardener/documentation/blob/master/.docforge/website.yaml). It links content and other manifest files in this repository.
At the last level of linking, it can be seen that the manifests point to manifests from other repositories in the gardener organization. An example of such a manifest is [documentation.yaml](https://github.com/gardener/documentation/blob/master/.docforge/documentation/documentation.yaml).

### Content
This repository holds cross-component documents which are linked by the manifest files and displayed in the website. These documents can be found in the [website](https://github.com/gardener/documentation/tree/master/website) directory.

All documents that are related to a specific component can be found in the documentation of its repository. Such documents are aggregated on the website by using manifest files.


*More about how this documentation is used and displayed on the website can be found in [gardener/website-generator](https://github.com/gardener/website-generator)*

# Hugo website dev and maintenance

## Defining Hugo's directory structure

[Hugo's directory structure](https://gohugo.io/getting-started/directory-structure/) is defined via the docforge manifest ([example](https://github.com/gardener/documentation/blob/master/.docforge/hugo.yaml)).

## Defining docforge configuration

The image builds the website bundle with the help of a docforge config file. It needs to be mounted to the container and it's path provided via `DOCFORGE_CONFIG` environment variable. It contains information like the docforge manifest URL, github auth tokens, content file formats and any docforge customisations.

## Building the image locally

Initially build a local image `docker build -t testing-website-image .` or `docker build --build-arg ARCH=_linux-arm64 -t testing-website-image .` for arm.

### Run using a local docforge build

- Run `make build` in docforge repo
- Copy `bin/rel/docforge-linux-arm64` from docforge to this repo root directiry
- Change `Dockerfile` to have this line instead `COPY docforge-linux-arm64 /usr/local/bin/docforge`
- Build `testing-website-image`

## Create `compose.yaml` from `compose.yaml.tpl`

Add all of the env var names holding repository host tokens in the `compose.yaml` file using `compose.yaml.tpl` as a template

## Ability to run multiple websites locally

Multiple docforge configurations can be placed in this directory with a `.yaml` extension. To run a specific website just place it's content to `docforge_config.yaml` and run `docker compose up`. Before switching to a new website configuration run `docker compose down`.

### Local dev using `docker compose up`

If you want to run the web server reflecting local changes done to some cloned repositories you need to go trough the following steps:

1. Adapt `compose.yaml` by adding a volume mount entry for each repository
   ```yaml
    volumes:
    - <path_to_cloned_repo_1>:/resourceMappings/<repo_1>
    - <path_to_cloned_repo_2>:/resourceMappings/<repo_2>
    - ...
   ```
2. Adapt `docforge_config.yaml`
   ```yaml
   resourceMappings:
     <repo_1_url>: /resourceMappings/<repo_1>
     <repo_2_url>: /resourceMappings/<repo_2>
     ...
   ```

## Dependency updates

Change `europe-docker.pkg.dev/gardener-project/releases/docforge:<DOCFORGE_VERSION>`, `HUGO_VERSION` and `DOCSY_VERSION` to the desired version and rebuild the image.
