import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Badge,
  Text,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';
import type { InventoryItem } from '../types';
import { isNearExpiry, getDaysUntilExpiry } from '../utils/date';

interface TableInventoryProps {
  items: InventoryItem[];
}

export function TableInventory({ items }: TableInventoryProps) {
  const theadBg = useColorModeValue('gray.100', 'gray.700');
  const textColor = useColorModeValue('gray.500', 'gray.400');
  const rowBg = useColorModeValue('white', 'gray.800');
  const rowHoverBg = useColorModeValue('gray.50', 'gray.700');
  const nearExpiryBg = useColorModeValue('red.50', 'red.900');
  const nearExpiryHoverBg = useColorModeValue('red.100', 'red.800');

  if (items.length === 0) {
    return (
      <Box textAlign="center" py={10}>
        <Text fontSize="lg" color={textColor}>
          No inventory items found
        </Text>
      </Box>
    );
  }

  return (
    <TableContainer>
      <Table variant="simple" size="md">
        <Thead bg={theadBg}>
          <Tr>
            <Th>SKU</Th>
            <Th>Name</Th>
            <Th>Batch</Th>
            <Th>Expiry Date</Th>
            <Th isNumeric>Quantity</Th>
            <Th>Location</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map((item, index) => {
            const nearExpiry = isNearExpiry(item.expiry);
            const daysLeft = getDaysUntilExpiry(item.expiry);

            return (
              <Tr
                key={`${item.sku}-${item.batch}-${item.location}-${index}`}
                bg={nearExpiry ? nearExpiryBg : rowBg}
                borderLeft={nearExpiry ? '4px solid' : 'none'}
                borderColor="red.400"
                _hover={{ bg: nearExpiry ? nearExpiryHoverBg : rowHoverBg }}
              >
                <Td fontWeight="semibold">{item.sku}</Td>
                <Td>{item.name}</Td>
                <Td>{item.batch}</Td>
                <Td>{item.expiry}</Td>
                <Td isNumeric fontWeight="medium">
                  {item.qty}
                </Td>
                <Td>
                  <Badge colorScheme="gray" variant="subtle">
                    {item.location}
                  </Badge>
                </Td>
                <Td>
                  {nearExpiry ? (
                    <Badge colorScheme="red" variant="solid">
                      {daysLeft} days left
                    </Badge>
                  ) : (
                    <Badge colorScheme="green" variant="subtle">
                      Good
                    </Badge>
                  )}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
