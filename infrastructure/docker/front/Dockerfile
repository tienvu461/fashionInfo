# The first stage
# Build React static files
FROM node:13.12.0-alpine as build
ARG SRC_DIR

WORKDIR /app/frontend
COPY ${SRC_DIR}/package.json ./

# COPY ${SRC_DIR}/package-lock.json ./
# RUN npm ci --silent

COPY ${SRC_DIR}/ ./
RUN npm run build

# The second stage
# Copy React static files and start nginx
FROM nginx:stable-alpine
COPY --from=build /app/frontend/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]