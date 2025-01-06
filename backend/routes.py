from fastapi import APIRouter
from pydantic import BaseModel
import json
from rapidfuzz import process, fuzz  # Correct import for fuzz
import requests  # For API call validation

router = APIRouter()

# Flag to enable/disable mock API validation
USE_MOCK_API = True

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

def validate_api_payload(payload):
    """
    Mock or validate API payload for testing Level 1.
    """
    if USE_MOCK_API:
        # Return a mocked response for testing
        return {
            "success": True,
            "data": {
                "message": "Mocked API response for testing.",
                "results": [
                    {"name": "John Doe", "title": "Engineer", "company": "OpenAI"},
                    {"name": "Jane Smith", "title": "Manager", "company": "Google"},
                ],
            },
        }
    try:
        # Simulate an API call using requests
        response = requests.post(
            url="https://api.crustdata.com/screener/person/search",
            headers={"Content-Type": "application/json", "Authorization": "Token YOUR_API_TOKEN"},
            json=payload,
        )
        if response.status_code == 200:
            return {"success": True, "data": response.json()}
        else:
            return {"success": False, "error": f"API returned status {response.status_code}"}
    except Exception as e:
        return {"success": False, "error": str(e)}

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
                    # Check if the question has an API payload for validation
                    if "api_payload" in q:
                        validation_result = validate_api_payload(q["api_payload"])
                        if validation_result["success"]:
                            # Format the API response for the user
                            results = validation_result["data"]["results"]
                            formatted_results = "\n".join(
                                [
                                    f"- Name: {r['name']}\n  Title: {r['title']}\n  Company: {r['company']}"
                                    for r in results
                                ]
                            )
                            return {
                                "response": f"API Call Succeeded!\n\nMessage: {validation_result['data']['message']}\n\nResults:\n{formatted_results}",
                                "follow_up": "Would you like to refine your search or explore other queries?",
                            }
                        else:
                            return {"response": f"API call failed: {validation_result['error']}"}

                    # Return the static answer if no API payload is defined
                    return {
                        "response": q["answer"],
                        "follow_up": "Would you like to explore similar queries or ask another question?",
                    }

        # Default response if no match is found
        return {
            "response": f"Sorry, I don't have an answer for: {request.question}",
            "follow_up": "Can I help you with something else?",
        }
    except Exception as e:
        print(f"Error in /ask route: {e}")
        return {"response": "An internal error occurred. Please try again later."}
