from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlmodel import Session, select
from pydantic import BaseModel, EmailStr
from typing import Optional, Literal, List
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import jwt, JWTError
from fastapi_mail import FastMail, MessageSchema, MessageType

from core.database import get_db
from model.models import User
from core.mail import mail_config

# ======================================================
# ROUTER
# ======================================================
router = APIRouter(prefix="/api/auth", tags=["Auth"])

# ======================================================
# PASSWORD HASHING
# ======================================================
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)

# ======================================================
# JWT CONFIG
# ======================================================
SECRET_KEY = "your_super_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 1440

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

# ======================================================
# EMAIL SENDER
# ======================================================
async def send_email(to: str, subject: str, body: str):
    message = MessageSchema(
        subject=subject,
        recipients=[to],
        body=body,
        subtype=MessageType.plain
    )
    fm = FastMail(mail_config)
    await fm.send_message(message)

# ======================================================
# SCHEMAS
# ======================================================
class UserCreate(BaseModel):
    name: str
    username: Optional[str] = None
    email: EmailStr
    password: str
    role: Literal["recruiter", "company", "superadmin"]
    company_name: Optional[str] = None
    company_website: Optional[str] = None
    company_id: Optional[str] = None


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

# ======================================================
# TOKEN HELPERS
# ======================================================
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# ======================================================
# CURRENT USER
# ======================================================
def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid authentication credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str | None = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = db.get(User, int(user_id))
    if not user:
        raise credentials_exception

    return user

# ======================================================
# ROLE-BASED ACCESS (🔥 THIS FIXES YOUR ERROR)
# ======================================================
def require_roles(allowed_roles: List[str]):
    def role_checker(
        current_user: User = Depends(get_current_user)
    ) -> User:
        if current_user.role not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not have permission to perform this action"
            )
        return current_user
    return role_checker

# ======================================================
# SIGNUP
# ======================================================
@router.post("/signup", status_code=status.HTTP_201_CREATED)
async def signup(payload: UserCreate, db: Session = Depends(get_db)):
    existing = db.exec(
        select(User).where(User.email == payload.email)
    ).first()

    if existing:
        raise HTTPException(status_code=409, detail="Email already registered")

    user = User(
        name=payload.name,
        username=payload.username,
        email=str(payload.email),
        hashed_password=get_password_hash(payload.password),
        role=payload.role,
        company_name=payload.company_name,
        company_website=payload.company_website,
        company_id=payload.company_id,
        is_active=False,
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    await send_email(
        to=user.email,
        subject="Account Created - Pending Approval",
        body=f"Hi {user.name},\n\nYour account is pending Super Admin approval."
    )

    return {
        "id": user.id,
        "email": user.email,
        "role": user.role,
        "message": "Account created, awaiting approval"
    }

# ======================================================
# LOGIN
# ======================================================
@router.post("/login", response_model=TokenResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    user = db.exec(
        select(User).where(User.email == payload.email)
    ).first()

    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token({"sub": str(user.id)})
    return {"access_token": token}
