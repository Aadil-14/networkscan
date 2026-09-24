import { useState } from "react";
import {
  Server,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Users,
  ChevronDown,
  PlusCircle,
  BarChart3,
  RotateCw,
  Activity,
  Link as LinkIcon,
  Download,
  User,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  ResponsiveContainer,
  ComposedChart,
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useApp } from "../context/useApp";
import Modal from "../components/ui/Modal";
import Button from "../components/ui/Button";

export default function DashboardPage() {
  const {
    devices,
    addDevice,
    onlineDevicesCount,
    offlineDevicesCount,
    activeAlerts,
    criticalAlertsCount,
    users,
    healthTrendData: rawHealthTrend,
    monthlyAlertsData,
    recentActivity,
    showToast,
  } = useApp();

  const [timeRange, setTimeRange] = useState("Last 30 Days");
  const [showTimeRangeDropdown, setShowTimeRangeDropdown] = useState(false);

  // Modals
  const [isAddDeviceModalOpen, setIsAddDeviceModalOpen] = useState(false);
  const [newDeviceName, setNewDeviceName] = useState("");
  const [newDeviceLocation, setNewDeviceLocation] = useState("");
  const [newDeviceStatus, setNewDeviceStatus] = useState("ONLINE");

  // Dynamic calculations derived from shared state
  const totalDevices = devices.length;
  const uptimePercent = totalDevices > 0 ? ((onlineDevicesCount / totalDevices) * 100).toFixed(1) : "96.5";
  const healthScore = totalDevices > 0 ? Math.round((onlineDevicesCount / totalDevices) * 100) : 94;
  const connectedUsersText = `${(8.2 + (users.length - 7) * 0.1).toFixed(1)}k`;

  // Scale health trend chart data based on selected time range
  const getFilteredHealthTrend = () => {
    switch (timeRange) {
      case "Last 7 Days":
        return rawHealthTrend.slice(-5);
      case "Last 90 Days":
        return rawHealthTrend.map((d) => ({ ...d, val: Math.min(100, d.val + 5) }));
      case "This Year":
        return rawHealthTrend.map((d) => ({ ...d, val: Math.max(20, d.val - 5) }));
      case "Last 30 Days":
      default:
        return rawHealthTrend;
    }
  };

  const handleCreateDevice = (e) => {
    e.preventDefault();
    if (!newDeviceName.trim()) {
      showToast("Please enter a valid device name.", "error");
      return;
    }
    addDevice({
      name: newDeviceName,
      location: newDeviceLocation || "Primary Subnet",
      status: newDeviceStatus,
      powerPercent: 95,
      charging: "Active",
      chargingIcon: "sun",
      chargingType: "solar",
      firmware: "v2.4.1-rc",
    });
    setNewDeviceName("");
    setNewDeviceLocation("");
    setIsAddDeviceModalOpen(false);
  };

  const handleRestartDevice = () => {
    showToast("Device restart command dispatched to edge cluster.", "info");
  };

  const handleRunDiagnostics = () => {
    showToast("Initiated full system diagnostic sweep...", "info");
  };

  const handleGenerateReport = () => {
    window.location.hash = "#reports";
    showToast("Navigated to Reports generation panel.");
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 font-sans pb-12">
      {/* ADD DEVICE MODAL */}
      <Modal
        isOpen={isAddDeviceModalOpen}
        onClose={() => setIsAddDeviceModalOpen(false)}
        title="Provision New Hardware Node"
        subtitle="Register a new network device to the SkyLink global inventory."
      >
        <form onSubmit={handleCreateDevice} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#0F172A] dark:text-slate-200 uppercase mb-1">
              Device Name
            </label>
            <input
              type="text"
              value={newDeviceName}
              onChange={(e) => setNewDeviceName(e.target.value)}
              placeholder="e.g. Vertex Node Gamma"
              className="w-full px-3.5 py-2.5 bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-xl text-xs text-[#0F172A] dark:text-slate-100 outline-none focus:border-[#0066FF]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0F172A] dark:text-slate-200 uppercase mb-1">
              Location / Subnet
            </label>
            <input
              type="text"
              value={newDeviceLocation}
              onChange={(e) => setNewDeviceLocation(e.target.value)}
              placeholder="e.g. San Francisco - Sector B"
              className="w-full px-3.5 py-2.5 bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-xl text-xs text-[#0F172A] dark:text-slate-100 outline-none focus:border-[#0066FF]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0F172A] dark:text-slate-200 uppercase mb-1">
              Initial Status
            </label>
            <select
              value={newDeviceStatus}
              onChange={(e) => setNewDeviceStatus(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-xl text-xs text-[#0F172A] dark:text-slate-100 outline-none focus:border-[#0066FF]"
            >
              <option value="ONLINE">ONLINE (Active)</option>
              <option value="WARNING">WARNING (Low Signal)</option>
              <option value="OFFLINE">OFFLINE (Standby)</option>
            </select>
          </div>

          <div className="pt-3 flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setIsAddDeviceModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Provision Node
            </Button>
          </div>
        </form>
      </Modal>

      {/* HEADER TITLE BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A] dark:text-slate-100 tracking-tight">
            Network Overview
          </h1>
          <p className="text-xs text-[#64748B] dark:text-slate-400 mt-1 font-normal">
            Real-time status of your global node infrastructure.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#DCFCE7] dark:bg-emerald-950/60 text-[#15803D] dark:text-emerald-400 rounded-full text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse"></span>
            <span>{criticalAlertsCount > 0 ? `${criticalAlertsCount} Critical Alert(s)` : "System Normal"}</span>
          </div>
          <span className="text-xs text-[#94A3B8]">Last synced: Just now</span>
        </div>
      </div>

      {/* 6 TOP KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        {/* Card 1: Total Devices */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-[#E2E8F0] dark:border-slate-800 shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
          <div>
            <span className="text-[11px] font-semibold text-[#64748B] dark:text-slate-400 uppercase tracking-wider">
              Total Devices
            </span>
            <div className="flex items-center justify-between mt-2">
              <span className="text-2xl font-bold text-[#0F172A] dark:text-slate-100 tracking-tight">
                {totalDevices}
              </span>
              <div className="w-9 h-9 rounded-lg bg-[#EFF6FF] dark:bg-blue-950/50 border border-[#BFDBFE] dark:border-blue-800 flex items-center justify-center">
                <Server size={18} className="text-[#0066FF]" />
              </div>
            </div>
          </div>
          <div className="mt-4 pt-2 border-t border-[#F1F5F9] dark:border-slate-800">
            <div className="h-1 w-full bg-[#BFDBFE] dark:bg-blue-950 rounded-full overflow-hidden">
              <div className="h-full bg-[#0066FF] w-full"></div>
            </div>
          </div>
        </div>

        {/* Card 2: Online */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-[#E2E8F0] dark:border-slate-800 shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
          <div>
            <span className="text-[11px] font-semibold text-[#64748B] dark:text-slate-400 uppercase tracking-wider">
              Online
            </span>
            <div className="flex items-center justify-between mt-2">
              <span className="text-2xl font-bold text-[#0F172A] dark:text-slate-100 tracking-tight">
                {onlineDevicesCount}
              </span>
              <div className="w-9 h-9 rounded-full bg-[#DCFCE7] dark:bg-emerald-950/50 flex items-center justify-center">
                <CheckCircle2 size={18} className="text-[#16A34A]" />
              </div>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs font-semibold text-[#16A34A] flex items-center gap-1">
              {uptimePercent}% Uptime <ArrowUpRight size={13} />
            </span>
          </div>
          <div className="mt-2">
            <div className="h-1 w-full bg-[#DCFCE7] dark:bg-emerald-950 rounded-full overflow-hidden">
              <div className="h-full bg-[#16A34A]" style={{ width: `${uptimePercent}%` }}></div>
            </div>
          </div>
        </div>

        {/* Card 3: Offline */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-[#E2E8F0] dark:border-slate-800 shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
          <div>
            <span className="text-[11px] font-semibold text-[#64748B] dark:text-slate-400 uppercase tracking-wider">
              Offline
            </span>
            <div className="flex items-center justify-between mt-2">
              <span className="text-2xl font-bold text-[#DC2626] tracking-tight">
                {offlineDevicesCount}
              </span>
              <div className="w-9 h-9 rounded-full bg-[#FEE2E2] dark:bg-red-950/50 flex items-center justify-center">
                <span className="w-5 h-5 rounded-full bg-[#DC2626] text-white text-xs font-bold flex items-center justify-center">
                  !
                </span>
              </div>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs font-semibold text-[#DC2626] flex items-center gap-1">
              {offlineDevicesCount > 0 ? "Action Required" : "All Operational"}{" "}
              <ArrowDownRight size={13} />
            </span>
          </div>
          <div className="mt-2">
            <div className="h-1 w-full bg-[#FEE2E2] dark:bg-red-950 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#DC2626]"
                style={{ width: `${totalDevices > 0 ? (offlineDevicesCount / totalDevices) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Card 4: Connected Users */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-[#E2E8F0] dark:border-slate-800 shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
          <div>
            <span className="text-[11px] font-semibold text-[#64748B] dark:text-slate-400 uppercase tracking-wider">
              Connected Users
            </span>
            <div className="flex items-center justify-between mt-2">
              <span className="text-2xl font-bold text-[#0F172A] dark:text-slate-100 tracking-tight">
                {connectedUsersText}
              </span>
              <div className="w-9 h-9 rounded-lg bg-[#EFF6FF] dark:bg-blue-950/50 border border-[#BFDBFE] dark:border-blue-800 flex items-center justify-center">
                <Users size={18} className="text-[#0066FF]" />
              </div>
            </div>
          </div>
          <div className="mt-4 pt-2 border-t border-[#F1F5F9] dark:border-slate-800">
            <div className="h-1 w-full bg-[#E2E8F0] dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-[#0066FF] w-[60%]"></div>
            </div>
          </div>
        </div>

        {/* Card 5: Active Alerts */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-[#E2E8F0] dark:border-slate-800 shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
          <div>
            <span className="text-[11px] font-semibold text-[#64748B] dark:text-slate-400 uppercase tracking-wider">
              Active Alerts
            </span>
            <div className="flex items-center justify-between mt-2">
              <span className="text-2xl font-bold text-[#0F172A] dark:text-slate-100 tracking-tight">
                {activeAlerts.length}
              </span>
              <div className="w-9 h-9 rounded-lg bg-[#FEF3C7] dark:bg-amber-950/50 flex items-center justify-center">
                <AlertTriangle size={18} className="text-[#D97706]" />
              </div>
            </div>
          </div>
          <div className="mt-3">
            <span className="inline-block px-2 py-0.5 bg-[#FEE2E2] text-[#DC2626] rounded text-[10px] font-bold tracking-wide uppercase">
              {criticalAlertsCount} CRITICAL
            </span>
          </div>
          <div className="mt-2">
            <div className="h-1 w-full bg-[#FEF3C7] dark:bg-amber-950 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#D97706]"
                style={{ width: `${activeAlerts.length > 0 ? Math.min(100, activeAlerts.length * 20) : 0}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Card 6: Device Health */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-[#E2E8F0] dark:border-slate-800 shadow-2xs flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
          <div>
            <span className="text-[11px] font-semibold text-[#64748B] dark:text-slate-400 uppercase tracking-wider">
              Device Health
            </span>
            <div className="flex items-center justify-between mt-2">
              <span className="text-2xl font-bold text-[#0F172A] dark:text-slate-100 tracking-tight">
                {healthScore}%
              </span>
              <div className="w-9 h-9 rounded-lg bg-[#EFF6FF] dark:bg-blue-950/50 border border-[#BFDBFE] dark:border-blue-800 flex items-center justify-center">
                <ShieldCheck size={18} className="text-[#0066FF]" />
              </div>
            </div>
          </div>
          <div className="mt-4 pt-2 border-t border-[#F1F5F9] dark:border-slate-800">
            <div className="h-1 w-full bg-[#BFDBFE] dark:bg-blue-950 rounded-full overflow-hidden">
              <div className="h-full bg-[#0066FF]" style={{ width: `${healthScore}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* CHART 1: Network Health Trend (7 Cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-xl p-6 border border-[#E2E8F0] dark:border-slate-800 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6 relative">
            <div>
              <h3 className="text-base font-bold text-[#0F172A] dark:text-slate-100">
                Network Health Trend
              </h3>
              <p className="text-xs text-[#64748B] dark:text-slate-400 mt-0.5">
                Aggregate performance metric over the selected timeframe.
              </p>
            </div>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowTimeRangeDropdown(!showTimeRangeDropdown)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F1F5F9] dark:bg-slate-800 text-[#334155] dark:text-slate-200 rounded-lg text-xs font-semibold hover:bg-[#E2E8F0] dark:hover:bg-slate-700 transition-colors cursor-pointer border-none"
              >
                <span>{timeRange}</span>
                <ChevronDown size={14} />
              </button>
              {showTimeRangeDropdown && (
                <div className="absolute right-0 mt-1.5 w-40 bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 rounded-xl shadow-lg z-50 py-1">
                  {["Last 7 Days", "Last 30 Days", "Last 90 Days", "This Year"].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setTimeRange(opt);
                        setShowTimeRangeDropdown(false);
                      }}
                      className={`w-full text-left px-3.5 py-1.5 text-xs font-medium border-none cursor-pointer hover:bg-[#F8FAFC] dark:hover:bg-slate-800 ${
                        timeRange === opt ? "text-[#0066FF] font-bold" : "text-[#334155] dark:text-slate-300"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={getFilteredHealthTrend()} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} domain={[0, 100]} hide={true} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0F172A",
                    borderRadius: "8px",
                    color: "#FFF",
                    border: "none",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="val" fill="#0066FF" radius={[3, 3, 0, 0]} barSize={5} />
                <Line
                  type="monotone"
                  dataKey="lineVal"
                  stroke="#0052CC"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 5, fill: "#0066FF" }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 2: Monthly Alerts (5 Cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-xl p-6 border border-[#E2E8F0] dark:border-slate-800 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-[#0F172A] dark:text-slate-100">
                Monthly Alerts
              </h3>
              <p className="text-xs text-[#64748B] dark:text-slate-400 mt-0.5">
                Comparison of alert frequency by severity level.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-[#0F172A] dark:text-slate-200 font-medium">
                <span className="w-2.5 h-2.5 bg-[#991B1B] rounded-xs"></span> Critical
              </span>
              <span className="flex items-center gap-1 text-[#0F172A] dark:text-slate-200 font-medium">
                <span className="w-2.5 h-2.5 bg-[#92400E] rounded-xs"></span> Warning
              </span>
              <span className="flex items-center gap-1 text-[#0F172A] dark:text-slate-200 font-medium">
                <span className="w-2.5 h-2.5 bg-[#1E40AF] rounded-xs"></span> Info
              </span>
            </div>
          </div>

          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyAlertsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} hide={true} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0F172A",
                    borderRadius: "8px",
                    color: "#FFF",
                    border: "none",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="critical" stackId="a" fill="#991B1B" barSize={36} />
                <Bar dataKey="warning" stackId="a" fill="#92400E" barSize={36} />
                <Bar dataKey="info" stackId="a" fill="#1E40AF" radius={[4, 4, 0, 0]} barSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* BOTTOM ROW (Recent Activity & Quick Actions) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* RECENT ACTIVITY FEED (7 Cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-xl p-6 border border-[#E2E8F0] dark:border-slate-800 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-bold text-[#0F172A] dark:text-slate-100">
              Recent Activity
            </h3>
            <button
              type="button"
              onClick={() => {
                window.location.hash = "#alerts";
              }}
              className="text-xs font-semibold text-[#0066FF] hover:underline bg-transparent border-none cursor-pointer"
            >
              View All Alerts & Logs
            </button>
          </div>

          <div className="space-y-4">
            {recentActivity.slice(0, 4).map((act) => (
              <div
                key={act.id}
                className="flex items-center justify-between p-3.5 rounded-xl hover:bg-[#F8FAFC] dark:hover:bg-slate-800/60 transition-colors border border-transparent hover:border-[#E2E8F0] dark:hover:border-slate-800"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full ${act.badgeBg} flex items-center justify-center shrink-0`}>
                    {act.iconType === "link" && <LinkIcon size={18} className={act.iconColor} />}
                    {act.iconType === "download" && <Download size={18} className={act.iconColor} />}
                    {act.iconType === "alert" && <AlertTriangle size={18} className={act.iconColor} />}
                    {act.iconType === "user" && <User size={18} className={act.iconColor} />}
                    {act.iconType === "check" && <CheckCircle2 size={18} className={act.iconColor} />}
                    {act.iconType === "info" && <Activity size={18} className={act.iconColor} />}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#0F172A] dark:text-slate-100">
                      {act.title}
                    </div>
                    <p className="text-xs text-[#64748B] dark:text-slate-400 mt-0.5">
                      {act.description}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-[#94A3B8] font-medium shrink-0 ml-4">
                  {act.timestamp}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* QUICK ACTIONS & HEALTH SCORE (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Actions Panel */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-[#E2E8F0] dark:border-slate-800 shadow-2xs">
            <h3 className="text-base font-bold text-[#0F172A] dark:text-slate-100 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setIsAddDeviceModalOpen(true)}
                className="w-full py-3 px-4 bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-xs tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all cursor-pointer border-none uppercase"
              >
                <PlusCircle size={17} />
                <span>Add New Device</span>
              </button>

              <button
                type="button"
                onClick={handleGenerateReport}
                className="w-full py-3 px-4 bg-white dark:bg-slate-900 border-2 border-[#0066FF] hover:bg-[#EFF6FF] dark:hover:bg-blue-950 text-[#0066FF] font-bold text-xs tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer uppercase"
              >
                <BarChart3 size={17} />
                <span>Generate Report</span>
              </button>

              <button
                type="button"
                onClick={handleRestartDevice}
                className="w-full py-3 px-4 bg-white dark:bg-slate-900 border border-[#CBD5E1] dark:border-slate-700 hover:bg-[#F8FAFC] dark:hover:bg-slate-800 text-[#334155] dark:text-slate-200 font-bold text-xs tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer uppercase"
              >
                <RotateCw size={17} />
                <span>Restart Device</span>
              </button>

              <button
                type="button"
                onClick={handleRunDiagnostics}
                className="w-full py-3 px-4 bg-white dark:bg-slate-900 border border-[#CBD5E1] dark:border-slate-700 hover:bg-[#F8FAFC] dark:hover:bg-slate-800 text-[#334155] dark:text-slate-200 font-bold text-xs tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer uppercase"
              >
                <Activity size={17} />
                <span>Run Diagnostics</span>
              </button>
            </div>
          </div>

          {/* Network Health Score Card */}
          <div className="bg-[#F8FAFC] dark:bg-slate-900/80 rounded-xl p-5 border border-[#E2E8F0] dark:border-slate-800 shadow-2xs flex flex-col gap-3">
            <span className="text-[10px] font-bold text-[#64748B] dark:text-slate-400 uppercase tracking-wider">
              Network Health Score
            </span>
            <div className="flex items-center gap-4">
              {/* Circular Ring Gauge */}
              <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-[#E2E8F0] dark:text-slate-800"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-[#10B981]"
                    strokeDasharray={`${healthScore}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute text-base font-extrabold text-[#0F172A] dark:text-slate-100">
                  {healthScore}
                </span>
              </div>

              <div>
                <h4 className="text-sm font-bold text-[#0F172A] dark:text-slate-100">
                  {healthScore >= 90 ? "Optimal Status" : healthScore >= 75 ? "Good Health" : "Degraded Status"}
                </h4>
                <p className="text-xs text-[#64748B] dark:text-slate-400 mt-0.5">
                  {criticalAlertsCount === 0
                    ? "No critical bottlenecks detected in last 24h."
                    : `${criticalAlertsCount} active critical alert(s) impacting score.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
