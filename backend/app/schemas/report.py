from datetime import datetime

from pydantic import BaseModel


class SalesPoint(BaseModel):
    label: str
    value: float


class TopSellingItem(BaseModel):
    menu_item_id: int
    name: str
    quantity_sold: int
    revenue: float


class SalesReport(BaseModel):
    start_date: datetime | None = None
    end_date: datetime | None = None
    total_orders: int
    paid_orders: int
    total_revenue: float
    average_order_value: float
    by_payment_method: dict[str, float]
    by_status: dict[str, int]
    sales_over_time: list[SalesPoint] = []
    top_items: list[TopSellingItem] = []
