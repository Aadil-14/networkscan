import { useState, useMemo } from "react";
import {
  AlertTriangle,
  Info,
  RotateCw,
  Bell,
} from "lucide-react";
import { useApp } from "../context/useApp";
import EmptyState from "../components/ui/EmptyState";
import Button from "../components/ui/Button";

export default function AlertsPage() {
  const {
    alerts,
    activeAlerts,
    resolveAlert,
    dismissAlert,
    searchQuery,
    showToast,
  } = useApp();

  const [activeFilter, setActiveFilter] = useState("All");
  const [showResolved, setShowResolved] = useState(false);

  // Filter alerts based on tab selection + global search query + resolved toggle
  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) => {
      // Resolved state
      if (!showResolved && alert.isResolved) {
        return false;
      }
      // Severity filter
      if (activeFilter !== "All" && alert.severity !== activeFilter.toUpperCase()) {
        return false;
      }
      // Search query
      const query = searchQuery.trim().toLowerCase();
      if (!query) return true;
      return (
        alert.id.toLowerCase().includes(query) ||
        alert.title.toLowerCase().includes(query) ||
        alert.description.toLowerCase().includes(query) ||
        (alert.deviceId && alert.deviceId.toLowerCase().includes(query))
      );
    });
  }, [alerts, activeFilter, searchQuery, showResolved]);

  const unresolvedCriticalCount = useMemo(() => {
    return activeAlerts.filter((a) => a.severity === "CRITICAL").length;
  }, [activeAlerts]);

  const activeWarningCount = useMemo(() => {
    return activeAlerts.filter((a) => a.severity === "WARNING").length;
  }, [activeAlerts]);

  const handleRunSystemSweep = () => {
    showToast("Network Guard system sweep initiated across all subnets.", "info");
  };

  const handleUpdateNow = (alertId) => {
    showToast(`Firmware patch deployment started for #${alertId}.`);
    resolveAlert(alertId);
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 font-sans pb-12">
      {/* HEADER TITLE BAR & TABS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A] dark:text-slate-100 tracking-tight">
            System Alerts
          </h1>
          <p className="text-xs text-[#64748B] dark:text-slate-400 mt-1 font-normal max-w-[600px]">
            Monitor and respond to infrastructure anomalies across the SkyLink network. Status changes are pushed in real-time.
          </p>
        </div>

        {/* FILTER TABS & TOGGLES */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setShowResolved(!showResolved)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border border-[#CBD5E1] dark:border-slate-700 cursor-pointer transition-colors ${
              showResolved
                ? "bg-[#0066FF] text-white border-transparent"
                : "bg-white dark:bg-slate-900 text-[#334155] dark:text-slate-300 hover:bg-[#F8FAFC]"
            }`}
          >
            {showResolved ? "Showing History" : "Show Resolved"}
          </button>

          <div className="bg-[#F1F5F9] dark:bg-slate-800 p-1.5 rounded-xl flex items-center gap-1 self-start">
            <button
              type="button"
              onClick={() => setActiveFilter("All")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all border-none cursor-pointer flex items-center gap-2 ${
                activeFilter === "All"
                  ? "bg-white dark:bg-slate-900 text-[#0F172A] dark:text-slate-100 shadow-2xs"
                  : "text-[#64748B] dark:text-slate-400 hover:text-[#0F172A]"
              }`}
            >
              <span>All Alerts</span>
              <span className="px-1.5 py-0.5 bg-[#EFF6FF] text-[#0066FF] text-[10px] rounded-md font-bold">
                {activeAlerts.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveFilter("Critical")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all border-none cursor-pointer flex items-center gap-1.5 ${
                activeFilter === "Critical"
                  ? "bg-white dark:bg-slate-900 text-[#0F172A] dark:text-slate-100 shadow-2xs font-bold"
                  : "text-[#64748B] dark:text-slate-400 hover:text-[#0F172A]"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#DC2626]"></span>
              <span>Critical</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveFilter("Warning")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all border-none cursor-pointer flex items-center gap-1.5 ${
                activeFilter === "Warning"
                  ? "bg-white dark:bg-slate-900 text-[#0F172A] dark:text-slate-100 shadow-2xs font-bold"
                  : "text-[#64748B] dark:text-slate-400 hover:text-[#0F172A]"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#D97706]"></span>
              <span>Warning</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveFilter("Info")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all border-none cursor-pointer flex items-center gap-1.5 ${
                activeFilter === "Info"
                  ? "bg-white dark:bg-slate-900 text-[#0F172A] dark:text-slate-100 shadow-2xs font-bold"
                  : "text-[#64748B] dark:text-slate-400 hover:text-[#0F172A]"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#0066FF]"></span>
              <span>Info</span>
            </button>
          </div>
        </div>
      </div>

      {/* MAIN LAYOUT (2 COLS) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: ALERT CARDS FEED (7 COLS) */}
        <div className="lg:col-span-7 space-y-6">
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map((alert) => {
              const isCritical = alert.severity === "CRITICAL";
              const isWarning = alert.severity === "WARNING";
              const borderAccentClass = isCritical
                ? "border-t-[#DC2626]"
                : isWarning
                ? "border-t-[#D97706]"
                : "border-t-[#0066FF]";

              return (
                <div
                  key={alert.id}
                  className={`bg-white dark:bg-slate-900 rounded-2xl p-6 border border-[#E2E8F0] dark:border-slate-800 shadow-2xs relative overflow-hidden border-t-4 ${borderAccentClass} ${
                    alert.isResolved ? "opacity-60 grayscale-[30%]" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex items-center gap-2 text-xs font-bold tracking-wider uppercase ${
                        isCritical
                          ? "text-[#DC2626]"
                          : isWarning
                          ? "text-[#D97706]"
                          : "text-[#0066FF]"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isCritical
                            ? "bg-[#FEE2E2]"
                            : isWarning
                            ? "bg-[#FEF3C7]"
                            : "bg-[#EFF6FF]"
                        }`}
                      >
                        {isCritical && (
                          <span className="w-4 h-4 rounded-full bg-[#DC2626] text-white text-[10px] font-bold flex items-center justify-center">
                            !
                          </span>
                        )}
                        {isWarning && <AlertTriangle size={16} className="text-[#D97706]" />}
                        {!isCritical && !isWarning && <Info size={16} className="text-[#0066FF]" />}
                      </div>
                      <span>{alert.severity}</span>
                      <span className="text-[#94A3B8] font-normal">
                        • {alert.timestamp}
                      </span>
                      {alert.isResolved && (
                        <span className="px-2 py-0.5 bg-[#DCFCE7] text-[#16A34A] text-[9px] rounded-md font-bold uppercase">
                          Resolved
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-[#94A3B8] font-mono">
                      ID: #{alert.id}
                    </span>
                  </div>

                  <div className="mt-3 pl-10">
                    <h3 className="text-base font-bold text-[#0F172A] dark:text-slate-100">
                      {alert.title}
                    </h3>
                    <p className="text-xs text-[#64748B] dark:text-slate-400 mt-1 leading-relaxed">
                      {alert.description}
                    </p>

                    {!alert.isResolved && (
                      <div className="flex items-center gap-3 mt-5">
                        {alert.severity === "INFO" && alert.title.includes("Firmware") ? (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleUpdateNow(alert.id)}
                          >
                            Update Now
                          </Button>
                        ) : (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => resolveAlert(alert.id)}
                          >
                            Resolve
                          </Button>
                        )}

                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => dismissAlert(alert.id)}
                        >
                          Dismiss
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <EmptyState
              icon={Bell}
              title={`No ${activeFilter !== "All" ? activeFilter : ""} alerts found`}
              description="There are currently no active alerts matching your filter criteria."
              actionLabel="Reset Severity Filter"
              onAction={() => setActiveFilter("All")}
            />
          )}
        </div>

        {/* RIGHT COLUMN: OVERVIEW & MAP CARDS (5 COLS) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card 1: Alert Overview */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-[#E2E8F0] dark:border-slate-800 shadow-2xs space-y-6">
            <h3 className="text-base font-bold text-[#0F172A] dark:text-slate-100">
              Alert Overview
            </h3>

            <div className="space-y-3 divide-y divide-[#F1F5F9] dark:divide-slate-800">
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-[#475569] dark:text-slate-300 font-medium">
                  Unresolved Critical
                </span>
                <span className="px-2.5 py-0.5 bg-[#FEE2E2] text-[#DC2626] text-xs font-bold rounded-md">
                  {String(unresolvedCriticalCount).padStart(2, "0")}
                </span>
              </div>

              <div className="flex items-center justify-between pt-3">
                <span className="text-xs text-[#475569] dark:text-slate-300 font-medium">
                  Active Warnings
                </span>
                <span className="px-2.5 py-0.5 bg-[#FEF3C7] text-[#D97706] text-xs font-bold rounded-md">
                  {String(activeWarningCount).padStart(2, "0")}
                </span>
              </div>

              <div className="flex items-center justify-between pt-3">
                <span className="text-xs text-[#475569] dark:text-slate-300 font-medium">
                  System Uptime
                </span>
                <span className="text-xs font-extrabold text-[#0F172A] dark:text-slate-100">
                  99.98%
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#F1F5F9] dark:border-slate-800">
              <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider block mb-3">
                SEVERITY TREND (24H)
              </span>
              <div className="flex items-end justify-between h-16 gap-2 px-2">
                <div className="w-full bg-[#FCA5A5] rounded-xs h-[65%]"></div>
                <div className="w-full bg-[#EF4444] rounded-xs h-[90%]"></div>
                <div className="w-full bg-[#FED7AA] rounded-xs h-[40%]"></div>
                <div className="w-full bg-[#F59E0B] rounded-xs h-[55%]"></div>
                <div className="w-full bg-[#B45309] rounded-xs h-[75%]"></div>
                <div className="w-full bg-[#BFDBFE] rounded-xs h-[45%]"></div>
                <div className="w-full bg-[#93C5FD] rounded-xs h-[30%]"></div>
              </div>
            </div>
          </div>

          {/* Card 2: Live Map Context */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-[#E2E8F0] dark:border-slate-800 shadow-2xs">
            <div className="relative h-44 bg-[#0F172A] overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80"
                alt="Network Topography Map"
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-3 left-3 px-3 py-1 bg-[#DC2626] text-white rounded-full text-[10px] font-bold tracking-wider flex items-center gap-1.5 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                <span>Live Map Context</span>
              </div>
            </div>
            <div className="p-5">
              <p className="text-xs text-[#475569] dark:text-slate-300 leading-relaxed font-medium">
                View full network topography to locate physical hardware failure points.
              </p>
            </div>
          </div>

          {/* Card 3: Network Guard */}
          <div className="bg-[#284E7D] rounded-2xl p-6 text-white shadow-md space-y-4">
            <div>
              <h3 className="text-base font-bold">Network Guard</h3>
              <p className="text-xs text-[#DBEAFE] mt-1 leading-relaxed">
                Automated diagnostic protocol is currently active.
              </p>
            </div>

            <button
              type="button"
              onClick={handleRunSystemSweep}
              className="w-full py-2.5 px-4 bg-white hover:bg-[#F8FAFC] text-[#284E7D] font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors border-none cursor-pointer"
            >
              <RotateCw size={15} />
              <span>Run Full System Sweep</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
