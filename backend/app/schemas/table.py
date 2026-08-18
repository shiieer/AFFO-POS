from datetime import datetime

from pydantic import BaseModel, ConfigDict


class TableCreate(BaseModel):
    name: str


class TableOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    qr_token: str
    is_active: bool
    created_at: datetime
    qr_url: str | None = None
    qr_image_url: str | None = None
