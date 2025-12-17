from sqlalchemy.orm import Session
from model import Lead


def create_lead(db: Session, lead):
    db_lead = Lead(**lead.dict())
    db.add(db_lead)
    db.commit()
    db.refresh(db_lead)
    return db_lead


def get_leads(db: Session, skip: int = 0, limit: int = 50):
    return db.query(Lead).offset(skip).limit(limit).all()


def get_lead(db: Session, lead_id: int):
    return db.query(Lead).filter(Lead.id == lead_id).first()


def update_lead(db: Session, lead_id: int, updated):
    db_lead = get_lead(db, lead_id)
    if not db_lead:
        return None

    for key, value in updated.dict(exclude_unset=True).items():
        setattr(db_lead, key, value)

    db.commit()
    db.refresh(db_lead)
    return db_lead


def delete_lead(db: Session, lead_id: int):
    db_lead = get_lead(db, lead_id)
    if not db_lead:
        return False

    db.delete(db_lead)
    db.commit()
    return True
