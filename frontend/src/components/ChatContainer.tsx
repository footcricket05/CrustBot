import React from 'react';
import { Message } from '../types/chat';
import { ChatMessage } from './ChatMessage';
import { WelcomeMessage } from './WelcomeMessage';
import { LoadingIndicator } from './LoadingIndicator';
import { SuggestedQuestions } from './SuggestedQuestions';

interface ChatContainerProps {
  messages: Message[];
  isLoading: boolean;
  suggestedQuestions: string[];
  error: string | null;
  onQuestionClick: (question: string) => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export function ChatContainer({
  messages,
  isLoading,
  suggestedQuestions,
  error,
  onQuestionClick,
  messagesEndRef,
}: ChatContainerProps) {
  return (
    <div className="h-[500px] overflow-y-auto bg-gray-50 p-4 space-y-4">
      {messages.length === 0 ? (
        <>
          <WelcomeMessage />
          <SuggestedQuestions 
            questions={suggestedQuestions}
            error={error}
            onQuestionClick={onQuestionClick}
          />
        </>
      ) : (
        <>
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && <LoadingIndicator />}
        </>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}