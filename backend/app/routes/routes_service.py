from core.models.user import User
from .routes_schemas import CreateRouteBodyDTO, Route, Coords


class RouteService:
    def create_route(self, body: CreateRouteBodyDTO):
        return Route(points=[Coords(lat=1, lon=2), Coords(lat=3, lon=4)])


route_service = RouteService()
