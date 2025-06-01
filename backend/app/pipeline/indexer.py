from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings.openai import OpenAIEmbeddings
from qdrant_client import QdrantClient
from qdrant_client.http import models as rest
from langchain_community.vectorstores import Qdrant
from langchain.schema import Document
from app.pipeline.github_service import GithubService
from ..utils.config import Config
import logging
from typing import List, Optional

Config.validate()

logger = logging.getLogger(__name__)

class CodebaseIndexer:
    def __init__(self):
        try:
            if not Config.QDRANT_URL or not Config.QDRANT_API_KEY:
                raise ValueError("QDRANT_URL and QDRANT_API_KEY must be set")
                
            self.client = QdrantClient(
                url=Config.QDRANT_URL,
                api_key=Config.QDRANT_API_KEY
            )
            self.collection_name = Config.QDRANT_COLLECTION_NAME

            self.embeddings = OpenAIEmbeddings()
            self.text_splitter = RecursiveCharacterTextSplitter(
                chunk_size=800, 
                chunk_overlap=100
            )

            self._init_qdrant()
        except Exception as e:
            logger.error(f"Failed to initialize CodebaseIndexer: {str(e)}")
            raise

    def _init_qdrant(self) -> None:
        try:
            collections = self.client.get_collections().collections
            if not self.collection_name:
                raise ValueError("QDRANT_COLLECTION_NAME must be set")
                
            if self.collection_name not in [col.name for col in collections]:
                self.client.create_collection(
                    collection_name=self.collection_name,
                    vectors_config=rest.VectorParams(
                        size=1536,  # OpenAI embedding size
                        distance=rest.Distance.COSINE
                    )
                )
                logger.info(f"Created new collection: {self.collection_name}")
        except Exception as e:
            logger.error(f"Failed to initialize Qdrant collection: {str(e)}")
            raise

    async def index_repository(self, owner: str, repo: str, branch: str) -> None:
        try:
            service = GithubService()
            
            # Get repository structure
            try:
                file_tree = await service.get_repository_stucture(owner, repo, branch)
            except Exception as e:
                logger.error(f"Failed to get repository structure for {owner}/{repo}: {str(e)}")
                raise

            # Filter and process files
            paths = [
                f["path"] for f in file_tree 
                if f["path"].endswith(('.py', '.js', '.ts', '.tsx', '.go', '.java', '.cpp', '.c', '.rs'))
            ]
            
            if not paths:
                logger.warning(f"No supported files found in {owner}/{repo}")
                return

            # Get file contents
            try:
                files = await service.get_multiple_files(owner, repo, paths, branch)
            except Exception as e:
                logger.error(f"Failed to get file contents for {owner}/{repo}: {str(e)}")
                raise

            # Process documents
            documents: List[Document] = []
            for f in files:
                if f.content:
                    try:
                        documents.append(Document(
                            page_content=f.content,
                            metadata={"path": f.path}
                        ))
                    except Exception as e:
                        logger.warning(f"Failed to process file {f.path}: {str(e)}")
                        continue

            if not documents:
                logger.warning(f"No valid documents found to index from {owner}/{repo}")
                return

            # Split and index documents
            try:
                chunks = self.text_splitter.split_documents(documents)
                Qdrant.from_documents(
                    documents=chunks,
                    embedding=self.embeddings,
                    collection_name=self.collection_name,
                    client=self.client
                )
                logger.info(f"Successfully indexed {len(chunks)} chunks from {owner}/{repo}")
            except Exception as e:
                logger.error(f"Failed to index documents for {owner}/{repo}: {str(e)}")
                raise

        except Exception as e:
            logger.error(f"Failed to index repository {owner}/{repo}: {str(e)}")
            raise
    
