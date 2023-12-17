from fastapi import APIRouter, Body

from .routes_schemas import CreateRouteBodyDTO, Route
from .routes_service import route_service

routes_router = APIRouter(prefix="/routes", tags=["paths"])


@routes_router.post("/", response_model=Route)
async def create_route(body: CreateRouteBodyDTO = Body(...)):
    return route_service.create_route(body)
