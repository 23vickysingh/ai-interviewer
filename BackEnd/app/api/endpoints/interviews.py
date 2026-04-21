from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api import deps
from app.db.session import get_db
from app.models.user import User
from app.models.interview import Interview
from app.schemas.interview import Interview as InterviewSchema, InterviewCreate

router = APIRouter()

@router.post("/", response_model=InterviewSchema)
def create_interview(
    *,
    db: Session = Depends(get_db),
    interview_in: InterviewCreate,
    current_user: User = Depends(deps.get_current_user)
) -> Any:
    interview = Interview(
        **interview_in.model_dump(),
        user_id=current_user.id
    )
    db.add(interview)
    db.commit()
    db.refresh(interview)
    return interview

@router.get("/", response_model=List[InterviewSchema])
def list_interviews(
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_user),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    interviews = db.query(Interview).filter(Interview.user_id == current_user.id).offset(skip).limit(limit).all()
    return interviews

@router.get("/{id}", response_model=InterviewSchema)
def get_interview(
    *,
    db: Session = Depends(get_db),
    id: int,
    current_user: User = Depends(deps.get_current_user)
) -> Any:
    interview = db.query(Interview).filter(Interview.id == id, Interview.user_id == current_user.id).first()
    if not interview:
        raise HTTPException(status_code=404, detail="Interview not found")
    return interview
