# The first stage
# Build React static files
FROM node:14-alpine as build
ARG SRC_DIR

WORKDIR /app/frontend
COPY ${SRC_DIR}/package.json ./

# COPY ${SRC_DIR}/package-lock.json ./
# RUN npm ci --silent

COPY ${SRC_DIR}/ ./
RUN yarn install --ignore-optional
RUN yarn build

# The second stage
# Copy React static files and start nginx
FROM nginx:stable-alpine
COPY --from=build /app/frontend/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]