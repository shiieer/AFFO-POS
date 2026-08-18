from app.config import settings
from app.core.security import create_access_token, hash_password, verify_password
from jose import jwt


def test_hash_password_returns_bcrypt_hash():
    hashed = hash_password("secret123")

    assert hashed != "secret123"
    assert hashed.startswith("$2b$")


def test_verify_password_accepts_coorect_password():
    hashed = hash_password("secret123")

    assert verify_password("wrong", hashed) is False


def test_create_access_token_contains_subject_and_role():
    token = create_access_token(subject="admin", role="admin")

    payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])

    assert payload["sub"] == "admin"
    assert payload["role"] == "admin"
    assert "exp" in payload
