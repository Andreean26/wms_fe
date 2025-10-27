/**
 * Dark Mode Toggle Component
 * Button untuk switch antara light/dark mode
 */

import { IconButton, useColorMode, useColorModeValue, Tooltip } from '@chakra-ui/react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

export function DarkModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();
  const Icon = useColorModeValue(MdDarkMode, MdLightMode);
  const label = useColorModeValue('Enable Dark Mode', 'Enable Light Mode');

  return (
    <Tooltip label={label} placement="bottom">
      <IconButton
        aria-label={label}
        icon={<Icon size={20} />}
        onClick={toggleColorMode}
        variant="ghost"
        colorScheme={colorMode === 'light' ? 'gray' : 'yellow'}
        _hover={{
          bg: colorMode === 'light' ? 'gray.100' : 'whiteAlpha.200',
        }}
      />
    </Tooltip>
  );
}
