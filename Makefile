# SPDX-FileCopyrightText: 2018 SAP SE or an SAP affiliate company and Gardener contributors
#
# SPDX-License-Identifier: Apache-2.0


# Default make target is `serve`
.PHONY: 
	@./scripts/serve
.PHONY: serve
# `make serve`: starts a `website-dev` container with hugo web server, serving the content from
# `/website` in this repository. Changes to content are reflected on the server in real time. 
# Suitable for preview of content changes. 
serve:
	@./scripts/serve
# `make build`: builds the site without running a server. Suitable for quick validation.
.PHONY: build
build:
	@./scripts/serve --build
# `make production`: (Experimental) creates a full-blown build with the content (same as Concourse)
# and runs a web server to preview the changes. Suitable for final quality check.
.PHONY: production
production:
	@./scripts/serve --prod
# `make stop`: gracefully stops `website-dev` container (if it was run).
.PHONY: stop
stop:
	@./scripts/stop -c=website-dev

.PHONY: check-manifest
check-manifest:
	@.ci/check-manifest-entrypoint

.PHONY: test
test:
	@python3 test/selenium-test.py



### vitepress ###

.PHONY: docforge
docforge: docforge-download ## Check environment and run docforge
	@echo "Checking environment variables for docforge..."
	@if [ -f .env ]; then \
		export $$(grep -v '^#' .env | grep -v '^$$' | xargs); \
	fi
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
	@echo "DOCFORGE_CONFIG: $$DOCFORGE_CONFIG"
	@echo "GITHUB_OAUTH_TOKEN: $${GITHUB_OAUTH_TOKEN:0:5}..."
	@if [ -d "hugo/content" ]; then \
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
				curl -L -o bin/docforge https://github.com/gardener/docforge/releases/download/v0.55.0/docforge-darwin-arm64; \
				echo "Making docforge executable..."; \
				chmod +x bin/docforge; \
				echo "Docforge binary downloaded and is ready to use."; \
			fi; \
		else \
			if [ -f bin/docforge ] && [ -x bin/docforge ]; then \
				echo "Docforge for macOS AMD64 already exists and is executable."; \
			else \
				echo "Downloading docforge for macOS AMD64..."; \
				curl -L -o bin/docforge https://github.com/gardener/docforge/releases/download/v0.55.0/docforge-darwin-amd64; \
				echo "Making docforge executable..."; \
				chmod +x bin/docforge; \
				echo "Docforge binary downloaded and is ready to use."; \
			fi; \
		fi; \
	elif [ "$$(uname)" = "Linux" ]; then \
		if [ "$$(uname -m)" = "aarch64" ] || [ "$$(uname -m)" = "arm64" ]; then \
			if [ -f bin/docforge ] && [ -x bin/docforge ]; then \
				echo "Docforge for Linux ARM64 already exists and is executable."; \
			else \
				echo "Downloading docforge for Linux ARM64..."; \
				curl -L -o bin/docforge https://github.com/gardener/docforge/releases/download/v0.55.0/docforge-linux-arm64; \
				echo "Making docforge executable..."; \
				chmod +x bin/docforge; \
				echo "Docforge binary downloaded and is ready to use."; \
			fi; \
		else \
			if [ -f bin/docforge ] && [ -x bin/docforge ]; then \
				echo "Docforge for Linux AMD64 already exists and is executable."; \
			else \
				echo "Downloading docforge for Linux AMD64..."; \
				curl -L -o bin/docforge https://github.com/gardener/docforge/releases/download/v0.55.0/docforge-linux-amd64; \
				echo "Making docforge executable..."; \
				chmod +x bin/docforge; \
				echo "Docforge binary downloaded and is ready to use."; \
			fi; \
		fi; \
	elif [[ "$$(uname -s)" == MINGW* ]] || [[ "$$(uname -s)" == CYGWIN* ]]; then \
		if [ -f bin/docforge.exe ]; then \
			echo "Docforge for Windows already exists."; \
		else \
			echo "Downloading docforge for Windows..."; \
			curl -L -o bin/docforge.exe https://github.com/gardener/docforge/releases/download/v0.55.0/docforge-windows-386.exe; \
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

# VitePress documentation targets

.PHONY: docs-dev
docs-dev: docforge-run ## Run docforge and start the VitePress development server
	@echo "Building VitePress dev environment Docker image..."
	docker build --no-cache -t gardener_docs_dev -f Dockerfile.dev . --load
	@echo "Starting VitePress development server on port 5173..."
	docker run --rm -p 5173:5173 -v `pwd`/:/app gardener_docs_dev