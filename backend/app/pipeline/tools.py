from langchain.agents import Tool 
from langchain.chains import RetrievalQA
from langchain.schema import BaseRetriever
from langchain.schema.language_model import BaseLanguageModel
import logging
from typing import Optional
import os

logger = logging.getLogger(__name__)

class ToolFactory:
    def __init__(self, llm: BaseLanguageModel, retriever: BaseRetriever):
        self.llm = llm
        self.retriever = retriever

    def get_code_qa_tool(self) -> Tool:
        try:
            qa_chain = RetrievalQA.from_chain_type(
                llm=self.llm,
                retriever=self.retriever
            )
            return Tool(
                name="Code QA",
                func=qa_chain.run,
                description="Use this tool to answer questions about the codebase. Ask about architecture, modules, or functionality"
            )
        except Exception as e:
            logger.error(f"Failed to create Code QA tool: {str(e)}")
            raise

    def get_rfc_tool(self) -> Tool:
        def rfc_writer(prompt: str) -> str:
            try:
                prompt_path = os.path.join("app", "prompts", "test.txt")
                if not os.path.exists(prompt_path):
                    raise FileNotFoundError(f"RFC template not found at {prompt_path}")
                
                with open(prompt_path, "r") as f:
                    template = f.read()
                formatted_prompt = template.format(prompt=prompt)
                return self.llm.predict(text=formatted_prompt)
            except Exception as e:
                logger.error(f"Failed to generate RFC: {str(e)}")
                raise
        
        return Tool(
            name="RFC Writer",
            func=rfc_writer,
            description="Use this tool to generate RFC documents for proposed changes or features."
        )
    