from app.config import settings
from app.core.security import create_access_token
from app.models.user import User
from jose import jwt


def test_me_rejects_invalid_token(client):
    response = client.get(
        "/auth/me", headers={"Authorization": "Bearer not-a-real-token"}
    )

    assert response.status_code == 401
    assert response.json()["detail"] == "Invalid or expired token"


def test_me_rejects_token_without_subject(client):
    token = jwt.encode(
        {"role": "admin"}, settings.SECRET_KEY, algorithm=settings.ALGORITHM
    )

    response = client.get("/auth/me", headers={"Authorization": f"Bearer {token}"})

    assert response.status_code == 401


def test_me_rejects_inactive_user(client, db_session, admin_credentials):
    token = create_access_token(subject=admin_credentials["username"], role="admin")

    user = (
        db_session.query(User)
        .filter(User.username == admin_credentials["username"])
        .first()
    )
    user.is_active = False
    db_session.commit()

    response = client.get("/auth/me", headers={"Authorization": f"Bearer {token}"})

    assert response.status_code == 401
