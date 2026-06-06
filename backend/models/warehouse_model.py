from sqlalchemy import (
    Column,
    Integer,
    String,
    Float
)

from database import Base


class Warehouse(Base):

    __tablename__ = "warehouses"

    id = Column(
        Integer,
        primary_key=True
    )

    warehouse_name = Column(String)

    location = Column(String)

    total_capacity = Column(Float)

    occupied_capacity = Column(Float)

    available_capacity = Column(Float)

    current_temperature = Column(Float)

    humidity = Column(Float)

    status = Column(String)