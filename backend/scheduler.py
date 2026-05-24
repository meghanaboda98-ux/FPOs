from apscheduler.schedulers.background import (
    BackgroundScheduler
)

from database import db

from calculations.shelf_life import (
    calculate_quality,
    estimate_remaining_days
)

from datetime import datetime

inventory_collection = db["inventory_batches"]
products_collection = db["product_master"]
alerts_collection = db["alerts"]


def update_inventory_quality():

    print("Running inventory scheduler...")

    # Get active inventory
    inventory_batches = list(
        inventory_collection.find({
            "status": {
                "$ne": "DISPATCHED"
            }
        })
    )

    for batch in inventory_batches:

        # Find product data
        product = products_collection.find_one({
            "product_name": batch["product_name"]
        })

        if not product:
            continue

        # Calculate days stored
        entry_date = batch["entry_date"]

        days_stored = (
            datetime.utcnow() - entry_date
        ).days

        # Recalculate quality
        quality = calculate_quality(

            model=product["model"],

            k_ref=product["k_ref"],

            Ea=product["Ea"],

            storage_temp=batch["storage_temp"],

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

        # Expired
        if quality <= product["quality_limit"]:
            status = "EXPIRED"


        # Create alerts
        if status in ["WARNING", "CRITICAL", "EXPIRED"]:
        
            existing_alert = alerts_collection.find_one({
                "batch_id": batch["batch_id"],
                "status": status
            })
        
            if not existing_alert:
        
                alert_data = {
        
                    "batch_id": batch["batch_id"],
        
                    "product_name": batch["product_name"],
        
                    "farmer_name": batch["farmer_name"],
        
                    "status": status,
        
                    "remaining_days": remaining_days,
        
                    "created_at": datetime.utcnow()
                }
        
                alerts_collection.insert_one(
                    alert_data
                )
        
                print(
                    f"Alert created for Batch: {batch['batch_id']}"
                )
        

        

        # Update inventory batch
        inventory_collection.update_one(
            {
                "batch_id": batch["batch_id"]
            },
            {
                "$set": {
                    "quality": quality,
                    "remaining_days": remaining_days,
                    "status": status,
                    "last_updated": datetime.utcnow()
                }
            }
        )

        print(
            f"Updated Batch: {batch['batch_id']}"
        )


# Create scheduler
scheduler = BackgroundScheduler()

# Run every 1 hour
scheduler.add_job(
    update_inventory_quality,
    "interval",
    hours=1
)

# Start scheduler
scheduler.start()