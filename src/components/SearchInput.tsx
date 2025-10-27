import { Input, InputGroup, InputLeftElement, useColorModeValue } from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder = 'Search...',
}: SearchInputProps) {
  const inputBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.300', 'gray.600');
  const focusBorderColor = useColorModeValue('blue.400', 'blue.300');

  return (
    <InputGroup size="lg">
      <InputLeftElement pointerEvents="none">
        <Search2Icon color="gray.400" />
      </InputLeftElement>
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        bg={inputBg}
        borderColor={borderColor}
        _focus={{
          borderColor: focusBorderColor,
          boxShadow: `0 0 0 1px ${focusBorderColor}`,
        }}
      />
    </InputGroup>
  );
}
