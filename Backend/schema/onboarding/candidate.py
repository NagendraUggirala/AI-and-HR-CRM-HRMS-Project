# schemas/candidate.py
from pydantic import BaseModel, EmailStr,field_validator
from typing import Optional
from pydantic import Field
import re

class CandidateCreate(BaseModel):
    full_name: str
    email: Optional[EmailStr] = None
    mobile: Optional[str] = Field(
        default=None,
        pattern=r"^[6-9]\d{9}$",
        description="10-digit Indian mobile number"
    )

class CandidateOut(BaseModel):
    id: int
    full_name: str
    email: Optional[str]
    mobile: Optional[str]
    status: str

    class Config:
        from_attributes = True
