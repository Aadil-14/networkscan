import { useEffect } from "react";
import { X } from "lucide-react";

export default function Drawer({
  isOpen = false,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = "max-w-md",
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen && onClose) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      ></div>

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div
          className={`w-screen ${maxWidth} bg-white dark:bg-slate-900 shadow-2xl border-l border-[#E2E8F0] dark:border-slate-800 flex flex-col justify-between transform transition-transform duration-300 ease-in-out`}
        >
          {/* DRAWER HEADER */}
          <div className="p-6 border-b border-[#E2E8F0] dark:border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-[#0F172A] dark:text-slate-100">{title}</h3>
              {subtitle && (
                <p className="text-xs text-[#64748B] dark:text-slate-400 mt-1">{subtitle}</p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-slate-200 p-2 rounded-lg hover:bg-[#F1F5F9] dark:hover:bg-slate-800 transition-colors border-none bg-transparent cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* DRAWER BODY */}
          <div className="p-6 overflow-y-auto flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
