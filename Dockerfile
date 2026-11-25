# Multi-stage build — node builds the app, nginx serves it
# Multi-arch compatible — builds for linux/amd64 and linux/arm64
# docker buildx build \
#   --platform linux/amd64,linux/arm64 \
#   -t lmwcode/ggservices-frontend:v1.0.2 \
#   --no-cache --push .

# ── Stage 1: build ────────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies first (better layer caching)
COPY package.json package-lock.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# ── Stage 2: serve ────────────────────────────────────────────
# nginx:stable-alpine tracks the current stable release with up-to-date Alpine packages.
# nginx:1.28-alpine is frozen at an older Alpine index that lacks the patched nginx builds.
FROM nginx:stable-alpine

# Upgrade all packages to pick up any Alpine security patches not yet in the base image
RUN apk upgrade --no-cache

# Remove default nginx page
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets from stage 1
COPY --from=builder /app/dist /usr/share/nginx/html

# SPA-aware nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD wget -qO- http://localhost/ || exit 1
