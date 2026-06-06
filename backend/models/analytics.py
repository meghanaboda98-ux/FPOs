from sqlalchemy import (
    Column,
    Integer,
    Float
)

from database import Base


class Analytics(Base):

    __tablename__ = "analytics"

    id = Column(
        Integer,
        primary_key=True
    )

    total_products = Column(Integer)
    total_farmers = Column(Integer)
    total_warehouses = Column(Integer)
    total_shipments = Column(Integer)
    total_transporters = Column(Integer)
    average_quality = Column(Float)
    average_spoilage = Column(Float)
    warehouse_utilization = Column(Float)