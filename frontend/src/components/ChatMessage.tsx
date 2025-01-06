import { MessageCircle, Bot } from 'lucide-react';
import { Message } from '../types/chat';
import { formatTime } from '../utils/date';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div
        className={`p-2.5 rounded-xl ${
          isUser
            ? 'bg-gradient-to-br from-blue-500 to-blue-600'
            : 'bg-gradient-to-br from-gray-100 to-gray-200'
        }`}
      >
        {isUser ? (
          <MessageCircle className="w-5 h-5 text-white" />
        ) : (
          <Bot className="w-5 h-5 text-gray-700" />
        )}
      </div>
      <div
        className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${
          isUser
            ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-tr-none'
            : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none'
        }`}
      >
        {/* Split message content into lines and render each line */}
        {message.content.split('\n').map((line, index) => (
          <p key={index} className="text-sm leading-relaxed">
            {line.trim()}
          </p>
        ))}
        <span className={`text-xs mt-2 block ${isUser ? 'text-blue-100' : 'text-gray-400'}`}>
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
}
