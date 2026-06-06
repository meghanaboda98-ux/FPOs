from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)
from sqlalchemy.orm import Session
from database import get_db
from models.alert_model import Alert
from models.inventory_model import Inventory
from auth import require_role
from datetime import datetime
router = APIRouter()

# CREATE ALERT
@router.post("/create")
def create_alert(

    alert_data: dict,

    db: Session = Depends(get_db),

    current_user: dict = Depends(
        require_role([
            "ADMIN",
            "FPO_MANAGER",
            "CAAS_OPERATOR"
        ])
    )
):

    inventory = db.query(Inventory).filter(

        Inventory.id ==
        alert_data["inventory_id"]

    ).first()

    if not inventory:

        raise HTTPException(
            status_code=404,
            detail="Inventory not found"
        )

    alert = Alert(
        farmer_name=inventory.farmer_name,
        phone_number=inventory.phone_number,
        warehouse_name=inventory.warehouse_name,
        product_name=inventory.product_name,
        alert_type=alert_data["alert_type"],
        message=alert_data["message"],
        status="PENDING",
        created_at=datetime.utcnow()
    )

    db.add(alert)
    db.commit()
    db.refresh(alert)
    return {
        "message": "Alert Created Successfully"
    }


# GET ALL ALERTS
@router.get("/all")
def get_alerts(

    db: Session = Depends(get_db),

    current_user: dict = Depends(
        require_role([
            "ADMIN",
            "FPO_MANAGER",
            "CAAS_OPERATOR"
        ])
    )
):

    alerts = db.query(Alert).all()

    return alerts


# SEND ALERT
@router.put("/send/{alert_id}")
def send_alert(

    alert_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(
        require_role([
            "ADMIN",
            "FPO_MANAGER"
        ])
    )
):

    alert = db.query(Alert).filter(

        Alert.id == alert_id

    ).first()

    if not alert:

        raise HTTPException(
            status_code=404,
            detail="Alert not found"
        )

    alert.status = "SENT"
    alert.sent_at = datetime.utcnow()
    db.commit()
    return {
        "message": "SMS Notification Sent",
        "phone_number": alert.phone_number
    }


# DELETE ALERT
@router.delete("/delete/{alert_id}")
def delete_alert(

    alert_id: int,

    db: Session = Depends(get_db),
    current_user: dict = Depends(
        require_role([
            "ADMIN"
        ])
    )
):

    alert = db.query(Alert).filter(
        Alert.id == alert_id
    ).first()
    if not alert:

        raise HTTPException(
            status_code=404,
            detail="Alert not found"
        )

    db.delete(alert)
    db.commit()
    return {
        "message": "Alert Deleted Successfully"
    }