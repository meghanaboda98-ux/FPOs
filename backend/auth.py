from datetime import datetime, timedelta

from jose import (
    jwt,
    JWTError
)

from passlib.context import CryptContext

from fastapi import (
    Depends,
    HTTPException,
    status
)

from fastapi.security import (
    HTTPBearer,
    HTTPAuthorizationCredentials
)

SECRET_KEY = "SECRET123"

ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_HOURS = 24

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

security = HTTPBearer()


# HASH PASSWORD
def hash_password(password: str):

    return pwd_context.hash(password)


# VERIFY PASSWORD
def verify_password(

    plain_password,
    hashed_password

):

    return pwd_context.verify(
        plain_password,
        hashed_password
    )


# CREATE ACCESS TOKEN
def create_access_token(data: dict):

    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(
        hours=ACCESS_TOKEN_EXPIRE_HOURS
    )

    to_encode.update({
        "exp": expire
    })

    encoded_jwt = jwt.encode(

        to_encode,

        SECRET_KEY,

        algorithm=ALGORITHM
    )

    return encoded_jwt


# VERIFY TOKEN
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

            status_code=status.HTTP_401_UNAUTHORIZED,

            detail="Invalid or Expired Token"
        )


# GET CURRENT USER
def get_current_user(

    credentials: HTTPAuthorizationCredentials = Depends(
        security
    )

):

    token = credentials.credentials

    payload = verify_token(token)

    print("TOKEN PAYLOAD:", payload)

    return payload


# ROLE BASED ACCESS
def require_role(allowed_roles: list):

    def role_checker(

        current_user: dict = Depends(
            get_current_user
        )
    ):

        print("USER ROLE:", current_user["role"])
        print("ALLOWED ROLES:", allowed_roles)

        if current_user["role"] not in allowed_roles:

            raise HTTPException(

                status_code=status.HTTP_403_FORBIDDEN,

                detail="Access Denied"
            )

        return current_user

    return role_checker

def verify_token(token: str):

    print("TOKEN RECEIVED:", token)

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        print("PAYLOAD:", payload)

        return payload

    except JWTError as e:

        print("JWT ERROR:", e)

        raise HTTPException(
            status_code=401,
            detail="Invalid or Expired Token"
        )