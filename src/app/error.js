"use client";

/**
 * Error boundary component for handling and displaying errors
 * @param {Object} props
 * @param {Error} props.error - The error object
 * @param {Function} props.reset - Function to reset the error state
 * @returns {JSX.Element}
 */
export default function Error({ error, reset }) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-red-200 p-8 text-center">
        {/* Error Icon */}
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
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

        {/* Error Message */}
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Oops! Something went wrong
        </h2>
        <p className="text-slate-600 mb-4">
          An unexpected error occurred while processing your request.
        </p>

        {/* Error Details */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-left">
          <p className="text-xs font-mono text-red-800 break-all">
            {String(error?.message || error)}
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={reset}
          className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-105 transition-all duration-200 cursor-pointer"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
