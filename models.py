import xml.etree.ElementTree as ET


def read_model(model, parent: ET.Element):
    return [model.parsed(item) for item in parent.findall(model.selector)]


class IModel:
    selector: str

    @staticmethod
    def parsed(item: ET.Element):
        pass


class Nd(IModel):
    selector = "nd"

    def __init__(self, ref: int):
        self.ref = ref

    @staticmethod
    def parsed(item):
        return Nd(
            int(item.attrib["ref"]),
        )


class Tag(IModel):
    selector = "tag"

    def __init__(self, k: str, v: str):
        self.k = k
        self.v = v

    @staticmethod
    def parsed(item):
        return Tag(
            str(item.attrib["v"]),
            str(item.attrib["k"]),
        )


class Node(IModel):
    selector = "node"

    def __init__(
        self, id: int, visible: bool, lat: float, lon: float, tags: list[Tag] = []
    ):
        self.id = id
        self.visible = visible
        self.lat = lat
        self.lon = lon
        self.tags = tags

    @staticmethod
    def parsed(item):
        return Node(
            int(item.attrib["id"]),
            item.attrib["visible"] == "true",
            float(item.attrib["lat"]),
            float(item.attrib["lon"]),
            read_model(Tag, item),
        )


class Way(IModel):
    selector = "way"

    def __init__(
        self,
        id: int,
        visible: bool,
        nds: list[Nd] = [],
        tags: list[Tag] = [],
        nodes: list[Node] = [],
    ):
        self.id = id
        self.visible = visible
        self.nds = nds
        self.tags = tags
        self.nodes = nodes

    @staticmethod
    def parsed(item):
        return Way(
            int(item.attrib["id"]),
            item.attrib["visible"] == "true",
            read_model(Nd, item),
        )


class Bounds:
    selector = "bounds"

    def __init__(self, max_lat, min_lat, max_lon, min_lon):
        self.max_lat = max_lat
        self.min_lat = min_lat
        self.max_lon = max_lon
        self.min_lon = min_lon

    @staticmethod
    def parsed(item):
        return Bounds(
            float(item.attrib["maxlat"]),
            float(item.attrib["minlat"]),
            float(item.attrib["maxlon"]),
            float(item.attrib["minlon"]),
        )


class Member(IModel):
    selector = "member"

    def __init__(self, type: str, ref: int, role: str):
        self.type = type
        self.ref = ref
        self.role = role

    @staticmethod
    def parsed(item: ET.Element):
        return Member(
            str(item.attrib["type"]),
            int(item.attrib["ref"]),
            str(item.attrib["role"]),
        )


class Relation(IModel):
    selector = "relation"

    def __init__(
        self,
        id: int,
        visible: bool,
        members: list[Member],
        nodes: list[Node] = [],
        ways: list[Way] = [],
    ):
        self.id = id
        self.visible = visible
        self.members = members

        self.nodes = nodes
        self.ways = ways

    @staticmethod
    def parsed(item: ET.Element):
        return Relation(
            int(item.attrib["id"]),
            item.attrib["visible"] == "true",
            read_model(Member, item),
        )
