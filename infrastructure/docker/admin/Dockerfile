FROM node:15-alpine as base
ARG SRC_DIR

USER node
WORKDIR /home/node

# COPY package.json yarn.lock ./
# RUN yarn

COPY ${SRC_DIR} .
RUN yarn build

FROM nginx:1.15.2-alpine as release
RUN apk add --no-cache jq

COPY --from=base /home/node/build /var/www
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

COPY entrypoint.sh .
ENTRYPOINT ["entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]