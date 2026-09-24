import { useState, useMemo } from "react";
import {
  FileText,
  Download,
  Calendar,
  BarChart2,
  TrendingUp,
  Activity,
  CheckCircle,
  ChevronDown,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useApp } from "../context/useApp";
import Button from "../components/ui/Button";

export default function ReportsPage() {
  const { bandwidthData, reportSummary, showToast } = useApp();

  const [timeRange, setTimeRange] = useState("Last 30 Days");
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);

  // Dynamic bandwidth chart data scaled by selected timeframe
  const displayBandwidthData = useMemo(() => {
    switch (timeRange) {
      case "Last 7 Days":
        return bandwidthData.slice(-4).map((d) => ({
          ...d,
          download: Math.round(d.download * 0.85),
          upload: Math.round(d.upload * 0.85),
        }));
      case "Last 90 Days":
        return bandwidthData.map((d) => ({
          ...d,
          download: Math.round(d.download * 1.2),
          upload: Math.round(d.upload * 1.15),
        }));
      case "This Year":
        return bandwidthData.map((d) => ({
          ...d,
          download: Math.round(d.download * 1.4),
          upload: Math.round(d.upload * 1.3),
        }));
      case "Last 30 Days":
      default:
        return bandwidthData;
    }
  }, [bandwidthData, timeRange]);

  // Export CSV entirely client-side
  const handleExportCSV = () => {
    try {
      const headers = "Time,Download_Mbps,Upload_Mbps\n";
      const rows = displayBandwidthData
        .map((r) => `${r.time},${r.download},${r.upload}`)
        .join("\n");
      const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(headers + rows);

      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", csvContent);
      downloadAnchor.setAttribute(
        "download",
        `skylink_bandwidth_report_${timeRange.replace(/\s+/g, "_").toLowerCase()}.csv`
      );
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      document.body.removeChild(downloadAnchor);

      showToast("CSV report generated and downloaded locally.");
    } catch (err) {
      console.error(err);
      showToast("Failed to generate CSV export.", "error");
    }
  };

  const handleExportPDF = () => {
    showToast("Generating local PDF telemetry snapshot...", "info");
    setTimeout(() => {
      window.print();
    }, 500);
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8 font-sans">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A] dark:text-slate-100 tracking-tight">
            Network Performance Reports
          </h1>
          <p className="text-xs text-[#64748B] dark:text-slate-400 mt-1 font-normal">
            Generate, view, and export infrastructure analytics and uptime reports.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="primary" iconLeft={Download} onClick={handleExportPDF}>
            Export PDF Report
          </Button>

          <Button variant="secondary" iconLeft={FileText} onClick={handleExportCSV}>
            Export CSV Data
          </Button>
        </div>
      </div>

      {/* TIMEFRAME CONTROLS BAR */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-xl border border-[#E2E8F0] dark:border-slate-800 shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#0F172A] dark:text-slate-200">
          <Calendar size={16} className="text-[#0066FF]" />
          <span>Active Reporting Period: <strong>{timeRange}</strong></span>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setShowTimeDropdown(!showTimeDropdown)}
            className="flex items-center gap-2 px-4 py-2 bg-[#F1F5F9] dark:bg-slate-800 text-[#334155] dark:text-slate-200 rounded-xl text-xs font-semibold hover:bg-[#E2E8F0] dark:hover:bg-slate-700 transition-colors cursor-pointer border-none"
          >
            <span>Select Period</span>
            <ChevronDown size={14} />
          </button>

          {showTimeDropdown && (
            <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 rounded-xl shadow-lg z-30 py-1.5 animate-in fade-in zoom-in-95 duration-100">
              {["Last 7 Days", "Last 30 Days", "Last 90 Days", "This Year"].map((range) => (
                <button
                  key={range}
                  type="button"
                  onClick={() => {
                    setTimeRange(range);
                    setShowTimeDropdown(false);
                    showToast(`Updated report timeframe to ${range}.`, "info");
                  }}
                  className={`w-full text-left px-4 py-2 text-xs font-semibold cursor-pointer border-none transition-colors ${
                    timeRange === range
                      ? "bg-[#EFF6FF] text-[#0066FF]"
                      : "text-[#334155] dark:text-slate-300 hover:bg-[#F8FAFC] dark:hover:bg-slate-800"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* SUMMARY STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-[#E2E8F0] dark:border-slate-800 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#64748B] dark:text-slate-400 uppercase">
              SLA Uptime Target
            </span>
            <span className="p-2 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-lg">
              <CheckCircle size={18} />
            </span>
          </div>
          <div className="text-2xl font-bold text-[#0F172A] dark:text-slate-100">
            {reportSummary?.slaTarget || "99.94%"}
          </div>
          <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
            <TrendingUp size={13} strokeWidth={3} /> {reportSummary?.slaStatus || "Above 99.90% SLA"}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-[#E2E8F0] dark:border-slate-800 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#64748B] dark:text-slate-400 uppercase">
              Peak Traffic Volume
            </span>
            <span className="p-2 bg-blue-50 dark:bg-blue-950/60 text-[#0066FF] rounded-lg">
              <BarChart2 size={18} />
            </span>
          </div>
          <div className="text-2xl font-bold text-[#0F172A] dark:text-slate-100">
            {reportSummary?.peakTraffic || "1.45 Gbps"}
          </div>
          <div className="text-xs text-[#64748B] dark:text-slate-400 mt-1">
            {reportSummary?.peakTime || "Recorded at 16:00 UTC"}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-[#E2E8F0] dark:border-slate-800 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#64748B] dark:text-slate-400 uppercase">
              Avg Packet Latency
            </span>
            <span className="p-2 bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 rounded-lg">
              <Activity size={18} />
            </span>
          </div>
          <div className="text-2xl font-bold text-[#0F172A] dark:text-slate-100">
            {reportSummary?.avgLatency || "8.4 ms"}
          </div>
          <div className="text-xs text-[#64748B] dark:text-slate-400 mt-1">
            {reportSummary?.latencyScope || "Global Node Average"}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-[#E2E8F0] dark:border-slate-800 shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#64748B] dark:text-slate-400 uppercase">
              Reporting Window
            </span>
            <span className="p-2 bg-slate-100 dark:bg-slate-800 text-[#475569] dark:text-slate-300 rounded-lg">
              <Calendar size={18} />
            </span>
          </div>
          <div className="text-2xl font-bold text-[#0F172A] dark:text-slate-100">
            {timeRange}
          </div>
          <div className="text-xs text-[#64748B] dark:text-slate-400 mt-1">
            {reportSummary?.dateRange || "Oct 01 - Oct 30, 2026"}
          </div>
        </div>
      </div>

      {/* BANDWIDTH ANALYTICS CHART */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-[#E2E8F0] dark:border-slate-800 shadow-2xs">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-bold text-[#0F172A] dark:text-slate-100 text-base">
              Bandwidth Usage Profile ({timeRange})
            </h3>
            <p className="text-xs text-[#64748B] dark:text-slate-400 mt-0.5">
              Real-time inbound (download) vs outbound (upload) traffic profile.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-[#0F172A] dark:text-slate-200">
              <span className="w-3 h-3 rounded-full bg-[#0066FF]"></span> Download (Mbps)
            </span>
            <span className="flex items-center gap-1.5 text-[#0F172A] dark:text-slate-200">
              <span className="w-3 h-3 rounded-full bg-[#10B981]"></span> Upload (Mbps)
            </span>
          </div>
        </div>

        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={displayBandwidthData}>
              <XAxis dataKey="time" stroke="#94A3B8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: "#1E293B", borderRadius: "8px", color: "#FFF", border: "none", fontSize: "12px" }} />
              <Area type="monotone" dataKey="download" stroke="#0066FF" fill="#0066FF" fillOpacity={0.15} strokeWidth={2} />
              <Area type="monotone" dataKey="upload" stroke="#10B981" fill="#10B981" fillOpacity={0.15} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
