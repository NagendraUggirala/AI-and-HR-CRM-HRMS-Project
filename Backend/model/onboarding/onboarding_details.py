# model/onboarding/onboarding_details.py
from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import date

class OnboardingDetails(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    full_name: str
    email: str
    mobile: str
    dob: Optional[date]
    gender: Optional[str]
    blood_group: Optional[str]
    address: Optional[str]
    emergency_contact: Optional[str]
    aadhaar: Optional[str]
    pan: Optional[str]
