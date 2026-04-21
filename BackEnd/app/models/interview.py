from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Enum
from sqlalchemy.sql import func
from app.db.base_class import Base
import enum

class InterviewStatus(str, enum.Enum):
    PENDING = "pending"
    ONGOING = "ongoing"
    COMPLETED = "completed"

class Interview(Base):
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    topic = Column(String, nullable=False)  # resume, frontend, system, behavioral
    difficulty = Column(String, nullable=False) # Junior, Mid, Senior, Staff
    job_description = Column(String, nullable=True)
    status = Column(Enum(InterviewStatus), default=InterviewStatus.PENDING)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
