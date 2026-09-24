export const initialHealthTrendData = [
  { day: "Oct 01", val: 35, lineVal: 38 },
  { day: "", val: 45, lineVal: 48 },
  { day: "", val: 55, lineVal: 56 },
  { day: "", val: 68, lineVal: 64 },
  { day: "", val: 75, lineVal: 71 },
  { day: "Oct 15", val: 88, lineVal: 79 },
  { day: "", val: 82, lineVal: 84 },
  { day: "", val: 95, lineVal: 89 },
  { day: "", val: 88, lineVal: 91 },
  { day: "", val: 92, lineVal: 92 },
  { day: "Oct 30", val: 98, lineVal: 95 },
];

export const initialMonthlyAlertsData = [
  { month: "July", critical: 38, warning: 22, info: 45 },
  { month: "Aug", critical: 24, warning: 18, info: 38 },
  { month: "Sept", critical: 52, warning: 28, info: 32 },
  { month: "Oct", critical: 18, warning: 12, info: 62 },
];

export const initialRecentActivity = [
  {
    id: "ACT-01",
    type: "DEVICE_CONNECTED",
    title: "Device SL-101 Connected",
    targetId: "SL-101",
    description: "San Francisco Node 04 is now back online after maintenance.",
    timestamp: "2m ago",
    badgeBg: "bg-[#DCFCE7]",
    iconType: "link",
    iconColor: "text-[#16A34A]",
  },
  {
    id: "ACT-02",
    type: "FIRMWARE_UPDATED",
    title: "Firmware Updated",
    description: "Batch 4 (24 devices) successfully updated to v2.4.12-rc.",
    timestamp: "45m ago",
    badgeBg: "bg-[#EFF6FF]",
    iconType: "download",
    iconColor: "text-[#0066FF]",
  },
  {
    id: "ACT-03",
    type: "ALERT_TRIGGERED",
    title: "Critical Alert Triggered",
    description: "High packet loss detected on Tokyo Backbone (TK-009).",
    timestamp: "1h ago",
    badgeBg: "bg-[#FEE2E2]",
    iconType: "alert",
    iconColor: "text-[#DC2626]",
  },
  {
    id: "ACT-04",
    type: "USER_LOGIN",
    title: "User Login",
    description: "Admin m_robertson accessed Network Configuration.",
    timestamp: "3h ago",
    badgeBg: "bg-[#F1F5F9]",
    iconType: "user",
    iconColor: "text-[#64748B]",
  },
];
