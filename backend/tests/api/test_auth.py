def test_login_success(client, admin_credentials):
    response = client.post("/auth/login", json=admin_credentials)

    assert response.status_code == 200
    data = response.json()
    assert data["token_type"] == "bearer"
    assert data["username"] == admin_credentials["username"]
    assert data["role"] == "admin"
    assert "access_token" in data


def test_login_wrong_password(client, admin_credentials):
    response = client.post(
        "/auth/login",
        json={"username": admin_credentials["username"], "password": "wrong"},
    )

    assert response.status_code == 401
    assert response.json()["detail"] == "Incorrect username or password"


def test_me_requires_auth(client):
    response = client.get("/auth/me")
    assert response.status_code == 401


def test_me_success(client, admin_headers, admin_credentials):
    response = client.get("/auth/me", headers=admin_headers)

    assert response.status_code == 200
    data = response.json()
    assert data["username"] == admin_credentials["username"]
    assert data["role"] == "admin"
    assert data["is_active"] is True


def test_login_empty_username(client, admin_credentials):
    response = client.post(
        "/auth/login", json={"username": "", "password": admin_credentials["password"]}
    )

    assert response.status_code == 401
    assert response.json()["detail"] == "Incorrect username or password"


def test_login_empty_password(client, admin_credentials):
    response = client.post(
        "/auth/login", json={"username": admin_credentials["username"], "password": ""}
    )

    assert response.status_code == 401
    assert response.json()["detail"] == "Incorrect username or password"


def test_login_missing_username(client):
    response = client.post("/auth/login", json={"password": "admin123"})

    assert response.status_code == 422


def test_login_missing_password(client):
    response = client.post("/auth/login", json={"username": "admin"})

    assert response.status_code == 422


def test_login_both_fields_empty(client):
    response = client.post("/auth/login", json={"username": "", "password": ""})

    assert response.status_code == 401


def test_root_endpoint(client):
    response = client.get("/")

    assert response.status_code == 200
    data = response.json()
    assert "message" in data
    assert data["docs"] == "/docs"
