from models import Way, IModel, Node, Nd, read_model, Bounds, Relation
import xml.etree.ElementTree as ET


class OSMParser:
    def __init__(self, filename: str):
        self.root = ET.parse(filename).getroot()

        # wczytanie wszystkiego
        self.ways: list[Way] = read_model(Way, self.root)
        self.nodes: list[Node] = read_model(Node, self.root)
        self.relations: list[Relation] = read_model(Relation, self.root)

    def get_bounds(self):
        return read_model(Bounds, self.root)[0]

    def get_node(self, id: int):
        try:
            node = next(node for node in self.nodes if node.id == id)
            return node
        except:
            return None

    def get_way(self, id: int):
        try:
            way = next(way for way in self.ways if way.id == id)

            way.nodes = [self.get_node(nd.ref) for nd in way.nds]

            return way
        except:
            return None

    def get_relation(self, id: int):
        try:
            relation = next(
                relation for relation in self.relations if relation.id == id
            )
            return relation
        except:
            return None
