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