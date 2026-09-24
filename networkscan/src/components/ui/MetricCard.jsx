import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function MetricCard({
  title,
  value,
  icon: Icon,
  iconBg = "bg-[#EFF6FF] border border-[#BFDBFE]",
  iconColor = "text-[#0066FF]",
  subtitle,
  trend, // { type: 'up' | 'down' | 'neutral', text: string }
  badge, // { text: string, variant: 'primary' | 'success' | 'warning' | 'danger' }
  progress, // number (0 to 100)
  progressColor = "bg-[#0066FF]",
  progressTrackColor = "bg-[#BFDBFE]",
  onClick,
  className = "",
}) {
  const getBadgeStyle = () => {
    if (!badge) return "";
    switch (badge.variant) {
      case "success":
        return "bg-[#DCFCE7] text-[#16A34A]";
      case "warning":
        return "bg-[#FEF3C7] text-[#D97706]";
      case "danger":
        return "bg-[#FEE2E2] text-[#DC2626]";
      case "primary":
      default:
        return "bg-[#EFF6FF] text-[#0066FF]";
    }
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl p-4 border border-[#E2E8F0] shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all ${
        onClick ? "cursor-pointer" : ""
      } ${className}`}
    >
      <div>
        <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">
          {title}
        </span>
        <div className="flex items-center justify-between mt-2">
          <span className="text-2xl font-bold text-[#0F172A] tracking-tight">
            {value}
          </span>
          {Icon && (
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${iconBg}`}
            >
              <Icon size={18} className={iconColor} />
            </div>
          )}
        </div>
      </div>

      {subtitle && (
        <p className="text-xs text-[#64748B] mt-1">{subtitle}</p>
      )}

      {badge && (
        <div className="mt-3">
          <span
            className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase ${getBadgeStyle()}`}
          >
            {badge.text}
          </span>
        </div>
      )}

      {trend && (
        <div className="mt-3 flex items-center justify-between">
          <span
            className={`text-xs font-semibold flex items-center gap-1 ${
              trend.type === "up"
                ? "text-[#16A34A]"
                : trend.type === "down"
                ? "text-[#DC2626]"
                : "text-[#64748B]"
            }`}
          >
            {trend.text}
            {trend.type === "up" && <ArrowUpRight size={13} />}
            {trend.type === "down" && <ArrowDownRight size={13} />}
          </span>
        </div>
      )}

      {typeof progress === "number" && (
        <div className="mt-3 pt-2 border-t border-[#F1F5F9]">
          <div
            className={`h-1 w-full rounded-full overflow-hidden ${progressTrackColor}`}
          >
            <div
              className={`h-full ${progressColor} transition-all duration-300`}
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}
