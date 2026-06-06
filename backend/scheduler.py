from apscheduler.schedulers.background import (
    BackgroundScheduler
)

from sqlalchemy.orm import Session

from datetime import datetime

from database import SessionLocal

from models.inventory_model import Inventory

from models.product_model import Product

from models.alert_model import Alert

from calculations.shelf_life import (
    calculate_quality,
    estimate_remaining_days
)


def update_inventory_quality():

    print("Running inventory scheduler...")

    db: Session = SessionLocal()

    try:

        inventory_batches = db.query(
            Inventory
        ).filter(
            Inventory.status != "DISPATCHED"
        ).all()

        for batch in inventory_batches:

            product = db.query(Product).filter(
                Product.product_name == batch.product_name
            ).first()

            if not product:
                continue

            days_stored = (

                datetime.utcnow()

                -

                batch.entry_date

            ).days

            quality = calculate_quality(

                model=product.model,

                k_ref=product.k_ref,

                Ea=product.Ea,

                storage_temp=batch.storage_temp,

                days_stored=days_stored
            )

            remaining_days = estimate_remaining_days(

                quality,

                product.quality_limit
            )

            status = "ACTIVE"

            if remaining_days <= 2:

                status = "CRITICAL"

            elif remaining_days <= 5:

                status = "WARNING"

            if quality <= product.quality_limit:

                status = "EXPIRED"

            if status in [

                "WARNING",
                "CRITICAL",
                "EXPIRED"

            ]:

                existing_alert = db.query(Alert).filter(

                    Alert.batch_id == batch.batch_id,

                    Alert.status == status

                ).first()

                if not existing_alert:

                    alert = Alert(

                        batch_id=batch.batch_id,

                        warehouse_name=batch.warehouse_name,

                        product_name=batch.product_name,

                        farmer_name=batch.farmer_name,

                        status=status,

                        remaining_days=remaining_days,

                        created_at=datetime.utcnow()
                    )

                    db.add(alert)

                    print(
                        f"Alert created for Batch: {batch.batch_id}"
                    )

            batch.quality = quality

            batch.remaining_days = remaining_days

            batch.status = status

            batch.last_updated = datetime.utcnow()

            print(
                f"Updated Batch: {batch.batch_id}"
            )

        db.commit()

    except Exception as e:

        db.rollback()

        print("Scheduler Error:", e)

    finally:

        db.close()


scheduler = BackgroundScheduler()

scheduler.add_job(

    update_inventory_quality,

    "interval",

    hours=1
)

scheduler.start()