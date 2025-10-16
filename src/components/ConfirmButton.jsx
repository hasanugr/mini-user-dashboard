"use client";

import { useState } from "react";
import ConfirmModal from "@/components/ConfirmModal";

/**
 * Button component with confirmation modal
 * @param {Object} props
 * @param {string} [props.label="Button"] - Button label text
 * @param {React.ReactNode} [props.children] - Button children (overrides label)
 * @param {string} [props.className] - Additional CSS classes for button
 * @param {string} [props.title="Are you sure?"] - Modal title
 * @param {string} [props.description=""] - Modal description
 * @param {string} [props.cancelText="Cancel"] - Cancel button text
 * @param {string} [props.confirmText="Confirm"] - Confirm button text
 * @param {boolean} [props.danger=false] - Whether this is a dangerous action
 * @param {Function} props.onConfirm - Callback when action is confirmed
 * @returns {JSX.Element}
 */
export default function ConfirmButton({
  label = "Button",
  children,
  className = "rounded border px-2 py-1 hover:bg-red-50",
  title = "Are you sure?",
  description = "",
  cancelText = "Cancel",
  confirmText = "Confirm",
  danger = false,
  onConfirm,
}) {
  const [open, setOpen] = useState(false);

  const handleOpen = (v) => {
    setOpen(v);
  };

  return (
    <>
      <button onClick={() => handleOpen(true)} className={className}>
        {children || label}
      </button>

      <ConfirmModal
        open={open}
        onClose={() => handleOpen(false)}
        onConfirm={onConfirm}
        title={title}
        description={description}
        cancelText={cancelText}
        confirmText={confirmText}
        danger={danger}
      />
    </>
  );
}
