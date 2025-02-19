from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from .utils import hash_password, verify_password
from pydantic import BaseModel

router = APIRouter()

# Simuler une base de données (remplacez par MongoDB plus tard)
fake_users_db = {}

class User(BaseModel):
    username: str
    hashed_password: str

@router.post("/register")
async def register(username: str, password: str):
    """Endpoint pour enregistrer un nouvel utilisateur."""
    if username in fake_users_db:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already registered"
        )
    hashed_password = hash_password(password)
    fake_users_db[username] = User(username=username, hashed_password=hashed_password)
    return {"message": "User registered successfully"}

@router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    """Endpoint pour connecter un utilisateur et retourner un token."""
    user_data = fake_users_db.get(form_data.username)
    if not user_data or not verify_password(form_data.password, user_data.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password"
        )
    return {"access_token": user_data.username, "token_type": "bearer"}