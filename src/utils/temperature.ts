/**
 * Temperature Utility Functions
 * Logic untuk menentukan status suhu ruangan
 */

import type { TemperatureStatus } from '../types';

const TEMP_MIN = -20;
const TEMP_MAX = -16;

/**
 * Menentukan status suhu berdasarkan range yang ditentukan
 * Normal: -20 <= temp <= -16
 * Abnormal: di luar range
 */
export function getTemperatureStatus(temperature: number): TemperatureStatus {
  if (temperature >= TEMP_MIN && temperature <= TEMP_MAX) {
    return 'Normal';
  }
  return 'Abnormal';
}

/**
 * Get color scheme untuk badge status
 */
export function getStatusColorScheme(status: TemperatureStatus): string {
  return status === 'Normal' ? 'green' : 'red';
}
