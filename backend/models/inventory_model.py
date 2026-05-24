from pydantic import BaseModel

from datetime import datetime


class InventoryCreate(BaseModel):

    farmer_name: str

    phone_number: str

    product_name: str

    category: str

    quantity: str

    storage_temp: float

    entry_date: datetime