
/**
 * Time utility functions for parsing and converting time ranges
 */

/**
 * Parse a time range string into milliseconds
 * @param timeRange Time range string with unit (e.g. "1y", "2m", "3w", "4d")
 * @returns Number of milliseconds
 */
export function parseTimeRange(timeRange: string): number {
  const value = parseInt(timeRange);
  const unit = timeRange.slice(-1).toLowerCase();

  switch (unit) {
    case 'y': return value * 365 * 24 * 60 * 60 * 1000;  // years to ms
    case 'm': return value * 30 * 24 * 60 * 60 * 1000;   // months to ms (approximate)
    case 'w': return value * 7 * 24 * 60 * 60 * 1000;    // weeks to ms
    case 'd': return value * 24 * 60 * 60 * 1000;        // days to ms
    default: return value;                                // assume milliseconds
  }
}

/**
 * Convert milliseconds to a human readable duration string
 * @param ms Number of milliseconds
 * @returns Formatted duration string (e.g. "2d 5h 30m")
 */
export function formatDuration(ms: number): string {
  const days = Math.floor(ms / (24 * 60 * 60 * 1000));
  ms %= 24 * 60 * 60 * 1000;

  const hours = Math.floor(ms / (60 * 60 * 1000));
  ms %= 60 * 60 * 1000;

  const minutes = Math.floor(ms / (60 * 1000));
  ms %= 60 * 1000;

  const seconds = Math.floor(ms / 1000);

  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0) parts.push(`${seconds}s`);

  return parts.join(' ') || '0s';
}

/**
 * Get milliseconds since a given date
 * @param date Date to measure from
 * @returns Number of milliseconds elapsed
 */
export function getElapsedTime(date: Date): number {
  return Date.now() - date.getTime();
}

/**
 * Time constants in milliseconds
 */
export const TIME = {
  SECOND: 1000,
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
  WEEK: 7 * 24 * 60 * 60 * 1000,
  MONTH: 30 * 24 * 60 * 60 * 1000, // approximate
  YEAR: 365 * 24 * 60 * 60 * 1000
} as const;

// ---------------------------------------------------------------------------
//  Human-readable helpers previously shipped in admin util file
// ---------------------------------------------------------------------------
import { formatDistanceToNow } from 'date-fns';

/**
 * Returns a human-readable relative time from now, e.g. "5 minutes ago".
 */
export function timeAgo(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return formatDistanceToNow(d, { addSuffix: true });
}

/**
 * Returns a compact countdown until the given future date.
 * Examples: `3d 4h`, `2h 10m`, or `Expired` if the date is in the past.
 */
export function timeUntil(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const ms = d.getTime() - Date.now();
  if (ms <= 0) return 'Expired';

  const minutes = Math.floor(ms / 60000);
  const days = Math.floor(minutes / 1440);
  const hours = Math.floor((minutes % 1440) / 60);
  const mins = minutes % 60;

  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${mins}m`;
  return `${mins}m`;
}

