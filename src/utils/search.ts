import type { InventoryItem } from '../types';

export function filterInventoryBySearch(
  items: InventoryItem[],
  searchQuery: string
): InventoryItem[] {
  if (!searchQuery.trim()) {
    return items;
  }

  const query = searchQuery.toLowerCase().trim();

  return items.filter((item) => {
    const skuMatch = item.sku.toLowerCase().includes(query);
    const nameMatch = item.name.toLowerCase().includes(query);
    return skuMatch || nameMatch;
  });
}
