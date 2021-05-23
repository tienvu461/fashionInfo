FROM nginx:1.19.0-alpine
ARG SRC_DIR



RUN rm /etc/nginx/conf.d/default.conf
COPY ${SRC_DIR}/default.conf /etc/nginx/conf.d