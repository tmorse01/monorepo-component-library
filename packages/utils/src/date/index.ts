/**
 * Date Utilities using dayjs
 *
 * This module includes dayjs (~7KB gzipped) plus custom date helpers.
 * Tree-shaking: Import only this module if you need date operations.
 */

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import customParseFormat from "dayjs/plugin/customParseFormat";

// Extend dayjs with plugins (adds to bundle size)
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

/**
 * Format a date to a readable string
 */
export function formatDate(
  date: Date | string | number,
  format = "YYYY-MM-DD"
): string {
  return dayjs(date).format(format);
}

/**
 * Get relative time (e.g., "2 hours ago")
 */
export function getRelativeTime(date: Date | string | number): string {
  return dayjs(date).fromNow();
}

/**
 * Check if a date is in the past
 */
export function isPast(date: Date | string | number): boolean {
  return dayjs(date).isBefore(dayjs());
}

/**
 * Check if a date is in the future
 */
export function isFuture(date: Date | string | number): boolean {
  return dayjs(date).isAfter(dayjs());
}

/**
 * Add days to a date
 */
export function addDays(date: Date | string | number, days: number): Date {
  return dayjs(date).add(days, "day").toDate();
}

/**
 * Subtract days from a date
 */
export function subtractDays(date: Date | string | number, days: number): Date {
  return dayjs(date).subtract(days, "day").toDate();
}

/**
 * Get the start of day
 */
export function startOfDay(date: Date | string | number): Date {
  return dayjs(date).startOf("day").toDate();
}

/**
 * Get the end of day
 */
export function endOfDay(date: Date | string | number): Date {
  return dayjs(date).endOf("day").toDate();
}

/**
 * Parse a date string with a specific format
 */
export function parseDate(dateString: string, format: string): Date | null {
  const parsed = dayjs(dateString, format, true);
  return parsed.isValid() ? parsed.toDate() : null;
}

/**
 * Convert to UTC
 */
export function toUTC(date: Date | string | number): Date {
  return dayjs(date).utc().toDate();
}

/**
 * Convert to timezone
 */
export function toTimezone(date: Date | string | number, tz: string): Date {
  return dayjs(date).tz(tz).toDate();
}

/**
 * Get days between two dates
 */
export function daysBetween(
  date1: Date | string | number,
  date2: Date | string | number
): number {
  return Math.abs(dayjs(date1).diff(dayjs(date2), "day"));
}

/**
 * Check if two dates are the same day
 */
export function isSameDay(
  date1: Date | string | number,
  date2: Date | string | number
): boolean {
  return dayjs(date1).isSame(dayjs(date2), "day");
}

// Metadata for bundle analysis
export const DATE_UTILS_METADATA = {
  name: "DateUtils",
  dependencies: [
    "dayjs",
    "relativeTime",
    "utc",
    "timezone",
    "customParseFormat",
  ],
  estimatedSize: "~7KB gzipped",
  functions: [
    "formatDate",
    "getRelativeTime",
    "isPast",
    "isFuture",
    "addDays",
    "subtractDays",
    "startOfDay",
    "endOfDay",
    "parseDate",
    "toUTC",
    "toTimezone",
    "daysBetween",
    "isSameDay",
  ],
};
