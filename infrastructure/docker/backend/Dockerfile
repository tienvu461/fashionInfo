# docker/backend/Dockerfile

FROM python:3.8.3-alpine
ARG SRC_DIR

# set environment variables
# no .pyc
ENV PYTHONDONTWRITEBYTECODE 1
# no stdout stderr
ENV PYTHONUNBUFFERED 1

WORKDIR /app

# install psycopg2 dependencies
# RUN apk update \
#     && apk add --virtual build-deps gcc python3-dev musl-dev libc-dev libressl-dev musl-dev libffi-dev cairo cairo-dev cargo openssl-dev postgresql-dev jpeg-dev zlib-dev libjpeg \
#     && apk add postgresql postgresql-client \
#     && pip install psycopg2 \
#     && pip install Pillow \
#     && apk add py-cryptography
RUN apk update \
    && apk add --virtual build-deps gcc musl-dev python3-dev libffi-dev openssl-dev cargo postgresql-dev jpeg-dev zlib-dev
    # && apk add psycopg2

ADD ${SRC_DIR}/requirements.txt /app/backend/

RUN pip install --upgrade pip
RUN pip install gunicorn
RUN pip install -r backend/requirements.txt

RUN apk del build-deps 

ADD ./infrastructure/docker /app/docker
ADD ${SRC_DIR}/ /app/backend/