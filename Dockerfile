FROM europe-docker.pkg.dev/gardener-project/releases/docforge:v0.55.0 AS docforge

FROM node:24.5.0-alpine3.21@sha256:efdcaa463d3350b21dd16dc18326348e79e12ade61ae021b104725f965b174a0

WORKDIR /app

COPY --from=docforge /docforge /usr/local/bin/docforge

ADD . .

RUN --mount=type=secret,id=GITHUB_OAUTH_TOKEN \
    --mount=type=cache,target=/tmp/docforge \
    apk add --no-cache git && \
    export GITHUB_OAUTH_TOKEN=$(cat /run/secrets/GITHUB_OAUTH_TOKEN) && \
    export DOCFORGE_CONFIG='.docforge/config' && \
    docforge --cache-dir /tmp/docforge && \
    npm ci && \
    npm run post-process

EXPOSE 5173

CMD ["npx", "vitepress", "dev", "--host", "0.0.0.0"]
