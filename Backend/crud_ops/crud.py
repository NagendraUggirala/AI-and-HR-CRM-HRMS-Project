from datetime import datetime
from sqlalchemy.orm import Session
from sqlalchemy import select

import model
from model.models import LeaveRequest


# =========================
# COMMON HELPER
# =========================

def save(db: Session, obj):
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


# =========================
# CONTACT CRUD
# =========================

def email_exists(db: Session, email: str, exclude_id: int | None = None):
    query = db.query(model.Contact).filter(model.Contact.email == email)

    if exclude_id:
        query = query.filter(model.Contact.id != exclude_id)

    return query.first()


def create_contact(db: Session, contact: dict):

    if contact.get("email") and email_exists(db, contact["email"]):
        raise ValueError("Email already exists")

    db_contact = model.Contact(**contact)

    return save(db, db_contact)


def get_contacts(db: Session, skip: int = 0, limit: int = 50):

    return (
        db.query(model.Contact)
        .offset(skip)
        .limit(limit)
        .all()
    )


def get_contact(db: Session, contact_id: int):

    return db.get(model.Contact, contact_id)


def update_contact(db: Session, contact_id: int, updated: dict):

    db_contact = get_contact(db, contact_id)

    if not db_contact:
        return None

    if updated.get("email") and email_exists(db, updated["email"], contact_id):
        raise ValueError("Email already exists")

    for key, value in updated.items():
        if hasattr(db_contact, key):
            setattr(db_contact, key, value)

    if hasattr(db_contact, "updated_at"):
        db_contact.updated_at = datetime.utcnow()

    return save(db, db_contact)


def delete_contact(db: Session, contact_id: int):

    db_contact = get_contact(db, contact_id)

    if not db_contact:
        return False

    db.delete(db_contact)
    db.commit()

    return True


# =========================
# LEAD CRUD
# =========================

def create_lead(db: Session, lead):
    db_lead = model.Lead(**lead.model_dump())

    db.add(db_lead)
    db.commit()
    db.refresh(db_lead)

    return db_lead


def get_leads(db: Session, skip: int = 0, limit: int = 100):

    return (
        db.query(model.Lead)
        .offset(skip)
        .limit(limit)
        .all()
    )


def get_lead(db: Session, lead_id: int):

    return db.get(model.Lead, lead_id)


def update_lead(db: Session, lead_id: int, updated: dict):

    db_lead = get_lead(db, lead_id)

    if not db_lead:
        return None

    for key, value in updated.items():
        if hasattr(db_lead, key):
            setattr(db_lead, key, value)

    if hasattr(db_lead, "updated_at"):
        db_lead.updated_at = datetime.utcnow()

    return save(db, db_lead)


def delete_lead(db: Session, lead_id: int):

    db_lead = get_lead(db, lead_id)

    if not db_lead:
        return False

    db.delete(db_lead)
    db.commit()

    return True


# =========================
# PIPELINE CRUD
# =========================

def create_pipeline(db: Session, pipeline: dict):

    db_pipeline = model.Pipeline(**pipeline)

    return save(db, db_pipeline)


def get_pipelines(db: Session):

    return db.query(model.Pipeline).all()


def get_pipeline(db: Session, pipeline_id: int):

    return db.get(model.Pipeline, pipeline_id)


def update_pipeline(db: Session, pipeline_id: int, updated: dict):

    db_pipeline = get_pipeline(db, pipeline_id)

    if not db_pipeline:
        return None

    for key, value in updated.items():
        if hasattr(db_pipeline, key):
            setattr(db_pipeline, key, value)

    return save(db, db_pipeline)


def delete_pipeline(db: Session, pipeline_id: int):

    db_pipeline = get_pipeline(db, pipeline_id)

    if not db_pipeline:
        return False

    db.delete(db_pipeline)
    db.commit()

    return True


# =========================
# ACTIVITY CRUD
# =========================

def create_activity(db: Session, activity: dict):

    db_activity = model.Activity(**activity)

    return save(db, db_activity)


def get_activities(db: Session, skip: int = 0, limit: int = 100):

    return (
        db.query(model.Activity)
        .offset(skip)
        .limit(limit)
        .all()
    )


def get_activity(db: Session, activity_id: int):

    return db.get(model.Activity, activity_id)


def update_activity(db: Session, activity_id: int, updated: dict):

    db_activity = get_activity(db, activity_id)

    if not db_activity:
        return None

    for key, value in updated.items():
        if hasattr(db_activity, key):
            setattr(db_activity, key, value)

    if hasattr(db_activity, "updated_at"):
        db_activity.updated_at = datetime.utcnow()

    return save(db, db_activity)


def delete_activity(db: Session, activity_id: int):

    db_activity = get_activity(db, activity_id)

    if not db_activity:
        return False

    db.delete(db_activity)
    db.commit()

    return True


# =========================
# LEAVE CRUD
# =========================

def create_leave(db: Session, leave: dict):

    db_leave = LeaveRequest(**leave)

    return save(db, db_leave)


def get_leaves(db: Session):

    return db.query(LeaveRequest).all()


def get_leave_by_id(db: Session, leave_id: int):

    return db.get(LeaveRequest, leave_id)