FROM node:24.5.0-alpine3.21@sha256:efdcaa463d3350b21dd16dc18326348e79e12ade61ae021b104725f965b174a0

WORKDIR /app

ADD . .

RUN corepack enable

RUN pnpm install --frozen-lockfile

EXPOSE 5173

CMD ["pnpm", "exec", "vitepress", "dev", "--host", "0.0.0.0"]
