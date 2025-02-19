from motor.motor_asyncio import AsyncIOMotorClient
from app.config.settings import settings

class MongoDB:
    def __init__(self):
        self.client = None
        self.db = None

    async def connect(self):
        """Établit une connexion à MongoDB."""
        self.client = AsyncIOMotorClient(settings.MONGO_URI)
        self.db = self.client[settings.MONGO_DB_NAME]
        print("Connected to MongoDB")

    async def close(self):
        """Ferme la connexion à MongoDB."""
        if self.client:
            self.client.close()
            print("Disconnected from MongoDB")

# Instance globale de MongoDB
mongodb = MongoDB()