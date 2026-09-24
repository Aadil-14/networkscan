import { CheckCircle2, AlertTriangle, Info, X } from "lucide-react";

export default function Toast({
  message,
  type = "success", // 'success' | 'warning' | 'error' | 'info'
  onClose,
  className = "",
}) {
  if (!message) return null;

  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return {
          bg: "bg-[#DCFCE7] border-[#BBF7D0] text-[#15803D]",
          icon: CheckCircle2,
        };
      case "warning":
        return {
          bg: "bg-[#FEF3C7] border-[#FDE68A] text-[#B45309]",
          icon: AlertTriangle,
        };
      case "error":
        return {
          bg: "bg-[#FEE2E2] border-[#FECACA] text-[#B91C1C]",
          icon: AlertTriangle,
        };
      case "info":
      default:
        return {
          bg: "bg-[#EFF6FF] border-[#BFDBFE] text-[#1E40AF]",
          icon: Info,
        };
    }
  };

  const { bg, icon: Icon } = getTypeStyles();

  return (
    <div
      className={`flex items-center justify-between p-3.5 px-4 rounded-xl border shadow-sm text-xs font-semibold animate-in slide-in-from-top-2 duration-200 ${bg} ${className}`}
    >
      <div className="flex items-center gap-2.5">
        <Icon size={16} className="shrink-0" />
        <span>{message}</span>
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded-md hover:bg-black/5 border-none bg-transparent cursor-pointer transition-colors"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
