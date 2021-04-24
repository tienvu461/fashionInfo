FROM python:3.8.3-alpine
ARG SRC_DIR

# work directory
WORKDIR /app
COPY ${SRC_DIR}/backend/requirements.txt /app/backend/
# set environment variables
# no .pyc
ENV PYTHONDONTWRITEBYTECODE 1
# no stdout stderr
ENV PYTHONUNBUFFERED 1

# install dependencies
RUN pip install --upgrade pip
RUN pip install gunicorn
RUN pip install -r backend/requirements.txt

ADD ${SRC_DIR}/infrastructure/docker /app/docker
ADD ${SRC_DIR}backend /app/backend

# copy entrypoint.sh
COPY ./myFirstBlog/entrypoint.sh .
RUN chmod +x /usr/src/myFirstBlog/entrypoint.sh

# source code
COPY . .

# run entrypoint.sh
ENTRYPOINT ["/usr/src/myFirstBlog/entrypoint.sh"]