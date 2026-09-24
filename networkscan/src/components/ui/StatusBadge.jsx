export default function StatusBadge({
  status = "online",
  label,
  showDot = true,
  size = "md", // 'sm' | 'md' | 'lg'
  className = "",
}) {
  const normalizedStatus = String(status).toLowerCase();

  const getStatusStyles = () => {
    switch (normalizedStatus) {
      case "online":
      case "active":
      case "success":
      case "completed":
      case "passed":
        return {
          bg: "bg-[#DCFCE7]",
          text: "text-[#16A34A]",
          dot: "bg-[#16A34A]",
          defaultLabel: status.toUpperCase(),
        };
      case "warning":
      case "scheduled":
      case "pending":
      case "idle":
        return {
          bg: "bg-[#FEF3C7]",
          text: "text-[#D97706]",
          dot: "bg-[#D97706]",
          defaultLabel: status.toUpperCase(),
        };
      case "offline":
      case "critical":
      case "failed":
      case "action required":
        return {
          bg: "bg-[#FEE2E2]",
          text: "text-[#DC2626]",
          dot: "bg-[#DC2626]",
          defaultLabel: status.toUpperCase(),
        };
      case "info":
      case "recurring active":
      case "running":
        return {
          bg: "bg-[#EFF6FF]",
          text: "text-[#0066FF]",
          dot: "bg-[#0066FF]",
          defaultLabel: status.toUpperCase(),
        };
      case "inactive":
      case "deprecated":
      default:
        return {
          bg: "bg-[#F1F5F9]",
          text: "text-[#64748B]",
          dot: "bg-[#94A3B8]",
          defaultLabel: status.toUpperCase(),
        };
    }
  };

  const style = getStatusStyles();

  const sizeClasses = {
    sm: "px-2 py-0.5 text-[9px]",
    md: "px-2.5 py-1 text-[10px]",
    lg: "px-3 py-1.5 text-xs",
  }[size] || "px-2.5 py-1 text-[10px]";

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-bold rounded-full select-none ${style.bg} ${style.text} ${sizeClasses} ${className}`}
    >
      {showDot && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${style.dot}`}
        ></span>
      )}
      <span>{label || style.defaultLabel}</span>
    </span>
  );
}
