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
    <div className="flex-1 overflow-y-auto bg-white">
      {messages.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center p-4">
          <WelcomeMessage />
          <div className="w-full max-w-2xl mt-8">
            <SuggestedQuestions 
              questions={suggestedQuestions}
              error={error}
              onQuestionClick={onQuestionClick}
            />
          </div>
        </div>
      ) : (
        <>
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && (
            <div className="py-8 bg-white">
              <div className="max-w-3xl mx-auto px-4">
                <LoadingIndicator />
              </div>
            </div>
          )}
        </>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}