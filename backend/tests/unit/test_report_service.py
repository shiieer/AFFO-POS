from datetime import datetime, timedelta, timezone

from app.schemas.order import OrderCreate, OrderItemCreate
from app.services import order_service, report_service
from tests.helpers.factories import create_menu_item_db


def test_generate_sales_report_with_date_range(db_session):
    menu = create_menu_item_db(db_session, price=20000)

    order_service.create_order(
        db_session,
        OrderCreate(items=[OrderItemCreate(menu_item_id=menu.id, quantity=1)]),
    )

    now = datetime.now(timezone.utc)
    report = report_service.generate_sales_report(
        db_session, start_date=now - timedelta(days=1), end_date=now + timedelta(days=1)
    )

    assert report.total_orders == 1
    assert report.start_date is not None
    assert report.end_date is not None
