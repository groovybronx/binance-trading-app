from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from app.db.models.user import User
from app.db.mongodb import mongodb
from .utils import hash_password, verify_password

router = APIRouter()

@router.post("/register")
async def register(username: str, password: str):
    """Enregistre un nouvel utilisateur dans MongoDB."""
    # Vérifie si l'utilisateur existe déjà
    existing_user = await mongodb.db.users.find_one({"username": username})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already registered"
        )
    
    # Hache le mot de passe et crée un nouvel utilisateur
    hashed_password = hash_password(password)
    user = User(username=username, hashed_password=hashed_password)
    await mongodb.db.users.insert_one(user.dict())
    return {"message": "User registered successfully"}

@router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    """Connecte un utilisateur et retourne un token."""
    user_data = await mongodb.db.users.find_one({"username": form_data.username})
    if not user_data or not verify_password(form_data.password, user_data["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password"
        )
    return {"access_token": user_data["username"], "token_type": "bearer"}