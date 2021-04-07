import os

postgres_db = os.getenv('DATABASE_URL', None)

basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    SECRET_KEY = os.getenv('SECRET_KEY', 'my_precious_secret_key')
    SQLALCHEMY_DATABASE_URI = postgres_db
    DEBUG = False


class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_TRACK_MODIFICATIONS = False


config_by_name = dict(
    dev=DevelopmentConfig,
    prod=Config
)

key = Config.SECRET_KEY
