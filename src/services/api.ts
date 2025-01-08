import { API_CONFIG } from '../config/api';

interface ApiResponse {
  response: string;
}

interface Question {
  question: string;
  answer?: string;
}

export class ApiError extends Error {
  constructor(public status?: number, message?: string) {
    super(message || 'An error occurred while communicating with the server');
    this.name = 'ApiError';
  }
}

const handleApiResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    throw new ApiError(response.status, `Server error: ${response.statusText}`);
  }
  
  try {
    const data = await response.json();
    return data;
  } catch (error) {
    throw new ApiError(undefined, 'Invalid response format from server');
  }
};

export async function askQuestion(question: string, conversationHistory: any[] = []): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        message: question,
        conversationHistory 
      }),
    });

    return await handleApiResponse<ApiResponse>(response);
  } catch (error) {
    console.error('Error in askQuestion:', error);
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(undefined, error instanceof Error ? error.message : 'Network error');
  }
}

export async function fetchQuestions(): Promise<Question[]> {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}/questions`);
    const data = await handleApiResponse<Question[]>(response);
    return data;
  } catch (error) {
    console.error('Error in fetchQuestions:', error);
    // Return fallback questions instead of throwing
    return [
      { question: 'How do I search for people by their current title?' },
      { question: 'What is the correct format for region values?' },
      { question: 'How can I search for people at a specific company?' },
      { question: 'How do I use the person search API?' }
    ];
  }
}