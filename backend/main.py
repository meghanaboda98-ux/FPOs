from fastapi import (
    FastAPI,
    Depends
)

from fastapi.middleware.cors import (
    CORSMiddleware
)

from database import (
    engine,
    Base
)

from auth import (
    get_current_user,
    require_role
)

# =========================================
# IMPORT ROUTES
# =========================================

from routes.auth_routes import (
    router as auth_router
)

from routes.inventory_routes import (
    router as inventory_router
)

from routes.product_routes import (
    router as product_router
)

from routes.calculation_routes import (
    router as calculation_router
)

from routes.analytics_routes import (
    router as analytics_router
)

from routes.recommendation_routes import (
    router as recommendation_router
)

from routes.warehouse_routes import (
    router as warehouse_router
)

from routes.shipment_routes import (
    router as shipment_router
)

from routes.notification_routes import (
    router as notification_router
)

# =========================================
# IMPORT SCHEDULER
# =========================================

import scheduler


# =========================================
# CREATE DATABASE TABLES
# =========================================

Base.metadata.create_all(
    bind=engine
)

# =========================================
# CREATE FASTAPI APP
# =========================================

app = FastAPI(
    title="FPO Cold Chain Management System"
)

# =========================================
# ENABLE CORS
# =========================================

app.add_middleware(

    CORSMiddleware,

   allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]
)

# =========================================
# INCLUDE ROUTES
# =========================================

app.include_router(
    auth_router
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
    tags=["Recommendations"]
)

app.include_router(
    warehouse_router,
    prefix="/warehouse",
    tags=["Warehouse"]
)

app.include_router(
    shipment_router,
    prefix="/shipment",
    tags=["Shipment"]
)

app.include_router(
    notification_router,
    prefix="/notifications",
    tags=["Notifications"]
)

# =========================================
# HOME ROUTE
# =========================================

@app.get("/")
def home():

    return {

        "message":
        "FPO Cold Chain Backend Running"
    }

# =========================================
# DATABASE TEST ROUTE
# =========================================

@app.get("/test-db")
def test_database():

    return {

        "message":
        "PostgreSQL Database Connected Successfully"
    }

# =========================================
# PROTECTED ROUTE
# =========================================

@app.get("/protected")
def protected_route(

    current_user: dict = Depends(
        get_current_user
    )

):

    return {

        "message":
        "Protected Route Accessed",

        "user":
        current_user
    }

# =========================================
# ADMIN ROUTE
# =========================================

@app.get("/admin-only")
def admin_route(

    current_user: dict = Depends(

        require_role([
            "SUPER_ADMIN"
        ])

    )

):

    return {

        "message":
        "Welcome Admin",

        "user":
        current_user
    }

# =========================================
# MANAGER ROUTE
# =========================================

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

        "message":
        "Manager Access Granted",

        "user":
        current_user
    }

# =========================================
# OPERATOR ROUTE
# =========================================

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

        "message":
        "Operator Access Granted",

        "user":
        current_user
    }

# =========================================
# TRANSPORTER ROUTE
# =========================================

@app.get("/transporter-route")
def transporter_route(

    current_user: dict = Depends(

        require_role([

            "SUPER_ADMIN",

            "TRANSPORTER"

        ])

    )

):

    return {

        "message":
        "Transporter Access Granted",

        "user":
        current_user
    }
@app.get("/debug-token")
def debug_token(
    current_user: dict = Depends(get_current_user)
):
    return current_user