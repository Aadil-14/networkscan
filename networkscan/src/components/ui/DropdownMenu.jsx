import { useState, useRef, useEffect } from "react";

export default function DropdownMenu({
  trigger,
  items = [], // Array<{ label: string, icon?: any, onClick: () => void, danger?: boolean, disabled?: boolean }>
  align = "right", // 'left' | 'right'
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={`relative inline-block text-left ${className}`} ref={menuRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

      {isOpen && (
        <div
          className={`absolute z-50 mt-1.5 w-48 rounded-xl bg-white border border-[#E2E8F0] shadow-lg py-1.5 focus:outline-none animate-in fade-in zoom-in-95 duration-100 ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                type="button"
                disabled={item.disabled}
                onClick={() => {
                  if (item.disabled) return;
                  setIsOpen(false);
                  if (item.onClick) item.onClick();
                }}
                className={`w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium cursor-pointer border-none transition-colors text-left ${
                  item.danger
                    ? "text-[#DC2626] hover:bg-[#FEE2E2]/50"
                    : "text-[#334155] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
                } ${item.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {Icon && <Icon size={15} className="shrink-0" />}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
