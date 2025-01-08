import { useState } from 'react';
import { Message, ChatState } from '../types/chat';
import { askQuestion } from '../services/api';
import { getErrorMessage } from '../utils/error';

export function useChat() {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isLoading: false,
  });

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
    };

    setChatState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
    }));

    try {
      // Convert messages to format expected by API
      const conversationHistory = chatState.messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const data = await askQuestion(content, conversationHistory);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        role: 'assistant',
        timestamp: new Date(),
      };

      setChatState((prev) => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isLoading: false,
      }));
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Error: ${getErrorMessage(error)}`,
        role: 'assistant',
        timestamp: new Date(),
      };

      setChatState((prev) => ({
        ...prev,
        messages: [...prev.messages, errorMessage],
        isLoading: false,
      }));
    }
  };

  return {
    messages: chatState.messages,
    isLoading: chatState.isLoading,
    sendMessage,
  };
}