import { useState } from 'react';
import {
  Box,
  Heading,
  SimpleGrid,
  HStack,
  Badge,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { RepeatIcon } from '@chakra-ui/icons';
import type { TemperatureWithStatus } from '../types';
import { fetchTemperatures } from '../services/api';
import { getTemperatureStatus } from '../utils/temperature';
import { usePolling } from '../hooks/usePolling';
import { CardRoomTemperature } from '../components/CardRoomTemperature';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { EmptyState } from '../components/EmptyState';

const POLLING_INTERVAL = 10000; // 10 seconds

export function DashboardPage() {
  const [rooms, setRooms] = useState<TemperatureWithStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const loadTemperatures = async () => {
    try {
      const data = await fetchTemperatures();
      const roomsWithStatus: TemperatureWithStatus[] = data.map((room) => ({
        ...room,
        status: getTemperatureStatus(room.temperature),
      }));
      setRooms(roomsWithStatus);
      setLastUpdate(new Date());
      setError(null);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load temperatures');
      setLoading(false);
    }
  };

  usePolling(loadTemperatures, { interval: POLLING_INTERVAL });

  if (loading) {
    return <LoadingState message="Loading temperature data..." />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={loadTemperatures} />;
  }

  if (rooms.length === 0) {
    return (
      <EmptyState
        title="No Rooms Found"
        description="There are no temperature monitoring rooms configured yet."
      />
    );
  }

  const abnormalRooms = rooms.filter((r) => r.status === 'Abnormal');

  return (
    <Box px={{ base: 3, md: 6, lg: 8, xl: 10 }} py={6}>
      <Box mb={6} w="100%">
        <Heading size="xl" mb={2}>
          Temperature Monitoring Dashboard
        </Heading>
        <HStack spacing={4} color="gray.600">
          <HStack>
            <RepeatIcon />
            <Text fontSize="sm">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </Text>
          </HStack>
          <Badge colorScheme="blue" variant="subtle">
            Auto-refresh every 10s
          </Badge>
        </HStack>
      </Box>

      {abnormalRooms.length > 0 && (
        <Alert status="warning" mb={6} borderRadius="md">
          <AlertIcon />
          <Box>
            <AlertTitle>Temperature Alert!</AlertTitle>
            <AlertDescription>
              {abnormalRooms.length} room(s) with abnormal temperature detected.
            </AlertDescription>
          </Box>
        </Alert>
      )}

      <SimpleGrid 
        columns={{ base: 1, sm: 2, md: 3, lg: 3, xl: 3 }} 
        spacing={{ base: 4, md: 6, lg: 8 }} 
        w="100%"
      >
        {rooms.map((room) => (
          <CardRoomTemperature key={room.room_id} room={room} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
