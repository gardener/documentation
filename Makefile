# SPDX-FileCopyrightText: Contributors to the Gardener project
#
# SPDX-License-Identifier: Apache-2.0

# Content root for pull, post-processing and VitePress (srcDir). Exported so
# sub-makes, node scripts and VitePress see it. Must end in /content: docforge
# writes into its parent, because the manifest root is `dir: content`.
export CONTENT_DIR ?= hugo/content

.PHONY: docforge-download
docforge-download: ## Download the appropriate docforge binary for the current OS if not present
	@echo "Creating bin directory if it doesn't exist..."
	@mkdir -p bin
	@echo "Detecting OS and architecture..."
	@if [ "$$(uname)" = "Darwin" ]; then \
		if [ "$$(uname -m)" = "arm64" ]; then \
			if [ -f bin/docforge ] && [ -x bin/docforge ]; then \
				echo "Docforge for macOS ARM64 already exists and is executable."; \
			else \
				echo "Downloading docforge for macOS ARM64..."; \
				curl -fL https://github.com/gardener/docforge/releases/download/v0.57.0/docforge-darwin-arm64 | tar -xz -C bin; \
				mv bin/docforge-darwin-arm64 bin/docforge; \
				echo "Docforge binary downloaded and is ready to use."; \
			fi; \
		else \
			if [ -f bin/docforge ] && [ -x bin/docforge ]; then \
				echo "Docforge for macOS AMD64 already exists and is executable."; \
			else \
				echo "Downloading docforge for macOS AMD64..."; \
				curl -fL https://github.com/gardener/docforge/releases/download/v0.57.0/docforge-darwin-amd64 | tar -xz -C bin; \
				mv bin/docforge-darwin-amd64 bin/docforge; \
				echo "Docforge binary downloaded and is ready to use."; \
			fi; \
		fi; \
	elif [ "$$(uname)" = "Linux" ]; then \
		if [ "$$(uname -m)" = "aarch64" ] || [ "$$(uname -m)" = "arm64" ]; then \
			if [ -f bin/docforge ] && [ -x bin/docforge ]; then \
				echo "Docforge for Linux ARM64 already exists and is executable."; \
			else \
				echo "Downloading docforge for Linux ARM64..."; \
				curl -fL https://github.com/gardener/docforge/releases/download/v0.57.0/docforge-linux-arm64 | tar -xz -C bin; \
				mv bin/docforge-linux-arm64 bin/docforge; \
				echo "Docforge binary downloaded and is ready to use."; \
			fi; \
		else \
			if [ -f bin/docforge ] && [ -x bin/docforge ]; then \
				echo "Docforge for Linux AMD64 already exists and is executable."; \
			else \
				echo "Downloading docforge for Linux AMD64..."; \
				curl -fL https://github.com/gardener/docforge/releases/download/v0.57.0/docforge-linux-amd64 | tar -xz -C bin; \
				mv bin/docforge-linux-amd64 bin/docforge; \
				echo "Docforge binary downloaded and is ready to use."; \
			fi; \
		fi; \
	elif [[ "$$(uname -s)" == MINGW* ]] || [[ "$$(uname -s)" == CYGWIN* ]]; then \
		if [ -f bin/docforge.exe ]; then \
			echo "Docforge for Windows already exists."; \
		else \
			echo "Downloading docforge for Windows..."; \
			curl -fL https://github.com/gardener/docforge/releases/download/v0.57.0/docforge-windows-386 | tar -xz -C bin; \
			mv bin/docforge-windows-386.exe bin/docforge.exe; \
			echo "Docforge binary downloaded and is ready to use."; \
		fi; \
	else \
		echo "Unsupported OS. Please download docforge manually from https://github.com/gardener/docforge/releases"; \
		exit 1; \
	fi

.PHONY: docker-preview
docker-preview:
	@hack/preview.sh

.PHONY: install
install: ## Install npm dependencies
	pnpm install

.PHONY: ci-install
ci-install: ## Install npm dependencies with frozen lockfile for CI
	pnpm install --frozen-lockfile


OPTIMIZE_DIR ?= hugo/content/public
OPTIMIZE_MIN_KB ?= 200
OPTIMIZE_SKIP ?= favicon.png,favicon-16x16.png,favicon-32x32.png,favicon-96x96.png,apple-touch-icon.png,web-app-manifest-192x192.png,web-app-manifest-512x512.png,2025-07.png,og-gardener.png

.PHONY: optimize-assets
optimize-assets: ## Dry run: show which PNG images would be converted to WebP
	node scripts/optimize-assets.mjs \
		--dir $(OPTIMIZE_DIR) \
		--min-kb $(OPTIMIZE_MIN_KB) \
		--skip $(OPTIMIZE_SKIP)

.PHONY: optimize-assets-write
optimize-assets-write: ## Convert large PNG images to WebP and update references
	node scripts/optimize-assets.mjs \
		--dir $(OPTIMIZE_DIR) \
		--min-kb $(OPTIMIZE_MIN_KB) \
		--skip $(OPTIMIZE_SKIP) \
		--write

.PHONY: dev
dev: install
	pnpm exec vitepress dev

# Pull + post-process into CONTENT_DIR: the same steps as the nightly CI run.
.PHONY: _aggregate
_aggregate:
	./delete-managed-banner.sh --force "$(CONTENT_DIR)"
	@$(MAKE) docforge-ci
	@$(MAKE) post-process

# Reproduces the nightly run into hugo/content and stages it.
# To test manifest changes, use structure-preview instead.
.PHONY: _hugo-refresh
_hugo-refresh: _aggregate
	git add "$(CONTENT_DIR)"

