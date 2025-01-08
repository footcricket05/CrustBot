import React from 'react';
import { MessageCircle, Bot } from 'lucide-react';
import { Message } from '../types/chat';
import { formatTime } from '../utils/date';
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  
  return (
    <div className={`py-8 ${isUser ? 'bg-white' : 'bg-gray-50'}`}>
      <div className="max-w-3xl mx-auto px-4 flex gap-6">
        <div className={`w-8 h-8 rounded-sm flex items-center justify-center flex-shrink-0 ${
          isUser ? 'bg-gray-500' : 'bg-blue-600'
        }`}>
          {isUser ? (
            <MessageCircle className="w-5 h-5 text-white" />
          ) : (
            <Bot className="w-5 h-5 text-white" />
          )}
        </div>
        <div className="min-w-0 prose prose-slate max-w-none">
          <ReactMarkdown
            components={{
              code({ inline, className, children, ...props }) {
                return (
                  <code
                    className={`${className} ${
                      inline ? 'bg-gray-100 rounded px-1' : 'block bg-gray-800 text-white p-4 rounded-lg'
                    }`}
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}