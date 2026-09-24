export const initialAlerts = [
  {
    id: "AX-9942",
    severity: "CRITICAL",
    title: "Device Offline (SL-204)",
    deviceId: "SL-NX-204",
    description:
      "Heartbeat lost for Core Router SL-204 in the North-East Quadrant. Downstream connectivity for 42 devices has been interrupted.",
    timestamp: "2 mins ago",
    relativeTime: "2 mins ago",
    isResolved: false,
  },
  {
    id: "AX-9938",
    severity: "WARNING",
    title: "Low Battery (SL-105)",
    deviceId: "SL-NX-105",
    description:
      "Node SL-105 reporting 12% battery capacity. Solar charging efficiency is below threshold due to overcast conditions.",
    timestamp: "15 mins ago",
    relativeTime: "15 mins ago",
    isResolved: false,
  },
  {
    id: "AX-9921",
    severity: "INFO",
    title: "Firmware Update Available",
    deviceId: "GLOBAL",
    description:
      "Version 4.2.1-Stable is now available for the SL-series endpoints. Includes security patches for localized mesh networks.",
    timestamp: "1 hour ago",
    relativeTime: "1 hour ago",
    isResolved: false,
  },
  {
    id: "AX-9915",
    severity: "CRITICAL",
    title: "High Packet Loss (TK-009)",
    deviceId: "TK-009",
    description:
      "Packet loss exceeding 35% on Tokyo Backbone link. Network Guard auto-routing protocol deployed.",
    timestamp: "2 hours ago",
    relativeTime: "2 hours ago",
    isResolved: false,
  },
  {
    id: "AX-9890",
    severity: "WARNING",
    title: "High Temperature (Basin Relay)",
    deviceId: "SL-NX-882",
    description:
      "Internal thermal sensor reached 78°C on Basin Relay 02 enclosure.",
    timestamp: "5 hours ago",
    relativeTime: "5 hours ago",
    isResolved: false,
  },
  {
    id: "AX-9850",
    severity: "INFO",
    title: "Automated Diagnostic Complete",
    deviceId: "GLOBAL",
    description:
      "Subnet 192.168.1.0/24 ping diagnostic completed with 99.8% pass rate.",
    timestamp: "8 hours ago",
    relativeTime: "8 hours ago",
    isResolved: true,
    resolvedAt: "7 hours ago",
  },
];
