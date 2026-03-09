from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    Enum,
    TIMESTAMP,
    func,
    JSON
)

from core.database import Base
import enum


# =========================
# ENUMS
# =========================

class LeadStatus(str, enum.Enum):
    Contacted = "Contacted"
    NotContacted = "Not Contacted"
    Closed = "Closed"
    Lost = "Lost"


class Visibility(str, enum.Enum):
    Private = "Private"
    Team = "Team"
    Public = "Public"


# =========================
# LEAD MODEL
# =========================

class Lead(Base):
    __tablename__ = "leads"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)

    company = Column(String)
    email = Column(String, index=True)
    phone = Column(String)
    location = Column(String)

    value = Column(Integer)
    currency = Column(String)

    status = Column(
        Enum(LeadStatus, name="lead_status_enum"),
        nullable=False,
        server_default="Not Contacted"
    )

    visibility = Column(
        Enum(Visibility, name="visibility_enum"),
        nullable=False,
        server_default="Private"
    )

    source = Column(String)
    industry = Column(String)

    owner = Column(String, index=True)

    tags = Column(
        JSON,
        nullable=False,
        server_default="[]"
    )

    description = Column(Text)

    created_at = Column(
        TIMESTAMP,
        server_default=func.now(),
        nullable=False
    )

    updated_at = Column(
        TIMESTAMP,
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False
    )