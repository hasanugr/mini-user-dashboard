import { fetchUsers } from "@/lib/users";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import UserTable from "@/components/UserTable";
import UsersSync from "@/components/UsersSync";

export const dynamic = "force-dynamic";

/**
 * Home page component displaying user list with search and pagination
 * @param {Object} props
 * @param {Object} [props.searchParams] - Search parameters from the URL
 * @param {string} [props.searchParams.q] - Search query
 * @param {string} [props.searchParams.page] - Current page number
 * @param {string} [props.searchParams.pageSize] - Number of users per page
 * @returns {JSX.Element}
 */
export default async function Home({ searchParams }) {
  const { q = "", page = "1", pageSize = "5" } = (await searchParams) || {};

  const initialUsers = await fetchUsers();

  return (
    <div className="space-y-6">
      <UsersSync serverUsers={initialUsers} />

      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-300">Users</h1>
        <p className="text-slate-600">Manage and organize your user base</p>
      </div>

      {/* Search and Action Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="flex-1">
            <SearchBar initialQuery={q} />
          </div>
          <Link
            href="/new"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-white font-medium shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-105 transition-all duration-200"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add New User
          </Link>
        </div>
      </div>

      {/* User Table Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <UserTable page={page} pageSize={pageSize} q={q} />
      </div>
    </div>
  );
}
