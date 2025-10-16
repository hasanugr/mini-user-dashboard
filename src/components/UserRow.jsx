"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ConfirmButton from "@/components/ConfirmButton";
import { deleteUserAction } from "@/app/actions";
import { useUsers } from "@/context/UsersProvider";

/**
 * User row component for displaying user information in table
 * @param {Object} props
 * @param {Object} props.user - User data object
 * @param {number} props.user.id - User ID
 * @param {string} props.user.name - User's full name
 * @param {string} props.user.username - Username
 * @param {string} props.user.email - Email address
 * @param {string} props.user.phone - Phone number
 * @param {Object} [props.user.company] - Company information
 * @returns {JSX.Element}
 */
export default function UserRow({ user }) {
  const { deleteUserLocal } = useUsers();
  const router = useRouter();

  async function onDelete() {
    deleteUserLocal(user.id);

    try {
      await deleteUserAction(user.id);
    } catch (e) {
      console.error(e);
    }

    const p = new URLSearchParams(
      typeof window !== "undefined" ? window.location.search : ""
    );
    p.set("deleted", "1");
    router.replace("/?" + p.toString());
  }

  return (
    <>
      {/* Mobile View */}
      <div className="md:hidden px-6 py-4 space-y-3 hover:bg-slate-50 transition-colors">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-slate-900">{user.name}</h3>
            <p className="text-sm text-slate-500">@{user.username}</p>
          </div>
          <div className="flex gap-2">
            <Link
              href={`/users/${user.id}`}
              className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-slate-300 bg-white hover:bg-indigo-50 hover:border-indigo-300 transition-colors"
              title="View Details"
            >
              <svg
                className="w-4 h-4 text-slate-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </Link>
            <ConfirmButton
              label=""
              className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-red-300 bg-white hover:bg-red-50 hover:border-red-400 transition-colors"
              danger
              title="Delete User"
              description={`Are you sure you want to delete "${user.name}"?`}
              cancelText="Cancel"
              confirmText="Yes, Delete"
              onConfirm={onDelete}
            >
              <svg
                className="w-4 h-4 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </ConfirmButton>
          </div>
        </div>
        <div className="space-y-1 text-sm">
          <div className="flex items-center text-slate-600">
            <svg
              className="w-4 h-4 mr-2 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            {user.email}
          </div>
          {user?.phone && (
            <div className="flex items-center text-slate-600">
              <svg
                className="w-4 h-4 mr-2 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              {user.phone}
            </div>
          )}
          {user.company?.name && (
            <div className="flex items-center text-slate-600">
              <svg
                className="w-4 h-4 mr-2 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              {user.company.name}
            </div>
          )}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:grid lg:grid-cols-9 gap-4 px-6 py-4 items-center hover:bg-slate-50 transition-colors group">
        <div className="col-span-2">
          <p className="font-medium text-slate-900">{user.name}</p>
          <p className="text-xs text-slate-500">@{user.username}</p>
        </div>
        <div className="col-span-2 text-sm text-slate-600 truncate">
          {user.email}
        </div>
        <div className="col-span-2 text-sm text-slate-600">
          {user.phone || "-"}
        </div>
        <div className="col-span-2 text-sm text-slate-600 truncate">
          {user.company?.name || "-"}
        </div>
        <div className="col-span-1 flex justify-end gap-2">
          <Link
            href={`/users/${user.id}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-700 border border-slate-300 bg-white hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-700 transition-all"
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
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </Link>
          <ConfirmButton
            label=""
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-red-300 bg-white hover:bg-red-50 hover:border-red-400 transition-colors cursor-pointer"
            danger
            title="Delete User"
            description={`Are you sure you want to delete "${user.name}"?`}
            cancelText="Cancel"
            confirmText="Yes, Delete"
            onConfirm={onDelete}
          >
            <svg
              className="w-4 h-4 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </ConfirmButton>
        </div>
      </div>
    </>
  );
}
