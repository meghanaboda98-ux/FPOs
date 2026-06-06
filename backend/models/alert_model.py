from sqlalchemy import (
    Column,
    Integer,
    String,
    Float
)

from database import Base

class Alert(Base):

    __tablename__ = "alerts"

    id = Column(
        Integer,
        primary_key=True
    )

    farmer_name = Column(String)
    product_name = Column(String)
    warehouse_name = Column(String)
    coldroom_name = Column(String)
    alert_type = Column(String)
    message = Column(String)
    current_temperature = Column(Float)
    quality = Column(Float)
    spoilage = Column(Float)
    sms_status = Column(String)
    status = Column(String)