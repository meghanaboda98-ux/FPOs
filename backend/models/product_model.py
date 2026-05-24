from pydantic import BaseModel

class ProductCreate(BaseModel):

    product_name: str

    category: str

    optimal_temp: float

    model: str

    k_ref: float

    Ea: float

    quality_limit: float