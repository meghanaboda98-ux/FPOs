from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)
from sqlalchemy.orm import Session
from database import get_db
from models.product_model import Product
from auth import require_role

router = APIRouter()


# PRODUCT CONFIGURATION SUGGESTION
@router.get("/suggest/{product_name}")
def suggest_product_configuration(

    product_name: str,

    category: str,

    db: Session = Depends(get_db),

    current_user: dict = Depends(
        require_role([
            "ADMIN",
            "FPO_MANAGER",
            "CAAS_OPERATOR"
        ])
    )
):

    # CHECK EXISTING PRODUCT
    existing_product = db.query(Product).filter(

        Product.name.ilike(product_name)

    ).first()

    # PRODUCT ALREADY EXISTS
    if existing_product:

        return {

            "product_found": True,
            "message": "Product already exists",
            "product": {
                "name":
                existing_product.name,

                "category":
                existing_product.category,

                "optimal_temperature":
                existing_product.optimal_temperature,

                "min_temperature":
                existing_product.min_temperature,

                "max_temperature":
                existing_product.max_temperature,

                "humidity":
                existing_product.humidity,

                "shelf_life":
                existing_product.shelf_life,

                "respiration_rate":
                existing_product.respiration_rate,

                "storage_type":
                existing_product.storage_type,

                "quality_threshold":
                existing_product.quality_threshold,

                "model":
                existing_product.model,

                "k_ref":
                existing_product.k_ref,

                "Ea":
                existing_product.Ea
            }
        }

    # SAME CATEGORY PRODUCTS
    category_products = db.query(Product).filter(

        Product.category == category

    ).all()

    if not category_products:

        raise HTTPException(
            status_code=404,
            detail="No reference products found"
        )

    # AVERAGES
    avg_optimal_temp = round(

        sum(
            p.optimal_temperature
            for p in category_products
        ) / len(category_products),

        2
    )

    avg_min_temp = round(

        sum(
            p.min_temperature
            for p in category_products
        ) / len(category_products),

        2
    )

    avg_max_temp = round(

        sum(
            p.max_temperature
            for p in category_products
        ) / len(category_products),

        2
    )

    avg_humidity = round(

        sum(
            p.humidity
            for p in category_products
        ) / len(category_products),

        2
    )

    avg_shelf_life = round(

        sum(
            p.shelf_life
            for p in category_products
        ) / len(category_products),

        0
    )

    avg_respiration_rate = round(

        sum(
            p.respiration_rate
            for p in category_products
        ) / len(category_products),

        2
    )

    avg_quality_threshold = round(

        sum(
            p.quality_threshold
            for p in category_products
        ) / len(category_products),

        2
    )

    avg_k_ref = round(

        sum(
            p.k_ref
            for p in category_products
        ) / len(category_products),

        4
    )

    avg_Ea = round(

        sum(
            p.Ea
            for p in category_products
        ) / len(category_products),

        2
    )

    # MOST COMMON MODEL
    model_count = {}

    for product in category_products:

        model = product.model

        model_count[model] = (

            model_count.get(model, 0) + 1
        )

    suggested_model = max(
        model_count,
        key=model_count.get
    )

    # MOST COMMON STORAGE TYPE
    storage_count = {}

    for product in category_products:

        storage = product.storage_type

        storage_count[storage] = (

            storage_count.get(storage, 0) + 1
        )

    suggested_storage = max(
        storage_count,
        key=storage_count.get
    )

    return {

        "product_found": False,

        "product_name": product_name,

        "category": category,

        "suggested_configuration": {

            "optimal_temperature":
            avg_optimal_temp,

            "min_temperature":
            avg_min_temp,

            "max_temperature":
            avg_max_temp,

            "humidity":
            avg_humidity,

            "shelf_life":
            avg_shelf_life,

            "respiration_rate":
            avg_respiration_rate,

            "storage_type":
            suggested_storage,

            "quality_threshold":
            avg_quality_threshold,

            "model":
            suggested_model,

            "k_ref":
            avg_k_ref,

            "Ea":
            avg_Ea
        },

        "reference_products": [

            p.name

            for p in category_products
        ]
    }