from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.endpoints import auth, interviews, websocket, feedback
from app.db.base import Base
from app.db.session import engine

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"/openapi.json"
)

# Set all CORS enabled origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add all routers
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(interviews.router, prefix="/interviews", tags=["interviews"])
app.include_router(websocket.router, prefix="/ws", tags=["websocket"])
app.include_router(feedback.router, prefix="/feedback", tags=["feedback"])

# Create tables
Base.metadata.create_all(bind=engine)

@app.get("/")
def root():
    return {"message": "Welcome to AI Interviewer API", "status": "running"}
