from sqlalchemy import Column, Integer, String, Float
from database import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(
        Integer,
        primary_key=True
    )

    name = Column(String)

    category = Column(String)

    optimal_temperature = Column(Float)

    humidity = Column(Float)

    shelf_life = Column(Integer)

    respiration_rate = Column(Float)

    storage_type = Column(String)

    min_temperature = Column(Float)

    max_temperature = Column(Float)

    quality_threshold = Column(Float)
    
    model = Column(String)

    k_ref = Column(Float)

    Ea = Column(Float)
