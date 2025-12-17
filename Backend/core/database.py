# core/database.py

from sqlmodel import SQLModel, create_engine, Session
from sqlalchemy.orm import sessionmaker, declarative_base
from core.config import settings  # your settings

# ----------------------------
# Database URL
# ----------------------------
DATABASE_URL = settings.DATABASE_URL

# ----------------------------
# Engine (shared)
# ----------------------------
engine = create_engine(
    DATABASE_URL,
    echo=True,
    pool_pre_ping=True
)

# ----------------------------
# For SQLAlchemy models
# ----------------------------
Base = declarative_base()

# ----------------------------
# SQLModel Session maker
# ----------------------------
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
    class_=Session   # <-- IMPORTANT (ensures session.exec works)
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
# Initialize DB (run at startup)
# ----------------------------
def init_db():
    SQLModel.metadata.create_all(engine)
    Base.metadata.create_all(engine)
