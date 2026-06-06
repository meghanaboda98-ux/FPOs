from fastapi import (
    APIRouter,
    Depends
)
from sqlalchemy.orm import Session
from sqlalchemy import func
from database import get_db
from models.inventory_model import Inventory
from models.shipment_model import Shipment
from models.warehouse_model import Warehouse
from models.coldroom_model import ColdRoom
from auth import require_role

router = APIRouter()

# DASHBOARD SUMMARY
@router.get("/dashboard-summary")
def dashboard_summary(

    db: Session = Depends(get_db),

    current_user: dict = Depends(
        require_role([
            "ADMIN",
            "FPO_MANAGER"
        ])
    )
):

    total_inventory = db.query(
        Inventory
    ).count()

    active_batches = db.query(
        Inventory
    ).filter(
        Inventory.status == "ACTIVE"
    ).count()

    warning_batches = db.query(
        Inventory
    ).filter(
        Inventory.status == "WARNING"
    ).count()

    critical_batches = db.query(
        Inventory
    ).filter(
        Inventory.status == "CRITICAL"
    ).count()

    dispatched_batches = db.query(
        Inventory
    ).filter(
        Inventory.status == "DISPATCHED"
    ).count()

    total_shipments = db.query(
        Shipment
    ).count()

    total_warehouses = db.query(
        Warehouse
    ).count()

    total_coldrooms = db.query(
        ColdRoom
    ).count()

    return {

        "total_inventory":
        total_inventory,

        "active_batches":
        active_batches,

        "warning_batches":
        warning_batches,

        "critical_batches":
        critical_batches,

        "dispatched_batches":
        dispatched_batches,

        "total_shipments":
        total_shipments,

        "total_warehouses":
        total_warehouses,

        "total_coldrooms":
        total_coldrooms
    }


# CATEGORY DISTRIBUTION
@router.get("/category-distribution")
def category_distribution(

    db: Session = Depends(get_db),

    current_user: dict = Depends(
        require_role([
            "ADMIN",
            "FPO_MANAGER"
        ])
    )
):

    categories = db.query(

        Inventory.category,

        func.count(
            Inventory.id
        )

    ).group_by(
        Inventory.category
    ).all()

    result = []

    for category, count in categories:

        result.append({

            "category": category,

            "count": count
        })

    return {
        "categories": result
    }


# STATUS DISTRIBUTION
@router.get("/status-distribution")
def status_distribution(

    db: Session = Depends(get_db),

    current_user: dict = Depends(
        require_role([
            "ADMIN",
            "FPO_MANAGER"
        ])
    )
):

    statuses = db.query(

        Inventory.status,

        func.count(
            Inventory.id
        )

    ).group_by(
        Inventory.status
    ).all()

    result = []

    for status, count in statuses:

        result.append({

            "status": status,

            "count": count
        })

    return {
        "statuses": result
    }


# SPOILAGE OVERVIEW
@router.get("/spoilage-overview")
def spoilage_overview(

    db: Session = Depends(get_db),

    current_user: dict = Depends(
        require_role([
            "ADMIN",
            "FPO_MANAGER"
        ])
    )
):

    total_batches = db.query(
        Inventory
    ).count()

    critical_batches = db.query(
        Inventory
    ).filter(
        Inventory.spoilage >= 70
    ).count()

    spoilage_percentage = 0

    if total_batches > 0:

        spoilage_percentage = round(

            (
                critical_batches /
                total_batches
            ) * 100,

            2
        )

    return {

        "critical_batches":
        critical_batches,

        "total_batches":
        total_batches,

        "spoilage_percentage":
        spoilage_percentage
    }


# QUALITY OVERVIEW
@router.get("/quality-overview")
def quality_overview(

    db: Session = Depends(get_db),

    current_user: dict = Depends(
        require_role([
            "ADMIN",
            "FPO_MANAGER"
        ])
    )
):

    inventory = db.query(
        Inventory
    ).all()

    if not inventory:

        return {
            "average_quality": 0
        }

    avg_quality = round(

        sum(
            item.quality
            for item in inventory
        ) / len(inventory),

        2
    )

    return {
        "average_quality":
        avg_quality
    }


