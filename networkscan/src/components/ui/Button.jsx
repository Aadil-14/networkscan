import { Loader2 } from "lucide-react";

export default function Button({
  children,
  variant = "primary", // 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size = "md", // 'sm' | 'md' | 'lg'
  iconLeft: IconLeft,
  iconRight: IconRight,
  isLoading = false,
  disabled = false,
  fullWidth = false,
  type = "button",
  onClick,
  className = "",
}) {
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold shadow-md shadow-blue-500/20 border-none";
      case "secondary":
        return "bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#334155] font-semibold shadow-2xs";
      case "outline":
        return "bg-white border-2 border-[#0066FF] hover:bg-[#EFF6FF] text-[#0066FF] font-bold";
      case "ghost":
        return "bg-transparent hover:bg-[#F1F5F9] text-[#64748B] hover:text-[#0F172A] font-semibold border-none";
      case "danger":
        return "bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold shadow-sm border-none";
      default:
        return "bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold shadow-md shadow-blue-500/20 border-none";
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return "px-3 py-1.5 text-xs rounded-lg gap-1.5";
      case "lg":
        return "px-6 py-3 text-sm rounded-xl gap-2.5";
      case "md":
      default:
        return "px-4 py-2.5 text-xs rounded-xl gap-2";
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center transition-all cursor-pointer select-none active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 ${
        fullWidth ? "w-full" : ""
      } ${getVariantStyles()} ${getSizeStyles()} ${className}`}
    >
      {isLoading ? (
        <Loader2 className="animate-spin" size={size === "sm" ? 14 : size === "lg" ? 18 : 16} />
      ) : IconLeft ? (
        <IconLeft size={size === "sm" ? 14 : size === "lg" ? 18 : 16} className="shrink-0" />
      ) : null}

      {children && <span>{children}</span>}

      {!isLoading && IconRight && (
        <IconRight size={size === "sm" ? 14 : size === "lg" ? 18 : 16} className="shrink-0" />
      )}
    </button>
  );
}
