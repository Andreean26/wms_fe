import { Box, Alert, AlertIcon, AlertTitle, AlertDescription, Button, VStack, Icon, Text, useColorModeValue } from '@chakra-ui/react';
import type { IconType } from 'react-icons';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: IconType;
  actionLabel?: string;
  onAction?: () => void;
  variant?: 'alert' | 'simple';
}

export function EmptyState({ 
  title,
  description,
  icon,
  actionLabel,
  onAction,
  variant = 'alert'
}: EmptyStateProps) {
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const iconColor = useColorModeValue('gray.400', 'gray.500');

  if (variant === 'simple' && icon) {
    return (
      <Box px={{ base: 3, md: 6, lg: 8, xl: 10 }} py={6}>
        <VStack spacing={4} py={12}>
          <Icon as={icon} boxSize={16} color={iconColor} />
          <Text fontSize="xl" fontWeight="semibold" color={textColor}>
            {title}
          </Text>
          {description && (
            <Text fontSize="md" color={textColor} maxW="md" textAlign="center">
              {description}
            </Text>
          )}
          {onAction && actionLabel && (
            <Button colorScheme="blue" onClick={onAction} mt={4}>
              {actionLabel}
            </Button>
          )}
        </VStack>
      </Box>
    );
  }

  return (
    <Box px={{ base: 3, md: 6, lg: 8, xl: 10 }} py={6}>
      <Alert status="info" borderRadius="md" flexDirection="column" py={6}>
        <AlertIcon boxSize="40px" mr={0} mb={2} />
        <AlertTitle mt={2} mb={2}>{title}</AlertTitle>
        {description && (
          <AlertDescription textAlign="center" maxW="md" mb={4}>
            {description}
          </AlertDescription>
        )}
        {onAction && actionLabel && (
          <Button colorScheme="blue" onClick={onAction} mt={2}>
            {actionLabel}
          </Button>
        )}
      </Alert>
    </Box>
  );
}
