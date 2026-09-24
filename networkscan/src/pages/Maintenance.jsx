import { useState } from "react";
import {
  Wrench,
  Calendar,
  Clock,
  CheckCircle2,
  Play,
  RotateCw,
  Server,
  FileCheck,
  Terminal,
} from "lucide-react";
import { useApp } from "../context/useApp";
import Modal from "../components/ui/Modal";
import Drawer from "../components/ui/Drawer";
import Button from "../components/ui/Button";
import StatusBadge from "../components/ui/StatusBadge";

export default function MaintenancePage() {
  const {
    maintenanceTasks,
    maintenanceOverview,
    scheduleMaintenance,
    runMaintenanceTask,
    showToast,
  } = useApp();

  // Schedule Modal State
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [targetComponent, setTargetComponent] = useState("");
  const [executionSchedule, setExecutionSchedule] = useState("");

  // Log Viewer Drawer State
  const [selectedLogTask, setSelectedLogTask] = useState(null);
  const [isLogDrawerOpen, setIsLogDrawerOpen] = useState(false);

  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    if (!taskTitle.trim()) {
      showToast("Please enter a valid task title.", "error");
      return;
    }
    scheduleMaintenance({
      title: taskTitle.trim(),
      target: targetComponent.trim() || "All Active Nodes",
      schedule: executionSchedule.trim() || "Upcoming Window",
    });
    setTaskTitle("");
    setTargetComponent("");
    setExecutionSchedule("");
    setIsScheduleModalOpen(false);
  };

  const handleOpenLogs = (task) => {
    setSelectedLogTask(task);
    setIsLogDrawerOpen(true);
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 font-sans pb-12">
      {/* SCHEDULE TASK MODAL */}
      <Modal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        title="Schedule Maintenance Window"
        subtitle="Create a new automated task or scheduled node update."
      >
        <form onSubmit={handleScheduleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#0F172A] dark:text-slate-200 uppercase mb-1">
              Task / Event Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="e.g. Subnet Gateway Firmware Patch v4.4"
              className="w-full px-3.5 py-2.5 bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-xl text-xs text-[#0F172A] dark:text-slate-100 outline-none focus:border-[#0066FF]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0F172A] dark:text-slate-200 uppercase mb-1">
              Target Component / Device
            </label>
            <input
              type="text"
              value={targetComponent}
              onChange={(e) => setTargetComponent(e.target.value)}
              placeholder="e.g. Gateway Router Alpha (192.168.1.1)"
              className="w-full px-3.5 py-2.5 bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-xl text-xs text-[#0F172A] dark:text-slate-100 outline-none focus:border-[#0066FF]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0F172A] dark:text-slate-200 uppercase mb-1">
              Execution Schedule
            </label>
            <input
              type="text"
              value={executionSchedule}
              onChange={(e) => setExecutionSchedule(e.target.value)}
              placeholder="e.g. Oct 20, 2026 • 03:00 AM"
              className="w-full px-3.5 py-2.5 bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-xl text-xs text-[#0F172A] dark:text-slate-100 outline-none focus:border-[#0066FF]"
            />
          </div>

          <div className="pt-3 flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setIsScheduleModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Schedule Task
            </Button>
          </div>
        </form>
      </Modal>

      {/* LOG VIEWER DRAWER */}
      <Drawer
        isOpen={isLogDrawerOpen}
        onClose={() => setIsLogDrawerOpen(false)}
        title={selectedLogTask?.title || "Execution Log Console"}
        subtitle={`Task ID: ${selectedLogTask?.id} • Target: ${selectedLogTask?.target}`}
      >
        <div className="space-y-4 text-xs">
          <div className="flex items-center gap-2 text-[#0F172A] dark:text-slate-100 font-bold">
            <Terminal size={16} className="text-[#0066FF]" />
            <span>Simulated Diagnostic Terminal Output</span>
          </div>

          <div className="bg-[#0F172A] text-slate-200 p-4 rounded-xl font-mono text-[11px] leading-relaxed space-y-1.5 overflow-x-auto shadow-inner">
            <div className="text-slate-500">[04:00:00 UTC] --- INITIATING TASK EXECUTION ---</div>
            <div className="text-emerald-400">[04:00:01 UTC] Connecting to target node hardware interface... OK</div>
            <div className="text-blue-400">[04:00:02 UTC] Validating binary payload checksum... SHA-256 MATCH</div>
            <div>[04:00:03 UTC] Creating pre-update snapshot backup at /dev/storage/nas-01...</div>
            <div className="text-emerald-400">[04:00:04 UTC] Backup snapshot created (4.2 GB).</div>
            <div>[04:00:05 UTC] Applying update instructions to kernel storage...</div>
            <div className="text-amber-400">[04:00:07 UTC] Warm-rebooting daemon process...</div>
            <div className="text-emerald-400">[04:00:09 UTC] System heartbeat restored. 100% Diagnostic checks passed.</div>
            <div className="text-slate-500">[04:00:10 UTC] --- TASK COMPLETED SUCCESSFULLY ---</div>
          </div>

          <div className="p-3 bg-[#DCFCE7] text-[#15803D] rounded-xl text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 size={16} />
            <span>Execution status: Passed with 0 errors.</span>
          </div>
        </div>
      </Drawer>

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A] dark:text-slate-100 tracking-tight">
            System Maintenance & Jobs
          </h1>
          <p className="text-xs text-[#64748B] dark:text-slate-400 mt-1 font-normal max-w-[600px]">
            Schedule updates, run automated node diagnostics, and manage system backups.
          </p>
        </div>
        <Button
          variant="primary"
          iconLeft={Calendar}
          onClick={() => setIsScheduleModalOpen(true)}
        >
          Schedule Maintenance
        </Button>
      </div>

      {/* MAINTENANCE STATUS OVERVIEW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-[#E2E8F0] dark:border-slate-800 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-[#64748B] dark:text-slate-400 uppercase">
              Next Maintenance Window
            </span>
            <div className="p-2 bg-blue-50 dark:bg-blue-950/60 text-[#0066FF] rounded-lg">
              <Clock size={18} />
            </div>
          </div>
          <div className="text-xl font-bold text-[#0F172A] dark:text-slate-100 mb-1">
            {maintenanceOverview?.nextWindow || "Oct 14, 2026 • 02:00 AM"}
          </div>
          <p className="text-xs text-[#64748B] dark:text-slate-400">
            {maintenanceOverview?.nextWindowDesc || "Core router firmware upgrade & reboot cycle."}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-[#E2E8F0] dark:border-slate-800 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-[#64748B] dark:text-slate-400 uppercase">
              Automated Backup Job
            </span>
            <div className="p-2 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-lg">
              <FileCheck size={18} />
            </div>
          </div>
          <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">
            {maintenanceOverview?.backupStatus || "Completed (Daily)"}
          </div>
          <p className="text-xs text-[#64748B] dark:text-slate-400">
            {maintenanceOverview?.backupDesc || "Last successful snapshot: Today at 04:00 AM."}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-[#E2E8F0] dark:border-slate-800 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-[#64748B] dark:text-slate-400 uppercase">
              Node Diagnostic Health
            </span>
            <div className="p-2 bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 rounded-lg">
              <Server size={18} />
            </div>
          </div>
          <div className="text-xl font-bold text-[#0F172A] dark:text-slate-100 mb-1">
            {maintenanceOverview?.diagnosticPassed || "98.5% Passed"}
          </div>
          <p className="text-xs text-[#64748B] dark:text-slate-400">
            {maintenanceOverview?.diagnosticDesc || "All key subnet nodes passed diagnostic checks."}
          </p>
        </div>
      </div>

      {/* UPCOMING & RECENT JOBS TABLE */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-[#E2E8F0] dark:border-slate-800 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-[#E2E8F0] dark:border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-[#0F172A] dark:text-slate-100 text-base">
            Maintenance Schedule & Task Queue
          </h3>
          <Button
            variant="secondary"
            size="sm"
            iconLeft={RotateCw}
            onClick={() => showToast("Refreshed maintenance queue schedule.", "info")}
          >
            Refresh Schedule
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F8FAFC] dark:bg-slate-800/60 border-b border-[#E2E8F0] dark:border-slate-800 text-[#64748B] dark:text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-6">Task / Event Title</th>
                <th className="py-3.5 px-6">Target Component</th>
                <th className="py-3.5 px-6">Execution Schedule</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] dark:divide-slate-800">
              {maintenanceTasks.map((task) => (
                <tr key={task.id} className="hover:bg-[#F8FAFC] dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-[#0F172A] dark:text-slate-100">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${task.iconBg || "bg-blue-100 text-[#0066FF]"}`}>
                        {task.iconType === "wrench" && <Wrench size={16} />}
                        {task.iconType === "rotate" && <RotateCw size={16} />}
                        {task.iconType === "check" && <CheckCircle2 size={16} />}
                      </div>
                      <span>{task.title}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-[#475569] dark:text-slate-300 font-medium">
                    {task.target}
                  </td>
                  <td className="py-4 px-6 text-[#64748B] dark:text-slate-400">
                    {task.schedule}
                  </td>
                  <td className="py-4 px-6">
                    <StatusBadge status={task.statusVariant} label={task.status} />
                  </td>
                  <td className="py-4 px-6 text-right">
                    {task.canRunNow ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        iconLeft={Play}
                        onClick={() => runMaintenanceTask(task.id)}
                      >
                        Run Now
                      </Button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleOpenLogs(task)}
                        className="text-xs font-semibold text-[#64748B] hover:text-[#0066FF] dark:text-slate-400 dark:hover:text-slate-100 bg-transparent border-none cursor-pointer transition-colors"
                      >
                        View Logs
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
