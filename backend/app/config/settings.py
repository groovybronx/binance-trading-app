from pydantic import BaseSettings

class Settings(BaseSettings):
    MONGO_URI: str
    MONGO_DB_NAME: str
    ENCRYPTION_KEY: str

    class Config:
        env_file = ".env"

settings = Settings()