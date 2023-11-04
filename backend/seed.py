from sqlalchemy.orm import Session

from app.core.db import Base, engine, get_db

from app.core.models import User

Base.metadata.drop_all(engine)
Base.metadata.create_all(engine)

db = next(get_db())


def seed_users():
    user1 = User(email="testuser@gmail.com")
    user2 = User(email="testuser2@gmail.com")

    db.add(user1)
    db.add(user2)

    db.commit()


seed_users()

print([model.email for model in db.query(User).all()])
db.close()
