import { Bot } from 'lucide-react';

export function WelcomeMessage() {
  return (
    <div className="text-center p-8 bg-gradient-to-b from-white to-gray-50 rounded-2xl border border-gray-100">
      <div className="bg-blue-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
        <Bot className="w-8 h-8 text-white" />
      </div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Welcome to Customer Support</h2>
      <p className="text-gray-500 text-sm">How can I assist you today?</p>
    </div>
  );
}