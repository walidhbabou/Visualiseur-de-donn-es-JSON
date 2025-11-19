# Stage 1: build the Angular app
FROM node:18 AS builder
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci --silent

# Copy source and build
COPY . .
RUN npm run build -- --configuration production

# Stage 2: serve with nginx
FROM nginx:1.25-alpine

# Remove default nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy built files from builder. Adjust dist folder name if different.
COPY --from=builder /app/dist/json-data-explorer /usr/share/nginx/html

# Optional: copy a custom nginx config (uncomment to use)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
