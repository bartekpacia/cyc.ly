from .routes_schemas import CreateRouteBodyDTO, Route, Coords

from time import time
from .route_finder import RouteFinder


class RouteService:
    def __init__(self):
        print("start creating RouteFinder")
        self.rf = RouteFinder(
            # kwargs w konstruktorze (z wartościami domyślnymi):
            pos=(
                50.291100737108025,
                18.680043199195698,
            ),  # Pozycja, z której pobiera mapę osm-> ta pozycja jest od razu ustawiana jako startowa dla algorytmu
            dist=10000,  # Promień, z którego pobiera mapę (środek to 'pos')
            bike_type="Recumbent",  # Rodzaj roweru-> rodzaj roweru jest kluczem w 'bike_types.yaml', w którym każdemu są przypisane wagi do rodzajów nawoierzchni
        )
        print("end creating RouteFinder")

    def create_route(self, body: CreateRouteBodyDTO):
        self.rf.bike_type = body.bike_type
        lat = body.start_point.lat
        lon = body.start_point.lon
        start = self.rf.nearest_nodes(pos=(lat, lon))
        path, total_distance = self.rf.make_route(
            distance=body.distance, start=start, divisions=4
        )
        path_cords = self.rf.nodes_to_cords(path)
        return Route(
            points=[Coords(lat=coord[0], lon=coord[1]) for coord in path_cords],
            bike_type=body.bike_type,
            distance=total_distance,
            created_at=time() * 1000,
        )


route_service = RouteService()
