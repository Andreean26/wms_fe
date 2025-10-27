import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { InventoryItem } from '../types';

interface InventoryStore {
  items: InventoryItem[];
  setItems: (items: InventoryItem[]) => void;
  addItem: (item: InventoryItem) => void;
  clearItems: () => void;
}

/**
 * Global store dengan localStorage persistence (bonus feature)
 */
export const useInventoryStore = create<InventoryStore>()(
  persist(
    (set) => ({
      items: [],
      
      setItems: (items) => set({ items }),
      
      addItem: (item) =>
        set((state) => ({
          items: [...state.items, item],
        })),
      
      clearItems: () => set({ items: [] }),
    }),
    {
      name: 'wms-inventory-storage', // localStorage key
    }
  )
);
