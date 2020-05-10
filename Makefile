# Copyright 2018 The Gardener Authors.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

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