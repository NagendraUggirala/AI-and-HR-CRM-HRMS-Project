print("🔥 admin_candidates router loaded")

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from uuid import uuid4
from datetime import datetime, timedelta

from fastapi_mail import FastMail, MessageSchema, MessageType

from core.database import get_db
from core.mail import mail_config
from model.onboarding.candidate import Candidate
from schema.onboarding.candidate import CandidateCreate

router = APIRouter()

# ------------------------------------------------------------------
# SEND INVITE EMAIL (HTML – PROFESSIONAL)
# ------------------------------------------------------------------
async def send_invite_email(
    email: str,
    name: str,
    onboarding_link: str,
    expiry_date: datetime
):
    html_body = f"""
    <div style="font-family: Arial, sans-serif; line-height:1.6; color:#333;">
        <p>Hello <b>{name}</b>,</p>

        <p>
            Welcome to <b>Levitica Technologies Pvt Ltd</b>!
        </p>

        <p>
            We are happy to inform you that we have initiated your onboarding process.
        </p>

        <p>
            Please click the link below and submit your details:
        </p>

        <p>
            <a href="{onboarding_link}"
               style="background:#2563eb;color:#fff;
               padding:10px 16px;text-decoration:none;
               border-radius:4px;">
               Complete Onboarding
            </a>
        </p>

        <p style="margin-top:15px;">
            <b>Note:</b> This link is valid till:
            <b>{expiry_date.strftime("%d-%b-%Y")}</b>
        </p>

        <br/>
        <p>
            Best Regards,<br/>
            <b>Human Resources</b><br/>
            Levitica Technologies Pvt Ltd
        </p>
    </div>
    """

    message = MessageSchema(
        subject="Self-Onboarding Initiated: Submit your details",
        recipients=[email],
        body=html_body,
        subtype=MessageType.html
    )

    fm = FastMail(mail_config)
    await fm.send_message(message)


# ------------------------------------------------------------------
# CREATE / INVITE CANDIDATE
# ------------------------------------------------------------------
@router.post("/", status_code=status.HTTP_201_CREATED)
async def invite_candidate(
    payload: CandidateCreate,
    db: Session = Depends(get_db)
):
    # HARD VALIDATION
    if not payload.email and not payload.mobile:
        raise HTTPException(
            status_code=400,
            detail="Either email or mobile is required"
        )

    token = str(uuid4())
    expiry = datetime.utcnow() + timedelta(days=3)

    candidate = Candidate(
        full_name=payload.full_name,
        email=payload.email,
        mobile=payload.mobile,
        invite_token=token,
        token_expires_at=expiry,
        status="SENT"
    )

    db.add(candidate)
    db.commit()
    db.refresh(candidate)

    onboarding_link = f"https://yourdomain.com/onboarding/{token}"

    # SEND EMAIL (DO NOT FAIL API IF MAIL FAILS)
    if payload.email:
        try:
            await send_invite_email(
                email=payload.email,
                name=payload.full_name,
                onboarding_link=onboarding_link,
                expiry_date=expiry
            )
        except Exception as e:
            # LOG ONLY – DO NOT BREAK FLOW
            print("❌ Email send failed:", str(e))

    return {
        "id": candidate.id,
        "full_name": candidate.full_name,
        "status": candidate.status,
        "onboarding_link": onboarding_link,
        "expires_at": expiry
    }


# ------------------------------------------------------------------
# LIST ALL CANDIDATES
# ------------------------------------------------------------------
@router.get("/")
def list_candidates(db: Session = Depends(get_db)):
    return (
        db.query(Candidate)
        .order_by(Candidate.created_at.desc())
        .all()
    )


# ------------------------------------------------------------------
# DELETE CANDIDATE
# ------------------------------------------------------------------
@router.delete("/{candidate_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_candidate(
    candidate_id: int,
    db: Session = Depends(get_db)
):
    candidate = db.query(Candidate).filter(
        Candidate.id == candidate_id
    ).first()

    if not candidate:
        raise HTTPException(
            status_code=404,
            detail="Candidate not found"
        )

    db.delete(candidate)
    db.commit()
