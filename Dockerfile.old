# Use official lightweight Node image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first (Docker layer optimization)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy rest of app
COPY . .

# Expose application port
EXPOSE 3000

# Define environment variable
ENV ENVIRONMENT=production

# Start app
CMD ["npm", "start"]