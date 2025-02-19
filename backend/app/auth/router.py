from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from .utils import hash_password, verify_password
from ..db.models import User

router = APIRouter()

# Simuler une base de données (remplacez par MongoDB plus tard)
fake_users_db = {}

@router.post("/register")
async def register(username: str, password: str):
    if username in fake_users_db:
        raise HTTPException(status_code=400, detail="Username already registered")
    hashed_password = hash_password(password)
    fake_users_db[username] = {"username": username, "hashed_password": hashed_password}
    return {"message": "User registered successfully"}

@router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user_data = fake_users_db.get(form_data.username)
    if not user_data or not verify_password(form_data.password, user_data["hashed_password"]):
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    return {"access_token": user_data["username"], "token_type": "bearer"}