from flask import request
from flask_restplus import Resource

from app import api
from app.admin.model.dto import AuthDto
from app.admin.model.user import User
from app.admin.service.auth_service import Auth

ns = AuthDto.ns
user_auth = AuthDto.user_auth


@ns.route('/login')
class UserLogin(Resource):
    """
        User Login Resource
    """
    @ns.doc('User login')
    @ns.doc(security=None)
    @ns.expect(user_auth, validate=True)
    def post(self):
        # get the post data
        post_data = request.json
        return Auth.login_user(data=post_data)


@ns.route('/logout')
@ns.response(401, "Provide a valid auth token.")
class Logout(Resource):
    """
    Logout Resource
    """
    @ns.doc('logout a user')
    def post(self):
        # get auth token
        auth_header = request.headers.get('Authorization')
        return Auth.logout_user(data=auth_header)

    @staticmethod
    def get_logged_in_user(new_request):
        # get the auth token
        auth_token = new_request.headers.get('Authorization')
        if auth_token:
            resp = User.decode_auth_token(auth_token)
            if not isinstance(resp, str):
                user = User.query.filter_by(id=resp).first()
                response_object = {
                    'status': True,
                    'data': {
                        'user_id': user.id,
                        'email': user.email,
                        'admin': user.admin,
                        'registered_on': str(user.registered_on)
                    }
                }
                return response_object, 200
            api.abort(401, message="Provide a valid auth token.")
        else:
            api.abort(401, message="Provide a valid auth token.")
