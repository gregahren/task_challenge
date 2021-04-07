import datetime

from app import db
from app.admin.model.user import User


def save_new_user(data):
    # check if user already exists
    user = User.query.filter_by(email=data['email']).first()
    if not user:
        new_user = User(
            email=data['email'],
            name=data['name'],
            password=data['password'],
            created_at=datetime.datetime.utcnow()
        )
        save_changes(new_user)
        return generate_token(new_user)
    else:
        response_object = {
            'status': False,
            'message': 'User already exists. Please Log in.',
        }
        return response_object, 409


def get_all_users():
    return User.query.all()


def get_user(_id):
    return User.filter_by(id=_id).first()


def generate_token(user):
    try:
        # generate the auth token
        auth_token = user.encode_auth_token(user.id)
        return {
            'status': True,
            'message': 'Successfully registered.',
            'token': auth_token
        }, 201
    except Exception as e:
        return {
            'status': False,
            'message': 'Some error occurred. Please try again.'
        }, 401


def save_changes(data):
    db.session.add(data)
    db.session.commit()
