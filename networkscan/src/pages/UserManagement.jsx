import { useState, useMemo } from "react";
import {
  Filter,
  UserPlus,
  Download,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Shield,
  Trash2,
  Edit,
} from "lucide-react";
import { useApp } from "../context/useApp";
import Modal from "../components/ui/Modal";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import DropdownMenu from "../components/ui/DropdownMenu";

export default function UserManagementPage() {
  const { users, addUser, deleteUser, searchQuery, showToast } = useApp();

  // Local UI State
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  // Add User Modal State
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("TECHNICIAN");
  const [assignedDevice, setAssignedDevice] = useState("");

  // Delete User Confirmation State
  const [userToDelete, setUserToDelete] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Filtered Users list
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      // Role filter
      if (roleFilter !== "ALL" && !user.role.toUpperCase().includes(roleFilter)) {
        return false;
      }
      // Text search query
      const query = searchQuery.trim().toLowerCase();
      if (!query) return true;
      return (
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query) ||
        user.assignedDevice.toLowerCase().includes(query)
      );
    });
  }, [users, roleFilter, searchQuery]);

  // Pagination calculation
  const totalEntries = filteredUsers.length;
  const totalPages = Math.ceil(totalEntries / pageSize) || 1;
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredUsers.slice(start, start + pageSize);
  }, [filteredUsers, currentPage, pageSize]);

  // Derived KPI Summary Counts
  const totalUsersCount = users.length;
  const activeNowCount = users.filter((u) => u.statusType === "active").length;
  const adminCount = users.filter((u) => u.role.toUpperCase().includes("ADMIN")).length;

  const handleCreateUser = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      showToast("Please provide both name and email.", "error");
      return;
    }
    addUser({
      name: name.trim(),
      email: email.trim(),
      role,
      assignedDevice: assignedDevice.trim() || "—",
    });
    setName("");
    setEmail("");
    setAssignedDevice("");
    setRole("TECHNICIAN");
    setIsAddUserModalOpen(false);
  };

  const handleConfirmDeleteUser = () => {
    if (userToDelete) {
      deleteUser(userToDelete.id);
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 font-sans pb-12">
      {/* ADD USER MODAL */}
      <Modal
        isOpen={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
        title="Add Administrative User"
        subtitle="Grant infrastructure access credentials and assign roles."
      >
        <form onSubmit={handleCreateUser} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#0F172A] dark:text-slate-200 uppercase mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Marcus Vance"
              className="w-full px-3.5 py-2.5 bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-xl text-xs text-[#0F172A] dark:text-slate-100 outline-none focus:border-[#0066FF]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0F172A] dark:text-slate-200 uppercase mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. m.vance@skylink.net"
              className="w-full px-3.5 py-2.5 bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-xl text-xs text-[#0F172A] dark:text-slate-100 outline-none focus:border-[#0066FF]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0F172A] dark:text-slate-200 uppercase mb-1">
              Role Permission
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-xl text-xs text-[#0F172A] dark:text-slate-100 outline-none focus:border-[#0066FF]"
            >
              <option value="TECHNICIAN">TECHNICIAN</option>
              <option value="ADMIN">ADMIN</option>
              <option value="SUPER ADMIN">SUPER ADMIN</option>
              <option value="VIEWER">VIEWER</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0F172A] dark:text-slate-200 uppercase mb-1">
              Assigned Node / Hardware ID
            </label>
            <input
              type="text"
              value={assignedDevice}
              onChange={(e) => setAssignedDevice(e.target.value)}
              placeholder="e.g. CORE-HUB-01"
              className="w-full px-3.5 py-2.5 bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-xl text-xs font-mono text-[#0F172A] dark:text-slate-100 outline-none focus:border-[#0066FF]"
            />
          </div>

          <div className="pt-3 flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setIsAddUserModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Create Account
            </Button>
          </div>
        </form>
      </Modal>

      {/* DELETE USER CONFIRMATION MODAL */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Revoke Account Credentials"
        subtitle={`Are you sure you want to delete ${userToDelete?.name}?`}
        confirmText="Revoke & Delete"
        confirmVariant="danger"
        onConfirm={handleConfirmDeleteUser}
      >
        <p className="text-xs text-[#64748B] dark:text-slate-300 leading-relaxed">
          This will immediately revoke system portal access for <strong className="text-[#0F172A] dark:text-slate-100">{userToDelete?.email}</strong>. This action cannot be undone.
        </p>
      </Modal>

      {/* HEADER TITLE BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A] dark:text-slate-100 tracking-tight">
            User Management
          </h1>
          <p className="text-xs text-[#64748B] dark:text-slate-400 mt-1 font-normal max-w-[600px]">
            Control access levels and manage administrative credentials across the network infrastructure.
          </p>
        </div>

        <div className="flex items-center gap-3 relative">
          {/* ROLE FILTER DROPDOWN */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              className={`flex items-center gap-2 px-4 py-2.5 border rounded-xl shadow-2xs text-xs font-semibold cursor-pointer transition-colors ${
                roleFilter !== "ALL"
                  ? "bg-[#EFF6FF] border-[#0066FF] text-[#0066FF]"
                  : "bg-white dark:bg-slate-900 border-[#CBD5E1] dark:border-slate-700 text-[#334155] dark:text-slate-200 hover:bg-[#F8FAFC]"
              }`}
            >
              <Filter size={15} />
              <span>{roleFilter === "ALL" ? "Filters" : `Role: ${roleFilter}`}</span>
            </button>

            {showRoleDropdown && (
              <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 rounded-xl shadow-lg z-30 py-1.5 animate-in fade-in zoom-in-95 duration-100">
                {["ALL", "ADMIN", "TECHNICIAN", "VIEWER"].map((rf) => (
                  <button
                    key={rf}
                    type="button"
                    onClick={() => {
                      setRoleFilter(rf);
                      setCurrentPage(1);
                      setShowRoleDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs font-semibold cursor-pointer border-none transition-colors ${
                      roleFilter === rf
                        ? "bg-[#EFF6FF] text-[#0066FF]"
                        : "text-[#334155] dark:text-slate-300 hover:bg-[#F8FAFC] dark:hover:bg-slate-800"
                    }`}
                  >
                    {rf === "ALL" ? "All Roles" : `${rf} Only`}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsAddUserModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all cursor-pointer border-none"
          >
            <UserPlus size={16} />
            <span>Add User</span>
          </button>
        </div>
      </div>

      {/* 4 TOP KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Users */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-[#E2E8F0] dark:border-slate-800 shadow-2xs relative overflow-hidden">
          <span className="text-[10px] font-bold text-[#64748B] dark:text-slate-400 uppercase tracking-wider block">
            TOTAL USERS
          </span>
          <div className="flex items-baseline gap-2 mt-3">
            <span className="text-4xl font-extrabold text-[#0066FF] tracking-tight">
              {totalUsersCount}
            </span>
            <span className="text-xs font-bold text-[#DC2626]">
              ↑ 3%
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#BFDBFE]"></div>
        </div>

        {/* Active Now */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-[#E2E8F0] dark:border-slate-800 shadow-2xs relative overflow-hidden">
          <span className="text-[10px] font-bold text-[#64748B] dark:text-slate-400 uppercase tracking-wider block">
            ACTIVE NOW
          </span>
          <div className="flex items-baseline gap-1 mt-3">
            <span className="text-4xl font-extrabold text-[#0066FF] tracking-tight">
              {activeNowCount}
            </span>
            <span className="w-2 h-2 rounded-full bg-[#0066FF]"></span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#BFDBFE]"></div>
        </div>

        {/* Pending Tasks */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-[#E2E8F0] dark:border-slate-800 shadow-2xs relative overflow-hidden">
          <span className="text-[10px] font-bold text-[#64748B] dark:text-slate-400 uppercase tracking-wider block">
            PENDING TASKS
          </span>
          <div className="flex items-baseline gap-2 mt-3">
            <span className="text-4xl font-extrabold text-[#0066FF] tracking-tight">
              08
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#BFDBFE]"></div>
        </div>

        {/* Admins */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-[#E2E8F0] dark:border-slate-800 shadow-2xs relative overflow-hidden">
          <span className="text-[10px] font-bold text-[#64748B] dark:text-slate-400 uppercase tracking-wider block">
            ADMINS
          </span>
          <div className="flex items-baseline gap-2 mt-3">
            <span className="text-4xl font-extrabold text-[#0066FF] tracking-tight">
              {adminCount}
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#FCA5A5]"></div>
        </div>
      </div>

      {/* ADMINISTRATIVE DIRECTORY TABLE */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-[#E2E8F0] dark:border-slate-800 shadow-2xs overflow-hidden">
        {/* TABLE HEADER BAR */}
        <div className="p-5 border-b border-[#E2E8F0] dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="text-base font-bold text-[#0F172A] dark:text-slate-100">
              Administrative Directory
            </h3>
            {searchQuery && (
              <span className="text-xs text-[#64748B] bg-[#F1F5F9] dark:bg-slate-800 px-2.5 py-1 rounded-md">
                Query: "{searchQuery}" ({filteredUsers.length} matches)
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-[#64748B]">
            <button
              type="button"
              onClick={() => showToast("Exported directory list to CSV.", "info")}
              className="p-1.5 hover:bg-[#F1F5F9] dark:hover:bg-slate-800 rounded-lg border-none bg-transparent cursor-pointer transition-colors"
              title="Download CSV"
            >
              <Download size={16} />
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
                { label: "Add New User", icon: UserPlus, onClick: () => setIsAddUserModalOpen(true) },
                { label: "Reset Role Filters", onClick: () => setRoleFilter("ALL") },
              ]}
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          {paginatedUsers.length > 0 ? (
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#F8FAFC] dark:bg-slate-800/60 border-b border-[#E2E8F0] dark:border-slate-800 text-[#64748B] dark:text-slate-400 font-bold uppercase tracking-wider">
                  <th className="py-4 px-6">Name</th>
                  <th className="py-4 px-6">Email Address</th>
                  <th className="py-4 px-6">Role</th>
                  <th className="py-4 px-6">Assigned Device</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6">Last Login</th>
                  <th className="py-4 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] dark:divide-slate-800">
                {paginatedUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-[#F8FAFC] dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full ${user.avatarBg} font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs`}>
                          {user.initials}
                        </div>
                        <span className="font-bold text-[#0F172A] dark:text-slate-100 text-xs">
                          {user.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-[#334155] dark:text-slate-300 font-medium">
                      {user.email}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-1 rounded text-[9px] font-extrabold uppercase tracking-wider ${user.roleBg}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-mono text-[#475569] dark:text-slate-400 text-xs">
                      {user.assignedDevice}
                    </td>
                    <td className="py-4 px-6">
                      {user.statusType === "active" ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#16A34A]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]"></span> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#64748B]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#94A3B8]"></span> Inactive
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-[#64748B] dark:text-slate-400">
                      {user.lastLogin}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <DropdownMenu
                        trigger={
                          <button
                            type="button"
                            className="p-1.5 text-[#64748B] hover:text-[#0F172A] dark:hover:text-slate-200 rounded border-none bg-transparent cursor-pointer"
                          >
                            <MoreVertical size={16} />
                          </button>
                        }
                        items={[
                          { label: "Promote Role", icon: Shield, onClick: () => showToast(`Updated role for ${user.name}.`) },
                          { label: "Edit Credentials", icon: Edit, onClick: () => showToast(`Edit panel for ${user.name}.`, "info") },
                          {
                            label: "Delete User",
                            icon: Trash2,
                            danger: true,
                            onClick: () => {
                              setUserToDelete(user);
                              setIsDeleteModalOpen(true);
                            },
                          },
                        ]}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <EmptyState
              title="No users match your criteria"
              description="Try adjusting your role filter or search term."
              actionLabel="Reset Search & Filters"
              onAction={() => {
                setRoleFilter("ALL");
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
              {Math.min(currentPage * pageSize, totalEntries)} of {totalEntries} users
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
    </div>
  );
}
