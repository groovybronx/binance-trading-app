from binance import AsyncClient
from cryptography.fernet import Fernet
import os

class BinanceClient:
    def __init__(self):
        self.client = None
        self.cipher = Fernet(os.getenv("ENCRYPTION_KEY"))

    async def connect(self, encrypted_api_key: str, encrypted_api_secret: str):
        api_key = self.cipher.decrypt(encrypted_api_key.encode()).decode()
        api_secret = self.cipher.decrypt(encrypted_api_secret.encode()).decode()
        self.client = await AsyncClient.create(api_key, api_secret)
        return self.client