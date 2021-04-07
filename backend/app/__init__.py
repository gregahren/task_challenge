from flask_bcrypt import Bcrypt
from flask_restplus import Api
from flask import Blueprint, Flask
from flask_sqlalchemy import SQLAlchemy
from config import config_by_name

db = SQLAlchemy()
flask_bcrypt = Bcrypt()


def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config_by_name.get(config_name))
    db.init_app(app)
    flask_bcrypt.init_app(app)
    return app


blueprint = Blueprint('api', __name__)


@blueprint.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response


authorizations = {
    'Bearer Auth': {
        'type': 'apiKey',
        'in': 'header',
        'name': 'Authorization'
    },
}

api = Api(blueprint,
          title='Api documentation tasks',
          version='1.0',
          description='',
          security='Bearer Auth',
          authorizations=authorizations
          )

from .admin.controller.user_controller import ns as user_ns
from .admin.controller.auth_controller import ns as auth_ns
from .tasks.controller.task_controller import ns as task_ns

api.add_namespace(auth_ns)
api.add_namespace(user_ns, path='/user')
api.add_namespace(task_ns, path='/task')
