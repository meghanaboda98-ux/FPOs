from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime
from datetime import datetime
from database import Base


class Inventory(Base):

    __tablename__ = "inventory"

    id = Column(Integer, primary_key=True)

    farmer_name = Column(String)

    phone_number = Column(String)

    product_name = Column(String)

    category = Column(String)

    quantity = Column(Float)

    warehouse_name = Column(String)

    coldroom_name = Column(String)

    current_temperature = Column(Float)

    humidity = Column(Float)

    quality = Column(Float)

    spoilage = Column(Float)

    storage_days = Column(Integer)

    shelf_life_remaining = Column(Integer)

    dispatch_priority = Column(String)

    temperature_status = Column(String)

    chilling_injury = Column(Boolean)

    status = Column(String)

    created_at = Column(DateTime, default=datetime.utcnow)

    dispatched_at = Column(DateTime, nullable=True)