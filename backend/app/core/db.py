from sqlalchemy import create_engine, MetaData
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from core.config import config

engine = create_engine(config.db_url())
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
sql_meta = MetaData()


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


Base = declarative_base()
