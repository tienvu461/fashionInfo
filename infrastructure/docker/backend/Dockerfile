# docker/backend/Dockerfile

FROM python:3.8.3-alpine
ARG SRC_DIR

# set environment variables
# no .pyc
ENV PYTHONDONTWRITEBYTECODE 1
# no stdout stderr
ENV PYTHONUNBUFFERED 1

WORKDIR /app

RUN apk update \
    && apk add --virtual build-deps gcc musl-dev python3-dev \
    libffi-dev openssl-dev cargo  \
    postgresql-dev \
    jpeg-dev zlib-dev libjpeg \
    # && apk add psycopg2
    && apk add postgresql
RUN apk add tiff-dev jpeg-dev openjpeg-dev zlib-dev freetype-dev lcms2-dev \
    libwebp-dev tcl-dev tk-dev harfbuzz-dev fribidi-dev libimagequant-dev \
    libxcb-dev libpng-dev
    
ADD ${SRC_DIR}/requirements.txt /app/backend/

RUN pip install --upgrade pip
RUN pip install gunicorn
# RUN pip install pillow
RUN pip install -r backend/requirements.txt

RUN apk del build-deps 

ADD ./infrastructure/docker /app/docker
# ADD ${SRC_DIR}/ /app/backend/