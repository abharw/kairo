from typing import TypedDict
from langchain_core.runnables import Runnable
from langchain_core.vectorstores import VectorStoreRetriever
from langchain.chains import RetrievalQA
from langchain_openai import ChatOpenAI

class GraphState(TypedDict):
    question: str
    answer: str

class QAStreamingNode:
    def __init__(self, vector_store_retriever: VectorStoreRetriever):
        self.qa_chain = RetrievalQA.from_chain_type(
            llm=ChatOpenAI(streaming=True),
            retriever=vector_store_retriever,
            return_source_documents=True
        )

    def __call__(self, state: GraphState) -> GraphState:
        response = self.qa_chain.invoke(state["question"])
        return {
           "question": state["question"],
           "answer": response["answer"],
        }
    
    