from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models.product_model import Product
from schemas.product_schema import ProductCreateSchema, ProductUpdateSchema
from auth import require_role


router = APIRouter()


@router.post("/add")
def add_product(

    product_data: ProductCreateSchema,

    db: Session = Depends(get_db),

    current_user: dict = Depends(
        require_role([
            "SUPER_ADMIN",
            "FPO_MANAGER",
            "CAAS_OPERATOR"
        ])
    )
):

    existing_product = db.query(Product).filter(
        Product.name == product_data.name
    ).first()

    if existing_product:
        raise HTTPException(
            status_code=400,
            detail="Product already exists"
        )

    product = Product(

        name=product_data.name,

        category=product_data.category,

        optimal_temperature=product_data.optimal_temperature,

        humidity=product_data.humidity,

        shelf_life=product_data.shelf_life,

        respiration_rate=product_data.respiration_rate,

        storage_type=product_data.storage_type,

        min_temperature=product_data.min_temperature,

        max_temperature=product_data.max_temperature,

        quality_threshold=product_data.quality_threshold,

        model=product_data.model,

        k_ref=product_data.k_ref,

        Ea=product_data.Ea
    )

    db.add(product)

    db.commit()

    db.refresh(product)

    return {
        "message": "Product Added Successfully",
        "product": product
    }


@router.get("/all")
def get_products(

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

    products = db.query(Product).all()

    return products


@router.get("/details/{product_name}")
def get_product_details(

    product_name: str,

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

    product = db.query(Product).filter(
        Product.name == product_name
    ).first()

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    return product


@router.get("/{product_id}")
def get_single_product(

    product_id: int,

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

    product = db.query(Product).filter(
        Product.id == product_id
    ).first()

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    return product


@router.put("/update/{product_id}")
def update_product(

    product_id: int,

    product_data: ProductUpdateSchema,

    db: Session = Depends(get_db),

    current_user: dict = Depends(
        require_role([
            "SUPER_ADMIN",
            "FPO_MANAGER"
        ])
    )
):

    product = db.query(Product).filter(
        Product.id == product_id
    ).first()

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    product.name = product_data.name

    product.category = product_data.category

    product.optimal_temperature = product_data.optimal_temperature

    product.humidity = product_data.humidity

    product.shelf_life = product_data.shelf_life

    product.respiration_rate = product_data.respiration_rate

    product.storage_type = product_data.storage_type

    product.min_temperature = product_data.min_temperature

    product.max_temperature = product_data.max_temperature

    product.quality_threshold = product_data.quality_threshold

    product.model = product_data.model

    product.k_ref = product_data.k_ref

    product.Ea = product_data.Ea

    db.commit()

    db.refresh(product)

    return {
        "message": "Product Updated Successfully",
        "product": product
    }


@router.delete("/delete/{product_id}")
def delete_product(

    product_id: int,

    db: Session = Depends(get_db),

    current_user: dict = Depends(
        require_role([
            "SUPER_ADMIN"
        ])
    )
):

    product = db.query(Product).filter(
        Product.id == product_id
    ).first()

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    db.delete(product)

    db.commit()

    return {
        "message": "Product Deleted Successfully"
    }