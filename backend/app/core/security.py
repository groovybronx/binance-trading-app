from cryptography.fernet import Fernet
import os

# Clé de chiffrement (stockée dans .env)
key = os.getenv("ENCRYPTION_KEY")
if not key:
    raise ValueError("No encryption key found in environment variables")
cipher = Fernet(key.encode())

def encrypt_data(data: str) -> str:
    """Chiffre une chaîne de caractères."""
    return cipher.encrypt(data.encode()).decode()

def decrypt_data(encrypted_data: str) -> str:
    """Déchiffre une chaîne de caractères."""
    return cipher.decrypt(encrypted_data.encode()).decode()