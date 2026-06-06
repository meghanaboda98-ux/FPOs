from pydantic import BaseModel


class ProductCreateSchema(BaseModel):

    name: str

    category: str

    optimal_temperature: float

    humidity: float

    shelf_life: int

    respiration_rate: float

    storage_type: str

    min_temperature: float

    max_temperature: float

    quality_threshold: float

    model: str

    k_ref: float

    Ea: float


class ProductUpdateSchema(ProductCreateSchema):

    pass