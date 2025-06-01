from langchain.agents import Tool 
from langchain.chains import RetrievalQA
from langchain.chat_models import ChatOpenAI

class ToolFactory:
    def __init__(self, llm, retriever):
        self.llm = llm
        self.retriever = retriever

    def get_code_qa_tool(self) -> Tool:
        qa_chain = RetrievalQA.from_chain_type(llm=self.llm, retriever=self.retriever)
        return Tool(
            name="Code QA",
            func=qa_chain.run,
            description="Use this tool to answer questions about the codebase. Ask about architecture, modules, or functionality"
        )
    
    def get_rfc_tool(self) -> Tool:
        def rfc_writer(prompt: str) -> str:
            with open("app/workflows/prompts/test.txt", "r") as f:
                template = f.read()
            formatted_prompt = template.format(prompt=prompt)
            return self.llm.predict(formatted_prompt)
        
        return Tool(
            name="RFC Writer",
            func=rfc_writer,
            description="Use this tool to generate RFC documents for proposed changes or features."
        )
    