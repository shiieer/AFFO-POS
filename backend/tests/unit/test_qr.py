import re

from app.config import settings
from app.core.qr import (
    build_menu_url,
    generator_qr_token,
    get_qr_public_url,
    save_qr_image,
)


def test_generator_qr_token_is_url_safe_string():
    token = generator_qr_token()

    assert isinstance(token, str)
    assert len(token) >= 16
    assert re.fullmatch(r"[-A-Za-z0-9_]+", token)


def test_generator_qr_token_is_unique():
    tokens = {generator_qr_token() for _ in range(20)}

    assert len(tokens) == 20


def test_build_menu_url_format():
    url = build_menu_url(table_id=7, qr_token="abc123")

    assert url.endswith("/?table=7&token=abc123")
    assert "table=7" in url
    assert "token=abc123" in url


def test_get_qr_public_url():
    url = get_qr_public_url(table_id=5)

    assert url.endswith(f"/{settings.SUPABASE_QR_BUCKET}/table_5.png")
    assert "storage/v1/object/public" in url


def test_save_qr_image_uploads_png(mock_supabase_storage):
    url = save_qr_image(
        "http://localhost:3000/?table=1&token=abc",
        "table_1.png",
    )

    assert url.endswith("/qr_codes/table_1.png")
    stored = mock_supabase_storage["uploaded"]["qr_codes/table_1.png"]
    assert stored["content_type"] == "image/png"
    assert stored["data"].startswith(b"\x89PNG")
