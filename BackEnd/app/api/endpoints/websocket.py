from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.services.gemini import gemini_service
from app.models.interview import Interview
from app.models.message import Message
import json

router = APIRouter()

# Dependency to get DB session in WebSocket
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.websocket("/{interview_id}")
async def interview_websocket(
    websocket: WebSocket,
    interview_id: int,
):
    await websocket.accept()
    db = SessionLocal()
    
    try:
        # 1. Fetch interview context
        interview = db.query(Interview).filter(Interview.id == interview_id).first()
        if not interview:
            await websocket.send_text(json.dumps({"error": "Interview not found"}))
            await websocket.close()
            return

        # 2. Fetch history
        history_msgs = db.query(Message).filter(Message.interview_id == interview_id).all()
        history = [{"role": m.role, "content": m.content} for m in history_msgs]

        # 3. If new interview, generate first question
        if not history:
            first_q = await gemini_service.generate_question(
                interview.topic, interview.difficulty, []
            )
            ai_msg = Message(interview_id=interview_id, role="ai", content=first_q)
            db.add(ai_msg)
            db.commit()
            await websocket.send_text(json.dumps({"role": "ai", "content": first_q}))

        # 4. Interaction loop
        while True:
            data = await websocket.receive_text()
            user_data = json.loads(data)
            user_content = user_data.get("content")

            if not user_content:
                continue

            # Save user response
            user_msg = Message(interview_id=interview_id, role="user", content=user_content)
            db.add(user_msg)
            db.commit()

            # Refresh history for AI
            history_msgs = db.query(Message).filter(Message.interview_id == interview_id).all()
            history = [{"role": m.role, "content": m.content} for m in history_msgs]

            # Generate next AI question
            next_q = await gemini_service.generate_question(
                interview.topic, interview.difficulty, history
            )
            ai_msg = Message(interview_id=interview_id, role="ai", content=next_q)
            db.add(ai_msg)
            db.commit()

            await websocket.send_text(json.dumps({"role": "ai", "content": next_q}))

    except WebSocketDisconnect:
        print(f"Client disconnected from interview {interview_id}")
    except Exception as e:
        print(f"WS Error: {e}")
        await websocket.send_text(json.dumps({"error": str(e)}))
    finally:
        db.close()
