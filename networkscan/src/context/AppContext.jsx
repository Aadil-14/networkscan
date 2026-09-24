import { useState, useEffect } from "react";
import { AppContext } from "./AppContextObject";
import {
  initialCurrentUser,
  initialDevices,
  initialAlerts,
  initialUsers,
  initialMaintenanceTasks,
  initialMaintenanceOverview,
  initialHealthTrendData,
  initialMonthlyAlertsData,
  initialRecentActivity,
  initialBandwidthData,
  initialReportSummary,
  initialSettings,
} from "../data";

const STORAGE_KEY = "skylink_app_state_v1";

function loadSavedState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (err) {
    console.error("Failed to load state from localStorage:", err);
  }
  return null;
}

function getInitialDarkMode(savedState) {
  if (savedState && typeof savedState.darkMode === "boolean") {
    return savedState.darkMode;
  }
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  return false;
}

export function AppProvider({ children }) {
  const savedState = loadSavedState();

  // State Domains
  const [currentUser] = useState(savedState?.currentUser || initialCurrentUser);
  const [devices, setDevices] = useState(savedState?.devices || initialDevices);
  const [alerts, setAlerts] = useState(savedState?.alerts || initialAlerts);
  const [users, setUsers] = useState(savedState?.users || initialUsers);
  const [maintenanceTasks, setMaintenanceTasks] = useState(
    savedState?.maintenanceTasks || initialMaintenanceTasks
  );
  const [maintenanceOverview] = useState(
    savedState?.maintenanceOverview || initialMaintenanceOverview
  );
  const [healthTrendData] = useState(
    savedState?.healthTrendData || initialHealthTrendData
  );
  const [monthlyAlertsData] = useState(
    savedState?.monthlyAlertsData || initialMonthlyAlertsData
  );
  const [recentActivity, setRecentActivity] = useState(
    savedState?.recentActivity || initialRecentActivity
  );
  const [bandwidthData] = useState(
    savedState?.bandwidthData || initialBandwidthData
  );
  const [reportSummary] = useState(
    savedState?.reportSummary || initialReportSummary
  );
  const [settings, setSettings] = useState(
    savedState?.settings || initialSettings
  );

  // Global UI State
  const [searchQuery, setSearchQuery] = useState("");
  const [hasManualPreference, setHasManualPreference] = useState(
    () => savedState && typeof savedState.darkMode === "boolean"
  );
  const [darkMode, setDarkModeState] = useState(() => getInitialDarkMode(savedState));
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null); // { message: string, type: string }

  const setDarkMode = (valOrFn) => {
    setHasManualPreference(true);
    setDarkModeState((prev) => (typeof valOrFn === "function" ? valOrFn(prev) : valOrFn));
  };

  // Listen to system theme changes when no manual preference is saved
  useEffect(() => {
    if (hasManualPreference || typeof window === "undefined" || !window.matchMedia) {
      return;
    }
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = (e) => {
      setDarkModeState(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleSystemThemeChange);
      return () => mediaQuery.removeEventListener("change", handleSystemThemeChange);
    }
  }, [hasManualPreference]);

  // Persist state to localStorage on changes
  useEffect(() => {
    try {
      const stateToSave = {
        currentUser,
        devices,
        alerts,
        users,
        maintenanceTasks,
        maintenanceOverview,
        healthTrendData,
        monthlyAlertsData,
        recentActivity,
        bandwidthData,
        reportSummary,
        settings,
        darkMode: hasManualPreference ? darkMode : undefined,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (err) {
      console.error("Failed to persist state to localStorage:", err);
    }
  }, [
    currentUser,
    devices,
    alerts,
    users,
    maintenanceTasks,
    maintenanceOverview,
    healthTrendData,
    monthlyAlertsData,
    recentActivity,
    bandwidthData,
    reportSummary,
    settings,
    darkMode,
    hasManualPreference,
  ]);

  // Dark Mode side effect for root DOM class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Toast Helper
  const showToast = (message, type = "success") => {
    setToastMessage({ message, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Helper to log recent activity
  const addActivity = (title, description, iconType = "info", badgeBg = "bg-[#EFF6FF]", iconColor = "text-[#0066FF]") => {
    const newLog = {
      id: `ACT-${Date.now()}`,
      title,
      description,
      timestamp: "Just now",
      iconType,
      badgeBg,
      iconColor,
    };
    setRecentActivity((prev) => [newLog, ...prev]);
  };

  // Device Actions
  const addDevice = (deviceData) => {
    const newDevice = {
      id: deviceData.id || `SL-NX-${Math.floor(100 + Math.random() * 900)}`,
      name: deviceData.name || "New Provisioned Node",
      status: deviceData.status || "ONLINE",
      statusType: (deviceData.status || "ONLINE").toLowerCase(),
      signal: deviceData.signal || "strong",
      power: `${deviceData.powerPercent || 90}%`,
      powerPercent: deviceData.powerPercent || 90,
      charging: deviceData.charging || "Active",
      chargingIcon: deviceData.chargingIcon || "sun",
      chargingType: deviceData.chargingType || "solar",
      lastSync: "Just now",
      firmware: deviceData.firmware || "v2.4.1-rc",
      ipAddress: deviceData.ipAddress || "192.168.1.200",
      location: deviceData.location || "Global Node Registry",
    };
    setDevices((prev) => [newDevice, ...prev]);
    addActivity(
      `Device ${newDevice.id} Provisioned`,
      `${newDevice.name} added to ${newDevice.location}.`,
      "link",
      "bg-[#DCFCE7]",
      "text-[#16A34A]"
    );
    showToast(`Device ${newDevice.name} provisioned successfully.`);
  };

  const removeDevice = (deviceId) => {
    setDevices((prev) => prev.filter((d) => d.id !== deviceId));
    addActivity("Device Removed", `Device ID ${deviceId} was decommissioned.`, "alert", "bg-[#FEE2E2]", "text-[#DC2626]");
    showToast(`Device ${deviceId} removed.`, "info");
  };

  // Alert Actions
  const resolveAlert = (alertId) => {
    setAlerts((prev) =>
      prev.map((a) =>
        a.id === alertId ? { ...a, isResolved: true, resolvedAt: "Just now" } : a
      )
    );
    addActivity("Alert Resolved", `Incident #${alertId} marked as resolved.`, "check", "bg-[#DCFCE7]", "text-[#16A34A]");
    showToast(`Alert #${alertId} resolved.`);
  };

  const dismissAlert = (alertId) => {
    setAlerts((prev) => prev.filter((a) => a.id !== alertId));
    showToast(`Alert #${alertId} dismissed.`, "info");
  };

  // User Actions
  const addUser = (userData) => {
    const newUser = {
      id: `U-${Date.now().toString().slice(-4)}`,
      initials: userData.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2),
      avatarBg: "bg-[#DBEAFE] text-[#1E40AF]",
      name: userData.name,
      email: userData.email,
      role: userData.role || "TECHNICIAN",
      roleBg: userData.role === "ADMIN" || userData.role === "SUPER ADMIN" ? "bg-[#DBEAFE] text-[#1E40AF]" : "bg-[#F1F5F9] text-[#475569]",
      assignedDevice: userData.assignedDevice || "—",
      status: "Active",
      statusType: "active",
      lastLogin: "Never",
    };
    setUsers((prev) => [newUser, ...prev]);
    addActivity("User Created", `New account created for ${newUser.name}.`, "user", "bg-[#F1F5F9]", "text-[#64748B]");
    showToast(`User ${newUser.name} created successfully.`);
  };

  const deleteUser = (userId) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
    showToast(`User removed from directory.`, "info");
  };

  // Maintenance Actions
  const scheduleMaintenance = (taskData) => {
    const newTask = {
      id: `TASK-${Date.now().toString().slice(-3)}`,
      title: taskData.title || "Scheduled System Task",
      iconType: "wrench",
      iconBg: "bg-blue-100 text-[#0066FF]",
      target: taskData.target || "All Active Nodes",
      schedule: taskData.schedule || "Upcoming Window",
      status: "Scheduled",
      statusVariant: "warning",
      canRunNow: true,
    };
    setMaintenanceTasks((prev) => [newTask, ...prev]);
    showToast(`Maintenance task scheduled.`);
  };

  const runMaintenanceTask = (taskId) => {
    setMaintenanceTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, status: "Passed (Completed)", statusVariant: "success", canRunNow: false } : t
      )
    );
    addActivity("Maintenance Task Run", `Task #${taskId} executed successfully.`, "check", "bg-[#DCFCE7]", "text-[#16A34A]");
    showToast(`Task #${taskId} completed successfully.`);
  };

  // Settings Actions
  const updateSettings = (section, updates) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...updates,
      },
    }));
    showToast("Settings updated successfully.");
  };

  // Derived Metrics
  const onlineDevicesCount = devices.filter((d) => d.statusType === "online").length;
  const offlineDevicesCount = devices.filter((d) => d.statusType === "offline").length;
  const warningDevicesCount = devices.filter((d) => d.statusType === "warning").length;
  const activeAlerts = alerts.filter((a) => !a.isResolved);
  const criticalAlertsCount = activeAlerts.filter((a) => a.severity === "CRITICAL").length;
  const warningAlertsCount = activeAlerts.filter((a) => a.severity === "WARNING").length;

  return (
    <AppContext.Provider
      value={{
        currentUser,
        devices,
        addDevice,
        removeDevice,
        onlineDevicesCount,
        offlineDevicesCount,
        warningDevicesCount,
        alerts,
        activeAlerts,
        criticalAlertsCount,
        warningAlertsCount,
        resolveAlert,
        dismissAlert,
        users,
        addUser,
        deleteUser,
        maintenanceTasks,
        maintenanceOverview,
        scheduleMaintenance,
        runMaintenanceTask,
        healthTrendData,
        monthlyAlertsData,
        recentActivity,
        bandwidthData,
        reportSummary,
        settings,
        updateSettings,
        searchQuery,
        setSearchQuery,
        darkMode,
        setDarkMode,
        isNotificationOpen,
        setIsNotificationOpen,
        toastMessage,
        setToastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

