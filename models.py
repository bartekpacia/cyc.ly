import xml.etree.ElementTree as ET
from dataclasses import dataclass, field
from typing import Self, Type


class IModel:
    selector: str = ""

    def parsed(self, item: ET.Element) -> Self:
        return self


def read_model(model: Type, parent: ET.Element) -> Type:
    return [model.parsed(item) for item in parent.findall(model.selector)]


@dataclass
class Nd(IModel):
    selector = "nd"
    ref: int

    @staticmethod
    def parsed(item):
        return Nd(
            int(item.attrib["ref"]),
        )


@dataclass
class Tag(IModel):
    k: str
    v: str
    selector = "tag"

    @staticmethod
    def parsed(item):
        return Tag(
            str(item.attrib["v"]),
            str(item.attrib["k"]),
        )


@dataclass
class Node(IModel):
    selector = "node"
    id: int
    visible: bool
    lat: float
    lon: float
    tags: list[Tag]

    @staticmethod
    def parsed(item):
        return Node(
            int(item.attrib["id"]),
            item.attrib["visible"] == "true",
            float(item.attrib["lat"]),
            float(item.attrib["lon"]),
            read_model(Tag, item),
        )


@dataclass
class Way(IModel):
    selector = "way"

    id: int
    visible: bool
    nds: list[Nd] = field(default_factory=list)

    tags: list[Tag] = field(default_factory=list)
    nodes: list[Node] = field(default_factory=list)

    @staticmethod
    def parsed(item):
        return Way(
            int(item.attrib["id"]),
            item.attrib["visible"] == "true",
            read_model(Nd.selector, item),
        )


@dataclass
class Bounds:
    selector = "bounds"
    max_lat: float
    min_lat: float
    max_lon: float
    min_lon: float

    @staticmethod
    def parsed(item):
        return Bounds(
            float(item.attrib["maxlat"]),
            float(item.attrib["minlat"]),
            float(item.attrib["maxlon"]),
            float(item.attrib["minlon"]),
        )


@dataclass
class Member(IModel):
    selector = "member"
    type: str
    ref: int
    role: str

    @staticmethod
    def parsed(item: ET.Element):
        return Member(
            str(item.attrib["type"]),
            int(item.attrib["ref"]),
            str(item.attrib["role"]),
        )


@dataclass
class Relation(IModel):
    selector = "relation"
    id: int
    visible: bool
    members: list[Member]
    tags: list[Tag]
    nodes: list[Node] = field(default_factory=list)
    ways: list[Way] = field(default_factory=list)

    @staticmethod
    def parsed(item: ET.Element):
        return Relation(
            int(item.attrib["id"]),
            item.attrib["visible"] == "true",
            read_model(Member, item),
            read_model(Tag, item),
        )
