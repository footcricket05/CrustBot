import { useState, useEffect } from 'react';
import { fetchQuestions } from '../services/api';

const FALLBACK_QUESTIONS = [
  'How do I search for people by their current title?',
  'What is the correct format for region values?',
  'How can I search for people at a specific company?',
  'How do I use the person search API?'
];

export function useSuggestedQuestions() {
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>(FALLBACK_QUESTIONS);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSuggestedQuestions();
  }, []);

  const loadSuggestedQuestions = async () => {
    try {
      const questions = await fetchQuestions();
      if (questions.length > 0) {
        setSuggestedQuestions(questions.map(q => q.question));
      }
      setError(null);
    } catch (error) {
      console.error('Error loading questions:', error);
      setError('Unable to load suggested questions');
      // Keep fallback questions in case of error
    }
  };

  return { suggestedQuestions, error };
}