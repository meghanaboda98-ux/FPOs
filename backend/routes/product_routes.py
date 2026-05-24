from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from database import db

from auth import require_role

from models.product_model import (
    ProductCreate
)

router = APIRouter()

products_collection = db["product_master"]

# ADD PRODUCT
@router.post("/add")

def add_product(

    product: ProductCreate,

    current_user: dict = Depends(
        require_role([
            "SUPER_ADMIN"
        ])
    )
):

    existing_product = products_collection.find_one({
        "product_name": product.product_name
    })

    if existing_product:
        raise HTTPException(
            status_code=400,
            detail="Product already exists"
        )

    product_data = {

        "product_name": product.product_name,

        "category": product.category,

        "optimal_temp": product.optimal_temp,

        "model": product.model,

        "k_ref": product.k_ref,

        "Ea": product.Ea,

        "quality_limit": product.quality_limit
    }

    products_collection.insert_one(
        product_data
    )

    return {
        "message": "Product added successfully"
    }

# GET ALL PRODUCTS
@router.get("/all")

def get_all_products():

    products = list(
        products_collection.find(
            {},
            {"_id": 0}
        )
    )

    return {
        "products": products
    }

# GET SINGLE PRODUCT
@router.get("/{product_name}")

def get_product(product_name: str):

    product = products_collection.find_one(
        {"product_name": product_name},
        {"_id": 0}
    )

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    return product

# UPDATE PRODUCT
@router.put("/update/{product_name}")

def update_product(

    product_name: str,
    updated_product: ProductCreate,

    current_user: dict = Depends(
        require_role([
            "SUPER_ADMIN"
        ])
    )
):

    product = products_collection.find_one({
        "product_name": product_name
    })

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    products_collection.update_one(
        {"product_name": product_name},
        {
            "$set": updated_product.dict()
        }
    )

    return {
        "message": "Product updated successfully"
    }

# DELETE PRODUCT
@router.delete("/delete/{product_name}")

def delete_product(

    product_name: str,

    current_user: dict = Depends(
        require_role([
            "SUPER_ADMIN"
        ])
    )
):

    product = products_collection.find_one({
        "product_name": product_name
    })

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    products_collection.delete_one({
        "product_name": product_name
    })

    return {
        "message": "Product deleted successfully"
    }