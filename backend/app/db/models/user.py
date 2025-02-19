from pydantic import BaseModel, Field
from typing import Optional

class User(BaseModel):
    username: str
    hashed_password: str
    encrypted_api_key: Optional[str] = None
    encrypted_api_secret: Optional[str] = None
    disabled: bool = False

    class Config:
        schema_extra = {
            "example": {
                "username": "johndoe",
                "hashed_password": "hashed_password_here",
                "encrypted_api_key": "encrypted_key_here",
                "encrypted_api_secret": "encrypted_secret_here",
                "disabled": False,
            }
        }