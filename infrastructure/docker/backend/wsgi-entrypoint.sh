#!/bin/sh
printenv
until cd /app/backend/
do
    echo "Waiting for server volume..."
done

if [ "$DATABASE" = "postgres" ]
then
    echo "Waiting for postgres..."

    while ! nc -z $SQL_HOST $SQL_PORT; do
      sleep 0.1
    done

    echo "PostgreSQL started"
fi

until ./manage.py migrate
do
    echo "Waiting for db to be ready..."
    sleep 2
done

./manage.py collectstatic --noinput

# gunicorn backend.wsgi --bind 0.0.0.0:8000 --workers 4 --threads 4

#####################################################################################
# Options to DEBUG Django server
# Optional commands to replace abouve gunicorn command

# Option 1:
# run gunicorn with debug log level
# gunicorn server.wsgi --bind 0.0.0.0:8000 --workers 1 --threads 1 --log-level debug

# Option 2:
# run development server
DEBUG=True ./manage.py runserver 0.0.0.0:8000