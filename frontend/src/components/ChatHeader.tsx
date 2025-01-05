import { Bot } from 'lucide-react';

export function ChatHeader() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 flex items-center gap-4 shadow-lg">
      <div className="bg-white/10 p-3 rounded-xl">
        <Bot className="w-8 h-8 text-white" />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-white">Customer Support</h1>
        <p className="text-blue-100 text-sm">Always here to help</p>
      </div>
    </div>
  );
}