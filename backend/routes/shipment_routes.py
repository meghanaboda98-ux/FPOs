from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)
from sqlalchemy.orm import Session
from database import get_db
from models.shipment_model import Shipment
from models.inventory_model import Inventory
from auth import require_role
from calculations.prediction import (
    predict_transport_quality
)
from datetime import datetime

router = APIRouter()


# CREATE SHIPMENT
@router.post("/create")
def create_shipment(

    shipment_data: dict,

    db: Session = Depends(get_db),

    current_user: dict = Depends(
        require_role([
            "ADMIN",
            "FPO_MANAGER"
        ])
    )
):

    inventory = db.query(Inventory).filter(

        Inventory.id ==
        shipment_data["inventory_id"]

    ).first()

    if not inventory:

        raise HTTPException(
            status_code=404,
            detail="Inventory not found"
        )

    transport_quality = predict_transport_quality(
        shipment_data["transport_temperature"],
        inventory.current_temperature,
        shipment_data["travel_hours"]
    )

    shipment = Shipment(
        inventory_id=inventory.id,
        product_name=inventory.product_name,
        farmer_name=inventory.farmer_name,
        transporter_name=shipment_data[
            "transporter_name"
        ],
        source=shipment_data["source"],
        destination=shipment_data[
            "destination"
        ],
        transport_temperature=shipment_data[
            "transport_temperature"
        ],
        travel_hours=shipment_data[
            "travel_hours"
        ],
        transport_quality=transport_quality,
        shipment_status="IN_TRANSIT",
        dispatch_time=datetime.utcnow()
    )

    inventory.status = "DISPATCHED"

    db.add(shipment)

    db.commit()

    db.refresh(shipment)

    return {

        "message": "Shipment Created Successfully",
        "transport_quality":
        transport_quality
    }


# GET ALL SHIPMENTS
@router.get("/all")
def get_shipments(

    db: Session = Depends(get_db),

    current_user: dict = Depends(
        require_role([
            "ADMIN",
            "FPO_MANAGER",
            "TRANSPORTER"
        ])
    )
):

    shipments = db.query(Shipment).all()
    return shipments


# GET SINGLE SHIPMENT
@router.get("/{shipment_id}")
def get_single_shipment(

    shipment_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(
        require_role([
            "ADMIN",
            "FPO_MANAGER",
            "TRANSPORTER"
        ])
    )
):

    shipment = db.query(Shipment).filter(
        Shipment.id == shipment_id

    ).first()

    if not shipment:

        raise HTTPException(
            status_code=404,
            detail="Shipment not found"
        )

    return shipment


# UPDATE SHIPMENT STATUS
@router.put("/update-status/{shipment_id}")
def update_shipment_status(

    shipment_id: int,
    shipment_data: dict,
    db: Session = Depends(get_db),

    current_user: dict = Depends(
        require_role([
            "TRANSPORTER",
            "ADMIN"
        ])
    )
):

    shipment = db.query(Shipment).filter(
        Shipment.id == shipment_id

    ).first()

    if not shipment:

        raise HTTPException(
            status_code=404,
            detail="Shipment not found"
        )

    shipment.shipment_status = shipment_data[
        "shipment_status"
    ]

    shipment.current_location = shipment_data[
        "current_location"
    ]

    if shipment_data["shipment_status"] == "DELIVERED":

        shipment.delivery_time = datetime.utcnow()

    db.commit()

    return {
        "message": "Shipment Status Updated"
    }


# DELETE SHIPMENT
@router.delete("/delete/{shipment_id}")
def delete_shipment(

    shipment_id: int,

    db: Session = Depends(get_db),

    current_user: dict = Depends(
        require_role([
            "ADMIN"
        ])
    )
):

    shipment = db.query(Shipment).filter(
        Shipment.id == shipment_id
    ).first()

    if not shipment:
        raise HTTPException(
            status_code=404,
            detail="Shipment not found"
        )

    db.delete(shipment)
    db.commit()
    return {
        "message": "Shipment Deleted Successfully"
    }