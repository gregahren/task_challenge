#!/usr/bin/env bash
python manage.py db upgrade
gunicorn --bind 0.0.0.0:5000 manage:app