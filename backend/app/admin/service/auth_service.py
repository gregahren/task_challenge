from app import api
from app.admin.model.user import User


class Auth:
    @staticmethod
    def login_user(data):
        try:
            # fetch the user data
            user = User.query.filter_by(email=data.get('email')).first()
            if user and user.check_password(data.get('password')):
                auth_token = user.encode_auth_token(user.id)
                if auth_token:
                    return {
                        'status': True,
                        'message': 'Successfully logged in.',
                        'token': auth_token,
                        'name': user.name
                    }, 200
            else:
                return {
                    'status': False,
                    'message': 'Email or password does not match.'
                }, 401

        except Exception as e:
            print(e)
            response_object = {
                'status': False,
                'message': 'User not found'
            }
            return response_object, 500

    @staticmethod
    def logout_user(data):
        if data:
            auth_token = data.split(" ")[1]
        else:
            auth_token = ''
        if auth_token:
            resp = User.decode_auth_token(auth_token)
            if not isinstance(resp, str):
                return {
                    'status': True,
                    'message': 'Successfully logged out.'
                }, 200
            else:
                api.abort(401, message="Provide a valid auth token.")
        else:
            api.abort(401, message="Provide a valid auth token.")

    @staticmethod
    def get_logged_in_user(new_request):
        # get the auth token
        auth_token = new_request.headers.get('Authorization')
        if auth_token:
            resp = User.decode_auth_token(auth_token)
            if not isinstance(resp, str):
                user = User.query.filter_by(id=resp).first()
                return {
                    'status': True,
                    'data': {
                        'user_id': user.id,
                        'email': user.email,
                        'name': user.name,
                        'created_at': str(user.created_at)
                    }
                }, 200

            api.abort(401, message="Provide a valid auth token.")
        else:
            api.abort(401, message="Provide a valid auth token.")
