from langchain_community.chat_models import ChatOpenAI
from langchain.agents import AgentType, initialize_agent
from langchain.embeddings import OpenAIEmbeddings
from app.utils.config import Config
from .tools import ToolFactory
from langchain_community.vectorstores import Qdrant
from qdrant_client import QdrantClient


class CodeAgent:
    def __init__(self):
        Config.validate()
        self.llm = ChatOpenAI(model="gpt-4", temperature=0)
        self.embeddings = OpenAIEmbeddings()
        self.qdrant_client = QdrantClient(
            url=Config.QDRANT_URL,
            api_key=Config.QDRANT_API_KEY
        )

        self.db = Qdrant(
            client=self.qdrant_client,
            collection_name=Config.QDRANT_COLLECTION_NAME,  # type: ignore
            embeddings=self.embeddings
        )

        self.retriever = self.db.as_retriever()
        self.tools = ToolFactory(self.llm, self.retriever)
        self.agent = self.initialize()

    def initialize(self):
        tools = [self.tools.get_code_qa_tool(), self.tools.get_rfc_tool()]
        return initialize_agent(
            tools=tools,
            llm=self.llm,
            agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
            verbose=True
        )
    
    def run(self, prompt: str):
        return self.agent.run(prompt)