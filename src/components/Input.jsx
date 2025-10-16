import { useState, useRef } from "react";

/**
 * Input component with real-time validation, error messages, and accessible labels
 *
 * @typedef {Object} InputProps
 * @property {string} label - Display label for the input field
 * @property {string} name - HTML name attribute for form submission
 * @property {string} [defaultValue=""] - Default value for the input
 * @property {string} [type="text"] - HTML input type (text, email, tel, url)
 * @property {boolean} [required=false] - Whether the field is required
 * @property {string} [pattern] - Regex pattern for HTML5 validation
 * @property {number} [minLength] - Minimum character length
 * @property {number} [maxLength] - Maximum character length
 * @property {string} [placeholder] - Placeholder text
 * @property {React.ReactNode} [icon] - SVG path element for icon
 * @property {string} [validationMessage] - Custom validation error message
 *
 * @param {InputProps} props
 * @returns {JSX.Element}
 */
export default function Input({
  label,
  name,
  defaultValue = "",
  type = "text",
  required = false,
  pattern,
  minLength,
  maxLength,
  placeholder,
  icon,
  validationMessage,
}) {
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);
  const inputRef = useRef(null);

  const validateInput = (value) => {
    const input = inputRef.current;
    if (!input) return;

    // Required validation
    if (required && !value.trim()) {
      setError("This field is required");
      return false;
    }

    // Min length validation
    if (minLength && value.length > 0 && value.length < minLength) {
      setError(`Must be at least ${minLength} characters`);
      return false;
    }

    // Max length validation
    if (maxLength && value.length > maxLength) {
      setError(`Must not exceed ${maxLength} characters`);
      return false;
    }

    // Pattern validation
    if (pattern && value.length > 0) {
      const regex = new RegExp(pattern);
      if (!regex.test(value)) {
        setError(validationMessage || "Invalid format");
        return false;
      }
    }

    // HTML5 validation (email, url, etc.)
    if (input.validity && !input.validity.valid && value.length > 0) {
      if (input.validity.typeMismatch) {
        if (type === "email") setError("Please enter a valid email address");
        else if (type === "url") setError("Please enter a valid URL");
        else if (type === "tel") setError("Please enter a valid phone number");
        else setError(validationMessage || "Invalid format");
      } else if (input.validity.patternMismatch) {
        setError(validationMessage || "Invalid format");
      }
      return false;
    }

    setError("");
    return true;
  };

  const handleChange = (e) => {
    if (touched) {
      validateInput(e.target.value);
    }
  };

  const handleBlur = (e) => {
    setTouched(true);
    validateInput(e.target.value);
  };

  // Prevent invalid characters for specific input types
  const handleKeyPress = (e) => {
    if (type === "tel") {
      // Only allow numbers, spaces, +, -, (, ), .
      if (!/[\d\s()+.-]/.test(e.key)) {
        e.preventDefault();
      }
    }
  };

  const handleInput = (e) => {
    const inputElement = e.target;
    const cursorPosition = inputElement.selectionStart;

    // For zipcode pattern, only allow numbers and hyphen
    if (pattern && pattern.includes("\\d{5}")) {
      const newValue = inputElement.value.replace(/[^\d-]/g, "");
      if (newValue !== inputElement.value) {
        inputElement.value = newValue;
        inputElement.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
      }
    }

    // For coordinates pattern, only allow numbers, dot, and hyphen
    if (pattern && pattern.includes("-?\\d+\\.?\\d*")) {
      const newValue = inputElement.value.replace(/[^\d.-]/g, "");
      if (newValue !== inputElement.value) {
        inputElement.value = newValue;
        inputElement.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
      }
    }

    if (touched) {
      validateInput(inputElement.value);
    }
  };

  const hasError = touched && error;

  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </span>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {icon}
            </svg>
          </div>
        )}
        <input
          ref={inputRef}
          name={name}
          defaultValue={defaultValue}
          type={type}
          required={required}
          pattern={pattern}
          minLength={minLength}
          maxLength={maxLength}
          placeholder={placeholder}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyPress={handleKeyPress}
          onInput={handleInput}
          className={`w-full ${
            icon ? "pl-10" : "pl-4"
          } pr-4 py-2.5 rounded-xl border ${
            hasError
              ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
              : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-500/20"
          } bg-white text-slate-900 placeholder:text-slate-400 focus:ring-2 outline-none transition-all`}
          aria-label={label}
          aria-required={required}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${name}-error` : undefined}
        />
      </div>
      {hasError && (
        <p
          id={`${name}-error`}
          className="text-xs text-red-600 flex items-center gap-1 animate-in fade-in slide-in-from-top-1 duration-200"
          role="alert"
        >
          <svg
            className="w-3 h-3 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
    </label>
  );
}