.PHONY: structure-preview
structure-preview: ## Preview manifest changes: fresh pull + post-process into .preview/content (hugo/content untouched), then build and serve
	rm -rf .preview
	mkdir -p .preview && cp -R hugo/content .preview/content
	@$(MAKE) _aggregate CONTENT_DIR=.preview/content
	@$(MAKE) local-preview CONTENT_DIR=.preview/content

.PHONY: local-preview
local-preview: install
	@$(MAKE) build
	pnpm exec vitepress preview

.PHONY: post-process
post-process: ## Run post-processing scripts
	node post-processing/part-1.js --rename-images --add-h1-title --youtube --fix-network-doc
	node post-processing/part-2.js --migrate-alerts --clean-layouts --flatten-single-dirs --add-navigation-frontmatter
	node post-processing/part-index.js "$(CONTENT_DIR)"
	node post-processing/part-banner.js "$(CONTENT_DIR)"
	node post-processing/part-3.js --update-report-link --process-api-html

.PHONY: build
build: ## Build the documentation site
	VITE_PUBLIC_BASE_PATH='' pnpm exec vitepress build

.PHONY: docforge-ci
docforge-ci: docforge-download ## Run docforge in CI mode (non-interactive)
	@case "$(CONTENT_DIR)" in */content) ;; *) echo "ERROR: CONTENT_DIR must end in /content (manifest root is 'dir: content')"; exit 1;; esac
	@echo "Running docforge (CI)..."
	@export DOCFORGE_CONFIG=.docforge/config.yaml && \
	./bin/docforge -d "$(CONTENT_DIR:/content=)"

.PHONY: ci-build
ci-build:
	$(MAKE) ci-install; \
	$(MAKE) build; \

.PHONY: ci-build-preview
ci-build-preview: ## Netlify deploy-preview: full rebuild only if .docforge/ changed
	@BASE="$${CACHED_COMMIT_REF:-origin/master}"; \
	if ! git rev-parse --verify -q "$$BASE^{commit}" >/dev/null \
		|| git diff --name-only "$$BASE...HEAD" | grep -q '^\.docforge/'; then \
		echo "Manifest changed since $$BASE, or base not resolvable (shallow clone?) -> docforge + post-process + build"; \
		$(MAKE) ci-install _aggregate build; \
	else \
		echo "No manifest change since $$BASE -> build only"; \
		$(MAKE) ci-install build; \
	fi

.PHONY: vale-install
vale-install: ## Install Vale binary if not already present
	@if [ -x bin/vale ]; then \
		echo "Vale is already installed: $$(bin/vale --version)"; \
	else \
		echo "Installing Vale..."; \
		mkdir -p bin; \
		if [ "$$(uname)" = "Darwin" ]; then \
			if [ "$$(uname -m)" = "arm64" ]; then \
				curl -sL https://github.com/vale-cli/vale/releases/download/v3.14.2/vale_3.14.2_macOS_arm64.tar.gz | tar -xz -C bin vale; \
			else \
				curl -sL https://github.com/vale-cli/vale/releases/download/v3.14.2/vale_3.14.2_macOS_64-bit.tar.gz | tar -xz -C bin vale; \
			fi; \
		elif [ "$$(uname)" = "Linux" ]; then \
			if [ "$$(uname -m)" = "aarch64" ] || [ "$$(uname -m)" = "arm64" ]; then \
				curl -sL https://github.com/vale-cli/vale/releases/download/v3.14.2/vale_3.14.2_Linux_arm64.tar.gz | tar -xz -C bin vale; \
			else \
				curl -sL https://github.com/vale-cli/vale/releases/download/v3.14.2/vale_3.14.2_Linux_64-bit.tar.gz | tar -xz -C bin vale; \
			fi; \
		elif echo "$$(uname -s)" | grep -qi "mingw\|cygwin\|msys"; then \
			curl -sL https://github.com/vale-cli/vale/releases/download/v3.14.2/vale_3.14.2_Windows_64-bit.zip -o bin/vale.zip; \
			unzip -q bin/vale.zip vale.exe -d bin; \
			rm -f bin/vale.zip; \
		else \
			echo "Unsupported OS. Install Vale manually: https://vale.sh/docs/install"; \
			exit 1; \
		fi; \
		echo "Vale installed to bin/."; \
	fi

.PHONY: vale-run
vale-run: ## Lint changed content markdown files with Vale
	@CHANGED=$$(git diff --name-only --diff-filter=d HEAD -- 'hugo/content/**/*.md' | \
		grep -v '^hugo/content/about/legal-disclosure\.md'); \
	if [ -n "$$CHANGED" ]; then \
		bin/vale $$CHANGED; \
	else \
		echo "No changed .md files to lint."; \
	fi

.PHONY: vale
vale: vale-install vale-run ## Install Vale and lint changed content markdown files

.PHONY: diff-structure-master
diff-structure-master: ## Compare sitemap structure of working tree vs origin/master (build only, no docforge/post-process)
	scripts/diff-structure.sh master

.PHONY: diff-structure-branch-origin
diff-structure-branch-origin: ## Compare sitemap structure of working tree vs branch fork point (merge-base with master)
	scripts/diff-structure.sh branch-origin

.PHONY: diff-structure-snapshot
diff-structure-snapshot: ## Capture current dist/sitemap.xml as baseline for a later working-tree diff
	scripts/diff-structure.sh working --snapshot

.PHONY: diff-structure-working
diff-structure-working: ## Rebuild working tree and diff sitemap against the captured snapshot
	scripts/diff-structure.sh working
