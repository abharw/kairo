import os
import requests 
from github import Github
from github.GithubException import GithubException, RateLimitExceededException
from dotenv import load_dotenv
from typing import List, Dict, Any, Optional
from app.pipeline.models import Repository, FileContent
import logging
import asyncio
from tenacity import retry, stop_after_attempt, wait_exponential, retry_if_exception_type

load_dotenv()
logger = logging.getLogger(__name__)

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

    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=4, max=10),
        retry=retry_if_exception_type((GithubException, requests.exceptions.RequestException))
    )
    async def get_repository_info(self, owner: str, repo: str) -> Repository:
        try:
            github_repo = self.github_client.get_repo(f"{owner}/{repo}")
            return Repository(
                name=github_repo.name,
                full_name=github_repo.full_name,
                description=github_repo.description,
                language=github_repo.language,
                stars=github_repo.stargazers_count,
                clone_url=github_repo.clone_url
            )
        except RateLimitExceededException as e:
            logger.error(f"GitHub rate limit exceeded: {str(e)}")
            raise
        except GithubException as e:
            logger.error(f"GitHub API error for {owner}/{repo}: {str(e)}")
            raise
        except Exception as e:
            logger.error(f"Unexpected error getting repository info for {owner}/{repo}: {str(e)}")
            raise

    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=4, max=10),
        retry=retry_if_exception_type((GithubException, requests.exceptions.RequestException))
    )
    async def get_repository_stucture(self, owner: str, repo: str, branch: str) -> List[Dict[str, Any]]:
        try:
            url = f"https://api.github.com/repos/{owner}/{repo}/git/trees/{branch}?recursive=1"
            response = requests.get(url, headers=self.headers)
            response.raise_for_status()
            file_tree = response.json()['tree']
            return [
                {
                    'path': item['path'],
                    'size': item['size']
                }
                for item in file_tree 
                if item['type'] == 'blob'
            ]
        except requests.exceptions.RequestException as e:
            logger.error(f"Request error getting repository structure for {owner}/{repo}: {str(e)}")
            raise
        except Exception as e:
            logger.error(f"Unexpected error getting repository structure for {owner}/{repo}: {str(e)}")
            raise

    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=4, max=10),
        retry=retry_if_exception_type((GithubException, requests.exceptions.RequestException))
    )
    async def get_file_content(self, owner: str, repo: str, path: str, branch: str) -> FileContent:
        try:
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
        except RateLimitExceededException as e:
            logger.error(f"GitHub rate limit exceeded: {str(e)}")
            raise
        except GithubException as e:
            logger.error(f"GitHub API error getting file content for {owner}/{repo}/{path}: {str(e)}")
            raise
        except Exception as e:
            logger.error(f"Unexpected error getting file content for {owner}/{repo}/{path}: {str(e)}")
            raise

    async def get_multiple_files(self, owner: str, repo: str, paths: List[str], branch: str) -> List[FileContent]:
        try:
            # Process files in smaller batches to avoid rate limits
            batch_size = 10
            all_files: List[FileContent] = []
            
            for i in range(0, len(paths), batch_size):
                batch_paths = paths[i:i + batch_size]
                tasks = [self.get_file_content(owner, repo, path, branch) for path in batch_paths]
                results = await asyncio.gather(*tasks, return_exceptions=True)
                
                # Filter out exceptions and convert to FileContent
                for result in results:
                    if isinstance(result, FileContent):
                        all_files.append(result)
                    elif isinstance(result, Exception):
                        logger.error(f"Error processing file: {str(result)}")
                
                # Add a small delay between batches to avoid rate limits
                if i + batch_size < len(paths):
                    await asyncio.sleep(1)
            
            return all_files
        except Exception as e:
            logger.error(f"Error getting multiple files for {owner}/{repo}: {str(e)}")
            raise

if __name__ == "__main__":
    import asyncio
    github_service = GithubService()
    async def main():
        # print(await github_service.get_repository_info("abharw", "taskflow-demo"))
        print(await github_service.get_repository_stucture("abharw", "taskflow-demo", "main"))
        # print(await github_service.get_file_content("abharw", "taskflow-demo", "README.md", "main"))
        # print(await github_service.get_multiple_files("abharw", "taskflow-demo", ["README.md", "CONTRIBUTING.md"], "main"))
    
    asyncio.run(main())