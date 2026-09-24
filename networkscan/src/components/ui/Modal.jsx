import { useEffect } from "react";
import { X } from "lucide-react";
import Button from "./Button";

export default function Modal({
  isOpen = false,
  onClose,
  title,
  subtitle,
  children,
  confirmText,
  cancelText = "Cancel",
  onConfirm,
  confirmVariant = "primary",
  isLoading = false,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      ></div>

      <div
        className={`bg-white dark:bg-slate-900 rounded-2xl border border-[#E2E8F0] dark:border-slate-800 shadow-xl w-full ${maxWidth} z-10 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200`}
      >
        {/* MODAL HEADER */}
        <div className="p-6 border-b border-[#E2E8F0] dark:border-slate-800 flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold text-[#0F172A] dark:text-slate-100">{title}</h3>
            {subtitle && (
              <p className="text-xs text-[#64748B] dark:text-slate-400 mt-1">{subtitle}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-slate-200 p-1.5 rounded-lg hover:bg-[#F1F5F9] dark:hover:bg-slate-800 transition-colors border-none bg-transparent cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="p-6 overflow-y-auto flex-1">{children}</div>

        {/* MODAL FOOTER */}
        {(confirmText || cancelText) && (
          <div className="p-5 border-t border-[#E2E8F0] dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-800/50 flex items-center justify-end gap-3">
            {cancelText && (
              <Button variant="secondary" onClick={onClose} disabled={isLoading}>
                {cancelText}
              </Button>
            )}
            {confirmText && (
              <Button
                variant={confirmVariant}
                onClick={onConfirm}
                isLoading={isLoading}
              >
                {confirmText}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
