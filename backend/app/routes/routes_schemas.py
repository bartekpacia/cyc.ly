from pydantic import BaseModel, Field
from enum import Enum


class BikeType(str, Enum):
    ROAD = "Road"
    BMX = "BMX"
    MOUNTAIN = "Mountain"
    RECUMBENT = "Recumbent"
    GRAVEL = "Gravel"


class Coords(BaseModel):
    lat: float = Field(description="Use Latitude")
    lon: float = Field(description="Use Longitude")


class CreateRouteBodyDTO(BaseModel):
    bike_type: BikeType = Field(description="Bike Type")
    start_point: Coords = Field(description="Use Start Point")
    distance: float = Field(
        description="Path Distance",
    )


class Route(BaseModel):
    # id: int = Field(description="Route id")
    points: list[Coords] = Field(description="Route points")
