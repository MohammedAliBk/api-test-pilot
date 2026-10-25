# Frontend Integration & Handover Guide for DevOps

**To**: Mohamed Ali & Mohamed Samir (DevOps Team)  
**From**: Mohamed Essam (Memo) & Frontend Team  
**Date**: 2026-10-25  
**Service**: `frontend/` (React + TypeScript + Vite)

---

## 1. Quick Summary of Frontend Stack

- **Runtime & Tooling**: Node.js `v20+` or `v24`, managed via **`pnpm`** (v12).
- **Framework**: React 18 + Vite + TypeScript.
- **Styling**: Tailwind CSS + Custom Design Tokens.
- **Production Build Artifacts**: `frontend/dist/` (static HTML/CSS/JS).
- **Default Dev Port**: `5173` (Vite dev server).
- **Production Port**: Standard `80` (or `3000` via Nginx / Docker).

---

## 2. CI/CD Pipeline Checks (Pull Requests & Main)

When adding GitHub Actions workflows for the frontend (`.github/workflows/`), please run the following steps inside the `frontend/` directory:

```yaml
name: Frontend CI

on:
  pull_request:
    paths:
      - 'frontend/**'
  push:
    branches:
      - main
    paths:
      - 'frontend/**'

jobs:
  validate:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: frontend
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22

      - name: Install pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 12

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Type Check (TypeScript strict)
        run: pnpm type-check

      - name: Unit & Component Tests
        run: pnpm test

      - name: Token Compliance Check
        run: pnpm check-tokens

      - name: Production Build
        run: pnpm build
```

---

## 3. Recommended Dockerfile (`frontend/Dockerfile`)

Here is the production-ready multi-stage Dockerfile:

```dockerfile
# Stage 1: Build static assets
FROM node:22-alpine AS builder

WORKDIR /app

# Enable corepack and pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy dependency manifests
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml* ./
RUN pnpm install --frozen-lockfile

# Copy source and build
COPY . .
RUN pnpm build

# Stage 2: Serve with Nginx
FROM nginx:alpine AS runner

# Copy built static files to Nginx HTML directory
COPY --from=builder /app/dist /usr/share/nginx/html

# SPA Routing: Redirect all requests to index.html
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
    location /api/ { \
        proxy_pass http://backend:5000/api/; \
        proxy_set_header Host $host; \
        proxy_set_header X-Real-IP $remote_addr; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### Recommended `.dockerignore` (`frontend/.dockerignore`):
```text
node_modules
dist
.git
.agents
docs
.vscode
coverage
```

---

## 4. Environment Variables & Reverse Proxy

- **Development**:
  - `VITE_API_BASE_URL`: Base URL of the .NET backend API (e.g., `http://localhost:5000/api` or configured via Vite proxy).
- **Production (Docker Compose)**:
  - If Nginx handles the reverse proxy, all backend requests go to `/api/` relative path, so no hardcoded external host is required in the client bundle.
  - If a dedicated external API domain is used, inject:
    ```env
    VITE_API_BASE_URL=https://api.yourdomain.com
    ```

---

## 5. Contact / Assistance

If you have any questions or need custom Nginx headers (such as CSP policies or WebSockets/SSE proxying for live test execution streams), please reach out to **Memo** (Frontend Team).
