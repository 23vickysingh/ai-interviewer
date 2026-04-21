from typing import List, Optional
from pydantic import BaseModel

class FeedbackBase(BaseModel):
    overall_score: float
    strengths: List[str]
    weaknesses: List[str]
    suggestions: List[str]
    technical_analysis: Optional[str] = None

class FeedbackCreate(FeedbackBase):
    interview_id: int

class Feedback(FeedbackBase):
    id: int
    interview_id: int

    class Config:
        from_attributes = True
