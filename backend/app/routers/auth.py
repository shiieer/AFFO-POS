from fastapi import APIRouter, HTTPException, status

from app.core.security import create_access_token, verify_password
from app.dependencies import CurrentUser, DbSession
from app.models.user import User
from app.schemas.auth import LoginRequest, TokenResponse
from app.schemas.user import UserOut

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/login", response_model=TokenResponse)
def login(data: LoginRequest, db: DbSession):
    user = db.query(User).filter(User.username == data.username).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User account is inactive",
        )

    if not verify_password(data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )

    token = create_access_token(subject=user.username, role=user.role.value)
    return TokenResponse(access_token=token, role=user.role, username=user.username)


@router.get("/me", response_model=UserOut)
def me(current_user: CurrentUser):
    return current_user


@router.get("/staff", response_model=list[UserOut])
def get_active_staff(db: DbSession):
    return db.query(User).filter(User.is_active == True).all()
