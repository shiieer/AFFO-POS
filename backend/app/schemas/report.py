from datetime import datetime

from pydantic import BaseModel


class SalesReport(BaseModel):
    start_date: datetime | None = None
    end_date: datetime | None = None
    total_orders: int
    paid_orders: int
    total_revenue: float
    average_order_value: float
    by_payment_method: dict[str, float]
    by_status: dict[str, int]
