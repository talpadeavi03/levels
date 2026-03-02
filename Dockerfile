# ---- Base Image ----
FROM node:20.11.1-alpine

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copy only package files first (layer caching)
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Copy application source
COPY . .

# Change ownership
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

EXPOSE 3000

ENV NODE_ENV=production
ENV ENVIRONMENT=production

CMD ["node", "index.js"]