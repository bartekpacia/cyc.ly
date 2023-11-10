from pydantic import BaseModel, Field


class UserCreateSchema(BaseModel):
    email: str = Field(description="Use Email")


class UserSchema(BaseModel):
    id: int = Field(description="User id")
    email: str = Field(description="Use Email")

    class Config:
        from_attributes = True
