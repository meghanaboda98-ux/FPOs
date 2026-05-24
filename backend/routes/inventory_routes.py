from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from database import db

from models.inventory_model import (
    InventoryCreate
)

from auth import require_role

from calculations.shelf_life import (
    calculate_quality,
    estimate_remaining_days
)

from datetime import datetime

import uuid


router = APIRouter()

inventory_collection = db["inventory_batches"]

products_collection = db["product_master"]


# ADD INVENTORY
@router.post("/add")
def add_inventory(

    inventory: InventoryCreate,

    current_user: dict = Depends(
        require_role([
            "SUPER_ADMIN",
            "FPO_MANAGER",
            "CAAS_OPERATOR"
        ])
    )
):

    # Find product from product master
    product = products_collection.find_one({
        "product_name": inventory.product_name
    })

    if not product:

        raise HTTPException(
            status_code=404,
            detail="Product not found in product master"
        )

    # Generate batch ID
    batch_id = str(uuid.uuid4())[:8]

    # New inventory initially has 0 days stored
    days_stored = 0

    # Calculate quality
    quality = calculate_quality(

        model=product["model"],

        k_ref=product["k_ref"],

        Ea=product["Ea"],

        storage_temp=inventory.storage_temp,

        days_stored=days_stored
    )

    # Estimate remaining days
    remaining_days = estimate_remaining_days(

        quality,

        product["quality_limit"]
    )

    # Determine status
    status = "ACTIVE"

    if remaining_days <= 2:

        status = "CRITICAL"

    elif remaining_days <= 5:

        status = "WARNING"

    # Create inventory document
    inventory_data = {

        "batch_id": batch_id,

        "farmer_name": inventory.farmer_name,

        "phone_number": inventory.phone_number,

        "product_name": inventory.product_name,

        "category": inventory.category,

        "quantity": inventory.quantity,

        "storage_temp": inventory.storage_temp,

        "entry_date": inventory.entry_date,

        "quality": quality,

        "remaining_days": remaining_days,

        "status": status,

        "created_by": current_user["role"],

        "created_at": datetime.utcnow()
    }

    # Insert inventory
    inventory_collection.insert_one(
        inventory_data
    )

    return {

        "message": "Inventory added successfully",

        "batch_id": batch_id,

        "quality": quality,

        "remaining_days": remaining_days,

        "status": status
    }


# GET INVENTORY
@router.get("/all")
def get_inventory(

    search: str = "",

    status: str = "",

    category: str = "",

    page: int = 1,

    limit: int = 10,

    current_user: dict = Depends(
        require_role([
            "SUPER_ADMIN",
            "FPO_MANAGER",
            "CAAS_OPERATOR"
        ])
    )
):

    query = {}

    # Search logic
    if search:

        query["$or"] = [

            {
                "farmer_name": {
                    "$regex": search,
                    "$options": "i"
                }
            },

            {
                "product_name": {
                    "$regex": search,
                    "$options": "i"
                }
            },

            {
                "batch_id": {
                    "$regex": search,
                    "$options": "i"
                }
            }
        ]

    # Status filter
    if status:

        query["status"] = status

    # Category filter
    if category:

        query["category"] = category

    skip = (page - 1) * limit

    inventory = list(

        inventory_collection.find(
            query,
            {
                "_id": 0
            }
        )

        .skip(skip)

        .limit(limit)
    )

    total = inventory_collection.count_documents(
        query
    )

    return {

        "inventory": inventory,

        "total": total,

        "page": page,

        "limit": limit
    }


# GET SINGLE INVENTORY
@router.get("/{batch_id}")
def get_single_inventory(

    batch_id: str,

    current_user: dict = Depends(
        require_role([
            "SUPER_ADMIN",
            "FPO_MANAGER",
            "CAAS_OPERATOR"
        ])
    )
):

    batch = inventory_collection.find_one(
        {
            "batch_id": batch_id
        },
        {
            "_id": 0
        }
    )

    if not batch:

        raise HTTPException(
            status_code=404,
            detail="Batch not found"
        )

    return batch


# UPDATE INVENTORY
@router.put("/update/{batch_id}")
def update_inventory(

    batch_id: str,

    inventory: InventoryCreate,

    current_user: dict = Depends(
        require_role([
            "SUPER_ADMIN",
            "FPO_MANAGER",
            "CAAS_OPERATOR"
        ])
    )
):

    existing_batch = inventory_collection.find_one({
        "batch_id": batch_id
    })

    if not existing_batch:

        raise HTTPException(
            status_code=404,
            detail="Batch not found"
        )

    updated_data = {

        "$set": {

            "farmer_name": inventory.farmer_name,

            "phone_number": inventory.phone_number,

            "product_name": inventory.product_name,

            "category": inventory.category,

            "quantity": inventory.quantity,

            "storage_temp": inventory.storage_temp,

            "entry_date": inventory.entry_date
        }
    }

    inventory_collection.update_one(
        {
            "batch_id": batch_id
        },
        updated_data
    )

    return {
        "message": "Inventory updated successfully"
    }


# DISPATCH INVENTORY
@router.put("/dispatch/{batch_id}")
def dispatch_inventory(

    batch_id: str,

    current_user: dict = Depends(
        require_role([
            "SUPER_ADMIN",
            "FPO_MANAGER"
        ])
    )
):

    batch = inventory_collection.find_one({
        "batch_id": batch_id
    })

    if not batch:

        raise HTTPException(
            status_code=404,
            detail="Batch not found"
        )

    inventory_collection.update_one(

        {
            "batch_id": batch_id
        },

        {
            "$set": {

                "status": "DISPATCHED",

                "dispatched_at": datetime.utcnow()
            }
        }
    )

    return {
        "message": "Inventory dispatched successfully"
    }


# DELETE INVENTORY
@router.delete("/delete/{batch_id}")
def delete_inventory(

    batch_id: str,

    current_user: dict = Depends(
        require_role([
            "SUPER_ADMIN"
        ])
    )
):

    batch = inventory_collection.find_one({
        "batch_id": batch_id
    })

    if not batch:

        raise HTTPException(
            status_code=404,
            detail="Batch not found"
        )

    inventory_collection.delete_one({
        "batch_id": batch_id
    })

    return {
        "message": "Inventory deleted successfully"
    }