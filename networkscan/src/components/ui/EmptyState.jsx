import { Search } from "lucide-react";
import Button from "./Button";

export default function EmptyState({
  icon: Icon = Search,
  title = "No results found",
  description = "We couldn't find anything matching your request.",
  actionLabel,
  onAction,
  className = "",
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 text-center bg-white rounded-xl border border-[#E2E8F0] ${className}`}
    >
      <div className="w-12 h-12 rounded-full bg-[#F1F5F9] flex items-center justify-center text-[#94A3B8] mb-3">
        <Icon size={24} />
      </div>
      <h4 className="text-base font-bold text-[#0F172A]">{title}</h4>
      <p className="text-xs text-[#64748B] mt-1 max-w-sm leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <div className="mt-4">
          <Button variant="secondary" size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
