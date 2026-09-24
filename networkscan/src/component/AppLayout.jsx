import { useState } from "react";
import Sidebar from "./Sidebar";
import { Search, Bell, Moon, Sun, X, AlertTriangle, Menu } from "lucide-react";
import { useApp } from "../context/useApp";
import Toast from "../components/ui/Toast";

export default function AppLayout({ children, activeTab, setActiveTab }) {
  const {
    currentUser,
    searchQuery,
    setSearchQuery,
    darkMode,
    setDarkMode,
    activeAlerts,
    criticalAlertsCount,
    toastMessage,
    setToastMessage,
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getRoleTitle = () => {
    return currentUser?.role || "SYSTEM SUPERUSER";
  };

  const getSearchPlaceholder = () => {
    switch (activeTab) {
      case "Devices":
        return "Search devices, nodes, or IDs...";
      case "Alerts":
        return "Search network nodes or alert IDs...";
      case "User Management":
        return "Search systems, users, or logs...";
      default:
        return "Search devices, alerts or logs...";
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-[#F6F8FA] dark:bg-slate-950 font-sans text-[#0F172A] dark:text-slate-100 transition-colors overflow-x-hidden">
      {/* GLOBAL TOAST FEEDBACK OVERLAY */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 max-w-sm">
          <Toast
            message={toastMessage.message}
            type={toastMessage.type}
            onClose={() => setToastMessage(null)}
          />
        </div>
      )}

      {/* MOBILE SIDEBAR OVERLAY / DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
          <aside className="relative w-72 max-w-[80vw] h-full bg-[#284E7D] text-white p-6 shadow-2xl flex flex-col justify-between overflow-y-auto z-10 animate-in slide-in-from-left duration-200">
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/80 hover:text-white p-1 rounded-lg bg-transparent border-none cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>
            <Sidebar
              activeTab={activeTab}
              setActiveTab={(tab) => {
                setActiveTab(tab);
                setMobileMenuOpen(false);
              }}
            />
          </aside>
        </div>
      )}

      {/* DESKTOP SIDEBAR COLUMN */}
      <aside className="hidden lg:flex w-64 shrink-0 h-screen sticky top-0 bg-[#284E7D] text-white p-6 shadow-lg z-30 flex-col justify-between overflow-y-auto">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </aside>

      {/* RIGHT SECTION: MAIN APP WRAPPER & TOP NAVBAR */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* TOP NAVBAR */}
        <header className="h-[70px] bg-white dark:bg-slate-900 border-b border-[#E2E8F0] dark:border-slate-800 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-40 shadow-2xs transition-colors gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {/* MOBILE HAMBURGER BUTTON */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-[#64748B] dark:text-slate-300 hover:text-[#0F172A] dark:hover:text-white rounded-xl bg-slate-100 dark:bg-slate-800 border-none cursor-pointer shrink-0"
              aria-label="Open mobile menu"
            >
              <Menu size={20} />
            </button>

            {/* SEARCH INPUT */}
            <div className="flex items-center gap-3 bg-[#F1F5F9] dark:bg-slate-800 rounded-full px-3.5 py-2 sm:px-4 sm:py-2.5 w-full max-w-xs sm:max-w-sm md:w-96 focus-within:ring-2 focus-within:ring-[#0066FF]/20 focus-within:bg-white dark:focus-within:bg-slate-900 border border-transparent focus-within:border-[#0066FF]/30 transition-all">
              <Search size={18} className="text-[#94A3B8] shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={getSearchPlaceholder()}
                className="bg-transparent border-none outline-none text-xs text-[#0F172A] dark:text-slate-100 w-full placeholder:text-[#94A3B8]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-slate-200 border-none bg-transparent cursor-pointer p-0.5 rounded-full"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* ACTIONS & PROFILE */}
          <div className="flex items-center gap-3 sm:gap-6 shrink-0">
            <div className="flex items-center gap-1 sm:gap-3 relative">
              {/* NOTIFICATION BUTTON & POPOVER */}
              <button
                type="button"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative border-none bg-transparent text-[#64748B] dark:text-slate-400 cursor-pointer p-2 rounded-full hover:bg-[#F1F5F9] dark:hover:bg-slate-800 hover:text-[#0F172A] dark:hover:text-slate-100 transition-colors"
                title="Notifications"
              >
                <Bell size={19} />
                {activeAlerts.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-900 animate-pulse"></span>
                )}
              </button>

              {/* NOTIFICATION POPOVER */}
              {showNotifications && (
                <div className="absolute right-0 top-12 w-72 sm:w-80 bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 rounded-2xl shadow-xl z-50 p-4 space-y-3 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center justify-between border-b border-[#E2E8F0] dark:border-slate-800 pb-2.5">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-[#0F172A] dark:text-slate-100">
                        System Alerts
                      </h4>
                      <span className="px-2 py-0.5 bg-[#FEE2E2] text-[#DC2626] text-[10px] font-bold rounded-md">
                        {criticalAlertsCount} Critical
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowNotifications(false)}
                      className="text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-slate-200 border-none bg-transparent cursor-pointer p-0.5"
                    >
                      <X size={14} />
                    </button>
                  </div>

                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {activeAlerts.length > 0 ? (
                      activeAlerts.slice(0, 4).map((alert) => (
                        <div
                          key={alert.id}
                          className="p-2.5 bg-[#F8FAFC] dark:bg-slate-800/60 rounded-xl border border-[#E2E8F0] dark:border-slate-800 flex items-start gap-2.5 text-xs"
                        >
                          <AlertTriangle
                            size={16}
                            className={
                              alert.severity === "CRITICAL"
                                ? "text-[#DC2626] shrink-0 mt-0.5"
                                : "text-[#D97706] shrink-0 mt-0.5"
                            }
                          />
                          <div>
                            <div className="font-bold text-[#0F172A] dark:text-slate-100">
                              {alert.title}
                            </div>
                            <div className="text-[11px] text-[#64748B] dark:text-slate-400 mt-0.5 line-clamp-2">
                              {alert.description}
                            </div>
                            <span className="text-[10px] text-[#94A3B8] font-mono mt-1 block">
                              {alert.timestamp}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-[#64748B] text-center py-4">
                        No active unhandled alerts.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* DARK MODE TOGGLE */}
              <button
                type="button"
                onClick={() => setDarkMode(!darkMode)}
                className="border-none bg-transparent text-[#64748B] dark:text-slate-400 cursor-pointer p-2 rounded-full hover:bg-[#F1F5F9] dark:hover:bg-slate-800 hover:text-[#0F172A] dark:hover:text-slate-100 transition-colors"
                title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {darkMode ? <Sun size={19} className="text-amber-400" /> : <Moon size={19} />}
              </button>
            </div>

            {/* PROFILE SECTION */}
            <div className="flex items-center gap-3 pl-3 sm:pl-6 border-l border-[#E2E8F0] dark:border-slate-800">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs font-bold text-[#0F172A] dark:text-slate-100">
                  {currentUser?.name || "Admin Profile"}
                </span>
                <span className="text-[9px] font-extrabold text-[#64748B] dark:text-slate-400 uppercase tracking-wider mt-0.5">
                  {getRoleTitle()}
                </span>
              </div>
              <div className="relative">
                <img
                  src={currentUser?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"}
                  alt="Admin Avatar"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-white dark:border-slate-800 shadow-sm ring-1 ring-[#E2E8F0] dark:ring-slate-700"
                />
              </div>
            </div>
          </div>
        </header>

        {/* REST OF THE APP */}
        <main className="flex-1 min-w-0 bg-[#F6F8FA] dark:bg-slate-950 transition-colors p-4 sm:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
