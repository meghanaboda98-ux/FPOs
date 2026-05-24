from fastapi import APIRouter, HTTPException
from database import db
from models.user_model import (
    UserRegister,
    UserLogin
)
from auth import (
    hash_password,
    verify_password,
    create_access_token
)

router = APIRouter()

users_collection = db["users"]

# REGISTER
@router.post("/register")
def register(user: UserRegister):

    allowed_roles = [
        "FPO_MANAGER",
        "CAAS_OPERATOR"
    ]

    if user.role not in allowed_roles:
        raise HTTPException(
            status_code=400,
            detail="Invalid role selected"
        )

    existing_user = users_collection.find_one({
        "email": user.email
    })

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="User already exists"
        )

    hashed_password = hash_password(
        user.password
    )

    user_data = {
        "name": user.name,
        "email": user.email,
        "password": hashed_password,
        "role": user.role
    }

    users_collection.insert_one(user_data)

    return {
        "message": "User registered successfully"
    }

# LOGIN
@router.post("/login")
def login(user: UserLogin):

    db_user = users_collection.find_one({
        "email": user.email
    })

    if not db_user:
        raise HTTPException(
            status_code=400,
            detail="Invalid email"
        )

    password_valid = verify_password(
        user.password,
        db_user["password"]
    )

    if not password_valid:
        raise HTTPException(
            status_code=400,
            detail="Invalid password"
        )

    token = create_access_token({
        "user_id": str(db_user["_id"]),
        "role": db_user["role"]
    })

    return {
        "access_token": token,
        "role": db_user["role"]
    }