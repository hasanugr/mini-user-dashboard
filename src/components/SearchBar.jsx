"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Search bar component for filtering users
 * @param {Object} props
 * @param {string} [props.initialQuery=""] - Initial search query value
 * @returns {JSX.Element}
 */
export default function SearchBar({ initialQuery = "" }) {
  const [q, setQ] = useState(initialQuery);
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => setQ(initialQuery), [initialQuery]);

  function onSubmit(e) {
    e.preventDefault();
    const p = new URLSearchParams(params.toString());
    if (q) p.set("q", q);
    else p.delete("q");
    p.set("page", "1");
    router.push("/?" + p.toString());
  }

  return (
    <form onSubmit={onSubmit} className="flex gap-3">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by name, username, email, company..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
        />
      </div>
      <button
        type="submit"
        className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 focus:ring-2 focus:ring-slate-900/20 transition-all cursor-pointer"
      >
        Search
      </button>
    </form>
  );
}
