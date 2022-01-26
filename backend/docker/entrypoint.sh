#!/bin/sh

if [ "$DATABASE" = "postgres" ]
then
    echo "Waiting for postgres..."

    while ! nc -z $SQL_HOST $SQL_PORT; do
      sleep 0.1
    done

    echo "PostgreSQL started"
fi

# /home/django/venv/bin/python manage.py flush --no-input
# /home/django/venv/bin/python manage.py migrate

#Or
# $ docker-compose exec web python manage.py flush --no-input
# $ docker-compose exec web python manage.py migrate

exec "$@"
