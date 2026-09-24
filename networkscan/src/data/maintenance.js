export const initialMaintenanceTasks = [
  {
    id: "TASK-101",
    title: "Core Router OS Update v4.3",
    iconType: "wrench",
    iconBg: "bg-blue-100 text-[#0066FF]",
    target: "Gateway Router Alpha (192.168.1.1)",
    schedule: "Oct 14, 2026 • 02:00 AM",
    status: "Scheduled",
    statusVariant: "warning",
    canRunNow: true,
  },
  {
    id: "TASK-102",
    title: "Automated Subnet Ping Diagnostic",
    iconType: "rotate",
    iconBg: "bg-purple-100 text-purple-600",
    target: "All Active Subnets (192.168.0.0/16)",
    schedule: "Every 6 Hours",
    status: "Recurring Active",
    statusVariant: "info",
    canRunNow: true,
  },
  {
    id: "TASK-103",
    title: "System Backup & Log Archival",
    iconType: "check",
    iconBg: "bg-emerald-100 text-emerald-600",
    target: "Storage NAS Cluster",
    schedule: "Today at 04:00 AM",
    status: "Passed (Completed)",
    statusVariant: "success",
    canRunNow: false,
  },
];

export const initialMaintenanceOverview = {
  nextWindow: "Oct 14, 2026 • 02:00 AM",
  nextWindowDesc: "Core router firmware upgrade & reboot cycle.",
  backupStatus: "Completed (Daily)",
  backupDesc: "Last successful snapshot: Today at 04:00 AM.",
  diagnosticPassed: "98.5% Passed",
  diagnosticDesc: "All key subnet nodes passed diagnostic checks.",
};
