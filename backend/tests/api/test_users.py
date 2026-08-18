def test_create_user_success(client, admin_headers):
    response = client.post(
        "/users",
        headers=admin_headers,
        json={"username": "newstaff", "password": "staff123", "role": "staff"},
    )

    assert response.status_code == 201
    data = response.json()
    assert data["username"] == "newstaff"
    assert data["role"] == "staff"
    assert data["is_active"] is True


def test_create_user_duplicate_username(client, admin_headers):
    payload = {"username": "duplicate_user", "password": "staff123", "role": "staff"}

    first = client.post("/users", headers=admin_headers, json=payload)
    assert first.status_code == 201

    second = client.post("/users", headers=admin_headers, json=payload)

    assert second.status_code == 400
    assert second.json()["detail"] == "Username already exists"


def test_create_user_requires_admin(client, staff_headers):
    response = client.post(
        "/users",
        headers=staff_headers,
        json={"username": "hacker", "password": "staff123", "role": "staff"},
    )

    assert response.status_code == 403
