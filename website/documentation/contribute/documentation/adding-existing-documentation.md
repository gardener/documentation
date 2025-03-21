---
title: Adding Already Existing Documentation
---

## Overview

In order to add GitHub documentation to the website that is hosted outside of the main repository, you need to make changes to the central manifest. You can usually find it in the `<organization-name>/<repo-name>/.docforge/` folder, for example [`gardener/documentation/.docforge`](https://github.com/gardener/documentation/tree/master/.docforge).

Sample codeblock:
```yaml
- dir: machine-controller-manager
  structure:
  - file: _index.md
    frontmatter:
      title: Machine Controller Manager
      weight: 1
      description: Declarative way of managing machines for Kubernetes cluster
    source: https://github.com/gardener/machine-controller-manager/blob/master/README.md
  - fileTree: https://github.com/gardener/machine-controller-manager/tree/master/docs
```

This short code snippet adds a whole repository worth of content and contains examples of some of the most important elements:
- `- dir: <dir-name>` - the name of the directory in the navigation path
- `structure:` - required after using `dir`; shows that the following lines contain a file structure
- `- file: _index.md` - the content will be a single file; also creates an index file
- `frontmatter:` - allows for manual setting/overwriting of the various properties a file can have
- `source: <link>` - where the content for the `file` element is located
- `- fileTree: <link>` - the content will be a whole folder; also gives the location of the content

Check the [Notes and Tips](#notes-and-tips) section for useful advice when making changes to the manifest files.

## Adding Existing Documentation

You can use the following templates in order to add documentation to the website that exists in other GitHub repositories.

> [!NOTE]
> Proper indentation is incredibly important, as yaml relies on it for nesting!

### Adding a Single File

You can add a single topic to the website by providing a link to it in the manifest.

```yaml
- dir: <dir-name>
  structure:
  - file: <file-name>
    frontmatter:
      title: <topic-name>
      description: <topic-description>
      weight: <weight>
    source: https://github.com/<path>/<file>
```

<details>
<summary>Example</summary>

```yaml
- dir: dashboard
  structure:
  - file: _index.md
    frontmatter:
      title: Dashboard
      description: The web UI for managing your projects and clusters
      weight: 3
    source: https://github.com/gardener/dashboard/blob/master/README.md
```
</details>

### Adding Multiple Files

You can also add multiple topics to the website at once, either through linking a whole folder or a manifest than contains the documentation structure.

> [!NOTE]
> If the content you want to add does not have an `_index.md` file in it, it won't show up as a single section on the website. You can fix this by adding the following after the `structure:` element:

```yaml
- file: _index.md
  frontmatter:
    title: <topic-name>
    description: <topic-description>
    weight: <weight>
```

#### Linking a Folder

```yaml
  - dir: <dir-name>
    structure:
    - fileTree: https://github.com/<path>/<folder>
```

<details>
<summary>Example</summary>

```yaml
  - dir: development
    structure:
    - fileTree: https://github.com/gardener/gardener/tree/master/docs/development
```
</details>

#### Linking a Manifest File

```yaml
- dir: <dir-name>
  structure:
  - manifest: https://github.com/<path>/manifest.yaml
```

<details>
<summary>Example</summary>

```yaml
- dir: extensions
  structure:
  - manifest: https://github.com/gardener/documentation/blob/master/.docforge/documentation/gardener-extensions/gardener-extensions.yaml
```
</details>

### Notes and Tips

- If you want to place a file inside of an already existing directory in the main repo, you need to create a `dir` element that matches its name. If one already exists, simply add your link to its `structure` element.
- You can chain multiple files, folders, and manifests inside of a single `structure` element.
- For examples of `frontmatter` elements, see the [Style Guide](./style-guide/_index.md#front-matter).
