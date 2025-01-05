from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import json
from rapidfuzz import process, fuzz  # Correct import for fuzz

router = APIRouter()

# Define the request model
class QuestionRequest(BaseModel):
    question: str

# Helper functions
def load_db():
    with open("db.json", "r") as file:
        return json.load(file)

def save_db(data):
    with open("db.json", "w") as file:
        json.dump(data, file, indent=4)

# Routes
@router.get("/questions")
def get_all_questions():
    db = load_db()
    return db["questions"]

@router.post("/questions")
def add_question(question: dict):
    db = load_db()
    db["questions"].append(question)
    save_db(db)
    return {"message": "Question added successfully"}

@router.post("/ask")
def ask_question(request: QuestionRequest):
    try:
        db = load_db()
        question_text = request.question

        # Extract all questions and their IDs from the database
        all_questions = {q["id"]: q["question"] for q in db["questions"]}

        # Use RapidFuzz to find the best match
        matches = process.extractOne(question_text, all_questions.values(), scorer=fuzz.partial_ratio)

        if matches and matches[1] > 70:  # Match confidence threshold (e.g., 70%)
            # Find the question ID for the best match
            matched_question = matches[0]
            for q in db["questions"]:
                if q["question"] == matched_question:
                    return {"response": q["answer"]}

        # Default response if no match is found
        return {"response": f"Sorry, I don't have an answer for: {request.question}"}
    except Exception as e:
        print(f"Error in /ask route: {e}")
        return {"response": "An internal error occurred. Please try again later."}
