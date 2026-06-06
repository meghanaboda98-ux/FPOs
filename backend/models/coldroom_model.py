from sqlalchemy import (
    Column,
    Integer,
    String,
    Float
)

from database import Base


class ColdRoom(Base):

    __tablename__ = "coldrooms"

    id = Column(
        Integer,
        primary_key=True
    )

    coldroom_name = Column(String)

    warehouse_name = Column(String)

    category = Column(String)

    temperature = Column(Float)

    humidity = Column(Float)

    status = Column(String)