from typing import Any
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import json

from app.api import deps
from app.db.session import get_db
from app.models.user import User
from app.models.interview import Interview, InterviewStatus
from app.models.message import Message
from app.models.feedback import Feedback as FeedbackModel
from app.schemas.feedback import Feedback as FeedbackSchema
from app.services.gemini import gemini_service

router = APIRouter()

@router.post("/{interview_id}", response_model=FeedbackSchema)
async def generate_interview_feedback(
    *,
    db: Session = Depends(get_db),
    interview_id: int,
    current_user: User = Depends(deps.get_current_user)
) -> Any:
    # 1. Check if interview exists and belongs to user
    interview = db.query(Interview).filter(Interview.id == interview_id, Interview.user_id == current_user.id).first()
    if not interview:
        raise HTTPException(status_code=404, detail="Interview not found")
    
    # 2. Check if already generated
    existing_feedback = db.query(FeedbackModel).filter(FeedbackModel.interview_id == interview_id).first()
    if existing_feedback:
        return existing_feedback

    # 3. Get history
    history_msgs = db.query(Message).filter(Message.interview_id == interview_id).all()
    history = [{"role": m.role, "content": m.content} for m in history_msgs]
    
    if not history:
        raise HTTPException(status_code=400, detail="Cannot generate feedback for empty interview")

    # 4. Generate feedback via Gemini
    raw_feedback = await gemini_service.generate_feedback(history)
    
    try:
        # Clean the response if it contains markdown code blocks
        clean_json = raw_feedback.strip()
        if clean_json.startswith("```json"):
            clean_json = clean_json[7:-3].strip()
        elif clean_json.startswith("```"):
            clean_json = clean_json[3:-3].strip()
            
        feedback_data = json.loads(clean_json)
        
        feedback = FeedbackModel(
            interview_id=interview_id,
            overall_score=feedback_data.get("overall_score", 0),
            strengths=feedback_data.get("strengths", []),
            weaknesses=feedback_data.get("weaknesses", []),
            suggestions=feedback_data.get("suggestions", []),
            technical_analysis=feedback_data.get("technical_analysis", "")
        )
        
        interview.status = InterviewStatus.COMPLETED
        db.add(feedback)
        db.commit()
        db.refresh(feedback)
        return feedback
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to parse feedback: {str(e)}")

@router.get("/{interview_id}", response_model=FeedbackSchema)
def get_feedback(
    *,
    db: Session = Depends(get_db),
    interview_id: int,
    current_user: User = Depends(deps.get_current_user)
) -> Any:
    feedback = db.query(FeedbackModel).filter(FeedbackModel.interview_id == interview_id).first()
    if not feedback:
        raise HTTPException(status_code=404, detail="Feedback not found")
    return feedback
