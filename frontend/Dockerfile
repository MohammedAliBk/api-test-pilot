# ==========================================
# Stage 1: Build the application
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /app

# 1. Copy package files and pnpm lockfile
COPY package.json pnpm-lock.yaml ./

# 2. Enable Corepack and activate pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# 3. Install dependencies using pnpm
# 3. Install dependencies using pnpm and allow build scripts
RUN pnpm install --unsafe-perm=true --no-frozen-lockfile --allow-build=esbuild
RUN pnpm install --unsafe-perm=true --no-frozen-lockfile --config.ignore-build=false

# 4. Copy configuration files and source code
COPY tsconfig*.json ./
COPY vite.config.* ./
COPY tailwind.config.* ./
COPY postcss.config.* ./
COPY index.html ./
COPY src/ ./src/
COPY design/reference/ ./design/reference/

# 5. Build the application for production
RUN pnpm build

# ==========================================
# Stage 2: Serve application using Nginx
# ==========================================
FROM nginx:alpine AS runner

# Copy custom Nginx configuration for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built static files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]