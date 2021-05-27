# docker/backend/Dockerfile
########
# BASE #
########

FROM python:3.8.3-alpine as base
ARG SRC_DIR

# set environment variables
# no .pyc
ENV PYTHONDONTWRITEBYTECODE 1
# no stdout stderr
ENV PYTHONUNBUFFERED 1

WORKDIR /app

RUN apk update \
    && apk add gcc musl-dev python3-dev \
    libffi-dev openssl-dev cargo  \
    postgresql-dev \
    jpeg-dev zlib-dev libjpeg
    # && apk add psycopg2
    # && apk add postgresql

ADD ${SRC_DIR}/requirements.txt /app/backend/

RUN pip install --upgrade pip
# RUN pip install gunicorn
# RUN pip install pillow
# RUN pip install -r backend/requirements.txt
RUN pip wheel --no-cache-dir --no-deps --wheel-dir /app/wheels -r backend/requirements.txt

#########
# FINAL #
#########

FROM python:3.8.3-alpine

RUN mkdir -p /app

RUN addgroup -S www-data && adduser -S www-data -G www-data

ENV HOME=/app
ENV APP_HOME=/app/backend
ENV LOG_PATH=/var/log/django
RUN mkdir ${APP_HOME}
WORKDIR ${APP_HOME}

RUN apk update

RUN apk add tiff-dev jpeg-dev openjpeg-dev zlib-dev freetype-dev lcms2-dev \
    libwebp-dev tcl-dev tk-dev harfbuzz-dev fribidi-dev libimagequant-dev \
    libxcb-dev libpng-dev postgresql

COPY --from=base /app/wheels /wheels
COPY --from=base /app/backend/requirements.txt .

RUN pip install --no-cache /wheels/*

ADD ./infrastructure/docker /app/docker

COPY ${SRC_DIR}/ ${APP_HOME}
RUN chown -R www-data:www-data ${APP_HOME}

# log path
RUN mkdir -p ${LOG_PATH}
RUN chown -R www-data:www-data ${LOG_PATH}
