# app/crud.py
from datetime import datetime
from typing import Optional
from sqlalchemy.orm import Session
from fastapi import HTTPException

from schemas import (
    ContactResponse,
    ContactCreate,
    ContactUpdate,
    CompanyResponse,
    DealOut,
    LeadRead,
    Activity,
)


import model


# -------------------- CONTACT CRUD -------------------- #

def create_contact(db: Session, contact: ContactCreate):
    if contact.email:
        existing = db.query(model.Contact).filter(model.Contact.email == contact.email).first()
        if existing:
            raise HTTPException(status_code=400, detail="Email already exists")
    
    db_contact = model.Contact(**contact.dict())
    db.add(db_contact)
    db.commit()
    db.refresh(db_contact)
    return db_contact


def get_contacts(db: Session, skip: int = 0, limit: int = 10):
    return db.query(model.Contact).offset(skip).limit(limit).all()


def get_contact(db: Session, contact_id: int):
    return db.query(model.Contact).filter(model.Contact.id == contact_id).first()


def update_contact(db: Session, contact_id: int, updated: ContactUpdate):
    db_contact = db.query(model.Contact).filter(model.Contact.id == contact_id).first()
    if not db_contact:
        return None

    update_data = updated.dict(exclude_unset=True)
    if "email" in update_data and update_data["email"]:
        existing = db.query(model.Contact).filter(
            model.Contact.email == update_data["email"],
            model.Contact.id != contact_id
        ).first()
        if existing:
            raise HTTPException(status_code=400, detail="Email already exists")

    for key, value in update_data.items():
        setattr(db_contact, key, value)

    db.commit()
    db.refresh(db_contact)
    return db_contact


def delete_contact(db: Session, contact_id: int):
    db_contact = db.query(model.Contact).filter(model.Contact.id == contact_id).first()
    if not db_contact:
        return None

    db.delete(db_contact)
    db.commit()
    return db_contact


# -------------------- COMPANY CRUD -------------------- #

def create_company(db: Session, company: CompanyResponse):
    db_company = model.Company(**company.dict())
    db.add(db_company)
    db.commit()
    db.refresh(db_company)
    return db_company


def get_companies(db: Session, skip: int = 0, limit: int = 100):
    return db.query(model.Company).offset(skip).limit(limit).all()


# -------------------- LEAD CRUD -------------------- #

def get_leads(db: Session, skip: int = 0, limit: int = 100):
    return db.query(model.Lead).offset(skip).limit(limit).all()


def get_lead(db: Session, lead_id: int) -> Optional[model.Lead]:
    return db.query(model.Lead).filter(model.Lead.id == lead_id).first()


def create_lead(db: Session, lead_in: LeadRead) -> model.Lead:
    db_lead = model.Lead(**lead_in.dict())
    db.add(db_lead)
    db.commit()
    db.refresh(db_lead)
    return db_lead


def update_lead(db: Session, lead_id: int, lead_in: LeadRead) -> Optional[model.Lead]:
    db_lead = db.query(model.Lead).filter(model.Lead.id == lead_id).first()
    if not db_lead:
        return None

    update_data = lead_in.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_lead, key, value)

    db_lead.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(db_lead)
    return db_lead


def delete_lead(db: Session, lead_id: int) -> bool:
    db_lead = db.query(model.Lead).filter(model.Lead.id == lead_id).first()
    if not db_lead:
        return False

    db.delete(db_lead)
    db.commit()
    return True


# -------------------- PIPELINE CRUD -------------------- #

def create_pipeline(db: Session, pipeline: DealOut):
    db_pipeline = model.Pipeline(**pipeline.dict())
    db.add(db_pipeline)
    db.commit()
    db.refresh(db_pipeline)
    return db_pipeline


def get_pipelines(db: Session, skip: int = 0, limit: int = 100):
    return db.query(model.Pipeline).offset(skip).limit(limit).all()


def delete_pipeline(db: Session, pipeline_id: int):
    db_pipeline = db.query(model.Pipeline).filter(model.Pipeline.id == pipeline_id).first()
    if db_pipeline:
        db.delete(db_pipeline)
        db.commit()
        return True
    return False


# -------------------- ACTIVITY CRUD -------------------- #

def get_activity(db: Session, activity_id: int):
    return db.query(model.Activity).filter(model.Activity.id == activity_id).first()


def get_activities(db: Session, skip: int = 0, limit: int = 100):
    return db.query(model.Activity).offset(skip).limit(limit).all()


def create_activity(db: Session, activity: Activity):
    db_activity = model.Activity(**activity.dict())
    db.add(db_activity)
    db.commit()
    db.refresh(db_activity)
    return db_activity


def update_activity(db: Session, activity_id: int, activity: Activity):
    db_activity = get_activity(db, activity_id)
    if not db_activity:
        return None
    for key, value in activity.dict(exclude_unset=True).items():
        setattr(db_activity, key, value)
    db.commit()
    db.refresh(db_activity)
    return db_activity


def delete_activity(db: Session, activity_id: int):
    db_activity = get_activity(db, activity_id)
    if not db_activity:
        return None
    db.delete(db_activity)
    db.commit()
    return db_activity
