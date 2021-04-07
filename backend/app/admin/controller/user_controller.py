from flask import request
from flask_restplus import Resource

from app.admin.model.dto import UserDto
from app.admin.service.user_service import get_all_users, save_new_user, get_user
from app.admin.util.decorators import auth_required

ns = UserDto.ns
_user = UserDto.user


@ns.route('/')
@ns.response(401, "Provide a valid auth token.")
class UserList(Resource):
    @ns.doc('Get all users')
    @ns.marshal_list_with(_user, envelope='data')
    @auth_required
    def get(self):
        """List all registered users"""
        return get_all_users()

    @ns.response(201, 'User successfully created.')
    @ns.doc('Create a user')
    @ns.doc(security=None)
    @ns.expect(_user, validate=True)
    def post(self):
        """Creates a new User """
        data = request.json
        return save_new_user(data=data)


@ns.route('/<id>')
@ns.param('id', 'The User identifier')
@ns.response(404, 'User not found.')
@ns.response(401, "Provide a valid auth token.")
class User(Resource):
    @ns.doc('Get user')
    @ns.marshal_with(_user)
    def get(self, id):
        """get a user given its identifier"""
        user = get_user(id)
        if not user:
            ns.abort(404)
        else:
            return user
