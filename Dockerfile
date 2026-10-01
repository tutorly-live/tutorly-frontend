# ── Build Stage ──
FROM node:22-alpine AS builder

WORKDIR /app

# Install pnpm and dependencies
COPY package.json pnpm-lock.yaml* package-lock.json* ./
RUN npm install -g pnpm && (pnpm install --frozen-lockfile || pnpm install || npm install)

COPY . .
RUN npm run build

# ── Production Stage ──
FROM nginx:alpine AS runner

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 4002

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:4002/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
