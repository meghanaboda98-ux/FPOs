from passlib.context import CryptContext
from jose import jwt, JWTError
from datetime import datetime, timedelta
from dotenv import load_dotenv
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer
import os

load_dotenv()

SECRET_KEY = os.getenv("JWT_SECRET_KEY")
ALGORITHM = os.getenv("JWT_ALGORITHM")

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

# Bearer token
security = HTTPBearer()

# Hash password
def hash_password(password: str):
    return pwd_context.hash(password)

# Verify password
def verify_password(
    plain_password,
    hashed_password
):
    return pwd_context.verify(
        plain_password,
        hashed_password
    )

# Create JWT token
def create_access_token(data: dict):

    expire = datetime.utcnow() + timedelta(hours=24)

    payload = data.copy()

    payload.update({
        "exp": expire
    })

    token = jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return token

# Verify token
def verify_token(token: str):

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        return payload

    except JWTError:

        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )

# Current user
def get_current_user(
    credentials = Depends(security)
):

    token = credentials.credentials

    payload = verify_token(token)

    return payload


# Role checker
def require_role(allowed_roles: list):

    def role_checker(
        current_user: dict = Depends(get_current_user)
    ):

        user_role = current_user.get("role")

        if user_role not in allowed_roles:

            raise HTTPException(
                status_code=403,
                detail="Access denied"
            )

        return current_user

    return role_checker