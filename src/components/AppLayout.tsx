import { Box, Flex, Heading, HStack, useColorModeValue, IconButton, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, useDisclosure } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { DarkModeToggle } from './DarkModeToggle';
import { HamburgerIcon } from '@chakra-ui/icons';

export function AppLayout() {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const headerBg = useColorModeValue('blue.600', 'blue.700');
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={bgColor}>
      <Box bg={headerBg} color="white" py={4} shadow="md" position="sticky" top={0} zIndex={10}>
        <Box px={{ base: 3, md: 6, lg: 8, xl: 10 }}>
          <Flex justify="space-between" align="center">
            <HStack spacing={3}>
              {/* Mobile sidebar toggle */}
              <IconButton
                aria-label="Open menu"
                icon={<HamburgerIcon />}
                onClick={onOpen}
                variant="ghost"
                colorScheme="whiteAlpha"
                color="white"
                display={{ base: 'inline-flex', md: 'none' }}
              />
              <Heading size="md">WMS Cold Storage</Heading>
            </HStack>
            <HStack spacing={4}>
              <DarkModeToggle />
            </HStack>
          </Flex>
        </Box>
      </Box>

      {/* Main Content with Sidebar */}
      <Flex>
        {/* Desktop Sidebar */}
        <Box display={{ base: 'none', md: 'block' }}>
          <Sidebar />
        </Box>
        
        {/* Page Content */}
        <Box flex="1" minH="calc(100vh - 60px)">
          <Outlet />
        </Box>
      </Flex>

      {/* Mobile Drawer Sidebar */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody p={0}>
            <Sidebar variant="drawer" onNavigate={onClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
