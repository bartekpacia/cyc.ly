from fastapi import APIRouter

paths_router = APIRouter(prefix="/paths", tags=["paths"])


@paths_router.get("/")
async def read_users():
    return [{"hehe": "Losowa ścieka"}]
