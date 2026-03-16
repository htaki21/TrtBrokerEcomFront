# Use Node.js 20 (matches package.json requirement >=20.9.0)
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev deps needed for build)
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Remove dev dependencies after build
RUN npm ci --only=production

# Expose port 3000
EXPOSE 3000

# Allow more memory for the Next.js server
ENV NODE_OPTIONS="--max-old-space-size=512"

# Start the application
CMD ["npm", "start"]
