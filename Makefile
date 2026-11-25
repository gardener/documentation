# SPDX-FileCopyrightText: Contributors to the Gardener project
#
# SPDX-License-Identifier: Apache-2.0

.PHONY: docforge-download
docforge-download: ## Download the appropriate docforge binary for the current OS if not present
	@mkdir -p bin
	@OS=$$(uname); ARCH=$$(uname -m); \
	case "$$OS" in \
		Darwin) [ "$$ARCH" = "arm64" ] && ASSET=docforge-darwin-arm64 || ASSET=docforge-darwin-amd64 ;; \
		Linux) \
			if [ "$$ARCH" = "aarch64" ] || [ "$$ARCH" = "arm64" ]; then ASSET=docforge-linux-arm64; else ASSET=docforge-linux-amd64; fi ;; \
		MINGW*|CYGWIN*) ASSET=docforge-windows-386 ;; \
		*) echo "Unsupported OS. Please download docforge manually from https://github.com/gardener/docforge/releases"; exit 1 ;; \
	esac; \
	if [ "$$ASSET" = "docforge-windows-386" ] && [ -f bin/docforge.exe ]; then \
		echo "Docforge for Windows already exists."; \
	elif [ "$$ASSET" != "docforge-windows-386" ] && [ -f bin/docforge ] && [ -x bin/docforge ]; then \
		echo "Docforge already exists and is executable."; \
	else \
		echo "Downloading docforge ($$ASSET)..."; \
		curl -fL https://github.com/gardener/docforge/releases/download/v0.57.0/$$ASSET | tar -xz -C bin; \
		if [ "$$ASSET" = "docforge-windows-386" ]; then mv bin/$$ASSET.exe bin/docforge.exe; else mv bin/$$ASSET bin/docforge; fi; \
		echo "Docforge binary downloaded and is ready to use."; \
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
dev:
	@$(MAKE) install
	pnpm exec vitepress dev

.PHONY: hugo-refresh
hugo-refresh: ## Refresh md files from external repos (.docforge/), post-process, then stage regenerated content
	@echo "Refreshing md files from external repositories, defined in .docforge/ dir."
	@echo "USE THIS ONLY FOR TESTING OF MANIFEST CHANGES"
	./delete-managed-banner.sh --force hugo/content
	@$(MAKE) docforge-ci
	@$(MAKE) post-process
	git add hugo/content

.PHONY: local-preview
local-preview:
	@$(MAKE) install
	@$(MAKE) build
	pnpm exec vitepress preview

.PHONY: post-processing-part-1
post-processing-part-1:
	node post-processing/part-1.js --rename-images --add-h1-title --fix-network-doc

.PHONY: post-processing-part-2
post-processing-part-2:
	node post-processing/part-2.js --migrate-alerts --clean-layouts

.PHONY: post-processing-part-index
post-processing-part-index:
	node post-processing/part-index.js ./hugo/content

.PHONY: post-processing-part-banner
post-processing-part-banner:
	node post-processing/part-banner.js ./hugo/content

.PHONY: post-processing-part-3
post-processing-part-3:
	node post-processing/part-3.js --process-api-html

.PHONY: post-process
post-process: ## Run post-processing scripts and emit post-processing-report.json
	@LEDGER=$$(mktemp $${TMPDIR:-/tmp}/post-processing-ledger-XXXXXX); \
	trap "rm -f $$LEDGER" EXIT; \
	export POST_PROCESSING_LEDGER=$$LEDGER; \
	set -e; \
	$(MAKE) post-processing-part-1; \
	$(MAKE) post-processing-part-2; \
	$(MAKE) post-processing-part-index; \
	$(MAKE) post-processing-part-banner; \
	$(MAKE) post-processing-part-3; \
	node post-processing/report.js

.PHONY: build
build: ## Build the documentation site
	VITE_PUBLIC_BASE_PATH='' pnpm exec vitepress build

.PHONY: docforge-ci
docforge-ci: docforge-download ## Run docforge in CI mode (non-interactive)
	@echo "Running docforge (CI)..."
	@export DOCFORGE_CONFIG=.docforge/config.yaml && \
	./bin/docforge

.PHONY: ci-build
ci-build:
	$(MAKE) ci-install; \
	$(MAKE) build; \

.PHONY: ci-build-preview
ci-build-preview: ## Netlify deploy-preview: full rebuild if .docforge/, post-processing/ or the VitePress config changed
	@BASE="origin/master"; \
	git fetch -q origin master 2>/dev/null || true; \
	if ! CHANGED=$$(git diff --name-only "$$BASE...HEAD" 2>/dev/null); then \
		echo "Cannot diff against '$$BASE' -> full rebuild"; \
		$(MAKE) ci-install; \
		./delete-managed-banner.sh --force hugo/content; \
		$(MAKE) docforge-ci post-process build; \
	elif printf '%s\n' "$$CHANGED" | grep -qE '^(\.docforge/|post-processing/|\.vitepress/config\.mts|Makefile|delete-managed-banner\.sh)'; then \
		echo "Manifest, post-processing or VitePress config changed since $$BASE -> docforge + post-process + build"; \
		$(MAKE) ci-install; \
		./delete-managed-banner.sh --force hugo/content; \
		$(MAKE) docforge-ci post-process build; \
	else \
		echo "No aggregation-relevant change since $$BASE -> build only"; \
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
