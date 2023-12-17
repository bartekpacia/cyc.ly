from fastapi import APIRouter, Body

from .routes_schemas import CreateRouteDTO, RouteDTO
from .routes_service import route_service

routes_router = APIRouter(prefix="/routes", tags=["paths"])


@routes_router.get("/", response_model=RouteDTO)
async def create_route(body=Body(CreateRouteDTO)):
    return
