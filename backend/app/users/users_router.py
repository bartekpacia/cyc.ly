from fastapi import APIRouter, Depends

from app.core.db import get_db

from .users_schemas import UserSchema, UserCreateSchema
from .users_service import *

users_router = APIRouter(prefix="/users", tags=["users"])


@users_router.get("/{id}", response_model=UserSchema)
async def read_user(id: int, db: Session = Depends(get_db)):
    return get_user(db, id)


@users_router.post("/")
async def read_users(payload: UserCreateSchema, db: Session = Depends(get_db)):
    return create_user(db, payload)
