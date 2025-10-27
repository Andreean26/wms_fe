/**
 * Inventory List Page
 * Menampilkan inventory dengan search dan highlight expiry
 */

import { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Spinner,
  Center,
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
    return (
      <Box px={{ base: 3, md: 6, lg: 8, xl: 10 }} py={6}>
        <Center h="60vh">
          <Box textAlign="center">
            <Spinner size="xl" color="blue.500" thickness="4px" mb={4} />
            <Text color={textColor}>Loading inventory...</Text>
          </Box>
        </Center>
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Box px={{ base: 3, md: 6, lg: 8, xl: 10 }} py={6}>
        <Alert status="error" borderRadius="md">
          <AlertIcon />
          <Box>
            <AlertTitle>Error Loading Data</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Box>
        </Alert>
      </Box>
    );
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
              No items match your search query "{searchQuery}"
            </AlertDescription>
          </Alert>
        ) : (
          <TableInventory items={filteredItems} />
        )}
      </VStack>
    </Box>
  );
}
