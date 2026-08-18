from tests.helpers.factories import create_menu_item_api, create_menu_item_db


def test_list_menu_public(client, db_session):
    create_menu_item_db(db_session, name="Americano", price=18000)
    create_menu_item_db(db_session, name="Sold Out", price=10000, is_available=False)

    response = client.get("/menu")

    assert response.status_code == 200
    names = [item["name"] for item in response.json()]
    assert "Americano" in names
    assert "Sold Out" not in names


def test_create_menu_requires_admin(client, staff_headers):
    response = client.post(
        "/menu", headers=staff_headers, json={"name": "Tea", "price": 12000}
    )
    assert response.status_code == 403


def test_create_and_update_menu(client, admin_headers):
    created = create_menu_item_api(
        client, admin_headers, name="Cappuccino", price=25000
    )

    response = client.put(
        f"/menu/{created['id']}", headers=admin_headers, json={"price": 27000}
    )

    assert response.status_code == 200
    assert response.json()["price"] == 27000


def test_delete_menu_not_found(client, admin_headers):
    response = client.delete("/menu/9999", headers=admin_headers)
    assert response.status_code == 404


def test_update_deleted_menu_item(client, admin_headers):
    created = create_menu_item_api(client, admin_headers, name="To delete", price=15000)

    delete_response = client.delete(f"/menu/{created['id']}", headers=admin_headers)
    assert delete_response.status_code == 200

    update_response = client.put(
        f"/menu/{created['id']}", headers=admin_headers, json={"price": 20000}
    )

    assert update_response.status_code == 404
    assert update_response.json()["detail"] == "Menu item not found"


def test_create_duplicate_menu_item_name(client, admin_headers):
    first = create_menu_item_api(
        client, admin_headers, name="Duplicate Latte", price=20000
    )
    second = create_menu_item_api(
        client, admin_headers, name="Duplicate Latte", price=22000
    )

    assert first["name"] == second["name"]
    assert first["id"] != second["id"]


def test_create_menu_with_zero_price(client, admin_headers):
    response = client.post(
        "/menu", headers=admin_headers, json={"name": "Free Item", "price": 0}
    )

    assert response.status_code == 422


def test_create_menu_with_negative_price(client, admin_headers):
    response = client.post(
        "/menu", headers=admin_headers, json={"name": "Bad price", "price": -1000}
    )

    assert response.status_code == 422
