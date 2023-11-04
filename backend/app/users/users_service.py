from typing import Annotated

from sqlalchemy.orm import Session

from app.core.models.user import User

from .users_schemas import UserCreateSchema


def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()


def create_user(db: Session, payload: UserCreateSchema):
    db_user = User(email=payload.email)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
