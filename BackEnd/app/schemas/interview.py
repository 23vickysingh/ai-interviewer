from typing import Optional
from datetime import datetime
from pydantic import BaseModel
from app.models.interview import InterviewStatus

class InterviewBase(BaseModel):
    topic: str
    difficulty: str
    job_description: Optional[str] = None

class InterviewCreate(InterviewBase):
    pass

class InterviewUpdate(BaseModel):
    status: Optional[InterviewStatus] = None

class InterviewInDBBase(InterviewBase):
    id: int
    user_id: int
    status: InterviewStatus
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class Interview(InterviewInDBBase):
    pass
