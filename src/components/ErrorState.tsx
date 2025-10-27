import { Box, Alert, AlertIcon, AlertTitle, AlertDescription, Button } from '@chakra-ui/react';
import { RepeatIcon } from '@chakra-ui/icons';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ 
  title = 'Error Loading Data',
  message,
  onRetry 
}: ErrorStateProps) {
  return (
    <Box px={{ base: 3, md: 6, lg: 8, xl: 10 }} py={6}>
      <Alert 
        status="error" 
        borderRadius="md"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
        py={8}
      >
        <AlertIcon boxSize="40px" mr={0} mb={4} />
        <AlertTitle mt={4} mb={2} fontSize="lg">
          {title}
        </AlertTitle>
        <AlertDescription maxW="md" mb={4}>
          {message}
        </AlertDescription>
        {onRetry && (
          <Button
            leftIcon={<RepeatIcon />}
            colorScheme="red"
            variant="outline"
            onClick={onRetry}
            mt={2}
          >
            Try Again
          </Button>
        )}
      </Alert>
    </Box>
  );
}
