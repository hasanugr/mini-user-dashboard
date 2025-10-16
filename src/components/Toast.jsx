"use client";
import { useEffect } from "react";

/**
 * Toast notification component
 * @param {Object} props
 * @param {string} props.message - Message to display in the toast
 * @param {Function} props.onClose - Callback function when toast is closed
 * @param {number} [props.duration=2500] - Duration in ms before auto-close
 * @returns {JSX.Element}
 */
export default function Toast({ message, onClose, duration = 2500 }) {
  useEffect(() => {
    const t = setTimeout(() => onClose?.(), duration);
    return () => clearTimeout(t);
  }, [duration, onClose]);

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed right-4 top-20 z-[100] w-[min(92vw,360px)] rounded-xl border-2 border-green-200 bg-white shadow-2xl animate-in slide-in-from-right duration-300"
    >
      <div className="flex items-start gap-3 p-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500">
          <svg
            className="h-5 w-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <p className="flex-1 text-sm font-medium text-slate-900 pt-1">
          {message}
        </p>
        <button
          aria-label="Close"
          className="ml-auto rounded-lg px-2 py-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          onClick={onClose}
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
