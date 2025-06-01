from langgraph.graph import StateGraph, END
from .nodes import QAStreamingNode, GraphState
from langchain_core.vectorstores import VectorStoreRetriever

def build_graph(vector_store_retriever: VectorStoreRetriever):
    builder = StateGraph(GraphState)
    qa_node = QAStreamingNode(vector_store_retriever)
    builder.add_node("qa", qa_node)
    builder.set_entry_point("qa")
    builder.add_edge("qa", END)
    return builder.compile()
