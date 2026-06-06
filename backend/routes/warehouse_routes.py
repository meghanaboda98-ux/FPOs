from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session
from database import get_db
from models.warehouse_model import Warehouse
from auth import require_role
router = APIRouter()


@router.post("/add")
def add_warehouse(

    warehouse_data: dict,

    db: Session = Depends(get_db),

    current_user: dict = Depends(
        require_role([
            "ADMIN",
            "FPO_MANAGER"
        ])
    )
):

    warehouse = Warehouse(**warehouse_data)
    db.add(warehouse)
    db.commit()
    db.refresh(warehouse)
    return {
        "message": "Warehouse Added Successfully"
    }


@router.get("/all")
def get_warehouses(

    db: Session = Depends(get_db),

    current_user: dict = Depends(
        require_role([
            "ADMIN",
            "FPO_MANAGER",
            "CAAS_OPERATOR",
            "TRANSPORTER"
        ])
    )
):
    return db.query(Warehouse).all()