from .routes_schemas import CreateRouteBodyDTO, Route, Coords
from .mock import mock_data

from datetime import datetime


class RouteService:
    def create_route(self, body: CreateRouteBodyDTO):
        return Route(
            points=[Coords(lat=coord[0], lon=coord[1]) for coord in mock_data],
            bike_type=body.bike_type,
            distance=body.distance,
            created_at=datetime.now().strftime("%d/%m/%Y %H:%M:%S"),
        )


route_service = RouteService()
