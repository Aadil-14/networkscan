import { useState } from "react";
import {
  Lock,
  Key,
  Bell,
  Globe,
  Save,
  CheckCircle,
  Copy,
  RotateCcw,
  RefreshCw,
} from "lucide-react";
import { useApp } from "../context/useApp";

export default function SettingsPage() {
  const { settings, updateSettings, showToast } = useApp();
  const [activeSubTab, setActiveSubTab] = useState("General");
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Local form state initialized from context
  const [formData, setFormData] = useState(settings);

  const handleGeneralChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      general: {
        ...prev.general,
        [field]: value,
      },
    }));
  };

  const handleSecurityChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      security: {
        ...prev.security,
        [field]: value,
      },
    }));
  };

  const handleNotificationsChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [field]: value,
      },
    }));
  };

  const handleSave = () => {
    // Validation
    if (!formData.general.orgName.trim()) {
      setErrorMsg("Organization name cannot be empty.");
      return;
    }
    if (!formData.general.primarySubnet.trim()) {
      setErrorMsg("Primary Subnet address cannot be empty.");
      return;
    }

    setErrorMsg("");
    updateSettings("general", formData.general);
    updateSettings("security", formData.security);
    updateSettings("api", formData.api);
    updateSettings("notifications", formData.notifications);

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleReset = () => {
    setFormData(settings);
    setErrorMsg("");
    showToast("Form reset to saved settings.", "info");
  };

  const handleCopyApiKey = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(formData.api.productionApiKey);
    }
    showToast("API key copied to clipboard simulation.");
  };

  const handleRegenerateApiKey = () => {
    const newKey = `sk_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    setFormData((prev) => ({
      ...prev,
      api: {
        ...prev.api,
        productionApiKey: newKey,
      },
    }));
    showToast("New API key generated in preview. Click Save Changes to commit.");
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 font-sans pb-12">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A] dark:text-slate-100">
            System Settings & Configuration
          </h1>
          <p className="text-sm text-[#64748B] dark:text-slate-400 mt-1">
            Manage your network preferences, security policies, and integration API keys.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium text-sm rounded-xl transition-colors cursor-pointer border-none"
          >
            <RotateCcw size={16} />
            <span>Reset</span>
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#0066FF] hover:bg-blue-600 text-white font-medium text-sm rounded-xl shadow-sm transition-colors cursor-pointer border-none"
          >
            <Save size={18} />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 dark:bg-rose-950/40 dark:border-rose-900/60 dark:text-rose-300 rounded-xl text-sm font-medium">
          {errorMsg}
        </div>
      )}

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 dark:bg-emerald-950/40 dark:border-emerald-900/60 dark:text-emerald-300 rounded-xl text-sm font-medium flex items-center gap-2">
          <CheckCircle size={18} />
          <span>Settings saved successfully and persisted to browser storage!</span>
        </div>
      )}

      {/* NAVIGATION SUB-TABS */}
      <div className="flex items-center gap-2 border-b border-[#E2E8F0] dark:border-slate-800 pb-1 overflow-x-auto">
        {[
          { id: "General", label: "General Preferences", icon: Globe },
          { id: "Security", label: "Security & Auth", icon: Lock },
          { id: "API", label: "API Credentials", icon: Key },
          { id: "Notifications", label: "Alert Rules", icon: Bell },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 font-medium text-sm border-b-2 cursor-pointer transition-all bg-transparent whitespace-nowrap ${
                isActive
                  ? "border-[#0066FF] text-[#0066FF] font-semibold"
                  : "border-transparent text-[#64748B] dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-slate-200"
              }`}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SETTINGS CONTENT PANELS */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-[#E2E8F0] dark:border-slate-800 shadow-sm p-6 max-w-3xl">
        {activeSubTab === "General" && (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-[#0F172A] dark:text-slate-300 uppercase mb-2">
                Organization Name
              </label>
              <input
                type="text"
                value={formData.general.orgName}
                onChange={(e) => handleGeneralChange("orgName", e.target.value)}
                className="w-full px-4 py-2.5 bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-xl text-sm text-[#0F172A] dark:text-slate-100 outline-none focus:border-[#0066FF]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0F172A] dark:text-slate-300 uppercase mb-2">
                Primary Subnet Address
              </label>
              <input
                type="text"
                value={formData.general.primarySubnet}
                onChange={(e) => handleGeneralChange("primarySubnet", e.target.value)}
                className="w-full px-4 py-2.5 bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-xl text-sm text-[#0F172A] dark:text-slate-100 outline-none focus:border-[#0066FF] font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0F172A] dark:text-slate-300 uppercase mb-2">
                Default Scan Interval
              </label>
              <select
                value={formData.general.scanInterval}
                onChange={(e) => handleGeneralChange("scanInterval", e.target.value)}
                className="w-full px-4 py-2.5 bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-xl text-sm text-[#0F172A] dark:text-slate-100 outline-none focus:border-[#0066FF]"
              >
                <option value="Every 5 Minutes (Real-time)">Every 5 Minutes (Real-time)</option>
                <option value="Every 15 Minutes">Every 15 Minutes</option>
                <option value="Every 1 Hour">Every 1 Hour</option>
                <option value="Manual Trigger Only">Manual Trigger Only</option>
              </select>
            </div>
          </div>
        )}

        {activeSubTab === "Security" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-[#F8FAFC] dark:bg-slate-800/60 rounded-xl border border-[#E2E8F0] dark:border-slate-700">
              <div>
                <div className="font-semibold text-sm text-[#0F172A] dark:text-slate-100">
                  Two-Factor Authentication (2FA)
                </div>
                <div className="text-xs text-[#64748B] dark:text-slate-400 mt-0.5">
                  Enforce 2FA for all administrative accounts.
                </div>
              </div>
              <input
                type="checkbox"
                checked={formData.security.twoFactorAuth}
                onChange={(e) => handleSecurityChange("twoFactorAuth", e.target.checked)}
                className="w-5 h-5 accent-[#0066FF] cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-[#F8FAFC] dark:bg-slate-800/60 rounded-xl border border-[#E2E8F0] dark:border-slate-700">
              <div>
                <div className="font-semibold text-sm text-[#0F172A] dark:text-slate-100">
                  IP Whitelisting
                </div>
                <div className="text-xs text-[#64748B] dark:text-slate-400 mt-0.5">
                  Restrict admin portal login to trusted subnet IPs only.
                </div>
              </div>
              <input
                type="checkbox"
                checked={formData.security.ipWhitelisting}
                onChange={(e) => handleSecurityChange("ipWhitelisting", e.target.checked)}
                className="w-5 h-5 accent-[#0066FF] cursor-pointer"
              />
            </div>
          </div>
        )}

        {activeSubTab === "API" && (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-[#0F172A] dark:text-slate-300 uppercase mb-2">
                Production API Key (Frontend Simulation)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="password"
                  value={formData.api.productionApiKey}
                  readOnly
                  className="w-full px-4 py-2.5 bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-xl text-sm font-mono text-[#0F172A] dark:text-slate-100 outline-none"
                />
                <button
                  onClick={handleCopyApiKey}
                  className="flex items-center gap-1.5 px-4 py-2.5 bg-[#F1F5F9] dark:bg-slate-800 hover:bg-[#E2E8F0] dark:hover:bg-slate-700 text-[#0F172A] dark:text-slate-200 text-xs font-semibold rounded-xl border-none cursor-pointer transition-colors"
                >
                  <Copy size={14} />
                  <span>Copy</span>
                </button>
                <button
                  onClick={handleRegenerateApiKey}
                  className="flex items-center gap-1.5 px-4 py-2.5 bg-[#F1F5F9] dark:bg-slate-800 hover:bg-[#E2E8F0] dark:hover:bg-slate-700 text-[#0F172A] dark:text-slate-200 text-xs font-semibold rounded-xl border-none cursor-pointer transition-colors"
                >
                  <RefreshCw size={14} />
                  <span>Regenerate</span>
                </button>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                Note: This key is a local mock representation. No actual API requests are transmitted outside the client sandbox.
              </p>
            </div>
          </div>
        )}

        {activeSubTab === "Notifications" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-[#F8FAFC] dark:bg-slate-800/60 rounded-xl border border-[#E2E8F0] dark:border-slate-700">
              <div>
                <div className="font-semibold text-sm text-[#0F172A] dark:text-slate-100">
                  Critical Alert Email Dispatch
                </div>
                <div className="text-xs text-[#64748B] dark:text-slate-400 mt-0.5">
                  Send immediate email notifications for critical node outages.
                </div>
              </div>
              <input
                type="checkbox"
                checked={formData.notifications.criticalEmailDispatch}
                onChange={(e) =>
                  handleNotificationsChange("criticalEmailDispatch", e.target.checked)
                }
                className="w-5 h-5 accent-[#0066FF] cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-[#F8FAFC] dark:bg-slate-800/60 rounded-xl border border-[#E2E8F0] dark:border-slate-700">
              <div>
                <div className="font-semibold text-sm text-[#0F172A] dark:text-slate-100">
                  Slack / Webhook Notifications
                </div>
                <div className="text-xs text-[#64748B] dark:text-slate-400 mt-0.5">
                  Push events to configured Slack channel incoming webhook.
                </div>
              </div>
              <input
                type="checkbox"
                checked={formData.notifications.slackWebhook}
                onChange={(e) => handleNotificationsChange("slackWebhook", e.target.checked)}
                className="w-5 h-5 accent-[#0066FF] cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

