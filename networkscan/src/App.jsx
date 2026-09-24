import { useState, useEffect } from "react";
import AppLayout from "./component/AppLayout";
import DashboardPage from "./pages/Dashboard";
import DevicesPage from "./pages/Devices";
import UserManagementPage from "./pages/UserManagement";
import AlertsPage from "./pages/Alerts";
import MaintenancePage from "./pages/Maintenance";
import ReportsPage from "./pages/Reports";
import SettingsPage from "./pages/Settings";

const TAB_HASH_MAP = {
  "#dashboard": "Dashboard",
  "#devices": "Devices",
  "#user-management": "User Management",
  "#alerts": "Alerts",
  "#maintenance": "Maintenance",
  "#reports": "Reports",
  "#settings": "Settings",
};

const TAB_TO_HASH = {
  Dashboard: "#dashboard",
  Devices: "#devices",
  "User Management": "#user-management",
  Alerts: "#alerts",
  Maintenance: "#maintenance",
  Reports: "#reports",
  Settings: "#settings",
};

function getTabFromHash() {
  const hash = window.location.hash.toLowerCase();
  return TAB_HASH_MAP[hash] || "Dashboard";
}

function App() {
  const [activeTab, setActiveTabState] = useState(getTabFromHash);

  useEffect(() => {
    const handleHashChange = () => {
      const tab = getTabFromHash();
      setActiveTabState(tab);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const setActiveTab = (newTab) => {
    setActiveTabState(newTab);
    const hash = TAB_TO_HASH[newTab] || "#dashboard";
    if (window.location.hash !== hash) {
      window.history.pushState(null, "", hash);
    }
  };

  const renderPage = () => {
    switch (activeTab) {
      case "Dashboard":
        return <DashboardPage />;
      case "Devices":
        return <DevicesPage />;
      case "User Management":
        return <UserManagementPage />;
      case "Alerts":
        return <AlertsPage />;
      case "Maintenance":
        return <MaintenancePage />;
      case "Reports":
        return <ReportsPage />;
      case "Settings":
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <AppLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderPage()}
    </AppLayout>
  );
}

export default App;
