from pydantic_settings import BaseSettings
import os


class Config(BaseSettings):
    # APP_HOST: str = "0.0.0.0"
    # APP_PORT: int = 8000
    DATABASE_HOST: str
    DATABASE_USER: str
    DATABASE_PASSWORD: str
    DATABASE_NAME: str

    def db_url(self) -> str:
        return f"mysql+mysqlconnector://{self.DATABASE_USER}:{self.DATABASE_PASSWORD}@{self.DATABASE_HOST}:3306/{self.DATABASE_NAME}"


def get_config():
    dbHost = os.getenv("DATABASE_HOST")
    if not dbHost:
        raise Exception("DATABASE_HOST is not set")

    dbUser = os.getenv("DATABASE_USER")
    if not dbUser:
        raise Exception("DATABASE_USER is not set")
    
    dbPassword = os.getenv("DATABASE_PASSWORD")
    if not dbPassword:
        raise Exception("DATABASE_PASSWORD is not set")
    
    dbName = os.getenv("DATABASE_NAME")
    if not dbName:
        raise Exception("DATABASE_NAME is not set")

    return Config(
        DATABASE_HOST = dbHost,
        DATABASE_USER = dbUser,
        DATABASE_PASSWORD = dbPassword,
        DATABASE_NAME = dbName,
    )


config: Config = get_config()
