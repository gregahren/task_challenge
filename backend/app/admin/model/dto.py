from flask_restplus import fields, Namespace


class AuthDto:
    ns = Namespace('auth', description='Authentication related operations')
    user_auth = ns.model('auth_details', {
        'email': fields.String(required=True, description='Email address',
                               pattern='^(\w|\.|\_|\-)+[@](\w|\_|\-|\.)+[.]\w{2,3}$'),
        'password': fields.String(required=True, description='User password', min_length=6),
    })


class UserDto:
    """
    User serialization object
    """
    ns = Namespace('user', description='User related operations')
    user = ns.model('user_detail', {
        'email': fields.String(required=True, description='Users email address'),
        'name': fields.String(required=True, description='Users full name'),
        'password': fields.String(required=True, description='Users password')
    })
