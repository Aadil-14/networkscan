import { Search, X } from "lucide-react";

export default function SearchInput({
  value = "",
  onChange,
  onClear,
  placeholder = "Search...",
  size = "md", // 'sm' | 'md' | 'lg'
  fullWidth = true,
  className = "",
}) {
  const handleClear = () => {
    if (onClear) onClear();
    else if (onChange) onChange({ target: { value: "" } });
  };

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return "px-3 py-1.5 text-xs rounded-lg gap-2";
      case "lg":
        return "px-5 py-3 text-sm rounded-2xl gap-3";
      case "md":
      default:
        return "px-4 py-2.5 text-xs rounded-xl gap-2.5";
    }
  };

  return (
    <div
      className={`flex items-center bg-[#F1F5F9] focus-within:bg-white border border-transparent focus-within:border-[#0066FF]/30 focus-within:ring-2 focus-within:ring-[#0066FF]/20 transition-all ${
        fullWidth ? "w-full" : ""
      } ${getSizeStyles()} ${className}`}
    >
      <Search
        size={size === "sm" ? 14 : size === "lg" ? 20 : 16}
        className="text-[#94A3B8] shrink-0"
      />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-transparent border-none outline-none text-[#0F172A] w-full placeholder:text-[#94A3B8]"
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="text-[#94A3B8] hover:text-[#0F172A] bg-transparent border-none cursor-pointer p-0.5 rounded-full"
          title="Clear search"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
