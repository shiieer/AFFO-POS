from app.database import get_db


def test_get_db_yields_session_and_close():
    db_gen = get_db()
    session = next(db_gen)

    try:
        assert session is not None
    finally:
        db_gen.close()
