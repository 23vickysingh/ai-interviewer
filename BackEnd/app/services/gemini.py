import google.generativeai as genai
from app.core.config import settings

class GeminiService:
    def __init__(self):
        genai.configure(api_key=settings.GEMINI_API_KEY)
        self.model = genai.GenerativeModel('gemini-1.5-flash')

    async def generate_question(self, topic: str, difficulty: str, history: list):
        """
        Generates the next interview question based on history.
        """
        prompt = f"""
        You are an expert technical interviewer for {topic} roles at a {difficulty} level.
        Based on the following conversation history, ask the next relevant technical question.
        If the conversation is just starting, introduce yourself and ask the first question.
        Keep the conversation professional and challenging.
        
        History: {history}
        
        Next Question:
        """
        response = self.model.generate_content(prompt)
        return response.text

    async def evaluate_response(self, question: str, response_text: str):
        """
        Evaluates a specific response to a question.
        """
        prompt = f"""
        Question: {question}
        User Response: {response_text}
        
        Evaluate this response for technical accuracy, clarity, and depth. 
        Provide a brief score (1-10) and one suggestion for improvement.
        """
        response = self.model.generate_content(prompt)
        return response.text

    async def generate_feedback(self, history: list):
        """
        Analyzes the full interview history and provides detailed evaluation.
        """
        prompt = f"""
        Analyze the following interview conversation and provide a detailed evaluation.
        History: {history}
        
        Provide the result in the following JSON format:
        {{
            "overall_score": 8.5,
            "strengths": ["list of strengths"],
            "weaknesses": ["list of weaknesses"],
            "suggestions": ["list of suggestions"],
            "technical_analysis": "a paragraph of detailed analysis"
        }}
        Only return the JSON.
        """
        response = self.model.generate_content(prompt)
        return response.text

gemini_service = GeminiService()
