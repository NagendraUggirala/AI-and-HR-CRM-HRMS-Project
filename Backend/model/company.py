from sqlalchemy import Column, Integer, String, Float, Text, DateTime
from datetime import datetime
from core.database import Base


class Company(Base):
    __tablename__ = "companies"

    id = Column(Integer, primary_key=True, index=True)

    company_name = Column(String, nullable=False, index=True)
    email = Column(String, nullable=True, index=True)

    phone_number = Column(String, nullable=False)
    phone_number2 = Column(String, nullable=True)

    location = Column(String)
    address = Column(String)
    country = Column(String)
    state = Column(String)
    city = Column(String)
    zipcode = Column(String)

    rating = Column(Float)
    logo = Column(String)

    fax = Column(String)
    website = Column(String)

    owner = Column(String)

    tags = Column(String)   # CSV storage (temporary solution)
    deals = Column(String)

    industry = Column(String)
    source = Column(String)
    currency = Column(String)
    language = Column(String)

    about = Column(Text)

    facebook = Column(String)
    twitter = Column(String)
    linkedin = Column(String)
    skype = Column(String)
    whatsapp = Column(String)
    instagram = Column(String)

    visibility = Column(String, default="private")
    status = Column(String)