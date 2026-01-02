from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from typing import Optional
from pydantic import Field
from core.database import Base

class Candidate(Base):
    __tablename__ = "onboarding_Forms"

    id = Column(Integer, primary_key=True, index=True)

    full_name = Column(String, nullable=False)
    email = Column(String, nullable=True)
    mobile: Optional[str] = Field(
        default=None,
        pattern=r"^[0-9]{10}$",
        description="10 digit mobile number"
    )

    invite_token = Column(String, unique=True, index=True, nullable=False)
    token_expires_at = Column(DateTime, nullable=False)

    status = Column(String, default="SENT")  # SENT | SUBMITTED | APPROVED | REJECTED
    created_at = Column(DateTime, default=datetime.utcnow)
