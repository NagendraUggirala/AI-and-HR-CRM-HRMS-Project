# schema/lead.py
from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum


class LeadStatus(str, Enum):
    Contacted = "Contacted"
    Not_Contacted = "Not_Contacted"
    Closed = "Closed"
    Lost = "Lost"


class Visibility(str, Enum):
    Private = "Private"
    Team = "Team"
    Public = "Public"


class LeadBase(BaseModel):
    name: str
    company: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    location: Optional[str] = None

    value: Optional[int] = Field(default=None, ge=0)
    currency: Optional[str] = None

    status: LeadStatus = LeadStatus.Not_Contacted
    visibility: Visibility = Visibility.Private

    source: Optional[str] = None
    industry: Optional[str] = None
    owner: Optional[str] = None

    tags: List[str] = Field(default_factory=list)
    description: Optional[str] = None

    model_config = {"from_attributes": True}


class LeadCreate(LeadBase):
    pass


class LeadUpdate(BaseModel):
    name: Optional[str] = None
    company: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    value: Optional[int] = Field(default=None, ge=0)
    currency: Optional[str] = None
    status: Optional[LeadStatus] = None
    visibility: Optional[Visibility] = None
    source: Optional[str] = None
    industry: Optional[str] = None
    owner: Optional[str] = None
    tags: Optional[List[str]] = None
    description: Optional[str] = None

    model_config = {"from_attributes": True}


class LeadRead(LeadBase):
    id: int
    created_at: datetime
    updated_at: datetime
    