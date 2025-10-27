import { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Text,
  VStack,
  Button,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { fetchInventory } from '../services/api';
import { useInventoryStore } from '../store/inventoryStore';
import { filterInventoryBySearch } from '../utils/search';
import { SearchInput } from '../components/SearchInput';
import { TableInventory } from '../components/TableInventory';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';

export function InventoryListPage() {
  const navigate = useNavigate();
  const { items: storeItems, setItems } = useInventoryStore();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const textColor = useColorModeValue('gray.600', 'gray.400');

  useEffect(() => {
    const loadInventory = async () => {
      try {
        const data = await fetchInventory();
        
        // Jika store masih kosong, set dari API
        // Jika sudah ada data di store, keep store data (untuk preserve user-added items)
        if (storeItems.length === 0) {
          setItems(data);
        }
        // Jika ada items di store, merge dan remove duplicates
        else {
          // Create unique key untuk detect duplicates
          const uniqueItems = new Map<string, typeof data[0]>();
          
          // Add existing store items first
          storeItems.forEach(item => {
            const key = `${item.sku}-${item.batch}-${item.location}`;
            uniqueItems.set(key, item);
          });
          
          // Add API items only if not already exists
          data.forEach(item => {
            const key = `${item.sku}-${item.batch}-${item.location}`;
            if (!uniqueItems.has(key)) {
              uniqueItems.set(key, item);
            }
          });
          
          setItems(Array.from(uniqueItems.values()));
        }
        
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load inventory');
        setLoading(false);
      }
    };

    loadInventory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Load once on mount

  // Filter berdasarkan search
  const filteredItems = filterInventoryBySearch(storeItems, searchQuery);

  // Loading state
  if (loading) {
    return <LoadingState message="Loading inventory..." />;
  }

  // Error state
  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <Box px={{ base: 3, md: 6, lg: 8, xl: 10 }} py={6}>
      <VStack align="stretch" spacing={6} w="100%">
        <Box>
          <HStack justify="space-between" mb={4}>
            <Heading size="xl">Inventory List</Heading>
            <Button
              leftIcon={<AddIcon />}
              colorScheme="blue"
              onClick={() => navigate('/inbound/new')}
            >
              Add Item
            </Button>
          </HStack>
          <Text color={textColor}>
            Total items: {storeItems.length} | Showing: {filteredItems.length}
          </Text>
        </Box>

        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by SKU or product name..."
        />

        {searchQuery && filteredItems.length === 0 ? (
          <Alert status="info" borderRadius="md">
            <AlertIcon />
            <AlertTitle>No Results</AlertTitle>
            <AlertDescription>
              No items match your search input "{searchQuery}"
            </AlertDescription>
          </Alert>
        ) : (
          <TableInventory items={filteredItems} />
        )}
      </VStack>
    </Box>
  );
}
