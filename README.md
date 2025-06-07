# Gardener Documentation (VitePress)

Welcome to the Gardener documentation project! This repository contains the source and build setup for the Gardener docs site as a **POC** (Proof of Concept), powered by [VitePress](https://vitepress.dev/).

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js** v22 or higher
- **npm** (comes with Node.js)
- **Docker** (optional, for containerized builds)

### 2. Install Dependencies
```sh
npm install
```

### 3. Run the Docs Locally
```sh
npm run docs:dev
```
Visit [http://localhost:5173](http://localhost:5173) in your browser.

Thats it 🚀

Happy Documenting 🌱

### Build & Run with Docker
```sh
docker build -t gardener-docs .
docker run --rm -p 8080:80 gardener-docs
```
Visit [http://localhost:8080](http://localhost:8080).

---

## 📁 Project Structure

```
├── Dockerfile                # Docker build instructions
├── nginx.conf                # Nginx config for static site serving
├── package.json              # Project metadata and scripts
├── .gitignore                # Files and folders to ignore in git
├── README.md                 # This file
├── docs/                     # All documentation content
│   ├── index.md              # Main landing page
│   ├── documentation/        # Main docs sections
│   ├── getting-started/      # Getting started guides
│   ├── guides/               # How-tos and advanced guides
│   ├── ...                   # More sections
│   └── images/               # Images used in docs
├── public/                   # Static assets (logos, images, etc.)
└── .vitepress/
    └── config.mts            # VitePress site configuration
```



---

## 🗂️ Key Files Explained

- **.vitepress/config.mts**: Main VitePress configuration (theme, navigation, sidebar, etc.).
- **docs/index.md**: The landing page for the documentation site.
- **docs/**: All markdown documentation content.
- **public/**: Static files served as-is (images, icons, etc.).
- **Dockerfile**: Multi-stage build for production-ready static site in a container.
- **nginx.conf**: Custom Nginx config for SPA routing and gzip.
- **package.json**: Project metadata, dependencies, and scripts.


---

## 📚 Learn More
- [VitePress Documentation](https://vitepress.dev/)
- [Gardener Project](https://gardener.cloud/)

---

## 🤝 Contributing
Pull requests and issues are welcome! Please see the `docs/contribute/` section for guidelines.

---
