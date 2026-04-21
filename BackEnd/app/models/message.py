from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.sql import func
from app.db.base_class import Base

class Message(Base):
    id = Column(Integer, primary_key=True, index=True)
    interview_id = Column(Integer, ForeignKey("interview.id"), nullable=False)
    role = Column(String, nullable=False)  # ai, user
    content = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
