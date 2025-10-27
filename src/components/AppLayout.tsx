import { Box, Flex, Heading, HStack, useColorModeValue } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { DarkModeToggle } from './DarkModeToggle';

export function AppLayout() {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const headerBg = useColorModeValue('blue.600', 'blue.700');

  return (
    <Box minH="100vh" bg={bgColor}>
      <Box bg={headerBg} color="white" py={4} shadow="md" position="sticky" top={0} zIndex={10}>
        <Box px={{ base: 3, md: 6, lg: 8, xl: 10 }}>
          <Flex justify="space-between" align="center">
            <Heading size="md">WMS Cold Storage</Heading>
            <HStack spacing={4}>
              <DarkModeToggle />
            </HStack>
          </Flex>
        </Box>
      </Box>

      {/* Main Content with Sidebar */}
      <Flex>
        {/* Sidebar */}
        <Sidebar />
        
        {/* Page Content */}
        <Box flex="1" minH="calc(100vh - 60px)">
          <Outlet />
        </Box>
      </Flex>
    </Box>
  );
}
