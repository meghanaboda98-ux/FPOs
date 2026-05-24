from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import db
from routes.auth_routes import router as auth_router
from auth import get_current_user
from fastapi import Depends
from auth import require_role
from routes.inventory_routes import (
    router as inventory_router
)

from routes.recommendation_routes import (
    router as recommendation_router
)

from routes.product_routes import (
    router as product_router
)
from routes.calculation_routes import (
    router as calculation_router
)
import scheduler

from routes.analytics_routes import (
    router as analytics_router
)

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(
    auth_router,
    prefix="/auth",
    tags=["Authentication"]
)
app.include_router(
    inventory_router,
    prefix="/inventory",
    tags=["Inventory"]
)
app.include_router(
    product_router,
    prefix="/products",
    tags=["Products"]
)

app.include_router(
    calculation_router,
    prefix="/calculations",
    tags=["Calculations"]
)

app.include_router(
    analytics_router,
    prefix="/analytics",
    tags=["Analytics"]
)

app.include_router(
    recommendation_router,
    prefix="/recommendation",
    tags=["Recommendation Engine"]
)



@app.get("/")
def home():
    return {
        "message": "CAAS Backend Running"
    }

@app.get("/test-db")
def test_db():
    return {
        "collections": db.list_collection_names()
    }


@app.get("/protected")
def protected_route(
    current_user: dict = Depends(get_current_user)
):
    return {
        "message": "Protected Route Accessed",
        "user": current_user
    }


@app.get("/admin-only")
def admin_route(
    current_user: dict = Depends(
        require_role(["SUPER_ADMIN"])
    )
):
    return {
        "message": "Welcome Admin",
        "user": current_user
    }

@app.get("/manager-route")
def manager_route(
    current_user: dict = Depends(
        require_role([
            "SUPER_ADMIN",
            "FPO_MANAGER"
        ])
    )
):
    return {
        "message": "Manager Access Granted",
        "user": current_user
    }

@app.get("/operator-route")
def operator_route(
    current_user: dict = Depends(
        require_role([
            "SUPER_ADMIN",
            "FPO_MANAGER",
            "CAAS_OPERATOR"
        ])
    )
):
    return {
        "message": "Operator Access Granted",
        "user": current_user
    }