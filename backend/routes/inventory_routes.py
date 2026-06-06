from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session
from database import get_db
from models.inventory_model import Inventory
from models.product_model import Product
from auth import require_role
from calculations.prediction import (

    predict_quality,
    predict_spoilage,
    predict_transport_quality,
    predict_remaining_shelf_life,
    calculate_dispatch_priority,
    check_temperature_status,
    check_chilling_injury

)

from datetime import datetime

router = APIRouter()

# ADD INVENTORY
@router.post("/add")
def add_inventory(

    inventory_data: dict,

    db: Session = Depends(get_db),

    current_user: dict = Depends(
        require_role([
            "SUPER_ADMIN",
            "FPO_MANAGER",
            "CAAS_OPERATOR"
        ])
    )
):

    product = db.query(Product).filter(
        Product.name == inventory_data["product_name"]
    ).first()

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found in product master"
        )

    current_temperature = product.optimal_temperature

    storage_days = 0

    quality = predict_quality(
        initial_quality=100,
        model=product.model,
        k_ref=product.k_ref,
        Ea=product.Ea,
        current_temperature=current_temperature,
        storage_days=storage_days
    )

    spoilage = predict_spoilage(
        current_temperature=current_temperature,
        optimal_temperature=product.optimal_temperature,
        storage_days=storage_days,
        shelf_life=product.shelf_life
    )

    shelf_life_remaining = predict_remaining_shelf_life(
        shelf_life=product.shelf_life,
        storage_days=storage_days
    )

    dispatch_priority = calculate_dispatch_priority(
        quality,
        shelf_life_remaining
    )

    status = "ACTIVE"

    if spoilage >= 70:
        status = "CRITICAL"

    elif spoilage >= 40:
        status = "WARNING"

    inventory = Inventory(

        farmer_name=inventory_data["farmer_name"],

        phone_number=inventory_data["phone_number"],

        product_name=product.name,

        category=product.category,

        quantity=inventory_data["quantity"],

        warehouse_name="Not Assigned",

        coldroom_name="Not Assigned",

        current_temperature=current_temperature,

        humidity=product.humidity,

        quality=quality,

        spoilage=spoilage,

        storage_days=storage_days,

        shelf_life_remaining=shelf_life_remaining,

        dispatch_priority=dispatch_priority,

        status=status
    )

    db.add(inventory)

    db.commit()

    db.refresh(inventory)

    return {
        "message": "Inventory Added Successfully",
        "inventory": inventory
    }

# GET ALL INVENTORY
@router.get("/all")
def get_inventory(

    db: Session = Depends(get_db),

    current_user: dict = Depends(
        require_role([
            "SUPER_ADMIN",
            "FPO_MANAGER",
            "CAAS_OPERATOR",
            "TRANSPORTER"
        ])
    )
):

    role = current_user.get("role")

    # TRANSPORTER
    if role == "TRANSPORTER":

        inventory = db.query(Inventory).filter(

            Inventory.status ==
            "DISPATCHED"

        ).all()

        return inventory

    # ADMIN / MANAGER / OPERATOR
    inventory = db.query(Inventory).all()

    return inventory


# GET SINGLE INVENTORY
@router.get("/{inventory_id}")
def get_single_inventory(

    inventory_id: int,

    db: Session = Depends(get_db),

    current_user: dict = Depends(
        require_role([
            "SUPER_ADMIN",
            "FPO_MANAGER",
            "CAAS_OPERATOR",
            "TRANSPORTER"
        ])
    )
):

    inventory = db.query(Inventory).filter(

        Inventory.id == inventory_id

    ).first()

    if not inventory:

        raise HTTPException(
            status_code=404,
            detail="Inventory not found"
        )

    return inventory


# UPDATE INVENTORY
@router.put("/update/{inventory_id}")
def update_inventory(

    inventory_id: int,

    inventory_data: dict,

    db: Session = Depends(get_db),

    current_user: dict = Depends(
        require_role([
            "SUPER_ADMIN",
            "FPO_MANAGER",
            "CAAS_OPERATOR"
        ])
    )
):

    inventory = db.query(Inventory).filter(

        Inventory.id == inventory_id

    ).first()

    if not inventory:

        raise HTTPException(
            status_code=404,
            detail="Inventory not found"
        )

    inventory.quantity = inventory_data[
        "quantity"
    ]

    inventory.current_temperature = inventory_data[
        "current_temperature"
    ]

    inventory.humidity = inventory_data[
        "humidity"
    ]

    inventory.storage_days = inventory_data[
        "storage_days"
    ]

    db.commit()

    return {
        "message": "Inventory Updated Successfully"
    }


# DISPATCH INVENTORY
@router.put("/dispatch/{inventory_id}")
def dispatch_inventory(

    inventory_id: int,

    db: Session = Depends(get_db),

    current_user: dict = Depends(
        require_role([
            "SUPER_ADMIN",
            "FPO_MANAGER"
        ])
    )
):

    inventory = db.query(Inventory).filter(

        Inventory.id == inventory_id

    ).first()

    if not inventory:

        raise HTTPException(
            status_code=404,
            detail="Inventory not found"
        )

    inventory.status = "DISPATCHED"

    inventory.dispatched_at = datetime.utcnow()

    db.commit()

    return {
        "message": "Inventory Dispatched Successfully"
    }


# DELETE INVENTORY
@router.delete("/delete/{inventory_id}")
def delete_inventory(

    inventory_id: int,

    db: Session = Depends(get_db),

    current_user: dict = Depends(
        require_role([
            "SUPER_ADMIN"
        ])
    )
):

    inventory = db.query(Inventory).filter(

        Inventory.id == inventory_id

    ).first()

    if not inventory:

        raise HTTPException(
            status_code=404,
            detail="Inventory not found"
        )

    db.delete(inventory)

    db.commit()

    return {
        "message": "Inventory Deleted Successfully"
    }