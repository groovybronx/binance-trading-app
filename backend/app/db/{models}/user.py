from pydantic import BaseModel
from typing import Optional

class User(BaseModel):
    username: str
    encrypted_api_key: Optional[str] = None
    encrypted_api_secret: Optional[str] = None
    disabled: bool = False