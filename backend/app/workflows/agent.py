from langchain_community.chat_models import ChatOpenAI
from langchain.vectorstores import Chroma
from langchain.agents import AgentType, initialize_agent
from langchain.embeddings import OpenAIEmbeddings
from app.workflows.config import Config
from .tools import ToolFactory

Config.validate()

class CodeAgent:
    def __init__(self, owner: str, repo: str, branch: str = 'main'):
        self.llm = ChatOpenAI(model="gpt-4", temperature=0)
        self.embeddings = OpenAIEmbeddings()
        self.db = Chroma(persist_directory=Config.VECTOR_STORE_PATH, embedding_function=self.embeddings)
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