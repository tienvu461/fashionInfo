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
      sleep 5
    done

    echo "PostgreSQL started"
fi

if [ "$(ls -A /app/backend/apps/photos/migrations/0*.py| wc -l)" -ge "1" ]; then
     echo "Migrations exist"
else
    echo "Making migrations"
    ./manage.py makemigrations photos
fi

until ./manage.py migrate
do
    echo "Waiting for db to be ready..."
    sleep 2
done

cat <<EOF | python manage.py shell
from django.contrib.auth import get_user_model
import os
User = get_user_model()  # get the currently active user model,
SU_USER = os.environ.get("SU_USER", "admin")
SU_PWD = os.environ.get("SU_PWD", "abc123!@#")
SU_EMAIL = os.environ.get("SU_EMAIL", "admin@example.com")
User.objects.filter(username=SU_USER).exists() or \
    User.objects.create_superuser(SU_USER, SU_EMAIL, SU_PWD)
EOF

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