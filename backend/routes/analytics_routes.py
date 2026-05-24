from fastapi import (
    APIRouter,
    Depends
)

from database import db
from auth import require_role

router = APIRouter()

inventory_collection = db["inventory_batches"]


# DASHBOARD SUMMARY
@router.get("/dashboard-summary")

def dashboard_summary(

    current_user: dict = Depends(
        require_role([
            "SUPER_ADMIN",
            "FPO_MANAGER"
        ])
    )
):

    total_inventory = inventory_collection.count_documents({})

    active_batches = inventory_collection.count_documents({
        "status": "ACTIVE"
    })

    warning_batches = inventory_collection.count_documents({
        "status": "WARNING"
    })

    critical_batches = inventory_collection.count_documents({
        "status": "CRITICAL"
    })

    expired_batches = inventory_collection.count_documents({
        "status": "EXPIRED"
    })

    dispatched_batches = inventory_collection.count_documents({
        "status": "DISPATCHED"
    })

    return {

        "total_inventory": total_inventory,

        "active_batches": active_batches,

        "warning_batches": warning_batches,

        "critical_batches": critical_batches,

        "expired_batches": expired_batches,

        "dispatched_batches": dispatched_batches
    }


# CATEGORY DISTRIBUTION
@router.get("/category-distribution")

def category_distribution(

    current_user: dict = Depends(
        require_role([
            "SUPER_ADMIN",
            "FPO_MANAGER"
        ])
    )
):

    pipeline = [

        {
            "$group": {
                "_id": "$category",
                "count": {
                    "$sum": 1
                }
            }
        }
    ]

    result = list(
        inventory_collection.aggregate(pipeline)
    )

    return {
        "categories": result
    }


# STATUS DISTRIBUTION
@router.get("/status-distribution")

def status_distribution(

    current_user: dict = Depends(
        require_role([
            "SUPER_ADMIN",
            "FPO_MANAGER"
        ])
    )
):

    pipeline = [

        {
            "$group": {
                "_id": "$status",
                "count": {
                    "$sum": 1
                }
            }
        }
    ]

    result = list(
        inventory_collection.aggregate(pipeline)
    )

    return {
        "statuses": result
    }


# SPOILAGE OVERVIEW
@router.get("/spoilage-overview")

def spoilage_overview(

    current_user: dict = Depends(
        require_role([
            "SUPER_ADMIN",
            "FPO_MANAGER"
        ])
    )
):

    expired_count = inventory_collection.count_documents({
        "status": "EXPIRED"
    })

    total_count = inventory_collection.count_documents({})

    spoilage_percentage = 0

    if total_count > 0:

        spoilage_percentage = round(
            (expired_count / total_count) * 100,
            2
        )

    return {

        "expired_batches": expired_count,

        "total_batches": total_count,

        "spoilage_percentage": spoilage_percentage
    }