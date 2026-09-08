# 🌱 Gardener Documentation

This repository builds the Gardener documentation site with [VitePress](https://vitepress.dev/).
Most content is **not authored here**: it is aggregated from many upstream repositories
into `hugo/content/` and committed to `master`. For the full picture of how that works and
why, see [CONTENT_AGGREGATION.md](CONTENT_AGGREGATION.md). This README covers what you need
to run the site and make a change.

## 🚀 Quick Start

### Prerequisites

**For the Docker-based preview (recommended):**

* [Docker](https://www.docker.com/) installed and running.

**For local development (`make dev`, `make local-preview`):**

* [Node.js](https://nodejs.org/) v24 (matches the version used in CI and the Docker image).
* [pnpm](https://pnpm.io/) — enable it via Corepack (bundled with Node):

  ```shell
  corepack enable
  ```

  Corepack picks up the pinned pnpm version from `package.json` automatically.

### Run it

```shell
make docker-preview
```

Then visit [http://localhost:5173](http://localhost:5173). 🎉

For a native run without Docker use `make dev` (dev server with hot reload) or
`make local-preview` (production build, then preview).

## 📂 Content in a nutshell

All docs live in `hugo/content/`. Three kinds of file share that tree, told apart by a
banner comment that post-processing injects at the top of each file:

| Banner | Meaning | Edit here? |
|---|---|---|
| `LOCAL` | maintained in this repo (blog, about, community, landing page) | **Yes.** Edit directly. |
| `MANAGED` | aggregated from an upstream repo (has `github_repo` frontmatter) | **No.** Open a PR at the upstream source; the banner prints its URL. CI blocks edits here. |
| `GENERATED` | navigation stub created by post-processing | **No.** Recreated on every run. |

The distinction is by banner, not by folder. See
[CONTENT_AGGREGATION.md](CONTENT_AGGREGATION.md) for the model, the pipeline, and the
reasoning behind it.

## ✏️ Making a change

Route your change by **what** you are editing:

| I want to change… | Where | Command | Made visible by |
|---|---|---|---|
| **Code / theme** (`.vitepress/**`, components, styles) | this repo | `make dev` | hot reload |
| **Local content** (`LOCAL` file) | the file under `hugo/content/` | `make dev` | hot reload |
| **Managed content** (`MANAGED` file) | the upstream repo it points to | open a PR **there** | the nightly aggregation run |
| **Content structure** (add/remove/move a source) | `.docforge/*.yaml` | `make hugo-refresh` to preview locally | the aggregation run once the manifest change is merged |

You may edit a `MANAGED` file locally to test a change, but the fix only counts once it is
merged upstream — the nightly run overwrites any local edit, and CI blocks PRs that touch
`MANAGED` files here.

### Creating a new local content file

Any markdown file you add under `hugo/content/` **without** a `github_repo` frontmatter
field is automatically `LOCAL`. There is nothing to register; placement in the tree
determines the URL. Minimum frontmatter:

```yaml
---
title: Your Page Title
---
```

`title` is the only strictly required field. Optional layout fields: `description`,
`editLink: false`, `prev: false` / `next: false`, `aside: false`, `sidebar: false`. Do
**not** add `github_repo` or `auto_generated` — those flip the file to `MANAGED` or
`GENERATED`.

### Adding a blog post

Create `hugo/content/blog/YEAR/MONTH/your-post.md`:

```yaml
---
title: Your Awesome Blog Post
description: "A brief description of your post"
publishdate: '2025-06-24'
authors:
  - name: Your Name
    login: your-github-handle
    avatar: https://avatars.githubusercontent.com/u/<id>?v=4
tags:
  - community-event
---
```

## 🔧 Command reference

| Command | Purpose |
|---|---|
| `make dev` | Dev server with hot reload (code + local content) |
| `make docker-preview` | Build and run the preview in Docker |
| `make local-preview` | Production build, then local preview |
| `make build` | Build the site into `dist/` |
| `make post-process` | Run the full post-processing pipeline |
| `make hugo-refresh` | **Manifest testing only:** delete managed banners, re-aggregate, post-process, stage |
| `make vale` | Lint changed content markdown with Vale |
| `make diff-structure-master` | Compare sitemap structure of working tree vs `origin/master` |

## 🤝 Contributing

- For **local content**, edit the `LOCAL` files directly and open a PR here.
- For **managed content**, open a PR in the upstream repository the file is aggregated
  from (`gardener/gardener`, `gardener/dashboard`, `gardener/gardenctl-v2`, and others).
- For **site/theme code**, open a PR here against `master`.
