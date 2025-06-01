from qdrant_client import QdrantClient
from qdrant_client.http.models import Distance, VectorParams
from app.utils.config import Config
import logging
from typing import Optional

Config.validate()
logger = logging.getLogger(__name__)

def get_qdrant_client() -> QdrantClient:
    try:
        if not Config.QDRANT_URL or not Config.QDRANT_API_KEY:
            raise ValueError("QDRANT_URL and QDRANT_API_KEY must be set")
            
        client = QdrantClient(
            url=Config.QDRANT_URL,
            api_key=Config.QDRANT_API_KEY,
        )
        return client
    except Exception as e:
        logger.error(f"Failed to initialize Qdrant client: {str(e)}")
        raise

def init_collection(client: QdrantClient, collection_name: str) -> None:
    try:
        vector_length = 1536  # OpenAI embedding size
        collections = client.get_collections().collections
        
        if collection_name not in [col.name for col in collections]:
            client.create_collection(
                collection_name=collection_name,
                vectors_config=VectorParams(
                    size=vector_length,
                    distance=Distance.COSINE
                )
            )
            logger.info(f"Created new collection: {collection_name}")
        else:
            logger.info(f"Collection {collection_name} already exists")
    except Exception as e:
        logger.error(f"Failed to initialize collection {collection_name}: {str(e)}")
        raise

# Initialize client and collection
try:
    qdrant_client = get_qdrant_client()
    if Config.QDRANT_COLLECTION_NAME:
        init_collection(qdrant_client, Config.QDRANT_COLLECTION_NAME)
    else:
        raise ValueError("QDRANT_COLLECTION_NAME must be set")
except Exception as e:
    logger.error(f"Failed to initialize Qdrant: {str(e)}")
    raise