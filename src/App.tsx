import React from 'react';
import { ChatHeader } from './components/ChatHeader';
import { ChatContainer } from './components/ChatContainer';
import { ChatInput } from './components/ChatInput';
import { useChat } from './hooks/useChat';
import { useSuggestedQuestions } from './hooks/useSuggestedQuestions';
import { useScrollToBottom } from './hooks/useScrollToBottom';

export default function App() {
  const { messages, isLoading, sendMessage } = useChat();
  const { suggestedQuestions, error } = useSuggestedQuestions();
  const messagesEndRef = useScrollToBottom(messages);

  return (
    <div className="flex flex-col h-screen bg-white">
      <ChatHeader />
      <ChatContainer
        messages={messages}
        isLoading={isLoading}
        suggestedQuestions={suggestedQuestions}
        error={error}
        onQuestionClick={sendMessage}
        messagesEndRef={messagesEndRef}
      />
      <ChatInput onSend={sendMessage} disabled={isLoading} />
    </div>
  );
}