export default function LoadingState({
  rows = 3,
  type = "card", // 'card' | 'table' | 'spinner'
  className = "",
}) {
  if (type === "spinner") {
    return (
      <div className={`flex items-center justify-center p-8 ${className}`}>
        <div className="w-8 h-8 border-3 border-[#E2E8F0] border-t-[#0066FF] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (type === "table") {
    return (
      <div className={`space-y-3 p-4 animate-pulse ${className}`}>
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="h-10 bg-[#F1F5F9] rounded-lg w-full"
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse ${className}`}
    >
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="h-28 bg-[#F1F5F9] rounded-xl border border-[#E2E8F0] p-4"
        ></div>
      ))}
    </div>
  );
}
