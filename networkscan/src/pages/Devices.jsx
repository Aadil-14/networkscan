import { useState, useMemo } from "react";
import {
  Filter,
  Plus,
  RotateCw,
  MoreVertical,
  Sun,
  Cloud,
  ChevronLeft,
  ChevronRight,
  Radio,
  Trash2,
  CheckCircle2,
} from "lucide-react";
import { useApp } from "../context/useApp";
import Modal from "../components/ui/Modal";
import Drawer from "../components/ui/Drawer";
import Button from "../components/ui/Button";
import StatusBadge from "../components/ui/StatusBadge";
import EmptyState from "../components/ui/EmptyState";
import DropdownMenu from "../components/ui/DropdownMenu";

export default function DevicesPage() {
  const {
    devices,
    addDevice,
    removeDevice,
    onlineDevicesCount,
    criticalAlertsCount,
    searchQuery,
    showToast,
  } = useApp();

  // Local UI State
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  // Selected Device for Drawer
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Modals
  const [isProvisionModalOpen, setIsProvisionModalOpen] = useState(false);
  const [isOptimizeModalOpen, setIsOptimizeModalOpen] = useState(false);
  const [showOptimizationBanner, setShowOptimizationBanner] = useState(true);

  // Form State
  const [newDeviceName, setNewDeviceName] = useState("");
  const [newDeviceIp, setNewDeviceIp] = useState("");
  const [newDeviceLocation, setNewDeviceLocation] = useState("");
  const [newDeviceStatus, setNewDeviceStatus] = useState("ONLINE");

  // Filtered Devices list
  const filteredDevices = useMemo(() => {
    return devices.filter((device) => {
      // Status filter
      if (statusFilter !== "ALL" && device.statusType?.toUpperCase() !== statusFilter) {
        return false;
      }
      // Text search query
      const query = searchQuery.trim().toLowerCase();
      if (!query) return true;
      return (
        device.id.toLowerCase().includes(query) ||
        device.name.toLowerCase().includes(query) ||
        (device.firmware && device.firmware.toLowerCase().includes(query)) ||
        (device.location && device.location.toLowerCase().includes(query)) ||
        (device.ipAddress && device.ipAddress.toLowerCase().includes(query))
      );
    });
  }, [devices, statusFilter, searchQuery]);

  // Pagination calculation
  const totalEntries = filteredDevices.length;
  const totalPages = Math.ceil(totalEntries / pageSize) || 1;
  const paginatedDevices = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredDevices.slice(start, start + pageSize);
  }, [filteredDevices, currentPage, pageSize]);

  const handleOpenDetails = (device) => {
    setSelectedDevice(device);
    setIsDrawerOpen(true);
  };

  const handleProvisionDevice = (e) => {
    e.preventDefault();
    if (!newDeviceName.trim()) {
      showToast("Please enter a valid node name.", "error");
      return;
    }
    addDevice({
      name: newDeviceName.trim(),
      ipAddress: newDeviceIp.trim() || "192.168.1.150",
      location: newDeviceLocation.trim() || "Global Inventory",
      status: newDeviceStatus,
      powerPercent: 92,
      charging: "Active",
      chargingIcon: "sun",
      chargingType: "solar",
      firmware: "v2.4.1-rc",
    });
    setNewDeviceName("");
    setNewDeviceIp("");
    setNewDeviceLocation("");
    setIsProvisionModalOpen(false);
  };

  const handleDeleteDevice = (deviceId) => {
    removeDevice(deviceId);
    if (selectedDevice?.id === deviceId) {
      setIsDrawerOpen(false);
      setSelectedDevice(null);
    }
  };

  const handleApplyOptimization = () => {
    showToast("Optimization sequence applied to 12 nodes.");
    setIsOptimizeModalOpen(false);
    setShowOptimizationBanner(false);
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 font-sans pb-12">
      {/* PROVISION DEVICE MODAL */}
      <Modal
        isOpen={isProvisionModalOpen}
        onClose={() => setIsProvisionModalOpen(false)}
        title="Provision Hardware Node"
        subtitle="Configure network parameters to add a device to the global registry."
      >
        <form onSubmit={handleProvisionDevice} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#0F172A] dark:text-slate-200 uppercase mb-1">
              Node Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={newDeviceName}
              onChange={(e) => setNewDeviceName(e.target.value)}
              placeholder="e.g. Outpost Charlie Hub"
              className="w-full px-3.5 py-2.5 bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-xl text-xs text-[#0F172A] dark:text-slate-100 outline-none focus:border-[#0066FF]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0F172A] dark:text-slate-200 uppercase mb-1">
              IP Address
            </label>
            <input
              type="text"
              value={newDeviceIp}
              onChange={(e) => setNewDeviceIp(e.target.value)}
              placeholder="e.g. 192.168.1.150"
              className="w-full px-3.5 py-2.5 bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-xl text-xs font-mono text-[#0F172A] dark:text-slate-100 outline-none focus:border-[#0066FF]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0F172A] dark:text-slate-200 uppercase mb-1">
              Location / Region
            </label>
            <input
              type="text"
              value={newDeviceLocation}
              onChange={(e) => setNewDeviceLocation(e.target.value)}
              placeholder="e.g. Seattle Port Terminal"
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
              <option value="ONLINE">ONLINE</option>
              <option value="WARNING">WARNING</option>
              <option value="OFFLINE">OFFLINE</option>
            </select>
          </div>

          <div className="pt-3 flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setIsProvisionModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Provision Device
            </Button>
          </div>
        </form>
      </Modal>

      {/* OPTIMIZATION MODAL */}
      <Modal
        isOpen={isOptimizeModalOpen}
        onClose={() => setIsOptimizeModalOpen(false)}
        title="Apply Frequency Hop Optimization"
        subtitle="AI engine recommendation for 12 interference-prone nodes."
        confirmText="Apply Optimization"
        onConfirm={handleApplyOptimization}
      >
        <div className="space-y-3 text-xs text-[#475569] dark:text-slate-300">
          <p>
            Re-tuning radio channels across Sector 4 will reduce packet retries by an estimated 18%.
          </p>
          <div className="p-3 bg-[#EFF6FF] dark:bg-blue-950/50 rounded-xl border border-[#BFDBFE] dark:border-blue-800 font-mono text-[11px] text-[#0066FF]">
            Target Nodes: SL-NX-901, SL-NX-905, SL-NX-912 (+9 others)
          </div>
        </div>
      </Modal>

      {/* DEVICE DETAILS DRAWER */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={selectedDevice?.name || "Node Telemetry"}
        subtitle={`Hardware ID: ${selectedDevice?.id}`}
      >
        {selectedDevice && (
          <div className="space-y-6 text-xs text-[#0F172A] dark:text-slate-100">
            {/* Status & Signal Header */}
            <div className="flex items-center justify-between p-4 bg-[#F8FAFC] dark:bg-slate-800/80 rounded-2xl border border-[#E2E8F0] dark:border-slate-700">
              <div>
                <span className="text-[10px] font-bold text-[#64748B] uppercase block mb-1">
                  Live Status
                </span>
                <StatusBadge status={selectedDevice.statusType} label={selectedDevice.status} size="lg" />
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-[#64748B] uppercase block mb-1">
                  Firmware Version
                </span>
                <span className="font-mono font-bold text-[#0066FF]">
                  {selectedDevice.firmware}
                </span>
              </div>
            </div>

            {/* Telemetry Grid */}
            <div className="space-y-3 divide-y divide-[#E2E8F0] dark:divide-slate-800">
              <div className="flex justify-between pt-2">
                <span className="text-[#64748B]">IP Address:</span>
                <span className="font-mono font-semibold">{selectedDevice.ipAddress || "192.168.1.101"}</span>
              </div>
              <div className="flex justify-between pt-3">
                <span className="text-[#64748B]">Location:</span>
                <span className="font-semibold">{selectedDevice.location || "Primary Subnet"}</span>
              </div>
              <div className="flex justify-between pt-3">
                <span className="text-[#64748B]">Power Level:</span>
                <span className={`font-bold ${selectedDevice.powerLow ? "text-[#DC2626]" : "text-[#16A34A]"}`}>
                  {selectedDevice.power}
                </span>
              </div>
              <div className="flex justify-between pt-3">
                <span className="text-[#64748B]">Solar Charging:</span>
                <span className="font-semibold">{selectedDevice.charging} ({selectedDevice.chargingType || "solar"})</span>
              </div>
              <div className="flex justify-between pt-3">
                <span className="text-[#64748B]">Last Heartbeat:</span>
                <span className="text-[#64748B]">{selectedDevice.lastSync}</span>
              </div>
            </div>

            {/* Drawer Actions */}
            <div className="pt-6 border-t border-[#E2E8F0] dark:border-slate-800 space-y-3">
              <Button
                variant="outline"
                fullWidth
                iconLeft={Radio}
                onClick={() => showToast(`Ping test initiated for ${selectedDevice.id}...`, "info")}
              >
                Send Ping Test
              </Button>

              <Button
                variant="danger"
                fullWidth
                iconLeft={Trash2}
                onClick={() => handleDeleteDevice(selectedDevice.id)}
              >
                Decommission Device
              </Button>
            </div>
          </div>
        )}
      </Drawer>

      {/* BREADCRUMB & HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-[10px] font-extrabold text-[#94A3B8] tracking-widest uppercase mb-1">
            NETWORK / DEVICES MANAGEMENT
          </div>
          <h1 className="text-2xl font-bold text-[#0F172A] dark:text-slate-100 tracking-tight">
            Devices Management
          </h1>
          <p className="text-xs text-[#64748B] dark:text-slate-400 mt-1 font-normal">
            Monitor and configure {devices.length} active hardware nodes across the global infrastructure.
          </p>
        </div>

        <div className="flex items-center gap-3 relative">
          {/* FILTER DROPDOWN */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className={`flex items-center gap-2 px-4 py-2.5 border rounded-xl shadow-2xs text-xs font-semibold cursor-pointer transition-colors ${
                statusFilter !== "ALL"
                  ? "bg-[#EFF6FF] border-[#0066FF] text-[#0066FF]"
                  : "bg-white dark:bg-slate-900 border-[#CBD5E1] dark:border-slate-700 text-[#334155] dark:text-slate-200 hover:bg-[#F8FAFC]"
              }`}
            >
              <Filter size={15} />
              <span>{statusFilter === "ALL" ? "Filter" : `Status: ${statusFilter}`}</span>
            </button>

            {showFilterDropdown && (
              <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 rounded-xl shadow-lg z-30 py-1.5 animate-in fade-in zoom-in-95 duration-100">
                {["ALL", "ONLINE", "WARNING", "OFFLINE"].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => {
                      setStatusFilter(st);
                      setCurrentPage(1);
                      setShowFilterDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs font-semibold cursor-pointer border-none transition-colors ${
                      statusFilter === st
                        ? "bg-[#EFF6FF] text-[#0066FF]"
                        : "text-[#334155] dark:text-slate-300 hover:bg-[#F8FAFC] dark:hover:bg-slate-800"
                    }`}
                  >
                    {st === "ALL" ? "All Devices" : `${st} Only`}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsProvisionModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all cursor-pointer border-none"
          >
            <Plus size={16} />
            <span>Provision Device</span>
          </button>
        </div>
      </div>

      {/* 4 SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Devices */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-[#E2E8F0] dark:border-slate-800 shadow-2xs flex flex-col justify-between">
          <span className="text-[10px] font-bold text-[#64748B] dark:text-slate-400 uppercase tracking-wider">
            TOTAL DEVICES
          </span>
          <div className="flex items-baseline justify-between mt-3">
            <span className="text-3xl font-extrabold text-[#0F172A] dark:text-slate-100 tracking-tight">
              {devices.length}
            </span>
            <span className="px-2 py-0.5 bg-[#EFF6FF] text-[#0066FF] text-[10px] font-bold rounded-md">
              +12% vs LW
            </span>
          </div>
        </div>

        {/* Active Nodes */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-[#E2E8F0] dark:border-slate-800 shadow-2xs flex flex-col justify-between">
          <span className="text-[10px] font-bold text-[#64748B] dark:text-slate-400 uppercase tracking-wider">
            ACTIVE NODES
          </span>
          <div className="flex items-baseline justify-between mt-3">
            <span className="text-3xl font-extrabold text-[#0F172A] dark:text-slate-100 tracking-tight">
              {onlineDevicesCount}
            </span>
            <StatusBadge status="ONLINE" />
          </div>
        </div>

        {/* Critical Alerts */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-[#E2E8F0] dark:border-slate-800 shadow-2xs flex flex-col justify-between">
          <span className="text-[10px] font-bold text-[#64748B] dark:text-slate-400 uppercase tracking-wider">
            CRITICAL ALERTS
          </span>
          <div className="flex items-baseline justify-between mt-3">
            <span className="text-3xl font-extrabold text-[#0F172A] dark:text-slate-100 tracking-tight">
              {String(criticalAlertsCount).padStart(2, "0")}
            </span>
            <span className="px-2 py-0.5 bg-[#FEE2E2] text-[#DC2626] text-[10px] font-bold rounded-md uppercase">
              Action Required
            </span>
          </div>
        </div>

        {/* Solar Avg Efficiency */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-[#E2E8F0] dark:border-slate-800 shadow-2xs flex flex-col justify-between">
          <span className="text-[10px] font-bold text-[#64748B] dark:text-slate-400 uppercase tracking-wider">
            SOLAR AVG EFFICIENCY
          </span>
          <div className="flex items-baseline justify-between mt-3">
            <span className="text-3xl font-extrabold text-[#0F172A] dark:text-slate-100 tracking-tight">
              94.2%
            </span>
            <Sun size={20} className="text-[#D97706]" />
          </div>
        </div>
      </div>

      {/* NODE REGISTRY TABLE */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-[#E2E8F0] dark:border-slate-800 shadow-2xs overflow-hidden">
        {/* TABLE HEADER BAR */}
        <div className="p-5 border-b border-[#E2E8F0] dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="text-base font-bold text-[#0F172A] dark:text-slate-100">
              Node Registry
            </h3>
            {searchQuery && (
              <span className="text-xs text-[#64748B] bg-[#F1F5F9] dark:bg-slate-800 px-2.5 py-1 rounded-md">
                Query: "{searchQuery}" ({filteredDevices.length} matches)
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-[#64748B]">
            <button
              type="button"
              onClick={() => showToast("Refreshed node telemetry.", "info")}
              className="p-1.5 hover:bg-[#F1F5F9] dark:hover:bg-slate-800 rounded-lg border-none bg-transparent cursor-pointer transition-colors"
              title="Refresh Table"
            >
              <RotateCw size={16} />
            </button>
            <DropdownMenu
              trigger={
                <button
                  type="button"
                  className="p-1.5 hover:bg-[#F1F5F9] dark:hover:bg-slate-800 rounded-lg border-none bg-transparent cursor-pointer transition-colors"
                >
                  <MoreVertical size={16} />
                </button>
              }
              items={[
                { label: "Export Table View", icon: CheckCircle2, onClick: () => showToast("Exported node registry dataset.") },
                { label: "Clear Filters", onClick: () => { setStatusFilter("ALL"); setCurrentPage(1); } },
              ]}
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          {paginatedDevices.length > 0 ? (
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#F8FAFC] dark:bg-slate-800/60 border-b border-[#E2E8F0] dark:border-slate-800 text-[#64748B] dark:text-slate-400 font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-6">DEVICE ID</th>
                  <th className="py-3.5 px-6">DEVICE NAME</th>
                  <th className="py-3.5 px-6">STATUS</th>
                  <th className="py-3.5 px-6">SIGNAL</th>
                  <th className="py-3.5 px-6">POWER</th>
                  <th className="py-3.5 px-6">CHARGING</th>
                  <th className="py-3.5 px-6">LAST SYNC</th>
                  <th className="py-3.5 px-6">FIRMWARE</th>
                  <th className="py-3.5 px-6 text-center">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] dark:divide-slate-800">
                {paginatedDevices.map((row) => (
                  <tr key={row.id} className="hover:bg-[#F8FAFC] dark:hover:bg-slate-800/50 transition-colors">
                    <td
                      onClick={() => handleOpenDetails(row)}
                      className="py-4 px-6 font-semibold text-[#0066FF] cursor-pointer hover:underline"
                    >
                      {row.id}
                    </td>
                    <td className="py-4 px-6 font-bold text-[#0F172A] dark:text-slate-100 max-w-[160px]">
                      {row.name}
                    </td>
                    <td className="py-4 px-6">
                      <StatusBadge status={row.statusType} label={row.status} />
                    </td>
                    <td className="py-4 px-6">
                      {row.signal === "strong" && (
                        <div className="flex items-end gap-0.5 h-4 text-[#16A34A]">
                          <span className="w-1 h-1.5 bg-current rounded-xs"></span>
                          <span className="w-1 h-2.5 bg-current rounded-xs"></span>
                          <span className="w-1 h-3.5 bg-current rounded-xs"></span>
                          <span className="w-1 h-4 bg-current rounded-xs"></span>
                        </div>
                      )}
                      {row.signal === "medium" && (
                        <div className="flex items-end gap-0.5 h-4 text-[#16A34A]">
                          <span className="w-1 h-1.5 bg-current rounded-xs"></span>
                          <span className="w-1 h-2.5 bg-current rounded-xs"></span>
                          <span className="w-1 h-3.5 bg-current rounded-xs"></span>
                          <span className="w-1 h-4 bg-[#CBD5E1] rounded-xs"></span>
                        </div>
                      )}
                      {row.signal === "low" && (
                        <div className="flex items-end gap-0.5 h-4 text-[#D97706]">
                          <span className="w-1 h-1.5 bg-current rounded-xs"></span>
                          <span className="w-1 h-2.5 bg-current rounded-xs"></span>
                          <span className="w-1 h-3.5 bg-[#CBD5E1] rounded-xs"></span>
                          <span className="w-1 h-4 bg-[#CBD5E1] rounded-xs"></span>
                        </div>
                      )}
                      {row.signal === "none" && (
                        <div className="flex items-end gap-0.5 h-4 text-[#CBD5E1]">
                          <span className="w-1 h-1.5 bg-current rounded-xs"></span>
                          <span className="w-1 h-2.5 bg-current rounded-xs"></span>
                          <span className="w-1 h-3.5 bg-current rounded-xs"></span>
                          <span className="w-1 h-4 bg-current rounded-xs"></span>
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className={`font-bold text-xs ${row.powerLow ? "text-[#DC2626]" : "text-[#0F172A] dark:text-slate-100"}`}>
                          {row.power}
                        </span>
                        <div className="w-6 h-3 border border-[#94A3B8] rounded-xs p-0.5 flex items-center mt-0.5">
                          <div className={`h-full rounded-2xs ${row.powerLow ? "bg-[#DC2626] w-1/4" : "bg-[#0066FF] w-3/4"}`}></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-[#334155] dark:text-slate-300 font-medium">
                      <div className="flex items-center gap-1.5">
                        {row.chargingIcon === "sun" ? (
                          <Sun size={14} className="text-[#D97706]" />
                        ) : (
                          <Cloud size={14} className="text-[#64748B]" />
                        )}
                        <span>{row.charging}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-[#64748B] dark:text-slate-400">
                      {row.lastSync}
                    </td>
                    <td className="py-4 px-6 text-[#475569] dark:text-slate-300 font-mono">
                      {row.firmware}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button
                        type="button"
                        onClick={() => handleOpenDetails(row)}
                        className="px-3 py-1.5 bg-[#EFF6FF] hover:bg-[#DBEAFE] dark:bg-blue-950/60 text-[#0066FF] font-semibold rounded-lg text-xs transition-colors border-none cursor-pointer"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <EmptyState
              title="No devices match your search or filter"
              description="Try adjusting your status filter or clearing your search term."
              actionLabel="Reset Filters"
              onAction={() => {
                setStatusFilter("ALL");
                setCurrentPage(1);
              }}
              className="border-none rounded-none py-12"
            />
          )}
        </div>

        {/* PAGINATION FOOTER */}
        {totalEntries > 0 && (
          <div className="p-4 border-t border-[#E2E8F0] dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B] dark:text-slate-400">
            <span>
              Showing {Math.min((currentPage - 1) * pageSize + 1, totalEntries)} to{" "}
              {Math.min(currentPage * pageSize, totalEntries)} of {totalEntries} entries
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="p-1.5 rounded-lg border border-[#CBD5E1] dark:border-slate-700 bg-white dark:bg-slate-800 text-[#334155] dark:text-slate-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                return (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 rounded-lg font-semibold cursor-pointer border-none transition-all ${
                      currentPage === pageNum
                        ? "bg-[#0066FF] text-white font-bold"
                        : "bg-white dark:bg-slate-800 border border-[#CBD5E1] dark:border-slate-700 hover:bg-[#F1F5F9] dark:hover:bg-slate-700 text-[#334155] dark:text-slate-200"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="p-1.5 rounded-lg border border-[#CBD5E1] dark:border-slate-700 bg-white dark:bg-slate-800 text-[#334155] dark:text-slate-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* BOTTOM SECTION (2 COLS) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Firmware Distribution (6 Cols) */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-xl p-6 border border-[#E2E8F0] dark:border-slate-800 shadow-2xs">
          <h3 className="text-base font-bold text-[#0F172A] dark:text-slate-100 mb-6">
            Firmware Distribution
          </h3>
          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-semibold text-[#0F172A] dark:text-slate-200">v2.4.1 (Stable)</span>
                <span className="text-[#64748B] dark:text-slate-400">182 Devices</span>
              </div>
              <div className="h-2 w-full bg-[#F1F5F9] dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-[#0066FF] w-[73%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-semibold text-[#0F172A] dark:text-slate-200">v2.4.0 (Legacy)</span>
                <span className="text-[#64748B] dark:text-slate-400">62 Devices</span>
              </div>
              <div className="h-2 w-full bg-[#F1F5F9] dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-[#93C5FD] w-[25%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-semibold text-[#0F172A] dark:text-slate-200">v2.3.9 (Deprecated)</span>
                <span className="text-[#64748B] dark:text-slate-400">4 Devices</span>
              </div>
              <div className="h-2 w-full bg-[#F1F5F9] dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-[#F87171] w-[4%]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Automated Optimization (6 Cols) */}
        {showOptimizationBanner && (
          <div className="lg:col-span-6 bg-gradient-to-br from-[#0052CC] to-[#0066FF] rounded-xl p-6 text-white shadow-md relative overflow-hidden flex flex-col justify-between">
            <div className="relative z-10 space-y-3">
              <h3 className="text-lg font-bold">
                Automated Optimization
              </h3>
              <p className="text-xs text-[#DBEAFE] leading-relaxed max-w-[440px]">
                The SkyLink AI engine has identified 12 nodes that could benefit from a frequency hop to reduce interference. Schedule update?
              </p>
            </div>
            <div className="flex items-center gap-3 mt-6 relative z-10">
              <button
                type="button"
                onClick={() => setIsOptimizeModalOpen(true)}
                className="px-5 py-2.5 bg-white text-[#0066FF] font-bold text-xs rounded-xl shadow-sm hover:bg-[#F8FAFC] transition-colors border-none cursor-pointer"
              >
                Review & Apply
              </button>
              <button
                type="button"
                onClick={() => setShowOptimizationBanner(false)}
                className="px-5 py-2.5 bg-transparent border border-white/40 text-white font-semibold text-xs rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
