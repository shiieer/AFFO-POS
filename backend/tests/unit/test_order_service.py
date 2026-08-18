import pytest
from app.models.order import Order, OrderStatus, PaymentMethod
from app.schemas.order import OrderCreate, OrderItemCreate
from app.services import order_service
from fastapi import HTTPException
from tests.helpers.factories import create_menu_item_db, create_table_db


def test_create_order_calculates_total_amount(db_session):
    menu_a = create_menu_item_db(db_session, name="item A", price=10000)
    menu_b = create_menu_item_db(db_session, name="item B", price=5000)

    payload = OrderCreate(
        customer_name="Ruka",
        items=[
            OrderItemCreate(menu_item_id=menu_a.id, quantity=2),
            OrderItemCreate(menu_item_id=menu_b.id, quantity=1),
        ],
    )

    result = order_service.create_order(db_session, payload)

    assert result.total_amount == 25000
    assert len(result.items) == 2
    assert result.items[0].subtotal == 20000
    assert result.items[1].subtotal == 5000


def test_create_order_with_table(db_session):
    table = create_table_db(db_session, name="T-01")
    menu = create_menu_item_db(db_session, price=15000)

    payload = OrderCreate(
        table_id=table.id, items=[OrderItemCreate(menu_item_id=menu.id, quantity=1)]
    )

    result = order_service.create_order(db_session, payload)

    assert result.table_id == table.id
    assert result.table_name == "T-01"
    assert result.total_amount == 15000


def test_create_raises_when_menu_item_missing(db_session):
    payload = OrderCreate(items=[OrderItemCreate(menu_item_id=9999, quantity=1)])

    with pytest.raises(HTTPException) as exc:
        order_service.create_order(db_session, payload)

    assert exc.value.status_code == 400
    assert exc.value.detail == "One or more menu items not found"


def test_create_order_raises_when_menu_item_unavailable(db_session):
    menu = create_menu_item_db(db_session, price=10000, is_available=False)

    payload = OrderCreate(items=[OrderItemCreate(menu_item_id=menu.id, quantity=1)])

    with pytest.raises(HTTPException) as exc:
        order_service.create_order(db_session, payload)

    assert exc.value.status_code == 400
    assert "unavailable" in exc.value.detail


def test_list_orders_active_only_excludes_served(db_session):
    menu = create_menu_item_db(db_session, price=10000)

    active = order_service.create_order(
        db_session,
        OrderCreate(items=[OrderItemCreate(menu_item_id=menu.id, quantity=1)]),
    )
    served = order_service.create_order(
        db_session,
        OrderCreate(items=[OrderItemCreate(menu_item_id=menu.id, quantity=1)]),
    )

    db_order = db_session.query(Order).filter_by(id=served.id).first()
    db_order.status = OrderStatus.SERVED
    db_session.commit()

    results = order_service.list_orders(db_session, active_only=True)
    ids = [o.id for o in results]

    assert active.id in ids
    assert served.id not in ids


def test_list_orders_with_status_filter(db_session):
    menu = create_menu_item_db(db_session, price=10000)

    order = order_service.create_order(
        db_session,
        OrderCreate(items=[OrderItemCreate(menu_item_id=menu.id, quantity=1)]),
    )

    db_order = db_session.query(Order).filter_by(id=order.id).first()
    db_order.status = OrderStatus.READY
    db_session.commit()

    results = order_service.list_orders(db_session, status_filter=OrderStatus.READY)

    assert len(results) == 1
    assert results[0].status == OrderStatus.READY


def test_get_order_not_found(db_session):
    with pytest.raises(HTTPException) as exc:
        order_service.get_order(db_session, 9999)

    assert exc.value.status_code == 404


def test_update_order_status_not_found(db_session, staff_user):
    with pytest.raises(HTTPException) as exc:
        order_service.update_order_status(
            db_session, 9999, OrderStatus.PREPARING, staff_user
        )

    assert exc.value.status_code == 404


def test_update_order_payment_not_found(db_session, staff_user):
    with pytest.raises(HTTPException) as exc:
        order_service.updated_order_payment(
            db_session, 9999, PaymentMethod.CASH, True, staff_user
        )

    assert exc.value.status_code == 404
