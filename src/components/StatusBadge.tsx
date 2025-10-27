import { Badge } from '@chakra-ui/react';
import type { TemperatureStatus } from '../types';
import { getStatusColorScheme } from '../utils/temperature';

interface StatusBadgeProps {
  status: TemperatureStatus;
  size?: 'sm' | 'md' | 'lg';
}

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const colorScheme = getStatusColorScheme(status);

  return (
    <Badge
      colorScheme={colorScheme}
      fontSize={size}
      px={3}
      py={1}
      borderRadius="full"
      fontWeight="bold"
    >
      {status}
    </Badge>
  );
}
