export function LoadingIndicator() {
  return (
    <div className="flex items-center gap-2 p-3">
      <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" />
      <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce delay-100" />
      <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce delay-200" />
    </div>
  );
}