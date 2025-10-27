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
        if (storeItems.length === 0) {
          setItems(data);
        }
        else {
          const uniqueItems = new Map<string, typeof data[0]>();
          storeItems.forEach(item => {
            const key = `${item.sku}-${item.batch}-${item.location}`;
            uniqueItems.set(key, item);
          });
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
   
  }, []); 

  const filteredItems = filterInventoryBySearch(storeItems, searchQuery);

  if (loading) {
    return <LoadingState message="Loading inventory..." />;
  }

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
