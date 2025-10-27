export interface TemperatureRoom {
  room_id: string;
  temperature: number;
}

export type TemperatureStatus = 'Normal' | 'Abnormal';

export interface TemperatureWithStatus extends TemperatureRoom {
  status: TemperatureStatus;
}

// ==================== Inventory ====================

export interface InventoryItem {
  sku: string;
  name: string;
  batch: string;
  expiry: string; // ISO Date String
  qty: number;
  location: string;
}

// ==================== Location ====================

export interface Location {
  id: string;
  label: string;
}

// ==================== Inbound Form ====================

export interface InboundFormData {
  sku: string;
  name: string;
  batch: string;
  expiry_date: string; // ISO Date String
  qty: number;
  location: string;
}

export interface InboundFormErrors {
  sku?: string;
  name?: string;
  batch?: string;
  expiry_date?: string;
  qty?: string;
  location?: string;
}

// ==================== API Response Types ====================

export interface ApiResponse<T> {
  data: T;
  error?: string;
}

// ==================== UI States ====================

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface FetchState<T> {
  data: T | null;
  status: LoadingState;
  error: string | null;
}
