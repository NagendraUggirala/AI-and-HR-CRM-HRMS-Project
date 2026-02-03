# core/database.py

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from sqlmodel import SQLModel, Session
from core.config import settings

# ----------------------------
# Database URL
# ----------------------------
DATABASE_URL = settings.DATABASE_URL

# ----------------------------
# Engine (SYNC — REQUIRED)
# ----------------------------
engine = create_engine(
    DATABASE_URL,
    echo=True,
    pool_pre_ping=True,
)

# ----------------------------
# Unified Base (IMPORTANT)
# ----------------------------
class Base(DeclarativeBase):
    pass

# ----------------------------
# Session maker
# ----------------------------
SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False,
    class_=Session,  # allows session.exec() AND session.query()
)

# ----------------------------
# FastAPI Dependency
# ----------------------------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ----------------------------
# Initialize DB (startup only)
# ----------------------------
def init_db():
    # SQLModel tables
    SQLModel.metadata.create_all(bind=engine)

    # SQLAlchemy tables
    Base.metadata.create_all(bind=engine)
