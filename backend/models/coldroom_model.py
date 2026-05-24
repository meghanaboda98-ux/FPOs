from pydantic import BaseModel


class ColdRoomCreate(BaseModel):

    room_name: str

    current_temp: float