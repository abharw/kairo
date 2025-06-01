from langchain_community.document_loaders import TextLoader, DirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma

from app.services.repo_loader import GithubRepoLoader
from app.services.github_service import GithubService
from .config import Config

Config.validate()

class CodebaseIndexer:
    def __init__(self, persist_dir = Config.VECTOR_STORE_PATH):
        self.persist_dir = persist_dir
        self.embeddings = OpenAIEmbeddings()
    
    async def index_repo(self, owner: str, repo: str, branch: str = 'main'):
        service = GithubService()
        loader = GithubRepoLoader(service)
        docs = await loader.load_repo_as_documents(owner, repo, branch)

        splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
        chunks = splitter.split_documents(docs)

        db = Chroma.from_documents(
            chunks,
            self.embeddings,
            collection_name=f"{owner}-{repo}",
            persist_directory=self.persist_dir
        )
        db.persist()
        print(f"Indexed {len(chunks)} chunks for {owner}/{repo}")
        return db
    
