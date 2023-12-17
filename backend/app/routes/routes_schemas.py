from pydantic import BaseModel, Field
from enum import Enum


class BikeType(str, Enum):
    Road = "Road"
    BMX = "BMX"
    Mountain = "Mountain"
    Recumbent = "Recumbent"
    Gravel = "Gravel"


class Coords(BaseModel):
    lat: float = Field(description="Use Latitude")
    lon: float = Field(description="Use Longitude")


class CreateRouteDTO(BaseModel):
    bike_type: BikeType = Field(description="Bike Type")
    start_point: Coords = Field(description="Use Start Point")
    distance: float = Field(description="Path Distance")


class RouteDTO(BaseModel):
    # id: int = Field(description="Route id")
    bike_type: BikeType = Field(description="Bike Type")
    start_point: Coords = Field(description="Use Start Point")
    distance: float = Field(description="Path Distance")
