import os
import requests 
from github import Github
from dotenv import load_dotenv
from typing import List, Dict, Any
from app.models.repository import Repository, FileContent


load_dotenv()

class GithubService:
    def __init__(self):
        self.github_token = os.getenv("GITHUB_TOKEN")
        if not self.github_token:
            raise ValueError("GITHUB_TOKEN is not set")
        self.github_client = Github(self.github_token)
        self.headers = {
            "Authorization": f"Bearer {self.github_token}",
            "Accept": "application/vnd.github.v3+json"
        }

    async def get_repository_info(self, owner: str, repo: str) -> Repository:
        github_repo = self.github_client.get_repo(f"{owner}/{repo}")
        return Repository(
            name=github_repo.name,
            full_name=github_repo.full_name,
            description=github_repo.description,
            language=github_repo.language,
            stars=github_repo.stargazers_count,
            clone_url=github_repo.clone_url
        )

    async def get_repository_stucture(self, owner: str, repo: str, branch: str) -> List[Dict[str, Any]]:
        url = f"https://api.github.com/repos/{owner}/{repo}/git/trees/{branch}?recursive=1"
        response = requests.get(url, headers=self.headers)
        response.raise_for_status()
        file_tree = response.json()['tree']
        print(file_tree)
        return [item for item in file_tree if item['type'] == 'blob']


    async def get_file_content(self, owner: str, repo: str, path: str, branch: str) -> FileContent:
        github_repo = self.github_client.get_repo(f"{owner}/{repo}")
        file_content = github_repo.get_contents(path, ref=branch)
        if isinstance(file_content, list):
            raise ValueError(f"Path {path} is a directory, not a file")
        return FileContent(
            path=path,
            content=file_content.decoded_content.decode('utf-8'),
            size=file_content.size,
            type=file_content.type,
        )
    
    async def get_multiple_files(self, owner: str, repo: str, paths: List[str], branch: str) -> List[FileContent]:
        import asyncio
        tasks = [self.get_file_content(owner, repo, path, branch) for path in paths]
        return await asyncio.gather(*tasks)
    
