from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from typing import List
import os
import uuid
import shutil

from schema import contact
from core.database import get_db
import crud_ops
from model import Contact as ContactModel

router = APIRouter()

UPLOAD_FOLDER = "uploads/profiles"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


# Convert DB → API response
def convert_contact_output(db_contact: ContactModel):
    if not db_contact:
        return None

    contact_dict = db_contact.__dict__.copy()

    # CSV → list
    if db_contact.tags:
        contact_dict["tags"] = db_contact.tags.split(",")
    else:
        contact_dict["tags"] = []

    # Normalize profile photo path
    if db_contact.profile_photo:
        normalized = db_contact.profile_photo.replace("\\", "/")
        if not normalized.startswith("/"):
            normalized = f"/{normalized}"
        contact_dict["profile_photo"] = normalized

    contact_dict.pop("_sa_instance_state", None)

    return contact_dict


# CREATE CONTACT
@router.post("/", response_model=contact.ContactResponse)
def create_contact(contact_data: contact.ContactCreate, db: Session = Depends(get_db)):

    contact_dict = contact_data.model_dump()

    # Convert tags list → CSV for DB
    if contact_dict.get("tags"):
        contact_dict["tags"] = ",".join(contact_dict["tags"])
    else:
        contact_dict["tags"] = None

    db_contact = crud_ops.create_contact(db=db, contact=contact_dict)

    return convert_contact_output(db_contact)


# READ ALL CONTACTS
@router.get("/", response_model=List[contact.ContactResponse])
def read_contacts(skip: int = 0, limit: int = 50, db: Session = Depends(get_db)):

    db_contacts = crud_ops.get_contacts(db=db, skip=skip, limit=limit)

    return [convert_contact_output(c) for c in db_contacts]


# READ SINGLE CONTACT
@router.get("/{contact_id}", response_model=contact.ContactResponse)
def read_contact(contact_id: int, db: Session = Depends(get_db)):

    db_contact = crud_ops.get_contact(db=db, contact_id=contact_id)

    if not db_contact:
        raise HTTPException(status_code=404, detail="Contact not found")

    return convert_contact_output(db_contact)


# UPDATE CONTACT
@router.put("/{contact_id}", response_model=contact.ContactResponse)
def update_contact(contact_id: int, updated: contact.ContactUpdate, db: Session = Depends(get_db)):

    db_contact = crud_ops.get_contact(db=db, contact_id=contact_id)

    if not db_contact:
        raise HTTPException(status_code=404, detail="Contact not found")

    updated_dict = updated.model_dump(exclude_unset=True)

    # Convert tags list → CSV
    if "tags" in updated_dict:
        if updated_dict["tags"]:
            updated_dict["tags"] = ",".join(updated_dict["tags"])
        else:
            updated_dict["tags"] = None

    for key, value in updated_dict.items():
        setattr(db_contact, key, value)

    db.commit()
    db.refresh(db_contact)

    return convert_contact_output(db_contact)


# DELETE CONTACT
@router.delete("/{contact_id}")
def delete_contact(contact_id: int, db: Session = Depends(get_db)):

    ok = crud_ops.delete_contact(db=db, contact_id=contact_id)

    if not ok:
        raise HTTPException(status_code=404, detail="Contact not found")

    return {"detail": "Contact deleted successfully"}


# UPDATE PROFILE PHOTO
@router.put("/{contact_id}/profile-photo")
def update_profile_photo(
    contact_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    db_contact = db.query(ContactModel).filter(ContactModel.id == contact_id).first()

    if not db_contact:
        raise HTTPException(status_code=404, detail="Contact not found")

    file_ext = os.path.splitext(file.filename)[1] if file.filename else ".jpg"
    unique_name = f"profile_{contact_id}_{uuid.uuid4().hex[:8]}{file_ext}"

    file_path = os.path.join(UPLOAD_FOLDER, unique_name).replace("\\", "/")

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    db_contact.profile_photo = file_path

    db.commit()
    db.refresh(db_contact)

    normalized = file_path.replace("\\", "/")
    if not normalized.startswith("/"):
        normalized = f"/{normalized}"

    return {
        "message": "Profile photo updated successfully",
        "profile_photo": normalized
    }