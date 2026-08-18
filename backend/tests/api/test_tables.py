from tests.helpers.factories import create_table_api


def test_list_tables_requires_admin(client, staff_headers):
    response = client.get("/tables", headers=staff_headers)
    assert response.status_code == 403


def test_create_and_list_tables(client, admin_headers):
    created = create_table_api(client, admin_headers, name="VIP 1")

    response = client.get("/tables", headers=admin_headers)

    assert response.status_code == 200
    names = [t["name"] for t in response.json()]
    assert created["name"] in names
    assert created["qr_url"] is not None


def test_create_duplcate_table_name(client, admin_headers):
    create_table_api(client, admin_headers, name="Duplicate")

    response = client.post("/tables", headers=admin_headers, json={"name": "Duplicate"})
    assert response.status_code == 400


def test_create_table_returns_qr_image_url(client, admin_headers, mock_supabase_storage):
    created = create_table_api(client, admin_headers, name="QR Table")

    assert created["qr_url"] is not None
    assert created["qr_image_url"] is not None
    assert "qr_codes/table_" in created["qr_image_url"]
    assert len(mock_supabase_storage["uploaded"]) == 1


def test_list_tables_includes_qr_image_url(client, admin_headers):
    create_table_api(client, admin_headers, name="Listed Table")

    response = client.get("/tables", headers=admin_headers)

    assert response.status_code == 200
    table = response.json()[0]
    assert table["qr_image_url"] is not None
    assert "qr_codes/table_" in table["qr_image_url"]


def test_get_table_qr_redirects_to_supabase(client, admin_headers):
    created = create_table_api(client, admin_headers, name="Redirect Table")

    response = client.get(
        f"/tables/{created['id']}/qr",
        headers=admin_headers,
        follow_redirects=False,
    )

    assert response.status_code == 302
    assert "qr_codes/table_" in response.headers["location"]
    assert "storage/v1/object/public" in response.headers["location"]
