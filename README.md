# 🌱 Gardener Documentation

## 🚀 Quick Start

Ready to jump in? Follow these steps to get the Gardener documentation running locally:

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

### Steps

1. Build and run a Docker container:

```shell
make docker-preview
```

2. Visit [http://localhost:5173](http://localhost:5173) in your browser! 🎉

## 📚 Understanding the Documentation Structure

The Gardener documentation uses a **distributed documentation model** where content is gathered from multiple repositories into `hugo/content/` by a scheduled CI job (docforge). The aggregated tree is committed to `master`, so local builds and PRs work against `hugo/content/` directly without running docforge.

### Key Locations

All content lives in the committed `hugo/content/` tree. Every markdown file carries exactly one frontmatter marker that tells you who owns it:

- **`local: true`** — locally maintained. Edit these files directly here in `gardener/documentation`.
  - `hugo/content/blog/` - Blog posts
  - `hugo/content/community/` - Community-related content
  - `hugo/content/about/` - About pages
  - `hugo/content/index.md` - Landing page
  - `hugo/content/public/` - Static assets (favicon, logos, og-image); not markdown, so no marker

- **`managed: true`** — aggregated from an upstream repository. **Do not edit here.** The nightly aggregation run overwrites these files, so any local change is silently lost. The `github_repo` / `github_subdir` frontmatter fields point at the upstream source; open your PR there instead. A CI check (`enforce-managed-files`) blocks PRs that touch `managed: true` files.

### How Content Gets Aggregated

Managed content is pulled from upstream repositories into `hugo/content/` by a
scheduled CI job and committed to `master`. The structure of what gets
aggregated is defined in the `.docforge/*.yaml` manifest files. Contributors do
not run this aggregation locally; it happens in CI.

## ✏️ Contributing

### Local Content

1. To modify local content, edit the `local: true` files directly in `hugo/content/`
2. Content changes are reflected immediately when using `make dev`

### Blog Posts

1. Create new blog posts in `hugo/content/blog/YEAR/MONTH/your-post.md`
2. Include front matter at the top of your file:
   ```yaml
   ---
   local: true
   title: Your Awesome Blog Post
   description: "A brief description of your post"
   date: 2025-06-24
   authors:
   - name: Your Name
     email: your.email@example.com
   ---
   ```

### Remote Content 

Gardener documentation pulls content from multiple repositories. Key remote sources include:

- `gardener/gardener`: Core Gardener documentation
- `gardener/dashboard`: Dashboard documentation
- `gardener/gardenctl-v2`: CLI documentation

To modify these, submit changes to their respective repositories.

## 🔧 Available Commands

### Documentation Development

- `make dev` - Start the development server with live reloading
- `make docker-preview` - Build and run the preview in a Docker container
- `make local-preview` - Build and run the preview locally

