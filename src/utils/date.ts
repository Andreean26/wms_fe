/**
 * Date Utility Functions
 * Untuk validasi dan kalkulasi tanggal expiry
 */

import { differenceInDays, isAfter, isBefore, startOfToday, parseISO } from 'date-fns';

/**
 * Check apakah item mendekati expiry (≤ 30 hari)
 */
export function isNearExpiry(expiryDateString: string, thresholdDays = 30): boolean {
  try {
    const expiryDate = parseISO(expiryDateString);
    const today = startOfToday();
    const daysUntilExpiry = differenceInDays(expiryDate, today);
    
    return daysUntilExpiry >= 0 && daysUntilExpiry <= thresholdDays;
  } catch {
    return false;
  }
}

/**
 * Check apakah tanggal valid dan >= hari ini
 */
export function isValidFutureDate(dateString: string): boolean {
  try {
    const date = parseISO(dateString);
    const today = startOfToday();
    return isAfter(date, today) || date.getTime() === today.getTime();
  } catch {
    return false;
  }
}

/**
 * Check apakah tanggal sudah lewat
 */
export function isPastDate(dateString: string): boolean {
  try {
    const date = parseISO(dateString);
    const today = startOfToday();
    return isBefore(date, today);
  } catch {
    return false;
  }
}

/**
 * Format days until expiry untuk display
 */
export function getDaysUntilExpiry(expiryDateString: string): number {
  try {
    const expiryDate = parseISO(expiryDateString);
    const today = startOfToday();
    return differenceInDays(expiryDate, today);
  } catch {
    return 0;
  }
}
