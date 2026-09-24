import {
  LayoutDashboard,
  Server,
  Users,
  Bell,
  Wrench,
  FileText,
  Settings,
  LogOut,
  Wifi,
} from "lucide-react";

export default function Sidebar({ activeTab = "Dashboard", setActiveTab }) {
  const navItems = [
    { id: "Dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "Devices", label: "Devices", icon: Server },
    { id: "User Management", label: "User Management", icon: Users },
    { id: "Alerts", label: "Alerts", icon: Bell },
    { id: "Maintenance", label: "Maintenance", icon: Wrench },
    { id: "Reports", label: "Reports", icon: FileText },
    { id: "Settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="h-full flex flex-col justify-between select-none">
      <div>
        {/* BRAND HEADER */}
        <div className="flex items-center gap-3 px-2 py-3 mb-6">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm shrink-0">
            <Wifi size={22} className="text-[#0066FF] stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold text-white leading-tight tracking-tight font-sans">
              SkyLink
            </span>
            <span className="text-[10px] font-bold text-[#93C5FD] tracking-wider uppercase mt-0.5 opacity-90">
              NETWORK SYSTEMS
            </span>
          </div>
        </div>

        {/* NAVIGATION MENU */}
        <nav className="flex flex-col gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab && setActiveTab(item.id)}
                className={`flex items-center gap-3.5 px-4 py-3 border-none text-sm font-medium rounded-xl cursor-pointer transition-all text-left w-full ${
                  isActive
                    ? "bg-[#0066FF] text-white font-semibold shadow-md shadow-blue-500/20"
                    : "text-[#DCE7F5] hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon size={18} className={isActive ? "text-white" : "text-[#A3BFDB]"} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* SIDEBAR FOOTER */}
      <div className="pt-4 border-t border-white/10 mt-auto">
        <button
          type="button"
          className="flex items-center gap-3.5 w-full px-4 py-2.5 border-none bg-transparent text-[#DCE7F5] text-sm font-medium cursor-pointer rounded-xl hover:bg-white/10 hover:text-white transition-colors"
        >
          <LogOut size={18} className="text-[#A3BFDB]" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

