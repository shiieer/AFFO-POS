from app.core.qr import generator_qr_token
from app.models.menu import MenuItem
from app.models.table import Table
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session


def create_menu_item_db(
    db: Session,
    *,
    name: str = "Expresso",
    price: float = 15000,
    category: str = "Coffe",
    is_available: bool = True,
) -> MenuItem:
    item = MenuItem(
        name=name,
        description="Test item",
        price=price,
        category=category,
        is_available=is_available,
    )
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


def create_menu_item_api(
    client: TestClient,
    headers: dict,
    *,
    name: str = "Latte",
    price: float = 22000,
) -> dict:
    response = client.post(
        "/menu",
        headers=headers,
        json={
            "name": name,
            "description": "Milk Coffee",
            "price": price,
            "category": "Coffe",
            "is_available": True,
        },
    )
    assert response.status_code == 201, response.text
    return response.json()


def create_table_db(db: Session, *, name: str = "Table 1") -> Table:
    table = Table(name=name, qr_token=generator_qr_token())
    db.add(table)
    db.commit()
    db.refresh(table)
    return table


def create_table_api(
    client: TestClient, headers: dict, *, name: str = "Table A"
) -> dict:
    response = client.post("/tables", headers=headers, json={"name": name})
    assert response.status_code == 201, response.text
    return response.json()


def create_order_payload(
    menu_item_id: int, *, table_id: int | None = None, quantity: int = 2
) -> dict:
    return {
        "table_id": table_id,
        "customer_name": "Ruka",
        "notes": "No sugar",
        "items": [{"menu_item_id": menu_item_id, "quantity": quantity, "notes": None}],
    }
