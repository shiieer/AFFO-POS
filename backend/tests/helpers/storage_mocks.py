from io import BytesIO

from PIL import Image


def make_png_bytes(width: int = 10, height: int = 10) -> bytes:
    image = Image.new("RGB", (width, height), color="red")
    buffer = BytesIO()
    image.save(buffer, format="PNG")
    return buffer.getvalue()


def make_jpeg_bytes(width: int = 10, height: int = 10) -> bytes:
    image = Image.new("RGB", (width, height), color="blue")
    buffer = BytesIO()
    image.save(buffer, format="JPEG")
    return buffer.getvalue()
