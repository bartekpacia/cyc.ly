# type: ignore
from pydantic_settings import BaseSettings
import os


class Config(BaseSettings):
    APP_HOST: str = "0.0.0.0"
    APP_PORT: int = 8000
    DB_URL: str = f"sqlite:///./sql_app.db"


class LocalConfig(Config):
    ENV: str = "development"
    DEBUG: bool = True
    DB_URL: str = f"sqlite:///./sql_app.db"


class ProductionConfig(Config):
    DEBUG: bool = False
    # DB_URL: str = f"mysql+aiomysql://fastapi:fastapi@localhost:3306/prod"


def get_config():
    env = os.getenv("ENV", "local")
    config_type = {
        "local": LocalConfig(),
        "prod": ProductionConfig(),
    }
    return config_type[env]


config: Config = get_config()
