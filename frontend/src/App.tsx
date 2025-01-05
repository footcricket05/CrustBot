import React from 'react';
import { ChatHeader } from './components/ChatHeader';
import { ChatContainer } from './components/ChatContainer';
import { ChatInput } from './components/ChatInput';
import { useChat } from './hooks/useChat';
import { useSuggestedQuestions } from './hooks/useSuggestedQuestions';
import { useScrollToBottom } from './hooks/useScrollToBottom';

function App() {
  const { messages, isLoading, sendMessage } = useChat();
  const { suggestedQuestions, error } = useSuggestedQuestions();
  const messagesEndRef = useScrollToBottom(messages);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden">
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
    </div>
  );
}

export default App;
