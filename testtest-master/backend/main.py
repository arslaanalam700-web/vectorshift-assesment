from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from collections import defaultdict, deque

app = FastAPI()

origins = [
    "http://localhost:3000",   # React
    "http://127.0.0.1:3000",
    "http://localhost:5173",   # Vite
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

class Node(BaseModel):
    id: str


class Edge(BaseModel):
    source: str
    target: str


class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]


def is_dag(nodes, edges):
    graph = defaultdict(list)
    indegree = {node.id: 0 for node in nodes}
    node_ids = set(indegree.keys())

    for edge in edges:
        node_ids.add(edge.source)
        node_ids.add(edge.target)
        indegree.setdefault(edge.source, 0)
        indegree.setdefault(edge.target, 0)
        graph[edge.source].append(edge.target)
        indegree[edge.target] += 1

    queue = deque([node_id for node_id, degree in indegree.items() if degree == 0])

    visited = 0

    while queue:
        current = queue.popleft()
        visited += 1

        for neighbour in graph[current]:
            indegree[neighbour] -= 1
            if indegree[neighbour] == 0:
                queue.append(neighbour)

    return visited == len(node_ids)


@app.post("/pipelines/parse")
def parse_pipeline(pipeline: Pipeline):
    return {
        "num_nodes": len(pipeline.nodes),
        "num_edges": len(pipeline.edges),
        "is_dag": is_dag(pipeline.nodes, pipeline.edges),
    }
