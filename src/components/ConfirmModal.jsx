"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

/**
 * Confirmation modal dialog component
 * @param {Object} props
 * @param {boolean} props.open - Whether the modal is open
 * @param {Function} props.onClose - Callback when modal is closed
 * @param {Function} [props.onConfirm] - Callback when confirm button is clicked
 * @param {Function} [props.onCancel] - Callback when cancel button is clicked
 * @param {string} [props.title="Are you sure?"] - Modal title
 * @param {string} [props.description=""] - Modal description text
 * @param {string} [props.cancelText="Cancel"] - Cancel button text
 * @param {string} [props.confirmText="Confirm"] - Confirm button text
 * @param {boolean} [props.danger=false] - Whether this is a dangerous action (red styling)
 * @returns {JSX.Element|null}
 */
export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  onCancel,
  title = "Are you sure?",
  description = "",
  cancelText = "Cancel",
  confirmText = "Confirm",
  danger = false,
}) {
  const cancelRef = useRef(null);
  const titleId = "confirm-modal-title";

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open && cancelRef.current) cancelRef.current.focus();
  }, [open]);

  if (!open) return null;

  const content = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center space-x-4">
          {/* Icon */}
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              danger ? "bg-red-100" : "bg-indigo-100"
            }`}
          >
            <svg
              className={`w-6 h-6 ${
                danger ? "text-red-600" : "text-indigo-600"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {danger ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              )}
            </svg>
          </div>

          {/* Title */}
          <h3 id={titleId} className="text-xl font-bold text-slate-900">
            {title}
          </h3>
        </div>

        {/* Content */}
        {description && (
          <p className="text-sm text-slate-600 leading-relaxed mb-6">
            {description}
          </p>
        )}

        {/* Actions */}
        <div className="flex flex-col-reverse sm:flex-row gap-3">
          <button
            ref={cancelRef}
            onClick={() => {
              onCancel?.();
              onClose?.();
            }}
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 font-medium hover:bg-slate-50 transition-all cursor-pointer"
          >
            {cancelText}
          </button>
          <button
            onClick={async () => {
              await onConfirm?.();
              onClose?.();
            }}
            className={`flex-1 px-4 py-2.5 rounded-xl font-medium text-white transition-all cursor-pointer ${
              danger
                ? "bg-red-600 hover:bg-red-700 shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40"
                : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-105 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
