import { ChevronLeft, ChevronRight } from "lucide-react";
import EmptyState from "./EmptyState";

export default function DataTable({
  columns = [], // Array<{ key: string, label: string, render?: (row: any) => React.ReactNode, align?: 'left' | 'center' | 'right' }>
  data = [],
  keyField = "id",
  pagination, // { currentPage: number, totalPages: number, totalEntries: number, pageSize: number, onPageChange: (page: number) => void }
  emptyTitle = "No records found",
  emptyDescription = "There are no entries available to display.",
  onRowClick,
  className = "",
}) {
  const hasData = Array.isArray(data) && data.length > 0;

  return (
    <div
      className={`bg-white dark:bg-slate-900 rounded-xl border border-[#E2E8F0] dark:border-slate-800 shadow-2xs overflow-hidden ${className}`}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#F8FAFC] dark:bg-slate-800/80 border-b border-[#E2E8F0] dark:border-slate-800 text-[#64748B] dark:text-slate-400 font-bold uppercase tracking-wider">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`py-3.5 px-6 ${
                    col.align === "center"
                      ? "text-center"
                      : col.align === "right"
                      ? "text-right"
                      : "text-left"
                  }`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0] dark:divide-slate-800 text-[#0F172A] dark:text-slate-200">
            {hasData ? (
              data.map((row) => (
                <tr
                  key={row[keyField] || JSON.stringify(row)}
                  onClick={() => onRowClick && onRowClick(row)}
                  className={`hover:bg-[#F8FAFC] dark:hover:bg-slate-800/50 transition-colors ${
                    onRowClick ? "cursor-pointer" : ""
                  }`}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={`py-4 px-6 ${
                        col.align === "center"
                          ? "text-center"
                          : col.align === "right"
                          ? "text-right"
                          : "text-left"
                      }`}
                    >
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="p-0 border-none">
                  <EmptyState
                    title={emptyTitle}
                    description={emptyDescription}
                    className="border-none rounded-none py-12"
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {pagination && hasData && (
        <div className="p-4 border-t border-[#E2E8F0] dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-800/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B] dark:text-slate-400">
          <span>
            Showing{" "}
            {Math.min(
              (pagination.currentPage - 1) * pagination.pageSize + 1,
              pagination.totalEntries
            )}{" "}
            to{" "}
            {Math.min(
              pagination.currentPage * pagination.pageSize,
              pagination.totalEntries
            )}{" "}
            of {pagination.totalEntries} entries
          </span>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={pagination.currentPage <= 1}
              onClick={() =>
                pagination.onPageChange &&
                pagination.onPageChange(pagination.currentPage - 1)
              }
              className="p-1.5 rounded-lg border border-[#CBD5E1] dark:border-slate-700 bg-white dark:bg-slate-800 text-[#334155] dark:text-slate-200 hover:bg-[#F1F5F9] dark:hover:bg-slate-700 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed border-none shadow-2xs"
            >
              <ChevronLeft size={16} />
            </button>

            {Array.from({ length: pagination.totalPages }).map((_, idx) => {
              const pageNum = idx + 1;
              const isActive = pageNum === pagination.currentPage;
              return (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() =>
                    pagination.onPageChange && pagination.onPageChange(pageNum)
                  }
                  className={`w-8 h-8 rounded-lg font-semibold cursor-pointer border-none transition-all ${
                    isActive
                      ? "bg-[#0066FF] text-white font-bold shadow-2xs"
                      : "bg-white dark:bg-slate-800 border border-[#CBD5E1] dark:border-slate-700 hover:bg-[#F1F5F9] dark:hover:bg-slate-700 text-[#334155] dark:text-slate-200"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              type="button"
              disabled={pagination.currentPage >= pagination.totalPages}
              onClick={() =>
                pagination.onPageChange &&
                pagination.onPageChange(pagination.currentPage + 1)
              }
              className="p-1.5 rounded-lg border border-[#CBD5E1] dark:border-slate-700 bg-white dark:bg-slate-800 text-[#334155] dark:text-slate-200 hover:bg-[#F1F5F9] dark:hover:bg-slate-700 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed border-none shadow-2xs"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
