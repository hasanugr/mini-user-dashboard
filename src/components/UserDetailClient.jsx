"use client";

import { useUsers } from "@/context/UsersProvider";
import UserForm from "@/components/UserForm";

/**
 * Client component for user detail page
 * @param {Object} props
 * @param {string} props.userId - User ID to display
 * @param {Object} [props.serverUser] - User data from server
 * @param {number|string} [props.serverUser.id] - User ID
 * @param {string} [props.serverUser.name] - User's full name
 * @param {string} [props.serverUser.username] - Username
 * @param {string} [props.serverUser.email] - Email address
 * @param {string} [props.serverUser.phone] - Phone number
 * @param {string} [props.serverUser.website] - Website URL
 * @param {Object} [props.serverUser.address] - Address information
 * @param {string} [props.serverUser.address.street] - Street address
 * @param {string} [props.serverUser.address.suite] - Suite or apartment
 * @param {string} [props.serverUser.address.city] - City name
 * @param {string} [props.serverUser.address.zipcode] - Zip code
 * @param {Object} [props.serverUser.address.geo] - Geographical coordinates
 * @param {string} [props.serverUser.address.geo.lat] - Latitude
 * @param {string} [props.serverUser.address.geo.lng] - Longitude
 * @param {Object} [props.serverUser.company] - Company information
 * @param {string} [props.serverUser.company.name] - Company name
 * @param {string} [props.serverUser.company.catchPhrase] - Company catchphrase
 * @param {string} [props.serverUser.company.bs] - Company BS
 * @returns {JSX.Element}
 */
export default function UserDetailClient({ userId, serverUser }) {
  const { users } = useUsers();

  const contextUser = users.find((u) => String(u.id) === String(userId));
  const user = contextUser || serverUser;

  if (!user) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-slate-900 mb-2">
          User Not Found
        </h2>
        <p className="text-slate-600">
          The user you&#39;re looking for doesn&#39;t exist.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 mx-auto">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-300">User Details</h1>
        <p className="text-slate-600">View and edit user information</p>
      </div>

      {/* User Info Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Info Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold text-white">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">{user.name}</h2>
              <p className="text-slate-500">@{user.username}</p>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2 text-slate-600">
              <svg
                className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0"
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
              <span className="break-all">{user.email}</span>
            </div>
            {user.phone && (
              <div className="flex items-center gap-2 text-slate-600">
                <svg
                  className="w-5 h-5 text-slate-400 flex-shrink-0"
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
                <span>{user.phone}</span>
              </div>
            )}
            {user.website && (
              <div className="flex items-center gap-2 text-slate-600">
                <svg
                  className="w-5 h-5 text-slate-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
                <a
                  href={`https://${user.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-700 hover:underline"
                >
                  {user.website}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Address Card */}
        {user.address?.city && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Address
            </h3>

            <div className="space-y-2 text-sm text-slate-600">
              {user.address?.street && <p>{user.address.street}</p>}
              {user.address?.suite && <p>{user.address.suite}</p>}
              {user.address?.city && (
                <p>
                  {user.address.city}
                  {user.address.zipcode && `, ${user.address.zipcode}`}
                </p>
              )}
              {user.address?.geo?.lat && user.address?.geo?.lng && (
                <p className="text-xs text-slate-500 mt-2">
                  Coordinates: {user.address.geo.lat}, {user.address.geo.lng}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Company Card */}
        {user.company?.name && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 lg:col-span-2">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-indigo-600"
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
              Company
            </h3>
            <div className="space-y-2">
              <p className="text-slate-900 font-semibold">
                {user.company.name}
              </p>
              {user.company.catchPhrase && (
                <p className="text-sm text-slate-600 italic">
                  &ldquo;{user.company.catchPhrase}&rdquo;
                </p>
              )}
              {user.company.bs && (
                <p className="text-xs text-slate-500">{user.company.bs}</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Edit Form */}
      <div>
        <h2 className="text-2xl font-bold text-slate-300 mb-4">
          Edit Information
        </h2>
        <UserForm mode="edit" initialUser={user} />
      </div>
    </div>
  );
}
