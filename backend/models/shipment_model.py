from sqlalchemy import (
    Column,
    Integer,
    String,
    Float
)

from database import Base


class Shipment(Base):

    __tablename__ = "shipments"

    id = Column(
        Integer,
        primary_key=True
    )

    truck_number = Column(String)
    transporter_name = Column(String)
    product_name = Column(String)
    source = Column(String)
    destination = Column(String)
    quantity = Column(Float)
    transport_temperature = Column(Float)
    humidity = Column(Float)
    quality = Column(Float)
    spoilage = Column(Float)
    travel_hours = Column(Float)
    status = Column(String)