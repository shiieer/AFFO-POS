from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class MenuItemCreate(BaseModel):
    name: str
    description: str | None = None
    price: float = Field(gt=0)
    category: str = "General"
    image_url: str | None = None
    is_available: bool = True


class MenuItemUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    price: float | None = None
    category: str | None = None
    image_url: str | None = None
    is_available: str | None = None


class MenuItemOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    description: str | None
    price: float
    category: str
    image_url: str | None
    is_available: bool
    created_at: datetime
    updated_at: datetime
