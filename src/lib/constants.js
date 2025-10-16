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

// ==================== VALIDATION PATTERNS ====================
/**
 * Regular expression patterns for form validation
 * @constant {Object}
 */
export const VALIDATION_PATTERNS = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PHONE: /^[\d\s()+.-]+(\s?x\d+)?$/,
  USERNAME: /^[a-zA-Z0-9_-]{3,20}$/,
  WEBSITE: /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+([/?].*)?$/,
  ZIPCODE: /^\d{5}(-\d{4})?$/,
  COORDINATES: /^-?\d+\.?\d*$/,
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
  PHONE: { max: 30 },
  WEBSITE: { max: 100 },
  STREET: { max: 150 },
  SUITE: { max: 50 },
  CITY: { max: 100 },
  ZIPCODE: { max: 10 },
  COMPANY_NAME: { max: 100 },
  CATCH_PHRASE: { max: 200 },
  BUSINESS: { max: 200 },
};

// ==================== VALIDATION MESSAGES ====================
/**
 * User-friendly validation error messages
 * @constant {Object}
 */
export const VALIDATION_MESSAGES = {
  REQUIRED: "This field is required",
  INVALID_FORMAT: "Invalid format",
  EMAIL_INVALID: "Please enter a valid email address",
  PHONE_INVALID: "Please enter a valid phone number",
  USERNAME_INVALID:
    "Username must be 3-20 characters (letters, numbers, _ and - only)",
  WEBSITE_INVALID:
    "Please enter a valid website URL (e.g., example.com or https://example.com)",
  ZIPCODE_INVALID: "Please enter a valid zipcode (e.g., 12345 or 12345-6789)",
  LAT_COORDINATES_INVALID: "Please enter a valid latitude (e.g., -37.8136)",
  LNG_COORDINATES_INVALID: "Please enter a valid longitude (e.g., 144.9631)",
  MIN_LENGTH: (min) => `Must be at least ${min} characters`,
  MAX_LENGTH: (max) => `Must not exceed ${max} characters`,
  FULLNAME_INVALID: `Full name must be ${FIELD_LIMITS.NAME.min}-${FIELD_LIMITS.NAME.max} characters`,
};