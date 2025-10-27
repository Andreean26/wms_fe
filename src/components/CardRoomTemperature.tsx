import { Box, Card, CardBody, Heading, HStack, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import type { TemperatureWithStatus } from '../types';
import { StatusBadge } from './StatusBadge';

interface CardRoomTemperatureProps {
  room: TemperatureWithStatus;
}

export function CardRoomTemperature({ room }: CardRoomTemperatureProps) {
  const isAbnormal = room.status === 'Abnormal';
  
  const normalBg = useColorModeValue('white', 'gray.700');
  const abnormalBg = useColorModeValue('red.50', 'red.900');
  const normalBorderColor = useColorModeValue('gray.200', 'gray.600');
  const headingColor = useColorModeValue('gray.700', 'gray.100');
  const normalTempColor = useColorModeValue('blue.600', 'blue.300');
  const abnormalTempColor = useColorModeValue('red.600', 'red.300');
  const textColor = useColorModeValue('gray.500', 'gray.400');

  return (
    <Card
      variant="outline"
      borderWidth={2}
      borderColor={isAbnormal ? 'red.300' : normalBorderColor}
      bg={isAbnormal ? abnormalBg : normalBg}
      transition="all 0.3s"
      w="100%"
      minH="200px"
      _hover={{
        shadow: 'md',
        transform: 'translateY(-2px)',
      }}
    >
      <CardBody p={6}>
        <VStack align="stretch" spacing={4}>
          <HStack justify="space-between" align="start">
            <Heading size="lg" color={headingColor}>
              {room.room_id}
            </Heading>
            <StatusBadge status={room.status} size="md" />
          </HStack>

          <Box>
            <Text fontSize="4xl" fontWeight="bold" color={isAbnormal ? abnormalTempColor : normalTempColor}>
              {room.temperature.toFixed(1)}°C
            </Text>
            <Text fontSize="md" color={textColor} mt={2}>
              Normal range: -20°C to -16°C
            </Text>
          </Box>
        </VStack>
      </CardBody>
    </Card>
  );
}
