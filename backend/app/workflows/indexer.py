from langchain_community.document_loaders import TextLoader, DirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from qdrant_client import QdrantClient
from langchain_community.vectorstores import Qdrant
from app.services.repo_loader import GithubRepoLoader
from app.services.github_service import GithubService
from ..utils.config import Config

Config.validate()

class CodebaseIndexer:
    def __init__(self):
        self.embeddings = OpenAIEmbeddings()
        self.qdrant_client = QdrantClient(
            url=Config.QDRANT_URL,
            api_key=Config.QDRANT_API_KEY
        )
    
    async def index_repo(self, owner: str, repo: str, branch: str = 'main'):
        service = GithubService()
        loader = GithubRepoLoader(service)
        docs = await loader.load_repo_as_documents(owner, repo, branch)
        print(f"Loaded {len(docs)} documents from {owner}/{repo}")
        splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
        chunks = splitter.split_documents(docs)

        vectorstore = Qdrant.from_documents(
            documents=chunks,
            embedding=self.embeddings,
            collection_name=Config.QDRANT_COLLECTION_NAME,
            client=self.qdrant_client
        )
        print(f"Indexed {len(chunks)} chunks for {owner}/{repo} into {Config.QDRANT_COLLECTION_NAME}")
        return vectorstore
    
