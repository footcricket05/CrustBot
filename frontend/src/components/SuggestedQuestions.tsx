import React from 'react';
import { MessageSquareMore, AlertCircle } from 'lucide-react';

interface SuggestedQuestionsProps {
  questions: string[];
  error: string | null;
  onQuestionClick: (question: string) => void;
}

export function SuggestedQuestions({ questions, error, onQuestionClick }: SuggestedQuestionsProps) {
  if (questions.length === 0) return null;

  return (
    <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <MessageSquareMore className="w-5 h-5 text-blue-500" />
        <h3 className="text-sm font-semibold text-gray-700">Suggested Questions</h3>
        {error && (
          <div className="flex items-center gap-1 ml-auto text-amber-600 text-xs">
            <AlertCircle className="w-4 h-4" />
            <span>Using offline suggestions</span>
          </div>
        )}
      </div>
      <div className="space-y-2">
        {questions.map((question, index) => (
          <button
            key={index}
            onClick={() => onQuestionClick(question)}
            className="w-full text-left p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
}