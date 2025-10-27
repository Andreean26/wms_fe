/**
 * Mock API Service Layer
 * Simulasi API calls dengan mock data
 */

import type { TemperatureRoom, InventoryItem, Location } from '../types';

// ==================== Mock Data ====================

const MOCK_TEMPERATURES: TemperatureRoom[] = [
  { room_id: 'COLD-01', temperature: -18.5 },
  { room_id: 'COLD-02', temperature: -15.2 },
  { room_id: 'COLD-03', temperature: -19.1 },
];

const MOCK_INVENTORY: InventoryItem[] = [
  {
    sku: 'ICE-001',
    name: 'Ice Cream Vanilla',
    batch: 'B-202510',
    expiry: '2025-12-01',
    qty: 50,
    location: 'RACK-A1',
  },
  {
    sku: 'MEAT-002',
    name: 'Beef Slice Premium',
    batch: 'B-202509',
    expiry: '2025-11-02',
    qty: 20,
    location: 'RACK-B2',
  },
  {
    sku: 'FISH-003',
    name: 'Salmon Fillet',
    batch: 'B-202511',
    expiry: '2025-11-15',
    qty: 35,
    location: 'RACK-A2',
  },
  {
    sku: 'VEG-004',
    name: 'Frozen Broccoli',
    batch: 'B-202512',
    expiry: '2026-03-20',
    qty: 100,
    location: 'RACK-C1',
  },
];

const MOCK_LOCATIONS: Location[] = [
  { id: 'RACK-A1', label: 'Rack A1' },
  { id: 'RACK-A2', label: 'Rack A2' },
  { id: 'RACK-B1', label: 'Rack B1' },
  { id: 'RACK-B2', label: 'Rack B2' },
  { id: 'RACK-C1', label: 'Rack C1' },
  { id: 'RACK-C2', label: 'Rack C2' },
];

// ==================== API Functions ====================

/**
 * Simulate network delay
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * GET /temperatures
 * Fetch temperature data untuk semua ruangan
 */
export async function fetchTemperatures(): Promise<TemperatureRoom[]> {
  await delay(500); // Simulate network latency
  
  // untuk membuat data random suhu
  return MOCK_TEMPERATURES.map((room) => ({
    ...room,
    temperature: room.temperature + (Math.random() - 0.5) * 2, // ±1 degree variation
  }));
}

/**
 * GET /inventory
 * Fetch semua inventory items
 */
export async function fetchInventory(): Promise<InventoryItem[]> {
  await delay(400);
  return [...MOCK_INVENTORY];
}

/**
 * GET /locations
 * Fetch available storage locations
 */
export async function fetchLocations(): Promise<Location[]> {
  await delay(300);
  return [...MOCK_LOCATIONS];
}
