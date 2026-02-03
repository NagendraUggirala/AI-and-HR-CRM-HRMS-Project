from sqlalchemy import Column, Integer, String, Date, Numeric
from core.database import Base

class Asset(Base):
    __tablename__ = "assets"

    id = Column(Integer, primary_key=True, index=True)

    asset_name = Column(String(255), nullable=False)
    category = Column(String(100), nullable=False)

    make = Column(String(100), nullable=False)
    model = Column(String(100), nullable=False)

    serial_number = Column(String(100), unique=True, nullable=False)

    purchase_date = Column(Date, nullable=False)
    purchase_price = Column(Numeric(12, 2), nullable=False)

    depreciation_rate = Column(Integer, nullable=False)

    condition = Column(String(50), nullable=False)
    location = Column(String(100), nullable=False)
    department = Column(String(100), nullable=False)

    warranty_until = Column(Date, nullable=True)
