"use client";

import { useRouter } from "next/navigation";

/**
 * Pagination component with page size selector
 * @param {Object} props
 * @param {number} props.total - Total number of items
 * @param {number} props.page - Current page number
 * @param {number} props.pageSize - Number of items per page
 * @param {string} [props.q] - Optional search query
 * @returns {JSX.Element|null}
 */
export default function Pagination({ total, page, pageSize, q }) {
  const router = useRouter();
  const pages = Math.max(1, Math.ceil(total / pageSize));

  const go = (target, newPageSize = pageSize) => {
    const p = new URLSearchParams();
    if (q) p.set("q", q);
    p.set("page", String(target));
    p.set("pageSize", String(newPageSize));
    router.push("/?" + p.toString());
  };

  const handlePageSizeChange = (e) => {
    const newPageSize = Number(e.target.value);
    go(1, newPageSize);
  };

  if (total === 0) return null;

  if (page > pages) {
    go(pages);
    return null;
  } else if (page < 1) {
    go(1);
    return null;
  }

  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, page - delta);
      i <= Math.min(pages - 1, page + delta);
      i++
    ) {
      range.push(i);
    }

    if (page - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (page + delta < pages - 1) {
      rangeWithDots.push("...", pages);
    } else if (pages > 1) {
      rangeWithDots.push(pages);
    }

    return rangeWithDots;
  };

  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
        <div className="text-sm text-slate-600">
          Showing{" "}
          <span className="font-medium text-slate-900">
            {(page - 1) * pageSize + 1}
          </span>{" "}
          to{" "}
          <span className="font-medium text-slate-900">
            {Math.min(page * pageSize, total)}
          </span>{" "}
          of <span className="font-medium text-slate-900">{total}</span> results
        </div>

        {/* Page Size Selector */}
        <div className="flex items-center gap-2">
          <label
            htmlFor="pageSize"
            className="text-sm text-slate-600 whitespace-nowrap"
          >
            Show:
          </label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={handlePageSizeChange}
            className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm font-medium hover:border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all cursor-pointer"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
          <span className="text-sm text-slate-600">per page</span>
        </div>
      </div>

      {pages > 1 && (
        <div className="flex items-center gap-2">
          <button
            disabled={page <= 1}
            onClick={() => go(page - 1)}
            className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Previous
          </button>

          <div className="hidden sm:flex items-center gap-1">
            {getPageNumbers().map((pageNum, idx) => {
              if (pageNum === "...") {
                return (
                  <span
                    key={`dots-${pageNum}-${idx}`}
                    className="px-3 py-2 text-slate-400"
                  >
                    ...
                  </span>
                );
              }
              return (
                <button
                  key={`page-${pageNum}`}
                  onClick={() => go(pageNum)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    pageNum === page
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30"
                      : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <div className="sm:hidden text-sm font-medium text-slate-700">
            Page {page} of {pages}
          </div>

          <button
            disabled={page >= pages}
            onClick={() => go(page + 1)}
            className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            Next
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
