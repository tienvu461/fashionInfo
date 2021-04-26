# docker/backend/Dockerfile

FROM python:3.8.3-alpine
ARG SRC_DIR

WORKDIR /app

# install psycopg2 dependencies
RUN apk update \
    && apk add --virtual build-deps gcc python3-dev musl-dev \
    && apk add postgresql-dev gcc python3-dev musl-dev \
    && apk add postgresql \
    && pip install psycopg2 \
    && apk add jpeg-dev zlib-dev libjpeg \
    && pip install Pillow \
    && apk del build-deps

ADD ${SRC_DIR}/requirements.txt /app/backend/

RUN pip install --upgrade pip
RUN pip install gunicorn
RUN pip install -r backend/requirements.txt

ADD ./infrastructure/docker /app/docker
ADD ${SRC_DIR}/ /app/backend/