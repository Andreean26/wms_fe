import { Box, Center, Spinner, Text, useColorModeValue } from '@chakra-ui/react';

interface LoadingStateProps {
  message?: string;
  height?: string;
}

export function LoadingState({ 
  message = 'Loading...', 
  height = '60vh' 
}: LoadingStateProps) {
  const textColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <Box px={{ base: 3, md: 6, lg: 8, xl: 10 }} py={6}>
      <Center h={height}>
        <Box textAlign="center">
          <Spinner size="xl" color="blue.500" thickness="4px" mb={4} />
          <Text color={textColor}>{message}</Text>
        </Box>
      </Center>
    </Box>
  );
}
