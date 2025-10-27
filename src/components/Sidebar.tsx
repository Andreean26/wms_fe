import { Box, VStack, Link as ChakraLink, HStack, Icon, Text, useColorModeValue } from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { MdDashboard, MdInventory } from 'react-icons/md';
import type { IconType } from 'react-icons';

interface MenuItem {
  path: string;
  label: string;
  icon: IconType;
}

const menuItems: MenuItem[] = [
  {
    path: '/',
    label: 'Dashboard',
    icon: MdDashboard,
  },
  {
    path: '/inventory',
    label: 'Inventory',
    icon: MdInventory,
  },
];

export function Sidebar() {
  const location = useLocation();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const activeItemBg = useColorModeValue('blue.50', 'blue.900');
  const activeItemColor = useColorModeValue('blue.600', 'blue.200');
  const inactiveItemColor = useColorModeValue('gray.700', 'gray.300');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');

  return (
    <Box
      as="aside"
      w="250px"
      minH="calc(100vh - 60px)"
      bg={bgColor}
      borderRight="1px solid"
      borderColor={borderColor}
      p={4}
      position="sticky"
      top="60px"
      left={0}
    >
      <VStack align="stretch" spacing={2}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <ChakraLink
              key={item.path}
              as={RouterLink}
              to={item.path}
              _hover={{ textDecoration: 'none' }}
            >
              <HStack
                px={4}
                py={3}
                borderRadius="md"
                bg={isActive ? activeItemBg : 'transparent'}
                color={isActive ? activeItemColor : inactiveItemColor}
                fontWeight={isActive ? 'semibold' : 'medium'}
                transition="all 0.2s"
                _hover={{
                  bg: isActive ? activeItemBg : hoverBg,
                }}
                cursor="pointer"
              >
                <Icon as={item.icon} boxSize={5} />
                <Text>{item.label}</Text>
              </HStack>
            </ChakraLink>
          );
        })}
      </VStack>
    </Box>
  );
}
