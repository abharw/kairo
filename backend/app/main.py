import asyncio
from app.pipeline.indexer import CodebaseIndexer
from app.pipeline.graph.graph_builder import build_graph
from app.pipeline.graph.nodes import GraphState
from app.pipeline.github_service import GithubService
from app.pipeline.models import Repository
from app.utils.config import Config
from langchain_community.vectorstores import Qdrant
from langchain_openai import OpenAIEmbeddings
from qdrant_client import QdrantClient

Config.validate()

async def main():
    if not Config.QDRANT_COLLECTION_NAME:
        raise ValueError("QDRANT_COLLECTION_NAME must be set")
        
    # Initialize indexer with remote Qdrant
    indexer = CodebaseIndexer()
    await indexer.index_repository("abharw", "taskflow-demo", "main")
    
    # Initialize vectorstore for querying
    vectorstore = Qdrant(
        collection_name=Config.QDRANT_COLLECTION_NAME,
        embeddings=OpenAIEmbeddings(),
        client=QdrantClient(
            url=Config.QDRANT_URL,
            api_key=Config.QDRANT_API_KEY
        )
    )
    
    # Build and run the graph
    graph = build_graph(vectorstore.as_retriever())
    question = "How does authentication work in the code?"
    result = await graph.ainvoke({"question": question})
    print(result["answer"])

if __name__ == "__main__":
    asyncio.run(main())