import io
import secrets

import qrcode

from app.config import settings
from app.core.storage import upload_bytes


def generator_qr_token() -> str:
    return secrets.token_urlsafe(16)


def build_menu_url(table_id: int, qr_token: str) -> str:
    base = settings.CUSTOMER_WEB_URL.rstrip("/")
    return f"{base}/?table={table_id}&token={qr_token}"


def save_qr_image(url: str, filename: str) -> str:
    buffer = io.BytesIO()
    qrcode.make(url).save(buffer, format="PNG")
    buffer.seek(0)

    return upload_bytes(
        bucket=settings.SUPABASE_QR_BUCKET,
        path=filename,
        data=buffer.getvalue(),
        content_type="image/png",
        upsert=True,
    )


def get_qr_public_url(table_id: int) -> str:
    from app.core.storage import build_public_url

    return build_public_url(settings.SUPABASE_QR_BUCKET, f"table_{table_id}.png")
