# crud_ops.py
from sqlmodel import Session, select
from model.lead import Lead


def get_leads(db: Session, skip: int = 0, limit: int = 100):
    return db.exec(select(Lead).offset(skip).limit(limit)).all()


def get_lead(db: Session, lead_id: int):
    return db.get(Lead, lead_id)


def create_lead(db: Session, lead_in):
    lead = Lead(**lead_in.model_dump())
    db.add(lead)
    db.commit()
    db.refresh(lead)
    return lead


def update_lead(db: Session, lead_id: int, lead_in):
    lead = db.get(Lead, lead_id)
    if not lead:
        return None

    data = lead_in.model_dump(exclude_unset=True)
    for k, v in data.items():
        setattr(lead, k, v)

    db.add(lead)
    db.commit()
    db.refresh(lead)
    return lead


def delete_lead(db: Session, lead_id: int):
    lead = db.get(Lead, lead_id)
    if not lead:
        return False

    db.delete(lead)
    db.commit()
    return True
