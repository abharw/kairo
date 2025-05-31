from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime

class Repository(BaseModel):
    name: str
    full_name: str
    description: Optional[str] = None
    language: Optional[str] = None
    stars: int = 0
    forks: int = 0
    size: int = 0 
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    clone_url: str
    topics: List[str] = [] 

class FileContent(BaseModel):
    path: str 
    content: str 
    size: int 
    type: str 
    sha: Optional[str] = None
    encoding: str = "utf-8"
