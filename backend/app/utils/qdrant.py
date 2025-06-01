from qdrant_client import QdrantClient
from qdrant_client.http.models import Distance, VectorParams
from app.utils.config import Config

Config.validate()

qdrant_client = QdrantClient(
    url=Config.QDRANT_URL, 
    api_key=Config.QDRANT_API_KEY,
)

collection_name = "code_embeddings"
vector_length = 384
collection = qdrant_client.create_collection(
    collection_name=collection_name,
    vectors_config=VectorParams(size=vector_length, distance=Distance.COSINE)
)

print(qdrant_client.get_collections())