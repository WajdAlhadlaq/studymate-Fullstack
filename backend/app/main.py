# This is the core of your backend — it starts the FastAPI server and connects all the parts together.
# backend/main.py
from fastapi import FastAPI, Depends, HTTPException # Imports FastAPI essentials and dependency injection tools.
from fastapi.middleware.cors import CORSMiddleware # Middleware for handling cross-domain security.
from pydantic import BaseModel # Tool for defining data schemas (input/output validation).
from openai import OpenAI # Official client for communicating with the OpenAI API.
from dotenv import load_dotenv # Tool for loading configuration variables from a .env file.
import os # Module for interacting with the operating system (used to get API keys).
from .routes import courses # Imports the course-related API endpoints (like GET /courses).
from .db import init_db, Base, get_db # Imports database setup, model base, and session dependency.
from .models import Course  # Imports the SQLAlchemy model representing the 'courses' table.
from sqlalchemy.orm import Session # Imports the SQLAlchemy session type for dependency injection.
from typing import Optional # Allows parameters to be optional (e.g., an optional course ID).


load_dotenv()  # Loads environment variables (like your OPENAI_API_KEY or DB URL) from the .env file.

# Loads environment variables (like your OPENAI_API_KEY or DB URL).
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    # Immediately stops the server if the necessary API key is missing.
    raise ValueError("Missing OpenAI API key in .env")

# Initializes the OpenAI client using the securely loaded API key.
client = OpenAI(api_key=OPENAI_API_KEY)

# Creates the main FastAPI application instance.
app = FastAPI()

# -------------------
# CORS
# Enables CORS (so the React frontend on localhost:3000 can successfully call this API on localhost:8000).
# -------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Specifically allows requests from the React development server.
    allow_credentials=True,
    allow_methods=["*"], # Allows all standard HTTP methods (GET, POST, etc.).
    allow_headers=["*"], # Allows all headers in the request.
)

# -------------------
# Routes
# -------------------
# Includes all the endpoints defined in the courses router (e.g., /courses).
app.include_router(courses.router)

# Initializes the database tables upon application startup using the SQLAlchemy base metadata.
init_db(Base)

# -------------------
# Helper: fetch courses for AI context
# -------------------
# Function to fetch all course data and format it into a single text string for the AI's context.
def get_courses_context(db: Session) -> str:
    courses_list = db.query(Course).all() # Queries the database for all available courses.
    if not courses_list:
        return "No courses available."
    context = "Available Courses:\n\n"
    # Loops through each course object to format a readable description for the AI.
    for c in courses_list:
        context += f"- {c.name} (ID: {c.id})\n"
        context += f"  Description: {c.description}\n"
        if c.instructor: context += f"  Instructor: {c.instructor}\n"
        context += f"  Duration: {c.duration}\n"
        context += f"  Difficulty: {c.difficulty}\n"
        context += f"  Price: ${c.price}\n"
        context += "\n"
    return context

# -------------------
# AI chat endpoint Models
# -------------------
# Defines the input structure expected from the frontend chat request.
class ChatRequest(BaseModel):
    message: str # The user's question.
    course_context: Optional[int] = None  # An optional course ID to provide specific context.

# Defines the output structure sent back to the frontend.
class ChatResponse(BaseModel):
    response: str

# -------------------
# AI chat endpoint Logic
# -------------------
# Main endpoint for handling AI chat requests.
@app.post("/api/ask", response_model=ChatResponse)
# Dependency injection: automatically opens and closes a database session for this request.
async def ask_ai(request: ChatRequest, db: Session = Depends(get_db)):
    try:
        # Determine the context to send to the AI.
        if request.course_context:
            # If an optional course ID is provided, fetch only that course's details.
            course_info = db.query(Course).filter(Course.id == request.course_context).first()
            courses_info = f"{course_info.name}: {course_info.description}" if course_info else "No course found for the given ID"
        else:
            # Otherwise, use the context helper to fetch all courses for general advising.
            courses_info = get_courses_context(db)

        # Defines the AI's persona and injects the context data before the user's message.
        system_message = {
            "role": "system",
            "content": f"You are a helpful course advisor assistant. "
                       f"Use the following courses information to answer user questions:\n\n{courses_info}"
        }

        user_message = {"role": "user", "content": request.message}

        # Sends the conversation (System + User message) to the OpenAI API for completion.
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[system_message, user_message],
            max_tokens=500
        )

        # Extracts the text response from the API result.
        response_text = completion.choices[0].message.content
        # Returns the final structured response, serialized by the ChatResponse model.
        return ChatResponse(response=response_text)

    except Exception as e:
        # Catches any exceptions (network, DB, OpenAI) and returns a clean 500 server error to the frontend.
        raise HTTPException(status_code=500, detail=str(e))