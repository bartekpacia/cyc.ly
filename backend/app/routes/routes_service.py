from core.models.user import User
from .routes_schemas import CreateRouteDTO, RouteDTO, Coords


class RouteService:
    def create_route(self, data: CreateRouteDTO):
        return RouteDTO(points=[Coords(lat=1, lon=2), Coords(lat=3, lon=4)])


route_service = RouteService()
