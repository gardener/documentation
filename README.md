# 🌱 Gardener Documentation

## 🚀 Quick Start

Ready to jump in? Follow these steps to get the Gardener documentation running locally:

### Prerequisites

* [Docker](https://www.docker.com/) installed and running.
* A [GitHub](https://github.com/settings/personal-access-tokens) personal access token for API rate limits.
  * See the section [Getting the correct GitHub token](#getting-the-correct-github-token) below for details.
  * Alternatively, install the [gh CLI](https://cli.github.com/) and run `gh auth login --hostname github.com` once.

### Steps

1. Set the `GITHUB_OAUTH_TOKEN` environment variable (_optional with the `gh` CLI installed_):

```shell
export GITHUB_OAUTH_TOKEN=<token>
```

2. Build and run a Docker container:

```shell
make docker-preview
```

3. Visit [http://localhost:5173](http://localhost:5173) in your browser! 🎉

## 📚 Understanding the Documentation Structure

The Gardener documentation uses a **distributed documentation model** where content is gathered from multiple repositories and organized into a single website using docforge.

### Key Locations

- **Local content**: `website/` directory
  - `website/documentation/` - Core documentation files
  - `website/blog/` - Blog posts 
  - `website/community/` - Community-related content

- **Remote content**: 
  - Content from other repositories is pulled in during the build process
  - The structure is defined in `.docforge/*.yaml` manifest files

### Manifest Files Explained

The `.docforge/` folder contains YAML files that define the structure of the documentation site:

- **`website.yaml`**: The main entry point that defines the top-level structure
- **`documentation/documentation.yaml`**: Defines the structure of the docs section
- Other YAML files for specific sections (extensions, adopters, etc.)

Here's a simplified view of how it works:
```
.docforge/website.yaml            # Main structure
  ↳ .docforge/documentation/*.yaml # Various section structures
    ↳ Content from local files and remote repositories
```

## ✏️ Contributing

### Local Content

1. To modify local content, simply edit files in the `website/` directory
2. Content changes are reflected immediately when using `make docs-dev`

### Blog Posts

1. Create new blog posts in `website/blog/YEAR/MONTH/your-post.md`
2. Include front matter at the top of your file:
   ```yaml
   ---
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

- `make docs-dev` - Start the development server with live reloading (port 5173)

### Docforge (Content Gathering)

- `make docforge-download` - Get the docforge binary for your OS
- `make docforge` - Run docforge with default config
- `make docforge-run ARGS="..."` - Run docforge with custom parameters


## Getting the correct GitHub token

![gh-token-00](assets/gh-token-00.png)
![gh-token-01](assets/gh-token-01.png)
![gh-token-02](assets/gh-token-02.png)
![gh-token-03](assets/gh-token-03.png)
![gh-token-04](assets/gh-token-04.png)
