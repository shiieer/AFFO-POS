from datetime import datetime

from fastapi import APIRouter, Query

from app.dependencies import AdminUser, DbSession
from app.schemas.report import SalesReport
from app.services import report_service

router = APIRouter(prefix="/reports", tags=["Reports"])


@router.get("/sales", response_model=SalesReport)
def sales_report(
    _: AdminUser,
    db: DbSession,
    start_date: datetime | None = Query(default=None),
    end_date: datetime | None = Query(default=None),
):
    return report_service.generate_sales_report(db, start_date, end_date)
