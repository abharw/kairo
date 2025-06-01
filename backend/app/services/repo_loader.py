from typing import List
from .github_service import GithubService
from app.models.repository import Repository, FileContent
from langchain_core.documents import Document
import mimetypes

class GithubRepoLoader:
    def __init__(self, service: GithubService):
        self.service = service

    async def load_repo_as_documents(self, owner: str, repo: str, branch: str = 'main') -> List[Document]:
        structure = await self.service.get_repository_stucture(owner, repo, branch)
        # Filter code files
        code_files = [
            file for file in structure 
            if not file['path'].endswith(('.png', '.jpg', '.jpeg', '.gif', '.exe', '.dll', '.zip'))
                and (mimetypes.guess_type(file['path'])[0] or '').startswith('text/')
        ]

        # Limit to files under 50KB
        paths = [file['path'] for file in code_files if file['size'] < 50000]

        file_contents: List[FileContent] = await self.service.get_multiple_files(owner, repo, paths, branch)

        return [
            Document(
                page_content=file.content,
                metadata={ 'source': file.path }
            )
            for file in file_contents if file.content.strip()
        ]