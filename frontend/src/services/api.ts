import { API_CONFIG } from '../config/api';

interface ApiResponse {
  response: string;
}

interface Question {
  question: string;
  answer: string;
}

export class ApiError extends Error {
  constructor(public status?: number, message?: string) {
    super(message || 'An error occurred while communicating with the server');
    this.name = 'ApiError';
  }
}

// Handles API responses, validates status, and parses JSON
const handleApiResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    throw new ApiError(response.status, `Server error: ${response.statusText}`);
  }

  try {
    const data = await response.json();
    return data;
  } catch {
    throw new ApiError(undefined, 'Invalid response format from server');
  }
};

// Sends a user's question to the backend and gets the response
export async function askQuestion(question: string): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ASK}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question }),
    });

    const data = await handleApiResponse<{ response: string }>(response); // Ensure the backend returns { response: string }
    return { response: data.response }; // Use 'response' key from backend
  } catch (error) {
    console.error('Error in askQuestion:', error);
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(undefined, error instanceof Error ? error.message : 'Network error');
  }
}

// Fetches all predefined questions from the backend
export async function fetchQuestions(): Promise<Question[]> {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.QUESTIONS}`, {
      method: 'GET',
    });

    return await handleApiResponse<Question[]>(response); // Ensure the backend returns an array of questions
  } catch (error) {
    console.error('Error in fetchQuestions:', error);
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(undefined, error instanceof Error ? error.message : 'Network error');
  }
}