# TEMPERATURE ANALYTICS
@router.get("/temperature-overview")
def temperature_overview(

    db: Session = Depends(get_db),

    current_user: dict = Depends(
        require_role([
            "ADMIN",
            "FPO_MANAGER"
        ])
    )
):

    high_temp = db.query(
        Inventory
    ).filter(
        Inventory.temperature_status == "HIGH"
    ).count()

    low_temp = db.query(
        Inventory
    ).filter(
        Inventory.temperature_status == "LOW"
    ).count()

    optimal_temp = db.query(
        Inventory
    ).filter(
        Inventory.temperature_status == "OPTIMAL"
    ).count()

    return {

        "high_temperature_batches":
        high_temp,

        "low_temperature_batches":
        low_temp,

        "optimal_temperature_batches":
        optimal_temp
    }


# CHILLING INJURY ANALYTICS
@router.get("/chilling-injury")
def chilling_injury_overview(

    db: Session = Depends(get_db),

    current_user: dict = Depends(
        require_role([
            "ADMIN",
            "FPO_MANAGER"
        ])
    )
):

    injury_count = db.query(
        Inventory
    ).filter(
        Inventory.chilling_injury == True
    ).count()

    return {
        "chilling_injury_batches":
        injury_count
    }


# DISPATCH PRIORITY ANALYTICS
@router.get("/dispatch-priority")
def dispatch_priority_overview(

    db: Session = Depends(get_db),

    current_user: dict = Depends(
        require_role([
            "ADMIN",
            "FPO_MANAGER"
        ])
    )
):

    high = db.query(
        Inventory
    ).filter(
        Inventory.dispatch_priority == "HIGH"
    ).count()

    medium = db.query(
        Inventory
    ).filter(
        Inventory.dispatch_priority == "MEDIUM"
    ).count()

    low = db.query(
        Inventory
    ).filter(
        Inventory.dispatch_priority == "LOW"
    ).count()

    return {

        "high_priority":
        high,

        "medium_priority":
        medium,

        "low_priority":
        low
    }


# WAREHOUSE UTILIZATION
@router.get("/warehouse-utilization")
def warehouse_utilization(

    db: Session = Depends(get_db),

    current_user: dict = Depends(
        require_role([
            "ADMIN",
            "FPO_MANAGER"
        ])
    )
):

    warehouses = db.query(
        Warehouse
    ).all()

    result = []

    for warehouse in warehouses:

        utilization = 0

        if warehouse.total_capacity > 0:

            utilization = round(

                (
                    warehouse.occupied_capacity /
                    warehouse.total_capacity
                ) * 100,

                2
            )

        result.append({

            "warehouse_name":
            warehouse.name,

            "total_capacity":
            warehouse.total_capacity,

            "occupied_capacity":
            warehouse.occupied_capacity,

            "available_capacity":
            warehouse.available_capacity,

            "utilization_percentage":
            utilization
        })

    return {
        "warehouses": result
    }


# SHIPMENT ANALYTICS
@router.get("/shipment-overview")
def shipment_overview(

    db: Session = Depends(get_db),

    current_user: dict = Depends(
        require_role([
            "ADMIN",
            "FPO_MANAGER"
        ])
    )
):

    in_transit = db.query(
        Shipment
    ).filter(
        Shipment.shipment_status == "IN_TRANSIT"
    ).count()

    delivered = db.query(
        Shipment
    ).filter(
        Shipment.shipment_status == "DELIVERED"
    ).count()

    delayed = db.query(
        Shipment
    ).filter(
        Shipment.shipment_status == "DELAYED"
    ).count()

    return {

        "in_transit_shipments":
        in_transit,

        "delivered_shipments":
        delivered,

        "delayed_shipments":
        delayed
    }