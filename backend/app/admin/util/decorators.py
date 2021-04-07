from functools import wraps

from flask import request

from app import api
from app.admin.service.auth_service import Auth


def auth_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):

        data, status = Auth.get_logged_in_user(request)
        user_data = data.get('data')
        kwargs['user'] = user_data

        if not user_data:
            api.abort(401, message="Provide a valid auth token.")
            return data, status

        return f(*args, **kwargs)

    return decorated
