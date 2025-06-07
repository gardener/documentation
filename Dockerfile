# Build stage
# ToDo refine this quick and dirty Dockerfile
FROM node:22-alpine AS builder
WORKDIR /app
RUN ls -lisa
COPY package.json package-lock.json* ./
RUN ls -lisa
COPY . .
RUN ls -lisa
RUN npm install
RUN ls -lisa
RUN pwd
RUN npm run docs:build
RUN ls -lisa


# Production stage
FROM nginx:alpine
COPY --from=builder /app/.vitepress/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
