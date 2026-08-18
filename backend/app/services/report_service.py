from datetime import datetime

from sqlalchemy.orm import Session

from app.models.order import Order
from app.schemas.report import SalesReport


def generate_sales_report(
        db: Session,
        start_date: datetime | None = None,
        end_date: datetime | None = None,
) -> SalesReport:
    query = db.query(Order)

    if start_date:
        query = query.filter(Order.created_at >= start_date)
    if end_date:
        query = query.filter(Order.created_at <= end_date)

    orders = query.all()
    paid_orders = [o for o in orders if o.is_paid]

    total_revenue = sum(o.total_amount for o in paid_orders)
    paid_count = len(paid_orders)

    by_payment_method: dict[str, float] = {}
    for order in paid_orders:
        key = order.payment_method.value if order.payment_method else "unknown"
        by_payment_method[key] = by_payment_method.get(key, 0.0) + order.total_amount

    by_status: dict[str, int] = {}
    for order in orders:
        key = order.status.value
        by_status[key] = by_status.get(key, 0) + 1

    return SalesReport(
        start_date=start_date,
        end_date=end_date,
        total_orders=len(orders),
        paid_orders=paid_count,
        total_revenue=total_revenue,
        average_order_value=(total_revenue / paid_count) if paid_count else 0.0,
        by_payment_method=by_payment_method,
        by_status=by_status,
    )