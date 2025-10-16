"use client";
import { useEffect, useState } from "react";
import { useUsers } from "@/context/UsersProvider";
import UserRow from "./UserRow";
import Pagination from "./Pagination";
import { filterUsers, paginateUsers } from "@/utils/utils";

/**
 * User table component with pagination and filtering
 * @param {Object} props
 * @param {number} [props.page=1] - Current page number
 * @param {number} [props.pageSize=5] - Number of items per page
 * @param {string} [props.q] - Search query string
 * @returns {JSX.Element}
 */
export default function UserTable({ page = 1, pageSize = 5, q }) {
  const { users } = useUsers();

  const [filteredUsers, setFilteredUsers] = useState([]);
  const [pageItems, setPageItems] = useState([]);

  useEffect(() => {
    setFilteredUsers(filterUsers(users, q));

    setPageItems(
      paginateUsers(filterUsers(users, q), page, pageSize)?.pageItems || []
    );
  }, [users, users?.length, q, page, pageSize]);

  if (!filteredUsers.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        </div>
        <p className="text-lg font-medium text-slate-900 mb-1">
          No users found
        </p>
        <p className="text-sm text-slate-500">
          Try adjusting your search criteria
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-slate-200">
      {/* Table Header - Hidden on mobile, shown on tablet+ */}
      <div className="hidden lg:grid lg:grid-cols-9 gap-4 px-6 py-4 bg-slate-50 font-medium text-sm text-slate-600">
        <div className="col-span-2">Name</div>
        <div className="col-span-2">Email</div>
        <div className="col-span-2">Phone</div>
        <div className="col-span-2">Company</div>
        <div className="col-span-1 text-right">Actions</div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-slate-100">
        {pageItems.map((u) => (
          <UserRow key={u.id} user={u} />
        ))}
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 bg-slate-50">
        <Pagination
          total={filteredUsers.length}
          page={Number(page)}
          pageSize={Number(pageSize) || 5}
          q={q}
        />
      </div>
    </div>
  );
}
