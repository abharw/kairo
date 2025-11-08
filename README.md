# Kairo

AI-powered RFC and codebase intelligence platform for engineering teams. Index GitHub repositories, explore codebases semantically, and generate RFCs with context-aware AI.

## Features

- **Codebase Indexing**: Semantically index GitHub repositories using vector embeddings
- **Codebase Explorer**: Query your codebase with natural language questions
- **RFC Assistant**: Generate and manage RFCs with AI that understands your codebase
- **Graph-Based Pipeline**: LangGraph orchestration for complex query workflows

## Tech Stack

### Backend
- FastAPI
- LangChain & LangGraph
- Qdrant (vector database)
- OpenAI (embeddings & LLM)
- PyGithub

### Frontend
- Next.js 15
- React 18
- TypeScript
- Clerk (authentication)
- Tailwind CSS & shadcn/ui

## Setup

### Backend

1. Install dependencies:
```bash
cd backend
pip install -e .
```

2. Set environment variables in `.env`:
```
OPENAI_API_KEY=your_key
GITHUB_TOKEN=your_token
QDRANT_API_KEY=your_key
QDRANT_URL=your_url
QDRANT_COLLECTION_NAME=your_collection
```

3. Run the backend:
```bash
uvicorn app.main:app --reload
```

### Frontend

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Set up Clerk authentication (see Clerk docs for environment variables)

3. Run the development server:
```bash
npm run dev
```

## Usage

1. Index a repository using the `CodebaseIndexer`:
```python
indexer = CodebaseIndexer()
await indexer.index_repository("owner", "repo", "branch")
```

2. Query the indexed codebase using the graph pipeline:
```python
graph = build_graph(vectorstore.as_retriever())
result = await graph.ainvoke({"question": "How does authentication work?"})
```

## Project Structure

```
kairo/
├── backend/
│   └── app/
│       ├── main.py              # FastAPI application
│       ├── pipeline/            # Indexing and graph pipeline
│       └── utils/               # Configuration and utilities
└── frontend/
    ├── app/                     # Next.js app directory
    ├── components/              # React components
    └── lib/                     # Utilities and integrations
```

## Requirements

- Python 3.11+
- Node.js 18+
- Qdrant instance (cloud or local)
- OpenAI API key
- GitHub personal access token

