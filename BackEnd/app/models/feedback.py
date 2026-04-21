from sqlalchemy import Column, Integer, String, ForeignKey, Float, JSON
from app.db.base_class import Base

class Feedback(Base):
    id = Column(Integer, primary_key=True, index=True)
    interview_id = Column(Integer, ForeignKey("interview.id"), nullable=False, unique=True)
    overall_score = Column(Float, nullable=False)
    strengths = Column(JSON, nullable=False) # List of strengths
    weaknesses = Column(JSON, nullable=False) # List of weaknesses
    suggestions = Column(JSON, nullable=False) # List of improvement tips
    technical_analysis = Column(String, nullable=True)
