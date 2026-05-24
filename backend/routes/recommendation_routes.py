from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from database import db

from auth import require_role


router = APIRouter()

products_collection = db["product_master"]


@router.get("/suggest/{product_name}")

def suggest_product_configuration(

    product_name: str,

    category: str,

    current_user: dict = Depends(
        require_role([
            "SUPER_ADMIN",
            "FPO_MANAGER",
            "CAAS_OPERATOR"
        ])
    )
):

    # Check if product already exists
    existing_product = products_collection.find_one({

        "product_name": {
            "$regex": f"^{product_name}$",
            "$options": "i"
        }
    })

    if existing_product:

        return {

            "product_found": True,

            "message": "Product already exists",

            "product": {

                "product_name":
                    existing_product["product_name"],

                "optimal_temp":
                    existing_product["optimal_temp"],

                "model":
                    existing_product["model"],

                "k_ref":
                    existing_product["k_ref"],

                "Ea":
                    existing_product["Ea"],

                "quality_limit":
                    existing_product["quality_limit"]
            }
        }

    # Find products in same category
    category_products = list(

        products_collection.find({

            "category": category
        })
    )

    if len(category_products) == 0:

        raise HTTPException(
            status_code=404,
            detail="No reference products found"
        )

    # Average calculations
    avg_temp = round(

        sum(
            p["optimal_temp"]
            for p in category_products
        ) / len(category_products),

        2
    )

    avg_k_ref = round(

        sum(
            p["k_ref"]
            for p in category_products
        ) / len(category_products),

        4
    )

    avg_Ea = round(

        sum(
            p["Ea"]
            for p in category_products
        ) / len(category_products),

        2
    )

    avg_quality_limit = round(

        sum(
            p["quality_limit"]
            for p in category_products
        ) / len(category_products),

        2
    )

    # Most common model
    model_counts = {}

    for product in category_products:

        model = product["model"]

        model_counts[model] = (
            model_counts.get(model, 0) + 1
        )

    suggested_model = max(
        model_counts,
        key=model_counts.get
    )

    return {

        "product_found": False,

        "product_name": product_name,

        "category": category,

        "suggested_configuration": {

            "optimal_temp": avg_temp,

            "model": suggested_model,

            "k_ref": avg_k_ref,

            "Ea": avg_Ea,

            "quality_limit": avg_quality_limit
        },

        "reference_products": [

            p["product_name"]

            for p in category_products
        ]
    }