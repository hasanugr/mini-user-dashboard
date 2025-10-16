/**
 * Application-wide constants and configuration values
 * @module lib/constants
 */

// ==================== STORAGE KEYS ====================
/**
 * localStorage keys used throughout the application
 * @constant {Object}
 */
export const STORAGE_KEYS = {
  ADDED_USERS: "addedUsers",
  DELETED_IDS: "deletedIds",
  EDITED_USERS: "editedUsers",
};

// ==================== PAGINATION ====================
/**
 * Available page size options for pagination
 * @constant {number[]}
 */
export const PAGE_SIZES = [5, 10, 15, 20, 25, 50];

/**
 * Default number of items per page
 * @constant {number}
 */
export const DEFAULT_PAGE_SIZE = 5;

// ==================== VALIDATION PATTERNS ====================
/**
 * Regular expression patterns for form validation
 * @constant {Object}
 */
export const VALIDATION_PATTERNS = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PHONE: /^[\d\s()+.-]+$/,
  USERNAME: /^[a-zA-Z0-9_-]{3,20}$/,
  WEBSITE: /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+([/?].*)?$/,
  ZIPCODE: /^\d{5}(-\d{4})?$/,
  COORDINATES: /^-?\d+\.?\d*$/,
};

// ==================== VALIDATION MESSAGES ====================
/**
 * User-friendly validation error messages
 * @constant {Object}
 */
export const VALIDATION_MESSAGES = {
  REQUIRED: "This field is required",
  EMAIL_INVALID: "Please enter a valid email address",
  PHONE_INVALID: "Please enter a valid phone number",
  USERNAME_INVALID:
    "Username must be 3-20 characters (letters, numbers, _ and - only)",
  WEBSITE_INVALID:
    "Please enter a valid website URL (e.g., example.com or https://example.com)",
  ZIPCODE_INVALID: "Please enter a valid zipcode (e.g., 12345 or 12345-6789)",
  COORDINATES_INVALID: "Please enter a valid coordinate (e.g., -37.8136)",
  MIN_LENGTH: (min) => `Must be at least ${min} characters`,
  MAX_LENGTH: (max) => `Must not exceed ${max} characters`,
};

// ==================== FORM FIELD LIMITS ====================
/**
 * Field length constraints for form inputs
 * @constant {Object}
 */
export const FIELD_LIMITS = {
  NAME: { min: 2, max: 100 },
  USERNAME: { min: 3, max: 20 },
  EMAIL: { max: 100 },
  PHONE: { max: 10 },
  WEBSITE: { max: 100 },
  STREET: { max: 150 },
  SUITE: { max: 50 },
  CITY: { max: 100 },
  ZIPCODE: { max: 10 },
  COMPANY_NAME: { max: 100 },
  CATCH_PHRASE: { max: 200 },
  BUSINESS: { max: 200 },
};

// ==================== API CONFIGURATION ====================
/**
 * API base URL and endpoints
 * @constant {string}
 */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://jsonplaceholder.typicode.com";

/**
 * API endpoints
 * @constant {Object}
 */
export const API_ENDPOINTS = {
  USERS: "/users",
  USER_BY_ID: (id) => `/users/${id}`,
};

// ==================== TOAST TYPES ====================
/**
 * Toast notification types
 * @constant {Object}
 */
export const TOAST_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  INFO: "info",
  WARNING: "warning",
};

// ==================== TOAST MESSAGES ====================
/**
 * Predefined toast notification messages
 * @constant {Object}
 */
export const TOAST_MESSAGES = {
  USER_CREATED: "User created successfully",
  USER_UPDATED: "User updated successfully",
  USER_DELETED: "User deleted successfully",
  ERROR_GENERIC: "An error occurred. Please try again.",
  ERROR_NETWORK: "Network error. Please check your connection.",
};

// ==================== ROUTE PATHS ====================
/**
 * Application route paths
 * @constant {Object}
 */
export const ROUTES = {
  HOME: "/",
  NEW_USER: "/new",
  USER_DETAIL: (id) => `/users/${id}`,
};
