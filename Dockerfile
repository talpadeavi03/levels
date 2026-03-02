# -------- Stage 1: Build --------
FROM node:20-bookworm-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

# -------- Stage 2: Runtime --------
FROM node:20-bookworm-slim

WORKDIR /app

# Create non-root user
RUN useradd -m appuser

COPY --from=builder /app /app

USER appuser

ENV NODE_ENV=production
ENV ENVIRONMENT=production

EXPOSE 3000

CMD ["node", "index.js"]