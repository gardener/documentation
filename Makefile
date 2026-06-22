# SPDX-FileCopyrightText: 2018 SAP SE or an SAP affiliate company and Gardener contributors
#
# SPDX-License-Identifier: Apache-2.0

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

.PHONY: docforge-run
docforge-run: docforge-download ## Check environment and run docforge with custom parameters
	@echo "Checking environment variables for docforge..."
	@if [ -z "$$DOCFORGE_CONFIG" ]; then \
		echo "ERROR: DOCFORGE_CONFIG environment variable is not set."; \
		echo "Please add the following to your ~/.bashrc or ~/.zshrc:"; \
		echo "  export DOCFORGE_CONFIG=.docforge/config.yaml"; \
		echo "Then run: source ~/.bashrc (or ~/.zshrc)"; \
		exit 1; \
	fi
	@if [ -z "$$GITHUB_OAUTH_TOKEN" ]; then \
		echo "ERROR: GITHUB_OAUTH_TOKEN environment variable is not set."; \
		echo "Please create a token (see docs/resources/github-token-guide.md)"; \
		echo "Then add it to your ~/.bashrc or ~/.zshrc:"; \
		echo "  export GITHUB_OAUTH_TOKEN=your_token"; \
		echo "Then run: source ~/.bashrc (or ~/.zshrc)"; \
		exit 1; \
	fi
	@echo "Environment check passed:"
	@if [ -d "content" ]; then \
		read -p "Content directory already exists. Do you want to run docforge again to update it? (y/n): " confirm; \
		if [ "$$confirm" = "y" ] || [ "$$confirm" = "Y" ]; then \
			echo "Running docforge..."; \
			./bin/docforge; \
		else \
			echo "Skipping docforge execution."; \
		fi; \
	else \
		echo "Content directory does not exist. Running docforge..."; \
		./bin/docforge; \
	fi

.PHONY: docker-preview
docker-preview:
	@chmod +x hack/preview.sh
	@hack/preview.sh

.PHONY: install
install: ## Install npm dependencies
	npm ci


OPTIMIZE_DIR ?= website
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
dev:
	npx vitepress dev

.PHONY: local-preview
local-preview: ## Full local preview: clean hugo dir, run docforge, post-process, build, and preview
	@if [ -d "hugo" ]; then \
		echo "Removing existing hugo directory..."; \
		rm -rf hugo; \
	fi
	@$(MAKE) docforge-ci
	@$(MAKE) install
	@$(MAKE) post-process
	@$(MAKE) build
	npx vitepress preview

.PHONY: post-processing-part-1
post-processing-part-1:
	node post-processing/part-1.js --rename-images --add-h1-title --youtube --fix-titles --fix-network-doc --add-missing-index

.PHONY: post-processing-part-2
post-processing-part-2:
	node post-processing/part-2.js --migrate-alerts --clean-layouts --flatten-single-dirs --add-navigation-frontmatter

.PHONY: post-processing-part-index
post-processing-part-index:
	node post-processing/part-index.js ./hugo/content

.PHONY: post-processing-part-3
post-processing-part-3:
	node post-processing/part-3.js --update-report-link --process-api-html

.PHONY: post-processing-part-managed
post-processing-part-managed:
	node post-processing/part-managed.js ./hugo/content

.PHONY: post-process
post-process: ## Run post-processing scripts
	@$(MAKE) post-processing-part-1
	@$(MAKE) post-processing-part-2
	@$(MAKE) post-processing-part-index
	@$(MAKE) post-processing-part-3
	@$(MAKE) post-processing-part-managed

.PHONY: build
build: ## Build the documentation site
	VITE_PUBLIC_BASE_PATH='' npx vitepress build

.PHONY: docforge-ci
docforge-ci: docforge-download ## Run docforge in CI mode (non-interactive)
	@echo "Running docforge (CI)..."
	@export DOCFORGE_CONFIG=.docforge/config.yaml && \
	./bin/docforge

.PHONY: ci-build
ci-build: docforge-ci install post-process build ## Run all steps for building in CI

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
vale-run: ## Lint changed website markdown files with Vale
	@CHANGED=$$(git diff --name-only --diff-filter=d HEAD -- 'website/**/*.md' | \
		grep -v '^website/about/legal-disclosure\.md' | \
		grep -v '^website/archived/'); \
	if [ -n "$$CHANGED" ]; then \
		bin/vale $$CHANGED; \
	else \
		echo "No changed .md files to lint."; \
	fi

.PHONY: vale
vale: vale-install vale-run ## Install Vale and lint changed website markdown files