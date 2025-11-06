/**
 * Validation Utilities
 *
 * Common validation functions (~2KB).
 * Tree-shaking: Only included when imported.
 */

/**
 * Validate email format
 */
export function isEmail(value: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}

/**
 * Validate URL format
 */
export function isURL(value: string): boolean {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate phone number (basic)
 */
export function isPhoneNumber(value: string): boolean {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(value) && value.replace(/\D/g, "").length >= 10;
}

/**
 * Validate credit card number (Luhn algorithm)
 */
export function isCreditCard(value: string): boolean {
  const sanitized = value.replace(/\D/g, "");

  if (sanitized.length < 13 || sanitized.length > 19) {
    return false;
  }

  let sum = 0;
  let isEven = false;

  for (let i = sanitized.length - 1; i >= 0; i--) {
    let digit = parseInt(sanitized[i]);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

/**
 * Validate password strength
 */
export function isStrongPassword(
  password: string,
  options: {
    minLength?: number;
    requireUppercase?: boolean;
    requireLowercase?: boolean;
    requireNumbers?: boolean;
    requireSpecialChars?: boolean;
  } = {}
): boolean {
  const {
    minLength = 8,
    requireUppercase = true,
    requireLowercase = true,
    requireNumbers = true,
    requireSpecialChars = true,
  } = options;

  if (password.length < minLength) return false;
  if (requireUppercase && !/[A-Z]/.test(password)) return false;
  if (requireLowercase && !/[a-z]/.test(password)) return false;
  if (requireNumbers && !/\d/.test(password)) return false;
  if (requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password))
    return false;

  return true;
}

/**
 * Validate alphanumeric string
 */
export function isAlphanumeric(value: string): boolean {
  return /^[a-zA-Z0-9]+$/.test(value);
}

/**
 * Validate numeric string
 */
export function isNumeric(value: string): boolean {
  return /^\d+$/.test(value);
}

/**
 * Validate alpha string (letters only)
 */
export function isAlpha(value: string): boolean {
  return /^[a-zA-Z]+$/.test(value);
}

/**
 * Validate hexadecimal color
 */
export function isHexColor(value: string): boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value);
}

/**
 * Validate postal/zip code
 */
export function isPostalCode(
  value: string,
  country: "US" | "CA" | "UK" = "US"
): boolean {
  const patterns = {
    US: /^\d{5}(-\d{4})?$/,
    CA: /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/,
    UK: /^[A-Z]{1,2}\d{1,2} \d[A-Z]{2}$/,
  };

  return patterns[country].test(value);
}

/**
 * Check if value is empty (null, undefined, empty string, empty array, empty object)
 */
export function isEmpty(value: any): boolean {
  if (value == null) return true;
  if (typeof value === "string") return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object") return Object.keys(value).length === 0;
  return false;
}

/**
 * Validate minimum length
 */
export function minLength(value: string, min: number): boolean {
  return value.length >= min;
}

/**
 * Validate maximum length
 */
export function maxLength(value: string, max: number): boolean {
  return value.length <= max;
}

/**
 * Validate length range
 */
export function lengthBetween(
  value: string,
  min: number,
  max: number
): boolean {
  return value.length >= min && value.length <= max;
}

// Metadata for bundle analysis
export const VALIDATION_UTILS_METADATA = {
  name: "ValidationUtils",
  dependencies: [],
  estimatedSize: "~2KB",
  functions: [
    "isEmail",
    "isURL",
    "isPhoneNumber",
    "isCreditCard",
    "isStrongPassword",
    "isAlphanumeric",
    "isNumeric",
    "isAlpha",
    "isHexColor",
    "isPostalCode",
    "isEmpty",
    "minLength",
    "maxLength",
    "lengthBetween",
  ],
};
