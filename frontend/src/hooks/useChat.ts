import { useState } from "react";
import { Message, ChatState } from "../types/chat";
import { askQuestion } from "../services/api";
import { getErrorMessage } from "../utils/error";

export function useChat() {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    context: "", // Track conversation flow
  });

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date(),
    };

    setChatState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
    }));

    try {
      // Pass the context to the backend
      const data = await askQuestion(content, chatState.context);

      // Combine response and follow-up suggestion in a clean, multiline format
      const fullResponse = `${data.response}${
        data.follow_up ? `\n\nFollow-up Suggestion: ${data.follow_up}` : ""
      }`;
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: fullResponse,
        role: "assistant",
        timestamp: new Date(),
      };

      setChatState((prev) => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        context: data.context || prev.context, // Update context if provided
        isLoading: false,
      }));
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Error: ${getErrorMessage(error)}`,
        role: "assistant",
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
